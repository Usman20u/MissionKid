import { AGE_BANDS, type AgeBand } from './ageBands';

// Presentation only, keyed by the stable Mission identifier and one age band the
// catalog approves that Mission for. This adds no field to Mission catalog
// content, no persisted value and no snapshot data: the catalog remains the
// single source of what a Mission is and whom it suits, and a Mission and age
// band with no entry here renders its authored scene exactly as before.
//
// Each Mission illustration is a reviewed file bundled with the application by
// the ordinary build, in two widths, named `<missionId>__<age band>__<width>`.
// Nothing is fetched from another origin and nothing is generated at runtime.
//
const FILES = import.meta.glob<string>('./assets/missions/*.webp', {
  eager: true,
  import: 'default',
});

const FILE_NAME = /\/([a-z]+-\d+)__(\d+-\d+)__(768|1536)\.webp$/;

// The file names spell an age band with an ASCII hyphen; the product's own
// value uses the en dash the catalog uses.
const AGE_BAND_BY_FILE_LABEL: Readonly<Record<string, AgeBand>> = Object.fromEntries(
  AGE_BANDS.map((ageBand) => [ageBand.replace('–', '-'), ageBand]),
);

// The intrinsic size is the larger file's, carried with the sources so the
// window is reserved at the illustration's own ratio before a file arrives,
// rather than reflowing the text under it when it does.
export type MissionImage = Readonly<{
  src: string;
  srcSet: string;
  width: number;
  height: number;
}>;

function missionImageKey(missionId: string, ageBand: AgeBand): string {
  return `${missionId}__${ageBand}`;
}

function collectMissionImages(): ReadonlyMap<string, MissionImage> {
  const widths = new Map<string, { small?: string; large?: string }>();

  for (const [path, url] of Object.entries(FILES)) {
    const match = FILE_NAME.exec(path);
    const ageBand = match ? AGE_BAND_BY_FILE_LABEL[match[2]!] : undefined;
    if (!match || !ageBand) continue;

    const key = missionImageKey(match[1]!, ageBand);
    const entry = widths.get(key) ?? {};
    if (match[3] === '768') entry.small = url;
    else entry.large = url;
    widths.set(key, entry);
  }

  // Only a complete pair is an illustration: one width alone would leave either
  // a phone or Ready's widest window with a file that does not cover it.
  const images = new Map<string, MissionImage>();
  for (const [key, { small, large }] of widths) {
    if (small && large) {
      images.set(key, {
        src: small,
        srcSet: `${small} 768w, ${large} 1536w`,
        width: 1536,
        height: 1024,
      });
    }
  }
  return images;
}

const MISSION_IMAGES = collectMissionImages();

// The one lookup every surface uses, so a card and the session views that
// follow it can never disagree about which picture a Mission has. A surface
// passes the age band in effect there; nothing here substitutes another age
// band's illustration, another Mission's or a category image.
export function resolveMissionImage(missionId: string, ageBand: AgeBand): MissionImage | null {
  return MISSION_IMAGES.get(missionImageKey(missionId, ageBand)) ?? null;
}

// Exported for the tests that hold the map to the catalog's approved pairs.
export const MISSION_IMAGE_KEYS: readonly string[] = [...MISSION_IMAGES.keys()];
export const MISSION_IMAGE_FILE_COUNT = Object.keys(FILES).length;
