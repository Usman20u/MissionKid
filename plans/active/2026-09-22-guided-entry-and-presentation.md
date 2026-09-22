# MissionKid Plan 05 — guided entry and the presentation pass

**Date:** 2026-09-22
**Status:** Specification amendments prepared and revalidated — **implementation authorization pending**. No product code is written under this plan until that authorization is recorded below. Nothing is pushed, merged or deployed.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration.

It follows the completed implementation plans `F001`–`F004` and [`plans/completed/2026-09-21-reward-card-presentation.md`](../completed/2026-09-21-reward-card-presentation.md), closed on 2026-09-22 with the human reviewer's visual acceptance recorded. All of those are historical evidence; none is reopened, and their records and limitations stand as written.

This plan carries a **material specification change**. Under `AGENTS.md`, a material change to an approved specification pauses affected implementation until the applicable specification stages, User Story / traceability validation and Full Specification Audit are revalidated and renewed authorization is explicitly recorded here. Stages one and two are done and recorded in this plan. **Renewed implementation authorization is not recorded and has not been given.** The earlier gate does not authorize the work below.

The instruction that opened this plan approves the visual direction and the preparation of its specification amendments and implementation plan. It does not approve implementing them, copying generated mockups, or bypassing the implementation gate.

## The approved direction

The reviewer selected one direction for the broader experience:

- a parent landing page — a warm, clear introduction to MissionKid, a representative activity, a concise account of the flow, and one obvious entry action;
- Discovery — three equally prominent Mission cards with expressive, understandable miniature scenes;
- ready and active — restrained presentation, clear instructions, visible safety guidance, unmistakable actions;
- Reward Card, History and settings — calm, readable presentation in the same visual language.

That is the **visual direction**, and it is approved. The interaction decisions this plan had to resolve in order to build it are recorded separately under *Resolved interaction decisions* and are **not** covered by that approval.

Generated reference images informed composition and atmosphere only. Reviewed catalog text, durations, age eligibility, adult-involvement wording, safety guidance and localized strings remain authoritative, and no generated text or incidental control is copied into the application.

## Specification amendments made

Only the landing page is genuinely new behavior. Everything else in the approved direction is presentation the Visual & Ergonomic Specification already requires, so no specification changes for it.

The Visual & Ergonomic Specification explicitly excludes **a marketing website**, and it still does. That exclusion is not quietly reinterpreted to cover the landing page: it is amended to say what the landing page is and is not, and the behavior itself is added to the specification that owns it.

| Document | Change | Reason |
| --- | --- | --- |
| [`docs/specs/functions/001-parent-setup-and-localization.md`](../../docs/specs/functions/001-parent-setup-and-localization.md) | New *First-use introduction* section covering what it explains, its one forward action, the non-selectable example Mission, language on the introduction, and exactly when it is and is not shown. Four new acceptance criteria, `13`–`16`. | `F001` owns first-use setup and localization. The introduction precedes the setup choices and is therefore `F001` behavior, not presentation. Nothing else could own it without inventing a Function ID. |
| [`docs/specs/functions/002-mission-discovery-and-selection.md`](../../docs/specs/functions/002-mission-discovery-and-selection.md) | One paragraph under *Incomplete setup* stating that the introduction's example Mission is not a discovery result and does not relax the incomplete-setup rule. | `F002` forbids presenting missions before a valid age band exists. Showing an example before setup would appear to contradict it. The conflict is resolved in the text rather than by reinterpretation. |
| [`docs/specs/visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) | New inventory row for the parent introduction; new *Parent introduction presentation* sub-section; one authorized use of the scene system outside Discovery; the marketing-website non-goal amended; new acceptance criterion `24`. | This document owns presentation and the approved view inventory. A view absent from the inventory has no presentation requirements, and the scene system was authorized for Discovery only. |
| [`docs/specs/technical/technical-architecture.md`](../../docs/specs/technical/technical-architecture.md) | The introduction added to the root-only view list; one bullet stating it needs no route, URL, history entry, router, snapshot field or persisted acknowledgement, and that a hydrated context never selects it; the *Setup and localization* boundary row updated. | The root-only navigation list enumerates the views. Leaving the introduction out would make the architecture's own list wrong, and the no-new-persistence property needs to be stated where architecture is owned. |
| [`docs/global-spec.md`](../../docs/global-spec.md) | Core user flow gains step `1`; MVP features gain one bullet. | This document owns MVP boundaries. A view every first-time family sees is MVP scope, and scope must not grow silently. |
| [`docs/functional-map.md`](../../docs/functional-map.md) | End-to-end flow gains step `1`; the *Parent setup* capability row updated. | This document owns the capability map, and the capability now begins one step earlier. |
| [`docs/user-stories.md`](../../docs/user-stories.md) | New story `P8`, mapped to `F001`. | Traceability. There was no story for a first-time parent understanding the product before setup. |

### Documents deliberately not changed

- **`docs/business-context.md`** — the problem, users, pain, value, safety principles and global positioning are unchanged. An introduction is how the existing product is entered, not a different business framing.
- **`docs/roadmap.md`** — the roadmap owns phasing. Nothing moves between v1, v1.1 and v2+; the introduction falls inside the existing v1 *Minimal parent setup* scope.
- **`docs/specs/mission-catalog-and-safety.md`** — no Mission, eligibility rule, age approval, adult-involvement level or safety rule changes. The introduction selects an example from Missions already approved for every band, and `F001` restates that a band approval must never be broadened to produce one.
- **`docs/specs/technical/data-and-state-model.md`** — no persisted field is added. Which view is current is already listed there as temporary runtime state.
- **`docs/specs/functions/003-*` and `004-*`** — no session, timer, completion, Reward Card, History or Monthly Goal behavior changes.
- **`AGENTS.md`** — this is project status and specification content, not policy. `AGENTS.md` stays policy.

## Revalidation

### User Story / traceability validation — passed

- All 13 existing stories `P1`–`P7` and `C1`–`C6` are preserved, unique and unchanged, and every one keeps the same `F001`–`F004` owner. The identifiers are stable references in completed plans, so the new story is numbered `P8` rather than renumbering them; the story itself records that it precedes `P1` in the flow.
- `P8` maps to `F001` and is covered by its new acceptance criteria `13`–`16`.
- The amended `F002` paragraph adds no discovery behavior, so `P3`, `P4` and `C1` remain accurate and needed no amendment.
- Every behavior this plan would implement traces to `F001` (`P8`, the introduction) or to the Visual & Ergonomic Specification's ergonomic review method (the presentation improvements on existing views). No behavior traces to nothing.

### Focused Full Specification Audit — passed, no blockers

Scope: the seven amended documents and every clause that could conflict with them.

| Check | Result |
| --- | --- |
| The marketing-website exclusion is honestly addressed, not reinterpreted | Passed. The non-goal is retained and amended to state that the in-product introduction is part of the root-only application and is not a promotional site. Criterion `24` forbids marketing, testimonial, rating, urgency and persuasion patterns on it. |
| `F002`'s incomplete-setup rule is not weakened | Passed. The example is not a discovery result, is not selectable, starts no cycle, and the rule that discovery shows no suggestions until a valid age band exists is restated unchanged. |
| No age context is inferred before setup | Passed. `F001` requires the example to be already approved for **every** supported age band; six catalog Missions qualify today. Showing one decides no eligibility question. |
| Safety and adult-involvement prominence is preserved | Passed. `F001` requires reviewed adult-involvement wording and safety guidance on the example to be present and unchanged; the visual specification requires the same prominence it would have on a Mission card and forbids shortening, softening, delaying or hiding it. |
| Mission Catalog and Safety is not weakened | Passed. No content, eligibility rule or age approval changes, and `F001` explicitly forbids broadening an approval to produce an example. |
| Root-only architecture is preserved | Passed. No route, URL, history entry, router dependency or persisted field is introduced. |
| The lifecycle, confirmed-write contract, exactly-once accounting, timer rules, recovery, History and Monthly Goal are untouched | Passed. No amendment reaches `F003`, `F004`, the data and state model, or the persistence contract. |
| Out-of-scope boundaries hold | Passed. No account, payment, backend, analytics, ranking, streak, collectible or additional product feature appears in any amendment. |
| The view inventory and the architecture's view list agree | Passed. Both now list the introduction and nothing else changed in either. |
| Internal reference integrity | Passed. Every relative link in the repository's Markdown resolves. |

**Blockers: none.** What this audit does **not** do is re-run the whole specification foundation audit; it is focused on the amendments and their adjacent clauses, which is what `AGENTS.md` requires for a material change.

## Resolved interaction decisions

These are proposals this plan had to make in order to build the approved visual direction. They are decisions about behavior, not about appearance, and they are **not** covered by the visual approval.

**What the landing page explains.** What MissionKid is for — turning the end of screen time into a short real-life activity; what a Mission looks like, through exactly one non-selectable example; what the family will do, as a short account of the flow from Mission Category selection to marking a Mission done; and that setup is brief, needs no account and asks for no identifying child data.

**Its exact entry action.** One forward action, visually dominant, that continues to the setup choices. Nothing else on the view is a forward action, and there is no second destination. Its label is copy and needs review; see *Remaining decisions*.

**The representative activity.** One Mission from the reviewed catalog, shown as an example and not selectable, carrying its reviewed localized title, instruction, category, duration and any required adult-involvement wording and safety guidance exactly as reviewed. It must already be approved for all three age bands, so nothing about the child is inferred. Six Missions qualify today: `helping-03`, `helping-11`, `helping-13`, `learning-04`, `calm-02`, `calm-08`.

**How first-time visitors reach setup.** They arrive at the introduction, and the single forward action takes them to the existing setup form. That form is unchanged: same language and age-band choices, same parent-responsibility and privacy notes, same completion action.

**How returning families resume without marketing interrupting them.** The introduction is selected from the existing first-use state and nothing else. Every other entry is unaffected, and this needs no new field, because the application already distinguishes these cases:

| On arrival | What the family gets | Introduction shown |
| --- | --- | --- |
| No stored context at all | The introduction | Yes |
| Valid context, Mission Session `active` | That running Mission | No |
| Valid context, a current completed result | That Reward Card | No |
| Valid context, Mission Session `ready` or `selected` | That Mission's start experience | No |
| Valid context, complete setup, nothing in progress | Mission Category Selection or the setup handoff | No |
| Stored context valid but no valid age band | The existing age-context gate | No |
| Stored data unreadable or an unsupported version | The existing recovery surface | No |
| Storage unavailable | The existing temporary-mode surface | No |

The last two are deliberate: recovery is not an introduction, and a family being told their data cannot be read must not first be marketed to. A genuinely new visitor whose storage is blocked therefore reaches temporary mode without an introduction. That is the honest trade, and it is recorded in `F001`.

**Navigation.** None is added. There is no router, no URL, no history entry, no navigation bar and no back control from setup to the introduction — a back control would be a second action competing with the one that matters, and nothing has been recorded that the family could lose. A reload before setup completes legitimately returns to the introduction, because nothing was saved; once setup is complete the introduction is unreachable.

**Language selection.** The supported language choice appears on the introduction itself, so a parent who does not read English is not required to pass through an English screen. It is the same `F001` choice with the same English default, it is secondary to the entry action, and the setup form continues to offer it unchanged. Later changes continue to go through the existing settings path.

**Architecture.** The root-only architecture accommodates this scope with nothing added. The introduction is one more view selected from validated state, and the state that selects it already exists and is already distinct from the age-context gate — today both simply render the same setup form. Implementation needs one additional value in the existing runtime-only setup-view union so that "being introduced" and "filling in setup" are different views. That value is runtime state, like the current view itself; **no route, router, URL, history entry, snapshot field or persisted acknowledgement is introduced**, and no persistence, hydration, validation or recovery path changes.

## Screen-by-screen review

The method is the Visual & Ergonomic Specification's: what the user must understand, the primary action or peer-choice group, the concrete obstacle, one to three targeted improvements, and how each is checked. Obstacles below were **measured** on the served production build of `f5a6912` in Chrome for Testing `148.0.7778.97`, from seeded snapshots through the real hydration path, in English, German and Russian.

### 1. Parent introduction — new

1. **Understand:** what MissionKid is for, what a Mission looks like, what the family will do, that setup is short and private.
2. **Primary action:** one forward action into setup. The language choice is secondary.
3. **Obstacle:** the view does not exist. A first-time parent's first screen is a form asking for a child's age band with no statement of what the product does.
4. **Improvements:** build the view to the amended `F001` and the new presentation sub-section; carry the one example Mission through the existing scene system; keep the language choice reachable before the view is read.
5. **Checked by:** the new `F001` acceptance criteria `13`–`16` and visual criterion `24`, as tests through the rendered application and the real persistence adapter; every entry row in the returning-family table asserted to reach its stated destination; EN/DE/RU at `390x780`, `1280x900` and `320` px with a `32px` root, with no horizontal scroll and no truncated safety text.

### 2. Discovery — the three Mission suggestions

1. **Understand:** three equally weighted Missions, comparable on title, instruction, category, duration and any adult-involvement or safety requirement.
2. **Peer-choice group:** the three Missions. `Another set` stays secondary.
3. **Obstacle — measured, and it is the real one.** The three Missions cannot be compared on a phone. At `390x780` each card is `582`–`659` px tall, which is 75–84% of the viewport, and the set spans **`1811` px (EN), `1910` px (DE), `2003` px (RU) — `2.32` to `2.57` viewport heights**. Two complete options are never on screen together. With larger text at `320` px and a `32px` root it is far worse: cards of `1868`–`2428` px each, a set spanning `6326`–`6894` px — **`8.1` to `8.8` viewport heights** — with the first card's choose action `4166`–`4560` px down the page. No horizontal scroll appears anywhere, and each card carries 69–80 words of content.
4. **What `F002` permits, inspected before proposing anything.** `F002` *Mission card content* and acceptance criterion `4` require every card to carry the localized title, localized short instruction, Mission Category, expected duration and any required localized safety or adult-involvement note. The visual specification forbids truncating critical instructions, consequences, adult-involvement text or safety guidance, requires the comparison information to be *easy to scan*, and requires safety and adult-involvement wording to be visible rather than behind disclosure. **Shortening, truncating, hiding behind disclosure or moving any of that content off the card is therefore not available**, and this plan proposes none of it. Safety stays visible wherever it is required.
   **Improvements, all presentation and all content-preserving:**
   - reduce the card's non-text height at narrow widths — the scene window currently takes `29.5`–`33.4`% of card height at `390` px, and at `320` px with a `32px` root it already runs at `6.6`–`10.7`% and still works, which shows nothing depends on its size;
   - tighten card chrome and vertical rhythm at narrow widths so the same words occupy less height;
   - keep the comparable fields — category, duration, adult-involvement and safety presence — in an identical, scannable position on all three cards, so a family can compare on those without reading three instructions, while every instruction stays fully present.
5. **Checked by:** the same measurement repeated before and after on both builds, EN/DE/RU at `390x780` and at `320` px with a `32px` root, reporting card heights, set span and viewport-heights-to-compare; the existing `F002` suite unchanged; no horizontal scroll; no card losing any required field; safety and adult-involvement text asserted present and untruncated in all three languages.
6. **Recorded finding, not acted on here.** Reviewed instructions average `291` characters in English, `353` in German and `316` in Russian, and reach `538`, `656` and `614`. That length, not the layout, is what makes a card tall. Whether a "short instruction" should be that long is a **Mission Catalog and Safety** question about reviewed content, not a presentation question. It is recorded for that specification's owner and is explicitly **not** changed by this plan.

### 3. Ready Mission

1. **Understand:** which Mission, what to do, how long, what an adult must do, what is safe, that it has not started.
2. **Primary action:** **Start mission**, dominant.
3. **Obstacle — measured.** The primary action falls below the fold in two of three languages. At `390x780` the button's top sits at `718` px in English, where it is fully visible, but at `745` px in German and `795` px in Russian, where the child must scroll to reach it. Pages measure `911` / `938` / `988` px. The specification does not require a primary action above the fold, so this is not a rule violation — but it makes German and Russian a materially different experience from English on the one screen where a child commits to leaving the device, which is what *localization resilience* exists to prevent.
4. **Improvements:** recover vertical space above the action so it is reachable without scrolling in all three languages at `390x780`; keep the safety and adult-involvement block exactly where it is and at its current prominence. No scene is added to this view — restraint here is deliberate, the scene system is authorized for Discovery and the introduction only, and Plan 03's finding on this screen is not reopened.
5. **Checked by:** the measurement repeated in all three languages at `390x780` and `320`px/`32px`, reporting the action's absolute top against the viewport; safety and adult-involvement text asserted present, untruncated and unmoved in reading order; heading order and focus behaviour unchanged; the existing `F003` suite unchanged.

### 4. Active Mission

1. **Understand:** the Mission is running, the child should be away from the screen, roughly how long, the safety guidance still applies.
2. **Primary action:** **Mission done** when the family returns.
3. **Obstacle — measured, and smaller.** Pages measure `838` / `864` / `938` px; **Mission done** sits at `645` px in English and `671` px in German, both fully visible, and at `745` px in Russian, where it is not. One language, one screen.
4. **Improvements:** the same vertical-space recovery as the ready view, applied consistently; nothing else. This view is intentionally low-interaction and stays that way.
5. **Checked by:** the same measurement in all three languages; the timer's live-region behaviour, the leave-without-completing path and its confirmation asserted unchanged.

### 5. Reward Card — reviewed, no change proposed

Improved and verified under the closed follow-up, and visually accepted by the human reviewer on 2026-09-22 in all three languages. It already carries the calm surface, the leading recognition line and the secondary Monthly Goal block that the approved direction asks for. **This plan changes nothing on it.** Re-styling a surface that was just accepted would discard evidence, not add any.

### 6. Mission History and Monthly Goal — reviewed, no change proposed

1. **Understand:** what was completed, newest first, and this month's progress.
2. **Primary action:** the one route back to Mission Category Selection.
3. **Obstacle:** none found. Measured at `390x780` with five completed entries, the whole view including the Monthly Goal section and its action fits within one viewport in all three languages, with the action visible at `648` px and no horizontal scroll.
4. **Improvements:** none. The approved direction asks for calm, readable presentation consistent with the same visual language, and this view already is.
5. **Checked by:** the measurement above; re-checked once after Task 6 for consistency drift only.

### 7. Settings — the later language and age-context change

1. **Understand:** the current values, what changing each one affects, and that existing Missions, History and Monthly Goal are not rewritten.
2. **Primary action:** save the change.
3. **Obstacle — measured.** The view runs `1547` / `1648` / `1648` px — `1.98` to `2.11` viewport heights at `390x780` — and the save action sits at `1333` px in English and `1434` px in German and Russian. A parent changing one radio button must scroll roughly a full extra screen to commit it, in every language.
4. **Improvements:** recover vertical space so the save action is reachable with substantially less scrolling; keep both effect explanations and both parent notes fully visible — they are the consequence text this view exists to carry.
5. **Checked by:** the measurement repeated in all three languages; the language-effect and age-effect sentences asserted present; `F001` acceptance criteria `6` and `7` unchanged, including that changing the age band leaves a `ready` or `active` session and every completed record untouched.

## Implementation tasks

**None of these is authorized yet.** They are ordered so that the new view lands before the passes that must stay consistent with it.

### Task 1 — The parent introduction view

**Outcome.** A first-time visitor reaches the introduction; it explains what MissionKid is for, shows the one non-selectable example Mission with its reviewed content and required adult-involvement and safety wording intact, gives a short account of the flow, offers the supported language choice, and has exactly one dominant forward action into the unchanged setup form. Every returning-family row in the table above reaches its stated destination. No route, router, URL, history entry, snapshot field or persisted acknowledgement is added, and no persistence, hydration, validation or recovery path changes.

**Trace.** `F001` *First-use introduction* and acceptance criteria `13`–`16`; `P8`; Visual & Ergonomic *Parent introduction presentation*, the inventory row, and criterion `24`; Technical Architecture *Root-only navigation*.

**Verification.** Tests through the rendered application and the real persistence adapter for each acceptance criterion and each entry row, including that the example cannot be chosen and creates no session, discovery cycle, Reward Card, History entry or Monthly Goal effect. A fixture asserting the example Mission is approved for all three age bands, so the rule cannot rot when the catalog changes. Type checking, the full suite and the production build, run sequentially, then the scoped diff and `git diff --check`.

### Task 2 — Introduction copy in English, German and Russian

**Outcome.** Every new string exists in all three languages through the existing localization module, with English as the default and fallback, preserving meaning rather than translating literally. No catalog content is edited, adapted or shortened. The strings are listed in the changelog for human review, as earlier plans did.

**Trace.** `F001` *Localization rules* and *Language on the introduction*; Global Specification language requirements; Visual & Ergonomic *Localization resilience*.

**Verification.** The existing localization completeness tests extended to the new keys; rendering in all three languages at `390x780`, `1280x900` and `320`px/`32px` with no clipping, no truncation and no horizontal scroll; `document.documentElement.lang` asserted to follow the selected language on this view as it already does elsewhere.

### Task 3 — Discovery: mobile comparison and reading density

**Outcome.** Every card keeps its localized title, localized short instruction, Mission Category, expected duration and any required adult-involvement and safety wording, complete and untruncated, with safety visible and not behind disclosure. Card height at narrow widths falls, the set span falls with it, and the three Missions stay equal peers with no scene, emphasis or richness promoting one of them. No catalog text changes. No horizontal scroll, carousel, swipe or feed behaviour is introduced.

**Trace.** `F002` *Mission card content* and acceptance criteria `1`, `4`, `7`; Visual & Ergonomic *F002 — Exactly-three Mission suggestions*, *Mobile-first and responsive presentation*, the scene accessibility and performance rules, and criteria `7` and `21`–`23`.

**Verification.** The before-and-after measurement above, on two served builds, EN/DE/RU at `390x780` and `320`px/`32px`, reporting card heights, set span and viewport-heights-to-compare, with the improvement stated as a measured number rather than an impression. Assertions that every required field is present and untruncated on all three cards in all three languages. The existing `F002` suite unchanged. Scene rendering checked against the reduced-motion and performance rules. **The 54 reviewed scenes are not regenerated or replaced.**

### Task 4 — The primary action in every language, ready and active

**Outcome.** **Start mission** and **Mission done** are reachable without scrolling at `390x780` in English, German and Russian. Safety and adult-involvement guidance keeps its position in the reading order and its prominence. The lifecycle, the deliberate start, the exactly-once completion, the timer derivation, the leave paths and their confirmations are untouched.

**Trace.** `F003`; Visual & Ergonomic *F003 — Ready Mission presentation*, *Mission Break transition and active presentation*, *Action hierarchy*, *Localization resilience*, criteria `8` and `9`.

**Verification.** The measurement repeated in all three languages at both configurations, reporting each action's absolute top against the viewport before and after. The existing `F003` suite unchanged, including the exactly-once start and completion assertions. Timer live-region behaviour and focus order re-checked.

### Task 5 — Settings: reach the save action

**Outcome.** The later language and age-context change commits with substantially less scrolling in all three languages, while both effect explanations and both parent notes stay fully visible.

**Trace.** `F001` *Changing setup later* and acceptance criteria `6` and `7`; Visual & Ergonomic *F001 — Setup and localization presentation*, *Action hierarchy*.

**Verification.** The measurement repeated in all three languages, reporting page height and the action's absolute top before and after. Tests asserting a `ready` or `active` session, every completed record and Monthly Goal progress are unchanged by an age-band change.

### Task 6 — Consistency and full verification

**Outcome.** The introduction, Discovery, ready, active, Reward Card, History and settings read as one visual language. The Reward Card is not restyled. No unrelated change enters the diff.

**Trace.** Visual & Ergonomic *Visual consistency without a design system*, *Accessibility baseline*, *Anti-manipulation visual rules*, *Ergonomic review method*.

**Verification.** Type checking, the full suite and the production build run sequentially; the whole branch diff inspected against `main`; `git diff --check`. Across EN/DE/RU at `390x780`, `1280x900` and `320`px/`32px`: no horizontal scroll, visible focus on every interactive element, touch targets at or above the current `52` px minimum, larger text handled without clipping, reduced motion respected, and heading and reading order intact on every changed view. Contrast measured on the rendered page for every changed text element, as the Reward Card follow-up did, rather than argued from colour values.

## Boundaries

Preserved exactly: the `selected → ready → active → completed` lifecycle, the confirmed-write contract, exactly-once completion accounting, timer derivation from persisted timestamps, every recovery and temporary-mode path, Mission History, and Monthly Goal behaviour including its period identity and the single goal-complete prompt.

Not authorized and not proposed: accounts, payments, a backend, analytics, rankings, streak pressure, collectible rewards, or any additional product feature. No new dependency. No new persisted field, storage key or snapshot version. No route, router or URL-addressable page. No change to reviewed catalog text, durations, age eligibility, adult-involvement levels or safety guidance. No regeneration or replacement of the 54 reviewed scenes. No component replaced that is already correct.

Kept in the acceptance criteria throughout: English, German and Russian; accessible focus; comfortable touch targets; larger-text support; mobile performance.

## Remaining decisions requiring approval

1. **Renewed implementation authorization.** Nothing in *Implementation tasks* may begin until it is recorded here. This is the gate.
2. **Which Mission is the example.** Six qualify: `helping-03`, `helping-11`, `helping-13`, `learning-04`, `calm-02`, `calm-08`. A Calm or Helping-at-Home example shows an activity that needs no space or equipment, which suits an introduction; the choice is a content decision and is not made here.
3. **The introduction's copy, including the entry action's label.** New localized strings in three languages are reviewable content, not an implementation detail. They would be written under Task 2 and listed for human review.
4. **Whether reviewed instruction length should be revisited.** Instructions average `291`/`353`/`316` characters and reach `656`. That is the dominant driver of Discovery card height. Revisiting it is a Mission Catalog and Safety decision with a safety and localization review attached, and this plan neither makes nor assumes it.
5. **Whether a back path from setup to the introduction is wanted.** This plan proposes none, for the reason recorded above.

## Definition of complete

This plan is complete when its authorized scope is implemented, each task's verification has actually been run and recorded truthfully here and in the changelog, and the diff is limited to that scope. It claims no MissionKid MVP completion, no deployment readiness, no CI result and no assistive-technology acceptance. Human acceptance of anything built under it would be recorded separately, as the Reward Card follow-up's was.
