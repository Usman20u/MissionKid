// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import { MISSION_CATALOG } from './catalogContent';
import type { MissionRecord } from './catalog';
import {
  advanceSessionToReady,
  completeMissionSession,
  leaveMissionSession,
  localCompletionPeriodId,
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

const COMPLETED_SESSION = {
  ...STORED_FACTS,
  sessionId: 'session-done',
  state: 'completed',
  startedAt: 1_700_000_060_000,
  completedAt: 1_700_000_360_000,
  completionPeriodId: '2023-11',
} as const;

// A snapshot whose completed collection matters to the case under test, which
// the shared harness deliberately leaves empty.
function createHarnessWith(
  snapshot: Record<string, unknown>,
) {
  const values = new Map<string, string>();
  values.set('unrelated-key', 'untouched');
  values.set(
    MISSIONKID_STORAGE_KEY,
    JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
      ...snapshot,
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

describe('leaving a Mission without completing it', () => {
  it.each([
    ['a ready cancellation', READY_SESSION, 'ready'],
    ['a confirmed abandonment', ACTIVE_SESSION, 'active'],
  ] as const)('clears the current session for %s', (_label, session, from) => {
    const harness = createHarness({ session });

    expect(leaveMissionSession(harness.adapter, 'session-1', from)).toEqual({
      status: 'left',
    });

    const after = stored(harness.values);
    expect(after.currentSession).toBeNull();
    // Nothing is created by leaving: no completion, no pointer, no history.
    expect(after.completedSessions).toEqual([]);
    expect(after.currentResultSessionId).toBeNull();
    expect(writeCount(harness.storage)).toBe(1);
    // One targeted replacement, never a global reset.
    expect(harness.storage.removeItem).not.toHaveBeenCalled();
    expect(harness.values.get('unrelated-key')).toBe('untouched');
  });

  it('carries every unrelated durable fact across untouched', () => {
    const harness = createHarnessWith({
      settings: { language: 'ru' },
      currentSession: ACTIVE_SESSION,
      completedSessions: [COMPLETED_SESSION],
    });

    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'left',
    });

    const after = stored(harness.values);
    expect(after.settings).toEqual({ language: 'ru' });
    expect(after.childProfile).toEqual({ localProfileId: PROFILE_ID, ageBand: '7–8' });
    expect(after.completedSessions).toEqual([COMPLETED_SESSION]);
    expect(after.snapshotVersion).toBe(1);
  });

  it('resolves an already absent session without writing again', () => {
    const harness = createHarness({ session: null });

    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'resolved',
    });
    // Nothing is recreated, and nothing is written a second time.
    expect(writeCount(harness.storage)).toBe(0);
    expect(stored(harness.values).currentSession).toBeNull();
  });

  it('never clears a different session that holds the same Mission', () => {
    const replacement = { ...READY_SESSION, sessionId: 'session-2' };
    const harness = createHarness({ session: replacement });

    const result = leaveMissionSession(harness.adapter, 'session-1', 'ready');

    expect(result).toEqual({ status: 'superseded', session: replacement });
    expect(writeCount(harness.storage)).toBe(0);
    expect(stored(harness.values).currentSession.sessionId).toBe('session-2');
  });

  it('does not abandon a session that has since started', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });

    // A ready cancellation that arrives late names a state the session has
    // left. Honouring it would abandon a running Mission without the
    // confirmation abandonment requires.
    const result = leaveMissionSession(harness.adapter, 'session-1', 'ready');

    expect(result).toEqual({ status: 'superseded', session: ACTIVE_SESSION });
    expect(writeCount(harness.storage)).toBe(0);
    expect(stored(harness.values).currentSession.state).toBe('active');
  });

  it('refuses to cancel or abandon a completed Mission Session', () => {
    const harness = createHarnessWith({
      currentSession: null,
      currentResultSessionId: 'session-done',
      completedSessions: [COMPLETED_SESSION],
    });
    const raw = harness.values.get(MISSIONKID_STORAGE_KEY)!;

    for (const from of ['ready', 'active'] as const) {
      expect(leaveMissionSession(harness.adapter, 'session-done', from)).toEqual({
        status: 'unavailable',
      });
    }

    // The completion and the result reference it is recovered through both
    // stand exactly as they were.
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('leaves a Mission whose guidance and content can no longer be shown', () => {
    const harness = createHarness({
      session: {
        ...ACTIVE_SESSION,
        missionId: 'movement-99',
        durationSecondsAtSelection: 0,
      } as never,
    });

    // Stopping never depends on remaining time, a usable duration or content
    // that still resolves.
    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'left',
    });
    expect(stored(harness.values).currentSession).toBeNull();
  });

  it('reports no exit and keeps the session when the write is refused', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const raw = harness.values.get(MISSIONKID_STORAGE_KEY)!;
    harness.storage.setItem = vi.fn(() => {
      throw new Error('write failed');
    });

    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'not-left',
      reason: 'write-failed',
      session: ACTIVE_SESSION,
    });
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('refuses the exit while an unresolved completed record is stored', () => {
    const harness = createHarnessWith({
      currentSession: ACTIVE_SESSION,
      completedSessions: [
        { ...COMPLETED_SESSION, completedAt: 1 },
      ],
    });
    const raw = harness.values.get(MISSIONKID_STORAGE_KEY)!;

    // D4-B is not bypassed to make an exit look successful: a replacement that
    // would discard an unresolved completed record is refused, and the stored
    // bytes are exactly what they were.
    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'not-left',
      reason: 'blocked-completed-record',
      session: ACTIVE_SESSION,
    });
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('adopts the cleared session when a landed write could not be confirmed', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    failReads(harness, [READS.readBack]);

    // The write landed and only its confirmation was lost. Durable state is
    // read again and the outcome it shows is adopted without writing again.
    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'resolved',
    });
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).currentSession).toBeNull();
  });

  it('claims neither outcome when the interrupted write cannot be read back', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    failReads(harness, [READS.readBack, READS.recovery]);

    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'unconfirmed',
      reason: 'read-back-failed',
    });
    // No session is written back over an exit that may already be durable.
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).currentSession).toBeNull();
  });

  it('reports the session still present when an unconfirmed write did not land', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY)!;
    harness.storage.setItem = vi.fn((key: string) => {
      harness.values.set(key, before);
    });

    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'not-left',
      reason: 'read-back-mismatch',
      session: ACTIVE_SESSION,
    });
    expect(stored(harness.values).currentSession.sessionId).toBe('session-1');
  });

  it('preserves a newer session found after an interrupted exit', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const replacement = { ...READY_SESSION, sessionId: 'session-2' };
    let reads = 0;
    const values = harness.values;

    harness.storage.getItem = vi.fn((key: string) => {
      reads += 1;
      if (reads === READS.readBack) throw new Error('storage unavailable');
      // By the recovery read another Mission Session has become current.
      if (reads === READS.recovery) {
        return JSON.stringify({
          ...JSON.parse(values.get(MISSIONKID_STORAGE_KEY)!),
          currentSession: replacement,
        });
      }
      return values.get(key) ?? null;
    });

    const result = leaveMissionSession(harness.adapter, 'session-1', 'active');

    // The newer session is preserved and handed back rather than cleared by a
    // retry that belonged to the Mission before it.
    expect(result).toEqual({ status: 'superseded', session: replacement });
    expect(writeCount(harness.storage)).toBe(1);
  });

  it('is unavailable when the snapshot cannot be read at all', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    harness.storage.getItem = vi.fn(() => {
      throw new Error('storage unavailable');
    });

    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'unavailable',
    });
    expect(writeCount(harness.storage)).toBe(0);
  });

  it('clears the same session twice to the same outcome', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });

    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'left',
    });
    // The retry is safe: the session is gone, so nothing is written and nothing
    // is recreated.
    expect(leaveMissionSession(harness.adapter, 'session-1', 'active')).toEqual({
      status: 'resolved',
    });
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).currentSession).toBeNull();
  });
});

const DONE_CLOCK = 1_700_000_360_000;

describe('recording a completion exactly once', () => {
  it('replaces the whole snapshot in one write', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const now = vi.fn(() => DONE_CLOCK);

    const result = completeMissionSession(harness.adapter, 'session-1', now, 'en');

    if (result.status !== 'completed') throw new Error('expected a completion');
    // The same session, its immutable facts untouched, plus exactly the two
    // completion facts.
    expect(result.session).toEqual({
      ...ACTIVE_SESSION,
      state: 'completed',
      completedAt: DONE_CLOCK,
      completionPeriodId: localCompletionPeriodId(DONE_CLOCK),
    });

    const after = stored(harness.values);
    expect(after.currentSession).toBeNull();
    expect(after.completedSessions).toHaveLength(1);
    expect(after.currentResultSessionId).toBe('session-1');
    expect(now).toHaveBeenCalledTimes(1);
    expect(writeCount(harness.storage)).toBe(1);
    expect(harness.values.get('unrelated-key')).toBe('untouched');
  });

  it('derives the period from the local calendar month, not the UTC one', () => {
    // The two ends where a local month and the UTC month actually diverge are
    // covered under fixed timezones in the calendar suite below. This case only
    // fixes that the local parts, not the ISO string, decide the identity.
    const localMidnightEve = new Date(2024, 2, 31, 23, 30).getTime();
    const harness = createHarness({
      session: { ...ACTIVE_SESSION, startedAt: localMidnightEve - 60_000 },
    });

    const result = completeMissionSession(
      harness.adapter,
      'session-1',
      () => localMidnightEve,
      'en',
    );

    if (result.status !== 'completed') throw new Error('expected a completion');
    expect(result.session.completionPeriodId).toBe('2024-03');
    expect(localCompletionPeriodId(new Date(2024, 0, 1, 0, 0).getTime())).toBe('2024-01');
    expect(localCompletionPeriodId(new Date(2024, 11, 31, 23, 59).getTime())).toBe('2024-12');
  });

  it('never records a Mission as finishing before it started', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });

    // The device clock moved back behind the start.
    const result = completeMissionSession(
      harness.adapter,
      'session-1',
      () => ACTIVE_SESSION.startedAt - 90_000,
      'en',
    );

    if (result.status !== 'completed') throw new Error('expected a completion');
    expect(result.session.completedAt).toBe(ACTIVE_SESSION.startedAt);
    expect(result.session.completionPeriodId).toBe(
      localCompletionPeriodId(ACTIVE_SESSION.startedAt),
    );
  });

  it('completes a Mission whose stored duration is malformed, inventing none', () => {
    const malformed = { ...ACTIVE_SESSION, durationSecondsAtSelection: 0 };
    const harness = createHarness({ session: malformed });

    const result = completeMissionSession(
      harness.adapter,
      'session-1',
      () => DONE_CLOCK,
      'en',
    );

    if (result.status !== 'completed') throw new Error('expected a completion');
    // The malformed value survives exact read-back rather than being repaired
    // into a number or dropped.
    expect(result.session.durationSecondsAtSelection).toBe(0);
    expect(stored(harness.values).completedSessions[0].durationSecondsAtSelection).toBe(0);

    // And it hydrates again as a trustworthy completed record.
    const rehydrated = harness.adapter.hydrate();
    if (rehydrated.status !== 'hydrated') throw new Error('expected a readable snapshot');
    expect(rehydrated.snapshot.completedSessions).toHaveLength(1);
    expect(rehydrated.snapshot.completedSessions[0]!.durationSecondsAtSelection).toBe(0);
    expect(rehydrated.snapshot.currentResultSessionId).toBe('session-1');
  });

  it('resolves an existing completion without writing or re-reading the clock', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en');
    const raw = harness.values.get(MISSIONKID_STORAGE_KEY)!;
    const later = vi.fn(() => DONE_CLOCK + 900_000);

    const again = completeMissionSession(harness.adapter, 'session-1', later, 'en');

    if (again.status !== 'resolved') throw new Error('expected the same completion');
    expect(again.session.completedAt).toBe(DONE_CLOCK);
    expect(again.session.completionPeriodId).toBe(localCompletionPeriodId(DONE_CLOCK));
    // No second record, no moved timestamp, no recomputed period, no clock read.
    expect(later).not.toHaveBeenCalled();
    expect(writeCount(harness.storage)).toBe(1);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('does not move the pointer back when a newer result is current', () => {
    const harness = createHarnessWith({
      currentSession: null,
      currentResultSessionId: 'session-newer',
      completedSessions: [
        { ...COMPLETED_SESSION, sessionId: 'session-1' },
        { ...COMPLETED_SESSION, sessionId: 'session-newer', completedAt: DONE_CLOCK + 10 },
      ],
    });

    const result = completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en');

    // Resolving the older completion returns its facts and leaves navigation
    // pointing at the newer result.
    if (result.status !== 'resolved') throw new Error('expected the stored completion');
    expect(result.session.sessionId).toBe('session-1');
    expect(writeCount(harness.storage)).toBe(0);
    expect(stored(harness.values).currentResultSessionId).toBe('session-newer');
  });

  it('preserves a newer current session rather than completing it', () => {
    const replacement = { ...ACTIVE_SESSION, sessionId: 'session-2' };
    const harness = createHarness({ session: replacement });

    const result = completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en');

    expect(result).toEqual({ status: 'superseded', session: replacement });
    expect(writeCount(harness.storage)).toBe(0);
    expect(stored(harness.values).completedSessions).toEqual([]);
  });

  it('completes nothing that is not a running, resolvable Mission', () => {
    for (const session of [READY_SESSION, SELECTED_SESSION]) {
      const harness = createHarness({ session });
      expect(
        completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en'),
      ).toEqual({ status: 'unavailable' });
      expect(writeCount(harness.storage)).toBe(0);
    }

    const withdrawn = createHarness({
      session: { ...ACTIVE_SESSION, missionId: 'movement-99' } as never,
    });
    expect(
      completeMissionSession(withdrawn.adapter, 'session-1', () => DONE_CLOCK, 'en'),
    ).toEqual({ status: 'unavailable' });
    expect(writeCount(withdrawn.storage)).toBe(0);
  });

  it('keeps the running Mission when the write is refused', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const raw = harness.values.get(MISSIONKID_STORAGE_KEY)!;
    harness.storage.setItem = vi.fn(() => {
      throw new Error('write failed');
    });

    expect(
      completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en'),
    ).toEqual({
      status: 'not-completed',
      reason: 'write-failed',
      session: ACTIVE_SESSION,
    });
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('refuses completion while an unresolved completed record is stored', () => {
    const harness = createHarnessWith({
      currentSession: ACTIVE_SESSION,
      completedSessions: [{ ...COMPLETED_SESSION, completedAt: 1 }],
    });
    const raw = harness.values.get(MISSIONKID_STORAGE_KEY)!;

    expect(
      completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en'),
    ).toEqual({
      status: 'not-completed',
      reason: 'blocked-completed-record',
      session: ACTIVE_SESSION,
    });
    expect(writeCount(harness.storage)).toBe(0);
    expect(harness.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('adopts a landed completion whose confirmation was lost', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    failReads(harness, [READS.readBack]);

    const result = completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en');

    if (result.status !== 'resolved') throw new Error('expected the stored completion');
    expect(result.session.completedAt).toBe(DONE_CLOCK);
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).completedSessions).toHaveLength(1);
  });

  it('claims neither outcome when the interrupted write cannot be read back', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    failReads(harness, [READS.readBack, READS.recovery]);

    expect(
      completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en'),
    ).toEqual({ status: 'unconfirmed', reason: 'read-back-failed' });
    // No completion that may already be durable is removed, and no active
    // session is rebuilt over it.
    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).completedSessions).toHaveLength(1);
    expect(stored(harness.values).currentSession).toBeNull();
  });

  it('reports the Mission still running when an unconfirmed write did not land', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });
    const before = harness.values.get(MISSIONKID_STORAGE_KEY)!;
    harness.storage.setItem = vi.fn((key: string) => {
      harness.values.set(key, before);
    });

    expect(
      completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK, 'en'),
    ).toEqual({
      status: 'not-completed',
      reason: 'read-back-mismatch',
      session: ACTIVE_SESSION,
    });
    expect(stored(harness.values).completedSessions).toEqual([]);
  });

  it('completes the same session once however often it is asked', () => {
    const harness = createHarness({ session: ACTIVE_SESSION });

    for (let attempt = 0; attempt < 4; attempt += 1) {
      completeMissionSession(harness.adapter, 'session-1', () => DONE_CLOCK + attempt, 'en');
    }

    expect(writeCount(harness.storage)).toBe(1);
    expect(stored(harness.values).completedSessions).toHaveLength(1);
    expect(stored(harness.values).completedSessions[0].completedAt).toBe(DONE_CLOCK);
  });
});
