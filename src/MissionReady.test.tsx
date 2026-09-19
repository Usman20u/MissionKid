import { StrictMode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from './App';
import {
  appStateReducer,
  isStartOutcomeUnknown,
  type AppState,
} from './appState';
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

    // Starting is the one action this view carries. Timing, completing and
    // recognition belong to later steps, and an inert control for any of them
    // would be a promise this build cannot keep.
    expect(screen.getByRole('button', { name: t('session.action.start') })).toBeTruthy();
    expect(
      screen.queryByText(/Mission done|Reward|Monthly Goal|min left/i),
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

  // The unknown outcome has to govern the whole page, not only the notice. The
  // start write can land and still be unconfirmable, so anything asserting that
  // the Mission has not started is a claim — and, in exactly that case, false.
  it.each(['en', 'de', 'ru'] as const)(
    'asserts neither a start nor its absence anywhere on the page in %s',
    (language) => {
      const h = harness(storedSnapshot(READY_SESSION, language));
      render(<App adapter={h.adapter} />);

      h.faults.readsAfterWrite = 99;
      fireEvent.click(
        screen.getByRole('button', {
          name: translateMessage(language, 'session.action.start'),
        }),
      );

      // The write did land: durable state really is running.
      expect(h.stored().currentSession.state).toBe('active');
      const landedStartedAt = h.stored().currentSession.startedAt;
      expect(Number.isInteger(landedStartedAt)).toBe(true);

      // The notice says only what is known.
      expect(screen.getByRole('alert').textContent).toBe(
        translateMessage(language, 'session.start.unconfirmed'),
      );

      // The heading no longer asserts the Mission is still waiting to begin.
      expect(heading().textContent).toBe(
        translateMessage(language, 'view.sessionStartUnknown.title'),
      );
      expect(heading().textContent).not.toBe(
        translateMessage(language, 'view.sessionReady.title'),
      );

      // Nothing on the page states the durable negative.
      expect(
        screen.queryByText(translateMessage(language, 'session.ready.notStarted')),
      ).toBeNull();
      expect(document.body.textContent).not.toContain(
        translateMessage(language, 'session.ready.notStarted'),
      );

      // Nor does the action claim it is still to be started.
      expect(
        screen.queryByRole('button', {
          name: translateMessage(language, 'session.action.start'),
        }),
      ).toBeNull();
      const retry = screen.getByRole('button', {
        name: translateMessage(language, 'session.action.retry'),
      });

      // What is true either way is preserved: the Mission, its guidance and
      // its way out.
      expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
        MISSION.content[language].title,
      );
      expect(screen.getByText(MISSION.content[language].instruction)).toBeTruthy();
      expect(
        screen.getByText(translateMessage(language, 'session.ready.missionBreak.body')),
      ).toBeTruthy();
      expect(
        screen.getByRole('button', {
          name: translateMessage(language, 'session.action.backToSuggestions'),
        }),
      ).toBeTruthy();

      // Retrying resolves the same durable session and its original start.
      h.faults.readsAfterWrite = 0;
      const writesBeforeRetry = h.writes.length;
      fireEvent.click(retry);

      expect(h.writes).toHaveLength(writesBeforeRetry);
      expect(h.stored().currentSession.sessionId).toBe('session-1');
      expect(h.stored().currentSession.startedAt).toBe(landedStartedAt);
      expect(heading().textContent).toBe(
        translateMessage(language, 'view.sessionActive.title'),
      );
    },
  );

  // An established refusal is a different thing: the Mission is known not to
  // have started, and the page may still say so.
  it('still says the Mission has not started when the refusal was established', () => {
    const h = harness(storedSnapshot(READY_SESSION));
    render(<App adapter={h.adapter} />);

    h.faults.write = true;
    fireEvent.click(screen.getByRole('button', { name: t('session.action.start') }));

    expect(screen.getByRole('alert').textContent).toBe(t('session.start.notStarted'));
    expect(h.stored().currentSession.state).toBe('ready');
    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(screen.getByText(t('session.ready.notStarted'))).toBeTruthy();
    expect(screen.getByRole('button', { name: t('session.action.start') })).toBeTruthy();
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

function readySessionFor(
  missionId: string,
  overrides: Readonly<Record<string, unknown>> = {},
) {
  const mission = missionFor(missionId);

  return {
    sessionId: `session-${missionId}`,
    childProfileId: PROFILE_ID,
    missionId,
    missionCategoryAtSelection: mission.category,
    ageBandAtSelection: '7–8',
    durationSecondsAtSelection: mission.durationSeconds,
    state: 'ready',
    selectedAt: 1_700_000_000_000,
    ...overrides,
  };
}

function renderReady(missionId: string, language: SupportedLanguage = 'en', overrides = {}) {
  const h = harness(storedSnapshot(readySessionFor(missionId, overrides), language));
  const view = render(<App adapter={h.adapter} />);

  return { ...view, h };
}

describe('what a ready Mission answers before it starts', () => {
  it.each(['en', 'de', 'ru'] as const)(
    'answers every required question in %s, from the catalog in that language',
    (language) => {
      const mission = missionFor('creativity-06');
      const content = mission.content[language];
      const { container, h } = renderReady('creativity-06', language);

      // What is the Mission, and what will the family do?
      expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(content.title);
      expect(screen.getByText(content.instruction)).toBeTruthy();
      // Which Mission Category, in words, and roughly how long?
      const meta = container.querySelector('.mission-session__meta')!.textContent;
      expect(meta).toContain(
        translateMessage(language, 'discovery.category.creativity'),
      );
      expect(meta).toContain(String(Math.round(mission.durationSeconds / 60)));
      expect(meta).toContain(translateMessage(language, 'discovery.card.minutes'));
      // Must an adult be nearby or take part, and is there safety guidance?
      expect(
        screen.getByText(translateMessage(language, 'discovery.adult.nearby')),
      ).toBeTruthy();
      expect(screen.getByText(content.adultInvolvementNote!)).toBeTruthy();
      expect(
        screen.getByText(translateMessage(language, 'discovery.card.safetyLabel')),
      ).toBeTruthy();
      expect(screen.getByText(content.safetyNote!)).toBeTruthy();
      // Has it started, and what happens next?
      expect(
        screen.getByText(translateMessage(language, 'session.ready.notStarted')),
      ).toBeTruthy();
      expect(
        screen.getByText(translateMessage(language, 'session.ready.missionBreak.lead')),
      ).toBeTruthy();
      expect(
        screen.getByText(translateMessage(language, 'session.ready.missionBreak.body')),
      ).toBeTruthy();
      // Answering all of it required no navigation and changed nothing.
      expect(h.writes).toEqual([]);
    },
  );

  it.each([
    ['creativity-06', 'discovery.adult.nearby', 'discovery.adult.participation'],
    ['helping-03', 'discovery.adult.participation', 'discovery.adult.nearby'],
  ] as const)('keeps the requirement of %s distinguishable in words', (missionId, present, absent) => {
    const mission = missionFor(missionId);
    renderReady(missionId);

    expect(screen.getByText(translateMessage('en', present))).toBeTruthy();
    expect(screen.queryByText(translateMessage('en', absent))).toBeNull();
    expect(screen.getByText(mission.content.en.adultInvolvementNote!)).toBeTruthy();
  });

  it('claims nothing for a Mission with no adult-involvement requirement', () => {
    const { container } = renderReady('movement-02');

    // Silence is the approved treatment: a visible "no adult needed" line would
    // read as a promise that ordinary parental judgement can be skipped.
    expect(container.querySelector('.mission-session__note--adult')).toBeNull();
    expect(screen.queryByText(translateMessage('en', 'discovery.adult.nearby'))).toBeNull();
    expect(
      screen.queryByText(translateMessage('en', 'discovery.adult.participation')),
    ).toBeNull();
    // The safety guidance this Mission does carry is still there.
    expect(screen.getByText(missionFor('movement-02').content.en.safetyNote!)).toBeTruthy();
  });

  it('invents no safety guidance for a Mission that carries none', () => {
    const mission = missionFor('calm-07');
    const { container } = renderReady('calm-07');

    expect(mission.safetyNoteRequired).toBe(false);
    expect(container.querySelector('.mission-session__note--safety')).toBeNull();
    expect(
      screen.queryByText(translateMessage('en', 'discovery.card.safetyLabel')),
    ).toBeNull();
    expect(screen.getByText(mission.content.en.instruction)).toBeTruthy();
  });

  it('shows the duration the session recorded, not the catalog default', () => {
    const catalogMinutes = Math.round(missionFor('movement-02').durationSeconds / 60);
    const { container } = renderReady('movement-02', 'en', {
      durationSecondsAtSelection: 600,
    });

    // The selection facts are what the family agreed to. A later catalog
    // release cannot rewrite them, and neither can a later setup edit.
    const meta = container.querySelector('.mission-session__meta')!.textContent;
    expect(meta).toContain('10');
    expect(meta).not.toContain(String(catalogMinutes));
  });

  it('shows the Mission Category the session recorded', () => {
    const { container } = renderReady('movement-02', 'en', {
      missionCategoryAtSelection: 'Calm',
    });

    const meta = container.querySelector('.mission-session__meta')!.textContent;
    expect(meta).toContain(translateMessage('en', 'discovery.category.calm'));
    expect(meta).not.toContain(translateMessage('en', 'discovery.category.movement'));
  });

  it('is unchanged by a current age band that no longer matches the selection', () => {
    const h = harness(JSON.stringify({
      ...createEmptySnapshot(),
      childProfile: { localProfileId: PROFILE_ID, ageBand: '9–10' },
      currentSession: readySessionFor('movement-02', { ageBandAtSelection: '4–6' }),
    }));
    render(<App adapter={h.adapter} />);

    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe(missionFor('movement-02').content.en.title);
    expect(h.stored().currentSession.ageBandAtSelection).toBe('4–6');
    expect(h.writes).toEqual([]);
  });

  it('offers exactly one dominant action, and no countdown, progression or reward', () => {
    const { container, h } = renderReady('movement-02');

    // One primary action, and it is the start. Beside it, the approved way out
    // of `ready` is present and secondary, never competing with it. Completing
    // and recognition arrive with the operations that carry them out; an inert
    // control for either would be a promise this build cannot keep.
    const actions = screen.getAllByRole('button');
    expect(actions).toHaveLength(2);
    expect(actions[0]!.textContent).toBe(translateMessage('en', 'session.action.start'));
    expect(actions[0]!.className).toContain('button--primary');
    expect(actions[1]!.textContent).toBe(
      translateMessage('en', 'session.action.backToSuggestions'),
    );
    expect(actions[1]!.className).toContain('button--secondary');
    expect(
      actions.filter((action) => action.className.includes('button--primary')),
    ).toHaveLength(1);
    expect(container.querySelector('[role="timer"], [aria-live], progress')).toBeNull();
    expect(container.textContent).not.toMatch(/\d+:\d\d/);
    expect(
      screen.queryByText(/Mission done|Reward|Monthly Goal|History/i),
    ).toBeNull();
    // Rendering the ready Mission starts nothing on its own.
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.state).toBe('ready');
  });

  it.each(['en', 'de', 'ru'] as const)(
    'introduces the Mission Break in %s without claiming control of anything',
    (language) => {
      const wording = [
        translateMessage(language, 'session.ready.missionBreak.lead'),
        translateMessage(language, 'session.ready.missionBreak.body'),
      ].join(' ');

      // Mission Break is a step the family takes, never something MissionKid
      // does to the device, to other apps, or to the child.
      expect(wording).not.toMatch(
        /block|lock|disable|control|monitor|track|enforce|supervis|parental control|screen time/i,
      );
      expect(wording).not.toMatch(
        /sperr|blockier|überwach|kontrolli|verfolg|Bildschirmzeit|Kindersicherung/i,
      );
      expect(wording).not.toMatch(
        /блокир|контрол|следи|отслежив|запрет|родительск/i,
      );
      // It does say what the family does: start, leave the screen, come back.
      const { container } = renderReady('movement-02', language);
      const rendered = container.querySelector('.mission-session__break')!.textContent;
      expect(rendered).toContain(
        translateMessage(language, 'session.ready.missionBreak.lead'),
      );
      expect(rendered).toContain(
        translateMessage(language, 'session.ready.missionBreak.body'),
      );
    },
  );

  it('does not present a Mission it cannot resolve as ready to start', () => {
    const raw = storedSnapshot(
      readySessionFor('movement-02', { missionId: 'movement-99' }),
    );
    const h = harness(raw);
    const { container } = render(<App adapter={h.adapter} />);

    // No title, no instruction, no invented content, and nothing startable.
    expect(
      screen.getByText(translateMessage('en', 'session.ready.missionUnavailable')),
    ).toBeTruthy();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(container.querySelector('.mission-session__instruction')).toBeNull();
    expect(container.querySelector('.mission-session__note')).toBeNull();
    expect(
      screen.queryByText(translateMessage('en', 'session.ready.missionBreak.body')),
    ).toBeNull();
    // The session itself is untouched: it is not completed, cleared or counted.
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.writes).toEqual([]);
  });

  it('keeps the transition failure wording specific to getting the Mission ready', () => {
    for (const language of ['en', 'de', 'ru'] as const) {
      for (const key of [
        'session.transition.notCarriedOut',
        'session.transition.unconfirmed',
      ] as const) {
        const message = translateMessage(language, key);

        // A durable `selected` session already exists before this transition,
        // so neither message may claim that nothing at all was saved, and
        // neither describes a start or a completion.
        expect(message).not.toMatch(/nothing was saved|nichts gespeichert|ничего не было сохранено/i);
        expect(message).not.toMatch(/completed|abgeschlossen|завершена/i);
      }
    }
  });
});

const START_TIME = 1_700_000_500_000;

function startControl() {
  return screen.getByRole('button', { name: translateMessage('en', 'session.action.start') });
}

describe('starting the ready Mission', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(START_TIME);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts once and hands over to the running Mission', () => {
    const mission = missionFor('creativity-06');
    const { h } = renderReady('creativity-06');

    fireEvent.click(startControl());

    // The running Mission, not a fresh ready screen: no not-started line and no
    // start action that looks available again.
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(mission.content.en.title);
    expect(screen.getByText(t('session.active.away'))).toBeTruthy();
    expect(screen.queryByText(t('session.ready.notStarted'))).toBeNull();
    expect(
      screen.queryByRole('button', { name: t('session.action.start') }),
    ).toBeNull();
    // The guidance the family read before starting stays with the Mission.
    expect(screen.getByText(mission.content.en.adultInvolvementNote!)).toBeTruthy();
    expect(screen.getByText(mission.content.en.safetyNote!)).toBeTruthy();

    const session = h.stored().currentSession;
    expect(session.state).toBe('active');
    expect(session.startedAt).toBe(START_TIME);
    expect(session.sessionId).toBe('session-creativity-06');
    expect(h.writes).toHaveLength(1);
  });

  it('starts no countdown, completion or recognition with the Mission', () => {
    const { container } = renderReady('movement-02');

    fireEvent.click(startControl());

    // The running Mission offers finishing as its dominant action and the
    // approved way out beside it. The approximate guidance it shows is calm
    // text, not a ticking clock face.
    const actions = screen.getAllByRole('button');
    expect(actions.map((action) => action.textContent)).toEqual([
      translateMessage('en', 'session.action.done'),
      translateMessage('en', 'session.action.leave'),
    ]);
    expect(actions[0]!.className).toContain('button--primary');
    expect(actions[1]!.className).toContain('button--secondary');
    expect(container.querySelector('[role="timer"], progress')).toBeNull();
    expect(container.textContent).not.toMatch(/\d+:\d\d/);
    // Starting shows no recognition or progress: those belong to the result a
    // completion reaches, not to the Mission that has only just begun.
    expect(
      screen.queryByText(/Reward|Monthly Goal|missions/i),
    ).toBeNull();
  });

  it('keeps one start when the action is activated twice', () => {
    const { h } = renderReady('movement-02');
    const control = startControl();

    fireEvent.click(control);
    fireEvent.click(control);

    // A second press cannot start a second countdown or move the timestamp.
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession.startedAt).toBe(START_TIME);
    expect(h.stored().currentSession.state).toBe('active');
  });

  it('offers a keyboard-activatable native control and moves focus on the handover', () => {
    renderReady('movement-02');
    const control = startControl();

    expect(control.tagName).toBe('BUTTON');
    expect(control.getAttribute('type')).toBe('button');

    const focus = vi.spyOn(HTMLElement.prototype, 'focus');
    // What a keyboard Enter or Space produces on a native button.
    fireEvent.click(control);

    // Starting is a context the family asked for, so focus follows it once.
    expect(focus).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(heading());
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    focus.mockRestore();
  });

  it('restores a running Mission without starting or restarting anything', () => {
    const raw = storedSnapshot({
      ...readySessionFor('movement-02'),
      state: 'active',
      startedAt: START_TIME - 60_000,
    });
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.startedAt).toBe(START_TIME - 60_000);
  });

  it('does not start a ready Mission by opening, rendering or restoring it', () => {
    const { h } = renderReady('movement-02');

    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(h.writes).toEqual([]);
    expect(h.stored().currentSession.state).toBe('ready');
    expect(Object.hasOwn(h.stored().currentSession, 'startedAt')).toBe(false);
  });

  it('offers no start for a Mission that cannot be resolved', () => {
    const h = harness(storedSnapshot(
      readySessionFor('movement-02', { missionId: 'movement-99' }),
    ));
    render(<App adapter={h.adapter} />);

    // No start is offered for content that cannot be shown. Leaving is still
    // available: a family may always stop, and stopping needs no Mission text.
    const actions = screen.getAllByRole('button');
    expect(actions).toHaveLength(1);
    expect(actions[0]!.textContent).toBe(
      translateMessage('en', 'session.action.backToSuggestions'),
    );
    expect(h.writes).toEqual([]);
  });

  it.each(['de', 'ru'] as const)('presents the running Mission in %s', (language) => {
    renderReady('creativity-06', language);

    fireEvent.click(
      screen.getByRole('button', { name: translateMessage(language, 'session.action.start') }),
    );

    expect(heading().textContent).toBe(t('view.sessionActive.title', language));
    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe(missionFor('creativity-06').content[language].title);
    expect(screen.getByText(t('session.active.away', language))).toBeTruthy();
  });
});

describe('a start that did not complete', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(START_TIME);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('keeps the ready Mission and says the start did not happen', () => {
    const raw = storedSnapshot(readySessionFor('movement-02'));
    const h = harness(raw);
    h.faults.write = true;
    render(<App adapter={h.adapter} />);

    fireEvent.click(startControl());

    expect(screen.getByRole('alert').textContent).toBe(t('session.start.notStarted'));
    // Wording follows the evidence: durable state was read and is still ready.
    expect(screen.getByRole('alert').textContent)
      .not.toBe(t('session.transition.notCarriedOut'));
    expect(heading().textContent).toBe(t('view.sessionReady.title'));
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.stored().currentSession.state).toBe('ready');
    // The same action is the retry; no second control claims to repeat it. The
    // approved way out stands beside it as it always does.
    const afterFailure = screen.getAllByRole('button').map((b) => b.textContent);
    expect(afterFailure).toEqual([
      t('session.action.start'),
      t('session.action.backToSuggestions'),
    ]);

    h.faults.write = false;
    fireEvent.click(startControl());

    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(h.stored().currentSession.startedAt).toBe(START_TIME);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('claims neither a start nor its absence when the outcome is unknown', () => {
    const h = harness(storedSnapshot(readySessionFor('movement-02')));
    h.faults.readsAfterWrite = 99;
    render(<App adapter={h.adapter} />);

    fireEvent.click(startControl());

    const alert = screen.getByRole('alert').textContent;
    expect(alert).toBe(t('session.start.unconfirmed'));
    // It must not borrow the ready transition's claim that nothing started.
    expect(alert).not.toBe(t('session.transition.unconfirmed'));
    expect(alert).not.toMatch(/has not started/i);
    // No rollback over a start that may already be durable.
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession.state).toBe('active');
    expect(h.stored().currentSession.startedAt).toBe(START_TIME);
  });

  it('adopts the running Mission when only the confirmation was lost', () => {
    const h = harness(storedSnapshot(readySessionFor('movement-02')));
    h.faults.readsAfterWrite = 1;
    render(<App adapter={h.adapter} />);

    fireEvent.click(startControl());

    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession.startedAt).toBe(START_TIME);
  });

  // An action that could not read storage at all establishes no durable fact,
  // so it cannot settle the question the start left open. Replacing the start's
  // notice with the exit's is a change of message and nothing more; before this
  // was corrected it also turned the page back into a confident "not started"
  // while durable state was running.
  it.each(['en', 'de', 'ru'] as const)(
    'keeps the start unknown after a failed exit establishes nothing, in %s',
    (language) => {
      const mission = missionFor('movement-02');
      const h = harness(storedSnapshot(readySessionFor('movement-02'), language));
      render(<App adapter={h.adapter} />);

      h.faults.readsAfterWrite = 99;
      fireEvent.click(
        screen.getByRole('button', { name: t('session.action.start', language) }),
      );

      // The start landed, and no read could establish it.
      expect(h.writes).toHaveLength(1);
      expect(h.stored().currentSession.state).toBe('active');
      expect(h.stored().currentSession.startedAt).toBe(START_TIME);
      expect(heading().textContent).toBe(
        t('view.sessionStartUnknown.title', language),
      );

      // The way out, taken while storage still cannot be read at all.
      fireEvent.click(
        screen.getByRole('button', {
          name: t('session.action.backToSuggestions', language),
        }),
      );

      // The notice follows the last thing attempted, as it should.
      expect(screen.getByRole('alert').textContent).toBe(
        t('session.exit.notLeft', language),
      );

      // Nothing else about the start changes, because nothing was established.
      expect(heading().textContent).toBe(
        t('view.sessionStartUnknown.title', language),
      );
      expect(heading().textContent).not.toBe(t('view.sessionReady.title', language));
      expect(
        screen.queryByText(t('session.ready.notStarted', language)),
      ).toBeNull();
      expect(document.body.textContent).not.toContain(
        t('session.ready.notStarted', language),
      );
      expect(
        screen.getAllByRole('button').map((button) => button.textContent),
      ).toEqual([
        t('session.action.retry', language),
        t('session.action.backToSuggestions', language),
      ]);

      // What is true either way is preserved: the Mission, its guidance, its
      // safety note and the way back.
      expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
        mission.content[language].title,
      );
      expect(screen.getByText(mission.content[language].instruction)).toBeTruthy();
      expect(screen.getByText(mission.content[language].safetyNote!)).toBeTruthy();
      expect(
        screen.getByText(t('session.ready.missionBreak.body', language)),
      ).toBeTruthy();

      // Activating it again meets the same refusal, and abandons nothing.
      fireEvent.click(
        screen.getByRole('button', {
          name: t('session.action.backToSuggestions', language),
        }),
      );

      expect(screen.getByRole('alert').textContent).toBe(
        t('session.exit.notLeft', language),
      );
      expect(heading().textContent).toBe(
        t('view.sessionStartUnknown.title', language),
      );
      expect(h.writes).toHaveLength(1);
      expect(h.stored().currentSession.state).toBe('active');
      expect(h.stored().currentSession.startedAt).toBe(START_TIME);

      // Durable evidence is what resolves it. The retry adopts the same running
      // session with the start it already has, and writes nothing.
      h.faults.readsAfterWrite = 0;
      fireEvent.click(
        screen.getByRole('button', { name: t('session.action.retry', language) }),
      );

      expect(h.writes).toHaveLength(1);
      expect(h.stored().currentSession.sessionId).toBe('session-movement-02');
      expect(h.stored().currentSession.startedAt).toBe(START_TIME);
      expect(heading().textContent).toBe(t('view.sessionActive.title', language));
      expect(screen.queryByRole('alert')).toBeNull();
    },
  );

  it('follows the running Mission when the way out is taken after reads recover', () => {
    const h = harness(storedSnapshot(readySessionFor('movement-02')));
    render(<App adapter={h.adapter} />);

    h.faults.readsAfterWrite = 99;
    fireEvent.click(startControl());

    expect(heading().textContent).toBe(t('view.sessionStartUnknown.title'));

    h.faults.readsAfterWrite = 0;
    fireEvent.click(
      screen.getByRole('button', { name: t('session.action.backToSuggestions') }),
    );

    // Durable state holds the running Mission, so it is followed rather than
    // cleared, and the uncertainty it resolves goes with it.
    expect(heading().textContent).toBe(t('view.sessionActive.title'));
    expect(screen.queryByRole('alert')).toBeNull();
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession.state).toBe('active');
    expect(h.stored().currentSession.startedAt).toBe(START_TIME);

    // Leaving it is now leaving an active Mission, which still asks first.
    fireEvent.click(screen.getByRole('button', { name: t('session.action.leave') }));

    expect(screen.getByText(t('session.leave.title'))).toBeTruthy();
    expect(screen.getByText(t('session.leave.consequence'))).toBeTruthy();
    expect(h.writes).toHaveLength(1);
    expect(h.stored().currentSession.state).toBe('active');
  });
});

// The ready view is the only surface that asks whether a start landed, and a
// session read back as running has already left it. So what settles the
// question, and what leaves it open, is asserted on the state that holds it.
describe('what settles an unknown start outcome', () => {
  const UNKNOWN_START: AppState = {
    language: 'en',
    ageBand: '7–8',
    localProfileId: PROFILE_ID,
    status: 'ready',
    setupView: 'handoff',
    saveStatus: 'idle',
    currentSession: READY_SESSION,
    sessionIssue: { operation: 'start', outcome: 'unconfirmed' },
    sessionAttempt: 1,
    unknownStartSessionId: READY_SESSION.sessionId,
  };

  it('is settled by durable evidence, whichever action carries it', () => {
    const resolutions = [
      { type: 'mission-session-started', session: ACTIVE_SESSION },
      { type: 'mission-session-adopted', session: ACTIVE_SESSION },
      { type: 'mission-session-left' },
      {
        type: 'mission-session-transition-failed',
        issue: { operation: 'start', outcome: 'failed' },
      },
    ] as const satisfies readonly Parameters<typeof appStateReducer>[1][];

    for (const action of resolutions) {
      const settled = appStateReducer(UNKNOWN_START, action);

      expect(isStartOutcomeUnknown(settled)).toBe(false);
      expect(settled.unknownStartSessionId).toBeUndefined();
    }
  });

  // The field names a session and is read against the session that is actually
  // current, so a name left over from a Mission that is no longer current
  // answers nothing about the one that is.
  it('answers nothing for a session it does not name', () => {
    expect(
      isStartOutcomeUnknown({
        ...UNKNOWN_START,
        currentSession: { ...READY_SESSION, sessionId: 'session-2' },
      }),
    ).toBe(false);
    expect(
      isStartOutcomeUnknown({ ...UNKNOWN_START, currentSession: undefined }),
    ).toBe(false);
  });

  it('is left open by another operation that established nothing', () => {
    let state: AppState = UNKNOWN_START;

    for (const operation of ['exit', 'ready', 'done', 'result'] as const) {
      for (const outcome of ['failed', 'unconfirmed'] as const) {
        state = appStateReducer(state, {
          type: 'mission-session-transition-failed',
          issue: { operation, outcome },
        });

        expect(isStartOutcomeUnknown(state)).toBe(true);
        expect(state.sessionIssue).toEqual({ operation, outcome });
      }
    }
  });
});
