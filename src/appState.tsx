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
import type {
  AgeBand,
  HydrationResult,
  MissionKidSnapshot,
} from './persistence';

type SetupContext = Readonly<{
  language: SupportedLanguage;
  ageBand: AgeBand | null;
  localProfileId: string | null;
}>;

type ReadyAppState = SetupContext &
  Readonly<{
    status: 'ready';
    setupView: 'first-use' | 'incomplete' | 'editing' | 'handoff';
    saveStatus: 'idle' | 'unconfirmed';
  }>;

export type AppState =
  | (SetupContext & Readonly<{ status: 'pending' }>)
  | ReadyAppState
  | (SetupContext & Readonly<{ status: 'degraded' }>)
  | (SetupContext & Readonly<{ status: 'blocked-recovery' }>);

export type ResolvedAppState = Exclude<AppState, { status: 'pending' }>;

export type AppStateAction =
  | { type: 'state-load-started' }
  | { type: 'validated-state-received'; state: ResolvedAppState }
  | { type: 'language-changed'; language: SupportedLanguage }
  | { type: 'age-band-changed'; ageBand: AgeBand }
  | { type: 'setup-editing-started' }
  | {
      type: 'setup-save-unconfirmed';
      localProfileId: string | null;
      recovery: HydrationResult;
    }
  | { type: 'setup-save-confirmed'; snapshot: MissionKidSnapshot };

export const FRESH_APP_STATE: ResolvedAppState = {
  language: DEFAULT_LANGUAGE,
  ageBand: null,
  localProfileId: null,
  status: 'ready',
  setupView: 'first-use',
  saveStatus: 'idle',
};

export function resolveHydrationResult(
  result: HydrationResult,
): ResolvedAppState {
  switch (result.status) {
    case 'absent':
      return FRESH_APP_STATE;
    case 'unavailable':
      return {
        language: DEFAULT_LANGUAGE,
        ageBand: null,
        localProfileId: null,
        status: 'degraded',
      };
    case 'corrupted':
    case 'unsupported-version':
      return {
        language: DEFAULT_LANGUAGE,
        ageBand: null,
        localProfileId: null,
        status: 'blocked-recovery',
      };
    case 'hydrated': {
      const { childProfile, settings } = result.snapshot;

      return {
        language: settings.language,
        ageBand: childProfile?.ageBand ?? null,
        localProfileId: childProfile?.localProfileId ?? null,
        status: 'ready',
        setupView: childProfile?.ageBand ? 'handoff' : 'incomplete',
        saveStatus: 'idle',
      };
    }
  }
}

export function isSetupContextComplete(
  state: Pick<AppState, 'ageBand' | 'localProfileId'>,
): boolean {
  return (
    state.ageBand !== null &&
    state.localProfileId !== null &&
    state.localProfileId.trim().length > 0
  );
}

export function appStateReducer(
  state: AppState,
  action: AppStateAction,
): AppState {
  switch (action.type) {
    case 'state-load-started':
      return {
        language: state.language,
        ageBand: state.ageBand,
        localProfileId: state.localProfileId,
        status: 'pending',
      };
    case 'validated-state-received':
      return action.state;
    case 'language-changed':
      return {
        ...state,
        language: action.language,
      };
    case 'age-band-changed':
      return {
        ...state,
        ageBand: action.ageBand,
      };
    case 'setup-editing-started':
      return state.status === 'ready'
        ? { ...state, setupView: 'editing' }
        : state;
    case 'setup-save-unconfirmed': {
      const recovered =
        action.recovery.status === 'hydrated' ? action.recovery.snapshot : null;

      return state.status === 'ready'
        ? {
            ...state,
            // Restore recognized durable context when available, but never
            // turn an unconfirmed action into a successful handoff.
            language: recovered?.settings.language ?? state.language,
            ageBand: recovered
              ? recovered.childProfile?.ageBand ?? null
              : state.ageBand,
            localProfileId: recovered
              ? recovered.childProfile?.localProfileId ?? action.localProfileId
              : action.localProfileId,
            saveStatus: 'unconfirmed',
          }
        : state;
    }
    case 'setup-save-confirmed': {
      const { childProfile, settings } = action.snapshot;

      if (!childProfile?.ageBand) {
        return state;
      }

      return {
        language: settings.language,
        ageBand: childProfile.ageBand,
        localProfileId: childProfile.localProfileId,
        status: 'ready',
        setupView: 'handoff',
        saveStatus: 'idle',
      };
    }
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
