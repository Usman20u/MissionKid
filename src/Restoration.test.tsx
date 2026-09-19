import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';
import { MISSION_CATALOG } from './catalogContent';
import { translateMessage, type SupportedLanguage } from './localization';
import { completionPeriodLabel } from './missionProgress';
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
const PERIOD = '2024-03';
const COMPLETED_AT = new Date(2024, 2, 15, 10, 4).getTime();

const FACTS = {
  sessionId: 'session-1',
  childProfileId: PROFILE_ID,
  missionId: MISSION.missionId,
  missionCategoryAtSelection: MISSION.category,
  ageBandAtSelection: '7–8',
  durationSecondsAtSelection: MISSION.durationSeconds,
  selectedAt: COMPLETED_AT - 600_000,
} as const;

function completedRecord(index: number, overrides: Record<string, unknown> = {}) {
  return {
    ...FACTS,
    sessionId: `done-${String(index).padStart(3, '0')}`,
    state: 'completed',
    startedAt: COMPLETED_AT - 300_000 + index * 1_000,
    completedAt: COMPLETED_AT + index * 1_000,
    completionPeriodId: PERIOD,
    ...overrides,
  };
}

function snapshot(extra: Record<string, unknown> = {}, language: SupportedLanguage = 'en') {
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

  const faults = { read: false, write: false };
  const writes: string[] = [];

  const storage: SnapshotStorage = {
    getItem(key) {
      if (faults.read) throw new Error('PRIVATE RAW STORAGE ERROR');
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      writes.push(value);
      if (faults.write) throw new Error('PRIVATE RAW STORAGE ERROR');
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
    raw: () => values.get(MISSIONKID_STORAGE_KEY),
    stored: () => JSON.parse(values.get(MISSIONKID_STORAGE_KEY)!),
  };
}

function heading() {
  return screen.getByRole('heading', { level: 1 });
}

function t(key: Parameters<typeof translateMessage>[1], language: SupportedLanguage = 'en') {
  return translateMessage(language, key);
}

function guidance() {
  return document.querySelector('.mission-session__guidance')?.textContent ?? null;
}

describe('restoring a current Mission Session', () => {
  it('continues a stored selected session to ready without starting it', () => {
    const h = harness(snapshot({ currentSession: { ...FACTS, state: 'selected' } }));
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    const session = h.stored().currentSession;
    expect(session.state).toBe('ready');
    expect(Object.hasOwn(session, 'startedAt')).toBe(false);
    expect(guidance()).toBeNull();
  });

  it('restores a ready session unchanged, with no countdown', () => {
    const raw = snapshot({ currentSession: { ...FACTS, state: 'ready' } });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(h.writes).toEqual([]);
    expect(h.raw()).toBe(raw);
    expect(guidance()).toBeNull();
  });

  it('restores a running Mission midway at its real remaining time', () => {
    const startedAt = Date.now() - 120_000;
    const h = harness(
      snapshot({ currentSession: { ...FACTS, state: 'active', startedAt } }),
    );
    render(<App adapter={h.adapter} />);

    // Four minutes long, two elapsed: recovery shows what is left, not the
    // full duration again, and starts nothing.
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(guidance()).toBe('About 2 min left');
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.startedAt).toBe(startedAt);
  });

  it('restores a running Mission whose duration elapsed while it was away', () => {
    const startedAt = Date.now() - 86_400_000;
    const h = harness(
      snapshot({ currentSession: { ...FACTS, state: 'active', startedAt } }),
    );
    render(<App adapter={h.adapter} />);

    expect(guidance()).toBe(t('session.active.zero'));
    // Still active, nothing auto-completed, nothing restarted.
    expect(h.stored().currentSession.state).toBe('active');
    expect(h.stored().currentSession.startedAt).toBe(startedAt);
    expect(h.stored().completedSessions).toEqual([]);
  });

  it.each([
    ['a malformed duration', { durationSecondsAtSelection: 0, startedAt: Date.now() - 60_000 }],
    ['a wall clock behind the start', { startedAt: Date.now() + 600_000 }],
  ])('shows zero guidance for %s and still completes', (_label, overrides) => {
    const h = harness(
      snapshot({ currentSession: { ...FACTS, state: 'active', ...overrides } }),
    );
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    expect(guidance()).toBe(t('session.active.zero'));

    fireEvent.click(screen.getByRole('button', { name: t('session.action.done') }));

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.stored().completedSessions).toHaveLength(1);
    expect(h.stored().currentResultSessionId).toBe('session-1');
  });

  it.each([
    ['a malformed duration', { durationSecondsAtSelection: 0, startedAt: Date.now() - 60_000 }],
    ['a wall clock behind the start', { startedAt: Date.now() + 600_000 }],
  ])('shows zero guidance for %s and still abandons on confirmation', (_label, overrides) => {
    const h = harness(
      snapshot({ currentSession: { ...FACTS, state: 'active', ...overrides } }),
    );
    render(<App adapter={h.adapter} />);

    expect(guidance()).toBe(t('session.active.zero'));

    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));
    const panel = document.querySelector('.mission-session__confirm')!;
    fireEvent.click(
      [...panel.querySelectorAll('button')].find(
        (button) => button.textContent === t('session.action.leave'),
      )!,
    );

    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
    expect(h.stored().currentResultSessionId).toBeNull();
  });

  it('neither starts nor completes a current Mission whose content is gone', () => {
    const raw = snapshot({
      currentSession: { ...FACTS, state: 'ready', missionId: 'movement-99' },
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    // The heading does not contradict the only sentence under it: a Mission
    // that cannot be shown is not announced as ready.
    expect(heading().textContent).toBe(t('view.sessionUnavailable.title'));
    expect(heading().textContent).not.toBe(t('view.sessionReady.title'));

    // Nothing offers to start it, and nothing is substituted for it.
    expect(
      screen.queryByRole('button', { name: t('session.action.start') }),
    ).toBeNull();
    expect(screen.getByText(t('session.ready.missionUnavailable'))).toBeTruthy();
    expect(h.writes).toEqual([]);

    // The approved way out still works for it.
    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );
    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
  });

  it('neither completes nor counts a running Mission whose content is gone', () => {
    const h = harness(
      snapshot({
        currentSession: {
          ...FACTS,
          state: 'active',
          missionId: 'movement-99',
          startedAt: Date.now() - 60_000,
        },
      }),
    );
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    // Nor is it announced as running.
    expect(heading().textContent).toBe(t('view.sessionUnavailable.title'));
    expect(heading().textContent).not.toBe(t('view.sessionActive.title'));

    expect(screen.getByText(t('session.active.missionUnavailable'))).toBeTruthy();
    expect(screen.queryByRole('button', { name: t('session.action.done') })).toBeNull();
    expect(h.writes).toEqual([]);
    expect(h.stored().completedSessions).toEqual([]);

    // The recovery state is not a dead end: a Mission that cannot safely
    // continue still has the approved way out, and it is the only action here.
    const exit = screen.getByRole('button', {
      name: t('session.action.backToSuggestions'),
    });
    expect(screen.getAllByRole('button')).toEqual([exit]);

    // The session is still `active` in durable state, so leaving it takes the
    // same explicit confirmation as leaving any other running Mission. Asking
    // for it writes nothing and clears nothing.
    fireEvent.click(exit);
    const confirmation = screen.getByRole('heading', { name: t('session.leave.title') });
    // Nothing names the Mission above it here, so it is the level-2 heading
    // rather than a level-3 one under a heading that does not exist.
    expect(confirmation.tagName).toBe('H2');
    expect(screen.getByText(t('session.leave.consequence'))).toBeTruthy();
    expect(document.activeElement).toBe(confirmation);
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.sessionId).toBe('session-1');

    // The safe choice is worded for this surface: staying here, not keeping
    // going, because unavailable Mission content cannot be continued.
    expect(
      screen.getByRole('button', { name: t('session.action.stayHere') }),
    ).toBeTruthy();
    expect(
      screen.queryByRole('button', { name: t('session.action.keepGoing') }),
    ).toBeNull();

    // Escape is the same safe choice, and returns focus to the control that
    // opened the confirmation.
    fireEvent.keyDown(confirmation, { key: 'Escape' });
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.sessionId).toBe('session-1');

    // Dismissing leaves the recovery surface exactly as it was, so the family
    // can ask again. Nothing is substituted for the Mission that is gone.
    expect(screen.getByText(t('session.active.missionUnavailable'))).toBeTruthy();
    expect(screen.queryByRole('button', { name: t('session.action.done') })).toBeNull();

    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );
    fireEvent.click(screen.getByRole('button', { name: t('session.action.stayHere') }));
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.sessionId).toBe('session-1');

    // Only a confirmed leave ends it, and it ends only this session, with no
    // completion, result pointer or progress source of any kind.
    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );
    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));
    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
    expect(h.stored().currentResultSessionId).toBeNull();
    expect(heading().textContent).toBe(t('view.discovery.title'));
  });

  it('keeps a Mission whose content is gone when its confirmed exit is refused', () => {
    const raw = snapshot({
      currentSession: {
        ...FACTS,
        state: 'active',
        missionId: 'movement-99',
        startedAt: Date.now() - 60_000,
      },
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    h.faults.write = true;
    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );
    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));

    // The refusal is announced rather than swallowed, and the Mission it named
    // is still exactly where it was.
    expect(screen.getByRole('alert').textContent).toBe(t('session.exit.notLeft'));
    expect(h.raw()).toBe(raw);
    expect(h.stored().currentSession.sessionId).toBe('session-1');
    expect(h.stored().completedSessions).toEqual([]);
    expect(h.stored().currentResultSessionId).toBeNull();

    // Nothing was substituted for the missing Mission, and nothing offers to
    // complete it. Asking again is the retry, and it succeeds once storage does.
    expect(screen.getByText(t('session.active.missionUnavailable'))).toBeTruthy();
    expect(screen.queryByRole('button', { name: t('session.action.done') })).toBeNull();

    h.faults.write = false;
    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );
    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));
    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
  });

  it('refuses that exit, byte for byte, while an unresolved completed record is stored', () => {
    // D4-B is not relaxed because the Mission cannot be shown: a completed
    // record that cannot be safely retained still refuses every snapshot
    // replacement, this recovery exit included.
    const raw = snapshot({
      currentSession: {
        ...FACTS,
        state: 'active',
        missionId: 'movement-99',
        startedAt: Date.now() - 60_000,
      },
      completedSessions: [completedRecord(0, { completedAt: 1 })],
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );
    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));

    expect(screen.getByRole('alert').textContent).toBe(t('session.exit.notLeft'));
    expect(h.writes).toEqual([]);
    expect(h.raw()).toBe(raw);
    expect(h.stored().currentSession.sessionId).toBe('session-1');
    expect(h.stored().completedSessions).toHaveLength(1);
  });
});

describe('restoring a completed result', () => {
  it('resolves the same Reward Card through a valid pointer', () => {
    const raw = snapshot({
      currentResultSessionId: 'done-000',
      completedSessions: [completedRecord(0)],
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      MISSION.content.en.title,
    );
    // No completion effect is repeated by restoring.
    expect(h.writes).toEqual([]);
    expect(h.raw()).toBe(raw);
  });

  it('rejects an invalid pointer alone, fabricating no card', () => {
    const h = harness(
      snapshot({
        currentResultSessionId: 'nobody',
        completedSessions: [completedRecord(0), completedRecord(1)],
      }),
    );
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).not.toBe(t('view.sessionResult.title'));
    expect(screen.queryByText(t('result.recognition'))).toBeNull();
    // Both completions are preserved exactly.
    expect(h.stored().completedSessions).toHaveLength(2);
    expect(h.writes).toEqual([]);
  });

  it('keeps a completed Mission whose content is gone, with its membership', () => {
    const h = harness(
      snapshot({
        currentResultSessionId: 'done-000',
        completedSessions: [completedRecord(0, { missionId: 'movement-99' })],
      }),
    );
    render(<App adapter={h.adapter} />);

    // The completion stands, keeps its category and still counts; only the
    // reviewed title is missing and it says so plainly.
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      t('result.missionUnavailable'),
    );
    expect(screen.getByText(t('discovery.category.movement'))).toBeTruthy();
    expect(
      screen.getByText(
        t('result.goal.progress').replace('{done}', '1').replace('{target}', '20'),
      ),
    ).toBeTruthy();
  });

  it('coalesces identical completed copies and counts them once', () => {
    const one = completedRecord(0);
    const h = harness(
      snapshot({
        currentResultSessionId: 'done-000',
        completedSessions: [one, { ...one }, { ...one }, completedRecord(1)],
      }),
    );
    render(<App adapter={h.adapter} />);

    expect(
      screen.getByText(
        t('result.goal.progress').replace('{done}', '2').replace('{target}', '20'),
      ),
    ).toBeTruthy();
  });

  it('excludes copies of one identifier that disagree from counting', () => {
    const one = completedRecord(0);
    const h = harness(
      snapshot({
        currentResultSessionId: 'done-001',
        completedSessions: [
          one,
          { ...one, completedAt: one.completedAt + 5_000 },
          completedRecord(1),
        ],
      }),
    );
    render(<App adapter={h.adapter} />);

    // The conflicting identifier counts for nothing; the readable one still does.
    expect(
      screen.getByText(
        t('result.goal.progress').replace('{done}', '1').replace('{target}', '20'),
      ),
    ).toBeTruthy();
    expect(h.writes).toEqual([]);
  });

  it('names its own period on a card restored in a later month', () => {
    const h = harness(
      snapshot({
        currentResultSessionId: 'done-000',
        completedSessions: [completedRecord(0)],
      }),
    );
    // The device is months past that period now.
    render(<App adapter={h.adapter} now={() => new Date(2024, 7, 2).getTime()} />);

    const period = document.querySelector('.mission-result__goal-period')!;
    expect(period.textContent).toBe(completionPeriodLabel(PERIOD, 'en'));
    expect(period.textContent!.toLowerCase()).toContain('march');
    // The stored identity is unchanged by being displayed.
    expect(h.stored().completedSessions[0].completionPeriodId).toBe(PERIOD);
    expect(h.writes).toEqual([]);
  });
});

describe('restoring an unreadable or unavailable snapshot', () => {
  it.each([
    ['corrupted', '{not json'],
    ['an unsupported version', JSON.stringify({ ...createEmptySnapshot(), snapshotVersion: 99 })],
  ])('explains %s without touching the stored bytes', (_label, raw) => {
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    expect(screen.getByText(t('recovery.blocked'))).toBeTruthy();
    expect(h.writes).toEqual([]);
    expect(h.raw()).toBe(raw);
    // Reset stays a deliberate parent decision, never an automatic recovery.
    expect(
      screen.queryByRole('button', { name: t('recovery.confirmReset') }),
    ).toBeNull();
    expect(screen.getByRole('button', { name: t('recovery.resetTitle') })).toBeTruthy();
  });

  it('claims no durable session, completion or progress in temporary mode', () => {
    const h = harness(snapshot({ completedSessions: [completedRecord(0)] }));
    h.faults.read = true;
    render(<App adapter={h.adapter} />);

    expect(screen.getByText(t('recovery.temporary'))).toBeTruthy();
    expect(screen.queryByText(t('result.recognition'))).toBeNull();
    expect(screen.queryByText(/\d+ \/ 20/)).toBeNull();
    expect(h.writes).toEqual([]);
  });

  it('keeps completed facts when the profile age context is incomplete', () => {
    const raw = JSON.stringify({
      ...createEmptySnapshot(),
      settings: { language: 'en' },
      childProfile: { localProfileId: PROFILE_ID, ageBand: null },
      currentSession: null,
      completedSessions: [completedRecord(0)],
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    // Setup needs attention, and nothing trustworthy was discarded to say so.
    expect(heading().textContent).toBe(t('view.setupIncomplete.title'));
    expect(h.stored().completedSessions).toHaveLength(1);
    expect(h.writes).toEqual([]);
  });

  it.each(['de', 'ru'] as const)('restores the same result in %s', (language) => {
    const h = harness(
      snapshot(
        {
          currentResultSessionId: 'done-000',
          completedSessions: [completedRecord(0)],
        },
        language,
      ),
    );
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionResult.title', language));
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      MISSION.content[language].title,
    );
    // Language changes labels and localized dates, never the stored identity.
    expect(h.stored().completedSessions[0].completionPeriodId).toBe(PERIOD);
    expect(h.stored().completedSessions[0].completedAt).toBe(COMPLETED_AT);
  });
});

describe('D4-B while an unresolved completed record is stored', () => {
  const conflicting = () => {
    const one = completedRecord(0);
    return [one, { ...one, completedAt: one.completedAt + 5_000 }];
  };

  it('refuses the next snapshot-replacing write and changes no stored byte', () => {
    const raw = snapshot({
      currentSession: { ...FACTS, state: 'active', startedAt: Date.now() - 60_000 },
      completedSessions: conflicting(),
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    fireEvent.click(screen.getByRole('button', { name: t('session.action.done') }));

    expect(screen.getByRole('alert').textContent).toBe(t('session.done.notRecorded'));
    expect(h.writes).toEqual([]);
    expect(h.raw()).toBe(raw);
    // Reset is not offered as the way out of this, and nothing was deleted.
    expect(h.stored().completedSessions).toHaveLength(2);
  });

  it('lifts the block once a valid re-read no longer finds the condition', () => {
    const raw = snapshot({
      currentSession: { ...FACTS, state: 'active', startedAt: Date.now() - 60_000 },
      completedSessions: conflicting(),
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    fireEvent.click(screen.getByRole('button', { name: t('session.action.done') }));
    expect(h.writes).toEqual([]);

    // The stored data becomes readable again; the same action now succeeds.
    h.values.set(
      MISSIONKID_STORAGE_KEY,
      snapshot({
        currentSession: { ...FACTS, state: 'active', startedAt: Date.now() - 60_000 },
        completedSessions: [completedRecord(0)],
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: t('session.action.done') }));

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.stored().completedSessions).toHaveLength(2);
  });

  it('keeps identical duplicates and a pointer-only problem out of the block', () => {
    const one = completedRecord(0);
    const h = harness(
      snapshot({
        currentSession: { ...FACTS, state: 'active', startedAt: Date.now() - 60_000 },
        completedSessions: [one, { ...one }],
      }),
    );
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    // An identical duplicate is readable, so it never blocks a write.
    fireEvent.click(screen.getByRole('button', { name: t('session.action.done') }));
    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(h.writes).toHaveLength(1);
  });
});

// A parent completing or editing the Child Profile is an `F001` act that leaves
// every `F003` lifecycle fact in storage. Runtime has to follow durable state
// across that save, or a running Mission and an open Reward Card disappear from
// the interface while storage still holds them.
describe('lifecycle facts across a confirmed setup save', () => {
  function incomplete(extra: Record<string, unknown>) {
    return JSON.stringify({
      ...createEmptySnapshot(),
      settings: { language: 'en' },
      // A profile with an identity but no age band: the approved incomplete
      // setup gate, reachable from a stored snapshot.
      childProfile: { localProfileId: PROFILE_ID, ageBand: null },
      currentSession: null,
      ...extra,
    });
  }

  function completeSetup() {
    fireEvent.click(screen.getByRole('radio', { name: '9–10' }));
    fireEvent.click(screen.getByRole('button', { name: t('setup.action.complete') }));
  }

  it('resumes the same running Mission without a refresh', () => {
    const running = { ...FACTS, state: 'active', startedAt: COMPLETED_AT - 60_000 };
    const h = harness(incomplete({ currentSession: running }));
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    expect(heading().textContent).toBe(t('view.setupIncomplete.title'));
    completeSetup();

    // The save is confirmed and the running Mission is back immediately, not
    // after a refresh, and not behind the setup handoff.
    expect(h.stored().childProfile.ageBand).toBe('9–10');
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(screen.getByRole('button', { name: t('session.action.done') })).toBeTruthy();
    expect(screen.getByRole('button', { name: t('session.action.leave') })).toBeTruthy();

    // Its frozen selection facts are untouched by the parent's edit: the
    // session keeps the age band it was chosen under, not the new one.
    const stored = h.stored().currentSession;
    expect(stored.sessionId).toBe('session-1');
    expect(stored.state).toBe('active');
    expect(stored.startedAt).toBe(COMPLETED_AT - 60_000);
    expect(stored.selectedAt).toBe(FACTS.selectedAt);
    expect(stored.ageBandAtSelection).toBe('7–8');
    expect(stored.missionId).toBe(FACTS.missionId);
    expect(stored.durationSecondsAtSelection).toBe(FACTS.durationSecondsAtSelection);
  });

  it('resumes the same Reward Card without a refresh', () => {
    const done = completedRecord(0);
    const h = harness(incomplete({
      currentResultSessionId: done.sessionId,
      completedSessions: [done],
    }));
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    expect(heading().textContent).toBe(t('view.setupIncomplete.title'));
    completeSetup();

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    expect(screen.getByText(t('result.recognition'))).toBeTruthy();
    expect(
      screen.getByText(
        t('result.goal.progress').replace('{done}', '1').replace('{target}', '20'),
      ),
    ).toBeTruthy();

    // The completion, its period and the count it feeds are unchanged.
    expect(h.stored().currentResultSessionId).toBe(done.sessionId);
    expect(h.stored().completedSessions).toEqual([done]);
    expect(h.stored().completedSessions[0].completionPeriodId).toBe(PERIOD);
    expect(h.stored().completedSessions[0].completedAt).toBe(done.completedAt);
  });

  it('carries completed records across a save that resumes no session', () => {
    const done = completedRecord(0);
    const h = harness(incomplete({ completedSessions: [done] }));
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);
    completeSetup();

    // Nothing is open, so the approved handoff is correct here — but the
    // completions behind it are still carried, not dropped.
    expect(heading().textContent).toBe(t('view.setupCompleteHandoff.title'));
    expect(h.stored().completedSessions).toEqual([done]);
  });

  it('still reaches the ordinary handoff from a first-use setup', () => {
    const h = harness();
    render(<App adapter={h.adapter} now={() => COMPLETED_AT} />);

    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    fireEvent.click(screen.getByRole('button', { name: t('setup.action.complete') }));

    expect(heading().textContent).toBe(t('view.setupCompleteHandoff.title'));
    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
    expect(h.stored().currentResultSessionId).toBeNull();
  });
});
