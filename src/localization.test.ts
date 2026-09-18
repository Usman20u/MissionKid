import { readFileSync } from 'node:fs';

import { describe, expect, it, vi } from 'vitest';

import { MISSION_CATALOG } from './catalogContent';
import {
  DEFAULT_LANGUAGE,
  INTERFACE_MESSAGES,
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
];

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
