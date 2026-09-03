import { Component, type PropsWithChildren } from 'react';

import { useAppState, type AppState } from './appState';
import {
  DEFAULT_LANGUAGE,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';

export type AppView =
  | 'pending'
  | 'setup-first-use'
  | 'setup-incomplete'
  | 'setup-editing'
  | 'temporary-mode'
  | 'recovery'
  | 'setup-complete-handoff';

type ViewContent = Readonly<{
  context: MessageKey;
  title: MessageKey;
}>;

const VIEW_CONTENT: Record<AppView, ViewContent> = {
  pending: {
    context: 'app.brand',
    title: 'view.pending.title',
  },
  'setup-first-use': {
    context: 'area.parent',
    title: 'view.setupFirstUse.title',
  },
  'setup-incomplete': {
    context: 'area.parent',
    title: 'view.setupIncomplete.title',
  },
  'setup-editing': {
    context: 'area.parent',
    title: 'view.setupEditing.title',
  },
  'temporary-mode': {
    context: 'area.parent',
    title: 'view.temporaryMode.title',
  },
  recovery: {
    context: 'area.parent',
    title: 'view.recovery.title',
  },
  'setup-complete-handoff': {
    context: 'area.parent',
    title: 'view.setupCompleteHandoff.title',
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
        <p className="app-shell__brand">
          {translateMessage(state.language, 'app.brand')}
        </p>
      </header>
      <main className="app-shell__main">
        <section aria-labelledby={headingId} data-view={view}>
          <p className="app-view__context">
            {translateMessage(state.language, content.context)}
          </p>
          <h1 className="app-view__title" id={headingId}>
            {translateMessage(state.language, content.title)}
          </h1>
        </section>
      </main>
    </div>
  );
}

type ErrorBoundaryState = {
  failed: boolean;
};

type ApplicationErrorBoundaryProps = PropsWithChildren<{
  language?: SupportedLanguage;
}>;

export class ApplicationErrorBoundary extends Component<
  ApplicationErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      const language = this.props.language ?? DEFAULT_LANGUAGE;

      return (
        <main className="app-shell__main">
          <section aria-labelledby="application-error-heading">
            <p className="app-view__context">
              {translateMessage(language, 'app.brand')}
            </p>
            <h1 className="app-view__title" id="application-error-heading">
              {translateMessage(language, 'error.unexpected.title')}
            </h1>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
