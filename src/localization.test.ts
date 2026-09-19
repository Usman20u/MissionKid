import { readFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import { MISSION_CATALOG } from './catalogContent';
import {
  DEFAULT_LANGUAGE,
  INTERFACE_MESSAGES,
  MISSION_ADULT_LABEL_KEYS,
  MISSION_CATEGORY_LABEL_KEYS,
  SUPPORTED_LANGUAGES,
  resolveSupportedLanguage,
  translateMessage,
  type InterfaceMessageResources,
  type MessageKey,
} from './localization';

// The views that present a Mission to the family. Their strings must resolve in
// every language, and none of their text may live in the component itself.
const LOCALIZED_VIEWS = [
  'src/MissionDiscovery.tsx',
  'src/MissionSuggestionSet.tsx',
  'src/MissionReady.tsx',
  'src/MissionActive.tsx',
  'src/MissionLeaveConfirmation.tsx',
  'src/MissionResult.tsx',
  'src/MissionHistory.tsx',
];

// Every source file that resolves an interface message, including the shell and
// the setup flow. The checks below hold the whole implemented interface to the
// same rules rather than the Mission views alone.
const LOCALIZED_SOURCES = [
  ...LOCALIZED_VIEWS,
  'src/AppShell.tsx',
  'src/SetupFlow.tsx',
];

function sourcesOf(files: readonly string[]): string {
  return files.map((file) => readFileSync(file, 'utf8')).join('\n');
}

// Keys a view reaches through one of the exported label maps rather than by
// naming them, which is how category and adult-involvement labels are resolved.
const MAPPED_KEYS: readonly MessageKey[] = [
  ...Object.values(MISSION_CATEGORY_LABEL_KEYS),
  ...(Object.values(MISSION_ADULT_LABEL_KEYS).filter(
    (key): key is MessageKey => key !== undefined,
  )),
];

function keysReferencedIn(files: readonly string[]): MessageKey[] {
  const sources = sourcesOf(files);
  const mapped = sources.includes('MISSION_CATEGORY_LABEL_KEYS') ||
    sources.includes('MISSION_ADULT_LABEL_KEYS');

  return (Object.keys(INTERFACE_MESSAGES.en) as MessageKey[]).filter(
    (key) =>
      sources.includes(`'${key}'`) || (mapped && MAPPED_KEYS.includes(key)),
  );
}

// `{token}` placeholders a message carries, which the view has to substitute.
function tokensIn(value: string): string[] {
  return [...value.matchAll(/\{[a-zA-Z]+\}/g)].map((match) => match[0]).sort();
}

describe('localization', () => {
  it('defines exactly the approved languages with English as default', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(['en', 'de', 'ru']);
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it.each([
    { value: 'en', expected: 'en' },
    { value: 'de', expected: 'de' },
    { value: 'ru', expected: 'ru' },
    { value: 'fr', expected: 'en' },
    { value: undefined, expected: 'en' },
    { value: null, expected: 'en' },
    { value: 3, expected: 'en' },
  ])('resolves $value to $expected', ({ expected, value }) => {
    expect(resolveSupportedLanguage(value)).toBe(expected);
  });

  it('keeps every current interface key complete and usable', () => {
    const englishKeys = Object.keys(INTERFACE_MESSAGES.en).sort();

    for (const language of SUPPORTED_LANGUAGES) {
      expect(Object.keys(INTERFACE_MESSAGES[language]).sort()).toEqual(
        englishKeys,
      );

      for (const message of Object.values(INTERFACE_MESSAGES[language])) {
        expect(message.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('resolves every message a Mission view asks for, in all three languages', () => {
    const sources = LOCALIZED_VIEWS.map((file) => readFileSync(file, 'utf8')).join('\n');
    const referenced = (Object.keys(INTERFACE_MESSAGES.en) as MessageKey[]).filter(
      (key) => sources.includes(`'${key}'`),
    );

    // The discovery views must actually reach the dictionaries, so an added
    // view string cannot ship English-only or blank in German or Russian.
    expect(referenced.length).toBeGreaterThan(0);
    for (const language of SUPPORTED_LANGUAGES) {
      for (const key of referenced) {
        expect(translateMessage(language, key).trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps Mission view text in the dictionaries, not in the components', () => {
    for (const file of LOCALIZED_VIEWS) {
      const source = readFileSync(file, 'utf8');

      // German and Russian characters in a view would be copy that no language
      // switch can reach.
      expect(source).not.toMatch(/[\u0400-\u04FF]/u);
      expect(source).not.toMatch(/[äöüßÄÖÜ]/u);

      // Text rendered straight into JSX, rather than resolved through a key.
      const strippedComments = source
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\/\/.*$/gm, '');
      expect(strippedComments).not.toMatch(/>[^<>{}\n]*[A-Za-z]{2,}[^<>{}\n]*</u);
    }
  });

  it('never duplicates reviewed Mission copy into the interface dictionaries', () => {
    const missionCopy = new Set<string>();
    for (const mission of MISSION_CATALOG) {
      for (const language of SUPPORTED_LANGUAGES) {
        const content = mission.content[language];
        missionCopy.add(content.title);
        missionCopy.add(content.instruction);
        if (content.safetyNote) missionCopy.add(content.safetyNote);
        if (content.adultInvolvementNote) missionCopy.add(content.adultInvolvementNote);
      }
    }

    // Mission wording has one reviewed home. A copy here would drift from it
    // and would not follow the catalog's own localization.
    for (const language of SUPPORTED_LANGUAGES) {
      for (const message of Object.values(INTERFACE_MESSAGES[language])) {
        expect(missionCopy.has(message)).toBe(false);
      }
    }
  });

  it('falls back to reviewed English and reports a missing interface message', () => {
    const { ['view.pending.title']: _missing, ...incompleteGerman } =
      INTERFACE_MESSAGES.de;
    const incompleteResources: InterfaceMessageResources = {
      ...INTERFACE_MESSAGES,
      de: incompleteGerman,
    };
    const reportMissing = vi.fn();

    expect(
      translateMessage(
        'de',
        'view.pending.title',
        incompleteResources,
        reportMissing,
      ),
    ).toBe('Preparing MissionKid');
    expect(reportMissing).toHaveBeenCalledWith(
      'de',
      'view.pending.title',
    );
  });
});

describe('the whole implemented interface, in every language', () => {
  const referenced = keysReferencedIn(LOCALIZED_SOURCES);

  it('resolves every message any implemented view asks for', () => {
    // The shell and the setup flow are held to the same rule as the Mission
    // views, so no implemented surface can ship English-only.
    expect(referenced.length).toBeGreaterThan(40);

    for (const language of SUPPORTED_LANGUAGES) {
      for (const key of referenced) {
        const value = translateMessage(language, key);
        expect(value.trim().length).toBeGreaterThan(0);
        // A raw key reaching the family would mean a missing message.
        expect(value).not.toBe(key);
      }
    }
  });

  it('carries the same interpolation tokens in every language', () => {
    for (const key of Object.keys(INTERFACE_MESSAGES.en) as MessageKey[]) {
      const expected = tokensIn(INTERFACE_MESSAGES.en[key]);

      for (const language of SUPPORTED_LANGUAGES) {
        // A translation that lost a token would render a sentence missing the
        // number or name it was written around.
        expect(tokensIn(INTERFACE_MESSAGES[language][key])).toEqual(expected);
      }
    }
  });

  it('substitutes every token a view resolves', () => {
    const sources = sourcesOf(LOCALIZED_SOURCES);

    for (const key of referenced) {
      for (const token of tokensIn(INTERFACE_MESSAGES.en[key])) {
        // Every token a rendered message carries must be replaced somewhere in
        // the views that resolve it, or it would reach the family verbatim.
        expect(sources).toContain(`'${token}'`);
      }
    }
  });

  it('keeps no message that no implemented surface uses', () => {
    const all = Object.keys(INTERFACE_MESSAGES.en) as MessageKey[];
    const unused = all.filter((key) => !referenced.includes(key));

    expect(unused).toEqual([]);
  });

  it('never states a durable negative for an unknown outcome', () => {
    // Where a write may have landed, the message may say only that MissionKid
    // could not check. Claiming the Mission did not start, was not left or was
    // not recorded would assert a rollback nobody established.
    const unknownOutcomeKeys: MessageKey[] = [
      'session.transition.unconfirmed',
      'session.start.unconfirmed',
      'session.exit.unconfirmed',
      'session.done.unconfirmed',
      'result.exit.unconfirmed',
      'setup.save.unconfirmed',
      'recovery.resetUnconfirmed',
    ];

    for (const key of unknownOutcomeKeys) {
      for (const language of SUPPORTED_LANGUAGES) {
        const value = translateMessage(language, key);
        // Each says it could not be checked, in its own language.
        expect(value.toLowerCase()).toMatch(
          /could not|couldn|konnte nicht|не смог|не удалось|nicht bestätigt/,
        );
      }
    }

    // The one exception is deliberate and re-read here: a selection that was
    // not confirmed may say nothing has started, because reaching `ready` and
    // starting are separate later writes that this failure precedes.
    expect(translateMessage('en', 'discovery.selection.unconfirmed')).toContain(
      'Nothing has started',
    );
  });

  it('claims no recorded completion without evidence', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      for (const key of ['session.done.notRecorded', 'session.done.unconfirmed'] as const) {
        const value = translateMessage(language, key).toLowerCase();
        // Neither failure message may congratulate or claim recognition.
        expect(value).not.toMatch(/reward|belohnung|награ/);
        expect(value).not.toMatch(/\d+ ?\/ ?20/);
      }
    }
  });

  it('refers to the child without assuming a gender', () => {
    // MissionKid never collects a child's gender, so no child-facing Russian
    // string may use a gendered past-tense or short-adjective form.
    //
    // The boundaries are Unicode-aware on purpose: `\b` is defined over ASCII
    // word characters, so it never matches beside a Cyrillic letter and would
    // make this check pass on everything.
    //
    // Only second-person agreement is flagged, because that is what refers to
    // the child. The same forms agreeing with a noun are correct Russian and
    // must not trip this: "готова ли эта миссия" agrees with the Mission, and
    // "MissionKid не смог проверить" agrees with the product.
    const CHILD_FORMS =
      'готов|готова|достиг|достигла|сделал|сделала|смог|смогла|вышел|вышла';
    const genderedChecks = [
      new RegExp(`(?<!\\p{L})(ты|будешь)(?:\\s+\\p{L}+){0,2}\\s+(${CHILD_FORMS})(?!\\p{L})`, 'u'),
      new RegExp(`(?<!\\p{L})(${CHILD_FORMS})\\s+ли\\s+ты(?!\\p{L})`, 'u'),
    ];

    for (const key of keysReferencedIn(LOCALIZED_SOURCES)) {
      for (const check of genderedChecks) {
        expect(translateMessage('ru', key)).not.toMatch(check);
      }
    }

    // The check is proven to bite rather than trusted: these are the forms the
    // approved corrections removed, and the noun agreements that must survive.
    for (const offender of [
      'Начни, когда будешь готов.',
      'Не спеши — заканчивай, когда будешь готов.',
      'MissionKid не смог проверить, вышел ли ты из этой миссии.',
    ]) {
      expect(genderedChecks.some((check) => check.test(offender))).toBe(true);
    }

    for (const legitimate of [
      'MissionKid не смог проверить, готова ли эта миссия.',
      'Эта миссия уже выбрана.',
    ]) {
      expect(genderedChecks.some((check) => check.test(legitimate))).toBe(false);
    }
  });

  it('keeps the goal invitation optional and subject to a parent agreeing', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const value = translateMessage(language, 'result.goal.complete').toLowerCase();

      // It invites, conditional on the parent; it never promises or entitles.
      expect(value).toMatch(/if you and your parent agree|wenn deine eltern einverstanden|если родители согласны/);
      expect(value).not.toMatch(/guarantee|garantie|гарант/);
      expect(value).not.toMatch(/you will get|du bekommst|ты получишь/);
    }
  });

  it('says plainly when a completed Mission cannot be shown', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const value = translateMessage(language, 'result.missionUnavailable');

      // A bare category word could be mistaken for the Mission's own title.
      expect(value.split(/\s+/).length).toBeGreaterThan(3);
    }
  });
});
