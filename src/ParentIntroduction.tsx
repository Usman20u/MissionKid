import { MISSION_CATALOG } from './catalogContent';
import { AGE_BANDS, type AgeBand } from './ageBands';
import type { MissionRecord } from './catalog';
import { isEligibleForContext, selectValidMissions } from './catalogValidation';
import { useAppState } from './appState';
import {
  SUPPORTED_LANGUAGES,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import { MissionSceneDefs } from './MissionScene';
import { MissionCard } from './MissionSuggestionSet';
import { FLOW_STEP_IMAGES, INTRODUCTION_HERO_IMAGE } from './productImagery';

const LANGUAGE_NAME_KEYS: Readonly<Record<SupportedLanguage, MessageKey>> = {
  en: 'setup.language.en',
  de: 'setup.language.de',
  ru: 'setup.language.ru',
};

// The one Mission the introduction illustrates. It is an ordinary reviewed
// catalog entry, chosen because it is approved for every supported age band, so
// showing it infers no age context and decides no eligibility question.
export const INTRODUCTION_EXAMPLE_MISSION_ID = 'helping-11';

// Which of the example's illustrations it shows. The introduction is reached
// before any age band is chosen, so it shows this documented default: a fixed
// presentation choice that infers nothing about the child and is stored
// nowhere. Were an age band already in effect, the example would show that
// band's illustration instead.
export const INTRODUCTION_EXAMPLE_AGE_BAND: AgeBand = '4–6';

const FLOW_STEP_KEYS: readonly MessageKey[] = [
  'introduction.flow.step1',
  'introduction.flow.step2',
  'introduction.flow.step3',
];

// The example, resolved through the same eligibility rule discovery applies —
// reviewed, discovery-eligible, approved for the age band and complete in this
// language — asked once per supported band. Nothing is relaxed to produce an
// example: a Mission that is not approved for every band, or whose content is
// incomplete in the resolved language, yields no example at all.
export function resolveIntroductionExample(
  records: readonly unknown[] = MISSION_CATALOG,
  language: SupportedLanguage = 'en',
  missionId: string = INTRODUCTION_EXAMPLE_MISSION_ID,
): MissionRecord | null {
  const mission = selectValidMissions(records).find(
    (record) => record.missionId === missionId,
  );

  if (!mission) {
    return null;
  }

  return AGE_BANDS.every((ageBand) =>
    isEligibleForContext(mission, {
      ageBand,
      category: mission.category,
      language,
    }),
  )
    ? mission
    : null;
}

type ParentIntroductionProps = Readonly<{
  catalog?: readonly unknown[];
}>;

// The F001 first-use introduction. It explains what MissionKid is for, says
// what setup involves, offers one forward action into the unchanged setup
// form, and then gives the short account of the flow and one non-selectable
// example.
//
// Nothing here writes. The language choice applies to the interface and to the
// example's reviewed content at once, carries into setup within the visit, and
// becomes durable only through the confirmed setup save.
export function ParentIntroduction({ catalog = MISSION_CATALOG }: ParentIntroductionProps = {}) {
  const { dispatch, state } = useAppState();
  const { language } = state;
  const t = (key: MessageKey) => translateMessage(language, key);
  const example = resolveIntroductionExample(catalog, language);
  const exampleHeadingId = 'introduction-example-heading';
  const flowHeadingId = 'introduction-flow-heading';

  return (
    <div className="introduction">
      {/* First, so a parent who cannot read the current language reaches it
          without reading the view. Secondary to the one forward action, and
          deliberately compact: the same radio group setup uses, at the size a
          switch needs rather than the size a setup choice needs. */}
      <fieldset className="choice-group introduction__languages">
        <legend>{t('setup.language.legend')}</legend>
        <div className="choice-grid choice-grid--inline">
          {SUPPORTED_LANGUAGES.map((languageChoice) => (
            <label className="choice choice--inline" key={languageChoice}>
              <input
                checked={language === languageChoice}
                name="introduction-language"
                onChange={() =>
                  dispatch({ type: 'language-changed', language: languageChoice })
                }
                type="radio"
                value={languageChoice}
              />
              <span>{t(LANGUAGE_NAME_KEYS[languageChoice])}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="introduction__lead">{t('introduction.lead')}</p>

      {/* What the one action leads to, in the setup step's own approved
          wording rather than a second version of it, read directly before the
          action it describes. Ordinary text at the view's size. */}
      <aside className="parent-note introduction__note">
        <p>{t('introduction.setup.brief')}</p>
        <p>{t('setup.privacy')}</p>
        <p>{t('setup.parentResponsibility')}</p>
      </aside>

      {/* The one forward action, rendered once. Where there is room it stands
          in the hero beside the picture; it is never duplicated, pinned or
          floated over anything. */}
      <button
        className="button button--primary introduction__action"
        onClick={() => dispatch({ type: 'introduction-continued' })}
        type="button"
      >
        {t('introduction.action.setup')}
      </button>

      {/* The hero picture: decoration that stands for no Mission and says
          nothing the words do not. It follows the action, so on a phone it
          never comes before the task; where there is room it is the view's
          principal picture. The first thing painted, so it is not deferred. */}
      <img
        alt=""
        aria-hidden="true"
        className="introduction__hero"
        decoding="async"
        fetchPriority="high"
        height={INTRODUCTION_HERO_IMAGE.height}
        sizes={INTRODUCTION_HERO_IMAGE.sizes}
        src={INTRODUCTION_HERO_IMAGE.src}
        srcSet={INTRODUCTION_HERO_IMAGE.srcSet}
        width={INTRODUCTION_HERO_IMAGE.width}
      />

      <section aria-labelledby={flowHeadingId} className="introduction__flow">
        <h2 className="introduction__heading" id={flowHeadingId}>
          {t('introduction.flow.heading')}
        </h2>
        {/* The list role is stated because the numbers are drawn by the
            stylesheet: an unstyled marker is what some engines use to keep a
            list a list. Each step's picture is decoration; its words are the
            step. Below the hero, so the pictures load as they are reached. */}
        <ol className="introduction__steps" role="list">
          {FLOW_STEP_KEYS.map((key, index) => (
            <li className="introduction__step" key={key}>
              <img
                alt=""
                aria-hidden="true"
                className="introduction__step-image"
                decoding="async"
                height={FLOW_STEP_IMAGES[index]!.height}
                loading="lazy"
                sizes={FLOW_STEP_IMAGES[index]!.sizes}
                src={FLOW_STEP_IMAGES[index]!.src}
                srcSet={FLOW_STEP_IMAGES[index]!.srcSet}
                width={FLOW_STEP_IMAGES[index]!.width}
              />
              <span className="introduction__step-text">{t(key)}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* One example, unmistakably an example: its own heading says so, and
          the card carries no choose action and no selection affordance, so it
          cannot be taken for one of the three equally weighted suggestions
          F002 presents later. Its reviewed content, including the safety note,
          is rendered complete by the same card discovery renders. */}
      {example ? (
        <section
          aria-labelledby={exampleHeadingId}
          className="introduction__example"
        >
          <h2 className="introduction__heading" id={exampleHeadingId}>
            {t('introduction.example.label')}
          </h2>
          <MissionSceneDefs />
          <MissionCard
            ageBand={state.ageBand ?? INTRODUCTION_EXAMPLE_AGE_BAND}
            language={language}
            mission={example}
            surface="introduction"
          />
        </section>
      ) : null}
    </div>
  );
}
