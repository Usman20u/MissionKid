import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';
import { selectAppView } from './AppShell';
import { AppStateProvider, type AppState } from './appState';
import { MISSION_CATALOG } from './catalogContent';
import { translateMessage, type SupportedLanguage } from './localization';
import { MissionHistory } from './MissionHistory';
import { completionPeriodLabel, deriveMissionHistory } from './missionProgress';
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

// A fixed "now" inside March 2024, and completions placed around it.
const NOW = new Date(2024, 2, 20, 9, 0).getTime();
const CURRENT_PERIOD = '2024-03';
const now = () => NOW;

// One stored completion. The selection and start moments follow the completion
// moment, so a record placed in an earlier month stays internally consistent and
// survives snapshot validation. A Mission the catalog no longer carries keeps the
// category the session recorded, which is exactly the case History must survive.
function completion(
  overrides: Readonly<Record<string, unknown>> & { sessionId: string; missionId?: string },
) {
  const missionId = overrides.missionId ?? 'movement-02';
  const mission = MISSION_CATALOG.find((record) => record.missionId === missionId);
  const completedAt = (overrides.completedAt as number | undefined) ?? NOW - 400_000;

  return {
    childProfileId: PROFILE_ID,
    missionId,
    missionCategoryAtSelection: mission?.category ?? 'Movement',
    ageBandAtSelection: '7–8',
    durationSecondsAtSelection: mission?.durationSeconds ?? 240,
    state: 'completed',
    selectedAt: completedAt - 300_000,
    startedAt: completedAt - 240_000,
    completedAt,
    completionPeriodId: CURRENT_PERIOD,
    ...overrides,
  } as Record<string, unknown>;
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

  const writes: string[] = [];

  const storage: SnapshotStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem(key, value) {
      writes.push(value);
      values.set(key, value);
    },
    removeItem: (key) => void values.delete(key),
  };

  return {
    values,
    writes,
    adapter: createPersistenceAdapter(storage),
    stored: () => JSON.parse(values.get(MISSIONKID_STORAGE_KEY)!),
  };
}

function t(key: Parameters<typeof translateMessage>[1], language: SupportedLanguage = 'en') {
  return translateMessage(language, key);
}

function heading() {
  return screen.getByRole('heading', { level: 1 });
}

function openHistory(language: SupportedLanguage = 'en') {
  fireEvent.click(
    screen.getByRole('button', { name: t('history.action.open', language) }),
  );
}

function entryTitles() {
  return [...document.querySelectorAll('.mission-history__entry-title')].map(
    (node) => node.textContent,
  );
}

function progressText() {
  return document.querySelector('.mission-history__goal-progress')?.textContent ?? null;
}

function renderApp(extra: Record<string, unknown> = {}, language: SupportedLanguage = 'en') {
  const h = harness(storedSnapshot(extra, language));
  render(<App adapter={h.adapter} now={now} />);
  return h;
}

describe('reaching the private record', () => {
  it('opens from the setup-complete handoff and returns to Mission Category Selection', () => {
    renderApp();

    expect(heading().textContent).toBe(t('view.setupCompleteHandoff.title'));
    openHistory();

    expect(heading().textContent).toBe(t('view.history.title'));

    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));

    expect(heading().textContent).toBe(t('view.discovery.title'));
  });

  it('opens from Discovery alongside the settings entry, outside the Mission cards', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));
    fireEvent.click(screen.getByRole('radio', { name: 'Movement' }));

    // Beside the settings entry, and in neither of the Mission cards.
    const exits = document.querySelector('.mission-discovery__exits')!;
    expect([...exits.querySelectorAll('button')].map((b) => b.textContent)).toEqual([
      t('history.action.open'),
      t('setup.action.edit'),
    ]);
    for (const card of screen.getAllByRole('article')) {
      expect(card.textContent).not.toContain(t('history.action.open'));
    }

    openHistory();
    expect(heading().textContent).toBe(t('view.history.title'));
  });

  // The one primary action on each surface stays the one primary action.
  it('is secondary wherever it appears', () => {
    renderApp();

    const fromHandoff = screen.getByRole('button', { name: t('history.action.open') });
    expect(fromHandoff.className).toContain('button--secondary');
    expect(
      screen.getByRole('button', { name: t('discovery.action.open') }).className,
    ).toContain('button--primary');

    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));
    expect(
      screen.getByRole('button', { name: t('history.action.open') }).className,
    ).toContain('button--secondary');
  });

  // The route the family actually takes after finishing a Mission.
  it('is reachable straight after a confirmed Reward Card exit, with no reload or settings edit', () => {
    const h = renderApp({
      completedSessions: [completion({ sessionId: 'session-done' })],
      currentResultSessionId: 'session-done',
    });

    expect(heading().textContent).toBe(t('view.sessionResult.title'));
    fireEvent.click(screen.getByRole('button', { name: t('result.action.next') }));
    expect(heading().textContent).toBe(t('view.discovery.title'));

    const writesBefore = h.writes.length;
    openHistory();

    expect(heading().textContent).toBe(t('view.history.title'));
    expect(entryTitles()).toEqual([missionFor('movement-02').content.en.title]);
    // Reaching the record is navigation, not a durable change.
    expect(h.writes).toHaveLength(writesBefore);
  });

  it('leaves a stored session and an open result in charge', () => {
    for (const [extra, title] of [
      [{ currentSession: { ...completion({ sessionId: 's' }), state: 'active', completedAt: undefined, completionPeriodId: undefined } }, 'view.sessionActive.title'],
      [{ currentSession: { ...completion({ sessionId: 's' }), state: 'ready', startedAt: undefined, completedAt: undefined, completionPeriodId: undefined } }, 'view.sessionReady.title'],
      [{ completedSessions: [completion({ sessionId: 'session-done' })], currentResultSessionId: 'session-done' }, 'view.sessionResult.title'],
    ] as const) {
      const h = harness(storedSnapshot(extra as Record<string, unknown>));
      const view = render(<App adapter={h.adapter} now={now} />);

      expect(heading().textContent).toBe(t(title));
      // No entry into the record competes with the flow the family is in.
      expect(
        screen.queryByRole('button', { name: t('history.action.open') }),
      ).toBeNull();
      expect(h.writes).toHaveLength(0);
      view.unmount();
    }
  });

  // Navigation is runtime only: nothing about being in the record is written,
  // so a refresh restores the approved state instead of the record.
  it('is not persisted, and a refresh returns to the approved state', () => {
    const h = renderApp({ completedSessions: [completion({ sessionId: 'session-done' })] });

    openHistory();
    expect(heading().textContent).toBe(t('view.history.title'));
    expect(h.writes).toHaveLength(0);
    expect(Object.keys(h.stored()).sort()).toEqual([
      'childProfile',
      'completedSessions',
      'currentResultSessionId',
      'currentSession',
      'settings',
      'snapshotVersion',
    ]);

    render(<App adapter={h.adapter} now={now} />);
    expect(screen.getAllByRole('heading', { level: 1 })[1]!.textContent).toBe(
      t('view.setupCompleteHandoff.title'),
    );
  });

  // `F002`: a discovery cycle ends when the family leaves discovery, and
  // opening the record is leaving it.
  it('ends the discovery cycle it was opened from', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));
    fireEvent.click(screen.getByRole('radio', { name: 'Movement' }));
    const shown = screen
      .getAllByRole('article')
      .map((card) => card.querySelector('.mission-card__title')!.textContent);

    openHistory();
    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));

    // A fresh cycle: no Mission Category chosen, and nothing carried back.
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    fireEvent.click(screen.getByRole('radio', { name: 'Movement' }));
    expect(
      screen
        .getAllByRole('article')
        .map((card) => card.querySelector('.mission-card__title')!.textContent),
    ).toEqual(shown);
  });

  // The entry never appears beside a session or an open result, so this state
  // cannot be reached through the interface. The rule is asserted where it is
  // held, so precedence cannot be reordered without a test saying so.
  it('never outranks a session or an open result, whatever the flag says', () => {
    const base = {
      language: 'en',
      ageBand: '7\u20138',
      localProfileId: PROFILE_ID,
      status: 'ready',
      setupView: 'handoff',
      saveStatus: 'idle',
      history: true,
    };
    const session = completion({ sessionId: 'session-open' });
    const cases = [
      [{ currentSession: { ...session, state: 'active' } }, 'session-active'],
      [{ currentSession: { ...session, state: 'ready' } }, 'session-ready'],
      [{ currentSession: { ...session, state: 'selected' } }, 'session-opening'],
      [
        { completedSessions: [session], currentResultSessionId: 'session-open' },
        'session-result',
      ],
      [{ discovery: { category: null, shown: [] } }, 'discovery-categories'],
      [{}, 'history'],
    ] as const;

    for (const [extra, view] of cases) {
      expect(selectAppView({ ...base, ...extra } as unknown as AppState)).toBe(view);
    }
  });

  it('keeps the destructive reset control off the record', () => {
    renderApp();
    expect(screen.getByRole('button', { name: t('recovery.resetTitle') })).toBeTruthy();

    openHistory();

    expect(screen.queryByRole('button', { name: t('recovery.resetTitle') })).toBeNull();
  });
});

describe('what the private record shows', () => {
  it('orders every completion newest first, across periods', () => {
    renderApp({
      completedSessions: [
        completion({ sessionId: 'b', missionId: 'creativity-06', completedAt: NOW - 200_000 }),
        completion({ sessionId: 'a', missionId: 'calm-02', completedAt: NOW - 9_000_000, completionPeriodId: '2024-02' }),
        completion({ sessionId: 'c', missionId: 'movement-02', completedAt: NOW - 100_000 }),
      ],
    });
    openHistory();

    expect(entryTitles()).toEqual([
      missionFor('movement-02').content.en.title,
      missionFor('creativity-06').content.en.title,
      missionFor('calm-02').content.en.title,
    ]);
  });

  it('breaks an exact tie deterministically', () => {
    renderApp({
      completedSessions: [
        completion({ sessionId: 'session-a', missionId: 'calm-02' }),
        completion({ sessionId: 'session-b', missionId: 'creativity-06' }),
      ],
    });
    openHistory();

    expect(entryTitles()).toEqual([
      missionFor('creativity-06').content.en.title,
      missionFor('calm-02').content.en.title,
    ]);
  });

  it('shows one entry per Mission Session and nothing from another profile', () => {
    renderApp({
      completedSessions: [
        completion({ sessionId: 'mine' }),
        completion({ sessionId: 'theirs', childProfileId: 'profile-2', missionId: 'calm-02' }),
      ],
    });
    openHistory();

    // The other profile's record is excluded at the adapter boundary, so it
    // never reaches the view in the first place.
    expect(entryTitles()).toEqual([missionFor('movement-02').content.en.title]);
  });

  it.each(['en', 'de', 'ru'] as const)(
    'shows only the approved minimum for an entry, in %s',
    (language) => {
      renderApp({ completedSessions: [completion({ sessionId: 'session-done' })] }, language);
      openHistory(language);

      const entry = document.querySelector('.mission-history__entry')!;
      expect(entry.querySelector('.mission-history__entry-title')!.textContent).toBe(
        missionFor('movement-02').content[language].title,
      );
      expect(entry.textContent).toContain(t('discovery.category.movement', language));
      expect(entry.textContent).toContain(t('result.completedOn', language));
      // Nothing beyond title, category and completion context.
      expect(entry.textContent).not.toContain('session-done');
      expect(entry.textContent).not.toMatch(/\d+ min/);
      expect(entry.querySelectorAll('button')).toHaveLength(0);
    },
  );

  // The Mission Category the session froze, not one re-read from the catalog.
  it('shows the Mission Category the completion recorded', () => {
    renderApp({
      completedSessions: [
        completion({ sessionId: 'session-done', missionCategoryAtSelection: 'Calm' }),
      ],
    });
    openHistory();

    expect(document.querySelector('.mission-history__entry-category')!.textContent).toBe(
      t('discovery.category.calm'),
    );
  });

  it.each(['en', 'de', 'ru'] as const)(
    'keeps a completion whose Mission the catalog no longer carries, in %s',
    (language) => {
      const h = renderApp(
        {
          completedSessions: [
            completion({ sessionId: 'session-gone', missionId: 'movement-99' }),
            completion({ sessionId: 'session-here', missionId: 'calm-02', completedAt: NOW - 800_000 }),
          ],
        },
        language,
      );
      openHistory(language);

      expect(entryTitles()).toEqual([
        t('result.missionUnavailable', language),
        missionFor('calm-02').content[language].title,
      ]);
      // Its category, its completion context and its count all survive.
      const entry = document.querySelector('.mission-history__entry')!;
      expect(entry.textContent).toContain(t('discovery.category.movement', language));
      expect(entry.textContent).toContain(t('result.completedOn', language));
      expect(progressText()).toBe(
        t('result.goal.progress', language).replace('{done}', '2').replace('{target}', '20'),
      );
      // And the stored record is untouched.
      expect(h.writes).toHaveLength(0);
      expect(h.stored().completedSessions).toHaveLength(2);
    },
  );

  it.each(['en', 'de', 'ru'] as const)('shows the empty record truthfully in %s', (language) => {
    renderApp({}, language);
    openHistory(language);

    expect(screen.getByText(t('history.empty.body', language))).toBeTruthy();
    expect(document.querySelector('.mission-history__entries')).toBeNull();
    expect(entryTitles()).toEqual([]);
    // The approved route to Mission Category Selection, and no fabricated entry.
    fireEvent.click(
      screen.getByRole('button', { name: t('discovery.action.open', language) }),
    );
    expect(heading().textContent).toBe(t('view.discovery.title', language));
  });

  it('shows the empty state for a profile whose only completions belong to another', () => {
    renderApp({
      completedSessions: [completion({ sessionId: 'theirs', childProfileId: 'profile-2' })],
    });
    openHistory();

    expect(screen.getByText(t('history.empty.body'))).toBeTruthy();
  });

  it('is a plain list, not a feed or a dashboard', () => {
    renderApp({ completedSessions: [completion({ sessionId: 'session-done' })] });
    openHistory();

    expect(screen.getByRole('list').className).toContain('mission-history__entries');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(
      screen.queryByText(/like|share|rank|streak|score|trend|average/i),
    ).toBeNull();
    expect(document.querySelectorAll('img, video, canvas, progress, meter')).toHaveLength(0);
    // One action only: the route back.
    expect(
      [...document.querySelectorAll('.mission-history button')].map((b) => b.textContent),
    ).toEqual([t('discovery.action.open')]);
  });
});

describe("the current month's goal inside the record", () => {
  it('shows zero of twenty for a month with no completions, with the record empty', () => {
    renderApp();
    openHistory();

    expect(document.querySelector('.mission-history__goal')).toBeTruthy();
    expect(progressText()).toBe(
      t('result.goal.progress').replace('{done}', '0').replace('{target}', '20'),
    );
    expect(screen.getByText(t('history.empty.body'))).toBeTruthy();
  });

  it('counts only this local month while the record keeps every period', () => {
    renderApp({
      completedSessions: [
        completion({ sessionId: 'now-1' }),
        completion({ sessionId: 'now-2', missionId: 'calm-02', completedAt: NOW - 300_000 }),
        completion({ sessionId: 'feb', missionId: 'creativity-06', completedAt: NOW - 9_000_000, completionPeriodId: '2024-02' }),
      ],
    });
    openHistory();

    expect(progressText()).toBe(
      t('result.goal.progress').replace('{done}', '2').replace('{target}', '20'),
    );
    expect(entryTitles()).toHaveLength(3);
    expect(document.querySelector('.mission-history__goal-period')!.textContent).toBe(
      completionPeriodLabel(CURRENT_PERIOD, 'en'),
    );
  });

  // Entering again after the calendar turns over shows the new period, and the
  // earlier month's completions stay in the record.
  it('reads the current period on entry, so a rollover shows the new month', () => {
    const h = harness(
      storedSnapshot({
        completedSessions: [
          completion({ sessionId: 'march-1' }),
          completion({ sessionId: 'march-2', missionId: 'calm-02', completedAt: NOW - 300_000 }),
        ],
      }),
    );
    let clock = NOW;
    render(<App adapter={h.adapter} now={() => clock} />);

    openHistory();
    expect(progressText()).toBe(
      t('result.goal.progress').replace('{done}', '2').replace('{target}', '20'),
    );

    // Into April, with nothing completed in it.
    clock = new Date(2024, 3, 2, 9, 0).getTime();
    fireEvent.click(screen.getByRole('button', { name: t('discovery.action.open') }));
    openHistory();

    expect(document.querySelector('.mission-history__goal-period')!.textContent).toBe(
      completionPeriodLabel('2024-04', 'en'),
    );
    expect(progressText()).toBe(
      t('result.goal.progress').replace('{done}', '0').replace('{target}', '20'),
    );
    // The March completions are still in the record, and still stored as March.
    expect(entryTitles()).toHaveLength(2);
    expect(
      h.stored().completedSessions.map((record: { completionPeriodId: string }) => record.completionPeriodId),
    ).toEqual(['2024-03', '2024-03']);
    expect(h.writes).toHaveLength(0);
  });

  it('holds at twenty of twenty while later completions stay in the record', () => {
    const completions = Array.from({ length: 21 }, (_unused, index) =>
      completion({
        sessionId: `session-${String(index).padStart(3, '0')}`,
        completedAt: NOW - 500_000 + index * 1_000,
      }),
    );
    renderApp({ completedSessions: completions });
    openHistory();

    expect(progressText()).toBe(
      t('result.goal.progress').replace('{done}', '20').replace('{target}', '20'),
    );
    expect(entryTitles()).toHaveLength(21);
    // The one encouraging message belongs to the twentieth completion's own
    // Reward Card. Repeating it here would be the second prompt.
    expect(document.querySelector('.mission-history__goal')!.textContent).not.toContain(
      t('result.goal.complete').replace('{period}', completionPeriodLabel(CURRENT_PERIOD, 'en')).slice(0, 20),
    );
  });

  // The record names the month the family is in; a restored card names the
  // month its own completion fixed.
  it('names this month while a restored Reward Card still names its own period', () => {
    const h = harness(
      storedSnapshot({
        completedSessions: [
          completion({ sessionId: 'feb', completedAt: NOW - 9_000_000, completionPeriodId: '2024-02' }),
        ],
        currentResultSessionId: 'feb',
      }),
    );
    render(<App adapter={h.adapter} now={now} />);

    expect(document.querySelector('.mission-result__goal-period')!.textContent).toBe(
      completionPeriodLabel('2024-02', 'en'),
    );

    fireEvent.click(screen.getByRole('button', { name: t('result.action.next') }));
    openHistory();

    expect(document.querySelector('.mission-history__goal-period')!.textContent).toBe(
      completionPeriodLabel(CURRENT_PERIOD, 'en'),
    );
    expect(progressText()).toBe(
      t('result.goal.progress').replace('{done}', '0').replace('{target}', '20'),
    );
    expect(entryTitles()).toHaveLength(1);
  });
});

describe('a record that cannot be shown', () => {
  // A real derivation boundary, failed on demand. There is no production
  // switch: the view's default derivations are the one History and the one
  // progress derivation.
  function failingHarness(language: SupportedLanguage = 'en') {
    const h = harness(
      storedSnapshot(
        { completedSessions: [completion({ sessionId: 'session-done' })] },
        language,
      ),
    );
    let failing = true;
    const deriveHistory = ((completedSessions, childProfileId) => {
      if (failing) throw new Error('PRIVATE DERIVATION FAILURE');
      return deriveMissionHistory(completedSessions, childProfileId);
    }) as typeof deriveMissionHistory;

    const state = {
      language,
      ageBand: '7\u20138',
      localProfileId: PROFILE_ID,
      status: 'ready',
      setupView: 'handoff',
      saveStatus: 'idle',
      completedSessions: JSON.parse(
        h.values.get(MISSIONKID_STORAGE_KEY)!,
      ).completedSessions,
      history: true,
    } as unknown as AppState;

    render(
      <AppStateProvider initialState={state}>
        <MissionHistory deriveHistory={deriveHistory} now={now} />
      </AppStateProvider>,
    );

    return { h, recover: () => { failing = false; } };
  }

  it.each(['en', 'de', 'ru'] as const)(
    'keeps the completions and offers a calm retry in %s',
    (language) => {
      const { h, recover } = failingHarness(language);

      // The display failed; the completions behind it did not.
      expect(screen.getByRole('alert').textContent).toBe(
        t('history.unavailable', language),
      );
      expect(entryTitles()).toEqual([]);
      expect(h.writes).toHaveLength(0);
      expect(h.stored().completedSessions).toHaveLength(1);
      expect(h.stored().completedSessions[0].sessionId).toBe('session-done');
      expect(h.stored().completedSessions[0].completionPeriodId).toBe(CURRENT_PERIOD);

      recover();
      fireEvent.click(
        screen.getByRole('button', { name: t('session.action.retry', language) }),
      );

      // The same record, derived again from the same durable facts.
      expect(screen.queryByRole('alert')).toBeNull();
      expect(entryTitles()).toEqual([
        missionFor('movement-02').content[language].title,
      ]);
      expect(h.writes).toHaveLength(0);
      // Focus follows the family into the record they asked to see again.
      expect(document.activeElement).toBe(
        document.querySelector('.mission-history__goal-heading'),
      );
    },
  );

  it('claims no loss and offers no destructive way out', () => {
    const { h } = failingHarness();

    expect(screen.getByRole('alert').textContent).not.toMatch(/lost|deleted|gone/i);
    expect(
      [...document.querySelectorAll('.mission-history button')].map((b) => b.textContent),
    ).toEqual([t('session.action.retry')]);
    expect(h.writes).toHaveLength(0);
  });
});

describe('what a later change may and may not do to the record', () => {
  const RECORDS = [
    completion({ sessionId: 'newer', missionId: 'creativity-06' }),
    completion({ sessionId: 'older', missionId: 'calm-02', completedAt: NOW - 900_000 }),
  ];

  // Labels and localized dates follow the interface language; order, membership
  // and counts do not.
  it('changes labels and dates with the language, and nothing else', () => {
    const seen: Record<string, { ids: string[]; text: string[]; progress: string | null }> = {};

    for (const language of ['en', 'de', 'ru'] as const) {
      const h = harness(storedSnapshot({ completedSessions: RECORDS }, language));
      const view = render(<App adapter={h.adapter} now={now} />);
      openHistory(language);

      seen[language] = {
        ids: h.stored().completedSessions.map((r: { sessionId: string }) => r.sessionId),
        text: entryTitles() as string[],
        progress: progressText(),
      };
      expect(h.writes).toHaveLength(0);
      view.unmount();
    }

    // The same two Missions in the same order, named in each language.
    expect(seen.en!.text).toEqual([
      missionFor('creativity-06').content.en.title,
      missionFor('calm-02').content.en.title,
    ]);
    expect(seen.de!.text).toEqual([
      missionFor('creativity-06').content.de.title,
      missionFor('calm-02').content.de.title,
    ]);
    expect(seen.ru!.text).toEqual([
      missionFor('creativity-06').content.ru.title,
      missionFor('calm-02').content.ru.title,
    ]);
    // Membership, stored order and the count are identical in all three.
    expect(seen.de!.ids).toEqual(seen.en!.ids);
    expect(seen.ru!.ids).toEqual(seen.en!.ids);
    expect(seen.de!.progress).toBe(
      t('result.goal.progress', 'de').replace('{done}', '2').replace('{target}', '20'),
    );
  });

  // A parent editing the Child Profile's age band does not remove History or
  // reset the goal: the age band each session was chosen under is frozen on it.
  it('keeps every completion when the current age band no longer matches', () => {
    const h = harness(
      JSON.stringify({
        ...createEmptySnapshot(),
        settings: { language: 'en' },
        childProfile: { localProfileId: PROFILE_ID, ageBand: '4–6' },
        currentSession: null,
        completedSessions: RECORDS,
      }),
    );
    render(<App adapter={h.adapter} now={now} />);
    openHistory();

    expect(entryTitles()).toHaveLength(2);
    expect(progressText()).toBe(
      t('result.goal.progress').replace('{done}', '2').replace('{target}', '20'),
    );
    expect(
      h.stored().completedSessions.map((r: { ageBandAtSelection: string }) => r.ageBandAtSelection),
    ).toEqual(['7–8', '7–8']);
    expect(h.writes).toHaveLength(0);
  });
});

describe('the record as a keyboard and screen-structure surface', () => {
  it('moves focus to the view heading once on entry, and keeps a clean outline', () => {
    renderApp({ completedSessions: [completion({ sessionId: 'session-done' })] });

    const entry = screen.getByRole('button', { name: t('history.action.open') });
    entry.focus();
    expect(document.activeElement).toBe(entry);
    fireEvent.keyDown(entry, { key: 'Enter' });
    fireEvent.click(entry);

    expect(document.activeElement).toBe(heading());
    expect(heading().textContent).toBe(t('view.history.title'));

    // One level-1 heading, and the goal section at level 2 directly under it:
    // no level is skipped.
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const levels = [...document.querySelectorAll('h1, h2, h3, h4')].map(
      (node) => node.tagName,
    );
    expect(levels).toEqual(['H1', 'H2']);
    expect(document.querySelector('.mission-history__goal-heading')!.id).toBe(
      'history-goal-heading',
    );
    expect(
      document.querySelector('.mission-history__goal')!.getAttribute('aria-labelledby'),
    ).toBe('history-goal-heading');
  });

  it('announces the record by the name the view already carries', () => {
    renderApp({ completedSessions: [completion({ sessionId: 'session-done' })] });
    openHistory();

    const list = screen.getByRole('list');
    expect(list.getAttribute('aria-labelledby')).toBe('current-view-heading');
    expect(document.getElementById('current-view-heading')!.textContent).toBe(
      t('view.history.title'),
    );
  });

  it('carries the local calendar day behind each localized date', () => {
    const completedAt = new Date(2024, 2, 18, 22, 30).getTime();
    renderApp({
      completedSessions: [completion({ sessionId: 'session-done', completedAt })],
    });
    openHistory();

    const stamp = document.querySelector('time.mission-history__entry-completed')!;
    // The local day, not the UTC one a bare ISO string would name.
    expect(stamp.getAttribute('dateTime')).toBe('2024-03-18');
    expect(stamp.textContent).toContain(t('result.completedOn'));
  });

  it('offers every control as a native, keyboard-reachable button', () => {
    renderApp({ completedSessions: [completion({ sessionId: 'session-done' })] });
    openHistory();

    const controls = [
      ...document.querySelectorAll<HTMLButtonElement>('.mission-history button'),
    ];
    expect(controls).toHaveLength(1);
    for (const control of controls) {
      expect(control.tagName).toBe('BUTTON');
      expect(control.getAttribute('type')).toBe('button');
      expect(control.hasAttribute('disabled')).toBe(false);
      control.focus();
      expect(document.activeElement).toBe(control);
    }
  });
});
