export const SUPPORTED_LANGUAGES = ['en', 'de', 'ru'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

const englishMessages = {
  "recovery.pending": "Please wait. This action has not yet been confirmed.",
  "recovery.temporary": "Temporary mode: choices on this page are not confirmed saved in this browser. Refreshing or closing may lose them.",
  "recovery.temporaryReady": "Setup choices are ready for this page only, not confirmed saved.",
  "recovery.useTemporary": "Use choices temporarily",
  "recovery.blocked": "Saved setup cannot currently be used. It has not been automatically replaced or reset. Try reading it again, or choose a deliberate reset.",
  "recovery.retry": "Retry browser storage",
  "recovery.retryHelp": "Retry checks what is saved in this browser and uses that state. Temporary edits are not automatically saved or combined with it.",
  "recovery.resetTitle": "Reset MissionKid data",
  "recovery.resetConsequence": "Reset removes MissionKid settings, child profile context, any unfinished Mission, History and Monthly Goal sources from this browser. MissionKid cannot recover them: there is no account or cloud backup. Unrelated browser data is not removed.",
  "recovery.cancel": "Cancel",
  "recovery.confirmReset": "Confirm reset",
  "recovery.resetUnconfirmed": "Reset could not be confirmed. Do not assume your data was cleared. Retry to check what remains saved in this browser.",
  'app.brand': 'MissionKid',
  'area.parent': 'Parent area',
  'view.pending.title': 'Preparing MissionKid',
  'view.setupFirstUse.title': 'Parent setup',
  'view.setupIncomplete.title': 'Parent setup needs attention',
  'view.setupEditing.title': 'Setup settings',
  'view.temporaryMode.title': 'Temporary mode',
  'view.recovery.title': 'Recovery needed',
  'view.setupCompleteHandoff.title': 'Setup complete',
  'error.unexpected.title': 'MissionKid needs attention',
  'setup.introduction':
    'A parent or caregiver sets up the language and age context for this family.',
  'setup.language.legend': 'Interface language',
  'setup.language.help': 'Choose the language MissionKid uses on this screen.',
  'setup.language.en': 'English',
  'setup.language.de': 'Deutsch',
  'setup.language.ru': 'Русский',
  'setup.age.legend': "Child's age group",
  'setup.age.help':
    'This helps MissionKid use suitable activities. It is not an assessment, and you decide what is right for your child.',
  'setup.age.required': 'Required: choose one age group to continue.',
  'setup.privacy':
    'No name, birth date, account, or contact details are needed.',
  'setup.parentResponsibility':
    'You remain responsible for deciding whether an activity suits your child and surroundings.',
  'setup.action.complete': 'Complete setup',
  'setup.action.saveChanges': 'Save changes',
  'setup.edit.languageEffect':
    'After saving, the chosen language applies to interface text and Mission presentation going forward.',
  'setup.edit.ageEffect':
    'After saving, the age group affects future Mission suggestions only. Existing selected, ready, or active Missions, completed history, and recorded progress remain unchanged.',
  'setup.save.unconfirmed':
    'Saving could not be confirmed. Choices on this page may be temporary and lost when you refresh or close it. Try again.',
  'setup.complete.body':
    'Your language and age group are saved in this browser.',
  'setup.complete.next': 'MissionKid is ready for the next step.',
  'setup.complete.language': 'Language',
  'setup.complete.age': 'Age group',
  'setup.action.edit': 'Change setup',
} as const;

export type MessageKey = keyof typeof englishMessages;

type CompleteInterfaceMessages = Readonly<
  Record<SupportedLanguage, Readonly<Record<MessageKey, string>>>
>;

export const INTERFACE_MESSAGES: CompleteInterfaceMessages = {
  en: englishMessages,
  de: {
    "recovery.pending": "Bitte warten. Diese Aktion wurde noch nicht bestätigt.",
    "recovery.temporary": "Temporärer Modus: Die Auswahl auf dieser Seite ist nicht bestätigt in diesem Browser gespeichert. Beim Aktualisieren oder Schließen kann sie verloren gehen.",
    "recovery.temporaryReady": "Die Einrichtung gilt nur für diese Seite und ist nicht bestätigt gespeichert.",
    "recovery.useTemporary": "Auswahl vorübergehend verwenden",
    "recovery.blocked": "Die gespeicherte Einrichtung kann derzeit nicht verwendet werden. Sie wurde nicht automatisch ersetzt oder zurückgesetzt. Versuchen Sie, sie erneut zu lesen, oder wählen Sie bewusst das Zurücksetzen.",
    "recovery.retry": "Browserspeicher erneut prüfen",
    "recovery.retryHelp": "Erneutes Prüfen verwendet den gespeicherten Stand in diesem Browser. Vorübergehende Änderungen werden nicht automatisch gespeichert oder damit zusammengeführt.",
    "recovery.resetTitle": "MissionKid-Daten zurücksetzen",
    "recovery.resetConsequence": "Das Zurücksetzen entfernt MissionKid-Einstellungen, den Profilkontext des Kindes, eine etwaige unvollendete Mission sowie die Grundlagen für Verlauf und Monatsziel aus diesem Browser. MissionKid kann diese Daten nicht wiederherstellen: Es gibt kein Konto und keine Cloud-Sicherung. Andere Browserdaten werden nicht entfernt.",
    "recovery.cancel": "Abbrechen",
    "recovery.confirmReset": "Zurücksetzen bestätigen",
    "recovery.resetUnconfirmed": "Das Zurücksetzen konnte nicht bestätigt werden. Gehen Sie nicht davon aus, dass Ihre Daten gelöscht wurden. Prüfen Sie erneut, was in diesem Browser gespeichert bleibt.",
    'app.brand': 'MissionKid',
    'area.parent': 'Elternbereich',
    'view.pending.title': 'MissionKid wird vorbereitet',
    'view.setupFirstUse.title': 'Einrichtung durch Eltern',
    'view.setupIncomplete.title': 'Einrichtung durch Eltern prüfen',
    'view.setupEditing.title': 'Einrichtung verwalten',
    'view.temporaryMode.title': 'Temporärer Modus',
    'view.recovery.title': 'Wiederherstellung erforderlich',
    'view.setupCompleteHandoff.title': 'Einrichtung abgeschlossen',
    'error.unexpected.title': 'MissionKid benötigt Ihre Aufmerksamkeit',
    'setup.introduction':
      'Ein Elternteil oder eine Betreuungsperson richtet Sprache und Alterskontext für diese Familie ein.',
    'setup.language.legend': 'Sprache der Benutzeroberfläche',
    'setup.language.help':
      'Wählen Sie die Sprache, die MissionKid auf diesem Bildschirm verwendet.',
    'setup.language.en': 'English',
    'setup.language.de': 'Deutsch',
    'setup.language.ru': 'Русский',
    'setup.age.legend': 'Altersgruppe des Kindes',
    'setup.age.help':
      'Damit kann MissionKid passende Aktivitäten verwenden. Dies ist keine Beurteilung; Sie entscheiden, was für Ihr Kind richtig ist.',
    'setup.age.required':
      'Erforderlich: Wählen Sie eine Altersgruppe aus, um fortzufahren.',
    'setup.privacy':
      'Name, Geburtsdatum, Konto oder Kontaktdaten sind nicht erforderlich.',
    'setup.parentResponsibility':
      'Sie entscheiden weiterhin, ob eine Aktivität zu Ihrem Kind und der Umgebung passt.',
    'setup.action.complete': 'Einrichtung abschließen',
    'setup.action.saveChanges': 'Änderungen speichern',
    'setup.edit.languageEffect':
      'Nach dem Speichern gilt die gewählte Sprache für die weitere Anzeige der Benutzeroberfläche und der Missionen.',
    'setup.edit.ageEffect':
      'Nach dem Speichern beeinflusst die Altersgruppe nur künftige Missionsvorschläge. Bereits ausgewählte, startbereite oder aktive Missionen, der Verlauf abgeschlossener Missionen und gespeicherte Fortschritte bleiben unverändert.',
    'setup.save.unconfirmed':
      'Das Speichern konnte nicht bestätigt werden. Die Auswahl auf dieser Seite kann vorübergehend sein und beim Aktualisieren oder Schließen verloren gehen. Versuchen Sie es erneut.',
    'setup.complete.body':
      'Ihre Sprache und Altersgruppe sind in diesem Browser gespeichert.',
    'setup.complete.next': 'MissionKid ist bereit für den nächsten Schritt.',
    'setup.complete.language': 'Sprache',
    'setup.complete.age': 'Altersgruppe',
    'setup.action.edit': 'Einrichtung ändern',
  },
  ru: {
    "recovery.pending": "Подождите. Это действие ещё не подтверждено.",
    "recovery.temporary": "Временный режим: сохранение выбора на этой странице в этом браузере не подтверждено. При обновлении или закрытии страницы выбор может быть потерян.",
    "recovery.temporaryReady": "Настройки готовы только для этой страницы; сохранение не подтверждено.",
    "recovery.useTemporary": "Использовать выбор временно",
    "recovery.blocked": "Сохранённые настройки сейчас нельзя использовать. Они не были автоматически заменены или сброшены. Попробуйте прочитать их снова или осознанно выберите сброс.",
    "recovery.retry": "Повторить проверку хранилища браузера",
    "recovery.retryHelp": "Повторная проверка использует сохранённое состояние в этом браузере. Временные изменения не сохраняются автоматически и не объединяются с ним.",
    "recovery.resetTitle": "Сбросить данные MissionKid",
    "recovery.resetConsequence": "Сброс удалит из этого браузера настройки MissionKid, контекст профиля ребёнка, незавершённую миссию, если она есть, и исходные данные истории и месячной цели. MissionKid не сможет их восстановить: учётной записи и облачной копии нет. Остальные данные браузера не удаляются.",
    "recovery.cancel": "Отмена",
    "recovery.confirmReset": "Подтвердить сброс",
    "recovery.resetUnconfirmed": "Сброс не удалось подтвердить. Не считайте данные удалёнными. Повторите проверку, чтобы узнать, что осталось сохранено в этом браузере.",
    'app.brand': 'MissionKid',
    'area.parent': 'Раздел для родителей',
    'view.pending.title': 'Подготавливаем MissionKid',
    'view.setupFirstUse.title': 'Настройка для родителей',
    'view.setupIncomplete.title': 'Проверьте настройку для родителей',
    'view.setupEditing.title': 'Изменить настройки',
    'view.temporaryMode.title': 'Временный режим',
    'view.recovery.title': 'Требуется восстановление',
    'view.setupCompleteHandoff.title': 'Настройка завершена',
    'error.unexpected.title': 'MissionKid требует вашего внимания',
    'setup.introduction':
      'Родитель или другой взрослый выбирает язык и возрастную группу для этой семьи.',
    'setup.language.legend': 'Язык интерфейса',
    'setup.language.help': 'Выберите язык этого экрана MissionKid.',
    'setup.language.en': 'English',
    'setup.language.de': 'Deutsch',
    'setup.language.ru': 'Русский',
    'setup.age.legend': 'Возрастная группа ребёнка',
    'setup.age.help':
      'Это помогает MissionKid подбирать подходящие занятия. Это не оценка способностей: вы решаете, что подходит вашему ребёнку.',
    'setup.age.required':
      'Обязательно: выберите возрастную группу, чтобы продолжить.',
    'setup.privacy':
      'Имя, дата рождения, учётная запись и контактные данные не нужны.',
    'setup.parentResponsibility':
      'Вы по-прежнему решаете, подходит ли занятие вашему ребёнку и окружающим условиям.',
    'setup.action.complete': 'Завершить настройку',
    'setup.action.saveChanges': 'Сохранить изменения',
    'setup.edit.languageEffect':
      'После сохранения выбранный язык будет использоваться для дальнейшего отображения интерфейса и миссий.',
    'setup.edit.ageEffect':
      'После сохранения возрастная группа влияет только на будущие предложения миссий. Уже выбранные, готовые к началу или активные миссии, история завершённых миссий и сохранённый прогресс остаются без изменений.',
    'setup.save.unconfirmed':
      'Не удалось подтвердить сохранение. Выбор на этой странице может быть временным и потеряться после обновления или закрытия. Попробуйте ещё раз.',
    'setup.complete.body':
      'Язык и возрастная группа сохранены в этом браузере.',
    'setup.complete.next': 'MissionKid готов к следующему шагу.',
    'setup.complete.language': 'Язык',
    'setup.complete.age': 'Возрастная группа',
    'setup.action.edit': 'Изменить настройку',
  },
};

export type InterfaceMessageResources = Readonly<
  Record<
    SupportedLanguage,
    Readonly<Partial<Record<MessageKey, string>>>
  >
>;

export type MissingMessageReporter = (
  language: SupportedLanguage,
  key: MessageKey,
) => void;

function reportMissingMessage(language: SupportedLanguage, key: MessageKey) {
  if (import.meta.env.DEV) {
    console.warn(
      `Missing interface message "${key}" for language "${language}"; using English.`,
    );
  }
}

export function isSupportedLanguage(
  value: unknown,
): value is SupportedLanguage {
  return SUPPORTED_LANGUAGES.some((language) => language === value);
}

export function resolveSupportedLanguage(value: unknown): SupportedLanguage {
  return isSupportedLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export function translateMessage(
  language: SupportedLanguage,
  key: MessageKey,
  resources: InterfaceMessageResources = INTERFACE_MESSAGES,
  reportMissing: MissingMessageReporter = reportMissingMessage,
): string {
  const localizedMessage = resources[language][key];

  if (localizedMessage) {
    return localizedMessage;
  }

  reportMissing(language, key);

  return resources.en[key] ?? englishMessages[key];
}
