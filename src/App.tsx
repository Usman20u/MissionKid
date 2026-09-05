import { useEffect, useState } from 'react';

import { ApplicationErrorBoundary, AppShell } from './AppShell';
import {
  AppStateProvider,
  resolveHydrationResult,
  useAppState,
  type AppState,
} from './appState';
import {
  createLocalProfileId,
  type LocalProfileIdFactory,
} from './SetupFlow';
import {
  persistenceAdapter,
  type PersistenceAdapter,
} from './persistence';

type AppProps = Readonly<{
  initialState?: AppState;
  adapter?: PersistenceAdapter;
  createProfileId?: LocalProfileIdFactory;
}>;

type LocalizedApplicationShellProps = Readonly<{
  adapter: PersistenceAdapter;
  createProfileId: LocalProfileIdFactory;
}>;

function LocalizedApplicationShell({
  adapter,
  createProfileId,
}: LocalizedApplicationShellProps) {
  const { state } = useAppState();

  useEffect(() => {
    document.documentElement.lang = state.language;
  }, [state.language]);

  return (
    <ApplicationErrorBoundary language={state.language}>
      <AppShell adapter={adapter} createProfileId={createProfileId} />
    </ApplicationErrorBoundary>
  );
}

export function App({
  initialState,
  adapter = persistenceAdapter,
  createProfileId = createLocalProfileId,
}: AppProps) {
  const [resolvedInitialState] = useState<AppState>(() =>
    initialState ?? resolveHydrationResult(adapter.hydrate()),
  );

  return (
    <AppStateProvider initialState={resolvedInitialState}>
      <LocalizedApplicationShell
        adapter={adapter}
        createProfileId={createProfileId}
      />
    </AppStateProvider>
  );
}
