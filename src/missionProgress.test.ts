// @vitest-environment node
import { describe, expect, it } from 'vitest';

import {
  MONTHLY_GOAL_TARGET,
  deriveMissionHistory,
  deriveMonthlyGoal,
} from './missionProgress';
import type { CompletedMissionSession } from './persistence';

const PROFILE_ID = 'profile-1';
const PERIOD = '2024-03';
const BASE = 1_700_000_000_000;

function completion(
  overrides: Partial<CompletedMissionSession> & { sessionId: string },
): CompletedMissionSession {
  return {
    childProfileId: PROFILE_ID,
    missionId: 'movement-02',
    missionCategoryAtSelection: 'Movement',
    ageBandAtSelection: '7–8',
    durationSecondsAtSelection: 240,
    state: 'completed',
    selectedAt: BASE - 120_000,
    startedAt: BASE - 60_000,
    completedAt: BASE,
    completionPeriodId: PERIOD,
    ...overrides,
  } as CompletedMissionSession;
}

function run(count: number, from = 0): CompletedMissionSession[] {
  return Array.from({ length: count }, (_unused, index) =>
    completion({
      sessionId: `session-${String(from + index).padStart(3, '0')}`,
      completedAt: BASE + (from + index) * 1_000,
    }),
  );
}

function derive(sessions: readonly CompletedMissionSession[]) {
  return deriveMonthlyGoal(sessions, PROFILE_ID, PERIOD);
}

describe('deriving Monthly Goal progress', () => {
  it('starts a period with no completions at zero of twenty', () => {
    expect(derive([])).toEqual({
      completedCount: 0,
      displayedCount: 0,
      target: 20,
      goalComplete: false,
      goalCompletingSessionId: null,
    });
  });

  it('counts each completed Mission Session once', () => {
    const progress = derive(run(3));

    expect(progress.completedCount).toBe(3);
    expect(progress.displayedCount).toBe(3);
    expect(progress.goalComplete).toBe(false);
    expect(progress.goalCompletingSessionId).toBeNull();
  });

  it('counts distinct sessions for the same Mission separately', () => {
    const progress = derive([
      completion({ sessionId: 'session-a', missionId: 'movement-02' }),
      completion({ sessionId: 'session-b', missionId: 'movement-02', completedAt: BASE + 5 }),
    ]);

    // Repeating a Mission at another time is another Mission Session.
    expect(progress.completedCount).toBe(2);
  });

  it('counts one identifier once however many copies it has', () => {
    const one = completion({ sessionId: 'session-a' });
    const progress = derive([one, { ...one }, { ...one }]);

    expect(progress.completedCount).toBe(1);
  });

  it('counts nothing from another profile or another period', () => {
    const progress = derive([
      completion({ sessionId: 'session-a' }),
      completion({ sessionId: 'session-b', childProfileId: 'profile-2' }),
      completion({ sessionId: 'session-c', completionPeriodId: '2024-02' }),
    ]);

    expect(progress.completedCount).toBe(1);
  });

  it('reaches the goal at exactly twenty valid completions', () => {
    expect(derive(run(19)).goalComplete).toBe(false);
    const progress = derive(run(20));

    expect(progress.completedCount).toBe(20);
    expect(progress.displayedCount).toBe(20);
    expect(progress.goalComplete).toBe(true);
    expect(progress.goalCompletingSessionId).toBe('session-019');
  });

  it('caps the display at twenty while preserving later completions', () => {
    const progress = derive(run(26));

    expect(progress.displayedCount).toBe(20);
    expect(progress.completedCount).toBe(26);
    expect(progress.goalComplete).toBe(true);
  });

  it('keeps the same twentieth identity as later completions arrive', () => {
    const twentieth = derive(run(20)).goalCompletingSessionId;

    // The twenty-first and every later completion create no second prompt.
    for (const total of [21, 22, 30]) {
      expect(derive(run(total)).goalCompletingSessionId).toBe(twentieth);
    }
  });

  it('breaks an exact tie by identifier, not by input order', () => {
    const tied = Array.from({ length: 20 }, (_unused, index) =>
      completion({
        sessionId: `session-${String(index).padStart(3, '0')}`,
        // Every completion shares one moment, so only the identifier can order
        // them.
        completedAt: BASE,
      }),
    );

    const forwards = deriveMonthlyGoal(tied, PROFILE_ID, PERIOD);
    const backwards = deriveMonthlyGoal([...tied].reverse(), PROFILE_ID, PERIOD);

    expect(forwards.goalCompletingSessionId).toBe('session-019');
    expect(backwards.goalCompletingSessionId).toBe('session-019');
  });

  it('orders identifiers by code unit rather than by locale', () => {
    // Under a locale-aware comparison these two order differently in different
    // languages; by code unit the answer is fixed everywhere.
    const sessions = [
      ...run(19),
      completion({ sessionId: 'session-Z', completedAt: BASE + 99_000 }),
      completion({ sessionId: 'session-a', completedAt: BASE + 99_000 }),
    ];

    const progress = deriveMonthlyGoal(sessions, PROFILE_ID, PERIOD);
    expect(progress.completedCount).toBe(21);
    // Uppercase Z sorts before lowercase a by code unit.
    expect(progress.goalCompletingSessionId).toBe('session-Z');
  });

  it('derives a fresh period at zero without disturbing earlier ones', () => {
    const earlier = run(20);

    expect(deriveMonthlyGoal(earlier, PROFILE_ID, '2024-04')).toMatchObject({
      completedCount: 0,
      displayedCount: 0,
      goalComplete: false,
      goalCompletingSessionId: null,
    });
    // The earlier period is unchanged by asking about the new one.
    expect(deriveMonthlyGoal(earlier, PROFILE_ID, PERIOD).goalComplete).toBe(true);
  });

  it('mutates nothing it is given', () => {
    const sessions = run(21);
    const before = JSON.stringify(sessions);

    deriveMonthlyGoal(sessions, PROFILE_ID, PERIOD);

    expect(JSON.stringify(sessions)).toBe(before);
    expect(sessions.map((session) => session.sessionId)).toEqual(
      run(21).map((session) => session.sessionId),
    );
  });

  it('publishes the approved target', () => {
    expect(MONTHLY_GOAL_TARGET).toBe(20);
  });
});

describe('the private Mission History', () => {
  const ids = (history: readonly CompletedMissionSession[]) =>
    history.map((entry) => entry.sessionId);

  it('lists the completions of this Child Profile newest first', () => {
    const history = deriveMissionHistory(run(3), PROFILE_ID);

    expect(ids(history)).toEqual(['session-002', 'session-001', 'session-000']);
  });

  it('breaks an exact tie deterministically, whatever order they arrive in', () => {
    const tied = [
      completion({ sessionId: 'session-b', completedAt: BASE }),
      completion({ sessionId: 'session-a', completedAt: BASE }),
      completion({ sessionId: 'session-c', completedAt: BASE }),
    ];

    const forwards = ids(deriveMissionHistory(tied, PROFILE_ID));
    const backwards = ids(deriveMissionHistory([...tied].reverse(), PROFILE_ID));

    expect(forwards).toEqual(['session-c', 'session-b', 'session-a']);
    expect(backwards).toEqual(forwards);
  });

  // The order that decides what is newest is the order that decides which
  // completion is the twentieth, read backwards. If they ever disagreed, the
  // goal and the list would be telling the family two different stories.
  it('is the exact reverse of the order the twentieth completion is chosen by', () => {
    const records = [...run(5), completion({ sessionId: 'session-tie', completedAt: BASE })];
    const history = ids(deriveMissionHistory(records, PROFILE_ID));
    const twentieth = deriveMonthlyGoal(records, PROFILE_ID, PERIOD);

    expect(twentieth.goalCompletingSessionId).toBeNull();
    expect([...history].reverse()).toEqual([
      'session-000', 'session-tie', 'session-001',
      'session-002', 'session-003', 'session-004',
    ]);
  });

  it('never sorts the collection it was given', () => {
    const records = run(3);
    const order = ids(records);

    deriveMissionHistory(records, PROFILE_ID);

    expect(ids(records)).toEqual(order);
  });

  it('lists nothing from another Child Profile', () => {
    const history = deriveMissionHistory(
      [
        ...run(2),
        completion({ sessionId: 'session-other', childProfileId: 'profile-2' }),
      ],
      PROFILE_ID,
    );

    expect(ids(history)).toEqual(['session-001', 'session-000']);
  });

  it('lists one Mission Session once however often it is stored', () => {
    const once = completion({ sessionId: 'session-000' });
    const history = deriveMissionHistory([once, once, once], PROFILE_ID);

    expect(ids(history)).toEqual(['session-000']);
  });

  // History is the whole record, not this month's. Only the Monthly Goal
  // narrows to one period.
  it('keeps completions from earlier periods beside the current one', () => {
    const records = [
      completion({ sessionId: 'session-jan', completedAt: BASE - 5_000_000, completionPeriodId: '2024-01' }),
      completion({ sessionId: 'session-mar', completedAt: BASE, completionPeriodId: '2024-03' }),
    ];

    expect(ids(deriveMissionHistory(records, PROFILE_ID))).toEqual([
      'session-mar',
      'session-jan',
    ]);
    expect(deriveMonthlyGoal(records, PROFILE_ID, '2024-03').completedCount).toBe(1);
    expect(deriveMonthlyGoal(records, PROFILE_ID, '2024-04').completedCount).toBe(0);
  });

  it('carries the immutable facts of each record through unchanged', () => {
    const [entry] = deriveMissionHistory(run(1), PROFILE_ID);

    expect(entry).toEqual(completion({ sessionId: 'session-000', completedAt: BASE }));
  });

  it('is empty for a profile with no completions', () => {
    expect(deriveMissionHistory([], PROFILE_ID)).toEqual([]);
    expect(
      deriveMissionHistory(run(2), 'profile-with-nothing'),
    ).toEqual([]);
  });
});
