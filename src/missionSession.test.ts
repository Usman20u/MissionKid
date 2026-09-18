// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import { MISSION_CATALOG } from './catalogContent';
import type { MissionRecord } from './catalog';
import {
  advanceSessionToReady,
  selectMission,
  startMissionSession,
} from './missionSession';
import type { SuggestionContext } from './missionSuggestions';
import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type ActiveMissionSession,
  type CurrentMissionSession,
  type ReadyMissionSession,
  type SelectedMissionSession,
  type SnapshotStorage,
} from './persistence';

const PROFILE_ID = 'profile-1';
const CONTEXT: SuggestionContext = {
  ageBand: '7–8',
  category: 'Movement',
  language: 'en',
};

function missionFor(missionId: string): MissionRecord {
  const mission = MISSION_CATALOG.find((record) => record.missionId === missionId);
  if (!mission) throw new Error(`expected ${missionId} in the production catalog`);
  return mission;
}

const FIRST = missionFor('movement-02');
const SECOND = missionFor('movement-10');

// The facts a session written by the shipped build carries, as a later
// lifecycle state would hold them.
const STORED_FACTS = {
  sessionId: 'session-1',
  childProfileId: PROFILE_ID,
  missionId: FIRST.missionId,
  missionCategoryAtSelection: FIRST.category,
  ageBandAtSelection: '7–8',
  durationSecondsAtSelection: FIRST.durationSeconds,
  selectedAt: 1_700_000_000_000,
} as const;

const SELECTED_SESSION: SelectedMissionSession = {
  ...STORED_FACTS,
  state: 'selected',
};

const READY_SESSION: ReadyMissionSession = { ...STORED_FACTS, state: 'ready' };

const ACTIVE_SESSION: ActiveMissionSession = {
  ...STORED_FACTS,
  state: 'active',
  startedAt: 1_700_000_060_000,
};

function createHarness(
  overrides: { session?: CurrentMissionSession | null; ageBand?: string } = {},
) {
  const values = new Map<string, string>();
  values.set('unrelated-key', 'untouched');
  values.set(
    MISSIONKID_STORAGE_KEY,
    JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: PROFILE_ID, ageBand: overrides.ageBand ?? '7–8' },
      currentSession: overrides.session ?? null,
    }),
  );

  const storage: SnapshotStorage = {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: vi.fn(),
  };

  return { values, storage, adapter: createPersistenceAdapter(storage) };
}

function stored(values: Map<string, string>) {
  return JSON.parse(values.get(MISSIONKID_STORAGE_KEY)!);
}

describe('choosing a Mission', () => {
  it('creates one selected session holding exactly the selection facts', () => {
    const harness = createHarness();
    const createId = vi.fn(() => 'session-1');
    const now = vi.fn(() => 1_700_000_000_000);

    const result = selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      createId,
      now,
    );

    if (result.status !== 'created') throw new Error('expected a created session');

    // Exactly the eight selection fields: no lifecycle timestamp this task
    // cannot have observed, and no localized Mission text.
    expect(result.session).toEqual({
      sessionId: 'session-1',
      childProfileId: PROFILE_ID,
      missionId: 'movement-02',
      missionCategoryAtSelection: 'Movement',
      ageBandAtSelection: '7–8',
      durationSecondsAtSelection: FIRST.durationSeconds,
      state: 'selected',
      selectedAt: 1_700_000_000_000,
    });
    expect(createId).toHaveBeenCalledTimes(1);
    expect(now).toHaveBeenCalledTimes(1);
  });

  it('persists no Mission wording, only the reference', () => {
    const harness = createHarness();
    selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      () => 'session-1',
      () => 1,
    );

    const raw = harness.values.get(MISSIONKID_STORAGE_KEY)!;
    // The title and instruction exist in three languages; none may be durable.
    for (const language of ['en', 'de', 'ru'] as const) {
      expect(raw).not.toContain(FIRST.content[language].title);
      expect(raw).not.toContain(FIRST.content[language].instruction);
    }
    expect(stored(harness.values).currentSession.missionId).toBe('movement-02');
  });

  it('resolves the same session when the same Mission is chosen again', () => {
    const harness = createHarness();
    const createId = vi.fn(() => 'session-1');
    const now = vi.fn(() => 1_700_000_000_000);

    const first = selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      createId,
      now,
    );
    const writesAfterFirst = (harness.storage.setItem as ReturnType<typeof vi.fn>).mock
      .calls.length;

    const again = selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      createId,
      now,
    );

    if (first.status !== 'created' || again.status !== 'resolved') {
      throw new Error('expected a created session then a resolved one');
    }

    // One choice pressed twice is one session: no second identifier, no moved
    // timestamp, and no second write to prove a fact already stored.
    expect(again.session).toEqual(first.session);
    expect(createId).toHaveBeenCalledTimes(1);
    expect(now).toHaveBeenCalledTimes(1);
    expect((harness.storage.setItem as ReturnType<typeof vi.fn>).mock.calls.length)
      .toBe(writesAfterFirst);
  });

  it('refuses a different Mission while a session exists, changing nothing', () => {
    const harness = createHarness();
    selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      () => 'session-1',
      () => 1_700_000_000_000,
    );
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);

    const createId = vi.fn(() => 'session-2');
    const now = vi.fn(() => 2_000_000_000_000);
    const result = selectMission(
      harness.adapter,
      { mission: SECOND, context: CONTEXT },
      createId,
      now,
    );

    if (result.status !== 'conflict') throw new Error('expected a conflict');

    // The conflict carries the session in the way so the return-or-abandon
    // choice can be offered. Nothing was minted, timed or written.
    expect(result.session.missionId).toBe('movement-02');
    expect(createId).not.toHaveBeenCalled();
    expect(now).not.toHaveBeenCalled();
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
  });

  it('refuses a Mission the current context may not be offered', () => {
    const harness = createHarness();
    const createId = vi.fn(() => 'session-1');

    // Right shape, wrong context: a Calm Mission cannot answer a Movement cycle.
    const result = selectMission(
      harness.adapter,
      { mission: missionFor('calm-02'), context: CONTEXT },
      createId,
      () => 1,
    );

    expect(result).toEqual({ status: 'unavailable' });
    expect(createId).not.toHaveBeenCalled();
    expect(stored(harness.values).currentSession).toBeNull();
  });

  it('refuses when the stored age band no longer matches the cycle', () => {
    const harness = createHarness({ ageBand: '4–6' });

    expect(
      selectMission(
        harness.adapter,
        { mission: FIRST, context: CONTEXT },
        () => 'session-1',
        () => 1,
      ),
    ).toEqual({ status: 'unavailable' });
    expect(stored(harness.values).currentSession).toBeNull();
  });

  it.each([
    ['write', 'setItem', 'write-failed'],
    ['read-back', 'getItem', 'read-back-failed'],
  ] as const)('reports an unconfirmed selection when %s fails', (_label, method, reason) => {
    const harness = createHarness();
    let writes = 0;
    const original = harness.storage[method];
    // The read before the write must still succeed, so only the read that
    // confirms the write is made to fail.
    harness.storage[method] = ((key: string, value?: string) => {
      if (method === 'setItem') throw new Error('write failed');
      writes += 1;
      // The domain's read and the adapter's pre-write read must both succeed,
      // so only the read that confirms the write is made to fail.
      if (writes > 2) throw new Error('read-back failed');
      return (original as (k: string) => string | null)(key);
    }) as never;

    const result = selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      () => 'session-1',
      () => 1,
    );

    expect(result).toEqual({ status: 'unconfirmed', reason });
  });

  it('reports an unconfirmed selection when the stored value is not what was written', () => {
    const harness = createHarness();
    harness.storage.setItem = vi.fn((key: string) => {
      // A different but structurally valid session comes back.
      harness.values.set(
        key,
        JSON.stringify({
          ...createEmptySnapshot(),
          childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
          currentSession: {
            sessionId: 'someone-elses-session',
            childProfileId: PROFILE_ID,
            missionId: 'movement-10',
            missionCategoryAtSelection: 'Movement',
            ageBandAtSelection: '7–8',
            durationSecondsAtSelection: 180,
            state: 'selected',
            selectedAt: 5,
          },
        }),
      );
    });

    // Confirmation compares the session field by field, so a changed stored
    // session cannot pass as the one that was intended.
    expect(
      selectMission(
        harness.adapter,
        { mission: FIRST, context: CONTEXT },
        () => 'session-1',
        () => 1,
      ),
    ).toEqual({ status: 'unconfirmed', reason: 'read-back-mismatch' });
  });

  it('leaves unrelated storage untouched', () => {
    const harness = createHarness();
    selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      () => 'session-1',
      () => 1,
    );

    expect(harness.values.get('unrelated-key')).toBe('untouched');
    const snapshot = stored(harness.values);
    expect(snapshot.snapshotVersion).toBe(1);
    expect(snapshot.completedSessions).toEqual([]);
    expect(snapshot.currentResultSessionId).toBeNull();
  });

  it.each([
    ['ready', READY_SESSION],
    ['active', ACTIVE_SESSION],
  ] as const)('answers with a stored %s session rather than a new selection', (state, session) => {
    const harness = createHarness({ session });
    const createId = vi.fn(() => 'must-not-be-minted');
    const now = vi.fn(() => 2_000_000_000_000);
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);

    const result = selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      createId,
      now,
    );

    if (result.status !== 'resolved') throw new Error('expected the stored session');

    // Choosing the Mission that is already under way returns that session in
    // the state it is actually in. It is not a repeatable selection: nothing is
    // minted, nothing is written, and no lifecycle state is rebuilt from it.
    expect(result.session.state).toBe(state);
    expect(result.session).toEqual(session);
    expect(createId).not.toHaveBeenCalled();
    expect(now).not.toHaveBeenCalled();
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
  });

  it.each([
    ['ready', READY_SESSION],
    ['active', ACTIVE_SESSION],
  ] as const)('refuses a different Mission while a %s session exists', (state, session) => {
    const harness = createHarness({ session });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);
    const createId = vi.fn(() => 'session-2');

    const result = selectMission(
      harness.adapter,
      { mission: SECOND, context: CONTEXT },
      createId,
      () => 2_000_000_000_000,
    );

    if (result.status !== 'conflict') throw new Error('expected a conflict');

    // The conflict carries the session in the way, in its own state, so the
    // return-or-abandon choice can be about the Mission that is really running.
    expect(result.session.state).toBe(state);
    expect(result.session.missionId).toBe(FIRST.missionId);
    expect(createId).not.toHaveBeenCalled();
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
  });

  it('restores the same session on a later load', () => {
    const harness = createHarness();
    const created = selectMission(
      harness.adapter,
      { mission: FIRST, context: CONTEXT },
      () => 'session-1',
      () => 1_700_000_000_000,
    );
    if (created.status !== 'created') throw new Error('expected a created session');

    const hydrated = createPersistenceAdapter(harness.storage).hydrate();
    if (hydrated.status !== 'hydrated') throw new Error('expected a hydrated snapshot');

    expect(hydrated.snapshot.currentSession).toEqual(created.session);
  });
});


function writeCount(storage: SnapshotStorage): number {
  return (storage.setItem as ReturnType<typeof vi.fn>).mock.calls.length;
}

describe('reaching the ready state', () => {
  it('advances a stored selected session, adding nothing to it', () => {
    const harness = createHarness({ session: SELECTED_SESSION });

    const result = advanceSessionToReady(harness.adapter);

    if (result.status !== 'advanced') throw new Error('expected an advance');

    // The same session, in the next state: every immutable selection fact is
    // the one that was agreed to, and the only difference is `state`.
    expect(result.session).toEqual({ ...SELECTED_SESSION, state: 'ready' });
    expect(result.session.sessionId).toBe(SELECTED_SESSION.sessionId);
    expect(writeCount(harness.storage)).toBe(1);

    const session = stored(harness.values).currentSession;
    expect(session.state).toBe('ready');
    // Entering ready starts nothing, so no start timestamp can exist yet.
    expect(Object.hasOwn(session, 'startedAt')).toBe(false);
    expect(Object.hasOwn(session, 'completedAt')).toBe(false);
    expect(Object.keys(session).sort()).toEqual(
      Object.keys(SELECTED_SESSION).sort(),
    );
    expect(stored(harness.values).completedSessions).toEqual([]);
    expect(stored(harness.values).currentResultSessionId).toBeNull();
  });

  it('resolves an already ready session without writing again', () => {
    const harness = createHarness({ session: SELECTED_SESSION });

    const first = advanceSessionToReady(harness.adapter);
    const stored_before = harness.values.get(MISSIONKID_STORAGE_KEY);

    // A repeat, a replayed effect, a remount and a retry all arrive here.
    const again = advanceSessionToReady(harness.adapter);
    const third = advanceSessionToReady(harness.adapter);

    if (first.status !== 'advanced') throw new Error('expected an advance');
    if (again.status !== 'resolved' || third.status !== 'resolved') {
      throw new Error('expected the stored ready session');
    }
    expect(again.session).toEqual(first.session);
    expect(third.session).toEqual(first.session);
    expect(writeCount(harness.storage)).toBe(1);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(stored_before);
  });

  it('leaves a session that has already started exactly as it is', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);

    const result = advanceSessionToReady(harness.adapter);

    // A session that advanced past ready is never rebuilt into an earlier
    // state, and nothing about it is rewritten to say otherwise.
    if (result.status !== 'inapplicable') throw new Error('expected no change');
    expect(result.session).toEqual(ACTIVE_SESSION);
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
  });

  it('has nothing to advance when no session is stored', () => {
    const harness = createHarness();

    expect(advanceSessionToReady(harness.adapter)).toEqual({
      status: 'inapplicable',
      session: null,
    });
    expect(writeCount(harness.storage)).toBe(0);
  });

  it('writes nothing when durable state cannot be read', () => {
    const harness = createHarness({ session: SELECTED_SESSION });
    harness.values.set(MISSIONKID_STORAGE_KEY, '{corrupted');

    expect(advanceSessionToReady(harness.adapter)).toEqual({
      status: 'unavailable',
    });
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe('{corrupted');
  });

  it('reports a failure established before storage changed, leaving the session selected', () => {
    const harness = createHarness({ session: SELECTED_SESSION });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);
    harness.storage.setItem = vi.fn(() => {
      throw new Error('write failed');
    });

    expect(advanceSessionToReady(harness.adapter)).toEqual({
      status: 'not-advanced',
      reason: 'write-failed',
    });
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
    expect(stored(harness.values).currentSession.state).toBe('selected');
  });

  it('is refused, byte for byte, while an unresolved completed record is stored', () => {
    const completed = {
      ...STORED_FACTS,
      sessionId: 'session-broken',
      state: 'completed',
      startedAt: 1_700_000_060_000,
      // Earlier than its own start: a completed record that cannot be retained.
      completedAt: 1,
      completionPeriodId: '2023-11',
    };
    const raw = JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
      currentSession: SELECTED_SESSION,
      completedSessions: [completed],
    });
    const values = new Map([[MISSIONKID_STORAGE_KEY, raw]]);
    const setItem = vi.fn((key: string, value: string) => {
      values.set(key, value);
    });
    const adapter = createPersistenceAdapter({
      getItem: (key) => values.get(key) ?? null,
      setItem,
      removeItem: vi.fn(),
    });

    expect(advanceSessionToReady(adapter)).toEqual({
      status: 'not-advanced',
      reason: 'blocked-completed-record',
    });
    expect(setItem).not.toHaveBeenCalled();
    expect(values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('resolves the durable session when a landed write could not be confirmed', () => {
    const harness = createHarness({ session: SELECTED_SESSION });
    let reads = 0;
    const realGet = harness.storage.getItem;
    harness.storage.getItem = vi.fn((key: string) => {
      reads += 1;
      // The write lands; only the read that would confirm it fails.
      if (reads === 3) throw new Error('read-back failed');
      return (realGet as (k: string) => string | null)(key);
    });

    const result = advanceSessionToReady(harness.adapter);

    // Neither success nor rollback was claimed: durable state was read again,
    // and what it says is what comes back — the same session, already ready.
    if (result.status !== 'resolved') throw new Error('expected the stored session');
    expect(result.session).toEqual({ ...SELECTED_SESSION, state: 'ready' });
    expect(result.session.sessionId).toBe(SELECTED_SESSION.sessionId);
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).currentSession.state).toBe('ready');
  });

  it('claims neither outcome when the interrupted write cannot be read back at all', () => {
    const harness = createHarness({ session: SELECTED_SESSION });
    let reads = 0;
    const realGet = harness.storage.getItem;
    harness.storage.getItem = vi.fn((key: string) => {
      reads += 1;
      if (reads >= 3) throw new Error('storage unavailable');
      return (realGet as (k: string) => string | null)(key);
    });

    expect(advanceSessionToReady(harness.adapter)).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-failed',
    });
    // The write is not undone: rolling back a transition that may have
    // succeeded would be a second guess written over durable state.
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).currentSession.state).toBe('ready');
  });

  it('advances the same session once when a retry follows a failed write', () => {
    const harness = createHarness({ session: SELECTED_SESSION });
    const realSet = harness.storage.setItem;
    let failWrite = true;
    harness.storage.setItem = vi.fn((key: string, value: string) => {
      if (failWrite) throw new Error('write failed');
      (realSet as (k: string, v: string) => void)(key, value);
    });

    expect(advanceSessionToReady(harness.adapter).status).toBe('not-advanced');

    failWrite = false;
    const retried = advanceSessionToReady(harness.adapter);

    if (retried.status !== 'advanced') throw new Error('expected an advance');
    expect(retried.session.sessionId).toBe(SELECTED_SESSION.sessionId);
    expect(retried.session.selectedAt).toBe(SELECTED_SESSION.selectedAt);
    expect(stored(harness.values).currentSession.state).toBe('ready');
  });
});

const START_CLOCK = 1_700_000_500_000;

// The reads one start makes, in order, so a fault names the read it fails
// rather than a count: the domain's own read of durable state, the adapter's
// pre-write guard, the read that confirms the write, and the read that recovers
// durable state when that confirmation did not come back.
const READS = { hydrate: 1, preWriteGuard: 2, readBack: 3, recovery: 4 } as const;

function failReads(
  harness: ReturnType<typeof createHarness>,
  failing: readonly number[],
) {
  let reads = 0;
  const values = harness.values;

  harness.storage.getItem = vi.fn((key: string) => {
    reads += 1;
    if (failing.includes(reads)) throw new Error('storage unavailable');
    return values.get(key) ?? null;
  });
}

describe('starting a Mission', () => {
  it('writes one start timestamp and adds nothing else', () => {
    const harness = createHarness({ session: READY_SESSION });
    const now = vi.fn(() => START_CLOCK);

    const result = startMissionSession(harness.adapter, 'session-1', now, 'en');

    if (result.status !== 'started') throw new Error('expected a start');
    expect(result.session).toEqual({ ...READY_SESSION, state: 'active', startedAt: START_CLOCK });
    expect(now).toHaveBeenCalledTimes(1);
    expect(writeCount(harness.storage)).toBe(1);

    const stored_session = stored(harness.values).currentSession;
    // Every immutable selection fact is the one that was agreed to, and the
    // only additions are the new state and one start timestamp.
    expect(Object.keys(stored_session).sort()).toEqual(
      [...Object.keys(READY_SESSION), 'startedAt'].sort(),
    );
    expect(stored_session.sessionId).toBe(READY_SESSION.sessionId);
    expect(stored_session.selectedAt).toBe(READY_SESSION.selectedAt);
    expect(stored_session.durationSecondsAtSelection)
      .toBe(READY_SESSION.durationSecondsAtSelection);
    // No derived deadline, counter or completion is persisted anywhere.
    expect(stored(harness.values).completedSessions).toEqual([]);
    expect(stored(harness.values).currentResultSessionId).toBeNull();
    expect(harness.values.get('unrelated-key')).toBe('untouched');
  });

  it('resolves the same running session on repeated activation', () => {
    const harness = createHarness({ session: READY_SESSION });
    const now = vi.fn(() => START_CLOCK);
    const first = startMissionSession(harness.adapter, 'session-1', now, 'en');
    const storedAfterStart = harness.values.get(MISSIONKID_STORAGE_KEY);

    const again = startMissionSession(harness.adapter, 'session-1', vi.fn(() => START_CLOCK + 60_000), 'en');
    const third = startMissionSession(harness.adapter, 'session-1', vi.fn(() => START_CLOCK + 90_000), 'en');

    if (first.status !== 'started') throw new Error('expected a start');
    if (again.status !== 'resolved' || third.status !== 'resolved') {
      throw new Error('expected the running session');
    }
    // One start, one countdown: no second write, and no later clock reading
    // replaces the timestamp that is already durable.
    expect(again.session.startedAt).toBe(START_CLOCK);
    expect(third.session).toEqual(first.session);
    expect(writeCount(harness.storage)).toBe(1);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(storedAfterStart);
  });

  it.each([
    ['a request naming another session', 'session-somewhere-else', READY_SESSION],
    ['a session that has not reached ready', 'session-1', SELECTED_SESSION],
  ] as const)('starts nothing for %s', (_label, requestedId, session) => {
    const harness = createHarness({ session });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);
    const now = vi.fn(() => START_CLOCK);

    expect(startMissionSession(harness.adapter, requestedId, now, 'en')).toEqual({
      status: 'unavailable',
    });
    expect(now).not.toHaveBeenCalled();
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
  });

  it.each([
    ['a Mission the catalog no longer carries', { missionId: 'movement-99' }],
    ['a Mission no longer approved for the context it was chosen in', {
      ageBandAtSelection: '9–10',
    }],
  ] as const)('refuses to start %s', (_label, overrides) => {
    const harness = createHarness({ session: { ...READY_SESSION, ...overrides } });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);

    // Withdrawn or unresolvable content is never started, substituted or
    // rewritten; the session itself is left exactly as it is.
    expect(startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en'))
      .toEqual({ status: 'unavailable' });
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
  });

  it('starts nothing when durable state cannot be read', () => {
    const harness = createHarness({ session: READY_SESSION });
    failReads(harness, [READS.hydrate]);

    expect(startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en'))
      .toEqual({ status: 'unavailable' });
    expect(writeCount(harness.storage)).toBe(0);
  });

  it('keeps the session ready when the write is refused before storage changes', () => {
    const harness = createHarness({ session: READY_SESSION });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);
    harness.storage.setItem = vi.fn(() => {
      throw new Error('write failed');
    });

    const result = startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en');

    if (result.status !== 'not-started') throw new Error('expected no start');
    expect(result.reason).toBe('write-failed');
    expect(result.session).toEqual(READY_SESSION);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
    expect(stored(harness.values).currentSession.state).toBe('ready');
    expect(Object.hasOwn(stored(harness.values).currentSession, 'startedAt')).toBe(false);
  });

  it('keeps the session ready when the pre-write guard cannot read storage', () => {
    const harness = createHarness({ session: READY_SESSION });
    failReads(harness, [READS.preWriteGuard]);

    // The adapter refuses to replace a snapshot it cannot see, so this is a
    // failure established before storage changed rather than an unknown one.
    const result = startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en');

    expect(result).toEqual({
      status: 'not-started',
      reason: 'write-failed',
      session: READY_SESSION,
    });
    expect(writeCount(harness.storage)).toBe(0);
  });

  it('is refused, byte for byte, while an unresolved completed record is stored', () => {
    const raw = JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
      currentSession: READY_SESSION,
      completedSessions: [{
        ...STORED_FACTS,
        sessionId: 'session-broken',
        state: 'completed',
        startedAt: 1_700_000_060_000,
        completedAt: 1,
        completionPeriodId: '2023-11',
      }],
    });
    const values = new Map([[MISSIONKID_STORAGE_KEY, raw]]);
    const setItem = vi.fn((key: string, value: string) => {
      values.set(key, value);
    });
    const adapter = createPersistenceAdapter({
      getItem: (key) => values.get(key) ?? null,
      setItem,
      removeItem: vi.fn(),
    });

    expect(startMissionSession(adapter, 'session-1', () => START_CLOCK, 'en')).toEqual({
      status: 'not-started',
      reason: 'blocked-completed-record',
      session: READY_SESSION,
    });
    expect(setItem).not.toHaveBeenCalled();
    expect(values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('adopts the durable start timestamp when a landed write could not be confirmed', () => {
    const harness = createHarness({ session: READY_SESSION });
    failReads(harness, [READS.readBack]);
    const now = vi.fn(() => START_CLOCK);

    const result = startMissionSession(harness.adapter, 'session-1', now, 'en');

    // The write landed; only its confirmation did not come back. Durable state
    // is read again and the timestamp it already holds is adopted unchanged.
    if (result.status !== 'resolved') throw new Error('expected the running session');
    expect(result.session.startedAt).toBe(START_CLOCK);
    expect(now).toHaveBeenCalledTimes(1);
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).currentSession.state).toBe('active');
  });

  it('claims neither outcome when the interrupted write cannot be read back at all', () => {
    const harness = createHarness({ session: READY_SESSION });
    failReads(harness, [READS.readBack, READS.recovery]);

    const result = startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en');

    expect(result).toEqual({ status: 'unconfirmed', reason: 'read-back-failed' });
    // No rollback: a start that may already be durable is never removed.
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).currentSession.state).toBe('active');
    expect(stored(harness.values).currentSession.startedAt).toBe(START_CLOCK);
  });

  it('reports no start when an unconfirmed write is found not to have landed', () => {
    const harness = createHarness({ session: READY_SESSION });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY)!;
    // The write is accepted by storage but stores the previous value, so the
    // read-back cannot match and durable state still says `ready`.
    harness.storage.setItem = vi.fn((key: string) => {
      harness.values.set(key, before);
    });

    const result = startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en');

    if (result.status !== 'not-started') throw new Error('expected no start');
    expect(result.reason).toBe('read-back-mismatch');
    expect(result.session.state).toBe('ready');
    expect(stored(harness.values).currentSession.state).toBe('ready');
  });

  it('starts the same session once when a retry follows a refused write', () => {
    const harness = createHarness({ session: READY_SESSION });
    const realSet = harness.storage.setItem;
    let failWrite = true;
    harness.storage.setItem = vi.fn((key: string, value: string) => {
      if (failWrite) throw new Error('write failed');
      (realSet as (k: string, v: string) => void)(key, value);
    });

    expect(startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en').status)
      .toBe('not-started');

    failWrite = false;
    const retried = startMissionSession(harness.adapter, 'session-1', () => START_CLOCK + 5_000, 'en');

    if (retried.status !== 'started') throw new Error('expected a start');
    expect(retried.session.sessionId).toBe('session-1');
    expect(retried.session.startedAt).toBe(START_CLOCK + 5_000);
    expect(stored(harness.values).currentSession.state).toBe('active');
    // One durable start: the retry did not leave a second session behind.
    expect(stored(harness.values).currentSession.sessionId).toBe('session-1');
  });

  it('never rebuilds ready over a session that is already running', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY);

    expect(advanceSessionToReady(harness.adapter).status).toBe('inapplicable');
    const started = startMissionSession(harness.adapter, 'session-1', () => START_CLOCK, 'en');

    if (started.status !== 'resolved') throw new Error('expected the running session');
    expect(started.session.startedAt).toBe(ACTIVE_SESSION.startedAt);
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(before);
  });
});
