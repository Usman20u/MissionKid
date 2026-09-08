// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { AGE_BANDS } from './ageBands';
import {
  ADULT_INVOLVEMENT_LEVELS,
  MISSION_CATEGORIES,
  validateMissionRecord,
  validateMissionRecords,
  type MissionLocalizedContent,
  type MissionRecord,
} from './catalog';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './localization';
import { AGE_BANDS as SETUP_AGE_BANDS } from './persistence';

// Synthetic validation fixtures only; no production Mission content.
function createRecord(): MissionRecord {
  const content = (language: SupportedLanguage): MissionLocalizedContent => ({
    title: `Title fixture (${language})`,
    instruction: `Instruction fixture (${language})`,
  });
  return {
    missionId: 'test-mission-1',
    category: 'Creativity',
    ageBands: ['4–6'],
    durationSeconds: 60,
    content: { en: content('en'), de: content('de'), ru: content('ru') },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: false,
    catalogOrder: 0,
    contentVersion: 'test-version-1',
    reviewed: true,
    discoveryEligible: true,
  };
}

function withNote(
  record: MissionRecord,
  field: 'adultInvolvementNote' | 'safetyNote',
): MissionRecord {
  const content = { ...record.content };
  for (const language of SUPPORTED_LANGUAGES) {
    content[language] = { ...content[language], [field]: `Note fixture (${language})` };
  }
  return { ...record, content };
}

function withLocalizedValue(
  record: MissionRecord,
  language: SupportedLanguage,
  field: keyof MissionLocalizedContent,
  value: unknown,
) {
  return {
    ...record,
    content: {
      ...record.content,
      [language]: { ...record.content[language], [field]: value },
    },
  };
}

function deepFreeze(value: unknown): void {
  if (value !== null && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
}

describe('controlled Mission record validation', () => {
  it('uses the exact closed values and shares the F001 age-band source', () => {
    expect(MISSION_CATEGORIES).toEqual([
      'Movement', 'Creativity', 'Helping at Home', 'Learning', 'Calm',
    ]);
    expect(ADULT_INVOLVEMENT_LEVELS).toEqual([
      'No special adult assistance required',
      'Adult nearby required',
      'Adult participation required',
    ]);
    expect(AGE_BANDS).toEqual(['4–6', '7–8', '9–10']);
    expect(SETUP_AGE_BANDS).toBe(AGE_BANDS);
    expect(SUPPORTED_LANGUAGES).toEqual(['en', 'de', 'ru']);
  });

  it('accepts a complete reviewed record without unnecessary safety copy', () => {
    const record = createRecord();
    expect(validateMissionRecord(record)).toEqual({ status: 'valid', mission: record });
  });

  it('accepts every canonical category and age band and positive whole seconds', () => {
    for (const category of MISSION_CATEGORIES) {
      for (const ageBand of AGE_BANDS) {
        expect(validateMissionRecord({
          ...createRecord(), category, ageBands: [ageBand], durationSeconds: 1,
        }).status).toBe('valid');
      }
    }
    expect(validateMissionRecord({ ...createRecord(), ageBands: AGE_BANDS }).status).toBe('valid');
  });

  it('rejects non-record inputs and each missing required field', () => {
    for (const value of [undefined, null, [], 'record', 1]) {
      expect(validateMissionRecord(value)).toEqual({ status: 'invalid' });
    }
    for (const key of Object.keys(createRecord())) {
      const record: Record<string, unknown> = { ...createRecord() };
      delete record[key];
      expect(validateMissionRecord(record).status, `missing ${key}`).toBe('invalid');
    }
  });

  it.each(['', '   ', null, 1])('rejects invalid identifier %s', (missionId) => {
    expect(validateMissionRecord({ ...createRecord(), missionId }).status).toBe('invalid');
  });

  it('preserves identity independently of localized titles and instructions', () => {
    const record = createRecord();
    const changed = withLocalizedValue(record, 'de', 'title', 'Different title fixture');
    expect(validateMissionRecord(changed)).toEqual({ status: 'valid', mission: changed });
    expect(changed.missionId).toBe(record.missionId);
  });

  it('rejects unknown, localized, or multiple category values', () => {
    for (const category of ['Unknown', 'Kreativität', ['Movement', 'Calm'], null]) {
      expect(validateMissionRecord({ ...createRecord(), category }).status).toBe('invalid');
    }
  });

  it('rejects missing, empty, unknown, mixed-invalid and sparse age eligibility', () => {
    for (const ageBands of [undefined, [], ['10–12'], ['4-6'], ['4–6', 'unknown'], '4–6', Array(1)]) {
      expect(validateMissionRecord({ ...createRecord(), ageBands }).status).toBe('invalid');
    }
  });

  it.each([undefined, 0, -1, 1.5, Infinity, -Infinity, NaN, '60'])(
    'rejects invalid duration %s', (durationSeconds) => {
      expect(validateMissionRecord({ ...createRecord(), durationSeconds }).status).toBe('invalid');
    },
  );

  it.each([undefined, -1, 0.5, Infinity, -Infinity, NaN, '0'])(
    'rejects invalid catalog order %s', (catalogOrder) => {
      expect(validateMissionRecord({ ...createRecord(), catalogOrder }).status).toBe('invalid');
    },
  );

  it.each(SUPPORTED_LANGUAGES)('requires complete %s titles and instructions without fallback', (language) => {
    const record = createRecord();
    for (const field of ['title', 'instruction'] as const) {
      for (const value of [undefined, '', '  ', null, 1]) {
        expect(validateMissionRecord(withLocalizedValue(record, language, field, value)).status,
          `${language}.${field}: ${String(value)}`).toBe('invalid');
      }
      const localized: Record<string, unknown> = { ...record.content[language] };
      delete localized[field];
      expect(validateMissionRecord({
        ...record, content: { ...record.content, [language]: localized },
      }).status).toBe('invalid');
    }
    const content: Record<string, unknown> = { ...record.content };
    delete content[language];
    expect(validateMissionRecord({ ...record, content }).status).toBe('invalid');
  });

  it('rejects malformed localized containers and unsupported language keys', () => {
    for (const content of [null, [], 'content', { ...createRecord().content, fr: {} }]) {
      expect(validateMissionRecord({ ...createRecord(), content }).status).toBe('invalid');
    }
    for (const value of [null, [], 'content']) {
      expect(validateMissionRecord({
        ...createRecord(), content: { ...createRecord().content, de: value },
      }).status).toBe('invalid');
    }
  });

  it('requires a boolean safety requirement and all safety copy when required', () => {
    for (const safetyNoteRequired of [undefined, null, 'false']) {
      expect(validateMissionRecord({ ...createRecord(), safetyNoteRequired }).status).toBe('invalid');
    }
    const record = { ...createRecord(), safetyNoteRequired: true };
    expect(validateMissionRecord(record).status).toBe('invalid');
    expect(validateMissionRecord(withNote(record, 'safetyNote')).status).toBe('valid');
  });

  it.each(SUPPORTED_LANGUAGES)('rejects missing or empty required safety copy in %s', (language) => {
    const record = withNote({ ...createRecord(), safetyNoteRequired: true }, 'safetyNote');
    for (const value of [undefined, '', '  ', null]) {
      expect(validateMissionRecord(withLocalizedValue(record, language, 'safetyNote', value)).status).toBe('invalid');
    }
  });

  it('requires supplied optional notes to remain complete across languages', () => {
    for (const field of ['safetyNote', 'adultInvolvementNote'] as const) {
      const record = withNote(createRecord(), field);
      expect(validateMissionRecord(record).status).toBe('valid');
      for (const language of SUPPORTED_LANGUAGES) {
        expect(validateMissionRecord(withLocalizedValue(record, language, field, undefined)).status).toBe('invalid');
      }
    }
  });

  it('rejects unknown adult-involvement values', () => {
    for (const adultInvolvement of [undefined, null, 'none', 'Adult optional']) {
      expect(validateMissionRecord({ ...createRecord(), adultInvolvement }).status).toBe('invalid');
    }
  });

  it.each(['Adult nearby required', 'Adult participation required'] as const)(
    'requires explicit localized copy for %s without requiring an unrelated safety note',
    (adultInvolvement) => {
      const record = { ...createRecord(), adultInvolvement };
      expect(validateMissionRecord(record).status).toBe('invalid');
      const withAdultNote = withNote(record, 'adultInvolvementNote');
      expect(validateMissionRecord(withAdultNote).status).toBe('valid');
      for (const language of SUPPORTED_LANGUAGES) {
        for (const value of [undefined, '', '  ', null]) {
          expect(validateMissionRecord(withLocalizedValue(withAdultNote, language, 'adultInvolvementNote', value)).status).toBe('invalid');
        }
      }
    },
  );

  it('rejects unreviewed or ineligible content and non-boolean approval claims', () => {
    for (const field of ['reviewed', 'discoveryEligible'] as const) {
      for (const value of [undefined, false, 'true', 1]) {
        expect(validateMissionRecord({ ...createRecord(), [field]: value }).status,
          `${field}: ${String(value)}`).toBe('invalid');
      }
    }
  });

  it('requires non-empty content-version provenance', () => {
    for (const contentVersion of [undefined, '', '  ', null, 1]) {
      expect(validateMissionRecord({ ...createRecord(), contentVersion }).status).toBe('invalid');
    }
  });

  it('rejects undeclared record and localized-content fields', () => {
    expect(validateMissionRecord({ ...createRecord(), extra: true }).status).toBe('invalid');
    expect(validateMissionRecord({
      ...createRecord(),
      content: { ...createRecord().content, en: { ...createRecord().content.en, extra: true } },
    }).status).toBe('invalid');
  });

  it('requires own record and localization fields rather than inherited content', () => {
    expect(validateMissionRecord(Object.create(createRecord())).status).toBe('invalid');
    expect(validateMissionRecord({
      ...createRecord(),
      content: { ...createRecord().content, en: Object.create(createRecord().content.en) },
    }).status).toBe('invalid');
  });
});

describe('collection-aware Mission identity validation', () => {
  it('invalidates every duplicate, including otherwise-invalid records, without changing order', () => {
    const first = createRecord();
    const unique = { ...createRecord(), missionId: 'test-mission-2' };
    const invalidDuplicate = { ...first, durationSeconds: 0 };
    const results = validateMissionRecords([first, unique, invalidDuplicate, { ...first }]);
    expect(results).toEqual([
      { status: 'invalid' }, { status: 'valid', mission: unique },
      { status: 'invalid' }, { status: 'invalid' },
    ]);
    expect(validateMissionRecords([first, first])).toEqual([
      { status: 'invalid' }, { status: 'invalid' },
    ]);
  });

  it('allows duplicate catalog order and validates records without coverage or grouping rules', () => {
    const records = [createRecord(), { ...createRecord(), missionId: 'test-mission-2' }];
    expect(validateMissionRecords(records)).toEqual(records.map((mission) => ({ status: 'valid', mission })));
    expect(validateMissionRecords([])).toEqual([]);
  });

  it('rejects malformed members individually without excluding a valid unique record', () => {
    const record = createRecord();
    expect(validateMissionRecords([null, record, { missionId: '' }])).toEqual([
      { status: 'invalid' }, { status: 'valid', mission: record }, { status: 'invalid' },
    ]);
    expect(validateMissionRecords(Array(1))).toEqual([{ status: 'invalid' }]);
  });

  it('is deterministic and does not mutate deeply frozen input, without browser APIs', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
    const records = [withNote(createRecord(), 'safetyNote'), { ...createRecord(), missionId: 'test-mission-2' }];
    const before = JSON.stringify(records);
    deepFreeze(records);
    expect(validateMissionRecord(records[0]).status).toBe('valid');
    expect(validateMissionRecords(records)).toEqual(validateMissionRecords(records));
    expect(JSON.stringify(records)).toBe(before);
    expect(validateMissionRecords(records)[0]).toEqual({ status: 'valid', mission: records[0] });
  });
});
