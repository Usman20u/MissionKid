import tallestTower from './assets/missions/creativity-02-tallest-tower.jpg';
import sockFriend from './assets/missions/creativity-05-sock-friend.jpg';
import kindMonster from './assets/missions/creativity-10-kind-monster.jpg';
import tableSurprise from './assets/missions/helping-11-table-surprise.jpg';

// Presentation only, keyed by the stable Mission identifier. This adds no field
// to Mission catalog content, no persisted value and no snapshot data: the
// catalog remains the single source of what a Mission is, and a Mission with no
// entry here renders its authored scene exactly as before.
//
// Each asset is a reviewed still bundled with the application by the ordinary
// build. Nothing is fetched from another origin and nothing is generated at
// runtime.
//
// The intrinsic size is carried with the URL so the card can reserve the space
// before the file arrives, rather than reflowing the text under it when it
// does.
export type MissionImage = Readonly<{
  src: string;
  width: number;
  height: number;
}>;

const MISSION_IMAGES: Readonly<Record<string, MissionImage>> = {
  'creativity-02': { src: tallestTower, width: 1000, height: 666 },
  'creativity-05': { src: sockFriend, width: 1000, height: 666 },
  'creativity-10': { src: kindMonster, width: 1000, height: 666 },
};

// The introduction's example alone. Discovery keeps this Mission's authored
// scene, like the two peers it shares each of its sets with: a still here would
// make one of three suggestions look richer, and always the one that had been
// the example, which F001 says carries no preference into later discovery.
const INTRODUCTION_IMAGES: Readonly<Record<string, MissionImage>> = {
  'helping-11': { src: tableSurprise, width: 1000, height: 666 },
};

// Where a Mission card is presented. Only the introduction shows its one
// example on its own; everywhere else a card is one of three peers.
export type MissionImageSurface = 'discovery' | 'introduction';

export function resolveMissionImage(
  missionId: string,
  surface: MissionImageSurface = 'discovery',
): MissionImage | null {
  return (
    (surface === 'introduction' ? INTRODUCTION_IMAGES[missionId] : undefined) ??
    MISSION_IMAGES[missionId] ??
    null
  );
}

// Exported for the tests that hold these maps to their authorized scope.
export const MISSION_IMAGE_IDS: readonly string[] = Object.keys(MISSION_IMAGES);
export const INTRODUCTION_IMAGE_IDS: readonly string[] = Object.keys(INTRODUCTION_IMAGES);
