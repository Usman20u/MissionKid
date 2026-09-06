import { describe, expect, it, vi } from 'vitest';

import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type MissionKidSnapshot,
  type SnapshotStorage,
} from './persistence';
import { saveSetup } from './setup';

function createHarness(raw: string | null = null) {
  const values = new Map<string, string>();
  const events: string[] = [];
  if (raw !== null) values.set(MISSIONKID_STORAGE_KEY, raw);
  values.set('unrelated-key', 'untouched');
  const storage: SnapshotStorage = {
    getItem: vi.fn((key: string) => {
      events.push('read');
      return values.get(key) ?? null;
    }),
    setItem: vi.fn((key: string, value: string) => {
      events.push('write');
      values.set(key, value);
    }),
    removeItem: vi.fn(),
  };
  return { values, events, storage, adapter: createPersistenceAdapter(storage) };
}

const choices = { language: 'de', ageBand: '4–6', localProfileId: null } as const;

describe('F001 save operation', () => {
  it.each([undefined, '10–12'])(
    'uses durable identity with age %s even when runtime has no identity',
    (ageBand) => {
      const harness = createHarness(JSON.stringify({
        ...createEmptySnapshot(),
        childProfile: { localProfileId: 'existing-profile', ageBand },
      }));
      const createId = vi.fn(() => 'must-not-be-created');

      expect(saveSetup(harness.adapter, choices, createId)).toEqual({
        status: 'confirmed',
        snapshot: {
          ...createEmptySnapshot(),
          settings: { language: 'de' },
          childProfile: { localProfileId: 'existing-profile', ageBand: '4–6' },
        },
      });
      expect(createId).not.toHaveBeenCalled();
      expect(JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY)!)).toMatchObject({
        childProfile: { localProfileId: 'existing-profile', ageBand: '4–6' },
      });
    },
  );

  it.each([undefined, null, '', '   ', 42])(
    'rejects malformed stored identity %s without preserving or replacing it',
    (localProfileId) => {
      const raw = JSON.stringify({
        ...createEmptySnapshot(), childProfile: { localProfileId, ageBand: '7–8' },
      });
      const harness = createHarness(raw);
      const createId = vi.fn(() => 'must-not-be-created');

      expect(harness.adapter.hydrate()).toEqual({ status: 'corrupted' });
      expect(saveSetup(harness.adapter, choices, createId)).toMatchObject({
        status: 'unconfirmed', reason: 'corrupted',
      });
      expect(createId).not.toHaveBeenCalled();
      expect(harness.storage.setItem).not.toHaveBeenCalled();
      expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    },
  );

  it('reads first, saves only approved setup facts, then confirms by read-back', () => {
    const harness = createHarness();
    const createId = vi.fn(() => 'profile-1');
    const result = saveSetup(harness.adapter, choices, createId);

    expect(harness.events).toEqual(['read', 'write', 'read']);
    expect(result).toEqual({
      status: 'confirmed',
      snapshot: {
        ...createEmptySnapshot(),
        settings: { language: 'de' },
        childProfile: { localProfileId: 'profile-1', ageBand: '4–6' },
      },
    });
    expect(createId).toHaveBeenCalledTimes(1);
    expect(harness.values.get('unrelated-key')).toBe('untouched');
    expect(harness.storage.removeItem).not.toHaveBeenCalled();
  });

  it('preserves the validated snapshot fields and durable profile identity', () => {
    const snapshot: MissionKidSnapshot = {
      ...createEmptySnapshot(),
      childProfile: { localProfileId: 'durable-profile', ageBand: '7–8' },
    };
    const harness = createHarness(JSON.stringify(snapshot));
    const hydrate = vi.spyOn(harness.adapter, 'hydrate');
    const persist = vi.spyOn(harness.adapter, 'persist');
    const createId = vi.fn(() => 'must-not-be-used');

    const result = saveSetup(harness.adapter, {
      ...choices,
      localProfileId: 'temporary-profile',
    }, createId);

    expect(result.status).toBe('confirmed');
    expect(createId).not.toHaveBeenCalled();
    const hydration = hydrate.mock.results[0];
    const update = persist.mock.calls[0];
    if (!hydration || hydration.type !== 'return' ||
        hydration.value.status !== 'hydrated' || !update) {
      throw new Error('Expected a validated snapshot followed by an update.');
    }
    const current = hydration.value;
    const next = update[0];
    // Only the approved empty reserved shape exists in Plan 01.
    expect(next.completedSessions).toBe(current.snapshot.completedSessions);
    expect(next.currentSession).toBe(current.snapshot.currentSession);
    expect(next.currentResultSessionId).toBe(current.snapshot.currentResultSessionId);
    expect(next.snapshotVersion).toBe(current.snapshot.snapshotVersion);
    expect(next.childProfile).toEqual({ localProfileId: 'durable-profile', ageBand: '4–6' });
    expect(next.settings).toEqual({ language: 'de' });
    expect(harness.values.get('unrelated-key')).toBe('untouched');
  });

  it.each([
    ['malformed JSON', '{broken', 'corrupted'],
    ['invalid shape', JSON.stringify({ snapshotVersion: 1 }), 'corrupted'],
    ['unsupported version', JSON.stringify({ snapshotVersion: 2 }), 'unsupported-version'],
  ])('does not overwrite %s or generate a profile', (_name, raw, status) => {
    const harness = createHarness(raw);
    const createId = vi.fn(() => 'must-not-be-created');

    expect(saveSetup(harness.adapter, choices, createId)).toMatchObject({
      status: 'unconfirmed', reason: status, recovery: { status },
    });
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(harness.storage.setItem).not.toHaveBeenCalled();
    expect(harness.storage.removeItem).not.toHaveBeenCalled();
    expect(createId).not.toHaveBeenCalled();
  });

  it('does not write when current durable state cannot be read', () => {
    const harness = createHarness();
    vi.mocked(harness.storage.getItem).mockImplementation(() => { throw new Error('blocked'); });

    expect(saveSetup(harness.adapter, choices, () => 'profile')).toMatchObject({
      status: 'unconfirmed', reason: 'unavailable', recovery: { status: 'unavailable' },
    });
    expect(harness.storage.setItem).not.toHaveBeenCalled();
  });

  it('rehydrates the durable context after a failed update', () => {
    const snapshot: MissionKidSnapshot = {
      ...createEmptySnapshot(),
      childProfile: { localProfileId: 'profile', ageBand: '7–8' },
    };
    const harness = createHarness(JSON.stringify(snapshot));
    vi.mocked(harness.storage.setItem).mockImplementation(() => { throw new Error('quota'); });

    expect(saveSetup(harness.adapter, choices, () => 'unused')).toEqual({
      status: 'unconfirmed', reason: 'write-failed', localProfileId: 'profile',
      before: { status: 'hydrated', snapshot },
      recovery: { status: 'hydrated', snapshot },
    });
    expect(harness.storage.getItem).toHaveBeenCalledTimes(2);
    expect(JSON.parse(harness.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual(snapshot);
  });

  it('keeps a failed read-back unconfirmed even when a later recovery read succeeds', () => {
    const harness = createHarness();
    vi.mocked(harness.storage.getItem)
      .mockReturnValueOnce(null)
      .mockImplementationOnce(() => { throw new Error('read-back blocked'); });

    expect(saveSetup(harness.adapter, choices, () => 'profile')).toMatchObject({
      status: 'unconfirmed', reason: 'read-back-failed', localProfileId: 'profile',
      recovery: { status: 'hydrated', snapshot: { childProfile: { localProfileId: 'profile' } } },
    });
    expect(harness.storage.getItem).toHaveBeenCalledTimes(3);
  });

  it('does not overwrite corrupted read-back data on the next attempt', () => {
    const harness = createHarness();
    vi.mocked(harness.storage.setItem).mockImplementation((key) => {
      harness.values.set(key, '{broken');
    });

    expect(saveSetup(harness.adapter, choices, () => 'profile')).toMatchObject({
      status: 'unconfirmed', reason: 'read-back-invalid', recovery: { status: 'corrupted' },
    });
    expect(saveSetup(harness.adapter, choices, () => 'unused')).toMatchObject({
      status: 'unconfirmed', reason: 'corrupted',
    });
    expect(harness.storage.setItem).toHaveBeenCalledTimes(1);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe('{broken');
  });
});
