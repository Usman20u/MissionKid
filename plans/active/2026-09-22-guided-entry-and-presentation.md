# MissionKid Plan 05 — guided entry and the presentation pass

**Date:** 2026-09-22
**Status:** Specification amendments prepared and revalidated; the reviewer's product decisions are recorded below. **Tasks 1 and 2 are authorized and were executed together as one integrated batch**, and await human visual acceptance, which is not recorded. **One bounded part of Task 3 — the reproduced Discovery clipping defect — is authorized and done; the rest of Task 3 is not.** Tasks 4–6 remain unauthorized and are not started. Nothing is pushed, merged or deployed.

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

### Task 4 — Remove unnecessary non-content height on the ready and active views

**Outcome.** Measured non-content height falls on both views in all three languages, from a baseline of `463`–`487` px on ready and `374`–`397` px on active at `390x780`, by removing excessive spacing while useful separation and touch-target space stay. Content is preserved on all four terms: complete wording, readable typography, required guidance, semantic order. A content height that falls through legitimate reflow is an acceptable outcome and is reported as such rather than treated as a shortfall. **No whitespace is added to any language to make it resemble another, no text is shrunk, nothing is clipped, and no safety content is reordered.** Remaining language-dependent height differences are the expected outcome. The lifecycle, deliberate start, exactly-once completion, timer derivation, leave paths and confirmations are untouched.

**Trace.** `F003`; Visual & Ergonomic *F003 — Ready Mission presentation*, *Mission Break transition and active presentation*, *Action hierarchy*, *Localization resilience*, criteria `8` and `9`.

**Verification.** The page/content/non-content measurement in all three languages at `390x780` and `320`px/`32px`, before and after, taken by the method above and reported as context. The verdict comes from the direct checks: every required string present and rendered in full; computed `font-size` and `line-height` unchanged or better on every changed text element; safety and adult-involvement text present, outside any disclosure and unmoved in document order; heading order unchanged; one dominant primary action with secondary and exit actions subordinate and available; focus order and visible focus unchanged; every interactive element at or above `52` px; and no overlap or horizontal overflow. Where content height falls, the record states which reflow produced it. The existing `F003` suite unchanged, including exactly-once start and completion. Timer live-region behavior re-checked.

### Task 5 — Remove unnecessary non-content height on the settings view

**Outcome.** Measured non-content height falls from its `725` px baseline in all three languages, by removing excessive spacing while useful separation and touch-target space stay. Content is preserved on the same four terms: both effect explanations and both parent notes keep their complete wording, their current type size and line height, their visibility outside any disclosure, and their place in the reading order. A content height that falls through legitimate reflow is acceptable and is reported with the reflow that produced it. The same prohibitions as Task 4 apply — no added whitespace, no smaller text, no clipping, no reordered safety or consequence content.

**Trace.** `F001` *Changing setup later*, criteria `6` and `7`; Visual & Ergonomic *F001 — Setup and localization presentation*, *Action hierarchy*.

**Verification.** The page/content/non-content measurement in all three languages before and after, by the method above and reported as context. The verdict comes from the direct checks: the language-effect and age-effect sentences and both parent notes present and rendered in full; computed `font-size` and `line-height` unchanged or better; document order unchanged; the save action still the single dominant one; focus order across the nine focusable elements and visible focus unchanged; every interactive element at or above `52` px; and no overlap or horizontal overflow. Tests asserting a `ready` or `active` session, every completed record and Monthly Goal progress are unchanged by an age-band change.

### Task 6 — Consistency and full verification

**Outcome.** The introduction, Discovery, ready, active, Reward Card, History and settings read as one visual language. **The Reward Card and Mission History presentation are unchanged.** No unrelated change enters the diff.

**Trace.** Visual & Ergonomic *Visual consistency without a design system*, *Accessibility baseline*, *Anti-manipulation visual rules*, *Ergonomic review method*.

**Verification.** Type checking, the full suite and the production build run sequentially; the whole branch diff inspected against `main`; `git diff --check`. Across EN/DE/RU at `390x780`, `1280x900` and `320`px/`32px`, against the five judging criteria used throughout this plan: excessive spacing removed with useful separation and touch-target space intact; one dominant primary action per view with secondary and exit actions subordinate; complete readable content with no truncation, clipping or disclosed safety guidance; keyboard access with unchanged focus order, visible focus on every interactive element and touch targets at or above `52` px; and no overlap or horizontal overflow. Reduced motion respected and heading and reading order intact on every changed view. Language-dependent page heights and ordinary vertical scrolling, at default and increased text sizes, are recorded as acceptable outcomes rather than as findings. Contrast measured on the rendered page for every changed text element, as the Reward Card follow-up did.

## Boundaries

Preserved exactly: the `selected → ready → active → completed` lifecycle, the confirmed-write contract, exactly-once completion accounting, timer derivation from persisted timestamps, every recovery and temporary-mode path, Mission History, and Monthly Goal behavior including period identity and the single goal-complete prompt. The accepted Reward Card presentation and the Mission History presentation are not changed.

Not authorized and not proposed: accounts, payments, a backend, analytics, rankings, streak pressure, collectible rewards, or any additional product feature. No new dependency. No new persisted field, storage key or snapshot version. No route, router or URL-addressable page. No change to reviewed catalog text, durations, age eligibility, adult-involvement levels or safety guidance. No regeneration or replacement of the 54 reviewed scenes. No component replaced that is already correct. No setup-to-introduction back control.

Kept in the acceptance criteria throughout: English, German and Russian; accessible focus; comfortable touch targets; larger-text support with readable text and normal vertical scrolling; mobile performance.

## Remaining decisions requiring approval

1. **Renewed implementation authorization for Tasks 3–6.** It is recorded for Tasks 1 and 2 above and for nothing else. Nothing in Tasks 3, 4, 5 or 6 may begin until its own authorization is recorded here. This is the gate.
2. **Translation review of the proposed copy.** The strings above are proposed product copy. Whether they need review by a German and a Russian speaker before release is a release decision, not one this plan makes.
3. **Instruction length**, recorded under Decision 3 as a separate content consideration for Mission Catalog and Safety. Not scheduled, not assumed, and not addressed by anything in this plan.

## Definition of complete

Tasks 1 and 2 are implemented, verified and recorded above and await human visual acceptance. One bounded part of Task 3 — the reproduced clipping defect — is done and recorded above. This plan stays active because the rest of Task 3 and Tasks 4 to 6 are neither authorized nor done.

This plan is complete when its authorized scope is implemented, each task's verification has actually been run and recorded truthfully here and in the changelog, and the diff is limited to that scope. It claims no MissionKid MVP completion, no deployment readiness, no CI result, no assistive-technology acceptance and no professional translation review. Human acceptance of anything built under it would be recorded separately, as the Reward Card follow-up's was.
