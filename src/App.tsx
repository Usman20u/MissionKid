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
import { readWallClock, type WallClock } from './missionSession';
import {
  persistenceAdapter,
  type PersistenceAdapter,
} from './persistence';

type AppProps = Readonly<{
  initialState?: AppState;
  adapter?: PersistenceAdapter;
  createProfileId?: LocalProfileIdFactory;
  // The wall clock lifecycle writes read, injected for the same reason the
  // adapter and the identifier factory are: a test has to be able to see which
  // moment was recorded.
  now?: WallClock;
}>;

type LocalizedApplicationShellProps = Readonly<{
  adapter: PersistenceAdapter;
  createProfileId: LocalProfileIdFactory;
  now: WallClock;
}>;

function LocalizedApplicationShell({
  adapter,
  createProfileId,
  now,
}: LocalizedApplicationShellProps) {
  const { state } = useAppState();

  useEffect(() => {
    document.documentElement.lang = state.language;
  }, [state.language]);

  return (
    <ApplicationErrorBoundary language={state.language}>
      <AppShell adapter={adapter} createProfileId={createProfileId} now={now} />
    </ApplicationErrorBoundary>
  );
}

export function App({
  initialState,
  adapter = persistenceAdapter,
  createProfileId = createLocalProfileId,
  now = readWallClock,
}: AppProps) {
  const [resolvedInitialState] = useState<AppState>(() =>
    initialState ?? resolveHydrationResult(adapter.hydrate()),
  );

  return (
    <AppStateProvider initialState={resolvedInitialState}>
      <LocalizedApplicationShell
        adapter={adapter}
        createProfileId={createProfileId}
        now={now}
      />
    </AppStateProvider>
  );
}
