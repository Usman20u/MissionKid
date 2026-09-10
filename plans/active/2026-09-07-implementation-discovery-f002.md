# MissionKid Implementation Plan 02 — Mission Discovery and Selection (F002)

**Date:** 2026-09-07
**Status:** Approved — Plan 02 scope; affected implementation paused by a material specification change (see Change control)

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md). That completed foundation plan records:

- User Story / Traceability Validation: `PASSED — 10/10`;
- Full Specification Audit: `PASSED — 10/10`;
- Specification blockers: `NONE`;
- Blocking implementation guessing required: `NO`;
- Actual Mission entries: `NOT a SPEC COMPLETE blocker`, remaining controlled later content-production work required before relevant discovery; and
- the exact declaration `SPEC COMPLETE`.

The approved application foundation and `F001` are delivered by the completed [`plans/completed/2026-09-03-implementation-foundation-f001.md`](../completed/2026-09-03-implementation-foundation-f001.md). No owning specification changed during that work, so the `SPEC COMPLETE` basis remains valid and the material-change revalidation rule in `AGENTS.md` is not triggered.

Once this approved plan is committed and remains the sole active plan, it authorizes product code only within the exact Plan 02 scope below. It does not authorize any `F003` or `F004` behavior.

## Change control — material specification change (2026-09-09)

A human product review found that the reviewed Mission catalog is safe, complete, and correctly localized, but that part of its content quality does not meet the intended MissionKid experience. The owning content and presentation specifications were updated on 2026-09-09:

- [`docs/specs/mission-catalog-and-safety.md`](../../docs/specs/mission-catalog-and-safety.md) adds **Mission Experience Principles**, which govern Mission purpose, concrete action, final beat, meaningful outcome, single hero object or focal action, observable completion, title framing, per-category experience quality, and age-band voice.
- [`docs/specs/visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) authorizes the bounded **Controlled Mission Mini-World scene system**, resolves the previous illustration-library non-goal conflict, and keeps approved text authoritative.
- [`docs/specs/functions/002-mission-discovery-and-selection.md`](../../docs/specs/functions/002-mission-discovery-and-selection.md) records the minimal alignment for Mission card presentation without changing `F002` behavior.

This is a material change to approved specifications affecting Mission content quality and Mission card presentation, so the `AGENTS.md` revalidation rule applies.

### Historical record

Tasks 1 to 4 were completed against the specifications valid at that time and remain truthfully complete. This change does not retract them.

The Task 2 catalog committed in `5e65b37` remains valid, reviewed, safe, correctly localized data that satisfies every eligibility and coverage rule in force when it was published. Its content quality is now additionally subject to the new Mission Experience Principles, which is a republication and refinement review rather than a defect in the committed work.

### Paused work

- Task 5 implementation is paused. The current uncommitted Task 5 working-tree refinement must not be committed until the revalidation below is recorded.
- Task 6 must not begin before the gate is cleared, because bounded replacement operates over the same catalog and suggestion presentation.
- Tasks 7 to 15 remain unstarted and unaffected in scope, but they follow Task 6.
- No Mission identifier, Mission prose, catalog content version, or catalog schema changes as part of this pause.

### Required revalidation before affected implementation resumes

1. Revalidate the affected specification stages for the changed content and presentation authority.
2. Re-run User Story / traceability validation for the affected `F002` stories.
3. Re-run the Full Specification Audit.
4. Record renewed authorization for the affected work in this plan.

### Mission content republication gate

Replacement or refined Mission content may ship only after all of the following, in order:

1. select and refine candidate Missions;
2. review each candidate against the Mission Experience Principles;
3. confirm exact age-band suitability per candidate rather than assuming a shared wording;
4. write the approved English content;
5. produce meaning-equivalent German and Russian content;
6. complete the safety and adult-involvement review;
7. record provenance and review metadata;
8. bump the catalog content version;
9. pass Task 1 record validation;
10. pass whole-catalog publication validation;
11. confirm coverage for all 15 age band x Mission Category cells across the three language contexts;
12. complete the manual content review; and
13. only then update Mission scenes for the final approved Mission identifiers and content.

No step of this gate is authorized by this change-control note alone; each remains ordinary Plan 02 Task 2 and Task 3 work under renewed authorization.

### Renewed authorization (2026-09-09)

The material specification change committed as `a21ef33` has been revalidated against the specification chain at that commit.

- Affected `F002` user-story traceability passes. `P3`, `P4`, and `C1` remain accurate: the principles change which Missions are worth publishing and the scene authority changes how a Mission card presents one, but neither changes discovery behavior or the meaning of any acceptance criterion. No user-story text required amendment.
- The Full Specification Audit passes. No contradiction exists between the Mission Experience Principles, the Controlled Mission Mini-World scene system, and the existing safety, privacy, accessibility, anti-manipulation, and architecture rules.
- No `MissionRecord` field, persisted value, snapshot field, Task 1 record-validation change, or Task 3 publication and coverage-validation change is required. Structural validation stays as published; the principles are a human content-review standard.
- The reviewed catalog `mvp-catalog-2026-09` enters controlled republication under the Mission Experience Principles. It remains historically valid published content.

On that basis the Mission content republication gate above is authorized and may begin.

Task 5 implementation remains paused until republication completes and its Mission identifiers and content are final. Task 6 remains blocked behind the same gate. Task 7 and the later tasks remain unstarted and unauthorized.

### Frozen MVP publication candidate set (2026-09-10)

The Mission candidate phase is complete and the MVP publication candidate direction is frozen at **54 Missions**. Candidate generation is closed. Reopening is allowed only for a demonstrated Step 4 or later content, safety or reliability defect that cannot be resolved inside the frozen concept.

`54`, the category composition below, and the six-per-context coverage result are an **MVP publication and release-quality decision**, not a catalog invariant. The structural publication minimum of three eligible Missions per context and the Task 1 and Task 3 validators are unchanged. No product behavior, schema, persistence or localization mechanism changes.

Category composition: Movement 12, Creativity 12, Helping at Home 9, Learning 11, Calm 10.

References below are editorial candidate identifiers used to carry this decision into Step 4. They are not Mission identifiers and never become production content. `AN` marks `Adult nearby required` and `AP` marks `Adult participation required`; every other entry is `No special adult assistance required`. Origin records which current production record a Mission continues: `KEEP` ships unchanged, `REFINE` reworks that record, `REPLACEMENT` retires it, and `NEW` has no predecessor.

#### Movement — 12

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| MOV-C01 | Bear, Crab, Bird | 4–6, 7–8 | — | REFINE `movement-02` |
| MOV-C02 | Giant Steps and Mouse Steps | 4–6, 7–8 | — | NEW |
| MOV-C03 | Sleeping Giant | 4–6, 7–8 | — | REFINE `movement-06` |
| MOV-C04 | Ten Jumps High | 4–6, 7–8 | — | REPLACEMENT `movement-01` |
| MOV-C05 | The Cushion Course | 4–6, 7–8 | — | NEW |
| MOV-C08 | Statue Shapes | 4–6, 7–8 | — | REFINE `movement-05` |
| MOV-C10 | The Book Balance | 7–8, 9–10 | — | NEW |
| MOV-C11 | The Exact Steps | 9–10 | — | NEW |
| MOV-C14 | The Balance Sequence | 9–10 | — | NEW |
| MOV-C16 | The Low Line | 9–10 | — | NEW |
| MOV-N1 | Two Hands, Two Jobs | 9–10 | — | NEW |
| MOV-N2 | The Slow Descent | 9–10 | — | NEW |

#### Creativity — 12

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| CRE-C01 | The Tiny World | 4–6, 7–8 | — | REFINE `creativity-04` |
| CRE-C02 | Sock Friend | 4–6, 7–8 | — | REFINE `creativity-05` |
| CRE-C03 | Blanket Den | 4–6, 7–8 | **AN** | REFINE `creativity-06` |
| CRE-C04 | Tallest Tower | 4–6, 7–8 | — | REFINE `creativity-02` |
| CRE-C06 | Invent a Sound | 4–6, 7–8 | — | NEW |
| CRE-C07 | The Kind Monster | 4–6, 7–8 | — | NEW |
| CRE-C10 | Four-Panel Comic | 9–10 | — | KEEP `creativity-08` |
| CRE-C11 | The Sound Map | 7–8, 9–10 | — | REFINE `creativity-01` |
| CRE-C12 | The Paper Bridge | 9–10 | — | NEW |
| CRE-C13 | The Instruction Card | 9–10 | — | NEW |
| CRE-C14 | The Ordinary Object Museum | 7–8, 9–10 | — | NEW |
| CRE-N1 | The Code Maker | 9–10 | — | NEW |

#### Helping at Home — 9

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| HELP-C01 | Special Delivery | 4–6, 7–8 | — | REFINE `helping-06` |
| HELP-C02 | Table Captain | 4–6, 7–8, 9–10 | **AP** | REFINE `helping-03` |
| HELP-C05 | Napkin Fold Five | 4–6, 7–8 | — | NEW |
| HELP-C09 | Ready for Tomorrow | 7–8, 9–10 | — | REFINE `helping-07` |
| HELP-C11 | The Table Surprise | 4–6, 7–8, 9–10 | — | NEW |
| HELP-C13 | The Helper's Label | 7–8, 9–10 | — | NEW |
| HELP-C15 | The Water Round | 4–6, 7–8, 9–10 | **AP** | NEW |
| HELP-C17 | The Ready Corner | 7–8, 9–10 | — | NEW |
| HELP-N2 | The Lost-and-Found Box | 4–6, 7–8 | — | NEW |

#### Learning — 11

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| LEARN-C01 | The Upside-Down Room | 4–6, 7–8 | — | KEEP `learning-05` |
| LEARN-C02 | Roll It Down | 4–6, 7–8, 9–10 | — | REFINE `learning-04` |
| LEARN-C03 | Which One Floats? | 4–6, 7–8 | **AP** | NEW |
| LEARN-C04 | The Sound Through the Table | 4–6, 7–8 | — | NEW |
| LEARN-C07 | What's Missing? | 4–6, 7–8 | **AP** | REPLACEMENT `learning-01` |
| LEARN-C08 | How Many Steps? | 4–6, 7–8 | — | REFINE `learning-08` |
| LEARN-C09 | Near and Far | 7–8, 9–10 | — | REFINE `learning-02` |
| LEARN-C10 | Which Lands First? | 7–8, 9–10 | — | KEEP `learning-07` |
| LEARN-C11 | The Disappearing Thumb | 7–8, 9–10 | — | NEW |
| LEARN-N1 | The Balance Point | 9–10 | — | NEW |
| LEARN-N2 | The Water Line | 9–10 | **AP** | NEW |

#### Calm — 10

| Ref | Working title | Age bands | Adult | Origin |
| --- | --- | --- | --- | --- |
| CALM-C01 | Still Water | 4–6, 7–8, 9–10 | **AN** | KEEP `calm-02` |
| CALM-C07 | Slow-Motion Walk | 4–6, 7–8, 9–10 | — | REFINE `calm-08` |
| CALM-C09 | Watch It Change | 7–8, 9–10 | — | KEEP `calm-07` |
| CALM-C11 | The Heavy Blanket | 4–6, 7–8 | — | NEW |
| CALM-C13 | Soft Landing | 4–6, 7–8 | — | NEW |
| CALM-C15 | The Domino Line | 7–8, 9–10 | — | NEW |
| CALM-C16 | The Quiet Unstack | 7–8, 9–10 | — | NEW |
| CALM-C19 | The Pencil Spin | 4–6, 7–8 | — | NEW |
| CALM-N1 | The Sock Snake | 4–6, 7–8 | — | NEW |
| CALM-N2 | The Tight Roll | 9–10 | — | NEW |

Origin totals: KEEP 5, REFINE 15, REPLACEMENT 2, NEW 32.

#### Adult involvement in the frozen set

Seven Missions require adult involvement: two `Adult nearby required` (CRE-C03, CALM-C01) and five `Adult participation required` (HELP-C02, HELP-C15, LEARN-C03, LEARN-C07, LEARN-N2). The remaining forty-seven require no special adult assistance.

#### Coverage result

| Mission Category | 4–6 | 7–8 | 9–10 |
| --- | --- | --- | --- |
| Movement | 6 | 7 | 6 |
| Creativity | 6 | 8 | 6 |
| Helping at Home | 6 | 9 | 6 |
| Learning | 6 | 9 | 6 |
| Calm | 6 | 9 | 6 |

Every age-band and Mission Category context holds at least six eligible Missions, so initial exactly-three discovery succeeds everywhere and at least three unseen eligible Missions remain, making one complete fresh `Another set` available in all fifteen contexts. Age eligibility was not broadened to reach this result; where a Mission genuinely suited only one or two bands it was narrowed instead.

This supports the `Another set` behavior `F002` already defines. It does not alter Task 6 implementation and does not authorize Task 6, which remains blocked until its normal sequencing gate.

#### Step 4 drafting constraints

Final English drafting must satisfy these constraints. Each was established by content review during the candidate phase.

| Ref | Constraint |
| --- | --- |
| HELP-C01 | Service framing; no external reaction; no disguised tidying |
| HELP-C02 | Adult supplies items safe for the child to carry |
| HELP-C11 | Scene must differ visibly from Table Captain |
| HELP-C15 | Completion is cups placed at safe prepared places, not people served; adult controls water amount, safe cups and safe stable placement surfaces |
| HELP-N2 | Completion is founding, not filling |
| CRE-C02 | Completion must not require a listener |
| CRE-C03 | Adult nearby; low, stable, open structure |
| CRE-C04 | Light unbreakable items only |
| CRE-C12 | Design, test, adjust; bending is data, not failure |
| CRE-C13 | Completion must not require another person to perform the card |
| CRE-N1 | Sharing, not secrecy |
| LEARN-C02 | Prediction before test; do not promise which object wins — the child predicts and observes |
| LEARN-C03 | Adult participation; adult-provided and approved safe objects |
| LEARN-C04 | One stable clean table; gentle fingertip tap; no door, floor or moving furniture; no second person; compare contact against air without promising a specific loudness result |
| LEARN-N1 | Long, straight, light objects balanced across a flat finger |
| LEARN-N2 | Adult supplies three safe non-breakable objects that sink on their own; narrow container; same start level each time; nothing held under; no promised result — ask which actually moved the line most. Keep the household setup simple: if final English requires specialized container or object conditions, stop and reopen the Mission rather than hiding complexity in copy |
| MOV-C04 | Jump in place; no furniture or high-object target |
| MOV-N1 | No eyes-closed movement |
| MOV-N2 | Distinguish slowness from CALM-C07 |
| CALM-C01 | Existing water safety model; adult nearby |
| CALM-C11 | Never over the head |
| CALM-C13 | Rolling only, never throwing |
| CALM-C15 | Use only light safe objects that stand stably before the line is built |
| CALM-N1 | Contact placement without disturbing the previous sock; no toppling mechanic; keep distinct from the Domino Line |
| CALM-N2 | Cloth or towel only; the test is whether the roll holds itself; second roll tighter than the first; no sound or special-geometry dependency; keep distinct from HELP-C05 folding |

#### Republication step status

| Step | Status |
| --- | --- |
| 1 — Candidate selection and refinement | Complete |
| 2 — Mission Experience Principles review | Complete |
| 3 — Age-band suitability, pruning and publication freeze | Complete |
| 4 — Approved English drafting | Authorized next; not started |
| 5–13 — Translation, review, provenance, version bump, validation, coverage, manual review, scenes | Not started |

No final English, German or Russian content exists yet. Step 4 may begin only once this freeze record is committed. Task 5 remains paused, Task 6 remains blocked, and Task 7 and the later tasks remain unstarted and unauthorized.


## Objective

Implement `F002 — Mission Discovery and Selection`: the five canonical Mission Categories, the reviewed production Mission catalog, deterministic eligibility and exactly-three suggestion derivation, bounded `Another set` progression, and the deliberate choice that creates exactly one Mission Session in `selected`.

Plan 02 stops at a persisted `selected` session and a typed handoff to the mission start experience. It implements no `ready`, `active`, timer, abandonment, or completion behavior.

## Owning specifications

- [`docs/specs/functions/002-mission-discovery-and-selection.md`](../../docs/specs/functions/002-mission-discovery-and-selection.md) — F002 behavior and acceptance criteria
- [`docs/specs/mission-catalog-and-safety.md`](../../docs/specs/mission-catalog-and-safety.md) — Mission content, eligibility, age suitability, adult involvement, localization equivalence, catalog coverage
- [`docs/specs/technical/technical-architecture.md`](../../docs/specs/technical/technical-architecture.md) — catalog validation, deterministic filtering and ordering, bounded replacement, selection persistence, module boundaries
- [`docs/specs/technical/data-and-state-model.md`](../../docs/specs/technical/data-and-state-model.md) — catalog values, snapshot sections, Mission Session fields, invariants, persisted/runtime/derived classification
- [`docs/specs/visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) — category peer group, exactly-three presentation, Mission card content, safety prominence, loading/unavailable states, accessibility and anti-manipulation rules
- [`docs/global-spec.md`](../../docs/global-spec.md) — product purpose and MVP boundaries
- [`docs/functional-map.md`](../../docs/functional-map.md) — capability ownership
- [`docs/user-stories.md`](../../docs/user-stories.md) — F002-relevant story traceability
- [`docs/business-context.md`](../../docs/business-context.md) — real problem and product ergonomics

`F003` and `F004` remain interface constraints only.

## In scope

- One controlled, bundled, versioned static Mission catalog with reviewed production entries.
- Catalog record validation and an age-band x Mission Category x language coverage guarantee that blocks release.
- Mission Category selection across exactly Movement, Creativity, Helping at Home, Learning, and Calm.
- Deterministic eligibility filtering by selected age band, exact Mission Category, and localized content completeness.
- Exactly-three distinct suggestion derivation with the approved deterministic ordering.
- Bounded `Another set` progression over unseen complete groups within one discovery cycle.
- Mission card presentation carrying localized title, localized short instruction, Mission Category, expected duration, and required localized safety or adult-involvement content.
- Deliberate selection that creates exactly one Mission Session in `selected` through the existing persistence adapter, with confirmed persistence before success is presented.
- F002 incomplete-setup gate, insufficient-content, exhausted-replacement, catalog-failure, and selection-failure states.
- EN/DE/RU localization and the accessibility, responsive, and ergonomic baseline for every implemented F002 view.
- Automated and manual verification for the implemented Plan 02 behavior.
- A truthful dated changelog update after implementation and verification.

## Explicitly out of scope

- `F003` `ready`, `active`, Mission Break, timer, timer recovery, cancellation, abandonment, or completion behavior
- `F004` Reward Card, Mission History, Monthly Goal, completion counting, or rewards
- Existing-active-session conflict resolution and abandonment choice, which `F003` owns
- Season Rewards, Family Quests, School/Classroom mode, and all roadmap v1.1 and v2+ items
- AI mission generation, runtime AI, or any uncontrolled content generation
- A router or non-root product URL
- Backend, server API, server database, serverless runtime, authentication, accounts, cloud sync, or remote persistence
- Analytics, tracking, advertising identifiers, CMS, moderation workflow, payment, social, ranking, chat, device-control, or native-app integration
- A second persistence system, a parallel catalog store, or copying catalog content into the browser snapshot
- A UI component framework, design-system package, or new runtime dependency
- Child full name, identifying name, exact birth date, email, contact data, address, precise location, school/class, credentials, photo, video, completion proof, or other sensitive or identifying child data
- Specification, `AGENTS.md`, roadmap, or completed-plan changes

## F002 boundary and later-state compatibility

- Discovery requires a valid supported age band and a supported UI language. Incomplete, degraded, or blocked-recovery setup must never enter discovery or infer an age band.
- A discovery cycle is one age band, one UI language, and one Mission Category. Changing any of the three, choosing a Mission, or leaving discovery ends the cycle.
- The shown-identifier set and the current suggestion set are runtime state for one cycle. They are never persisted into the browser snapshot.
- Selection creates exactly one Mission Session in `selected` and then exposes a typed, testable handoff indicating the start experience is available. Plan 02 must not render, simulate, or populate the `ready` screen, Mission Break, timer, or any completion effect.
- The data model permits at most one current non-completed Mission Session. If one already exists, Plan 02 must refuse to create a second and must not overwrite, mutate, or delete it; the family-facing conflict choice and abandonment belong to `F003`.
- Discovery must never add a Mission History entry, create a Reward Card, increment Monthly Goal progress, or write `startedAt`, `completedAt`, or `completionPeriodId`.
- `snapshotVersion` stays `1`. The snapshot's `currentSession` section is already declared to hold zero or one session in `selected`, `ready`, or `active`, so Plan 02 widens the accepted values within the existing shape and performs no migration. Snapshots written by the F001 build remain valid.
- Removing or withdrawing a Mission from future discovery must not substitute or rewrite the Mission attached to an existing Mission Session.

## Required technical boundaries

- Keep the controlled catalog bundled, static, versioned, and read-only at runtime. Never copy catalog records or localized Mission content into the browser snapshot.
- Persist only a Mission reference and the immutable selection facts defined by the Data and State Model: `sessionId`, `childProfileId`, `missionId`, `missionCategoryAtSelection`, `ageBandAtSelection`, `durationSecondsAtSelection`, `state`, and `selectedAt`.
- Continue using one namespaced storage key and the one existing persistence adapter. No feature module may call `localStorage` directly.
- Continue the established confirmed-write path: read, validate, replace the complete snapshot, read back, and validate the exact stored result before presenting selection as durably saved.
- Eligibility is exact. Never relax the age band, change the selected Mission Category, mix UI languages, or use unreviewed content to fill a set.
- Order eligible Missions by ascending `catalogOrder`, then by ascending stable Mission identifier using locale-independent Unicode code-point comparison as the exact tie-breaker. The first set is the first three records; `Another set` advances to the next complete unseen group in that same order.
- Never wrap around, recycle, auto-load, stream, or randomize suggestions. Never present one or two Missions as a set.
- Treat catalog records defensively at runtime. Exclude invalid records before discovery, never repair or substitute content, and show only the controlled unavailable or exhausted state to the family.
- Generate `sessionId` through an injectable factory and read the selection timestamp through an injectable clock so tests stay deterministic.
- Add no secret, runtime environment dependency, or new package.

## Minimal likely repository shape

Authorized implementation should add only the files proven necessary. The likely minimum is:

- one catalog domain module defining Mission record types, closed values, and record validation;
- one bundled catalog content module holding the reviewed production Mission entries;
- one discovery domain module owning eligibility, deterministic ordering, exactly-three derivation, and bounded replacement;
- one session domain module owning `selected` creation and its confirmed persistence;
- extension of the existing persistence validation to accept a `selected` current session;
- category-selection, suggestion-set, and F002 state view modules within the existing shallow shell;
- additions to the existing localization dictionaries and stylesheet; and
- focused tests colocated with the existing suite.

Do not introduce a component library, design-token catalog, content pipeline, CMS, or duplicated configuration layer.

## Sequential implementation tasks

### Task 1 — Define the controlled Mission catalog schema and record validation

#### Outcome

Add the catalog domain types and a pure record validator covering stable non-empty unique identifier, exactly one canonical Mission Category, at least one approved age band from the closed set, positive whole-second duration, complete EN/DE/RU title and instruction, complete required safety content in all three languages, internally consistent adult-involvement metadata, finite non-negative whole-number `catalogOrder`, catalog content version, and reviewed discovery eligibility. Duplicate identifiers invalidate every record sharing that identifier; duplicate `catalogOrder` values are permitted.

#### Specification trace

Data and State Model controlled Mission catalog values and closed MVP values; Technical Architecture catalog publication validation and defensive runtime exclusion; Mission Catalog and Safety conceptual Mission content and catalog eligibility.

#### Boundary

Expected areas: a new catalog domain module and its test. No content entries, no discovery logic, no UI, no persistence change. Localized strings are never identifiers.

#### Verification / test intent

Unit-test each invalid shape independently: missing or empty identifier, duplicate identifier, unknown category, empty or unknown age band, zero, negative, fractional or missing duration, any missing localization, missing required safety content in one language, inconsistent adult-involvement metadata, negative or fractional `catalogOrder`, and ineligible or unreviewed provenance. Confirm a valid record passes and that validation is pure and side-effect free.

### Task 2 — Author and review the production MVP Mission catalog content

#### Outcome

Author the reviewed bundled Mission entries required for MVP discovery. Every entry carries a stable identifier, exactly one Mission Category, its approved age bands, a positive realistic guidance duration, meaning-equivalent EN/DE/RU title and instruction with a clear real-world action and end condition, the correct adult-involvement level with matching localized visible content, any required localized safety note and material or environment condition, a valid `catalogOrder`, and content provenance. Content must be short, age-appropriate, globally neutral, screen-leaving, and free of dangerous actions, unsafe equipment, unsupervised travel, purchases, stranger contact, identifying-data requests, and engagement pressure.

#### Specification trace

Mission Catalog and Safety core content purpose, closed categories and age bands, titles, instructions and end conditions, guidance duration, child-safety exclusions, adult involvement and visible safety guidance, materials and environment, per-category safety scope, privacy in Mission content, reward and engagement safety, localization safety, and catalog eligibility; F002 content and safety rules.

#### Boundary

Expected areas: one bundled catalog content module. Author enough complete Missions to satisfy the Task 3 coverage requirement, plus further complete groups where bounded `Another set` should be useful. No total catalog size is mandated beyond that. No AI generation, no placeholder or filler entries, no unreviewed content, no CMS.

#### Verification / test intent

Every authored entry passes the Task 1 validator. Review each Mission against the safety exclusions, adult-involvement consistency, and localization meaning-equivalence rules, and record that the review occurred. Confirm no entry requests identifying child data or implies competition, streaks, or prizes.

### Task 3 — Implement catalog validation and coverage guarantees

#### Outcome

Wire record validation across the whole catalog and add a coverage validator proving that every supported age band x Mission Category x UI language context yields at least three eligible Missions. Because a Mission may be approved for several age bands, coverage is asserted per cell rather than by a total count. Validation failure blocks release. At runtime, invalid records are excluded defensively before discovery without repair, substitution, or duplication.

#### Specification trace

Technical Architecture catalog publication validation, the at-least-three coverage requirement, and defensive runtime exclusion; Mission Catalog and Safety catalog coverage; F002 controlled predefined mission catalog.

#### Boundary

Expected areas: catalog validation module and its test. All fifteen age-band x category cells must pass in all three languages. No eligibility relaxation is permitted to make a cell pass.

#### Verification / test intent

Test that the real production catalog passes whole-catalog validation and the coverage validator for all fifteen cells in EN, DE, and RU. Test that a fixture catalog with a deficient cell fails, that duplicate identifiers invalidate every sharing record, and that an invalid record is excluded at runtime while valid records remain available.

### Task 4 — Implement Mission Category selection and the discovery entry gate

#### Outcome

Implement selection among exactly the five canonical Mission Categories as one equal peer-choice group, reachable only from a valid completed F001 setup. Selecting a category starts a discovery cycle for the current age band and UI language. Changing category, age band, or language discards the displayed set and requests a new complete set for the new context. Incomplete, degraded, or blocked-recovery setup shows the approved gate that routes back to the parent-guided age step without inferring an age or showing Missions.

#### Specification trace

F002 preconditions and inputs, category selection behavior, and incomplete-setup state; Visual & Ergonomic Mission Category Selection row, incomplete-setup discovery gate row, and action hierarchy; Technical Architecture root-only state-driven views; F001 setup-complete handoff.

#### Boundary

Expected areas: shell view selection, a category view module, localization keys, stylesheet. No ranking, popularity, trending, premium treatment, recommendation, or color-only category meaning. No router or deep link.

#### Verification / test intent

Test that exactly five categories render with the canonical labels in EN/DE/RU, that no category is visually or structurally promoted, that each selection starts a cycle for the current context, that changing category, age band, or language discards and replaces the set, and that incomplete, degraded, and blocked-recovery states present the gate with no Missions and no inferred age.

### Task 5 — Implement eligibility, deterministic exactly-three derivation, and Mission card presentation

#### Outcome

Implement pure eligibility filtering by selected age band, exact Mission Category, and complete localized content, then deterministic ordering by ascending `catalogOrder` with ascending stable Mission identifier by locale-independent Unicode code-point comparison as the tie-breaker. The first set is the first three eligible records, always exactly three distinct Missions. When the eligible pool holds fewer than three valid Missions, return the controlled insufficient-content result instead of a partial set. Present the derived set as one bounded group of three equally weighted Mission cards, each showing the localized title, localized short instruction, Mission Category, expected duration, and any required localized safety or adult-involvement note before the family commits to a choice.

#### Specification trace

F002 suggestion set behavior, Mission card content, eligibility rules, and no-complete-eligible-set state; Technical Architecture deterministic filtering, ordering, and first-set rules; Data and State Model derived-state classification; Visual & Ergonomic exactly-three suggestions row and safety and adult-involvement prominence.

#### Boundary

Expected areas: discovery domain module and its test, a suggestion-set view module, localization keys, stylesheet. Derivation stays pure and free of React, storage, clocks, and randomness; the view renders it. All three cards carry equal visual weight with no rank, recommendation, popularity, or color-only meaning. Never relax eligibility, mix languages, duplicate a Mission, or emit one or two suggestions. No selection behavior yet.

#### Verification / test intent

Unit-test filtering by each age band and each category, exclusion of Missions missing content in the selected language, exactly-three output, distinctness, deterministic ordering including the identifier tie-breaker for equal `catalogOrder`, stability across repeated calls, and the insufficient-content result for pools of zero, one, and two eligible Missions. Integration-test that exactly three cards render with all required content in EN/DE/RU, that required adult-involvement and safety text is visible before choosing, and that no card is promoted over the others.

### Task 6 — Implement bounded `Another set` progression

#### Outcome

Implement the deliberate bounded replacement that advances to the next complete group of three unseen eligible Missions in the same deterministic order, tracking shown identifiers in runtime cycle state only. No Mission repeats while a full unseen group remains. When fewer than three unseen Missions remain, replacement is unavailable, the current three choices stay usable, and the state is presented as a bounded catalog outcome rather than a failure. A failed replacement retains the current set intact.

#### Specification trace

F002 requesting another set, no-further-complete-set state, and replacement-loading failure; Technical Architecture bounded replacement and shown-identifier cycle state; Visual & Ergonomic exactly-three suggestions row and anti-manipulation rules.

#### Boundary

Expected areas: discovery domain module and the Task 5 suggestion-set view, plus localization keys. Cycle state is runtime only and never persisted. No wraparound, auto-load, infinite feed, streaming, swipe behavior, randomness, or partial replacement.

#### Verification / test intent

Test that a successful request replaces the set with three unseen distinct Missions, that no previously shown Mission reappears in the cycle, that replacement becomes unavailable with fewer than three unseen records while the current set stays usable, that ending the cycle resets shown identifiers, that a failed replacement leaves the current set unchanged, and that no snapshot write occurs for any of it.

### Task 7 — Implement Mission selection into a persisted `selected` session

#### Outcome

Implement the deliberate choice that creates exactly one Mission Session in `selected` through the existing persistence adapter, persisting `sessionId`, `childProfileId`, `missionId`, `missionCategoryAtSelection`, `ageBandAtSelection`, `durationSecondsAtSelection`, `state`, and `selectedAt`, and confirming the write by exact read-back before presenting success. Widen snapshot validation to accept a `currentSession` in `selected` while keeping `snapshotVersion` at `1`. Emit only the typed handoff indicating the start experience is available. Repeated activation during the transition resolves the same session and never creates a duplicate. If a current non-completed session already exists, refuse to create a second and surface the typed conflict result without mutating the existing session.

#### Specification trace

F002 choosing a mission and transition and selection transition failure; Data and State Model Mission Session fields, snapshot sections, and invariants; Technical Architecture mission selection step and the five-step confirmed-write path; F003 lifecycle boundary.

#### Boundary

Expected areas: session domain module, persistence validation, app state, suggestion view. Inject the identifier factory and clock. Do not implement `ready`, `active`, timer, Mission Break, abandonment, completion, `startedAt`, `completedAt`, `completionPeriodId`, Reward Card, History, or Monthly Goal. Do not copy localized Mission content into the snapshot. Do not migrate the snapshot.

#### Verification / test intent

Test that a successful choice writes exactly one session with exactly the approved immutable fields and `state` `selected`, that success is presented only after confirmed read-back, that repeated activation produces one session, that write failure and read-back failure present no false success and create no session, that an existing current session blocks creation without mutation, that unrelated snapshot sections and storage keys are untouched, and that no timer, completion, History, Reward Card, or Monthly Goal effect occurs. Test that a snapshot holding a `selected` session hydrates and that F001-era snapshots with `currentSession` null remain valid.

### Task 8 — Implement F002 unavailable, error, and recovery states

#### Outcome

Implement the F002-owned states truthfully: insufficient eligible content, exhausted replacement, catalog load failure for the first set, replacement load failure, and selection transition failure. Each preserves the selected context, offers only the approved retry or return to Mission Category selection, and never shows a partial set, relaxes eligibility, substitutes content, or exposes raw technical detail.

#### Specification trace

F002 empty, unavailable, and error states; Visual & Ergonomic error and recovery presentation table and calm parent- and child-facing language; Technical Architecture defensive runtime exclusion and controlled unavailable state.

#### Boundary

Expected areas: discovery views, localization keys, stylesheet. No dead end without a truthful next action. No raw parser, storage, or exception text. No false success.

#### Verification / test intent

Test each state for the correct controlled message, the approved next action, absence of any partial or substituted suggestion, preservation of the current valid set where the specification requires it, and absence of raw technical detail in all three languages.

### Task 9 — Apply the F002 localization, accessibility, and responsive baseline

#### Outcome

Complete EN/DE/RU coverage for every F002 interface string, keep Mission content resolved from the catalog in the selected language, and apply the accessibility and responsive baseline to every implemented F002 view: semantic structure, label-led equal peer choices, logical reading and tab order, visible focus, deliberate focus movement on material context changes, comfortable touch targets, adequate contrast, reduced-motion respect, and wrapping and larger-text resilience. Required adult-involvement and safety content stays explicit, localized, and never conveyed by color or icon alone.

#### Specification trace

F002 mission card content and content and safety rules; Visual & Ergonomic mobile-first presentation, F002 category and suggestion presentation, safety and adult-involvement prominence, localization resilience, accessibility baseline, and anti-manipulation rules; Technical Architecture accessibility and responsive baseline and localization boundary.

#### Boundary

Expected areas: localization dictionaries, F002 views, stylesheet. Reuse the established F001 presentation patterns. No design system, branding pass, illustration set, or attention-capture animation.

#### Verification / test intent

Test interface-message completeness across all three languages, semantic roles and accessible names for the category group and suggestion group, association or announcement of unavailable and error states, keyboard operability, and focus placement after category change, replacement, and selection. Manually inspect narrow mobile and wider desktop layouts in EN/DE/RU with text expansion and larger text, confirming no horizontal scrolling, clipped critical copy, hover-only action, color-only state, or obscured focus.

### Task 10 — Complete automated F002 coverage

#### Outcome

Complete a focused automated suite over the implemented catalog, validation, coverage, category selection, eligibility, ordering, exactly-three derivation, bounded replacement, selection persistence, unavailable and error states, localization, and accessibility behavior. Keep clocks, identifiers, and storage adapters injectable where determinism requires it. Do not add an end-to-end framework without a demonstrated gap.

#### Specification trace

Technical Architecture unit and integration testing strategy; F002 acceptance criteria 1 to 15; Data and State Model invariants and trust decisions; Visual & Ergonomic accessibility and recovery acceptance criteria; Plan 02 scope boundary.

#### Boundary

Expected areas: test files colocated with the existing suite. Tests must protect contract boundaries rather than inflate count. No new dependency.

#### Verification / test intent

The suite must cover every F002 acceptance criterion: exactly three distinct Missions per successful discovery; category, age-band, and language correctness of every presented Mission; exactly five canonical categories; complete card content including duration and required safety or adult-involvement note; no generated or unreviewed content; successful bounded replacement with no repeats; exhausted replacement keeping the current set; the incomplete-setup gate; insufficient-content behavior with no relaxation; replacement failure retaining the current set; one `selected` session per successful choice with no automatic timer; no duplicate session on repeated activation; no History, Reward Card, or Monthly Goal effect; catalog safety, localization, and coverage rules; and absence of forbidden data collection and of social, payment, competition, or device-control behavior. Run type checking, the suite, and the production build, recording actual results.

### Task 11 — Perform manual F002 product-flow verification

#### Outcome

Exercise the built application as a family through category selection, discovery, replacement, exhaustion, unavailable and failure states, and selection into `selected`, across each supported language, each age band, and every Mission Category, at representative narrow and wide viewports.

#### Specification trace

F002 full behavior and acceptance criteria; Technical Architecture manual release checks and root-only behavior; Visual & Ergonomic F002, recovery, responsive, localization, and accessibility requirements; privacy and safety boundaries.

#### Boundary

Serve the production build. Record which browsers, viewports, and scenarios were actually checked.

#### Verification / test intent

Confirm the root-only flow, exactly three suggestions everywhere, correct localized Mission content, visible required adult-involvement and safety copy, bounded replacement and its truthful exhausted state, reload and hydration behavior for a persisted `selected` session, truthful selection-failure messaging, no child-data request, no raw technical error, and no `F003` or `F004` interface. Do not claim browser or assistive-technology coverage that did not run.

### Task 12 — Run the required ergonomic review and target only justified fixes

#### Outcome

Review every implemented F002 view and state against the approved ergonomic method: location, dominant information, primary action or legitimate peer choices, next step, error and recovery clarity, safety and adult context, mobile clarity, accessibility, EN/DE/RU resilience, and unnecessary visual noise. Implement only one to three evidence-based improvements if the review identifies them; record `no change justified` if none is needed.

#### Specification trace

Visual & Ergonomic core ergonomic rule, F002 category and suggestion presentation, ergonomic review method, and acceptance criterion 20; `AGENTS.md` implementation-quality ergonomic gate.

#### Boundary

No broad redesign, new behavior, attention-capture pattern, or design-system expansion.

#### Verification / test intent

Document the reviewed states, concrete findings, the selected zero-to-three outcomes, and why each improves comprehension or safety without altering behavior. Re-run the affected automated and manual checks.

### Task 13 — Audit implementation against owning specifications

#### Outcome

Inspect the complete implementation and dependency diff against F002 and the applicable catalog, safety, technical, data and state, localization, visual, accessibility, and recovery requirements. Identify blockers and make only targeted in-scope corrections.

#### Specification trace

All owning specifications listed above; `AGENTS.md` decisions, implementation quality, traceability, repository hygiene, and material-change rules.

#### Boundary

Expected areas: audit findings only, with targeted in-scope corrections to Plan 02 code, content, or tests where a real blocker is found. No specification, `AGENTS.md`, plan, or dependency change. Do not rewrite correct work for style.

#### Verification / test intent

Produce an evidence-backed audit confirming F002 acceptance-criteria coverage, catalog eligibility and coverage compliance, deterministic ordering and bounded replacement, one-adapter and one-snapshot behavior, truthful failure handling, data minimization, and the absence of `F003` and `F004` behavior, unreviewed content, unrelated code, secrets, and speculative dependencies. Re-run affected tests after any correction.

### Task 14 — Update the dated changelog truthfully

#### Outcome

After implementation, tests, ergonomic review, and audit are factual, update the dated changelog with only the Plan 02 changes and checks that actually occurred.

#### Specification trace

`AGENTS.md` Git and changelog discipline and honest reporting; Plan 02 authorization and completion boundaries.

#### Boundary

Expected areas: the dated changelog only. No product code, test, specification, `AGENTS.md`, or plan change.

#### Verification / test intent

Compare the entry with the actual diff and recorded results. Confirm it describes F002 only, states that `F003` and `F004` remain unimplemented, contains no shell-command diary or conversational material, and introduces no parallel status authority. Do not claim MVP completion, unsupported browser coverage, plan completion, push, PR, or merge prematurely.

### Task 15 — Run final diff, checks, and clean-commit readiness gate

#### Outcome

Review the final repository tree and diff, run every relevant check, resolve real Plan 02 blockers, and prepare focused clean commits only after the plan's completion criteria pass. Keep this plan active until completion is truthful; moving it to `plans/completed/`, pushing, opening a PR, or merging requires its applicable later authorization step.

#### Specification trace

`AGENTS.md` plan discipline, implementation quality, Git and changelog discipline, and repository hygiene; all Plan 02 scope and definition-of-complete requirements.

#### Boundary

Expected areas: verification and commit preparation only. No plan move, push, PR, or merge in this task; each requires its own later authorization.

#### Verification / test intent

Run clean install, type check, automated tests, production build, diff check, repository and status review, secret and personal-data scan, and the recorded manual checks. Confirm only necessary Plan 02 files exist, no specifications or execution contract changed, no `F003` or `F004` implementation exists, no blocker remains, and the commit diff matches the audited work.

## Git discipline

One focused branch, this plan as the sole active plan, focused commits with subjects matching their content, a staged-diff audit before each meaningful commit, and no attribution trailers or AI metadata in repository material. Push, PR, and merge require explicit authorization for the current work. The changelog records only factual completed work. This plan moves to `plans/completed/` only when its status is truthfully complete.

## Specification-change rule during implementation

If implementation exposes a missing or conflicting product, content, safety, technical, state, recovery, or interaction requirement:

1. stop the affected implementation;
2. do not invent behavior or Mission content;
3. update the owning specification first; and
4. follow the material-change revalidation rule in `AGENTS.md` before resuming affected implementation.

Ordinary implementation choices already delegated by unchanged approved specifications and this approved plan do not require specification edits. Choose the smallest reasonable option and verify it.

## Definition of Plan 02 complete

Plan 02 is complete only when all of the following are true:

- the reviewed production Mission catalog exists, passes whole-catalog validation, and every age band x Mission Category x language cell yields at least three eligible Missions;
- every catalog entry has complete meaning-equivalent EN/DE/RU content and consistent adult-involvement and safety metadata;
- the five canonical Mission Categories are presented as one equal peer group and discovery is unreachable without valid F001 setup;
- eligibility, deterministic ordering, and exactly-three derivation match their owning specifications and never relax or fill;
- bounded `Another set` progression never repeats, recycles, auto-loads, or shows a partial set, and its exhausted state is truthful;
- a successful choice creates exactly one Mission Session in `selected` with exactly the approved immutable fields, confirmed by read-back, with no duplicate on repeated activation;
- no `F003` or `F004` behavior, timer, Reward Card, History, or Monthly Goal effect exists;
- F002 unavailable, error, and recovery states remain truthful and expose no raw technical detail;
- EN/DE/RU coverage is complete and the accessibility and responsive baseline covers every implemented F002 view;
- applicable automated tests, type checking, and the production build pass;
- manual F002 product-flow verification is complete and reported accurately;
- the ergonomic review covers every implemented F002 view and state, with any justified one-to-three improvements implemented and verified;
- no unrelated code, speculative infrastructure, new dependency, secret, personal data, or known blocker remains;
- the dated changelog records only factual completed work;
- the final implementation and specification audit and full diff review pass;
- focused clean commits exist; and
- the branch is ready for an explicitly authorized push, PR, and merge workflow.

Plan 02 completion is not MissionKid MVP completion. It establishes `F002` only, and later functions require separately approved plan scope.

## Approval record

- Implementation Plan Audit: recorded in the Plan 02 planning audit.
- Blocking plan defects: `NONE`.
- Blocking implementation guessing required: `NO`.
- Owning specifications require no modification before implementation.
- The durable `SPEC COMPLETE` evidence in [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md) remains valid, and no owning specification changed during Plan 01.
- Implementation authorization is limited strictly to this Plan 02 scope: `F002` Mission Discovery and Selection. `F003`, `F004`, and all other excluded or future work remain unauthorized.
