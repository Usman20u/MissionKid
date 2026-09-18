import type { MissionRecord } from './catalog';
import { isEligibleForContext } from './catalogValidation';
import type { SuggestionContext } from './missionSuggestions';
import type {
  CurrentMissionSession,
  PersistFailureReason,
  PersistenceAdapter,
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
