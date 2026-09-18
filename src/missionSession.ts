import type { MissionRecord } from './catalog';
import { MISSION_CATALOG } from './catalogContent';
import { isEligibleForContext } from './catalogValidation';
import type { SupportedLanguage } from './localization';
import type { SuggestionContext } from './missionSuggestions';
import type {
  ActiveMissionSession,
  CurrentMissionSession,
  MissionSession,
  PersistFailureReason,
  PersistenceAdapter,
  ReadyMissionSession,
  SelectedMissionSession,
} from './persistence';

// A collision-resistant local identifier, minted once and never reused. Injected
// so a test can pin it and prove that a repeated choice does not mint a second.
export type SessionIdFactory = () => string;

export function createSessionId(): string {
  return globalThis.crypto.randomUUID();
}

// Wall time in epoch milliseconds. Injected for the same reason: `selectedAt` is
// written exactly once, and a test has to be able to see that it did not move.
export type WallClock = () => number;

export function readWallClock(): number {
  return Date.now();
}

export type MissionSelectionResult =
  // A created session is `selected` by construction: nothing else can be true
  // of a Mission Session that has only just been written.
  | Readonly<{ status: 'created'; session: SelectedMissionSession }>
  // `resolved` is the same session answering a repeated choice: nothing was
  // minted, nothing was written, and nothing about it moved. It carries the
  // lifecycle state the session is actually in, so a Mission that has already
  // reached `ready` or `active` returns to that session instead of being
  // published again as a fresh selection; the caller routes it by that state.
  | Readonly<{ status: 'resolved'; session: CurrentMissionSession }>
  // Another Mission already owns the current session, in whatever state it
  // reached. This result only carries what the return-or-abandon choice needs.
  | Readonly<{ status: 'conflict'; session: CurrentMissionSession }>
  | Readonly<{ status: 'unavailable' }>
  | Readonly<{ status: 'unconfirmed'; reason: PersistFailureReason }>;

type SelectionRequest = Readonly<{
  mission: MissionRecord;
  context: SuggestionContext;
}>;

// Choosing a Mission is a state-changing operation, so it follows the one
// five-step path: read and validate what is stored, validate the transition
// against it, build and validate the next whole snapshot, replace the single
// stored value and read it back exactly, and publish success only once that
// read-back matches. Nothing here is optimistic.
export function selectMission(
  adapter: PersistenceAdapter,
  request: SelectionRequest,
  createId: SessionIdFactory,
  now: WallClock,
): MissionSelectionResult {
  const current = adapter.hydrate();

  // Only a readable, valid snapshot can be transitioned. An absent one cannot
  // hold a Child Profile, and a Mission cannot be chosen without one.
  if (current.status !== 'hydrated') {
    return { status: 'unavailable' };
  }

  const snapshot = current.snapshot;
  const profile = snapshot.childProfile;

  // The selection facts are the family's current context, so the profile must
  // be complete and the Mission must be one this context may actually be
  // offered. This is the catalog check: storage validates durable shape, the
  // domain validates that the choice was a legitimate one to make.
  if (
    !profile ||
    profile.ageBand === null ||
    profile.ageBand !== request.context.ageBand ||
    !isEligibleForContext(request.mission, request.context)
  ) {
    return { status: 'unavailable' };
  }

  const existing = snapshot.currentSession;

  if (existing) {
    // The same Mission answering twice is one choice pressed twice, not a
    // second choice. It resolves to the session that already exists, in the
    // state that session is actually in: no new identifier, no new timestamp,
    // no second write, and no lifecycle state rebuilt from the choice.
    return existing.missionId === request.mission.missionId
      ? { status: 'resolved', session: existing }
      : { status: 'conflict', session: existing };
  }

  const selectedAt = now();

  if (!Number.isInteger(selectedAt) || selectedAt < 0) {
    return { status: 'unavailable' };
  }

  const session: SelectedMissionSession = {
    sessionId: createId(),
    childProfileId: profile.localProfileId,
    missionId: request.mission.missionId,
    missionCategoryAtSelection: request.mission.category,
    ageBandAtSelection: profile.ageBand,
    durationSecondsAtSelection: request.mission.durationSeconds,
    state: 'selected',
    selectedAt,
  };

  const result = adapter.persist({ ...snapshot, currentSession: session });

  if (result.status !== 'confirmed') {
    return { status: 'unconfirmed', reason: result.reason };
  }

  // What is published is what storage confirmed, narrowed by the discriminant
  // rather than assumed: a confirmed creation is `selected`, and a stored
  // session in any other state is not the selection this call intended.
  const written = result.snapshot.currentSession;

  return written !== null && written.state === 'selected'
    ? { status: 'created', session: written }
    : { status: 'unconfirmed', reason: 'read-back-mismatch' };
}


// The two situations the adapter's `unconfirmed` result covers are different,
// and conflating them is how an interface ends up lying about durable state.
// These three reasons mean the replacement may already be stored: the write was
// attempted and only its confirmation did not come back.
const REASONS_THAT_MAY_HAVE_LANDED: readonly PersistFailureReason[] = [
  'read-back-failed',
  'read-back-invalid',
  'read-back-mismatch',
];

export type MissionReadyResult =
  // The durable current session is `ready`. `advanced` wrote the transition and
  // read it back; `resolved` found it already stored that way and wrote
  // nothing, which is what a repeat, a remount, or a retry after an interrupted
  // confirmation finds.
  | Readonly<{ status: 'advanced' | 'resolved'; session: ReadyMissionSession }>
  // Nothing for this transition to do: no current session, or one that has
  // already moved past `ready` and is not this transition's to change.
  | Readonly<{ status: 'inapplicable'; session: CurrentMissionSession | null }>
  // Established before storage changed: the stored session is still `selected`.
  | Readonly<{ status: 'not-advanced'; reason: PersistFailureReason }>
  // The write may have landed and its confirmation did not come back; a fresh
  // read could not establish which. Neither success nor rollback is claimed.
  | Readonly<{ status: 'unconfirmed'; reason: PersistFailureReason }>
  // The stored snapshot could not be read or validated at all.
  | Readonly<{ status: 'unavailable' }>;

// Entering `ready` follows a selection without another family decision, so this
// is not a family action: it is the same five-step path run on the session that
// is actually stored. Durable state decides, which is what makes the operation
// idempotent by session identity — a repeat, a remounted effect, a refresh or a
// retry all read a session that is already `ready` and write nothing.
//
// Nothing is added by the transition. No identifier is minted, no timestamp is
// written, and `startedAt` above all does not appear: starting is a deliberate
// family action that belongs to a later step.
export function advanceSessionToReady(
  adapter: PersistenceAdapter,
): MissionReadyResult {
  const current = adapter.hydrate();

  if (current.status !== 'hydrated') {
    return { status: 'unavailable' };
  }

  const snapshot = current.snapshot;
  const session = snapshot.currentSession;

  if (session === null) {
    return { status: 'inapplicable', session: null };
  }

  if (session.state === 'ready') {
    return { status: 'resolved', session };
  }

  // A session that has advanced further is never rebuilt into an earlier state.
  if (session.state !== 'selected') {
    return { status: 'inapplicable', session };
  }

  const ready: ReadyMissionSession = { ...session, state: 'ready' };
  const result = adapter.persist({ ...snapshot, currentSession: ready });

  if (result.status === 'confirmed') {
    const written = result.snapshot.currentSession;

    return written !== null && written.state === 'ready'
      ? { status: 'advanced', session: written }
      : { status: 'unconfirmed', reason: 'read-back-mismatch' };
  }

  if (!REASONS_THAT_MAY_HAVE_LANDED.includes(result.reason)) {
    return { status: 'not-advanced', reason: result.reason };
  }

  // The outcome is unknown, so it is read rather than assumed. Where the
  // durable session is already `ready`, that fact is reported — not as a claim
  // about the write, but as what storage now says. Where the read cannot
  // establish it, nothing is claimed in either direction and no rollback is
  // written over a transition that may have succeeded.
  const recovery = adapter.hydrate();
  const recovered =
    recovery.status === 'hydrated' ? recovery.snapshot.currentSession : null;

  return recovered !== null &&
    recovered.state === 'ready' &&
    recovered.sessionId === session.sessionId
    ? { status: 'resolved', session: recovered }
    : { status: 'unconfirmed', reason: result.reason };
}


// The Mission an existing session may still show and still start. A stored
// reference keeps resolving only while its content stays reviewed, complete in
// the family's language, and approved for the context the session froze when it
// was chosen — never for the family's current setup, which cannot rewrite what
// was agreed to or turn an existing session into a new selection.
//
// Discovery eligibility is deliberately not part of this: a Mission withdrawn
// from future suggestions is not thereby unsafe for the session already holding
// it, while a withdrawal of review is, and a withdrawn Mission is never started,
// substituted or rewritten.
export function resolveSessionMission(
  session: MissionSession,
  language: SupportedLanguage,
): MissionRecord | null {
  const mission = MISSION_CATALOG.find(
    (record) => record.missionId === session.missionId,
  );

  if (
    !mission ||
    !mission.reviewed ||
    !mission.ageBands.includes(session.ageBandAtSelection)
  ) {
    return null;
  }

  const content = mission.content[language];
  const required = [
    content.title,
    content.instruction,
    ...(mission.safetyNoteRequired ? [content.safetyNote] : []),
    ...(mission.adultInvolvement === 'No special adult assistance required'
      ? []
      : [content.adultInvolvementNote]),
  ];

  return required.every((text) => text !== undefined && text.trim().length > 0)
    ? mission
    : null;
}

export type MissionStartResult =
  // The durable session is `active`. `started` wrote this start and read it
  // back; `resolved` found the session already running and wrote nothing,
  // keeping the `startedAt` it already has.
  | Readonly<{ status: 'started' | 'resolved'; session: ActiveMissionSession }>
  // Durable state was read and says the session is still `ready`: this start
  // did not happen, and the session can be started once by a later deliberate
  // activation.
  | Readonly<{
      status: 'not-started';
      reason: PersistFailureReason;
      session: ReadyMissionSession;
    }>
  // The write may have landed and a fresh read could not establish what is
  // stored. Neither a start nor the absence of one is claimed.
  | Readonly<{ status: 'unconfirmed'; reason: PersistFailureReason }>
  // Nothing here may be started: no readable snapshot, no session by that
  // identity, a session in another state, or a Mission that no longer resolves
  // to reviewed, safe content.
  | Readonly<{ status: 'unavailable' }>;

// Starting is the one deliberate action that moves a session to `active`. It is
// keyed by the identity the family acted on and decided by durable state, so a
// stale activation cannot start a different Mission and a repeat cannot start
// anything twice. It writes one `startedAt` and adds nothing else: no
// identifier, no lifecycle state, no expected end and no counter — remaining
// time is derived from what is stored, never stored itself.
export function startMissionSession(
  adapter: PersistenceAdapter,
  sessionId: string,
  now: WallClock,
  language: SupportedLanguage,
): MissionStartResult {
  const current = adapter.hydrate();

  if (current.status !== 'hydrated') {
    return { status: 'unavailable' };
  }

  const snapshot = current.snapshot;
  const session = snapshot.currentSession;

  // The request names the session the family acted on. Another current session
  // is another Mission, and a stale activation must never start it.
  if (session === null || session.sessionId !== sessionId) {
    return { status: 'unavailable' };
  }

  // Already running: the session answers with the timestamp it already carries.
  // Nothing is written, and a second reading of the clock never replaces it.
  if (session.state === 'active') {
    return { status: 'resolved', session };
  }

  // Only `ready` starts. An earlier state is not startable, and no path here
  // rebuilds `ready` over a session that has moved on.
  if (
    session.state !== 'ready' ||
    resolveSessionMission(session, language) === null
  ) {
    return { status: 'unavailable' };
  }

  const startedAt = now();

  if (!Number.isInteger(startedAt) || startedAt < 0) {
    return { status: 'unavailable' };
  }

  const active: ActiveMissionSession = { ...session, state: 'active', startedAt };
  const result = adapter.persist({ ...snapshot, currentSession: active });

  if (result.status === 'confirmed') {
    const written = result.snapshot.currentSession;

    return written !== null &&
      written.state === 'active' &&
      written.sessionId === sessionId
      ? { status: 'started', session: written }
      : { status: 'unconfirmed', reason: 'read-back-mismatch' };
  }

  if (!REASONS_THAT_MAY_HAVE_LANDED.includes(result.reason)) {
    return { status: 'not-started', reason: result.reason, session };
  }

  // The outcome is unknown, so it is read rather than assumed. A session found
  // running keeps the `startedAt` it has — this call never replaces it with a
  // later reading — and a session found ready is reported as not started
  // because that is what storage says, not because the write failed.
  const recovery = adapter.hydrate();
  const recovered =
    recovery.status === 'hydrated' ? recovery.snapshot.currentSession : null;

  if (recovered !== null && recovered.sessionId === sessionId) {
    if (recovered.state === 'active') {
      return { status: 'resolved', session: recovered };
    }

    if (recovered.state === 'ready') {
      return { status: 'not-started', reason: result.reason, session: recovered };
    }
  }

  return { status: 'unconfirmed', reason: result.reason };
}

export type MissionExitResult =
  // The current session was cleared and the replacement was read back.
  | Readonly<{ status: 'left' }>
  // Durable state holds no current session under this identity, so there is
  // nothing to clear and nothing was written. A repeat, a remount or a retry
  // after an interrupted confirmation finds this, and none of them recreates a
  // session that is already gone.
  | Readonly<{ status: 'resolved' }>
  // Established before storage changed: this session is still the current one.
  | Readonly<{
      status: 'not-left';
      reason: PersistFailureReason;
      session: CurrentMissionSession;
    }>
  // Durable state holds a different current session, or this one in a lifecycle
  // state the request was not made against. It is preserved exactly as it is and
  // handed back so the interface follows what is actually stored: a ready
  // cancellation that arrives late never abandons a Mission that has since
  // started, and no exit ever clears a session the family did not act on.
  | Readonly<{ status: 'superseded'; session: CurrentMissionSession }>
  // The write may have landed and a fresh read could not establish what is
  // stored. Neither leaving nor keeping the Mission is claimed.
  | Readonly<{ status: 'unconfirmed'; reason: PersistFailureReason }>
  // No readable snapshot, or an identity that is not the current session's to
  // leave — a completed Mission Session above all, which this operation never
  // touches.
  | Readonly<{ status: 'unavailable' }>;

// Which lifecycle state the family acted from. It travels with the request
// because the two exits are different family decisions with different
// confirmation requirements, and a request must never be honoured against a
// state it was not made against.
export type MissionExitFrom = 'ready' | 'active';

// Leaving a Mission without completing it: ready cancellation and confirmed
// abandonment are the same durable operation — the current session is cleared —
// and differ only in what the family had to do to ask for it.
//
// It is keyed by the identity the family acted on and decided by freshly read
// durable state, so a stale request cannot clear a Mission that replaced the one
// it named, and clearing the same session twice is the same outcome rather than
// a second effect. It adds nothing: no completed record, no result pointer, no
// timestamp, no identifier and no abandonment history. Everything the snapshot
// holds besides the current session is carried across untouched.
//
// Nothing here consults remaining time, the stored duration or the Mission's
// content: a family may always stop, including when guidance has fallen back to
// zero and when the Mission can no longer be shown.
export function leaveMissionSession(
  adapter: PersistenceAdapter,
  sessionId: string,
  from: MissionExitFrom,
): MissionExitResult {
  const current = adapter.hydrate();

  if (current.status !== 'hydrated') {
    return { status: 'unavailable' };
  }

  const snapshot = current.snapshot;

  // A completed Mission Session is not cancellable or abandonable, and its
  // completion and result reference are never rewritten by this path.
  if (
    snapshot.completedSessions.some((record) => record.sessionId === sessionId)
  ) {
    return { status: 'unavailable' };
  }

  const session = snapshot.currentSession;

  if (session === null) {
    return { status: 'resolved' };
  }

  // Absence is never read as permission to clear whatever is there now.
  if (session.sessionId !== sessionId || session.state !== from) {
    return { status: 'superseded', session };
  }

  const result = adapter.persist({ ...snapshot, currentSession: null });

  if (result.status === 'confirmed') {
    return result.snapshot.currentSession === null
      ? { status: 'left' }
      : { status: 'unconfirmed', reason: 'read-back-mismatch' };
  }

  if (!REASONS_THAT_MAY_HAVE_LANDED.includes(result.reason)) {
    return { status: 'not-left', reason: result.reason, session };
  }

  // The outcome is unknown, so it is read rather than assumed. A session found
  // gone is reported as gone — not as a claim about this write — and is never
  // written back. A session found still present is reported as still present,
  // so the retry runs under the same confirmation the first attempt did.
  const recovery = adapter.hydrate();

  if (recovery.status !== 'hydrated') {
    return { status: 'unconfirmed', reason: result.reason };
  }

  const recovered = recovery.snapshot.currentSession;

  if (recovered === null) {
    return { status: 'resolved' };
  }

  return recovered.sessionId === sessionId && recovered.state === from
    ? { status: 'not-left', reason: result.reason, session: recovered }
    : { status: 'superseded', session: recovered };
}
