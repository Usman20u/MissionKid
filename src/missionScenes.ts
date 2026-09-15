import type { MissionCategory } from './catalog';

// Presentation only. A Mission scene is composed from a grammar of recognizable
// stage elements that the renderer draws back to front, so a suggestion reads as
// a small place showing what the activity involves. This file holds no copy, no
// Mission data and no behaviour: the catalog remains the single source of
// Mission content.
export const SCENE_ELEMENTS = [
  // environment
  'floor',
  'wall',
  'table',
  'shelfBoard',
  'windowFrame',
  'rampBook',
  'waterSurface',
  'bed',
  'doorway',
  'drawerOpen',
  'ceilingRoom',
  'hillBridge',
  'straightLine',
  // subjects
  'childTall',
  'childCurled',
  'childBalance',
  'childFigure',
  'adultFigure',
  'cup',
  'shoePair',
  'blockTower',
  'toysScatter',
  'basket',
  'paperSheet',
  'pencil',
  'storyPanels',
  'softThings',
  'blanketDrape',
  'bookRow',
  'clockFace',
  'gears',
  'speechBubble',
  'bagAndCoat',
  'patternRow',
  'fallingPapers',
  'pebble',
  'ballRolling',
  'cushion',
  // traces, signals, light
  'pawTracks',
  'footsteps',
  'soundWaves',
  'rippleRings',
  'dashTrail',
  'clueMarks',
  'ghostEchoes',
  'lightBeam',
  'handReach',
  'magnifyRings',
  'puddle',
] as const;

export type SceneElement = (typeof SCENE_ELEMENTS)[number];

// Elements that carry the Mission's meaning rather than only its atmosphere.
// Every scene must contain at least one, otherwise it is decoration.
export const SUBJECT_ELEMENTS: ReadonlySet<SceneElement> = new Set([
  'table', 'shelfBoard', 'windowFrame', 'rampBook', 'bed', 'doorway', 'drawerOpen',
  'ceilingRoom', 'hillBridge', 'childTall', 'childCurled', 'childBalance',
  'childFigure', 'adultFigure', 'cup', 'shoePair', 'blockTower', 'toysScatter',
  'basket', 'paperSheet', 'pencil', 'storyPanels', 'softThings', 'blanketDrape',
  'bookRow', 'clockFace', 'gears', 'speechBubble', 'bagAndCoat', 'patternRow',
  'fallingPapers', 'pebble', 'ballRolling', 'cushion', 'pawTracks', 'footsteps',
  'soundWaves', 'clueMarks', 'ghostEchoes', 'handReach', 'magnifyRings',
]);

// Each composition shows what the Mission actually involves: the place, the
// thing that is handled, and the trace or light that makes the action readable.
const SCENE_BY_MISSION: Readonly<Record<string, readonly SceneElement[]>> = {
  // Movement
  'movement-02': ['floor', 'pawTracks', 'dashTrail'],
  'movement-05': ['floor', 'childTall', 'childBalance'],
  'movement-06': ['floor', 'footsteps', 'soundWaves'],
  'movement-09': ['floor', 'footsteps', 'pawTracks'],
  'movement-10': ['floor', 'childTall', 'rippleRings'],
  'movement-11': ['floor', 'cushion', 'softThings', 'dashTrail'],
  'movement-12': ['floor', 'childFigure', 'bookRow', 'footsteps'],
  'movement-13': ['floor', 'table', 'doorway', 'footsteps'],
  'movement-14': ['wall', 'floor', 'childBalance', 'handReach'],
  'movement-15': ['floor', 'straightLine', 'childCurled', 'dashTrail'],
  'movement-16': ['floor', 'childTall', 'softThings', 'handReach'],
  'movement-17': ['floor', 'childTall', 'childCurled', 'ghostEchoes'],

  // Creativity
  'creativity-01': ['paperSheet', 'pencil', 'soundWaves'],
  'creativity-02': ['floor', 'blockTower', 'childTall'],
  'creativity-04': ['hillBridge', 'toysScatter'],
  'creativity-05': ['floor', 'softThings', 'handReach'],
  'creativity-06': ['floor', 'blanketDrape', 'lightBeam'],
  'creativity-08': ['storyPanels', 'speechBubble'],
  'creativity-09': ['table', 'cup', 'soundWaves'],
  'creativity-10': ['paperSheet', 'pencil', 'speechBubble'],
  'creativity-11': ['hillBridge', 'bookRow', 'pebble'],
  'creativity-12': ['paperSheet', 'pencil', 'clueMarks'],
  'creativity-13': ['floor', 'cup', 'shoePair', 'lightBeam'],
  'creativity-14': ['paperSheet', 'patternRow', 'magnifyRings'],

  // Helping at Home
  'helping-03': ['floor', 'table', 'cup', 'adultFigure', 'childFigure'],
  'helping-07': ['floor', 'doorway', 'bagAndCoat'],
  'helping-09': ['floor', 'straightLine', 'shoePair'],
  'helping-10': ['table', 'softThings', 'handReach'],
  'helping-11': ['table', 'cup', 'lightBeam'],
  'helping-12': ['shelfBoard', 'bookRow', 'speechBubble'],
  'helping-13': ['floor', 'cup', 'footsteps', 'rippleRings'],
  'helping-14': ['floor', 'cushion', 'paperSheet', 'pencil'],
  'helping-15': ['floor', 'paperSheet', 'basket', 'footsteps'],

  // Learning
  'learning-02': ['wall', 'floor', 'childFigure', 'soundWaves'],
  'learning-04': ['floor', 'rampBook', 'ballRolling'],
  'learning-05': ['ceilingRoom', 'childCurled'],
  'learning-07': ['floor', 'fallingPapers'],
  'learning-08': ['floor', 'footsteps', 'clueMarks'],
  'learning-09': ['waterSurface', 'pebble', 'ballRolling', 'rippleRings'],
  'learning-10': ['table', 'handReach', 'soundWaves'],
  'learning-11': ['table', 'patternRow', 'adultFigure'],
  'learning-12': ['wall', 'windowFrame', 'handReach', 'ghostEchoes'],
  'learning-13': ['table', 'pencil', 'handReach'],
  'learning-14': ['table', 'cup', 'pebble', 'rippleRings'],

  // Calm
  'calm-02': ['waterSurface', 'cup', 'rippleRings'],
  'calm-07': ['wall', 'clockFace', 'lightBeam'],
  'calm-08': ['floor', 'childFigure', 'ghostEchoes'],
  'calm-09': ['floor', 'cushion', 'blanketDrape'],
  'calm-10': ['floor', 'softThings', 'ballRolling'],
  'calm-11': ['floor', 'patternRow', 'dashTrail'],
  'calm-12': ['floor', 'blockTower', 'handReach'],
  'calm-13': ['table', 'pencil', 'gears'],
  'calm-14': ['floor', 'softThings', 'dashTrail'],
  'calm-15': ['table', 'cushion', 'handReach'],
};

// A Mission added later still renders a scene with a real subject rather than
// losing its place.
const SCENE_BY_CATEGORY: Readonly<Record<MissionCategory, readonly SceneElement[]>> = {
  Movement: ['floor', 'footsteps'],
  Creativity: ['floor', 'blockTower'],
  'Helping at Home': ['floor', 'basket'],
  Learning: ['shelfBoard', 'bookRow'],
  Calm: ['floor', 'pebble'],
};

export function resolveMissionScene(
  missionId: string,
  category: MissionCategory,
): readonly SceneElement[] {
  return SCENE_BY_MISSION[missionId] ?? SCENE_BY_CATEGORY[category];
}
