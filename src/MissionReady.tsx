import { useEffect } from 'react';

import {
  isStartOutcomeUnknown,
  selectCurrentSession,
  selectSessionAttempt,
  selectSessionIssue,
  useAppState,
  type MissionSessionOperation,
  type MissionSessionOutcome,
} from './appState';
import type { MissionRecord } from './catalog';
import {
  MISSION_ADULT_LABEL_KEYS,
  MISSION_CATEGORY_LABEL_KEYS,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import {
  advanceSessionToReady,
  leaveMissionSession,
  readWallClock,
  resolveSessionMission,
  startMissionSession,
  type WallClock,
} from './missionSession';
import {
  persistenceAdapter,
  type PersistenceAdapter,
  type ReadyMissionSession,
} from './persistence';

// Each transition fails into its own truth, so each has its own wording.
// Reaching `ready` writes no `startedAt`, so its messages may say the Mission
// has not started; a start's durable outcome is exactly the question at issue,
// so its messages never borrow that claim.
const ISSUE_MESSAGE_KEYS: Readonly<
  Record<MissionSessionOperation, Readonly<Record<MissionSessionOutcome, MessageKey>>>
> = {
  ready: {
    failed: 'session.transition.notCarriedOut',
    unconfirmed: 'session.transition.unconfirmed',
  },
  start: {
    failed: 'session.start.notStarted',
    unconfirmed: 'session.start.unconfirmed',
  },
  // Leaving fails into its own truth as well: an established refusal leaves the
  // Mission exactly where it was, and an interrupted one claims neither that it
  // was left nor that it was kept.
  exit: {
    failed: 'session.exit.notLeft',
    unconfirmed: 'session.exit.unconfirmed',
  },
  // Completion and leaving the result are the active view's and the result
  // view's own operations. They are listed so the table stays exhaustive; this
  // view never records either issue.
  done: {
    failed: 'session.done.notRecorded',
    unconfirmed: 'session.done.unconfirmed',
  },
  result: {
    failed: 'result.exit.notCleared',
    unconfirmed: 'result.exit.unconfirmed',
  },
};

type ReadyMissionDetailsProps = Readonly<{
  session: ReadyMissionSession;
  mission: MissionRecord;
  language: SupportedLanguage;
  // Whether the durable outcome of a start is unknown. Everything else here is
  // true either way — the Mission, its guidance, its safety content — but
  // saying it has not started is not, so that one line is withheld.
  startOutcomeUnknown: boolean;
}>;

// What the family needs before deciding to begin, answered here rather than
// behind further navigation or optional disclosure: what the Mission is and
// what they will do, which Mission Category it belongs to, roughly how long it
// may take, whether an adult must be nearby or take part, any essential safety
// guidance, and that the Mission has not started.
//
// The Mission Category and the duration come from the session's own immutable
// facts, so a later setup edit or a later catalog release cannot rewrite what
// the family agreed to. The words come from the reviewed catalog in the current
// language.
function ReadyMissionDetails({
  session,
  mission,
  language,
  startOutcomeUnknown,
}: ReadyMissionDetailsProps) {
  const t = (key: MessageKey) => translateMessage(language, key);
  const content = mission.content[language];
  const adultLabelKey = MISSION_ADULT_LABEL_KEYS[mission.adultInvolvement];
  const minutes = Math.round(session.durationSecondsAtSelection / 60);

  return (
    <>
      <p className="mission-session__meta">
        <span className="mission-session__category">
          {t(MISSION_CATEGORY_LABEL_KEYS[session.missionCategoryAtSelection])}
        </span>
        <span className="mission-session__duration">
          {t('discovery.card.about')} {minutes} {t('discovery.card.minutes')}
        </span>
      </p>
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
            {t('discovery.card.safetyLabel')}
          </span>
          {content.safetyNote}
        </p>
      ) : null}
      {/* Mission Break: the brief step from the screen to the real-life
          Mission. It describes what the family does and nothing more — it
          blocks no device, controls or inspects no other app, claims no
          parental-control capability, watches nothing, and asks for no proof
          that the Mission happened. */}
      <p className="mission-session__break">
        <span className="mission-session__break-lead">
          {t('session.ready.missionBreak.lead')}
        </span>{' '}
        {t('session.ready.missionBreak.body')}
      </p>
      {/* Said only when it is known. A start whose write may have landed is
          exactly the case where this sentence would be a claim rather than a
          fact, and the notice above already says what is actually known. */}
      {startOutcomeUnknown ? null : (
        <p className="mission-session__state">{t('session.ready.notStarted')}</p>
      )}
    </>
  );
}

type MissionReadyProps = Readonly<{
  adapter?: PersistenceAdapter;
  now?: WallClock;
}>;

// The surface of the one current Mission Session while it reaches `ready` and
// once it is there. It renders the session that is actually stored: the Mission
// stays identifiable while the transition resolves, and the state it shows is
// the state storage confirmed, never one the interface assumed.
//
// The one thing this view does is start the Mission, deliberately and once.
// There is no countdown, no completion and no automatic progression; the
// secondary return to suggestions arrives with the cancellation it performs.
export function MissionReady({
  adapter = persistenceAdapter,
  now = readWallClock,
}: MissionReadyProps = {}) {
  const { dispatch, state } = useAppState();
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const session = selectCurrentSession(state);
  const issue = selectSessionIssue(state);
  const attempt = selectSessionAttempt(state);
  // One answer governs the heading above, the state statement and the action
  // wording below, so no part of the page can contradict another about what is
  // actually known.
  const startOutcomeUnknown = isStartOutcomeUnknown(state);
  const sessionId = session?.sessionId ?? null;
  const sessionState = session?.state ?? null;
  const mission = session ? resolveSessionMission(session, state.language) : null;

  function advance() {
    const result = advanceSessionToReady(adapter);

    switch (result.status) {
      case 'advanced':
      case 'resolved':
        dispatch({ type: 'mission-session-ready', session: result.session });
        return;
      // Established before storage changed, or never attempted: the stored
      // session stands exactly as it was.
      case 'not-advanced':
      case 'unavailable':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'ready', outcome: 'failed' },
        });
        return;
      case 'unconfirmed':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'ready', outcome: 'unconfirmed' },
        });
        return;
      // Durable state holds nothing this transition may change. Rebuilding an
      // earlier state over it, or reporting a failure that did not happen,
      // would both be inventions.
      case 'inapplicable':
        return;
    }
  }

  // The one deliberate action on this view. It is keyed by the identity the
  // family acted on, so an activation that arrives after durable state moved on
  // cannot start a different Mission, and pressing it again resolves the session
  // that is already running rather than starting anything twice.
  function start(sessionId: string) {
    const result = startMissionSession(adapter, sessionId, now, state.language);

    switch (result.status) {
      case 'started':
      case 'resolved':
        dispatch({ type: 'mission-session-started', session: result.session });
        return;
      // Durable state was read and still says `ready`: this start did not
      // happen, and the same action can start it once.
      case 'not-started':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'start', outcome: 'failed' },
        });
        return;
      // Nothing is known about the write's outcome, so nothing is claimed in
      // either direction and no rollback is written over it.
      case 'unconfirmed':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'start', outcome: 'unconfirmed' },
        });
        return;
      // Nothing here may be started. Rebuilding an earlier state or reporting a
      // failure that did not happen would both be inventions.
      case 'unavailable':
        return;
    }
  }

  // Ending an unstarted selection. It needs no confirmation of its own: nothing
  // has started, nothing is counted, and returning to the three suggestions is
  // the approved way out of `ready`. It is keyed by the identity the family
  // acted on and by the state they acted from, so a cancellation that arrives
  // after the Mission started never abandons a running Mission.
  function cancel(sessionId: string) {
    const result = leaveMissionSession(adapter, sessionId, 'ready');

    switch (result.status) {
      case 'left':
      case 'resolved':
        dispatch({ type: 'mission-session-left' });
        return;
      // Durable state holds something else than the session this request named.
      // It is preserved and followed rather than cleared.
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

  // Entering `ready` follows a selection without another family decision, so it
  // happens on its own rather than through a second control. It runs once for a
  // stored `selected` session: a confirmed transition moves that session past
  // `selected` and a failure records the issue, and either way this condition
  // stops being true, so nothing here retries itself. The family's retry is the
  // control below, and a replayed or remounted effect re-reads a session that
  // is already `ready` and writes nothing.
  useEffect(() => {
    if (sessionState === 'selected' && issue === null) {
      advance();
    }
  }, [sessionId, sessionState, issue]);

  if (!session) {
    return null;
  }

  return (
    <div className="mission-session">
      {mission ? (
        <h2 className="mission-session__mission">
          {mission.content[state.language].title}
        </h2>
      ) : (
        // The Mission cannot be shown, so it is not offered as startable and
        // none of its content is guessed at. Its session is untouched.
        <p className="mission-session__state">
          {t('session.ready.missionUnavailable')}
        </p>
      )}
      {session.state === 'ready' && mission ? (
        <ReadyMissionDetails
          language={state.language}
          mission={mission}
          session={session}
          startOutcomeUnknown={startOutcomeUnknown}
        />
      ) : null}
      {issue ? (
        <p
          className="mission-session__issue"
          // Each attempt is its own message, for the reason the discovery
          // notice already records: a retry that fails the same way leaves an
          // unchanged node that no live region reports.
          key={`${issue.operation}-${issue.outcome}-${attempt}`}
          role="alert"
        >
          {t(ISSUE_MESSAGE_KEYS[issue.operation][issue.outcome])}
        </p>
      ) : null}
      {/* Starting is deliberate and is the one dominant action here. It exists
          only for a session that is actually ready and a Mission that still
          resolves to reviewed, safe content, so nothing offers to start what
          cannot be started. After a start that did not happen, this same action
          is the retry: no second control claims to repeat it. */}
      {session.state === 'ready' && mission ? (
        <button
          className="button button--primary mission-session__start"
          onClick={() => start(session.sessionId)}
          type="button"
        >
          {/* The same control is the retry, so its wording has to be true in
              both cases. **Start mission** would claim the Mission is still
              waiting to begin; where the outcome is unknown this asks to find
              out instead, and a retry resolves the durable session rather than
              starting a second time. */}
          {t(startOutcomeUnknown ? 'session.action.retry' : 'session.action.start')}
        </button>
      ) : null}
      {issue?.operation === 'ready' ? (
        <button
          className="button button--secondary"
          onClick={advance}
          type="button"
        >
          {t('session.action.retry')}
        </button>
      ) : null}
      {/* The approved way out of `ready`, secondary to starting and never
          competing with it. The unstarted selection simply ends: no timer, no
          completion, no recognition and no progress follow from it. */}
      {session.state === 'ready' ? (
        <button
          className="button button--secondary mission-session__exit"
          onClick={() => cancel(session.sessionId)}
          type="button"
        >
          {t('session.action.backToSuggestions')}
        </button>
      ) : null}
    </div>
  );
}
