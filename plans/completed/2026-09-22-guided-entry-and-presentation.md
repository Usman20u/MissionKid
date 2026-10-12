# MissionKid Plan 05 — guided entry and the presentation pass

**Date:** 2026-09-22
**Status:** **Completed and closed on 2026-09-29.** Every authorized task is implemented and verified, and the reviewer's **visual acceptance of the reviewed presentation** is recorded under *Human visual acceptance*, below. That acceptance is not product acceptance, cross-browser verification or release approval. Tasks 4 and 5's height targets and Task 3's remaining height obligation are **superseded, not achieved**, and stay recorded as such. The separate asset, content, translation and product decisions this plan named are **not** completed by its closure; they are listed under *Closure — carried forward, not completed*. Nothing is pushed, merged or deployed.

*The status this line carried until 2026-09-28 — every task implementation-verified and awaiting human visual review — is preserved in the task-status table under the ninth authorization's outcome.*

**Branch:** `feat/guided-entry-and-presentation`, taken from `14a5b16` on the unpublished `feat/reward-card-presentation`, which is preserved unchanged at that commit. No history was rewritten.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration.

It follows the completed implementation plans `F001`–`F004` and [`plans/completed/2026-09-21-reward-card-presentation.md`](../completed/2026-09-21-reward-card-presentation.md), closed on 2026-09-22 with the human reviewer's visual acceptance recorded, and its later evidence corrections. All of those are historical evidence; none is reopened.

This plan carries a **material specification change**. Under `AGENTS.md`, a material change to an approved specification pauses affected implementation until the applicable specification stages, User Story / traceability validation and Full Specification Audit are revalidated and renewed authorization is explicitly recorded here. Stages one and two are done and recorded below. **Renewed implementation authorization is recorded below, and it covers Tasks 1 and 2 only.**

The instruction that opened this plan approves the visual direction, the preparation of its specification amendments, and the bounded review recorded here. The instruction that updated it approves the four product decisions under *Approved decisions* and supplies the introduction copy as a reviewable proposal. Neither of those approves implementing any of it. The instruction recorded under *Renewed implementation authorization* does, for Tasks 1 and 2.

### Renewed implementation authorization

Recorded on 2026-09-23, after the human review of this plan and of the specification amendments it carries.

- **Authorized:** Tasks 1 and 2, executed together as one integrated batch.
- **Not authorized:** Tasks 3, 4, 5 and 6. Each remains pending its own authorization, and none of them is started.
- **Still excluded:** pushing, a pull request, merging, deployment and branch deletion.

A second, narrower authorization was recorded on 2026-09-23, after the Tasks 1–2 materials were reviewed:

- **Authorized:** the reproduced Discovery clipping correction only — the layout defect that clips reviewed Mission instructions or safety guidance at `320` CSS px with a `32px` root. It is a bounded part of Task 3 and **not** its completion.
- **Explicitly excluded from it:** the broader scene-height and spacing work in Task 3; shortening text, hiding it behind disclosure, shrinking typography, or replacing the clipping with horizontal overflow; and any change to the introduction, Reward Card, History, ready, active or settings presentation.
- **Not authorized:** the rest of Task 3, and Tasks 4, 5 and 6.
- Human visual acceptance of Tasks 1 and 2 remains outstanding and is not recorded by anyone but the reviewer.

A third authorization was recorded on 2026-09-23, covering three bounded ergonomic improvements and nothing else. Human visual acceptance is still outstanding and is not recorded here.

| # | Improvement | Owning task and specification |
| --- | --- | --- |
| 1 | **Introduction desktop composition.** Use the available desktop width: the example Mission beside a column carrying the flow explanation, the setup, privacy and responsibility context, and the single setup action. Semantic reading order and the approved single-column mobile order are preserved. Exactly one setup action, with no duplication, sticky positioning or overlay. The breakpoint is content-driven, so enlarged text returns safely to one column. | Task 1; Visual & Ergonomic *Parent introduction presentation*, *Mobile-first and responsive presentation*, *Action hierarchy*; `F001` criterion `13` |
| 2 | **Narrow-screen spacing correction.** The spacing portion of Task 3 that the clipping correction left open, applied to the Discovery cards and to the introduction's shared example card, plus the language controls. Excessive nested horizontal padding is reduced so enlarged text has useful reading width; font sizes, readable line spacing, complete reviewed content, safety prominence and comfortable controls are preserved, and language control names stay readable. | Task 3 (spacing portion) and Task 1 for the shared card; Visual & Ergonomic *Mobile-first and responsive presentation*, *Localization resilience*, criteria `7` and `21`–`23` |
| 3 | **Explain the deliberate start.** `introduction.flow.step2` is updated in all three languages so the account of the flow says that the family starts the Mission deliberately before leaving the screen, using each language's existing Start action wording. This explains behavior `F003` already owns; it adds no operation and changes no behavior. | Task 2; `F001` *First-use introduction*; `F003` deliberate start |

Explicitly excluded from this authorization: reducing scene heights, replacing or regenerating scenes, rewriting catalog content, changing any other view, and Tasks 4, 5 and 6. **Completing this spacing work does not complete Task 3**, whose remaining obligations — the measured reduction in card height and set span at narrow widths, and the before-and-after record that names what the change did and did not achieve — are untouched and still unauthorized. Ready, active, settings, the Reward Card and Mission History stay unchanged.

**No specification change is required for any of the three.** Checked before implementation, and recorded because the gate requires it rather than assumed:

- The Visual & Ergonomic Specification already requires that wider layouts *"preserve the same content order and action hierarchy when additional desktop space is available"*, and its restriction on placing things side by side is about **peer choice groups**. The example and the guidance column are not peers of one another and are not a choice, the content order is unchanged, and exactly one action remains. Improvement `1` is that clause being satisfied, not amended.
- Improvement `2` is presentation within the same specification's responsive and localization-resilience rules, and touches no owning behavior.
- Improvement `3` states the deliberate start that `F003` already owns, inside the short account of the flow `F001` already requires. It adds no step, no control and no operation.

Three bounded corrections were authorized with it and are applied throughout this plan. They needed no further approval round, and none of them uncovered an unresolved product contradiction.

**Correction 1 — one integrated batch.** Task numbering is kept, but Tasks 1 and 2 are executed together rather than in sequence. The introduction arrives with real English, German and Russian localization. No English-only intermediate product and no placeholder control is built, so no commit on this branch holds an introduction without its three languages.

**Correction 2 — the eligibility table describes arrival cases.** The nine rows name the context MissionKid resolves on arrival. They are not a new precedence algorithm and they replace nothing the application already decides. Where two of those conditions coexist, **existing precedence decides and is preserved exactly**. In particular an incomplete age context reaches the age-context step even when durable state also holds a current Mission Session or a current completed-result pointer — which is what `F002`'s incomplete-setup rule and `F001`'s *Incomplete setup* section already require, and what the application already does. Task 1's verification carries regression coverage for both of those coexisting cases. The same clarification is recorded in `F001` beside the table, because a table read as an algorithm is the way this rule would be broken later.

**Correction 3 — the later presentation tasks no longer judge success by content height.** "Content height unchanged" and "content height did not fall" are withdrawn as criteria. **Legitimate reflow may reduce measured text height**: text that occupies fewer lines because it has more width, or a tighter line box that does not reduce the type size, is a correct outcome rather than a loss, so a fall in text height is not on its own evidence that content was removed. What replaces it is stated under *How these changes are judged* and applied in Tasks 4 and 5: preservation of **complete wording, readable typography, required guidance and semantic order**, with the measurement method defined there, and with useful separation and touch-target space distinguished from excessive spacing.

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
| Adult involvement | `No special adult assistance required`, which carries no localized adult-involvement note. The example therefore presents the adult-involvement line exactly as a Mission card presents it for this Mission — that is, not at all. The internal catalog level is never rendered, and no claim that supervision is unnecessary is invented to fill the space |
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

**The table describes arrival cases, not a precedence algorithm.** Each row names a context MissionKid resolves on arrival and the surface that context already reaches. Nothing in it reorders anything, and where two of these conditions coexist the existing precedence decides, unchanged.

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

#### Coexisting conditions keep the precedence they have today

The rows above are read one at a time, but durable state can satisfy more than one description at once. Existing precedence settles every such case and is preserved exactly:

| Coexisting condition | Where it goes | Why |
| --- | --- | --- |
| Incomplete age context **and** a current Mission Session in `selected`, `ready` or `active` | The age-context gate | `F001` *Incomplete setup* and `F002` both require that discovery cannot begin and that the family is returned to the missing age step. The stored session is untouched and is not cancelled. |
| Incomplete age context **and** a current completed-result pointer | The age-context gate | The same rule. The completed records and the pointer are untouched. |

Neither case is ever the introduction: a stored context exists, so this is not the no-stored-context row at all. Both are covered by regression tests under Task 1.

#### Two arrivals that resolve to the no-stored-context row

Both follow from the row itself rather than from any new rule, and both were confirmed against the implementation:

- **After a confirmed reset.** The reset removed the stored context, so storage works and holds nothing. That is the first row — "on a first visit or after a previously stored context ceased to exist" — and the parent reaches the introduction rather than a bare form.
- **After a storage retry that finds working, empty storage.** The retry re-resolves the arrival context from storage, and the context it resolves is the same one. A parent who reached temporary mode never saw the introduction, because temporary mode is not an introduction; once storage works and holds nothing, the first row applies to them as it does to any other first use.

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

1. **Excessive spacing is removed, and useful space is not.** What may go is height that separates nothing a reader needs separated — padding, margin and chrome beyond what the content asks for. What stays is **useful separation** — the space that groups a heading with what it introduces, or keeps a safety note visually distinct from the instruction above it — and **touch-target space**, the height an interactive element needs to reach its `52` px minimum. Neither of those is unnecessary height, and removing either is a defect rather than a result.
2. **Action hierarchy stays clear** — one dominant primary action, secondary and safe-exit actions still available and still subordinate.
3. **Content is preserved — and preservation is not measured in pixels.** The test is four things, each checked directly: **complete wording**, every required string present and rendered in full with no truncation, ellipsis or disclosure; **readable typography**, computed font size and line height unchanged or better, and the text measure still comfortable; **required guidance**, every safety and adult-involvement block present as visible text at its existing prominence; and **semantic order**, heading order, reading order and the position of safety and adult-involvement content unchanged. **Legitimate reflow may reduce measured content height** — text that occupies fewer lines because it has more width, or a tighter line box that does not reduce the type size, is a correct outcome. A fall in content height is therefore not evidence that anything was lost, and content height is not a pass/fail criterion anywhere in this plan.
4. **Keyboard access is intact** — same focus order, visible focus on every interactive element, nothing made unreachable.
5. **No overlap and no horizontal overflow** at any measured configuration.

Language-dependent page heights and ordinary vertical scrolling remain acceptable outcomes, at default and at increased text sizes alike.

### How the measurement is taken

On the served production build in Chrome for Testing, at each configuration and in each language:

- **Page height** is `document.documentElement.scrollHeight`.
- **Content height** is the vertical extent actually covered by elements that carry visible text or are interactive controls, computed as the union of their bounding boxes rather than the sum of their heights, so nested and adjacent elements are never counted twice.
- **Non-content height** is page height minus content height.

Those three numbers describe the shape of a view; they do not decide whether a change is acceptable. The verdict comes from the direct checks in criterion `3` — rendered strings compared with the required content, computed `font-size` and `line-height` per changed text element, document order of headings and of the safety and adult-involvement blocks — together with the computed height of every interactive element for the `52` px minimum, and the overlap and horizontal-overflow checks in criterion `5`.

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

**Tasks 1 and 2 are authorized and were executed together; Tasks 3–6 are not authorized and are not started.** They are ordered so the new view lands before the passes that must stay consistent with it.

### Task 1 — The parent introduction view

**Outcome.** A first-time visitor reaches the introduction; it explains what MissionKid is for, shows `helping-11` as a clearly labelled, non-selectable example with its reviewed content, safety note and adult-involvement wording intact, gives the short account of the flow, offers the supported language choice, and has one dominant forward action into the unchanged setup form. Every eligibility row reaches its stated destination. No durable write occurs. No route, router, URL, history entry, snapshot field or persisted acknowledgement is added, and no persistence, hydration, validation or recovery path changes. No back control is added.

**Trace.** `F001` *First-use introduction*, criteria `13`–`18`; `P8`; Visual & Ergonomic *Parent introduction presentation*, inventory row, criterion `24`; Technical Architecture *Root-only navigation*.

**Verification.** Tests through the rendered application and the real persistence adapter for each criterion and each eligibility row, including that the example cannot be chosen, creates nothing, and receives no preference in the first discovery set afterwards. Regression coverage for the coexisting cases above — an incomplete age context together with a current Mission Session, and together with a completed-result pointer — asserting each reaches the age-context gate and not the introduction, following the existing approved behavior rather than introducing a new one. An adapter spy asserting zero **writes** while the introduction is displayed, while the ordinary hydration read is expected to have occurred and is asserted to have happened — the eligibility rules depend on it. A fixture asserting `helping-11` is approved for all three age bands and carries complete content in all three languages. Type checking, the full suite and the production build run sequentially, then the scoped diff and `git diff --check`.

### Task 2 — Introduction copy in English, German and Russian

**Outcome.** The four proposed strings, plus any label the view needs, exist in all three languages through the existing localization module, with English as default and fallback. No catalog content is edited, adapted or shortened. The strings are listed in the changelog for human review, as earlier plans did, and are recorded as proposed copy rather than professionally reviewed translation.

**Trace.** `F001` *Localization rules* and *Language on the introduction*; Global Specification language requirements; Visual & Ergonomic *Localization resilience*.

**Verification.** The existing localization completeness tests extended to the new keys; rendering in all three languages at `390x780`, `1280x900` and `320`px/`32px` with no clipping, no truncation and no horizontal scroll; `document.documentElement.lang` asserted to follow the selected language here as it already does elsewhere; an assertion that selecting a language on the introduction writes nothing and carries into the setup step.

### Tasks 1 and 2 — outcome, at `02bbe68`

Implemented together as one batch. The introduction arrived with all three languages; no commit on this branch holds an English-only version of it.

**What was built.** A new transient setup stage, `introduction`, ahead of the existing `first-use` setup form. It carries the supported language choice, the statement of what MissionKid is for, the `helping-11` example, the three-step account of the flow, the short parent note about setup, and one dominant forward action. The example is rendered by the very `MissionCard` component Discovery uses, with its choose action absent, so the reviewed content, the adult-involvement rule and the safety note cannot drift from what a Mission card presents. No route, router, URL, history entry, snapshot field, persisted acknowledgement, dependency or storage mechanism was added, and no back control.

**Adult involvement, as the existing rule has it.** `helping-11` is `No special adult assistance required` and carries no localized adult-involvement note, so a Mission card shows no adult-involvement line for it — and neither does the example. The internal catalog level is never rendered and no claim that supervision is unnecessary was invented to fill the space. Asserted in both directions.

**Recovery controls are not on this view.** Nothing is stored when the introduction is shown, so a reset would have nothing to act on, and a destructive control must not compete with the single forward action. The setup form it leads into keeps the control unchanged. This is an implementation choice under the presentation rules, recorded rather than left implicit.

**Two arrivals, confirmed against the implementation.** A confirmed reset and a storage retry that finds working, empty storage both resolve to the no-stored-context row and therefore to the introduction. Both follow from the row itself; neither is a new rule. The existing tests that asserted a bare form at those points now assert the introduction and then continue through it.

**Strings.** Nine keys in English, German and Russian. Four are the approved introduction copy: the heading, the supporting text, the primary action and the example label. Five are additional and are listed in the changelog for human review: a flow heading, three flow steps, and one sentence that setup is short. Three existing approved strings are reused verbatim rather than restated — the interface-language legend, the privacy sentence and the parent-responsibility sentence. All of it is proposed product copy; **no professional translation review is claimed.**

#### Verification actually run

- **Type checking, the full suite and the production build, sequentially.** `tsc --noEmit` clean; **838 tests across 23 test files passing**; the build emitted `index.html` and the content-hashed assets with no error. `git diff --check` clean, and the diff is limited to this scope.
- **Test accounting, reconciled.** The suite went from `800` at `6d2ddda` to `838`, an increase of `38`, while the record above says 37 new tests. Both figures are correct and neither test was changed to fit the other. Per-file counts from a JSON report of the baseline suite, run in a detached worktree at `6d2ddda`, against the same report on this branch: `ParentIntroduction.test.tsx` `0 → 37`, and `App.test.tsx` `15 → 16`. The extra one is not a separate test file but one more row in the existing `it.each` table of shell-view scenarios in `App.test.tsx` — the row that asserts the `introduction` view is selected and titled. No other file's count moved.
- **37 new tests** in `src/ParentIntroduction.test.tsx`, through the rendered application and the real persistence adapter: every eligibility row reaching its stated destination; the four coexisting incomplete-age cases reaching the age-context gate with the stored session, completed records and pointer untouched and no write; zero adapter **writes** while the introduction is displayed with the hydration read asserted to have occurred; the example approved for all three bands with complete content in all three languages, under the same eligibility rule Discovery applies; its reviewed content, category, duration and safety note rendered verbatim in each language; no choose control, no second Mission, no discovery heading; the first discovery set afterwards identical to the set a run that never saw the introduction derives; the no-example fallback for a narrowed approval, for incomplete reviewed content and for an absent Mission, with the rest of the view still valid; the language choice applying to the interface and to the example, carrying into setup, writing nothing, and resolving to English again on a later visit; `document.documentElement.lang` following the choice; heading order, reading order and the absence of any identifying input.
- **Existing tests that changed are behavior updates, not weakened assertions.** Cases about the setup form now take the introduction's forward action first. One focus case was restated on its own point: reaching the form from the introduction legitimately moves focus to its heading once, so the in-place save failure is now asserted to leave focus on the control the parent pressed, which is the thing that case exists to check.

#### Measured on the served production build

Chrome for Testing `148.0.7778.97`, from a real first-use arrival through the hydration path, in English, German and Russian, at `390x780`, `1280x900` and `320` px with a `32px` root. Nine configurations, all captured.

| Configuration | Page height (EN / DE / RU) | Non-content height | Horizontal overflow | Overlap | Truncation |
| --- | --- | --- | --- | --- | --- |
| `390x780` | `1731` / `1829` / `1861` px | `769` / `768` / `769` px | none | none | none |
| `1280x900` | `1532` / `1557` / `1603` px | `766` px in all three | none | none | none |
| `320` px, `32px` root | `8337` / `8101` / `8730` px | `1324` px in all three | none | none | none |

Non-content height is near-constant across languages while content height varies, which is the expected shape: the language-dependent part is content.

- **Keyboard.** Two tab stops in DOM order — the language radio group, then the forward action. The action shows the `3px #b4650c` ring; the focused language choice shows the same ring on its label at a `2px` offset. Nothing is unreachable and no positive tab index exists.
- **Touch targets.** Every interactive element at or above `52` px in every configuration: `52` px at the default root, `131` px at the `32px` root.
- **Contrast, measured on the rendered page** with every ancestor layer composited, across 22 text and control elements per configuration. Lowest ratio `5.72:1` against a `4.5:1` requirement for body text and `3:1` for large text. No element failed in any of the nine.

#### Two presentation defects found by this verification

The first was introduced by this work and is fixed in it. The second was **not**, and is not touched here.

1. **The example card clipped reviewed text at a `32px` root — fixed.** A Mission card is a grid, and a grid column's automatic minimum is its min-content width, so the card's own content was sized to the longest unbreakable word in the reviewed instruction and then clipped by the card's `overflow: hidden`. Inside the panel's padding as well, the safety note was left a text column two pixels wide. Both are fixed for the example: the card's column names its minimum, and below the width where Discovery already gives its own Mission cards the panel's full measure the example takes the same measure. Re-measured: nothing clips at either configuration, and the safety note reads in whole words.

   > **Correction, 2026-09-23.** The last sentence above is withdrawn as written. That re-measurement was taken **in English only**, and the claim does not hold for the other two languages. Measured afterwards on the same build, the example card at `320` CSS px with a `32px` root still clipped **5 elements in German** — Mission Category, title, reviewed instruction, safety label and safety note, the worst losing `163.4` px from the right — and **5 in Russian**, the worst losing `58.9` px. English was clean, which is why the single-language check passed. The cause was the second grid layer: `.mission-card` had its column minimum named, but `.mission-card__content` inside it did not, so the text column was still sized to its own longest word and escaped the card that clips it. The bounded Task 3 correction below names the minimum on both layers and resolves the introduction as well: **0 clipped elements in all three languages**, re-measured on the built page.
2. **Discovery clips reviewed safety guidance at `320` px with a `32px` root — pre-existing, reported, not fixed here.** Measured on this same build on the unchanged Discovery view: the card's content box is `322.5` px inside a `252` px card, so roughly `70` px is cut from the right of every line and the safety note loses its last characters on most lines. This is present at `6d2ddda` and is not caused by this work. **It is a content-truncation defect against the visual specification's rule that safety guidance must not be truncated**, and it belongs to Task 3, which owns the Discovery cards. It is recorded here so that task inherits it rather than rediscovering it.

Two further pre-existing observations at `320` px with a `32px` root, both on the unchanged setup form and both for Task 5: the page scrolls horizontally by `14` px from the age and language choices, and the view title wraps across four lines. Neither is introduced or changed here.

#### Recorded limitations

- This is automation in one engine against one build. It is **not** human visual acceptance, which is what this batch now stops for.
- No assistive technology was run, so no screen-reader behavior is claimed beyond the semantics asserted in the tests.
- No real phone, no Safari, no Firefox. This repository has no CI, so none of these checks is a CI result.
- The introduction copy is proposed product copy. **No professional translation review is claimed**, and whether the German and Russian strings need review by a speaker before release remains the open release decision recorded below.
- At `320` px with a `32px` root the language names break across lines inside their own boxes. That is the same remedy the choice-group legend already uses at that size, and it was chosen over the alternatives, which were horizontal page scrolling or text escaping its box.

### Task 3 — Discovery: mobile comparison and reading density

**Outcome.** Every card keeps its localized title, localized short instruction, Mission Category, expected duration and any required adult-involvement and safety wording, complete and untruncated, with safety visible and not behind disclosure. Non-content card height at narrow widths falls and the set span falls with it, by a measured amount. The three Missions stay equal peers. No catalog text changes. No horizontal scroll, carousel, swipe or feed behavior is introduced, and vertical scrolling at increased text sizes is unchanged.

**Trace.** `F002` *Mission card content*, criteria `1`, `4`, `7`; Visual & Ergonomic *F002 — Exactly-three Mission suggestions*, *Mobile-first and responsive presentation*, scene accessibility and performance rules, criteria `7` and `21`–`23`.

**Verification.** The before-and-after measurement on two served builds, EN/DE/RU at `390x780` and `320`px/`32px`, reporting card heights and set span, with the result stated as a measured number. Assertions that every required field is present and untruncated on all three cards in all three languages. The existing `F002` suite unchanged. Scene rendering checked against the reduced-motion and performance rules. The record must state plainly what the change did and did not achieve, including that two Missions remain non-co-visible on a phone.

#### Task 3, bounded part — the reproduced clipping defect, done

**This is one authorized part of Task 3 and not its completion.** Everything else in Task 3 above — the scene-window height, the card chrome, the vertical rhythm and the measured reduction in set span — is untouched and still unauthorized.

**The defect, reproduced against the pre-change build.** The pre-change `dist` was kept and served for this, so the reproduction is against the build that shipped Tasks 1 and 2, not against a description of it. At `320` CSS px with a `32px` root, on the *Helping at Home* set for age `7–8`:

| Language | Clipped elements | Content box vs card | Worst right-hand loss |
| --- | --- | --- | --- |
| English | `13` | `322.5` px inside a `252` px card | `33.7` px on a safety note |
| German | `19` | `367.5` px inside `252` px | `78.7` px on an adult-involvement note |
| Russian | `20` | `336.1` px inside `252` px | `63` px on a safety note |

The clipped elements were the Mission Category, the Mission title, the **reviewed instruction**, the **adult-involvement note and its label**, the **safety note and its label**, and the choose control — on all three cards. **`document.scrollWidth` reported zero horizontal overflow in every one of these cases**, which is why the page-level check used in earlier passes could not see it: the clipping happens inside the card, against `overflow: hidden`, not against the viewport.

**Cause.** A grid column's automatic minimum is its min-content width. Neither `.mission-card` nor `.mission-card__content` named a minimum, so each was sized to its own longest unbreakable word and then cut off by the card's `overflow: hidden`. Both layers had to be corrected: naming the minimum on the card alone moved the content box to `252` px but left the notes overflowing by exactly the same amount, which the second measurement caught.

**The change.** Two declarations. `grid-template-columns: minmax(0, 1fr)` on `.mission-card` and on `.mission-card__content`. The equivalent scoped declaration added for the introduction's example under Task 1 is removed, because the rule on `.mission-card` now covers every Mission card. Nothing else changed: no text, no font size, no line height, no padding, no margin, no scene, no control, no markup.

**Verified on the served build**, EN/DE/RU at the failing configuration and at `390x780` and `1280x900`, measuring each text element's bounds against **every ancestor that can clip it** rather than against page `scrollWidth`:

| Configuration | Clipped elements, before → after | Everything else |
| --- | --- | --- |
| `320` px / `32px` root, EN | `13 → 0` | — |
| `320` px / `32px` root, DE | `19 → 0` | — |
| `320` px / `32px` root, RU | `20 → 0` | — |
| `390x780`, all three | `0 → 0` | Content width, note width, card height and set span **identical to the pixel** |
| `1280x900`, all three | `0 → 0` | **Identical to the pixel** |

Also asserted unchanged across all nine: instruction `font-size` and `line-height` identical everywhere; scene element counts identical on every card; three cards of equal width in every set; three choose controls and eleven focusable elements; and no page horizontal overflow anywhere. The choose control was measured separately and sits `36.8` px inside the card, does not overflow its own box, keeps its `32px` label and wraps it, identically on all three cards.

**The introduction was corrected by the same change**, which is how the English-only verification recorded above was caught. Its example card went from `0 / 5 / 5` clipped elements in EN/DE/RU to `0 / 0 / 0`. The introduction at `390x780` and `1280x900` is identical in every measured respect, so the Tasks 1–2 captures at those two configurations still describe what ships; the `320` px / `32px` Russian capture genuinely changed and was retaken.

**What this cost, stated plainly.** At the failing configuration the cards are taller, because text that was previously cut off is now shown. The set span goes from `8141` to `10881` px in English, `7954` to `12546` px in German and `8253` to `13772` px in Russian. That is complete content replacing truncated content, and ordinary vertical scrolling at an increased text size is an accepted outcome; it is not a reduction in height and it is not the height work Task 3 still owns.

**Residual, recorded and not fixed here.** At a `32px` root the note's horizontal padding is `rem`-based and takes `96` px, leaving an `82` px text column, so long words — German compounds especially — break across lines. That is a spacing matter belonging to the rest of Task 3 and is outside this authorization.

**Regression check.** `src/MissionSuggestionSet.test.tsx` gains two tests. jsdom has no layout engine, so the failure cannot be asserted by rendering; these are stylesheet invariants that encode the **cause** rather than the symptom — that the card clips, and that every grid layer inside the Mission card names a zero column minimum, with the set of such layers pinned so a new one cannot be added without it. The check was proven to bite rather than trusted: removing the minimum from `.mission-card__content` fails it, and the declaration was restored afterwards. The rendered proof remains the browser measurement above.

#### Three bounded ergonomic improvements — outcome, at `ea77864`

Implemented together. Measured on two served builds — `015dc3c` before, `ea77864` after — in English, German and Russian at `390x780`, `1280x900` and `320` CSS px with a `32px` root. Bounds were taken against every ancestor that can clip, not against page `scrollWidth`.

**1. Introduction desktop composition (Task 1).** The example Mission sits beside a column carrying the flow explanation, the setup, privacy and responsibility context and the single setup action. A wrapper was added for placement alone: document order is unchanged — lead, example, flow, parent note, action — so the reading order the specification requires on a narrow screen is the order in both layouts. The threshold is the content's own measure, both column bases being in `rem`, so a reader who enlarges text gets one column at any viewport width; the `320` px / `32px` captures confirm one column. Exactly one primary action is rendered, once, in all nine configurations, with no duplication, sticky positioning or overlay. Desktop page height falls from `1532` / `1557` / `1603` px to `1115` / `1140` / `1186` px.

**2. Narrow-screen spacing (Task 3 spacing portion, and Task 1 for the shared card).** Horizontal padding on `.mission-card__content`, on `.mission-card__note` and on the language controls now carries a ceiling measured against the column it sits in. The note's left padding is derived from the same inset as the mark it clears, so the two cannot drift apart, and at an ordinary root size the derived value is exactly the `2.15rem` it replaces. Measured reading width at `320` px / `32px`, identical in all three languages:

| | Before | After |
| --- | --- | --- |
| Discovery Mission instruction | `178` px | `222` px |
| Discovery safety note | `82` px | `160` px |
| Introduction example safety note | `82` px | `160` px |
| Language names | `2`–`3` lines each | `1` line each |

At `390x780` and `1280x900` **every reading width is identical to before** — instruction `317` / `280` px, note `269` / `232` px — because each ceiling sits above the `rem` value at ordinary sizes and never applies. Useful separation is kept: the note retains its tint panel, its rounded edge, its mark and its gap from the instruction above.

Two dead ends are recorded rather than hidden. A percentage width on the language radio resolved against the item's own box and gave the three radios three different sizes, `12.8` / `14.5` / `15.1` px; it was replaced with a ceiling that does not depend on flex sizing, and all three now measure `19.2` px. The `overflow-wrap: anywhere` guard added under Task 1 was keeping the names broken across lines once the padding no longer forced it; it was replaced with a `min-content` floor, and the names now occupy one line each.

**3. `introduction.flow.step2` (Task 2).** Updated in all three languages to say that the family starts the Mission deliberately before leaving the screen, using each language's existing Start action wording — `Start mission`, `Mission starten`, `Начать миссию`. It explains behavior `F003` already owns and adds no step, control or operation.

**Guards, across all nine configurations:** no clipping against any ancestor; no page horizontal overflow; zero contrast failures with a minimum ratio of `5.72:1`; touch targets unchanged at `52` px and above; focus order unchanged — the language group, then the one action; and instruction, note, lead and step typography identical before and after.

**Gates.** Type checking, the full suite and the production build run sequentially, all passing: `tsc --noEmit` clean, **840 tests across 23 test files**, clean build. `git diff --check` clean.

**Residual, unchanged by this work.** At a `32px` root the German compound *unzerbrechliche* is still wider than the column and breaks across two lines. No spacing change fits a `250` px word into a `160` px column without shrinking the type, which is out of scope.

**Task 3 is still not complete.** Its clipping defect and its spacing portion are done. Its remaining obligations — the measured reduction in card height and set span at narrow widths, and the record naming what that change did and did not achieve — are untouched and still unauthorized, as are Tasks 4, 5 and 6. Ready, active, settings, the Reward Card and Mission History are unchanged.

### Task 4 — Remove unnecessary non-content height on the ready and active views

> **Superseded criteria, 2026-09-28.** The height target below is kept as the historical record and is **superseded rather than achieved**. Task 4 is now judged on the six criteria under the *Ninth authorization*, Decision 1, which also records which of these baselines still reproduce.

**Outcome.** Measured non-content height falls on both views in all three languages, from a baseline of `463`–`487` px on ready and `374`–`397` px on active at `390x780`, by removing excessive spacing while useful separation and touch-target space stay. Content is preserved on all four terms: complete wording, readable typography, required guidance, semantic order. A content height that falls through legitimate reflow is an acceptable outcome and is reported as such rather than treated as a shortfall. **No whitespace is added to any language to make it resemble another, no text is shrunk, nothing is clipped, and no safety content is reordered.** Remaining language-dependent height differences are the expected outcome. The lifecycle, deliberate start, exactly-once completion, timer derivation, leave paths and confirmations are untouched.

**Trace.** `F003`; Visual & Ergonomic *F003 — Ready Mission presentation*, *Mission Break transition and active presentation*, *Action hierarchy*, *Localization resilience*, criteria `8` and `9`.

**Verification.** The page/content/non-content measurement in all three languages at `390x780` and `320`px/`32px`, before and after, taken by the method above and reported as context. The verdict comes from the direct checks: every required string present and rendered in full; computed `font-size` and `line-height` unchanged or better on every changed text element; safety and adult-involvement text present, outside any disclosure and unmoved in document order; heading order unchanged; one dominant primary action with secondary and exit actions subordinate and available; focus order and visible focus unchanged; every interactive element at or above `52` px; and no overlap or horizontal overflow. Where content height falls, the record states which reflow produced it. The existing `F003` suite unchanged, including exactly-once start and completion. Timer live-region behavior re-checked.

### Task 5 — Remove unnecessary non-content height on the settings view

> **Superseded criteria, 2026-09-28.** As for Task 4: the `725` px target below is kept as the historical record, superseded rather than achieved, and Task 5 is judged on the six criteria under the *Ninth authorization*, Decision 1.

**Outcome.** Measured non-content height falls from its `725` px baseline in all three languages, by removing excessive spacing while useful separation and touch-target space stay. Content is preserved on the same four terms: both effect explanations and both parent notes keep their complete wording, their current type size and line height, their visibility outside any disclosure, and their place in the reading order. A content height that falls through legitimate reflow is acceptable and is reported with the reflow that produced it. The same prohibitions as Task 4 apply — no added whitespace, no smaller text, no clipping, no reordered safety or consequence content.

**Trace.** `F001` *Changing setup later*, criteria `6` and `7`; Visual & Ergonomic *F001 — Setup and localization presentation*, *Action hierarchy*.

**Verification.** The page/content/non-content measurement in all three languages before and after, by the method above and reported as context. The verdict comes from the direct checks: the language-effect and age-effect sentences and both parent notes present and rendered in full; computed `font-size` and `line-height` unchanged or better; document order unchanged; the save action still the single dominant one; focus order across the nine focusable elements and visible focus unchanged; every interactive element at or above `52` px; and no overlap or horizontal overflow. Tests asserting a `ready` or `active` session, every completed record and Monthly Goal progress are unchanged by an age-band change.

### Task 6 — Consistency and full verification

**Outcome.** The introduction, Discovery, ready, active, Reward Card, History and settings read as one visual language. **The Reward Card and Mission History presentation are unchanged.** No unrelated change enters the diff.

**Trace.** Visual & Ergonomic *Visual consistency without a design system*, *Accessibility baseline*, *Anti-manipulation visual rules*, *Ergonomic review method*.

**Verification.** Type checking, the full suite and the production build run sequentially; the whole branch diff inspected against `main`; `git diff --check`. Across EN/DE/RU at `390x780`, `1280x900` and `320`px/`32px`, against the five judging criteria used throughout this plan: excessive spacing removed with useful separation and touch-target space intact; one dominant primary action per view with secondary and exit actions subordinate; complete readable content with no truncation, clipping or disclosed safety guidance; keyboard access with unchanged focus order, visible focus on every interactive element and touch targets at or above `52` px; and no overlap or horizontal overflow. Reduced motion respected and heading and reading order intact on every changed view. Language-dependent page heights and ordinary vertical scrolling, at default and increased text sizes, are recorded as acceptable outcomes rather than as findings. Contrast measured on the rendered page for every changed text element, as the Reward Card follow-up did.

## Discovery visual direction — fourth authorization

Recorded on 2026-09-23, before implementation. A visual reference for Mission Discovery, desktop and mobile, was supplied and the direction approved. **This authorizes a bounded visual implementation of the Discovery suggestion screen as the first reference screen, and nothing else.** Human visual acceptance of everything built under this plan remains outstanding.

**Authorized.** Warm cream and restrained forest-green surfaces; confident typography at a comfortable reading measure; three equally weighted Mission cards on desktop and a readable vertical sequence on mobile; larger, more expressive Mission imagery with material, light and depth; clear separation of instruction, safety guidance and the choose action; a subordinate `Another set`; a quiet background that supports text rather than competing with the Missions. Asset improvement for **three Missions only**.

**The three Missions, resolved from the repository rather than from the picture.** The reference depicts the tower, the sock friend and the friendly monster. Those are `creativity-02`, `creativity-05` and `creativity-10`, and they are already the real deterministic first set for *Creativity* at age bands `4–6` and `7–8`, by their own `catalogOrder` of `10`, `30` and `50`. **Nothing is pinned and no fixture is needed for the comparison**: the production application reaches this set through the ordinary eligibility and ordering rules.

**The reference is a visual reference, not a source of product rules.** No wording, duration, eligibility or safety detail is taken from it. Its Russian headings, its subheading and its header controls are not implemented, because copy and navigation are not what was authorized. One generated inaccuracy is recorded so it cannot leak in later: the picture labels the monster Mission *about 3 min*, while the catalog says `300` seconds, and the application shows the catalog value.

**Not authorized:** regenerating the other 51 scenes; changing any reviewed Mission text, duration, eligibility, adult-involvement level or safety guidance; pinning these three Missions; changing selection, bounded progression, persistence, localization or accessibility behavior; new copy; new navigation; any other view; a new dependency; and Tasks 4, 5 and 6.

### Specification check, performed before code

The instruction required the smallest explicit amendment wherever the Visual & Ergonomic Specification forbids the newly authorized asset treatment, and forbade silently reinterpreting the existing scene-replacement restriction. Checked clause by clause; the result is that **the specification forbids none of it, so no specification amendment is made.** What is amended is this plan.

| Clause | Finding |
| --- | --- |
| *Controlled Mission Mini-World scene system* — rendering technology | Already permits "SVG, CSS, lightweight raster assets, or controlled static rendered imagery, in any combination". Richer bespoke scenes need no amendment. |
| *Scene style* | Already asks for "semi-realistic or stylized three-dimensional or two-and-a-half-dimensional form, a miniature-diorama sense of place, recognizable real-world subjects, depth, light, material, atmosphere, and tactile form". The direction moves toward this clause, not away from it. |
| *Scene composition* — one consistent grammar | The new scenes are built from the existing grammar and its layer vocabulary rather than beside it, so the three are executed at higher fidelity within the same system. |
| Mission-specific compositions | Already authorized explicitly, both in the scene system and in the non-goals list. |
| Palette | Deliberately open: the specification records that "No final palette or exact color token is selected here" and lists an exact final palette among its non-goals. Cream and forest green need no amendment. |
| Three scenes are peers | Held: all three Missions in this set are improved together, so none is made to look recommended. Across the catalog the other 51 keep the current grammar, which is recorded as a limitation rather than a claim. |
| Scene authority limits, accessibility, reduced motion, localization, performance | Unchanged and binding. Scenes stay decorative to assistive technology, carry no text, and no Mission meaning depends on one rendering. |

**The one restriction that genuinely blocked this was in this plan, not in the specification**, and it is amended explicitly above rather than reinterpreted: *Boundaries* previously forbade replacing any of the 54 reviewed scenes. It now forbids replacing any of them **except** `creativity-02`, `creativity-05` and `creativity-10`.

### Focused revalidation

Scope: the scene system and the clauses adjacent to the authorized change. This is a focused revalidation of one presentation change, not a repeat of the foundation audit.

| Check | Result |
| --- | --- |
| User Story / traceability | Passed. No story changes. `P3`, `P4` and `C1` describe Discovery behavior, and no behavior changes: eligibility, deterministic ordering, exactly-three presentation, selection, bounded progression and persistence are untouched. |
| No behavior reached by a presentation change | Passed. `F002`'s eligibility and ordering rules, the `selected → ready → active → completed` lifecycle and the confirmed-write contract are not touched by a palette, a layout or a scene. |
| Reviewed content preserved | Passed. Every card keeps its localized title, instruction, Mission Category, duration and required safety guidance as complete visible text. No catalog entry changes. |
| Equal peers | Passed within the set: all three cards receive the same treatment, and no card gains a control, a badge, a rank or extra prominence. |
| Anti-manipulation rules | Passed. No rating, count, popularity, urgency, scarcity, streak or collectible pattern is introduced, and no card is visually recommended. |
| Accessibility baseline | Passed by construction and re-measured after implementation: scenes stay `aria-hidden`, text stays authoritative, focus order and visible focus are unchanged, touch targets stay at or above `52` px and contrast is measured on the rendered page. |
| Runtime AI-generated imagery | Not used. Every asset is authored, bundled product content, as the specification requires. |
| External assets | None. No image is hotlinked; the scenes are bundled with the application. |

**Blockers: none. Unresolved contradictions: none.**

### Discovery visual direction — outcome, at `9de0401`

**The surface.** The page behind Mission Discovery goes warm with the panel, so the cards sit on one continuous cream ground rather than on a cool page carrying a warm panel. It is scoped to this view with `:has([data-view='discovery-categories'])`; no other surface changes. The ground stays one soft wash, with no pattern and no edge competing with a card.

**The cards.** The Mission image window goes from `20 / 11` to `3 / 2`, and the frame shows a taller crop of the same `200x110` stage, so the image gains presence without redrawing any of the other 51 compositions. A card now reads in three layers: the instruction at a `42ch` measure, the safety guidance in its own panel, and the choose action below a hairline at the foot of the card. On desktop the three cards share a height and their actions sit on one line; on mobile and at enlarged text they stay a readable vertical sequence. `Another set` becomes a subordinate outlined pill.

**The scenes.** `creativity-02`, `creativity-05` and `creativity-10` get richer compositions built from the existing grammar rather than beside it — environment, subject, directional light, contact shadow — each object in its own material: kraft board and paper cups, a knitted sock, wax crayon. They are authored SVG bundled with the application. Nothing is fetched, nothing is generated at runtime, and no image carries text.

**The card's content column became a flex column** so the action can sit at the foot of a card taller than its own text. The clipping invariant test was restated to cover both layout mechanisms and to pin the set of layout layers, distinguishing the two that carry the text column from `.mission-card__meta`, which sizes to the column rather than the column to it. It was proven to fail when the flex layer's minimum is removed.

**Verified on the production build**, English, German and Russian at `390x780`, `1280x900` and `320` CSS px with a `32px` root, reached through the ordinary flow rather than seeded:

| Check | Result |
| --- | --- |
| Clipping against every ancestor | `0` in all nine |
| Page horizontal overflow | none in all nine |
| Contrast, composited | minimum `7.17:1`, zero failures; higher than the `5.72:1` before this pass |
| Touch targets | `52` px, and `138.4` px at enlarged text |
| Three cards, equal width | yes in all nine; equal height and one action line on desktop |
| Scenes decorative | every scene `aria-hidden`, **zero text inside any image** |
| Assets | no `<img>`, no external URL, no failed request in any configuration |
| Reference set reached without pinning | yes — `creativity-02`, `creativity-05`, `creativity-10` |

**Gates.** `tsc --noEmit` clean, **840 tests across 23 test files**, clean production build, `git diff --check` clean.

**One unexplained test failure is recorded rather than explained away.** The first gate run reported `1 failed | 839 passed`. The command that produced it truncated the failing test's name, so the name was not retained, and that is a gap in this verification. Four consecutive full runs afterwards were clean at `840 passed`. **Cause unknown, not reproduced, not attributed**, and passing on re-run does not identify one.

### What does not match the reference, stated plainly

- **The imagery is illustration, not photography.** The reference uses photographic images. This implementation cannot produce photographic assets: none was generated, none is fetched, and the specification forbids runtime-generated imagery regardless. What is there is hand-authored SVG upgraded within the existing scene grammar. It is a real step toward the reference's warmth and depth and it is **not** its photographic look. **No visual fidelity to the reference's imagery is claimed.** Closing that gap requires photographic or rendered assets to be supplied and content-reviewed, and two clauses will apply to them: imagery must avoid signalling housing, resources or family structure, and must stay globally recognizable rather than tied to one household type. The reference's styled interior, rug, plants and knitted throw are exactly what those clauses address, so that review is a real one and not a formality.
- **Only three Missions were improved**, as authorized. The other 51 keep the current grammar, so other Mission Category sets look less rich until they are done. Within this set all three are improved equally, so no card is made to look recommended.
- **Copy and navigation are unchanged.** The reference's Russian headings, its subheading and its header icons are not implemented, because wording and navigation were not authorized. The section heading still reads *Three Missions* and the category chooser above the set is untouched.

### Reviewed Mission stills — inspection and integration, at `b3a6400`

Three stills were proposed for the three Missions of the authorized visual pass, generated before deployment and supplied as files. Integrating bundled static files introduces no runtime image generation, no service, no external request and no product feature, so this stays inside the existing authorization. **Each was inspected against its own reviewed instruction, its safety note and the Visual & Ergonomic Specification before integration, and no catalog content was changed to accommodate any image.**

| Mission | Proposed still | Verdict |
| --- | --- | --- |
| `creativity-02` *Tallest Tower* | Kraft boxes and lilac plastic cups stacked on a plain surface | **Integrated** |
| `creativity-10` *The Kind Monster* | A fluffy purple crayon monster with a big smile, beside two wax crayons | **Integrated** |
| `creativity-05` *Sock Friend* | A yellow knitted hand covering, raised, forming an open mouth | **Not integrated — concrete conflict.** This verdict on this image stands; a different replacement image was later inspected and integrated, recorded below. |

**`creativity-02`.** The instruction names "light, unbreakable things like plastic cups, blocks or small boxes"; the still shows two of those three materials and a tower standing on its own. No child, no text, no interior décor. *One ambiguity is recorded rather than smoothed over:* the safety note says "Build on the floor", and the still's surface is a plain pale plane meeting a plain wall with no table edge, leg or furniture visible. It reads as a floor against a wall and cannot be read as clearly contradicting the note, but it does not positively establish a floor either. That is a judgement for the content reviewer, and it is flagged rather than decided here.

**`creativity-10`.** The strongest match of the three. The instruction offers "maybe fluffy, maybe with a big smile" and the still has both; the safety note requires "a sheet of paper and a pencil or crayons" and the still shows exactly paper and wax crayons. No text inside the image, no child, nothing frightening.

**`creativity-05` — the conflict, stated concretely.** The instruction is "Put a **clean sock** on your hand and turn it into a sock friend." The still shows a **knitted mitten**: the thumb is a separately knitted compartment with its own ribbing and a finished tip, and the cuff is a ribbed mitten cuff worn over a sleeve. A sock has no thumb compartment. The Visual & Ergonomic Specification requires that a scene "must not depict, imply, or make attractive an action the Mission does not instruct", and a mitten is a different object from the one the Mission instructs. **The catalog was not altered to fit the image**, which the authorization explicitly forbids, so `creativity-05` keeps the authored scene and the still is left for the reviewer to replace or reclassify.

**How they are integrated.** Presentation only, keyed by the stable Mission identifier: no catalog field, no persisted value, no snapshot data, and a Mission with no entry renders its authored scene exactly as before. The sources are `1536x1024`, which is `3:2`, and the card window is already `3:2`, so **nothing is cropped** — the tower keeps its base and its top, and the drawing keeps its crayons. Each is emitted by the existing build as a fingerprinted local asset at `49 kB` and `113 kB`; nothing is fetched from another origin.

**Verified on the production build**, English, German and Russian at `390x780`, `1280x900` and `320` CSS px with a `32px` root:

| Check | Result |
| --- | --- |
| Both stills present and decoded | yes in all nine, natural size `1000x666` |
| Decorative to assistive technology | `alt=""` and `aria-hidden` on every one; **no element exposes the `img` role anywhere** |
| Space reserved before the file arrives | intrinsic `width` and `height` on every image, plus the window's own `aspect-ratio` |
| Rendered box | `317.2x211.5` desktop, `354x236` mobile, `252x168` enlarged — `3:2` throughout |
| External requests | none; no failed request in any configuration |
| Clipping, overflow, contrast, targets | `0` clipped, no horizontal overflow, minimum contrast `7.17:1`, targets `52` px and `138.4` px enlarged |
| Text independent of imagery | every reviewed title, instruction, category, duration and safety note present as text, asserted in tests |

**Regression checks added:** that the map covers exactly the two authorized Missions and that both are reviewed and discovery-eligible; that a still is decoration while every reviewed field stays present as text and a Mission without one keeps its authored scene; and that the set still comes from `catalogOrder` `10`, `30`, `50` rather than from which Mission has a picture.

**Gates**, with full output captured to files before being summarized: `tsc --noEmit` clean, **843 tests across 23 test files**, clean production build, `git diff --check` clean. A second full run was also clean at `843`. No failure occurred in this pass, so no failure output was retained.

**Remaining differences from the supplied reference.** Two of three cards now carry photographic stills and the third carries an authored SVG scene, so **the set is visibly mixed in this pass** — that is the honest cost of not forcing an unsuitable image in. (That mixture was resolved later by the replacement still recorded below; it was true of this pass.) Copy and navigation remain unchanged, the other 51 scenes are untouched, and the reference's styled interiors, rug, plants and knitted throw are deliberately absent: the integrated stills sit on plain surfaces, which keeps them clear of the clauses on housing, resources and household type.

### Replacement `creativity-05` still — inspection and integration, at `cc3c07f`

A replacement still for `creativity-05` was supplied on 2026-09-24. **The rejection above is unchanged and was not reinterpreted**: that mitten image remains rejected on its recorded grounds. This is a separate inspection of a different file, under the same authorization, and it changes no catalog content and no eligibility.

**Image inspection — passed.** The replacement was examined at magnification on the exact feature the rejection turned on. The object is one continuous tube: a closed, rounded toe carrying its linking seam, a heel turn, and a single ribbed leg cuff worn over a plain sleeve. **No separately knitted thumb compartment with its own ribbing and finished tip is present anywhere in the frame**, which is what made the previous image a mitten. The object the instruction names and the object the image shows are the same object.

| Clause | Outcome |
| --- | --- |
| Depicts only what the Mission instructs | Passed. A clean sock on a raised hand is exactly the instructed setup. The sock is undecorated, which matters: the instruction asks for a name and a voice, not for marking or drawing on the sock, so a plain sock avoids implying an uninstructed action. |
| Consistent with the safety note | Passed. The note requires keeping the sock away from face and mouth; the sock is held clear and **no face appears in the frame at all**. |
| No text inside the image | Passed. |
| No recognizable real child, no implied photo or video capture | Passed. No face, no hand skin, no identifying feature. |
| Housing, resources, family structure | Passed. A plain pale ground with no interior, décor or furnishing; no household signal of any kind. |
| Globally recognizable, not tied to one household type | Passed. A plain knitted sock. |
| One hero object, nothing frightening | Passed. One focal subject, no competing object. |

**One observation recorded rather than decided.** A forearm in a plain sleeve is visible. No recognizable person is depicted, so no clause is engaged, but it is flagged for the content reviewer in the same way the `creativity-02` floor ambiguity was rather than treated as settled.

**How it is integrated.** The same local static-asset path as `creativity-02` and `creativity-10`: presentation only, keyed by the stable Mission identifier, no catalog field, no persisted value, no snapshot data. The source is `1536x1024`, which is `3:2`, and the window is already `3:2`, so **nothing is cropped** and the complete subject is preserved from toe to cuff. It is bundled at the reviewed dimensions of `1000x666`, matching the other two, and emitted by the build as a fingerprinted local asset of `105 kB`. The authored `creativity-05` scene definition stays in place exactly as the other two integrated Missions' definitions did.

**Verified on the production build**, English, German and Russian at `1280x900`, `390x780` and `320` CSS px with a `32px` root, reached through the ordinary flow rather than seeded:

| Check | Result |
| --- | --- |
| Replacement present and decoded | yes in all nine; `decode()` resolved, natural size `1000x666`, served `200` |
| Rendered box | `317.2x211.5` desktop, `354x236` mobile, `252x168` enlarged — `3:2` throughout, identical to the two already recorded |
| Decorative to assistive technology | `alt=""` and `aria-hidden`; **no element exposes the `img` role anywhere** |
| Space reserved before the file arrives | intrinsic `width` and `height` present, plus the window's own `aspect-ratio` |
| Three cards, equal width | yes in all nine; equal height and one action line on desktop |
| Clipping and overflow | `0` clipped elements, no page horizontal overflow, in all nine |
| Requests | `0` external, `0` failed, in all nine |
| Text independent of imagery | every reviewed title, instruction, Mission Category, duration and safety note present as text in all three languages |
| Enlarged text | at a `32px` root the window holds `3:2` at `252x168`, text reflows and scrolls normally, `0` clipped, touch target `178.4` px |

**A screenshot artifact is recorded rather than passed off as a result.** The first full-page mobile capture showed the second and third cards as empty category washes. That was the capture path, not the product: on the same page all three images reported `complete`, `decode()` resolved for each, and all three were served `200` with no failed request, and a screenshot of the real viewport scrolled to the card shows the still rendered correctly. The delivered mobile screenshot was recaptured after scrolling the page so the compositor rasterizes every region.

**Regression coverage was preserved rather than dropped.** The scope test now pins all three authorized Missions. The fallback assertion that a Mission without a still keeps its authored scene was **moved to a Movement set** instead of being deleted, because all three Creativity cards now carry stills.

**Gates.** `tsc --noEmit` clean, **844 tests across 23 test files** (one test added), clean production build, `git diff --check` clean.

**Ergonomic outcome.** The set now reads as one consistent family, and the mixed appearance recorded in the previous pass is resolved. All three cards remain equal peers: same window, same treatment, no badge, rank or extra prominence. No further change was made, because none was needed.

**Image inspection is not human visual acceptance.** This records inspection against the content rules and integration. Human visual acceptance of this still, and of everything built under this plan, remains outstanding.

### Discovery category selector — fifth authorization

Authorized on 2026-09-24 within this plan: one bounded ergonomic improvement making the Mission Category selector more compact, especially on mobile, while keeping the choice clear and the interaction comfortable. **It authorizes nothing else.** Tasks 4, 5 and 6 remain unauthorized, the rest of Task 3 is unchanged, no general redesign is authorized, and no other view is touched.

**A process deviation is recorded rather than hidden.** The instruction was to record this authorization before implementation. It was written after the implementation and its verification, so the plan did not carry the authorization while the work was done. The scope below is the scope that was actually worked to, not a scope written to fit the result.

Kept, and verified rather than assumed: all five categories visible and directly selectable; full localized labels, age context, legend and explanatory help; a selected state that does not rest on colour alone; the existing radio-group semantics, keyboard behaviour, focus visibility and touch-target minimum; readable type and ordinary vertical scrolling at enlarged text. Excluded and not built: a dropdown, a collapsed section, a horizontal carousel, icon-only controls, hidden labels, sticky controls, new copy, new navigation, and any automatic scroll or focus move after selection.

### Discovery category selector — outcome, at `c067eaa`

**The change is one stylesheet file.** The selector was a single-column grid of five `4.75rem` controls on narrow screens and five `12.5rem` columns on wide ones. It is now one wrapping group of controls with a `3.25rem` minimum, so how many share a row is left to the viewport. No markup, no component, no state, no copy and no localization changed.

**Two defects were found by measurement and fixed; both are recorded because neither was visible from the code.**

1. **Pre-existing label clipping at enlarged text.** The selected-state cue reserved a fixed `min-width: 5.5rem`, which at a `32px` root is `176` px inside a `170` px control that clips its own overflow. The labels were being cut off on the served build: at `320` CSS px *Bewegung* rendered as *Be*, *Kreativität* as *Kr*, and *Zu Hause helfen* as *Zu Ha*, with `10` clipped elements per language before selection and `12` after. This was present before this work and is now `0` in all nine configurations.
2. **A regression introduced and then removed during this work.** Sizing the flex line from content made the group rewrap and reorder the moment a category was chosen, because only the selected control gains the cue: on desktop one row became two in English and German and three in Russian, with controls changing places. The controls now take a definite basis that depends on neither the label nor the selection, and the group is measured stable.

**Before and after, measured on the production build** in English, German and Russian, reached through the ordinary flow rather than seeded. Category group is the fieldset; controls is the wrapping group inside it; first Mission is the top of the first suggestion card once a category is chosen.

| Configuration | Controls | Category group | First Mission | Rows | Clipped |
| --- | --- | --- | --- | --- | --- |
| `390x780` EN / DE | `428` → `232` px (**−45.9%**) | `522` → `326` px | `847` → `673` px | `5` → `3` | `0` → `0` |
| `390x780` RU | `428` → `253` px (**−41.0%**) | `522` → `346` px | `847` → `699` px | `5` → `3` | `0` → `0` |
| `1280x900` EN / DE / RU | `200` → `86` px (**−56.8%**) | `269` → `155` px | `626` → `514` px | `1` → `1` | `0` → `0` |
| `320` px @ `32px` root EN | `897` → `1085` px (**+21.0%**) | `1376` → `1565` px | `2310` → `2587` px | `5` → `5` | **`10` → `0`** |
| `320` px @ `32px` root DE | `897` → `1044` px (**+16.4%**) | `1475` → `1622` px | `2474` → `2741` px | `5` → `5` | **`10` → `0`** |
| `320` px @ `32px` root RU | `856` → `1138` px (**+32.9%**) | `1435` → `1717` px | `2368` → `2770` px | `5` → `5` | **`10` → `0`** |

**The enlarged-text configuration got taller, and that is the honest cost of the fix.** Its labels were previously cut off; showing them in full takes the height the text actually needs. Height was not the goal there and was not traded against readability: clipping went from `10` elements per language to `0`. Reduced height was achieved where the labels already fitted — mobile and desktop.

**Verified in all nine configurations:** five radio controls with unchanged semantics, correct `name`, none disabled and no `tabindex` override; document order still Movement, Creativity, Helping at Home, Learning, Calm, and the wrap reads in that order; arrow keys move through all five; the focus ring is unchanged at `solid 3px #b4650c` with `3px` offset; the legend, the help text and the age context stay visible; every label is present and complete; minimum touch target `52` px on mobile, `86.4` px on desktop and `151` px at enlarged text; no page horizontal overflow; and **no clipping against any ancestor**, checked by walking each element's clipping ancestors rather than by reading `document.scrollWidth`.

**Layout stability on selection was measured, not assumed.** Every control's `x` and width and the whole row grouping are identical before and after a category is chosen, in all nine configurations. Selecting a category and then changing it moves neither scroll position nor focus: `scrollY` stayed `0` and the active element was unchanged across both.

**All five categories still produce their own correct set:** each selection yields exactly three cards, all of the selected Mission Category, with that category checked — in all three languages and all three configurations.

**The Mission cards are untouched**, confirmed rather than assumed: three cards, three stills, rendered `317.2x211.5` desktop, `354x236` mobile and `252x168` at enlarged text — `3:2` and identical to the values recorded for the previous pass — natural size `1000x666`, every still `alt=""` and `aria-hidden` with no `img` role exposed, choose actions at `52` px and `178.4` px, safety guidance present, and zero failed requests.

**One rejected alternative is recorded.** Giving the label a zero flex basis made mobile and desktop shorter still (`232` → `201` px and `86` → `68` px) but squeezed the label into a narrow column at large text, taking the enlarged-text group from `1044` to `2036` px in German. It was measured, rejected for regressing the accessibility configuration, and the reason is left in the stylesheet so it is not retried blindly.

**Three stylesheet invariant tests were added**, following the precedent already set for the Mission card: the group wraps, so its row structure is a layout property and jsdom has no layout engine to assert it by rendering. They pin the definite basis, the shrinkable label and cue, and the absence of a fixed reservation. **Each was proven to fail when its fix is removed** — reverting the basis fails the first, restoring `min-width: 5.5rem` fails the other two — and all pass when restored.

**Gates**, run sequentially with output captured to files: relevant tests first (`MissionDiscovery` and `Accessibility`, `69` passed), then `tsc --noEmit` clean, the full suite at **847 tests across 23 test files** (`844` before, three added), clean production build, `git diff --check` clean. No test failed at any point in this pass, so no failure output was retained.

**Limitations.** One engine, one build, no real device, no assistive technology, no CI. Contrast was not re-measured: no colour, text colour or surface changed. Human visual acceptance of this change is outstanding and is not recorded here.


## Whole-application visual completion

Added on 2026-09-24. This section widens what this plan accounts for. It does not widen what is authorized: every surface below stays unauthorized until an authorization names it, and this section authorizes no implementation by itself.

### Sixth authorization — whole-application accounting, and the introduction and setup batch

Authorized on 2026-09-24, **recorded before implementation**, covering exactly two things:

1. Updating this plan to account explicitly for the whole application's visual completion, through the inventory below.
2. Implementing the next presentation batch: the **parent introduction** and **first-use setup**.

Nothing else. Tasks 4, 5 and 6 remain unauthorized; the remainder of Task 3 remains unauthorized; Discovery, the accepted Reward Card, Ready, Active, History, the Monthly Goal, recovery and the reset panel stay stable in this batch. No parallel plan is created.

**The previous batch's late record stands as written.** The category selector authorization was recorded after its implementation, and that fact is stated in its own section and in the changelog. It is not backdated, rewritten or removed, and this section does not repair it retrospectively.

### Inventory — every surface, and what each still needs

Condition uses four distinct states. **Implemented** means the behaviour exists and its own function plan verified it. **Verified** means presentation was additionally measured on a served build in this plan. **Awaiting visual review** means measured and recorded here but not yet accepted by a human. **Accepted** is recorded only where a human actually gave it. **Not started** means no presentation work has been done on it in this plan.

| Surface | Condition | Concrete remaining improvement | Owning specification | Verification needed |
| --- | --- | --- | --- | --- |
| Hydration / `pending` | Verified, awaiting visual review — at `958a578` | Done: the `pending` view never renders in the product; the blank frame painted before mounting now carries the warm ground. Residual: a returning family landing on the Reward Card sees that warm blank before the card's cool ground | Technical Architecture; Visual & Ergonomic *Mobile-first* | Recorded under the ninth authorization's outcome |
| Parent introduction | Verified, awaiting visual review | **This batch:** purpose, example, family steps and the setup action read as one composition on both layouts | `F001`; Visual & Ergonomic *Controlled scene system*, *Mobile-first* | EN/DE/RU at three configurations; flow to confirmed setup |
| First-use setup | Verified, awaiting visual review — at `9509bc5`, `958a578` and `36c4b60` | Done: the entry batch's treatment, and the `14` px enlarged-text sideways scroll ended with long words hyphenated | `F001`; Visual & Ergonomic *Approved MVP view inventory* | Recorded |
| Setup incomplete | Verified, awaiting visual review — at `958a578` | Done: the same form, the same enlarged-text correction. Not revisited: the discovery-gate note above the form keeps its cool tint | `F001` | Recorded |
| Setup editing / settings | Verified, awaiting visual review — at `c3af6df` | Done: the first-use form's surface and grouping, the effect sentences on their own lines, the enlarged-text sideways scroll. Open: Task 5's written height target, which is not met | `F001`; Task 5 | Recorded under the eighth authorization's outcome |
| Setup complete handoff | Verified, awaiting visual review — at `958a578` | Done: warm surface and summary tiles; the two onward actions no longer touch. The order *Change setup*, *Find a Mission*, *Mission history* is unchanged | `F001` | Recorded |
| Temporary mode | Verified, awaiting visual review — at `958a578` | Done: warm surface, the setup form's treatment, the warning kept as a warning, the temporary-setup status given its own notice, the enlarged-text overflow ended | `F001`; Visual & Ergonomic *parent surfaces stay restrained* | Recorded |
| Recovery | Verified, awaiting visual review — at `958a578` | Done: warm surface and a calm notice rather than the warning box. It renders in English whatever the family's language, which is the existing `F001` fallback | `F001` | Recorded |
| Discovery — category selector | Verified, awaiting visual review | None known. Compacted and its label clipping fixed at `c067eaa` | `F002`; Visual & Ergonomic *peer-choice group* | Done for this pass |
| Discovery — three suggestions | Verified, awaiting visual review | The rest of Task 3: the measured height reduction it still owns, reconciled below | `F002`; Visual & Ergonomic *F002 exactly-three* | Per Task 3, once authorized |
| Discovery — unavailable / bounded / conflict states | Verified, awaiting visual review — at `958a578` | Done: on a phone the set's heading, notice, bounded sentence and unavailable state keep the section's inset. The unavailable state is unreachable with the reviewed catalog and was shown only through a probe build | `F002` | Recorded |
| Session opening / ready | Verified, awaiting visual review — at `c3af6df` | Done: warm surface, separated actions, the start step grouped, enlarged-text insets. Open: Task 4's written height target, which is not met | `F003`; Task 4 | Recorded under the eighth authorization's outcome |
| Session active | Verified, awaiting visual review — at `c3af6df` | Same as ready | `F003`; Task 4 | Same |
| Leave / abandonment confirmation | Verified, awaiting visual review — at `c3af6df` | Done: spacing, warm inset at the reading measure, one dominant choice while open, enlarged-text actions. Residual: *Weitermachen* breaks once at a `32px` root | `F003` | Same |
| Reward Card | **Accepted** — human visual acceptance given 2026-09-22; reviewed for integration, **unchanged** | Open decision: it is now the one cool screen in the Mission flow, between the warm running Mission and the warm Discovery | `F004` | None; kept stable |
| Mission History | Implemented and verified under `F004`; reviewed for integration, **unchanged** | Open decision: it keeps the cool ground inside the warm Discovery doorway, and its goal panel sits closer to its heading than any other view's content | `F004` | Reviewed at three configurations |
| Monthly Goal | Implemented and verified under `F004`; reviewed for integration, **unchanged** | None found beyond History's | `F004` | Same |
| History empty state | Implemented; reviewed, **unchanged** | None: it reads as a beginning — a plain sentence, a neutral `0 / 20`, one route onward | `F004` | Same |
| Reset panel and its confirmation | Verified, awaiting visual review — at `958a578` and `36c4b60` | Done: the leave confirmation's warm inset; *Cancel* first and primary, *Confirm reset* outlined red, focus to its heading and back unchanged; the enlarged-text overflow ended with long words hyphenated | `F001` | Recorded |

### Mission presentation — all 54, counted rather than assumed

Counted from the repository: **54 reviewed, discovery-eligible Missions** — Movement `12`, Creativity `12`, Helping at Home `9`, Learning `11`, Calm `10`. All 54 have an authored scene. **Three** carry a reviewed photographic still: `creativity-02`, `creativity-05`, `creativity-10`. **Fifty-one do not.**

**Three stills do not mean the imagery is complete.** One Mission Category has three Missions presented photographically and the other four have none, so the set a family sees varies in kind by category. This is recorded as an open gap, not as finished work.

**Remaining asset need, identified separately.** Closing it needs `51` further reviewed stills, or an accepted decision that authored scenes are the product's presentation and the three stills are the exception. Either is a content and authorization decision, not an implementation one. **Unavailable assets are not a reason to stop unrelated interface work**, and this plan does not treat them as one: the introduction and setup batch proceeds with the existing scene. **The other 51 scenes are not to be replaced automatically**, and the boundary forbidding their replacement stands except for the three already named.

### Reconciling Task 3's height target with the imagery and layout authorized after it

Task 3 was written before the Discovery visual direction and before any still existed. It asks for a **measured reduction in Mission card height and set span at narrow widths**. Three authorizations landed after it and moved in the opposite direction, deliberately:

- the clipping fix, which made cards taller at `320` px / `32px` because text that was cut off is now shown — set span `8141` → `10881` px EN, `7954` → `12546` px DE, `8253` → `13772` px RU;
- the visual direction, which took the image window from `20 / 11` to `3 / 2`, giving each card more height on purpose;
- the three stills, which occupy that window at `3:2`.

**That original height target is therefore superseded, not achieved.** The historical measurements above are preserved exactly as recorded and are not restated as successes. What remains genuinely open from Task 3 is narrower than what it was written to mean: whether any **non-content** height — spacing and chrome rather than text, image or safety guidance — can still come out of the card at narrow widths, measured against the current design rather than the pre-imagery one. A new baseline must be taken before that is attempted, because every figure Task 3 was written against predates the imagery. Task 3 remains unauthorized and is not claimed complete.


### Parent introduction and first-use setup — outcome, at `9509bc5`

**One stylesheet file**, `130` insertions and `7` deletions. No markup, component, state, copy, localization, route or dependency changed, and no behaviour changed.

**Carried from Discovery into the entry surfaces.** The warm ground and panel surface Discovery already uses now also carry the introduction, first-use setup and the incomplete-setup form, so entering the product and using it are one surface rather than a cool entrance onto a warm product. The parent's guidance note takes the warm tint the Mission cards already give safety guidance, so it is no longer the single cool element on a warm page. Deep green actions, the focus ring, the borders and the spacing scale were already shared and are unchanged.

**The introduction now reads as one composition.** The purpose is given the weight of a lead rather than of body copy. What the family does, what setup involves and the one action sit together on the quiet warm panel Discovery gives its set of three, so the column reads as a designed block instead of three stacked items above a large empty area; on a wide layout the action settles to the foot of that block so the two columns end together. The family's three steps carry the product's own green on their numbers.

**Setup is easier to scan and its selection unmistakable.** Each choice group is held to the width its own content needs rather than stretched across a wide panel, which had left a short label adrift in a large box. The selected value carries the same heavier rim and slight lift Discovery gives a chosen category, on top of the native radio's own filled mark, so it is never signalled by colour alone. The save action is given room of its own below the guidance it follows. The separation between controls and guidance is preserved: the note keeps its own panel, its left mark and its tint.

**Scope, and a divergence recorded rather than hidden.** These changes are scoped to `introduction`, `setup-first-use` and `setup-incomplete`. The same form is also used by the settings view, temporary mode and recovery, and those keep their current cool surface because this batch does not authorize them — settings belongs to Task 5. **Until they are authorized, the same form looks different in those states.** That is a known, deliberate consequence of keeping unauthorized surfaces stable, and it is listed in the inventory above.

**Measured on the production build**, English, German and Russian at `1280x900`, `390x780` and `320` CSS px with a `32px` root, walked through the ordinary flow rather than seeded. Across all `36` surface-and-configuration combinations — introduction, setup, setup with an age chosen, and the confirmed handoff: **no clipping against any ancestor, no contrast failure, exactly one primary action, and a focus order identical to before.**

| Configuration | Introduction | First-use setup |
| --- | --- | --- |
| `1280x900` EN / DE / RU | `1166` → `1172`, `1193` → `1199`, `1239` → `1245` px | `1000` → `1008`, `1027` → `1035`, `1073` → `1081` px |
| `390x780` EN / DE / RU | `1796` → `1877`, `1895` → `2034`, `1927` → `2062` px | `1373` → `1381`, `1425` → `1433`, `1457` → `1465` px |
| `320` px @ `32px` root EN / DE / RU | `7969` → `8197`, `9060` → `9325`, `9320` → `9560` px | `5196` → `5212`, `6115` → `6131`, `6184` → `6200` px |

**Height was not a goal here and modestly increased.** The panel's own inset and a larger lead account for it. Minimum contrast is unchanged at `5.23:1` with zero failures; minimum touch targets are unchanged at `52` px, `107.2` px and `174` px.

**The real flow was walked, not assumed.** In all three configurations: the introduction is the first view; changing language there changes both the interface and the example Mission's reviewed content — *The Table Surprise* becomes *Die Tischüberraschung* — and **nothing is written to storage while the introduction is shown**; the one action leads to `setup-first-use` with the chosen language carried; choosing an age band enables the save; saving reaches `setup-complete-handoff` and writes a snapshot carrying `settings.language` and `childProfile.ageBand` with a local profile id; and a reload then returns the family to the handoff rather than to the introduction. Tabbing through the introduction reaches the language group and the one action, each showing the product's `solid 3px` ring.

**Two regressions were introduced during this work and removed; both are recorded because only the measurement found them.**

1. **The one action became an `85.6` px wide, `679` px tall ribbon at a `32px` root.** The new panel's `rem` inset left a `90` px column. This is the same defect class the plan already fixed for the Mission card's note and the language controls, and it took the same remedy: an inset with a ceiling measured against its own column. The action measured `147.7` px wide afterwards and the configuration's minimum target returned to `107.2` px.
2. **The panel cost about a sixth of the introduction's height at a `32px` root** — `7969` → `9290` px in English — because its inset narrowed the text column and every paragraph wrapped more. The panel is now given only above a `rem`-based threshold, so it is the content's own measure rather than a device width: a reader who enlarges text gets the plain column back automatically, and the residual increase is `228`–`265` px, which is the larger lead rather than the panel.

**One alternative was tried and rejected.** Splitting the panel's spare height between the note and the action, rather than collecting it above the action, left the guidance floating between two gaps instead of reading as one block. It was reverted and the reason left in the stylesheet.

**Gates**, run sequentially with output captured to files: relevant tests first (`ParentIntroduction`, `SetupFlow`, `Accessibility`, `App` — `102` passed), `tsc --noEmit` clean, the full suite at **847 tests across 23 test files**, clean production build, `git diff --check` clean. No test was added: the change is presentation, and a test mirroring a CSS declaration would assert the stylesheet against itself.

**One failed test run is recorded rather than explained away.** A full-suite run was killed by the environment partway through; before it died it reported `src/MissionSuggestionSet.test.tsx (56 tests | 1 failed)`, with `presents exactly three distinct Missions in every approved context` failing after `8319` ms. **The kill truncated the output before the assertion was printed, so the failure's detail was not retained — that is a gap in this verification.** The file then passed in isolation at `56 passed`, with that test taking `1236` ms, and the full suite passed twice afterwards at `847`. **Cause unknown, not reproduced, not attributed**, and passing on re-run identifies nothing.

**Limitations.** One engine, one build, no real device, no assistive technology, no CI. Human visual acceptance is not given and not recorded. Discovery, the Reward Card, Ready, Active, History, the Monthly Goal, settings, temporary mode and recovery are unchanged by this batch, and no claim of overall design completion is made.


### Seventh authorization — one bounded correction to the introduction batch

Authorized on 2026-09-24 at HEAD `6087a20`, **recorded before implementation**, from review of the supplied screenshots. It covers one correction and one verification, and nothing else.

**The correction.** On the desktop introduction, the guidance panel carries a large empty area between the explanatory note and the setup action, because the panel was made to match the example card's height and the action was anchored to its foot. That visually detached the action from the explanation it follows. The action is to sit immediately after the note with an ordinary, comfortable gap, and the panel is to size naturally to its own content. **Matching column bottoms is explicitly abandoned as a goal**, and empty space is not to be used to anchor the action.

Preserved: the mobile reading order, all reviewed content, typography, the single primary action, the example Mission, and every behaviour. No other surface is touched and nothing is redesigned.

**The verification, carried out before this authorization and recorded below.** The supplied German mobile setup screenshot was checked against the intended first-use styling rather than accepted or dismissed by eye.

### Setup screenshot attribution — verified, no defect

**Source file.** `~/Desktop/MissionKid-entry-surfaces-review/after-setup-mobile-390x780-de.png`, copied from the batch's own capture run. **Status: a genuine after-shot.** **Build:** the production build of commit `9509bc5`, the batch's implementation commit. **Application state at capture:** the probe taken in the same step recorded `view=setup-first-use`, title *Einrichtung durch Eltern* — the exact view the authorized styling targets, not a recovery, settings or temporary state.

**The authorized styling is present.** Pixels sampled from the before and after files at identical coordinates:

| Element | Before (`f351e5e`) | After (`9509bc5`) |
| --- | --- | --- |
| Page ground, top | `#e4eee7` cool | `#f1e8d6` **warm** |
| Page ground, edge | `#edf0ea` cool | `#f0eadc` **warm** |
| Section surface | `#fefffe` cool | `#fffcf7` **warm** |
| Parent note fill | `#f1f7f3` cool green | `#f8efdf` **warm** |
| Parent note left mark | `#4d7d6d` cool green | `#a8752f` **warm amber** |
| Selected choice border | `#1d6654` | `#17493c` **heavier rim** |

**So the screenshot is not a before-shot, is not an excluded state, and the styling is not missing.** No correction is needed and nothing is recoloured.

**The one accurate observation in the report, explained rather than changed.** The choices are indeed full width in that screenshot. That is the correct and unchanged mobile presentation: `.choice-grid` is a single full-width column at base, and both the three-column rule and this batch's width ceilings apply only from `34rem` (`544` px). The phone's content column is about `356` px, so the ceilings — `40rem` and `27rem` — are far wider than the space available and can have no effect there. The ceilings were a wide-viewport scanning improvement and were never intended to alter a phone. The single-column reading order on a narrow screen is what the Visual & Ergonomic Specification requires.


### Introduction correction — outcome, at `178bcc0`

**Two declarations.** The columns no longer stretch to a common height, and the action no longer takes the column's spare height. The guidance panel sizes to its own content and the action follows the note at the ordinary `1.5rem` gap every action on this surface uses. **Matching column bottoms is abandoned**, and the columns now end where their own content ends.

**A second defect the same anchoring had caused, found by the correction.** On a narrow screen the anchoring resolved to no top margin at all, so the action sat flush against the note with no gap. It now carries the same comfortable gap as on a wide screen, which is the `+24` px the mobile introduction gains.

**Measured on the production build**, English, German and Russian at `1280x900`, `390x780` and `320` CSS px with a `32px` root, through the ordinary flow. Across all `36` surface-and-configuration combinations: no clipping against any ancestor, no contrast failure, exactly one primary action, focus order identical to before the batch. Minimum contrast `5.23:1`; minimum targets `52`, `107.2` and `174` px; the confirmed handoff reached everywhere.

| Configuration | Introduction, before → batch → corrected | Setup |
| --- | --- | --- |
| `1280x900` EN / DE / RU | `1166`→`1172`→`1172`, `1193`→`1199`→`1199`, `1239`→`1245`→`1245` px | unchanged |
| `390x780` EN / DE / RU | `1796`→`1877`→`1901`, `1895`→`2034`→`2058`, `1927`→`2062`→`2086` px | unchanged |
| `320` px @ `32px` root | `7969`→`8197`→`8197`, `9060`→`9325`→`9325`, `9320`→`9560`→`9560` px | unchanged |

Desktop and enlarged page heights are unchanged, because the example card was always the taller column. **First-use setup is unchanged to the pixel in all nine configurations**, as this correction does not touch it.

Preserved and re-checked: the mobile reading order, every reviewed field, typography, the single primary action, the example Mission, and the flow's behaviour. No other surface was touched.

**Gates.** Relevant tests first (`ParentIntroduction`, `Accessibility` — `58` passed), `tsc --noEmit` clean, the full suite at **847 tests across 23 test files**, clean production build, `git diff --check` clean. No test added: two CSS declarations, and a test mirroring them would assert the stylesheet against itself.

**Limitations.** One engine, one build, no real device, no assistive technology, no CI. Human visual acceptance is not given and not recorded.


### Eighth authorization — Ready, Active, the leave confirmation and settings

Authorized on 2026-09-28 at HEAD `e576e13`, **recorded before implementation**. It covers presentation work on four surfaces and nothing else.

| Surface | What it covers | Owning task and specification |
| --- | --- | --- |
| Ready Mission | `session-opening` and `session-ready`, including their issue, retry and Mission-unavailable states | Task 4; Visual & Ergonomic *F003 — Ready Mission presentation*; `F003` criteria `2` and `3` |
| Active Mission | `session-active`, including zero, timing-unavailable, completion-unconfirmed and Mission-unavailable states | Task 4; Visual & Ergonomic *Mission Break transition and active presentation*; `F003` criteria `5`–`7` |
| Leave confirmation | The one `MissionLeaveConfirmation` panel, wherever it renders: on the running Mission, on a Mission that cannot be shown, and in the Discovery conflict. It is one component, so it keeps one presentation; in the Discovery conflict it sits on the already-warm Discovery surface and no other Discovery element changes | Visual & Ergonomic *Confirmed abandonment and completion presentation*, *Confirmations*; `F003` criterion `16` |
| Parent settings | `setup-editing` | Task 5; Visual & Ergonomic *Setup presentation*; `F001` *Changing setup later*, criteria `6` and `7` |

**Direction.** Carry forward the established warm surfaces, deep-green actions, readable typography and clear hierarchy, and improve excessive spacing and confusing visual grouping where there is a concrete benefit. Tasks 4 and 5 are judged by the five criteria under *How these changes are judged*; page, content and non-content height are reported as context, not as a verdict.

**Preserved:** full instructions, adult-involvement and safety guidance; explicit start and explicit completion; quiet timer behaviour; every recovery state; confirmation ordering with the safe choice first, keyboard operation, focus management and focus return; settings behaviour, in which **Save changes** is the one way a change is kept and the reset confirmation cancels through its own **Cancel**; an age change affecting future suggestions only; and every persistence, lifecycle, identity, localization and navigation rule.

**Not done:** forcing content above the fold, shrinking text, hiding guidance, adding animation, changing reviewed copy, or inventing controls.

**Unchanged:** the accepted Reward Card, Mission History and the Monthly Goal, the Discovery images and the catalog. Also unchanged because this authorization does not name them: the introduction and first-use setup, Discovery apart from the conflict panel, the setup handoff, temporary mode, recovery and the reset panel. Task 6 and the remainder of Task 3 stay unauthorized.

**Specification check, before code.** No amendment is required. The palette is deliberately open, spacing and grouping sit inside the existing responsive, localization-resilience and action-hierarchy rules, and nothing here reaches behaviour. A desired change that turns out to need a new product rule is recorded as a decision and not implemented.

**One fact recorded now rather than discovered later.** The settings view has no cancel control: **Save changes** keeps a change, and nothing on the view discards one. Adding a way to leave without saving would be a new control and a product decision, so this batch does not add one.

### Ready, Active, the leave confirmation and settings — outcome, at `c3af6df`

**Three files.** `src/styles.css`; `src/SetupFlow.tsx`, where each change-effect sentence is wrapped in its own element so it can be its own line; and `src/SetupFlow.test.tsx`, which gains assertions for that. No copy, type size, control, state, route, dependency, persistence or behaviour changed.

**Before-state defects found by measuring the served build**, none visible from the code alone:

1. **The primary action and the way out touched on a wide screen.** On Ready and on the running Mission the two buttons were inline siblings in ordinary flow, so at `1280x900` *Start mission* and *Back to suggestions*, and *Mission done* and *Leave mission*, sat against each other with no space, reading as one two-part control. The existing `align-self: flex-start` rules on them show a column was intended and never applied.
2. **The leave confirmation broke apart at an enlarged text size.** At `320` CSS px with a `32px` root the page gutter and section padding took `72` px per side and the panel took `38` px more, leaving its actions a `95` px column: *Keep going* and *Leave mission* were `95` px wide and `430`–`721` px tall, one letter per line, and the question broke mid-word. The *Stay here* variant on a Mission that cannot be shown did the same.
3. **Adult-involvement and safety guidance broke ordinary words in half** at the same configuration — *Erwac|hsene*, *sichere|n* — inside a `108` px text column.
4. **Settings scrolled sideways by `14` px** at that configuration in all three languages. The plan had recorded this on the setup form for Task 5; the cause is each language control's own padding, radio and gap reaching `261` px of min-content in a narrower column.
5. **In the Discovery conflict the confirmation sat against the first card** with about `2` px between them: the action row it replaces carries a `1.25rem` bottom margin and the panel carried none.
6. **The confirmation doubled its own spacing**: the shared button margin sat on top of its group's gap, putting `40` px between the consequence and the choices and `36` px between the choices once they wrapped.

**What changed.**

| Surface | Change |
| --- | --- |
| Ready and Active | Discovery's warm ground and panel carried through `session-opening`, `session-ready` and `session-active`. The session view is now the column its action rules assumed, so each action takes its own line. A hairline — the one a Mission card puts above its own action — separates the Mission and its guidance from what follows: the Mission Break and the start actions on Ready, the time guide and the return actions on Active. |
| Leave confirmation | The doubled spacing removed; a warm inset one step deeper than the page, kept to the Mission's `48ch` reading measure instead of running across a wide screen as a banner; the same distance from the set as the actions it replaces in the Discovery conflict. **While it is open, *Mission done* takes the secondary treatment**, so two equal green actions no longer compete and *Keep going* is the one dominant choice. *Mission done* stays in place, working, in the same focus order, and returns to primary when the question is answered. |
| Settings | The first-use form's treatment extended to `setup-editing`: warm surface and parent note, choice groups held to their content, the heavier selected state, and room for the save action. Each change-effect sentence becomes its own line in the body ink rather than the tail of the grey help above it; the paragraph's text, and so each group's accessible description, is unchanged. |
| Enlarged text only | Viewport ceilings on the shell's side padding, the section padding, the note insets, the confirmation's insets and its buttons' side padding, and on settings' choice insets and radio glyph. Each ceiling sits above its `rem` value at every viewport from `320` px up at ordinary text sizes, so it acts only when the reader enlarges text. The section's own padding is overridden rather than `--section-pad`, which the reset panel inherits. |

**Measured on the production build**, identical by content hash to the commit — `index-BXsNV5Jn.css`, `index-DE8n8Wjt.js` — against the pre-change build of `df7b287`, whose `src/` is identical to `e576e13`. Chrome for Testing headless shell `149.0.7827.55` through Playwright `1.63`, English, German and Russian at `1280x900`, `390x780` and `320` CSS px with a `32px` root, walked through the ordinary flow: introduction, setup, Discovery, *Helping at Home*, the first Mission — `helping-03`, which carries both an adult-participation note and a safety note, reached by its own `catalogOrder` without pinning — then ready, start, active and the leave confirmation; the handoff's *Change setup* to settings; a real write failure injected in the page for the start and completion issue states; a clock fast-forward for zero; the stored Mission renamed and reloaded through real hydration for both Mission-unavailable states and the *Stay here* confirmation; and a second tab starting a Mission for the Discovery conflict. **`117` state-configuration-language combinations**, each compared with its before-state:

| Check | Result |
| --- | --- |
| Rendered words and their order | Identical in all `117`, whitespace aside. The only structural difference is the settings effect sentence in its own element, same words in the same order |
| Font size and line height | Unchanged on every text element in every combination |
| Heading order | Unchanged |
| Keyboard | Tab order and focus rings identical wherever measured; the confirmation still takes focus on its heading when opened, tabs *Keep going* then *Leave mission*, and returns focus to the control that opened it on Escape and on *Keep going*; the reset panel's *Cancel* still returns focus to its entry |
| Clipping against every clipping ancestor, overlap | `0` in all `117` |
| Page horizontal overflow | `0` on every authorized view. Settings `14 → 0` px at the enlarged configuration. The reset panel, outside this authorization, below |
| Contrast, composited | minimum `5.3:1` before and after, zero failures |
| Touch targets | minimum `52` px before and after; the tallest session control at the enlarged configuration `721 → 222` px, which is *Zurück zu den Vorschlägen* wrapping by word |
| Ordinary sizes | At `1280x900` and `390x780` every shell, section and column position and width — `222` measurements — and every note and instruction reading width is identical to the pixel |

Reading width at `320` px with a `32px` root: instruction and note boxes `174 → 246` px, note text `108 → 211` px, confirmation actions `95 → 206` px wide and `430`–`721 → 138` px tall.

**Height, reported as context and not as the verdict.**

| View | `1280x900` EN / DE / RU | `390x780` EN / DE / RU | `320` px, `32px` root EN / DE / RU |
| --- | --- | --- | --- |
| Ready | `906→1000`, `929→1024`, `933→1027` | `1070→1092`, `1117→1139`, `1144→1166` | `5706→3804`, `6620→4284`, `6638→4430` |
| Active | `900→953`, `900→976`, `900→953` | `996→1019`, `1043→1066`, `1070→1093` | `5202→3542`, `5800→3815`, `6144→4004` |
| Leave confirmation | `1058→1056`, `1081→1080`, `1058→1056` | `1212→1186`, `1259→1234`, `1286→1260` | `6645→3998`, `7482→4309`, `7668→4498` |
| Settings | `1074→1123`, `1151→1175`, `1126→1175` | `1547→1596`, `1648→1697`, `1648→1672` | `6698→4814`, `7900→5803`, `7955→6088` |
| Discovery conflict | `1871→1867`, `1962→1958`, `1985→1981` | `3636→3608`, `3820→3792`, `3943→3915` | `12394→12262`, `13965→13784`, `14868→14638` |

At the enlarged configuration every authorized state is `23.5`–`49.9` % shorter, by legitimate reflow: wider columns, the same type size. The least is Russian settings, the most the *Stay here* confirmation. The confirmation is shorter everywhere. **Ready and Active grow at ordinary sizes** — on desktop by the second action line, on mobile by the hairline's separation — and settings grows by the effect sentences' own lines and the save action's room.

**Tasks 4 and 5 are not claimed complete.** Both were written with a target that non-content height falls at `390x780` from `463`–`487` px on Ready, `374`–`397` px on Active and `725` px on settings. At `390x780` on this baseline it moved `298 → 302` px on Ready, `293 → 297` px on Active and `491 → 499` px on settings, so **that target is not met**. Those baselines were also taken on a Mission the plan did not record, by a measurement this pass could not reproduce — the same method gives `298` px on `helping-03` — so the figures are not comparable either. The spacing on Ready and Active at `390x780` was examined and found to be useful separation, which the judging criteria protect; the excessive spacing on the path was inside the confirmation, where it came out. Whether the height targets are superseded, as Task 3's were, is a decision recorded below and not made here.

**Found and not fixed, because this authorization does not name them.**

- **The reset panel scrolls the page sideways at `320` px with a `32px` root** when opened on settings: `39` / `124` / `127` px before, `3` / `88` / `91` px after in EN / DE / RU. The reduction is only the wider shell; the panel's own cause is unchanged. `.recovery-actions` is a grid with no named column minimum, so the panel is sized to its longest word. The same panel opens on every parent view that offers reset.
- **First-use setup keeps the `14` px sideways scroll** at that configuration, and so do the incomplete-setup form, temporary mode and recovery: they share the settings form, and the correction is scoped to settings.
- **The Reward Card keeps its cool surface**, so the running Mission's warm ground changes at the step after completion. The Reward Card is accepted and is not to be changed.

**Residuals.** At the enlarged configuration the single German word *Weitermachen* is wider than its button and breaks once across two lines; fitting it would need insets that also change the ordinary `320` px layout, or smaller type. On a wide screen Ready and Active still read in a column on the left of a wide panel, which the specification permits and this batch did not recompose. The settings radio glyph stops growing at `19.2` px at an enlarged size, as the introduction's language controls already do, while its label keeps its size and the selected state keeps its rim and tint.

**Gates**, run sequentially with complete output captured to files: relevant tests first — eight files, `250` passed — then `tsc --noEmit`, which failed once on the new assertion's unchecked index and was fixed and rerun clean, the full suite at **847 tests across 23 test files**, a clean production build, and `git diff --check` clean. The test count is unchanged because the new assertions extend the existing per-language editing test rather than adding one: each effect sentence is its own element, and each group's description paragraph reads exactly *help* plus *effect*. **The assertion was proven to bite**: with the markup reverted it failed in all three languages, and passed once restored. No test failed at any other point in this pass.

**Limitations.** One engine, one build, no real device, no Safari or Firefox, no assistive technology, no CI. Human visual acceptance is not given and not recorded.


### Ninth authorization — superseded height criteria, the diagnosed overflow, and the remaining consistency pass

Recorded on 2026-09-28 at HEAD `b048040`, **before implementation**. Two decisions and two authorizations.

#### Decision 1 — Tasks 4 and 5 are judged without a height target

Reduced page height is no longer a required outcome of Task 4 or Task 5. Both are evaluated on six things instead: **clear action hierarchy, complete readable content, comfortable controls, useful spacing, keyboard and focus behaviour, and the absence of clipping or horizontal overflow.** The original targets and every measurement recorded against them stay in this plan unchanged, as historical records **superseded rather than achieved**. Changing the criteria does not complete either task: each closes only when its remaining obligations are met.

What of those baselines can still be reproduced was measured rather than assumed, on a rebuild of `f5a6912` — the build they were taken from — at `390x780`, walking the first Mission of every Mission Category in every age band:

| Baseline | Recorded | Measured now on `f5a6912` | Status |
| --- | --- | --- | --- |
| Ready, page height | `911` / `938` / `988` px | `911` / `938` / `988` px with `movement-02` *Bear, Crab, Bird*, the first Movement Mission for `4–6` and `7–8` | **Reproduced**; the Mission, which was not recorded, is now identified |
| Active, page height | `838` / `864` / `938` px | `838` / `864` / `915` px with the same Mission | English and German reproduced; **Russian differs by `23` px, one line**, and the cause is not established |
| Settings, page height | `1547` / `1648` / `1648` px | `1547` / `1648` / `1648` px | **Reproduced** |
| Content height — Ready, Active, settings | `448`/`474`/`501`, `463`/`490`/`541`, `822`/`923`/`923` px | Union of element boxes: `627`/`654`/`704`, `558`/`585`/`635`, `1056`/`1157`/`1157`. Union of text lines and controls: `500`/`520`/`558`, `450`/`470`/`508`, `710`/`784`/`784` | **Not reproduced.** Neither reading of the recorded method gives the recorded figures, and the script that produced them was not retained. The record also has Active's content exceeding Ready's while Active's page is shorter, which is the reverse of what both readings give |
| Non-content height — `463`–`487`, `374`–`397`, `725` px | Page minus content | Follows from the row above | **Not reproducible** |

The evidence that remains is the recorded figures themselves, the page heights that reproduce to the pixel, the Mission now identified, and the `f5a6912` build, which rebuilds from history.

#### Decision 2 — a way to leave settings without saving is a separate product decision

It is not made here and no control is added.

#### Authorization A — the diagnosed enlarged-text overflow

The overflow corrections in the **reset panel, first-use setup, temporary mode and recovery**, and in **any shared form layout responsible for those defects** — which includes the incomplete-setup form, since it is the same form. Readable font sizes, full labels and guidance, destructive-action safeguards, semantic order and focus management are preserved, and overflow hiding is not used to conceal anything.

**Reproduced before editing**, on the production build of `b048040` in Chrome for Testing headless shell `149.0.7827.55`, through real conditions — the ordinary flow, the stored age removed and reloaded, the browser's storage made to throw, an unreadable stored snapshot. Page horizontal overflow at `320` CSS px with a `32px` root, EN / DE / RU; `0` at `1280x900` and `390x780` in every state:

| State | Overflow | Elements responsible |
| --- | --- | --- |
| First-use setup | `14` / `14` / `14` px | The three language controls |
| Incomplete setup | `14` / `14` / `14` px | The same |
| Temporary mode | `14` / `91` / `15` px | The same, and in German the retry help, the retry action and the reset entry, each widened to `338` px |
| Reset panel, on first-use setup, the handoff and temporary mode | `39` / `124` / `127` px | The panel, sized to its longest word |
| Reset panel, on recovery | `39` px in all three | The same. Recovery renders in English whatever the family's language, because an unreadable snapshot yields no language and the view offers no choice — the existing `F001` fallback |
| Recovery, reset unconfirmed | `0` | — |

**Two shared causes**, both the grid-minimum defect this plan has already fixed twice: each language control's own padding, radio and gap reach `261` px of min-content in a narrower column, and `.recovery-actions` is a grid with no named column minimum, so everything in it — the retry help, the retry action, the reset entry and the reset panel — is sized to its own longest word.

#### Reconciling the earlier first-use report with the `14` px

Every earlier statement about horizontal overflow on first-use setup was located and set against a rebuild of its own commit, measured in the same state — setup before and after an age is chosen — at `320x568`, `320x780` and `360x740`, with the `32px` root applied two ways: an injected root style, and the browser's own default-font-size setting.

| Commit | What its record says | Measured on a rebuild of that commit |
| --- | --- | --- |
| `ee35a70`, recorded in `e4f8511` (`F002`) | *"first-use setup, setup editing, blocked recovery and the reset confirmation were re-checked at 320, 360, 390 and 1280 pixels in all three languages at normal and 200% text with no regression"* | `14` px at `320` px wide, in every language, with both text methods, with and without an age; `0` at `360` px |
| `c8380a4`, recorded in `5eb9562` (Plan 03) | *"144 combinations: 8 implemented states … none scrolls horizontally"* | The eight states are not named, and that plan's scope was the `F003` and `F004` surfaces. First-use setup measures `14` px at this commit, so the statement cannot have covered it |
| `02bbe68` (this plan, Tasks 1–2) | Records `14` px on the setup form as pre-existing | `14` px — reproduced |
| `9509bc5` (this plan, introduction and setup) | *"no clipping against any ancestor"* — no page-overflow claim for setup | Clipping `0`, page overflow `14` px — consistent, a different check |
| `b048040` | Records `14` px | `14` px |

**Verdict: not a regression.** The same `14` px from the same three controls is present on every build from `ee35a70` to `b048040`. For the `F002` statement, this is **unresolved evidence**: the measurement contradicts it on its own commit's build, and that record keeps neither its method nor its per-configuration results, so why it reported no defect cannot be established. The statement is left as written and superseded by this measurement, not rewritten.

#### Authorization B — the remaining presentation consistency pass

Presentation-only work on the remaining surfaces in the inventory: **the setup handoff, temporary mode, recovery, the reset panel, Discovery's unavailable and bounded states, and loading.** The established visual language is given where it is useful, while each surface keeps its own meaning: **error and recovery states stay clearly different from successful completion.** Existing copy, controls, navigation, lifecycle and persistence behaviour are retained.

**History, the Monthly Goal and the accepted Reward Card are reviewed for integration issues** and are not restyled merely to make every surface identical.

**Not done:** a settings cancel or back action; replacing the remaining Mission artwork; new routes, dependencies, animation or features.

**Two facts recorded before implementation.**

- **Discovery's unavailable state cannot be reached with the reviewed catalog.** Every Mission Category has at least six eligible Missions in every age band — `6`–`9` — so exactly three can always be presented. It can be shown only through a probe build with a reduced catalog, which is evidence about its presentation and never about the product.
- **The loading view never renders in the product.** Hydration runs synchronously in the initial state, so `pending` is never the first view, and busy operations resolve within one task under `flushSync`, so their status is never painted. What does paint before the application mounts is a blank frame of the page's cool ground: at `136` ms on a normal cold load, and for about `2.3` s under `6x` CPU and slow-network throttling, after which the resolved view — warm for every landing view except the Reward Card — replaces it.

**Specification check, before code.** No amendment is required: the palette is open, the work sits inside the existing responsive, localization-resilience, action-hierarchy, confirmation and recovery-presentation rules, and nothing reaches behaviour.

### Ninth authorization — outcome, at `958a578` and `36c4b60`

**Two files.** `src/styles.css`, and `src/SetupFlow.test.tsx`, which gains two stylesheet invariants. No markup, copy, control, state, route, dependency, persistence or behaviour changed.

#### Authorization A — the overflow, ended

**The two shared causes are fixed.** `.choice-grid` and `.recovery-actions` now name a zero column minimum. Viewport ceilings — each above its `rem` value at every ordinary size from `320` px up — are added to the choice control's inset, gap and radio, the reset panel's padding, the recovery and reset actions' side insets, and the shell of every parent view that shows the setup form or the reset panel. The choice rule moved from settings into the base control, so every state of the form shares it; the introduction's own language controls override it and are unchanged.

| State, `320` px with a `32px` root | Before (`b048040`) | After |
| --- | --- | --- |
| First-use setup | `14` / `14` / `14` px | `0` |
| Incomplete setup | `14` / `14` / `14` px | `0` |
| Temporary mode | `14` / `91` / `15` px | `0` |
| Reset panel on first-use setup, the handoff and temporary mode | `39` / `124` / `127` px | `0` |
| Reset panel on recovery | `39` px in all three | `0` |
| Reset panel on settings | `3` / `88` / `91` px | `0` |

**The fix exposed a readability cost, and `36c4b60` corrects it.** With the overflow gone, the reset panel's column at a `32px` root is `204` px, and some words are wider than any column a `320` px screen can give them — German *zurücksetzen* in its `40` px heading, *wiederherstellen*, *Abbrechen* on its button. They broke at whichever letter reached the edge: *MissionKi|d-Daten*, *zurückset|zen*, *Abbreche|n*. Before the fix those words read whole only because the panel ran off the screen, with its destructive action partly out of view. Automatic hyphenation now breaks them at a syllable, following the page's language — *zurück-setzen*, *Einstel-lungen*, *Grundla-gen* — on the setup form, the handoff, the parent notices and the recovery actions. It applies only under `max-width: 15rem`, which matches when the reader's own text size is large against the viewport and never at a `16px` default from `320` px up, so ordinary sizes are unchanged. One cost is recorded: it also divides the product name, *Mission-Kid-Daten*, which still reads better than *MissionKi|d-Daten*. An engine without hyphenation for a language keeps the plain break.

**A measurement fact this depends on, recorded so it is not rediscovered.** Media queries resolve `rem` against the browser's default font size, not against a size a page sets on its root. Every other enlarged-text measurement in this plan injected a `32px` root style, under which this media query never matches, so those results are unaffected by `36c4b60`. The hyphenation was therefore verified separately under the browser's own `32px` default-font setting, with the root asserted to be `32px` before and after every capture, because the automation's full-page screenshot was found to drop that setting silently: **no overflow and no clipping in any of `21` parent states**, and the before-build overflowing by exactly the amounts the injected method had measured.

**A regression was introduced during this work and removed.** The first version of the Discovery inset below also inset the leave confirmation, which at a `32px` root made the panel narrower than its own actions and pushed the Discovery conflict `46` / `40` px sideways in English and German. Found by re-running the previous batch's harness against its recorded results; the confirmation and the controls now keep the full width, and the conflict measures `0` again.

**The invariant test.** jsdom has no layout engine, so, following the precedent this plan set for the Mission card, two tests pin the cause: both grids must name a zero column minimum. **Each was proven to bite** — with either minimum removed its case fails, and both pass once restored.

#### Authorization B — the remaining consistency pass

| Surface | Change |
| --- | --- |
| Setup handoff | Warm ground and summary tiles. Its two onward actions each take their own line: as inline siblings a wide screen set *Find a Mission* and *Mission history* against each other with no space, the same defect Ready and Active had. The order — *Change setup*, *Find a Mission*, *Mission history* — is unchanged |
| Temporary mode | Warm ground and the setup form's treatment, so it reads as the same form in a different state. Its warning keeps the warning box, as the specification asks for *a clearly parent-oriented warning*. The sentence that the temporary setup applies to this page only followed the parent note directly, where it read as that note's last line; it takes the calm notice the product uses for a step that did not become durable |
| Recovery | Warm ground, and its explanation takes that calm notice instead of the warning box, which the inventory had flagged for a recoverable state. It stays unmistakably not a success. It renders in English whatever the family's language, which is the existing `F001` fallback for an unreadable snapshot |
| Reset panel | The leave confirmation's warm inset instead of a second floating card. What marks it destructive is its wording and its outlined red action, never an alarm surface. *Cancel* stays first and primary, *Confirm reset* outlined red, and focus still moves to its heading and back to its entry |
| Discovery bounded and unavailable | On a phone the set's heading, its notice, the bounded sentence and the unavailable state ran flush against the panel edge, because the rule that gives the cards the full width also removed their inset. They now keep the section's inset — `356 → 316` px at `390` px — while the cards, the controls and the leave confirmation keep the full width. The same heading appears in the ordinary set, so this also changes it |
| Loading | The blank frame painted before the application mounts takes the warm ground, measured on a painted pre-mount frame: `rgb(244, 246, 241)` before, `rgb(247, 242, 230)` after, which is the introduction's own ground |

**Discovery's unavailable state** was shown only through a probe build of the working tree whose catalog kept two Calm Missions — never shipped, differing from the product only in `src/catalogContent.ts`. Its before and after are identical except the inset, with no clipping, overflow or contrast failure in nine configurations.

**History, the Monthly Goal and the accepted Reward Card were reviewed for integration and are unchanged** — to the pixel, in every measured configuration. Two observations are recorded as decisions rather than acted on:

- **The Reward Card and History are now the only cool screens in a warm flow**: the running Mission is warm, the Reward Card after it cool, and Discovery after that warm again; History sits cool inside the warm Discovery doorway. The accepted card's own green recognition surface was designed against that cool ground, which is why changing it is a decision for the reviewer and not a consistency fix.
- **History's goal panel sits about `12` px under its heading**, where every other view leaves `1.5rem`.

#### Verification

Measured on production builds against `b048040`, in Chrome for Testing headless shell `149.0.7827.55`, English, German and Russian, through real conditions throughout. This batch's harness ran on `36c4b60` itself. The previous batch's harness and the probe ran on `958a578`, whose only difference from `36c4b60` is the hyphenation media query, which does not match at any configuration they use. Each measured build is identical by content hash to the gate build of its commit.

| Harness | Combinations | Result against the before-state |
| --- | --- | --- |
| This batch's surfaces — introduction, first-use setup and its reset panel, handoff and its reset panel, History empty and with a record, incomplete setup, temporary mode, its ready state and its reset panel, recovery, its reset panel and reset unconfirmed, Discovery bounded and unconfirmed, the Reward Card — at `1280x900`, `390x780` and `320` px with a `32px` root | `153` | The same words in the same order; every font size and line height unchanged; heading order, keyboard order and focus rings unchanged; all `36` reset panels still take focus on their heading and tab *Cancel* then *Confirm reset*, and *Cancel* returns focus to the entry; `0` clipping against any clipping ancestor, `0` overlap, `0` page overflow |
| The previous batch's states, plus the Discovery conflict before its confirmation | `126` | Unchanged; Ready, Active and the leave confirmation identical in all `36` of their states |
| Discovery unavailable, probe builds | `9` | Unchanged except the inset |
| Parent states under the browser's own `32px` setting | `21` | `0` overflow, `0` clipping |

- **Contrast:** minimum `5.23:1` before, `5.10:1` after, zero failures. The one lower pair is the handoff's summary labels, `#5a6d67` small text, now on the warm tile `#fbf6ea` rather than `#f7faf8`; it clears the `4.5:1` requirement.
- **Touch targets:** minimum `52` px before and after.
- **Ordinary sizes:** the introduction, the Reward Card and History identical to the pixel in all nine configurations; first-use setup identical at `1280x900` and `390x780`.
- **Reduced motion:** under `prefers-reduced-motion: reduce` no changed view carries any transition, animation or transform; the one remaining transform is a static positioning transform on an SVG group in the introduction's example scene.
- **Timer:** the running Mission's time guide carries no `aria-live`, no role and no `aria-atomic`, and its view has no live region at all.
- **Whole branch against `main`:** `36` commits; every changed file traces to this plan or to the inherited Reward Card follow-up.

**Height, as context and not a verdict.** At a `32px` root, first-use setup went `5212 → 3840`, `6131 → 4523`, `6200 → 4618` px; temporary mode `7219 → 5322`, `8122 → 6290`, `8512 → 6432` px; recovery `2879 → 2135` px; the handoff `2658 → 2103`, `2988 → 2327`, `2786 → 2435` px, by the same text at a wider column. Discovery's bounded state grew `137`–`222` px there, because its text now takes the column's measure instead of the panel's. At ordinary sizes, measured across every state: temporary mode `+8` px from the save action's room, its ready state `+27` to `+58` px from the status notice, and Discovery on a phone `+23` to `+45` px in German and Russian — the unconfirmed notice, the bounded sentence and the conflict — where inset text wraps one or two lines more. Nothing else moved.

**Gates**, run sequentially with complete output captured, twice: after `958a578` — relevant tests (`270` passed), `tsc --noEmit` clean, the full suite at **849 tests across 23 test files**, a clean production build, `git diff --check` clean — and again after `36c4b60`, with the same results. The measured builds are identical by content hash to the gate builds. No test failed at any point.

#### Task statuses

| Task | Status |
| --- | --- |
| 1 — introduction | **Implementation verified; awaiting human visual review** |
| 2 — introduction copy | **Implementation verified; awaiting human visual review.** The copy is proposed product copy; translation review is a separate release decision |
| 3 — Discovery | **Bounded parts implemented and verified, awaiting human visual review.** Its original height target is superseded, not achieved, and under the review-handoff decisions below reduced height is no longer an obligation for the Discovery cards, so **no implementation obligation remains**. The one concrete usability residual in the existing evidence is recorded there |
| 4 — Ready and Active | **Implementation verified against Decision 1's six criteria** at `c3af6df` and unchanged at `36c4b60`; the timer's live-region check done in this pass. **Awaiting human visual review** |
| 5 — settings | **Implementation verified against the same six criteria**; the enlarged-text overflow ended at `c3af6df`. Its age-change obligations are carried by existing tests that pass: `Restoration.test.tsx` *resumes the same running Mission without a refresh*, `MissionReady.test.tsx` *is unchanged by a current age band that no longer matches the selection* and `MissionHistory.test.tsx` *keeps every completion when the current age band no longer matches*. **Awaiting human visual review** |
| 6 — consistency and full verification | Its outcome is the pass Authorization B carried out — which, as the reviewer confirmed on 2026-09-28, included Task 6 — and its verification list was run: the gates, the whole branch against `main`, `git diff --check`, three languages at three configurations, reduced motion, heading and reading order, and contrast on every changed text element. **Implementation verified; awaiting human visual review.** The Reward Card and History are unchanged, as Task 6 requires |

**None of these is complete**: human visual acceptance is outstanding for every one of them and is not recorded by anyone but the reviewer.

**Limitations.** One engine, one build, no real device, no Safari or Firefox — hyphenation in Safari relies on the prefixed property and is unverified — no assistive technology, no CI.

### Review handoff — decisions recorded on 2026-09-28

Recorded from the reviewer's instruction preparing the final visual review. **No implementation is authorized by it**, and nothing in the product changed.

- **Task 6** was included in the authorized consistency pass, which is how its status above already reads.
- **Reduced height is not an obligation for the Discovery cards.** Task 3's remaining height obligation is withdrawn — superseded, not achieved — and no spacing work is invented to satisfy it. The existing evidence shows one concrete usability residual on the cards, at an enlarged text size only: German compounds wider than the column, such as *unzerbrechliche*, still break mid-word without a hyphen, as recorded at `ea77864`.
- **The accepted Reward Card is preserved.** A different surface colour is not on its own a defect.
- **A way to leave settings without saving** remains a separate product decision.
- **Hyphenation and every other detail stay as they are** until the visual review.

### Tenth authorization — enlarged-text readability on narrow screens

Recorded on 2026-09-28 at HEAD `b0e17bf`, **before implementation**, after an **assistant review of the six overview sheets and their README** — an assistant screenshot review, not human visual acceptance. The ordinary desktop and mobile direction is preserved. One focused readability issue remains before this plan closes: at `320` px with enlarged text, **zero horizontal overflow does not by itself establish comfortable reading**. The Russian setup action splits into four lines; the Reward Card's and History's actions fragment into many short pieces and their headings break repeatedly inside words; and the confirmation and reset panels show the same pressure.

**Authorized:** a bounded enlarged-text layout correction on the setup form, the handoff, the session's leave confirmation, the reset panel, the Reward Card and History — **the Reward Card and History only where necessary, keeping their accepted colours and visual identity**; this does not authorize restyling them. Useful width is recovered through responsive gutters, nested spacing and action sizing where appropriate.

**Method, before code:** reproduce each example in the rendered application and measure the viewport width, the cumulative outer and nested padding, the actual text-column width and the button content width, so the cause is established rather than hyphenation assumed to be the answer.

**Preserved:** readable font sizes, complete wording, semantic order, focus indicators and touch targets; natural vertical scrolling. **Not used:** clipping, truncation, smaller text, unconditional `nowrap`, or manual line breaks in localized strings. Not every long word must stay unbroken: avoidable fragmentation is improved, and safe wrapping stays where a word genuinely cannot fit.

**Verification:** English, German and Russian with both the injected `32px` root and the browser's `32px` default-font setting, on the six surfaces; ordinary desktop and mobile presentation confirmed unchanged wherever the correction is unnecessary; proportionate checks and the required gates once, with complete failure output kept.

**Still open and not touched:** the separate asset and product decisions — the remaining Mission stills, the introduction copy's translation review, instruction length, and a way to leave settings without saving. No unrelated redesign and no feature.

### Tenth authorization — outcome, at `b0319d1`

**One file, `src/styles.css`.** No markup, copy, font size, control, state or behaviour changed.

**The cause, measured before code.** The examples were reproduced in the rendered application at `320` px under both the injected `32px` root and the browser's own `32px` setting, with every heading, label and action measured from the viewport inwards. **It was stacked insets, not word length.** Per side:

| Surface | Page gutter + section padding | An action's own inset | Text column | Action content width |
| --- | --- | --- | --- | --- |
| Reward Card, History | `32` + `41` px | `40.4` px | `174` px | `91`–`93` px |
| Setup, handoff, session views | `16` + `21` px | `40.4` px | `246` px | `165` px |
| Leave confirmation, reset panel | `16` + `21` px, then the panel `20`–`21` px | `21.2` px | `204`–`206` px | `162`–`163` px |

Each broken word was then measured unbroken in its own font. Of the `64` words broken across lines, `44` would have fitted a `246` px column and `15` more a `288` px one; only `5` could not fit even `288` px. The action words need `97` to `240` px — `272` px counting the text-style reset link — and were given `91` to `165` px. **Hyphenation was not the answer**: it can only choose where a word that does not fit breaks, and most of these words would have fitted.

**The correction.** One measure, `--room: calc(10vw - 1rem)`, which is exactly `1rem` on a `320` px screen at a `16px` text size, larger on any wider screen or smaller text, and falls towards zero only where the screen is narrow for the text. It reads the root size, so it responds identically to the browser's setting and to an injected root, with no media query. The page gutter, the section's side padding, the leave confirmation's and reset panel's side insets, History's goal panel and every action's side inset on the six surfaces become `clamp(floor, k × room, their own value)` — **mathematically identical to their own value at every ordinary size** — with floors of `8` px for the page gutter and section, and `12` px for nested panels and action insets. The Reward Card's reclaim of the section's padding is bounded by that padding, so the card stays inside its panel; **its colours, surface, border, radius and identity are unchanged**, and so are History's.

**Result, six surfaces × three languages at `320` px:**

| | Browser `32px` setting | Injected `32px` root |
| --- | --- | --- |
| Words broken across lines | `64 → 6` | `62 → 6` |
| Line boxes | `259 → 179` | `259 → 179` |
| Text column | `174`/`246` → `286` px | the same |
| Action content width | `91`–`165` → `256`–`258` px; in panels `162` → `232` px | the same |

Worst cases, under the browser setting: *Найти другую миссию* `6 → 2` lines, *Завершить настройку* `4 → 2`, *Einrichtung abschließen* and *Zurücksetzen bestätigen* `4 → 2`, History's action `4 → 1`, and the Reward Card's and History's headings `4 → 2`.

**The six remaining breaks are words wider than any column this screen can give them**, and keep safe wrapping: *Missionsverlauf* (History heading, `377` px of `286`), *abgeschlossen* (handoff heading, `366` of `286`), *Benutzeroberfläche* (setup legend, `336` of `286`), *MissionKid-Daten* (reset heading, `333` of `260`), *Tischkapitän* (session Mission title, `294` of `286`) and *получилось.* (Reward Card recognition, `287` of `284`).

**Of the defects the review package listed**, three are resolved by this: *Weitermachen* now takes one line, *Missionsverlauf* on the handoff one line, and *Reset MissionKid data* breaks no word. The fourth, German compounds on the Discovery cards, is on a surface outside this authorization and is unchanged.

**Verification.**

- **Ordinary sizes unchanged:** all `186` desktop and mobile states in both harnesses — `102` and `84` — are identical to the current build in page height, container boxes and every text element's width. The introduction and Discovery, which this does not reach, are unchanged at enlarged text as well.
- **Against the current build, `279` combinations** with the injected root: the same words in the same order, every font size and line height, heading order, keyboard order, focus rings and focus return unchanged; `0` clipping, `0` overlap, `0` overflow; minimum contrast `5.10:1` and minimum touch target `52` px, both unchanged. Under the browser setting, `21` parent states with `0` overflow and `0` clipping, and the six surfaces with `0` overflow.
- **Focus indicators** still fit: the `8` px section padding holds the heading's ring, drawn `7` px outside it, and the card's own `8` px holds its Mission title's.
- **Before and after, worst cases:** fourteen pairs captured at `2x` under the browser setting, with the root asserted `32px` before and after each capture, in `~/Desktop/MissionKid-Plan05-enlarged-text-readability/`.
- **Gates**, run once and sequentially with complete output kept: relevant tests (`180` passed), `tsc --noEmit` clean, the full suite at **849 tests across 23 test files**, a clean production build byte-identical to the measured one, and `git diff --check` clean. No test failed. None was added: the change is the value of existing insets, and the invariant tests already pin the layout causes.

**This is an assistant screenshot review, not human visual acceptance**, which remains outstanding. The separate asset and product decisions stay open.


## Boundaries

Preserved exactly: the `selected → ready → active → completed` lifecycle, the confirmed-write contract, exactly-once completion accounting, timer derivation from persisted timestamps, every recovery and temporary-mode path, Mission History, and Monthly Goal behavior including period identity and the single goal-complete prompt. The accepted Reward Card presentation and the Mission History presentation are not changed.

Not authorized and not proposed: accounts, payments, a backend, analytics, rankings, streak pressure, collectible rewards, or any additional product feature. No new dependency. No new persisted field, storage key or snapshot version. No route, router or URL-addressable page. No change to reviewed catalog text, durations, age eligibility, adult-involvement levels or safety guidance. **No regeneration or replacement of the 54 reviewed scenes, except the three named under *Discovery visual direction* below, whose scenes that authorization explicitly replaces.** No component replaced that is already correct. No setup-to-introduction back control. The Mission Category selector's presentation is compacted under the fifth authorization above; its five categories, semantics, labels and selection behaviour are unchanged.

Kept in the acceptance criteria throughout: English, German and Russian; accessible focus; comfortable touch targets; larger-text support with readable text and normal vertical scrolling; mobile performance.

## Remaining decisions requiring approval

1. ~~**Renewed implementation authorization for the remainder of Task 3 and for Task 6.**~~ **Resolved on 2026-09-28:** Task 6 was carried out within the *Ninth authorization*, Authorization B, and Task 3's remaining height obligation was withdrawn — superseded, not achieved — under the review-handoff decisions.
2. **Translation review of the proposed copy.** The strings above are proposed product copy. Whether they need review by a German and a Russian speaker before release is a release decision, not one this plan makes. **Still open at closure; carried forward.**
3. **Instruction length**, recorded under Decision 3 as a separate content consideration for Mission Catalog and Safety. Not scheduled, not assumed, and not addressed by anything in this plan. **Still open at closure; carried forward.**
4. ~~**Tasks 4 and 5's height targets.**~~ **Decided on 2026-09-28:** superseded, not achieved — the *Ninth authorization*, Decision 1.
5. **A way to leave settings without saving.** The view has none. Adding one is a new control and a separate product decision, not presentation; the *Ninth authorization*, Decision 2, keeps it out of this plan's batches. **Still open at closure; carried forward.**
6. ~~**The reset panel's sideways scroll, and the setup form's on the other views that share it.**~~ **Authorized on 2026-09-28** under the *Ninth authorization*, Authorization A, and done.
7. ~~**Whether the Reward Card and History take the warm ground.**~~ **Decided on 2026-09-28:** the accepted Reward Card is preserved, and a different surface colour is not on its own a defect. History's goal-panel spacing remains an observation for the visual review.
8. **The remaining Mission imagery.** Reviewed stills exist for `3` of the `54` Missions. The other `51` need reviewed stills, or an accepted decision that the authored scenes are the product's presentation. This is asset and content work, not implementation, and **it is not completed by this plan's closure**. Carried forward.

## Definition of complete

The implementation this plan has authorized is done and verified: Tasks 1 to 6, Task 3 in its bounded parts, each recorded above with the verification that actually ran. **This plan stays active** for one thing: human visual acceptance of all of it, which only the reviewer can record. A way to leave settings without saving remains a separate product decision outside this plan.

This plan is complete when its authorized scope is implemented, each task's verification has actually been run and recorded truthfully here and in the changelog, and the diff is limited to that scope. It claims no MissionKid MVP completion, no deployment readiness, no CI result, no assistive-technology acceptance and no professional translation review. Human acceptance of anything built under it would be recorded separately, as the Reward Card follow-up's was.

**Satisfied on 2026-09-29**, as recorded under *Closure*.

## Human visual acceptance

**Accepted — 2026-09-29.** The human reviewer explicitly accepted the visual presentation reviewed for this plan: the final visual review package of the build of `36c4b60`, and the enlarged-text readability correction at `b0319d1` that followed it. The acceptance was given at HEAD `673a1ed`, whose product source is that of `b0319d1`. This is the reviewer's own visual judgement, recorded here as the acceptance this plan was held open for.

What it is and is not:

- It is acceptance of **the reviewed visual presentation** of the surfaces this plan changed: the introduction, first-use and incomplete setup, the handoff, settings, Discovery with its category selector, Mission cards and stills, Ready, Active, the leave confirmation, temporary mode, recovery, the reset panel and the pre-mount frame, together with the unchanged Reward Card and History as reviewed for integration.
- It is **not** product acceptance or MVP acceptance, **not** cross-browser or real-device verification, **not** assistive-technology acceptance, **not** a professional translation review, and **not** release or deployment approval.
- It is **separate from the automated checks** recorded above, which remain exactly as recorded and are neither strengthened nor superseded by it. No limitation recorded above is retired by it: the browser evidence is still one engine, with no Safari, Firefox or real phone, no assistive technology and no CI.
- It **completes no separate work.** The superseded height criteria stay superseded rather than achieved, and the asset, content, translation and product decisions listed below stay open.

## Closure

**Closed — 2026-09-29.**

### Obligations reconciled

| Item | Outcome at closure |
| --- | --- |
| Task 1 — the introduction | Implemented, verified, visually accepted |
| Task 2 — introduction copy | Implemented, verified, visually accepted. The copy remains proposed product copy; its translation review is carried forward |
| Task 3 — Discovery | Bounded parts implemented, verified and visually accepted: the clipping defect, the narrow-screen spacing, the visual direction, the stills and the category selector. **The original height target is superseded, not achieved**, and the remaining height obligation was withdrawn on 2026-09-28 |
| Task 4 — Ready and Active | Implemented and verified against the six criteria of Decision 1, visually accepted. **Its height target is superseded, not achieved** |
| Task 5 — settings | Implemented and verified against the same criteria, visually accepted. **Its height target is superseded, not achieved** |
| Task 6 — consistency and full verification | Carried out within the *Ninth authorization*, Authorization B, verified, visually accepted |
| Tenth authorization — enlarged-text readability | Implemented at `b0319d1`, verified, visually accepted |
| Every authorization's verification | Run and recorded above and in the changelog, with its limitations and the unexplained test failures recorded as unexplained |

### Checked at the closure head

- **Gates, run sequentially with complete output kept.** `tsc --noEmit` clean; the full suite at **849 tests across 23 test files**, all passing; the production build clean, emitting the same content-hashed assets as the build left by the `b0319d1` gate run — `index-CKDH-RHL.css` and `index-A6sF6Rww.js`. `dist/` is ignored build output, so this is a statement about the build, not about a commit.
- **Branch against `main`.** `43` commits and `33` files. Every changed file traces to this plan or to the inherited Reward Card follow-up: the specification amendments this plan carried, its source, tests, stills and records, and the Reward Card plan.
- No product source changed after `b0319d1`: the commits since change records only.

### Carried forward, not completed

Recorded so that closing this plan cannot be read as completing them.

- **The remaining Mission imagery** — `51` of `54` Missions have no reviewed still. Asset and content work.
- **Translation review** of the proposed introduction copy in German and Russian — a release decision.
- **Instruction length** — a Mission Catalog and Safety consideration.
- **A way to leave settings without saving** — a product decision.
- **Two observations for the content reviewer**: the *Tallest Tower* still's surface does not positively establish a floor, and a forearm in a plain sleeve is visible in the *Sock Friend* still.
- **Known residuals**: at an enlarged text size the introduction and Discovery were outside the tenth authorization, and words still break there mid-word, German compounds on the Mission cards among them; six words remain wider than any column a `320` px screen gives them; Safari hyphenation, which relies on the prefixed property, is unverified.
- **Limitations** as recorded throughout: one engine, no real device, no Safari or Firefox, no assistive technology, no CI, and the unexplained test failures recorded as unexplained.

This plan moves to `plans/completed/` as historical evidence. Its superseded criteria, measurements, limitations and deferred decisions stand as written and are not reopened. Nothing was pushed, merged or deployed, and no branch was deleted.
