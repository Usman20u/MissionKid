import { useEffect } from 'react';

import { ApplicationErrorBoundary, AppShell } from './AppShell';
import {
  AppStateProvider,
  FRESH_APP_STATE,
  useAppState,
  type AppState,
} from './appState';

type AppProps = {
  initialState?: AppState;
};

function LocalizedApplicationShell() {
  const { state } = useAppState();

  useEffect(() => {
    document.documentElement.lang = state.language;
  }, [state.language]);

  return (
    <ApplicationErrorBoundary language={state.language}>
      <AppShell />
    </ApplicationErrorBoundary>
  );
}

export function App({ initialState = FRESH_APP_STATE }: AppProps) {
  return (
    <AppStateProvider initialState={initialState}>
      <LocalizedApplicationShell />
    </AppStateProvider>
  );
}
