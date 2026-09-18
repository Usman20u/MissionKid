import { useEffect } from 'react';

import {
  selectCurrentSession,
  selectSessionAttempt,
  selectSessionIssue,
  useAppState,
  type MissionTransitionIssue,
} from './appState';
import { MISSION_CATALOG } from './catalogContent';
import { translateMessage, type MessageKey } from './localization';
import { advanceSessionToReady } from './missionSession';
import {
  persistenceAdapter,
  type PersistenceAdapter,
} from './persistence';

const TRANSITION_ISSUE_KEYS: Readonly<
  Record<MissionTransitionIssue, MessageKey>
> = {
  'not-carried-out': 'session.transition.notCarriedOut',
  unconfirmed: 'session.transition.unconfirmed',
};

type MissionReadyProps = Readonly<{
  adapter?: PersistenceAdapter;
}>;

// The surface of the one current Mission Session while it reaches `ready` and
// once it is there. It renders the session that is actually stored: the Mission
// stays identifiable while the transition resolves, and the state it shows is
// the state storage confirmed, never one the interface assumed.
//
// Nothing here starts anything. There is no start action, no countdown and no
// completion, so the Mission cannot be committed to from this view; the start
// screen's own content and its **Start mission** action are a later step.
export function MissionReady({
  adapter = persistenceAdapter,
}: MissionReadyProps = {}) {
  const { dispatch, state } = useAppState();
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const session = selectCurrentSession(state);
  const issue = selectSessionIssue(state);
  const attempt = selectSessionAttempt(state);
  const sessionId = session?.sessionId ?? null;
  const sessionState = session?.state ?? null;

  // The Mission's wording comes from the reviewed catalog in the current
  // language, never from the stored session, and stays absent rather than being
  // guessed when the stored Mission no longer resolves to reviewed content.
  const missionTitle = session
    ? MISSION_CATALOG.find((record) => record.missionId === session.missionId)
        ?.content[state.language].title ?? null
    : null;

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
          issue: 'not-carried-out',
        });
        return;
      case 'unconfirmed':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: 'unconfirmed',
        });
        return;
      // Durable state holds nothing this transition may change. Rebuilding an
      // earlier state over it, or reporting a failure that did not happen,
      // would both be inventions.
      case 'inapplicable':
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
      {missionTitle ? (
        <h2 className="mission-session__mission">{missionTitle}</h2>
      ) : null}
      {sessionState === 'ready' && issue === null ? (
        <p className="mission-session__state">{t('session.ready.notStarted')}</p>
      ) : null}
      {issue ? (
        <>
          <p
            className="mission-session__issue"
            // Each attempt is its own message, for the reason the discovery
            // notice already records: a retry that fails the same way leaves an
            // unchanged node that no live region reports.
            key={`${issue}-${attempt}`}
            role="alert"
          >
            {t(TRANSITION_ISSUE_KEYS[issue])}
          </p>
          <button
            className="button button--secondary"
            onClick={advance}
            type="button"
          >
            {t('session.action.retry')}
          </button>
        </>
      ) : null}
    </div>
  );
}
