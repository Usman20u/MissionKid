import { MISSION_CATALOG } from './catalogContent';
import { AGE_BANDS } from './ageBands';
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

const LANGUAGE_NAME_KEYS: Readonly<Record<SupportedLanguage, MessageKey>> = {
  en: 'setup.language.en',
  de: 'setup.language.de',
  ru: 'setup.language.ru',
};

// The one Mission the introduction illustrates. It is an ordinary reviewed
// catalog entry, chosen because it is approved for every supported age band, so
// showing it infers no age context and decides no eligibility question.
export const INTRODUCTION_EXAMPLE_MISSION_ID = 'helping-11';

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

// The F001 first-use introduction. It explains what MissionKid is for, shows
// one non-selectable example, gives the short account of the flow, and offers
// one forward action into the unchanged setup form.
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

      {/* Two columns where there is room for both, one where there is not. The
          wrapper exists for that placement alone: the reading order inside it
          is the order the specification requires on a narrow screen — the
          example, the short flow, then the one action — and it is the same
          order in both layouts, because nothing here is reordered visually. */}
      <div className="introduction__columns">
        {/* One example, unmistakably an example: its own heading says so, and
            the card carries no choose action and no selection affordance, so it
            cannot be taken for one of the three equally weighted suggestions
            F002 presents later. Its reviewed content, including the safety
            note, is rendered by the same card discovery renders. */}
        {example ? (
          <section
            aria-labelledby={exampleHeadingId}
            className="introduction__example"
          >
            <h2 className="introduction__heading" id={exampleHeadingId}>
              {t('introduction.example.label')}
            </h2>
            <MissionSceneDefs />
            <MissionCard language={language} mission={example} surface="introduction" />
          </section>
        ) : null}

        <div className="introduction__guidance">
          <section aria-labelledby={flowHeadingId} className="introduction__flow">
            <h2 className="introduction__heading" id={flowHeadingId}>
              {t('introduction.flow.heading')}
            </h2>
            <ol className="introduction__steps">
              {FLOW_STEP_KEYS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ol>
          </section>

          {/* What the one action leads to, in the setup step's own approved
              wording rather than a second version of it. */}
          <aside className="parent-note">
            <p>{t('introduction.setup.brief')}</p>
            <p>{t('setup.privacy')}</p>
            <p>{t('setup.parentResponsibility')}</p>
          </aside>

          {/* The one forward action, rendered once. It moves between layouts
              with the column it belongs to; it is never duplicated, pinned or
              floated over anything. */}
          <button
            className="button button--primary"
            onClick={() => dispatch({ type: 'introduction-continued' })}
            type="button"
          >
            {t('introduction.action.setup')}
          </button>
        </div>
      </div>
    </div>
  );
}
