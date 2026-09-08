import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppShell, selectAppView } from './AppShell';
import {
  AppStateProvider,
  appStateReducer,
  selectDiscoveryCycle,
  type AppState,
} from './appState';
import { MISSION_CATEGORIES, type MissionCategory } from './catalog';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './localization';
import { MISSIONKID_STORAGE_KEY } from './persistence';

const CATEGORY_LABELS: Readonly<
  Record<SupportedLanguage, Readonly<Record<MissionCategory, string>>>
> = {
  en: {
    Movement: 'Movement',
    Creativity: 'Creativity',
    'Helping at Home': 'Helping at Home',
    Learning: 'Learning',
    Calm: 'Calm',
  },
  de: {
    Movement: 'Bewegung',
    Creativity: 'Kreativität',
    'Helping at Home': 'Zu Hause helfen',
    Learning: 'Lernen',
    Calm: 'Ruhe',
  },
  ru: {
    Movement: 'Движение',
    Creativity: 'Творчество',
    'Helping at Home': 'Помощь по дому',
    Learning: 'Обучение',
    Calm: 'Спокойствие',
  },
};

function completedSetup(overrides: Partial<AppState> = {}): AppState {
  return {
    language: 'en',
    ageBand: '7–8',
    localProfileId: 'profile-1',
    status: 'ready',
    setupView: 'handoff',
    saveStatus: 'idle',
    ...overrides,
  } as AppState;
}

function inDiscovery(overrides: Partial<AppState> = {}): AppState {
  return completedSetup({ discovery: { category: null }, ...overrides });
}

function renderShell(state: AppState) {
  return render(
    <AppStateProvider initialState={state}>
      <AppShell />
    </AppStateProvider>,
  );
}

const GROUP_LABELS: Readonly<Record<SupportedLanguage, string>> = {
  en: 'Mission Category',
  de: 'Missionskategorie',
  ru: 'Категория миссии',
};

function categoryGroup(language: SupportedLanguage = 'en') {
  return screen.getByRole('group', { name: GROUP_LABELS[language] });
}

function radioFor(category: MissionCategory, language: SupportedLanguage = 'en') {
  return screen.getByRole('radio', {
    name: CATEGORY_LABELS[language][category],
  }) as HTMLInputElement;
}

describe('discovery entry gate', () => {
  it('enters the category view only from a valid completed setup', () => {
    renderShell(completedSetup());

    expect(screen.queryByRole('group', { name: 'Mission Category' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Find a Mission' }));

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'What kind of Mission?',
    );
    expect(within(categoryGroup()).getAllByRole('radio')).toHaveLength(
      MISSION_CATEGORIES.length,
    );
  });

  it.each([
    [
      'incomplete setup',
      completedSetup({ ageBand: null, setupView: 'incomplete' }),
      'setup-incomplete',
    ],
    [
      'degraded storage',
      {
        language: 'en',
        ageBand: '7–8',
        localProfileId: 'profile-1',
        status: 'degraded',
      } as AppState,
      'temporary-mode',
    ],
    [
      'blocked recovery',
      {
        language: 'en',
        ageBand: null,
        localProfileId: null,
        status: 'blocked-recovery',
      } as AppState,
      'recovery',
    ],
  ])('shows the gate and no Missions for %s', (_name, state, expectedView) => {
    // Even a stale runtime discovery context must not expose the doorway.
    const stale = { ...state, discovery: { category: 'Movement' } } as AppState;

    expect(selectAppView(stale)).toBe(expectedView);

    renderShell(stale);

    expect(screen.queryByRole('group', { name: 'Mission Category' })).toBeNull();
    for (const category of MISSION_CATEGORIES) {
      expect(
        screen.queryByRole('radio', { name: CATEGORY_LABELS.en[category] }),
      ).toBeNull();
    }
  });

  it('explains the gate and never infers an age band', () => {
    renderShell(completedSetup({ ageBand: null, setupView: 'incomplete' }));

    expect(
      screen.getByText(/A parent needs to finish the age step below/),
    ).toBeTruthy();
    // The parent-guided age step is the route back, with nothing preselected.
    for (const band of ['4–6', '7–8', '9–10']) {
      expect(
        (screen.getByRole('radio', { name: band }) as HTMLInputElement).checked,
      ).toBe(false);
    }
  });

  it('refuses to open discovery from an incomplete context', () => {
    const incomplete = completedSetup({ ageBand: null, setupView: 'incomplete' });

    expect(
      appStateReducer(incomplete, { type: 'discovery-opened' }).discovery,
    ).toBeUndefined();
  });
});

describe('the five canonical Mission Categories', () => {
  it.each(SUPPORTED_LANGUAGES)('renders exactly five peer choices in %s', (language) => {
    renderShell(inDiscovery({ language }));

    const radios = within(categoryGroup(language)).getAllByRole('radio');

    expect(radios).toHaveLength(5);
    expect(radios.map((radio) => (radio as HTMLInputElement).value)).toEqual([
      ...MISSION_CATEGORIES,
    ]);
    for (const category of MISSION_CATEGORIES) {
      expect(radioFor(category, language)).toBeTruthy();
    }
  });

  it('uses canonical identities, never the localized label', () => {
    renderShell(inDiscovery({ language: 'de' }));

    const values = within(categoryGroup('de'))
      .getAllByRole('radio')
      .map((radio) => (radio as HTMLInputElement).value);

    expect(values).toEqual([...MISSION_CATEGORIES]);
    expect(values).not.toContain('Bewegung');
  });

  it('adds no sixth category and promotes none of the five', () => {
    renderShell(inDiscovery());

    const labels = within(categoryGroup())
      .getAllByRole('radio')
      .map((radio) => radio.closest('label')!);

    expect(labels).toHaveLength(5);
    // Every peer shares one structure and class; none is ranked or featured.
    expect(new Set(labels.map((label) => label.className))).toEqual(
      new Set(['mission-world']),
    );
    expect(
      screen.queryByText(/recommended|popular|trending|featured|best/i),
    ).toBeNull();
    for (const label of labels) {
      expect(label.querySelector('.mission-world__label')).toBeTruthy();
      expect(label.querySelector('.mission-world__state')).toBeTruthy();
    }
  });

  it('preselects no category', () => {
    renderShell(inDiscovery());

    for (const radio of within(categoryGroup()).getAllByRole('radio')) {
      expect((radio as HTMLInputElement).checked).toBe(false);
    }
    expect(screen.queryByText('Selected')).toBeNull();
  });
});

describe('category selection and the discovery cycle', () => {
  it.each(MISSION_CATEGORIES)(
    'selecting %s starts a cycle for the current context',
    (category) => {
      renderShell(inDiscovery());

      fireEvent.click(radioFor(category));

      expect(radioFor(category).checked).toBe(true);
      expect(
        within(radioFor(category).closest('label')!).getByText('Selected'),
      ).toBeTruthy();
      expect(screen.getByRole('status').textContent).toContain(
        'Mission suggestions for this Mission Category will appear here.',
      );
    },
  );

  it('derives the cycle from age band, language and category', () => {
    const selected = appStateReducer(inDiscovery(), {
      type: 'discovery-category-selected',
      category: 'Calm',
    });

    expect(selectDiscoveryCycle(selected)).toEqual({
      ageBand: '7–8',
      language: 'en',
      category: 'Calm',
    });
  });

  it('has no cycle before a category is chosen', () => {
    expect(selectDiscoveryCycle(inDiscovery())).toBeNull();
    expect(selectDiscoveryCycle(completedSetup())).toBeNull();
  });

  it('discards the previous cycle when the Mission Category changes', () => {
    const first = appStateReducer(inDiscovery(), {
      type: 'discovery-category-selected',
      category: 'Movement',
    });
    const second = appStateReducer(first, {
      type: 'discovery-category-selected',
      category: 'Learning',
    });

    expect(selectDiscoveryCycle(first)).not.toEqual(selectDiscoveryCycle(second));
    expect(selectDiscoveryCycle(second)?.category).toBe('Learning');
  });

  it('discards the previous cycle when the UI language changes', () => {
    const before = appStateReducer(inDiscovery(), {
      type: 'discovery-category-selected',
      category: 'Movement',
    });
    const after = appStateReducer(before, { type: 'language-changed', language: 'de' });

    expect(selectDiscoveryCycle(after)).not.toEqual(selectDiscoveryCycle(before));
    expect(selectDiscoveryCycle(after)?.language).toBe('de');
    // The chosen category survives; only the cycle is replaced.
    expect(selectDiscoveryCycle(after)?.category).toBe('Movement');
  });

  it('discards the previous cycle when the age band changes', () => {
    const before = appStateReducer(inDiscovery(), {
      type: 'discovery-category-selected',
      category: 'Movement',
    });
    const after = appStateReducer(before, { type: 'age-band-changed', ageBand: '9–10' });

    expect(selectDiscoveryCycle(after)).not.toEqual(selectDiscoveryCycle(before));
    expect(selectDiscoveryCycle(after)?.ageBand).toBe('9–10');
  });

  it('ends the cycle when the parent returns to the setup step', () => {
    renderShell(inDiscovery());

    fireEvent.click(radioFor('Movement'));
    fireEvent.click(screen.getByRole('button', { name: 'Change setup' }));

    expect(screen.queryByRole('group', { name: 'Mission Category' })).toBeNull();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Setup settings',
    );
  });

  it('renders no Mission and creates no Mission Session', () => {
    const { container } = renderShell(inDiscovery());

    fireEvent.click(radioFor('Movement'));

    // Task 4 is the doorway only: no Mission content, and nothing persisted.
    expect(container.querySelector('[data-mission-id]')).toBeNull();
    expect(screen.queryByText(/minute|Minute|минут/)).toBeNull();
    expect(within(categoryGroup()).getAllByRole('radio')).toHaveLength(5);
    expect(globalThis.localStorage.getItem(MISSIONKID_STORAGE_KEY)).toBeNull();
  });
});

describe('discovery accessibility', () => {
  it('exposes one named group and the selected state', () => {
    renderShell(inDiscovery());

    expect(categoryGroup().tagName).toBe('FIELDSET');

    const movement = radioFor('Movement');
    expect(movement.checked).toBe(false);

    fireEvent.click(movement);

    expect(radioFor('Movement').checked).toBe(true);
    expect(radioFor('Calm').checked).toBe(false);
  });

  it('uses native radio semantics so one group is keyboard operable', () => {
    renderShell(inDiscovery());

    // jsdom does not implement roving arrow-key behaviour, so this asserts the
    // native structure that provides it in a browser rather than simulating it.
    const radios = within(categoryGroup()).getAllByRole('radio') as HTMLInputElement[];

    for (const radio of radios) {
      expect(radio.tagName).toBe('INPUT');
      expect(radio.type).toBe('radio');
      expect(radio.name).toBe('discovery-category');
      expect(radio.disabled).toBe(false);
      expect(radio.getAttribute('tabindex')).toBeNull();
    }
  });

  it('does not rely on colour alone for the selected state', () => {
    renderShell(inDiscovery());

    fireEvent.click(radioFor('Learning'));

    const label = radioFor('Learning').closest('label')!;
    expect(within(label).getByText('Selected')).toBeTruthy();
    expect(label.querySelector('.mission-world__check')?.textContent).toBe('✓');
  });

  it('keeps every category label fully visible in each language', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const { unmount } = renderShell(inDiscovery({ language }));

      for (const category of MISSION_CATEGORIES) {
        const label = radioFor(category, language).closest('label')!;
        expect(label.querySelector('.mission-world__label')!.textContent).toBe(
          CATEGORY_LABELS[language][category],
        );
      }

      unmount();
    }
  });
});
