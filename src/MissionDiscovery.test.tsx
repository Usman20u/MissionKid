import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AppShell, selectAppView } from './AppShell';
import {
  AppStateProvider,
  appStateReducer,
  selectCurrentSession,
  selectDiscoveryCycle,
  selectMissionStartAvailable,
  selectShownMissionIds,
  type AppState,
  useAppState,
  type AppStateAction,
} from './appState';
import { MISSION_CATEGORIES, type MissionCategory } from './catalog';
import {
  SUPPORTED_LANGUAGES,
  translateMessage,
  type SupportedLanguage,
} from './localization';
import { MissionCategorySelection } from './MissionDiscovery';
import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type SnapshotStorage,
} from './persistence';

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
  return completedSetup({ discovery: { category: null, shown: [] }, ...overrides });
}

function memoryStorage() {
  const values = new Map<string, string>();
  values.set(
    MISSIONKID_STORAGE_KEY,
    JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: 'profile-1', ageBand: '7–8' },
    }),
  );
  const storage: SnapshotStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
  return { values, storage };
}

// Discovery with an injected adapter, identifier factory and clock, so a test
// owns every fact a selection records.
function renderDiscovery(
  memory: ReturnType<typeof memoryStorage>,
  captured: AppState[],
  createId: () => string = () => 'session-1',
) {
  function Probe() {
    captured.push(useAppState().state);
    return null;
  }

  return render(
    <AppStateProvider initialState={inDiscovery()}>
      <Probe />
      <MissionCategorySelection
        adapter={createPersistenceAdapter(memory.storage)}
        createId={createId}
        now={() => 1_700_000_000_000}
      />
    </AppStateProvider>,
  );
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
      // Task 5 fills the cycle: a complete set of three Missions appears.
      expect(screen.getAllByRole('article')).toHaveLength(3);
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

  it('replaces the visible three on request and persists nothing', () => {
    renderShell(inDiscovery());
    fireEvent.click(radioFor('Movement'));

    const titles = () =>
      screen.getAllByRole('article').map((card) =>
        card.querySelector('.mission-card__title')!.textContent,
      );
    const first = titles();
    expect(first).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'Another set' }));

    const second = titles();
    expect(second).toHaveLength(3);
    expect(second).not.toEqual(first);
    // Nothing from the first set comes back while a full unseen group remained.
    for (const title of second) expect(first).not.toContain(title);
    // The cycle is interaction state: replacing a set writes no snapshot.
    expect(globalThis.localStorage.getItem(MISSIONKID_STORAGE_KEY)).toBeNull();
  });

  it('stops offering another set at the end of the catalog and keeps the three', () => {
    renderShell(inDiscovery());
    fireEvent.click(radioFor('Movement'));

    let guard = 0;
    while (screen.queryByRole('button', { name: 'Another set' }) && guard < 20) {
      fireEvent.click(screen.getByRole('button', { name: 'Another set' }));
      guard += 1;
    }

    expect(guard).toBeGreaterThan(0);
    // Bounded, not broken: the control is gone, the three remain choosable, and
    // the state is stated rather than presented as an error.
    expect(screen.queryByRole('button', { name: 'Another set' })).toBeNull();
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(
      screen.getByText(translateMessage('en', 'discovery.anotherSet.bounded')),
    ).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('starts a fresh cycle when the Mission Category changes', () => {
    renderShell(inDiscovery());
    fireEvent.click(radioFor('Movement'));
    const firstMovementSet = screen.getAllByRole('article').map((card) =>
      card.querySelector('.mission-card__title')!.textContent,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Another set' }));
    fireEvent.click(radioFor('Calm'));
    fireEvent.click(radioFor('Movement'));

    // Back at the beginning of Movement, not part-way through the old cycle.
    expect(
      screen.getAllByRole('article').map((card) =>
        card.querySelector('.mission-card__title')!.textContent,
      ),
    ).toEqual(firstMovementSet);
  });

  it('publishes a confirmed selection, ends the cycle, and adds no new view', () => {
    const memory = memoryStorage();
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    fireEvent.click(screen.getByRole('button', { name: 'Another set' }));
    expect(selectShownMissionIds(captured.at(-1)!)).toHaveLength(3);

    const chosen = screen.getAllByRole('article')[0]!;
    const missionId = chosen
      .querySelector('button')!
      .getAttribute('aria-describedby')!
      .replace('mission-title-', '');
    fireEvent.click(within(chosen).getByRole('button', { name: 'Choose this Mission' }));

    const after = captured.at(-1)!;
    const session = selectCurrentSession(after);

    expect(session?.missionId).toBe(missionId);
    expect(session?.state).toBe('selected');
    expect(selectMissionStartAvailable(after)).toBe(true);
    // Choosing ends the cycle; the Mission Category choice is not disturbed.
    expect(selectShownMissionIds(after)).toEqual([]);
    expect(after.discovery?.category).toBe('Movement');
    // The start experience belongs to F003. Nothing here renders it.
    expect(screen.getByRole('group', { name: 'Mission Category' })).toBeTruthy();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('keeps the three Missions and publishes nothing when the write fails', () => {
    const memory = memoryStorage();
    memory.storage.setItem = () => {
      throw new Error('write failed');
    };
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    const before = screen.getAllByRole('article').map((card) =>
      card.querySelector('.mission-card__title')!.textContent,
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    // No false success, and the family keeps exactly what they were choosing
    // from. Task 8 owns telling them what happened.
    expect(selectCurrentSession(captured.at(-1)!)).toBeNull();
    expect(selectMissionStartAvailable(captured.at(-1)!)).toBe(false);
    expect(
      screen.getAllByRole('article').map((card) =>
        card.querySelector('.mission-card__title')!.textContent,
      ),
    ).toEqual(before);
  });

  it('resolves one session when the same Mission is chosen twice', () => {
    const memory = memoryStorage();
    const createId = vi.fn(() => 'session-1');
    const captured: AppState[] = [];

    renderDiscovery(memory, captured, createId);
    fireEvent.click(radioFor('Movement'));

    const control = () => screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!;
    fireEvent.click(control());
    const first = selectCurrentSession(captured.at(-1)!);
    fireEvent.click(control());
    const second = selectCurrentSession(captured.at(-1)!);

    expect(second).toEqual(first);
    expect(createId).toHaveBeenCalledTimes(1);
    expect(JSON.parse(memory.values.get(MISSIONKID_STORAGE_KEY)!).currentSession.sessionId)
      .toBe('session-1');
  });

  it('refuses a different Mission while one is selected and changes nothing', () => {
    const memory = memoryStorage();
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    const controls = () => screen.getAllByRole('button', { name: 'Choose this Mission' });
    fireEvent.click(controls()[0]!);

    const stored = memory.values.get(MISSIONKID_STORAGE_KEY);
    const session = selectCurrentSession(captured.at(-1)!);
    const visible = screen.getAllByRole('article').map((card) =>
      card.querySelector('.mission-card__title')!.textContent,
    );

    fireEvent.click(controls()[1]!);

    // The conflict is refused before persistence: same stored value, same
    // runtime session, same three Missions on screen.
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(stored);
    expect(selectCurrentSession(captured.at(-1)!)).toEqual(session);
    expect(
      screen.getAllByRole('article').map((card) =>
        card.querySelector('.mission-card__title')!.textContent,
      ),
    ).toEqual(visible);
  });

  it('starts a cycle with nothing shown and records a retired set', () => {
    const opened = inDiscovery();
    expect(selectShownMissionIds(opened)).toEqual([]);

    const advanced = appStateReducer(
      appStateReducer(opened, { type: 'discovery-category-selected', category: 'Movement' }),
      { type: 'discovery-another-set-requested', missionIds: ['a', 'b', 'c'] },
    );

    expect(selectShownMissionIds(advanced)).toEqual(['a', 'b', 'c']);
  });

  it('leaves the cycle untouched when a request is not one fresh complete group', () => {
    const cycle = appStateReducer(inDiscovery(), {
      type: 'discovery-category-selected',
      category: 'Movement',
    });
    const advanced = appStateReducer(cycle, {
      type: 'discovery-another-set-requested',
      missionIds: ['a', 'b', 'c'],
    });

    // A partial group, a padded group, a repeat of something already retired,
    // and a duplicate inside one request all leave the visible set alone rather
    // than half-replacing it.
    for (const missionIds of [['a', 'b'], ['d', 'e', 'f', 'g'], ['c', 'd', 'e'], ['d', 'd', 'e']]) {
      expect(
        appStateReducer(advanced, { type: 'discovery-another-set-requested', missionIds }),
      ).toBe(advanced);
    }

    // And a request with no cycle at all changes nothing.
    expect(
      appStateReducer(completedSetup(), {
        type: 'discovery-another-set-requested',
        missionIds: ['a', 'b', 'c'],
      }),
    ).toEqual(completedSetup());
  });

  it('resets what a cycle has shown when any of its three inputs changes', () => {
    const advanced = appStateReducer(
      appStateReducer(inDiscovery(), { type: 'discovery-category-selected', category: 'Movement' }),
      { type: 'discovery-another-set-requested', missionIds: ['a', 'b', 'c'] },
    );
    expect(selectShownMissionIds(advanced)).toHaveLength(3);

    const changes: readonly AppStateAction[] = [
      { type: 'discovery-category-selected', category: 'Calm' },
      { type: 'language-changed', language: 'de' },
      { type: 'age-band-changed', ageBand: '4–6' },
    ];

    for (const change of changes) {
      expect(selectShownMissionIds(appStateReducer(advanced, change))).toEqual([]);
    }

    // Re-choosing the same Mission Category is not a change, so the cycle runs on.
    expect(
      selectShownMissionIds(
        appStateReducer(advanced, { type: 'discovery-category-selected', category: 'Movement' }),
      ),
    ).toEqual(['a', 'b', 'c']);

    // Leaving discovery ends the cycle outright.
    expect(
      selectShownMissionIds(appStateReducer(advanced, { type: 'setup-editing-started' })),
    ).toEqual([]);
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

  it('shows suggestions without creating a Mission Session', () => {
    renderShell(inDiscovery());

    fireEvent.click(radioFor('Movement'));

    // Task 5 renders Missions; choosing one still belongs to Task 7, so no
    // selection control exists and nothing is persisted.
    expect(screen.getAllByRole('article')).toHaveLength(3);
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
