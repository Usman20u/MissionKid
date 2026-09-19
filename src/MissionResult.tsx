import {
  Component,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
} from 'react';

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
import {
  completionPeriodLabel,
  deriveMonthlyGoal,
  type MonthlyGoalProgress,
} from './missionProgress';
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

type DeriveProgress = (
  completedSessions: readonly CompletedMissionSession[],
  childProfileId: string,
  completionPeriodId: string,
) => MonthlyGoalProgress;

type MissionResultProps = Readonly<{
  adapter?: PersistenceAdapter;
  session: CompletedMissionSession;
  // The derivation the card reads, injected like the adapter and the clock so a
  // test can drive the display-failure path at a real boundary. There is no
  // production switch: the default is the one derivation.
  deriveProgress?: DeriveProgress;
}>;

type MissionResultCardProps = MissionResultProps &
  Readonly<{
    // Where focus lands when a retry brings this card back. Restoration and a
    // first arrival never use it: the shell already owns focus for those.
    missionRef?: RefObject<HTMLHeadingElement | null>;
  }>;

// The Reward Card: short recognition of one completed Mission Session, derived
// entirely from that session and the static catalog. Nothing about it is stored
// as a card, a reward or a progress record — showing it again later derives it
// again from the same durable facts.
//
// It promises nothing, reveals nothing, ranks nobody and asks for no further
// interaction to keep the completion. The one action leads back to the core
// flow, and taking it clears only the pointer that says which result is open.
function MissionResultCard({
  adapter = persistenceAdapter,
  session,
  deriveProgress = deriveMonthlyGoal,
  missionRef,
}: MissionResultCardProps) {
  const { dispatch, state } = useAppState();
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const issue = selectSessionIssue(state);
  const attempt = selectSessionAttempt(state);

  const mission = MISSION_CATALOG.find(
    (record) => record.missionId === session.missionId,
  );
  // A Mission the catalog no longer carries still completed, still counts and
  // is still shown. Only its reviewed wording is missing, so the approved
  // fallback says so plainly in place of the title rather than leaving a bare
  // word that could be mistaken for the Mission's own name.
  const title =
    mission?.content[state.language].title ?? t('result.missionUnavailable');
  // The period this completion belongs to, named from the identity it fixed.
  // A card restored in a later month still names its own month rather than
  // calling that period "this month".
  const periodLabel = completionPeriodLabel(
    session.completionPeriodId,
    state.language,
  );

  // Progress belongs to the period this completion itself fixed, never to a
  // month recomputed from the device's clock now. A later clock, timezone, age
  // or language change therefore cannot move this completion between periods.
  const progress = deriveProgress(
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
      <h2 className="mission-result__mission" ref={missionRef} tabIndex={-1}>
        {title}
      </h2>
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
        <p className="mission-result__goal-period">{periodLabel}</p>
        <p className="mission-result__goal-progress">
          {t('result.goal.progress')
            .replace('{done}', String(progress.displayedCount))
            .replace('{target}', String(progress.target))}
        </p>
        {/* The one encouraging message, and only for the completion that
            actually reached the target. It invites a reward the parent chooses
            and approves; MissionKid neither delivers nor promises one. */}
        {progress.goalCompletingSessionId === session.sessionId ? (
          <p className="mission-result__goal-complete">
            {t('result.goal.complete').replace('{period}', periodLabel)}
          </p>
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

type ResultBoundaryProps = PropsWithChildren<{
  language: SupportedLanguage;
  onRetry: () => void;
  // Where focus lands when a retry fails the same way and this control is the
  // one the family still needs.
  retryRef?: RefObject<HTMLButtonElement | null>;
}>;

type ResultBoundaryState = { failed: boolean };

// A recovery boundary around the Reward Card alone. A completion is durable
// before anything here runs, so a card that cannot be derived or rendered is a
// display problem and nothing more: the completed record, its identity, its
// period and its place in the Monthly Goal are untouched, and the family is
// offered the same result again rather than the whole application failing.
//
// Retrying re-renders from the same durable facts. It repeats no completion
// operation, mints no identifier, moves no timestamp, recomputes no period and
// writes nothing at all.
class MissionResultBoundary extends Component<
  ResultBoundaryProps,
  ResultBoundaryState
> {
  state: ResultBoundaryState = { failed: false };

  static getDerivedStateFromError(): ResultBoundaryState {
    return { failed: true };
  }

  render(): ReactNode {
    const t = (key: MessageKey) => translateMessage(this.props.language, key);

    if (this.state.failed) {
      return (
        <div className="mission-result">
          <p className="mission-result__state" role="alert">
            {t('result.unavailable')}
          </p>
          <button
            className="button button--primary"
            onClick={() => {
              this.setState({ failed: false });
              this.props.onRetry();
            }}
            ref={this.props.retryRef}
            type="button"
          >
            {t('session.action.retry')}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// The Reward Card with the recovery its own display failure needs. The retry
// remounts the card from the durable facts it already had; nothing is re-read,
// re-derived from a different source, or written.
export function MissionResult(props: MissionResultProps) {
  const { state } = useAppState();
  const [attempt, setAttempt] = useState(0);
  const missionHeading = useRef<HTMLHeadingElement>(null);
  const retryControl = useRef<HTMLButtonElement>(null);
  const retried = useRef(false);

  // A retry unmounts the very control the family used, so focus has to be
  // placed deliberately or it falls to the document and their place is gone.
  // The restored card takes it on the Mission it names; a display that failed
  // again keeps it on the retry, beside the notice that was just announced.
  //
  // Only a retry moves focus. Restoring the result, changing language and an
  // ordinary rerender all leave it exactly where it was.
  useEffect(() => {
    if (!retried.current) {
      return;
    }

    retried.current = false;
    (missionHeading.current ?? retryControl.current)?.focus();
  }, [attempt]);

  return (
    <MissionResultBoundary
      key={attempt}
      language={state.language}
      onRetry={() => {
        retried.current = true;
        setAttempt((previous) => previous + 1);
      }}
      retryRef={retryControl}
    >
      <MissionResultCard {...props} missionRef={missionHeading} />
    </MissionResultBoundary>
  );
}
