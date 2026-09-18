import { useEffect } from 'react';

import {
  selectCurrentSession,
  selectSessionAttempt,
  selectSessionIssue,
  useAppState,
  type MissionTransitionIssue,
} from './appState';
import type { MissionRecord } from './catalog';
import { MISSION_CATALOG } from './catalogContent';
import {
  MISSION_ADULT_LABEL_KEYS,
  MISSION_CATEGORY_LABEL_KEYS,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import { advanceSessionToReady } from './missionSession';
import {
  persistenceAdapter,
  type PersistenceAdapter,
  type ReadyMissionSession,
} from './persistence';

// Both messages describe this transition only: reaching `ready` writes no
// `startedAt` and records no completion, so neither may stand in for a start or
// a completion whose durable outcome is a different question.
const TRANSITION_ISSUE_KEYS: Readonly<
  Record<MissionTransitionIssue, MessageKey>
> = {
  'not-carried-out': 'session.transition.notCarriedOut',
  unconfirmed: 'session.transition.unconfirmed',
};

// A stored Mission reference resolves to presentation only while its content is
// still reviewed and complete in the current language. A Mission whose safety
// approval was withdrawn must not come back as though it were still approved,
// and nothing about it is guessed, substituted or mixed across languages.
function resolveReviewedMission(
  missionId: string,
  language: SupportedLanguage,
): MissionRecord | null {
  const mission = MISSION_CATALOG.find(
    (record) => record.missionId === missionId,
  );

  if (!mission || !mission.reviewed) {
    return null;
  }

  const content = mission.content[language];

  return content.title.trim() && content.instruction.trim() ? mission : null;
}

type ReadyMissionDetailsProps = Readonly<{
  session: ReadyMissionSession;
  mission: MissionRecord;
  language: SupportedLanguage;
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
      <p className="mission-session__state">{t('session.ready.notStarted')}</p>
    </>
  );
}

type MissionReadyProps = Readonly<{
  adapter?: PersistenceAdapter;
}>;

// The surface of the one current Mission Session while it reaches `ready` and
// once it is there. It renders the session that is actually stored: the Mission
// stays identifiable while the transition resolves, and the state it shows is
// the state storage confirmed, never one the interface assumed.
//
// Nothing here starts anything. There is no start action, no countdown and no
// completion, so the Mission cannot be committed to from this view; the
// **Start mission** action and the return to suggestions arrive with the
// operations they carry out.
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
  const mission = session
    ? resolveReviewedMission(session.missionId, state.language)
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
        />
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
