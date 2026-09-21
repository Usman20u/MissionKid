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

// The largest delay a browser timer can hold. Beyond it the value overflows its
// signed 32-bit field and the callback runs at once, which would turn a wait for
// a distant month boundary into a busy loop, so a longer wait is taken in hops
// of this size and re-read against the clock at each one. A local calendar month
// is longer than this, so the record opened on the first moment of a long month
// is exactly the case that needs it.
const LONGEST_TIMEOUT_MILLISECONDS = 2_147_483_647;

// The first moment of the next local calendar month. It is built from local
// calendar parts for the same reason the period identity is: the month is the
// family's own, and an hour added or removed by daylight saving must not move
// where it begins.
function startOfNextLocalMonth(moment: number): number {
  const from = new Date(moment);

  return new Date(from.getFullYear(), from.getMonth() + 1, 1).getTime();
}

// The local month the family is in, kept current while the record stays open.
//
// The period is still read from the clock and never from a stored record; this
// only decides when to read it again. Once at the moment the next local month
// begins, so a family sitting on the record at midnight sees the new month
// without leaving and returning — and once whenever they come back to a page
// that was hidden or suspended, because a frozen tab's scheduled callback
// cannot be relied on to have fired while it slept.
//
// Both paths re-read the same injected clock and write nothing. Where the month
// has not actually turned the value is unchanged and nothing re-renders, so the
// record never ticks and nothing on it counts down.
//
// Every reading that is shown is also the one the next check is measured from.
// The first render has to seed the state from its own reading, and the clock can
// have crossed a month boundary by the time effects run, so the effect refreshes
// from a single fresh reading rather than only scheduling from it: otherwise the
// month on screen and the month the wait was measured from can disagree, leaving
// the record on the month that has just ended until the month after the current
// one begins.
function useCurrentLocalPeriod(now: WallClock): string {
  const [periodId, setPeriodId] = useState(() => localCompletionPeriodId(now()));
  // Read the clock at the moment something fires rather than when the effect was
  // set up, so a later return reads what is current instead of what this closure
  // happened to capture.
  const readClock = useRef(now);
  readClock.current = now;

  useEffect(() => {
    let scheduled: ReturnType<typeof setTimeout> | undefined;

    function schedule(from: number) {
      // One pending callback at a time: a return that re-reads the clock also
      // re-measures the wait, and the earlier one is no longer the right moment.
      clearTimeout(scheduled);

      const wait = Math.max(startOfNextLocalMonth(from) - from, 0);

      scheduled = setTimeout(
        refresh,
        Math.min(wait, LONGEST_TIMEOUT_MILLISECONDS),
      );
    }

    function refresh() {
      const moment = readClock.current();

      setPeriodId(localCompletionPeriodId(moment));
      schedule(moment);
    }

    // Both events can arrive for one return, and either can arrive repeatedly.
    // Each only re-reads the clock, so no number of them changes anything but
    // the moment the next check is due.
    function onReturn() {
      if (document.visibilityState !== 'hidden') {
        refresh();
      }
    }

    // One reading for both the period shown and the wait measured from it.
    // Where the month has not turned since the first render this sets the state
    // it already holds, which React drops without re-rendering.
    refresh();
    document.addEventListener('visibilitychange', onReturn);
    window.addEventListener('focus', onReturn);

    return () => {
      clearTimeout(scheduled);
      document.removeEventListener('visibilitychange', onReturn);
      window.removeEventListener('focus', onReturn);
    };
  }, []);

  return periodId;
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
  // The month the family is in now, read from the clock rather than from any
  // completion's fixed period, and kept current while the record stays open. A
  // Reward Card restored later still names the period its own completion
  // belongs to; this names today's.
  const currentPeriodId = useCurrentLocalPeriod(now);
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
