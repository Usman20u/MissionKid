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
export type SelectedMissionSession = Readonly<{
  sessionId: string;
  childProfileId: string;
  missionId: string;
  missionCategoryAtSelection: MissionCategory;
  ageBandAtSelection: AgeBand;
  durationSecondsAtSelection: number;
  state: 'selected';
  // Epoch milliseconds, written once when the session is created.
  selectedAt: number;
}>;

export type MissionKidSnapshot = Readonly<{
  snapshotVersion: typeof CURRENT_SNAPSHOT_VERSION;
  settings: Readonly<{
    language: SupportedLanguage;
  }>;
  childProfile: ChildProfile | null;
  // `ready` and `active` are later lifecycle states and are not accepted yet.
  currentSession: SelectedMissionSession | null;
  currentResultSessionId: null;
  completedSessions: readonly [];
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

function isAgeBand(value: unknown): value is AgeBand {
  return AGE_BANDS.some((ageBand) => ageBand === value);
}

function isLocalProfileId(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

const SELECTED_SESSION_KEYS = [
  'sessionId',
  'childProfileId',
  'missionId',
  'missionCategoryAtSelection',
  'ageBandAtSelection',
  'durationSecondsAtSelection',
  'state',
  'selectedAt',
] as const;

function isEpochMilliseconds(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

// Stored sessions are untrusted input. The exact key set is required, so a
// stored `startedAt`, `completedAt` or `completionPeriodId` makes the session
// invalid rather than being quietly dropped: this task cannot produce them, and
// silently repairing a session would invent a lifecycle fact.
//
// The Mission reference is checked for shape only. Whether it still resolves to
// reviewed, safe catalog content is a flow decision, not a storage one: the
// record-level trust rules keep such a session and refuse to start it rather
// than discarding the family's selection.
function isSelectedSession(
  value: unknown,
  childProfileId: string | null,
): value is SelectedMissionSession {
  return (
    isRecord(value) &&
    hasExactKeys(value, SELECTED_SESSION_KEYS) &&
    isLocalProfileId(value.sessionId) &&
    isLocalProfileId(value.childProfileId) &&
    value.childProfileId === childProfileId &&
    isLocalProfileId(value.missionId) &&
    MISSION_CATEGORIES.some((category) => category === value.missionCategoryAtSelection) &&
    isAgeBand(value.ageBandAtSelection) &&
    typeof value.durationSecondsAtSelection === 'number' &&
    Number.isInteger(value.durationSecondsAtSelection) &&
    value.durationSecondsAtSelection > 0 &&
    value.state === 'selected' &&
    isEpochMilliseconds(value.selectedAt)
  );
}

// Field by field, because a stored session is a parsed object that is never
// reference-equal to the one it was written from. Reference equality would have
// confirmed any read-back at all.
function sessionsMatch(
  expected: SelectedMissionSession | null,
  actual: SelectedMissionSession | null,
): boolean {
  if (expected === null || actual === null) return expected === actual;

  return SELECTED_SESSION_KEYS.every((key) => expected[key] === actual[key]);
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
      childProfile = {
        localProfileId: value.childProfile.localProfileId,
        ageBand: null,
      };
      normalized = true;
    }
  } else {
    return { status: 'invalid' };
  }

  if (
    value.currentResultSessionId !== null ||
    !Array.isArray(value.completedSessions) ||
    value.completedSessions.length !== 0
  ) {
    return { status: 'invalid' };
  }

  // A session belongs to the profile that made the selection, so a session
  // without a profile to own it is not a repairable snapshot.
  let currentSession: SelectedMissionSession | null = null;

  if (value.currentSession !== null) {
    if (!isSelectedSession(value.currentSession, childProfile?.localProfileId ?? null)) {
      return { status: 'invalid' };
    }

    currentSession = value.currentSession;
  }

  return {
    status: 'valid',
    normalized,
    snapshot: {
      snapshotVersion: CURRENT_SNAPSHOT_VERSION,
      settings: { language },
      childProfile,
      currentSession,
      currentResultSessionId: null,
      completedSessions: [],
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
    expected.completedSessions.length === actual.completedSessions.length
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
