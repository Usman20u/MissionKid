export const SUPPORTED_LANGUAGES = ['en', 'de', 'ru'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

const englishMessages = {
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
} as const;

export type MessageKey = keyof typeof englishMessages;

type CompleteInterfaceMessages = Readonly<
  Record<SupportedLanguage, Readonly<Record<MessageKey, string>>>
>;

export const INTERFACE_MESSAGES: CompleteInterfaceMessages = {
  en: englishMessages,
  de: {
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
  },
  ru: {
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
