import { Component, type PropsWithChildren } from 'react';
import { flushSync } from 'react-dom';
import { resetSetup } from './setup';

import {
  isSetupContextComplete,
  useAppState,
  type AppState,
} from './appState';
import {
  DEFAULT_LANGUAGE,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import {
  createLocalProfileId,
  SetupFlow,
  type LocalProfileIdFactory,
} from './SetupFlow';
import {
  persistenceAdapter,
  type PersistenceAdapter,
} from './persistence';

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
      switch (state.setupView) {
        case 'first-use':
          return 'setup-first-use';
        case 'incomplete':
          return 'setup-incomplete';
        case 'editing':
          return 'setup-editing';
        case 'handoff':
          return isSetupContextComplete(state)
            ? 'setup-complete-handoff'
            : 'setup-incomplete';
      }
    }
  }
}

type AppShellProps = Readonly<{
  adapter?: PersistenceAdapter;
  createProfileId?: LocalProfileIdFactory;
}>;

export function AppShell({
  adapter = persistenceAdapter,
  createProfileId = createLocalProfileId,
}: AppShellProps = {}) {
  const { state, dispatch } = useAppState();
  const view = selectAppView(state);
  const content = VIEW_CONTENT[view];
  const headingId = 'current-view-heading';
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const busy = !!state.operation || state.status === 'pending';

  function retry() {
    if (busy) return;
    flushSync(() => dispatch({ type: 'operation-started', operation: 'retry' }));
    dispatch({ type: 'storage-retried', result: adapter.hydrate() });
  }

  function reset() {
    if (busy || !state.resetConfirm) return;
    flushSync(() => dispatch({ type: 'operation-started', operation: 'reset' }));
    const result = resetSetup(adapter);
    dispatch(result.status === 'confirmed'
      ? { type: 'reset-confirmed' }
      : { type: 'reset-unconfirmed', before: result.before, recovery: result.recovery });
  }

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
          {busy ? <p role="status">{t('recovery.pending')}</p> : null}
          <fieldset role="presentation" className="recovery-controls" disabled={busy} aria-busy={busy}>
          {state.status === 'degraded' ? <p className="save-feedback" role="alert">{t('recovery.temporary')}</p> : null}
          {state.status === 'blocked-recovery' ? (
            <p className="save-feedback" role="alert">
              {t(state.resetUnconfirmed ? 'recovery.resetUnconfirmed' : 'recovery.blocked')}
            </p>
          ) : null}
          {!state.resetConfirm && (state.status === 'ready' || state.status === 'degraded') ? (
            <SetupFlow
              adapter={adapter}
              createProfileId={createProfileId}
            />
          ) : null}
          {state.status !== 'pending' ? (
            <div className="recovery-actions">
              {state.resetConfirm ? (
                <section aria-labelledby="reset-heading" aria-describedby="reset-consequence">
                  <h2 id="reset-heading">{t('recovery.resetTitle')}</h2>
                  <p id="reset-consequence">{t('recovery.resetConsequence')}</p>
                  <div className="recovery-actions__buttons">
                    <button className="button button--secondary" type="button" onClick={() => dispatch({ type: 'reset-confirmation', open: false })}>{t('recovery.cancel')}</button>
                    <button className="button button--destructive" type="button" onClick={reset}>{t('recovery.confirmReset')}</button>
                  </div>
                </section>
              ) : (
                <>
                  {(state.status !== 'ready' || state.saveStatus === 'unconfirmed') ? (
                    <>
                      <p>{t('recovery.retryHelp')}</p>
                      <button className="button button--secondary" type="button" onClick={retry}>{t('recovery.retry')}</button>
                    </>
                  ) : null}
                  <button className="button button--secondary" type="button" onClick={() => dispatch({ type: 'reset-confirmation', open: true })}>{t('recovery.resetTitle')}</button>
                </>
              )}
            </div>
          ) : null}
          </fieldset>
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
