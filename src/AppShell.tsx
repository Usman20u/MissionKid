import {
  Component,
  useEffect,
  useRef,
  type PropsWithChildren,
} from 'react';
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

  // One signal per materially different parent context. Language changes and
  // in-place feedback deliberately keep the same signal so focus is not stolen.
  const contextSignal = state.resetConfirm ? 'reset-confirmation' : view;
  const viewHeading = useRef<HTMLHeadingElement>(null);
  const resetHeading = useRef<HTMLHeadingElement>(null);
  const resetEntry = useRef<HTMLButtonElement>(null);
  const previousSignal = useRef(contextSignal);
  const returnFocusToResetEntry = useRef(false);

  useEffect(() => {
    const previous = previousSignal.current;

    if (previous === contextSignal) {
      return;
    }

    previousSignal.current = contextSignal;

    if (contextSignal === 'reset-confirmation') {
      resetHeading.current?.focus();
      return;
    }

    // Cancelling returns the parent to the control they opened. A confirmed
    // reset does not: that control now belongs to a different context.
    if (returnFocusToResetEntry.current) {
      returnFocusToResetEntry.current = false;

      if (resetEntry.current) {
        resetEntry.current.focus();
        return;
      }
    }

    viewHeading.current?.focus();
  }, [contextSignal]);

  function retry() {
    if (busy) return;
    flushSync(() => dispatch({ type: 'operation-started', operation: 'retry' }));
    dispatch({ type: 'storage-retried', result: adapter.hydrate() });
  }

  function openResetConfirmation() {
    returnFocusToResetEntry.current = false;
    dispatch({ type: 'reset-confirmation', open: true });
  }

  function cancelReset() {
    returnFocusToResetEntry.current = true;
    dispatch({ type: 'reset-confirmation', open: false });
  }

  function reset() {
    if (busy || !state.resetConfirm) return;
    returnFocusToResetEntry.current = false;
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
        <section aria-busy={busy} aria-labelledby={headingId} data-view={view}>
          <p className="app-view__context">
            {translateMessage(state.language, content.context)}
          </p>
          <h1
            className="app-view__title"
            id={headingId}
            ref={viewHeading}
            tabIndex={-1}
          >
            {translateMessage(state.language, content.title)}
          </h1>
          {busy ? <p role="status">{t('recovery.pending')}</p> : null}
          {/* Presentational: exists only for the native disabled cascade. */}
          <fieldset role="presentation" className="recovery-controls" disabled={busy}>
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
                <section className="reset-panel" aria-labelledby="reset-heading" aria-describedby="reset-consequence">
                  <h2 className="reset-panel__title" id="reset-heading" ref={resetHeading} tabIndex={-1}>{t('recovery.resetTitle')}</h2>
                  <p id="reset-consequence">{t('recovery.resetConsequence')}</p>
                  <div className="recovery-actions__buttons">
                    <button className="button button--primary" type="button" onClick={cancelReset}>{t('recovery.cancel')}</button>
                    <button className="button button--destructive" type="button" onClick={reset}>{t('recovery.confirmReset')}</button>
                  </div>
                </section>
              ) : (
                <>
                  {(state.status !== 'ready' || state.saveStatus === 'unconfirmed') ? (
                    <>
                      <p className="recovery-actions__help">{t('recovery.retryHelp')}</p>
                      <button className="button button--secondary" type="button" onClick={retry}>{t('recovery.retry')}</button>
                    </>
                  ) : null}
                  <div className="recovery-actions__reset">
                    <button className="button button--reset-entry" type="button" ref={resetEntry} onClick={openResetConfirmation}>{t('recovery.resetTitle')}</button>
                  </div>
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
