import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';
import { MISSION_CATALOG } from './catalogContent';
import { translateMessage, type SupportedLanguage } from './localization';
import { MONTHLY_GOAL_TARGET } from './missionProgress';
import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type SnapshotStorage,
} from './persistence';

const PROFILE_ID = 'profile-1';

function missionFor(missionId: string) {
  const mission = MISSION_CATALOG.find((record) => record.missionId === missionId);
  if (!mission) throw new Error(`expected ${missionId} in the production catalog`);
  return mission;
}

const MISSION = missionFor('movement-02');
const STARTED_AT = new Date(2024, 2, 15, 10, 0).getTime();
const DONE_AT = new Date(2024, 2, 15, 10, 4).getTime();
const PERIOD = '2024-03';

const SESSION_FACTS = {
  sessionId: 'session-1',
  childProfileId: PROFILE_ID,
  missionId: MISSION.missionId,
  missionCategoryAtSelection: MISSION.category,
  ageBandAtSelection: '7–8',
  durationSecondsAtSelection: MISSION.durationSeconds,
  selectedAt: STARTED_AT - 60_000,
} as const;

const ACTIVE_SESSION = { ...SESSION_FACTS, state: 'active', startedAt: STARTED_AT } as const;

function completedRecord(index: number, period = PERIOD) {
  return {
    ...SESSION_FACTS,
    sessionId: `session-old-${String(index).padStart(3, '0')}`,
    state: 'completed',
    startedAt: STARTED_AT - 1_000_000 - index * 1_000,
    completedAt: STARTED_AT - 900_000 - index * 1_000,
    completionPeriodId: period,
  } as const;
}

function storedSnapshot(
  extra: Record<string, unknown> = {},
  language: SupportedLanguage = 'en',
) {
  return JSON.stringify({
    ...createEmptySnapshot(),
    settings: { language },
    childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
    currentSession: null,
    ...extra,
  });
}

function harness(raw?: string) {
  const values = new Map<string, string>([['unrelated', 'keep']]);

  if (raw !== undefined) values.set(MISSIONKID_STORAGE_KEY, raw);

  const faults = { read: false, write: false, readsAfterWrite: 0 };
  const writes: string[] = [];
  let failedReadsAfterWrite = 0;
  let written = false;

  const storage: SnapshotStorage = {
    getItem(key) {
      if (faults.read) throw new Error('PRIVATE RAW STORAGE ERROR');
      if (written && failedReadsAfterWrite < faults.readsAfterWrite) {
        failedReadsAfterWrite += 1;
        throw new Error('PRIVATE RAW STORAGE ERROR');
      }
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      writes.push(value);
      if (faults.write) throw new Error('PRIVATE RAW STORAGE ERROR');
      written = true;
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
  };

  return {
    values,
    faults,
    writes,
    adapter: createPersistenceAdapter(storage),
    stored: () => JSON.parse(values.get(MISSIONKID_STORAGE_KEY)!),
  };
}

function heading() {
  return screen.getByRole('heading', { level: 1 });
}

function t(key: Parameters<typeof translateMessage>[1], language: SupportedLanguage = 'en') {
  return translateMessage(language, key);
}

function done(language: SupportedLanguage = 'en') {
  return screen.getByRole('button', { name: t('session.action.done', language) });
}

function progressText(done_: number) {
  return t('result.goal.progress')
    .replace('{done}', String(done_))
    .replace('{target}', String(MONTHLY_GOAL_TARGET));
}

describe('recording a Mission as done', () => {
  it('reaches the approved Reward Card in one confirmed write', () => {
    const h = harness(storedSnapshot({ currentSession: ACTIVE_SESSION }));
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    fireEvent.click(done());

    // The completion leads straight to the result; no intermediate placeholder
    // stands between them.
    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(screen.getByText(t('result.recognition'))).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      MISSION.content.en.title,
    );
    expect(screen.getByText(progressText(1))).toBeTruthy();

    const after = h.stored();
    expect(after.currentSession).toBeNull();
    expect(after.completedSessions).toHaveLength(1);
    expect(after.completedSessions[0].completedAt).toBe(DONE_AT);
    expect(after.completedSessions[0].completionPeriodId).toBe(PERIOD);
    expect(after.currentResultSessionId).toBe('session-1');
    expect(h.writes).toHaveLength(1);
  });

  it('needs no extra confirmation, proof or waiting for zero', () => {
    // Started a moment ago on the real clock the guidance reads, so the Mission
    // is genuinely mid-flight rather than long past zero.
    const justStarted = Date.now() - 1_000;
    const h = harness(
      storedSnapshot({
        currentSession: { ...ACTIVE_SESSION, startedAt: justStarted },
      }),
    );
    render(<App adapter={h.adapter} now={() => justStarted + 2_000} />);

    const guidance = document.querySelector('.mission-session__guidance')!;
    expect(guidance.textContent).not.toBe(t('session.active.zero'));

    fireEvent.click(done());

    // One activation, no confirmation step and nothing asked for as proof.
    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.writes).toHaveLength(1);
    expect(document.querySelector('.mission-session__confirm')).toBeNull();
  });

  it('completes identically long after zero', () => {
    const h = harness(storedSnapshot({ currentSession: ACTIVE_SESSION }));
    render(<App adapter={h.adapter} now={() => STARTED_AT + 86_400_000} />);

    expect(screen.getByText(t('session.active.zero'))).toBeTruthy();
    fireEvent.click(done());

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it('completes a Mission whose stored duration is malformed', () => {
    const h = harness(
      storedSnapshot({
        currentSession: { ...ACTIVE_SESSION, durationSecondsAtSelection: 0 },
      }),
    );
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    fireEvent.click(done());

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    // The malformed value is preserved rather than repaired or dropped.
    expect(h.stored().completedSessions[0].durationSecondsAtSelection).toBe(0);
    expect(screen.getByText(progressText(1))).toBeTruthy();
  });

  it('writes once however often the action is activated', () => {
    const h = harness(storedSnapshot({ currentSession: ACTIVE_SESSION }));
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    const control = done();
    fireEvent.click(control);
    fireEvent.click(control);

    expect(h.writes).toHaveLength(1);
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it.each(['de', 'ru'] as const)('records and recognises the Mission in %s', (language) => {
    const h = harness(storedSnapshot({ currentSession: ACTIVE_SESSION }, language));
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    fireEvent.click(done(language));

    expect(heading().textContent).toBe(t('view.sessionResult.title', language));
    expect(screen.getByText(t('result.recognition', language))).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      MISSION.content[language].title,
    );
    expect(
      screen.getByText(
        t('result.goal.progress', language)
          .replace('{done}', '1')
          .replace('{target}', String(MONTHLY_GOAL_TARGET)),
      ),
    ).toBeTruthy();
  });
});

describe('a completion that could not be recorded', () => {
  it('keeps the Mission running and shows no recognition or progress', () => {
    const raw = storedSnapshot({ currentSession: ACTIVE_SESSION });
    const h = harness(raw);
    h.faults.write = true;
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    fireEvent.click(done());

    expect(screen.getByRole('alert').textContent).toBe(t('session.done.notRecorded'));
    // The wording belongs to this operation, not to the exit beside it.
    expect(screen.getByRole('alert').textContent).not.toBe(t('session.exit.notLeft'));
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(screen.queryByText(t('result.recognition'))).toBeNull();
    expect(screen.queryByText(progressText(1))).toBeNull();
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);

    // The same action is the retry, and it completes once.
    h.faults.write = false;
    fireEvent.click(done());
    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it('claims neither outcome when a landed write could not be confirmed', () => {
    const h = harness(storedSnapshot({ currentSession: ACTIVE_SESSION }));
    h.faults.readsAfterWrite = 2;
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    fireEvent.click(done());

    expect(screen.getByRole('alert').textContent).toBe(t('session.done.unconfirmed'));
    expect(screen.queryByText(t('result.recognition'))).toBeNull();
    // The completion that may already be durable is neither removed nor
    // rebuilt back into a running Mission.
    expect(h.writes).toHaveLength(1);
    expect(h.stored().completedSessions).toHaveLength(1);
    expect(h.stored().currentSession).toBeNull();
  });

  it('adopts a landed completion whose confirmation was lost', () => {
    const h = harness(storedSnapshot({ currentSession: ACTIVE_SESSION }));
    h.faults.readsAfterWrite = 1;
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    fireEvent.click(done());

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.writes).toHaveLength(1);
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it('refuses while an unresolved completed record is stored', () => {
    const raw = storedSnapshot({
      currentSession: ACTIVE_SESSION,
      completedSessions: [{ ...completedRecord(1), completedAt: 1 }],
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    fireEvent.click(done());

    // D4-B is not bypassed, and no record is lost or falsely claimed.
    expect(screen.getByRole('alert').textContent).toBe(t('session.done.notRecorded'));
    expect(h.writes).toEqual([]);
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });
});

describe('the Reward Card', () => {
  function completedHarness(extra: Record<string, unknown> = {}, language: SupportedLanguage = 'en') {
    const record = {
      ...SESSION_FACTS,
      state: 'completed',
      startedAt: STARTED_AT,
      completedAt: DONE_AT,
      completionPeriodId: PERIOD,
    };
    const h = harness(
      storedSnapshot(
        {
          currentResultSessionId: 'session-1',
          completedSessions: [record],
          ...extra,
        },
        language,
      ),
    );
    render(<App adapter={h.adapter} now={() => DONE_AT} />);
    return h;
  }

  it('restores the same result through the pointer, repeating no completion', () => {
    const h = completedHarness();

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      MISSION.content.en.title,
    );
    expect(screen.getByText(progressText(1))).toBeTruthy();
    // A refresh derives the card; it adds no record, pointer change or write.
    expect(h.writes).toEqual([]);
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it('shows the Mission Category and a localized completion context', () => {
    completedHarness();

    expect(
      screen.getByText(t('discovery.category.movement')),
    ).toBeTruthy();
    const completed = document.querySelector('.mission-result__completed')!;
    expect(completed.textContent).toContain(t('result.completedOn'));
    // The localized date of the stored completion moment.
    expect(completed.textContent).toContain('2024');
  });

  it('keeps the completion and its count when catalog content is gone', () => {
    const h = harness(
      storedSnapshot({
        currentResultSessionId: 'session-1',
        completedSessions: [
          {
            ...SESSION_FACTS,
            missionId: 'movement-99',
            state: 'completed',
            startedAt: STARTED_AT,
            completedAt: DONE_AT,
            completionPeriodId: PERIOD,
          },
        ],
      }),
    );
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    // The approved fallback stands in for the title; the completion still
    // counts and the card is not withheld.
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      t('result.missionUnavailable'),
    );
    expect(screen.getByText(progressText(1))).toBeTruthy();
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it('drops a pointer that names no readable completion, keeping the records', () => {
    const h = harness(
      storedSnapshot({
        currentResultSessionId: 'session-missing',
        completedSessions: [
          {
            ...SESSION_FACTS,
            state: 'completed',
            startedAt: STARTED_AT,
            completedAt: DONE_AT,
            completionPeriodId: PERIOD,
          },
        ],
      }),
    );
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    // Validation rejects the pointer by itself, so no result opens and the
    // family lands back in the ordinary flow. The completion behind it is
    // preserved and no completion effect is repeated.
    expect(heading().textContent).not.toBe(t('view.sessionResult.title'));
    expect(screen.queryByText(t('result.recognition'))).toBeNull();
    expect(
      screen.getByRole('button', { name: t('discovery.action.open') }),
    ).toBeTruthy();
    expect(h.writes).toEqual([]);
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it('counts each completion once and caps the display at the target', () => {
    const many = Array.from({ length: 25 }, (_unused, index) => completedRecord(index));
    const h = harness(
      storedSnapshot({
        currentResultSessionId: 'session-old-000',
        completedSessions: many,
      }),
    );
    render(<App adapter={h.adapter} now={() => DONE_AT} />);

    expect(screen.getByText(progressText(MONTHLY_GOAL_TARGET))).toBeTruthy();
    expect(h.stored().completedSessions).toHaveLength(25);
  });

  it('shows the one goal message for the twentieth result and not the twenty-first', () => {
    const twenty = Array.from({ length: 20 }, (_unused, index) => completedRecord(index));
    // Ordered by completedAt, record 000 is the latest; the twentieth is 019.
    const twentieth = [...twenty].sort(
      (first, second) =>
        first.completedAt - second.completedAt ||
        (first.sessionId < second.sessionId ? -1 : 1),
    )[19]!;

    const goal = harness(
      storedSnapshot({
        currentResultSessionId: twentieth.sessionId,
        completedSessions: twenty,
      }),
    );
    render(<App adapter={goal.adapter} now={() => DONE_AT} />);
    expect(screen.getByText(t('result.goal.complete'))).toBeTruthy();
    screen.getByRole('button', { name: t('result.action.next') });

    // A different result in the same complete period carries no second prompt.
    const other = twenty.find((record) => record.sessionId !== twentieth.sessionId)!;
    const later = harness(
      storedSnapshot({
        currentResultSessionId: other.sessionId,
        completedSessions: twenty,
      }),
    );
    render(<App adapter={later.adapter} now={() => DONE_AT} />);
    expect(screen.queryAllByText(t('result.goal.complete'))).toHaveLength(1);
  });

  it('holds no prize, purchase, reveal or pressure behaviour', () => {
    const { container } = render(<div />);
    completedHarness();

    expect(
      screen.queryByText(/win|prize|buy|coins|points|rank|streak|hurry|don't miss/i),
    ).toBeNull();
    expect(document.querySelector('progress, meter')).toBeNull();
    expect(container.querySelector('[aria-live]')).toBeNull();
    // One way onward, and nothing that must be opened or revealed.
    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
      t('result.action.next'),
    ]);
  });

  it('leaves the result by clearing only the pointer', () => {
    const h = completedHarness();

    fireEvent.click(screen.getByRole('button', { name: t('result.action.next') }));

    expect(heading().textContent).toBe(t('view.discovery.title'));
    const after = h.stored();
    expect(after.currentResultSessionId).toBeNull();
    // The completed record itself is untouched, so it still counts.
    expect(after.completedSessions).toHaveLength(1);
    expect(after.currentSession).toBeNull();
    expect(h.writes).toHaveLength(1);
  });

  it('keeps the result when leaving it could not be carried out', () => {
    const h = completedHarness();
    h.faults.write = true;

    fireEvent.click(screen.getByRole('button', { name: t('result.action.next') }));

    expect(screen.getByRole('alert').textContent).toBe(t('result.exit.notCleared'));
    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.stored().completedSessions).toHaveLength(1);
    expect(h.stored().currentResultSessionId).toBe('session-1');
  });

  it('does not clear a newer result than the one being left', () => {
    const h = completedHarness();

    // Another completion became the open result between render and activation.
    const snapshot = h.stored();
    h.values.set(
      MISSIONKID_STORAGE_KEY,
      JSON.stringify({
        ...snapshot,
        completedSessions: [...snapshot.completedSessions, completedRecord(7)],
        currentResultSessionId: 'session-old-007',
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: t('result.action.next') }));

    // The newer result is preserved, not cleared by an older card's exit.
    expect(h.writes).toEqual([]);
    expect(h.stored().currentResultSessionId).toBe('session-old-007');
  });

  it('derives progress for the period the completion fixed, not today’s month', () => {
    const h = harness(
      storedSnapshot({
        currentResultSessionId: 'session-1',
        completedSessions: [
          {
            ...SESSION_FACTS,
            state: 'completed',
            startedAt: STARTED_AT,
            completedAt: DONE_AT,
            completionPeriodId: PERIOD,
          },
          // Another completion, in a later period.
          { ...completedRecord(5, '2024-04') },
        ],
      }),
    );
    // The device clock is now months later; membership must not move.
    render(<App adapter={h.adapter} now={() => new Date(2024, 7, 1).getTime()} />);

    expect(screen.getByText(progressText(1))).toBeTruthy();
    expect(h.stored().completedSessions[0].completionPeriodId).toBe(PERIOD);
  });
});
