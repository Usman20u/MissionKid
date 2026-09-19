import {
  Component,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
} from 'react';

import { useAppState } from './appState';
import { MISSION_CATALOG } from './catalogContent';
import {
  MISSION_CATEGORY_LABEL_KEYS,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import {
  completionContext,
  completionPeriodLabel,
  deriveMissionHistory,
  deriveMonthlyGoal,
  type MonthlyGoalProgress,
} from './missionProgress';
import {
  localCompletionPeriodId,
  readWallClock,
  type WallClock,
} from './missionSession';
import type { CompletedMissionSession } from './persistence';

type DeriveHistory = (
  completedSessions: readonly CompletedMissionSession[],
  childProfileId: string,
) => readonly CompletedMissionSession[];

type DeriveProgress = (
  completedSessions: readonly CompletedMissionSession[],
  childProfileId: string,
  completionPeriodId: string,
) => MonthlyGoalProgress;

type MissionHistoryProps = Readonly<{
  now?: WallClock;
  // The derivations this view reads, injected like the adapter and the clock so
  // a test can drive the display-failure path at a real boundary. There is no
  // production switch: the defaults are the one History and the one progress
  // derivation.
  deriveHistory?: DeriveHistory;
  deriveProgress?: DeriveProgress;
}>;

type MissionHistoryViewProps = MissionHistoryProps &
  Readonly<{
    // Where focus lands when a retry brings the record back. A first arrival
    // never uses it: the shell already owns focus for that.
    goalRef?: RefObject<HTMLHeadingElement | null>;
  }>;

// The local calendar day a completion belongs to, as `YYYY-MM-DD`. It is built
// from local parts for the same reason the completion period is: an ISO string
// names the UTC day, which is a different day at both ends of the world.
function localCalendarDay(completedAt: number): string {
  const moment = new Date(completedAt);
  const part = (value: number) => String(value).padStart(2, '0');

  return `${String(moment.getFullYear()).padStart(4, '0')}-${part(moment.getMonth() + 1)}-${part(moment.getDate())}`;
}

// One completed Mission Session, shown with exactly the approved minimum: the
// Mission's own title, the Mission Category the session recorded when it was
// chosen, and a localized completion context. No duration, no identifier, no
// score, no action.
function HistoryEntry({
  session,
  language,
}: Readonly<{ session: CompletedMissionSession; language: SupportedLanguage }>) {
  const t = (key: MessageKey) => translateMessage(language, key);
  const mission = MISSION_CATALOG.find(
    (record) => record.missionId === session.missionId,
  );

  return (
    <li className="mission-history__entry">
      {/* A Mission the catalog no longer carries still completed, still counts
          and still belongs here. Only its reviewed wording is missing, so the
          approved calm fallback stands in place of the title rather than a bare
          identifier or an invented name. */}
      <span className="mission-history__entry-title">
        {mission?.content[language].title ?? t('result.missionUnavailable')}
      </span>
      <span className="mission-history__entry-meta">
        {/* The Mission Category the session froze at selection, not one
            re-derived from a catalog that may have moved on. */}
        <span className="mission-history__entry-category">
          {t(MISSION_CATEGORY_LABEL_KEYS[session.missionCategoryAtSelection])}
        </span>
        {/* The family reads the localized date; assistive technology and the
            browser also get the unambiguous local calendar day behind it. The
            stored timestamp is not touched by either. */}
        <time
          className="mission-history__entry-completed"
          dateTime={localCalendarDay(session.completedAt)}
        >
          {t('result.completedOn')}{' '}
          {completionContext(session.completedAt, language)}
        </time>
      </span>
    </li>
  );
}

// The private record of completed Mission Sessions for the current Child
// Profile, with this local month's Monthly Goal progress above it.
//
// Everything here is derived from the completed sessions a validated snapshot
// already produced. Nothing is stored as a History entry, a counter or a
// navigation record, and opening, reading or leaving this view writes nothing
// at all.
function MissionHistoryView({
  now = readWallClock,
  deriveHistory = deriveMissionHistory,
  deriveProgress = deriveMonthlyGoal,
  goalRef,
}: MissionHistoryViewProps) {
  const { dispatch, state } = useAppState();
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const childProfileId = state.localProfileId ?? '';
  const completedSessions = state.completedSessions ?? [];

  // Every completion, in every period. Only the Monthly Goal below narrows to
  // one month.
  const entries = deriveHistory(completedSessions, childProfileId);
  // The month the family is in now, read from the clock on entry rather than
  // from any completion's fixed period. A Reward Card restored later still
  // names the period its own completion belongs to; this names today's.
  const currentPeriodId = localCompletionPeriodId(now());
  const progress = deriveProgress(
    completedSessions,
    childProfileId,
    currentPeriodId,
  );

  return (
    <div className="mission-history">
      <section
        aria-labelledby="history-goal-heading"
        className="mission-history__goal"
      >
        <h2
          className="mission-history__goal-heading"
          id="history-goal-heading"
          ref={goalRef}
          tabIndex={-1}
        >
          {t('result.goal.heading')}
        </h2>
        <p className="mission-history__goal-period">
          {completionPeriodLabel(currentPeriodId, state.language)}
        </p>
        <p className="mission-history__goal-progress">
          {t('result.goal.progress')
            .replace('{done}', String(progress.displayedCount))
            .replace('{target}', String(progress.target))}
        </p>
        {/* No goal-complete message here. That one encouraging message belongs
            to the twentieth completion's own Reward Card; repeating it on this
            surface would be the second prompt the specification forbids. */}
      </section>
      {entries.length > 0 ? (
        // The record is announced with the name the view already carries,
        // rather than as an unnamed list of items.
        <ul
          aria-labelledby="current-view-heading"
          className="mission-history__entries"
        >
          {entries.map((session) => (
            <HistoryEntry
              key={session.sessionId}
              language={state.language}
              session={session}
            />
          ))}
        </ul>
      ) : (
        // Nothing is fabricated here: no sample entry, no placeholder record
        // and no encouragement to fill the view.
        <p className="mission-history__empty">{t('history.empty.body')}</p>
      )}
      {/* The approved route back to Mission Category Selection, which is also
          the empty state's route. It is the same navigation the doorway offers,
          so no second destination is invented. */}
      <button
        className="button button--primary"
        onClick={() => dispatch({ type: 'discovery-opened' })}
        type="button"
      >
        {t('discovery.action.open')}
      </button>
    </div>
  );
}

type HistoryBoundaryProps = PropsWithChildren<{
  language: SupportedLanguage;
  onRetry: () => void;
  retryRef?: RefObject<HTMLButtonElement | null>;
}>;

type HistoryBoundaryState = { failed: boolean };

// A recovery boundary around the derived record alone. Every completion is
// durable before anything here runs, so a view that cannot be derived or
// rendered is a display problem and nothing more: the completed records, their
// identifiers, their timestamps and their period membership are untouched.
//
// Retrying re-derives from the same durable facts. It repeats no completion,
// mints no identifier, moves no timestamp, recomputes no stored period and
// writes nothing at all.
class MissionHistoryBoundary extends Component<
  HistoryBoundaryProps,
  HistoryBoundaryState
> {
  state: HistoryBoundaryState = { failed: false };

  static getDerivedStateFromError(): HistoryBoundaryState {
    return { failed: true };
  }

  render(): ReactNode {
    const t = (key: MessageKey) => translateMessage(this.props.language, key);

    if (this.state.failed) {
      return (
        <div className="mission-history">
          <p className="mission-history__state" role="alert">
            {t('history.unavailable')}
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

// The private record with the recovery its own display failure needs. The retry
// remounts it from the durable facts it already had; nothing is re-read from
// storage, re-derived from another source, or written.
export function MissionHistory(props: MissionHistoryProps) {
  const { state } = useAppState();
  const [attempt, setAttempt] = useState(0);
  const goalHeading = useRef<HTMLHeadingElement>(null);
  const retryControl = useRef<HTMLButtonElement>(null);
  const retried = useRef(false);

  // A retry unmounts the very control the family used, so focus has to be
  // placed deliberately or it falls to the document and their place is gone.
  // The restored record takes it; a display that failed again keeps it on the
  // retry, beside the notice that was just announced.
  useEffect(() => {
    if (!retried.current) {
      return;
    }

    retried.current = false;
    (goalHeading.current ?? retryControl.current)?.focus();
  }, [attempt]);

  return (
    <MissionHistoryBoundary
      key={attempt}
      language={state.language}
      onRetry={() => {
        retried.current = true;
        setAttempt((previous) => previous + 1);
      }}
      retryRef={retryControl}
    >
      <MissionHistoryView {...props} goalRef={goalHeading} />
    </MissionHistoryBoundary>
  );
}
