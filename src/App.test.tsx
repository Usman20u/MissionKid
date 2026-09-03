import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';
import { ApplicationErrorBoundary } from './AppShell';
import {
  appStateReducer,
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
    state: { status: 'ready', setupStatus: 'fresh' },
    view: 'setup-first-use',
    title: 'Parent setup',
  },
  {
    name: 'incomplete setup',
    state: { status: 'ready', setupStatus: 'incomplete' },
    view: 'setup-incomplete',
    title: 'Parent setup needs attention',
  },
  {
    name: 'valid hydrated setup',
    state: {
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
      status: 'ready',
      setupStatus: 'complete',
      setupView: 'editing',
    },
    view: 'setup-editing',
    title: 'Setup settings',
  },
  {
    name: 'pending state',
    state: { status: 'pending' },
    view: 'pending',
    title: 'Preparing MissionKid',
  },
  {
    name: 'degraded state',
    state: { status: 'degraded' },
    view: 'temporary-mode',
    title: 'Temporary mode',
  },
  {
    name: 'blocked recovery',
    state: { status: 'blocked-recovery' },
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
      status: 'ready',
      setupStatus: 'fresh',
    };

    expect(
      appStateReducer(
        { status: 'pending' },
        { type: 'validated-state-received', state: resolvedState },
      ),
    ).toEqual(resolvedState);
  });

  it('returns to pending while application state is loading', () => {
    expect(
      appStateReducer(
        { status: 'ready', setupStatus: 'fresh' },
        { type: 'state-load-started' },
      ),
    ).toEqual({ status: 'pending' });
  });
});
