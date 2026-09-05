import { describe, expect, it } from 'vitest';

import {
  AGE_BANDS,
  CURRENT_SNAPSHOT_VERSION,
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type MissionKidSnapshot,
  type SnapshotStorage,
} from './persistence';

type MemoryStorage = Readonly<{
  storage: SnapshotStorage;
  values: Map<string, string>;
  getCalls: string[];
  setCalls: Array<readonly [string, string]>;
  removeCalls: string[];
}>;

function createMemoryStorage(rawSnapshot?: string): MemoryStorage {
  const values = new Map<string, string>();
  const getCalls: string[] = [];
  const setCalls: Array<readonly [string, string]> = [];
  const removeCalls: string[] = [];

  if (rawSnapshot !== undefined) {
    values.set(MISSIONKID_STORAGE_KEY, rawSnapshot);
  }

  return {
    values,
    getCalls,
    setCalls,
    removeCalls,
    storage: {
      getItem(key) {
        getCalls.push(key);
        return values.get(key) ?? null;
      },
      setItem(key, value) {
        setCalls.push([key, value]);
        values.set(key, value);
      },
      removeItem(key) {
        removeCalls.push(key);
        values.delete(key);
      },
    },
  };
}

function createCompletedSetupSnapshot(): MissionKidSnapshot {
  return {
    ...createEmptySnapshot(),
    settings: { language: 'de' },
    childProfile: {
      localProfileId: 'local-profile-1',
      ageBand: '7–8',
    },
  };
}

describe('snapshot hydration', () => {
  it('defines the single current snapshot version and approved age bands', () => {
    expect(CURRENT_SNAPSHOT_VERSION).toBe(1);
    expect(AGE_BANDS).toEqual(['4–6', '7–8', '9–10']);
  });

  it('reports an absent snapshot without writing first-use state', () => {
    const memory = createMemoryStorage();
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({ status: 'absent' });
    expect(memory.getCalls).toEqual([MISSIONKID_STORAGE_KEY]);
    expect(memory.setCalls).toEqual([]);
  });

  it('hydrates a valid current snapshot with stable profile identity', () => {
    const snapshot = createCompletedSetupSnapshot();
    const memory = createMemoryStorage(JSON.stringify(snapshot));
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({ status: 'hydrated', snapshot });
  });

  it('reports malformed JSON as corrupted without changing the raw value', () => {
    const rawSnapshot = '{not valid JSON';
    const memory = createMemoryStorage(rawSnapshot);
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({ status: 'corrupted' });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
    expect(memory.removeCalls).toEqual([]);
  });

  it.each([
    null,
    [],
    { snapshotVersion: CURRENT_SNAPSHOT_VERSION },
    { ...createEmptySnapshot(), settings: { language: 'en', extra: true } },
    { ...createEmptySnapshot(), childProfile: { ageBand: '4–6' } },
  ])('rejects structurally invalid JSON without throwing', (value) => {
    const memory = createMemoryStorage(JSON.stringify(value));
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({ status: 'corrupted' });
  });

  it('detects an unsupported version without migration or overwrite', () => {
    const rawSnapshot = JSON.stringify({
      ...createEmptySnapshot(),
      snapshotVersion: 2,
    });
    const memory = createMemoryStorage(rawSnapshot);
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({
      status: 'unsupported-version',
      version: 2,
    });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
  });

  it('resolves an unsupported stored language to English without rewriting', () => {
    const rawSnapshot = JSON.stringify({
      ...createCompletedSetupSnapshot(),
      settings: { language: 'fr' },
    });
    const memory = createMemoryStorage(rawSnapshot);
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({
      status: 'hydrated',
      snapshot: {
        ...createCompletedSetupSnapshot(),
        settings: { language: 'en' },
      },
    });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
  });

  it.each([
    { localProfileId: 'local-profile-1' },
    { localProfileId: 'local-profile-1', ageBand: '10–12' },
    { localProfileId: 'local-profile-1', ageBand: null },
  ])('preserves identity while treating missing or invalid age as incomplete', (profile) => {
    const rawSnapshot = JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: profile,
    });
    const memory = createMemoryStorage(rawSnapshot);
    const adapter = createPersistenceAdapter(memory.storage);

    const hydration = adapter.hydrate();
    expect(hydration).toEqual({
      status: 'hydrated',
      snapshot: {
        ...createEmptySnapshot(),
        childProfile: { localProfileId: 'local-profile-1', ageBand: null },
      },
    });
    if (hydration.status !== 'hydrated') throw new Error('Expected incomplete hydration.');
    expect(adapter.persist(hydration.snapshot)).toEqual({
      status: 'unconfirmed', reason: 'invalid-snapshot',
    });
    expect(memory.setCalls).toEqual([]);
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
  });

  it('reports storage access failure as unavailable', () => {
    const adapter = createPersistenceAdapter({
      getItem() {
        throw new Error('storage unavailable');
      },
      setItem() {},
      removeItem() {},
    });

    expect(adapter.hydrate()).toEqual({ status: 'unavailable' });
  });

  it.each([
    { currentSession: { state: 'ready' } },
    { currentResultSessionId: 'session-1' },
    { completedSessions: [{ state: 'completed' }] },
  ])('rejects populated later-function snapshot fields', (futureState) => {
    const rawSnapshot = JSON.stringify({
      ...createEmptySnapshot(),
      ...futureState,
    });
    const memory = createMemoryStorage(rawSnapshot);
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({ status: 'corrupted' });
  });
});

describe('whole-snapshot persistence', () => {
  it('writes one complete snapshot and confirms its validated read-back', () => {
    const snapshot = createCompletedSetupSnapshot();
    const memory = createMemoryStorage();
    memory.values.set('unrelated:key', 'preserve me');
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.persist(snapshot)).toEqual({
      status: 'confirmed',
      snapshot,
    });
    expect(memory.setCalls).toEqual([
      [MISSIONKID_STORAGE_KEY, JSON.stringify(snapshot)],
    ]);
    expect(memory.getCalls).toEqual([MISSIONKID_STORAGE_KEY]);
    expect(memory.values.get('unrelated:key')).toBe('preserve me');
  });

  it('rejects a non-canonical snapshot before serialization or writing', () => {
    const invalidSnapshot = {
      ...createEmptySnapshot(),
      settings: { language: 'fr' },
    } as unknown as MissionKidSnapshot;
    const memory = createMemoryStorage();
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.persist(invalidSnapshot)).toEqual({
      status: 'unconfirmed',
      reason: 'invalid-snapshot',
    });
    expect(memory.setCalls).toEqual([]);
  });

  it('cannot confirm success when serialization fails', () => {
    const memory = createMemoryStorage();
    const adapter = createPersistenceAdapter(memory.storage, () => {
      throw new Error('serialization failed');
    });

    expect(adapter.persist(createEmptySnapshot())).toEqual({
      status: 'unconfirmed',
      reason: 'serialization-failed',
    });
    expect(memory.setCalls).toEqual([]);
  });

  it('cannot confirm success when the write throws', () => {
    const memory = createMemoryStorage();
    const adapter = createPersistenceAdapter({
      ...memory.storage,
      setItem() {
        throw new Error('write failed');
      },
    });

    expect(adapter.persist(createEmptySnapshot())).toEqual({
      status: 'unconfirmed',
      reason: 'write-failed',
    });
  });

  it('cannot confirm success when read-back throws after writing', () => {
    const memory = createMemoryStorage();
    const adapter = createPersistenceAdapter({
      ...memory.storage,
      getItem() {
        throw new Error('read-back failed');
      },
    });

    expect(adapter.persist(createEmptySnapshot())).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-failed',
    });
    expect(memory.setCalls).toHaveLength(1);
  });

  it('cannot confirm success when read-back is missing', () => {
    const adapter = createPersistenceAdapter({
      getItem() {
        return null;
      },
      setItem() {},
      removeItem() {},
    });

    expect(adapter.persist(createEmptySnapshot())).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-mismatch',
    });
  });

  it('cannot confirm success when read-back is corrupted', () => {
    const adapter = createPersistenceAdapter({
      getItem() {
        return '{corrupted';
      },
      setItem() {},
      removeItem() {},
    });

    expect(adapter.persist(createEmptySnapshot())).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-invalid',
    });
  });

  it('cannot confirm success when valid read-back differs', () => {
    const differentSnapshot: MissionKidSnapshot = {
      ...createEmptySnapshot(),
      settings: { language: 'ru' },
    };
    const adapter = createPersistenceAdapter({
      getItem() {
        return JSON.stringify(differentSnapshot);
      },
      setItem() {},
      removeItem() {},
    });

    expect(adapter.persist(createEmptySnapshot())).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-mismatch',
    });
  });
});

describe('confirmed snapshot reset', () => {
  it('confirms reset only after the MissionKid snapshot is absent', () => {
    const memory = createMemoryStorage(JSON.stringify(createEmptySnapshot()));
    memory.values.set('unrelated:key', 'preserve me');
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.reset()).toEqual({ status: 'confirmed' });
    expect(memory.removeCalls).toEqual([MISSIONKID_STORAGE_KEY]);
    expect(memory.getCalls).toEqual([MISSIONKID_STORAGE_KEY]);
    expect(memory.values.get('unrelated:key')).toBe('preserve me');
  });

  it('cannot confirm reset when removal throws', () => {
    const memory = createMemoryStorage(JSON.stringify(createEmptySnapshot()));
    const adapter = createPersistenceAdapter({
      ...memory.storage,
      removeItem() {
        throw new Error('remove failed');
      },
    });

    expect(adapter.reset()).toEqual({
      status: 'unconfirmed',
      reason: 'remove-failed',
    });
    expect(memory.getCalls).toEqual([]);
  });

  it('cannot confirm reset when post-removal read-back throws', () => {
    const memory = createMemoryStorage(JSON.stringify(createEmptySnapshot()));
    const adapter = createPersistenceAdapter({
      ...memory.storage,
      getItem() {
        throw new Error('read-back failed');
      },
    });

    expect(adapter.reset()).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-failed',
    });
    expect(memory.removeCalls).toEqual([MISSIONKID_STORAGE_KEY]);
  });

  it('cannot confirm reset while the snapshot remains present', () => {
    const memory = createMemoryStorage(JSON.stringify(createEmptySnapshot()));
    const adapter = createPersistenceAdapter({
      ...memory.storage,
      removeItem() {},
    });

    expect(adapter.reset()).toEqual({
      status: 'unconfirmed',
      reason: 'snapshot-still-present',
    });
  });
});
