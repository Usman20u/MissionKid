# MissionKid Plan 05 — guided entry and the presentation pass

**Date:** 2026-09-22
**Status:** Specification amendments prepared and revalidated; the reviewer's product decisions are recorded below. **Implementation authorization is still pending** — no product code is written under this plan until it is recorded here. Nothing is pushed, merged or deployed.

**Branch:** `feat/guided-entry-and-presentation`, taken from `14a5b16` on the unpublished `feat/reward-card-presentation`, which is preserved unchanged at that commit. No history was rewritten.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration.

It follows the completed implementation plans `F001`–`F004` and [`plans/completed/2026-09-21-reward-card-presentation.md`](../completed/2026-09-21-reward-card-presentation.md), closed on 2026-09-22 with the human reviewer's visual acceptance recorded, and its later evidence corrections. All of those are historical evidence; none is reopened.

This plan carries a **material specification change**. Under `AGENTS.md`, a material change to an approved specification pauses affected implementation until the applicable specification stages, User Story / traceability validation and Full Specification Audit are revalidated and renewed authorization is explicitly recorded here. Stages one and two are done and recorded below. **Renewed implementation authorization is not recorded and has not been given.**

The instruction that opened this plan approves the visual direction, the preparation of its specification amendments, and the bounded review recorded here. The instruction that updated it approves the four product decisions under *Approved decisions* and supplies the introduction copy as a reviewable proposal. Neither approves implementing any of it.

### Inherited commits on this branch

This branch was created from `14a5b16` rather than from `main`, so it inherits six unpublished commits. That is deliberate: the Reward Card work exists nowhere else, and branching from `main` would have abandoned it while branching from `HEAD` preserves it without rewriting anything.

| Commit | What it is | Status |
| --- | --- | --- |
| `1922028` | Opened the Reward Card presentation follow-up | Closed work, inherited |
| `e6b5c74` | The one presentation change to the successful Reward Card | Closed work, inherited |
| `87501fd` | Its outcome and verification record | Closed work, inherited |
| `d1352e2` | Its screenshot-coverage and measured-contrast corrections | Closed work, inherited |
| `f5a6912` | Its closure, with the human visual acceptance | Closed work, inherited |
| `14a5b16` | This plan and its specification amendments | This scope |

The first five are finished and accepted; this plan reopens none of them and changes nothing they produced. `feat/reward-card-presentation` still points at `14a5b16` and is untouched.

## Approved decisions

1. **The example Mission is `helping-11` — "The Table Surprise".** Its existing age approvals, reviewed localized content and safety guidance are preserved exactly. It is informational: viewing it selects no Mission, creates no session, and gives it no preference in discovery afterwards.
2. **The introduction stays inside the root-only application** as the first-use surface. It is not a separate marketing website. Returning families retain the existing durable-state precedence, unchanged.
3. **The reviewed Mission catalog is not revised in this scope.** Instruction length is recorded as a separate content consideration. Spacing changes alone are not presented as a solution to it.
4. **No setup-to-introduction back control in this slice.** Existing setup behavior is preserved.

### Why `helping-11` satisfies the specification

| Requirement | `helping-11` |
| --- | --- |
| Approved for every supported age band | `4–6`, `7–8`, `9–10` — all three |
| Reviewed and discovery-eligible | `reviewed: true`, `discoveryEligible: true`, content version `mvp-catalog-2026-09-r2` |
| Complete reviewed content in all three languages | Title, instruction and safety note present in `en`, `de`, `ru` |
| Carries a safety note | `safetyNoteRequired: true`; the note is present in all three languages and is shown verbatim |
| Adult involvement | `No special adult assistance required` — shown with its approved wording, never as a guarantee that no supervision is needed |
| Duration | `240` seconds, presented as the same approximate duration a Mission card shows |

Nothing about the entry is edited, adapted, shortened or re-reviewed. The introduction renders the same reviewed fields a Mission card renders, from the same catalog module.

### Proposed introduction copy

Reviewable product copy, not a claim of professional translation review. It is proposed here and would be added to the localization module under Task 2.

| Key purpose | EN | DE | RU |
| --- | --- | --- | --- |
| Heading | Small missions. Real-world adventures. | Kleine Missionen. Echte Abenteuer. | Маленькие миссии. Настоящие приключения. |
| Supporting text | Choose a short activity together, do it away from the screen, then come back to record its completion. | Wählt gemeinsam eine kurze Aktivität aus, macht sie abseits des Bildschirms und kommt danach zurück, um sie als erledigt einzutragen. | Выберите вместе короткое занятие, выполните его вдали от экрана, а затем вернитесь и отметьте выполнение. |
| Primary action | Set up MissionKid | MissionKid einrichten | Настроить MissionKid |
| Example label | Example Mission | Beispielmission | Пример миссии |

The primary action opens parent setup. It does not start, select or prepare a Mission.

## Specification amendments

Only the landing page is genuinely new behavior. Everything else in the approved visual direction is presentation the Visual & Ergonomic Specification already requires.

The Visual & Ergonomic Specification excludes **a marketing website**, and it still does. That exclusion is not reinterpreted to cover the introduction: it is amended to say what the introduction is, and the behavior itself is added to `F001`, which owns first-use setup.

| Document | Change | Reason |
| --- | --- | --- |
| [`F001`](../../docs/specs/functions/001-parent-setup-and-localization.md) | *First-use introduction* section: what it explains, its one forward action, the informational example Mission, language behavior before setup is confirmed, an explicit nine-row eligibility table, and the statement that reaching, reading or leaving it performs no durable write. Acceptance criteria `13`–`18`. | `F001` owns first-use setup and localization. The introduction precedes the setup choices and is `F001` behavior, not presentation. |
| [`F002`](../../docs/specs/functions/002-mission-discovery-and-selection.md) | The example is not a discovery result and does not relax the incomplete-setup rule; having been the example gives a Mission no standing — no preselection, promotion, pinning, exclusion or reordering — and discovery keeps no record of it. | `F002` forbids presenting missions before a valid age band exists, and owns eligibility and ordering. Both points are stated rather than left to inference. |
| [`visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) | Inventory row; *Parent introduction presentation* sub-section; one authorized use of the scene system outside Discovery; the marketing-website non-goal amended; acceptance criterion `24`. | This document owns presentation and the approved view inventory, and the scene system was authorized for Discovery only. |
| [`technical-architecture.md`](../../docs/specs/technical/technical-architecture.md) | The introduction added to the root-only view list; it needs no route, URL, history entry, router, snapshot field or persisted acknowledgement, and performs no storage write, so no state-changing operation, read-back or failure path arises from it; durable-state precedence unchanged. The *Setup and localization* boundary row updated. | Architecture owns the view list and the persistence boundary. |
| [`global-spec.md`](../../docs/global-spec.md) | Core user flow step `1`; one MVP-features bullet. | MVP scope must not grow silently. |
| [`functional-map.md`](../../docs/functional-map.md) | End-to-end flow step `1`; *Parent setup* capability row. | The capability now begins one step earlier. |
| [`user-stories.md`](../../docs/user-stories.md) | New story `P8`, mapped to `F001`. | No story covered a first-time parent understanding the product before setup. |

### Documents deliberately not changed

- **`business-context.md`** — problem, users, pain, value, safety principles and global positioning are unchanged.
- **`roadmap.md`** — nothing moves between v1, v1.1 and v2+; the introduction falls inside the existing v1 *Minimal parent setup* scope.
- **`mission-catalog-and-safety.md`** — no Mission, eligibility rule, age approval, adult-involvement level or safety rule changes. `helping-11` is used exactly as reviewed, and `F001` restates that an approval must never be broadened to produce an example.
- **`data-and-state-model.md`** — no persisted field is added, and the current view is already listed there as temporary runtime state.
- **`F003` / `F004`** — no session, timer, completion, Reward Card, History or Monthly Goal behavior changes.
- **`AGENTS.md`** — this is project status and specification content, not policy. No policy or governance file is added.

## Revalidation

### User Story / traceability validation — passed

- All 13 existing stories `P1`–`P7` and `C1`–`C6` are preserved, unique and unchanged, each keeping the same `F001`–`F004` owner. The identifiers are stable references in completed plans, so the new story is `P8` rather than renumbering; the story records that it precedes `P1` in the flow.
- `P8` maps to `F001` and is covered by acceptance criteria `13`–`18`.
- The amended `F002` text adds no discovery behavior, so `P3`, `P4` and `C1` remain accurate and needed no amendment. The no-standing rule constrains discovery rather than changing what it does.
- Every behavior this plan would implement traces to `F001` (`P8`) or to the Visual & Ergonomic Specification's ergonomic review method. No behavior traces to nothing.

### Focused Full Specification Audit — passed, no blockers

Scope: the seven amended documents and every clause that could conflict with them. This is a focused audit of the amendments, not a repeat of the foundation audit.

| Check | Result |
| --- | --- |
| The marketing-website exclusion is addressed, not reinterpreted | Passed. The non-goal is kept and amended; criterion `24` forbids marketing, testimonial, rating, urgency and persuasion patterns. |
| `F002`'s incomplete-setup rule is not weakened | Passed. The example is not a discovery result, is not selectable, starts no cycle, and the rule is restated unchanged. |
| The example gains no discovery advantage | Passed. `F001` and `F002` both state that it is neither preselected, promoted, pinned, excluded nor reordered, and that discovery keeps no record of it. |
| No age context is inferred before setup | Passed. `helping-11` is approved for all three bands, so showing it decides no eligibility question. |
| Safety and adult-involvement prominence is preserved | Passed. `helping-11`'s safety note and adult-involvement wording are shown verbatim at Mission-card prominence; both specifications forbid shortening, softening, delaying or hiding them. |
| Mission Catalog and Safety is not weakened | Passed. No content, eligibility rule or age approval changes, and broadening an approval to produce an example is forbidden. |
| Nothing is written before setup is confirmed, and reads still work | Passed. `F001` states that reaching, reading or leaving the introduction performs no durable write, and that this constrains writing rather than reading; the architecture states that no state-changing operation originates from the view while the ordinary hydration read and validation run unchanged and are what decide eligibility. The confirmed setup save remains the only thing that makes a language durable. |
| Root-only architecture is preserved | Passed. No route, URL, history entry, router dependency or persisted field. |
| Durable-state precedence is unchanged | Passed. The `F001` eligibility table reaches the same destination current behavior reaches in all eight non-introduction cases. |
| Lifecycle, confirmed-write contract, exactly-once accounting, timer rules, recovery, History and Monthly Goal | Passed. No amendment reaches `F003`, `F004`, the data and state model, or the persistence contract. |
| Out-of-scope boundaries hold | Passed. No account, payment, backend, analytics, ranking, streak, collectible or additional feature appears. |
| View inventory and architecture view list agree | Passed. |
| Internal reference integrity | Passed. Every relative link in the repository's Markdown resolves. |

**Blockers: none. Unresolved contradictions: none.**

## Introduction eligibility

Existing durable-state precedence is unchanged. The introduction never outranks anything the family is actually in; it is eligible in exactly one case. This mirrors the normative table in `F001`.

| Resolved context on arrival | Destination | Introduction | Same as today? |
| --- | --- | --- | --- |
| **No stored context** — storage works and holds nothing | The introduction | **Shown** | New view in place of the bare setup form |
| Valid setup, nothing in progress | Mission Category Selection or the setup handoff | Not shown | Unchanged |
| Incomplete setup — valid context, no valid age band | The age-context gate | Not shown | Unchanged |
| Current Mission Session `selected` | That Mission's start experience | Not shown | Unchanged |
| Current Mission Session `ready` | That Mission's start experience | Not shown | Unchanged |
| Current Mission Session `active` | The running Mission | Not shown | Unchanged |
| Current completed-result pointer | That Reward Card | Not shown | Unchanged |
| **Unreadable stored context** — invalid data or unsupported version | The recovery surface and its reset choice | Not shown | Unchanged |
| **Unusable storage** — the mechanism cannot be read or written | The temporary-mode surface and its warning | Not shown | Unchanged |

`F001` names these three conditions separately and no longer uses the word *unavailable* for more than one of them, because "no stored context", "unreadable stored context" and "unusable storage" reach three different surfaces and only the first is a first use. The existing *Setup context unavailable on a later visit* error state now points at the first row explicitly.

Two rows are deliberate. **Recovery is not an introduction:** a parent told their data cannot be read needs that fact and the approved choice first. **Temporary mode is not an introduction:** with storage unusable a first visit and a returning one cannot be told apart at all, and the warning that nothing will be durable is what the parent needs first, so a genuinely new visitor with blocked storage reaches temporary mode without an introduction.

A parent who has already moved to the setup choices is not sent back to the introduction. Nothing has been recorded, so a later visit in the same context is the no-stored-context row again, not a repeat.

### Language selection before setup is confirmed

- The choice applies immediately to the interface and to `helping-11`'s reviewed localized content.
- **It is not written anywhere**, because nothing on the introduction is written.
- It carries into the setup step within the same visit, appearing as the current selection rather than being asked again.
- It becomes durable only through the confirmed setup save, together with the age band.
- Leaving before confirming stores nothing; the next first use resolves to English, which is the default rather than a lost setting.

### What viewing the introduction writes

**No durable write of any kind.** No snapshot write, no storage key, no language, no age context, no Child Profile, no acknowledgement that it was seen, and no modification of any existing stored context. No state-changing operation originates from the view, so none of the confirmed-write contract's serialization, replacement, read-back, retry or unconfirmed paths can arise from it.

**Reading is unchanged and is required.** The ordinary hydration read and its validation are what decide whether the introduction is eligible at all, and they run for it exactly as for every other arrival. That read is what preserves returning-session, current-result, recovery and temporary-mode precedence; forbidding it would make the eligibility table unenforceable. A hydration failure resolves to the recovery or temporary-mode surface *before* this view could be selected, so it is not a failure path out of the introduction.

## Screen-by-screen review

Measured on the served production build in Chrome for Testing `148.0.7778.97`, from seeded snapshots through the real hydration path, in English, German and Russian.

### How these changes are judged

Two things are **not** goals and are not used as success criteria anywhere below:

- **Below-the-fold placement is not on its own a defect.** No change here exists to move a control above the fold.
- **Reducing the difference between control positions across languages is not an independent goal.** German and Russian are longer than English; a page that is taller in those languages is behaving correctly. Equalising positions by adding whitespace to the shorter language, shrinking text, clipping content, or reordering safety content is explicitly forbidden, and any of those would be a defect introduced rather than removed.

A proposed change is judged instead on all of:

1. **Unnecessary non-content height is removed** — height that carries no text, no control and no required separation.
2. **Action hierarchy stays clear** — one dominant primary action, secondary and safe-exit actions still available and still subordinate.
3. **Content stays readable and complete** — current text sizes, every required field, no truncation, no ellipsis, no disclosure of safety or adult-involvement guidance, no reordering of it.
4. **Keyboard access is intact** — same focus order, visible focus on every interactive element, nothing made unreachable.
5. **No overlap and no horizontal overflow** at any measured configuration.

Language-dependent page heights and ordinary vertical scrolling remain acceptable outcomes, at default and at increased text sizes alike. The measurements below therefore report non-content height, which is the thing under this plan's control, alongside content height, which is not.

### 1. Parent introduction — new

- **Must be understood:** what MissionKid is for, what a Mission looks like, what the family will do, that setup is short and private.
- **Primary action:** one forward action, **Set up MissionKid**, opening parent setup. The language choice is secondary.
- **Observed problem:** the view does not exist. A first-time parent's first screen is a form asking for a child's age band, with no statement of what the product does.
- **Preserved requirements:** `helping-11`'s reviewed content, safety note and adult-involvement wording shown verbatim at Mission-card prominence; English default and fallback; no durable write; existing durable-state precedence; the setup form unchanged.
- **Targeted verification:** `F001` criteria `13`–`18` and visual criterion `24` as tests through the rendered application and the real persistence adapter; every row of the eligibility table asserted to reach its stated destination; an assertion that no adapter write occurs while the introduction is displayed; an assertion that `helping-11` is approved for all three bands, so the rule cannot rot if the catalog changes; EN/DE/RU at `390x780`, `1280x900` and `320` px with a `32px` root, with no horizontal scroll and no truncated safety text.

### 2. Discovery — the three Mission suggestions

- **Must be understood:** three equally weighted Missions, comparable on title, instruction, category, duration and any adult-involvement or safety requirement.
- **Peer-choice group:** the three Missions. `Another set` stays secondary.
- **Observed problem, measured.** At `390x780` each card is `582`–`659` px tall and the set spans `1811` px (EN), `1910` px (DE), `2003` px (RU) — **`2.32` to `2.57` viewport heights**, so two complete options are never on screen together. Content is 69–80 words per card. At `320` px with a `32px` root the set spans `6326`–`6894` px. No horizontal scroll appears anywhere.
- **What `F002` requires, inspected before proposing anything.** *Mission card content* and acceptance criterion `4` require every card to carry the localized title, localized short instruction, Mission Category, expected duration and any required localized safety or adult-involvement note. The visual specification forbids truncating critical instructions, consequences, adult-involvement text or safety guidance, and requires safety and adult-involvement wording to be visible rather than behind disclosure. **Shortening, truncating, hiding behind disclosure and moving content off the card are therefore unavailable, and none is proposed.**
- **Targeted change:** reduce non-content vertical height at narrow widths only — the scene window currently occupies `29.5`–`33.4` % of card height at `390` px, roughly `174`–`220` px per card, and at `320` px with a `32px` root it already runs at `6.6`–`10.7` % and the card still works, which shows nothing depends on its size — together with card chrome and vertical rhythm. Keep the comparable fields in an identical position on all three cards so they can be compared without reading three instructions, while every instruction stays fully present.
- **Honest limit of this change.** Recovering the scene's height and tightening chrome removes on the order of `100`–`150` px per card, roughly `300`–`450` px across the set: a span of about `1.9` to `2.2` viewport heights instead of `2.32` to `2.57`. **It does not make two Missions co-visible on a phone and cannot**, because the remaining height is reviewed text at a readable size. The target is a measured reduction in scanning distance, not co-visibility, and **spacing changes are not offered as a solution to content length.**
- **Separate content consideration, not acted on here.** Reviewed instructions average `291` characters in English, `353` in German and `316` in Russian, and reach `538`, `656` and `614`. That length is the dominant driver of card height. Whether a "short instruction" should be that long is a **Mission Catalog and Safety** question about reviewed content, with safety and localization review attached. Decision 3 keeps the catalog out of this scope; this is recorded for that specification's owner.
- **Targeted verification:** the same measurement before and after on both builds, EN/DE/RU at `390x780` and `320`px/`32px`, reporting card heights and set span as numbers; every required field asserted present and untruncated on all three cards in all three languages; the existing `F002` suite unchanged; no card promoted over another; **the 54 reviewed scenes are not regenerated or replaced.**

### 3. Ready Mission

- **Must be understood:** which Mission, what to do, how long, what an adult must do, what is safe, that it has not started.
- **Primary action:** **Start mission**, dominant.
- **Observed problem, measured.** At `390x780` the view is **about half empty of content**. Pages measure `911` / `938` / `988` px (EN/DE/RU) against content heights of `448` / `474` / `501` px, leaving non-content height of `463` / `464` / `487` px — **`49.3` % to `50.9` % of the page**. The non-content share is essentially constant across languages, while content height varies by `12` % between English and Russian. That is the correct shape of the problem: the language-dependent part is content and is legitimate, and the roughly half of the page that carries nothing is the same in every language and is what is worth examining. Twelve text or control elements occupy the rest. Measured at the same time: no overlap, no horizontal overflow, three focusable elements.
- **Preserved requirements:** the safety and adult-involvement block keeps its position in the reading order and its prominence; text keeps its current size; every required field stays complete and untruncated; heading order, focus order and visible focus unchanged; ordinary vertical scrolling at default and increased text sizes is untouched; no scene is added — restraint here is deliberate, the scene system is authorized for Discovery and the introduction only, and Plan 03's finding on this screen is not reopened.
- **Targeted change:** remove non-content height that is not earning its place — spacing and chrome that separate nothing a reader needs separated. Nothing is added to any language to make it resemble another.
- **Targeted verification:** the same measurement repeated in all three languages at `390x780` and `320`px/`32px`, reporting page height, content height and non-content height before and after, so the change is shown to have removed empty height rather than content. Assertions that safety and adult-involvement text is present, untruncated and unmoved in reading order; that the primary action remains the single dominant one; that focus order and visible focus are unchanged; and that no overlap or horizontal overflow appears at any configuration. The existing `F003` suite unchanged. Remaining language-dependent height differences are recorded as the expected outcome, not as a shortfall.

### 4. Active Mission

- **Must be understood:** the Mission is running, the child should be away from the screen, roughly how long, the safety guidance still applies.
- **Primary action:** **Mission done** when the family returns.
- **Observed problem, measured, and smaller.** Pages measure `838` / `864` / `938` px against content heights of `463` / `490` / `541` px, leaving `375` / `374` / `397` px of non-content height — **`42.4` % to `44.7` %**. Again the non-content share is near-constant across languages and the variation is content. No overlap, no horizontal overflow, three focusable elements.
- **Preserved requirements:** the view stays intentionally low-interaction; the timer's live-region behavior, the leave-without-completing path and its confirmation are untouched; safety and adult-involvement guidance keeps its position and prominence; text keeps its size.
- **Targeted change:** the same removal of non-earning non-content height as the ready view, applied consistently. Nothing else, and nothing added to any language.
- **Targeted verification:** the same page/content/non-content measurement in all three languages; timer live-region behavior, the leave path and its confirmation asserted unchanged; action hierarchy, focus order, overlap and horizontal overflow checked as above.

### 5. Reward Card — unchanged

Improved, verified and visually accepted on 2026-09-22 in all three languages. **This plan changes nothing on it.** Re-styling a surface that was just accepted would discard evidence rather than add any.

### 6. Mission History and Monthly Goal — unchanged

Measured at `390x780` with five completed entries: the whole view including the Monthly Goal section and its action fits one viewport in all three languages, with the action at `648` px and no horizontal scroll. **No obstacle found and no change proposed.** It is re-measured once after Task 6 for consistency drift only.

### 7. Settings — the later language and age-context change

- **Must be understood:** current values, what changing each affects, and that existing Missions, History and Monthly Goal are not rewritten.
- **Primary action:** save the change.
- **Observed problem, measured.** The view runs `1547` / `1648` / `1648` px against content heights of `822` / `923` / `923` px, leaving **`725` px of non-content height in all three languages** — `44.0` % to `46.9` % of the page, and identical to the pixel across languages. The finding is that quantity, not the fold: a parent toggling one radio traverses roughly `725` px of chrome that carries nothing. Seventeen text or control elements and nine focusable elements; no overlap, no horizontal overflow.
- **Preserved requirements:** both effect explanations and both parent notes stay fully visible at their current size — they are the consequence text this view exists to carry, and none of it is condensed, hidden, reordered or moved behind disclosure; focus order across the nine focusable elements is unchanged.
- **Targeted change:** remove non-content height that separates nothing a reader needs separated.
- **Targeted verification:** the same page/content/non-content measurement in all three languages before and after; the language-effect and age-effect sentences asserted present and complete; action hierarchy, focus order, overlap and horizontal overflow checked; `F001` criteria `6` and `7` unchanged, including that an age-band change leaves a `ready` or `active` session and every completed record untouched.

## Implementation tasks

**None of these is authorized.** They are ordered so the new view lands before the passes that must stay consistent with it.

### Task 1 — The parent introduction view

**Outcome.** A first-time visitor reaches the introduction; it explains what MissionKid is for, shows `helping-11` as a clearly labelled, non-selectable example with its reviewed content, safety note and adult-involvement wording intact, gives the short account of the flow, offers the supported language choice, and has one dominant forward action into the unchanged setup form. Every eligibility row reaches its stated destination. No durable write occurs. No route, router, URL, history entry, snapshot field or persisted acknowledgement is added, and no persistence, hydration, validation or recovery path changes. No back control is added.

**Trace.** `F001` *First-use introduction*, criteria `13`–`18`; `P8`; Visual & Ergonomic *Parent introduction presentation*, inventory row, criterion `24`; Technical Architecture *Root-only navigation*.

**Verification.** Tests through the rendered application and the real persistence adapter for each criterion and each eligibility row, including that the example cannot be chosen, creates nothing, and receives no preference in the first discovery set afterwards. An adapter spy asserting zero **writes** while the introduction is displayed, while the ordinary hydration read is expected to have occurred and is asserted to have happened — the eligibility rules depend on it. A fixture asserting `helping-11` is approved for all three age bands and carries complete content in all three languages. Type checking, the full suite and the production build run sequentially, then the scoped diff and `git diff --check`.

### Task 2 — Introduction copy in English, German and Russian

**Outcome.** The four proposed strings, plus any label the view needs, exist in all three languages through the existing localization module, with English as default and fallback. No catalog content is edited, adapted or shortened. The strings are listed in the changelog for human review, as earlier plans did, and are recorded as proposed copy rather than professionally reviewed translation.

**Trace.** `F001` *Localization rules* and *Language on the introduction*; Global Specification language requirements; Visual & Ergonomic *Localization resilience*.

**Verification.** The existing localization completeness tests extended to the new keys; rendering in all three languages at `390x780`, `1280x900` and `320`px/`32px` with no clipping, no truncation and no horizontal scroll; `document.documentElement.lang` asserted to follow the selected language here as it already does elsewhere; an assertion that selecting a language on the introduction writes nothing and carries into the setup step.

### Task 3 — Discovery: mobile comparison and reading density

**Outcome.** Every card keeps its localized title, localized short instruction, Mission Category, expected duration and any required adult-involvement and safety wording, complete and untruncated, with safety visible and not behind disclosure. Non-content card height at narrow widths falls and the set span falls with it, by a measured amount. The three Missions stay equal peers. No catalog text changes. No horizontal scroll, carousel, swipe or feed behavior is introduced, and vertical scrolling at increased text sizes is unchanged.

**Trace.** `F002` *Mission card content*, criteria `1`, `4`, `7`; Visual & Ergonomic *F002 — Exactly-three Mission suggestions*, *Mobile-first and responsive presentation*, scene accessibility and performance rules, criteria `7` and `21`–`23`.

**Verification.** The before-and-after measurement on two served builds, EN/DE/RU at `390x780` and `320`px/`32px`, reporting card heights and set span, with the result stated as a measured number. Assertions that every required field is present and untruncated on all three cards in all three languages. The existing `F002` suite unchanged. Scene rendering checked against the reduced-motion and performance rules. The record must state plainly what the change did and did not achieve, including that two Missions remain non-co-visible on a phone.

### Task 4 — Remove unnecessary non-content height on the ready and active views

**Outcome.** Measured non-content height falls on both views in all three languages, from a baseline of `463`–`487` px on ready and `374`–`397` px on active at `390x780`. Content height is unchanged: every required field stays complete, untruncated and at its current text size, and safety and adult-involvement guidance keeps its position in the reading order and its prominence. **No whitespace is added to any language to make it resemble another, no text is shrunk, nothing is clipped, and no safety content is reordered.** Remaining language-dependent height differences are the expected outcome. The lifecycle, deliberate start, exactly-once completion, timer derivation, leave paths and confirmations are untouched.

**Trace.** `F003`; Visual & Ergonomic *F003 — Ready Mission presentation*, *Mission Break transition and active presentation*, *Action hierarchy*, *Localization resilience*, criteria `8` and `9`.

**Verification.** The page/content/non-content measurement in all three languages at `390x780` and `320`px/`32px`, before and after, showing that what was removed was empty height. Assertions that: content height did not fall; every required field is present and untruncated; safety and adult-involvement text is unmoved in reading order; one dominant primary action remains with secondary and exit actions subordinate and available; focus order and visible focus are unchanged; touch targets stay at or above `52` px; and no overlap or horizontal overflow appears. The existing `F003` suite unchanged, including exactly-once start and completion. Timer live-region behavior re-checked.

### Task 5 — Remove unnecessary non-content height on the settings view

**Outcome.** Measured non-content height falls from its `725` px baseline in all three languages, with content height unchanged: both effect explanations and both parent notes stay fully visible at their current size, none of it condensed, hidden, reordered or moved behind disclosure. The same prohibitions as Task 4 apply — no added whitespace, no smaller text, no clipping, no reordered safety or consequence content.

**Trace.** `F001` *Changing setup later*, criteria `6` and `7`; Visual & Ergonomic *F001 — Setup and localization presentation*, *Action hierarchy*.

**Verification.** The page/content/non-content measurement in all three languages before and after. Assertions that content height did not fall; that the language-effect and age-effect sentences and both parent notes are present and complete; that the save action remains the single dominant one; that focus order across the nine focusable elements and visible focus are unchanged; and that no overlap or horizontal overflow appears. Tests asserting a `ready` or `active` session, every completed record and Monthly Goal progress are unchanged by an age-band change.

### Task 6 — Consistency and full verification

**Outcome.** The introduction, Discovery, ready, active, Reward Card, History and settings read as one visual language. **The Reward Card and Mission History presentation are unchanged.** No unrelated change enters the diff.

**Trace.** Visual & Ergonomic *Visual consistency without a design system*, *Accessibility baseline*, *Anti-manipulation visual rules*, *Ergonomic review method*.

**Verification.** Type checking, the full suite and the production build run sequentially; the whole branch diff inspected against `main`; `git diff --check`. Across EN/DE/RU at `390x780`, `1280x900` and `320`px/`32px`, against the five judging criteria used throughout this plan: unnecessary non-content height removed with content height intact; one dominant primary action per view with secondary and exit actions subordinate; complete readable content with no truncation, clipping or disclosed safety guidance; keyboard access with unchanged focus order, visible focus on every interactive element and touch targets at or above `52` px; and no overlap or horizontal overflow. Reduced motion respected and heading and reading order intact on every changed view. Language-dependent page heights and ordinary vertical scrolling, at default and increased text sizes, are recorded as acceptable outcomes rather than as findings. Contrast measured on the rendered page for every changed text element, as the Reward Card follow-up did.

## Boundaries

Preserved exactly: the `selected → ready → active → completed` lifecycle, the confirmed-write contract, exactly-once completion accounting, timer derivation from persisted timestamps, every recovery and temporary-mode path, Mission History, and Monthly Goal behavior including period identity and the single goal-complete prompt. The accepted Reward Card presentation and the Mission History presentation are not changed.

Not authorized and not proposed: accounts, payments, a backend, analytics, rankings, streak pressure, collectible rewards, or any additional product feature. No new dependency. No new persisted field, storage key or snapshot version. No route, router or URL-addressable page. No change to reviewed catalog text, durations, age eligibility, adult-involvement levels or safety guidance. No regeneration or replacement of the 54 reviewed scenes. No component replaced that is already correct. No setup-to-introduction back control.

Kept in the acceptance criteria throughout: English, German and Russian; accessible focus; comfortable touch targets; larger-text support with readable text and normal vertical scrolling; mobile performance.

## Remaining decisions requiring approval

1. **Renewed implementation authorization.** Nothing in *Implementation tasks* may begin until it is recorded here. This is the gate.
2. **Translation review of the proposed copy.** The strings above are proposed product copy. Whether they need review by a German and a Russian speaker before release is a release decision, not one this plan makes.
3. **Instruction length**, recorded under Decision 3 as a separate content consideration for Mission Catalog and Safety. Not scheduled, not assumed, and not addressed by anything in this plan.

## Definition of complete

This plan is complete when its authorized scope is implemented, each task's verification has actually been run and recorded truthfully here and in the changelog, and the diff is limited to that scope. It claims no MissionKid MVP completion, no deployment readiness, no CI result, no assistive-technology acceptance and no professional translation review. Human acceptance of anything built under it would be recorded separately, as the Reward Card follow-up's was.
