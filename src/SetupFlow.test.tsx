import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';
import { resolveHydrationResult } from './appState';
import { translateMessage } from './localization';
import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type MissionKidSnapshot,
  type PersistenceAdapter,
  type SnapshotStorage,
} from './persistence';

type AdapterHarness = Readonly<{
  adapter: PersistenceAdapter;
  values: Map<string, string>;
  setCalls: Array<readonly [string, string]>;
}>;

function createAdapterHarness(
  initialSnapshot?: MissionKidSnapshot,
): AdapterHarness {
  const values = new Map<string, string>();
  const setCalls: Array<readonly [string, string]> = [];

  if (initialSnapshot) {
    values.set(MISSIONKID_STORAGE_KEY, JSON.stringify(initialSnapshot));
  }

  const storage: SnapshotStorage = {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      setCalls.push([key, value]);
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
  };

  return {
    adapter: createPersistenceAdapter(storage),
    values,
    setCalls,
  };
}

function createCompletedSnapshot(
  language: 'en' | 'de' | 'ru' = 'en',
): MissionKidSnapshot {
  return {
    ...createEmptySnapshot(),
    settings: { language },
    childProfile: {
      localProfileId: 'stable-local-profile',
      ageBand: '7–8',
    },
  };
}

describe('parent-guided first-use setup', () => {
  it('defaults to English and requests only the approved setup choices', () => {
    const harness = createAdapterHarness();
    const { container } = render(
      <App
        adapter={harness.adapter}
        createProfileId={() => 'local-profile-1'}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Parent setup' }),
    ).toBeTruthy();
    expect(
      screen.getByText(/A parent or caregiver sets up the language/),
    ).toBeTruthy();
    expect(document.documentElement.lang).toBe('en');

    const languageGroup = screen.getByRole('group', {
      name: 'Interface language',
    });
    const languageChoices = within(languageGroup).getAllByRole('radio');

    expect(languageChoices).toHaveLength(3);
    expect(languageChoices.map((choice) => choice.getAttribute('value'))).toEqual(
      ['en', 'de', 'ru'],
    );
    expect(
      (within(languageGroup).getByRole('radio', {
        name: 'English',
      }) as HTMLInputElement).checked,
    ).toBe(true);

    const ageGroup = screen.getByRole('group', {
      name: "Child's age group",
    });
    const ageChoices = within(ageGroup).getAllByRole('radio');

    expect(ageChoices).toHaveLength(3);
    expect(ageChoices.map((choice) => choice.getAttribute('value'))).toEqual([
      '4–6',
      '7–8',
      '9–10',
    ]);
    expect(
      (screen.getByRole('button', {
        name: 'Complete setup',
      }) as HTMLButtonElement).disabled,
    ).toBe(true);
    expect(container.querySelector('input[type="text"]')).toBeNull();
    expect(container.querySelector('input[type="date"]')).toBeNull();
    expect(container.querySelector('input[type="email"]')).toBeNull();
    expect(container.querySelector('input[type="password"]')).toBeNull();
    expect(container.querySelector('input[type="file"]')).toBeNull();
  });

  it.each([
    { label: 'English', language: 'en', title: 'Parent setup' },
    { label: 'Deutsch', language: 'de', title: 'Einrichtung durch Eltern' },
    {
      label: 'Русский',
      language: 'ru',
      title: 'Настройка для родителей',
    },
  ] as const)(
    'presents the full setup in $language',
    ({ label, language, title }) => {
      const harness = createAdapterHarness();
      render(<App adapter={harness.adapter} />);

      fireEvent.click(screen.getByRole('radio', { name: label }));

      expect(screen.getByRole('heading', { name: title })).toBeTruthy();
      expect(document.documentElement.lang).toBe(language);
    },
  );

  it.each(['4–6', '7–8', '9–10'] as const)(
    'allows the stable $ageBand age band to be the one active choice',
    (ageBand) => {
      const harness = createAdapterHarness();
      render(<App adapter={harness.adapter} />);

      const selected = screen.getByRole('radio', { name: ageBand });
      fireEvent.click(selected);

      expect((selected as HTMLInputElement).checked).toBe(true);
      expect(
        within(
          screen.getByRole('group', { name: "Child's age group" }),
        )
          .getAllByRole('radio')
          .filter((choice) => (choice as HTMLInputElement).checked),
      ).toHaveLength(1);
      expect(
        (screen.getByRole('button', {
          name: 'Complete setup',
        }) as HTMLButtonElement).disabled,
      ).toBe(false);
    },
  );

  it('shows the handoff only after the complete snapshot is durably confirmed', () => {
    const harness = createAdapterHarness();
    const createProfileId = vi.fn(() => 'local-profile-1');
    render(
      <App
        adapter={harness.adapter}
        createProfileId={createProfileId}
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    expect(screen.queryByText(/language and age group are saved/i)).toBeNull();
    expect(createProfileId).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));

    expect(
      screen.getByRole('heading', { name: 'Setup complete' }),
    ).toBeTruthy();
    expect(screen.getByText(/language and age group are saved/i)).toBeTruthy();
    expect(harness.setCalls).toHaveLength(1);
    expect(createProfileId).toHaveBeenCalledTimes(1);
    expect(
      JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY) ?? ''),
    ).toEqual({
      ...createEmptySnapshot(),
      childProfile: {
        localProfileId: 'local-profile-1',
        ageBand: '9–10',
      },
    });
  });

  it('keeps valid runtime choices without claiming durable success after failure', () => {
    const failedAdapter: PersistenceAdapter = {
      hydrate: () => ({ status: 'absent' }),
      persist: () => ({ status: 'unconfirmed', reason: 'write-failed' }),
      reset: () => ({ status: 'confirmed' }),
    };
    render(
      <App
        adapter={failedAdapter}
        createProfileId={() => 'local-profile-1'}
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Deutsch' }));
    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Einrichtung abschließen' }),
    );

    expect(screen.queryByText('Einrichtung abgeschlossen')).toBeNull();
    expect(screen.getByRole('alert').textContent).toMatch(
      /Speichern konnte nicht bestätigt werden/i,
    );
    expect(
      (screen.getByRole('radio', { name: '4–6' }) as HTMLInputElement)
        .checked,
    ).toBe(true);
    expect(document.documentElement.lang).toBe('de');
  });
});

describe('returning and editing setup', () => {
  it.each([
    { age: 'missing', profile: { localProfileId: 'existing-profile' } },
    { age: 'invalid', profile: { localProfileId: 'existing-profile', ageBand: '10–12' } },
  ])('preserves identity through incomplete $age age and a confirmed save', ({ profile }) => {
    const harness = createAdapterHarness();
    const raw = JSON.stringify({ ...createEmptySnapshot(), childProfile: profile });
    harness.values.set(MISSIONKID_STORAGE_KEY, raw);
    const createProfileId = vi.fn(() => 'must-not-be-created');

    expect(resolveHydrationResult(harness.adapter.hydrate())).toEqual({
      language: 'en', ageBand: null, localProfileId: 'existing-profile',
      status: 'ready', setupView: 'incomplete', saveStatus: 'idle',
    });
    render(<App adapter={harness.adapter} createProfileId={createProfileId} />);
    expect(screen.getByRole('heading', { name: 'Parent setup needs attention' })).toBeTruthy();
    expect(screen.getAllByRole('radio').filter((radio) =>
      radio.getAttribute('name') === 'setup-age-band' && (radio as HTMLInputElement).checked,
    )).toHaveLength(0);
    expect((screen.getByRole('button', { name: 'Complete setup' }) as HTMLButtonElement).disabled).toBe(true);
    expect(harness.setCalls).toHaveLength(0);

    fireEvent.click(screen.getByRole('radio', { name: '7–8' }));
    expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));

    expect(screen.getByRole('heading', { name: 'Setup complete' })).toBeTruthy();
    expect(createProfileId).not.toHaveBeenCalled();
    expect(JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: 'existing-profile', ageBand: '7–8' },
    });
  });

  it.each([undefined, '10–12'])(
    'retains incomplete-profile identity after failed save and retry with stored age %s',
    (ageBand) => {
      const harness = createAdapterHarness();
      const raw = JSON.stringify({
        ...createEmptySnapshot(),
        childProfile: { localProfileId: 'existing-profile', ageBand },
      });
      harness.values.set(MISSIONKID_STORAGE_KEY, raw);
      vi.spyOn(harness.adapter, 'persist').mockReturnValueOnce({
        status: 'unconfirmed', reason: 'write-failed',
      });
      const createProfileId = vi.fn(() => 'must-not-be-created');
      render(<App adapter={harness.adapter} createProfileId={createProfileId} />);

      fireEvent.click(screen.getByRole('radio', { name: '7–8' }));
      fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));
      expect(screen.getByRole('alert')).toBeTruthy();
      expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
      expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
      expect(resolveHydrationResult(harness.adapter.hydrate()).localProfileId).toBe('existing-profile');

      // Recovery restores the incomplete durable age; select a valid age again.
      fireEvent.click(screen.getByRole('radio', { name: '7–8' }));
      expect(screen.getByRole('alert')).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));
      expect(screen.queryByRole('alert')).toBeNull();
      expect(screen.getByRole('heading', { name: 'Setup complete' })).toBeTruthy();
      expect(createProfileId).not.toHaveBeenCalled();
      expect(JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual({
        ...createEmptySnapshot(),
        childProfile: { localProfileId: 'existing-profile', ageBand: '7–8' },
      });
    },
  );

  it('restores valid F001 state without repeating first-use setup', () => {
    const harness = createAdapterHarness(createCompletedSnapshot('ru'));
    render(<App adapter={harness.adapter} />);

    expect(
      screen.getByRole('heading', { name: 'Настройка завершена' }),
    ).toBeTruthy();
    expect(screen.getByText('7–8')).toBeTruthy();
    expect(screen.queryByRole('group')).toBeNull();
    expect(document.documentElement.lang).toBe('ru');
    expect(harness.setCalls).toEqual([]);
  });

  it('changes localized presentation while preserving profile and age identity', () => {
    const harness = createAdapterHarness(createCompletedSnapshot());
    render(<App adapter={harness.adapter} />);

    fireEvent.click(screen.getByRole('button', { name: 'Change setup' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Русский' }));

    expect(
      screen.getByRole('heading', { name: 'Изменить настройки' }),
    ).toBeTruthy();
    expect(
      (screen.getByRole('radio', { name: '7–8' }) as HTMLInputElement)
        .checked,
    ).toBe(true);

    fireEvent.click(
      screen.getByRole('button', { name: 'Сохранить изменения' }),
    );

    const storedSnapshot = JSON.parse(
      harness.values.get(MISSIONKID_STORAGE_KEY) ?? '',
    ) as MissionKidSnapshot;

    expect(storedSnapshot.settings.language).toBe('ru');
    expect(storedSnapshot.childProfile).toEqual({
      localProfileId: 'stable-local-profile',
      ageBand: '7–8',
    });
    expect(
      screen.getByRole('heading', { name: 'Настройка завершена' }),
    ).toBeTruthy();
  });

  it('changes age context without replacing the stable local profile', () => {
    const harness = createAdapterHarness(createCompletedSnapshot());
    render(<App adapter={harness.adapter} />);

    fireEvent.click(screen.getByRole('button', { name: 'Change setup' }));
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

    const storedSnapshot = JSON.parse(
      harness.values.get(MISSIONKID_STORAGE_KEY) ?? '',
    ) as MissionKidSnapshot;

    expect(storedSnapshot.childProfile).toEqual({
      localProfileId: 'stable-local-profile',
      ageBand: '9–10',
    });
    expect(storedSnapshot.currentSession).toBeNull();
    expect(storedSnapshot.completedSessions).toEqual([]);
  });

  it.each(['en', 'de', 'ru'] as const)(
    'states browser-local persistence in the confirmed setup body in %s',
    (language) => {
      const harness = createAdapterHarness(createCompletedSnapshot(language));
      const { container } = render(<App adapter={harness.adapter} />);

      expect(
        screen.getByText(translateMessage(language, 'setup.complete.body')),
      ).toBeTruthy();
      // The approved boundary is one browser, never the whole device.
      expect(container.textContent).not.toMatch(
        /this device|diesem Gerät|этом устройстве/,
      );
    },
  );

  it('contains no unauthorized later-function interface', () => {
    const harness = createAdapterHarness();
    render(<App adapter={harness.adapter} />);

    expect(screen.queryByText(/Mission Category/i)).toBeNull();
    expect(screen.queryByText(/Mission suggestions/i)).toBeNull();
    expect(screen.queryByText(/Start mission/i)).toBeNull();
    expect(screen.queryByText(/Mission done/i)).toBeNull();
    expect(screen.queryByText(/Reward Card/i)).toBeNull();
    expect(screen.queryByText(/Mission History/i)).toBeNull();
    expect(screen.queryByText(/Monthly Goal/i)).toBeNull();
  });
});

describe('Task 5 save and editing regressions', () => {
  it('keeps the warning across language and age edits until a confirmed retry', () => {
    const harness = createAdapterHarness();
    const persist = vi.spyOn(harness.adapter, 'persist');
    persist.mockReturnValueOnce({ status: 'unconfirmed', reason: 'write-failed' });
    const createProfileId = vi.fn(() => 'stable-retry-profile');
    render(<App adapter={harness.adapter} createProfileId={createProfileId} />);

    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));
    expect(screen.getByRole('alert').textContent).toMatch(/may be temporary and lost/);
    expect(screen.queryByText(/language and age group are saved/)).toBeNull();
    expect(harness.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);

    fireEvent.click(screen.getByRole('radio', { name: 'Deutsch' }));
    expect(screen.getByRole('alert').textContent).toMatch(/vorübergehend.*verloren gehen/);
    expect(document.documentElement.lang).toBe('de');

    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    expect(screen.getByRole('alert').textContent).toMatch(/Speichern konnte nicht bestätigt werden/);
    expect((screen.getByRole('radio', { name: '9–10' }) as HTMLInputElement).checked).toBe(true);
    expect(persist).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Einrichtung abschließen' }));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Einrichtung abgeschlossen' })).toBeTruthy();
    expect(createProfileId).toHaveBeenCalledTimes(1);
    expect(JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual({
      ...createEmptySnapshot(), settings: { language: 'de' },
      childProfile: { localProfileId: 'stable-retry-profile', ageBand: '9–10' },
    });
  });

  it.each(['{broken', JSON.stringify({ snapshotVersion: 2 })])(
    'validates durable data again before submit and never overwrites %s',
    (raw) => {
      const harness = createAdapterHarness();
      render(<App adapter={harness.adapter} />);
      harness.values.set(MISSIONKID_STORAGE_KEY, raw);
      fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
      fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));

      expect(screen.getByRole('alert')).toBeTruthy();
      expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
      expect(harness.setCalls).toHaveLength(0);
      expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    },
  );

  it('restores validated durable choices after an editing failure without a success handoff', () => {
    const snapshot = createCompletedSnapshot();
    const harness = createAdapterHarness(snapshot);
    vi.spyOn(harness.adapter, 'persist').mockReturnValueOnce({
      status: 'unconfirmed', reason: 'write-failed',
    });
    render(<App adapter={harness.adapter} />);
    fireEvent.click(screen.getByRole('button', { name: 'Change setup' }));
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Deutsch' }));
    fireEvent.click(screen.getByRole('button', { name: 'Änderungen speichern' }));

    expect(screen.getByRole('heading', { name: 'Setup settings' })).toBeTruthy();
    expect(screen.getByRole('alert')).toBeTruthy();
    expect((screen.getByRole('radio', { name: 'English' }) as HTMLInputElement).checked).toBe(true);
    expect((screen.getByRole('radio', { name: '7–8' }) as HTMLInputElement).checked).toBe(true);
    expect(JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual(snapshot);
    expect(screen.queryByText(/language and age group are saved/)).toBeNull();
  });

  it('does not hand off on an unconfirmed read-back, even if recovery finds the write', () => {
    const harness = createAdapterHarness();
    const persist = harness.adapter.persist;
    vi.spyOn(harness.adapter, 'persist').mockImplementationOnce((snapshot) => {
      expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
      persist(snapshot);
      return { status: 'unconfirmed', reason: 'read-back-failed' };
    });
    const createProfileId = vi.fn(() => 'profile');
    render(<App adapter={harness.adapter} createProfileId={createProfileId} />);
    fireEvent.click(screen.getByRole('radio', { name: '7–8' }));
    fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));

    expect(screen.getByRole('alert').textContent).toMatch(/Saving could not be confirmed/);
    expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Complete setup' }));
    expect(screen.getByRole('heading', { name: 'Setup complete' })).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
    expect(createProfileId).toHaveBeenCalledTimes(1);
  });

  it.each([
    { language: 'en', edit: 'Change setup', save: 'Save changes', complete: 'Setup complete',
      languageEffect: /After saving, the chosen language applies to interface text and Mission presentation going forward\./,
      ageEffect: /future Mission suggestions only\. Existing selected, ready, or active Missions, completed history, and recorded progress remain unchanged\./ },
    { language: 'de', edit: 'Einrichtung ändern', save: 'Änderungen speichern', complete: 'Einrichtung abgeschlossen',
      languageEffect: /Nach dem Speichern gilt die gewählte Sprache für die weitere Anzeige der Benutzeroberfläche und der Missionen\./,
      ageEffect: /nur künftige Missionsvorschläge\. Bereits ausgewählte, startbereite oder aktive Missionen, der Verlauf abgeschlossener Missionen und gespeicherte Fortschritte bleiben unverändert\./ },
    { language: 'ru', edit: 'Изменить настройку', save: 'Сохранить изменения', complete: 'Настройка завершена',
      languageEffect: /После сохранения выбранный язык будет использоваться для дальнейшего отображения интерфейса и миссий\./,
      ageEffect: /только на будущие предложения миссий\. Уже выбранные, готовые к началу или активные миссии, история завершённых миссий и сохранённый прогресс остаются без изменений\./ },
  ] as const)('explains and saves editing consistently in $language', (scenario) => {
    const harness = createAdapterHarness(createCompletedSnapshot(scenario.language));
    render(<App adapter={harness.adapter} />);
    expect(screen.queryByText(scenario.languageEffect)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: scenario.edit }));
    expect(screen.getByText(scenario.languageEffect)).toBeTruthy();
    expect(screen.getByText(scenario.ageEffect)).toBeTruthy();
    expect(screen.getAllByRole('radio')).toHaveLength(6);
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    fireEvent.click(screen.getByRole('button', { name: scenario.save }));
    expect(screen.getByRole('heading', { name: scenario.complete })).toBeTruthy();
    expect(document.documentElement.lang).toBe(scenario.language);
    expect(JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual({
      ...createCompletedSnapshot(scenario.language),
      childProfile: { localProfileId: 'stable-local-profile', ageBand: '9–10' },
    });
  });
});
