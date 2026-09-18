import type { CompletedMissionSession } from './persistence';

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
