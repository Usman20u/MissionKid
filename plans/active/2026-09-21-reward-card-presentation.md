# MissionKid Follow-up — make the Reward Card recognizable

**Date:** 2026-09-21
**Status:** Implemented and verified — human visual acceptance pending. The plan stays active until that review concludes; nothing is pushed, merged or deployed.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration.

It follows [`plans/completed/2026-09-19-implementation-history-f004.md`](../completed/2026-09-19-implementation-history-f004.md) — Plan 04, merged into `main` as `70da510` — and the earlier completed plans. All of them are historical evidence and none is reopened; their records and limitations stand as written.

The instruction that approved this plan authorizes one bounded presentation improvement to the successful Reward Card, its verification, its record here and in the changelog, and focused commits on one branch taken from `70da510`. Push, pull request, merge and deployment are **not** authorized.

## Why

Human acceptance review of the merged build did not recognize the completion surface as a Reward Card. Read-only investigation confirmed the cause and ruled out the alternatives: the Reward Card's content, completion accounting, the twentieth-completion message and its absence on later completions are all correct, and so is age-band filtering. What is missing is presentation. `.mission-result` has no surface of its own — transparent background, no border, no radius, no depth — so the only framed object on the completion screen is the subordinate Monthly Goal panel inside it, and the recognition line is set smaller than the Mission title beneath it.

Plan 03's ergonomic review examined this screen and deliberately kept its restraint — no reveal, no motion, no rarity, no comparison. That finding is not reopened: this plan changes none of it. Restraint is not the same question as whether the surface reads as a distinct object, and no recorded review finding covers identity or prominence.

## Source references

`F004` — Reward Card behaviour and boundaries; Visual & Ergonomic — *F003/F004 Reward Card presentation*, *Child-oriented presentation*, the accessibility and responsive baseline, and the ergonomic review method's one-to-three-improvement bound. No owning specification changes: the visual specification's explicit non-goals leave palette and styling values to implementation, so this is an ordinary choice under it.

## Scope

1. A distinct, calm surface for the **successful** Reward Card: background, border, radius, spacing and restrained depth drawn from values the visual system already uses.
2. The recognition line leads the card, with the Mission title still clearly the Mission's identity and the completion context readable.
3. Monthly Goal information stays visually secondary, and the existing next action stays clear.

## Boundaries

CSS first. One minimal presentational class is allowed, and is needed: `MissionResultBoundary` renders its display-failure fallback with the same `mission-result` class, so styling that class alone would make a failed display look like successful recognition. No catalog, age-eligibility, ordering, navigation, persistence, completion or reward-rule change. No new control, string, asset, dependency, animation or reward mechanic. No Discovery layout behaviour, no `overflow` clipping, no Discovery-only custom property. Heading semantics, focus indicators, wrapping and reading order are preserved. The mid-session setup route raised by the same review is out of scope.

## Tasks

### Task 1 — The recognizable card

**Outcome.** The successful Reward Card carries its own calm surface; the recognition line leads it; the Mission title, category and completion context stay readable; the Monthly Goal block is quieter than the recognition above it; the one next action stays clear. The display-failure fallback keeps the plain, unadorned presentation it has now.

**Verification.** Before-and-after screenshots from identical fixtures, in English, German and Russian, at narrow mobile and desktop widths and at a `32px` root, covering an ordinary completion, the actual twentieth completion, a later completion, a long Mission title and the unavailable-title fallback, plus a restored result and the display-failure retry checked for readable content and an unclipped focus ring. The existing suite carries unchanged behaviour; no test is added to assert a CSS declaration and no mutation campaign is run. Type checking, the full suite and the production build run sequentially, then the scoped diff and `git diff --check`.

## Implementation record

**What changed.** Two files. `MissionResult.tsx` adds one presentational modifier to the success card's root element — `mission-result--recognition` — and nothing else; the boundary's display-failure fallback keeps the plain `mission-result` class, so the two can never take the same treatment. `styles.css` adds one block of rules for that modifier. No behaviour, string, control, asset, dependency, animation or specification changed, and the card's markup, heading levels and reading order are exactly as they were.

**The surface.** `max-width: 32rem`, `border-radius: 1.15rem` — the value the Discovery Mission card already uses — a `1px` `#d8e1da` border, the `#edf7f1` tint the selected setup choice already uses, and a single restrained shadow. The tint is what makes it a card: the view panel it sits in is near-white, so a white card inside it would have been a second invisible box. Nothing was borrowed from Discovery's layout, no Discovery-only custom property is referenced, and no `overflow` is clipped — the Mission title is a focus target whose ring is drawn `4px` outside it.

**Recognition leads.** The recognition line goes from `1.15rem` to `1.45rem` and takes the brand green; the Mission title goes from `1.35rem` to `1.3rem` and stays bold directly beneath it. Measured on the built page, the order is now recognition `23.2px` over title `20.8px`, where it was recognition `18.4px` under title `21.6px`. The category and completion context are unchanged.

**Monthly Goal is quieter.** Inside the card the goal block no longer needs a frame of its own, so its white panel, border and radius are dropped for a hairline rule above it. That removes a nesting level rather than adding one, which is what kept the whole screen from becoming boxes inside boxes.

**Cramping, found and fixed.** The first attempt cost real width at `320px` with a `32px` root: the card's horizontal padding took the text column from `174px` to about `145px`, and the Russian recognition line wrapped onto a fourth line with an orphaned full stop. Under `22rem` the card now reclaims exactly as much of the view panel's padding as its own padding adds back, so the column measures `172px` there — the width it had before this change — while the tint still widens the card. The page is also shorter than it was: `3814px` against `3984px` for that fixture.

## Verification

**Before and after, from identical seeded fixtures**, against the served production build in Chrome for Testing `148.0.7778.97`: English, German and Russian, at `390x780`, at `1280x900`, and at `320` px with a `32px` root, across an ordinary completion, the actual twentieth completion, a later completion, a long Mission title and the unavailable-title fallback — 39 screenshots before and 39 after. Every fixture is a restored result, loaded from a seeded snapshot through the real hydration path. No horizontal scroll appeared in any combination, before or after.

**Measured on the built page.** The card reports the tint, a `1px` border, an `18.4px` radius and a shadow where it previously reported a transparent background, no border, no radius and no shadow. The goal block reports no background where it previously reported one. On desktop the card is `512px` wide rather than the `1054px` band it filled before.

**Focus, semantics and order.** With the Mission title focused on the built page: the `3px` `#b4650c` ring at a `4px` offset is intact, no ancestor clips overflow, the card computes `overflow: visible`, the heading order is `h1` Mission complete → `h2` Mission title → `h3` Monthly goal, and the reading order is recognition, title, meta, goal, action — all unchanged.

**The display-failure state was rendered, not assumed.** It has no trigger in an unmodified production build, so a throwaway instrumented build was made from a temporary source edit, screenshotted, and the edit reverted; it is not in any commit. The fallback keeps the plain `mission-result` class, shows no tint, no card and no recognition line, states that the result cannot be shown while the completion is safe, and gives the retry button an unclipped focus ring.

**Project checks, run sequentially:** type checking clean, **800 tests across 22 test files** passing, the production build clean, `git diff --check` clean. No test was added to assert a CSS declaration and no mutation campaign was run: behaviour is unchanged, and the existing suite is what covers it.

**No specification or `AGENTS.md` change.** The Visual & Ergonomic specification already requires exactly what this card now presents, and its explicit non-goals leave palette and typography values to implementation. Nothing here is a new rule, so nothing was written down to restate an existing one.

**Limitations.** This is automation in one engine against one build; it is not human sign-off, and human visual acceptance is explicitly still pending. No assistive technology was run, so no screen-reader behaviour is claimed beyond the semantics recorded above. No real phone, Safari or Firefox. This repository has no CI, so none of these checks is a CI result. Contrast of the new tint and text colours was not measured with a contrast tool; the text colours are unchanged except the recognition line, which moved to the brand green already used for headings on white.

## Definition of complete

Scope items 1 to 3 implemented, the verification above run and recorded truthfully here and in the changelog, and the diff limited to presentation. Human visual acceptance stays pending: this plan does not claim it, and it does not claim MVP completion or deployment readiness.
