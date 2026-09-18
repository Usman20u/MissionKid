import { useEffect, useRef, useState } from 'react';

import { useAppState } from './appState';
import { readWallClock, type WallClock } from './missionSession';
import type { ActiveMissionSession } from './persistence';

// Milliseconds since an origin that only this page lifetime knows. It measures
// elapsed time and nothing else: two readings may be subtracted from each other,
// and a reading is meaningless anywhere but the page that took it. It is never
// stored, never compared with a wall-clock timestamp, and never carried across a
// reload.
export type MonotonicClock = () => number;

export function readMonotonicClock(): number {
  const reading = globalThis.performance?.now?.();

  // Where the browser provides no monotonic clock, elapsed time falls back to
  // wall time. Every use below clamps elapsed time at zero, so even a clock that
  // moves backwards can only hold guidance still, never raise it.
  return typeof reading === 'number' && Number.isFinite(reading)
    ? reading
    : Date.now();
}

// Why the remaining guidance is what it is. Everything but `derived` is a
// specified degradation to zero: guidance stops being meaningful while the
// session itself stays exactly as it is.
export type GuidanceBasis =
  | 'derived'
  // Missing, non-finite, zero, negative or fractional seconds. The stored value
  // is never replaced to make the session look valid.
  | 'malformed-duration'
  // The wall clock now reads earlier than the session's own start.
  | 'clock-before-start'
  | 'unreadable-clock'
  // Unreachable through validated hydration, which refuses an `active` session
  // without a structurally valid start timestamp. It is handled rather than
  // assumed away, and it invents no timestamp to recover from.
  | 'invalid-session';

// Remaining guidance is approximate and bounded: always a finite whole number of
// seconds, never negative, and never more than the duration the session froze at
// selection.
export type MissionGuidance = Readonly<{
  remainingSeconds: number;
  durationSeconds: number;
  basis: GuidanceBasis;
}>;

const MILLISECONDS_PER_SECOND = 1000;

function isEpochMilliseconds(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

// The duration that can guide a countdown, or zero when the stored value cannot.
function guidanceDurationSeconds(session: ActiveMissionSession): number {
  const duration = session.durationSecondsAtSelection;

  return typeof duration === 'number' &&
    Number.isInteger(duration) &&
    duration > 0
    ? duration
    : 0;
}

function clampSeconds(seconds: number, durationSeconds: number): number {
  return Math.min(Math.max(seconds, 0), durationSeconds);
}

// The whole derivation: two durable facts and one wall-clock reading in, one
// bounded result out. It is pure and total — every input, including a reading
// that is not a number at all, produces a typed result rather than a throw, a
// NaN, an infinity or an invented timestamp.
export function deriveGuidance(
  session: ActiveMissionSession,
  wallClockMilliseconds: number,
): MissionGuidance {
  const durationSeconds = guidanceDurationSeconds(session);

  if (!isEpochMilliseconds(session.startedAt)) {
    return { remainingSeconds: 0, durationSeconds, basis: 'invalid-session' };
  }

  if (durationSeconds === 0) {
    return { remainingSeconds: 0, durationSeconds, basis: 'malformed-duration' };
  }

  if (!Number.isFinite(wallClockMilliseconds)) {
    return { remainingSeconds: 0, durationSeconds, basis: 'unreadable-clock' };
  }

  if (wallClockMilliseconds < session.startedAt) {
    return {
      remainingSeconds: 0,
      durationSeconds,
      basis: 'clock-before-start',
    };
  }

  const elapsedMilliseconds = wallClockMilliseconds - session.startedAt;
  const remainingMilliseconds =
    durationSeconds * MILLISECONDS_PER_SECOND - elapsedMilliseconds;

  return {
    // Rounded up, so a second is shown while any of it is left and zero is
    // reached exactly when the duration has elapsed.
    remainingSeconds: clampSeconds(
      Math.ceil(remainingMilliseconds / MILLISECONDS_PER_SECOND),
      durationSeconds,
    ),
    durationSeconds,
    basis: 'derived',
  };
}

// What the display ticks from between recoveries: a value read from durable
// facts, tied to one monotonic reading. It belongs to one session and to one
// page lifetime, and it is runtime data that is never written anywhere.
export type GuidanceAnchor = Readonly<{
  sessionId: string;
  remainingSecondsAtAnchor: number;
  durationSeconds: number;
  basis: GuidanceBasis;
  monotonicMillisecondsAtAnchor: number;
}>;

// Live guidance from an anchor, derived from elapsed time rather than from how
// many callbacks have run: a late, coalesced or throttled tick shows the time
// that has actually passed instead of falling behind. Elapsed time is clamped at
// zero, so no reading can make the display go back up.
export function guidanceAt(
  anchor: GuidanceAnchor,
  monotonicMilliseconds: number,
): MissionGuidance {
  const elapsedMilliseconds = Number.isFinite(monotonicMilliseconds)
    ? Math.max(0, monotonicMilliseconds - anchor.monotonicMillisecondsAtAnchor)
    : 0;

  return {
    remainingSeconds: clampSeconds(
      Math.ceil(
        anchor.remainingSecondsAtAnchor -
          elapsedMilliseconds / MILLISECONDS_PER_SECOND,
      ),
      anchor.durationSeconds,
    ),
    durationSeconds: anchor.durationSeconds,
    basis: anchor.basis,
  };
}

export type ClockReadings = Readonly<{
  wallClockMilliseconds: number;
  monotonicMilliseconds: number;
}>;

// Establishing or re-establishing the anchor: on first sight of a session, and
// on every return to the page. Guidance is re-derived from the durable facts, so
// time that passed while the page was hidden is accounted for by the timestamps
// rather than by anything the page counted.
//
// Within one page lifetime the result can only fall. A wall clock that has moved
// backwards would otherwise re-derive a larger value and hand the child extra
// time, so the previous anchor's own elapsed time is taken as the ceiling. That
// ceiling is this page's runtime knowledge; nothing is written to make it hold.
export function anchorGuidance(
  session: ActiveMissionSession,
  readings: ClockReadings,
  previous: GuidanceAnchor | null,
): GuidanceAnchor {
  const derived = deriveGuidance(session, readings.wallClockMilliseconds);
  const carried =
    previous !== null && previous.sessionId === session.sessionId
      ? guidanceAt(previous, readings.monotonicMilliseconds).remainingSeconds
      : null;

  return {
    sessionId: session.sessionId,
    remainingSecondsAtAnchor:
      carried === null
        ? derived.remainingSeconds
        : Math.min(derived.remainingSeconds, carried),
    durationSeconds: derived.durationSeconds,
    basis: derived.basis,
    monotonicMillisecondsAtAnchor: readings.monotonicMilliseconds,
  };
}

export type MissionTimerClocks = Readonly<{
  now?: WallClock;
  monotonic?: MonotonicClock;
}>;

const TICK_INTERVAL_MILLISECONDS = 1000;

function isPageVisible(): boolean {
  return document.visibilityState !== 'hidden';
}

// The runtime side of the derivation: it anchors guidance for the running
// Mission, re-anchors when the family comes back to the page, and re-renders
// while there is guidance left to show. It keeps no countdown of its own — every
// value comes from the durable facts and the clocks — and it writes nothing.
//
// A session that has not started has no timer at all: nothing is scheduled and
// no listener is attached until one is actually running.
export function useMissionGuidance(
  session: ActiveMissionSession | null,
  clocks: MissionTimerClocks = {},
): MissionGuidance | null {
  const { dispatch, state } = useAppState();
  const now = clocks.now ?? readWallClock;
  const monotonic = clocks.monotonic ?? readMonotonicClock;
  const anchor = state.guidanceAnchor ?? null;
  const sessionId = session?.sessionId ?? null;

  // A tick needs no value of its own: the value always comes from the anchor and
  // the monotonic clock, so this only marks the moment to re-read them.
  const [, setTick] = useState(0);
  const [visible, setVisible] = useState(isPageVisible);

  // Read at the moment an event fires rather than when the effect was set up, so
  // a later return re-anchors against what is current instead of what this
  // closure happened to capture.
  const latest = useRef({ session, anchor, now, monotonic });
  latest.current = { session, anchor, now, monotonic };

  useEffect(() => {
    if (sessionId === null) {
      return;
    }

    const reanchor = () => {
      const current = latest.current;

      if (current.session === null) {
        return;
      }

      dispatch({
        type: 'mission-timer-anchored',
        anchor: anchorGuidance(
          current.session,
          {
            wallClockMilliseconds: current.now(),
            monotonicMilliseconds: current.monotonic(),
          },
          current.anchor,
        ),
      });
    };

    // Coming back to the page recalculates from the timestamps. Both events can
    // arrive for one return, and either can arrive repeatedly; each only re-reads
    // the same durable facts, and re-anchoring can never raise guidance, so no
    // number of them restarts or extends anything.
    const onReturn = () => {
      const pageVisible = isPageVisible();

      setVisible(pageVisible);

      if (pageVisible) {
        reanchor();
      }
    };

    reanchor();
    document.addEventListener('visibilitychange', onReturn);
    window.addEventListener('focus', onReturn);

    return () => {
      document.removeEventListener('visibilitychange', onReturn);
      window.removeEventListener('focus', onReturn);
    };
  }, [dispatch, sessionId]);

  // Between anchors the value ticks from the anchor. Before the first one is
  // established — the render in which a running Mission is first seen — it comes
  // straight from the durable facts, so the family never sees a moment without
  // guidance, and an anchor naming another session guides nothing here.
  const live =
    session === null
      ? null
      : anchor !== null && anchor.sessionId === sessionId
        ? guidanceAt(anchor, monotonic())
        : deriveGuidance(session, now());

  // At rest the timer costs nothing: no callback is scheduled for a session that
  // is not running, for guidance that has already reached zero, or while the
  // page is hidden.
  const ticking = visible && live !== null && live.remainingSeconds > 0;

  useEffect(() => {
    if (!ticking) {
      return;
    }

    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, TICK_INTERVAL_MILLISECONDS);

    return () => {
      clearInterval(interval);
    };
  }, [ticking, sessionId]);

  return live;
}
