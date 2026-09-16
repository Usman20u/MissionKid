// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';

import { MISSION_CATALOG } from './catalogContent';
import type { MissionRecord } from './catalog';
import { selectMission } from './missionSession';
import type { SuggestionContext } from './missionSuggestions';
import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
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

function createHarness(
  overrides: { session?: SelectedMissionSession | null; ageBand?: string } = {},
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

    // The conflict carries the session in the way so Task 8 can offer the
    // return-or-abandon choice. Nothing was minted, timed or written.
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
      if (writes > 1) throw new Error('read-back failed');
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
