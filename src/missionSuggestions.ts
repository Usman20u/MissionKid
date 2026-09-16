import type { MissionRecord } from './catalog';
import {
  isEligibleForContext,
  selectValidMissions,
  type CoverageContext,
} from './catalogValidation';

// A successful discovery result is exactly three distinct Missions. A shorter
// pool yields the controlled unavailable result, never a partial set.
export const SUGGESTION_SET_SIZE = 3;

// One discovery context: one age band, one Mission Category, one UI language.
// The same shape the coverage guarantee is expressed in.
export type SuggestionContext = CoverageContext;

export type SuggestionSetResult =
  | Readonly<{ status: 'complete'; missions: readonly MissionRecord[] }>
  | Readonly<{ status: 'insufficient-content' }>;

// Locale-independent Unicode code-point comparison, as the ordering rule requires.
// `<` compares UTF-16 code units, which places supplementary-plane characters
// before U+E000..U+FFFF; iterating with Array.from walks whole code points, so a
// surrogate pair compares as the single character it encodes.
export function compareMissionIdentifiers(left: string, right: string): number {
  const leftPoints = Array.from(left);
  const rightPoints = Array.from(right);
  const shared = Math.min(leftPoints.length, rightPoints.length);

  for (let index = 0; index < shared; index += 1) {
    const leftPoint = leftPoints[index]!.codePointAt(0)!;
    const rightPoint = rightPoints[index]!.codePointAt(0)!;

    if (leftPoint !== rightPoint) {
      return leftPoint < rightPoint ? -1 : 1;
    }
  }

  if (leftPoints.length === rightPoints.length) return 0;

  return leftPoints.length < rightPoints.length ? -1 : 1;
}

// Ascending `catalogOrder`, then ascending stable Mission identifier. Duplicate
// order values are permitted, so the identifier is the exact tie-breaker.
function compareMissions(left: MissionRecord, right: MissionRecord): number {
  return (
    left.catalogOrder - right.catalogOrder ||
    compareMissionIdentifiers(left.missionId, right.missionId)
  );
}

// Eligibility is Task 3's rule, unchanged: exact Mission Category, approval for
// the whole selected age band, and complete content in the selected language.
// Nothing here relaxes it, mixes languages, or substitutes content.
export function selectEligibleMissions(
  records: readonly unknown[],
  context: SuggestionContext,
): readonly MissionRecord[] {
  return selectValidMissions(records)
    .filter((mission) => isEligibleForContext(mission, context))
    .slice()
    .sort(compareMissions);
}

// The first set is the first three eligible records in that deterministic order.
export function deriveSuggestionSet(
  records: readonly unknown[],
  context: SuggestionContext,
): SuggestionSetResult {
  const eligible = selectEligibleMissions(records, context);

  return eligible.length < SUGGESTION_SET_SIZE
    ? { status: 'insufficient-content' }
    : { status: 'complete', missions: eligible.slice(0, SUGGESTION_SET_SIZE) };
}
