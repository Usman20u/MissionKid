import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';
import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type MissionKidSnapshot,
  type SnapshotStorage,
} from './persistence';

function completedSnapshot(): MissionKidSnapshot {
  return {
    ...createEmptySnapshot(),
    childProfile: { localProfileId: 'stable-local-profile', ageBand: '7–8' },
  };
}

type Faults = {
  read: boolean;
  write: boolean;
  corruptOnWrite: boolean;
  readFailsAfterWrite: boolean;
};

function harness(raw?: string) {
  const values = new Map<string, string>([['unrelated', 'keep']]);
  if (raw !== undefined) values.set(MISSIONKID_STORAGE_KEY, raw);
  const faults: Faults = {
    read: false,
    write: false,
    corruptOnWrite: false,
    readFailsAfterWrite: false,
  };
  const storage: SnapshotStorage = {
    getItem(key) {
      if (faults.read) throw new Error('PRIVATE RAW STORAGE ERROR');
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      if (faults.corruptOnWrite) values.set(key, '{not-json');
      if (faults.readFailsAfterWrite) faults.read = true;
      if (faults.write) throw new Error('PRIVATE RAW STORAGE ERROR');
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
  };
  return { values, faults, adapter: createPersistenceAdapter(storage) };
}

function click(name: string | RegExp) {
  fireEvent.click(screen.getByRole('button', { name }));
}

describe('F001 semantic structure', () => {
  it('exposes one labelled region, one level-1 heading, and native grouped controls', () => {
    const h = harness();
    const { container } = render(<App adapter={h.adapter} />);

    const region = screen.getByRole('region', { name: 'Parent setup' });
    const heading = screen.getByRole('heading', { level: 1, name: 'Parent setup' });

    expect(region.getAttribute('aria-labelledby')).toBe(heading.id);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    // Exactly the two approved F001 choice groups: the fieldset that only
    // carries the native disabled cascade must not announce a third group.
    const groups = screen.getAllByRole('group');
    expect(groups.map((group) => group.tagName)).toEqual(['FIELDSET', 'FIELDSET']);
    expect(
      groups.map((group) => group.querySelector('legend')?.textContent),
    ).toEqual(['Interface language', "Child's age group"]);

    for (const radio of screen.getAllByRole('radio')) {
      expect(radio.tagName).toBe('INPUT');
      expect((radio as HTMLInputElement).type).toBe('radio');
      expect(radio.closest('label')).not.toBeNull();
    }

    // Tab order follows the DOM: nothing overrides it with a positive index.
    expect(container.querySelectorAll('[tabindex]:not([tabindex="-1"])')).toHaveLength(0);
    expect(heading.getAttribute('tabindex')).toBe('-1');
  });

  it('keeps the blocked continue action explained by visible required context', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    const submit = screen.getByRole('button', { name: 'Complete setup' }) as HTMLButtonElement;
    const required = screen.getByText('Required: choose one age group to continue.');

    expect(submit.disabled).toBe(true);
    expect(submit.getAttribute('aria-describedby')).toContain(required.id);

    fireEvent.click(screen.getByRole('radio', { name: '7–8' }));
    expect(submit.disabled).toBe(false);
  });

  it('nests the reset confirmation under the view heading without skipping a level', () => {
    const h = harness(JSON.stringify(completedSnapshot()));
    render(<App adapter={h.adapter} />);

    click('Reset MissionKid data');

    expect(screen.getByRole('heading', { level: 1, name: 'Setup complete' })).toBeTruthy();
    const confirmation = screen.getByRole('region', { name: 'Reset MissionKid data' });
    expect(
      within(confirmation).getByRole('heading', { level: 2, name: 'Reset MissionKid data' }),
    ).toBeTruthy();
    expect(
      document.getElementById(confirmation.getAttribute('aria-describedby') ?? '')?.textContent,
    ).toMatch(/cannot recover them/);
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Confirm reset' })).toBeTruthy();
  });

  it('announces the busy region while an action is unconfirmed', () => {
    const h = harness(JSON.stringify(completedSnapshot()));
    const actualReset = h.adapter.reset;
    vi.spyOn(h.adapter, 'reset').mockImplementation(() => {
      // The view region owns the busy state; the reset panel is a nested region.
      expect(
        screen.getByRole('region', { name: 'Setup complete' }).getAttribute('aria-busy'),
      ).toBe('true');
      expect(
        screen.getByRole('button', { name: 'Confirm reset' }).closest('fieldset')?.disabled,
      ).toBe(true);
      return actualReset();
    });

    render(<App adapter={h.adapter} />);
    click('Reset MissionKid data');
    click('Confirm reset');

    expect(screen.getByRole('heading', { level: 1, name: 'Parent setup' })).toBeTruthy();
  });
});

describe('F001 deliberate focus movement', () => {
  it('moves focus to the new view heading when setup completes', () => {
    const h = harness();
    render(<App adapter={h.adapter} createProfileId={() => 'local-profile-1'} />);

    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    click('Complete setup');

    expect(document.activeElement).toBe(
      screen.getByRole('heading', { level: 1, name: 'Setup complete' }),
    );
  });

  it('moves focus to the heading when editing replaces the completed summary', () => {
    const h = harness(JSON.stringify(completedSnapshot()));
    render(<App adapter={h.adapter} />);

    click('Change setup');

    expect(document.activeElement).toBe(
      screen.getByRole('heading', { level: 1, name: 'Setup settings' }),
    );
  });

  it('moves focus to the confirmation heading when reset consequences appear', () => {
    const h = harness(JSON.stringify(completedSnapshot()));
    render(<App adapter={h.adapter} />);

    click('Reset MissionKid data');

    expect(document.activeElement).toBe(
      screen.getByRole('heading', { level: 2, name: 'Reset MissionKid data' }),
    );
  });

  it('returns focus to the reset control when the parent cancels', () => {
    const h = harness(JSON.stringify(completedSnapshot()));
    render(<App adapter={h.adapter} />);

    click('Reset MissionKid data');
    click('Cancel');

    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Reset MissionKid data' }),
    );
  });

  it('moves focus to the fresh setup heading after a confirmed reset', () => {
    const h = harness(JSON.stringify(completedSnapshot()));
    render(<App adapter={h.adapter} />);

    click('Reset MissionKid data');
    click('Confirm reset');

    const heading = screen.getByRole('heading', { level: 1, name: 'Parent setup' });
    expect(document.activeElement).toBe(heading);
    expect(document.activeElement).not.toBe(
      screen.getByRole('button', { name: 'Reset MissionKid data' }),
    );
  });

  it('moves focus to the recovery heading when protected state replaces setup', () => {
    const h = harness();
    h.faults.corruptOnWrite = true;
    h.faults.write = true;
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    click('Complete setup');

    expect(document.activeElement).toBe(
      screen.getByRole('heading', { level: 1, name: 'Recovery needed' }),
    );
    expect(screen.getByRole('alert').textContent).toMatch(/cannot currently be used/);
    expect(screen.queryByText(/PRIVATE RAW/)).toBeNull();
  });

  it('moves focus to the temporary mode heading when durable storage becomes unavailable', () => {
    const h = harness();
    // The pre-write read succeeds; storage only becomes unreadable afterwards,
    // so recovery reports unavailable and the parent lands in temporary mode.
    h.faults.write = true;
    h.faults.readFailsAfterWrite = true;
    render(<App adapter={h.adapter} createProfileId={() => 'temporary-profile'} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Parent setup' })).toBeTruthy();

    fireEvent.click(screen.getByRole('radio', { name: '7–8' }));
    click('Complete setup');

    const heading = screen.getByRole('heading', { level: 1, name: 'Temporary mode' });
    expect(document.activeElement).toBe(heading);
    expect(screen.getByRole('alert').textContent).toMatch(/Temporary mode/);
    expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
  });

  it('announces an in-place save failure without taking focus from the form', () => {
    const h = harness();
    h.faults.write = true;
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    click('Complete setup');

    const alert = screen.getByRole('alert');
    const submit = screen.getByRole('button', { name: 'Complete setup' });

    expect(alert.textContent).toMatch(/Saving could not be confirmed/);
    expect(submit.getAttribute('aria-describedby')).toContain(alert.id);
    expect(document.activeElement).not.toBe(
      screen.getByRole('heading', { level: 1, name: 'Parent setup' }),
    );
  });

  it('does not take focus when only the presentation language changes', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    const german = screen.getByRole('radio', { name: 'Deutsch' });
    german.focus();
    fireEvent.click(german);

    expect(screen.getByRole('heading', { level: 1, name: 'Einrichtung durch Eltern' })).toBeTruthy();
    expect(document.documentElement.lang).toBe('de');
    expect(document.activeElement).toBe(german);
  });
});

describe('F001 localization resilience', () => {
  it.each([
    { language: 'Deutsch', lang: 'de', reset: 'MissionKid-Daten zurücksetzen', cancel: 'Abbrechen' },
    { language: 'Русский', lang: 'ru', reset: 'Сбросить данные MissionKid', cancel: 'Отмена' },
  ])('keeps reset confirmation semantics in $lang', ({ language, lang, reset, cancel }) => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('radio', { name: language }));
    expect(document.documentElement.lang).toBe(lang);

    click(reset);

    const confirmation = screen.getByRole('region', { name: reset });
    expect(document.activeElement).toBe(
      within(confirmation).getByRole('heading', { level: 2, name: reset }),
    );
    expect(within(confirmation).getByRole('button', { name: cancel })).toBeTruthy();

    click(cancel);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: reset }));
  });
});
