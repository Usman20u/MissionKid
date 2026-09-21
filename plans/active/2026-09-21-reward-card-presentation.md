# MissionKid Follow-up — make the Reward Card recognizable

**Date:** 2026-09-21
**Status:** Draft — authorized, not yet implemented.

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

## Definition of complete

Scope items 1 to 3 implemented, the verification above run and recorded truthfully here and in the changelog, and the diff limited to presentation. Human visual acceptance stays pending: this plan does not claim it, and it does not claim MVP completion or deployment readiness.
