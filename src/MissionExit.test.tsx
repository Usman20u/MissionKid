import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from './App';
import { MISSION_CATALOG } from './catalogContent';
import { translateMessage, type SupportedLanguage } from './localization';
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

const SESSION_FACTS = {
  sessionId: 'session-1',
  childProfileId: PROFILE_ID,
  missionId: MISSION.missionId,
  missionCategoryAtSelection: MISSION.category,
  ageBandAtSelection: '7–8',
  durationSecondsAtSelection: MISSION.durationSeconds,
  selectedAt: 1_700_000_000_000,
} as const;

const READY_SESSION = { ...SESSION_FACTS, state: 'ready' } as const;
const ACTIVE_SESSION = {
  ...SESSION_FACTS,
  state: 'active',
  startedAt: 1_700_000_060_000,
} as const;

const COMPLETED_SESSION = {
  ...SESSION_FACTS,
  sessionId: 'session-done',
  state: 'completed',
  startedAt: 1_700_000_060_000,
  completedAt: 1_700_000_360_000,
  completionPeriodId: '2023-11',
} as const;

function storedSnapshot(
  currentSession: unknown,
  extra: Record<string, unknown> = {},
  language: SupportedLanguage = 'en',
) {
  return JSON.stringify({
    ...createEmptySnapshot(),
    settings: { language },
    childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
    currentSession,
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
    storage,
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

function leaveEntry(language: SupportedLanguage = 'en') {
  return screen.getByRole('button', { name: t('session.action.leave', language) });
}

function confirmLeave(language: SupportedLanguage = 'en') {
  const panel = document.querySelector('.mission-session__confirm')!;
  return [...panel.querySelectorAll('button')].find(
    (button) => button.textContent === t('session.action.leave', language),
  )!;
}

describe('ending an unstarted selection', () => {
  it('clears the ready session and returns to the approved discovery path', () => {
    const h = harness(storedSnapshot(READY_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );

    expect(heading().textContent).toBe(t('view.discovery.title'));
    expect(h.stored().currentSession).toBeNull();
    // Nothing downstream follows an unstarted selection that simply ended.
    expect(h.stored().completedSessions).toEqual([]);
    expect(h.stored().currentResultSessionId).toBeNull();
    expect(h.values.get('unrelated')).toBe('keep');
    expect(h.writes).toHaveLength(1);
  });

  it('needs no confirmation of its own', () => {
    const h = harness(storedSnapshot(READY_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );

    // Nothing has started and nothing is counted, so leaving `ready` asks no
    // further question.
    expect(document.querySelector('.mission-session__confirm')).toBeNull();
    expect(h.stored().currentSession).toBeNull();
  });

  it('keeps the setup and language context it returns into', () => {
    const h = harness(storedSnapshot(READY_SESSION, {}, 'ru'));
    render(<App adapter={h.adapter} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: t('session.action.backToSuggestions', 'ru'),
      }),
    );

    expect(heading().textContent).toBe(t('view.discovery.title', 'ru'));
    expect(h.stored().settings).toEqual({ language: 'ru' });
    expect(h.stored().childProfile).toEqual({
      localProfileId: PROFILE_ID,
      ageBand: '7–8',
    });
  });
});

describe('leaving an active Mission', () => {
  it('asks for confirmation that states the consequence before anything is written', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());

    expect(screen.getByText(t('session.leave.title'))).toBeTruthy();
    expect(screen.getByText(t('session.leave.consequence'))).toBeTruthy();
    // Opening the question changes nothing durable.
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.sessionId).toBe('session-1');
  });

  it('makes staying the easy choice and leaving the explicit one', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());

    const panel = document.querySelector('.mission-session__confirm')!;
    const choices = [...panel.querySelectorAll('button')];
    expect(choices.map((choice) => choice.textContent)).toEqual([
      t('session.action.keepGoing'),
      t('session.action.leave'),
    ]);
    expect(choices[0]!.className).toContain('button--primary');
    expect(choices[1]!.className).toContain('button--destructive');
    // No guilt, no urgency, no hidden exit.
    expect(panel.textContent).not.toMatch(/sorry|fail|lose|really|sure\?/i);
  });

  it('clears the session on confirmation and writes no completion', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());

    expect(heading().textContent).toBe(t('view.discovery.title'));
    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
    expect(h.stored().currentResultSessionId).toBeNull();
    expect(h.writes).toHaveLength(1);
    // No recognition, progress, penalty or shame follows.
    expect(screen.queryByText(/Reward|Monthly Goal|penalty|streak/i)).toBeNull();
  });

  it('changes nothing durable when the confirmation is dismissed', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    const raw = h.values.get(MISSIONKID_STORAGE_KEY)!;
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());
    fireEvent.click(screen.getByRole('button', { name: t('session.action.keepGoing') }));

    expect(document.querySelector('.mission-session__confirm')).toBeNull();
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(h.writes).toEqual([]);
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });

  it('dismisses from the keyboard and returns focus to the control that opened it', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    render(<App adapter={h.adapter} />);

    const entry = leaveEntry();
    fireEvent.click(entry);

    // Focus follows the family into the question they asked for.
    const title = screen.getByText(t('session.leave.title'));
    expect(document.activeElement).toBe(title);

    fireEvent.keyDown(document.querySelector('.mission-session__confirm')!, {
      key: 'Escape',
    });

    expect(document.querySelector('.mission-session__confirm')).toBeNull();
    expect(document.activeElement).toBe(leaveEntry());
    expect(h.writes).toEqual([]);
  });

  it('exposes the confirmation as a named, described region', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());

    const panel = document.querySelector('.mission-session__confirm')!;
    const named = document.getElementById(panel.getAttribute('aria-labelledby')!);
    const described = document.getElementById(panel.getAttribute('aria-describedby')!);
    expect(named!.textContent).toBe(t('session.leave.title'));
    expect(described!.textContent).toBe(t('session.leave.consequence'));
  });

  it.each(['de', 'ru'] as const)('asks the same question in %s', (language) => {
    const h = harness(storedSnapshot(ACTIVE_SESSION, {}, language));
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry(language));

    expect(screen.getByText(t('session.leave.title', language))).toBeTruthy();
    expect(screen.getByText(t('session.leave.consequence', language))).toBeTruthy();
    expect(
      screen.getByRole('button', { name: t('session.action.keepGoing', language) }),
    ).toBeTruthy();

    fireEvent.click(confirmLeave(language));
    expect(h.stored().currentSession).toBeNull();
  });

  it('writes once however often the confirmation is activated', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());
    const confirm = confirmLeave();
    fireEvent.click(confirm);
    fireEvent.click(confirm);
    fireEvent.click(confirm);

    // Clearing the same session twice is the same outcome, not a second effect,
    // and nothing is recreated in between.
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
  });

  it('follows the Mission that is actually stored when the exit names an older one', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());

    // Between the question and the answer, durable state moved on to another
    // Mission Session.
    const replacement = { ...ACTIVE_SESSION, sessionId: 'session-2' };
    h.values.set(MISSIONKID_STORAGE_KEY, storedSnapshot(replacement));
    fireEvent.click(confirmLeave());

    // The newer session is preserved and followed, never cleared by a
    // confirmation that belonged to the Mission before it.
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.sessionId).toBe('session-2');
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
  });

  it('leaves a Mission whose guidance has already reached zero', () => {
    const h = harness(
      storedSnapshot({ ...ACTIVE_SESSION, startedAt: 1 }),
    );
    render(<App adapter={h.adapter} />);

    // Stopping never depends on time remaining.
    expect(screen.getByText(t('session.active.zero'))).toBeTruthy();
    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());

    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
  });
});

describe('an exit that could not be carried out', () => {
  it('keeps the Mission and says the exit did not happen', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    const raw = h.values.get(MISSIONKID_STORAGE_KEY)!;
    h.faults.write = true;
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());

    expect(screen.getByRole('alert').textContent).toBe(t('session.exit.notLeft'));
    // The wording belongs to this operation, not to a start or a transition.
    expect(screen.getByRole('alert').textContent).not.toBe(t('session.start.notStarted'));
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);

    // The retry is the same control, under the same confirmation.
    h.faults.write = false;
    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());
    expect(h.stored().currentSession).toBeNull();
  });

  it('claims neither outcome when a landed write could not be confirmed', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    // The write lands; every read after it fails, so nothing can be established.
    h.faults.readsAfterWrite = 2;
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());

    expect(screen.getByRole('alert').textContent).toBe(t('session.exit.unconfirmed'));
    // Neither leaving nor keeping is claimed, and no session is written back
    // over an exit that may already be durable.
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession).toBeNull();
  });

  it('adopts the cleared session when the interrupted write is found to have landed', () => {
    const h = harness(storedSnapshot(ACTIVE_SESSION));
    h.faults.readsAfterWrite = 1;
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());

    // The recovery read succeeds and shows the session gone; that outcome is
    // adopted without writing again.
    expect(heading().textContent).toBe(t('view.discovery.title'));
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession).toBeNull();
  });

  it('refuses the exit while an unresolved completed record is stored', () => {
    const raw = storedSnapshot(ACTIVE_SESSION, {
      completedSessions: [{ ...COMPLETED_SESSION, completedAt: 1 }],
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());

    // D4-B is not bypassed to make the exit look successful.
    expect(screen.getByRole('alert').textContent).toBe(t('session.exit.notLeft'));
    expect(h.writes).toEqual([]);
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.stored().completedSessions).toHaveLength(1);
  });

  it('preserves a completed Mission Session and its result reference', () => {
    const raw = storedSnapshot(null, {
      currentResultSessionId: 'session-done',
      completedSessions: [COMPLETED_SESSION],
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    // Nothing on this path offers to cancel or abandon a completed Mission.
    expect(screen.queryByRole('button', { name: t('session.action.leave') })).toBeNull();
    expect(h.writes).toEqual([]);
    expect(h.stored().currentResultSessionId).toBe('session-done');
    expect(h.stored().completedSessions).toEqual([COMPLETED_SESSION]);
  });
});

describe('the running Mission while the family decides', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps guidance running while the confirmation is open and after keeping it', () => {
    const started = Date.now() - 60_000;
    const h = harness(storedSnapshot({ ...ACTIVE_SESSION, startedAt: started }));
    render(<App adapter={h.adapter} />);

    const guidance = () =>
      document.querySelector('.mission-session__guidance')!.textContent;
    // Four minutes long, one elapsed.
    expect(guidance()).toBe('About 3 min left');

    fireEvent.click(leaveEntry());

    // The Mission keeps running while the family decides: the guidance does not
    // reset to the full duration, and it goes on falling with real elapsed time
    // rather than pausing behind the question.
    expect(guidance()).toBe('About 3 min left');
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(guidance()).toBe('About 2 min left');

    fireEvent.click(screen.getByRole('button', { name: t('session.action.keepGoing') }));

    // Keeping the Mission changes no durable fact and restarts nothing.
    expect(guidance()).toBe('About 2 min left');
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.startedAt).toBe(started);

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(guidance()).toBe('About 1 min left');
  });

  it('leaves no countdown behind once the Mission is left', () => {
    const h = harness(
      storedSnapshot({ ...ACTIVE_SESSION, startedAt: Date.now() - 60_000 }),
    );
    render(<App adapter={h.adapter} />);

    expect(document.querySelector('.mission-session__guidance')).toBeTruthy();

    fireEvent.click(leaveEntry());
    fireEvent.click(confirmLeave());

    const writesAfterExit = h.writes.length;
    act(() => {
      vi.advanceTimersByTime(600_000);
    });

    // Ten minutes later nothing has ticked, written or reappeared: no guidance
    // outlives the session it belonged to.
    expect(document.querySelector('.mission-session__guidance')).toBeNull();
    expect(h.writes).toHaveLength(writesAfterExit);
    expect(heading().textContent).toBe(t('view.discovery.title'));
    expect(h.stored().currentSession).toBeNull();
  });

  it('treats hiding, returning and refreshing as nothing of the kind', () => {
    const raw = storedSnapshot({
      ...ACTIVE_SESSION,
      startedAt: Date.now() - 120_000,
    });
    const h = harness(raw);
    const { unmount } = render(<App adapter={h.adapter} />);

    document.dispatchEvent(new Event('visibilitychange'));
    window.dispatchEvent(new Event('focus'));
    unmount();

    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.sessionId).toBe('session-1');

    // Reopening finds the same Mission, not a cancelled one and no question.
    render(<App adapter={h.adapter} />);
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(document.querySelector('.mission-session__confirm')).toBeNull();
    expect(h.writes).toEqual([]);
  });
});

describe('resolving an existing-session conflict', () => {
  // A conflict is a durable disagreement: storage holds a Mission Session that
  // this page was not following, which is what another tab leaves behind.
  // The stored session holds a Mission from another category, so choosing any
  // of the three Movement suggestions is always a different Mission and always
  // a genuine conflict rather than the same choice answering twice.
  const OTHER = missionFor('creativity-06');
  const OTHER_FACTS = {
    ...SESSION_FACTS,
    missionId: OTHER.missionId,
    missionCategoryAtSelection: OTHER.category,
    durationSecondsAtSelection: OTHER.durationSeconds,
  } as const;

  function conflictHarness(session: unknown) {
    const h = harness(storedSnapshot(null));
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));
    fireEvent.click(screen.getByRole('radio', { name: 'Movement' }));

    // Storage gains the other session between the family's choice and the write.
    h.values.set(MISSIONKID_STORAGE_KEY, storedSnapshot(session));
    fireEvent.click(
      screen.getAllByRole('button', { name: t('discovery.card.choose') })[0]!,
    );

    return h;
  }

  it('names the current Mission and offers return or the approved exit', () => {
    const h = conflictHarness({ ...OTHER_FACTS, state: 'active', startedAt: 1_700_000_060_000 });

    const notice = document.querySelector('.mission-suggestions__issue--conflict')!;
    expect(notice.getAttribute('role')).toBe('status');
    expect(notice.textContent).toContain(OTHER.content.en.title);
    expect(
      screen.getByRole('button', { name: t('session.conflict.return') }),
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: t('session.action.leave') })).toBeTruthy();
    // No second Mission Session was created while the conflict stands.
    expect(h.stored().currentSession.sessionId).toBe('session-1');
  });

  it('offers no new selection until the conflict is resolved', () => {
    const h = conflictHarness({ ...OTHER_FACTS, state: 'active', startedAt: 1_700_000_060_000 });

    // The three Missions stay fully readable; only choosing is withheld, through
    // the native disabled cascade rather than by removing anything.
    expect(screen.getAllByRole('article')).toHaveLength(3);
    const chooseControls = () =>
      screen.getAllByRole('button', { name: t('discovery.card.choose') });
    for (const choose of chooseControls()) {
      expect(choose.closest('fieldset[disabled]')).not.toBeNull();
    }

    fireEvent.click(
      screen.getAllByRole('button', { name: t('discovery.card.choose') })[0]!,
    );
    // No second Mission Session begins while the conflict stands.
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.sessionId).toBe('session-1');

    // Resolving it restores choosing.
    fireEvent.click(screen.getByRole('button', { name: t('session.conflict.return') }));
    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));
    fireEvent.click(confirmLeave());

    for (const choose of chooseControls()) {
      expect(choose.closest('fieldset[disabled]')).toBeNull();
    }
  });

  it('returns to the stored Mission in the state it is actually in', () => {
    const h = conflictHarness({ ...OTHER_FACTS, state: 'active', startedAt: 1_700_000_060_000 });

    fireEvent.click(screen.getByRole('button', { name: t('session.conflict.return') }));

    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    // Returning is navigation, not a write.
    expect(h.stored().currentSession.sessionId).toBe('session-1');
  });

  it('still requires confirmation before abandoning the active Mission', () => {
    const h = conflictHarness({ ...OTHER_FACTS, state: 'active', startedAt: 1_700_000_060_000 });

    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));

    expect(screen.getByText(t('session.leave.consequence'))).toBeTruthy();
    expect(h.stored().currentSession.sessionId).toBe('session-1');

    fireEvent.click(confirmLeave());

    expect(h.stored().currentSession).toBeNull();
    expect(h.stored().completedSessions).toEqual([]);
  });

  it('ends an unstarted conflicting selection without a confirmation', () => {
    const h = conflictHarness({ ...OTHER_FACTS, state: 'ready' });

    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );

    expect(document.querySelector('.mission-session__confirm')).toBeNull();
    expect(h.stored().currentSession).toBeNull();
  });

  it('does not choose the newly requested Mission once the conflict is cleared', () => {
    const h = conflictHarness({ ...OTHER_FACTS, state: 'active', startedAt: 1_700_000_060_000 });

    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));
    fireEvent.click(confirmLeave());

    // Selection stays deliberate: clearing the conflict returns the family to
    // the suggestions rather than starting the Mission they asked for.
    expect(h.stored().currentSession).toBeNull();
    expect(heading().textContent).toBe(t('view.discovery.title'));
    expect(h.stored().completedSessions).toEqual([]);
  });
});
