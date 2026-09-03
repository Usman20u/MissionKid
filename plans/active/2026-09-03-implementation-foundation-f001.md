# MissionKid Implementation Plan 01 — Application Foundation and F001

**Date:** 2026-09-03
**Status:** Approved — implementation authorized for Plan 01 scope

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md). That completed foundation plan records:

- User Story / Traceability Validation: `PASSED — 10/10`;
- Full Specification Audit: `PASSED — 10/10`;
- specification blockers: `NONE`;
- blocking implementation guessing required: `NO`; and
- the exact declaration `SPEC COMPLETE`.

Once this approved plan is committed and remains the sole active plan, it authorizes product code only within the exact Plan 01 scope below. That authorization depends on the durable `SPEC COMPLETE` evidence remaining valid. It does not authorize any F002, F003, or F004 behavior.

## Objective

Build the smallest production-quality MissionKid application foundation required to implement and verify `F001 — Parent Setup and Localization`, without implementing later Mission flows.

Plan 01 establishes the approved React, TypeScript, and Vite client foundation; a root-only responsive application shell; English, German, and Russian localization; parent-guided language and age-band setup; the F001 portion of browser-local persistence and recovery; and tests for the implemented behavior.

## Owning specifications

- [`docs/business-context.md`](../../docs/business-context.md) — real problem and family context
- [`docs/global-spec.md`](../../docs/global-spec.md) — product purpose and MVP boundaries
- [`docs/functional-map.md`](../../docs/functional-map.md) — capability ownership and end-to-end boundary
- [`docs/user-stories.md`](../../docs/user-stories.md) — `P1` and `P2` traceability validation
- [`docs/specs/functions/001-parent-setup-and-localization.md`](../../docs/specs/functions/001-parent-setup-and-localization.md) — F001 behavior
- [`docs/specs/technical/technical-architecture.md`](../../docs/specs/technical/technical-architecture.md) — application, localization, persistence, recovery, testing, and deployment boundaries
- [`docs/specs/technical/data-and-state-model.md`](../../docs/specs/technical/data-and-state-model.md) — closed values, F001 state, snapshot invariants, and reset meaning
- [`docs/specs/mission-catalog-and-safety.md`](../../docs/specs/mission-catalog-and-safety.md) — cross-cutting privacy, child-safety, and localization-equivalence boundaries
- [`docs/specs/visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) — F001 presentation, responsive, accessibility, recovery, and ergonomic requirements

F002–F004 remain interface constraints only. Plan 01 must not implement Mission Category Selection, Mission discovery or catalog entries, Mission Sessions or timers, Reward Cards, Mission History, or Monthly Goal.

## In scope

- React with TypeScript and Vite, with exact compatible dependency versions pinned during authorized implementation.
- One root-only responsive SPA and a shallow state-driven shell with no URL-based product routes.
- A small React state plus context/reducer boundary sufficient for F001 and later composition.
- Static interface dictionaries for exactly `en`, `de`, and `ru`, with `en` as the default and safe interface-message fallback.
- Parent-guided first-use setup and later F001 language/age-context editing.
- Exactly three age-band values: `4–6`, `7–8`, and `9–10`.
- One minimal local Child Profile context containing a stable local identifier and age band, without child identity data.
- One namespaced, versioned `localStorage` snapshot accessed only through one persistence adapter.
- F001-relevant runtime validation, hydration, confirmed whole-snapshot replacement/read-back, temporary in-memory degradation, retry, corruption/unsupported-version recovery, and deliberate reset.
- F001 loading, pending, failure, recovery, and reset presentation.
- Mobile-first responsive and accessibility foundations required by the approved Visual & Ergonomic Specification.
- Automated and manual verification for the implemented Plan 01 behavior.
- A truthful dated changelog update after implementation and verification.

## Explicitly out of scope

- F002 Mission Category Selection, Mission discovery, suggestion sets, selection, and any actual Mission catalog entry
- F003 Mission Session creation, `selected → ready → active → completed`, timer, abandonment, or completion
- F004 Reward Card, Mission History, Monthly Goal, completion counting, or rewards
- A router or non-root product URL
- Redux or another state-management framework unless a later approved plan documents a real need
- Backend, server API, server database, serverless runtime, authentication, accounts, cloud sync, or remote persistence
- Analytics, tracking, advertising identifiers, CMS, runtime AI, AI SDK, payment, social, device-control, or native-app integration
- Service worker, offline-installation claims, deployment-provider configuration, or environment secrets
- UI component framework, design-system package, heavy localization framework, or speculative architecture added for appearance
- Child full name, identifying name, exact birth date, email, contact data, address, precise location, school/class, credentials, photo, video, or other sensitive or identifying child data
- Specification, `AGENTS.md`, roadmap, or completed-plan changes

## F001 boundary and later-state compatibility

- Setup is parent-guided. English is effective on first use unless the parent selects German or Russian, and setup is complete only with one valid supported age band.
- Successful F001 completion exposes a typed, testable handoff indicating that the approved setup context is ready for the next function. Plan 01 stops at that boundary and must not render, simulate, or populate Mission Category Selection.
- Changing language changes presentation, never stable identity. Changing age affects only future discovery context.
- Plan 01 must not encode automatic cancellation, replacement, mutation, or deletion of a future `selected`, `ready`, `active`, or `completed` Mission Session. It must not fabricate those states merely to test this constraint; concrete later-state preservation tests belong to the plans that implement those states.
- F001 actions must update only their owned settings/profile facts through domain operations. The one-snapshot and adapter design must remain extendable to the full approved Data and State Model without a second persistence system.
- If the approved versioned snapshot schema requires fields reserved for later functions, Plan 01 may preserve only their required structural shape. Those fields must remain in their approved empty, null, or default state and must not be populated, interpreted, transitioned, or rendered to implement F002, F003, F004, Mission discovery, Mission Sessions, Reward Cards, Mission History, or Monthly Goal.
- Setup or setup editing creates no Mission Session, Reward Card, History entry, or Monthly Goal effect.

## Required technical boundaries

- Use one static client application delivered from `/`.
- Use React state and a small context/reducer boundary; UI modules do not edit persisted fields directly.
- Keep stable language codes, age-band values, local identifiers, message keys, and stored fields independent of translated labels.
- Keep localization dictionaries bundled and read-only at runtime.
- Use one stable namespaced storage key and one persistence adapter. No feature module may call `localStorage` directly.
- Treat all stored data as untrusted. Validate the version, shape, closed values, identifiers, and internal F001 invariants before hydration.
- Confirm persistence by serializing, replacing the complete current snapshot, reading it back, and validating the exact stored result before presenting an action as durably saved.
- Do not overwrite an unsupported or corrupted snapshot automatically. Preserve it until supported recovery succeeds or the parent explicitly confirms reset.
- Reset removes only MissionKid's namespaced snapshot and returns to effective English with incomplete age setup.
- If storage is unavailable or fails, clearly label temporary in-memory mode and warn the parent that refresh/close can lose the temporary context. Do not claim durable saving or silently merge temporary state with later durable state.
- Support one active application tab for one local family context. Do not add multi-tab locking, leases, or synchronization.
- Add no secret or runtime environment dependency.

## Minimal likely repository shape

Authorized implementation should add only the files proven necessary while executing the tasks. The likely minimum is:

- one `package.json` and one npm lockfile;
- Vite/TypeScript configuration and root `index.html`;
- `src/main.tsx` and a shallow application shell;
- small F001 domain/state, localization, persistence, setup-view, and shared presentation modules;
- one global or similarly minimal stylesheet arrangement;
- focused unit/integration tests, preferably colocated or in one shallow test area; and
- the existing dated changelog system.

Do not pre-create empty folders, later-feature modules, a generic component library, a design-token catalog, or duplicated test/configuration layers. Exact file placement is an ordinary implementation choice so long as the boundaries remain shallow, cohesive, and minimal.

## Sequential implementation tasks

### Task 1 — Establish the runtime and test-tooling foundation

#### Outcome

Create the minimal React, TypeScript, and Vite static-client setup with one npm lockfile, scripts for development, type checking, automated tests, and production build, plus Vitest and React Testing Library support. Pin exact compatible versions. Add no runtime service, router, external state library, localization framework, analytics, UI framework, environment secret, or later-feature module.

#### Specification trace

Technical Architecture: locked MVP stack, dependency minimalism, testing strategy, root-only delivery, performance boundary, and production deployment boundary. `AGENTS.md`: smallest implementation and no speculative dependencies.

#### Verification / test intent

Verify a clean install from the lockfile, TypeScript checking, one deterministic test command, and a production Vite build. Inspect dependency and configuration diffs to prove every package/configuration file serves Plan 01 and no server, route, secret, or future feature was introduced.

### Task 2 — Build the root-only application shell and F001 state boundary

#### Outcome

Implement the application entry point and shallow shell using React state plus a small context/reducer boundary. The shell selects F001 first-use, editing, pending, recovery, and setup-complete handoff states from validated application state at `/`. It generates no deep links and implements no F002 view or behavior.

#### Specification trace

F001 first-use/incomplete-setup behavior; Technical Architecture root-only navigation, app-shell boundary, state-driven views, and top-level error containment; Data and State Model persisted/runtime/derived classification; Visual & Ergonomic initial-setup and recovery inventory.

#### Verification / test intent

Mount the shell with controlled state/persistence adapters and verify the correct F001 state is selected for fresh, valid hydrated, incomplete, pending, degraded, and blocked-recovery contexts. Verify no router dependency, non-root navigation, Mission Category control, Mission object, Mission Session, Reward, History, or Goal behavior exists.

### Task 3 — Implement static EN/DE/RU localization infrastructure

#### Outcome

Add stable interface message keys and complete Plan 01 dictionaries for exactly `en`, `de`, and `ru`; resolve unsupported/unreadable language to English; update applicable document/content language metadata; and permit immediate re-resolution after a confirmed language change without changing stable profile identity.

#### Specification trace

F001 localization rules and language-change behavior; Technical Architecture localization boundary and fallback rules; Data and State Model closed language values; Mission Catalog and Safety localization equivalence/privacy rules; Visual & Ergonomic localization resilience and accessibility language identification.

#### Verification / test intent

Unit-test closed language resolution, English default/fallback, stable message-key lookup, and missing-interface-message fallback diagnostics. Integration-test all implemented F001 content in EN/DE/RU, language switching, stable local profile identity, Cyrillic rendering, and absence of raw keys or mixed-language Mission content. No Mission content is added in this plan.

### Task 4 — Implement the F001 snapshot and persistence adapter foundation

#### Outcome

Implement one versioned F001-capable snapshot and one namespaced `localStorage` adapter that owns read, runtime validation, serialization, whole-snapshot replacement, exact read-back confirmation, reset, and typed failures. Persist only approved settings and minimal Child Profile facts needed by F001; do not create later-function records or a parallel store. A reset is confirmed only after a post-removal storage read verifies that the namespaced snapshot is absent; invoking the removal operation alone is not durable reset confirmation. Removal failure, post-removal read failure, or a still-present snapshot returns a typed unconfirmed result.

#### Specification trace

Technical Architecture one-snapshot strategy, persistence-adapter boundary, five-step confirmed-write path, one-active-tab boundary, failure/version/reset behavior; Data and State Model settings, Child Profile, snapshot, invariants, validation/recovery, and privacy rules; F001 later-visit behavior.

#### Verification / test intent

Unit-test missing storage entry, valid snapshot, unsupported version, malformed JSON, invalid top-level shape, unsupported language with otherwise trustworthy F001 state, invalid/missing age band, stable local profile identifier, serialization failure, write exception, and read-back mismatch/failure. For reset, test successful removal followed by confirmed absence, a removal exception, a post-removal read exception, and a snapshot that remains present after removal was invoked. Distinguish in-memory/UI state, durable persisted state, and the adapter's confirmed result in every reset case; verify that only the MissionKid key is targeted, unrelated storage remains untouched, no feature module accesses `localStorage`, and no separate settings/profile keys or later-feature data stores exist.

### Task 5 — Implement parent-guided language and age setup interactions

#### Outcome

Implement the short parent-guided setup and F001 editing interactions: English selected by default; exactly EN/DE/RU; exactly one of `4–6`, `7–8`, or `9–10`; clear parent-responsibility/privacy context; valid completion only after an age band is selected; and confirmed persistence before durable-success presentation. Emit only the typed setup-complete handoff at the F002 boundary.

#### Specification trace

F001 MVP inputs, first-use setup, incomplete setup, later changes, effects on future suitability, acceptance criteria 1–12; user stories `P1` and `P2`; Global Product Specification parent-guided/private setup; Visual & Ergonomic F001 presentation and action hierarchy.

#### Verification / test intent

Integration-test fresh setup, English default, each supported language, each age band, one active age choice, missing-age validation, setup completion, later visit/restoration, later language change, later age change, stable profile identity, and the F002 handoff boundary. Assert that no identifying-data input and no Mission/discovery/session/reward/history/goal effect exists.

### Task 6 — Implement truthful F001 failure, recovery, and reset states

#### Outcome

Provide calm F001 loading/pending, retry, corrupted/unsupported-state recovery, temporary in-memory mode, and deliberate parent-facing reset states. Never claim a failed write was saved, never silently replace stored data, never expose raw technical details, and never reset without explicit consequence text and confirmation. Do not present durable reset success or the resulting fresh-state outcome unless persistent absence of the namespaced snapshot has been confirmed.

#### Specification trace

F001 error and edge states; Technical Architecture persistence failure, schema version, temporary-mode, reset, and error/recovery strategy; Data and State Model validation/recovery and explicit-reset rules; Visual & Ergonomic recovery table, confirmations, and parent-oriented presentation.

#### Verification / test intent

Integration-test storage unavailable on load, failure while saving language/age, safe retry, unsupported version, corrupted snapshot, and cancel-reset. For explicit reset, test the successful path in which post-removal persistence confirmation succeeds before the application truthfully returns to English with incomplete setup, and the failure/unconfirmed path in which removal or its post-removal confirmation fails. In the unconfirmed path, keep the pre-reset durable snapshot authoritative where it remains available, do not claim durable reset success or cleared data, and offer only the approved calm recovery/retry path. Verify temporary mode is unmistakably non-durable and that a retry first re-reads durable state rather than guessing or merging.

### Task 7 — Apply the F001 responsive and accessibility baseline

#### Outcome

Implement a calm, trustworthy, mobile-first F001 presentation with semantic structure, label-led controls, logical reading/tab order, visible focus, comfortable touch targets, adequate contrast, reduced-motion respect, wrapping/larger-text resilience, and clear primary/secondary/destructive hierarchy. Do not add broad branding, a design system, manipulative animation, or decorative noise.

#### Specification trace

Visual & Ergonomic Purpose, Mobile-first presentation, F001 presentation, action hierarchy, confirmations, localization resilience, typography/color/motion principles, accessibility baseline, and anti-manipulation rules; Technical Architecture accessibility/responsive baseline; Business Context product ergonomics.

#### Verification / test intent

Test semantic roles, accessible names, validation/error association or announcement, keyboard operation, focus placement after validation/recovery changes, and reduced-motion behavior where motion exists. Manually inspect narrow mobile and wider desktop layouts in EN/DE/RU with text expansion and larger text; confirm no horizontal scrolling, clipped critical copy, hover-only action, color-only state, or obscured focus.

### Task 8 — Complete automated F001 coverage

#### Outcome

Create a focused automated suite covering implemented domain, localization, adapter, shell, setup, persistence, recovery, reset, and accessibility behavior. Keep clocks, identifiers, and storage adapters controllable where determinism requires them; do not add a separate end-to-end framework without a demonstrated gap.

#### Specification trace

Technical Architecture unit and integration testing strategy; F001 acceptance criteria; Data and State Model invariants and trust decisions; Visual & Ergonomic accessibility and recovery acceptance criteria; Plan 01 scope boundary.

#### Verification / test intent

The suite must cover: initial empty state; default English; EN/DE/RU changes; all age bands; setup completion; refresh/restoration; valid snapshot; corrupted snapshot; unsupported version; unavailable/failing storage; write/read-back failure; successful reset with confirmed post-removal absence; failed or unconfirmed reset removal/read-back with no false durable-success state; responsive-relevant structure; keyboard interaction; accessible names/focus; and absence of forbidden personal-data collection. Run type checking, tests, and production build; record actual results rather than treating build success alone as sufficient.

### Task 9 — Perform manual F001 product-flow verification

#### Outcome

Exercise the built application as a parent through first use, each supported language and age band, incomplete setup, confirmed setup, refresh/restart-equivalent hydration, later editing, temporary mode, retry, corruption/unsupported-version recovery, and reset at representative narrow and wide viewports.

#### Specification trace

F001 full behavior and acceptance criteria; Technical Architecture manual release checks and static-host root-only behavior; Visual & Ergonomic F001, recovery, responsive, localization, and accessibility requirements; privacy/safety boundaries.

#### Verification / test intent

Record which browsers/viewports and scenarios were actually checked. Confirm the root-only flow, no fabricated F002 continuation, truthful durable/temporary messaging, no child-data request, no raw technical error, and no later-feature UI. Do not claim browser or assistive-technology coverage that did not run.

### Task 10 — Run the required ergonomic review and target only justified fixes

#### Outcome

Review every implemented F001 view/state against the approved ergonomic method: location, dominant information, primary action or legitimate peer choices, next step, error/recovery clarity, parent/safety context, mobile clarity, accessibility, EN/DE/RU resilience, and unnecessary visual noise. Select and implement only one to three evidence-based improvements if the review identifies them; record `no change justified` if none is needed.

#### Specification trace

Visual & Ergonomic core ergonomic rule, F001 inventory/presentation, parent tone, loading/recovery presentation, accessibility baseline, ergonomic review method, and acceptance criterion 20; `AGENTS.md` implementation-quality ergonomic gate.

#### Verification / test intent

Document the reviewed states, concrete findings, selected zero-to-three outcomes, and why each change improves comprehension or safety without altering behavior. Re-run the affected automated/manual checks. Confirm there was no broad redesign, new behavior, attention-capture pattern, or unapproved design-system expansion.

### Task 11 — Audit implementation against owning specifications

#### Outcome

Inspect the complete implementation and dependency diff against F001 and the applicable technical, data/state, safety, privacy, localization, visual, accessibility, and recovery requirements. Identify blockers and make only targeted in-scope corrections.

#### Specification trace

All owning specifications listed above; `AGENTS.md` decisions, implementation quality, traceability, repository hygiene, and material-change rules.

#### Verification / test intent

Produce an evidence-backed audit confirming F001 acceptance-criteria coverage, architecture compliance, one-adapter/one-snapshot behavior, truthful failure handling, data minimization, and the absence of F002–F004 behavior, actual Mission entries, unrelated code, secrets, and speculative dependencies. Re-run affected tests after any correction; do not rewrite correct work for style.

### Task 12 — Update the dated changelog truthfully

#### Outcome

After implementation, tests, ergonomic review, and audit are factual, update the dated changelog with only the Plan 01 changes and checks that actually occurred. Do not claim full MVP completion, unsupported browser coverage, plan completion, push, PR, or merge prematurely.

#### Specification trace

`AGENTS.md` Git/changelog discipline and honest reporting; Plan 01 authorization and completion boundaries.

#### Verification / test intent

Compare the entry with the actual diff and recorded check results. Confirm it describes foundation plus F001 only, states that F002–F004 remain unimplemented, contains no shell-command diary or conversational material, and introduces no parallel status authority.

### Task 13 — Run final diff, checks, and clean-commit readiness gate

#### Outcome

Review the final repository tree and diff, run every relevant check, resolve real Plan 01 blockers, and prepare focused clean commit(s) only after the plan's completion criteria pass. Keep this plan active until completion is truthful; moving it to `plans/completed/`, pushing, opening a PR, or merging requires its applicable later authorization/workflow step.

#### Specification trace

`AGENTS.md` plan discipline, implementation quality, Git/changelog discipline, and repository hygiene; all Plan 01 scope and definition-of-complete requirements.

#### Verification / test intent

Run clean install, type check, automated tests, production build, diff check, repository/status review, secret/personal-data scan, and the recorded manual checks. Confirm only necessary Plan 01 files exist, no specifications or execution contract changed, no F002–F004 implementation exists, no blocker remains, and the commit diff matches the audited work before declaring commit readiness.

## Specification-change rule during implementation

If implementation exposes a missing or conflicting product, technical, safety, state, recovery, or interaction requirement:

1. stop the affected implementation;
2. do not invent behavior;
3. update the owning specification first; and
4. follow the material-change revalidation rule in `AGENTS.md` when applicable before resuming affected implementation.

Ordinary implementation choices already delegated by unchanged approved specifications and this approved plan do not require specification edits. Choose the smallest reasonable option, document it only where the repository needs it, and verify it.

## Definition of Plan 01 complete

Plan 01 is complete only when all of the following are true:

- the approved React, TypeScript, Vite, root-only application foundation is implemented;
- F001 behavior and user stories `P1` and `P2` match their owning specifications;
- applicable automated tests, type checking, and production build pass;
- manual F001 product-flow verification is complete and reported accurately;
- the one-snapshot/one-adapter architecture and F001 persistence/recovery behavior are verified;
- unsupported/corrupted state, failed storage, temporary mode, and explicit reset remain truthful and safe;
- the Visual & Ergonomic review covers every implemented F001 view/state;
- any justified one-to-three targeted ergonomic improvements are implemented and verified;
- no F002, F003, or F004 behavior or actual Mission catalog entry was accidentally implemented;
- no unrelated code, speculative infrastructure, secret, personal data, or known blocker remains;
- the dated changelog records only factual completed work;
- the final implementation/specification audit and full diff review pass;
- focused clean commit(s) exist; and
- the branch is ready for an explicitly authorized push, PR, and merge workflow.

Plan 01 completion is not MissionKid MVP completion. It establishes the application foundation and F001 only. Implementation remains subject to the active-plan gate throughout, and later functions require separately approved plan scope.

## Approval record

- Implementation Plan Audit: `PASS — 10/10`.
- Blocking plan defects: `NONE`.
- Blocking implementation guessing required: `NO`.
- Owning specifications require no modification before implementation.
- The durable `SPEC COMPLETE` evidence in [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md) remains valid.
- Implementation authorization is limited strictly to this Plan 01 scope: Application Foundation + F001 Parent Setup & Localization. F002, F003, F004, and all other excluded or future work remain unauthorized.
