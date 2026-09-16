import type { MissionRecord } from './catalog';
import { isEligibleForContext } from './catalogValidation';
import type { SuggestionContext } from './missionSuggestions';
import type {
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
  // `resolved` is the same session answering a repeated choice: nothing was
  // minted, nothing was written, and nothing about it moved.
  | Readonly<{ status: 'created' | 'resolved'; session: SelectedMissionSession }>
  // Another Mission already owns the current session. Task 8 presents the
  // return-or-abandon choice; this result only carries what it will need.
  | Readonly<{ status: 'conflict'; session: SelectedMissionSession }>
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
    // second choice. It resolves to the session that already exists: no new
    // identifier, no new timestamp, no second write.
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

  return result.status === 'confirmed' && result.snapshot.currentSession
    ? { status: 'created', session: result.snapshot.currentSession }
    : result.status === 'confirmed'
      ? { status: 'unconfirmed', reason: 'read-back-mismatch' }
      : { status: 'unconfirmed', reason: result.reason };
}
