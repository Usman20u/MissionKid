import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  AppStateProvider,
  type AppState,
} from './appState';
import { MISSION_CATALOG } from './catalogContent';
import { translateMessage, type MessageKey, type SupportedLanguage } from './localization';
import { MissionActive } from './MissionActive';
import type { ActiveMissionSession } from './persistence';

const PROFILE_ID = 'profile-1';
const STARTED_AT = 1_700_000_000_000;

function missionFor(missionId: string) {
  const mission = MISSION_CATALOG.find((record) => record.missionId === missionId);
  if (!mission) throw new Error(`expected ${missionId} in the production catalog`);
  return mission;
}

function activeSession(
  missionId = 'creativity-06',
  overrides: Partial<ActiveMissionSession> = {},
): ActiveMissionSession {
  const mission = missionFor(missionId);

  return {
    sessionId: `session-${missionId}`,
    childProfileId: PROFILE_ID,
    missionId,
    missionCategoryAtSelection: mission.category,
    ageBandAtSelection: '7–8',
    durationSecondsAtSelection: mission.durationSeconds,
    state: 'active',
    selectedAt: STARTED_AT - 60_000,
    startedAt: STARTED_AT,
    ...overrides,
  };
}

function movableClocks(wall: number, monotonic = 0) {
  const readings = { wall, monotonic };

  return {
    readings,
    clocks: {
      now: () => readings.wall,
      monotonic: () => readings.monotonic,
    },
    pass(milliseconds: number) {
      readings.wall += milliseconds;
      readings.monotonic += milliseconds;
      act(() => {
        vi.advanceTimersByTime(milliseconds);
      });
    },
  };
}

function renderActive(
  session: ActiveMissionSession | null,
  clocks: ReturnType<typeof movableClocks>['clocks'],
  language: SupportedLanguage = 'en',
) {
  const state = {
    language,
    ageBand: '7–8',
    localProfileId: PROFILE_ID,
    status: 'ready',
    setupView: 'handoff',
    saveStatus: 'idle',
    ...(session ? { currentSession: session } : {}),
  } as AppState;

  return render(
    <AppStateProvider initialState={state}>
      <MissionActive clocks={clocks} />
    </AppStateProvider>,
  );
}

function t(key: MessageKey, language: SupportedLanguage = 'en') {
  return translateMessage(language, key);
}

function guidanceText(container: HTMLElement) {
  return container.querySelector('.mission-session__guidance')?.textContent ?? null;
}

describe('the running Mission presentation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(['en', 'de', 'ru'] as const)(
    'leads with leaving the screen and keeps the Mission readable in %s',
    (language) => {
      const mission = missionFor('creativity-06');
      const content = mission.content[language];
      const { clocks } = movableClocks(STARTED_AT + 60_000);
      const { container } = renderActive(activeSession(), clocks, language);

      // What to do now, then what the Mission is, then the guidance the family
      // read before starting, then approximate time as support.
      expect(screen.getByText(t('session.active.away', language))).toBeTruthy();
      expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(content.title);
      expect(screen.getByText(content.instruction)).toBeTruthy();
      expect(
        screen.getByText(translateMessage(language, 'discovery.adult.nearby')),
      ).toBeTruthy();
      expect(screen.getByText(content.adultInvolvementNote!)).toBeTruthy();
      expect(
        screen.getByText(translateMessage(language, 'session.active.safetyLabel')),
      ).toBeTruthy();
      expect(screen.getByText(content.safetyNote!)).toBeTruthy();
      expect(guidanceText(container)).toBe(
        translateMessage(language, 'session.active.remaining').replace('{minutes}', '4'),
      );
      // A translation that lost its placeholder would still satisfy the
      // comparison above, because the substitution would be a no-op on both
      // sides; the minutes have to actually reach the family.
      expect(guidanceText(container)).toContain('4');
      expect(guidanceText(container)).not.toContain('{');

      const order = [...container.querySelectorAll('p, h2')].map((node) => node.className);
      expect(order[0]).toContain('mission-session__away');
      expect(order[1]).toContain('mission-session__mission');
      expect(order[2]).toContain('mission-session__instruction');
      expect(order.at(-1)).toContain('mission-session__guidance');
    },
  );

  it.each([
    ['an adult who must take part', 'helping-03', 'discovery.adult.participation', true],
    ['a Mission needing no adult, with safety guidance', 'movement-02', null, true],
    ['a Mission needing neither', 'calm-07', null, false],
  ] as const)('keeps %s readable in words', (_label, missionId, adultKey, safety) => {
    const content = missionFor(missionId).content.en;
    const { clocks } = movableClocks(STARTED_AT + 60_000);
    const { container } = renderActive(activeSession(missionId), clocks);

    // Whatever the Mission actually requires is shown in full text, never
    // behind a disclosure or an ellipsis; what it does not require is absent
    // rather than stated as nothing.
    expect(screen.getByText(content.instruction)).toBeTruthy();

    if (adultKey) {
      expect(screen.getByText(t(adultKey))).toBeTruthy();
      expect(screen.getByText(content.adultInvolvementNote!)).toBeTruthy();
    } else {
      expect(container.querySelector('.mission-session__note--adult')).toBeNull();
    }

    if (safety) {
      expect(screen.getByText(t('session.active.safetyLabel'))).toBeTruthy();
      expect(screen.getByText(content.safetyNote!)).toBeTruthy();
    } else {
      expect(container.querySelector('.mission-session__note--safety')).toBeNull();
    }

    expect(container.textContent).not.toContain('…');
    expect(container.querySelector('details, [hidden]')).toBeNull();
  });

  it('recovers a Mission that started earlier at its real remaining time', () => {
    const { clocks } = movableClocks(STARTED_AT + 200_000);
    const { container } = renderActive(activeSession(), clocks);

    // Five minutes long, three and a third elapsed: recovery shows what is
    // left, not the full duration again.
    expect(guidanceText(container)).toBe('About 2 min left');
  });

  it('follows elapsed time without repeating itself every second', () => {
    const { clocks, pass } = movableClocks(STARTED_AT + 120_000);
    const { container } = renderActive(activeSession(), clocks);

    expect(guidanceText(container)).toBe('About 3 min left');

    // A second passes: the wording is approximate, so it does not change, and
    // there is nothing for a screen reader to announce.
    pass(1_000);
    expect(guidanceText(container)).toBe('About 3 min left');

    pass(60_000);
    expect(guidanceText(container)).toBe('About 2 min left');

    pass(100_000);
    expect(guidanceText(container)).toBe('Less than a minute left');
  });

  it('rests at zero with neutral wording and the Mission still running', () => {
    const session = activeSession();
    const { clocks, pass } = movableClocks(STARTED_AT + 300_000 - 2_000);
    const { container } = renderActive(session, clocks);

    expect(guidanceText(container)).toBe('Less than a minute left');

    pass(2_000);

    // Zero is a resting state: neutral wording, nothing scheduled, no failure,
    // no overtime, and the same Mission still in front of the family.
    expect(guidanceText(container)).toBe(t('session.active.zero'));
    expect(vi.getTimerCount()).toBe(0);
    expect(screen.getByRole('heading', { level: 2 }).textContent)
      .toBe(missionFor('creativity-06').content.en.title);

    pass(600_000);
    expect(guidanceText(container)).toBe(t('session.active.zero'));
    expect(session.startedAt).toBe(STARTED_AT);
  });

  it('recalculates from the timestamps when the family comes back to the page', () => {
    const { clocks, readings } = movableClocks(STARTED_AT + 60_000);
    const { container } = renderActive(activeSession(), clocks);

    expect(guidanceText(container)).toBe('About 4 min left');

    // Three minutes pass with the page hidden; the timestamps account for them.
    readings.wall += 180_000;
    readings.monotonic += 180_000;
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(guidanceText(container)).toBe('About 1 min left');
  });

  it('uses one scheduled tick and no clock of its own', () => {
    const { clocks } = movableClocks(STARTED_AT);

    renderActive(activeSession(), clocks);

    // The derivation and its schedule are owned once; this view starts no
    // second countdown.
    expect(vi.getTimerCount()).toBe(1);
  });

  it.each([
    ['a malformed duration', { durationSecondsAtSelection: 0 }, STARTED_AT + 10_000],
    ['a wall clock earlier than the start', {}, STARTED_AT - 5_000],
  ] as const)('reads zero for %s while the Mission stays whole', (_label, overrides, wall) => {
    const session = activeSession('creativity-06', overrides);
    const { clocks } = movableClocks(wall);
    const { container } = renderActive(session, clocks);

    expect(guidanceText(container)).toBe(t('session.active.zero'));
    // The Mission itself is untouched: its instruction, guidance and stored
    // facts are all still there, and no duration is invented for it.
    expect(screen.getByText(missionFor('creativity-06').content.en.instruction)).toBeTruthy();
    expect(screen.getByText(missionFor('creativity-06').content.en.safetyNote!)).toBeTruthy();
    expect(session.durationSecondsAtSelection).toBe(
      'durationSecondsAtSelection' in overrides ? 0 : 300,
    );
    expect(container.textContent).not.toMatch(/\d/);
  });

  it('says so calmly when the clock cannot be read, keeping what is known', () => {
    const { clocks } = movableClocks(Number.NaN);
    const { container } = renderActive(activeSession(), clocks);

    expect(container.textContent).toContain(t('session.active.timingUnavailable'));
    // The duration the session recorded is still worth knowing, and it is that
    // session's own stored value.
    expect(container.textContent).toContain('About 5 min');
    expect(screen.getByText(missionFor('creativity-06').content.en.instruction)).toBeTruthy();
  });

  it('invents no duration for a malformed one when the clock cannot be read', () => {
    const { clocks } = movableClocks(Number.NaN);
    const { container } = renderActive(
      activeSession('creativity-06', { durationSecondsAtSelection: 0 }),
      clocks,
    );

    // The catalog says five minutes; the session's stored duration says nothing
    // usable, and nothing fills that gap.
    expect(container.textContent).not.toContain('5');
    expect(guidanceText(container)).toBe(t('session.active.zero'));
  });

  it.each([
    ['a Mission the catalog no longer carries', { missionId: 'movement-99' }],
    ['a Mission no longer approved for its own context', { ageBandAtSelection: '9–10' as const }],
    ['an impossible start timestamp', { startedAt: 1.5 }],
  ])('does not present %s as an ordinary running Mission', (_label, overrides) => {
    const { clocks } = movableClocks(STARTED_AT + 60_000);
    const { container } = renderActive(
      activeSession('creativity-06', overrides),
      clocks,
    );

    expect(screen.getByText(t('session.active.missionUnavailable'))).toBeTruthy();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(container.querySelector('.mission-session__guidance')).toBeNull();
    expect(container.querySelector('.mission-session__note')).toBeNull();
    expect(screen.queryByText(t('session.active.zero'))).toBeNull();
    expect(screen.queryByText(t('session.active.away'))).toBeNull();
  });

  it('adds no control, alarm or centrepiece to the running Mission', () => {
    const { clocks, pass } = movableClocks(STARTED_AT + 290_000);
    const { container } = renderActive(activeSession(), clocks);

    // Finishing is the one dominant action and comes first; the approved way
    // out stands beside it and stays secondary.
    const actions = screen.getAllByRole('button');
    expect(actions.map((action) => action.textContent)).toEqual([
      t('session.action.done'),
      t('session.action.leave'),
    ]);
    expect(actions[0]!.className).toContain('button--primary');
    expect(actions[1]!.className).toContain('button--secondary');
    expect(
      actions.filter((action) => action.className.includes('button--primary')),
    ).toHaveLength(1);
    expect(container.querySelector('[role="timer"], [aria-live], progress')).toBeNull();
    expect(container.textContent).not.toMatch(/\d+:\d\d/);
    // Recognition and progress belong to the result, never to the Mission that
    // is still running, and nothing here threatens or hurries.
    expect(
      screen.queryByText(/Reward|Monthly Goal|missions|failed|overtime|hurry/i),
    ).toBeNull();

    pass(20_000);
    // Crossing zero changes the wording and nothing else: completing is offered
    // on exactly the same terms before and after zero.
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(container.querySelector('[aria-live]')).toBeNull();
  });

  it('writes nothing, and changes nothing about the session, while it runs', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem');
    const session = activeSession();
    const before = JSON.stringify(session);
    const { clocks, pass, readings } = movableClocks(STARTED_AT + 10_000);

    renderActive(session, clocks);
    pass(120_000);
    readings.wall += 60_000;
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
      window.dispatchEvent(new Event('focus'));
    });
    pass(300_000);

    expect(setItem).not.toHaveBeenCalled();
    expect(removeItem).not.toHaveBeenCalled();
    // No restart, no moved timestamp, no completion fact of any kind.
    expect(JSON.stringify(session)).toBe(before);
    setItem.mockRestore();
    removeItem.mockRestore();
  });

  it('does not take focus on a tick, at zero, or on an ordinary rerender', () => {
    const { clocks, pass } = movableClocks(STARTED_AT + 290_000);
    const heading = document.createElement('h1');
    heading.tabIndex = -1;
    document.body.append(heading);
    const { rerender } = renderActive(activeSession(), clocks);

    heading.focus();
    expect(document.activeElement).toBe(heading);

    pass(5_000);
    expect(document.activeElement).toBe(heading);

    // Through zero, and through a rerender that changes nothing.
    pass(20_000);
    expect(document.activeElement).toBe(heading);
    rerender(
      <AppStateProvider initialState={{ language: 'en', ageBand: '7–8', localProfileId: PROFILE_ID,
        status: 'ready', setupView: 'handoff', saveStatus: 'idle',
        currentSession: activeSession() } as AppState}>
        <MissionActive clocks={clocks} />
      </AppStateProvider>,
    );
    expect(document.activeElement).toBe(heading);
    heading.remove();
  });

  it('shows nothing for a session that is not running', () => {
    const { clocks } = movableClocks(STARTED_AT);
    const { container } = renderActive(null, clocks);

    expect(container.querySelector('.mission-session')).toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });
});
