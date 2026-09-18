import {
  selectCurrentSession,
  useAppState,
} from './appState';
import {
  MISSION_ADULT_LABEL_KEYS,
  translateMessage,
  type MessageKey,
} from './localization';
import { resolveSessionMission } from './missionSession';

// The Mission that is running. This step adds only what a confirmed start makes
// true: which Mission it is, that it has started, and that it happens away from
// the screen. The adult-involvement and safety guidance the family read before
// starting stays with the Mission it belongs to rather than disappearing once
// the Mission begins.
//
// Timer guidance, the full active presentation, **Mission done** and the
// leave-without-completion path are later steps. Nothing here counts down,
// claims a remaining time, asks for interaction or asks for proof.
export function MissionActive() {
  const { state } = useAppState();
  const t = (key: MessageKey) => translateMessage(state.language, key);
  const session = selectCurrentSession(state);
  const mission = session ? resolveSessionMission(session, state.language) : null;

  if (!session) {
    return null;
  }

  const content = mission?.content[state.language] ?? null;
  const adultLabelKey = mission
    ? MISSION_ADULT_LABEL_KEYS[mission.adultInvolvement]
    : undefined;

  return (
    <div className="mission-session">
      {content ? (
        <h2 className="mission-session__mission">{content.title}</h2>
      ) : null}
      <p className="mission-session__state">{t('session.active.away')}</p>
      {content && adultLabelKey && content.adultInvolvementNote ? (
        <p className="mission-session__note mission-session__note--adult">
          <span aria-hidden="true" className="mission-session__note-mark" />
          <span className="mission-session__note-label">{t(adultLabelKey)}</span>
          {content.adultInvolvementNote}
        </p>
      ) : null}
      {content?.safetyNote ? (
        <p className="mission-session__note mission-session__note--safety">
          <span aria-hidden="true" className="mission-session__note-mark" />
          <span className="mission-session__note-label">
            {t('discovery.card.safetyLabel')}
          </span>
          {content.safetyNote}
        </p>
      ) : null}
    </div>
  );
}
