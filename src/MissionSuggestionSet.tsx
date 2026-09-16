import { MISSION_CATALOG } from './catalogContent';
import type { MissionCategory, MissionRecord } from './catalog';
import { translateMessage, type MessageKey, type SupportedLanguage } from './localization';
import { MissionScene, MissionSceneDefs } from './MissionScene';
import { deriveSuggestionSet, type SuggestionContext } from './missionSuggestions';

const CATEGORY_LABEL_KEYS: Readonly<Record<MissionCategory, MessageKey>> = {
  Movement: 'discovery.category.movement',
  Creativity: 'discovery.category.creativity',
  'Helping at Home': 'discovery.category.helpingAtHome',
  Learning: 'discovery.category.learning',
  Calm: 'discovery.category.calm',
};

// The two required levels stay distinguishable in words, in every language.
// "No special adult assistance required" shows nothing: it is not a promise that
// ordinary parental judgement can be skipped.
const ADULT_LABEL_KEYS: Readonly<Partial<Record<string, MessageKey>>> = {
  'Adult nearby required': 'discovery.adult.nearby',
  'Adult participation required': 'discovery.adult.participation',
};

type CardProps = Readonly<{
  mission: MissionRecord;
  language: SupportedLanguage;
}>;

// Presentation only: an article, not a control. Task 5 has no choice behaviour,
// so nothing here may look or behave like a button.
function MissionCard({ mission, language }: CardProps) {
  const t = (key: MessageKey) => translateMessage(language, key);
  const content = mission.content[language];
  const adultLabelKey = ADULT_LABEL_KEYS[mission.adultInvolvement];
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
            {t(CATEGORY_LABEL_KEYS[mission.category])}
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
  const label = translateMessage(language, CATEGORY_LABEL_KEYS[category]);

  return (
    <p aria-atomic="true" aria-live="polite" className="a11y-only" role="status">
      {`${label} — ${translateMessage(language, stateKey)}`}
    </p>
  );
}

type MissionSuggestionSetProps = Readonly<{
  context: SuggestionContext;
  catalog?: readonly unknown[];
}>;

export function MissionSuggestionSet({
  context,
  catalog = MISSION_CATALOG,
}: MissionSuggestionSetProps) {
  const t = (key: MessageKey) => translateMessage(context.language, key);
  const result = deriveSuggestionSet(catalog, context);
  const headingId = 'mission-suggestions-heading';

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
    <section aria-labelledby={headingId} className="mission-suggestions">
      <MissionSceneDefs />
      <SuggestionAnnouncement
        category={context.category}
        language={context.language}
        stateKey="discovery.suggestions.heading"
      />
      <h2 className="mission-suggestions__title" id={headingId}>
        {t('discovery.suggestions.heading')}
      </h2>
      <div className="mission-suggestions__set">
        {result.missions.map((mission) => (
          <MissionCard key={mission.missionId} language={context.language} mission={mission} />
        ))}
      </div>
    </section>
  );
}
