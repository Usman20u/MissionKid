import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';
import { ApplicationErrorBoundary, AppShell } from './AppShell';
import {
  AppStateProvider,
  appStateReducer,
  useAppState,
  type AppState,
  type ResolvedAppState,
} from './appState';
import { createEmptySnapshot } from './persistence';

type ShellScenario = {
  name: string;
  state: AppState;
  view: string;
  title: string;
};

const shellScenarios: ShellScenario[] = [
  {
    name: 'fresh setup',
    state: {
      language: 'en',
      ageBand: null,
      localProfileId: null,
      status: 'ready',
      setupView: 'first-use',
      saveStatus: 'idle',
    },
    view: 'setup-first-use',
    title: 'Parent setup',
  },
  {
    name: 'incomplete setup',
    state: {
      language: 'en',
      ageBand: null,
      localProfileId: null,
      status: 'ready',
      setupView: 'incomplete',
      saveStatus: 'idle',
    },
    view: 'setup-incomplete',
    title: 'Parent setup needs attention',
  },
  {
    name: 'valid hydrated setup',
    state: {
      language: 'en',
      ageBand: '7–8',
      localProfileId: 'local-profile-1',
      status: 'ready',
      setupView: 'handoff',
      saveStatus: 'idle',
    },
    view: 'setup-complete-handoff',
    title: 'Setup complete',
  },
  {
    name: 'setup editing',
    state: {
      language: 'en',
      ageBand: '7–8',
      localProfileId: 'local-profile-1',
      status: 'ready',
      setupView: 'editing',
      saveStatus: 'idle',
    },
    view: 'setup-editing',
    title: 'Setup settings',
  },
  {
    name: 'pending state',
    state: {
      language: 'en',
      ageBand: null,
      localProfileId: null,
      status: 'pending',
    },
    view: 'pending',
    title: 'Preparing MissionKid',
  },
  {
    name: 'degraded state',
    state: {
      language: 'en',
      ageBand: null,
      localProfileId: null,
      status: 'degraded',
    },
    view: 'temporary-mode',
    title: 'Temporary mode',
  },
  {
    name: 'blocked recovery',
    state: {
      language: 'en',
      ageBand: null,
      localProfileId: null,
      status: 'blocked-recovery',
    },
    view: 'recovery',
    title: 'Recovery needed',
  },
];

describe('application shell', () => {
  it.each(shellScenarios)('selects the $name view', ({ state, title, view }) => {
    render(<App initialState={state} />);

    const region = screen.getByRole('region', { name: title });

    expect(region.getAttribute('data-view')).toBe(view);
  });

  it('renders fresh setup deterministically by default', () => {
    render(<App />);

    expect(
      screen.getByRole('region', { name: 'Parent setup' }),
    ).toBeTruthy();
  });

  it('re-resolves presentation when the supported language changes', () => {
    let changeLanguage = () => undefined;

    function LanguageChangeHarness() {
      const { dispatch } = useAppState();

      changeLanguage = () => {
        dispatch({ type: 'language-changed', language: 'de' });
      };

      return <AppShell />;
    }

    render(
      <AppStateProvider
        initialState={{
          language: 'en',
          ageBand: '7–8',
          localProfileId: 'local-profile-1',
          status: 'ready',
          setupView: 'handoff',
          saveStatus: 'idle',
        }}
      >
        <LanguageChangeHarness />
      </AppStateProvider>,
    );

    expect(
      screen.getByRole('region', { name: 'Setup complete' }),
    ).toBeTruthy();

    act(() => {
      changeLanguage();
    });

    const localizedRegion = screen.getByRole('region', {
      name: 'Einrichtung abgeschlossen',
    });

    expect(localizedRegion.getAttribute('data-view')).toBe(
      'setup-complete-handoff',
    );
  });

  it('renders Russian shell text with matching document language', () => {
    render(
      <App
        initialState={{
          language: 'ru',
          ageBand: null,
          localProfileId: null,
          status: 'ready',
          setupView: 'first-use',
          saveStatus: 'idle',
        }}
      />,
    );

    expect(
      screen.getByRole('region', { name: 'Настройка для родителей' }),
    ).toBeTruthy();
    expect(screen.getByText('Раздел для родителей')).toBeTruthy();
    expect(document.documentElement.lang).toBe('ru');
  });

  it('contains no later-function interface', () => {
    render(<App />);

    expect(screen.queryByText('Mission Category')).toBeNull();
    expect(screen.queryByText('Mission done')).toBeNull();
    expect(screen.queryByText('Mission History')).toBeNull();
    expect(screen.queryByText('Monthly Goal')).toBeNull();
  });

  it('contains unexpected render failures at the application boundary', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    function BrokenView(): never {
      throw new Error('test render failure');
    }

    try {
      render(
        <ApplicationErrorBoundary>
          <BrokenView />
        </ApplicationErrorBoundary>,
      );

      expect(
        screen.getByRole('heading', {
          name: 'MissionKid needs attention',
        }),
      ).toBeTruthy();
    } finally {
      consoleError.mockRestore();
    }
  });
});

describe('application state reducer', () => {
  it('cannot treat a profile with identity but no valid age as completed setup', () => {
    const state: AppState = {
      language: 'en', ageBand: null, localProfileId: 'existing-profile',
      status: 'ready', setupView: 'incomplete', saveStatus: 'unconfirmed',
    };
    expect(appStateReducer(state, {
      type: 'setup-save-confirmed',
      snapshot: {
        ...createEmptySnapshot(),
        childProfile: { localProfileId: 'existing-profile', ageBand: null },
      },
    })).toEqual(state);
  });

  it('publishes only a validated resolved application state', () => {
    const resolvedState: ResolvedAppState = {
      language: 'en',
      ageBand: null,
      localProfileId: null,
      status: 'ready',
      setupView: 'first-use',
      saveStatus: 'idle',
    };

    expect(
      appStateReducer(
        {
          language: 'en',
          ageBand: null,
          localProfileId: null,
          status: 'pending',
        },
        { type: 'validated-state-received', state: resolvedState },
      ),
    ).toEqual(resolvedState);
  });

  it('returns to pending while application state is loading', () => {
    expect(
      appStateReducer(
        {
          language: 'ru',
          ageBand: null,
          localProfileId: null,
          status: 'ready',
          setupView: 'first-use',
          saveStatus: 'idle',
        },
        { type: 'state-load-started' },
      ),
    ).toEqual({
      language: 'ru',
      ageBand: null,
      localProfileId: null,
      status: 'pending',
    });
  });
});
