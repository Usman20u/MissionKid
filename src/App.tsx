import { ApplicationErrorBoundary, AppShell } from './AppShell';
import { AppStateProvider, FRESH_APP_STATE, type AppState } from './appState';

type AppProps = {
  initialState?: AppState;
};

export function App({ initialState = FRESH_APP_STATE }: AppProps) {
  return (
    <ApplicationErrorBoundary>
      <AppStateProvider initialState={initialState}>
        <AppShell />
      </AppStateProvider>
    </ApplicationErrorBoundary>
  );
}
