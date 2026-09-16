import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react';

import type { MissionCategory } from './catalog';
import { SUGGESTION_SET_SIZE } from './missionSuggestions';
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

// One discovery cycle is runtime-only. It is never written to the browser
// snapshot, which holds no Mission Category, cycle or suggestion state.
//
// `shown` holds the Mission identifiers this cycle has already displayed, in the
// order they were displayed. It is what makes bounded replacement bounded: the
// next set is the next complete group of records that are not in it. It is
// transient interaction state, not a record of anything, so it is never
// persisted and never reaches a Mission record.
type DiscoveryContext = Readonly<{
  category: MissionCategory | null;
  shown: readonly string[];
}>;

type RecoveryContext = Readonly<{
  // Last validated F001 facts, not a claim that storage is still available.
  lastDurable?: SetupContext;
  operation?: 'save' | 'retry' | 'reset';
  resetConfirm?: boolean;
  resetUnconfirmed?: boolean;
  temporaryComplete?: boolean;
  discovery?: DiscoveryContext;
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
  | { type: 'discovery-opened' }
  | { type: 'discovery-category-selected'; category: MissionCategory }
  | { type: 'discovery-another-set-requested'; missionIds: readonly string[] }
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

// One discovery cycle is exactly one age band, one UI language and one Mission
// Category. It is derived rather than stored, so changing any of the three yields
// a different cycle and the previous request is discarded by construction.
export type DiscoveryCycle = Readonly<{
  ageBand: AgeBand;
  language: SupportedLanguage;
  category: MissionCategory;
}>;

// The Missions this cycle has already shown. Empty outside a cycle, so a fresh
// cycle always starts at the first set.
export function selectShownMissionIds(state: AppState): readonly string[] {
  return state.discovery?.shown ?? [];
}

export function selectDiscoveryCycle(state: AppState): DiscoveryCycle | null {
  if (state.status !== 'ready' || !isSetupContextComplete(state)) {
    return null;
  }

  const category = state.discovery?.category;

  return category && state.ageBand
    ? { ageBand: state.ageBand, language: state.language, category }
    : null;
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
      // A cycle is one age band, one language and one Mission Category. The
      // cycle itself is derived, so a new language already yields a new one;
      // what has to be dropped explicitly is what the old cycle had shown. The
      // chosen Mission Category is a separate choice and survives.
      return {
        ...state,
        temporaryComplete: false,
        language: action.language,
        discovery: state.discovery ? { ...state.discovery, shown: [] } : undefined,
      };
    case 'age-band-changed':
      return {
        ...state,
        temporaryComplete: false,
        ageBand: action.ageBand,
        discovery: state.discovery ? { ...state.discovery, shown: [] } : undefined,
      };
    case 'setup-editing-started':
      // Leaving discovery for the parent-guided setup step ends the cycle.
      return state.status === 'ready'
        ? { ...state, setupView: 'editing', discovery: undefined }
        : state;
    case 'discovery-opened':
      return state.status === 'ready' &&
        state.setupView === 'handoff' &&
        isSetupContextComplete(state)
        ? { ...state, discovery: { category: null, shown: [] } }
        : state;
    case 'discovery-category-selected':
      if (!state.discovery) return state;
      // Re-choosing the same Mission Category is not a change, so the cycle and
      // everything it has already shown continue. A different one is a
      // different cycle and starts again at the first set.
      return state.discovery.category === action.category
        ? state
        : { ...state, discovery: { category: action.category, shown: [] } };
    case 'discovery-another-set-requested': {
      const discovery = state.discovery;

      // Only a complete group retires, and only Missions the cycle has not
      // already retired. Anything else leaves the cycle exactly as it was, so a
      // malformed request can never blank or partially replace what is on
      // screen. The control itself is offered only while a further complete
      // unseen group exists.
      if (
        !discovery?.category ||
        action.missionIds.length !== SUGGESTION_SET_SIZE ||
        new Set(action.missionIds).size !== SUGGESTION_SET_SIZE ||
        action.missionIds.some((missionId) => discovery.shown.includes(missionId))
      ) {
        return state;
      }

      return {
        ...state,
        discovery: { ...discovery, shown: [...discovery.shown, ...action.missionIds] },
      };
    }
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
