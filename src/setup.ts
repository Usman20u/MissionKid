import { isSupportedLanguage, type SupportedLanguage } from './localization';
import {
  AGE_BANDS,
  createEmptySnapshot,
  type AgeBand,
  type HydrationResult,
  type MissionKidSnapshot,
  type PersistenceAdapter,
  type PersistFailureReason,
} from './persistence';

type SetupChoices = Readonly<{
  language: SupportedLanguage;
  ageBand: AgeBand;
  localProfileId: string | null;
}>;

// Reset belongs to the F001 domain; only the adapter removes browser data.
export function resetSetup(adapter: PersistenceAdapter) {
  const before = adapter.hydrate();
  const result = adapter.reset();
  return result.status === 'confirmed'
    ? { status: 'confirmed' as const }
    : { status: 'unconfirmed' as const, before, recovery: adapter.hydrate() };
}

export type SaveSetupResult =
  | Readonly<{ status: 'confirmed'; snapshot: MissionKidSnapshot }>
  | Readonly<{
      status: 'unconfirmed';
      reason:
        | PersistFailureReason
        | 'corrupted'
        | 'unsupported-version'
        | 'unavailable';
      localProfileId: string | null;
      before: HydrationResult;
      recovery: HydrationResult;
    }>;

// F001 owns settings/profile changes; the adapter owns validation and storage.
export function saveSetup(
  adapter: PersistenceAdapter,
  choices: SetupChoices,
  createProfileId: () => string,
): SaveSetupResult {
  const current = adapter.hydrate();

  if (current.status !== 'absent' && current.status !== 'hydrated') {
    return {
      status: 'unconfirmed',
      reason: current.status,
      localProfileId: choices.localProfileId,
      before: current,
      recovery: current,
    };
  }

  if (
    !isSupportedLanguage(choices.language) ||
    !AGE_BANDS.includes(choices.ageBand)
  ) {
    return {
      status: 'unconfirmed',
      reason: 'invalid-snapshot',
      localProfileId: choices.localProfileId,
      before: current,
      recovery: current,
    };
  }

  const snapshot =
    current.status === 'hydrated' ? current.snapshot : createEmptySnapshot();
  const localProfileId =
    snapshot.childProfile?.localProfileId ??
    (choices.localProfileId?.trim() ? choices.localProfileId : createProfileId());
  const result = adapter.persist({
    ...snapshot,
    settings: { ...snapshot.settings, language: choices.language },
    childProfile: { localProfileId, ageBand: choices.ageBand },
  });

  if (result.status === 'confirmed') {
    return result;
  }

  return {
    ...result,
    localProfileId,
    before: current,
    recovery: adapter.hydrate(),
  };
}
