import { selectCurrentSession, useAppState } from './appState';
import {
  MISSION_ADULT_LABEL_KEYS,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import { resolveSessionMission } from './missionSession';
import {
  useMissionGuidance,
  type MissionGuidance,
  type MissionTimerClocks,
} from './missionTimer';

const SECONDS_PER_MINUTE = 60;

// Approximate by design and calm by default. Minutes are what the family needs
// in order to know roughly when to come back, so the wording changes about once
// a minute rather than once a second: there is no ticking number to watch, and
// nothing for a screen reader to repeat every second.
//
// At zero the wording turns neutral and stays there. Nothing counts past zero,
// nothing fails, and the Mission is still the family's to finish.
function guidanceMessage(
  guidance: MissionGuidance,
  language: SupportedLanguage,
): string {
  const t = (key: MessageKey) => translateMessage(language, key);

  if (guidance.basis === 'unreadable-clock') {
    return t('session.active.timingUnavailable');
  }

  if (guidance.remainingSeconds === 0) {
    return t('session.active.zero');
  }

  if (guidance.remainingSeconds < SECONDS_PER_MINUTE) {
    return t('session.active.lessThanMinute');
  }

  return t('session.active.remaining').replace(
    '{minutes}',
    String(Math.ceil(guidance.remainingSeconds / SECONDS_PER_MINUTE)),
  );
}

type MissionActiveProps = Readonly<{
  clocks?: MissionTimerClocks;
}>;

// The Mission that is running. It leads with what the family should be doing —
// leaving the screen — keeps the Mission identity, its short action reminder and
// the guidance they read before starting, and puts approximate remaining time
// last, as support rather than as something to watch.
//
// Its reading order leaves room for **Mission done** and the leave-without-
// completion path, and adds neither: those controls arrive with the operations
// they carry out. Nothing here asks for interaction or proof while the Mission
// happens, and nothing here writes anything.
export function MissionActive({ clocks }: MissionActiveProps = {}) {
  const { state } = useAppState();
  const session = selectCurrentSession(state);
  const active = session?.state === 'active' ? session : null;
  // One timer for one running Mission: the derivation and its schedule are
  // owned elsewhere, and this view only reads what they already produce.
  const guidance = useMissionGuidance(active, clocks);
  const mission = active ? resolveSessionMission(active, state.language) : null;
  const t = (key: MessageKey) => translateMessage(state.language, key);

  if (active === null) {
    return null;
  }

  // A Mission that no longer resolves to reviewed, safe content, and a session
  // whose timestamps are impossible, are both recovery cases rather than a
  // Mission to present: nothing about either is guessed at, and neither is
  // shown as an ordinary running Mission.
  if (mission === null || guidance === null || guidance.basis === 'invalid-session') {
    return (
      <div className="mission-session">
        <p className="mission-session__state">
          {t('session.active.missionUnavailable')}
        </p>
      </div>
    );
  }

  const content = mission.content[state.language];
  const adultLabelKey = MISSION_ADULT_LABEL_KEYS[mission.adultInvolvement];

  return (
    <div className="mission-session">
      <p className="mission-session__away">{t('session.active.away')}</p>
      <h2 className="mission-session__mission">{content.title}</h2>
      <p className="mission-session__instruction">{content.instruction}</p>
      {adultLabelKey && content.adultInvolvementNote ? (
        <p className="mission-session__note mission-session__note--adult">
          <span aria-hidden="true" className="mission-session__note-mark" />
          <span className="mission-session__note-label">{t(adultLabelKey)}</span>
          {content.adultInvolvementNote}
        </p>
      ) : null}
      {content.safetyNote ? (
        <p className="mission-session__note mission-session__note--safety">
          <span aria-hidden="true" className="mission-session__note-mark" />
          <span className="mission-session__note-label">
            {t('discovery.card.safetyLabel')}
          </span>
          {content.safetyNote}
        </p>
      ) : null}
      <p className="mission-session__guidance">
        {guidanceMessage(guidance, state.language)}
      </p>
      {/* Where the clock cannot be read, the duration the session recorded is
          still worth knowing. It is the session's own stored value: a malformed
          one is never replaced with the catalog's, and no number is invented to
          fill the gap. */}
      {guidance.basis === 'unreadable-clock' && guidance.durationSeconds > 0 ? (
        <p className="mission-session__guidance">
          {t('discovery.card.about')}{' '}
          {Math.round(guidance.durationSeconds / SECONDS_PER_MINUTE)}{' '}
          {t('discovery.card.minutes')}
        </p>
      ) : null}
    </div>
  );
}
