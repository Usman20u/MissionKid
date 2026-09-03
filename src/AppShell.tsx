import { Component, type PropsWithChildren } from 'react';

import { useAppState, type AppState } from './appState';

export type AppView =
  | 'pending'
  | 'setup-first-use'
  | 'setup-incomplete'
  | 'setup-editing'
  | 'temporary-mode'
  | 'recovery'
  | 'setup-complete-handoff';

type ViewContent = Readonly<{
  context: string;
  title: string;
}>;

const VIEW_CONTENT: Record<AppView, ViewContent> = {
  pending: {
    context: 'MissionKid',
    title: 'Preparing MissionKid',
  },
  'setup-first-use': {
    context: 'Parent area',
    title: 'Parent setup',
  },
  'setup-incomplete': {
    context: 'Parent area',
    title: 'Parent setup needs attention',
  },
  'setup-editing': {
    context: 'Parent area',
    title: 'Setup settings',
  },
  'temporary-mode': {
    context: 'Parent area',
    title: 'Temporary mode',
  },
  recovery: {
    context: 'Parent area',
    title: 'Recovery needed',
  },
  'setup-complete-handoff': {
    context: 'Parent area',
    title: 'Setup complete',
  },
};

export function selectAppView(state: AppState): AppView {
  switch (state.status) {
    case 'pending':
      return 'pending';
    case 'degraded':
      return 'temporary-mode';
    case 'blocked-recovery':
      return 'recovery';
    case 'ready': {
      switch (state.setupStatus) {
        case 'fresh':
          return 'setup-first-use';
        case 'incomplete':
          return 'setup-incomplete';
        case 'complete':
          return state.setupView === 'editing'
            ? 'setup-editing'
            : 'setup-complete-handoff';
      }
    }
  }
}

export function AppShell() {
  const { state } = useAppState();
  const view = selectAppView(state);
  const content = VIEW_CONTENT[view];
  const headingId = 'current-view-heading';

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <p className="app-shell__brand">MissionKid</p>
      </header>
      <main className="app-shell__main">
        <section aria-labelledby={headingId} data-view={view}>
          <p className="app-view__context">{content.context}</p>
          <h1 className="app-view__title" id={headingId}>
            {content.title}
          </h1>
        </section>
      </main>
    </div>
  );
}

type ErrorBoundaryState = {
  failed: boolean;
};

export class ApplicationErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="app-shell__main">
          <section aria-labelledby="application-error-heading">
            <p className="app-view__context">MissionKid</p>
            <h1 className="app-view__title" id="application-error-heading">
              MissionKid needs attention
            </h1>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
