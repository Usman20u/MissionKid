import { StrictMode } from 'react';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  AppStateProvider,
  selectCurrentSession,
  useAppState,
  type AppState,
} from './appState';
import {
  anchorGuidance,
  deriveGuidance,
  guidanceAt,
  readMonotonicClock,
  useMissionGuidance,
  type GuidanceAnchor,
  type MissionTimerClocks,
} from './missionTimer';
import type { ActiveMissionSession, CurrentMissionSession } from './persistence';

const STARTED_AT = 1_700_000_000_000;
const DURATION_SECONDS = 240;

function activeSession(
  overrides: Partial<ActiveMissionSession> = {},
): ActiveMissionSession {
  return {
    sessionId: 'session-1',
    childProfileId: 'profile-1',
    missionId: 'movement-02',
    missionCategoryAtSelection: 'Movement',
    ageBandAtSelection: '7–8',
    durationSecondsAtSelection: DURATION_SECONDS,
    state: 'active',
    selectedAt: STARTED_AT - 60_000,
    startedAt: STARTED_AT,
    ...overrides,
  };
}

describe('deriving remaining guidance from durable facts', () => {
  it.each([
    ['at the moment of the start', 0, DURATION_SECONDS],
    ['one second in', 1_000, 239],
    ['midway', 100_000, 140],
    ['with less than a second left', DURATION_SECONDS * 1000 - 400, 1],
    ['at exact expiry', DURATION_SECONDS * 1000, 0],
    ['long after the duration elapsed', DURATION_SECONDS * 1000 + 3_600_000, 0],
  ])('reads %s', (_label, elapsedMilliseconds, expected) => {
    const guidance = deriveGuidance(activeSession(), STARTED_AT + elapsedMilliseconds);

    expect(guidance).toEqual({
      remainingSeconds: expected,
      durationSeconds: DURATION_SECONDS,
      basis: 'derived',
    });
  });

  it('never reads above the duration the session recorded', () => {
    // The stored duration is the ceiling, whatever a reading says.
    expect(deriveGuidance(activeSession(), STARTED_AT).remainingSeconds)
      .toBe(DURATION_SECONDS);
    expect(deriveGuidance(activeSession({ durationSecondsAtSelection: 5 }), STARTED_AT))
      .toEqual({ remainingSeconds: 5, durationSeconds: 5, basis: 'derived' });
  });

  it.each([
    ['a missing duration', undefined],
    ['a null duration, as a non-finite number survives JSON', null],
    ['a zero duration', 0],
    ['a negative duration', -30],
    ['a fractional duration', 1.5],
  ])('degrades to zero for %s without replacing it', (_label, duration) => {
    const session = activeSession(
      duration === undefined
        ? {}
        : { durationSecondsAtSelection: duration },
    );
    const withoutDuration = duration === undefined
      ? (() => {
          const { durationSecondsAtSelection: _dropped, ...rest } = session;
          return rest as ActiveMissionSession;
        })()
      : session;

    expect(deriveGuidance(withoutDuration, STARTED_AT + 5_000)).toEqual({
      remainingSeconds: 0,
      durationSeconds: 0,
      basis: 'malformed-duration',
    });
    // The session keeps exactly the duration it was stored with; guidance
    // degrades instead of the Mission being repaired into a valid-looking one.
    expect(withoutDuration.durationSecondsAtSelection).toBe(
      duration === undefined ? undefined : duration,
    );
  });

  it('reads zero when the wall clock is earlier than the start', () => {
    expect(deriveGuidance(activeSession(), STARTED_AT - 1)).toEqual({
      remainingSeconds: 0,
      durationSeconds: DURATION_SECONDS,
      basis: 'clock-before-start',
    });
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'reads zero for the unusable clock reading %s',
    (reading) => {
      const guidance = deriveGuidance(activeSession(), reading);

      expect(guidance.basis).toBe('unreadable-clock');
      expect(guidance.remainingSeconds).toBe(0);
      expect(Number.isFinite(guidance.remainingSeconds)).toBe(true);
    },
  );

  it.each([
    ['a fractional start timestamp', 1.5],
    ['a negative start timestamp', -1],
  ])('treats %s as an invalid session rather than a timer state', (_label, startedAt) => {
    const guidance = deriveGuidance(activeSession({ startedAt }), STARTED_AT);

    // Validated hydration refuses such a session; nothing here invents a
    // timestamp to recover one.
    expect(guidance.basis).toBe('invalid-session');
    expect(guidance.remainingSeconds).toBe(0);
  });

  it('is total and bounded for every reading, however extreme', () => {
    const readings = [
      0,
      -1,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Number.MAX_VALUE,
      STARTED_AT + 0.5,
      STARTED_AT + Number.EPSILON,
    ];

    for (const reading of readings) {
      const guidance = deriveGuidance(activeSession(), reading);

      expect(Number.isInteger(guidance.remainingSeconds)).toBe(true);
      expect(guidance.remainingSeconds).toBeGreaterThanOrEqual(0);
      expect(guidance.remainingSeconds).toBeLessThanOrEqual(DURATION_SECONDS);
    }
  });
});

describe('anchoring guidance to a monotonic reading', () => {
  const readings = (wall: number, monotonic: number) => ({
    wallClockMilliseconds: wall,
    monotonicMilliseconds: monotonic,
  });

  it('ticks from elapsed time rather than from the number of callbacks', () => {
    const anchor = anchorGuidance(activeSession(), readings(STARTED_AT, 5_000), null);

    expect(anchor.remainingSecondsAtAnchor).toBe(DURATION_SECONDS);
    // One reading taken ten seconds later says ten seconds passed, whether that
    // was one callback or ten: a late or coalesced tick cannot run slow.
    expect(guidanceAt(anchor, 15_000).remainingSeconds).toBe(DURATION_SECONDS - 10);
    expect(guidanceAt(anchor, 5_000 + DURATION_SECONDS * 1000).remainingSeconds).toBe(0);
    expect(guidanceAt(anchor, 5_000 + DURATION_SECONDS * 2000).remainingSeconds).toBe(0);
  });

  it('never rises when a monotonic reading arrives out of order', () => {
    const anchor = anchorGuidance(activeSession(), readings(STARTED_AT + 60_000, 9_000), null);

    // Readings from another page lifetime are never compared with this one's,
    // and a reading that appears to go backwards holds the value still.
    expect(guidanceAt(anchor, 1_000).remainingSeconds).toBe(180);
    expect(guidanceAt(anchor, Number.NaN).remainingSeconds).toBe(180);
  });

  it('lowers guidance when the wall clock has moved on', () => {
    const first = anchorGuidance(activeSession(), readings(STARTED_AT, 0), null);
    const later = anchorGuidance(
      activeSession(),
      readings(STARTED_AT + 100_000, 100_000),
      first,
    );

    expect(later.remainingSecondsAtAnchor).toBe(140);
  });

  it('does not extend guidance when the wall clock is rolled back after the start', () => {
    const first = anchorGuidance(activeSession(), readings(STARTED_AT + 100_000, 100_000), null);
    // Thirty real seconds pass while the wall clock is set back sixty.
    const rolled = anchorGuidance(
      activeSession(),
      readings(STARTED_AT + 70_000, 130_000),
      first,
    );

    expect(first.remainingSecondsAtAnchor).toBe(140);
    expect(rolled.remainingSecondsAtAnchor).toBe(110);
    expect(rolled.remainingSecondsAtAnchor).toBeLessThan(first.remainingSecondsAtAnchor);
  });

  it('reads zero when the wall clock is rolled back before the start', () => {
    const first = anchorGuidance(activeSession(), readings(STARTED_AT + 100_000, 100_000), null);
    const rolled = anchorGuidance(
      activeSession(),
      readings(STARTED_AT - 5_000, 110_000),
      first,
    );

    expect(rolled).toMatchObject({
      remainingSecondsAtAnchor: 0,
      basis: 'clock-before-start',
    });
  });

  it('carries nothing between different sessions', () => {
    const first = anchorGuidance(activeSession(), readings(STARTED_AT + 200_000, 0), null);
    const other = anchorGuidance(
      activeSession({ sessionId: 'session-2' }),
      readings(STARTED_AT + 10_000, 0),
      first,
    );

    // A ceiling belongs to the session it was learned for.
    expect(first.remainingSecondsAtAnchor).toBe(40);
    expect(other.remainingSecondsAtAnchor).toBe(230);
    expect(other.sessionId).toBe('session-2');
  });

  it('keeps a malformed duration at zero through anchoring and ticking', () => {
    const session = activeSession({ durationSecondsAtSelection: 0 });
    const anchor = anchorGuidance(session, readings(STARTED_AT, 0), null);

    expect(anchor).toMatchObject({ remainingSecondsAtAnchor: 0, basis: 'malformed-duration' });
    expect(guidanceAt(anchor, 60_000).remainingSeconds).toBe(0);
  });

  it('reads a monotonic clock, falling back where the browser has none', () => {
    expect(Number.isFinite(readMonotonicClock())).toBe(true);
  });
});

// The caller narrows to a running session, which is what the active view will
// do: nothing before `active` has a timer at all.
function TimerHarness({ clocks }: Readonly<{ clocks: MissionTimerClocks }>) {
  const { state } = useAppState();
  const session = selectCurrentSession(state);
  const guidance = useMissionGuidance(
    session?.state === 'active' ? session : null,
    clocks,
  );

  return (
    <p data-testid="guidance">
      {guidance ? `${guidance.remainingSeconds}|${guidance.basis}` : 'none'}
    </p>
  );
}

function appState(session: CurrentMissionSession | null): AppState {
  return {
    language: 'en',
    ageBand: '7–8',
    localProfileId: 'profile-1',
    status: 'ready',
    setupView: 'handoff',
    saveStatus: 'idle',
    ...(session ? { currentSession: session } : {}),
  } as AppState;
}

function movableClocks(wall: number, monotonic: number) {
  const readings = { wall, monotonic };

  return {
    readings,
    clocks: {
      now: () => readings.wall,
      monotonic: () => readings.monotonic,
    } satisfies MissionTimerClocks,
    // Real time passing: both clocks advance together.
    pass(milliseconds: number) {
      readings.wall += milliseconds;
      readings.monotonic += milliseconds;
    },
  };
}

function guidanceText() {
  return screen.getByTestId('guidance').textContent;
}

describe('the running Mission timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
  });

  function setVisibility(value: 'visible' | 'hidden') {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => value,
    });
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
  }

  function renderTimer(
    session: CurrentMissionSession | null,
    clocks: MissionTimerClocks,
    strict = false,
  ) {
    const tree = (
      <AppStateProvider initialState={appState(session)}>
        <TimerHarness clocks={clocks} />
      </AppStateProvider>
    );

    return render(strict ? <StrictMode>{tree}</StrictMode> : tree);
  }

  it.each([
    ['no session at all', null],
    ['a session that has only been selected', { ...activeSession(), state: 'selected' as const }],
  ])('runs no timer for %s', (_label, session) => {
    const { clocks } = movableClocks(STARTED_AT, 0);

    renderTimer(session as CurrentMissionSession | null, clocks);

    expect(guidanceText()).toBe('none');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('recovers a mission that started midway and counts down from there', () => {
    const { clocks, pass, readings } = movableClocks(STARTED_AT + 100_000, 50_000);

    renderTimer(activeSession(), clocks);

    expect(guidanceText()).toBe('140|derived');
    expect(vi.getTimerCount()).toBe(1);

    pass(3_000);
    act(() => {
      vi.advanceTimersByTime(3_000);
    });

    expect(guidanceText()).toBe('137|derived');
    expect(readings.monotonic).toBe(53_000);
  });

  it('shows the time that actually passed when a callback is delayed', () => {
    const { clocks, pass } = movableClocks(STARTED_AT, 0);

    renderTimer(activeSession(), clocks);
    expect(guidanceText()).toBe('240|derived');

    // Ten seconds of real time, one callback: the display follows elapsed time
    // rather than the number of ticks it received.
    pass(10_000);
    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(guidanceText()).toBe('230|derived');
  });

  it('rests at zero once the duration has elapsed', () => {
    const { clocks, pass } = movableClocks(STARTED_AT + DURATION_SECONDS * 1000 - 2_000, 0);

    renderTimer(activeSession(), clocks);
    expect(guidanceText()).toBe('2|derived');

    pass(2_000);
    act(() => {
      vi.advanceTimersByTime(2_000);
    });

    // Zero is a resting state: nothing is scheduled any more, and nothing about
    // the session changes because of it.
    expect(guidanceText()).toBe('0|derived');
    expect(vi.getTimerCount()).toBe(0);

    pass(60_000);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(guidanceText()).toBe('0|derived');
  });

  it('stops scheduling while the page is hidden and recalculates on return', () => {
    const { clocks, pass } = movableClocks(STARTED_AT, 0);

    renderTimer(activeSession(), clocks);
    expect(vi.getTimerCount()).toBe(1);

    setVisibility('hidden');
    expect(vi.getTimerCount()).toBe(0);

    // Time passes with the page hidden; the timestamps account for it, not a
    // counter the page kept running.
    pass(30_000);
    setVisibility('visible');

    expect(guidanceText()).toBe('210|derived');
    expect(vi.getTimerCount()).toBe(1);
  });

  it('is unchanged by repeated visibility and focus events', () => {
    const { clocks, pass } = movableClocks(STARTED_AT + 10_000, 10_000);

    renderTimer(activeSession(), clocks);
    expect(guidanceText()).toBe('230|derived');

    pass(5_000);
    for (let repeat = 0; repeat < 4; repeat += 1) {
      act(() => {
        document.dispatchEvent(new Event('visibilitychange'));
        window.dispatchEvent(new Event('focus'));
      });
    }

    // Four returns, one truth: recalculated from the same durable facts, with
    // no second countdown and no duplicate scheduled work.
    expect(guidanceText()).toBe('225|derived');
    expect(vi.getTimerCount()).toBe(1);
  });

  it('does not extend guidance when the wall clock is rolled back', () => {
    const { clocks, readings } = movableClocks(STARTED_AT + 120_000, 120_000);

    renderTimer(activeSession(), clocks);
    expect(guidanceText()).toBe('120|derived');

    // Thirty real seconds pass while the wall clock is set back a minute.
    readings.monotonic += 30_000;
    readings.wall -= 60_000;
    setVisibility('visible');

    expect(guidanceText()).toBe('90|derived');
  });

  it('reads zero when the wall clock is rolled back before the start', () => {
    const { clocks, readings } = movableClocks(STARTED_AT + 120_000, 120_000);

    renderTimer(activeSession(), clocks);
    expect(guidanceText()).toBe('120|derived');

    readings.monotonic += 1_000;
    readings.wall = STARTED_AT - 5_000;
    setVisibility('visible');

    expect(guidanceText()).toBe('0|clock-before-start');
  });

  it('shows zero for a malformed duration and stays at rest', () => {
    const { clocks } = movableClocks(STARTED_AT + 10_000, 0);

    renderTimer(activeSession({ durationSecondsAtSelection: 0 }), clocks);

    expect(guidanceText()).toBe('0|malformed-duration');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('keeps one scheduled tick under an effect replay and clears it on unmount', () => {
    const { clocks } = movableClocks(STARTED_AT, 0);

    const { unmount } = renderTimer(activeSession(), clocks, true);

    // StrictMode mounts, tears down and remounts: one timer, not two.
    expect(vi.getTimerCount()).toBe(1);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
    // Listeners go with it: an event after unmount updates nothing.
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
      window.dispatchEvent(new Event('focus'));
    });
    expect(screen.queryByTestId('guidance')).toBeNull();
  });

  it('writes nothing to browser storage from ticks or page events', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem');
    const { clocks, pass } = movableClocks(STARTED_AT, 0);

    renderTimer(activeSession(), clocks);

    pass(5_000);
    act(() => {
      vi.advanceTimersByTime(5_000);
    });
    setVisibility('hidden');
    pass(5_000);
    setVisibility('visible');
    act(() => {
      window.dispatchEvent(new Event('focus'));
    });

    // Remaining time is recalculated, never recorded: no tick, anchor or page
    // event reaches storage.
    expect(setItem).not.toHaveBeenCalled();
    expect(removeItem).not.toHaveBeenCalled();
    expect(guidanceText()).toBe('230|derived');
    setItem.mockRestore();
    removeItem.mockRestore();
  });

  it('keeps guidance with its own session when another starts', () => {
    const { clocks } = movableClocks(STARTED_AT + 60_000, 60_000);
    const anchor: GuidanceAnchor = {
      sessionId: 'someone-elses-session',
      remainingSecondsAtAnchor: 10,
      durationSeconds: DURATION_SECONDS,
      basis: 'derived',
      monotonicMillisecondsAtAnchor: 0,
    };

    render(
      <AppStateProvider initialState={{ ...appState(activeSession()), guidanceAnchor: anchor }}>
        <TimerHarness clocks={clocks} />
      </AppStateProvider>,
    );

    // The stale anchor names another session, so it guides nothing here: this
    // Mission is re-read from its own timestamps.
    expect(guidanceText()).toBe('180|derived');
  });
});
