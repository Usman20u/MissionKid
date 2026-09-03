import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react';

import {
  DEFAULT_LANGUAGE,
  type SupportedLanguage,
} from './localization';

type LocalizedAppState = Readonly<{
  language: SupportedLanguage;
}>;

export type AppState =
  | (LocalizedAppState & { status: 'pending' })
  | (LocalizedAppState & {
      status: 'ready';
      setupStatus: 'fresh' | 'incomplete';
    })
  | (LocalizedAppState & {
      status: 'ready';
      setupStatus: 'complete';
      setupView: 'editing' | 'handoff';
    })
  | (LocalizedAppState & { status: 'degraded' })
  | (LocalizedAppState & { status: 'blocked-recovery' });

export type ResolvedAppState = Exclude<AppState, { status: 'pending' }>;

export type AppStateAction =
  | { type: 'state-load-started' }
  | { type: 'validated-state-received'; state: ResolvedAppState }
  | { type: 'language-changed'; language: SupportedLanguage };

export const FRESH_APP_STATE: AppState = {
  language: DEFAULT_LANGUAGE,
  status: 'ready',
  setupStatus: 'fresh',
};

export function appStateReducer(
  _state: AppState,
  action: AppStateAction,
): AppState {
  switch (action.type) {
    case 'state-load-started':
      return { language: _state.language, status: 'pending' };
    case 'validated-state-received':
      return action.state;
    case 'language-changed':
      return { ..._state, language: action.language };
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
