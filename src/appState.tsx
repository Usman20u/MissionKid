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

type RecoveryContext = Readonly<{
  // Last validated F001 facts, not a claim that storage is still available.
  lastDurable?: SetupContext;
  operation?: 'save' | 'retry' | 'reset';
  resetConfirm?: boolean;
  resetUnconfirmed?: boolean;
  temporaryComplete?: boolean;
}>;

export type AppState = RecoveryContext & (
  | (SetupContext & Readonly<{ status: 'pending' }>)
  | ReadyAppState
  | (SetupContext & Readonly<{ status: 'degraded' }>)
  | (SetupContext & Readonly<{ status: 'blocked-recovery' }>));

export type ResolvedAppState = Exclude<AppState, { status: 'pending' }>;

export type AppStateAction =
  | { type: 'operation-started'; operation: 'save' | 'retry' | 'reset' }
  | { type: 'reset-confirmation'; open: boolean }
  | { type: 'storage-retried'; result: HydrationResult }
  | { type: 'reset-confirmed' }
  | { type: 'reset-unconfirmed'; before: HydrationResult; recovery: HydrationResult }
  | { type: 'temporary-setup-confirmed'; localProfileId: string }
  | { type: 'state-load-started' }
  | { type: 'validated-state-received'; state: ResolvedAppState }
  | { type: 'language-changed'; language: SupportedLanguage }
  | { type: 'age-band-changed'; ageBand: AgeBand }
  | { type: 'setup-editing-started' }
  | {
      type: 'setup-save-unconfirmed';
      localProfileId: string | null;
      before: HydrationResult;
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

function setupContext(state: SetupContext): SetupContext {
  return { language: state.language, ageBand: state.ageBand, localProfileId: state.localProfileId };
}

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
    case 'operation-started':
      return { ...state, operation: action.operation };
    case 'reset-confirmation':
      return { ...state, resetConfirm: action.open };
    case 'temporary-setup-confirmed':
      return state.status === 'degraded' && state.ageBand
        ? { ...state, temporaryComplete: true, localProfileId: action.localProfileId }
        : state;
    case 'reset-confirmed':
      return FRESH_APP_STATE;
    case 'reset-unconfirmed': {
      const durable = action.recovery.status === 'hydrated'
        ? resolveHydrationResult(action.recovery)
        : action.before.status === 'hydrated'
          ? resolveHydrationResult(action.before)
          : state.lastDurable;
      return {
        ...state, ...durable, status: 'blocked-recovery',
        lastDurable: durable ? setupContext(durable) : state.lastDurable,
        operation: undefined, resetConfirm: false, resetUnconfirmed: true, temporaryComplete: false,
      };
    }
    case 'storage-retried': {
      if (action.result.status === 'hydrated' || action.result.status === 'absent') {
        const resolved = resolveHydrationResult(action.result);
        return {
          ...resolved,
          lastDurable: action.result.status === 'hydrated' ? setupContext(resolved) : undefined,
        };
      }
      return {
        ...state, ...(state.lastDurable ?? {}),
        status: action.result.status === 'unavailable' && state.status !== 'blocked-recovery'
          ? 'degraded' : 'blocked-recovery',
        operation: undefined, resetConfirm: false, temporaryComplete: false,
      };
    }
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
        temporaryComplete: false,
        language: action.language,
      };
    case 'age-band-changed':
      return {
        ...state,
        temporaryComplete: false,
        ageBand: action.ageBand,
      };
    case 'setup-editing-started':
      return state.status === 'ready'
        ? { ...state, setupView: 'editing' }
        : state;
    case 'setup-save-unconfirmed': {
      // Recovery is newer evidence than the pre-write read; neither confirms the attempted save.
      const evidence = action.recovery.status === 'hydrated' || action.recovery.status === 'absent'
        ? action.recovery : action.before;
      const lastDurable = evidence.status === 'hydrated'
        ? setupContext(resolveHydrationResult(evidence))
        : evidence.status === 'absent' ? undefined : state.lastDurable;
      const recovered =
        action.recovery.status === 'hydrated' ? action.recovery.snapshot : null;

      if (action.recovery.status === 'corrupted' || action.recovery.status === 'unsupported-version') {
        return { ...state, ...(lastDurable ?? {}), lastDurable, status: 'blocked-recovery', operation: undefined, temporaryComplete: false };
      }
      if (action.recovery.status === 'unavailable') {
        return {
          ...state,
          localProfileId: action.localProfileId,
          ...(lastDurable ?? {}),
          lastDurable,
          temporaryComplete: false,
          status: 'degraded', operation: undefined,
        };
      }

      return state.status === 'ready'
        ? {
            ...state,
            operation: undefined,
            lastDurable,
            temporaryComplete: false,
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
        lastDurable: {
          language: settings.language,
          ageBand: childProfile.ageBand,
          localProfileId: childProfile.localProfileId,
        },
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
  const [state, dispatch] = useReducer(appStateReducer, initialState, (initial) => (
    initial.status === 'ready' && initial.setupView !== 'first-use'
      ? { ...initial, lastDurable: {
          language: initial.language, ageBand: initial.ageBand,
          localProfileId: initial.localProfileId,
        } }
      : initial
  ));
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
