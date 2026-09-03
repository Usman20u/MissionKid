import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react';

export type AppState =
  | { status: 'pending' }
  | { status: 'ready'; setupStatus: 'fresh' | 'incomplete' }
  | {
      status: 'ready';
      setupStatus: 'complete';
      setupView: 'editing' | 'handoff';
    }
  | { status: 'degraded' }
  | { status: 'blocked-recovery' };

export type ResolvedAppState = Exclude<AppState, { status: 'pending' }>;

export type AppStateAction =
  | { type: 'state-load-started' }
  | { type: 'validated-state-received'; state: ResolvedAppState };

export const FRESH_APP_STATE: AppState = {
  status: 'ready',
  setupStatus: 'fresh',
};

export function appStateReducer(
  _state: AppState,
  action: AppStateAction,
): AppState {
  switch (action.type) {
    case 'state-load-started':
      return { status: 'pending' };
    case 'validated-state-received':
      return action.state;
  }
}

type AppStateContextValue = Readonly<{
  state: AppState;
  dispatch: Dispatch<AppStateAction>;
}>;

const AppStateContext = createContext<AppStateContextValue | null>(null);

type AppStateProviderProps = PropsWithChildren<{
  initialState?: AppState;
}>;

export function AppStateProvider({
  children,
  initialState = FRESH_APP_STATE,
}: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider.');
  }

  return context;
}
