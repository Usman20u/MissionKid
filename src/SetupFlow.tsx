import type { FormEvent } from 'react';

import { useAppState } from './appState';
import {
  SUPPORTED_LANGUAGES,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import {
  AGE_BANDS,
  type AgeBand,
  type PersistenceAdapter,
} from './persistence';
import { saveSetup } from './setup';

const LANGUAGE_NAME_KEYS: Readonly<Record<SupportedLanguage, MessageKey>> = {
  en: 'setup.language.en',
  de: 'setup.language.de',
  ru: 'setup.language.ru',
};

export type LocalProfileIdFactory = () => string;

export function createLocalProfileId(): string {
  return globalThis.crypto.randomUUID();
}

type SetupFlowProps = Readonly<{
  adapter: PersistenceAdapter;
  createProfileId: LocalProfileIdFactory;
}>;

export function SetupFlow({ adapter, createProfileId }: SetupFlowProps) {
  const { dispatch, state } = useAppState();

  if (state.status !== 'ready') {
    return null;
  }

  const { ageBand, language, localProfileId, saveStatus, setupView } = state;

  if (setupView === 'handoff' && ageBand && localProfileId) {
    return (
      <div className="setup-complete">
        <p className="setup-complete__body">
          {translateMessage(language, 'setup.complete.body')}
        </p>
        <dl className="setup-summary">
          <div>
            <dt>{translateMessage(language, 'setup.complete.language')}</dt>
            <dd>{translateMessage(language, LANGUAGE_NAME_KEYS[language])}</dd>
          </div>
          <div>
            <dt>{translateMessage(language, 'setup.complete.age')}</dt>
            <dd>{ageBand}</dd>
          </div>
        </dl>
        <p>{translateMessage(language, 'setup.complete.next')}</p>
        <button
          className="button button--secondary"
          onClick={() => dispatch({ type: 'setup-editing-started' })}
          type="button"
        >
          {translateMessage(language, 'setup.action.edit')}
        </button>
      </div>
    );
  }

  const isEditing = setupView === 'editing';
  const ageHelpId = 'setup-age-help';
  const ageRequiredId = 'setup-age-required';
  const saveFeedbackId = 'setup-save-feedback';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ageBand) {
      return;
    }

    const result = saveSetup(
      adapter,
      { language, ageBand, localProfileId },
      createProfileId,
    );

    if (result.status === 'confirmed') {
      dispatch({ type: 'setup-save-confirmed', snapshot: result.snapshot });
    } else {
      dispatch({
        type: 'setup-save-unconfirmed',
        localProfileId: result.localProfileId,
        recovery: result.recovery,
      });
    }
  }

  return (
    <form className="setup-form" onSubmit={handleSubmit}>
      <p className="setup-form__introduction">
        {translateMessage(language, 'setup.introduction')}
      </p>

      <fieldset className="choice-group" aria-describedby="setup-language-help">
        <legend>{translateMessage(language, 'setup.language.legend')}</legend>
        <p className="choice-group__help" id="setup-language-help">
          {translateMessage(language, 'setup.language.help')}
          {isEditing
            ? ` ${translateMessage(language, 'setup.edit.languageEffect')}`
            : null}
        </p>
        <div className="choice-grid choice-grid--languages">
          {SUPPORTED_LANGUAGES.map((languageChoice) => (
            <label className="choice" key={languageChoice}>
              <input
                checked={language === languageChoice}
                name="setup-language"
                onChange={() =>
                  dispatch({
                    type: 'language-changed',
                    language: languageChoice,
                  })
                }
                type="radio"
                value={languageChoice}
              />
              <span>
                {translateMessage(
                  language,
                  LANGUAGE_NAME_KEYS[languageChoice],
                )}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset
        className="choice-group"
        aria-describedby={`${ageHelpId} ${ageRequiredId}`}
      >
        <legend>{translateMessage(language, 'setup.age.legend')}</legend>
        <p className="choice-group__help" id={ageHelpId}>
          {translateMessage(language, 'setup.age.help')}
          {isEditing
            ? ` ${translateMessage(language, 'setup.edit.ageEffect')}`
            : null}
        </p>
        <div className="choice-grid choice-grid--ages">
          {AGE_BANDS.map((ageBandChoice: AgeBand) => (
            <label className="choice" key={ageBandChoice}>
              <input
                checked={ageBand === ageBandChoice}
                name="setup-age-band"
                onChange={() =>
                  dispatch({
                    type: 'age-band-changed',
                    ageBand: ageBandChoice,
                  })
                }
                type="radio"
                value={ageBandChoice}
              />
              <span>{ageBandChoice}</span>
            </label>
          ))}
        </div>
        <p className="choice-group__required" id={ageRequiredId}>
          {translateMessage(language, 'setup.age.required')}
        </p>
      </fieldset>

      <aside className="parent-note">
        <p>{translateMessage(language, 'setup.parentResponsibility')}</p>
        <p>{translateMessage(language, 'setup.privacy')}</p>
      </aside>

      {saveStatus === 'unconfirmed' ? (
        <p className="save-feedback" id={saveFeedbackId} role="alert">
          {translateMessage(language, 'setup.save.unconfirmed')}
        </p>
      ) : null}

      <button
        aria-describedby={
          saveStatus === 'unconfirmed'
            ? `${ageRequiredId} ${saveFeedbackId}`
            : ageRequiredId
        }
        className="button button--primary"
        disabled={!ageBand}
        type="submit"
      >
        {translateMessage(
          language,
          isEditing ? 'setup.action.saveChanges' : 'setup.action.complete',
        )}
      </button>
    </form>
  );
}
