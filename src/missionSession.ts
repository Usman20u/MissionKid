import type { MissionRecord } from './catalog';
import { isEligibleForContext } from './catalogValidation';
import type { SuggestionContext } from './missionSuggestions';
import type {
  CurrentMissionSession,
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
