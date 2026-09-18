import { StrictMode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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

const SELECTED_SESSION = { ...SESSION_FACTS, state: 'selected' } as const;
const READY_SESSION = { ...SESSION_FACTS, state: 'ready' } as const;
const ACTIVE_SESSION = {
  ...SESSION_FACTS,
  state: 'active',
  startedAt: 1_700_000_060_000,
} as const;

function storedSnapshot(
  currentSession: unknown,
  language: SupportedLanguage = 'en',
) {
  return JSON.stringify({
    ...createEmptySnapshot(),
    settings: { language },
    childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
    currentSession,
  });
}

// Faults are expressed as what happens around the write rather than as a read
// count, so a test says which failure class it means instead of tracking how
// many times storage happens to be read.
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

describe('reaching the ready Mission', () => {
  it('continues a confirmed selection to a persisted ready session', () => {
    const h = harness(storedSnapshot(null));
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));
    fireEvent.click(screen.getByRole('radio', { name: 'Movement' }));
    const card = screen.getAllByRole('article')[0]!;
    const title = card.querySelector('.mission-card__title')!.textContent!;
    fireEvent.click(
      screen.getAllByRole('button', { name: t('discovery.card.choose') })[0]!,
    );

    // No second family decision: choosing is the last thing the family did.
    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(title);
    expect(screen.getByText(t('session.ready.notStarted'))).toBeTruthy();

    const session = h.stored().currentSession;
    expect(session.state).toBe('ready');
    expect(Object.hasOwn(session, 'startedAt')).toBe(false);
    // One write for the selection, one for the transition, and nothing else.
    expect(h.writes).toHaveLength(2);
    expect(h.stored().completedSessions).toEqual([]);
    expect(h.stored().currentResultSessionId).toBeNull();
  });

  it('advances a stored selected session on load, exactly once', () => {
    const h = harness(storedSnapshot(SELECTED_SESSION));
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(h.stored().currentSession).toEqual({
      ...SELECTED_SESSION,
      state: 'ready',
    });
    expect(h.writes).toHaveLength(1);
    // The selection is restored into its own flow, not back into choosing.
    expect(screen.queryByRole('group', { name: 'Mission Category' })).toBeNull();
    expect(screen.queryByRole('article')).toBeNull();
  });

  it('restores a stored ready session without writing anything', () => {
    const h = harness(storedSnapshot(READY_SESSION));
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe(MISSION.content.en.title);
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession).toEqual(READY_SESSION);
  });

  it('creates no second session and no second write when the effect replays', () => {
    const h = harness(storedSnapshot(SELECTED_SESSION));

    // StrictMode mounts, tears down and remounts, replaying the effect against
    // the same durable state.
    render(
      <StrictMode>
        <App adapter={h.adapter} />
      </StrictMode>,
    );

    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession.sessionId).toBe('session-1');
  });

  it('leaves a stored active session exactly as it is', () => {
    const raw = storedSnapshot(ACTIVE_SESSION);
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    // Its own surface is a later step; nothing here downgrades or rewrites it.
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.writes).toEqual([]);
    expect(heading().textContent).not.toBe(t('view.sessionReady.title'));
    expect(heading().textContent).not.toBe(t('view.sessionOpening.title'));
  });

  it('shows only what a ready Mission may show at this step', () => {
    const h = harness(storedSnapshot(READY_SESSION));
    const { container } = render(<App adapter={h.adapter} />);

    // Starting, timing, completing and recognition all belong to later steps,
    // and an inert control for any of them would be a promise this build
    // cannot keep.
    expect(
      screen.queryByText(/Start mission|Mission done|Reward|Monthly Goal|min left/i),
    ).toBeNull();
    expect(container.querySelector('[role="timer"]')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
    // The parent's destructive control does not sit beside a child's Mission.
    expect(
      screen.queryByRole('button', { name: t('recovery.resetTitle') }),
    ).toBeNull();
  });

  it.each(['de', 'ru'] as const)('presents the ready Mission in %s', (language) => {
    const h = harness(storedSnapshot(READY_SESSION, language));
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionReady.title', language));
    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe(MISSION.content[language].title);
    expect(screen.getByText(t('session.ready.notStarted', language))).toBeTruthy();
  });

  it('moves focus into the Mission once, and not again when the transition resolves', () => {
    const h = harness(storedSnapshot(null));
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));
    fireEvent.click(screen.getByRole('radio', { name: 'Movement' }));

    const focus = vi.spyOn(HTMLElement.prototype, 'focus');
    fireEvent.click(
      screen.getAllByRole('button', { name: t('discovery.card.choose') })[0]!,
    );

    // Entering the Mission is one context change for the family. Reaching
    // `ready` inside it is not a second one, so focus is not taken twice.
    expect(focus).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(heading());
    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    focus.mockRestore();
  });
});

describe('a ready transition that did not complete', () => {
  it('says the transition was not carried out when the write failed first', () => {
    const raw = storedSnapshot(SELECTED_SESSION);
    const h = harness(raw);
    h.faults.write = true;
    render(<App adapter={h.adapter} />);

    // Established before storage changed: the stored session is what it was,
    // and the interface says so without claiming a start.
    expect(screen.getByRole('alert').textContent)
      .toBe(t('session.transition.notCarriedOut'));
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.stored().currentSession.state).toBe('selected');
    expect(screen.queryByText(/PRIVATE RAW|snapshot|session-1/)).toBeNull();
    // The chosen Mission stays identifiable while the transition is unresolved.
    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe(MISSION.content.en.title);
    expect(heading().textContent).toBe(t('view.sessionOpening.title'));
  });

  it('does not retry itself, and advances the same session when the family retries', () => {
    const h = harness(storedSnapshot(SELECTED_SESSION));
    h.faults.write = true;
    const { rerender } = render(<App adapter={h.adapter} />);

    expect(h.writes).toHaveLength(1);
    // An ordinary render must not turn a failed transition into a write loop.
    rerender(<App adapter={h.adapter} />);
    rerender(<App adapter={h.adapter} />);
    expect(h.writes).toHaveLength(1);

    h.faults.write = false;
    fireEvent.click(screen.getByRole('button', { name: t('session.action.retry') }));

    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(h.stored().currentSession).toEqual({ ...SELECTED_SESSION, state: 'ready' });
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('presents the durable ready session when a landed write could not be confirmed', () => {
    const h = harness(storedSnapshot(SELECTED_SESSION));
    // The write lands; only the read that would confirm it fails.
    h.faults.readsAfterWrite = 1;
    render(<App adapter={h.adapter} />);

    // Neither success nor rollback was claimed: durable state was read again
    // and it says the same session is ready.
    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession).toEqual({ ...SELECTED_SESSION, state: 'ready' });
  });

  it('claims neither outcome when the interrupted write cannot be read back', () => {
    const h = harness(storedSnapshot(SELECTED_SESSION));
    h.faults.readsAfterWrite = 99;
    render(<App adapter={h.adapter} />);

    expect(screen.getByRole('alert').textContent)
      .toBe(t('session.transition.unconfirmed'));
    // No rollback is written over a transition that may have succeeded.
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession.state).toBe('ready');
    expect(screen.getByRole('button', { name: t('session.action.retry') })).toBeTruthy();
  });

  it('announces a repeated failure instead of leaving the retry unanswered', () => {
    const h = harness(storedSnapshot(SELECTED_SESSION));
    h.faults.write = true;
    render(<App adapter={h.adapter} />);

    const first = screen.getByRole('alert');
    fireEvent.click(screen.getByRole('button', { name: t('session.action.retry') }));

    expect(screen.getByRole('alert')).not.toBe(first);
    expect(screen.getByRole('alert').textContent)
      .toBe(t('session.transition.notCarriedOut'));
  });
});

describe('the gates a ready transition inherits', () => {
  it('writes nothing and claims no session while storage is unavailable', () => {
    const h = harness(storedSnapshot(SELECTED_SESSION));
    h.faults.read = true;
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.temporaryMode.title'));
    expect(h.writes).toEqual([]);
    expect(screen.queryByText(t('session.ready.notStarted'))).toBeNull();
  });

  it('writes nothing over a snapshot that cannot be used', () => {
    const h = harness('{corrupted');
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.recovery.title'));
    expect(h.writes).toEqual([]);
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe('{corrupted');
  });

  it('keeps a session behind the incomplete-setup gate without advancing it', () => {
    const raw = JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: PROFILE_ID, ageBand: '11–12' },
      currentSession: SELECTED_SESSION,
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.setupIncomplete.title'));
    expect(h.writes).toEqual([]);
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
  });
});
