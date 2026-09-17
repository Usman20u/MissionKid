import type { ReactNode } from 'react';

import {
  selectConflictMissionId,
  selectDiscoveryCycle,
  selectSelectionAttempt,
  selectSelectionIssue,
  selectShownMissionIds,
  useAppState,
} from './appState';
import { MISSION_CATALOG } from './catalogContent';
import {
  createSessionId,
  readWallClock,
  selectMission,
  type SessionIdFactory,
  type WallClock,
} from './missionSession';
import {
  persistenceAdapter,
  type PersistenceAdapter,
} from './persistence';
import { MISSION_CATEGORIES, type MissionCategory } from './catalog';
import { translateMessage, type MessageKey } from './localization';
import { MissionSuggestionSet } from './MissionSuggestionSet';

// Canonical categories are the identity; these keys only resolve the visible
// label. A localized label is never used as identity.
const CATEGORY_LABEL_KEYS: Readonly<Record<MissionCategory, MessageKey>> = {
  Movement: 'discovery.category.movement',
  Creativity: 'discovery.category.creativity',
  'Helping at Home': 'discovery.category.helpingAtHome',
  Learning: 'discovery.category.learning',
  Calm: 'discovery.category.calm',
};

// A structural cue for each category so meaning never rests on colour alone.
// The visible label stays authoritative; these are decorative.
const CATEGORY_GLYPHS: Readonly<Record<MissionCategory, ReactNode>> = {
  Movement: (
    <>
      <path d="M4 17c3-6 6-9 9-9s5 2 7 5" />
      <path d="M4 12c2.5-4.5 5-7 7.5-7" opacity="0.55" />
      <circle cx="19" cy="7" r="2" />
    </>
  ),
  Creativity: (
    <>
      <circle cx="9" cy="8.5" r="4.5" />
      <path d="M14.5 5h6l-3 6z" />
      <rect x="10.5" y="13.5" width="8" height="7.5" rx="1.4" />
    </>
  ),
  'Helping at Home': (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6.5 10v9h11v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  Learning: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m15.5 15.5 4 4" />
      <path d="M11 8v6M8 11h6" opacity="0.55" />
    </>
  ),
  Calm: (
    <>
      <path d="M3 15c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 19c3-2 6-2 9 0s6 2 9 0" opacity="0.55" />
      <circle cx="12" cy="7" r="3" />
    </>
  ),
};

function CategoryGlyph({ category }: Readonly<{ category: MissionCategory }>) {
  return (
    <svg
      aria-hidden="true"
      className="mission-world__glyph"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      {CATEGORY_GLYPHS[category]}
    </svg>
  );
}

// The five canonical Mission Categories as one bounded peer-choice group. This
// view derives and exposes the discovery cycle; it renders no Mission.
type MissionCategorySelectionProps = Readonly<{
  adapter?: PersistenceAdapter;
  createId?: SessionIdFactory;
  now?: WallClock;
}>;

export function MissionCategorySelection({
  adapter = persistenceAdapter,
  createId = createSessionId,
  now = readWallClock,
}: MissionCategorySelectionProps = {}) {
  const { dispatch, state } = useAppState();
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const selected = state.discovery?.category ?? null;
  const cycle = selectDiscoveryCycle(state);
  const helpId = 'discovery-categories-help';

  // A conflict is about one already-chosen Mission, and the specification makes
  // that Mission the state's dominant information. Its wording comes from the
  // catalog in the current language, never from the stored session, and stays
  // absent if the Mission no longer resolves to reviewed content.
  const conflictMissionId = selectConflictMissionId(state);
  const chosenMissionTitle = conflictMissionId
    ? MISSION_CATALOG.find((record) => record.missionId === conflictMissionId)
        ?.content[state.language].title ?? null
    : null;

  return (
    <div className="mission-discovery">
      {state.ageBand ? (
        <p className="mission-discovery__context">
          <span>{t('discovery.context.age')}</span> {state.ageBand}
        </p>
      ) : null}

      <fieldset className="choice-group" aria-describedby={helpId}>
        <legend>{t('discovery.categories.legend')}</legend>
        <p className="choice-group__help" id={helpId}>
          {t('discovery.categories.help')}
        </p>
        <div className="mission-worlds">
          {MISSION_CATEGORIES.map((category) => (
            <label
              className="mission-world"
              data-category={category}
              key={category}
            >
              <input
                checked={selected === category}
                className="mission-world__input"
                name="discovery-category"
                onChange={() =>
                  dispatch({ type: 'discovery-category-selected', category })
                }
                type="radio"
                value={category}
              />
              <span className="mission-world__frame" aria-hidden="true" />
              <CategoryGlyph category={category} />
              <span className="mission-world__label">
                {t(CATEGORY_LABEL_KEYS[category])}
              </span>
              <span className="mission-world__state" aria-hidden="true">
                {selected === category ? (
                  <>
                    <span className="mission-world__check">✓</span>
                    {t('discovery.selected')}
                  </>
                ) : null}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {cycle ? (
        <MissionSuggestionSet
          context={cycle}
          onAnotherSet={(missionIds) =>
            dispatch({ type: 'discovery-another-set-requested', missionIds })
          }
          onChoose={(missionId) => {
            const mission = MISSION_CATALOG.find(
              (record) => record.missionId === missionId,
            );
            if (!mission) return;

            const result = selectMission(
              adapter,
              { mission, context: cycle },
              createId,
              now,
            );

            // Runtime only learns of a selection the storage confirmed. Every
            // other outcome leaves the three Missions exactly as they are and
            // is explained rather than swallowed.
            if (result.status === 'created' || result.status === 'resolved') {
              dispatch({ type: 'mission-selection-confirmed', session: result.session });
              return;
            }

            // `unavailable` is also a Mission that could not become a session,
            // so it gets the same truthful explanation as an unconfirmed write.
            dispatch({
              type: 'mission-selection-failed',
              issue: result.status === 'conflict' ? 'conflict' : 'unconfirmed',
              conflictMissionId:
                result.status === 'conflict' ? result.session.missionId : undefined,
            });
          }}
          chosenMissionTitle={chosenMissionTitle}
          selectionAttempt={selectSelectionAttempt(state)}
          selectionIssue={selectSelectionIssue(state)}
          shown={selectShownMissionIds(state)}
        />
      ) : null}

      <button
        className="button button--secondary"
        onClick={() => dispatch({ type: 'setup-editing-started' })}
        type="button"
      >
        {t('setup.action.edit')}
      </button>
    </div>
  );
}
