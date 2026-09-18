import { useEffect, useRef } from 'react';

import { MISSION_CATALOG } from './catalogContent';
import type { MissionCategory, MissionRecord } from './catalog';
import {
  MISSION_ADULT_LABEL_KEYS,
  MISSION_CATEGORY_LABEL_KEYS,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import { MissionScene, MissionSceneDefs } from './MissionScene';
import type { MissionSelectionIssue } from './appState';
import { deriveSuggestionSet, type SuggestionContext } from './missionSuggestions';

type CardProps = Readonly<{
  mission: MissionRecord;
  language: SupportedLanguage;
  onChoose?: (missionId: string) => void;
}>;

// Presentation only: an article, not a control. Task 5 has no choice behaviour,
// so nothing here may look or behave like a button.
function MissionCard({ mission, language, onChoose }: CardProps) {
  const t = (key: MessageKey) => translateMessage(language, key);
  const content = mission.content[language];
  const adultLabelKey = MISSION_ADULT_LABEL_KEYS[mission.adultInvolvement];
  const minutes = Math.round(mission.durationSeconds / 60);
  const titleId = `mission-title-${mission.missionId}`;

  return (
    <article
      aria-labelledby={titleId}
      className="mission-card"
      data-category={mission.category}
    >
      <div className="mission-card__window">
        <MissionScene category={mission.category} missionId={mission.missionId} />
      </div>
      <div className="mission-card__content">
        <p className="mission-card__meta">
          <span className="mission-card__category">
            {t(MISSION_CATEGORY_LABEL_KEYS[mission.category])}
          </span>
          <span className="mission-card__duration">
            {t('discovery.card.about')} {minutes} {t('discovery.card.minutes')}
          </span>
        </p>
        <h3 className="mission-card__title" id={titleId}>
          {content.title}
        </h3>
        <p className="mission-card__instruction">{content.instruction}</p>
        {adultLabelKey && content.adultInvolvementNote ? (
          <p className="mission-card__note mission-card__note--adult">
            <span aria-hidden="true" className="mission-card__note-mark" />
            <span className="mission-card__note-label">{t(adultLabelKey)}</span>
            {content.adultInvolvementNote}
          </p>
        ) : null}
        {content.safetyNote ? (
          <p className="mission-card__note mission-card__note--safety">
            <span aria-hidden="true" className="mission-card__note-mark" />
            <span className="mission-card__note-label">{t('discovery.card.safetyLabel')}</span>
            {content.safetyNote}
          </p>
        ) : null}
        {/* The card stays an article: only this control is activatable, so the
            three remain comparable peers rather than three large buttons. It
            names its own Mission, and choosing twice resolves one session
            rather than relying on the press being hard to repeat. */}
        {onChoose ? (
          <button
            aria-describedby={titleId}
            className="button button--primary mission-card__choose"
            onClick={() => onChoose(mission.missionId)}
            type="button"
          >
            {t('discovery.card.choose')}
          </button>
        ) : null}
      </div>
    </article>
  );
}

// The visible heading names the state but not which Mission Category produced
// it, so it reads identically for all five and a Mission Category change
// announces nothing. This region carries both, composed from strings the
// interface already shows: no new wording is invented for assistive technology
// alone. It stops at the heading — reading three Missions aloud on every change
// would be the repetitive interruption the accessibility baseline forbids.
function SuggestionAnnouncement({
  category,
  language,
  stateKey,
}: Readonly<{
  category: MissionCategory;
  language: SupportedLanguage;
  stateKey: MessageKey;
}>) {
  const label = translateMessage(language, MISSION_CATEGORY_LABEL_KEYS[category]);

  return (
    <p aria-atomic="true" aria-live="polite" className="a11y-only" role="status">
      {`${label} — ${translateMessage(language, stateKey)}`}
    </p>
  );
}

type MissionSuggestionSetProps = Readonly<{
  context: SuggestionContext;
  catalog?: readonly unknown[];
  // Mission identifiers this discovery cycle has already shown.
  shown?: readonly string[];
  // Absent where no cycle owns this set, in which case no bounded progression
  // is offered at all rather than a control that could not advance anything.
  onAnotherSet?: (missionIds: readonly string[]) => void;
  // Absent where nothing can own a selection, for the same reason.
  onChoose?: (missionId: string) => void;
  // Why the last deliberate choice did not become a new Mission Session.
  selectionIssue?: MissionSelectionIssue | null;
  // Which attempt it belongs to, so a repeated failure is a new message rather
  // than the same one left standing.
  selectionAttempt?: number;
  // The localized title of the Mission a conflict is about. Absent when the
  // stored Mission no longer resolves to reviewed content, in which case the
  // message stays truthful by naming nothing.
  chosenMissionTitle?: string | null;
}>;

export function MissionSuggestionSet({
  context,
  catalog = MISSION_CATALOG,
  shown = [],
  onAnotherSet,
  onChoose,
  selectionIssue = null,
  selectionAttempt = 0,
  chosenMissionTitle = null,
}: MissionSuggestionSetProps) {
  const t = (key: MessageKey) => translateMessage(context.language, key);
  const result = deriveSuggestionSet(catalog, context, shown);
  const headingId = 'mission-suggestions-heading';
  const heading = useRef<HTMLHeadingElement>(null);
  const advanced = useRef(shown.length);

  // Replacing three Missions under a deliberate press is a state change the
  // family must be able to find again. The heading names the new state and sits
  // directly above it, so focus moves there rather than announcing three
  // Missions aloud or leaving a screen-reader user somewhere that no longer
  // describes what is on screen.
  useEffect(() => {
    if (shown.length > advanced.current) heading.current?.focus();
    advanced.current = shown.length;
  }, [shown.length]);

  if (result.status === 'insufficient-content') {
    return (
      <section aria-labelledby={headingId} className="mission-unavailable">
        <SuggestionAnnouncement
          category={context.category}
          language={context.language}
          stateKey="discovery.unavailable.title"
        />
        <h2 className="mission-unavailable__title" id={headingId}>
          {t('discovery.unavailable.title')}
        </h2>
        <p className="mission-unavailable__body">{t('discovery.unavailable.body')}</p>
      </section>
    );
  }

  return (
    // The set belongs to one Mission Category, and the category atmosphere is
    // carried by `data-category`. Without it the bounded and recovery notices
    // below resolve no hue at all and lose the surface that separates them from
    // ordinary copy.
    <section
      aria-labelledby={headingId}
      className="mission-suggestions"
      data-category={context.category}
    >
      <MissionSceneDefs />
      <SuggestionAnnouncement
        category={context.category}
        language={context.language}
        stateKey="discovery.suggestions.heading"
      />
      <h2
        className="mission-suggestions__title"
        id={headingId}
        ref={heading}
        tabIndex={-1}
      >
        {t('discovery.suggestions.heading')}
      </h2>
      {/* A choice that did not become a Mission Session. It is said plainly and
          in one sentence, and the three Missions below stay exactly as they
          were: choosing again is the retry, and choosing the same Mission
          resolves the one already stored rather than making a second. Nothing
          here names a session, a storage key or an exception.
          A conflict is a product state and is announced politely; an
          unconfirmed transition is a failure and follows the assertive
          treatment already used for an unconfirmed save. */}
      {selectionIssue ? (
        <p
          className={`mission-suggestions__issue mission-suggestions__issue--${selectionIssue}`}
          // Each attempt is its own message. Choosing again after the same
          // failure would otherwise leave an unchanged node that no live region
          // reports, so the retry this text asks for would go unanswered.
          key={`${selectionIssue}-${selectionAttempt}`}
          role={selectionIssue === 'conflict' ? 'status' : 'alert'}
        >
          {selectionIssue === 'conflict'
            ? // Naming the Mission is what makes "choose that same Mission
              // again" something the family can act on: the one already chosen
              // is often not among the three in front of them.
              chosenMissionTitle
              ? t('discovery.selection.conflictNamed').replace(
                  '{mission}',
                  chosenMissionTitle,
                )
              : t('discovery.selection.conflict')
            : t('discovery.selection.unconfirmed')}
        </p>
      ) : null}
      <div className="mission-suggestions__set">
        {result.missions.map((mission) => (
          <MissionCard
            key={mission.missionId}
            language={context.language}
            mission={mission}
            onChoose={onChoose}
          />
        ))}
      </div>
      {/* Secondary to choosing one of the three above, and offered only while a
          further complete unseen group exists. Running out is a bounded catalog,
          so it is stated plainly and the current three stay choosable. */}
      {onAnotherSet ? (
        result.anotherSetAvailable ? (
          <button
            className="button button--secondary mission-suggestions__another"
            onClick={() => onAnotherSet(result.missions.map((mission) => mission.missionId))}
            type="button"
          >
            {t('discovery.anotherSet')}
          </button>
        ) : (
          <p className="mission-suggestions__bounded">{t('discovery.anotherSet.bounded')}</p>
        )
      ) : null}
    </section>
  );
}
