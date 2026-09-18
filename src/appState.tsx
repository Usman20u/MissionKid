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
  ActiveMissionSession,
  AgeBand,
  CurrentMissionSession,
  HydrationResult,
  MissionKidSnapshot,
  ReadyMissionSession,
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
  // The durable current session, mirrored into runtime only after a write was
  // read back exactly or an existing session was read back from storage. It is
  // never set optimistically, and it keeps whichever lifecycle state the
  // session actually holds rather than a state the interface assumed.
  currentSession?: CurrentMissionSession;
  // Which lifecycle transition did not complete, and what is known about it.
  // `failed` means durable state was read and still shows the state before the
  // transition. `unconfirmed` means the write may have landed and a fresh read
  // could not establish what is stored, so neither outcome is claimed. The
  // operation travels with it because each one fails into a different truth,
  // and wording that described the wrong operation would be a false claim.
  sessionIssue?: MissionSessionIssue;
  // Which attempt produced it, for the same reason `selectionAttempt` exists:
  // a retry that fails the same way must still be announced.
  sessionAttempt?: number;
  // Why the last deliberate choice did not become a new Mission Session.
  // `conflict` is a product state: one is already chosen. `unconfirmed` is a
  // transition failure: nothing started, and the choice can be made again.
  selectionIssue?: MissionSelectionIssue;
  // Which attempt produced it. Choosing again after the same failure changes no
  // wording, so without this the message is an unchanged node and assistive
  // technology stays silent on the retry the message itself invites.
  selectionAttempt?: number;
  // The Mission a conflict is about. A stored session is not published into
  // runtime by hydration, so without this the conflict could not name the
  // Mission the family is being told to choose again.
  selectionConflictMissionId?: string;
}>;

export type AppState = RecoveryContext & (
  | (SetupContext & Readonly<{ status: 'pending' }>)
  | ReadyAppState
  | (SetupContext & Readonly<{ status: 'degraded' }>)
  | (SetupContext & Readonly<{ status: 'blocked-recovery' }>));

export type ResolvedAppState = Exclude<AppState, { status: 'pending' }>;

export type MissionSelectionIssue = 'conflict' | 'unconfirmed';

export type MissionSessionOperation = 'ready' | 'start';

export type MissionSessionOutcome = 'failed' | 'unconfirmed';

export type MissionSessionIssue = Readonly<{
  operation: MissionSessionOperation;
  outcome: MissionSessionOutcome;
}>;

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
  | { type: 'mission-selection-confirmed'; session: CurrentMissionSession }
  // The durable session read back as `ready`, whether this attempt advanced it
  // or found it already stored that way.
  | { type: 'mission-session-ready'; session: ReadyMissionSession }
  // The durable session read back as `active`, whether this attempt started it
  // or found it already running.
  | { type: 'mission-session-started'; session: ActiveMissionSession }
  | { type: 'mission-session-transition-failed'; issue: MissionSessionIssue }
  | {
      type: 'mission-selection-failed';
      issue: MissionSelectionIssue;
      // Present only for a conflict, which is always about one stored Mission.
      conflictMissionId?: string;
    }
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
      const { childProfile, currentSession, settings } = result.snapshot;

      return {
        language: settings.language,
        ageBand: childProfile?.ageBand ?? null,
        localProfileId: childProfile?.localProfileId ?? null,
        status: 'ready',
        setupView: childProfile?.ageBand ? 'handoff' : 'incomplete',
        saveStatus: 'idle',
        // Validated durable state, mirrored as it is. A session that is already
        // `ready` or `active` is restored in that state rather than rebuilt,
        // and a `selected` one is what the ready transition then advances.
        ...(currentSession ? { currentSession } : {}),
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

// A current session exists whose start is still ahead of it: `selected` has not
// reached the start screen and `ready` is on it. An `active` session has already
// been started, so the start experience is not what it leads back to. This is
// the typed fact alone; the screens each state leads to are later F003 work.
export function selectMissionStartAvailable(state: AppState): boolean {
  const session = selectCurrentSession(state);

  return session?.state === 'selected' || session?.state === 'ready';
}

export function selectCurrentSession(
  state: AppState,
): CurrentMissionSession | null {
  return state.currentSession ?? null;
}

export function selectSessionIssue(
  state: AppState,
): MissionSessionIssue | null {
  return state.sessionIssue ?? null;
}

export function selectSessionAttempt(state: AppState): number {
  return state.sessionAttempt ?? 0;
}

export function selectSelectionIssue(
  state: AppState,
): MissionSelectionIssue | null {
  return state.selectionIssue ?? null;
}

export function selectSelectionAttempt(state: AppState): number {
  return state.selectionAttempt ?? 0;
}

export function selectConflictMissionId(state: AppState): string | null {
  return state.selectionConflictMissionId ?? null;
}

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
        : {
            ...state,
            selectionIssue: undefined,
            selectionAttempt: undefined,
            selectionConflictMissionId: undefined,
            discovery: { category: action.category, shown: [] },
          };
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
        selectionIssue: undefined,
        selectionAttempt: undefined,
        selectionConflictMissionId: undefined,
        discovery: { ...discovery, shown: [...discovery.shown, ...action.missionIds] },
      };
    }
    case 'mission-selection-confirmed':
      // Choosing a Mission ends the discovery cycle, so the shown identifiers
      // go with it. The Mission Category the parent picked is a separate
      // choice and is left alone.
      return {
        ...state,
        currentSession: action.session,
        selectionIssue: undefined,
        selectionAttempt: undefined,
        selectionConflictMissionId: undefined,
        // Any transition issue belonged to an earlier session, and leaving it
        // standing would block this one from reaching `ready` at all.
        sessionIssue: undefined,
        sessionAttempt: undefined,
        discovery: state.discovery ? { ...state.discovery, shown: [] } : undefined,
      };
    case 'mission-session-ready':
    case 'mission-session-started':
      // Publishing what storage confirmed. Any earlier transition issue
      // described a state that no longer exists, so it goes with it.
      return {
        ...state,
        currentSession: action.session,
        sessionIssue: undefined,
        sessionAttempt: undefined,
      };
    case 'mission-session-transition-failed':
      // The runtime session is left exactly as it is: an established failure
      // leaves the stored `selected` session standing, and an unconfirmed one
      // is not evidence for rebuilding or removing anything. Recording the
      // issue is also what stops the transition from retrying itself.
      return {
        ...state,
        sessionIssue: action.issue,
        sessionAttempt: (state.sessionAttempt ?? 0) + 1,
      };
    case 'mission-selection-failed':
      // Nothing about the cycle changes: the same three Missions stay on screen
      // and stay choosable, which is what makes choosing again the retry. Only
      // the attempt advances, so a retry that fails the same way is still
      // announced rather than passing in silence.
      return {
        ...state,
        selectionIssue: action.issue,
        selectionAttempt: (state.selectionAttempt ?? 0) + 1,
        selectionConflictMissionId: action.conflictMissionId,
      };
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
