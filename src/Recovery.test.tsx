import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { AppShell } from './AppShell';
import { saveSetup } from './setup';
import { AppStateProvider, appStateReducer, isSetupContextComplete, resolveHydrationResult, useAppState, type AppState } from './appState';
import { translateMessage, type SupportedLanguage } from './localization';
import { createEmptySnapshot, createPersistenceAdapter, MISSIONKID_STORAGE_KEY,
  type MissionKidSnapshot, type SnapshotStorage } from './persistence';

function completed(language: SupportedLanguage = 'en'): MissionKidSnapshot {
  return { ...createEmptySnapshot(), settings: { language },
    childProfile: { localProfileId: 'existing-profile', ageBand: '7–8' } };
}

function harness(raw?: string) {
  const values = new Map<string, string>([['unrelated', 'keep']]);
  if (raw !== undefined) values.set(MISSIONKID_STORAGE_KEY, raw);
  const faults = { read: false, write: false, remove: false, afterRemove: false, keep: false };
  const calls: string[] = [];
  const storage: SnapshotStorage = {
    getItem(key) {
      calls.push(`read:${key}`);
      if (faults.read) throw new Error('PRIVATE RAW STORAGE ERROR');
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      calls.push(`write:${key}`);
      if (faults.write) throw new Error('PRIVATE RAW STORAGE ERROR');
      values.set(key, value);
    },
    removeItem(key) {
      calls.push(`remove:${key}`);
      if (faults.remove) throw new Error('PRIVATE RAW STORAGE ERROR');
      if (!faults.keep) values.delete(key);
      if (faults.afterRemove) faults.read = true;
    },
  };
  return { values, faults, calls, adapter: createPersistenceAdapter(storage) };
}

function click(name: string) { fireEvent.click(screen.getByRole('button', { name })); }

describe('F001 recovery and reset', () => {
  it('allows clearly temporary choices on unavailable load, then adopts changed durable state without a write or merge', () => {
    const h = harness();
    h.faults.read = true;
    const id = vi.fn(() => 'temporary-profile');
    render(<App adapter={h.adapter} createProfileId={id} />);
    expect(screen.getByRole('alert').textContent).toMatch(/Temporary mode.*not confirmed saved.*Refreshing or closing may lose/);
    expect(screen.queryByText(/PRIVATE RAW/)).toBeNull();
    expect(id).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    click('Use choices temporarily');
    expect(screen.getByRole('status').textContent).toMatch(/this page only, not confirmed saved/);
    expect(id).toHaveBeenCalledTimes(1);
    expect(h.calls.some((call) => call.startsWith('write:'))).toBe(false);
    expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
    h.values.set(MISSIONKID_STORAGE_KEY, JSON.stringify(completed('ru')));
    h.faults.read = false;
    h.calls.length = 0;
    click('Retry browser storage');
    expect(h.calls).toEqual([`read:${MISSIONKID_STORAGE_KEY}`]);
    expect(screen.getByRole('heading', { name: 'Настройка завершена' })).toBeTruthy();
    expect(screen.getByText('7–8')).toBeTruthy();
    expect(JSON.parse(h.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual(completed('ru'));
  });

  it('retries absent storage without silently saving temporary choices', () => {
    const h = harness(); h.faults.read = true;
    render(<App adapter={h.adapter} />);
    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    h.faults.read = false;
    click('Retry browser storage');
    expect(screen.getByRole('heading', { name: 'Parent setup' })).toBeTruthy();
    expect((screen.getByRole('button', { name: 'Complete setup' }) as HTMLButtonElement).disabled).toBe(true);
    expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);
  });

  it.each(['{bad', JSON.stringify({ snapshotVersion: 99 })])('protects blocked data %s during load and retry', (raw) => {
    const h = harness(raw);
    render(<App adapter={h.adapter} />);
    expect(screen.getByRole('alert').textContent).toMatch(/cannot currently be used/);
    expect(screen.queryByRole('radio')).toBeNull();
    click('Retry browser storage');
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.calls.every((call) => call.startsWith('read:'))).toBe(true);
    h.faults.read = true;
    click('Retry browser storage');
    expect(screen.queryByRole('radio')).toBeNull();
    expect(screen.queryByText(/PRIVATE RAW|snapshotVersion|JSON/)).toBeNull();
  });

  it('shows consequences first and cancels without changing durable data', () => {
    const raw = JSON.stringify(completed()); const h = harness(raw);
    render(<App adapter={h.adapter} />);
    expect(screen.queryByRole('button', { name: 'Confirm reset' })).toBeNull();
    click('Reset MissionKid data');
    expect(screen.getByText(/Reset removes MissionKid settings/).textContent).toMatch(/cannot recover.*no account or cloud backup/);
    expect(h.calls.some((call) => call.startsWith('remove:'))).toBe(false);
    click('Cancel');
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(screen.getByRole('heading', { name: 'Setup complete' })).toBeTruthy();
  });

  it.each(['en', 'de', 'ru'] as const)('confirms namespaced absence before fresh English setup from %s', (language) => {
    const h = harness(JSON.stringify(completed(language)));
    const reset = h.adapter.reset;
    vi.spyOn(h.adapter, 'reset').mockImplementation(() => {
      expect(screen.getByRole('status').textContent).toBe(translateMessage(language, 'recovery.pending'));
      expect(screen.queryByRole('heading', { name: 'Parent setup' })).toBeNull();
      expect(screen.getByRole('button', { name: translateMessage(language, 'recovery.confirmReset') }).closest('fieldset')?.disabled).toBe(true);
      return reset();
    });
    render(<App adapter={h.adapter} />);
    click(translateMessage(language, 'recovery.resetTitle'));
    expect(screen.getByText(translateMessage(language, 'recovery.resetConsequence'))).toBeTruthy();
    expect(screen.getByRole('button', { name: translateMessage(language, 'recovery.cancel') })).toBeTruthy();
    h.calls.length = 0;
    click(translateMessage(language, 'recovery.confirmReset'));
    expect(h.calls).toEqual([`read:${MISSIONKID_STORAGE_KEY}`, `remove:${MISSIONKID_STORAGE_KEY}`, `read:${MISSIONKID_STORAGE_KEY}`]);
    expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);
    expect(h.values.get('unrelated')).toBe('keep');
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('heading', { name: 'Parent setup' })).toBeTruthy();
    expect((screen.getByRole('button', { name: 'Complete setup' }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
  });

  it.each(['remove', 'afterRemove', 'keep'] as const)('does not claim reset or fresh state when %s fails', (fault) => {
    const h = harness(JSON.stringify(completed())); h.faults[fault] = true;
    render(<App adapter={h.adapter} />);
    click('Reset MissionKid data'); click('Confirm reset');
    expect(screen.getByRole('alert').textContent).toMatch(/Reset could not be confirmed.*Do not assume your data was cleared/);
    expect(screen.queryByRole('heading', { name: 'Parent setup' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
    expect(screen.queryByRole('radio')).toBeNull();
    expect(screen.queryByText(/PRIVATE RAW/)).toBeNull();
    expect(h.values.get('unrelated')).toBe('keep');
    if (fault !== 'afterRemove') expect(JSON.parse(h.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual(completed());
    else expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);
    h.faults.read = false;
    click('Retry browser storage');
    expect(screen.getByRole('heading', { name: fault === 'afterRemove' ? 'Parent setup' : 'Setup complete' })).toBeTruthy();
  });

  it('retains last validated authority when reset and subsequent reads fail', () => {
    const durable = resolveHydrationResult({ status: 'hydrated', snapshot: completed('de') });
    const state = appStateReducer({ ...durable, lastDurable: durable, language: 'ru', ageBand: '9–10' }, {
      type: 'reset-unconfirmed', before: { status: 'unavailable' }, recovery: { status: 'unavailable' },
    });
    expect(state).toMatchObject({ status: 'blocked-recovery', language: 'de', ageBand: '7–8', localProfileId: 'existing-profile', resetUnconfirmed: true });
  });

  it('preserves durable choices after save failure and exposes a fresh-read retry', () => {
    const h = harness(JSON.stringify(completed())); h.faults.write = true;
    render(<App adapter={h.adapter} />);
    click('Change setup');
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    click('Save changes');
    expect(screen.getByRole('alert').textContent).toMatch(/Saving could not be confirmed/);
    expect(screen.queryByText(/language and age group are saved/)).toBeNull();
    h.values.set(MISSIONKID_STORAGE_KEY, JSON.stringify(completed('de')));
    h.calls.length = 0;
    click('Retry browser storage');
    expect(h.calls).toEqual([`read:${MISSIONKID_STORAGE_KEY}`]);
    expect(document.documentElement.lang).toBe('de');
  });

  it('shows pending status and disables conflicting controls before save confirmation', () => {
    const h = harness(); const persist = h.adapter.persist;
    vi.spyOn(h.adapter, 'persist').mockImplementation((snapshot) => {
      expect(screen.getByRole('status').textContent).toMatch(/not yet been confirmed/);
      expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
      expect(screen.getByRole('button', { name: 'Complete setup' }).closest('.recovery-controls')?.hasAttribute('disabled')).toBe(true);
      return persist(snapshot);
    });
    render(<App adapter={h.adapter} />);
    fireEvent.click(screen.getByRole('radio', { name: '7–8' })); click('Complete setup');
    expect(screen.queryByRole('status')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Setup complete' })).toBeTruthy();
  });

  it('preserves validated identity and choices when storage becomes unavailable during editing', () => {
    const h = harness(JSON.stringify(completed()));
    const id = vi.fn(() => 'must-not-replace-identity');
    render(<App adapter={h.adapter} createProfileId={id} />);
    click('Change setup');
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    h.faults.read = true;
    click('Save changes');
    expect(screen.getByRole('alert').textContent).toMatch(/Temporary mode/);
    expect((screen.getByRole('radio', { name: '7–8' }) as HTMLInputElement).checked).toBe(true);
    click('Use choices temporarily');
    expect(id).not.toHaveBeenCalled();
    expect(JSON.parse(h.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual(completed());
    expect(screen.queryByRole('heading', { name: 'Setup complete' })).toBeNull();
  });

  it.each(['{bad', JSON.stringify({ snapshotVersion: 99 })])('resets blocked data only after confirmation: %s', (raw) => {
    const h = harness(raw);
    render(<App adapter={h.adapter} />);
    click('Reset MissionKid data');
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    click('Confirm reset');
    expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);
    expect(screen.getByRole('heading', { name: 'Parent setup' })).toBeTruthy();
  });

  it.each(['en', 'de', 'ru'] as const)('localizes temporary and failed reset recovery in %s without forbidden inputs or later views', (language) => {
    const h = harness(); h.faults.read = true;
    const { container } = render(<App adapter={h.adapter} initialState={{ status: 'degraded', language, ageBand: null, localProfileId: null }} />);
    expect(screen.getByRole('alert').textContent).toBe(translateMessage(language, 'recovery.temporary'));
    expect(screen.getByText(translateMessage(language, 'recovery.retryHelp'))).toBeTruthy();
    click(translateMessage(language, 'recovery.resetTitle'));
    click(translateMessage(language, 'recovery.confirmReset'));
    expect(screen.getByRole('alert').textContent).toBe(translateMessage(language, 'recovery.resetUnconfirmed'));
    expect(container.querySelector('input:not([type="radio"])')).toBeNull();
    expect(screen.queryByText(/Mission Category|Start mission|Mission done/)).toBeNull();
  });
});


describe('Task 6 targeted authority regressions', () => {
  function observe(h: ReturnType<typeof harness>) {
    let current: AppState;
    function Probe() {
      current = useAppState().state;
      return null;
    }
    render(<AppStateProvider initialState={resolveHydrationResult(h.adapter.hydrate())}>
      <Probe /><AppShell adapter={h.adapter} />
    </AppStateProvider>);
    return () => current;
  }

  it('invalidates temporary completion when unavailable retry restores the incomplete durable age', () => {
    const snapshot = { ...completed(), childProfile: { localProfileId: 'existing-profile', ageBand: null } };
    const h = harness(JSON.stringify(snapshot));
    const state = observe(h);
    expect(state().ageBand).toBeNull();
    h.faults.read = true;
    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    click('Complete setup');
    expect(state().status).toBe('degraded');
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    click('Use choices temporarily');
    expect(state()).toMatchObject({ temporaryComplete: true, ageBand: '9–10' });
    expect(screen.getByText(translateMessage('en', 'recovery.temporaryReady'))).toBeTruthy();
    h.calls.length = 0;
    click('Retry browser storage');
    expect(h.calls).toEqual([`read:${MISSIONKID_STORAGE_KEY}`]);
    expect(state()).toMatchObject({ status: 'degraded', ageBand: null,
      localProfileId: 'existing-profile', temporaryComplete: false });
    expect(isSetupContextComplete(state())).toBe(false);
    expect(screen.getAllByRole('radio').filter((radio) =>
      radio.getAttribute('name') === 'setup-age-band' && (radio as HTMLInputElement).checked)).toHaveLength(0);
    expect((screen.getByRole('button', { name: 'Use choices temporarily' }) as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByText(translateMessage('en', 'recovery.temporaryReady'))).toBeNull();
    expect(screen.queryByText(translateMessage('en', 'setup.complete.body'))).toBeNull();
    expect(screen.getByRole('alert').textContent).toBe(translateMessage('en', 'recovery.temporary'));
    expect(JSON.parse(h.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual(snapshot);
  });

  it('does not present temporary readiness for an injected stale flag with incomplete age', () => {
    render(<App initialState={{ status: 'degraded', language: 'en', ageBand: null,
      localProfileId: 'existing-profile', temporaryComplete: true }} />);
    expect(screen.queryByText(translateMessage('en', 'recovery.temporaryReady'))).toBeNull();
    expect((screen.getByRole('button', { name: 'Use choices temporarily' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('keeps newer pre-write German / 7–8 evidence over cached English / 4–6 when write and recovery fail', () => {
    const old = { ...completed(), childProfile: { localProfileId: 'existing-profile', ageBand: '4–6' as const } };
    const latest = completed('de');
    const h = harness(JSON.stringify(old));
    const state = observe(h);
    expect(state().lastDurable).toMatchObject({ language: 'en', ageBand: '4–6' });
    click('Change setup');
    fireEvent.click(screen.getByRole('radio', { name: 'Русский' }));
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    h.values.set(MISSIONKID_STORAGE_KEY, JSON.stringify(latest));
    h.faults.write = true;
    const persist = h.adapter.persist;
    vi.spyOn(h.adapter, 'persist').mockImplementation((snapshot) => {
      const result = persist(snapshot);
      h.faults.read = true;
      return result;
    });
    h.calls.length = 0;
    click(translateMessage('ru', 'setup.action.saveChanges'));
    expect(h.calls).toEqual([`read:${MISSIONKID_STORAGE_KEY}`, `write:${MISSIONKID_STORAGE_KEY}`, `read:${MISSIONKID_STORAGE_KEY}`]);
    expect(state()).toMatchObject({ status: 'degraded', language: 'de', ageBand: '7–8',
      localProfileId: 'existing-profile', lastDurable: {
        language: 'de', ageBand: '7–8', localProfileId: 'existing-profile' } });
    expect(h.adapter.persist).toHaveBeenCalledWith({ ...latest, settings: { language: 'ru' },
      childProfile: { localProfileId: 'existing-profile', ageBand: '9–10' } });
    expect(screen.getByRole('alert').textContent).toBe(translateMessage('de', 'recovery.temporary'));
    expect(screen.queryByText(translateMessage('de', 'setup.complete.body'))).toBeNull();
    expect(screen.queryByText(translateMessage('de', 'recovery.temporaryReady'))).toBeNull();
    expect((screen.getByRole('radio', { name: '7–8' }) as HTMLInputElement).checked).toBe(true);
    click(translateMessage('de', 'recovery.retry'));
    expect(state().lastDurable).toEqual({ language: 'de', ageBand: '7–8', localProfileId: 'existing-profile' });
    expect(JSON.parse(h.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual(latest);
  });

  it.each(['unavailable', 'hydrated', 'corrupted', 'unsupported-version'] as const)(
    'carries validated pre-write evidence through an unconfirmed domain result with %s recovery', (recoveryStatus) => {
      const latest = completed('de');
      const h = harness(JSON.stringify(latest));
      h.faults.write = true;
      const persist = h.adapter.persist;
      vi.spyOn(h.adapter, 'persist').mockImplementation((snapshot) => {
        const result = persist(snapshot);
        if (recoveryStatus === 'unavailable') h.faults.read = true;
        if (recoveryStatus === 'hydrated') h.values.set(MISSIONKID_STORAGE_KEY, JSON.stringify(completed('ru')));
        if (recoveryStatus === 'corrupted') h.values.set(MISSIONKID_STORAGE_KEY, '{bad');
        if (recoveryStatus === 'unsupported-version') h.values.set(MISSIONKID_STORAGE_KEY, JSON.stringify({ snapshotVersion: 99 }));
        return result;
      });
      const result = saveSetup(h.adapter, { language: 'en', ageBand: '9–10', localProfileId: 'existing-profile' }, () => 'unused');
      expect(result).toMatchObject({ status: 'unconfirmed', reason: 'write-failed',
        before: { status: 'hydrated', snapshot: latest }, recovery: { status: recoveryStatus } });
      if (result.status !== 'unconfirmed') throw new Error('Expected unconfirmed save');
      const old = resolveHydrationResult({ status: 'hydrated', snapshot: completed() });
      const state = appStateReducer({ ...old, lastDurable: old, setupView: 'editing', status: 'ready', saveStatus: 'idle' }, {
        type: 'setup-save-unconfirmed', ...result,
      });
      expect(state.lastDurable).toEqual({ language: recoveryStatus === 'hydrated' ? 'ru' : 'de', ageBand: '7–8', localProfileId: 'existing-profile' });
      if (recoveryStatus === 'hydrated') expect(state).toMatchObject({ status: 'ready', setupView: 'editing', saveStatus: 'unconfirmed' });
      else expect(state.status).toBe(recoveryStatus === 'unavailable' ? 'degraded' : 'blocked-recovery');
    },
  );
});
