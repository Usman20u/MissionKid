import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AGE_BANDS } from './ageBands';
import { MISSION_CATEGORIES, type MissionCategory, type MissionRecord } from './catalog';
import { MISSION_CATALOG } from './catalogContent';
import {
  SUPPORTED_LANGUAGES,
  translateMessage,
  type MessageKey,
  type SupportedLanguage,
} from './localization';
import { MissionSuggestionSet } from './MissionSuggestionSet';
import { deriveSuggestionSet, type SuggestionContext } from './missionSuggestions';

// The visible Mission Category words, resolved the way the card resolves them.
const CATEGORY_LABEL_KEYS: Readonly<Record<MissionCategory, MessageKey>> = {
  Movement: 'discovery.category.movement',
  Creativity: 'discovery.category.creativity',
  'Helping at Home': 'discovery.category.helpingAtHome',
  Learning: 'discovery.category.learning',
  Calm: 'discovery.category.calm',
};

const context = (overrides: Partial<SuggestionContext> = {}): SuggestionContext => ({
  ageBand: '7–8',
  category: 'Movement',
  language: 'en',
  ...overrides,
});

function expectedMissions(ctx: SuggestionContext): readonly MissionRecord[] {
  const result = deriveSuggestionSet(MISSION_CATALOG, ctx);
  if (result.status !== 'complete') throw new Error('expected a complete production set');
  return result.missions;
}

function cards() {
  return screen.getAllByRole('article');
}

function localized(language: SupportedLanguage) {
  return { title: `Title (${language})`, instruction: `Instruction (${language})` };
}

function fixture(missionId: string, overrides: Partial<MissionRecord> = {}): MissionRecord {
  return {
    missionId,
    category: 'Movement',
    ageBands: ['7–8'],
    durationSeconds: 180,
    content: { en: localized('en'), de: localized('de'), ru: localized('ru') },
    adultInvolvement: 'No special adult assistance required',
    safetyNoteRequired: false,
    catalogOrder: 0,
    contentVersion: 'test-version-1',
    reviewed: true,
    discoveryEligible: true,
    ...overrides,
  };
}

describe('a complete suggestion set', () => {
  it.each(MISSION_CATEGORIES)('renders exactly three cards for %s', (category) => {
    render(<MissionSuggestionSet context={context({ category })} />);

    expect(cards()).toHaveLength(3);
  });

  it('presents exactly three distinct Missions in every approved context', () => {
    for (const ageBand of AGE_BANDS) {
      for (const category of MISSION_CATEGORIES) {
        for (const language of SUPPORTED_LANGUAGES) {
          const { unmount } = render(
            <MissionSuggestionSet context={context({ ageBand, category, language })} />,
          );

          const rendered = cards();
          const titles = rendered.map(
            (card) => within(card).getByRole('heading', { level: 3 }).textContent,
          );

          expect(rendered).toHaveLength(3);
          expect(new Set(titles).size).toBe(3);
          unmount();
        }
      }
    }
  });

  it.each(SUPPORTED_LANGUAGES)('renders the approved catalog content in %s', (language) => {
    const ctx = context({ language });
    render(<MissionSuggestionSet context={ctx} />);

    const rendered = cards();
    expect(rendered).toHaveLength(3);

    expectedMissions(ctx).forEach((mission, index) => {
      const card = rendered[index]!;
      const content = mission.content[language];

      expect(within(card).getByRole('heading', { level: 3 }).textContent).toBe(content.title);
      expect(within(card).getByText(content.instruction)).toBeTruthy();
      // Mission Category and expected duration accompany every card. The
      // Category is read as the localized words the family sees, not as the
      // styling attribute beside them.
      expect(card.textContent).toContain(String(mission.durationSeconds / 60));
      expect(
        within(card).getByText(translateMessage(language, CATEGORY_LABEL_KEYS[mission.category])),
      ).toBeTruthy();
      expect(card.getAttribute('data-category')).toBe(mission.category);

      // Required safety and adult-involvement wording appears in the same
      // language, before anything could be chosen.
      if (mission.safetyNoteRequired) {
        expect(within(card).getByText(content.safetyNote!)).toBeTruthy();
      }
      if (mission.adultInvolvement !== 'No special adult assistance required') {
        expect(within(card).getByText(content.adultInvolvementNote!)).toBeTruthy();
      }
    });
  });

  it('shows the required adult-involvement wording, distinguishable in words', () => {
    // helping-03 requires participation; helping-08 requires an adult nearby.
    render(<MissionSuggestionSet context={context({ category: 'Helping at Home' })} />);

    const participation = MISSION_CATALOG.find((m) => m.missionId === 'helping-03')!;
    const card = screen.getByRole('heading', { name: participation.content.en.title }).closest('article')!;

    expect(within(card).getByText('Adult takes part')).toBeTruthy();
    expect(within(card).getByText(participation.content.en.adultInvolvementNote!)).toBeTruthy();
  });

  it('distinguishes adult-nearby from adult-participation wording', () => {
    render(
      <MissionSuggestionSet
        context={context()}
        catalog={[
          fixture('m-1', {
            adultInvolvement: 'Adult nearby required',
            content: {
              en: { ...localized('en'), adultInvolvementNote: 'An adult stays nearby.' },
              de: { ...localized('de'), adultInvolvementNote: 'DE nearby.' },
              ru: { ...localized('ru'), adultInvolvementNote: 'RU nearby.' },
            },
          }),
          fixture('m-2', {
            catalogOrder: 1,
            adultInvolvement: 'Adult participation required',
            content: {
              en: { ...localized('en'), adultInvolvementNote: 'An adult takes part.' },
              de: { ...localized('de'), adultInvolvementNote: 'DE part.' },
              ru: { ...localized('ru'), adultInvolvementNote: 'RU part.' },
            },
          }),
          fixture('m-3', { catalogOrder: 2 }),
        ]}
      />,
    );

    expect(screen.getByText('Adult nearby')).toBeTruthy();
    expect(screen.getByText('Adult takes part')).toBeTruthy();
    // The level with no requirement states nothing, rather than reassuring.
    expect(screen.queryByText(/No special adult assistance/i)).toBeNull();
  });

  it('shows required safety guidance before any choice could be made', () => {
    const ctx = context({ category: 'Movement' });
    render(<MissionSuggestionSet context={ctx} />);

    const withSafety = expectedMissions(ctx).filter((m) => m.safetyNoteRequired);
    expect(withSafety.length).toBeGreaterThan(0);

    for (const mission of withSafety) {
      const card = screen
        .getByRole('heading', { name: mission.content.en.title })
        .closest('article')!;
      expect(within(card).getByText('Before you start')).toBeTruthy();
      expect(within(card).getByText(mission.content.en.safetyNote!)).toBeTruthy();
    }
  });

  it('keeps the three cards structural peers', () => {
    render(<MissionSuggestionSet context={context()} />);

    const rendered = cards();

    expect(new Set(rendered.map((card) => card.className))).toEqual(new Set(['mission-card']));
    for (const card of rendered) {
      expect(within(card).getByRole('heading', { level: 3 })).toBeTruthy();
      expect(card.querySelector('.mission-card__instruction')).toBeTruthy();
      expect(card.querySelector('.mission-card__meta')).toBeTruthy();
    }
    expect(screen.queryByText(/recommended|best|popular|trending|top pick|#1/i)).toBeNull();
  });

  it('gives each card a distinct scene while sharing the category atmosphere', () => {
    render(<MissionSuggestionSet context={context()} />);

    const rendered = cards();
    const scenes = rendered.map((card) =>
      [...card.querySelectorAll('.s-el')]
        .map((el) => (el.getAttribute('class') ?? '').replace('s-el s-el--', ''))
        .join('+'),
    );

    // Each card draws a different composition, not one plane with a swap.
    expect(scenes).toHaveLength(3);
    expect(new Set(scenes).size).toBe(3);
    expect(
      new Set(
        scenes.map((scene) =>
          scene.split('+').filter((element) => element !== 'ground').join('+'),
        ),
      ).size,
    ).toBe(3);
    // Every scene is decorative and carries the shared category atmosphere.
    for (const card of rendered) {
      expect(card.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true');
    }
    expect(new Set(rendered.map((card) => card.getAttribute('data-category')))).toEqual(
      new Set(['Movement']),
    );
  });

  it('announces the state with strings the interface already shows', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const { container, unmount } = render(
        <MissionSuggestionSet context={context({ language })} />,
      );

      const status = container.querySelector('[role="status"]')!;
      expect(status.getAttribute('aria-live')).toBe('polite');
      expect(status.getAttribute('aria-atomic')).toBe('true');

      // Composed only from approved keys: no wording exists for screen readers
      // that is not already on screen somewhere.
      const label = translateMessage(language, 'discovery.category.movement');
      const heading = translateMessage(language, 'discovery.suggestions.heading');
      expect(status.textContent).toContain(label);
      expect(status.textContent).toContain(heading);

      // Announcing the Missions themselves would be repetitive interruption.
      expect(status.querySelectorAll('article')).toHaveLength(0);
      unmount();
    }
  });

  it('changes the announcement when the Mission Category changes', () => {
    // The visible heading reads the same for all five Mission Categories, so a
    // region carrying only that heading would announce nothing on this change.
    const { container, rerender } = render(<MissionSuggestionSet context={context()} />);
    const read = () => container.querySelector('[role="status"]')!.textContent;

    const movement = read();
    rerender(<MissionSuggestionSet context={context({ category: 'Calm' })} />);
    const calm = read();

    expect(movement).not.toBe(calm);
    expect(movement).toContain(translateMessage('en', 'discovery.category.movement'));
    expect(calm).toContain(translateMessage('en', 'discovery.category.calm'));
    // The region itself survives the change, so the text change is what is read.
    expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
  });

  it('announces the unavailable state with its own approved title', () => {
    const { container } = render(
      <MissionSuggestionSet catalog={[fixture('movement-01')]} context={context()} />,
    );

    const status = container.querySelector('[role="status"]')!;
    expect(status.textContent).toContain(translateMessage('en', 'discovery.unavailable.title'));
    expect(status.textContent).not.toContain(
      translateMessage('en', 'discovery.suggestions.heading'),
    );
  });

  it.each(MISSION_CATEGORIES)('carries the %s atmosphere on the set itself', (category) => {
    const { container } = render(
      <MissionSuggestionSet context={context({ category })} onChoose={() => {}} selectionIssue="conflict" />,
    );

    // The bounded and recovery notices are tinted from the category hue, and
    // that hue is only defined on elements carrying `data-category`. Without it
    // here those surfaces resolve nothing and the notice loses the treatment
    // that separates it from ordinary copy.
    const set = container.querySelector('.mission-suggestions');
    expect(set!.getAttribute('data-category')).toBe(category);
  });

  it('keeps the visible heading a heading and the section label', () => {
    const { container } = render(<MissionSuggestionSet context={context()} />);

    const heading = screen.getByRole('heading', { level: 2 });
    const section = container.querySelector('.mission-suggestions')!;

    // The announcement is additive: it never takes the heading's role or id.
    expect(heading.className).toBe('mission-suggestions__title');
    expect(heading.getAttribute('role')).toBeNull();
    expect(section.getAttribute('aria-labelledby')).toBe(heading.id);
    expect(heading.closest('[role="status"]')).toBeNull();
  });

  it('emphasises exactly one subject in each scene', () => {
    render(<MissionSuggestionSet context={context()} />);

    for (const card of cards()) {
      const focal = card.querySelectorAll('.s-el[data-focal]');
      expect(focal).toHaveLength(1);

      // Emphasis is depth, not a verdict: nothing labels a card as a better
      // choice, and the scene stays out of the accessibility tree entirely.
      const svg = card.querySelector('svg')!;
      expect(svg.getAttribute('aria-hidden')).toBe('true');
      expect(focal[0]!.getAttribute('class')).toMatch(/^s-el s-el--/);
    }
  });

  it('labels the bounded progression control in every language', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const { unmount } = render(
        <MissionSuggestionSet
          context={context({ language })}
          onAnotherSet={() => {}}
        />,
      );

      const control = screen.getByRole('button');
      expect(control.textContent).toBe(translateMessage(language, 'discovery.anotherSet'));
      // A bounded, deliberate action: one control, no feed, no autoplay.
      expect(screen.getAllByRole('button')).toHaveLength(1);
      unmount();
    }
  });

  it('hands the current three back when another set is requested', () => {
    const requested: (readonly string[])[] = [];
    render(
      <MissionSuggestionSet
        context={context()}
        onAnotherSet={(missionIds) => requested.push(missionIds)}
      />,
    );

    fireEvent.click(screen.getByRole('button'));

    // The retired group is exactly the three that were on screen.
    expect(requested).toHaveLength(1);
    expect(requested[0]).toEqual(expectedMissions(context()).map((m) => m.missionId));
  });

  it('replaces the control with the bounded state in every language', () => {
    // Movement for 7–8 holds seven eligible Missions: one replacement, then the
    // bounded end with one Mission left over that is never shown alone.
    const shown = expectedMissions(context()).map((m) => m.missionId);
    const second = deriveSuggestionSet(MISSION_CATALOG, context(), shown);
    if (second.status !== 'complete') throw new Error('expected a second set');
    const exhausted = [...shown, ...second.missions.map((m) => m.missionId)];

    for (const language of SUPPORTED_LANGUAGES) {
      const { unmount } = render(
        <MissionSuggestionSet
          context={context({ language })}
          onAnotherSet={() => {}}
          shown={shown}
        />,
      );

      expect(screen.queryByRole('button')).toBeNull();
      expect(
        screen.getByText(translateMessage(language, 'discovery.anotherSet.bounded')),
      ).toBeTruthy();
      // Bounded, not failed: no alert, and the three stay on screen.
      expect(screen.queryByRole('alert')).toBeNull();
      expect(screen.getAllByRole('article')).toHaveLength(3);
      unmount();
    }

    expect(deriveSuggestionSet(MISSION_CATALOG, context(), exhausted).status)
      .toBe('insufficient-content');
  });

  it('moves focus to the heading after a replacement, not before one', () => {
    const { rerender } = render(
      <MissionSuggestionSet context={context()} onAnotherSet={() => {}} />,
    );
    const heading = screen.getByRole('heading', { level: 2 });

    // Nothing has been replaced yet, so focus has not been taken from anyone.
    expect(document.activeElement).not.toBe(heading);

    const shown = expectedMissions(context()).map((m) => m.missionId);
    rerender(
      <MissionSuggestionSet context={context()} onAnotherSet={() => {}} shown={shown} />,
    );

    // The heading names the state that just changed and sits above the new set.
    expect(document.activeElement).toBe(screen.getByRole('heading', { level: 2 }));
    expect(screen.getByRole('heading', { level: 2 }).getAttribute('tabindex')).toBe('-1');
  });

  it('offers no progression control when no cycle owns the set', () => {
    render(<MissionSuggestionSet context={context()} />);

    // Without an owning cycle there is nothing to advance, so no control and no
    // bounded message claiming the catalog ran out.
    expect(screen.queryByRole('button')).toBeNull();
    expect(
      screen.queryByText(translateMessage('en', 'discovery.anotherSet.bounded')),
    ).toBeNull();
  });

  it('gives every Mission its own choose control in every language', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const chosen: string[] = [];
      const { unmount } = render(
        <MissionSuggestionSet
          context={context({ language })}
          onChoose={(missionId) => chosen.push(missionId)}
        />,
      );

      const label = translateMessage(language, 'discovery.card.choose');
      const controls = screen.getAllByRole('button', { name: label });
      expect(controls).toHaveLength(3);

      // Each control names its own Mission, so the three stay comparable peers
      // and no card becomes one large button.
      const expected = expectedMissions(context({ language })).map((m) => m.missionId);
      for (const [index, control] of controls.entries()) {
        expect(control.closest('article')!.tagName).toBe('ARTICLE');
        fireEvent.click(control);
        expect(chosen.at(-1)).toBe(expected[index]);
      }
      unmount();
    }
  });

  it('describes each choose control by the Mission it belongs to', () => {
    render(<MissionSuggestionSet context={context()} onChoose={() => {}} />);

    for (const card of cards()) {
      const control = within(card).getByRole('button');
      const title = within(card).getByRole('heading', { level: 3 });
      // The accessible name is the same on all three, so the description is
      // what tells a screen-reader user which Mission this one chooses.
      expect(control.getAttribute('aria-describedby')).toBe(title.id);
    }
  });

  it('offers no choose control when nothing can own a selection', () => {
    render(<MissionSuggestionSet context={context()} />);

    expect(screen.queryByRole('button')).toBeNull();
  });

  it('explains a conflict politely and keeps the three Missions choosable', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const { container, unmount } = render(
        <MissionSuggestionSet
          context={context({ language })}
          onChoose={() => {}}
          selectionIssue="conflict"
        />,
      );

      const message = screen.getByText(
        translateMessage(language, 'discovery.selection.conflict'),
      );
      // A Mission already chosen is a product state, not a failure, so it is
      // announced politely rather than interrupting.
      expect(message.getAttribute('role')).toBe('status');
      expect(container.querySelector('[role="alert"]')).toBeNull();
      expect(screen.getAllByRole('article')).toHaveLength(3);
      expect(
        screen.getAllByRole('button', {
          name: translateMessage(language, 'discovery.card.choose'),
        }),
      ).toHaveLength(3);
      unmount();
    }
  });

  it('names the already-chosen Mission in a conflict, in every language', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const { container, unmount } = render(
        <MissionSuggestionSet
          chosenMissionTitle={`Chosen (${language})`}
          context={context({ language })}
          onChoose={() => {}}
          selectionIssue="conflict"
        />,
      );

      const notice = container.querySelector('.mission-suggestions__issue')!;
      // Without the name, "choose that same Mission again" asks for something
      // the family cannot identify: the chosen Mission is often not one of the
      // three in front of them.
      expect(notice.textContent).toContain(`Chosen (${language})`);
      expect(notice.textContent).not.toContain('{mission}');
      expect(notice.getAttribute('role')).toBe('status');
      unmount();
    }
  });

  it('names nothing rather than guessing when the chosen Mission cannot be resolved', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const { container, unmount } = render(
        <MissionSuggestionSet
          chosenMissionTitle={null}
          context={context({ language })}
          onChoose={() => {}}
          selectionIssue="conflict"
        />,
      );

      const notice = container.querySelector('.mission-suggestions__issue')!;
      expect(notice.textContent).toBe(
        translateMessage(language, 'discovery.selection.conflict'),
      );
      expect(notice.textContent).not.toContain('{mission}');
      unmount();
    }
  });

  it('leaves an unconfirmed selection unnamed, because the Mission is on screen', () => {
    const { container } = render(
      <MissionSuggestionSet
        chosenMissionTitle="Chosen (en)"
        context={context()}
        onChoose={() => {}}
        selectionIssue="unconfirmed"
      />,
    );

    // The family just pressed that Mission, so it is already identifiable and
    // repeating its name would add nothing.
    expect(container.querySelector('.mission-suggestions__issue')!.textContent).toBe(
      translateMessage('en', 'discovery.selection.unconfirmed'),
    );
  });

  it('reports an unconfirmed selection as a failure without losing the set', () => {
    for (const language of SUPPORTED_LANGUAGES) {
      const { unmount } = render(
        <MissionSuggestionSet
          context={context({ language })}
          onChoose={() => {}}
          selectionIssue="unconfirmed"
        />,
      );

      const message = screen.getByRole('alert');
      expect(message.textContent).toBe(
        translateMessage(language, 'discovery.selection.unconfirmed'),
      );
      // Choosing again is the retry, so all three stay present and usable.
      expect(screen.getAllByRole('article')).toHaveLength(3);
      expect(
        screen.getAllByRole('button', {
          name: translateMessage(language, 'discovery.card.choose'),
        }),
      ).toHaveLength(3);
      unmount();
    }
  });

  it('keeps every recovery message free of technical detail', () => {
    for (const issue of ['conflict', 'unconfirmed'] as const) {
      for (const language of SUPPORTED_LANGUAGES) {
        const { container, unmount } = render(
          <MissionSuggestionSet
            context={context({ language })}
            onChoose={() => {}}
            selectionIssue={issue}
          />,
        );

        const text = container.querySelector('.mission-suggestions__issue')!.textContent!;
        // Nothing names a session, a storage key, an exception or a state
        // machine, and nothing blames the child.
        for (const forbidden of [
          'session', 'Session', 'sessionId', 'localStorage', 'missionkid:', 'snapshot',
          'Error', 'undefined', 'null', 'JSON', 'read-back', 'selected',
        ]) {
          expect(text).not.toContain(forbidden);
        }
        unmount();
      }
    }
  });

  it('makes a repeated failure a new message rather than a silent one', () => {
    const { container, rerender } = render(
      <MissionSuggestionSet
        context={context()}
        onChoose={() => {}}
        selectionAttempt={1}
        selectionIssue="unconfirmed"
      />,
    );

    const first = container.querySelector('.mission-suggestions__issue');

    // The wording is identical on a second failure, so only a replaced node
    // reaches a live region. Reusing it would leave the retry this message
    // asks for unanswered for anyone who cannot see the screen.
    rerender(
      <MissionSuggestionSet
        context={context()}
        onChoose={() => {}}
        selectionAttempt={2}
        selectionIssue="unconfirmed"
      />,
    );

    const second = container.querySelector('.mission-suggestions__issue');
    expect(second).not.toBe(first);
    expect(second!.textContent).toBe(
      translateMessage('en', 'discovery.selection.unconfirmed'),
    );
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('keeps one message standing while the same attempt is re-rendered', () => {
    const { container, rerender } = render(
      <MissionSuggestionSet
        context={context()}
        onChoose={() => {}}
        selectionAttempt={1}
        selectionIssue="conflict"
      />,
    );

    const first = container.querySelector('.mission-suggestions__issue');

    // An unrelated re-render is not a new outcome, so it must not repeat the
    // announcement.
    rerender(
      <MissionSuggestionSet
        context={context()}
        onChoose={() => {}}
        selectionAttempt={1}
        selectionIssue="conflict"
      />,
    );

    expect(container.querySelector('.mission-suggestions__issue')).toBe(first);
  });

  it('shows no recovery message when the last choice was fine', () => {
    const { container } = render(
      <MissionSuggestionSet context={context()} onChoose={() => {}} />,
    );

    expect(container.querySelector('.mission-suggestions__issue')).toBeNull();
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it('keeps the bounded end calm rather than treating it as a failure', () => {
    const shown = expectedMissions(context()).map((m) => m.missionId);
    const { container } = render(
      <MissionSuggestionSet context={context()} onAnotherSet={() => {}} shown={shown} />,
    );

    // Running out of full sets is a bounded catalog, so it never becomes an
    // alert and never removes the three Missions.
    expect(container.querySelector('[role="alert"]')).toBeNull();
    expect(
      screen.getByText(translateMessage('en', 'discovery.anotherSet.bounded')),
    ).toBeTruthy();
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('offers no way to choose a Mission', () => {
    // Structural rather than textual: Mission instructions legitimately contain
    // words like "choose" and "start", so only real controls are checked.
    const { container } = render(<MissionSuggestionSet context={context()} />);

    for (const role of ['button', 'link', 'radio', 'checkbox', 'menuitem'] as const) {
      expect(screen.queryAllByRole(role)).toHaveLength(0);
    }
    expect(
      container.querySelectorAll(
        'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"]), [role]:not([role="status"])',
      ),
    ).toHaveLength(0);
    // The only tabindex is the heading's programmatic focus target, which the
    // keyboard never reaches on its own and which activates nothing.
    expect([...container.querySelectorAll('[tabindex]')].map((el) => [
      el.tagName,
      el.getAttribute('tabindex'),
    ])).toEqual([['H2', '-1']]);
    // The one permitted role is the polite live region announcing the state,
    // which is not a control and offers nothing to activate.
    expect([...container.querySelectorAll('[role]')].map((el) => el.getAttribute('role')))
      .toEqual(['status']);
    for (const card of cards()) {
      expect(card.tagName).toBe('ARTICLE');
    }
  });

  it('reflects a changed discovery context with a new first set', () => {
    const movement = expectedMissions(context()).map((m) => m.missionId);
    const calm = expectedMissions(context({ category: 'Calm' })).map((m) => m.missionId);

    expect(movement).not.toEqual(calm);

    const { rerender } = render(<MissionSuggestionSet context={context()} />);
    expect(cards().map((c) => c.getAttribute('data-category'))).toEqual([
      'Movement',
      'Movement',
      'Movement',
    ]);

    rerender(<MissionSuggestionSet context={context({ category: 'Calm' })} />);
    expect(cards().map((c) => c.getAttribute('data-category'))).toEqual(['Calm', 'Calm', 'Calm']);
  });
});

describe('the insufficient-content state', () => {
  const shortCatalog = [fixture('m-1'), fixture('m-2', { catalogOrder: 1 })];

  it('renders no cards and no partial set', () => {
    render(<MissionSuggestionSet catalog={shortCatalog} context={context()} />);

    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.queryByText('Title (en)')).toBeNull();
  });

  it('explains the situation calmly without blaming the child', () => {
    render(<MissionSuggestionSet catalog={shortCatalog} context={context()} />);

    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('No Missions right now');
    const body = screen.getByText(/no complete set of three Missions/i);
    expect(body.textContent).toContain('Nothing went wrong');
    // The permitted next action is choosing another Mission Category.
    expect(body.textContent).toContain('another Mission Category');
  });

  it('exposes no technical detail and suggests no relaxation', () => {
    render(<MissionSuggestionSet catalog={shortCatalog} context={context()} />);

    const text = screen.getByRole('heading', { level: 2 }).parentElement!.textContent!;
    expect(text).not.toMatch(/invalid|error|exception|undefined|null|catalog\.|validation/i);
    expect(text).not.toMatch(/change the age|younger|older|try another language/i);
  });

  it.each(SUPPORTED_LANGUAGES)('is localized in %s', (language) => {
    render(<MissionSuggestionSet catalog={shortCatalog} context={context({ language })} />);

    const heading = screen.getByRole('heading', { level: 2 }).textContent!;
    expect(heading.length).toBeGreaterThan(0);
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
