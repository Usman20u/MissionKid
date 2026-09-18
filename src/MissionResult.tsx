import {
  selectSessionAttempt,
  selectSessionIssue,
  useAppState,
} from './appState';
import { MISSION_CATALOG } from './catalogContent';
import {
  MISSION_CATEGORY_LABEL_KEYS,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import { deriveMonthlyGoal } from './missionProgress';
import { leaveMissionResult } from './missionSession';
import {
  persistenceAdapter,
  type CompletedMissionSession,
  type PersistenceAdapter,
} from './persistence';

const EXIT_MESSAGE_KEYS = {
  failed: 'result.exit.notCleared',
  unconfirmed: 'result.exit.unconfirmed',
} as const satisfies Readonly<Record<'failed' | 'unconfirmed', MessageKey>>;

// The completion moment in the family's own language. It is presentation only:
// the stored timestamp and the period identity it already fixed are never
// touched, so changing language changes what this reads, never what counts.
function completionContext(
  completedAt: number,
  language: SupportedLanguage,
): string {
  try {
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(completedAt));
  } catch {
    // A device without the locale data still gets a truthful date rather than
    // an empty card.
    return new Date(completedAt).toISOString().slice(0, 10);
  }
}

type MissionResultProps = Readonly<{
  adapter?: PersistenceAdapter;
  session: CompletedMissionSession;
}>;

// The Reward Card: short recognition of one completed Mission Session, derived
// entirely from that session and the static catalog. Nothing about it is stored
// as a card, a reward or a progress record — showing it again later derives it
// again from the same durable facts.
//
// It promises nothing, reveals nothing, ranks nobody and asks for no further
// interaction to keep the completion. The one action leads back to the core
// flow, and taking it clears only the pointer that says which result is open.
export function MissionResult({
  adapter = persistenceAdapter,
  session,
}: MissionResultProps) {
  const { dispatch, state } = useAppState();
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const issue = selectSessionIssue(state);
  const attempt = selectSessionAttempt(state);

  const mission = MISSION_CATALOG.find(
    (record) => record.missionId === session.missionId,
  );
  // A Mission the catalog no longer carries still completed, still counts and
  // is still shown. Only its reviewed wording is missing, so the approved
  // fallback stands in for the title rather than the card being withheld.
  const title =
    mission?.content[state.language].title ?? t('result.missionUnavailable');

  // Progress belongs to the period this completion itself fixed, never to a
  // month recomputed from the device's clock now. A later clock, timezone, age
  // or language change therefore cannot move this completion between periods.
  const progress = deriveMonthlyGoal(
    state.completedSessions ?? [],
    session.childProfileId,
    session.completionPeriodId,
  );

  function leave() {
    const result = leaveMissionResult(adapter, session.sessionId);

    switch (result.status) {
      case 'cleared':
      case 'resolved':
        dispatch({ type: 'mission-result-left' });
        return;
      // A newer result is open now; it is left exactly as it is.
      case 'superseded':
        dispatch({ type: 'mission-result-superseded', sessionId: result.sessionId });
        return;
      case 'not-cleared':
      case 'unavailable':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'result', outcome: 'failed' },
        });
        return;
      case 'unconfirmed':
        dispatch({
          type: 'mission-session-transition-failed',
          issue: { operation: 'result', outcome: 'unconfirmed' },
        });
        return;
    }
  }

  return (
    <div className="mission-result">
      <p className="mission-result__recognition">{t('result.recognition')}</p>
      <h2 className="mission-result__mission">{title}</h2>
      <p className="mission-result__meta">
        <span className="mission-result__category">
          {t(MISSION_CATEGORY_LABEL_KEYS[session.missionCategoryAtSelection])}
        </span>
        <span className="mission-result__completed">
          {t('result.completedOn')}{' '}
          {completionContext(session.completedAt, state.language)}
        </span>
      </p>
      <section className="mission-result__goal" aria-labelledby="result-goal-heading">
        <h3 className="mission-result__goal-heading" id="result-goal-heading">
          {t('result.goal.heading')}
        </h3>
        <p className="mission-result__goal-progress">
          {t('result.goal.progress')
            .replace('{done}', String(progress.displayedCount))
            .replace('{target}', String(progress.target))}
        </p>
        {/* The one encouraging message, and only for the completion that
            actually reached the target. It invites a reward the parent chooses
            and approves; MissionKid neither delivers nor promises one. */}
        {progress.goalCompletingSessionId === session.sessionId ? (
          <p className="mission-result__goal-complete">{t('result.goal.complete')}</p>
        ) : null}
      </section>
      {issue?.operation === 'result' ? (
        <p
          className="mission-result__issue"
          key={`result-${issue.outcome}-${attempt}`}
          role="alert"
        >
          {t(EXIT_MESSAGE_KEYS[issue.outcome])}
        </p>
      ) : null}
      <button className="button button--primary" onClick={leave} type="button">
        {t('result.action.next')}
      </button>
    </div>
  );
}
