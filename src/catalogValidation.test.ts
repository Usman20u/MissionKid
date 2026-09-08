// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { AGE_BANDS, type AgeBand } from './ageBands';
import { MISSION_CATEGORIES, type MissionCategory, type MissionRecord } from './catalog';
import { MISSION_CATALOG } from './catalogContent';
import {
  MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT,
  selectValidMissions,
  validateCatalogForPublication,
  type CoverageCount,
} from './catalogValidation';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './localization';

const CONTEXT_COUNT = AGE_BANDS.length * MISSION_CATEGORIES.length * SUPPORTED_LANGUAGES.length;

function localized(language: SupportedLanguage) {
  return { title: `Title fixture (${language})`, instruction: `Instruction fixture (${language})` };
}

// Synthetic fixtures only; production Mission content is never edited by tests.
function createMission(
  missionId: string,
  category: MissionCategory,
  ageBands: readonly AgeBand[] = AGE_BANDS,
): MissionRecord {
  return {
    missionId,
    category,
    ageBands,
    durationSeconds: 180,
    content: { en: localized('en'), de: localized('de'), ru: localized('ru') },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: false,
    catalogOrder: 0,
    contentVersion: 'test-version-1',
    reviewed: true,
    discoveryEligible: true,
  };
}

// The smallest catalog satisfying the publication contract: the minimum number of
// Missions per category, each approved for every age band.
function createCompleteCatalog(): MissionRecord[] {
  return MISSION_CATEGORIES.flatMap((category, categoryIndex) =>
    Array.from({ length: MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT }, (_unused, n) =>
      createMission(`mission-${categoryIndex}-${n}`, category),
    ),
  );
}

function keyOf(context: CoverageCount): string {
  return `${context.ageBand}|${context.category}|${context.language}`;
}

function deepFreeze(value: unknown): void {
  if (value !== null && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
}

describe('production catalog publication gate', () => {
  it('publishes the bundled production catalog', () => {
    const result = validateCatalogForPublication(MISSION_CATALOG);

    expect(result.invalidRecords).toEqual([]);
    expect(result.deficientContexts).toEqual([]);
    expect(result.status).toBe('publishable');
  });

  it('evaluates every age band, Mission Category and UI language context', () => {
    const { coverage } = validateCatalogForPublication(MISSION_CATALOG);

    expect(coverage).toHaveLength(CONTEXT_COUNT);
    expect(new Set(coverage.map(keyOf)).size).toBe(CONTEXT_COUNT);
    for (const context of coverage) {
      expect(context.eligibleCount).toBeGreaterThanOrEqual(MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT);
    }
  });

  it('reports one count per language of a cell, because a valid record carries all three', () => {
    const { coverage } = validateCatalogForPublication(MISSION_CATALOG);

    for (const ageBand of AGE_BANDS) {
      for (const category of MISSION_CATEGORIES) {
        const counts = coverage
          .filter((context) => context.ageBand === ageBand && context.category === category)
          .map((context) => context.eligibleCount);
        expect(counts).toHaveLength(SUPPORTED_LANGUAGES.length);
        expect(new Set(counts).size).toBe(1);
      }
    }
  });
});

describe('coverage deficiency', () => {
  it('blocks publication when one age band of one category falls below the minimum', () => {
    const catalog = createCompleteCatalog();
    const target = catalog[0]!;
    catalog[0] = { ...target, ageBands: ['7–8', '9–10'] };

    const result = validateCatalogForPublication(catalog);

    expect(result.status).toBe('blocked');
    expect(result.invalidRecords).toEqual([]);
    expect(result.deficientContexts.map(keyOf)).toEqual(
      SUPPORTED_LANGUAGES.map((language) => `4–6|${target.category}|${language}`),
    );
    expect(result.deficientContexts.map((context) => context.eligibleCount)).toEqual(
      SUPPORTED_LANGUAGES.map(() => MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT - 1),
    );
  });

  it('blocks publication when a whole Mission Category falls below the minimum', () => {
    const catalog = createCompleteCatalog();
    const removed = catalog.findIndex((mission) => mission.category === 'Calm');
    catalog.splice(removed, 1);

    const result = validateCatalogForPublication(catalog);

    expect(result.status).toBe('blocked');
    expect(result.deficientContexts).toHaveLength(AGE_BANDS.length * SUPPORTED_LANGUAGES.length);
    expect(result.deficientContexts.every((context) => context.category === 'Calm')).toBe(true);
    expect(
      result.coverage
        .filter((context) => context.category !== 'Calm')
        .every((context) => context.eligibleCount >= MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT),
    ).toBe(true);
  });

  it('cannot produce a language-only deficiency, because incomplete localization invalidates the record', () => {
    const catalog = createCompleteCatalog();
    const target = catalog[0]!;
    catalog[0] = {
      ...target,
      content: { ...target.content, ru: { ...target.content.ru, instruction: '   ' } },
    };

    const result = validateCatalogForPublication(catalog);

    // Task 1 rejects the whole record, so the shortfall reaches every language of
    // the affected cells rather than Russian alone.
    expect(result.status).toBe('blocked');
    expect(result.invalidRecords).toEqual([{ index: 0, missionId: target.missionId }]);
    const affected = result.deficientContexts.filter(
      (context) => context.category === target.category,
    );
    expect(affected).toHaveLength(AGE_BANDS.length * SUPPORTED_LANGUAGES.length);
    expect(new Set(affected.map((context) => context.language))).toEqual(
      new Set(SUPPORTED_LANGUAGES),
    );
  });
});

describe('invalid records', () => {
  it('blocks publication for a structurally invalid record and excludes it at runtime', () => {
    const catalog: unknown[] = createCompleteCatalog();
    catalog.push({ ...createMission('broken-1', 'Learning'), durationSeconds: 0 });

    const result = validateCatalogForPublication(catalog);

    expect(result.status).toBe('blocked');
    expect(result.invalidRecords).toEqual([{ index: catalog.length - 1, missionId: 'broken-1' }]);

    const runtime = selectValidMissions(catalog);
    expect(runtime.map((mission) => mission.missionId)).not.toContain('broken-1');
    expect(runtime).toHaveLength(catalog.length - 1);
  });

  it('identifies a record too malformed to carry an identifier', () => {
    const catalog: unknown[] = createCompleteCatalog();
    catalog.push({ notAMission: true });

    const result = validateCatalogForPublication(catalog);

    expect(result.invalidRecords).toEqual([{ index: catalog.length - 1, missionId: null }]);
    expect(selectValidMissions(catalog)).toHaveLength(catalog.length - 1);
  });

  it('excludes every record sharing a duplicate identifier', () => {
    const catalog: MissionRecord[] = createCompleteCatalog();
    const shared = catalog[0]!.missionId;
    catalog.push(createMission(shared, 'Learning'));

    const result = validateCatalogForPublication(catalog);

    expect(result.status).toBe('blocked');
    expect(result.invalidRecords).toEqual([
      { index: 0, missionId: shared },
      { index: catalog.length - 1, missionId: shared },
    ]);

    const runtime = selectValidMissions(catalog);
    expect(runtime.some((mission) => mission.missionId === shared)).toBe(false);
    expect(runtime).toHaveLength(catalog.length - 2);
    expect(new Set(runtime.map((mission) => mission.missionId)).size).toBe(runtime.length);
  });

  it('allows duplicate catalogOrder values', () => {
    const catalog = createCompleteCatalog().map((mission) => ({ ...mission, catalogOrder: 0 }));

    expect(validateCatalogForPublication(catalog).status).toBe('publishable');
  });
});

describe('purity and determinism', () => {
  it('does not mutate its input and returns the same result for the same input', () => {
    const catalog = createCompleteCatalog();
    deepFreeze(catalog);

    const first = validateCatalogForPublication(catalog);
    const second = validateCatalogForPublication(catalog);

    expect(first).toEqual(second);
    expect(selectValidMissions(catalog)).toEqual(selectValidMissions(catalog));
    expect(catalog).toHaveLength(
      MISSION_CATEGORIES.length * MINIMUM_ELIGIBLE_MISSIONS_PER_CONTEXT,
    );
  });

  it('leaves the production catalog untouched', () => {
    const before = MISSION_CATALOG.map((mission) => mission.missionId);

    validateCatalogForPublication(MISSION_CATALOG);
    selectValidMissions(MISSION_CATALOG);

    expect(MISSION_CATALOG.map((mission) => mission.missionId)).toEqual(before);
  });

  it('preserves input order in the defensive runtime subset', () => {
    const catalog = createCompleteCatalog();

    expect(selectValidMissions(catalog).map((mission) => mission.missionId)).toEqual(
      catalog.map((mission) => mission.missionId),
    );
  });
});
