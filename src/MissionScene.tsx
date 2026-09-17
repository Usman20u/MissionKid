import type { ReactNode } from 'react';

import type { MissionCategory } from './catalog';
import { resolveMissionScene, resolveSceneFocus, type SceneElement } from './missionScenes';

// One shared stage, 200x110, with the floor line at y=80. Elements are drawn
// back to front so a scene reads as a small place: environment, then subject,
// then the trace the child leaves or the light that falls on it.
const STAGE = { width: 200, height: 110, floor: 80 } as const;

// Every shape is decorative and inherits the category atmosphere. Silhouettes
// are simplified rather than illustrated, so the scene stays sculptural.
const SCENE_SHAPES: Readonly<Record<SceneElement, ReactNode>> = {
  // ---- environment -------------------------------------------------------
  floor: (
    <>
      <path className="s-plane" d="M0 80h200v30H0z" />
      {/* Atmospheric falloff where the floor meets the far wall. */}
      <path className="s-haze" d="M0 80h200v9H0z" />
      <path className="s-edge" d="M0 80h200" />
    </>
  ),
  wall: <path className="s-back" d="M0 0h200v80H0z" />,
  table: (
    <>
      <ellipse className="s-cast" cx="100" cy="82" rx="60" ry="5" />
      <path className="s-solid" d="M52 66h6v14h-6zM142 66h6v14h-6z" />
      <path className="s-lo" d="M52 66h6v14h-6zM142 66h6v14h-6z" />
      <path className="s-solid" d="M36 58h128l-6 8H42z" />
      <path className="s-hi" d="M36 58h128l-3 4H39z" />
      <path className="s-solid" d="M42 66h116v4H42z" />
      <path className="s-lo" d="M42 66h116v4H42z" />
    </>
  ),
  shelfBoard: (
    <>
      <path className="s-solid" d="M34 54h132v5H34z" />
      <path className="s-solid" d="M44 59h5v7h-5zM151 59h5v7h-5z" opacity="0.7" />
    </>
  ),
  windowFrame: (
    <>
      <path className="s-light" d="M118 12h54v46h-54z" />
      <path className="s-edge" d="M118 12h54v46h-54z" />
      <path className="s-edge" d="M145 12v46M118 35h54" />
    </>
  ),
  rampBook: (
    <>
      <path className="s-solid" d="M44 80 148 44l6 10L56 80z" />
      <path className="s-line" d="M52 76 142 50" />
    </>
  ),
  waterSurface: (
    <>
      <path className="s-water" d="M0 74h200v36H0z" />
      <path className="s-edge" d="M0 74h200" />
      <path className="s-line" d="M22 86h40M120 86h48M46 96h96" />
    </>
  ),
  bed: (
    <>
      <path className="s-solid" d="M28 62h144v10H28z" />
      <path className="s-solid" d="M28 50h16v22H28z" />
      <path className="s-solid" d="M34 72h6v10h-6zM160 72h6v10h-6z" opacity="0.7" />
    </>
  ),
  doorway: (
    <>
      <path className="s-light" d="M126 20h48v60h-48z" />
      <path className="s-edge" d="M126 20h48v60" />
      <circle className="s-solid" cx="134" cy="52" r="2.5" />
    </>
  ),
  drawerOpen: (
    <>
      <path className="s-solid" d="M34 56h132v10H34z" opacity="0.55" />
      <path className="s-edge" d="M40 66h120v18H40z" />
      <path className="s-line" d="M92 60h16" />
    </>
  ),
  ceilingRoom: (
    <>
      <path className="s-plane" d="M0 0h200v26H0z" />
      <path className="s-edge" d="M0 26h200" />
      <path className="s-solid" d="M72 26h56v6H72zM82 32h5v13h-5zM113 32h5v13h-5z" />
      <ellipse className="s-shadow" cx="100" cy="50" rx="30" ry="3" />
    </>
  ),
  hillBridge: (
    <>
      <path className="s-plane" d="M0 84q36-24 66-4 24 16 42-2 26-24 56-2 20 15 36 8v26H0z" />
      <path className="s-solid" d="M74 74h48v5H74z" />
      <path className="s-line" d="M80 79v7M116 79v7" />
    </>
  ),
  straightLine: <path className="s-tape" d="M18 92h164" />,

  // ---- subjects ----------------------------------------------------------
  childTall: (
    <>
      <ellipse className="s-cast" cx="66" cy="81" rx="17" ry="4" />
      <path className="s-arm" d="M60 48 51 20M72 48l9-28" />
      <path className="s-solid" d="M58 80V46a8 8 0 0 1 16 0v34z" />
      <path className="s-hi" d="M58 80V46a8 8 0 0 1 5-7v41z" />
      <circle className="s-solid" cx="66" cy="31" r="8.5" />
      <circle className="s-hi" cx="63" cy="28" r="3" />
    </>
  ),
  childCurled: (
    <>
      <ellipse className="s-cast" cx="132" cy="81" rx="24" ry="4" />
      <path className="s-solid" d="M112 80q0-22 20-22t20 22z" />
      <path className="s-hi" d="M112 80q0-19 15-21-8 6-8 21z" />
      <circle className="s-solid" cx="132" cy="59" r="9.5" />
      <circle className="s-hi" cx="129" cy="56" r="3.2" />
    </>
  ),
  childBalance: (
    <>
      <path className="s-solid" d="M92 80V50a8 8 0 0 1 16 0v30h-6l-2-16-2 16z" />
      <path className="s-solid" d="M104 66l16 8-3 5-15-7z" />
      <circle className="s-solid" cx="100" cy="38" r="8" />
      <ellipse className="s-shadow" cx="98" cy="82" rx="12" ry="3" />
    </>
  ),
  childFigure: (
    <>
      <ellipse className="s-cast" cx="66" cy="81" rx="16" ry="4" />
      <path className="s-solid" d="M58 80V54a8 8 0 0 1 16 0v26z" />
      <path className="s-hi" d="M58 80V54a8 8 0 0 1 5-7v33z" />
      <circle className="s-solid" cx="66" cy="42" r="8.5" />
      <circle className="s-hi" cx="63" cy="39" r="3" />
    </>
  ),
  adultFigure: (
    <>
      <ellipse className="s-cast" cx="136" cy="81" rx="20" ry="4" />
      <path className="s-solid" d="M126 80V41a10 10 0 0 1 20 0v39z" />
      <path className="s-hi" d="M126 80V41a10 10 0 0 1 6-8v47z" />
      <circle className="s-solid" cx="136" cy="27" r="10.5" />
      <circle className="s-hi" cx="132" cy="23" r="3.6" />
    </>
  ),
  cup: (
    <>
      <ellipse className="s-cast" cx="101" cy="74" rx="18" ry="4" />
      <path className="s-edge" d="M116 51h7a6 6 0 0 1 0 12h-5" />
      <path className="s-solid" d="M86 46h30l-4 26H90z" />
      <path className="s-hi" d="M89 47h7l-3 24h-5z" />
      <path className="s-lo" d="M110 47h6l-4 24h-5z" />
      <ellipse className="s-rim" cx="101" cy="46" rx="15" ry="4" />
      <path className="s-line" d="M90 57h22" />
    </>
  ),
  shoePair: (
    <>
      <ellipse className="s-cast" cx="150" cy="82" rx="36" ry="4" />
      <path className="s-solid" d="M116 78V62h10v7l19 5v4z" />
      <path className="s-hi" d="M116 62h10v5h-10z" />
      <path className="s-lo" d="M116 78h29v-4l-19-1z" />
      <path className="s-solid" d="M152 78V62h10v7l19 5v4z" opacity="0.88" />
      <path className="s-hi" d="M152 62h10v5h-10z" />
      <path className="s-lo" d="M152 78h29v-4l-19-1z" />
    </>
  ),
  blockTower: (
    <>
      <ellipse className="s-cast" cx="100" cy="82" rx="32" ry="5" />
      {[
        { y: 68, h: 12, x: 74, w: 48 },
        { y: 56, h: 12, x: 78, w: 40 },
        { y: 44, h: 12, x: 82, w: 32 },
        { y: 33, h: 11, x: 86, w: 24 },
        { y: 23, h: 10, x: 90, w: 16 },
      ].map((b) => (
        <g key={b.y}>
          <path className="s-solid" d={`M${b.x} ${b.y}h${b.w}v${b.h}H${b.x}z`} />
          <path className="s-top" d={`M${b.x} ${b.y}h${b.w}l-5-4H${b.x + 5}z`} />
          <path className="s-hi" d={`M${b.x} ${b.y}h6v${b.h}h-6z`} />
          <path className="s-lo" d={`M${b.x + b.w - 7} ${b.y}h7v${b.h}h-7z`} />
          <path className="s-seam" d={`M${b.x} ${b.y + b.h}h${b.w}`} />
        </g>
      ))}
    </>
  ),
  toysScatter: (
    <>
      <ellipse className="s-cast" cx="44" cy="81" rx="11" ry="3" />
      <ellipse className="s-cast" cx="81" cy="81" rx="12" ry="3" />
      <ellipse className="s-cast" cx="116" cy="81" rx="11" ry="3" />
      <circle className="s-solid" cx="44" cy="72" r="9" />
      <circle className="s-hi" cx="41" cy="69" r="3.4" />
      <path className="s-solid" d="M72 64h18v14H72z" />
      <path className="s-top" d="M72 64h18l-4-4h-10z" />
      <path className="s-lo" d="M84 64h6v14h-6z" />
      <path className="s-solid" d="M106 78l10-15 10 15z" />
      <path className="s-hi" d="M106 78l10-15 2 3-8 12z" />
    </>
  ),
  basket: (
    <>
      <path className="s-solid" d="M134 58h42l-6 22h-30z" opacity="0.85" />
      <path className="s-edge" d="M132 58h46" />
      <ellipse className="s-shadow" cx="155" cy="82" rx="23" ry="3" />
    </>
  ),
  paperSheet: (
    <>
      <path className="s-sheet" d="M58 22h74l-6 56H52z" />
      <path className="s-edge" d="M58 22h74l-6 56H52z" />
      <path className="s-line" d="M68 40h48M66 52h34" />
    </>
  ),
  pencil: (
    <>
      <path className="s-solid" d="M138 26l12 8-40 44-13 5 4-13z" />
      <path className="s-back" d="M97 70l-4 13 13-5z" />
    </>
  ),
  storyPanels: (
    <>
      <path className="s-sheet" d="M18 30h50v42H18zM75 30h50v42H75zM132 30h50v42h-50z" />
      <path className="s-edge" d="M18 30h50v42H18zM75 30h50v42H75zM132 30h50v42h-50z" />
      <circle className="s-solid" cx="43" cy="51" r="7" />
      <path className="s-solid" d="M92 58h16v8H92z" />
      <path className="s-solid" d="M149 60l8-14 8 14z" />
    </>
  ),
  softThings: (
    <>
      <path className="s-solid" d="M40 62q22-10 42 0 6 14-21 18-27-4-21-18z" opacity="0.85" />
      <path className="s-solid" d="M104 80V64q14-6 22 2 6 8-4 14z" opacity="0.7" />
      <ellipse className="s-shadow" cx="86" cy="82" rx="52" ry="3" />
    </>
  ),
  blanketDrape: (
    <>
      <path className="s-solid" d="M46 80q6-40 54-40t54 40q-18-10-30 2-14-12-26 0-12-12-26-2-14-10-26 0z" opacity="0.9" />
      <path className="s-line" d="M74 52q26-12 52 0" />
    </>
  ),
  // A sock, read by its parts: a ribbed cuff at the opening, the ankle turn,
  // and a rounded toe. The whole silhouette is the recognisable shape, so no
  // face is drawn — the Mission asks the child for the voice, not a drawing.
  sock: (
    <>
      <ellipse className="s-cast" cx="80" cy="81" rx="30" ry="4" />
      {/* Foot with a rounded toe, and the shaft rising to the opening. */}
      <rect className="s-solid" x="56" y="54" width="48" height="24" rx="12" />
      <rect className="s-solid" x="74" y="26" width="30" height="40" />
      {/* Ribbing at the opening the hand goes into. */}
      <rect className="s-top" x="74" y="26" width="30" height="13" />
      <path className="s-seam" d="M82 26v13M90 26v13M98 26v13" />
      {/* Heel at the back of the ankle turn. */}
      <path className="s-lo" d="M104 50v28H91q2-18 13-28z" />
      {/* Key light from the upper left, as on every other subject. */}
      <rect className="s-hi" x="74" y="26" width="7" height="30" />
      <path className="s-hi" d="M56 66a12 12 0 0 1 12-12h7v6h-7a6 6 0 0 0-6 6z" />
    </>
  ),
  // A sleeping bulk on the far side of the room, several times the child it is
  // imagined by. Turned away, lying down, going nowhere.
  giantAsleep: (
    <>
      <ellipse className="s-cast" cx="138" cy="81" rx="42" ry="5" />
      <path className="s-solid" d="M98 80C102 58 118 53 136 54c20 1 34 8 40 26z" />
      <path className="s-hi" d="M98 80C102 58 118 53 136 54l3 1c-15 6-24 13-27 25z" />
      <circle className="s-solid" cx="158" cy="47" r="14" />
      <circle className="s-hi" cx="152" cy="42" r="5" />
    </>
  ),
  bookRow: (
    <>
      <path className="s-solid" d="M50 32h9v22h-9zM62 26h8v28h-8zM73 36h10v18H73zM86 28h7v26h-7z" />
      <path className="s-solid" d="M104 34h9v20h-9z" opacity="0.7" />
    </>
  ),
  clockFace: (
    <>
      <circle className="s-edge-circle" cx="150" cy="34" r="17" />
      <path className="s-mark" d="M150 34V23M150 34l9 6" />
      <circle className="s-solid" cx="150" cy="34" r="2.5" />
    </>
  ),
  gears: (
    <>
      <circle className="s-edge-circle" cx="88" cy="46" r="13" />
      <circle className="s-solid" cx="88" cy="46" r="4" />
      <circle className="s-edge-circle" cx="114" cy="60" r="9" />
      <path className="s-mark" d="M88 33v-6M88 59v6M75 46h-6M101 46h6" />
    </>
  ),
  speechBubble: (
    <>
      <path className="s-sheet" d="M112 16h60v26h-60z" />
      <path className="s-edge" d="M112 16h60v26h-46l-8 8v-8h-6z" />
      <path className="s-line" d="M122 26h30M122 33h18" />
    </>
  ),
  bagAndCoat: (
    <>
      <path className="s-solid" d="M46 54h30v26H46z" />
      <path className="s-edge" d="M53 54v-6a8 8 0 0 1 16 0v6" />
      <path className="s-solid" d="M88 34l14-6 14 6 6 30-12 4-8-22-8 22-12-4z" opacity="0.8" />
      <ellipse className="s-shadow" cx="82" cy="82" rx="46" ry="3" />
    </>
  ),
  patternRow: (
    <>
      <circle className="s-solid" cx="40" cy="72" r="6" />
      <path className="s-solid" d="M60 66h12v12H60z" opacity="0.85" />
      <circle className="s-solid" cx="90" cy="72" r="6" />
      <path className="s-solid" d="M110 66h12v12h-12z" opacity="0.85" />
      <circle className="s-solid" cx="140" cy="72" r="6" opacity="0.5" />
      <path className="s-mark" d="M158 72h10" />
    </>
  ),
  fallingPapers: (
    <>
      <path className="s-sheet" d="M52 18h34v26H52z" />
      <path className="s-edge" d="M52 18h34v26H52z" />
      <circle className="s-solid" cx="132" cy="30" r="12" />
      <path className="s-trail" d="M69 50v24M132 46v28" />
    </>
  ),
  pebble: (
    <>
      <path className="s-solid" d="M84 80q-8-16 8-20t16 12q0 8-24 8z" />
      <ellipse className="s-shadow" cx="96" cy="82" rx="18" ry="3" />
    </>
  ),
  ballRolling: (
    <>
      <circle className="s-solid" cx="126" cy="68" r="12" />
      <path className="s-mark" d="M138 54l9-5M141 62l10-2" />
      <ellipse className="s-shadow" cx="126" cy="82" rx="16" ry="3" />
    </>
  ),
  cushion: (
    <>
      <path className="s-solid" d="M120 78q-14-4-12-16t22-10q20 2 20 14t-16 12z" opacity="0.85" />
      <ellipse className="s-shadow" cx="134" cy="82" rx="24" ry="3" />
    </>
  ),

  // ---- traces, signals, light -------------------------------------------
  pawTracks: (
    <>
      <path className="s-solid" d="M36 94a4 4 0 1 0 .1 0zM31 88a2 2 0 1 0 .1 0zM36 86a2 2 0 1 0 .1 0zM41 88a2 2 0 1 0 .1 0z" />
      <path className="s-solid" d="M72 90a4 4 0 1 0 .1 0zM67 84a2 2 0 1 0 .1 0zM72 82a2 2 0 1 0 .1 0zM77 84a2 2 0 1 0 .1 0z" opacity="0.72" />
      <path className="s-solid" d="M108 87a3.5 3.5 0 1 0 .1 0zM104 82a1.8 1.8 0 1 0 .1 0zM108 80a1.8 1.8 0 1 0 .1 0zM112 82a1.8 1.8 0 1 0 .1 0z" opacity="0.5" />
      <path className="s-solid" d="M142 85a3 3 0 1 0 .1 0zM139 81a1.6 1.6 0 1 0 .1 0zM142 79a1.6 1.6 0 1 0 .1 0zM145 81a1.6 1.6 0 1 0 .1 0z" opacity="0.3" />
    </>
  ),
  footsteps: (
    <>
      <ellipse className="s-solid" cx="40" cy="95" rx="4.5" ry="7" transform="rotate(-12 40 95)" />
      <ellipse className="s-solid" cx="66" cy="90" rx="4.2" ry="6.5" transform="rotate(-10 66 90)" opacity="0.75" />
      <ellipse className="s-solid" cx="92" cy="87" rx="4" ry="6" transform="rotate(-8 92 87)" opacity="0.55" />
      <ellipse className="s-solid" cx="118" cy="84" rx="3.6" ry="5.4" transform="rotate(-6 118 84)" opacity="0.38" />
      <ellipse className="s-solid" cx="144" cy="82" rx="3.2" ry="4.8" opacity="0.22" />
    </>
  ),
  soundWaves: (
    <>
      <path className="s-wave" d="M52 58a18 18 0 0 1 0-24M62 64a30 30 0 0 1 0-36" />
      <path className="s-wave" d="M148 58a18 18 0 0 0 0-24M138 64a30 30 0 0 0 0-36" opacity="0.7" />
      <circle className="s-solid" cx="44" cy="46" r="4" />
      <circle className="s-solid" cx="156" cy="46" r="4" opacity="0.7" />
    </>
  ),
  rippleRings: (
    <>
      <ellipse className="s-wave" cx="101" cy="80" rx="20" ry="5" />
      <ellipse className="s-wave" cx="101" cy="80" rx="34" ry="8" opacity="0.55" />
    </>
  ),
  dashTrail: <path className="s-trail" d="M22 96q48-26 82-12 38 16 74-20" />,
  clueMarks: (
    <>
      <circle className="s-edge-circle" cx="44" cy="72" r="9" />
      <circle className="s-edge-circle" cx="100" cy="66" r="9" opacity="0.75" />
      <circle className="s-edge-circle" cx="156" cy="72" r="9" opacity="0.55" />
      <path className="s-mark" d="M44 63v-6M100 57v-6M156 63v-6" />
    </>
  ),
  ghostEchoes: (
    <>
      <path className="s-solid" d="M58 80V54a8 8 0 0 1 16 0v26z" opacity="0.22" />
      <circle className="s-solid" cx="66" cy="42" r="8" opacity="0.22" />
      <path className="s-solid" d="M100 80V54a8 8 0 0 1 16 0v26z" opacity="0.12" />
      <circle className="s-solid" cx="108" cy="42" r="8" opacity="0.12" />
    </>
  ),
  lightBeam: (
    <>
      <path className="s-light" d="M84 0h34l28 80H56z" />
      <ellipse className="s-glow" cx="101" cy="80" rx="46" ry="7" />
    </>
  ),
  handReach: (
    <>
      <path className="s-solid" d="M148 44h10v22h-10z" />
      <path className="s-solid" d="M136 52h14v10h-14zM132 56h8v8h-8z" opacity="0.85" />
    </>
  ),
  magnifyRings: (
    <>
      <circle className="s-edge-circle" cx="96" cy="52" r="24" />
      <path className="s-mark" d="M114 70l14 14" />
      <path className="s-line" d="M86 50h20M88 58h14" />
    </>
  ),
  puddle: (
    <>
      <ellipse className="s-water" cx="132" cy="86" rx="34" ry="8" />
      <ellipse className="s-wave" cx="132" cy="86" rx="20" ry="4" />
    </>
  ),
};

// One shared filter for every contact shadow in the document. Hue-independent,
// so it can live outside the cards without inheriting a category atmosphere.
export function MissionSceneDefs() {
  return (
    <svg aria-hidden="true" className="mission-scene-defs" focusable="false">
      <defs>
        <filter id="mk-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <filter id="mk-haze" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
    </svg>
  );
}

type MissionSceneProps = Readonly<{
  missionId: string;
  category: MissionCategory;
}>;

export function MissionScene({ category, missionId }: MissionSceneProps) {
  const elements = resolveMissionScene(missionId, category);
  // One subject per scene carries the eye. Marked as data rather than in the
  // class list so the composition a scene renders stays readable as itself.
  const focus = resolveSceneFocus(elements);

  return (
    <svg
      aria-hidden="true"
      className="mission-scene"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
    >
      {/* Scaled about the floor line so subjects fill the frame and the empty
          sky shrinks, without redrawing every shape. */}
      <g transform={`translate(${STAGE.width / 2} ${STAGE.floor}) scale(1.22) translate(${-STAGE.width / 2} ${-STAGE.floor})`}>
        {elements.map((element) => (
          <g
            className={`s-el s-el--${element}`}
            data-focal={element === focus ? 'true' : undefined}
            key={element}
          >
            {SCENE_SHAPES[element]}
          </g>
        ))}
      </g>
    </svg>
  );
}
