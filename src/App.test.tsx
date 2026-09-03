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

type ShellScenario = {
  name: string;
  state: AppState;
  view: string;
  title: string;
};

const shellScenarios: ShellScenario[] = [
  {
    name: 'fresh setup',
    state: { language: 'en', status: 'ready', setupStatus: 'fresh' },
    view: 'setup-first-use',
    title: 'Parent setup',
  },
  {
    name: 'incomplete setup',
    state: { language: 'en', status: 'ready', setupStatus: 'incomplete' },
    view: 'setup-incomplete',
    title: 'Parent setup needs attention',
  },
  {
    name: 'valid hydrated setup',
    state: {
      language: 'en',
      status: 'ready',
      setupStatus: 'complete',
      setupView: 'handoff',
    },
    view: 'setup-complete-handoff',
    title: 'Setup complete',
  },
  {
    name: 'setup editing',
    state: {
      language: 'en',
      status: 'ready',
      setupStatus: 'complete',
      setupView: 'editing',
    },
    view: 'setup-editing',
    title: 'Setup settings',
  },
  {
    name: 'pending state',
    state: { language: 'en', status: 'pending' },
    view: 'pending',
    title: 'Preparing MissionKid',
  },
  {
    name: 'degraded state',
    state: { language: 'en', status: 'degraded' },
    view: 'temporary-mode',
    title: 'Temporary mode',
  },
  {
    name: 'blocked recovery',
    state: { language: 'en', status: 'blocked-recovery' },
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
          status: 'ready',
          setupStatus: 'complete',
          setupView: 'handoff',
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
          status: 'ready',
          setupStatus: 'fresh',
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

    expect(screen.queryByRole('button')).toBeNull();
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
  it('publishes only a validated resolved application state', () => {
    const resolvedState: ResolvedAppState = {
      language: 'en',
      status: 'ready',
      setupStatus: 'fresh',
    };

    expect(
      appStateReducer(
        { language: 'en', status: 'pending' },
        { type: 'validated-state-received', state: resolvedState },
      ),
    ).toEqual(resolvedState);
  });

  it('returns to pending while application state is loading', () => {
    expect(
      appStateReducer(
        { language: 'ru', status: 'ready', setupStatus: 'fresh' },
        { type: 'state-load-started' },
      ),
    ).toEqual({ language: 'ru', status: 'pending' });
  });
});
