import { AGE_BANDS, type AgeBand } from './ageBands';
import { MISSION_CATEGORIES, type MissionCategory } from './catalog';
import {
  DEFAULT_LANGUAGE,
  resolveSupportedLanguage,
  type SupportedLanguage,
} from './localization';

export const MISSIONKID_STORAGE_KEY = 'missionkid:snapshot';
export const CURRENT_SNAPSHOT_VERSION = 1 as const;

export { AGE_BANDS, type AgeBand } from './ageBands';

export type ChildProfile = Readonly<{
  localProfileId: string;
  // Hydration can preserve trusted identity while age still needs selection.
  ageBand: AgeBand | null;
}>;

// The durable facts of one Mission Session. The selection facts are snapshots
// taken when the Mission was chosen, so a later catalog release or a later
// setup edit cannot rewrite what was agreed to. No localized Mission text lives
// here: presentation always resolves from the static catalog.
type MissionSessionSelectionFacts = Readonly<{
  sessionId: string;
  childProfileId: string;
  missionId: string;
  missionCategoryAtSelection: MissionCategory;
  ageBandAtSelection: AgeBand;
  // Epoch milliseconds, written once when the session is created.
  selectedAt: number;
}>;

// A guidance duration that can drive a countdown: positive whole seconds,
// captured at selection and immutable from then on.
type GuidanceDuration = Readonly<{
  durationSecondsAtSelection: number;
}>;

// A session that has already started keeps exactly the duration stored with it.
// A missing, non-finite, zero or negative value cannot guide a countdown, but it
// is a fact about stored data rather than a reason to discard a Mission the
// family is in the middle of: guidance degrades to zero and the session stays
// usable. `null` is how a non-finite number survives JSON, and an absent key is
// how a missing one does; neither is replaced with an invented duration.
type RecoveredGuidanceDuration = Readonly<{
  durationSecondsAtSelection?: number | null;
}>;

export type SelectedMissionSession = MissionSessionSelectionFacts &
  GuidanceDuration &
  Readonly<{ state: 'selected' }>;

export type ReadyMissionSession = MissionSessionSelectionFacts &
  GuidanceDuration &
  Readonly<{ state: 'ready' }>;

export type ActiveMissionSession = MissionSessionSelectionFacts &
  RecoveredGuidanceDuration &
  Readonly<{
    state: 'active';
    // Epoch milliseconds, written once on the deliberate start.
    startedAt: number;
  }>;

export type CompletedMissionSession = MissionSessionSelectionFacts &
  RecoveredGuidanceDuration &
  Readonly<{
    state: 'completed';
    startedAt: number;
    // Never earlier than `startedAt`, written once on the accepted completion.
    completedAt: number;
    // `YYYY-MM` in the local calendar context current at completion, fixed once
    // and never re-derived: a later timezone change cannot reassign a period.
    completionPeriodId: string;
  }>;

// `selected`, `ready` and `active` are the only states the current position may
// hold. `completed` belongs to the completed collection alone.
export type CurrentMissionSession =
  | SelectedMissionSession
  | ReadyMissionSession
  | ActiveMissionSession;

export type MissionSession = CurrentMissionSession | CompletedMissionSession;

export type MissionKidSnapshot = Readonly<{
  snapshotVersion: typeof CURRENT_SNAPSHOT_VERSION;
  settings: Readonly<{
    language: SupportedLanguage;
  }>;
  childProfile: ChildProfile | null;
  currentSession: CurrentMissionSession | null;
  // A navigation and recovery reference to one completed session, never a
  // second completion record. It cannot coexist with a current session.
  currentResultSessionId: string | null;
  completedSessions: readonly CompletedMissionSession[];
}>;

export type HydrationResult =
  | Readonly<{ status: 'absent' }>
  | Readonly<{ status: 'hydrated'; snapshot: MissionKidSnapshot }>
  | Readonly<{ status: 'corrupted' }>
  | Readonly<{ status: 'unsupported-version'; version: number }>
  | Readonly<{ status: 'unavailable' }>;

export type PersistFailureReason =
  | 'invalid-snapshot'
  | 'serialization-failed'
  | 'write-failed'
  // Stored data holds a completed record that cannot be safely retained, so no
  // snapshot-replacing write may run while that condition lasts. Nothing was
  // attempted and the stored value is exactly what it was.
  | 'blocked-completed-record'
  | 'read-back-failed'
  | 'read-back-invalid'
  | 'read-back-mismatch';

export type PersistResult =
  | Readonly<{ status: 'confirmed'; snapshot: MissionKidSnapshot }>
  | Readonly<{ status: 'unconfirmed'; reason: PersistFailureReason }>;

export type ResetFailureReason =
  | 'remove-failed'
  | 'read-back-failed'
  | 'snapshot-still-present';

export type ResetResult =
  | Readonly<{ status: 'confirmed' }>
  | Readonly<{ status: 'unconfirmed'; reason: ResetFailureReason }>;

export type SnapshotStorage = Pick<
  Storage,
  'getItem' | 'setItem' | 'removeItem'
>;

export type SnapshotSerializer = (snapshot: MissionKidSnapshot) => string;

export type PersistenceAdapter = Readonly<{
  hydrate: () => HydrationResult;
  persist: (snapshot: MissionKidSnapshot) => PersistResult;
  reset: () => ResetResult;
}>;

type SnapshotValidationResult =
  | Readonly<{
      status: 'valid';
      snapshot: MissionKidSnapshot;
      normalized: boolean;
      // One or more completed records could not be safely retained: an invalid
      // record, or copies of one identifier that disagree. They are excluded
      // from everything derived and they block later writes (D4-B).
      unresolvedCompletions: boolean;
    }>
  | Readonly<{ status: 'invalid' }>
  | Readonly<{ status: 'unsupported-version'; version: number }>;

const SNAPSHOT_KEYS = [
  'snapshotVersion',
  'settings',
  'childProfile',
  'currentSession',
  'currentResultSessionId',
  'completedSessions',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasOwn(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowedKeys: readonly string[],
): boolean {
  return Object.keys(value).every((key) => allowedKeys.includes(key));
}

function hasExactKeys(
  value: Record<string, unknown>,
  expectedKeys: readonly string[],
): boolean {
  return (
    Object.keys(value).length === expectedKeys.length &&
    expectedKeys.every((key) => hasOwn(value, key))
  );
}

// Every required key present and no key beyond the two lists. An optional key is
// how a stored session that never carried a duration stays readable without the
// absence being repaired into a number.
function hasKeys(
  value: Record<string, unknown>,
  requiredKeys: readonly string[],
  optionalKeys: readonly string[],
): boolean {
  return (
    requiredKeys.every((key) => hasOwn(value, key)) &&
    hasOnlyKeys(value, [...requiredKeys, ...optionalKeys])
  );
}

function isAgeBand(value: unknown): value is AgeBand {
  return AGE_BANDS.some((ageBand) => ageBand === value);
}

function isMissionCategory(value: unknown): value is MissionCategory {
  return MISSION_CATEGORIES.some((category) => category === value);
}

function isLocalProfileId(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isEpochMilliseconds(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function isGuidanceDurationSeconds(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}

// What a started session may carry in place of usable guidance. Anything that is
// not a number, `null` or absent is a shape violation rather than a malformed
// duration, and is refused like any other unreadable field.
function isRecoveredDurationSeconds(value: unknown): boolean {
  return value === undefined || value === null || typeof value === 'number';
}

// D2: the local calendar year and month fixed at completion. The stored value is
// checked for shape only and never recomputed from `completedAt`, because a
// later timezone or clock-context change must not reassign a period identity
// that was already fixed.
const COMPLETION_PERIOD_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

function isCompletionPeriodId(value: unknown): value is string {
  return typeof value === 'string' && COMPLETION_PERIOD_PATTERN.test(value);
}

const SELECTION_FACT_KEYS = [
  'sessionId',
  'childProfileId',
  'missionId',
  'missionCategoryAtSelection',
  'ageBandAtSelection',
  'state',
  'selectedAt',
] as const;

const DURATION_KEYS = ['durationSecondsAtSelection'] as const;

// Before a start there is nothing else to carry, so the key set is exact: a
// stored `startedAt`, `completedAt` or `completionPeriodId` makes the session
// invalid rather than being quietly dropped, because silently repairing one
// would invent a lifecycle fact.
const UNSTARTED_SESSION_KEYS = [
  ...SELECTION_FACT_KEYS,
  ...DURATION_KEYS,
] as const;

const ACTIVE_SESSION_KEYS = [...SELECTION_FACT_KEYS, 'startedAt'] as const;

const COMPLETED_SESSION_KEYS = [
  ...SELECTION_FACT_KEYS,
  'startedAt',
  'completedAt',
  'completionPeriodId',
] as const;

// Every field any lifecycle state can carry, for comparison rather than for
// validation: a field the expected state does not carry must also be absent
// from what was read back.
const MISSION_SESSION_KEYS = [
  ...SELECTION_FACT_KEYS,
  ...DURATION_KEYS,
  'startedAt',
  'completedAt',
  'completionPeriodId',
] as const;

// The facts every session carries whatever its state. A session belongs to the
// profile that made the selection, so a session without that profile to own it
// is not a session this snapshot can hold.
//
// The Mission reference is checked for shape only. Whether it still resolves to
// reviewed, safe catalog content is a flow decision, not a storage one: the
// record-level trust rules keep such a session and refuse to start it rather
// than discarding the family's selection.
function hasSelectionFacts(
  value: Record<string, unknown>,
  childProfileId: string | null,
): boolean {
  return (
    isLocalProfileId(value.sessionId) &&
    isLocalProfileId(value.childProfileId) &&
    value.childProfileId === childProfileId &&
    isLocalProfileId(value.missionId) &&
    isMissionCategory(value.missionCategoryAtSelection) &&
    isAgeBand(value.ageBandAtSelection) &&
    isEpochMilliseconds(value.selectedAt)
  );
}

function isSelectedSession(
  value: unknown,
  childProfileId: string | null,
): value is SelectedMissionSession {
  return (
    isRecord(value) &&
    hasExactKeys(value, UNSTARTED_SESSION_KEYS) &&
    hasSelectionFacts(value, childProfileId) &&
    isGuidanceDurationSeconds(value.durationSecondsAtSelection) &&
    value.state === 'selected'
  );
}

function isReadySession(
  value: unknown,
  childProfileId: string | null,
): value is ReadyMissionSession {
  return (
    isRecord(value) &&
    hasExactKeys(value, UNSTARTED_SESSION_KEYS) &&
    hasSelectionFacts(value, childProfileId) &&
    isGuidanceDurationSeconds(value.durationSecondsAtSelection) &&
    value.state === 'ready'
  );
}

// The structural requirement for `active` is one valid `startedAt`. A malformed
// duration degrades guidance to zero instead of invalidating a Mission that is
// already running, and a stored `completedAt` is an impossible combination that
// is refused rather than repaired.
function isActiveSession(
  value: unknown,
  childProfileId: string | null,
): value is ActiveMissionSession {
  return (
    isRecord(value) &&
    hasKeys(value, ACTIVE_SESSION_KEYS, DURATION_KEYS) &&
    hasSelectionFacts(value, childProfileId) &&
    isRecoveredDurationSeconds(value.durationSecondsAtSelection) &&
    value.state === 'active' &&
    isEpochMilliseconds(value.startedAt)
  );
}

// A completed session is terminal, so its completion facts are required and its
// timestamps must be possible in that order. Its duration is read the same way
// an active session's is: completing a Mission whose duration was malformed is
// available by specification, and the completion must not invent one.
function isCompletedSession(
  value: unknown,
  childProfileId: string | null,
): value is CompletedMissionSession {
  return (
    isRecord(value) &&
    hasKeys(value, COMPLETED_SESSION_KEYS, DURATION_KEYS) &&
    hasSelectionFacts(value, childProfileId) &&
    isRecoveredDurationSeconds(value.durationSecondsAtSelection) &&
    value.state === 'completed' &&
    isEpochMilliseconds(value.startedAt) &&
    isEpochMilliseconds(value.completedAt) &&
    value.completedAt >= value.startedAt &&
    isCompletionPeriodId(value.completionPeriodId)
  );
}

function isCurrentSession(
  value: unknown,
  childProfileId: string | null,
): value is CurrentMissionSession {
  return (
    isSelectedSession(value, childProfileId) ||
    isReadySession(value, childProfileId) ||
    isActiveSession(value, childProfileId)
  );
}

function fieldsMatch<TKey extends string>(
  keys: readonly TKey[],
  expected: Readonly<Partial<Record<TKey, unknown>>>,
  actual: Readonly<Partial<Record<TKey, unknown>>>,
): boolean {
  return keys.every((key) => expected[key] === actual[key]);
}

// Field by field, because a stored session is a parsed object that is never
// reference-equal to the one it was written from. Reference equality would have
// confirmed any read-back at all. Every lifecycle field is compared, so a state
// that differs, or a timestamp present on one side only, cannot pass as equal.
function sessionsMatch(
  expected: MissionSession | null,
  actual: MissionSession | null,
): boolean {
  if (expected === null || actual === null) return expected === actual;

  return fieldsMatch(MISSION_SESSION_KEYS, expected, actual);
}

// Keyed by identifier rather than by position: two collections of equal length
// are not the same collection, and every record that was intended to be written
// must be present with every field it was written with.
function completedSessionsMatch(
  expected: readonly CompletedMissionSession[],
  actual: readonly CompletedMissionSession[],
): boolean {
  if (expected.length !== actual.length) return false;

  const actualById = new Map(
    actual.map((session) => [session.sessionId, session] as const),
  );

  return expected.every((session) => {
    const stored = actualById.get(session.sessionId);

    return stored !== undefined && sessionsMatch(session, stored);
  });
}

function validateSnapshot(value: unknown): SnapshotValidationResult {
  if (!isRecord(value) || !hasOwn(value, 'snapshotVersion')) {
    return { status: 'invalid' };
  }

  if (typeof value.snapshotVersion !== 'number') {
    return { status: 'invalid' };
  }

  if (value.snapshotVersion !== CURRENT_SNAPSHOT_VERSION) {
    return {
      status: 'unsupported-version',
      version: value.snapshotVersion,
    };
  }

  if (!hasExactKeys(value, SNAPSHOT_KEYS)) {
    return { status: 'invalid' };
  }

  if (
    !isRecord(value.settings) ||
    !hasOnlyKeys(value.settings, ['language'])
  ) {
    return { status: 'invalid' };
  }

  const language = resolveSupportedLanguage(value.settings.language);
  let normalized = value.settings.language !== language;
  let childProfile: ChildProfile | null;

  if (value.childProfile === null) {
    childProfile = null;
  } else if (
    isRecord(value.childProfile) &&
    hasOnlyKeys(value.childProfile, ['localProfileId', 'ageBand']) &&
    hasOwn(value.childProfile, 'localProfileId') &&
    isLocalProfileId(value.childProfile.localProfileId)
  ) {
    if (isAgeBand(value.childProfile.ageBand)) {
      childProfile = {
        localProfileId: value.childProfile.localProfileId,
        ageBand: value.childProfile.ageBand,
      };
    } else {
      // An invalid age band makes setup incomplete; it leaves the profile's
      // completed sessions exactly where they are.
      childProfile = {
        localProfileId: value.childProfile.localProfileId,
        ageBand: null,
      };
      normalized = true;
    }
  } else {
    return { status: 'invalid' };
  }

  if (!Array.isArray(value.completedSessions)) {
    return { status: 'invalid' };
  }

  const childProfileId = childProfile?.localProfileId ?? null;

  // Completed sessions are judged one record at a time: a single impossible or
  // conflicting record must not make the whole snapshot unreadable, because the
  // valid completions around it are durable facts the family earned. Exclusion
  // is a read-time decision about what may be derived, never a deletion.
  const validCompleted = new Map<string, CompletedMissionSession>();
  const storedCompletedIds = new Set<string>();
  const conflictingIds = new Set<string>();
  let unresolvedCompletions = false;

  for (const entry of value.completedSessions) {
    if (!isCompletedSession(entry, childProfileId)) {
      unresolvedCompletions = true;
      normalized = true;
      continue;
    }

    storedCompletedIds.add(entry.sessionId);
    const firstCopy = validCompleted.get(entry.sessionId);

    if (firstCopy === undefined) {
      validCompleted.set(entry.sessionId, entry);
      continue;
    }

    // Identical copies of one completion coalesce by stable identifier, so the
    // session counts once. Copies that disagree are a completion nobody can
    // read: none of them is chosen, and none is invented in their place.
    normalized = true;

    if (!sessionsMatch(firstCopy, entry)) {
      conflictingIds.add(entry.sessionId);
      unresolvedCompletions = true;
    }
  }

  for (const sessionId of conflictingIds) {
    validCompleted.delete(sessionId);
  }

  let currentSession: CurrentMissionSession | null = null;

  if (value.currentSession !== null) {
    if (!isCurrentSession(value.currentSession, childProfileId)) {
      return { status: 'invalid' };
    }

    // One identifier cannot name both an unfinished Mission and a finished one.
    // Nothing here can decide which of the two is true, so nothing is repaired.
    if (storedCompletedIds.has(value.currentSession.sessionId)) {
      return { status: 'invalid' };
    }

    currentSession = value.currentSession;
  }

  // The pointer is a navigation reference, so an unusable one is rejected by
  // itself: the completed sessions it failed to name stay exactly as they are,
  // and an unfinished session it could not coexist with is kept rather than
  // discarded for the sake of a reference that can be derived again.
  let currentResultSessionId: string | null = null;

  if (value.currentResultSessionId !== null) {
    if (
      typeof value.currentResultSessionId === 'string' &&
      currentSession === null &&
      validCompleted.has(value.currentResultSessionId)
    ) {
      currentResultSessionId = value.currentResultSessionId;
    } else {
      normalized = true;
    }
  }

  return {
    status: 'valid',
    normalized,
    unresolvedCompletions,
    snapshot: {
      snapshotVersion: CURRENT_SNAPSHOT_VERSION,
      settings: { language },
      childProfile,
      currentSession,
      currentResultSessionId,
      completedSessions: [...validCompleted.values()],
    },
  };
}

function parseStoredSnapshot(rawSnapshot: string): SnapshotValidationResult {
  try {
    return validateSnapshot(JSON.parse(rawSnapshot));
  } catch {
    return { status: 'invalid' };
  }
}

function snapshotsMatch(
  expected: MissionKidSnapshot,
  actual: MissionKidSnapshot,
): boolean {
  return (
    expected.snapshotVersion === actual.snapshotVersion &&
    expected.settings.language === actual.settings.language &&
    expected.childProfile?.localProfileId ===
      actual.childProfile?.localProfileId &&
    expected.childProfile?.ageBand === actual.childProfile?.ageBand &&
    sessionsMatch(expected.currentSession, actual.currentSession) &&
    expected.currentResultSessionId === actual.currentResultSessionId &&
    completedSessionsMatch(expected.completedSessions, actual.completedSessions)
  );
}

function serializeSnapshot(snapshot: MissionKidSnapshot): string {
  const serialized = JSON.stringify(snapshot);

  if (typeof serialized !== 'string') {
    throw new Error('MissionKid snapshot could not be serialized.');
  }

  return serialized;
}

export function createEmptySnapshot(): MissionKidSnapshot {
  return {
    snapshotVersion: CURRENT_SNAPSHOT_VERSION,
    settings: { language: DEFAULT_LANGUAGE },
    childProfile: null,
    currentSession: null,
    currentResultSessionId: null,
    completedSessions: [],
  };
}

// What storage currently holds, or nothing readable. A read that throws or finds
// no entry says nothing about completed records, and the write that follows
// reports what storage actually does rather than guessing here.
function readStoredSnapshot(
  storage: SnapshotStorage,
): SnapshotValidationResult | null {
  let rawSnapshot: string | null;

  try {
    rawSnapshot = storage.getItem(MISSIONKID_STORAGE_KEY);
  } catch {
    return null;
  }

  return rawSnapshot === null ? null : parseStoredSnapshot(rawSnapshot);
}

export function createPersistenceAdapter(
  storage: SnapshotStorage,
  serialize: SnapshotSerializer = serializeSnapshot,
): PersistenceAdapter {
  return {
    hydrate() {
      let rawSnapshot: string | null;

      try {
        rawSnapshot = storage.getItem(MISSIONKID_STORAGE_KEY);
      } catch {
        return { status: 'unavailable' };
      }

      if (rawSnapshot === null) {
        return { status: 'absent' };
      }

      const validation = parseStoredSnapshot(rawSnapshot);

      switch (validation.status) {
        case 'valid':
          return { status: 'hydrated', snapshot: validation.snapshot };
        case 'unsupported-version':
          return validation;
        case 'invalid':
          return { status: 'corrupted' };
      }
    },

    persist(snapshot) {
      const intendedSnapshot = validateSnapshot(snapshot);

      if (
        intendedSnapshot.status !== 'valid' ||
        intendedSnapshot.normalized ||
        !snapshotsMatch(snapshot, intendedSnapshot.snapshot)
      ) {
        return { status: 'unconfirmed', reason: 'invalid-snapshot' };
      }

      // D4-B, enforced here rather than by the caller: a snapshot that simply
      // omits the records in question must not carry a write past the
      // condition. Nothing has been written yet, so a refusal leaves the stored
      // value exactly as it is, and a later read that no longer finds the
      // condition lets the same write through.
      const storedSnapshot = readStoredSnapshot(storage);

      if (
        storedSnapshot?.status === 'valid' &&
        storedSnapshot.unresolvedCompletions
      ) {
        return { status: 'unconfirmed', reason: 'blocked-completed-record' };
      }

      let serialized: string;

      try {
        serialized = serialize(intendedSnapshot.snapshot);
      } catch {
        return { status: 'unconfirmed', reason: 'serialization-failed' };
      }

      try {
        storage.setItem(MISSIONKID_STORAGE_KEY, serialized);
      } catch {
        return { status: 'unconfirmed', reason: 'write-failed' };
      }

      let rawReadBack: string | null;

      try {
        rawReadBack = storage.getItem(MISSIONKID_STORAGE_KEY);
      } catch {
        return { status: 'unconfirmed', reason: 'read-back-failed' };
      }

      if (rawReadBack === null) {
        return { status: 'unconfirmed', reason: 'read-back-mismatch' };
      }

      const readBack = parseStoredSnapshot(rawReadBack);

      // A read-back parsed with any normalization is not the snapshot that was
      // intended: a coalesced, excluded or resolved value read back as equal
      // would confirm a write that did not store what it claimed to store.
      if (readBack.status !== 'valid' || readBack.normalized) {
        return { status: 'unconfirmed', reason: 'read-back-invalid' };
      }

      if (!snapshotsMatch(intendedSnapshot.snapshot, readBack.snapshot)) {
        return { status: 'unconfirmed', reason: 'read-back-mismatch' };
      }

      return { status: 'confirmed', snapshot: readBack.snapshot };
    },

    reset() {
      try {
        storage.removeItem(MISSIONKID_STORAGE_KEY);
      } catch {
        return { status: 'unconfirmed', reason: 'remove-failed' };
      }

      let rawReadBack: string | null;

      try {
        rawReadBack = storage.getItem(MISSIONKID_STORAGE_KEY);
      } catch {
        return { status: 'unconfirmed', reason: 'read-back-failed' };
      }

      return rawReadBack === null
        ? { status: 'confirmed' }
        : { status: 'unconfirmed', reason: 'snapshot-still-present' };
    },
  };
}

const browserStorage: SnapshotStorage = {
  getItem(key) {
    return window.localStorage.getItem(key);
  },
  setItem(key, value) {
    window.localStorage.setItem(key, value);
  },
  removeItem(key) {
    window.localStorage.removeItem(key);
  },
};

export const persistenceAdapter = createPersistenceAdapter(browserStorage);
