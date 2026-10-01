import {
  selectConflictSession,
  selectDiscoveryCycle,
  selectSelectionAttempt,
  selectSelectionIssue,
  selectShownMissionIds,
  useAppState,
} from './appState';
import { MISSION_CATALOG } from './catalogContent';
import {
  createSessionId,
  leaveMissionSession,
  readWallClock,
  selectMission,
  type SessionIdFactory,
  type WallClock,
} from './missionSession';
import {
  persistenceAdapter,
  type PersistenceAdapter,
} from './persistence';
import { MISSION_CATEGORIES } from './catalog';
import {
  MISSION_CATEGORY_LABEL_KEYS,
  translateMessage,
  type MessageKey,
} from './localization';
import { HistoryMark, SetupMark } from './Marks';
import { MissionSuggestionSet } from './MissionSuggestionSet';
import { CATEGORY_IMAGES } from './productImagery';

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
  const conflictSession = selectConflictSession(state);
  const chosenMissionTitle = conflictSession
    ? MISSION_CATALOG.find(
        (record) => record.missionId === conflictSession.missionId,
      )?.content[state.language].title ?? null
    : null;

  // Resolving a conflict is the same pair of operations the session views
  // offer, reached from the place the family hit it. Returning follows durable
  // state into the Mission that is actually stored; leaving is the same keyed,
  // freshly-read exit, made against the state that session is really in.
  function returnToSession() {
    if (conflictSession) {
      dispatch({ type: 'mission-session-adopted', session: conflictSession });
    }
  }

  function leaveConflictSession() {
    if (!conflictSession || conflictSession.state === 'selected') {
      return;
    }

    const result = leaveMissionSession(
      adapter,
      conflictSession.sessionId,
      conflictSession.state,
    );

    switch (result.status) {
      case 'left':
      case 'resolved':
        dispatch({ type: 'mission-session-left' });
        return;
      // Durable state holds something else than the conflict described. It is
      // preserved and followed rather than cleared.
      case 'superseded':
        dispatch({ type: 'mission-session-adopted', session: result.session });
        return;
      case 'not-left':
      case 'unavailable':
        dispatch({ type: 'mission-selection-failed', issue: 'unconfirmed' });
        return;
      case 'unconfirmed':
        dispatch({ type: 'mission-selection-failed', issue: 'unconfirmed' });
        return;
    }
  }

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
              {/* One of five images with one shared treatment. Decorative:
                  the label beside it is the choice's name and its meaning. */}
              <img
                alt=""
                aria-hidden="true"
                className="mission-world__image"
                decoding="async"
                height={CATEGORY_IMAGES[category].height}
                src={CATEGORY_IMAGES[category].src}
                width={CATEGORY_IMAGES[category].width}
              />
              <span className="mission-world__label">
                {t(MISSION_CATEGORY_LABEL_KEYS[category])}
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

            // Runtime only learns of a session the storage confirmed, and it
            // learns the lifecycle state that session is actually in: `created`
            // is a new Mission Session in `selected`, while `resolved` is the
            // one that already exists, answering in `selected`, `ready` or
            // `active`. Neither is republished as a state it is not in; the
            // surface each state leads to is later F003 work. Every other
            // outcome leaves the three Missions exactly as they are and is
            // explained rather than swallowed.
            if (result.status === 'created' || result.status === 'resolved') {
              dispatch({ type: 'mission-selection-confirmed', session: result.session });
              return;
            }

            // `unavailable` is also a Mission that could not become a session,
            // so it gets the same truthful explanation as an unconfirmed write.
            dispatch({
              type: 'mission-selection-failed',
              issue: result.status === 'conflict' ? 'conflict' : 'unconfirmed',
              conflictSession:
                result.status === 'conflict' ? result.session : undefined,
            });
          }}
          chosenMissionTitle={chosenMissionTitle}
          conflictSessionState={conflictSession?.state ?? null}
          language={state.language}
          onLeaveSession={leaveConflictSession}
          onReturnToSession={returnToSession}
          selectionAttempt={selectSelectionAttempt(state)}
          selectionIssue={selectSelectionIssue(state)}
          shown={selectShownMissionIds(state)}
        />
      ) : null}

      {/* The two secondary ways out of discovery, kept together at the end and
          outside the Mission cards so neither competes with choosing a Mission.
          Leaving for either ends the discovery cycle, as `F002` requires. */}
      <div className="mission-discovery__exits">
        <button
          className="button button--secondary button--quiet"
          onClick={() => dispatch({ type: 'history-opened' })}
          type="button"
        >
          <HistoryMark />
          {t('history.action.open')}
        </button>
        <button
          className="button button--secondary button--quiet"
          onClick={() => dispatch({ type: 'setup-editing-started' })}
          type="button"
        >
          <SetupMark />
          {t('setup.action.edit')}
        </button>
      </div>
    </div>
  );
}
