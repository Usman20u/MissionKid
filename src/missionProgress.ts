import type { SupportedLanguage } from './localization';
import type { CompletedMissionSession } from './persistence';

const PERIOD_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

// The stored period, named in the family's language. It is read from the
// identity the completion already fixed and formatted in UTC on the first of
// that month, so no device timezone can shift the label into a neighbouring
// month the way a local reading of a stored instant could.
//
// A card restored in a later month therefore still names the month its
// completion belongs to, rather than calling that period "this month".
export function completionPeriodLabel(
  completionPeriodId: string,
  language: SupportedLanguage,
): string {
  const parts = PERIOD_PATTERN.exec(completionPeriodId);

  if (parts === null) {
    return completionPeriodId;
  }

  try {
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(Number(parts[1]), Number(parts[2]) - 1, 1)));
  } catch {
    // A device without the locale data still names the period truthfully.
    return completionPeriodId;
  }
}

// The completion moment in the family's own language. It is presentation only:
// the stored timestamp and the period identity it already fixed are never
// touched, so changing language changes what this reads, never what counts.
export function completionContext(
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

// The fixed MVP target for one Child Profile in one monthly goal period.
export const MONTHLY_GOAL_TARGET = 20;

export type MonthlyGoalProgress = Readonly<{
  // Every unique valid completion in the period, including any beyond the
  // target. Kept separate from what is displayed so that later completions are
  // preserved rather than lost behind the cap.
  completedCount: number;
  // What the family sees, never above the target.
  displayedCount: number;
  target: number;
  goalComplete: boolean;
  // The completion that took the period to its target, or null before that.
  // Only this one carries the single goal-complete message, so the twenty-first
  // and later completions create no second prompt.
  goalCompletingSessionId: string | null;
}>;

// Ordering that cannot change with the family's language or device locale:
// completion moment first, then the stable identifier compared by code unit.
// `localeCompare` is deliberately not used — it would make which completion is
// the twentieth depend on the interface language.
function byCompletionOrder(
  first: CompletedMissionSession,
  second: CompletedMissionSession,
): number {
  if (first.completedAt !== second.completedAt) {
    return first.completedAt - second.completedAt;
  }

  if (first.sessionId === second.sessionId) return 0;

  return first.sessionId < second.sessionId ? -1 : 1;
}

// The private Mission History for one Child Profile: every completed Mission
// Session it holds, in every period, newest first.
//
// It reads the completed sessions a validated snapshot already produced, so the
// record-level trust rules that coalesced identical duplicates and excluded
// conflicting copies are the ones that decide what appears here; this adds no
// second policy and only guards against listing one identifier twice.
//
// The order is `byCompletionOrder` read backwards, so the comparator that
// decides which completion is the twentieth is the same one that decides what
// is newest. Reversing it rather than writing a second comparator is what keeps
// the two from ever disagreeing. Nothing is written, nothing is counted, and
// the collection it is given is never sorted in place.
export function deriveMissionHistory(
  completedSessions: readonly CompletedMissionSession[],
  childProfileId: string,
): readonly CompletedMissionSession[] {
  const listed = new Map<string, CompletedMissionSession>();

  for (const session of completedSessions) {
    if (session.childProfileId === childProfileId && !listed.has(session.sessionId)) {
      listed.set(session.sessionId, session);
    }
  }

  return [...listed.values()].sort(
    (first, second) => -byCompletionOrder(first, second),
  );
}

// Monthly Goal progress, derived and never stored. It reads the completed
// sessions a validated snapshot already produced, so the record-level trust
// rules that coalesced identical duplicates and excluded conflicting copies are
// the ones that decide what counts here; this adds no second policy of its own
// and only guards against counting one identifier twice.
//
// The period is the identity the completion itself fixed, not one recomputed
// from a later clock, so a device whose timezone or date changes afterwards
// cannot move a completion into another month.
//
// Nothing is written: no counter, no goal record, no prompt-seen flag, no reward
// record and no second collection of what the completed sessions already are.
export function deriveMonthlyGoal(
  completedSessions: readonly CompletedMissionSession[],
  childProfileId: string,
  completionPeriodId: string,
): MonthlyGoalProgress {
  const counted = new Map<string, CompletedMissionSession>();

  for (const session of completedSessions) {
    // A Mission repeated at another time is another Mission Session and counts
    // again; one Mission Session counts once, whatever it is a copy of.
    if (
      session.childProfileId === childProfileId &&
      session.completionPeriodId === completionPeriodId &&
      !counted.has(session.sessionId)
    ) {
      counted.set(session.sessionId, session);
    }
  }

  const completedCount = counted.size;
  const goalComplete = completedCount >= MONTHLY_GOAL_TARGET;
  // Which completion reached the target is decided by the deterministic order,
  // so the same set of records always names the same one.
  const goalCompletingSessionId = goalComplete
    ? [...counted.values()].sort(byCompletionOrder)[MONTHLY_GOAL_TARGET - 1]!
        .sessionId
    : null;

  return {
    completedCount,
    displayedCount: Math.min(completedCount, MONTHLY_GOAL_TARGET),
    target: MONTHLY_GOAL_TARGET,
    goalComplete,
    goalCompletingSessionId,
  };
}
