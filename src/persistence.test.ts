import { describe, expect, it } from 'vitest';

import {
  AGE_BANDS,
  CURRENT_SNAPSHOT_VERSION,
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type ActiveMissionSession,
  type CompletedMissionSession,
  type MissionKidSnapshot,
  type ReadyMissionSession,
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
    ['a current session that is no recognizable Mission Session', { currentSession: { state: 'ready' } }],
    ['a completed session in the current position', {
      currentSession: { state: 'completed', sessionId: 'session-1' },
    }],
  ])('rejects %s', (_label, invalid) => {
    const rawSnapshot = JSON.stringify({ ...createEmptySnapshot(), ...invalid });
    const memory = createMemoryStorage(rawSnapshot);
    const adapter = createPersistenceAdapter(memory.storage);

    expect(adapter.hydrate()).toEqual({ status: 'corrupted' });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
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
    // Read before writing, then read back: the first read is the D4-B check
    // against stored data, the second confirms what was actually stored.
    expect(memory.getCalls).toEqual([
      MISSIONKID_STORAGE_KEY,
      MISSIONKID_STORAGE_KEY,
    ]);
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

describe('a selected Mission Session in the snapshot', () => {
  const PROFILE_ID = 'profile-1';
  const session = {
    sessionId: 'session-1',
    childProfileId: PROFILE_ID,
    missionId: 'movement-02',
    missionCategoryAtSelection: 'Movement',
    ageBandAtSelection: '7–8',
    durationSecondsAtSelection: 240,
    state: 'selected',
    selectedAt: 1_700_000_000_000,
  } as const;

  function storedSnapshot(currentSession: unknown) {
    return JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
      currentSession,
    });
  }

  it('hydrates a valid selected session unchanged', () => {
    const memory = createMemoryStorage(storedSnapshot(session));
    const result = createPersistenceAdapter(memory.storage).hydrate();

    if (result.status !== 'hydrated') throw new Error('expected a hydrated snapshot');
    expect(result.snapshot.currentSession).toEqual(session);
    expect(result.snapshot.snapshotVersion).toBe(CURRENT_SNAPSHOT_VERSION);
  });

  it('still hydrates a snapshot with no session', () => {
    const memory = createMemoryStorage(storedSnapshot(null));
    const result = createPersistenceAdapter(memory.storage).hydrate();

    if (result.status !== 'hydrated') throw new Error('expected a hydrated snapshot');
    expect(result.snapshot.currentSession).toBeNull();
  });

  it.each([
    ['a later lifecycle state', { ...session, state: 'active' }],
    ['a started timestamp this task cannot produce', { ...session, startedAt: 1 }],
    ['a completion period identity', { ...session, completionPeriodId: '2026-09' }],
    ['a fractional duration', { ...session, durationSecondsAtSelection: 1.5 }],
    ['a zero duration', { ...session, durationSecondsAtSelection: 0 }],
    ['a negative timestamp', { ...session, selectedAt: -1 }],
    ['a fractional timestamp', { ...session, selectedAt: 1.5 }],
    ['an unknown Mission Category', { ...session, missionCategoryAtSelection: 'Cooking' }],
    ['an unknown age band', { ...session, ageBandAtSelection: '11–12' }],
    ['an empty Mission reference', { ...session, missionId: '  ' }],
    ['a session owned by another profile', { ...session, childProfileId: 'someone-else' }],
    ['embedded Mission wording', { ...session, title: 'Bear, Crab, Bird' }],
  ])('refuses to hydrate %s', (_label, invalid) => {
    const memory = createMemoryStorage(storedSnapshot(invalid));

    // A stored session is untrusted input. None of these is silently repaired,
    // because repairing one would invent a fact about the family's Mission.
    expect(createPersistenceAdapter(memory.storage).hydrate().status).toBe('corrupted');
  });

  it('refuses to hydrate a session missing a required field', () => {
    const { selectedAt: _dropped, ...incomplete } = session;
    const memory = createMemoryStorage(storedSnapshot(incomplete));

    expect(createPersistenceAdapter(memory.storage).hydrate().status).toBe('corrupted');
  });

  it('refuses a session with no profile to own it', () => {
    const memory = createMemoryStorage(JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: null,
      currentSession: session,
    }));

    expect(createPersistenceAdapter(memory.storage).hydrate().status).toBe('corrupted');
  });

  it('confirms a written session only when every field reads back', () => {
    const memory = createMemoryStorage(storedSnapshot(null));
    memory.values.set('unrelated-key', 'untouched');
    const adapter = createPersistenceAdapter(memory.storage);
    const hydrated = adapter.hydrate();
    if (hydrated.status !== 'hydrated') throw new Error('expected a hydrated snapshot');

    const result = adapter.persist({ ...hydrated.snapshot, currentSession: session });

    if (result.status !== 'confirmed') throw new Error('expected a confirmed write');
    expect(result.snapshot.currentSession).toEqual(session);
    expect(memory.values.get('unrelated-key')).toBe('untouched');
  });

  it.each([
    ['sessionId', 'other-session'],
    ['missionId', 'movement-10'],
    ['selectedAt', 1_700_000_000_001],
    ['durationSecondsAtSelection', 180],
    ['missionCategoryAtSelection', 'Calm'],
    ['ageBandAtSelection', '4–6'],
  ] as const)('detects a read-back that differs only in %s', (field, value) => {
    const memory = createMemoryStorage(storedSnapshot(null));
    const hydrated = createPersistenceAdapter(memory.storage).hydrate();
    if (hydrated.status !== 'hydrated') throw new Error('expected a hydrated snapshot');

    // A structurally valid session differing in exactly one field. Reference
    // equality would have confirmed this write; value equality must not.
    const divergent: SnapshotStorage = {
      getItem: (key) => memory.values.get(key) ?? null,
      setItem: (key) => {
        memory.values.set(key, storedSnapshot({ ...session, [field]: value }));
      },
      removeItem: (key) => memory.values.delete(key) as unknown as void,
    };

    expect(
      createPersistenceAdapter(divergent).persist({
        ...hydrated.snapshot,
        currentSession: session,
      }),
    ).toEqual({ status: 'unconfirmed', reason: 'read-back-mismatch' });
  });
});

// F003 widens the persisted lifecycle. These fixtures are the shapes the
// snapshot must now accept, refuse, or recover around.
const LIFECYCLE_PROFILE_ID = 'profile-1';
const LIFECYCLE_PROFILE = {
  localProfileId: LIFECYCLE_PROFILE_ID,
  ageBand: '7–8',
} as const;

const SELECTION_FACTS = {
  childProfileId: LIFECYCLE_PROFILE_ID,
  missionId: 'movement-02',
  missionCategoryAtSelection: 'Movement',
  ageBandAtSelection: '7–8',
  durationSecondsAtSelection: 240,
  selectedAt: 1_700_000_000_000,
} as const;

const READY_SESSION: ReadyMissionSession = {
  ...SELECTION_FACTS,
  sessionId: 'session-ready',
  state: 'ready',
};

const ACTIVE_SESSION: ActiveMissionSession = {
  ...SELECTION_FACTS,
  sessionId: 'session-active',
  state: 'active',
  startedAt: 1_700_000_060_000,
};

const COMPLETED_SESSION: CompletedMissionSession = {
  ...SELECTION_FACTS,
  sessionId: 'session-done',
  state: 'completed',
  startedAt: 1_700_000_060_000,
  completedAt: 1_700_000_300_000,
  completionPeriodId: '2023-11',
};

const SECOND_COMPLETED_SESSION: CompletedMissionSession = {
  ...COMPLETED_SESSION,
  sessionId: 'session-done-2',
  missionId: 'movement-10',
  completedAt: 1_700_000_900_000,
};

function lifecycleSnapshot(
  fields: Readonly<Partial<MissionKidSnapshot>>,
): MissionKidSnapshot {
  return {
    ...createEmptySnapshot(),
    childProfile: { ...LIFECYCLE_PROFILE },
    ...fields,
  };
}

// Stored data is untrusted input, so these fixtures deliberately hold shapes the
// typed snapshot cannot express.
function storedLifecycle(fields: Readonly<Record<string, unknown>>): string {
  return JSON.stringify({
    ...createEmptySnapshot(),
    childProfile: LIFECYCLE_PROFILE,
    ...fields,
  });
}

function hydrateStored(rawSnapshot: string) {
  const memory = createMemoryStorage(rawSnapshot);
  const adapter = createPersistenceAdapter(memory.storage);
  const result = adapter.hydrate();

  if (result.status !== 'hydrated') {
    throw new Error(`expected a hydrated snapshot, got ${result.status}`);
  }

  // Reading is never a write: whatever a record-level decision excluded from
  // the result, the stored entry is still exactly what it was.
  expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
  expect(memory.setCalls).toEqual([]);
  expect(memory.removeCalls).toEqual([]);

  return { adapter, memory, snapshot: result.snapshot };
}

describe('the lifecycle states a snapshot may hold', () => {
  it('hydrates a ready session with no start timestamp', () => {
    const { snapshot } = hydrateStored(
      storedLifecycle({ currentSession: READY_SESSION }),
    );

    expect(snapshot.currentSession).toEqual(READY_SESSION);
  });

  it('hydrates an active session with the start timestamp it recorded', () => {
    const { snapshot } = hydrateStored(
      storedLifecycle({ currentSession: ACTIVE_SESSION }),
    );

    expect(snapshot.currentSession).toEqual(ACTIVE_SESSION);
  });

  it('hydrates completed sessions and the pointer to one of them', () => {
    const { snapshot } = hydrateStored(
      storedLifecycle({
        completedSessions: [COMPLETED_SESSION, SECOND_COMPLETED_SESSION],
        currentResultSessionId: SECOND_COMPLETED_SESSION.sessionId,
      }),
    );

    expect(snapshot.completedSessions).toEqual([
      COMPLETED_SESSION,
      SECOND_COMPLETED_SESSION,
    ]);
    expect(snapshot.currentResultSessionId).toBe('session-done-2');
    expect(snapshot.currentSession).toBeNull();
  });

  it.each([
    ['a ready session carrying a start timestamp', {
      ...READY_SESSION, startedAt: 1_700_000_060_000,
    }],
    ['an active session with no start timestamp', (() => {
      const { startedAt: _dropped, ...withoutStart } = ACTIVE_SESSION;
      return withoutStart;
    })()],
    ['an active session carrying a completion timestamp', {
      ...ACTIVE_SESSION, completedAt: 1_700_000_300_000,
    }],
    ['an active session carrying a completion period', {
      ...ACTIVE_SESSION, completionPeriodId: '2023-11',
    }],
    ['an active session whose start timestamp is fractional', {
      ...ACTIVE_SESSION, startedAt: 1.5,
    }],
    ['a completed session in the current position', COMPLETED_SESSION],
    ['an unknown lifecycle value', { ...READY_SESSION, state: 'paused' }],
  ])('refuses %s in the current position', (_label, invalid) => {
    const rawSnapshot = storedLifecycle({ currentSession: invalid });
    const memory = createMemoryStorage(rawSnapshot);

    // An impossible lifecycle combination is refused, never repaired: guessing
    // which half of it was true would invent a fact about the family's Mission.
    expect(createPersistenceAdapter(memory.storage).hydrate()).toEqual({
      status: 'corrupted',
    });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
  });

  it('refuses one identifier that is both the current session and a completed one', () => {
    const rawSnapshot = storedLifecycle({
      currentSession: { ...READY_SESSION, sessionId: COMPLETED_SESSION.sessionId },
      completedSessions: [COMPLETED_SESSION],
    });
    const memory = createMemoryStorage(rawSnapshot);

    expect(createPersistenceAdapter(memory.storage).hydrate()).toEqual({
      status: 'corrupted',
    });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
  });

  it.each([
    ['a completion earlier than its own start', {
      ...COMPLETED_SESSION, completedAt: COMPLETED_SESSION.startedAt - 1,
    }],
    ['no start timestamp', (() => {
      const { startedAt: _dropped, ...withoutStart } = COMPLETED_SESSION;
      return withoutStart;
    })()],
    ['no completion period', (() => {
      const { completionPeriodId: _dropped, ...withoutPeriod } = COMPLETED_SESSION;
      return withoutPeriod;
    })()],
    ['a malformed completion period', { ...COMPLETED_SESSION, completionPeriodId: '2023-13' }],
    ['an unpadded completion period', { ...COMPLETED_SESSION, completionPeriodId: '2023-9' }],
    ['a completion period that is not a period at all', {
      ...COMPLETED_SESSION, completionPeriodId: 'November',
    }],
    ['another profile as its owner', { ...COMPLETED_SESSION, childProfileId: 'someone-else' }],
    ['a lifecycle state that is not completed', { ...COMPLETED_SESSION, state: 'active' }],
    ['embedded Mission wording', { ...COMPLETED_SESSION, title: 'Bear, Crab, Bird' }],
  ])('excludes a completed record with %s while the rest survives', (_label, invalid) => {
    const { snapshot } = hydrateStored(
      storedLifecycle({ completedSessions: [invalid, SECOND_COMPLETED_SESSION] }),
    );

    // The valid completion around it is a durable fact the family earned, so
    // one unreadable record never makes the snapshot unreadable.
    expect(snapshot.completedSessions).toEqual([SECOND_COMPLETED_SESSION]);
    expect(snapshot.childProfile).toEqual(LIFECYCLE_PROFILE);
  });
});

describe('record-level trust in stored completions', () => {
  it('coalesces identical duplicate copies of one completion', () => {
    const { adapter, snapshot } = hydrateStored(
      storedLifecycle({
        completedSessions: [
          COMPLETED_SESSION,
          { ...COMPLETED_SESSION },
          SECOND_COMPLETED_SESSION,
        ],
      }),
    );

    expect(snapshot.completedSessions).toEqual([
      COMPLETED_SESSION,
      SECOND_COMPLETED_SESSION,
    ]);
    // An identical duplicate is not an unresolved record: writing continues.
    expect(adapter.persist({ ...snapshot, settings: { language: 'ru' } }).status)
      .toBe('confirmed');
  });

  it('excludes conflicting copies of one identifier from counting', () => {
    const conflicting = {
      ...COMPLETED_SESSION,
      completedAt: COMPLETED_SESSION.completedAt + 60_000,
    };
    const { snapshot } = hydrateStored(
      storedLifecycle({
        completedSessions: [COMPLETED_SESSION, conflicting, SECOND_COMPLETED_SESSION],
      }),
    );

    // Neither copy is chosen and neither is invented away; the completion they
    // disagree about simply does not count while they disagree.
    expect(snapshot.completedSessions).toEqual([SECOND_COMPLETED_SESSION]);
  });

  it.each([
    ['names no completed session', 'session-missing'],
    ['is not a session identifier at all', 7],
    ['is empty', ''],
  ])('rejects a current-result pointer that %s and keeps the completions', (_label, pointer) => {
    const { adapter, snapshot } = hydrateStored(
      storedLifecycle({
        completedSessions: [COMPLETED_SESSION],
        currentResultSessionId: pointer,
      }),
    );

    expect(snapshot.currentResultSessionId).toBeNull();
    expect(snapshot.completedSessions).toEqual([COMPLETED_SESSION]);
    // Only the navigation reference was rejected, so the repaired snapshot is
    // writable and the pointer is cleared through a validated write.
    expect(adapter.persist(snapshot).status).toBe('confirmed');
  });

  it('rejects a pointer that arrives beside a current session, keeping both records', () => {
    const { snapshot } = hydrateStored(
      storedLifecycle({
        currentSession: READY_SESSION,
        completedSessions: [COMPLETED_SESSION],
        currentResultSessionId: COMPLETED_SESSION.sessionId,
      }),
    );

    expect(snapshot.currentResultSessionId).toBeNull();
    expect(snapshot.currentSession).toEqual(READY_SESSION);
    expect(snapshot.completedSessions).toEqual([COMPLETED_SESSION]);
  });

  it('leaves completed sessions intact when the age band is invalid', () => {
    const { snapshot } = hydrateStored(
      storedLifecycle({
        childProfile: { localProfileId: LIFECYCLE_PROFILE_ID, ageBand: '11–12' },
        completedSessions: [COMPLETED_SESSION],
      }),
    );

    expect(snapshot.childProfile).toEqual({
      localProfileId: LIFECYCLE_PROFILE_ID,
      ageBand: null,
    });
    expect(snapshot.completedSessions).toEqual([COMPLETED_SESSION]);
  });

  it.each([
    ['is missing', undefined],
    ['is null, which is how a non-finite number survives JSON', null],
    ['is zero', 0],
    ['is negative', -30],
    ['is fractional', 1.5],
  ])('hydrates an active session whose duration %s', (_label, duration) => {
    const { durationSecondsAtSelection: _dropped, ...withoutDuration } = ACTIVE_SESSION;
    const session = duration === undefined
      ? withoutDuration
      : { ...withoutDuration, durationSecondsAtSelection: duration };
    const { adapter, snapshot } = hydrateStored(
      storedLifecycle({ currentSession: session }),
    );

    // The session stays active and stays usable: guidance degrades to zero
    // rather than the Mission being discarded, and no duration is invented in
    // place of the one that was stored.
    expect(snapshot.currentSession).toEqual(session);
    expect(snapshot.currentSession?.state).toBe('active');
    // A malformed duration alone never blocks a write.
    expect(adapter.persist({ ...snapshot, settings: { language: 'ru' } }).status)
      .toBe('confirmed');
  });

  it('refuses a duration that is not a number at all', () => {
    const memory = createMemoryStorage(storedLifecycle({
      currentSession: { ...ACTIVE_SESSION, durationSecondsAtSelection: '240' },
    }));

    expect(createPersistenceAdapter(memory.storage).hydrate().status).toBe('corrupted');
  });

  it.each([
    ['selected', 'selected'],
    ['ready', 'ready'],
  ])('still requires a usable duration before a %s session starts', (_label, state) => {
    const memory = createMemoryStorage(storedLifecycle({
      currentSession: { ...READY_SESSION, state, durationSecondsAtSelection: 0 },
    }));

    expect(createPersistenceAdapter(memory.storage).hydrate().status).toBe('corrupted');
  });
});

describe('D4-B — a completed record that cannot be safely retained', () => {
  const brokenCopy = {
    ...COMPLETED_SESSION,
    sessionId: 'session-broken',
    completedAt: COMPLETED_SESSION.startedAt - 1,
  };
  const conflictingCopy = {
    ...SECOND_COMPLETED_SESSION,
    completedAt: SECOND_COMPLETED_SESSION.completedAt + 60_000,
  };

  it.each([
    ['an invalid completed record', [COMPLETED_SESSION, brokenCopy]],
    ['conflicting copies of one identifier', [
      COMPLETED_SESSION, SECOND_COMPLETED_SESSION, conflictingCopy,
    ]],
  ])('refuses a snapshot-replacing write while %s is stored', (_label, completedSessions) => {
    const rawSnapshot = storedLifecycle({ completedSessions });
    const { adapter, memory, snapshot } = hydrateStored(rawSnapshot);

    // The caller offers a snapshot that simply leaves the unresolved records
    // out. The refusal is the adapter's, so filtering cannot carry a write past
    // the condition.
    expect(adapter.persist({ ...snapshot, settings: { language: 'ru' } })).toEqual({
      status: 'unconfirmed',
      reason: 'blocked-completed-record',
    });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
    expect(memory.removeCalls).toEqual([]);
    // What was trustworthy stays readable while the write is refused.
    expect(snapshot.completedSessions).toEqual([COMPLETED_SESSION]);
  });

  it('refuses the write for every kind of snapshot replacement, including an unrelated one', () => {
    const rawSnapshot = storedLifecycle({
      completedSessions: [COMPLETED_SESSION, brokenCopy],
    });
    const { adapter, memory } = hydrateStored(rawSnapshot);

    expect(
      adapter.persist(lifecycleSnapshot({ currentSession: READY_SESSION })),
    ).toEqual({ status: 'unconfirmed', reason: 'blocked-completed-record' });
    expect(memory.values.get(MISSIONKID_STORAGE_KEY)).toBe(rawSnapshot);
    expect(memory.setCalls).toEqual([]);
  });

  it('lets the same write through once a later read no longer finds the condition', () => {
    const rawSnapshot = storedLifecycle({
      completedSessions: [COMPLETED_SESSION, brokenCopy],
    });
    const { adapter, memory } = hydrateStored(rawSnapshot);
    const intended = lifecycleSnapshot({
      settings: { language: 'ru' },
      completedSessions: [COMPLETED_SESSION],
    });

    expect(adapter.persist(intended).status).toBe('unconfirmed');

    // The block is a state of the stored data, not a permanent verdict.
    memory.values.set(
      MISSIONKID_STORAGE_KEY,
      storedLifecycle({ completedSessions: [COMPLETED_SESSION] }),
    );

    expect(adapter.persist(intended)).toEqual({
      status: 'confirmed',
      snapshot: intended,
    });
  });

  it('leaves the deliberate parent reset available while writes are refused', () => {
    const { adapter, memory } = hydrateStored(
      storedLifecycle({ completedSessions: [COMPLETED_SESSION, brokenCopy] }),
    );

    // Reset is never automatic, but the refusal must not take it away either.
    expect(adapter.reset()).toEqual({ status: 'confirmed' });
    expect(memory.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);
  });

  it.each([
    ['an identical duplicate', [COMPLETED_SESSION, { ...COMPLETED_SESSION }]],
    ['a completion whose Mission duration is malformed', [
      { ...COMPLETED_SESSION, durationSecondsAtSelection: 0 },
    ]],
  ])('keeps writing available when stored data holds only %s', (_label, completedSessions) => {
    const { adapter, snapshot } = hydrateStored(
      storedLifecycle({ completedSessions }),
    );

    expect(adapter.persist({ ...snapshot, settings: { language: 'ru' } }).status)
      .toBe('confirmed');
  });

  it('keeps writing available for an invalid pointer and a malformed active duration', () => {
    const { adapter, snapshot } = hydrateStored(
      storedLifecycle({
        currentSession: { ...ACTIVE_SESSION, durationSecondsAtSelection: -5 },
        currentResultSessionId: 'session-missing',
        completedSessions: [COMPLETED_SESSION],
      }),
    );

    expect(adapter.persist(snapshot).status).toBe('confirmed');
  });
});

describe('confirming a write that carries completed sessions', () => {
  const intended = lifecycleSnapshot({
    completedSessions: [COMPLETED_SESSION, SECOND_COMPLETED_SESSION],
  });

  function adapterReadingBack(rawReadBack: string) {
    const values = new Map<string, string>();

    return createPersistenceAdapter({
      getItem: (key) => values.get(key) ?? null,
      setItem: (key) => {
        values.set(key, rawReadBack);
      },
      removeItem: (key) => {
        values.delete(key);
      },
    });
  }

  it('confirms a read-back that carries every completed session unchanged', () => {
    const memory = createMemoryStorage();

    expect(createPersistenceAdapter(memory.storage).persist(intended)).toEqual({
      status: 'confirmed',
      snapshot: intended,
    });
  });

  it.each([
    ['completedAt', 1_700_000_300_001],
    ['completionPeriodId', '2023-12'],
    ['startedAt', 1_700_000_060_001],
    ['missionId', 'movement-99'],
    ['missionCategoryAtSelection', 'Calm'],
    ['durationSecondsAtSelection', 180],
    ['selectedAt', 1_700_000_000_001],
  ] as const)('refuses a read-back differing only in %s of one completed session', (field, value) => {
    const adapter = adapterReadingBack(storedLifecycle({
      completedSessions: [
        { ...COMPLETED_SESSION, [field]: value },
        SECOND_COMPLETED_SESSION,
      ],
    }));

    expect(adapter.persist(intended)).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-mismatch',
    });
  });

  it('refuses a read-back missing a record that was intended to be written', () => {
    const adapter = adapterReadingBack(storedLifecycle({
      completedSessions: [COMPLETED_SESSION],
    }));

    expect(adapter.persist(intended)).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-mismatch',
    });
  });

  it('refuses a read-back of equal length holding a different completed session', () => {
    const adapter = adapterReadingBack(storedLifecycle({
      completedSessions: [
        COMPLETED_SESSION,
        { ...SECOND_COMPLETED_SESSION, sessionId: 'session-someone-else' },
      ],
    }));

    // Equal lengths and one matching identifier are not equality: comparison is
    // keyed by identifier and then made field by field.
    expect(adapter.persist(intended)).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-mismatch',
    });
  });

  it.each([
    ['coalesced a duplicate', [COMPLETED_SESSION, SECOND_COMPLETED_SESSION, { ...COMPLETED_SESSION }]],
    ['excluded an unreadable record', [
      COMPLETED_SESSION,
      SECOND_COMPLETED_SESSION,
      { ...COMPLETED_SESSION, sessionId: 'session-broken', completionPeriodId: 'nope' },
    ]],
  ])('refuses a read-back whose parsing %s', (_label, completedSessions) => {
    const adapter = adapterReadingBack(storedLifecycle({ completedSessions }));

    // Parsing that had to change something to make the value readable did not
    // read back what was written, whatever the comparison would then say.
    expect(adapter.persist(intended)).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-invalid',
    });
  });

  it('refuses an intended snapshot that itself holds an unreadable completed session', () => {
    const memory = createMemoryStorage();
    const withBrokenRecord = lifecycleSnapshot({
      completedSessions: [
        COMPLETED_SESSION,
        { ...COMPLETED_SESSION, sessionId: 'session-broken', completedAt: 1 },
      ],
    });

    expect(createPersistenceAdapter(memory.storage).persist(withBrokenRecord)).toEqual({
      status: 'unconfirmed',
      reason: 'invalid-snapshot',
    });
    expect(memory.setCalls).toEqual([]);
  });
});

describe('snapshots written by the shipped F001 and F002 builds', () => {
  it('hydrates a setup-only snapshot unchanged and still writes it back', () => {
    const f001Snapshot = {
      ...createEmptySnapshot(),
      settings: { language: 'de' },
      childProfile: { localProfileId: 'local-profile-1', ageBand: '4–6' },
    };
    const { adapter, snapshot } = hydrateStored(JSON.stringify(f001Snapshot));

    expect(snapshot).toEqual(f001Snapshot);
    expect(adapter.persist(snapshot)).toEqual({ status: 'confirmed', snapshot });
  });

  it('hydrates a selected-only snapshot unchanged with no migration', () => {
    const f002Session = { ...SELECTION_FACTS, sessionId: 'session-1', state: 'selected' };
    const rawSnapshot = storedLifecycle({ currentSession: f002Session });
    const { adapter, snapshot } = hydrateStored(rawSnapshot);

    expect(snapshot).toEqual({
      ...createEmptySnapshot(),
      childProfile: { ...LIFECYCLE_PROFILE },
      currentSession: f002Session,
    });
    expect(snapshot.snapshotVersion).toBe(1);
    expect(snapshot.currentResultSessionId).toBeNull();
    expect(snapshot.completedSessions).toEqual([]);
    expect(adapter.persist(snapshot)).toEqual({ status: 'confirmed', snapshot });
  });
});
