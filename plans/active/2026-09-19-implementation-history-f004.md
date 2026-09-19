# MissionKid Implementation Plan 04 — Mission History and the current Monthly Goal

**Date:** 2026-09-19
**Status:** Draft — pending approval. Implementation has not started; no product code exists for this plan.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose specification-completion gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration. That declaration states that it does not by itself authorize implementation and that later implementation requires a separate approved plan referencing it. This is that plan, and it is a draft until approved.

It continues [`plans/completed/2026-09-17-implementation-session-f003.md`](../completed/2026-09-17-implementation-session-f003.md) — Plan 03, `F003` with the approved bounded `F004` slice — together with [`plans/completed/2026-09-19-pr4-review-corrections.md`](../completed/2026-09-19-pr4-review-corrections.md) and [`plans/completed/2026-09-19-unknown-start-followup.md`](../completed/2026-09-19-unknown-start-followup.md). All three are historical evidence and are not reopened. Plan 03 recorded exactly which clauses it deferred with the Mission History view; this plan takes up those and nothing else.

Approval of this plan authorizes implementation of the scope below. Until then, no product code, dependency or configuration change is authorized.

## Remaining scope

Everything here is already owned by an approved specification. No owning specification changes.

1. **Private Mission History**, derived from validated, uniquely identified completed Mission Sessions for the current Child Profile.
2. **Newest-first ordering with a deterministic tie-break**, and the minimal entry: localized Mission title, the immutable Mission Category the session recorded, and a localized completion context.
3. **Empty History**, explaining that completed Missions appear there and offering the approved route back to Mission Category Selection, with no fabricated examples.
4. **The unavailable-title fallback in History**, which never removes or alters a valid completion, its category, its period or its count.
5. **Accessible navigation into History and back**, obeying the existing current-session and result precedence and the existing focus rules.
6. **Current-local-month Monthly Goal progress**, including a period with zero completions and a new local calendar month, presented as distinct from a restored Reward Card, which names the period its own completion fixed.
7. **A calm retry for a derived-view failure**, preserving the durable completions and claiming no loss and no second increment.
8. **EN / DE / RU**, with targeted accessibility, responsive and ergonomic verification.

## Explicitly out of scope

No duplicate History or counter store, no persisted navigation state, no persisted goal or prompt record, no URL route or router, no dashboard, analytics, filter, search, sharing, ranking or social behaviour, no new dependency, no snapshot version change and no migration. Completion, counting, the display cap and the single twentieth-completion prompt are reused exactly as implemented; none is reimplemented here.

## Reused, not rebuilt

| Existing | Reused for |
| --- | --- |
| `persistence.ts` snapshot validation | Completed sessions are already validated one record at a time, scoped to the Child Profile, coalesced by stable identifier and stripped of conflicting copies. History derives from that output and adds no second trust policy. |
| `deriveMonthlyGoal` in `missionProgress.ts` | Counting, uniqueness, the `20 / 20` cap and the deterministic twentieth-completion identity. The current-month surface calls it with a different period argument; nothing about counting changes. |
| `byCompletionOrder` in `missionProgress.ts` | The locale-independent order — `completedAt`, then stable identifier by code unit — that History reverses for newest-first. |
| `localCompletionPeriodId` in `missionSession.ts` | The `YYYY-MM` local-calendar period identity, already used at completion, now also read from the current clock for the live period. |
| `completionContext` in `MissionResult.tsx` | The localized completion date. It becomes shared rather than duplicated. |
| `MissionResultBoundary` pattern in `MissionResult.tsx` | The shape of a derived-view recovery boundary whose retry re-derives and writes nothing. |
| `AppShell` view selection and focus rules | Navigation, precedence and deliberate focus movement. |

## Decisions that need approval before implementation

These are genuine gaps: no owning specification answers them, and each changes what gets built.

**D1 — Where Mission History is entered.** The Visual and Ergonomic specification defines History's content, its reading order, its empty state and its route *out* to Mission Category Selection, but no specification names a route *in*: no control, no label and no host surface. The Technical Architecture forbids URL routes, so a view must be selected from state by some control.

*Recommendation:* a parent-area control on the `setup-complete-handoff` view, beside **Find a Mission**. The Visual and Ergonomic view inventory marks History "Parent-oriented private context", and User Story `P6` is a parent story. Alternatives: on the Reward Card — but its next step is specified as a short step back to the core flow, and a second destination competes with it; or on the child-facing discovery doorway — but that surface deliberately carries no parent-oriented controls.

**D2 — Where current-local-month Monthly Goal progress is presented.** The Visual and Ergonomic specification lists Monthly Goal as its own presentation row — "Current progress as `X / 20 missions`", "No new action is invented by this specification" — and User Stories `C6` and `P7` both expect the current period to be visible. The Reward Card shows the period *its own completion* fixed, which is not the current period once a month has rolled over. No specification says which surface hosts the current-period figure.

*Recommendation:* one section on the Mission History view. It needs no new destination and no new action, it keeps both derived views on one surface, and it satisfies `C6` and `P7`. Alternative: a section on `setup-complete-handoff`, which would make it visible without opening History but adds a second place where progress is stated.

**D3 — Whether History is reachable while a Mission Session or a completed result is open.** Not addressed by any specification, but the existing precedence rules already decide it.

*Recommendation, made under delegated authority and flagged for confirmation rather than treated as a blocker:* it is not. An `active` session, an open result, a `ready` session and a `selected` session each keep precedence exactly as they do now, and the History entry does not appear on those surfaces. History is runtime-only navigation for this page lifetime; it is never persisted, and it never displaces a recovered session or result.

Ordinary implementation choices that are **not** blockers and will be made and verified without further approval: whether the derivation lives in `missionProgress.ts` or its own module; the exact class names and DOM shape; whether the History unavailable-title reuses `result.missionUnavailable` or takes its own key, decided by whether the existing wording is truthful in a list; and how the empty-state route dispatches the existing discovery-opened action.

## Acceptance mapping

Nothing below is claimed as passing. Each row states what already holds and what this plan must add. Acceptance is claimed only after implementation and verification.

### `F003` clauses deferred with the History view

| Clause | Already held | Remaining here |
| --- | --- | --- |
| 11 — one completion produces one History entry | The unique completed record and the single Monthly Goal application are asserted (`MissionResult.test.tsx`, `missionProgress.test.ts`) | That the completion appears as exactly one History entry |
| 12 — repeat or refresh adds no History entry | No second completed record can be appended for one identifier (`missionSession.test.ts`, `MissionResult.test.tsx`) | That History still shows exactly one entry after a repeat and after a refresh |

### `F004`

| # | Clause | Status entering this plan | Remaining here |
| --- | --- | --- | --- |
| 1 | One card, one History entry, progress `+1` below `20 / 20` | Card and progress asserted | The History-visible half |
| 2 | Resubmission or refresh leaves History and Monthly Goal unchanged | Durable half asserted | The History-visible half |
| 3 | Card shows recognition, title, category, completion context and progress | Asserted in full | — |
| 4 | History holds only this profile's completed sessions, minimal information, newest first | **Not started** | All of it |
| 5 | Empty History shows its empty state and a route to Mission Category Selection | **Not started** | All of it |
| 6 | `ready`/`active` and cancelled or abandoned flows never appear in History or count | Monthly Goal half asserted | The History-visible half |
| 7 | New period starts `0 / 20` and completes at exactly twenty | Derivation asserted | That a current period with zero completions is *presented* as `0 / 20`, and that a month rollover presents the new period while History keeps prior completions |
| 8 | Later completions stay in History, display holds `20 / 20`, no repeated prompt | Cap and single prompt asserted | The History-visible half |
| 9 | One encouraging parent-approved message, nothing delivered or promised | Asserted in full | — |
| 10 | No gambling, payment, comparison, sharing, child media or manipulation | Asserted for the card | The same assertion for the History and Monthly Goal surfaces |

On completion, the truthful claim becomes: `F003` acceptance complete, and `F004` acceptance complete, with the MVP's remaining scope being whatever the Roadmap holds beyond `F001`–`F004`. Until then this plan claims nothing.

## Tasks

Dependency-ordered. Each task is complete only when its verification passes.

### Task 1 — Derive the private History and the current period

**Outcome.** Pure derivation over validated completed sessions: entries for one Child Profile, unique by session identifier, ordered newest first by `completedAt` with the stable identifier as the deterministic tie-break, each carrying the stored category and completion moment. Separately, the current local month's period identity read from the injected clock, so the live period is distinguishable from a completion's own fixed period. Nothing is written, and no second counting or trust policy is introduced.

**Source references.** Data and State Model — Mission History (the three-step derivation), Monthly Goal period and count; `F004` Mission History behavior and Monthly Goal period; Technical Architecture — derived state.

**Likely files.** `src/missionProgress.ts` (extend; reuses `byCompletionOrder`), `src/missionProgress.test.ts`, `src/missionSession.ts` (reuse `localCompletionPeriodId`, no change expected).

**Verification.** Unit tests: newest-first order; an exact `completedAt` tie broken deterministically and independently of interface language; another profile's and another period's records excluded; duplicate identifiers counted once; ordering unchanged by a language or age-band change; a current period with no completions; a month rollover leaving prior entries in History. Each new assertion shown to fail against a controlled mutation.

### Task 2 — Reach Mission History and return

**Outcome.** A `history` application view selected from runtime state alone, with the approved entry control (D1) and a return to where the family came from. An `active` session, an open completed result, a `ready` session and a `selected` session keep their existing precedence; the entry does not appear on those surfaces. Focus moves to the view heading exactly as other deliberate context changes do. Nothing about navigation is persisted, and no URL changes.

**Source references.** Technical Architecture — root-only navigation, app shell and navigation responsibilities; `F003` refresh and recovery behavior; Visual and Ergonomic — action hierarchy and deliberate focus movement.

**Likely files.** `src/AppShell.tsx`, `src/appState.tsx`, `src/MissionHistory.tsx` (new), `src/App.test.tsx`, `src/Accessibility.test.tsx`.

**Verification.** Rendered-application tests on the real adapter: History opens and returns; a restored `active` session, a restored open result and a restored `ready` session each keep precedence and offer no History entry; a refresh while History is open restores the approved state rather than History, because navigation is not persisted; focus lands on the view heading once.

### Task 3 — Present each entry, and the title that cannot be shown

**Outcome.** Each entry shows the localized Mission title, the immutable Mission Category the session recorded, and a localized completion context — and nothing else. A Mission the catalog no longer carries keeps its entry, its category, its completion moment, its period membership and its count, with the approved calm localized fallback in place of the title. EN / DE / RU.

**Source references.** `F004` Mission History behavior; Visual and Ergonomic — `F004` Mission History presentation; Data and State Model — a completed session whose Mission content cannot be resolved; Mission Catalog and Safety — localization equivalence.

**Likely files.** `src/MissionHistory.tsx`, `src/localization.ts`, `src/styles.css`, `src/MissionHistory.test.tsx` (new), `src/localization.test.ts`.

**Verification.** Rendered tests in all three languages: the entry carries exactly the approved fields; the category is the one the session stored, not one re-derived from the catalog; a withdrawn Mission keeps its entry and its count with the fallback title; a language change alters labels and dates but not order, membership or counts. The dictionary invariants already enforced — every key resolved by an implemented surface, no unused key, matching interpolation tokens — must hold with the new strings.

### Task 4 — Empty Mission History

**Outcome.** With no completed sessions for this profile, History states plainly that completed Missions will appear there and offers the approved route to Mission Category Selection. No fabricated entries, no sample records, no pressure or gamification.

**Source references.** `F004` empty state; Visual and Ergonomic — empty Mission History row and the empty-state paragraph.

**Likely files.** `src/MissionHistory.tsx`, `src/localization.ts`, `src/MissionHistory.test.tsx`.

**Verification.** Rendered tests in all three languages: the empty state appears only when this profile has no completions; the route reaches Mission Category Selection; another profile's completions do not fill it; no entry-like node is rendered.

### Task 5 — Current-local-month Monthly Goal

**Outcome.** The current period's progress presented as `X / 20 missions` on the approved surface (D2), derived for the month the clock is in now. A period with no completions reads `0 / 20`; after a rollover the new period reads its own figure while prior completions stay in History. It is visibly distinct from a restored Reward Card, which continues to name the period its own completion fixed. Wording stays neutral and encouraging, the display caps at `20 / 20`, and no second goal-complete prompt is created here.

**Source references.** `F004` Monthly Goal target, counting, period, goal completion; Visual and Ergonomic — `F004` Monthly Goal presentation; Data and State Model — Monthly Goal period and count, one goal-complete prompt.

**Likely files.** `src/MissionHistory.tsx`, `src/missionProgress.ts`, `src/localization.ts`, `src/MissionHistory.test.tsx`, `src/MissionResult.test.tsx`.

**Verification.** Rendered tests with an injected clock: zero completions in the current month; a completion in the current month; a rollover where the previous month's completions remain in History while the current figure resets; twenty and twenty-one completions holding `20 / 20`; and a Reward Card restored in a later month still naming its own period while this surface names the current one. No write occurs on any of these paths.

### Task 6 — A calm retry for a derived-view failure

**Outcome.** A failure to derive or render History or the Monthly Goal surface keeps every durable completion intact, says calmly that the view cannot be shown, and offers a retry that re-derives from the same durable facts. It claims no data loss, repeats no completion, mints no identifier and writes nothing. The existing Reward Card boundary is unchanged.

**Source references.** `F004` error and edge states; Visual and Ergonomic — "History or Monthly Goal unavailable"; Technical Architecture — a derived view that is stale or invalid; Data and State Model — recalculate, never repair into a duplicate.

**Likely files.** `src/MissionHistory.tsx`, `src/localization.ts`, `src/MissionHistory.test.tsx`.

**Verification.** A rendered test drives the failure through an injected derivation at a real boundary, as the Reward Card's display-failure test already does, with no production fault switch: the notice appears, the completions in storage are unchanged, the retry restores the same view from the same records, no write occurs, and focus is placed deliberately.

### Task 7 — Acceptance, verification and record

**Outcome.** Every clause in the mapping above is either carried by a named assertion or recorded as still outstanding. Targeted accessibility, responsive and ergonomic review of the new surfaces only. Type check, full suite, production build and diff checks run sequentially. The changelog records what actually happened, and this plan's implementation record is written and the plan closed.

**Source references.** `AGENTS.md` — implementation quality, plan discipline, Git and changelog discipline; Visual and Ergonomic — accessibility and responsive presentation, and the required ergonomic review with `1–3` targeted improvements.

**Likely files.** `changelog/2026-08-17.md`, this plan, `src/Accessibility.test.tsx`, `src/styles.css`.

**Verification.** The criterion-to-assertion matrix built before the final edits; each added assertion shown to fail against a controlled mutation; a focused production-browser check of the new surfaces and their keyboard behavior in EN / DE / RU, without repeating unrelated matrices; then the sequential gate. No raised timeout and no weakened assertion.

## Definition of complete

Scope items 1–8 implemented and verified, every mapped clause carried by a named assertion, the ergonomic review done with at most three targeted improvements, the changelog updated, and this plan's record written before it moves to `plans/completed/`. Approval for a branch, push, pull request or merge is a separate decision and is not granted by this plan.
