import type { AdultInvolvement, MissionCategory } from './catalog';

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
  'view.discovery.title': 'What kind of Mission?',
  'discovery.action.open': 'Find a Mission',
  'discovery.context.age': 'Age group',
  'discovery.categories.legend': 'Mission Category',
  'discovery.categories.help':
    'Choose one. You can change it at any time, and nothing is decided yet.',
  'discovery.category.movement': 'Movement',
  'discovery.category.creativity': 'Creativity',
  'discovery.category.helpingAtHome': 'Helping at Home',
  'discovery.category.learning': 'Learning',
  'discovery.category.calm': 'Calm',
  'discovery.selected': 'Selected',
  'discovery.suggestions.heading': 'Three Missions',
  'discovery.card.about': 'About',
  'discovery.card.minutes': 'min',
  'discovery.adult.nearby': 'Adult nearby',
  'discovery.adult.participation': 'Adult takes part',
  'discovery.card.safetyLabel': 'Before you start',
  'discovery.card.choose': 'Choose this Mission',
  'discovery.selection.conflict':
    'A Mission is already chosen. Go back to it, or leave it, before choosing another.',
  'discovery.selection.conflictNamed':
    'The Mission \u201c{mission}\u201d is already chosen. Go back to it, or leave it, before choosing another.',
  'discovery.selection.unconfirmed':
    'That Mission could not be confirmed just now. Nothing has started. Choose it again, or choose a different one.',
  'discovery.anotherSet': 'Another set',
  'discovery.anotherSet.bounded':
    "There aren't three more Missions in this category. Choose one of these three, or pick another category above.",
  'discovery.unavailable.title': 'No Missions right now',
  'discovery.unavailable.body':
    'MissionKid has no complete set of three Missions for this Mission Category right now. Nothing went wrong, and you can pick another Mission Category above.',
  'discovery.gate.body':
    'Missions cannot be suggested yet. A parent needs to finish the age step below first. MissionKid never guesses an age group.',
  'view.sessionOpening.title': 'Getting your Mission ready',
  'view.sessionReady.title': 'Your Mission is ready',
  'session.ready.notStarted': 'This Mission has not started yet.',
  'session.transition.notCarriedOut':
    "We couldn't get this Mission ready just now. It has not started. Try again.",
  'session.transition.unconfirmed':
    "MissionKid couldn't check whether this Mission is ready. It has not started. Try again.",
  'session.action.retry': 'Try again',
  'session.ready.missionBreak.lead': 'Time for a Mission.',
  'session.ready.missionBreak.body':
    'Start when you are ready, then leave the screen and do the Mission in real life. Come back when you are done.',
  'session.ready.missionUnavailable':
    'This Mission cannot be shown right now, so it is not ready to start.',
  'session.action.start': 'Start mission',
  'session.start.notStarted':
    "We couldn't start this Mission just now. It is still ready to start. Try again.",
  'session.start.unconfirmed':
    "MissionKid couldn't check whether this Mission started. Try again to see.",
  'view.sessionActive.title': 'Your Mission has started',
  'view.sessionUnavailable.title': 'This Mission cannot be shown',
  'session.active.away':
    'Do the Mission away from the screen, then come back when you are done.',
  'session.active.remaining': 'About {minutes} min left',
  'session.active.lessThanMinute': 'Less than a minute left',
  'session.active.zero': 'Ready when you are.',
  'session.active.timingUnavailable':
    'The time guide is not available right now. Your Mission is still on.',
  'session.active.missionUnavailable':
    'This Mission cannot be shown right now, so it cannot safely continue.',
  'session.active.safetyLabel': 'Keep this in mind',
  'session.action.backToSuggestions': 'Back to suggestions',
  'session.action.leave': 'Leave mission',
  'session.action.keepGoing': 'Keep going',
  'session.leave.title': 'Leave this mission?',
  'session.leave.consequence': "It won't be counted.",
  'session.exit.notLeft':
    "We couldn't leave this Mission just now. Try again.",
  'session.exit.unconfirmed':
    "MissionKid couldn't check whether this Mission was left. Try again to see.",
  'session.conflict.return': 'Back to your Mission',
  'session.action.done': 'Mission done',
  'session.done.notRecorded':
    "We couldn't record this Mission as done just now. Try again.",
  'session.done.unconfirmed':
    "MissionKid couldn't check whether this Mission was recorded as done. Try again to see.",
  'view.sessionResult.title': 'Mission complete',
  'result.recognition': 'You did it.',
  'result.completedOn': 'Completed',
  'result.missionUnavailable': 'This Mission cannot be shown right now',
  'result.goal.heading': 'Monthly goal',
  'result.goal.progress': '{done} / {target} missions',
  'result.goal.complete':
    'You reached the goal for {period}. If you and your parent agree, you could choose a small real-life reward together.',
  'result.action.next': 'Find another Mission',
  'result.unavailable':
    'This result cannot be shown right now. Your completed Mission is safe. Try again.',
  'result.exit.notCleared':
    "We couldn't leave this result just now. Your completed Mission is safe. Try again.",
  'result.exit.unconfirmed':
    "MissionKid couldn't check whether you left this result. Your completed Mission is safe. Try again to see.",
} as const;

export type MessageKey = keyof typeof englishMessages;

// Canonical values are the identity; these keys only resolve the visible label,
// and a localized label is never used as identity. They live here so every view
// that names a Mission Category or an adult-involvement requirement names it the
// same way.
export const MISSION_CATEGORY_LABEL_KEYS: Readonly<
  Record<MissionCategory, MessageKey>
> = {
  Movement: 'discovery.category.movement',
  Creativity: 'discovery.category.creativity',
  'Helping at Home': 'discovery.category.helpingAtHome',
  Learning: 'discovery.category.learning',
  Calm: 'discovery.category.calm',
};

// The two required levels stay distinguishable in words, in every language.
// "No special adult assistance required" resolves to no label: showing one would
// read as a promise that ordinary parental judgement can be skipped.
export const MISSION_ADULT_LABEL_KEYS: Readonly<
  Partial<Record<AdultInvolvement, MessageKey>>
> = {
  'Adult nearby required': 'discovery.adult.nearby',
  'Adult participation required': 'discovery.adult.participation',
};

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
    'view.discovery.title': 'Welche Art von Mission?',
    'discovery.action.open': 'Mission finden',
    'discovery.context.age': 'Altersgruppe',
    'discovery.categories.legend': 'Missionskategorie',
    'discovery.categories.help':
      'Wähle eine aus. Du kannst sie jederzeit ändern, und noch ist nichts entschieden.',
    'discovery.category.movement': 'Bewegung',
    'discovery.category.creativity': 'Kreativität',
    'discovery.category.helpingAtHome': 'Zu Hause helfen',
    'discovery.category.learning': 'Lernen',
    'discovery.category.calm': 'Ruhe',
    'discovery.selected': 'Ausgewählt',
    'discovery.suggestions.heading': 'Drei Missionen',
    'discovery.card.about': 'Etwa',
    'discovery.card.minutes': 'Min.',
    'discovery.adult.nearby': 'Erwachsene Person in der Nähe',
    'discovery.adult.participation': 'Erwachsene Person macht mit',
    'discovery.card.safetyLabel': 'Vor dem Start',
    'discovery.card.choose': 'Diese Mission wählen',
    'discovery.selection.conflict':
      'Es ist schon eine Mission gewählt. Geh zu ihr zurück oder verlasse sie, bevor du eine andere wählst.',
    'discovery.selection.conflictNamed':
      'Die Mission \u201e{mission}\u201c ist schon gewählt. Geh zu ihr zurück oder verlasse sie, bevor du eine andere wählst.',
    'discovery.selection.unconfirmed':
      'Diese Mission konnte gerade nicht bestätigt werden. Es wurde nichts gestartet. Wähle sie noch einmal oder wähle eine andere.',
    'discovery.anotherSet': 'Weitere drei',
    'discovery.anotherSet.bounded':
      'Hier gibt es keine drei weiteren Missionen. Wähle eine von diesen dreien oder oben eine andere Kategorie.',
    'discovery.unavailable.title': 'Gerade keine Missionen',
    'discovery.unavailable.body':
      'MissionKid hat für diese Missionskategorie gerade keinen vollständigen Satz aus drei Missionen. Es ist nichts schiefgegangen, und du kannst oben eine andere Missionskategorie wählen.',
    'discovery.gate.body':
      'Es können noch keine Missionen vorgeschlagen werden. Ein Erwachsener muss zuerst den Altersschritt unten abschließen. MissionKid errät niemals eine Altersgruppe.',
    'view.sessionOpening.title': 'Deine Mission wird vorbereitet',
    'view.sessionReady.title': 'Deine Mission ist bereit',
    'session.ready.notStarted': 'Diese Mission hat noch nicht begonnen.',
    'session.transition.notCarriedOut':
      'Diese Mission konnte gerade nicht vorbereitet werden. Sie hat nicht begonnen. Versuche es noch einmal.',
    'session.transition.unconfirmed':
      'MissionKid konnte nicht prüfen, ob diese Mission bereit ist. Sie hat nicht begonnen. Versuche es noch einmal.',
    'session.action.retry': 'Noch einmal versuchen',
    'session.ready.missionBreak.lead': 'Zeit für eine Mission.',
    'session.ready.missionBreak.body':
      'Starte, wenn du bereit bist, geh dann weg vom Bildschirm und mach die Mission in echt. Komm zurück, wenn du fertig bist.',
    'session.ready.missionUnavailable':
      'Diese Mission kann gerade nicht angezeigt werden und ist deshalb nicht startbereit.',
    'session.action.start': 'Mission starten',
    'session.start.notStarted':
      'Diese Mission konnte gerade nicht gestartet werden. Sie ist weiterhin startbereit. Versuche es noch einmal.',
    'session.start.unconfirmed':
      'MissionKid konnte nicht prüfen, ob diese Mission gestartet wurde. Versuche es noch einmal, um es zu sehen.',
    'view.sessionActive.title': 'Deine Mission läuft',
    'view.sessionUnavailable.title': 'Diese Mission kann nicht angezeigt werden',
    'session.active.away':
      'Mach die Mission weg vom Bildschirm und komm zurück, wenn du fertig bist.',
    'session.active.remaining': 'Noch etwa {minutes} Min.',
    'session.active.lessThanMinute': 'Weniger als eine Minute übrig',
    'session.active.zero': 'Nimm dir so viel Zeit, wie du brauchst.',
    'session.active.timingUnavailable':
      'Die Zeitangabe ist gerade nicht verfügbar. Deine Mission läuft weiter.',
    'session.active.missionUnavailable':
      'Diese Mission kann gerade nicht angezeigt werden und kann deshalb nicht sicher weitergehen.',
    'session.active.safetyLabel': 'Denk daran',
    'session.action.backToSuggestions': 'Zurück zu den Vorschlägen',
    'session.action.leave': 'Mission verlassen',
    'session.action.keepGoing': 'Weitermachen',
    'session.leave.title': 'Diese Mission verlassen?',
    'session.leave.consequence': 'Sie zählt dann nicht.',
    'session.exit.notLeft':
      'Diese Mission konnte gerade nicht verlassen werden. Versuche es noch einmal.',
    'session.exit.unconfirmed':
      'MissionKid konnte nicht prüfen, ob diese Mission verlassen wurde. Versuche es noch einmal, um es zu sehen.',
    'session.conflict.return': 'Zurück zu deiner Mission',
    'session.action.done': 'Mission erledigt',
    'session.done.notRecorded':
      'Diese Mission konnte gerade nicht als erledigt gespeichert werden. Versuche es noch einmal.',
    'session.done.unconfirmed':
      'MissionKid konnte nicht prüfen, ob diese Mission als erledigt gespeichert wurde. Versuche es noch einmal, um es zu sehen.',
    'view.sessionResult.title': 'Mission geschafft',
    'result.recognition': 'Du hast es geschafft.',
    'result.completedOn': 'Erledigt',
    'result.missionUnavailable': 'Diese Mission kann gerade nicht angezeigt werden',
    'result.goal.heading': 'Monatsziel',
    'result.goal.progress': '{done} / {target} Missionen',
    'result.goal.complete':
      'Du hast das Ziel für {period} erreicht. Wenn deine Eltern einverstanden sind, könnt ihr zusammen eine kleine Belohnung im echten Leben aussuchen.',
    'result.action.next': 'Neue Mission finden',
    'result.unavailable':
      'Dieses Ergebnis kann gerade nicht angezeigt werden. Deine erledigte Mission ist sicher gespeichert. Versuche es noch einmal.',
    'result.exit.notCleared':
      'Dieses Ergebnis konnte gerade nicht verlassen werden. Deine erledigte Mission ist sicher gespeichert. Versuche es noch einmal.',
    'result.exit.unconfirmed':
      'MissionKid konnte nicht prüfen, ob du dieses Ergebnis verlassen hast. Deine erledigte Mission ist sicher gespeichert. Versuche es noch einmal, um es zu sehen.',
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
    'view.discovery.title': 'Какая будет миссия?',
    'discovery.action.open': 'Найти миссию',
    'discovery.context.age': 'Возрастная группа',
    'discovery.categories.legend': 'Категория миссии',
    'discovery.categories.help':
      'Выбери одну. Её можно поменять в любой момент, и пока ничего не решено.',
    'discovery.category.movement': 'Движение',
    'discovery.category.creativity': 'Творчество',
    'discovery.category.helpingAtHome': 'Помощь по дому',
    'discovery.category.learning': 'Обучение',
    'discovery.category.calm': 'Спокойствие',
    'discovery.selected': 'Выбрано',
    'discovery.suggestions.heading': 'Три миссии',
    'discovery.card.about': 'Около',
    'discovery.card.minutes': 'мин',
    'discovery.adult.nearby': 'Взрослый рядом',
    'discovery.adult.participation': 'Взрослый участвует',
    'discovery.card.safetyLabel': 'Перед началом',
    'discovery.card.choose': 'Выбрать эту миссию',
    'discovery.selection.conflict':
      'Миссия уже выбрана. Вернись к ней или выйди из неё, прежде чем выбирать другую.',
    'discovery.selection.conflictNamed':
      'Миссия «{mission}» уже выбрана. Вернись к ней или выйди из неё, прежде чем выбирать другую.',
    'discovery.selection.unconfirmed':
      'Эту миссию сейчас не удалось подтвердить. Ничего не началось. Выбери её ещё раз или выбери другую.',
    'discovery.anotherSet': 'Ещё три',
    'discovery.anotherSet.bounded':
      'Здесь уже нет ещё трёх новых миссий. Выбери одну из этих трёх или другую категорию выше.',
    'discovery.unavailable.title': 'Сейчас миссий нет',
    'discovery.unavailable.body':
      'Для этой категории сейчас нет полного набора из трёх миссий. Ничего не сломалось — можно выбрать другую категорию выше.',
    'discovery.gate.body':
      'Пока миссии предложить нельзя. Сначала взрослому нужно завершить шаг с возрастом ниже. MissionKid никогда не угадывает возрастную группу.',
    'view.sessionOpening.title': 'Готовим твою миссию',
    'view.sessionReady.title': 'Твоя миссия готова',
    'session.ready.notStarted': 'Эта миссия ещё не началась.',
    'session.transition.notCarriedOut':
      'Сейчас не удалось подготовить эту миссию. Она не началась. Попробуй ещё раз.',
    'session.transition.unconfirmed':
      'MissionKid не смог проверить, готова ли эта миссия. Она не началась. Попробуй ещё раз.',
    'session.action.retry': 'Попробовать ещё раз',
    'session.ready.missionBreak.lead': 'Время для миссии.',
    'session.ready.missionBreak.body':
      'Начни, когда будет удобно, потом отойди от экрана и выполни миссию по-настоящему. Возвращайся, когда закончишь.',
    'session.ready.missionUnavailable':
      'Эту миссию сейчас нельзя показать, поэтому она не готова к старту.',
    'session.action.start': 'Начать миссию',
    'session.start.notStarted':
      'Сейчас не удалось начать эту миссию. Она по-прежнему готова к старту. Попробуй ещё раз.',
    'session.start.unconfirmed':
      'MissionKid не смог проверить, началась ли эта миссия. Попробуй ещё раз, чтобы увидеть.',
    'view.sessionActive.title': 'Твоя миссия началась',
    'view.sessionUnavailable.title': 'Эту миссию нельзя показать',
    'session.active.away':
      'Выполни миссию не у экрана и возвращайся, когда закончишь.',
    'session.active.remaining': 'Осталось около {minutes} мин',
    'session.active.lessThanMinute': 'Осталось меньше минуты',
    'session.active.zero': 'Не спеши — заканчивай, когда будет удобно.',
    'session.active.timingUnavailable':
      'Подсказка о времени сейчас недоступна. Твоя миссия продолжается.',
    'session.active.missionUnavailable':
      'Эту миссию сейчас нельзя показать, поэтому она не может безопасно продолжаться.',
    'session.active.safetyLabel': 'Помни об этом',
    'session.action.backToSuggestions': 'Назад к предложениям',
    'session.action.leave': 'Выйти из миссии',
    'session.action.keepGoing': 'Продолжить',
    'session.leave.title': 'Выйти из этой миссии?',
    'session.leave.consequence': 'Она не будет засчитана.',
    'session.exit.notLeft':
      'Сейчас не удалось выйти из этой миссии. Попробуй ещё раз.',
    'session.exit.unconfirmed':
      'MissionKid не смог проверить, удалось ли выйти из этой миссии. Попробуй ещё раз, чтобы увидеть.',
    'session.conflict.return': 'Назад к своей миссии',
    'session.action.done': 'Миссия выполнена',
    'session.done.notRecorded':
      'Сейчас не удалось записать эту миссию как выполненную. Попробуй ещё раз.',
    'session.done.unconfirmed':
      'MissionKid не смог проверить, записана ли эта миссия как выполненная. Попробуй ещё раз, чтобы увидеть.',
    'view.sessionResult.title': 'Миссия выполнена',
    'result.recognition': 'У тебя получилось.',
    'result.completedOn': 'Выполнено',
    'result.missionUnavailable': 'Эту миссию сейчас нельзя показать',
    'result.goal.heading': 'Цель месяца',
    'result.goal.progress': '{done} / {target} миссий',
    'result.goal.complete':
      'Цель за {period} выполнена. Если родители согласны, вы можете вместе выбрать небольшую награду в реальной жизни.',
    'result.action.next': 'Найти другую миссию',
    'result.unavailable':
      'Этот результат сейчас нельзя показать. Твоя выполненная миссия сохранена. Попробуй ещё раз.',
    'result.exit.notCleared':
      'Сейчас не удалось выйти из этого результата. Твоя выполненная миссия сохранена. Попробуй ещё раз.',
    'result.exit.unconfirmed':
      'MissionKid не смог проверить, удалось ли выйти из этого результата. Твоя выполненная миссия сохранена. Попробуй ещё раз, чтобы увидеть.',
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
