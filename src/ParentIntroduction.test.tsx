import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { App } from './App';
import { AGE_BANDS } from './ageBands';
import { MISSION_CATALOG } from './catalogContent';
import { deriveSuggestionSet } from './missionSuggestions';
import { isEligibleForContext } from './catalogValidation';
import {
  INTRODUCTION_EXAMPLE_MISSION_ID,
  ParentIntroduction,
  resolveIntroductionExample,
} from './ParentIntroduction';
import { AppStateProvider, FRESH_APP_STATE } from './appState';
import {
  SUPPORTED_LANGUAGES,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import {
  MISSIONKID_STORAGE_KEY,
  createEmptySnapshot,
  createPersistenceAdapter,
  type SnapshotStorage,
} from './persistence';

const PROFILE_ID = 'local-profile-1';
const SELECTED_AT = new Date(2024, 2, 15, 10, 0).getTime();

const EXAMPLE = MISSION_CATALOG.find(
  (record) => record.missionId === INTRODUCTION_EXAMPLE_MISSION_ID,
);

if (!EXAMPLE) {
  throw new Error(`expected ${INTRODUCTION_EXAMPLE_MISSION_ID} in the catalog`);
}

const OTHER_MISSION = MISSION_CATALOG.find(
  (record) => record.missionId === 'movement-02',
);

if (!OTHER_MISSION) {
  throw new Error('expected movement-02 in the catalog');
}

function t(language: SupportedLanguage, key: MessageKey): string {
  return translateMessage(language, key);
}

// A current Mission Session as durable state holds one, for the precedence
// cases. The Mission is a real catalog entry so nothing is excluded for
// unresolvable content.
function sessionFacts(state: 'selected' | 'ready' | 'active') {
  const facts = {
    sessionId: 'session-1',
    childProfileId: PROFILE_ID,
    missionId: OTHER_MISSION!.missionId,
    missionCategoryAtSelection: OTHER_MISSION!.category,
    ageBandAtSelection: '7–8',
    durationSecondsAtSelection: OTHER_MISSION!.durationSeconds,
    selectedAt: SELECTED_AT,
  } as const;

  return state === 'active'
    ? { ...facts, state, startedAt: SELECTED_AT + 60_000 }
    : { ...facts, state };
}

function completedRecord() {
  return {
    ...sessionFacts('active'),
    sessionId: 'done-1',
    state: 'completed',
    completedAt: SELECTED_AT + 300_000,
    completionPeriodId: '2024-03',
  };
}

function harness(raw?: string) {
  const values = new Map<string, string>([['unrelated', 'keep']]);
  if (raw !== undefined) values.set(MISSIONKID_STORAGE_KEY, raw);

  const faults = { read: false, write: false };
  const calls: string[] = [];

  const storage: SnapshotStorage = {
    getItem(key) {
      calls.push(`read:${key}`);
      if (faults.read) throw new Error('PRIVATE RAW STORAGE ERROR');
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      calls.push(`write:${key}`);
      if (faults.write) throw new Error('PRIVATE RAW STORAGE ERROR');
      values.set(key, value);
    },
    removeItem(key) {
      calls.push(`remove:${key}`);
      values.delete(key);
    },
  };

  return { values, faults, calls, adapter: createPersistenceAdapter(storage) };
}

function snapshot(extra: Record<string, unknown> = {}, language: SupportedLanguage = 'en') {
  return JSON.stringify({
    ...createEmptySnapshot(),
    settings: { language },
    childProfile: { localProfileId: PROFILE_ID, ageBand: '7–8' },
    ...extra,
  });
}

// A stored context that is valid but carries no valid age band: the incomplete
// setup condition, which the rows below combine with a session and a result.
function incompleteSnapshot(extra: Record<string, unknown> = {}) {
  return JSON.stringify({
    ...createEmptySnapshot(),
    childProfile: { localProfileId: PROFILE_ID, ageBand: null },
    ...extra,
  });
}

function currentView(): string | null {
  return document.querySelector('[data-view]')?.getAttribute('data-view') ?? null;
}

describe('F001 first-use introduction', () => {
  it('is shown, in the resolved language, when storage works and holds nothing', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    expect(currentView()).toBe('introduction');
    expect(
      screen.getByRole('heading', { level: 1, name: t('en', 'view.introduction.title') }),
    ).toBeTruthy();
    expect(screen.getByText(t('en', 'introduction.lead'))).toBeTruthy();

    // What the family will do, from Mission Category selection to marking a
    // Mission done, as a short account rather than a tutorial sequence.
    const flow = screen.getByRole('heading', {
      level: 2,
      name: t('en', 'introduction.flow.heading'),
    }).parentElement!;
    expect(within(flow).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      t('en', 'introduction.flow.step1'),
      t('en', 'introduction.flow.step2'),
      t('en', 'introduction.flow.step3'),
    ]);

    // That setup is brief, needs no account, and asks for no identifying data.
    expect(screen.getByText(t('en', 'introduction.setup.brief'))).toBeTruthy();
    expect(screen.getByText(t('en', 'setup.privacy'))).toBeTruthy();
    expect(screen.getByText(t('en', 'setup.parentResponsibility'))).toBeTruthy();
  });

  it('offers exactly one forward action, and it opens the unchanged setup form', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    // One dominant action and nothing competing with it: no second forward
    // action, no choose control on the example, and no destructive reset on a
    // view where nothing is stored to reset.
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((button) => button.textContent)).toEqual([
      t('en', 'introduction.action.setup'),
    ]);
    expect(buttons[0]!.className).toContain('button--primary');
    expect(screen.queryByRole('button', { name: t('en', 'discovery.card.choose') })).toBeNull();
    expect(screen.queryByRole('button', { name: t('en', 'recovery.resetTitle') })).toBeNull();

    fireEvent.click(buttons[0]!);

    expect(currentView()).toBe('setup-first-use');
    expect(
      screen.getByRole('heading', { level: 1, name: t('en', 'view.setupFirstUse.title') }),
    ).toBeTruthy();
    expect(screen.getByRole('group', { name: t('en', 'setup.age.legend') })).toBeTruthy();
    expect(
      (screen.getByRole('button', { name: t('en', 'setup.action.complete') }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    // No back control is added, and setup does not return to the introduction.
    expect(
      screen.queryByRole('button', { name: t('en', 'introduction.action.setup') }),
    ).toBeNull();
  });

  it('performs no durable write while it is displayed, and reads as every arrival does', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    // The hydration read is what decided the introduction is eligible at all,
    // so it is expected to have happened and is asserted rather than forbidden.
    expect(h.calls).toEqual([`read:${MISSIONKID_STORAGE_KEY}`]);

    fireEvent.click(screen.getByRole('radio', { name: t('en', 'setup.language.de') }));
    fireEvent.click(screen.getByRole('button', { name: t('de', 'introduction.action.setup') }));

    // Reaching, reading and leaving it wrote nothing: no snapshot, no language,
    // no acknowledgement that it was seen.
    expect(h.calls.some((call) => call.startsWith('write:'))).toBe(false);
    expect(h.calls.some((call) => call.startsWith('remove:'))).toBe(false);
    expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);
    expect(h.values.get('unrelated')).toBe('keep');
  });
});

describe('F001 introduction eligibility', () => {
  it.each([
    {
      row: 'no stored context',
      raw: undefined as string | undefined,
      view: 'introduction',
    },
    { row: 'valid setup, nothing in progress', raw: snapshot(), view: 'setup-complete-handoff' },
    { row: 'incomplete setup', raw: incompleteSnapshot(), view: 'setup-incomplete' },
    {
      // The start experience, which the stored `selected` session reaches as it
      // already does: the transition to `ready` resolves in place on arrival.
      row: 'current Mission Session selected',
      raw: snapshot({ currentSession: sessionFacts('selected') }),
      view: 'session-ready',
    },
    {
      row: 'current Mission Session ready',
      raw: snapshot({ currentSession: sessionFacts('ready') }),
      view: 'session-ready',
    },
    {
      row: 'current Mission Session active',
      raw: snapshot({ currentSession: sessionFacts('active') }),
      view: 'session-active',
    },
    {
      row: 'current completed-result pointer',
      raw: snapshot({
        completedSessions: [completedRecord()],
        currentResultSessionId: 'done-1',
      }),
      view: 'session-result',
    },
    { row: 'unreadable stored context', raw: '{bad', view: 'recovery' },
    {
      row: 'unreadable stored context by version',
      raw: JSON.stringify({ snapshotVersion: 99 }),
      view: 'recovery',
    },
  ])('sends $row to its own approved surface', ({ raw, view }) => {
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    expect(currentView()).toBe(view);
    if (view !== 'introduction') {
      expect(
        screen.queryByRole('heading', { name: t('en', 'view.introduction.title') }),
      ).toBeNull();
    }
  });

  it('sends unusable storage to temporary mode rather than to an introduction', () => {
    const h = harness();
    h.faults.read = true;
    render(<App adapter={h.adapter} />);

    expect(currentView()).toBe('temporary-mode');
    expect(screen.getByRole('alert').textContent).toBe(t('en', 'recovery.temporary'));
    expect(
      screen.queryByRole('heading', { name: t('en', 'view.introduction.title') }),
    ).toBeNull();
  });

  // The table names arrival cases; it is not a precedence algorithm. Where two
  // conditions coexist the precedence that already exists decides, and the
  // stored session, completed records and pointer are left untouched.
  it.each([
    { coexisting: 'a selected session', extra: { currentSession: sessionFacts('selected') } },
    { coexisting: 'a ready session', extra: { currentSession: sessionFacts('ready') } },
    { coexisting: 'an active session', extra: { currentSession: sessionFacts('active') } },
    {
      coexisting: 'a completed-result pointer',
      extra: { completedSessions: [completedRecord()], currentResultSessionId: 'done-1' },
    },
  ])('keeps the age-context gate ahead of $coexisting on an incomplete age context', ({ extra }) => {
    const raw = incompleteSnapshot(extra);
    const h = harness(raw);
    render(<App adapter={h.adapter} />);

    expect(currentView()).toBe('setup-incomplete');
    expect(screen.getByText(t('en', 'discovery.gate.body'))).toBeTruthy();
    expect(
      screen.queryByRole('heading', { name: t('en', 'view.introduction.title') }),
    ).toBeNull();
    // Nothing stored was cancelled, replaced or written to reach the gate.
    expect(h.values.get(MISSIONKID_STORAGE_KEY)).toBe(raw);
    expect(h.calls.some((call) => call.startsWith('write:'))).toBe(false);
  });

  it('does not return a parent who has continued to the setup choices', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('button', { name: t('en', 'introduction.action.setup') }));
    expect(currentView()).toBe('setup-first-use');

    // A language change on the setup form is still the setup form.
    fireEvent.click(screen.getByRole('radio', { name: t('en', 'setup.language.ru') }));
    expect(currentView()).toBe('setup-first-use');
  });
});

describe('F001 introduction example Mission', () => {
  it('uses a Mission the catalog approves for every supported age band', () => {
    expect(EXAMPLE!.ageBands).toEqual([...AGE_BANDS]);

    // Complete reviewed content in every language, under the one eligibility
    // rule discovery applies. This is what makes showing it infer no age.
    for (const language of SUPPORTED_LANGUAGES) {
      for (const ageBand of AGE_BANDS) {
        expect(
          isEligibleForContext(EXAMPLE!, {
            ageBand,
            category: EXAMPLE!.category,
            language,
          }),
        ).toBe(true);
      }
      expect(resolveIntroductionExample(MISSION_CATALOG, language)).toBe(EXAMPLE);
    }
  });

  it.each([...SUPPORTED_LANGUAGES])(
    'presents its reviewed content unchanged in %s, with the safety note verbatim',
    (language) => {
      const h = harness();
      render(<App adapter={h.adapter} />);

      if (language !== 'en') {
        fireEvent.click(
          screen.getByRole('radio', { name: t('en', `setup.language.${language}`) }),
        );
      }

      const content = EXAMPLE!.content[language];
      const card = screen.getByRole('article', { name: content.title });

      expect(within(card).getByRole('heading', { level: 3 }).textContent).toBe(content.title);
      expect(within(card).getByText(content.instruction)).toBeTruthy();
      expect(within(card).getByText(content.safetyNote!, { exact: false })).toBeTruthy();
      expect(card.textContent).toContain(content.safetyNote);
      expect(
        within(card).getByText(
          t(language, 'discovery.category.helpingAtHome'),
        ),
      ).toBeTruthy();
      expect(card.textContent).toContain(
        `${t(language, 'discovery.card.about')} 4 ${t(language, 'discovery.card.minutes')}`,
      );
      // Nothing is shortened, and nothing is hidden behind disclosure.
      expect(card.querySelector('details')).toBeNull();
    },
  );

  it('follows the localized adult-involvement rule instead of exposing the catalog level', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    // This Mission carries no localized adult-involvement note, so a Mission
    // card shows no adult-involvement line for it, and neither does the
    // example. The internal level is never rendered, and no claim that
    // supervision is unnecessary is invented in its place.
    expect(EXAMPLE!.adultInvolvement).toBe('No special adult assistance required');
    for (const language of SUPPORTED_LANGUAGES) {
      expect(EXAMPLE!.content[language].adultInvolvementNote).toBeUndefined();
    }

    const card = screen.getByRole('article', { name: EXAMPLE!.content.en.title });
    expect(card.querySelector('.mission-card__note--adult')).toBeNull();
    expect(card.textContent).not.toContain(EXAMPLE!.adultInvolvement);
    expect(card.textContent).not.toContain(t('en', 'discovery.adult.nearby'));
    expect(card.textContent).not.toContain(t('en', 'discovery.adult.participation'));
  });

  it('is an example rather than a suggestion: not selectable, and it starts nothing', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    const card = screen.getByRole('article', { name: EXAMPLE!.content.en.title });

    expect(
      screen.getByRole('heading', { level: 2, name: t('en', 'introduction.example.label') }),
    ).toBeTruthy();
    expect(within(card).queryByRole('button')).toBeNull();
    expect(within(card).queryByRole('radio')).toBeNull();
    expect(within(card).queryByRole('checkbox')).toBeNull();
    expect(within(card).queryByRole('link')).toBeNull();

    // Exactly one Mission is shown, so it cannot be read as one of the three
    // equally weighted suggestions F002 presents later.
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(
      screen.queryByRole('heading', { name: t('en', 'discovery.suggestions.heading') }),
    ).toBeNull();
    expect(h.calls.some((call) => call.startsWith('write:'))).toBe(false);
  });

  it('receives no preference in the first discovery set afterwards', () => {
    const h = harness();
    render(<App adapter={h.adapter} createProfileId={() => PROFILE_ID} />);

    // The example is on screen; the family then completes setup and opens the
    // very Mission Category it belongs to.
    expect(screen.getByRole('article', { name: EXAMPLE!.content.en.title })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: t('en', 'introduction.action.setup') }));
    fireEvent.click(screen.getByRole('radio', { name: '7–8' }));
    fireEvent.click(screen.getByRole('button', { name: t('en', 'setup.action.complete') }));
    fireEvent.click(screen.getByRole('button', { name: t('en', 'discovery.action.open') }));
    fireEvent.click(
      screen.getByRole('radio', { name: t('en', 'discovery.category.helpingAtHome') }),
    );

    // The deterministic first set for that context, as a run that never saw the
    // introduction would derive it: same Missions, same order.
    const derived = deriveSuggestionSet(MISSION_CATALOG, {
      ageBand: '7–8',
      category: 'Helping at Home',
      language: 'en',
    });
    if (derived.status !== 'complete') throw new Error('expected a complete set');

    expect(
      screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent),
    ).toEqual(derived.missions.map((mission) => mission.content.en.title));
  });

  it('resolves no example rather than relaxing the rule that produced it', () => {
    // No longer approved for every supported band, so showing it could infer an
    // age context. The approval is not broadened to keep the example.
    const narrowed = MISSION_CATALOG.map((record) =>
      record.missionId === INTRODUCTION_EXAMPLE_MISSION_ID
        ? { ...record, ageBands: ['7–8'] }
        : record,
    );
    for (const language of SUPPORTED_LANGUAGES) {
      expect(resolveIntroductionExample(narrowed, language)).toBeNull();
    }

    // Its reviewed localized content is no longer complete. A record missing
    // required content fails validation before any language question arises,
    // so it is excluded outright rather than shown with a missing safety note.
    const incomplete = MISSION_CATALOG.map((record) =>
      record.missionId === INTRODUCTION_EXAMPLE_MISSION_ID
        ? { ...record, content: { ...record.content, ru: { ...record.content.ru, safetyNote: '' } } }
        : record,
    );
    for (const language of SUPPORTED_LANGUAGES) {
      expect(resolveIntroductionExample(incomplete, language)).toBeNull();
    }

    // And when the designated Mission is absent altogether. No other Mission is
    // substituted for it in any of these cases.
    expect(
      resolveIntroductionExample(
        MISSION_CATALOG.filter(
          (record) => record.missionId !== INTRODUCTION_EXAMPLE_MISSION_ID,
        ),
        'en',
      ),
    ).toBeNull();
  });

  it('keeps the rest of the introduction valid when it shows no example', () => {
    render(
      <AppStateProvider initialState={FRESH_APP_STATE}>
        <ParentIntroduction
          catalog={MISSION_CATALOG.filter(
            (record) => record.missionId !== INTRODUCTION_EXAMPLE_MISSION_ID,
          )}
        />
      </AppStateProvider>,
    );

    expect(screen.queryByRole('article')).toBeNull();
    expect(
      screen.queryByRole('heading', { name: t('en', 'introduction.example.label') }),
    ).toBeNull();
    // Everything else the view must carry is still there, including its one
    // forward action into setup.
    expect(screen.getByText(t('en', 'introduction.lead'))).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: t('en', 'introduction.flow.heading') }),
    ).toBeTruthy();
    expect(screen.getByText(t('en', 'setup.privacy'))).toBeTruthy();
    expect(
      screen.getByRole('button', { name: t('en', 'introduction.action.setup') }),
    ).toBeTruthy();
    expect(screen.getByRole('group', { name: t('en', 'setup.language.legend') })).toBeTruthy();
  });
});

describe('F001 language on the introduction', () => {
  it.each([...SUPPORTED_LANGUAGES])('renders the whole view in %s', (language) => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('radio', { name: t('en', `setup.language.${language}`) }));

    expect(document.documentElement.lang).toBe(language);
    expect(
      screen.getByRole('heading', { level: 1, name: t(language, 'view.introduction.title') }),
    ).toBeTruthy();
    expect(screen.getByText(t(language, 'introduction.lead'))).toBeTruthy();
    expect(
      screen.getByRole('heading', { level: 2, name: t(language, 'introduction.example.label') }),
    ).toBeTruthy();
    expect(
      screen.getByRole('heading', { level: 2, name: t(language, 'introduction.flow.heading') }),
    ).toBeTruthy();
    expect(
      screen.getByRole('button', { name: t(language, 'introduction.action.setup') }),
    ).toBeTruthy();
    // The example's reviewed content follows the same choice.
    expect(
      screen.getByRole('article', { name: EXAMPLE!.content[language].title }),
    ).toBeTruthy();
  });

  it('offers exactly the three supported languages, with English selected', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    const group = screen.getByRole('group', { name: t('en', 'setup.language.legend') });
    const choices = within(group).getAllByRole('radio') as HTMLInputElement[];

    expect(choices.map((choice) => choice.value)).toEqual([...SUPPORTED_LANGUAGES]);
    expect(choices.filter((choice) => choice.checked).map((choice) => choice.value)).toEqual(['en']);
    // The only group on this view: the example carries no choice of its own.
    expect(screen.getAllByRole('group')).toHaveLength(1);
  });

  it('carries the choice into setup within the visit rather than asking again', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('radio', { name: t('en', 'setup.language.ru') }));
    fireEvent.click(screen.getByRole('button', { name: t('ru', 'introduction.action.setup') }));

    const group = screen.getByRole('group', { name: t('ru', 'setup.language.legend') });
    const checked = (within(group).getAllByRole('radio') as HTMLInputElement[]).filter(
      (choice) => choice.checked,
    );

    expect(checked.map((choice) => choice.value)).toEqual(['ru']);
    expect(document.documentElement.lang).toBe('ru');
    expect(h.calls.some((call) => call.startsWith('write:'))).toBe(false);
  });

  it('becomes durable only through the confirmed setup save', () => {
    const h = harness();
    const persist = vi.spyOn(h.adapter, 'persist');
    render(<App adapter={h.adapter} createProfileId={() => PROFILE_ID} />);

    fireEvent.click(screen.getByRole('radio', { name: t('en', 'setup.language.de') }));
    expect(persist).not.toHaveBeenCalled();
    expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: t('de', 'introduction.action.setup') }));
    fireEvent.click(screen.getByRole('radio', { name: '4–6' }));
    expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);

    fireEvent.click(screen.getByRole('button', { name: t('de', 'setup.action.complete') }));

    expect(JSON.parse(h.values.get(MISSIONKID_STORAGE_KEY)!)).toEqual({
      ...createEmptySnapshot(),
      settings: { language: 'de' },
      childProfile: { localProfileId: PROFILE_ID, ageBand: '4–6' },
    });
  });

  it('resolves to English again when the visit ends before setup is confirmed', () => {
    const h = harness();
    const first = render(<App adapter={h.adapter} />);

    fireEvent.click(screen.getByRole('radio', { name: t('en', 'setup.language.ru') }));
    expect(document.documentElement.lang).toBe('ru');
    first.unmount();

    // Nothing was stored, so the next first use is the default rather than a
    // lost setting.
    expect(h.values.has(MISSIONKID_STORAGE_KEY)).toBe(false);
    render(<App adapter={h.adapter} />);
    expect(document.documentElement.lang).toBe('en');
    expect(
      screen.getByRole('heading', { level: 1, name: t('en', 'view.introduction.title') }),
    ).toBeTruthy();
  });

  it('keeps focus on the language choice the parent is using', () => {
    const h = harness();
    render(<App adapter={h.adapter} />);

    const german = screen.getByRole('radio', { name: t('en', 'setup.language.de') });
    german.focus();
    fireEvent.click(german);

    expect(document.activeElement).toBe(german);
  });
});

describe('F001 introduction presentation boundaries', () => {
  it('reads in the required order and nests its headings under the view heading', () => {
    const h = harness();
    const { container } = render(<App adapter={h.adapter} />);

    const headings = screen.getAllByRole('heading');
    expect(headings.map((heading) => [heading.tagName, heading.textContent])).toEqual([
      ['H1', t('en', 'view.introduction.title')],
      ['H2', t('en', 'introduction.example.label')],
      ['H3', EXAMPLE!.content.en.title],
      ['H2', t('en', 'introduction.flow.heading')],
    ]);

    // What MissionKid is for, the example, the short flow, then the one action.
    const order = [...container.querySelectorAll(
      '.introduction__lead, .introduction__example, .introduction__flow, .button--primary',
    )].map((element) => element.className.split(' ')[0]);
    expect(order).toEqual([
      'introduction__lead',
      'introduction__example',
      'introduction__flow',
      'button',
    ]);

    // Nothing overrides the tab order with a positive index.
    expect(container.querySelectorAll('[tabindex]:not([tabindex="-1"])')).toHaveLength(0);
  });

  it('asks for no identifying data and shows no account, rating or persuasion pattern', () => {
    const h = harness();
    const { container } = render(<App adapter={h.adapter} />);

    for (const type of ['text', 'date', 'email', 'password', 'file', 'tel', 'number']) {
      expect(container.querySelector(`input[type="${type}"]`)).toBeNull();
    }
    expect(container.querySelector('input:not([type="radio"])')).toBeNull();
    expect(container.querySelector('form')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });
});
