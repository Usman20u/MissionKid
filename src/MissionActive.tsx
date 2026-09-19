import { useEffect, useRef, useState } from 'react';

import {
  selectCurrentSession,
  selectSessionAttempt,
  selectSessionIssue,
  useAppState,
} from './appState';
import {
  MISSION_ADULT_LABEL_KEYS,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import { MissionLeaveConfirmation } from './MissionLeaveConfirmation';
import {
  completeMissionSession,
  isSessionPresentable,
  leaveMissionSession,
  readWallClock,
  resolveSessionMission,
  type WallClock,
} from './missionSession';
import {
  useMissionGuidance,
  type MissionGuidance,
  type MissionTimerClocks,
} from './missionTimer';
import { persistenceAdapter, type PersistenceAdapter } from './persistence';

// Leaving fails into its own truth, so it carries its own wording: an
// established refusal leaves the Mission exactly where it was, and an
// interrupted write claims neither that it was left nor that it was kept.
// Both exits share these messages, so neither may describe the lifecycle state
// the Mission is in: an unstarted selection is not running, and a running
// Mission has not merely been chosen.
const EXIT_MESSAGE_KEYS = {
  failed: 'session.exit.notLeft',
  unconfirmed: 'session.exit.unconfirmed',
} as const satisfies Readonly<Record<'failed' | 'unconfirmed', MessageKey>>;

// Completion fails into its own truth as well, and never borrows the exit's:
// a Mission that could not be recorded as done has not been left either.
const DONE_MESSAGE_KEYS = {
  failed: 'session.done.notRecorded',
  unconfirmed: 'session.done.unconfirmed',
} as const satisfies Readonly<Record<'failed' | 'unconfirmed', MessageKey>>;

const SECONDS_PER_MINUTE = 60;

// Approximate by design and calm by default. Minutes are what the family needs
// in order to know roughly when to come back, so the wording changes about once
// a minute rather than once a second: there is no ticking number to watch, and
// nothing for a screen reader to repeat every second.
//
// At zero the wording turns neutral and stays there. Nothing counts past zero,
// nothing fails, and the Mission is still the family's to finish.
function guidanceMessage(
  guidance: MissionGuidance,
  language: SupportedLanguage,
): string {
  const t = (key: MessageKey) => translateMessage(language, key);

  if (guidance.basis === 'unreadable-clock') {
    return t('session.active.timingUnavailable');
  }

  if (guidance.remainingSeconds === 0) {
    return t('session.active.zero');
  }

  if (guidance.remainingSeconds < SECONDS_PER_MINUTE) {
    return t('session.active.lessThanMinute');
  }

  return t('session.active.remaining').replace(
    '{minutes}',
    String(Math.ceil(guidance.remainingSeconds / SECONDS_PER_MINUTE)),
  );
}

type MissionActiveProps = Readonly<{
  adapter?: PersistenceAdapter;
  clocks?: MissionTimerClocks;
  now?: WallClock;
}>;

// The Mission that is running. It leads with what the family should be doing —
// leaving the screen — keeps the Mission identity, its short action reminder and
// the guidance they read before starting, and puts approximate remaining time
// last, as support rather than as something to watch.
//
// Its reading order leaves room for **Mission done** and the leave-without-
// completion path, and adds neither: those controls arrive with the operations
// they carry out. Nothing here asks for interaction or proof while the Mission
// happens, and nothing here writes anything.
export function MissionActive({
  adapter = persistenceAdapter,
  clocks,
  now = readWallClock,
}: MissionActiveProps = {}) {
  const { dispatch, state } = useAppState();
  const session = selectCurrentSession(state);
  const active = session?.state === 'active' ? session : null;
  // One timer for one running Mission: the derivation and its schedule are
  // owned elsewhere, and this view only reads what they already produce.
  const guidance = useMissionGuidance(active, clocks);
  const mission = active ? resolveSessionMission(active, state.language) : null;
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const issue = selectSessionIssue(state);
  const attempt = selectSessionAttempt(state);
  const sessionId = active?.sessionId ?? null;

  // A pending confirmation belongs to the Mission it was opened for. Holding the
  // identity rather than a flag is what stops a confirmation opened for one
  // session from ever confirming another.
  const [confirmingSessionId, setConfirmingSessionId] = useState<string | null>(
    null,
  );
  const confirming = confirmingSessionId !== null && confirmingSessionId === sessionId;
  const exitEntry = useRef<HTMLButtonElement>(null);
  const wasConfirming = useRef(false);

  // Focus follows the family's own decision to open or dismiss the confirmation,
  // and nothing else: a tick, zero, a language change and an ordinary rerender
  // all leave it exactly where it was.
  useEffect(() => {
    if (confirming === wasConfirming.current) {
      return;
    }

    wasConfirming.current = confirming;

    // Focus into the panel is the panel's own; returning it to the control the
    // family opened is this view's, because only this side still has it.
    if (!confirming) {
      exitEntry.current?.focus();
    }
  }, [confirming]);

  // The one dominant action of the running Mission. It is deliberate, keyed by
  // the identity the family acted on, and needs no waiting for zero, no proof
  // and no second confirmation: finishing is the family's own report, and the
  // approved result follows it directly.
  function complete(sessionId: string) {
    const result = completeMissionSession(adapter, sessionId, now, state.language);

    switch (result.status) {
      case 'completed':
      case 'resolved':
        dispatch({
          type: 'mission-session-completed',
          session: result.session,
          completedSessions: result.completedSessions,
        });
        return;
      // Durable state was read and still says the Mission is running: this
      // completion did not happen, and the same action records it once.
      case 'not-completed':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'done', outcome: 'failed' },
        });
        return;
      // Nothing is known about the write's outcome, so nothing is claimed in
      // either direction and no recognition or progress is shown.
      case 'unconfirmed':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'done', outcome: 'unconfirmed' },
        });
        return;
      case 'superseded':
        dispatch({ type: 'mission-session-adopted', session: result.session });
        return;
      case 'unavailable':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'done', outcome: 'failed' },
        });
        return;
    }
  }

  // Leaving an active Mission is the confirmed exit. It is keyed by the identity
  // the family acted on and by the state they acted from, so a request that
  // arrives after durable state moved on clears nothing it did not name. It
  // writes no completion, no recognition and no progress of any kind.
  function leave(sessionId: string) {
    const result = leaveMissionSession(adapter, sessionId, 'active');

    setConfirmingSessionId(null);

    switch (result.status) {
      case 'left':
      case 'resolved':
        dispatch({ type: 'mission-session-left' });
        return;
      // Durable state holds something other than the session this request
      // named. It is preserved and followed rather than cleared.
      case 'superseded':
        dispatch({ type: 'mission-session-adopted', session: result.session });
        return;
      case 'not-left':
      case 'unavailable':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'exit', outcome: 'failed' },
        });
        return;
      case 'unconfirmed':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'exit', outcome: 'unconfirmed' },
        });
        return;
    }
  }

  if (active === null) {
    return null;
  }

  // A Mission that no longer resolves to reviewed, safe content, and a session
  // whose timestamps are impossible, are both recovery cases rather than a
  // Mission to present: nothing about either is guessed at, and neither is
  // shown as an ordinary running Mission.
  if (
    mission === null ||
    guidance === null ||
    !isSessionPresentable(active, state.language)
  ) {
    return (
      <div className="mission-session">
        <p className="mission-session__state">
          {t('session.active.missionUnavailable')}
        </p>
        {/* A recovery exit can fail like any other, and saying so here is the
            only way the family learns that the Mission is still stored. */}
        {issue?.operation === 'exit' ? (
          <p
            className="mission-session__issue"
            key={`exit-${issue.outcome}-${attempt}`}
            role="alert"
          >
            {t(EXIT_MESSAGE_KEYS[issue.outcome])}
          </p>
        ) : null}
        {/* The approved way out of a Mission that cannot safely continue.
            The session is still `active` in durable state, so leaving it is
            leaving an active Mission and takes the same explicit confirmation
            as any other. Only the safe choice is worded differently: staying
            here keeps the family on this recovery surface, and promising to
            keep going would claim that unavailable Mission content can be
            continued. Leaving this way completes, counts and recognises
            nothing. */}
        {confirming ? (
          <MissionLeaveConfirmation
            language={state.language}
            onKeepGoing={() => setConfirmingSessionId(null)}
            onLeave={() => leave(active.sessionId)}
            stayKey="session.action.stayHere"
            // Nothing names the Mission above this here, so this is the
            // level-2 heading rather than a level-3 one under it.
            headingLevel={2}
          />
        ) : (
          <button
            className="button button--secondary mission-session__exit"
            onClick={() => setConfirmingSessionId(active.sessionId)}
            ref={exitEntry}
            type="button"
          >
            {t('session.action.backToSuggestions')}
          </button>
        )}
      </div>
    );
  }

  const content = mission.content[state.language];
  const adultLabelKey = MISSION_ADULT_LABEL_KEYS[mission.adultInvolvement];

  return (
    <div className="mission-session">
      <p className="mission-session__away">{t('session.active.away')}</p>
      <h2 className="mission-session__mission">{content.title}</h2>
      <p className="mission-session__instruction">{content.instruction}</p>
      {adultLabelKey && content.adultInvolvementNote ? (
        <p className="mission-session__note mission-session__note--adult">
          <span aria-hidden="true" className="mission-session__note-mark" />
          <span className="mission-session__note-label">{t(adultLabelKey)}</span>
          {content.adultInvolvementNote}
        </p>
      ) : null}
      {content.safetyNote ? (
        <p className="mission-session__note mission-session__note--safety">
          <span aria-hidden="true" className="mission-session__note-mark" />
          <span className="mission-session__note-label">
            {/* Not the ready screen's "before you start": the Mission is
                already running, and guidance labelled as past no longer reads
                as guidance to follow. */}
            {t('session.active.safetyLabel')}
          </span>
          {content.safetyNote}
        </p>
      ) : null}
      <p className="mission-session__guidance">
        {guidanceMessage(guidance, state.language)}
      </p>
      {/* Where the clock cannot be read, the duration the session recorded is
          still worth knowing. It is the session's own stored value: a malformed
          one is never replaced with the catalog's, and no number is invented to
          fill the gap. */}
      {guidance.basis === 'unreadable-clock' && guidance.durationSeconds > 0 ? (
        <p className="mission-session__guidance">
          {t('discovery.card.about')}{' '}
          {Math.round(guidance.durationSeconds / SECONDS_PER_MINUTE)}{' '}
          {t('discovery.card.minutes')}
        </p>
      ) : null}
      {issue?.operation === 'done' ? (
        <p
          className="mission-session__issue"
          key={`done-${issue.outcome}-${attempt}`}
          role="alert"
        >
          {t(DONE_MESSAGE_KEYS[issue.outcome])}
        </p>
      ) : null}
      {issue?.operation === 'exit' ? (
        <p
          className="mission-session__issue"
          // Each attempt is its own message, for the reason the discovery notice
          // already records: a retry that fails the same way leaves an unchanged
          // node that no live region reports.
          key={`exit-${issue.outcome}-${attempt}`}
          role="alert"
        >
          {t(EXIT_MESSAGE_KEYS[issue.outcome])}
        </p>
      ) : null}
      {/* The approved leave-without-completion path: discoverable, and visually
          secondary to the **Mission done** action that will sit beside it. The
          Mission keeps running while the family decides, so the guidance above
          neither pauses nor restarts. */}
      {/* Finishing is what the family came back to do, so it is the one
          dominant action here and comes before the way out. */}
      <button
        className="button button--primary mission-session__done"
        onClick={() => complete(active.sessionId)}
        type="button"
      >
        {t('session.action.done')}
      </button>
      {confirming ? (
        <MissionLeaveConfirmation
          language={state.language}
          onKeepGoing={() => setConfirmingSessionId(null)}
          onLeave={() => leave(active.sessionId)}
        />
      ) : (
        <button
          className="button button--secondary mission-session__exit"
          onClick={() => setConfirmingSessionId(active.sessionId)}
          ref={exitEntry}
          type="button"
        >
          {t('session.action.leave')}
        </button>
      )}
    </div>
  );
}
