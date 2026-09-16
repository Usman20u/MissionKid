// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { AGE_BANDS, type AgeBand } from './ageBands';
import { MISSION_CATEGORIES, type MissionCategory, type MissionRecord } from './catalog';
import { MISSION_CATALOG } from './catalogContent';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './localization';
import { resolveMissionScene, resolveSceneFocus, SUBJECT_ELEMENTS } from './missionScenes';
import {
  compareMissionIdentifiers,
  deriveSuggestionSet,
  selectEligibleMissions,
  SUGGESTION_SET_SIZE,
  type SuggestionContext,
} from './missionSuggestions';

function localized(language: SupportedLanguage) {
  return { title: `Title (${language})`, instruction: `Instruction (${language})` };
}

function createMission(
  missionId: string,
  overrides: Partial<MissionRecord> = {},
): MissionRecord {
  return {
    missionId,
    category: 'Movement',
    ageBands: AGE_BANDS,
    durationSeconds: 180,
    content: { en: localized('en'), de: localized('de'), ru: localized('ru') },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: false,
    catalogOrder: 0,
    contentVersion: 'test-version-1',
    reviewed: true,
    discoveryEligible: true,
    ...overrides,
  };
}

const context = (overrides: Partial<SuggestionContext> = {}): SuggestionContext => ({
  ageBand: '7–8',
  category: 'Movement',
  language: 'en',
  ...overrides,
});

function ids(result: ReturnType<typeof deriveSuggestionSet>): readonly string[] {
  return result.status === 'complete' ? result.missions.map((m) => m.missionId) : [];
}

describe('Unicode code-point identifier ordering', () => {
  it('orders by code point, where UTF-16 code units would disagree', () => {
    // U+FFFD is one code unit; U+10000 is the surrogate pair D800 DC00.
    // By code point U+FFFD (65533) precedes U+10000 (65536); by code unit the
    // lead surrogate D800 (55296) makes the comparison come out the other way.
    const replacement = '�';
    const supplementary = '\u{10000}';

    expect(compareMissionIdentifiers(replacement, supplementary)).toBeLessThan(0);
    expect(replacement < supplementary).toBe(false);
    expect([supplementary, replacement].sort(compareMissionIdentifiers)).toEqual([
      replacement,
      supplementary,
    ]);
  });

  it('is a consistent total order on ordinary identifiers', () => {
    expect(compareMissionIdentifiers('mission-1', 'mission-2')).toBeLessThan(0);
    expect(compareMissionIdentifiers('mission-2', 'mission-1')).toBeGreaterThan(0);
    expect(compareMissionIdentifiers('mission-1', 'mission-1')).toBe(0);
    // A prefix sorts before its extension.
    expect(compareMissionIdentifiers('mission', 'mission-1')).toBeLessThan(0);
  });

  it('never consults the host locale', () => {
    // localeCompare would place these differently under some collations; the
    // comparator must follow code points only.
    expect(compareMissionIdentifiers('a', 'B')).toBeGreaterThan(0);
    expect('a'.charCodeAt(0)).toBeGreaterThan('B'.charCodeAt(0));
  });
});

describe('eligibility', () => {
  it.each(AGE_BANDS)('includes a Mission approved for age band %s', (ageBand: AgeBand) => {
    const catalog = [createMission('m-1', { ageBands: [ageBand] })];

    expect(selectEligibleMissions(catalog, context({ ageBand })).map((m) => m.missionId)).toEqual([
      'm-1',
    ]);
    for (const other of AGE_BANDS.filter((band) => band !== ageBand)) {
      expect(selectEligibleMissions(catalog, context({ ageBand: other }))).toEqual([]);
    }
  });

  it.each(MISSION_CATEGORIES)('never mixes another Mission Category into %s', (category) => {
    const catalog = MISSION_CATEGORIES.map((c) => createMission(`m-${c}`, { category: c }));

    const eligible = selectEligibleMissions(catalog, context({ category }));

    expect(eligible).toHaveLength(1);
    expect(eligible[0]!.category).toBe(category);
  });

  it('excludes a Mission whose selected language content is missing', () => {
    const broken = createMission('m-1');
    const catalog = [
      { ...broken, content: { ...broken.content, ru: { title: 'Заголовок', instruction: '   ' } } },
      createMission('m-2'),
    ];

    // Incomplete localization invalidates the record, so it is absent in every
    // language, and the intact Mission beside it stays eligible.
    for (const language of SUPPORTED_LANGUAGES) {
      expect(
        selectEligibleMissions(catalog, context({ language })).map((m) => m.missionId),
      ).toEqual(['m-2']);
    }
  });

  it('excludes invalid records through the runtime contract', () => {
    const catalog: unknown[] = [
      createMission('good-1'),
      { ...createMission('bad-1'), durationSeconds: 0 },
      { notAMission: true },
    ];

    expect(selectEligibleMissions(catalog, context()).map((m) => m.missionId)).toEqual(['good-1']);
  });

  it('excludes every record sharing a duplicate identifier', () => {
    const catalog = [
      createMission('shared'),
      createMission('shared', { catalogOrder: 5 }),
      createMission('unique'),
    ];

    expect(selectEligibleMissions(catalog, context()).map((m) => m.missionId)).toEqual(['unique']);
  });

  it('excludes Missions withdrawn from discovery or not reviewed', () => {
    const catalog: unknown[] = [
      { ...createMission('withdrawn'), discoveryEligible: false },
      { ...createMission('unreviewed'), reviewed: false },
      createMission('offered'),
    ];

    expect(selectEligibleMissions(catalog, context()).map((m) => m.missionId)).toEqual(['offered']);
  });
});

describe('deterministic ordering', () => {
  it('orders by ascending catalogOrder', () => {
    const catalog = [
      createMission('c', { catalogOrder: 30 }),
      createMission('a', { catalogOrder: 10 }),
      createMission('b', { catalogOrder: 20 }),
    ];

    expect(selectEligibleMissions(catalog, context()).map((m) => m.missionId)).toEqual([
      'a',
      'b',
      'c',
    ]);
  });

  it('breaks equal catalogOrder by code-point identifier, not input order', () => {
    const catalog = [
      createMission('m-c', { catalogOrder: 10 }),
      createMission('m-a', { catalogOrder: 10 }),
      createMission('m-b', { catalogOrder: 10 }),
    ];

    expect(selectEligibleMissions(catalog, context()).map((m) => m.missionId)).toEqual([
      'm-a',
      'm-b',
      'm-c',
    ]);
  });

  it('applies the code-point tie-breaker to supplementary-plane identifiers', () => {
    const catalog = [
      createMission('\u{10000}', { catalogOrder: 10 }),
      createMission('�', { catalogOrder: 10 }),
    ];

    expect(selectEligibleMissions(catalog, context()).map((m) => m.missionId)).toEqual([
      '�',
      '\u{10000}',
    ]);
  });

  it('returns the same order on repeated calls', () => {
    const catalog = [
      createMission('m-b', { catalogOrder: 10 }),
      createMission('m-a', { catalogOrder: 10 }),
      createMission('m-c', { catalogOrder: 5 }),
    ];

    const first = selectEligibleMissions(catalog, context()).map((m) => m.missionId);
    const second = selectEligibleMissions(catalog, context()).map((m) => m.missionId);

    expect(first).toEqual(second);
  });
});

describe('exactly-three derivation', () => {
  it('returns the first three eligible records in deterministic order', () => {
    const catalog = [40, 10, 30, 20, 50].map((order) =>
      createMission(`m-${order}`, { catalogOrder: order }),
    );

    const result = deriveSuggestionSet(catalog, context());

    expect(result.status).toBe('complete');
    expect(ids(result)).toEqual(['m-10', 'm-20', 'm-30']);
  });

  it('returns exactly three distinct Missions', () => {
    const catalog = Array.from({ length: 8 }, (_unused, index) =>
      createMission(`m-${index}`, { catalogOrder: index }),
    );

    const result = deriveSuggestionSet(catalog, context());

    expect(result.status).toBe('complete');
    expect(ids(result)).toHaveLength(SUGGESTION_SET_SIZE);
    expect(new Set(ids(result)).size).toBe(SUGGESTION_SET_SIZE);
  });

  it.each([0, 1, 2])('returns the insufficient-content result for a pool of %i', (size) => {
    const catalog = Array.from({ length: size }, (_unused, index) =>
      createMission(`m-${index}`, { catalogOrder: index }),
    );

    const result = deriveSuggestionSet(catalog, context());

    expect(result).toEqual({ status: 'insufficient-content' });
    expect(ids(result)).toEqual([]);
  });

  it('never pads a short pool by relaxing the context', () => {
    // Two eligible for 7–8; a third exists but only for 9–10.
    const catalog = [
      createMission('m-1', { ageBands: ['7–8'], catalogOrder: 10 }),
      createMission('m-2', { ageBands: ['7–8'], catalogOrder: 20 }),
      createMission('m-3', { ageBands: ['9–10'], catalogOrder: 30 }),
    ];

    expect(deriveSuggestionSet(catalog, context()).status).toBe('insufficient-content');
  });
});

describe('purity', () => {
  it('does not mutate the input catalog or its order', () => {
    const catalog = [
      createMission('m-c', { catalogOrder: 30 }),
      createMission('m-a', { catalogOrder: 10 }),
      createMission('m-b', { catalogOrder: 20 }),
    ];
    const before = catalog.map((m) => m.missionId);
    Object.freeze(catalog);

    deriveSuggestionSet(catalog, context());
    selectEligibleMissions(catalog, context());

    expect(catalog.map((m) => m.missionId)).toEqual(before);
  });

  it('leaves the production catalog untouched', () => {
    const before = MISSION_CATALOG.map((m) => m.missionId);

    for (const category of MISSION_CATEGORIES) {
      deriveSuggestionSet(MISSION_CATALOG, context({ category }));
    }

    expect(MISSION_CATALOG.map((m) => m.missionId)).toEqual(before);
  });
});

// Bounded replacement advances through the same deterministic order the first
// set came from. Nothing here is a second suggestion algorithm: every case below
// calls the one derivation with a growing set of shown identifiers.
describe('bounded replacement', () => {
  const pool = (count: number) =>
    Array.from({ length: count }, (_, index) =>
      createMission(`movement-${String(index + 1).padStart(2, '0')}`, {
        catalogOrder: (index + 1) * 10,
      }),
    );

  function advance(records: readonly MissionRecord[], times: number) {
    const shown: string[] = [];
    const sets: (readonly string[])[] = [];

    for (let step = 0; step <= times; step += 1) {
      const result = deriveSuggestionSet(records, context(), shown);
      if (result.status !== 'complete') break;
      sets.push(result.missions.map((mission) => mission.missionId));
      if (!result.anotherSetAvailable) break;
      shown.push(...result.missions.map((mission) => mission.missionId));
    }

    return sets;
  }

  it('keeps the first set as the first three in deterministic order', () => {
    const records = pool(9);

    expect(ids(deriveSuggestionSet(records, context()))).toEqual([
      'movement-01', 'movement-02', 'movement-03',
    ]);
    expect(ids(deriveSuggestionSet(records, context(), []))).toEqual([
      'movement-01', 'movement-02', 'movement-03',
    ]);
  });

  it('advances to the next complete unseen group', () => {
    const records = pool(9);
    const shown = ['movement-01', 'movement-02', 'movement-03'];

    expect(ids(deriveSuggestionSet(records, context(), shown))).toEqual([
      'movement-04', 'movement-05', 'movement-06',
    ]);
  });

  it('never shows a Mission twice while a full unseen group remains', () => {
    const sets = advance(pool(9), 5);

    expect(sets).toHaveLength(3);
    const seen = sets.flat();
    expect(new Set(seen).size).toBe(seen.length);
  });

  it('stops rather than wrapping back to the first set', () => {
    const sets = advance(pool(9), 5);

    // Nine Missions are exactly three groups. A fourth request must not exist,
    // and the last group must not be the first group again.
    expect(sets).toHaveLength(3);
    expect(sets[2]).not.toEqual(sets[0]);
    expect(deriveSuggestionSet(pool(9), context(), sets.flat()).status)
      .toBe('insufficient-content');
  });

  it('offers no replacement when fewer than three unseen Missions remain', () => {
    // Eight Missions: one full replacement, then two left over.
    const records = pool(8);
    const first = deriveSuggestionSet(records, context());
    if (first.status !== 'complete') throw new Error('expected a complete first set');
    expect(first.anotherSetAvailable).toBe(true);

    const second = deriveSuggestionSet(records, context(), ids(first));
    if (second.status !== 'complete') throw new Error('expected a complete second set');

    // Two Missions are still unseen, and they are not offered as a partial set.
    expect(second.missions).toHaveLength(SUGGESTION_SET_SIZE);
    expect(second.anotherSetAvailable).toBe(false);
    expect(ids(second)).toEqual(['movement-04', 'movement-05', 'movement-06']);
  });

  it('keeps the last complete set derivable at the bounded end', () => {
    const records = pool(8);
    const shown = ['movement-01', 'movement-02', 'movement-03'];
    const bounded = deriveSuggestionSet(records, context(), shown);

    // Re-deriving with unchanged cycle state returns the same three, so nothing
    // blanks or partially replaces while the family is still choosing.
    expect(ids(deriveSuggestionSet(records, context(), shown))).toEqual(ids(bounded));
  });

  it('treats a pool shorter than one group as insufficient content, not a partial set', () => {
    expect(deriveSuggestionSet(pool(2), context()).status).toBe('insufficient-content');
  });
});

describe('the production catalog', () => {
  it('yields a complete set for every age band, category and language', () => {
    for (const ageBand of AGE_BANDS) {
      for (const category of MISSION_CATEGORIES) {
        for (const language of SUPPORTED_LANGUAGES) {
          const result = deriveSuggestionSet(
            MISSION_CATALOG,
            context({ ageBand, category, language }),
          );

          expect(result.status).toBe('complete');
          expect(ids(result)).toHaveLength(SUGGESTION_SET_SIZE);
          expect(new Set(ids(result)).size).toBe(SUGGESTION_SET_SIZE);
        }
      }
    }
  });

  it('returns the same set regardless of UI language', () => {
    for (const ageBand of AGE_BANDS) {
      for (const category of MISSION_CATEGORIES) {
        const perLanguage = SUPPORTED_LANGUAGES.map((language) =>
          ids(deriveSuggestionSet(MISSION_CATALOG, context({ ageBand, category, language }))).join(),
        );

        expect(new Set(perLanguage).size).toBe(1);
      }
    }
  });

  it('gives the three Missions of a set visibly different scenes', () => {
    for (const ageBand of AGE_BANDS) {
      for (const category of MISSION_CATEGORIES) {
        const result = deriveSuggestionSet(MISSION_CATALOG, context({ ageBand, category }));
        const scenes =
          result.status === 'complete'
            ? result.missions.map((m) => resolveMissionScene(m.missionId, m.category).join('+'))
            : [];

        // Distinct compositions, not merely a shared plane with one swap.
        expect(new Set(scenes).size).toBe(SUGGESTION_SET_SIZE);
        const subjects = scenes.map((scene) =>
          scene.split('+').filter((element) => element !== 'floor').join('+'),
        );
        expect(new Set(subjects).size).toBe(SUGGESTION_SET_SIZE);
      }
    }
  });

  it('gives every production Mission a scene with a recognizable subject', () => {
    for (const mission of MISSION_CATALOG) {
      const scene = resolveMissionScene(mission.missionId, mission.category);
      const subjects = scene.filter((element) => SUBJECT_ELEMENTS.has(element));

      // A scene made only of atmosphere would be decoration, not a place.
      expect(subjects.length).toBeGreaterThan(0);
    }
  });

  it('gives every production Mission exactly one focal subject', () => {
    // Where a Mission happens is not what it is about: emphasising the room, the
    // furniture it stands in, or the adult present for it would misread the
    // Mission and, in the adult's case, quietly move the Mission away from the
    // child.
    const setting = [
      'table', 'shelfBoard', 'windowFrame', 'rampBook', 'bed', 'doorway',
      'drawerOpen', 'ceilingRoom', 'hillBridge', 'adultFigure',
    ];
    const atmosphere = ['floor', 'wall', 'waterSurface', 'straightLine', 'lightBeam', 'puddle'];

    for (const mission of MISSION_CATALOG) {
      const scene = resolveMissionScene(mission.missionId, mission.category);
      const focus = resolveSceneFocus(scene);

      expect(focus).not.toBeNull();
      expect(scene).toContain(focus);
      expect(setting).not.toContain(focus);
      expect(atmosphere).not.toContain(focus);
    }
  });

  it('builds the repaired scenes around a subject rather than a trace', () => {
    // Human visual review rejected these five as tracks, arcs and blobs: each
    // now has to show the thing doing the action, not only its evidence.
    const trace = [
      'pawTracks', 'footsteps', 'soundWaves', 'rippleRings', 'dashTrail',
      'clueMarks', 'ghostEchoes', 'magnifyRings',
    ];
    const repaired = ['movement-02', 'movement-06', 'creativity-05', 'helping-10', 'calm-10'];

    for (const missionId of repaired) {
      const mission = MISSION_CATALOG.find((entry) => entry.missionId === missionId);
      if (!mission) throw new Error(`expected ${missionId} in the production catalog`);

      const scene = resolveMissionScene(missionId, mission.category);
      const focus = resolveSceneFocus(scene);

      expect(trace).not.toContain(focus);
      expect(scene.filter((element) => !trace.includes(element)).length).toBeGreaterThan(1);
    }
  });

  it('advances every context through complete unseen groups only', () => {
    for (const ageBand of AGE_BANDS) {
      for (const category of MISSION_CATEGORIES) {
        const ctx = context({ ageBand, category });
        const eligible = selectEligibleMissions(MISSION_CATALOG, ctx);
        const shown: string[] = [];
        const sets: (readonly string[])[] = [];

        for (let step = 0; step < 20; step += 1) {
          const result = deriveSuggestionSet(MISSION_CATALOG, ctx, shown);
          if (result.status !== 'complete') break;
          expect(result.missions).toHaveLength(SUGGESTION_SET_SIZE);
          sets.push(result.missions.map((mission) => mission.missionId));
          if (!result.anotherSetAvailable) break;
          shown.push(...result.missions.map((mission) => mission.missionId));
        }

        const seen = sets.flat();
        // Every production context reaches at least one replacement, no Mission
        // is shown twice in a cycle, and the cycle stops with fewer than three
        // unseen Missions left rather than wrapping or padding a group.
        expect(sets.length).toBeGreaterThanOrEqual(2);
        expect(new Set(seen).size).toBe(seen.length);
        expect(eligible.length - seen.length).toBeLessThan(SUGGESTION_SET_SIZE);

        // Every shown Mission still belongs to the requested context.
        for (const missionId of seen) {
          const mission = eligible.find((entry) => entry.missionId === missionId);
          expect(mission).toBeTruthy();
        }
      }
    }
  });

  it('matches every Mission in the set to the requested context', () => {
    for (const ageBand of AGE_BANDS) {
      for (const category of MISSION_CATEGORIES) {
        const result = deriveSuggestionSet(MISSION_CATALOG, context({ ageBand, category }));

        if (result.status !== 'complete') throw new Error('expected a complete set');
        for (const mission of result.missions) {
          expect(mission.category).toBe(category);
          expect(mission.ageBands).toContain(ageBand);
          expect(mission.reviewed).toBe(true);
          expect(mission.discoveryEligible).toBe(true);
        }
      }
    }
  });
});
