import { describe, expect, it, vi } from 'vitest';

import {
  DEFAULT_LANGUAGE,
  INTERFACE_MESSAGES,
  SUPPORTED_LANGUAGES,
  resolveSupportedLanguage,
  translateMessage,
  type InterfaceMessageResources,
} from './localization';

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
