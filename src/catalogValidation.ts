import { AGE_BANDS, type AgeBand } from './ageBands';
import {
  MISSION_CATEGORIES,
  validateMissionRecords,
  type AdultInvolvement,
  type MissionCategory,
  type MissionRecord,
} from './catalog';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './localization';

// Publication requires at least three eligible Missions per context so the first
// suggestion set can be filled without relaxing eligibility. A catalog may hold
// more; only this minimum is a requirement.
export const MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT = 3;

const NO_ADULT_ASSISTANCE: AdultInvolvement = 'No special adult assistance required';

export type CoverageContext = Readonly<{
  ageBand: AgeBand;
  category: MissionCategory;
  language: SupportedLanguage;
}>;

export type CoverageCount = Readonly<CoverageContext & { eligibleCount: number }>;

// `missionId` is null when the record is too malformed to carry one; `index`
// always identifies the offending input position.
export type InvalidCatalogRecord = Readonly<{ index: number; missionId: string | null }>;

export type CatalogPublicationResult = Readonly<{
  status: 'publishable' | 'blocked';
  invalidRecords: readonly InvalidCatalogRecord[];
  deficientContexts: readonly CoverageCount[];
  coverage: readonly CoverageCount[];
}>;

// Iteration follows the canonical constants, so every result is ordered
// deterministically without locale-sensitive comparison.
function coverageContexts(): readonly CoverageContext[] {
  const contexts: CoverageContext[] = [];
  for (const ageBand of AGE_BANDS) {
    for (const category of MISSION_CATEGORIES) {
      for (const language of SUPPORTED_LANGUAGES) {
        contexts.push({ ageBand, category, language });
      }
    }
  }
  return contexts;
}

function isPresent(value: string | undefined): boolean {
  return value !== undefined && value.trim().length > 0;
}

// Eligibility for one context, as defined by F002: exact Mission Category, approval
// for the whole age band, and complete content in that UI language. The localized
// content is examined per language rather than inferred from record validity,
// because the specification states coverage in UI-language terms.
function isEligibleForContext(mission: MissionRecord, context: CoverageContext): boolean {
  if (!mission.reviewed || !mission.discoveryEligible) return false;
  if (mission.category !== context.category) return false;
  if (!mission.ageBands.includes(context.ageBand)) return false;

  const content = mission.content[context.language];
  if (content === undefined) return false;

  return (
    isPresent(content.title) &&
    isPresent(content.instruction) &&
    (!mission.safetyNoteRequired || isPresent(content.safetyNote)) &&
    (mission.adultInvolvement === NO_ADULT_ASSISTANCE || isPresent(content.adultInvolvementNote))
  );
}

function measureCoverage(missions: readonly MissionRecord[]): readonly CoverageCount[] {
  return coverageContexts().map((context) => ({
    ...context,
    eligibleCount: missions.filter((mission) => isEligibleForContext(mission, context)).length,
  }));
}

function readMissionId(value: unknown): string | null {
  if (typeof value !== 'object' || value === null || !('missionId' in value)) return null;
  const { missionId } = value as { missionId: unknown };
  return typeof missionId === 'string' ? missionId : null;
}

// Defensive runtime filtering. Task 1 owns record validity, including the rule that
// duplicate identifiers invalidate every record sharing them, so this keeps only
// records it accepts and never repairs, substitutes or duplicates anything.
// Input order is preserved.
export function selectValidMissions(records: readonly unknown[]): readonly MissionRecord[] {
  return validateMissionRecords(records).flatMap((result) =>
    result.status === 'valid' ? [result.mission] : [],
  );
}

// Publication readiness. Blocked by any invalid record — a duplicate identifier
// invalidates every record sharing it — or by any context below the minimum.
// Unlike runtime filtering, an invalid record is a release defect, not something
// to quietly drop.
export function validateCatalogForPublication(
  records: readonly unknown[],
): CatalogPublicationResult {
  const results = validateMissionRecords(records);

  const invalidRecords = results.flatMap((result, index) =>
    result.status === 'valid' ? [] : [{ index, missionId: readMissionId(records[index]) }],
  );

  const coverage = measureCoverage(
    results.flatMap((result) => (result.status === 'valid' ? [result.mission] : [])),
  );
  const deficientContexts = coverage.filter(
    (context) => context.eligibleCount < MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT,
  );

  return {
    status:
      invalidRecords.length === 0 && deficientContexts.length === 0 ? 'publishable' : 'blocked',
    invalidRecords,
    deficientContexts,
    coverage,
  };
}
