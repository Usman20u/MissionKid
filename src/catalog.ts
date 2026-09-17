import { AGE_BANDS, type AgeBand } from './ageBands';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from './localization';

// Canonical domain values remain unchanged across localizations.
export const MISSION_CATEGORIES = [
  'Movement',
  'Creativity',
  'Helping at Home',
  'Learning',
  'Calm',
] as const;

export type MissionCategory = (typeof MISSION_CATEGORIES)[number];

export const ADULT_INVOLVEMENT_LEVELS = [
  'No special adult assistance required',
  'Adult nearby required',
  'Adult participation required',
] as const;

export type AdultInvolvement = (typeof ADULT_INVOLVEMENT_LEVELS)[number];

export type MissionLocalizedContent = Readonly<{
  title: string;
  instruction: string;
  adultInvolvementNote?: string;
  safetyNote?: string;
}>;

export type MissionRecord = Readonly<{
  missionId: string;
  category: MissionCategory;
  ageBands: readonly AgeBand[];
  durationSeconds: number;
  content: Readonly<Record<SupportedLanguage, MissionLocalizedContent>>;
  adultInvolvement: AdultInvolvement;
  // Content review determines whether a safety/material/environment note is needed.
  safetyNoteRequired: boolean;
  catalogOrder: number;
  contentVersion: string;
  // Review covers age suitability, safety, adult-content consistency and translation meaning.
  reviewed: boolean;
  discoveryEligible: boolean;
}>;

export type MissionRecordValidationResult =
  | Readonly<{ status: 'valid'; mission: MissionRecord }>
  | Readonly<{ status: 'invalid' }>;

const MISSION_KEYS = [
  'missionId', 'category', 'ageBands', 'durationSeconds', 'content',
  'adultInvolvement', 'safetyNoteRequired', 'catalogOrder', 'contentVersion',
  'reviewed', 'discoveryEligible',
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasExactKeys(value: Record<string, unknown>, keys: readonly string[]) {
  return Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key));
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isWholeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && Number.isInteger(value);
}

function hasValidRecordShape(value: unknown): value is MissionRecord {
  if (!isRecord(value) || !hasExactKeys(value, MISSION_KEYS)) return false;

  if (
    !isNonEmptyText(value.missionId) ||
    !MISSION_CATEGORIES.some((category) => category === value.category) ||
    !Array.isArray(value.ageBands) || value.ageBands.length === 0 ||
    !Array.from(value.ageBands).every((age) => AGE_BANDS.some((band) => band === age)) ||
    !isWholeNumber(value.durationSeconds) || value.durationSeconds <= 0 ||
    !ADULT_INVOLVEMENT_LEVELS.some((level) => level === value.adultInvolvement) ||
    typeof value.safetyNoteRequired !== 'boolean' ||
    !isWholeNumber(value.catalogOrder) || value.catalogOrder < 0 ||
    !isNonEmptyText(value.contentVersion) ||
    value.reviewed !== true || value.discoveryEligible !== true
  ) return false;

  const content = value.content;
  if (!isRecord(content) || !hasExactKeys(content, SUPPORTED_LANGUAGES)) return false;

  const localizations = SUPPORTED_LANGUAGES.map((language) => content[language]);
  const needsAdultNote = value.adultInvolvement !== 'No special adult assistance required' ||
    localizations.some((entry) => isRecord(entry) && Object.hasOwn(entry, 'adultInvolvementNote'));
  const needsSafetyNote = value.safetyNoteRequired ||
    localizations.some((entry) => isRecord(entry) && Object.hasOwn(entry, 'safetyNote'));

  return localizations.every((entry) =>
    isRecord(entry) &&
    Object.keys(entry).every((key) =>
      ['title', 'instruction', 'adultInvolvementNote', 'safetyNote'].includes(key)) &&
    Object.hasOwn(entry, 'title') && isNonEmptyText(entry.title) &&
    Object.hasOwn(entry, 'instruction') && isNonEmptyText(entry.instruction) &&
    (!needsAdultNote || (Object.hasOwn(entry, 'adultInvolvementNote') && isNonEmptyText(entry.adultInvolvementNote))) &&
    (!needsSafetyNote || (Object.hasOwn(entry, 'safetyNote') && isNonEmptyText(entry.safetyNote)))
  );
}

// Structural validation trusts the recorded human review; it cannot assess prose meaning.
// Identifier uniqueness is checked separately against the supplied collection.
export function validateMissionRecord(value: unknown): MissionRecordValidationResult {
  return hasValidRecordShape(value)
    ? { status: 'valid', mission: value }
    : { status: 'invalid' };
}

// Results retain input positions. Even an otherwise-invalid record participates in
// duplicate detection, so no record with an ambiguous identity can pass.
export function validateMissionRecords(
  values: readonly unknown[],
): readonly MissionRecordValidationResult[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    if (isRecord(value) && isNonEmptyText(value.missionId)) {
      counts.set(value.missionId, (counts.get(value.missionId) ?? 0) + 1);
    }
  }

  return Array.from(values, (value) => {
    const result = validateMissionRecord(value);
    return result.status === 'valid' && counts.get(result.mission.missionId) !== 1
      ? { status: 'invalid' }
      : result;
  });
}
