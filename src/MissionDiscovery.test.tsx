import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AppShell, selectAppView } from './AppShell';
import {
  AppStateProvider,
  appStateReducer,
  selectCurrentSession,
  selectDiscoveryCycle,
  selectSelectionIssue,
  selectMissionStartAvailable,
  selectShownMissionIds,
  type AppState,
  useAppState,
  type AppStateAction,
} from './appState';
import { MISSION_CATEGORIES, type MissionCategory } from './catalog';
import { MISSION_CATALOG } from './catalogContent';
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
const dispatched: ((action: AppStateAction) => void)[] = [];

// Drives an action the interface itself never emits, so a defensive path can be
// observed through the rendered result rather than only in the reducer.
function dispatchFrom(action: AppStateAction) {
  dispatched.at(-1)!(action);
}

function missionIdsOnScreen(): readonly string[] {
  return screen
    .getAllByRole('article')
    .map((card) =>
      card
        .querySelector('button')!
        .getAttribute('aria-describedby')!
        .replace('mission-title-', ''),
    );
}

function titlesOnScreen(): readonly (string | null)[] {
  return screen
    .getAllByRole('article')
    .map((card) => card.querySelector('.mission-card__title')!.textContent);
}

function renderDiscovery(
  memory: ReturnType<typeof memoryStorage>,
  captured: AppState[],
  createId: () => string = () => 'session-1',
) {
  function Probe() {
    const { state, dispatch } = useAppState();
    captured.push(state);
    dispatched.push(dispatch);
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

  it('explains a refused second Mission and keeps everything as it was', () => {
    const memory = memoryStorage();
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    const controls = () => screen.getAllByRole('button', { name: 'Choose this Mission' });
    fireEvent.click(controls()[0]!);

    const stored = memory.values.get(MISSIONKID_STORAGE_KEY);
    const session = selectCurrentSession(captured.at(-1)!);

    // The Mission that is already chosen, resolved from the catalog the way a
    // card resolves it.
    const chosenTitle = MISSION_CATALOG.find(
      (record) => record.missionId === session!.missionId,
    )!.content.en.title;

    fireEvent.click(controls()[1]!);

    expect(selectSelectionIssue(captured.at(-1)!)).toBe('conflict');
    const notice = document.querySelector('.mission-suggestions__issue')!;
    expect(notice.getAttribute('role')).toBe('status');
    // Naming it is what makes "choose that same Mission again" actionable: the
    // one already chosen is often not among the three on screen.
    expect(notice.textContent).toContain(chosenTitle);
    expect(notice.textContent).toMatch(/already chosen/i);
    // Refused before persistence: nothing stored changed, nothing published
    // changed, and the three Missions are still there to choose from.
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(stored);
    expect(selectCurrentSession(captured.at(-1)!)).toEqual(session);
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('reports an unconfirmed selection and lets the family choose again', () => {
    const memory = memoryStorage();
    let failWrite = true;
    const realSet = memory.storage.setItem;
    memory.storage.setItem = (key, value) => {
      if (failWrite) throw new Error('write failed');
      realSet(key, value);
    };
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    const before = screen.getAllByRole('article').map((card) =>
      card.querySelector('.mission-card__title')!.textContent,
    );

    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    expect(selectSelectionIssue(captured.at(-1)!)).toBe('unconfirmed');
    expect(screen.getByRole('alert')).toBeTruthy();
    // No false success, and the same three Missions to retry from.
    expect(selectCurrentSession(captured.at(-1)!)).toBeNull();
    expect(selectMissionStartAvailable(captured.at(-1)!)).toBe(false);
    expect(
      screen.getAllByRole('article').map((card) =>
        card.querySelector('.mission-card__title')!.textContent,
      ),
    ).toEqual(before);

    // Choosing the same Mission again is the retry. It succeeds and the
    // explanation goes with the state it described.
    failWrite = false;
    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    expect(selectSelectionIssue(captured.at(-1)!)).toBeNull();
    expect(selectCurrentSession(captured.at(-1)!)?.state).toBe('selected');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('creates no second session when a retry follows a write that had landed', () => {
    const memory = memoryStorage();
    let failReadBack = true;
    const realGet = memory.storage.getItem;
    let reads = 0;
    memory.storage.getItem = (key) => {
      reads += 1;
      // The write lands: the domain's read and the adapter's pre-write read
      // both succeed, and only the read that would confirm it fails.
      if (failReadBack && reads > 2) throw new Error('read-back failed');
      return realGet(key);
    };
    const createId = vi.fn(() => 'session-1');
    const captured: AppState[] = [];

    renderDiscovery(memory, captured, createId);
    fireEvent.click(radioFor('Movement'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    expect(selectSelectionIssue(captured.at(-1)!)).toBe('unconfirmed');
    expect(selectCurrentSession(captured.at(-1)!)).toBeNull();
    // The durable write actually landed, which the next read will reveal.
    expect(JSON.parse(memory.values.get(MISSIONKID_STORAGE_KEY)!).currentSession)
      .not.toBeNull();

    failReadBack = false;
    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    // Retrying resolves the session that was already stored rather than making
    // a second one, so no duplicate Mission Session can exist.
    expect(selectCurrentSession(captured.at(-1)!)?.sessionId).toBe('session-1');
    expect(createId).toHaveBeenCalledTimes(1);
    expect(selectSelectionIssue(captured.at(-1)!)).toBeNull();
  });

  it.each([
    ['ready', {}],
    ['active', { startedAt: 1_700_000_060_000 }],
  ] as const)('answers with a stored %s session in its own state, writing nothing', (state, extra) => {
    const memory = memoryStorage();
    const captured: AppState[] = [];
    const createId = vi.fn(() => 'must-not-be-minted');

    renderDiscovery(memory, captured, createId);
    fireEvent.click(radioFor('Movement'));

    // The Mission the family is about to choose is already the current session,
    // in a state F002 could not produce.
    const missionId = missionIdsOnScreen()[0]!;
    const mission = MISSION_CATALOG.find((record) => record.missionId === missionId)!;
    const session = {
      sessionId: 'session-existing',
      childProfileId: 'profile-1',
      missionId,
      missionCategoryAtSelection: mission.category,
      ageBandAtSelection: '7–8',
      durationSecondsAtSelection: mission.durationSeconds,
      state,
      selectedAt: 1_700_000_000_000,
      ...extra,
    };
    const stored = JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: 'profile-1', ageBand: '7–8' },
      currentSession: session,
    });
    memory.values.set(MISSIONKID_STORAGE_KEY, stored);

    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    // Runtime carries the lifecycle state storage actually holds: the session is
    // not republished as a fresh selection, no identifier is minted, and nothing
    // is written. Task 1 adds no surface for either state.
    const after = captured.at(-1)!;
    expect(selectCurrentSession(after)).toEqual(session);
    expect(selectCurrentSession(after)?.state).toBe(state);
    expect(selectMissionStartAvailable(after)).toBe(state === 'ready');
    expect(createId).not.toHaveBeenCalled();
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(stored);
    expect(selectSelectionIssue(after)).toBeNull();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('keeps the visible three when a replacement request cannot be honoured', () => {
    const memory = memoryStorage();
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    const before = titlesOnScreen();
    const onScreen = missionIdsOnScreen();

    // A malformed replacement is the reachable form of a failed request here:
    // derivation is pure and synchronous, so there is no load to fail. Each
    // request names Missions the family can currently see, so honouring one
    // would visibly retire them; the set must stay whole instead.
    for (const missionIds of [
      onScreen.slice(0, 2),
      [...onScreen, 'movement-99'],
      [onScreen[0]!, onScreen[0]!, onScreen[1]!],
    ]) {
      act(() => {
        dispatchFrom({ type: 'discovery-another-set-requested', missionIds });
      });

      expect(titlesOnScreen()).toEqual(before);
      expect(screen.getAllByRole('article')).toHaveLength(3);
      expect(
        screen.getAllByRole('button', { name: 'Choose this Mission' }),
      ).toHaveLength(3);
      // The bounded end is a different state and must not be claimed here.
      expect(screen.getByRole('button', { name: 'Another set' })).toBeTruthy();
    }
  });

  it('records exactly one selected session and starts no timer', () => {
    const memory = memoryStorage();
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    const stored = JSON.parse(memory.values.get(MISSIONKID_STORAGE_KEY)!);

    expect(stored.snapshotVersion).toBe(1);
    expect(stored.currentSession.state).toBe('selected');
    expect(stored.currentSession.sessionId).toBe('session-1');
    expect(stored.currentSession.selectedAt).toBe(1_700_000_000_000);
    // The start experience is offered, but nothing about it has begun: no
    // lifecycle timestamp beyond the selection itself exists to be recovered.
    expect(selectMissionStartAvailable(captured.at(-1)!)).toBe(true);
    expect(Object.hasOwn(stored.currentSession, 'startedAt')).toBe(false);
    expect(Object.hasOwn(stored.currentSession, 'completedAt')).toBe(false);
    expect(Object.keys(stored.currentSession).sort()).toEqual([
      'ageBandAtSelection',
      'childProfileId',
      'durationSecondsAtSelection',
      'missionCategoryAtSelection',
      'missionId',
      'sessionId',
      'selectedAt',
      'state',
    ].sort());
  });

  it('adds no completed record, result pointer or progress source by discovering', () => {
    const memory = memoryStorage();
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);

    // Viewing.
    fireEvent.click(radioFor('Movement'));
    expect(screen.getAllByRole('article')).toHaveLength(3);
    // Replacing.
    fireEvent.click(screen.getByRole('button', { name: 'Another set' }));
    // Choosing.
    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    const stored = JSON.parse(memory.values.get(MISSIONKID_STORAGE_KEY)!);

    // A Mission Session in `selected` is the only thing discovery may record.
    // Recognition, History and progress all require a completed session, and
    // none exists.
    expect(stored.currentSession.state).toBe('selected');
    expect(stored.completedSessions).toEqual([]);
    expect(stored.currentResultSessionId).toBeNull();
    expect(Object.keys(stored).sort()).toEqual([
      'childProfile',
      'completedSessions',
      'currentResultSessionId',
      'currentSession',
      'settings',
      'snapshotVersion',
    ]);
    // Discovery may offer the secondary route to the private record, but it
    // presents no recognition, no History entry and no progress figure of its
    // own — those all require a completed session, and none exists.
    expect(
      screen.queryByText(/Reward|Monthly Goal|Mission done|Start mission/i),
    ).toBeNull();
    expect(screen.queryByText(/\d+ \/ \d+ missions/)).toBeNull();
    expect(screen.queryByText('You did it.')).toBeNull();
    expect(document.querySelector('.mission-history__entries')).toBeNull();
    expect(document.querySelector('.mission-history__goal')).toBeNull();
  });

  it('asks for nothing about the child and offers no social or payment behaviour', () => {
    const memory = memoryStorage();
    const captured: AppState[] = [];

    const { container } = renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);

    // Choosing a Mission Category is the only input discovery has. Nothing
    // collects a name, a birth date, contact details, a photo or proof.
    for (const input of Array.from(container.querySelectorAll('input'))) {
      expect(input.getAttribute('type')).toBe('radio');
      expect(input.getAttribute('name')).toBe('discovery-category');
    }
    expect(container.querySelector('textarea, select, form, video, audio, img')).toBeNull();
    expect(
      screen.queryByText(
        /chat|message|share|invite|friend|follow|like|leaderboard|rank|score|streak|buy|pay|price|premium|subscribe|upgrade|block|lock screen|photo|upload|prove/i,
      ),
    ).toBeNull();

    // And nothing identifying reaches storage: the session keeps a Mission
    // reference and the immutable facts of the choice.
    const raw = memory.values.get(MISSIONKID_STORAGE_KEY)!;
    for (const forbidden of [
      'name', 'birth', 'email', 'phone', 'address', 'location', 'school',
      'photo', 'video', 'proof', 'password', 'token', 'payment',
    ]) {
      expect(raw.toLowerCase()).not.toContain(forbidden);
    }
  });

  it('drops a recovery message that no longer describes anything', () => {
    const memory = memoryStorage();
    memory.storage.setItem = () => {
      throw new Error('write failed');
    };
    const captured: AppState[] = [];

    renderDiscovery(memory, captured);
    fireEvent.click(radioFor('Movement'));
    fireEvent.click(screen.getAllByRole('button', { name: 'Choose this Mission' })[0]!);
    expect(selectSelectionIssue(captured.at(-1)!)).toBe('unconfirmed');

    fireEvent.click(radioFor('Calm'));

    // A different Mission Category is a different cycle: the old explanation
    // does not follow it there.
    expect(selectSelectionIssue(captured.at(-1)!)).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
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
