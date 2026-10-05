# MissionKid Plan 06 — whole-application visual design

**Date:** 2026-09-29
**Status:** Active — implemented presentation awaits human visual/content review. The full-width layout, both browser fixes and the bounded focus-visibility correction are preserved; all `102` Mission illustrations and nine 3D site images are integrated. The restored `learning-04` / `learning-13` / `learning-14`, `9–10`, set is content-inspected, implemented and verified in the bounded batch below on 2026-10-05. Plan 06 is not complete or visually accepted; unrelated review holds remain.
**Current branch:** `feat/reference-visual-redesign`; recovered HEAD `7b618bf`, clean worktree before the Learning-image batch below. Earlier branch checkpoints remain historical evidence.

Current findings and open-item acceptance criteria are under [Repository-readiness audit](#repository-readiness-audit--2026-10-05). The dated sections below retain their original implementation and verification basis; superseded criteria describe those earlier batches, not current obligations.

## Scope history and branch checkpoints through 2026-10-03

The following status and branch paragraphs are the historical checkpoints accumulated before this audit. In particular, the `51`-photograph proposal and the original review hold were superseded by the later recorded authorizations; earlier implementation verification does not imply acceptance of today's design.

**Historical status:** Scope recorded before implementation at `f68470a`; implemented and verified at `53d6a8d`, recorded under *Outcome*. **Implementation is paused, from 2026-09-29, while the reviewer visually reviews Plan 06**; human visual acceptance is not given and not recorded, and the known visual gaps listed under *Outcome* remain, so this plan stays active. Further imagery is a proposal pending review, not an approved obligation — see *Review hold and clarifications*. **One bounded exception to the pause** is authorized on 2026-09-29: the `helping-11` image integration recorded under *Bounded image integration*, and nothing else — scope recorded at `cca58f0`, implemented and verified at `899ff79`. **On 2026-09-30 the reviewer authorized a complete visual redesign against a newly supplied reference**, recorded under *Reference redesign — 2026-09-30*. It ends the pause for that scope and carries this plan's first specification amendments, recorded at `6f56054`; it is **implemented and verified at `d8bad52`**. **On 2026-10-01 the reviewer authorized one further batch**: a supplied package of nine images that finishes the introduction's hero and replaces the category and step images, recorded under *Visual asset package — 2026-10-01* with its specification amendments before code at `0758e36`; it is **implemented and verified at `f30afbd`**, its verification interrupted once and completed, as recorded there. **On 2026-10-02 the reviewer authorized a bounded pre-release verification batch** on the current design, recorded under *Pre-release verification — 2026-10-02*: actual Safari demonstrated two defects, fixed at `e7f2119`; Safari, Chrome `154`, Firefox `157` and Chrome for Testing `149` pass on the fixed build, and a real-phone check is prepared; it is not release approval. **Also on 2026-10-02 the reviewer authorized Mission image briefs and a full-width layout**, recorded under *Mission image briefs and the full-width layout — 2026-10-02* before code; the briefs are exported and the layout **implemented and verified at `395a99d`**, while `51` Mission photographs remain to be produced, so this plan stays open. **On 2026-10-03 the reviewer authorized integrating a supplied package of `102` age-specific 3D Mission illustrations**, which supersedes the photographic proposal, recorded under *3D Mission image family — 2026-10-03* with its specification amendments before code at `49a0344`; it is **implemented and verified at `21eab4f`**: `99` of `102` illustrations are integrated, and one, `learning-13` for `9–10`, waits for regeneration with its Discovery set. **Also on 2026-10-03 the reviewer authorized replacing the nine remaining photographic site images** — the introduction's hero, its three steps and the five categories — with matching 3D images, recorded under *3D site images — 2026-10-03* with its specification amendment before code at `4910459`; it is **implemented and verified at `458c517`**: all nine roles show the new images. Human visual acceptance is not given and not recorded, so this plan stays active.
**Branch:** `feat/whole-application-visual-design`, taken from `9f53610`, the commit that closed Plan 05 on `feat/guided-entry-and-presentation`. That branch is preserved unchanged at its closure. The reference redesign continues on `feat/reference-visual-redesign`, taken from `2e81cec`, the head of `feat/whole-application-visual-design`, which is preserved unchanged. No history was rewritten.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration.

It follows the completed implementation plans `F001`–`F004`, the Reward Card follow-up, and [Plan 05](../completed/2026-09-22-guided-entry-and-presentation.md), closed on 2026-09-29 with the reviewer's visual acceptance of its reviewed presentation. All of them are historical evidence and none is reopened. The initial 2026-09-29 batch amended no specification. Later amendments, traceability validation, focused Full Specification Audits and renewed authorizations are recorded in *Reference redesign*, *Visual asset package*, *3D Mission image family* and *3D site images*; those records qualify the completed foundation gate for the changed presentation basis.

**Authorized on 2026-09-29** by the reviewer's instruction: continue the whole-application visual design, using the supplied warm, cream-and-green photographic Discovery reference as the established direction, across the parent introduction and setup; Discovery, its Mission Categories and Mission cards; Ready, Active and the leave confirmation; settings and the setup handoff; temporary mode, recovery, reset and the empty and error states; and the relationship to the accepted Reward Card and History. The instruction asks for concrete gaps from the existing inventory, this scope recorded before code, and cohesive improvements through reusable presentation rules; for the current step, the main action and the secondary actions to be immediately understandable; for honest treatment of the Mission imagery; and for verification in English, German and Russian on desktop, mobile and narrow enlarged-text layouts.

**Excluded:** pushing, a pull request, merging, deployment and branch deletion.

## Specification check, before code

This check belongs to the initial 2026-09-29 batch. Later imagery, typography and redesign permissions are owned by the amended specifications and their dated revalidations below.

| Question | Finding |
| --- | --- |
| Does any intended change need new behaviour, state, data or copy? | No. Every change below is presentation of existing content and controls, or the order of two existing elements on one view. No string is added or edited. |
| Palette, typography, spacing | Open by specification: *No final palette or exact color token is selected here*, *No final font family is selected here*. |
| Centring single-column views on a wide screen | Required rather than restricted: wider layouts must *preserve the same content order and action hierarchy*. Order and hierarchy are unchanged. |
| The handoff's action order | The *Action hierarchy* rules ask for one visually dominant primary action and limited, lower-prominence secondary actions. `F001` fixes no order for the handoff, and no test pins one. Focus order is unchanged. |
| A graded atmosphere for the authored scenes, and one frame for stills and scenes | Inside *Controlled Mission Mini-World scene system*: category colour still lights each scene's environment, objects keep their local colour, one focal subject keeps its emphasis, and no composition changes. |
| A Mission's image on Ready, Active, the Reward Card, History or any parent surface | **Not permitted without an amendment.** The scene system's *only authorized use outside Mission Discovery* is the introduction's example. Not done; recorded under *Decisions for the reviewer*. |
| A logo, a brand mark or a web font | A logo or brand identity is an explicit non-goal, and a font asset would need the Technical Architecture's size and maintenance review. Not done: the wordmark stays text in the existing system font stack. |
| The reference's header links to History and Settings, its subheading, its Russian headings | Navigation and copy. Not done, as in Plan 05. |

**No specification amendment is made**, so no revalidation is required. This is recorded because the gate requires it rather than assumed.

## How the work is bounded

The following bound applied to the initial batch. The authorized reference redesign superseded it under the Visual & Ergonomic Specification's explicit redesign exception; the current repository audit has its own bounded scope below.

The *Ergonomic review method* bounds each view at one to three targeted improvements, and acceptance criterion `20` forbids a generic redesign. This plan applies that bound view by view. What makes the application read as one design is that every targeted improvement is carried by the same small family of presentation rules — the *small coherent family of presentation patterns* the specification asks for under *Visual consistency without a design system* — rather than by a redesign or a token catalog.

## Starting point, measured on the current build

The build of `9f53610`, identical by content hash to the `b0319d1` gate build, in Chrome for Testing headless shell `149.0.7827.55`, English, German and Russian at `1280x900`, `390x780` and `320` CSS px with a `32px` root: `204` state, configuration and language combinations through the ordinary flow and real conditions. The inventory in Plan 05 is the starting list; nothing here repeats its investigation.

- **Clean on every hard check:** `0` clipping against any clipping ancestor, `0` page overflow, `0` overlap, `0` contrast failures with a minimum of `5.10:1`, touch targets at `52` px and above.
- **Where it falls short** is what the gaps below record.

## Concrete gaps

| # | Gap | Evidence |
| --- | --- | --- |
| G1 | **Single-column views sit on the left of a wide panel.** On a desktop every single-column view uses a `72rem` panel whose content stops well short of its right edge | Share of the panel's inner width left unused at `1280x900`: Ready `53` %, the Reward Card `51` %, Active `48` %, setup, settings, the handoff and temporary mode `39` %, recovery `40` %. Plan 05 recorded the Ready and Active case as a residual |
| G2 | **The product's name is the quietest text on the page, and parent context is barely marked.** The wordmark is body size; child-facing views repeat it as their eyebrow; *Parent area* is small grey text | `16` px wordmark; the parent/child distinction the specification's *Purpose* asks for rests on one small line |
| G3 | **Discovery's second step is under-signalled.** Once a category is chosen, the Missions' `h2` is styled as a small uppercase label | *Three Missions* at `16.8` px, smaller than the category legend above it at `18` px |
| G4 | **Mission card anatomy.** The action's hairline is drawn on the choose button's own top edge; `Another set` is meant to be centred and is not; duration, which the specification lists as comparison information, is an `11.8` px uppercase line; guidance labels are `11.5` px uppercase on cards and sentence case on Ready and Active — two patterns for one kind of information | Inspected on the served build; `justify-self: center` has no grid parent there |
| G5 | **Two kinds of Mission image with no shared frame language.** `2` of the `33` reachable suggestion sets are photographic and `31` are authored scenes on a saturated category-pastel stage | Enumerated from the catalog and the ordering rule: no set mixes the two, but a family moving between categories moves between photographs and flat pastel stages whose windows share only their ratio |
| G6 | **Ready and Active answer their first question weakly.** On Ready the Mission's title — the answer to *What is the Mission?* — is `24` px; on Active the instruction to leave the screen, which the specification puts first, is body text below the heading | Visual & Ergonomic *F003 — Ready Mission presentation*, *Mission Break transition and active presentation* |
| G7 | **The handoff's main action is not first.** *Change setup* comes before *Find a Mission*, which sits between two outlined buttons | Recorded in Plan 05's review package as a point to judge |
| G8 | **Enlarged text on the two surfaces the tenth authorization did not reach.** At `320` px with a `32px` root ordinary words break mid-word on the introduction and Discovery — *choose*, *language*, *Welche*, *Mission?* — because their stacked `rem` insets remain | Words broken across lines, EN / DE / RU: the introduction `14` / `27` / `38`; Discovery's category step `7` / `9` / `11`, and its states with a set `7`–`10` / `13`–`20` / `15`–`23`. Every surface `b0319d1` covered measures `0`–`4` per language |
| G9 | **The Reward Card and History share little with the rest beyond the wordmark**, and on a desktop the Reward Card sits in the left third of a wide white panel | G1's measurement; their cool ground is accepted and is not a gap |
| G10 | **The unexpected-error view** renders outside the shell on the cool default ground | Its own markup; it is the one state whose ground no rule chose |

## Implementation scope

### Shared presentation rules

| Rule | What it establishes | Gaps |
| --- | --- | --- |
| **P1 — Ground and frame** | The warm ground is the product's default; the Reward Card and History keep their accepted cool ground. Views with two or three columns — the introduction and Discovery — keep the wide frame; every single-column view is held to a reading frame and centred. The header stays where it is on every view, so the product's name does not move between steps | G1, G9, G10 |
| **P2 — Heading block** | A confident wordmark in the existing font. *Parent area* becomes a small tag, so a parent surface is recognisable at a glance; child-facing views keep their eyebrow as it is. The view title is unchanged | G2 |
| **P3 — Mission presentation** | One pattern wherever a Mission is shown — card, the introduction's example, Ready and Active: the Mission Category as a small tinted tag beside a legible duration, a title with presence, and **one guidance pattern** for adult-involvement and safety wording, with a sentence-case label | G4, G6 |
| **P4 — Imagery frame** | Stills and authored scenes share one window: inset in the card with its own radius and the same neutral inner edge. The authored scenes' atmosphere is graded toward the warm ground — category light kept, softened — so they belong to the same world as the stills. No still is filtered and no composition changes | G5 |
| **P5 — Action layer** | Primary first, secondary after and subordinate, grouped by what they act on. The card's action sits below a real hairline with space between them; `Another set` is centred under the set | G4, G7 |
| **P6 — Room for enlarged text** | The tenth authorization's `--room` rule, unchanged, extended to the introduction and Discovery: the page gutter, the section's side padding and the insets inside them give their width back where the screen is narrow for the text, and stay identical at every ordinary size | G8 |

### Per surface — the targeted improvements

| Surface | Improvements (at most three) | Trace |
| --- | --- | --- |
| Parent introduction | The example card takes P3 and P4; P6 | `F001` criteria `13`–`18`; Visual & Ergonomic *Parent introduction presentation*, criterion `24` |
| First-use and incomplete setup, settings, temporary mode | P1 reading frame; P2 parent tag | `F001`; *Setup presentation* |
| Setup handoff | P1; P2; P5 — *Find a Mission* becomes the evident next step: *Change setup* stays with the summary it changes, and the sentence that MissionKid is ready leads into the primary action, with *Mission history* secondary beside it | `F001`; *Action hierarchy* |
| Discovery — categories | P6 | `F002`; *F002 — Mission Category Selection presentation* |
| Discovery — three Missions | G3: the set's existing `h2` is restyled as the step's heading — presentation only; P3 and P4 on the cards; P5 | `F002` criteria `1`, `4`, `7`; *F002 — Exactly-three Mission suggestions* |
| Ready | P1; P3 — the Mission's title leads its own block, with the card's tag, duration and guidance pattern | `F003` criteria `2`, `3`; *F003 — Ready Mission presentation* |
| Active | P1; the instruction to leave the screen becomes the view's lead; P3 | `F003` criteria `5`–`7`; *Mission Break transition and active presentation* |
| Leave confirmation | Inherits P1. No change of its own: it already carries the product's confirmation pattern | *Confirmed abandonment and completion presentation*; `F003` criterion `16` |
| Recovery, the reset panel, History empty, Discovery's bounded and unavailable states, the error view | P1; P2 on the parent ones; G10's ground on the error view | *Loading, empty, unavailable, error, and recovery presentation* |
| Reward Card and History | P1 frame and the header only. **Their ground, surfaces, colours, type, content and order are unchanged**, and the Reward Card itself is compared element by element before and after | `F004`; the Reward Card follow-up's acceptance |

## Preserved exactly

Every reviewed Mission title, instruction, adult-involvement note and safety note, complete and visible as text, at no smaller size; every translation; Mission eligibility and deterministic ordering; exactly three equal peers; persistence, hydration, recovery, the lifecycle, the timer and every session behaviour; focus order, focus management and the focus ring; touch targets at `52` px and above; reduced motion; and the `b0319d1` readability improvement, which P6 extends rather than touches.

The one intended change to reading order is on the handoff: *Change setup* moves above the sentence that MissionKid is ready for the next step, next to the summary it changes. No control changes position in the focus order.

## Not done, and why

- **A Mission image on Ready or Active.** It might help recognition, but the specification permits scenes only in Discovery and on the introduction's example, so it would need a Visual & Ergonomic amendment and revalidation first. It is recorded as a proposal for review only, not as planned work.
- **Header links to History and Settings, a step indicator, new headings or subheadings.** Navigation or new copy.
- **A logo, a brand mark, a web font.** A specification non-goal, and an asset review respectively.
- **Replacing, redrawing or generating any Mission image.** The grade and the frame are presentation of the existing assets. *Amended on 2026-09-29:* except `helping-11`'s image on the introduction's example, under *Bounded image integration*. No image in Discovery changes.
- **Restyling the Reward Card or History.** Accepted; they keep their identity.

## Mission imagery — the honest status, and proposals for review

> **Reframed on 2026-09-29 at the reviewer's instruction.** Beyond the counts, everything in this section is a proposal pending review of the actual design and of the applicable content rules. None of it is an approved obligation: not `51` further photographs, not the eight groups below, and not a Mission image on Ready or Active. Earlier wording here described stills as *needed* and the groups as *delivery units*; it is replaced, and the change is recorded in the changelog.

**Three photographic stills are not a photographic imagery system, and this plan does not claim one.** After this plan the two kinds of image share one frame and one warm light; they are still two kinds. Two directions are open and neither is decided: reviewed stills for the other `51` Missions, or an accepted decision that the authored scenes are the product's presentation. Both are content and authorization decisions, not implementation.

**An observation for that review, not a rule this plan sets.** A reachable set that mixed a still with an authored scene would engage the specification's requirement that the three suggestions stay visual peers: a photograph beside two drawings could make one of three look richer. Enumerating every reachable set shows which Missions share sets, and so which would have to be considered together if stills were extended:

| Proposed group | Missions | Sets it would cover |
| --- | --- | --- |
| Helping at Home | `9`: `helping-03`, `-15`, `-10`, `-12`, `-14`, `-09`, `-11`, `-07`, `-13` | Every Helping at Home set, **and the introduction's example**, `helping-11`, which is the first Mission image every family sees and cannot take a still alone without mixing a Helping set |
| Creativity, remainder | `9`: `creativity-11`, `-08`, `-01`, `-04`, `-13`, `-09`, `-12`, `-06`, `-14` | Every Creativity set, with the three existing stills |
| Calm | `10`: `calm-02`, `-07`, `-10`, `-11`, `-09`, `-08`, `-12`, `-13`, `-15`, `-14` | Every Calm set |
| Learning, first | `6`: `learning-09`, `-07`, `-05`, `-12`, `-08`, `-02` | Learning's first sets for every age band |
| Learning, second | `5`: `learning-04`, `-11`, `-13`, `-10`, `-14` | The rest of Learning |
| Movement, first | `3`: `movement-02`, `-10`, `-06` | Movement's first set for `4–6` and `7–8` |
| Movement, middle | `6`: `movement-16`, `-15`, `-12`, `-09`, `-11`, `-05` | Movement for `9–10` first, and the second sets for `4–6` and `7–8` |
| Movement, last | `3`: `movement-13`, `-14`, `-17` | Movement's second set for `9–10` |

**Twelve of the fifty-one are about a child's own body** — their authored scene's focal subject is a child figure: `movement-02`, `-05`, `-06`, `-10`, `-12`, `-14`, `-15`, `-16`, `-17`, `learning-02`, `-05` and `calm-08`. The specification forbids depicting a recognizable real child and photorealistic depictions of children, so a still for any of these would need a subject that is not the child — a floor line, a pair of feet, a cushion course — and each is a genuine design question for the content reviewer, not a commission to be filled. Five groups contain at least one of them: Calm, Learning's first group and all three Movement groups. Helping at Home, Creativity's remainder and Learning's second group contain none.

**What the three integrated stills met**, as a reference for that review rather than a specification: `3:2`, supplied at `1536x1024` and bundled at `1000x666`; no text, no recognizable person, no face; a plain surface with no housing, resource or household signal; only what the Mission's reviewed instruction describes; consistent with its reviewed safety note; inspected against both before integration, with the catalog never changed to fit an image.

## Verification

- **Before and after on two served builds** with the same harness: every state above — including the Discovery conflict, the Mission-unavailable state, the start issue, temporary mode, recovery and both reset panels — in English, German and Russian at `1280x900`, `390x780` and `320` px with a `32px` root, and the parent and Discovery states under the browser's own `32px` setting.
- **Direct checks, not height:** `0` clipping against every clipping ancestor, `0` page overflow, `0` overlap; composited contrast at `4.5:1`, or `3:1` for large text; touch targets at `52` px and above; every reviewed instruction, adult-involvement note and safety note present in full; the same words in the same order everywhere except the one handoff change named above; no text element's computed size reduced; heading order and focus order identical; the focus ring on every stop; no new motion without a reduced-motion guard; no request to another origin.
- **Enlarged text:** words broken across lines, before and after, on every surface — falling on the introduction and Discovery, and not rising anywhere `b0319d1` reached.
- **The Reward Card compared element by element**, before and after.
- **Gates** once, sequentially, with complete output kept: relevant tests, `tsc --noEmit`, the full suite, the production build, `git diff --check`. Tests change only where markup changes, and a stylesheet invariant is added only where a new layout layer needs one.
- **Screenshots from the actual builds**, before and after, at `2x`, delivered with a short status.

## Outcome, at `53d6a8d`

**Six files.** `src/styles.css`; `src/AppShell.tsx`, which marks the parent area's line and groups the handoff's two onward actions; `src/SetupFlow.tsx`, which moves *Change setup* above the sentence that leads into them; `src/MissionReady.tsx`, which gives the Mission's meta line its category for the tag's light; `src/MissionSuggestionSet.tsx`, which puts the card's action on its own layer; and `src/SetupFlow.test.tsx`. No copy, catalog content, image, control, state, route, persistence, dependency or behaviour changed.

### What changed

| Rule | On the product |
| --- | --- |
| P1 — Ground and frame | The warm ground is the default, including the frame painted before mounting and the unexpected-error view. The Reward Card and History draw their accepted cool ground on the shell. Single-column views sit in a centred `42rem` frame; the introduction and Discovery keep the wide one. Unused panel width on a desktop: the parent forms `39` → `0` %, recovery `40` → `1` %, Ready `53` → `13` %, Active `48` → `13` %, the Reward Card `51` → `16` % |
| P2 — Heading block | The wordmark at `1.3rem` and the weight of a name. *Parent area* becomes a small tag on every parent surface; child-facing views keep their line |
| P3 — Mission presentation | Cards, the introduction's example and Ready show the Mission Category as a tag in its own light beside a legible duration — `11.8` px tracked capitals before. One guidance pattern everywhere a Mission is shown: a tinted panel, a mark down its edge and a sentence-case label. On Ready the Mission's title leads its block; on Active the instruction to leave the screen leads the view and the title keeps its size. Discovery's existing `h2`, *Three Missions*, is restyled from `16.8` px uppercase to `23`–`30` px sentence case; its markup and heading level are unchanged, as *Review hold and clarifications* sets out. The session's reading blocks share one measure |
| P4 — Imagery frame | Stills and authored scenes share one window, inset in the card with its own corners and the same neutral inner edge. Behind the scenes, the window, the walls, the floors, the haze and the light are graded toward the warm ground with the category still lighting them, and the floor seam loses its weight. No still is filtered and no composition changes; engines without `color-mix` keep the previous colours |
| P5 — Action layer | The card's hairline moves off the button onto the action's own layer, with room on both sides; `Another set` is centred under the set; on the handoff *Change setup* sits under the summary it changes and *MissionKid is ready for the next step* leads into *Find a Mission*, with *Mission history* beside it. Focus order is unchanged |
| P6 — Room for enlarged text | The `--room` rule reaches the introduction, Discovery and the category controls, and every action's inset; the eight rules that had listed views one by one are replaced by the defaults |

### Found during verification, and fixed

1. **The larger wordmark made the header `64.95` px tall**, setting every view below it on a fractional pixel row. Found while measuring the Reward Card's position; the header is now a whole `66` px.
2. **The handoff's lead-in sentence was hyphenated under the browser's `32px` setting**, splitting *bereit* and *nächsten*, which fit the line below whole: German went from `1` to `3` broken words, against this plan's own criterion. The sentence now keeps its words whole, and the count is `1` again.
3. **The reset panel's consequence text used the browser's default line height** of about `1.2`, the densest paragraph any parent reads. It takes the `1.55` every other parent paragraph has. This predates this plan.

Two choices were measured and changed: a `46rem` reading frame still left the parent forms and Ready visibly short of their panel, so it became `42rem`; and measures in `ch` let the session's blocks end on four different edges, so they share one measure in `rem`.

### Verification

Chrome for Testing headless shell `149.0.7827.55`, the same harness on two served builds — before: the build of `9f53610`, whose product source is `b0319d1`'s; after: the build of `53d6a8d`, byte-identical to the one measured. English, German and Russian, through the ordinary flow and real conditions — blocked storage, an unreadable snapshot, a refused write, a second tab, a renamed stored Mission.

| Check | Result, before → after |
| --- | --- |
| Combinations | `260`: `24` states at `1280x900`, `390x780` and `320` px with an injected `32px` root, and `20` states under the browser's own `32px` setting, the root asserted `32px` before and after every capture |
| Clipping against every clipping ancestor, page overflow, overlap | `0` → `0` everywhere |
| Contrast, composited | minimum `5.10:1` → `5.10:1`, `0` failures |
| Touch targets | minimum `52` px → `52` px, `104` px at the `32px` root |
| Words | the same words in the same order in `248` of `260`; the `12` handoff combinations have the same words in the intended new order |
| Headings, focus order, focus ring | headings identical in all `260`; focus order identical in the `192` combinations walked by keyboard — every configuration but the phone — with the `3px` ring on every stop |
| Type size | no text element's computed size fell anywhere |
| Words broken mid-word, injected `32px` root | `341` → `50`. The introduction `14` / `27` / `38` → `0` / `4` / `5` in EN / DE / RU; the category step `7` / `9` / `11` → `0` / `1` / `0`; Discovery's sets `7`–`10` / `13`–`20` / `15`–`23` → `0`–`2` / `2` / `0`–`1`. **No state rose.** Each of the `50` remaining is measured: `17` break at the word's own hyphen, such as *кого-нибудь*; `31` are wider than their column, such as the Russian heading's *приключения.*; `2` are *подтверждено.* on temporary mode, `220.5` px in a `220` px column, unchanged from before |
| Words broken, browser `32px` setting | `486` → `279`, **no state rose**. The rest are chiefly the parent surfaces' accepted hyphenation, identical before and after |
| Line boxes at the `32px` root | `5648` → `4614` |
| Requests | none to another origin; no failed request or page error |

- **The Reward Card's identity, element by element.** All `11` elements keep every computed colour, background, border, radius, shadow, type size, weight, line height, spacing and box size, in all nine configurations. On a phone, compared pixel by pixel in English, the card's image differs from before in `13` pixels, all in its rounded corners where the panel shows through at a new height, by one level; the card itself is identical. It moved: into the centred frame on a desktop, and down with the header.
- **History's identity.** Every colour, surface, type size and spacing is identical; on a desktop the record is `606` px wide instead of `1054`, because the shared frame applies to it.
- **Their cool ground** is visually identical wherever only the ground shows.
- **The unexpected-error view** was shown through two probe builds of the before and after sources — never shipped, each differing from its product only by one thrown error in `ParentIntroduction.tsx`: cool ground to warm, a `42rem` frame, contrast `6.37:1`, no clipping or overflow.
- **Gates**, once, sequentially, with complete output kept: relevant tests `420` passed, `tsc --noEmit` clean, the full suite at **850 tests across 23 test files**, a clean build byte-identical to the measured one, `git diff --check` clean. **One test was added**: the handoff's reading order and its unchanged focus order. It was proven to bite — with the previous order restored it fails, and it passes once the change is back. No other test failed at any point.

### Limitations

One engine against one build; no Safari, Firefox or real device, so the `color-mix` fallback and Safari's prefixed hyphenation are unverified; no assistive technology; no CI. The graded scenes and every other visual judgement here are the implementer's, not a content or human visual review. Human visual acceptance is not given and not recorded.

### Known visual gaps remaining

Stated so that this outcome is not read as completing the design.

- **The Mission imagery is mixed in kind.** `3` of `54` Missions have reviewed stills, and the introduction's example — the first Mission image a family sees — is an authored scene. Whether and how to change that is a proposal pending review, recorded above; nothing about it is approved.
- **Ready and Active carry no image of the chosen Mission.** The specification does not permit one without an amendment; adding one is a proposal for review only.
- **The reference's rounded display face, its header links and its subheading** are not reproduced: a font asset, navigation and copy respectively.
- **Child-facing views repeat the product's name** as their area line directly under the wordmark. That line names the child-facing area, so changing it is a content decision rather than presentation.
- **At an enlarged text size `31` words are wider than any column a `320` px screen gives them** and still break.

## Review hold and clarifications — 2026-09-29

Recorded from the reviewer's instruction. **Implementation is paused while Plan 06 is visually reviewed**, and no product file changed for this section: it corrects the record only, from the committed diff and the measurements already taken.

### 1. *Three Missions* did not become a semantic heading — it already was one

The outcome said the set is *headed as the step* and goes *from a label to a heading*, while also reporting heading structure unchanged. Both are true only because the change was visual. Exactly:

- **Markup: unchanged.** Before and after, the element is `<h2 class="mission-suggestions__title" id="mission-suggestions-heading" tabindex="-1">` rendering `discovery.suggestions.heading`. `53d6a8d` changes nothing in it: its diff of `MissionSuggestionSet.tsx` touches only the card's action.
- **Heading outline: unchanged**, measured on both builds: `H1` *What kind of Mission?*, `H2` *Three Missions*, then an `H3` for each Mission. It remains the focus target after *Another set*.
- **What changed is its CSS alone**, and the same rule restyles the unavailable state's `h2`:

| Property | Before | After |
| --- | --- | --- |
| Font size | `1.05rem` — `16.8` px; `33.6` px at a `32px` root | `clamp(1.45rem, 1.1rem + 1.5vw, 1.85rem)` — `23.45` px on a phone, `29.6` px on a desktop, `46.4` px at a `32px` root |
| Weight | `750` | `800` |
| Colour | `#1d3630` | `#17493c` |
| Case and tracking | `uppercase`, `0.02em` | as written, `-0.025em` |
| Line height | browser default | `1.2` |

The words *headed as the step* in the changelog and in the message of `53d6a8d`, and *a real heading* in the report of 2026-09-29, describe this visual change and nothing else.

### 2. The handoff: reading order changed, Tab order did not

| | Before (`9f53610`) | After (`53d6a8d`) |
| --- | --- | --- |
| **DOM order** | *Parent area*, `h1` *Setup complete*; then inside `.setup-complete`: the saved sentence, the summary, the sentence *MissionKid is ready for the next step.*, the *Change setup* button; then *Find a Mission* and *Mission history* as direct children of the form's fieldset; then *Reset MissionKid data* | The same, except that inside `.setup-complete` the *Change setup* button now precedes the sentence *MissionKid is ready for the next step.*, and *Find a Mission* and *Mission history* are wrapped, in the same order, in a new `div.setup-complete__actions` |
| **Visual order, desktop** | Summary tiles side by side; the sentence; then three buttons each on its own line — *Change setup* outlined, *Find a Mission* filled, *Mission history* outlined; a hairline; the reset link | Summary tiles; *Change setup* directly beneath them; a hairline; the sentence, in bold; *Find a Mission* and *Mission history* side by side on one row; a hairline; the reset link |
| **Visual order, phone** | Tiles stacked; the sentence; *Change setup*; *Find a Mission* at full width; *Mission history*; a hairline; the reset link | Tiles stacked; *Change setup*; a hairline; the sentence; *Find a Mission* at full width; *Mission history* on the next line; a hairline; the reset link |
| **Keyboard (Tab) order** | *Change setup* → *Find a Mission* → *Mission history* → *Reset MissionKid data* | **Identical** |
| **Reading order**, as a screen reader moves through it | … the summary, *MissionKid is ready for the next step.*, *Change setup*, *Find a Mission*, *Mission history*, *Reset MissionKid data* | … the summary, *Change setup*, *MissionKid is ready for the next step.*, *Find a Mission*, *Mission history*, *Reset MissionKid data* |

The sentence is not focusable, so moving it changes the reading order and not the Tab order; the new wrapper reorders nothing. Evidence: the keyboard walk of both builds, and the test added at `53d6a8d`, which asserts both the new document order and the unchanged order of the four buttons. *Keyboard order unchanged* in the outcome and the report means Tab order; the reading order change is the one the scope named in advance under *Preserved exactly*.

### 3. Further imagery is a proposal, not an obligation

`51` further photographs, the eight groups of Missions that share suggestion sets, and a Mission image on Ready or Active are **proposals pending review of the actual design and of the applicable content rules**. None is approved, planned or owed by this plan. The imagery section, the known gaps and the decisions below are reworded accordingly.

## Bounded image integration — `helping-11`, *The Table Surprise*

**Authorized on 2026-09-29** by the reviewer's instruction: one bounded image integration for `helping-11`, using one supplied candidate still, after inspecting it against the Mission's reviewed instruction, its safety note and the imagery rules. It lifts the review hold for this integration alone. It preserves Plan 06's layout and every Mission's content, eligibility, ordering and behaviour, replaces no other Mission image, and **records no human acceptance of the image or of Plan 06**. Excluded: pushing, merging and deployment.

Scope recorded here before any product file changed.

### Content inspection, before integration

The candidate is a `1536x1024` PNG, `3:2`, the ratio and size the three integrated stills were supplied at. It was inspected whole and at magnification on the cup, its rim and foot, and the spoon. The reviewed instruction is *"Choose one person at home and make a special place for them at the table. Fold a napkin or piece of paper into a simple shape and put it at their place. Set their spoon and an empty, unbreakable cup beside the shape. Look at the place you made just for them."*; the safety note is *"Use items you are allowed to move and can carry easily. Choose a place you can reach with both feet on the floor."*

| Clause | Finding |
| --- | --- |
| Only what the instruction describes | A napkin folded once into a triangle — a simple shape — with a spoon and a cup beside it. No plate, food, drink, knife, fork, candle, name card or decoration |
| An empty cup | Passed: the dry floor of the cup's interior is visible |
| An unbreakable cup | **Not contradicted, and not established** — below |
| The safety note | Consistent: three small, light things on a plain surface, with no height, stool or chair in frame |
| Nothing sharp, hot or unsafe made attractive | A round-bowled teaspoon; no blade, steam or liquid |
| No text or mark | Passed, on every object, including the spoon |
| No person, child or face; no implied photo or video capture | Passed |
| Housing, resources, family structure; globally recognizable | A plain surface with no interior, furniture or décor; a paper napkin, a cup and a spoon |

**The cup, stated exactly.** Cues toward a molded, unbreakable cup: the inside has the same matte finish as the outside, where a ceramic mug is ordinarily glazed inside; the rim is an even, rounded bead; the foot is a stepped stacking ring in the same colour and finish down to the table, with no bare clay ring; the handle keeps one even section; there is no speckle, glaze pooling or crazing. Against: a mug with a handle is the archetypal ceramic form, matte sage stoneware looks much like this, and nothing in the frame positively establishes plastic — no seam, flex or translucency. At card size the fine cues shrink and it reads as a matte green mug. **Verdict: consistent with the instruction and not a conflict, but it does not unmistakably read as unbreakable plastic.** This is not the rejected mitten case, where the still showed a different object from the one instructed: here the object is the instructed one and only its material is open. It is recorded for the content reviewer, like the *Tallest Tower* floor and the *Sock Friend* sleeve, rather than decided here. The reviewed text stays the authority, and every language's card says *unbreakable*. **The catalog is not changed to fit the image.**

### Where `helping-11` appears

- **The introduction** — the one example, alone, rendered by the shared `MissionCard` with no choose action.
- **Discovery, Helping at Home** — enumerated with the production ordering code, `33` reachable sets in all, none of which mixes a still with an authored scene today. `helping-11` is in exactly three:

| Age band | Set | Missions, in order |
| --- | --- | --- |
| `4–6` | second | `helping-09`, **`helping-11`**, `helping-13` |
| `7–8` | third | **`helping-11`**, `helping-07`, `helping-13` |
| `9–10` | second | **`helping-11`**, `helping-07`, `helping-13` |

### The rules that apply

1. **Visual & Ergonomic, *F002 — Exactly-three Mission suggestions*:** the three scenes are peers, and *"Scene richness, hero-object emphasis, color, or composition must not make one suggestion look recommended, better, easier, or more valuable."*
2. **`F001`, *The example Mission*:** the example *"must not be preselected, promoted, pinned, reordered, or given any preference in later discovery. After setup, it is an ordinary catalog Mission with no memory of having been the example."*
3. **How this project has held rule 1 for stills**, in Plan 05: a set's three Missions are improved together, so none is made to look recommended; its one mixed pass was recorded as a cost and then resolved. This plan's imagery section records that `helping-11` cannot take a still alone in Discovery without mixing a Helping set.

The existing image map is keyed by Mission and feeds both surfaces, so adding `helping-11` to it would put one photograph beside two authored scenes in all three sets above — the richer image always on the Mission that was the example. That engages rule 1 directly and rule 2 in substance. **Neither is bypassed, and no other Mission's image is replaced to avoid it.**

### Decision: the introduction's example only

The still is shown on the introduction's example alone. In Discovery `helping-11` keeps its authored scene, exactly like its peers, so no reachable set mixes a still with an authored scene, and the Mission carries nothing from having been the example. The introduction shows one card and no set, so there is nothing for the peer rule to compare there; and the Visual & Ergonomic Specification already authorizes that one example's image under the scene system, which may be implemented as *"lightweight raster assets, or controlled static rendered imagery"*. **No specification is amended**, so no revalidation is required.

**The cost, stated:** the same Mission is pictured differently on the two surfaces — a photograph as the example, its authored scene in Discovery. Showing the still in Discovery too is a separate decision for the reviewer — on rule 1 itself, or through stills for the Helping at Home Missions that share its sets, considered together — and is not taken here.

### Scope

| Item | What changes | Trace |
| --- | --- | --- |
| Asset | The supplied still, bundled at `1000x666` like the three existing stills, as an sRGB JPEG in `src/assets/missions/`, emitted by the existing build as a fingerprinted local file. Nothing is fetched from another origin or generated at runtime | Visual & Ergonomic *Implementation neutrality*; Technical Architecture, bundled static assets |
| `src/missionImages.ts` | A separate entry for the introduction's example, so Discovery's map, and the test that holds it to the three authorized Missions, stay exactly as they are | *Controlled Mission Mini-World scene system*, the introduction clause |
| `src/MissionSuggestionSet.tsx`, `src/ParentIntroduction.tsx` | `MissionCard` is told which surface it presents on, defaulting to Discovery; the introduction names itself. The one shared card is kept, so reviewed text still has one rendering | `F001` criteria `15`, `18`; Visual & Ergonomic *Parent introduction presentation*, criterion `24` |
| Tests | The example shows the still as decoration — `alt=""`, `aria-hidden`, intrinsic size, a local source — with every reviewed field as text; each of the three Discovery sets above renders `helping-11`'s authored scene and no still; the introduction's entry names `helping-11` alone | As above, and `F002` criteria `1`, `4`, `7` |

**Framing.** The window is `3:2` at every width and so is the still, so `object-fit: cover` removes at most the rounding of `666` — under one source pixel. The napkin, the spoon and the cup keep a clear margin inside the window's rounded corners. Measured on the build, not assumed.

**Preserved exactly:** Plan 06's layout, including the example card's size, which the window's `aspect-ratio` already reserves; every Mission's content, eligibility, ordering and behaviour; the example's reviewed content, safety note and non-selectability; and Discovery's rendering of every set.

### Verification intent

- **Two served builds**, before and after, with the same harness: the introduction, and the three Discovery sets above reached through the ordinary flow, in English, German and Russian at `1280x900`, `390x780` and `320` px with an injected `32px` root, and the introduction under the browser's own `32px` setting.
- **The image:** requested once from the same origin, served `200`, `complete`, `decode()` resolved, natural size `1000x666`; rendered at `3:2`; decorative, with no `img` role exposed.
- **Framing:** the share of the still cropped away at each configuration, and each object's margin inside the window.
- **Layout:** `0` clipping and page overflow; the example card's box and every text element's box unchanged; the same words in the same order; Discovery's three sets identical before and after.
- **Gates** once, sequentially, with complete output kept: relevant tests, `tsc --noEmit`, the full suite, the production build, `git diff --check`.
- **Screenshots from the actual builds**, before and after.

### Outcome, at `899ff79`

Scope recorded at `cca58f0`; implemented at `899ff79`. **Six files:** the still, `src/missionImages.ts`, `src/MissionSuggestionSet.tsx`, `src/ParentIntroduction.tsx` and the two test files. No stylesheet, copy, catalog content, control, state, route, persistence or dependency changed; the built stylesheet is byte-identical to before.

- **The asset.** The supplied still resized to `1000x666` and encoded once as an sRGB JPEG, `110 kB` against the existing stills' `49`–`113 kB`; emitted by the build as `helping-11-table-surprise-DUIZmoaJ.jpg`.
- **The code.** `INTRODUCTION_IMAGES` holds `helping-11` alone, beside the unchanged Discovery map. `resolveMissionImage` takes the surface, defaulting to Discovery; `MissionCard` passes it through with the same default, and the introduction names itself. Every other caller is unchanged and resolves exactly as before.
- **Tests, `4` added and `1` narrowed.** Added: the example shows the still as decoration with its reviewed text, in English, German and Russian; and each of the three Discovery sets containing `helping-11` renders three authored scenes and no still, reached at positions `2`, `1` and `1`, with the introduction's map naming `helping-11` alone and the Discovery map not naming it. Each was proven to bite: with `helping-11` put into the Discovery map the Discovery test fails, and fails again at the rendered set with its id checks removed; with the introduction's surface removed the three introduction tests fail. **Narrowed:** the introduction's *no identifying data* test asserted that the view contained no `img` at all, written when it had none. It now asserts exactly one image, the example's decorative still inside its card's window, so any other picture on the view still fails it.

### Verification, at `899ff79`

Chrome for Testing headless shell `149.0.7827.55`, one harness on two served builds — before: the build of `cca58f0`, whose product source is `01fb0f7`'s; after: the build of `899ff79`, rebuilt from the commit and byte-identical to the one measured. The introduction, and the three Discovery sets reached through the ordinary flow from a first visit, in English, German and Russian at `1280x900`, `390x780` and `320` px with an injected `32px` root; the introduction also at `320` px under the browser's own `32px` setting, with the root asserted `32px` before and after every capture.

| Check | Result |
| --- | --- |
| Combinations | `39` per build: `12` introduction, `27` Discovery |
| The still | `complete`, `decode()` resolved, natural `1000x666`, served `200` from the same origin, requested once per visit; `alt=""`, `aria-hidden`, `object-fit: cover`, and its box equal to the window's in all `12`. No `img` role, and none in the example's accessibility tree |
| Framing | The window is `3:2` in all `12` — `358x238.7` desktop, `330x220` mobile, `279x186` at a `32px` root. `0.1` % of the still's width is cropped, the rounding of `666`, and none of its height. Of the `153,337` pixels that make up the napkin, the spoon and the cup, **`0` fall outside the rounded window** in any configuration; the nearest object keeps `17.9` px from the window's edge at the smallest size |
| Layout | Words, every text element's box and size, the example card's and window's boxes and the page height **identical before and after in all `39`**. `0` clipping, `0` page overflow |
| Discovery | The three sets' markup **identical before and after in all `27`**: `helping-09`, `helping-11`, `helping-13` for `4–6` and `helping-11`, `helping-07`, `helping-13` for `7–8` and `9–10`, each with three authored scenes. The still is never requested by Discovery; the ordinary flow loads it once, on the introduction |
| Requests | none to another origin; no failed request, page error or console error |

**Two harness defects were found and corrected before these results**, stated so the numbers are not read as first-run results. The first check counted the introduction's request for the still against Discovery, because the ordinary flow passes through the introduction; and the category selector was measured before its transition settled, giving sub-pixel differences of up to `0.4` px in both directions on an unchanged stylesheet. Both were corrected in the harness, and every result above comes from the corrected run. An element capture also drops the browser's own `32px` setting, so that configuration is captured by viewport.

**Gates**, once, sequentially, with complete output kept: relevant tests `1 failed | 184 passed`; `tsc --noEmit` clean; the full suite at **854 tests across 23 test files**, all passing; a clean build; `git diff --check` clean. **The one relevant-run failure is recorded, not explained away:** *presents exactly three distinct Missions in every approved context*, an existing test, exceeded vitest's `5000` ms limit at `5303` ms while five DOM test files ran in parallel. It is a timeout, not an assertion. Run alone it takes `1592`–`1818` ms on the unchanged source and `1637`–`1694` ms on this change; the same five-file command then passed on both, `181` and `185` tests. Not reproduced, and not attributed.

**Screenshots** from both builds, at `2x`, in the local review folder `MissionKid-Plan06-helping-11-still`, with before-and-after sheets for every configuration.

### Limitations and what remains

- **One engine** against one build; no Safari, Firefox or real device; no assistive technology; no CI.
- **The cup's material is an open content judgement**, recorded above for the content reviewer, and the inspection here is not a content review.
- **The same Mission is pictured two ways**: a photograph on the introduction, its authored scene in Discovery. That is the deliberate cost of keeping Discovery's sets peers.
- **The imagery is still mixed in kind across the product.** `3` of `54` Missions carry a still in Discovery, and the introduction's example now carries one of its own. This supersedes, for the introduction only, the first *Known visual gap* at `53d6a8d`.
- At a `32px` root the example's German title and heading still break mid-word, *Tischüberra|schung* and *BEISPIELMISSIO|N*, as before: every text box is identical, so this is Plan 06's recorded residual and not a change.
- **Human visual acceptance of the still and of Plan 06 is not given and not recorded.**

## Reference redesign — 2026-09-30

Recorded before any product file changed.

### Authorization

**Authorized on 2026-09-30** by the reviewer's instruction: a complete visual redesign of MissionKid using a newly supplied concept board as the primary design reference, delivered as one integrated implementation. It is explicit authorization to replace the previous visual presentation throughout the application, **including the previously accepted Reward Card and History styling**; the earlier visual acceptances remain historical records, not requirements to keep the old appearance. The instruction asks for the reference's visual character — warm ivory and cream grounds, deep forest-green text and primary actions, expressive serif headings with readable sans-serif body text, soft sage recognition surfaces, restrained category accents, natural photographic imagery with soft daylight and tactile materials, rounded surfaces and subtle shadows, clear hierarchy and prominent primary actions — with appropriately licensed, locally served fonts covering English, German and Russian; the introduction's hero and three-step explanation adapted inside the root-only application; the category image-and-label treatment; Mission images on Ready and Active that represent the actual Mission without crowding out the task; the reference's recognition hierarchy and sage treatment on the Reward Card, with any image and progress indicator reflecting real data; and presentation requirements updated explicitly where the reference supersedes the old design.

It lifts the review hold for this scope. It does not record human visual acceptance, and it excludes pushing, a pull request, merging, deployment and any destructive reset.

**Not taken from the reference**, as instructed: its labels, phone frames, status bars and captions; any baked-in picture text. Also not taken, because the specifications forbid them or they would be decorative controls: the tagline *Real activities. Brighter days.* (an outcome claim), the *54 reviewed Missions* band (a count), a second forward action such as *See how it works*, header links, a menu button and a header language menu, which have no implemented destination beyond what the views already offer. The rubber boots and the ball are not used either: no Mission assumes outdoor access and no Movement Mission uses a ball, so both would imply equipment the Missions do not require.

### What this supersedes in this plan

The one-to-three-improvements bound under *How the work is bounded*; *No specification amendment is made*; *A logo, a brand mark, a web font* and *Restyling the Reward Card or History* under *Not done, and why*; and the Reward Card's element-by-element identity check. The rows above stay as the record of what `53d6a8d` did. The wordmark stays text — no logo or brand mark is made.

### Specification amendments

| Document | Change | Reason |
| --- | --- | --- |
| [`visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) | Inventory rows for Mission Category Selection, Ready, the Reward Card and the Monthly Goal. *Parent introduction presentation*: a hero composition with the example as the principal image, one decorative image per flow step, a compact language control; the reading order and the single action unchanged. *Mission Category Selection*: one decorative image per category under one shared treatment. *Ready* and *active*: the Mission's own image as support, never leading or displacing text, guidance or the action. *Reward Card*: the completed Mission's own image while it resolves. *Monthly Goal*: a calm bar that mirrors `X / 20` exactly. *Scene system*: where a Mission's own image may appear outside Discovery. A new *Bounded product imagery* section: five category and three step images and their content rules. *Typography*: a serif display face and a sans-serif body face, locally served with complete Latin and Cyrillic coverage. *Colour*: the approved direction. *Visual consistency*: shared stylesheet values are not a token catalog. *Ergonomic review method* and criterion `20`: an authorized, recorded redesign is not bounded to one to three improvements. Criteria `25`–`27`. The illustration non-goal names the bounded set | The reference supersedes the scene system's single authorized use outside Discovery, the absence of category, step and session imagery, and the one-to-three bound |
| [`technical-architecture.md`](../../docs/specs/technical/technical-architecture.md) | *Performance boundary*: the bounded presentation assets — locally served fonts and static images — are part of what the static application ships, each measured in the production build | Fonts are a new asset kind; Plan 06 recorded that a font would need this review |

**Not changed:** `business-context.md`, `global-spec.md`, `functional-map.md`, `roadmap.md`, `user-stories.md`, `mission-catalog-and-safety.md`, `data-and-state-model.md` and `F001`–`F004`. No behaviour, state, data, Mission content, eligibility, ordering, lifecycle, persistence or recovery outcome changes, and no navigation is added. `F004`'s Reward Card content list is a minimum the image and bar only reinforce; its History entry list is unchanged and History gets no Mission image.

### Revalidation

**User Story / traceability validation — passed.** All `14` stories, `P1`–`P8` and `C1`–`C6`, are unchanged, unique and keep their owners. No story is added, because no behaviour is: the introduction and its imagery serve `P8`, the setup and settings surfaces `P1`/`P2` (`F001`); the category images, cards and *Another set* `P3`/`P4`/`C1` (`F002`); the session views and their images `P5` and `C2`–`C4` (`F003`); the Reward Card, History and the Monthly Goal bar `P6`/`P7` and `C5`/`C6` (`F004`). Every change in the scope below traces to `F001`–`F004` through the amended Visual & Ergonomic Specification. Nothing traces to nothing.

**Focused Full Specification Audit — passed, no blockers.** Scope: the two amended documents and every clause that could conflict with them.

| Check | Result |
| --- | --- |
| Peer rules | Passed. The five category images share one treatment; the three suggestion cards keep one treatment and the same image kind within every reachable set; no image gains a badge, rank or promotion |
| The example gains nothing in Discovery | Passed. `helping-11` keeps its authored scene in Discovery and in its session views, which show the image its card showed; `F001` and `F002` are unchanged |
| Session images | Passed. Only the session's own Mission, only on Ready, active and its Reward Card; static; decorative; after the title in reading order; never displacing guidance or the action. The active view's first line stays the instruction to leave the screen |
| Monthly Goal | Passed. The bar mirrors the displayed count, caps at `20 / 20`, never animates, and the text stays the value; no second prompt or figure. History remains a plain record with no image |
| Imagery content | Passed. No text, people, faces or children; no equipment, purchase, outdoor or household implication; no unsafe action; each image checked against the Missions it represents before integration |
| Anti-manipulation | Passed. No count, rating, tagline, urgency, streak, reveal or second forward action enters; no header link or menu is added |
| Accessibility baseline | Passed by construction and re-measured after implementation: every image decorative, text authoritative, focus order unchanged, targets at `52` px or more, contrast measured on the rendered page, enlarged text supported |
| Localization | Passed. Every face covers the three languages; images carry no text; no layout assumes string length |
| Technical boundary | Passed. Root-only SPA, no route, no dependency, no request to another origin; fonts and images are bundled static assets, measured |
| Mission Catalog and Safety | Passed. No content, eligibility or approval changes; images are judged against the reviewed text, never the reverse |
| Reference integrity | Passed. Every relative link in the repository's Markdown resolves |

**Blockers: none. Unresolved contradictions: none.**

### Renewed implementation authorization

Recorded on 2026-09-30 from the same instruction, which authorizes the amendments above and their implementation together and asks that routine design choices proceed without further approval. The revalidation above passed before any product file changed. **Authorized:** the redesign scoped below, as one integrated implementation. **Still excluded:** pushing, a pull request, merging, deployment, branch deletion, and recording human visual acceptance.

### Scope

**Shared system, replacing the previous stylesheet rather than layering over it.** One set of shared values — colour, type, radius, spacing, elevation — defined once and used by every view; one family of components — the view sheet and its heading block, buttons, choice cards, notices, the Mission card and Mission picture, the guidance pattern, the calm progress bar, the confirmation panel. The enlarged-text rules that measured defects produced — `--room`, the named zero minimums on every clipping layout layer, the category group's definite sizing — carry over, and their stylesheet invariant tests are kept or rewritten to encode the same cause in the new layout.

| Surface | What changes | Trace |
| --- | --- | --- |
| Shell | Ivory ground; a text wordmark in the new face; cream view sheets with soft elevation; a wide sheet for the introduction and Discovery, a reading sheet for the rest; the error view in the same sheet | Visual & Ergonomic *Purpose*, *Mobile-first* |
| Introduction | Hero: purpose and serif title beside the example card as the principal image; the three flow steps each with a step image; the parent note and the one action; the language choice as a compact labelled control at the top. Reading order and the single action unchanged | `F001` `13`–`18`; criterion `24`; *Bounded product imagery* |
| Setup, settings, temporary mode, handoff | Parent sheet; choice cards for language and age group; sage parent note; notices; the handoff's summary tiles and actions | `F001`; *Setup presentation* |
| Discovery categories | Image-and-label category controls: one row per category on a phone, five equal tiles where there is room; selection shown by ring, check and the word *Selected* | `F002`; *Mission Category Selection* |
| Discovery Missions and states | Three equal cards — picture, category tag and duration, title, instruction, guidance, the choose action on its own layer; *Another set*, the bounded and unavailable states, the conflict and its confirmation; the exits as quiet links | `F002` `1`, `4`, `6`, `7`; *Exactly-three* |
| Ready | The Mission's picture beside or above its block; title, tag and duration, instruction, guidance, the Mission Break panel, *Start mission* dominant | `F003` `2`, `3`; amended *Ready* |
| Active and leave confirmation | The instruction to leave the screen leads; a smaller picture beside the Mission reminder; calm timer guidance; *Mission done* dominant; the confirmation panel | `F003` `5`–`7`, `16`; amended *active* |
| Reward Card | Serif title; a sage recognition panel — *You did it.*, the Mission's picture, title, category tag, completion date, the Monthly Goal with a bar that mirrors the count — and the next step below it | `F004` `3`; amended *Reward Card*, *Monthly Goal* |
| History | Sage goal panel with the same bar; plain entry rows; the calm empty state; the route back | `F004` `4`, `5`; *Mission History* |
| Recovery, reset, unavailable and error states | Parent notices and the reset confirmation in the same component family | *Loading, empty, unavailable, error, and recovery* |

**Fonts — the size, licence and maintenance review.**

| Face | Source and licence | Shipped |
| --- | --- | --- |
| Source Serif 4 Display Bold — headings | Adobe release `4.005R`, `SourceSerif4Display-Bold.ttf.woff2`. SIL OFL 1.1 **with the Reserved Font Name *Source***, so it ships byte-for-byte unmodified | `86,392` bytes; maps every character in the three dictionaries and the catalog |
| Inter — body and interface | Release `4.1`, `InterVariable.woff2`. SIL OFL 1.1 with **no** reserved name, so subsetting is permitted | Instanced to weight `400`–`800` and optical size `14`–`32`, subset into Latin (`49,880` bytes) and Cyrillic (`20,608` bytes) files loaded by `unicode-range`, name and licence records kept |

Both licence texts are committed beside the files. Maintenance is a file swap: no package, no build step, no request to a font service. `font-display: swap` over a system fallback, so no text is hidden while a face loads.

**Imagery.** The four reviewed stills are reused where they already apply. **Eight new decorative images** under *Bounded product imagery* — five category images and three step images — are authored as **controlled static rendered imagery**: rendered offline from authored three-dimensional scene descriptions in the same headless Chromium used for verification, with the `three` library as authoring tooling only, outside the repository. No image is generated by AI, taken from stock, or cut from the reference. Planned content, each to be inspected against the Missions it represents before integration:

| Image | Content | Why it is truthful |
| --- | --- | --- |
| Movement | A faceless wooden figure mid-jump on a clear floor | Movement Missions use the body on a clear floor; none uses equipment |
| Creativity | A sheet of paper with a simple crayon drawing and two crayons | Paper and pencils or crayons are the materials most Creativity Missions name |
| Helping at Home | A neat stack of folded cloth napkins | *Napkin Fold Five*, *The Table Surprise*, *Table Captain* |
| Learning | A low book ramp, a round thing rolling down it and small paper markers | *Roll It Down*, approved for every age band with no adult requirement |
| Calm | A folded blanket and a rolled cloth on the floor | *The Heavy Blanket*, *The Tight Roll* |
| Step 1 | Three equal paper cards side by side | Choosing one of three |
| Step 2 | A tablet set face down beside a small real-world activity | Leaving the screen to do the Mission; it controls no device |
| Step 3 | A card with a drawn check mark | Marking the Mission done |

**The remaining authored scenes** — `51` in Discovery — get one coherent treatment rather than new photographs: the same window, a warm printed ground, softened category light and a shared edge, so a set of three scenes reads as one kind of picture. No set mixes a still with an authored scene; the session views show the image the chosen card showed.

**Copy.** None is planned. Existing wording serves every element above; any string that proves necessary is added in all three languages and identified as newly authored, without claiming professional review.

### Preserved exactly

Every reviewed Mission title, instruction, adult-involvement note and safety note, complete and visible as text; every translation; eligibility and deterministic ordering; exactly three equal peers; the session lifecycle, timer, completion identity and exactly-once effects; History, the Monthly Goal count and its cap; persistence, hydration, recovery, temporary mode and stored data; first-use eligibility and returning-user routing; heading structure, focus order and management, the visible focus ring, touch targets of `52` px or more, reduced motion.

### Verification intent

- **Walk the real journey on the served production build**: introduction → setup → category → Mission → Ready → Active → completion → History → settings, in English, German and Russian, desktop `1280x900` and phone `390x780`.
- **Every state**, including the handoff, temporary mode, recovery, both reset panels, the conflict, the Mission-unavailable and bounded states, the start issue, the leave confirmation, the goal-complete Reward Card, History empty and filled, at those sizes and at `320` px with a `32px` root, plus the browser's own `32px` setting on representative views.
- **Direct checks**: `0` clipping against every clipping ancestor, `0` page overflow and overlap; composited contrast at `4.5:1`, or `3:1` for large text; targets at `52` px or more; every image decoded, local, decorative, framed without cutting its subject; fonts loaded from the same origin; the same words in the same order as before, and every reviewed instruction and note present in full; the heading outline and focus order unchanged; the focus ring on every stop; no request to another origin.
- **Against the reference**: a side-by-side judgement of typography, composition, imagery and hierarchy on the rendered result, recorded with its differences.
- **Gates** once, sequentially, with complete output kept: relevant tests, `tsc --noEmit`, the full suite, the production build, `git diff --check`.
- **Delivery**: one concise desktop and mobile review package of the main journey with enlarged-text evidence, and the current implementation served at the usual local development address from this repository.

### Outcome, at `d8bad52`

**What changed — `35` files.** The stylesheet is replaced rather than layered over: one set of shared values and one component family, with every class it styles used by a component and no rule left for a removed one. Four small presentation modules are added — `MissionPicture.tsx`, the one rendering of a Mission's image; `Marks.tsx`, three decorative icons; `MonthlyGoalBar.tsx`; `productImagery.ts`, the bounded imagery map. `ParentIntroduction`, `MissionDiscovery`, `MissionSuggestionSet`, `MissionReady`, `MissionActive`, `MissionResult` and `MissionHistory` gain the pictures, bar and marks; the category glyphs they replace are removed. Fonts, licences and eight images are added under `src/assets/`. No behaviour, state, data, route, persistence, catalog content, dependency or translation changed.

| Surface | As built |
| --- | --- |
| Shell | Ivory ground with daylight from above; a text wordmark in Inter; cream sheets with soft elevation — the full frame for the introduction and Discovery, `64rem` for the session views, `40rem` for the Reward Card, `46rem` for the rest; the error view in the same sheet on the same ground |
| Introduction | A hero where there is room (`64rem` and wider): the serif headline, the lead, the three steps with their images and the one action in one column, with the parent's note as small print under the action; the example card as the view's picture in the other; the language choice as a labelled segmented control at the top right. The document order — purpose, example, flow, note, action — is the phone's and the keyboard's; the action is not repeated |
| Setup, settings, temporary mode, handoff | Choice cards with the radio's own mark and a sage fill; age groups in the heading face; a sand parent note marked by a shield; the handoff's saved pair as sage tiles |
| Discovery | Category rows of picture and label on a phone, five equal tiles from `52em` of sheet width, the picture above a full-width label where the sheet is narrow for enlarged text; selection by ring, check and *Selected*. Three equal cards, side by side from `52em`, picture beside text between `36em` and `52em`; *Another set* as a centred pill; the exits as quiet buttons with marks |
| Ready | The title, then the Mission's own picture — beside the Mission from `40em` — tag, duration, instruction, guidance, the Mission Break on a sage panel, *Start mission* |
| Active | The instruction to leave the screen as the lead; a reminder card with a smaller picture, the title, instruction and guidance; the time guide as a quiet pill; *Mission done*; the leave confirmation in the warm inset |
| Reward Card | The reference's hierarchy on one sage panel: *You did it.*, the completed Mission's picture, title, category tag, completion date, the Monthly Goal with its bar; the next step below the panel |
| History | The same goal pattern and bar; entries as plain rows; the calm empty state |
| Recovery, reset, notices | One notice pattern — a mark down its edge, plain words; the reset confirmation as a warm inset with *Cancel* first |

**Fonts.** As reviewed in the scope, with two final sizes: the Inter subsets are `49,136` and `20,560` bytes, not the `49,880` and `20,608` recorded there, because the final subset drops an unused stylistic set and keeps every name record, the licence among them. Source Serif 4 Display Bold is the release file, unchanged (`sha256 fa4c418d…`). The licence texts are Adobe's and Inter's own; trailing spaces were removed for the repository's whitespace check, and their words are unchanged.

**Imagery — the eight renders.** Authored as three-dimensional scene descriptions and rendered in Chromium `149` with `three` `0.180` as authoring tooling outside the repository: `192` accumulated frames each, sampling a window light over its area, a sky dome for soft occlusion, a thin-lens depth of field and sub-pixel offsets; procedural wood, plaster, paper, wax and knit textures; an AgX tone curve. One grade, identical for all eight, then JPEG at `800x600` for the categories and `480x480` for the steps: `15`–`31` kB each, `170` kB together. No AI generation, stock or reference pixels.

Inspected before integration, as the three stills and the `helping-11` still were:

| Image | What it shows | Finding |
| --- | --- | --- |
| Movement | A faceless wooden figure mid-jump on a clear wooden floor | No equipment. A stylized figure, not a person or a child; whether it reads as *a toy is needed* is a judgement for the content reviewer |
| Creativity | A sheet with a crayon sun, rainbow, flower and cloud; two crayons | Paper and crayons, as most Creativity Missions name. No letters or marks |
| Helping at Home | One set place: a triangle-folded napkin with a stitched hem, a plate, a tumbler and a wooden spoon | *Table Captain*, *The Table Surprise*, *Napkin Fold Five*. **Changed from the scope's folded-napkin stack**, which could not be rendered as believable cloth; the plate and tumbler are matte, but, as with the earlier cup, nothing establishes that they are unbreakable |
| Learning | A book leaning on a lying book as a low ramp, a spool on it, a cork and two folded paper markers | *Roll It Down*: low, on the floor, nothing heavy |
| Calm | One knitted blanket folded on a wooden floor | *The Heavy Blanket*. **The scope's rolled cloth is not included**: one object read more calmly |
| Step 1 | Three equal cards with a wave, a spiral and a row of dots | Choosing one of three; no card is raised, marked or promoted |
| Step 2 | A tablet face down at the edge; a small tower of kraft boxes and a cup | Leaving the screen for a real activity; no logo, nothing implies control of the device |
| Step 3 | A sage card with a drawn check mark and a pencil | Marking the Mission done; no text |

Every image: no text, letters, numerals, logos or interface; no person, face or child; a plain wooden surface and plaster wall; nothing hot, sharp in use, high or breakable made attractive.

**A wording correction to the amendment at `6f56054`.** Its scene-system paragraph described a Mission's image outside Discovery as *the scene or reviewed still that represents it in Discovery*, which would have excluded the introduction example's own still, authorized and integrated at `899ff79`. It now names the image each place shows: the example may show a reviewed still of its own; Ready, the active Mission and the Reward Card show the image the Mission had in Discovery. That is what was authorized and what is built; no behaviour or scope changes, so no revalidation is needed.

**Copy.** None added or edited. One typographic change: the English headline's hyphen is a non-breaking hyphen (`U+2011`) — the same word, read the same way, which keeps *Real-world* whole on one line. Both faces carry the character. The eight test lines that pin the English headline follow it.

**Enlarged text, decided during verification.** Display type keeps its size at every ordinary width and is capped against the viewport only where an enlarged root meets a narrow screen, so headings stay larger than the text under them without breaking words. The parent surfaces' enlarged-text hyphenation now covers every view and answers to the sheet's own `em`, so an injected root triggers it as the browser setting does; it hyphenates only words of ten letters or more, with six before a break and four after — the product's name cannot split.

**Found during verification, and fixed.** **The introduction's one action had moved below the fold**: measured on a `1280x900` desktop, its bottom edge sat at `1043` / `1100` / `1159` px in EN / DE / RU, where the before build had it at `899` / `878` / `899`. On a desktop it now follows the steps directly, with the parent's note beneath it as small print — a visual placement only, since the note holds no control — and a little more of the width goes to the text column, so the Russian headline takes two lines: `826` / `858` / `858` px. The language pills wrapped onto two rows under a percentage gap; the headline broke inside *Real-world*; the stacked enlarged-text category picture cut the figure's head off; the German *BEISPIELMISSION* label overflowed a `320` px screen by `8` px at a `32px` root; *Missi-onKid* was hyphenated inside a German sentence; the authored scenes' green-lit rooms did not match the warm imagery; the error view touched the top of the screen.

### Verification, at `d8bad52`

Chrome for Testing headless shell `149.0.7827.55`; the same harness on two served builds — before: `2e81cec`, byte-identical to Plan 06's measured build (`index-CqcP9HA8.css`, `index-0TkZ_AYm.js`); after: the build of `d8bad52` (`index-CLxxm1sE.css`, `sha256 f5458112…`), identical to the one measured.

| Check | Result |
| --- | --- |
| Combinations | `257` per build: `26` states in English, German and Russian — recovery and its reset panel in English only, because a snapshot that cannot be read carries no trusted language — at `1280x900`, `390x780` and `320` px with an injected `32px` root, and `13` of them under the browser's own `32px` setting with the root asserted before and after every capture |
| States | Introduction; setup, with and without an age; handoff; settings; categories; a set of stills; a set of authored scenes; *Another set*; no further set; Ready; Active; the leave confirmation; the Reward Card; the twentieth completion; History; empty History; temporary mode, before and after its setup; recovery; the reset confirmation; incomplete setup; a Mission chosen in a second tab, and leaving it; a start that could not be carried out; a running Mission renamed in storage |
| Clipping against every clipping ancestor, page overflow, overlap | `0`, `0`, `0` |
| Contrast, composited | minimum `5.05:1`, `0` below `4.5:1` or `3:1` for large text |
| Targets | minimum `52` px |
| Images | `429` rendered, every one decoded, same-origin, `alt=""` and `aria-hidden` |
| Faces | both loaded in all `257` |
| Words and headings | **identical to the before build in all `257`**, word for word and in order |
| Keyboard | `100` walks with Tab alone — desktop and `32px` root, English and Russian, every state: Tab order **identical** to the before build in all `100`; `340` stops, each with the `3px` ring and in view |
| Words broken across lines at `320` px, `32px` root | before: `121` cut mid-word — `7` / `103` / `11` in EN / DE / RU; after: **`0` cut**; `118` break at a syllable with the engine's hyphen, `7` / `100` / `11`, each verified against the engine's own hyphenation points; `23` at their own hyphen in both builds |
| Under the browser's `32px` setting | `0` cut in both builds; `52` syllable breaks in both, the parent surfaces' existing hyphenation |
| Requests and errors | none to another origin; no failed request, page error or console error in any of the `257` |
| The error view | through a probe build of the after source that throws once in the introduction, never shipped: the warm ground, the serif title, `0` clipping or overflow, contrast `5.92:1`, at all three sizes |

**Gates**, once, sequentially, with complete output kept: relevant tests `415` passed across `11` files; `tsc --noEmit` clean; the full suite at **`873` tests across `23` files**; the production build, byte-identical to the measured one; `git diff --check` clean, new files included. **Tests: `19` added**, each proven to bite — with the bar's share made inexact, the Reward Card picturing an unresolved Mission, Ready using the introduction's still, Active picturing another Mission, one category image a different size, the category tracks sized from content, a step image or a category image exposed to assistive technology, the tests fail, and they pass once the change is restored. **Changed with the same intent:** Discovery's and the introduction's *no image* assertions now allow exactly the authorized decorative images and nothing else; the category-group invariant encodes its two measured defects for the grid.

**Against the reference.** Typography, palette, surfaces, component shapes and hierarchy follow it closely: the serif headline and forest green on ivory, the image-and-label category rows, three photographic cards where stills exist, the sage recognition panel with *You did it.*, the picture, title, tag, date, goal and bar. It differs where the product or its rules differ: no tagline, counts, header links, menu or second forward action; the action follows the steps, as the introduction's reading order requires; the hero picture is the real example Mission rather than an atmospheric still life. **The imagery is the largest remaining difference**: the board's photographs are richer and more saturated than the controlled renders, the renders read as renders, and `51` Missions show authored scenes, which the shared grade brings into the same room without making them photographs.

### Limitations

- One engine against one build; no Safari, Firefox or real device; no assistive technology; no CI. Container queries, `:has()`, `color-mix`, `text-wrap` and `hyphenate-limit-chars` are modern features: an engine without container queries keeps the single-column layouts, one without `color-mix` the plain category colours.
- The eight renders, the scene grade and every visual judgement here are the implementer's, not a content or human visual review. The figure, the plate and the tumbler are recorded above for the content reviewer.
- Mid-word cuts at enlarged text are `0` in this matrix; words that no hyphenation point can save would still break, and Safari's hyphenation is unverified.
- **Human visual acceptance is not given and not recorded.**

## Visual asset package — 2026-10-01

Recorded before any product file changed, on `feat/reference-visual-redesign` at `8134734`.

### Authorization

**Authorized on 2026-10-01** by the reviewer's instruction: one integrated batch that uses a supplied package of nine images to finish the introduction's hero composition and to replace the five category images and the three introduction step images together, as a continuation of the reference redesign rather than a restart. The instruction authorizes the presentation amendments the package needs — the introduction's composition and the static decorative category and step imagery — recorded before implementation, without changing governance or weakening a Mission content or safety rule. Should one image conflict with a concrete current content rule, it keeps its current safe fallback and the conflict is reported once.

It asks for: a large hero with the existing headline, lead and one setup action grouped on one side and the hero image prominent on the other, never text or controls in the bitmap; the example Mission no longer the hero's picture, its complete card further down; the three existing steps as one row beneath the hero; the language choice visible and keyboard-accessible; every parent, privacy and responsibility statement readable, never collapsed, hover-only or small print; the action rendered once, early in the hero, with any prerequisite guidance kept; on a phone and with enlarged text, a natural single column with the headline, lead and action prominent and the imagery subordinate, the whole hero subject shown, nothing forced into one screen, shrunk or truncated; everything usable with images disabled. It excludes assigning the images to Missions, replacing the three Discovery stills, the `helping-11` still or the `51` authored scenes, and any use of the hero on Ready, Active or the Reward Card. Local commits are authorized; pushing, a pull request, merging, deployment, a destructive reset and recording human visual acceptance are not.

### The package

`MissionKid-visual-assets`, extracted from the reviewer's ZIP without overwriting anything. Nine PNG files, each matching the size and SHA-256 its manifest records. They are **AI-generated photographic-style images** made with the reviewer's image tool: not photographs of real families and not evidence of any activity. They carry no colour profile, so they are sRGB.

| File | Size | SHA-256 | Placement |
| --- | --- | --- | --- |
| `01-hero.png` | `1536x1024` | `adbd7558…` | Introduction hero only |
| `02-category-movement.png` | `1254x1254` | `4f45cc4e…` | Movement |
| `03-category-creativity.png` | `1254x1254` | `ee4bba7e…` | Creativity |
| `04-category-helping.png` | `1254x1254` | `d9002343…` | Helping at Home |
| `05-category-learning.png` | `1254x1254` | `64754419…` | Learning |
| `06-category-calm.png` | `1254x1254` | `ca2bd5bc…` | Calm |
| `07-step-choose.png` | `1536x1024` | `5037569b…` | Step 1 |
| `08-step-do.png` | `1536x1024` | `f3007b47…` | Step 2 |
| `09-step-recognize.png` | `1536x1024` | `26e42a12…` | Step 3 |

### Content inspection, before integration

Each image was looked at in full and judged against the reviewed Mission text, never the reverse.

| Image | What it shows | Related reviewed content | Finding |
| --- | --- | --- | --- |
| Hero | A tower of painted wooden blocks under a triangular roof, a sheet with a crayon house, tree and sun, and two crayons on a pale wooden floor; side daylight with soft leaf shadows; the left part is empty wall and floor | *Tallest Tower* names blocks; drawing Missions such as *The Kind Monster* and *The Sound Map* | No text, letters, person or unsafe thing. Real-world making in general, not the example and not any one Mission |
| Movement | Footprints pressed into fine sand, close up; no feet, person, water, sky or landscape | Stepping Missions — *Giant Steps and Mouse Steps*, *The Exact Steps* | **A metaphor.** No Movement Mission involves sand or the outdoors, so the current rule would exclude it as a setting the Missions do not require. The instruction states that the footprints make no outdoor or barefoot walking required; the amendment admits a metaphor that pictures no place, and the label carries the meaning. **Recorded for the content reviewer** |
| Creativity | An arch of five painted blocks under a triangular roof | *Tallest Tower*: "plastic cups, blocks or small boxes" | Blocks are one option a Creativity Mission names; the image presents none as needed |
| Helping at Home | Three folded cotton cloths, stacked | *Napkin Fold Five*, *The Table Surprise* | Ordinary and safe. It replaces the render whose plate and tumbler could not be shown to be unbreakable |
| Learning | A paper pyramid, a curved paper arch, a flat square sheet and a crayon | *Which Lands First?*, *Roll It Down* | Paper and shapes; no letters, numbers, scissors, liquid or glass |
| Calm | One softly folded cloth on a plain surface | *The Tight Roll*, *The Heavy Blanket* | Quiet and less literal; the label carries the meaning |
| Step 1 | Three equal cards with crayon drawings — a tower, a smiling monster, a leaf — side by side; a sprig and a wooden bowl at the edges | Choosing one of three | The cards are equal in size, light and placement; none is raised or marked. **The monster has a drawn face**, which the current *no face* rule would exclude; admitted by the amendment as a drawing, not a person |
| Step 2 | A crayon drawing of a purple monster beside two crayons | Doing the Mission away from the screen | A real-world activity. A drawn face, as above. Not presented as any child's work |
| Step 3 | A finished crayon tree and sun beside a folded cloth | Coming back and marking it done | Finished work as decoration, not a record of anyone's achievement |

Every image: no text, letters, numerals, logos or interface; no person or child; nothing hot, sharp, high or breakable made attractive. **No image conflicts with a Mission content or safety rule, so no fallback is kept.** The two presentation rules the package does not meet — *no face*, and *only things the Missions involve* with its list of settings — are amended below under this authorization. The hero, the blocks, the cloths and the paper are things the reviewed Missions name; the sand is the one metaphor that is not.

### Specification amendments

| Document | Change | Reason |
| --- | --- | --- |
| [`visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) | *Parent introduction presentation*: the reading order becomes what MissionKid is for, the parent's context, the one action, then the short flow and the example; the parent's context stays readable text at the view's text size, never collapsed, hover-only or small print; where there is room, a hero with the words, the parent's context and the action on one side and the introduction's hero image on the other, the three steps as one row beneath and the example's complete card after them; no text on a picture without a plain surface behind it; on a phone no picture before the headline, lead, context or action, and every picture shows its whole subject. *Bounded product imagery*: a ninth image, the introduction's hero, which appears only there and never stands in for a Mission; images made offline with an image-generation tool admissible only as inspected, recorded assets, never presented as photographs of real families; *no person or child, or photographed or realistic face*, with a drawn face on a pictured drawing allowed; a category image may be a metaphor; no image is an instruction, a list of materials or a condition. Criterion `26` and the illustration non-goal follow | The previous text placed the action last, made the example the hero's picture, allowed eight images, excluded every face and admitted only things the Missions involve |

**Not changed:** `business-context.md`, `global-spec.md`, `functional-map.md`, `roadmap.md`, `user-stories.md`, `mission-catalog-and-safety.md`, the Technical Specifications and `F001`–`F004`. `F001` requires the introduction's four explanations and exactly one forward action; it sets no order, so the order is presentation. No behaviour, state, data, Mission content, eligibility, ordering, lifecycle, persistence or recovery outcome changes, and no navigation, string or translation is added.

### Revalidation

**User Story / traceability validation — passed.** All `14` stories are unchanged, unique and keep their owners; none is added, because no behaviour is. The introduction serves `P8` (`F001`): a parent still reads what MissionKid is for, what setup involves and what the family will do before being asked for anything, because the one action asks for nothing — the setup step does, and it repeats its own privacy and responsibility text. The category images serve `P3` and `C1` (`F002`). Nothing traces to nothing.

**Focused Full Specification Audit — passed, no blockers.** Scope: the amended sections and every clause that could conflict with them.

| Check | Result |
| --- | --- |
| `F001` introduction | Passed. All four explanations remain; exactly one forward action, rendered once; no write; the example stays a complete, non-selectable example with its safety note; the language choice stays at the top and visible |
| Reading and keyboard order | Passed. The narrow order is the document order on every layout; the Tab order is unchanged — the language choice, then the one action |
| Peer rules | Passed. The five category images keep one frame, size and crop; the three steps one frame; nothing is raised, badged or promoted |
| Session images | Passed. Ready, Active and the Reward Card keep the session's own Mission's image; the hero never appears there |
| Imagery content | Passed with one recorded judgement: the Movement footprints are a metaphor resting on sand, admitted by the amendment and listed for the content reviewer |
| Anti-manipulation | Passed. No claim, count, tagline, testimonial, second action or link enters with the hero |
| Accessibility | Passed by construction, re-measured after implementation: every image decorative, every statement text, enlarged text supported, contrast measured where text sits beside a picture |
| Technical boundary | Passed. Bundled static assets only; no request to another origin, no dependency, no runtime generation |
| Reference integrity | Passed. Every relative link in the repository's Markdown resolves |

**Blockers: none. Unresolved contradictions: none.**

### Renewed implementation authorization

Recorded on 2026-10-01 from the same instruction, which authorizes the amendments and their implementation together and asks that routine spacing, crop and colour choices proceed without further approval. The revalidation above passed before any product file changed. **Authorized:** the batch scoped below. **Still excluded:** pushing, a pull request, merging, deployment, a destructive reset, unrelated deletion, and recording human visual acceptance.

### Scope

| Surface | What changes | Trace |
| --- | --- | --- |
| Introduction, wide | The context tag and the language choice at the top; the headline, lead, parent's context and the one action on the left; the hero image on the right, its quiet side fading into the sheet so no text sits on unprotected picture; the three steps with the new step images as one row beneath; the example's complete card after them | `F001` `13`–`18`; criterion `24`; amended *Parent introduction presentation* |
| Introduction, narrow and enlarged | The headline, the language choice, the lead, the parent's context and the action, then the hero image framed so the tower, drawing and crayons stay whole, the steps, the example | Same |
| Mission Category Selection | The five new square category images in the existing image-and-label rows and tiles, one treatment; labels and selection unchanged | `F002`; *Mission Category Selection*; *Bounded product imagery* |
| Assets | The nine originals copied into `src/assets/imagery/originals/`, never imported or bundled; WebP derivatives sized to the layouts that show them, with intrinsic dimensions and `srcset`; the hero loaded eagerly at high priority, the step images lazily; the eight renders of `d8bad52` removed once nothing imports them | *Bounded product imagery*; Technical Architecture *Performance boundary* |
| Tests | The introduction's reading order and its five decorative images — hero, example still, three steps — and the category images' shared size, updated to the amended rules. No stylesheet mirror tests | Criteria `24`, `26` |

### Preserved exactly

Every word of the introduction and every translation; the example's reviewed content and its still; the three Discovery stills and the `51` authored scenes; the session images, which always show the session's own Mission; categories, eligibility, ordering, the lifecycle, the timer, completion, the Monthly Goal, History, settings, reset and recovery, localization and stored data; first-use eligibility and the introduction's no-write rule; focus order and management, the visible focus ring, targets of `52` px or more.

### Verification intent

- The production build in English, German and Russian at `1280x900`, `390x780` and `320` px with a `32px` root, and under the browser's own `32px` setting: hero crops, category recognition, the complete lower page and every control reachable; `0` clipping against clipping ancestors, horizontal overflow and overlap; composited contrast; the focus ring on every stop; all nine images loaded from the same origin, no failed request.
- The journey introduction → setup → category → Mission → Ready → Active → completion → History, and the settings return path; no write on the introduction; unchanged Mission ordering; the actual Mission's image on Ready, Active and the Reward Card; every other state for shared-style regressions.
- The introduction with images disabled.
- Gates once, sequentially, with complete output kept: relevant tests, `tsc --noEmit`, the full suite, the production build, `git diff --check`.
- A compact review package from the final build: introduction and categories on a desktop and a phone, one full journey, enlarged text including the bottom actions, the build named, and the reference side by side. The local development address confirmed.

### Outcome, at `f30afbd`

**What changed — `41` files.** `ParentIntroduction.tsx` takes the amended order — the lead, the parent's context, the one action, the hero picture, the steps, the example — and renders the hero once, eagerly and at high priority, and the step pictures lazily, each with `srcset`. `MissionDiscovery.tsx` gives the category pictures `srcset`. `productImagery.ts` maps the nine images, each in two widths. The stylesheet's introduction block is replaced — its two wrapper elements are gone — and the category pictures become square. Three tests follow the amended rules. The nine originals are kept unchanged in `src/assets/imagery/originals/`, never imported or bundled; `18` WebP derivatives are added beside them; the eight renders of `d8bad52` are removed, nothing importing them. No behaviour, state, data, route, persistence, catalog content, dependency, string or translation changed.

| Surface | As built |
| --- | --- |
| Introduction, `64rem` and wider | The context tag and the language choice on one row; beneath them two equal columns — the headline, the lead, the parent's context on its sand panel at body size, and the one action on the left; the hero picture on the right at `11:10`, held to its right edge so it gives up quiet wall and never the subject, its left edge fading into the sheet over `13%` of its width. Two flexible rows centre the words beside it. The three steps follow as one row of `3:2` pictures, then the example's card with its picture beside its words |
| Introduction, phone and enlarged text | One column: the context tag, the headline, the language choice, the lead, the parent's context, the action, the hero at `4:3` held to its right edge, the steps — a `3:2` thumbnail beside each step's words, the picture above the words where the sheet is narrow for the text — and the example |
| Mission Categories | The five supplied pictures, square, in the existing rows, tiles and enlarged-text stack; the stack centres the picture at `72%` of the tile |

| Image — original | Shipped as | Bytes |
| --- | --- | --- |
| Introduction hero — `01-hero.png` | `intro-hero-960.webp`, `intro-hero-1536.webp` | `27,434` / `58,462` |
| Movement — `02-category-movement.png` | `category-movement-320.webp`, `-640.webp` | `26,652` / `93,122` |
| Creativity — `03-category-creativity.png` | `category-creativity-320.webp`, `-640.webp` | `7,296` / `25,098` |
| Helping at Home — `04-category-helping.png` | `category-helping-at-home-320.webp`, `-640.webp` | `11,766` / `42,846` |
| Learning — `05-category-learning.png` | `category-learning-320.webp`, `-640.webp` | `9,714` / `28,916` |
| Calm — `06-category-calm.png` | `category-calm-320.webp`, `-640.webp` | `9,002` / `33,844` |
| Step 1 — `07-step-choose.png` | `step-choose-480.webp`, `-960.webp` | `26,728` / `87,654` |
| Step 2 — `08-step-do.png` | `step-do-480.webp`, `-960.webp` | `29,220` / `103,090` |
| Step 3 — `09-step-recognize.png` | `step-recognize-480.webp`, `-960.webp` | `28,196` / `110,580` |

The derivatives were resampled with `sips` from the originals and encoded as WebP at quality `0.82` by Chromium's encoder at their own size; the originals carry no colour profile and are sRGB. Inspected at `1:1`: no banding on the hero's wall, the crayon texture intact. A browser loads one width of each image: on a `1280x900` desktop at `2×` the hero's `1536` file, on a phone its `960` file.

**Found during verification.** The harness read the address of the build it measures before the script set it, so a run named for the baseline measured the new build; found when that run reported the new heading order. Every figure below comes from runs given the address explicitly, each batch first confirming the stylesheet its port served. Nothing in the product needed fixing.

### Interruption and recovery

On 2026-10-01 the new build's matrix completed — all `257` combinations, with the figures below — and the journey, images-blocked and action-position checks completed on both builds. The baseline's matrix and the keyboard walks ran in one long background command, which was stopped at its background time limit together with the baseline's preview server; neither finished, and neither is counted. The machine then restarted, which removed the temporary folder holding the harness, every result file and every capture. Nothing in the repository was lost: the implementation was uncommitted and intact.

On 2026-10-02 the harness was rebuilt from the session record with its recorded corrections; the working tree rebuilt to the same content-hashed bundle that had been measured, and the baseline was rebuilt from `0758e36` to the stylesheet `d8bad52` was measured on. Both preview servers ran as detached processes. The verification ran in bounded batches — nine calls for the matrix on both builds, two for the keyboard walks — each saving its results before the next began, into the review package rather than a temporary folder. The new build's matrix was measured again rather than reused, because its per-combination results, including the words the interrupted comparison needs, were lost with the restart; it reproduced the earlier figures exactly. The journey, images-blocked and action-position checks were run again for the same reason, with the same results. No interrupted run is counted as passed, and none showed an application defect.

### Verification, at `f30afbd`

Chrome for Testing headless shell `149.0.7827.55`; the same harness on two served builds — before: the code of `0758e36`, whose stylesheet is byte-identical to `d8bad52`'s measured build (`index-CLxxm1sE.css`); after: the build of `f30afbd` (`index-pX2JJh1x.css`, `sha256 74e135c1…`; `index-DbYbID6G.js`), identical to the one measured. Results, logs and every capture are kept in the review package.

| Check | Result |
| --- | --- |
| Combinations | `257` per build: `26` states in English, German and Russian — recovery and its reset panel in English only — at `1280x900`, `390x780` and `320` px with an injected `32px` root, and `13` of them under the browser's own `32px` setting with the root asserted before and after every capture |
| Clipping against every clipping ancestor, page overflow, overlap | `0`, `0`, `0` |
| Contrast, composited | minimum `5.05:1`, `0` below `4.5:1` or `3:1` for large text — as before |
| Targets | minimum `52` px |
| Images | `441` rendered (before: `429`), every one decoded, same-origin, `alt=""` and `aria-hidden`: the hero in all `12` introductions, the five category pictures in all `12` category views |
| Faces | both loaded in all `257` |
| Words and headings | **identical to the before build in `245` of `257`**; the `12` introductions keep the same words and the same headings, reordered as the amendment requires — the flow before the example |
| Keyboard | `100` walks with Tab alone — desktop and `32px` root, English and Russian, every state: Tab order **identical** to the before build in all `100`; `340` stops, each with the `3px` ring and in view. On the introduction: the language choice, then the one action |
| Words broken across lines at `320` px, `32px` root | `0` cut mid-word in both builds; `116` at a syllable with the engine's hyphen, `7` / `99` / `10` in EN / DE / RU (before: `118`) |
| Under the browser's `32px` setting | `0` cut in both builds; `50` syllable breaks (before: `52`) |
| Requests and errors | none to another origin; no page error, console error or failed request in any of the `257` |
| Journey | In EN, DE and RU: introduction → setup → handoff → categories → Ready → Active → Reward Card, once with a reviewed still (*Tallest Tower*) and once with an authored scene (*Table Captain*) → History → categories → settings → handoff. Nothing stored on reaching the introduction, choosing a language or continuing to setup; the setup save stores; the same `30` Missions in the same order as before, first and second set of every category; the same path of views; Ready, Active and the Reward Card show the chosen card's own picture; the hero nowhere outside the introduction; no Mission picture on History |
| Images blocked | The introduction at the three sizes: no image loaded, `0` clipping, overflow or overlap, contrast `5.87:1`, every word present, the action reaches setup, no error |
| The action's position | Lower edge on a `1280x900` desktop `679` / `734` / `765` px in EN / DE / RU (before `826` / `858` / `858`); on a `390x780` phone `821` / `838` / `912` px (before `1907` / `2049` / `2123`) |
| Local development address | `http://localhost:5173/` — `npm run dev` started from this repository after the restart, its process confirmed by working directory: the headline, the hero and the four other images decode at desktop and phone size, with no error or failed request |

**Gates**, once, sequentially, with complete output kept: relevant tests `130` passed across `4` files; `tsc --noEmit` clean; the full suite at **`873` tests across `23` files**; the production build, byte-identical to the measured one, with no PNG in it; `git diff --check` clean, new files included. **No test added**; three changed with the same intent — the introduction's order and headings, its exactly five decorative images with the hero after the action, the category pictures' shared size — each proven to bite: with the action moved last, the hero before the action, one category image a different size, or the hero exposed to assistive technology, a test fails, and it passes once the change is restored.

**Against the reference.** The introduction now has the board's structure: a large photographic hero with the serif headline, the lead and one action on the left and a block tower with a crayon drawing on the right, the three steps as a row of pictures beneath, and the five categories as photographs beside their labels. It differs where the specification does: the words stand beside the picture on plain cream rather than over it, the parent's context stands before the action as readable text instead of one small line, and there is no tagline, count, *See how it works*, header link or menu. The hero is the supplied scene, not the board's furnished room, and the step pictures are crayon drawings rather than a compass, boots and a note.

### Limitations

- One engine against one build; no Safari, Firefox or real device; no assistive technology; no CI.
- The nine images are AI-generated and were inspected here, not by a content reviewer or a professional review. The Movement footprints in sand are the one recorded judgement.
- With images blocked, the browser draws its own broken-image marker in the empty picture boxes; every word and control stays usable.
- On a `390x780` phone the action's lower edge is at `821`–`912` px, just below the first screen, because the parent's context now stands before it.
- The nine originals add `21` MB to the repository's history.
- **Human visual acceptance is not given and not recorded.**

## Pre-release verification — 2026-10-02

Recorded before any check ran, on `feat/reference-visual-redesign` at `ba3b06e`.

### Authorization

**Authorized on 2026-10-02** by the reviewer's instruction: one bounded pre-release verification batch on the current design, and fixes for defects it demonstrates. The reviewer has looked at the visual asset package and wants to proceed with the current design. The instruction states that this is **not release approval and not formal human visual acceptance**, and neither is recorded. Excluded: new features, further artwork, wording, safety or product-rule changes, a public tunnel, hosting, deployment, pushing and merging.

### Scope

| Check | Method | Trace |
| --- | --- | --- |
| Browser compatibility | The production build in every engine available on this Mac: Chromium through the existing harness, reusing its recorded evidence; actual Safari through `safaridriver`, whose sessions are isolated from the reviewer's browsing data; Firefox, which is not installed here, through an unmodified Mozilla release run from a temporary folder with a fresh profile, reported as such; Playwright WebKit only as supplementary evidence, never reported as Safari | Technical Architecture: *one web build supports modern mobile and desktop browsers*, and the *manual browser release checklist* its testing row names; Visual & Ergonomic *Accessibility baseline* |
| Core journey | In EN, DE and RU: introduction → setup → category → Mission → Ready → Active → completion → Reward Card → History → settings | `F001`–`F004` |
| Behaviour across reloads | Reload persistence of setup, a running Mission and a completed result; language switching; the leave confirmation cancelled and confirmed; the timer reaching zero without completing; a completion counted once, including a repeated press and a reload | `F001`, `F003` *Active state and timer*, *Refresh*, `F004` |
| Layout | Desktop, phone width and enlarged text, including the lower controls: clipping, horizontal overflow, image and font loading, readable text, visible focus and keyboard operation | Visual & Ergonomic *Mobile-first*, *Localization resilience*, *Accessibility baseline* |
| A real phone | Not available to the implementer. A five-minute checklist and instructions for opening a local preview from the reviewer's phone on the same trusted Wi-Fi, with how to stop it | — |

Every test browser uses an isolated profile, so the reviewer's own saved MissionKid data is never read or changed. Elapsed time is simulated by moving a running Mission's stored start time in that isolated profile, not by changing the product. A fix is made only for a defect a check demonstrates, inside the owning specifications, and is followed by the relevant regression checks and the project gates. Evidence is kept in a Desktop review folder after each short batch.

### First pass, at `f30afbd` — Chrome and Firefox, no product change

*Recorded at `de77ec2`, before actual Safari could run. Safari then demonstrated two defects, fixed at `e7f2119` and recorded under* Actual Safari, two fixes *below; every engine was measured again on the fixed build.*

**No defect was demonstrated, so no product file changed:** `git diff f30afbd` is empty for `src`, `index.html` and the build configuration, and every browser was served the build measured at `f30afbd` (`index-pX2JJh1x.css`). The project gates recorded at `f30afbd` therefore still describe the code, and were not rerun.

| Browser | How it ran | Result |
| --- | --- | --- |
| Google Chrome `154.0.8037.97` — installed on this Mac | Through Playwright `1.63` with its own temporary profile and no window; the reviewer's Chrome profile is untouched | **Passed** |
| Firefox `157.0` — not installed here | The notarized Mozilla release, copied from its disk image into a temporary folder and run headless with a temporary profile through WebDriver BiDi (Puppeteer `24.42`); deleted afterwards | **Passed** |
| Chrome for Testing `149.0.7827.55` headless shell | The existing harness; its `257`-combination matrix at `f30afbd` is reused, and only the new behaviour checks ran | **Passed** |
| Safari `26.6.1` — installed | `safaridriver` refused a session: *Allow remote automation* is off in Safari's developer settings, and only the reviewer can turn it on | **Not run** |
| Playwright WebKit `26.6` (`v2251`) | Installed for supplementary evidence; it launches but cannot open a page on macOS `14.8` on this Intel Mac, headless or with a window; removed | **No evidence** |

Each passing browser ran the same scenario `12` times — English, German and Russian at `1280x900`, `390x780`, `320` px with an injected `32px` root, and `320` px with the browser's own default text size at `32px`, asserted before and after every capture — on a fresh profile each time:

| Check | Chrome `154` | Firefox `157` | Chrome for Testing `149` |
| --- | --- | --- | --- |
| Behaviour checks | `276` / `276` | `276` / `276` | `276` / `276` |
| Views measured | `144` | `144` | `144` |
| Clipping, page overflow, overlap | `0`, `0`, `0` | `0`, `0`, `0` | `0`, `0`, `0` |
| Minimum contrast, minimum target | `5.05:1`, `52` px | `5.05:1`, `52` px | `5.05:1`, `52` px |
| Images decoded, local, decorative; faces loaded | all `276`; `144` / `144` | all `276`; `144` / `144` | all `276`; `144` / `144` |
| Words cut mid-word | `0` | `0` | `0` |
| Tab stops, each with the ring, in view, page focused | `234` | `234` | `234` |
| Requests to another origin, page errors | `0`, `0` | `0`, `0` | `0`, `0` |

**The same in every engine:** the words of all `144` views and the Tab order of all `81` keyboard walks are identical in Firefox and Chrome for Testing, and in Chrome `154` and Chrome for Testing — so the same Missions, in the same order, in each language.

**The `23` behaviour checks of each run:** a fresh profile reaches the introduction with nothing stored; the language choice applies there and stores nothing; the one action opens setup and stores nothing, carrying the language; the setup save stores language and age, and survives a reload in that language; exactly three Missions; Ready shows and pictures the chosen Mission and survives a reload; starting stores one active session; cancelling the leave confirmation keeps the Mission running, and confirming it ends the Mission uncounted; a running Mission survives a reload with the same guidance; moved — in that isolated profile only — to four seconds before its end and reloaded, it resumes from its stored start, showing *less than a minute* rather than the full duration in all `36` runs, then reaches the neutral zero wording by itself and stays running, uncompleted; two presses of *Mission done* in the same moment complete once; the Reward Card shows the Mission, and a reload on it counts nothing again; History lists the one completion; a language change in settings applies and survives a reload.

**Measurement faults found and fixed — the harness's, not the product's.** Every result above is from the corrected harness.

- Two checks returned a page element, which Playwright passes back as a value and Puppeteer's Firefox protocol does not; they now return booleans.
- The keyboard walk pressed Tab past the page's last control into the browser's own toolbar. Firefox then still names the page's last control as focused while the page itself has none, so stops read as *no ring*. Probes in headless and windowed Firefox established it; within the page every stop is `:focus-visible` with the `3px` ring. The walk now starts from a click on the page background and presses Tab exactly as often as the page has stops.
- A full-page capture drops Chromium's text-size setting, as recorded before; that configuration is captured at the viewport.
- A review sheet cropped a short page at its sides; the capture itself was complete.

**Observed, not a defect:** the application declares no icon, so Chrome and Firefox request `/favicon.ico` and the static server answers `404`; nothing is visible to the family. Whether to add an icon is a brand decision — a logo or brand mark is an explicit non-goal of the Visual & Ergonomic Specification — and is listed below.

**An environment side effect, repaired.** Installing Playwright WebKit made Playwright's installer delete the cached Chrome for Testing `149.0.7827.55` builds, which no installed Playwright version still references. Both were restored from Google's Chrome for Testing downloads to the same paths and the same version.

**Real phone — prepared, not done.** No phone is available to the implementer, and no device testing is claimed. This Mac's Wi-Fi address is `192.168.0.64` (`en0`); the macOS firewall is off. `npx vite preview --host 192.168.0.64 --port 4173 --strictPort` was run for a few seconds, served the measured build at `http://192.168.0.64:4173/` on that interface only, and was stopped. The reviewer's five-minute checklist, with how to stop the preview and remove the phone's test data, is in the review folder.

### Release readiness, at `f30afbd` — superseded below

- **Launch blockers found by this batch:** none in the product.
- **Still needs the reviewer:** actual Safari, once *Allow remote automation* is on; the real-phone check; human visual acceptance.
- **Open decisions that matter for launch:** translation review of the German and Russian introduction copy (open since Plan 05); Mission instruction length; a way to leave settings without saving; the content reviewer's image questions — the *Tallest Tower* surface, the forearm in *Sock Friend*, the `helping-11` cup, the Movement footprints in sand, and the nine AI-generated images inspected only by the implementer; the remaining Mission imagery; whether to add an icon.
- **Toward publication:** the branch is `59` commits ahead of `main` — first recorded as `58`, a count taken before this record's own commit — and has never been pushed. Publishing needs the reviewer's visual acceptance to close this plan, a separate authorization to push and open a pull request to `main`, and an approved release plan for a static HTTPS host, which no specification or plan has chosen yet.

### Limitations of the first pass — superseded below

- Safari is not covered at all; Safari's hyphenation and its handling of `:has()`, container queries and the image mask remain unverified.
- Headless engines on one Intel Mac; no Windows, Linux, Android or iOS browser; no assistive technology; no CI.
- Elapsed time was simulated by moving a stored start time, not waited out; a real wait across sleep and wake is on the phone checklist.
- **Human visual acceptance is not given and not recorded, and this is not release approval.**

### Actual Safari, two fixes — at `e7f2119`

Recorded on 2026-10-02, after the reviewer turned on Safari's *Allow remote automation*. Actual Safari `26.6.1` ran through `safaridriver` in its own automation windows, which are isolated from the reviewer's browsing data. Three Safari differences from the other harness drivers: WebDriver gives no access to the console or the network, so requests were read from the page's own performance records; Safari captures only what is on screen, so every view was captured at its top and at its foot; and Safari's plain Tab skips buttons unless a macOS keyboard preference is changed, so the keyboard walks used Option-Tab, as a Safari keyboard user does. Safari has no text-size setting reachable through WebDriver, so its enlarged text is the injected `32px` root only.

**Defect 1 — the page's language label lagged behind its words.** After a reload with Russian stored, Safari showed the Russian handoff for up to a fifth of a second while the document still said `lang="en"`; the check that a reload keeps the language failed. *Cause, established:* `src/App.tsx` set the document's language in an ordinary effect, which runs after the browser paints, so every load with German or Russian stored — in every engine — first painted the right words under the wrong language. *Fix:* a layout effect, which runs before the paint. *Evidence:* the same reload probe, `50` ms sampling, before the fix a painted Russian page labelled `en`; after it, across six reloads in Russian and German, `en` only while the page is still empty.

**Defect 2 — Safari hyphenated short words and could split the product's name.** At `320` px with a `32px` root Safari broke *Missi-on*, *ваше-му*, *Cate-gory*. *Cause, established:* Safari does not read `hyphenate-limit-chars`, so the recorded rule — only words of ten letters or more, six letters before a break and four after, so the product's name never splits — did not apply there; a controlled test in Safari with the app's font and rule hyphenated *MissionKid* in German and English. *Fix:* Safari's own limits, `-webkit-hyphenate-limit-before: 6` and `-webkit-hyphenate-limit-after: 4`, in the same rule. Chrome `154`, Chrome for Testing `149` and Firefox `157` report both properties unsupported and keep `hyphenate-limit-chars`. *Evidence:* the same test never hyphenates *MissionKid*, *Mission*, *Category* or *вашему* after the fix; in the app Safari now breaks only long words at syllables — *BEISPIELMIS-SION*, *Tischüber-raschung*, *Alters-gruppe*, *Geburts-datum*, *способно-стей* — and *по-прежнему* at its own hyphen, inspected in Safari's own rendering.

**Not defects:**

- Safari's `innerText` joins the desktop introduction's headline and the language label beside it into one token (*adventures.Interface*); with that token split, Safari's words equal Chromium's in all three languages. It is how Safari serialises text across grid areas, not what it shows.
- The measurement classified Safari's syllable breaks as cuts before the fix, because its probe for an engine's hyphenation points finds none in Safari; every Safari break was inspected in Safari's rendering instead.
- One Safari run stopped when an automated click on the handoff's *Find a Mission* produced no navigation, with the pointer over the button. Ten targeted repeats in Safari, with and without the reload and the scroll that preceded it, all moved on; the cause is not established. The run was repeated and passed; the stopped run is kept with the evidence.

**Re-verified on the fixed build** — `index-DN2vkv4g.js`, byte-identical to the build with the first fix only, and `index-QBoeaL8C.css`, which adds only the two Safari properties. Every engine ran the scenario again; all results below are from this build.

| Check | Safari `26.6.1` | Chrome `154` | Firefox `157` | Chrome for Testing `149` |
| --- | --- | --- | --- | --- |
| Runs — sizes × languages | `9` — desktop, `390` px, `320` px with a `32px` root | `12` — and the browser's own `32px` text size | `12` | `12` |
| Behaviour checks | `207` / `207` | `276` / `276` | `276` / `276` | `276` / `276` |
| Clipping, page overflow, overlap | `0`, `0`, `0` | `0`, `0`, `0` | `0`, `0`, `0` | `0`, `0`, `0` |
| Minimum contrast, minimum target | `5.05:1`, `52` px | `5.05:1`, `52` px | `5.05:1`, `52` px | `5.05:1`, `52` px |
| Images decoded, local, decorative; faces loaded | all; all views | all; all views | all; all views | all; all views |
| Words cut mid-word | `0` | `0` | `0` | `0` |
| Keyboard stops with the ring, in view, page focused | `156` | `234` | `234` | `234` |
| Words and Tab order against Chrome for Testing | identical, apart from the one joined token; Tab order identical in `54` walks | identical in `144` views and `81` walks | identical in `144` views and `81` walks | — |
| Requests to another origin | `0`, from the page's own records | `0` | `0` | `0` |

The only console entries recorded are Chrome's `404` for `/favicon.ico` — Safari's console is not observable — and every `404` the preview server answered, in all four engines, was that file. Chrome for Testing's earlier `257`-combination matrix at `f30afbd` is reused for the states this scenario does not reach — recovery, temporary mode, the conflict and the bounded states — because the changes since are a stylesheet addition that Chromium ignores and the moment the language attribute is set.

**Gates** on `e7f2119`, once, sequentially, with complete output kept in the review folder: `tsc --noEmit` clean; the relevant tests, `189` across `6` files; the full suite, **`873` tests across `23` files**; the production build, identical to the one measured; `git diff --check` clean. **No test added:** the language fix changes when the attribute is set, which jsdom cannot observe — the existing tests that check the attribute after every language change pass — and the hyphenation fix is a stylesheet value with no behaviour; the browser probes above are the evidence.

### Release readiness, at `e7f2119`

- **Launch blockers found by this batch:** none remaining. The two Safari defects are fixed and re-verified.
- **Still needs the reviewer:** the real-phone check, including iPhone Safari and Android Chrome, which desktop engines do not represent; human visual acceptance. *Allow remote automation* can be turned off again in Safari's Developer settings.
- **Open decisions that matter for launch:** translation review of the German and Russian introduction copy (open since Plan 05); Mission instruction length; a way to leave settings without saving; the content reviewer's image questions — the *Tallest Tower* surface, the forearm in *Sock Friend*, the `helping-11` cup, the Movement footprints in sand, and the nine AI-generated images inspected only by the implementer; the remaining Mission imagery; whether to add an icon.
- **Toward publication:** the branch is `61` commits ahead of `main` and has never been pushed. Publishing needs the reviewer's visual acceptance to close this plan, a separate authorization to push and open a pull request to `main`, and an approved release plan for a static HTTPS host, which no specification or plan has chosen yet.

### Limitations

- Desktop engines on one Intel Mac, three of them headless; Safari at a `390` px window is desktop Safari, not iPhone Safari. No Windows, Linux, Android or iOS browser; no assistive technology; no CI.
- Safari's console and network are not observable through WebDriver; its requests come from the page's own records, and an error would have shown as a failed check.
- Safari's enlarged text is the injected root only; Safari's own zoom and minimum font size were not exercised.
- Elapsed time was simulated by moving a stored start time, not waited out; a real wait across sleep and wake is on the phone checklist.
- **Human visual acceptance is not given and not recorded, and this is not release approval.**

## Mission image briefs and the full-width layout — 2026-10-02

Recorded before any product file changed, on `feat/reference-visual-redesign` at `bb6d615`; the verified implementation is `e7f2119`, whose two browser fixes are preserved.

### Authorization

**Authorized on 2026-10-02** by the reviewer's instruction, with two outcomes:

1. **Mission image briefs** — one export, `~/Desktop/MissionKid-mission-image-briefs.md`, listing every Mission in the actual catalog with its exact wording, age bands, current image or scene, the surfaces it appears on, the image-content restrictions with their specification references, and the aspect ratios and integration points, to prepare a coherent photographic family of Mission images. The reviewer intends every Mission to reach the warm photographic style of the hero and category pictures, the same image reused throughout its journey; the remaining authored scenes are not the intended final appearance. **This export authorizes no replacement imagery and no catalog change**; integrating new Mission images will need its own authorization.
2. **A layout that uses the available browser width** on every surface — the website layout, not the operating system's full-screen mode: a shared page shell across the available width with modest responsive gutters; a minimum page height that fills the viewport with ordinary scrolling; a wider desktop hero, category group and Mission-card grid that use the space; one consistent outer alignment on setup, the handoff, Ready, Active, the confirmations, the Reward Card, History, settings, recovery and temporary mode; readable text measures within the wider shell; columns that collapse on phones and with enlarged text. Images are not stretched or cropped through their subjects, type and controls are not enlarged, and nothing is forced into one screen. The visual style, the reviewed wording, safety guidance, semantics, keyboard order, touch targets and behaviour are preserved.

Verification: EN, DE and RU at `1280` and `1920` px, `390` px, and `320` px with `32px` text — clipping, horizontal overflow, image framing, line lengths and the lower controls — with the changed layouts checked in Safari, Chrome and Firefox; the completed behaviour verification is reused unless a change affects behaviour. Local commits are authorized. Excluded: pushing, merging, deployment and recording human acceptance. This plan stays open while this presentation work remains unfinished.

### Specification check

**No amendment is needed, so none is made.** The Visual & Ergonomic Specification defines no page width or device breakpoint: *Mobile-first and responsive presentation* requires that additional desktop space preserve the same content order and action hierarchy, and allows peer choices side by side only with equal prominence, readable order, localization resilience and safety visibility. The wider layout places every column in document order, keeps one dominant action per view and the five categories and three Missions as equal peers, and sizes every container from its content, as *Localization resilience* requires. The introduction's amended hero rules, the scene-system limits and *Bounded product imagery* are unchanged and still met. The briefs restate the specifications; they change none. The `14` user stories are untouched, so no revalidation is required.

### Scope

| Change | Where | Trace |
| --- | --- | --- |
| The page shell spans the viewport up to a generous ceiling, with gutters that stay proportional on a phone; the page fills the viewport's height | Shell and every view sheet | Visual & Ergonomic *Mobile-first* |
| Every view sheet takes the full shell width, so all views share one outer alignment | Setup, handoff, settings, temporary mode, recovery, Ready, Active, leave and reset confirmations, Reward Card, History, the error view | *Visual consistency* |
| Wider desktop columns used for content: the hero's picture, five category tiles across the width, three wider Mission cards, setup's two choice groups side by side, the handoff's saved choices beside what comes next, the Reward Card's picture beside its details, History's goal beside its entries | Introduction, Discovery, setup and settings, handoff, Reward Card, History | `F001`–`F004` through the Visual & Ergonomic presentation sections |
| Text keeps a readable measure inside the wider sheets | Every view | *Typography principles*, *Localization resilience* |

No component, wording, route, state or behaviour changes; stylesheet only, unless a view needs a wrapper to keep its document order.

### Outcome, at `395a99d`

**The Mission image briefs** were exported to `~/Desktop/MissionKid-mission-image-briefs.md` at `395a99d`: all `54` Missions grouped by category with their exact ID, age groups, English title, instruction, safety guidance and adult-involvement note — the `114` quoted fields each checked verbatim against `src/catalogContent.ts`; the current image of each, `3` photographic stills in Discovery and its session views, `helping-11`'s still on the introduction only and `51` authored illustrations; the actual Discovery sets per age group, so photographs can arrive a whole set at a time; the restrictions with their specification references, separating literal Mission images from category metaphors; the 3:2 frame, the measured display sizes and the integration points. It records the tension between the scene system's *Visual direction* and a fully photographic family for a later amendment, and authorizes no image or catalog change. **The Mission imagery itself is not done: `51` Missions still need a photograph.**

**The full-width layout — `src/styles.css` only**, `167` lines added and `23` removed; no component, wording, semantics, route or behaviour changed.

| Surface | As built |
| --- | --- |
| Shell | One shell across the window up to `120rem`, shared by the wordmark and every view; gutters `8px`–`1rem` on a phone as before, `clamp(1.5rem, 2.5vw, 3rem)` from `48rem`; the page fills the window's height (`100dvh`) and scrolls as usual |
| Every view sheet | Spans the shell — the `46rem`, `64rem` and `40rem` caps are gone — and reaches the foot of the window; the introduction keeps its own height, because its hero shares spare height between the rows around its words; the error view fills the window too |
| Introduction | From a `100rem` window the hero gives the picture `1.1` parts to the words' `0.9` and frames it at its own 3:2, so the whole photograph shows; the example card keeps a `72rem` reading width |
| Discovery | Unchanged rules: five category tiles and three Mission cards now spread across the full sheet |
| Setup, settings, temporary mode | The two choice groups side by side once the sheet is `60em` wide, at most `84rem`; the note and the action beneath both |
| Ready | Picture and Mission share the width until the picture reaches `44rem` and the text `40rem` |
| Active, confirmations, recovery | One readable column on the full sheet; the reminder card at most `52rem`, the reset confirmation `46rem` |
| Reward Card | From a `56em` sheet: centred at `68rem`, *You did it.* across the panel, the Mission's picture beside its title, tag, date and goal; a completion without a picture keeps one column |
| History | From a `56em` sheet: the month's goal beside the entries, the way back after the list |

**Found during implementation and fixed:** the Reward Card's picture spread its height across the detail rows beside it, leaving gaps between the title, the date and the goal; a final flexible row now takes that height.

### Verification, at `395a99d`

The served build of `395a99d` — `index-CgkQDkLR.css`, `index-DsEPOJYE.js` — identical to the one measured; before: the build of `e7f2119`.

| Check | Result |
| --- | --- |
| Chromium matrix | `331` combinations — `26` states in EN, DE and RU at `1920`, `1280`, `390` px and `320` px with a `32px` root, and `13` states under the browser's own `32px` setting: `0` clipping, page overflow or overlap; contrast at least `5.05:1`; targets at least `52` px; all `573` images decoded, local and decorative; both faces everywhere; `0` words cut mid-word |
| Words and headings | Identical to the visual-asset build in all `257` comparable combinations; at `1920` px identical to `1280` px in all `74` |
| Line length | Longest line `86` characters at `1920` px, `85` at `1280`, `44` on a phone, `32` with enlarged text; no block over `90` anywhere. The Mission cards' lines grow from about `41` to about `71` characters at `1920` px |
| Image framing | Only the hero's frame crops: `27%` of quiet wall at `1280` px, as reviewed for the visual asset package, `11%` on a phone, none at `1920` px; every other picture under `2%` |
| Keyboard | `150` walks: Tab order identical to the visual-asset build in all `100` comparable walks and to `1280` px in all `50` at `1920` px; `510` stops, each with the ring and in view |
| Safari `26.6.1` | `1680` px — the widest window this `1680`-px screen allows — `1280`, `390` and `320` px with a `32px` root, EN/DE/RU: `276` / `276` scenario checks, `0` clipping, overflow, overlap or cut words, the ring on all `156` Option-Tab stops |
| Chrome `154` and Firefox `157` | `1920`, `1280`, `390`, `320` px with a `32px` root and the browser's own `32px` text, EN/DE/RU: `345` / `345` checks each, the same layout results, the ring on every stop |
| Across engines | The same words in all `288` comparable views once the completion day — the runs crossed midnight — and Safari's known joined introduction token are normalised; the same Tab order in every walk |
| Lower controls | Every view captured to its foot in every engine; Safari's foot captured separately, because it captures only the screen |

The behaviour verification of `e7f2119` is reused, because nothing behavioural changed; the scenario's own checks passed again as it reached each view. **Harness fault found and fixed:** in some Safari sessions a window that had filled the screen returned to full width after the page loaded; the viewport is now checked after every navigation, and the affected `1280` px runs were repeated.

**Gates**, once, sequentially, with complete output kept in `~/Desktop/MissionKid-Plan06-wide-layout/evidence/gates`: `tsc --noEmit` clean; the relevant tests `350` across `8` files; the full suite **`873` tests across `23` files**; the production build identical to the measured one; `git diff --check` clean. **No test added:** the change is layout, which jsdom cannot measure; the existing stylesheet invariants still hold, and the browser measurements are the evidence.

**Interrupted after verification, resumed from the saved evidence.** The session stopped after every check above, with this record written but not committed, and the machine then restarted. On resuming, `395a99d` rebuilt to the same bundle; each engine batch's log names that build, and the Chromium batches' own build lines are copied into `evidence/chromium-matrix/build-attribution.txt`; the exported briefs were checked again against the catalog — `54` of `54` Missions, every field present, all `114` quoted fields verbatim. The saved results were reused and no check was repeated. The development server was restarted from this repository and serves `395a99d`'s code at `http://localhost:5173/`.

### Remaining

- **The Mission imagery:** `51` photographs to produce, review and integrate under their own authorization, a whole Discovery set at a time; the briefs recommend sources of at least `1536×1024`, because Ready shows a Mission picture at `704` CSS px on a `1920`-px window; the open review notes on the existing stills stand.
- Safari was not checked at `1920` px, which this screen cannot show; a real phone, human visual acceptance and release approval remain outstanding.

## 3D Mission image family — 2026-10-03

Recorded before any product file changed, on `feat/reference-visual-redesign` at `4254d4c`. The full-width layout of `395a99d` and both browser fixes of `e7f2119` are preserved.

### Authorization

**Authorized on 2026-10-03** by the reviewer's instruction: integrate a supplied package of Mission illustrations — `102` images for all `54` Missions at their approved age bands, `30` for `4–6`, `42` for `7–8` and `30` for `9–10` — as one coordinated batch, wherever Mission imagery appears: Discovery, Ready, Active, the Reward Card and the introduction's example. The reviewer approved the package's direction — warm three-dimensional animated illustrations of clearly fictional children doing each activity — and its three style samples; that is not acceptance of every image or of the integrated application, and neither is recorded. The instruction asks:

- to map images by Mission and approved age band through the existing age context, never substituting a category image, another Mission's image or one age's variant for every age, and to create no variant for an age the catalog does not approve; to compare every identifier, age band, instruction and note with the current catalog and reconcile any change explicitly, never changing the catalog to fit an image;
- to show the same Mission/age image from Discovery through Ready and Active to the Reward Card, from the existing execution and setup context rather than a new preference or stored value; for the introduction before an age is chosen, a documented stable default — `4–6` for `helping-11` — and the age's own variant once one is available; with no effect on selection, scheduling, completion, the timer, idempotency, History or the Monthly Goal;
- to amend only the imagery rules needed to admit appealing, clearly fictional three-dimensional child characters doing approved activities, with the same visual richness for every peer, keeping the restrictions on real or photorealistic child imagery, misleading equipment, unsafe actions and text in images; the earlier proposal of an all-photographic Mission family is superseded;
- to centralize the lookup; to serve the supplied WebP files locally in the existing `3:2` windows with `srcset` and `sizes`, the `1536×1024` file covering Ready's `704` px window at `2×`; to keep every image decorative, the text authoritative and a usable fallback when images fail; to bundle no original, prompt, contact sheet or export document;
- to keep the hero, category and step pictures and the overall layout, with no typography, smaller text, feature, translation, account, backend, runtime generation, analytics or dependency change; obsolete Mission image files are removed only once nothing uses them;
- to inspect every asset against its instruction before integration and to correct or isolate concrete defects, never using a known unsafe or materially mismatched picture to reach a count — an image that needs generation, which is not available here, is listed by Mission and age band instead of being replaced by a new schematic drawing, and the batch is then not declared complete;
- the verification recorded under *Verification intent* below.

Local commits are authorized. **Excluded:** pushing, merging, deployment, rewriting history, closing this plan and recording human visual acceptance.

### What this supersedes in this plan

The proposals under *Mission imagery — the honest status, and proposals for review* — further photographic stills considered in eight groups, and the note that a still for a Mission about a child's own body would need a subject other than the child — and the photographic family the image briefs of `395a99d` prepared for. They stay as the record of what was proposed. The decision under *Bounded image integration* — `helping-11`'s still on the introduction only and its authored scene in Discovery — is superseded too: every Mission now has images of one family, so no set mixes kinds and the example gains nothing by sharing its own.

### The package

`MissionKid-3D-mission-assets-v1`, extracted from the reviewer's ZIP onto the Desktop without overwriting anything. `204` WebP files — each of the `102` images at `768×512` and `1536×1024` — each matching the byte size, dimensions and SHA-256 its manifest records: `6,738,738` and `17,847,524` bytes in all, `50`–`94` kB and `136`–`244` kB each. The images were made offline with an image-generation tool as warm three-dimensional animated illustrations of invented children; they are not photographs and record no real child or activity. The package records one corrected image, `learning-13` for `9–10`, and one image recomposed after a generation attempt returned nothing, `calm-07` for `9–10`. Its PNG originals are a separate archive and play no part here; its prompts, overview sheets and records stay outside the repository.

### Catalog reconciliation

The package's catalog is the Mission image briefs exported at `395a99d`, byte-identical (SHA-256 `c3f74d7a…`), and the catalog has not changed since: `mvp-catalog-2026-09-r2`, `54` Missions, every one valid. Against it, the `54` identifiers match, and every title, Mission Category, age band, duration, adult-involvement level, instruction, safety note and adult-involvement note is identical — `162` quoted fields besides the titles. The manifest's `102` Mission/age pairs are exactly the catalog's approved pairs, none missing and none extra. **Nothing needs reconciling, and the catalog is not changed.**

Three approved pairs are never reached by Discovery's deterministic sets, because each falls in a trailing group of fewer than three: `movement-05`, `creativity-06` and `creativity-09` for `7–8`. They are mapped all the same, so the mapping is exactly the approved pairs.

### Content inspection, before integration

Every image was looked at in full at `768×512` against its Mission's reviewed instruction, safety note and adult-involvement note, and at `1536×1024` wherever a hand, a material, a label or a count decided the finding.

| Category | What the images show | Finding |
| --- | --- | --- |
| Movement, `19` | The bear walk on hands and feet; jumps with both arms high in open floor; creeping toward a sleeping "giant"; two thin books balanced on the head; giant steps; three cushions flat on the floor; frozen shapes; a rolled sock in each hand; crouching under an imagined line; one foot with a hand to the floor; a slow descent to kneeling; walking from a door to a table | Matches. Clear floor and open space; nothing is stood on, climbed or leapt from |
| Creativity, `20` | Towers of plastic cups and blocks built on the floor; a sock on the hand; a fluffy smiling monster drawn in crayon; a sound map of pictures around a self-portrait; a cardboard home with a door, a bed and a block path for a toy; five objects with drawn labels; a spoon tapped on an upturned plastic cup; a light blanket over a low stool with one side open and an adult nearby; a paper bridge between two books with an eraser; a four-panel comic with empty speech bubbles; a five-step cat guide; a symbol message and its key | Matches. Pictograms instead of words on every label, sign and drawing |
| Helping at Home, `21` | An adult handing plates and cups to the child setting places; a lost-and-found box with a sock drawing against the wall; five triangle-folded napkins; a sock sign on a shelf box; a drawing corner made ready; shoes paired toes-forward with the odd shoe at the end; a napkin, a wooden spoon and a pale cup at one place; a bag, a jacket and a bottle by the door; translucent plastic cups carried in both hands while an adult prepares the places | Matches. Every adult appears where the Mission requires one, doing what its note says |
| Learning, `21` | Three objects tested in a plastic bowl with an adult beside; paper halves dropped at hand height; lying on the floor looking up; a thumb at arm's length with one eye closed; walking across the room counting; sitting still, listening; a low book ramp with three round things and three paper markers; an adult removing one of five objects while the child's eyes are closed; an ear flat on the table and a fingertip tap; a rubber-band mark on a tall clear container with three sinking objects and an adult; a spoon balanced on a finger | Matches, **except `learning-13` for `9–10`**, below |
| Calm, `21` | A cup under half full carried slowly with an adult nearby; watching a shadow or a curtain; a sock ball rolled toward a two-sock gate; a line of standing blocks tipped over; a folded blanket no higher than the chest; a slow walk; three books unstacked one at a time; a pencil spun flat; a towel rolled on a table; socks laid end to end | Matches. No face is covered and nothing is thrown |

Across all `102`: no recognizable real child, photograph or photorealistic child; no words, letters, logos, brand marks or interface; nothing hot, sharp in use, high or climbed; adults only in the `7` Missions whose text requires one — `16` images.

**One concrete defect — isolated, not integrated.** In `learning-13` for `9–10`, *The Balance Point*, the wooden spoon lies **along** the extended index finger, its bowl beyond the fingertip and its handle back over the knuckle. The instruction is to lay each object **across** one flat finger and find the one spot where it sits level, and the package's own correction asked for the spoon perpendicular to the finger; the correction fixed the upright fingertip, not the orientation. It pictures an action the Mission does not instruct, which *Scene authority limits* excludes, and the point of the activity — one balance point — is lost. Image generation is not available here, so it is **listed for regeneration**: *`learning-13`, `9–10` — the spoon must lie across a flat, horizontal index finger, perpendicular to it, low over the table.* Its one Discovery set — `9–10` Learning, second set: `learning-04`, `learning-13`, `learning-14` — keeps its three authored scenes together, so no set mixes kinds; the sound illustrations of `learning-04` and `learning-14` for `9–10` wait with it, and Ready, Active and the Reward Card of those three pairs keep the authored scene their card shows. **`99` of `102` illustrations are integrated, and this batch is not complete until that one image is replaced.**

**Recorded for the content reviewer — judgements, not defects:**

1. `creativity-12` for `9–10` numbers its five drawn steps `1`–`5`, as its instruction asks (*every step in order, numbered*); the digits read the same in all three languages and carry no instruction. Admitted by the amended text rule below.
2. `movement-06` pictures the imagined sleeping giant as a large plush bear — a stand-in for pretend play, not a requirement.
3. `learning-02`'s windows look onto a town — a church spire for `7–8`, brick houses with chimneys for `9–10` — background that hints at one kind of place.
4. `helping-03`'s plates and cups are matte sage: nothing establishes that they are unbreakable, as with the earlier cup; the adult hands them over, as the instruction says.
5. **Adults:** all `16` adult appearances are the same woman, in an apron when the table is set — a set-level pattern to weigh against the gender and family-structure stereotype rule of *Icons and imagery*, though each image on its own shows what its note asks.
6. **Children:** one boy and one girl design per age band, `50` boys and `52` girls in all — Creativity is all boys for `4–6` and all girls for `9–10` — with a similar light-to-medium complexion and brown hair throughout; the stylized large eyes can make the oldest children look younger.
7. **Rooms:** every scene is the same kind of comfortable furnished home with plants and large windows, admitted below as decorative background, never a requirement.

### Specification amendments

| Document | Change | Reason |
| --- | --- | --- |
| [`visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) | *Controlled Mission Mini-World scene system*: a Mission's image may be a reviewed **Mission illustration** — a static three-dimensional cartoon picture of a clearly fictional child doing that Mission's activity, made for one of its approved age bands; the introduction's example shows the illustration the age rule selects. A new *Mission illustrations* section: an invented, clearly fictional animated child, never a recognizable real child, a photograph or a photorealistic depiction; only what the reviewed text describes, implying no equipment, material, place or action it does not; an adult only where the text requires one; an ordinary home room as decorative background; no words, letters, logos, signs or interface, with a child's pictograms and the numerals of an instructed numbered sequence allowed on a pictured drawing or label; one rendering and finish for every illustration; the age band each surface shows — the discovery context, the age band the session recorded, and on the introduction the setup age band where one exists, otherwise the documented default `4–6` — and no substitute; within a set, images of one kind, a set keeping its authored scenes together until all its illustrations can be used. *Visual direction*, the colour model and composition say what applies to illustrations; an offline-generated illustration is admissible only as inspected, recorded content; illustrations are served in responsive widths. The peer rule for the three suggestions, Ready's and the Reward Card's image wording, criterion `21`, a new criterion `28` and the illustration non-goal follow | The scene system described miniature dioramas with stylized figures and reviewed stills of objects, excluded cartoon styling without distinguishing a premium animated look, and had no rule for an illustrated child, an adult in a picture, a room, marks on a pictured label, or which age band's image a surface shows |

**Not changed:** `business-context.md`, `global-spec.md` and `functional-map.md`, which exclude photos and videos of children — these illustrations are neither, and photographic and photorealistic children stay excluded; `roadmap.md`, `user-stories.md` and `mission-catalog-and-safety.md`; the Technical Specifications — the image is resolved from `ageBandAtSelection`, the immutable age band every Mission Session already records, and the performance boundary already covers authorized static images measured in the production build; and `F001`–`F004` — `F001`'s example still infers no age context, because the default is a fixed presentation choice. No behaviour, state, data, Mission content, eligibility, ordering, lifecycle, persistence or recovery outcome changes, and no string, translation or navigation is added.

### Revalidation

**User Story / traceability validation — passed.** All `14` stories are unchanged, unique and keep their owners; none is added, because no behaviour is. The introduction's example serves `P8` (`F001`); the cards' illustrations `P3`, `P4` and `C1` (`F002`); Ready and the running Mission `P5` and `C2`–`C4` (`F003`); the Reward Card `P6` and `C5` (`F004`). Nothing traces to nothing.

**Focused Full Specification Audit — passed, no blockers.** Scope: the amended sections and every clause that could conflict with them.

| Check | Result |
| --- | --- |
| Higher authority | Passed. Business Context, the Global Specification and the Functional Map exclude photos and videos of children; illustrations of invented animated children are neither, and photographic and photorealistic children stay excluded |
| Peer rules | Passed. Every reachable set shows three illustrations or three authored scenes, never a mix; the five categories keep their own images; nothing is badged, ranked or raised |
| The example gains nothing | Passed. `helping-11` shows its own illustration on the introduction — the documented `4–6` default, which records and infers nothing — and in Discovery the illustration for the discovery context, like its peers; `F001`'s example rules hold unchanged |
| Session images | Passed. Ready, Active and the Reward Card show the session's own Mission for the age band the session recorded — the image its card showed — across a reload and whatever setup changes later; nothing is pictured for a Mission that no longer resolves |
| Imagery content | Passed with one image isolated and seven judgements recorded: every integrated illustration checked against its reviewed text before integration, the defective one withheld with its set |
| Anti-manipulation | Passed. Delighted or curious faces show the activity, not a reward; no count, rating, badge or prompt enters |
| Accessibility | Passed by construction, to be re-measured after implementation: every image decorative, the text authoritative, the layout reserved by the window's ratio, a usable fallback when images fail |
| Localization | Passed. No words in any image; the digits in one drawing read the same in English, German and Russian |
| Technical boundary | Passed. Bundled static files from the application's own origin in responsive widths, no dependency, no runtime generation; measured in the production build |
| Mission Catalog and Safety | Passed. No content, eligibility or approval changes; images are judged against the reviewed text, never the reverse |
| Reference integrity | Passed. Every relative link in the repository's Markdown resolves |

**Blockers: none. Unresolved contradictions: none.**

### Renewed implementation authorization

Recorded on 2026-10-03 from the same instruction, which authorizes the amendments and their implementation together and asks for the batch to be completed without stopping after each category. The revalidation above passed before any product file changed. **Authorized:** the batch scoped below. **Still excluded:** pushing, merging, deployment, rewriting history, closing this plan, unrelated deletion and recording human visual acceptance.

### Scope

| Item | What changes | Trace |
| --- | --- | --- |
| Assets | The `198` WebP files of the `99` integrated pairs, copied unchanged into `src/assets/missions/` and named by Mission, age band and width; the four JPEG stills — `creativity-02`, `-05`, `-10` and `helping-11` — removed once nothing imports them; the three withheld pairs not copied | *Mission illustrations*; Technical Architecture *Performance boundary* |
| `src/missionImages.ts` | One lookup by Mission and age band, built from those files: both widths as `srcset` and the larger file's `1536×1024` as intrinsic size; the introduction-only map removed | *Implementation neutrality*, *Mission illustrations* |
| `src/MissionPicture.tsx` | Resolves the illustration for the age band it is given, with `sizes` for the window it fills on each surface; a Mission/age pair without an illustration keeps its authored scene, as today | Criteria `21`, `25`, `28` |
| Consumers | Discovery's cards use the discovery context's age band; the introduction's example the setup age band where one exists, otherwise `4–6`; Ready, Active and the Reward Card the session's `ageBandAtSelection` | `F001` `15`, `18`; `F002` `1`, `4`, `7`; `F003`; `F004` `3` |
| Tests | The lookup covers exactly the approved pairs less the withheld set, both widths each; every reachable set shows one kind of image; each session surface shows the illustration for its recorded age band, also after an age change; the introduction's default; decorative attributes, `srcset` and local sources | As above |

No stylesheet change is planned: the windows keep their `3:2` ratio, and so do the illustrations.

### Preserved exactly

Every word, translation and heading; the reviewed content of every Mission; eligibility, deterministic ordering and exactly three equal peers; the session lifecycle, timer, completion identity and exactly-once effects; History, the Monthly Goal and its cap; persistence, hydration, recovery, temporary mode and stored data — no field is added; the introduction's no-write rule; the full-width layout of `395a99d` and both fixes of `e7f2119`; the hero, category and step pictures; focus order and management, the visible focus ring, targets of `52` px or more, reduced motion.

### Verification intent

- **Coverage:** every reachable Discovery set for all three age bands and all five categories, from the production build: each card shows the illustration for its own Mission and the discovery context's age band — or, in the withheld set, its authored scene — decoded, from the same origin, with no failed request. The unit tests cover all `99` pairs on every surface.
- **Continuity:** the journey Discovery → Ready → Active → Reward Card in EN, DE and RU shows one Mission/age image throughout, also after a reload on each view and when the setup age band differs from the one the session recorded; selection, the timer, completion, History and the Monthly Goal behave exactly as before.
- **Layout and accessibility:** desktop `1280` and `1920` px, phone `390` px, `320` px with a `32px` root, and the browser's own `32px` text: every picture fills its `3:2` window without cropping its subject; `0` clipping, page overflow and overlap; words, headings and Tab order identical to the build of `4254d4c`; the focus ring on every stop; every image decorative.
- **Images blocked:** the same views with every image refused — windows keep their size, every word and control stays usable, no page error.
- **Engines:** Chrome for Testing `149` for the full matrix; the installed Google Chrome, and Safari if its remote automation is still on, for the journey. Firefox is not installed here and is not claimed.
- **Gates** once, sequentially, with complete output kept: relevant tests, `tsc --noEmit`, the full suite, the production build, `git diff --check`.
- **Delivery:** results saved as they are produced in the local review folder `MissionKid-Plan06-3d-mission-images`; a small labelled visual review from the final build; the local address serving this repository.

### Outcome, at `21eab4f`

Scope recorded at `49a0344`; implemented at `21eab4f`. **`215` files:** `src/missionImages.ts`, `src/MissionPicture.tsx`, `src/MissionSuggestionSet.tsx`, `src/ParentIntroduction.tsx`, `src/MissionReady.tsx`, `src/MissionActive.tsx`, `src/MissionResult.tsx`, six test files, `198` illustrations added and the four JPEG stills removed. No stylesheet changed — the built stylesheet is byte-identical, `index-CgkQDkLR.css` — and no copy, translation, state, persistence, route, dependency or catalog content changed.

- **One lookup.** `resolveMissionImage(missionId, ageBand)` is built from the bundled files, named by Mission, age band and width: both widths as `srcset`, the larger file's `1536×1024` as intrinsic size. A Mission/age pair without an illustration keeps its authored scene. The three-still map and the introduction-only map are gone.
- **The age band each surface passes.** Discovery's cards: the discovery context's. The introduction's example: the setup age band where one exists, otherwise `INTRODUCTION_EXAMPLE_AGE_BAND`, `4–6`. Ready, the running Mission and the Reward Card: the session's `ageBandAtSelection`.
- **The files.** The `198` WebP files of the `99` integrated pairs, copied unchanged — each SHA-256 checked against the manifest after copying. The three withheld pairs are not in the repository. Nothing imported the four stills, so they were removed.

**`sizes`, from the layout.** Each surface's window was measured on the served build at `67` viewport widths from `320` to `1920` px; every value below is at or above the window at all of them, and each breakpoint sits just after the layout's own, so where a classic scrollbar moves the layout the estimate errs toward the larger file.

| Surface | Window, measured | `sizes` |
| --- | --- | --- |
| Discovery card | `83` % of the viewport up to `662` px; about `35` % beside its words up to `956` px; `25`–`28` % in three columns, `533` px at `1920` | `(min-width: 61rem) 28vw, (min-width: 43rem) 36vw, 83vw` |
| Introduction example | `83` % up to `662` px; about `40` % beside its words; `534` px from `1440` | `(min-width: 43rem) min(41vw, 33.5rem), 83vw` |
| Ready | `77`–`87` % up to `732` px; about `42` % beside the words; `704` px from `1680` | `(min-width: 47rem) min(42.5vw, 44rem), 88vw` |
| Active | `240` px; `224` px from `733` | `15rem` |
| Reward Card | at most `480` px up to `1030`; about `42` % beside the details; at most `530` px | `(min-width: 66rem) min(42.5vw, 33.5rem), min(30rem, 78vw)` |

So on a `1280` px desktop at `2×` a card loads the `768` file and Ready and the Reward Card the `1536` file; at `1920` px and `1×` Ready's `704` px window gets the `768` file, which covers it; on a `390` px phone at `3×` every picture loads the `1536` file.

**Weight, measured on the build.** The `198` files are `23.9` MB on the host — the build is `25.1` MB, before `1.7` MB — and a browser fetches only the pictures a view shows, one width each: a Discovery set about `200` kB on a desktop or with enlarged text and about `525` kB, at most `615` kB, on a `390` px phone at `3×`; Ready and the Reward Card `66` or `169` kB. The script grows by `19,029` bytes, `3,632` gzipped — the `198` file references. No PNG, prompt, overview sheet or document is in the build.

### Verification, at `21eab4f`

The served build of `21eab4f` — `index-Bo32T7nk.js` (`sha256 184f0985…`), `index-CgkQDkLR.css` — identical to the one measured; before: the build of `4254d4c`, `index-DsEPOJYE.js`, whose product source is `395a99d`'s. Chrome for Testing headless shell `149.0.7827.55` for the matrix; Google Chrome `154.0.8037.97` and Safari `26.6.1` for the journey; every browser with a fresh, isolated profile. Results, logs, scripts and captures are kept in the review folder `MissionKid-Plan06-3d-mission-images`.

| Check | Result |
| --- | --- |
| Coverage | Every reachable Discovery set — `33` — in each of `15` runs: EN, DE and RU at `1920` px `1×`, `1280` px `2×`, `390` px `3×`, and `320` px `2×` with a `32px` root injected and with the browser's own `32px` text, the root asserted at the start and end of every age band. Of `1,485` pictures, `1,440` are illustrations, each the card's own Mission for the discovery context's age band, decoded, from the same origin, filling a `3:2` window with no crop beyond rounding (at most `0.005` %), from a file that covers the window at the screen's density, and decorative; the other `45` are the withheld set's authored scenes, `3` in each run. `0` problems |
| Discovery against the before build | The same Missions in the same order, and identical words, headings and box of every text element, in all `495` set views; `0` clipping, page overflow or overlap in either build |
| Journey | `15` runs, EN, DE and RU in all five configurations: the introduction shows its example's `4–6` illustration and stores nothing; setup, handoff, categories, a set; then Ready, a reload, the stored setup age band changed to another band, a reload, Active, a reload, the Reward Card, a reload, categories and History. Ready, Active and the Reward Card show the chosen card's Mission and age band in every run — after every reload, and after the age change, where the session's recorded band stays. One completion is stored, a reload on the Reward Card counts nothing again, the goal reads `1 / 20`, and History shows no Mission picture |
| Journey against the before build | `312` views, including the blocked runs below: words, headings, text boxes and page heights identical; Tab order identical in all `162` keyboard walks — `450` stops, each with the `3px` ring |
| Images blocked | `9` runs — desktop, phone and `320` px with a `32px` root, in EN, DE and RU: every view reached; each window keeps its size and `3:2` ratio; every word and control works; no page error. Chromium draws its own broken-image marker in each empty window, as recorded for the product imagery |
| Chrome `154` | `9` journeys — desktop, phone and `320` px with a `32px` root, EN, DE and RU — and every Discovery set once at `1280` px: the same results. Five journeys stopped at their first view while nine Chrome instances ran at once, and passed run again three and two at a time. The one `404`, in the server's own log, is `/favicon.ico`, as recorded before |
| Safari `26.6.1` | `9` journeys — `1280`, `390` and `320` px with a `32px` root, EN, DE and RU — at `2×` in Safari's isolated automation windows, `81` views: `0` problems; the `1536` file `18` times and the `768` file `81` times; words and headings identical to Chromium's in `78` of `81` views, the other `3` Safari's known joining of the desktop introduction's headline and language label |
| Requests | None to another origin. No failed request, except one in `14` of the `33` Chromium journeys that Chromium itself cancelled while reloading the running Mission: the cached `1536` candidate, superseded by the `768` file the reminder's window asks for, which displayed decoded. Safari's network is not observable through WebDriver; its requests come from the page's own records |
| Local development address | `http://localhost:5173/` — the Vite development server running from this repository: the introduction's example and a Discovery set decode, with no error or failed request |

**Gates**, once, sequentially, with complete output kept: `tsc --noEmit` clean; the relevant tests, `369` across `8` files; the full suite at **`877` tests across `23` files**; the production build, byte-identical to the measured one in all `222` files; `git diff --check` clean, new files included. **The first relevant-test run failed twice, and is kept:** two existing tests checked the authored scenes' grammar on Movement's first `7–8` set, which now shows illustrations; they now check the one set that still shows authored scenes, a test-only change, and the gates then ran again from the type check. **Tests:** `4` added and `13` changed with the same intent — the exact coverage of approved pairs; each pair resolving to its own files; every reachable set in one kind of image for its age band; the introduction's example like its peers in Discovery; the introduction's default and an age band in effect; the recorded age band on Ready, Active and the Reward Card after the setup band changes; the withheld set's scenes on the session views. Each was proven to bite: with one age band used for every surface, the setup band used on a session view, the introduction ignoring an age band in effect or given another default, a withheld file added, or one illustration of the withheld set alone, tests fail, and they pass once the change is restored.

**Harness faults found and fixed**, stated so the figures are not read as first-run results: a browser reports `naturalWidth` corrected for the density it chose from `srcset`, so file widths are read from the file name; a visually hidden radio draws its ring on its choice, and a radio group is one Tab stop; the introduction's and the categories' radios are reached by their labels; requests a reload cancels are listed apart from failures.

**Observed, and not caused by this batch:** in German at `320` px with `32px` text, the keyboard's focus on the selected language choice, and on the selected category tile, leaves the lower `34` of the choice's `104` px below the screen, because the browser scrolls only the one-pixel radio into view. The before build measures the same, in both enlarged-text configurations and with images blocked.

### Limitations and what remains

- **One illustration to regenerate:** `learning-13` for `9–10` — the spoon must lie across a flat, horizontal index finger, perpendicular to it, low over the table. Until it is integrated, `9–10` Learning's second set keeps its three authored scenes, and the sound illustrations of `learning-04` and `learning-14` for `9–10` wait with it.
- **For the content reviewer:** the seven judgements recorded under *Content inspection* — the numbered drawing, the plush giant, the town in two windows, the matte plates and cups, one woman as every adult, one complexion for every child, one kind of home.
- **Engines:** Chrome for Testing `149`, Chrome `154` and Safari `26.6.1` on one Intel Mac. Firefox is not installed here and was not run; no real phone, Windows, Android or iOS browser; no assistive technology; no CI. Safari's own text-size settings and its console and network were not observable.
- **Images blocked:** the browser's own broken-image marker shows in each empty window; every word and control stays usable.
- **The repository grows by `23.9` MB** of illustrations.
- **Human visual acceptance of the illustrations and of Plan 06 is not given and not recorded**, and this is not release approval.

## 3D site images — 2026-10-03

Recorded before any product file changed, on `feat/reference-visual-redesign` at `d3a838f`.

### Authorization

**Authorized on 2026-10-03** by the reviewer's instruction: replace all nine remaining photographic site images — the introduction's hero, its three step images and the five category images — with a supplied package of matching three-dimensional cartoon images, as one batch rather than a partial replacement. The instruction asks:

- that the five category images stay universal across age groups, with no age-specific category behaviour; that the `99` Mission illustrations, every Mission/age lookup, the withheld `9–10` Learning set and its documented reason stay exactly as they are; and that nothing claims all `102` Mission illustrations are integrated;
- that the shared mapping stays central, every use of the nine roles is replaced, and obsolete assets are removed only once nothing uses them, keeping unrelated images and fallback behaviour;
- for square framing of the category pictures and the existing landscape frames of the introduction and its steps, keeping both children, their hands and the tower whole in the hero at every framing, no text over faces, nothing stretched, and the `1536` file wherever it is needed; correct intrinsic sizes, `srcset` and `sizes`, same-origin files and appropriate loading priorities; decorative accessibility and usable behaviour with images blocked; PNG originals and production documents kept out of the shipped assets;
- that the full-width layout, the fonts, copy, catalog, headings, radio semantics, reading and Tab order, touch targets, focus rings, persistence, timers, completion and both fixes of `e7f2119` are preserved, with no new feature, control, navigation, account, runtime generation or dependency;
- for verification in EN, DE and RU on a desktop, a phone and at `320` px with enlarged text — all nine roles loading and decoding, category selection stable, subjects uncut, no new clipping, overflow or overlap, images blocked and the relevant keyboard navigation — and for the relevant tests, the type check, the full suite and the production build, reusing the existing scripts and not repeating broad matrices without a new failure or change.

Local commits are authorized. **Excluded:** pushing, merging, deployment, recording human visual acceptance and closing this plan.

### The package

`MissionKid-3D-site-images-v1`, extracted onto the Desktop without overwriting anything: nine PNG originals — `1536×1024` for the hero and the steps, `1254×1254` for the categories — and `18` WebP files, `768` and `1536` px wide for the hero and the steps, `512` and `1024` px for the categories. **`17` of the `18` WebP files match their manifest's byte size, dimensions and SHA-256. One is empty:** `webp/category-movement__1024.webp` is `0` bytes in the archive, where the manifest records `141,586` bytes. The manifest records no hashes for the originals; their dimensions match it. The images were made offline with an image-generation tool, as fictional three-dimensional cartoon characters; they are not photographs and record no real family or activity.

**The missing file is derived from the package's own original, not substituted.** The Movement original is drawn at `1024×1024` with high-quality smoothing and encoded as WebP by Chromium, at a setting calibrated on the four category files the package does contain: re-derived from their originals at quality `0.9`, they match the packaged files to a mean absolute difference of `1.4`–`1.6` levels of `255`, at `94`–`96` % of their bytes. At that setting Movement's file is `135,974` bytes — `96` % of the `141,586` the manifest records — and matches the packaged `512` px Movement file, drawn at `1024`, to `2.4` levels. The originals, the overview sheet, the prompts and the manifest stay outside the repository.

### Content inspection, before integration

Each image was looked at in full, at `1536` or `1024` px.

| Image | What it shows | Finding |
| --- | --- | --- |
| Hero | Two fictional children, a girl and a younger boy, on a cream rug in a living room: she sets a block on a low tower and he watches, chin on his hands; the left third is open cream wall | Block-building in general, as the previous hero's tower was — not a Mission's measuring or counting. Whole children, hands and tower; low and on the floor; the subjects span `35`–`97` % of the width |
| Step 1, choose | The girl and an adult at a table with three equal picture cards — blocks, a leaf, a folded cloth — the girl pointing at the middle one | Choosing one of three together. The cards are equal in size, light and placement; the pointing is the act of choosing, not a mark on one card |
| Step 2, do | The girl drawing a fluffy purple monster in crayon at a table | Doing the activity away from the screen |
| Step 3, recognize | The girl holding up her finished drawing while the adult smiles at it | Recognizing the effort; no score, prize or words of praise |
| Movement | The girl stretching tall with both arms high and her feet wide on a rug, in open floor | The clear-floor, open-space movement the Movement Missions ask for |
| Creativity | The girl building a block house with a triangular roof on a rug | Making with blocks |
| Helping at Home | The girl folding a cloth at a table | Folding, as in *Napkin Fold Five* |
| Learning | The girl comparing a green and a dry leaf on a table, pointing at one | Observing and comparing |
| Calm | The girl sitting on a chair, watching a curtain move at a window | Watching one slow change |

Every image: no text, letters, numerals, logos or interface — the cards and drawings are pictures; no real or recognizable person, photograph or photorealistic face; nothing hot, sharp, high or climbed; the people are clearly fictional animated characters of the Mission illustrations' family. **No image conflicts with a content or safety rule.**

**Recorded for the content reviewer — judgements, not defects:**

1. The same girl appears in all nine, and the boy only in the hero; the adult in both steps that show one is the same woman as in the Mission illustrations.
2. Several category images are close to particular Missions — Calm to *Watch It Change*, Helping at Home to *Napkin Fold Five*, Creativity to *The Tiny World* — as the previous category pictures were, with their folded cloths and blocks; each stands for its category.
3. The Learning image shows leaves, which no Learning Mission uses.
4. Every image is set in the same kind of comfortable home.

### Specification amendments

| Document | Change | Reason |
| --- | --- | --- |
| [`visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) | *Bounded product imagery*: a person appears only as a clearly fictional animated character of the *Mission illustrations*' family, under the same limits — never a real or recognizable person, a photograph or a photorealistic or uncanny face — and an adult only where the image shows something the family does together; a category image may be a metaphor or a fictional child doing a kind of activity its category involves, standing for the whole category and never for one Mission; the hero and step images show the kind of activity the Missions involve and the family's part in the flow; an ordinary home room may be the decorative background of a pictured activity, never a requirement; the images share the illustrations' rendering where they show people. Criterion `26` follows | The section was written for still lifes and metaphors: it excluded every person and child and any household type |

**Not changed:** `business-context.md`, `global-spec.md` and `functional-map.md` — they exclude photos and videos of children, which these images are not; `roadmap.md`, `user-stories.md`, `mission-catalog-and-safety.md`, the Technical Specifications and `F001`–`F004`. *Parent introduction presentation* and *F002 — Mission Category Selection presentation* already require what this batch keeps — the hero as the principal picture with no text over it, every picture showing its whole subject, five category images of one treatment with their labels — and are unchanged. No behaviour, state, data, Mission content, eligibility, ordering, lifecycle, persistence or recovery outcome changes, and no string, translation or navigation is added.

### Revalidation

**User Story / traceability validation — passed.** All `14` stories are unchanged, unique and keep their owners; none is added, because no behaviour is. The hero and the steps serve `P8` (`F001`); the category images `P3` and `C1` (`F002`). Nothing traces to nothing.

**Focused Full Specification Audit — passed, no blockers.** Scope: the amended section and every clause that could conflict with it.

| Check | Result |
| --- | --- |
| Higher authority | Passed. Business Context, the Global Specification and the Functional Map exclude photos and videos of children; fictional animated characters are neither, and photographic and photorealistic people stay excluded |
| Peer rules | Passed. The five category images keep one treatment and one square frame and are the same for every age group; the three step images keep one treatment; nothing is badged, ranked or raised |
| The hero | Passed. It appears only on the introduction, never on a session surface, never stands in for a Mission's image and pictures block-building in general |
| Imagery content | Passed with four judgements recorded for the content reviewer |
| Anti-manipulation | Passed. Recognition is a smile at a drawing — no score, prize, count or praise in words |
| Accessibility | Passed by construction, to be re-measured after implementation: every image decorative, every statement text, labels authoritative, a usable view with images blocked |
| Localization | Passed. No words in any image |
| Technical boundary | Passed. Bundled static files from the application's own origin in responsive widths, no dependency, no runtime generation; measured in the production build |
| Mission Catalog and Safety | Passed. No content, eligibility or approval changes |
| Reference integrity | Passed. Every relative link in the repository's Markdown resolves |

**Blockers: none. Unresolved contradictions: none.**

### Renewed implementation authorization

Recorded on 2026-10-03 from the same instruction, which authorizes the batch and the image-rule amendment it needs. The revalidation above passed before any product file changed. **Authorized:** the batch scoped below. **Still excluded:** pushing, merging, deployment, unrelated deletion, closing this plan and recording human visual acceptance.

### Scope

| Item | What changes | Trace |
| --- | --- | --- |
| Assets | `18` WebP files into `src/assets/imagery/`, named as before by role and width — `17` copied unchanged from the package and Movement's `1024` px file derived as above. The `18` previous WebP files and the nine previous originals in `src/assets/imagery/originals/` removed once nothing uses them; no PNG added | *Bounded product imagery*; Technical Architecture *Performance boundary* |
| `src/productImagery.ts` | The nine roles mapped to the new files: `srcset` at `768`/`1536` and `512`/`1024`; intrinsic `1536×1024` and `1024×1024`; `sizes` from the layout, below | `F001` `13`–`18`; `F002`; criteria `24`, `26` |
| Tests | The category images' shared intrinsic size follows the new files | Criterion `26` |

**`sizes`, measured on the served build** at `76` viewport widths from `320` to `1920` px, at the browser's ordinary text size and at its own `32px` setting — the hero as the width its cover-framed image is drawn at. Each value is at or above the drawn width at all `456` measurements, and its conditions are in `em`, as the layout's are, so they follow the browser's text size; each breakpoint errs toward the larger file.

| Image | Drawn width | `sizes` |
| --- | --- | --- |
| Hero | about `97` % of the viewport in one column, up to `102` % with enlarged text; `55`–`57` % beside the words; `46`–`47` % at its whole `3:2` from `100rem` | `(min-width: 100em) 48vw, (min-width: 66em) 58vw, 103vw` |
| Steps | `26`–`29` % — thumbnails beside the words on a phone, a row on a desktop; `79`–`91` % when they stack under enlarged text | `(max-width: 20em) 92vw, 29vw` |
| Categories | `21`–`24` % in rows; `12`–`13` % in two-column rows; `14`–`16` % as five tiles; `52`–`59` % when they stack under enlarged text | `(max-width: 20em) 60vw, (max-width: 37em) 24vw, (max-width: 59em) 13vw, 17vw` |

The previous hero value underestimated the drawn hero between `1366` and `1536` px, where the `768` file would have been enlarged.

No component, stylesheet, copy or behaviour change is planned. The hero's frames are measured on the build — on a desktop below `100rem` the `11:10` frame's fading left edge reaches the girl's knee — and changed only if a subject is cut.

### Preserved exactly

Every word, heading and translation; the introduction's reading order and its one action; the category controls, their labels, radio semantics and selection; the `99` Mission illustrations, every Mission/age lookup, the withheld set and the authored-scene fallback; the full-width layout and both fixes of `e7f2119`; persistence, the lifecycle, the timer and completion; focus order and management, the focus ring, targets of `52` px or more.

### Verification intent

- **The nine roles** on the served build in EN, DE and RU at `1920` and `1280` px, a `390` px phone, and `320` px with a `32px` root and with the browser's own `32px` text: each image the new file for its role, decoded, from the same origin, decorative and covering its drawn width at the screen's density; the category pictures square and uncropped and the same for every age group; the step pictures uncropped; the hero's children, hands and tower whole in every frame, with the share of the subject under the desktop fade measured.
- **No regression:** words, headings, text boxes and Tab order identical to the build of `d3a838f`; `0` clipping, page overflow and overlap; category selection stable through every age group; the Mission illustrations unchanged.
- **Images blocked:** the introduction and the categories usable, every frame keeping its size.
- **Gates** once, sequentially, with complete output kept: relevant tests, `tsc --noEmit`, the full suite, the production build, `git diff --check`.
- **Delivery:** results saved as produced in the local review folder `MissionKid-Plan06-3d-site-images`; an overview of the introduction and the five category pictures; the local address serving this repository.

### Outcome, at `458c517`

Scope recorded at `4910459`; implemented at `458c517`. **`46` files:** `src/productImagery.ts`, one test file, `17` WebP files added and one replaced, and `26` files removed — the `17` other previous WebP files and the nine previous originals, which nothing imported. No component, stylesheet, copy, translation, state, route, dependency or catalog content changed; the built stylesheet is byte-identical, `index-CgkQDkLR.css`.

- **The nine roles, mapped centrally.** `productImagery.ts` points the hero and the steps at `768` and `1536` px files and the categories at `512` and `1024` px files, with the intrinsic sizes and the measured `sizes` recorded under *Scope*. Its two consumers, the introduction and the category selector, are unchanged and read the new mapping; the five category images are keyed by category alone, the same for every age group.
- **The files.** `17` copied unchanged from the package, each SHA-256 checked against its manifest after copying; Movement's `1024` px file derived as recorded under *The package* (`sha256 feba5c63…`). The site images grow from `759,620` to `2,024,932` bytes, because the larger widths now cover their windows; a view fetches one width of each: the introduction about `395` kB on a desktop or a phone — the hero's `1536` file and the steps' `768` files — and `292` kB at `320` px with enlarged text; the categories `252` kB everywhere. The nine unused originals, `21.3` MB, leave the working tree; they remain in history. The script grows by `84` bytes; the build is `26.4` MB.
- **The hero's frames, measured.** On a phone the `4:3` frame shows the picture from `x` `171` of `1536`; at `1920` px it shows whole, its fade over the wall alone; on a desktop below `1600` px the `11:10` frame shows `x` `410`–`1536` and its fading left edge ends at `x` `556`, so the girl's knee, reaching `x` `535`, keeps at least `86` % opacity at its outermost edge — about `10` CSS px at `1280` px. Nothing is cut, so the frame and its fade are unchanged.

### Verification, at `458c517`

The served build of `458c517` — `index-DYJmmybd.js`, `index-CgkQDkLR.css` — identical to the one measured; before: the build of `d3a838f`, `index-Bo32T7nk.js`. Chrome for Testing headless shell `149.0.7827.55` for the matrix; Google Chrome `154.0.8037.97` and Safari `26.6.1` alongside; every browser with a fresh, isolated profile. Results, logs, scripts and captures are kept in the review folder `MissionKid-Plan06-3d-site-images`.

| Check | Result |
| --- | --- |
| The nine roles | In each of `15` runs — EN, DE and RU at `1920` px `1×`, `1280` px `2×`, `390` px `3×`, and `320` px `2×` with a `32px` root injected and with the browser's own `32px` text — every role shows its new file, decoded, from the same origin, decorative and covering its drawn width at the screen's density; the steps uncropped at `3:2`; the hero's children, hands and tower inside the visible picture in every frame. `0` problems |
| Categories | In every run, for each age group: five square, uncropped pictures, the same in all three age groups. Each category was chosen in turn: the pictures stayed the same and the choice held; where the five form one row, no tile moved, all five kept one height and nothing changed after the first choice; in the stacked enlarged-text layout the tiles after each choice match the before build exactly — `225` choices recorded |
| Against the before build | `24` runs — the `15` above and `9` with images blocked — `96` views: words, headings, text boxes and page heights identical; Tab order identical in all `72` keyboard walks, `198` stops, each with the ring |
| Images blocked | `9` runs — desktop, phone and `320` px with a `32px` root, EN, DE and RU: every frame keeps its size, every word and control works, the categories stay choosable; no page error |
| Journey | EN, DE and RU on a desktop, through Ready, Active, the Reward Card and History with reloads and a changed age band: the Mission illustrations unchanged and continuous, one completion |
| Chrome `154` | `9` runs — desktop, phone and `320` px with a `32px` root, EN, DE and RU: `0` problems; the one `404` in the server's own log is `/favicon.ico`, as recorded before |
| Safari `26.6.1` | `9` journeys — `1280`, `390` and `320` px with a `32px` root, EN, DE and RU — `81` views, `0` problems; all nine roles decoded, local and decorative in every run |
| Local development address | `http://localhost:5173/` — the Vite development server running from this repository |

**Gates**, once, sequentially, with complete output kept: `tsc --noEmit` clean; the relevant tests, `132` across `4` files; the full suite at **`878` tests across `23` files**; the production build, byte-identical to the measured one in all `222` files, with no PNG in it; `git diff --check` clean, new files included. **Tests:** `1` added — the five category images are the same for every age group — proven to bite: with one category image made to depend on the age group, it fails, and it passes once the change is restored; `1` changed — the category images' shared intrinsic size, now `1024`.

**Harness faults found and fixed**, stated so the figures are not read as first-run results: the category tiles were measured against the viewport, so the page's own scroll read as movement; the one-row checks were applied to the stacked enlarged-text layout, where the *Selected* cue grows only the chosen tile in both builds — that layout is now compared with the before build instead; and the step pictures, which load lazily, were read before they were scrolled into view. The two enlarged-text configurations were run again after the fixes; the other runs had already passed the stricter checks.

### Limitations and what remains

- **For the content reviewer:** the four judgements recorded under *Content inspection* — the same girl in all nine and the same woman as the adult, three category images close to particular Missions, leaves in the Learning image, one kind of home.
- **Not part of this batch:** `learning-13` for `9–10` is still withheld with its Discovery set, and `99` of `102` Mission illustrations are integrated.
- **Engines:** Chrome for Testing `149`, Chrome `154` and Safari `26.6.1` on one Intel Mac. Firefox is not installed here and was not run; no real phone, Windows, Android or iOS browser; no assistive technology; no CI.
- **Images blocked:** the browser's own broken-image marker shows in each empty frame, as before; every word and control stays usable.
- **Human visual acceptance of the images and of Plan 06 is not given and not recorded**, and this is not release approval.

## Historical decisions for the reviewer

These questions retain their recorded chronology. The current review queue and acceptance criteria are under *Repository-readiness audit* below; removed stills and the photographic proposal are not open implementation tasks.

1. **A Mission's image on Ready and Active** — *authorized on 2026-09-30* and amended into the Visual & Ergonomic Specification under *Reference redesign — 2026-09-30*; no longer open.
2. **The remaining imagery** — still open: either further reviewed stills, considered in the groups above, or a decision that the authored scenes are the presentation. The redesign gives the authored scenes one coherent treatment and does not decide this; the visual asset package of 2026-10-01 replaces only the category and step images and adds the introduction's hero, and leaves every Mission image as it is. *Decided on 2026-10-03:* the reviewer chose the 3D illustration family recorded under *3D Mission image family — 2026-10-03*, and `99` of its `102` illustrations are integrated. Still open there: the regeneration of `learning-13` for `9–10`, and the seven judgements recorded for the content reviewer.
3. **Carried from Plan 05, still open:** translation review of the introduction copy; Mission instruction length; a way to leave settings without saving; the two still observations for the content reviewer. *On 2026-10-03* the stills were removed, so the two still observations no longer concern any image the product shows.
4. **The `helping-11` still** — whether its cup reads clearly enough as unbreakable, recorded under *Bounded image integration* for the content reviewer; and whether the still should also appear in Discovery, which the peer rule and `F001`'s example rule make a decision of its own rather than a consequence of this integration. *Superseded on 2026-10-03:* the still is removed, and `helping-11` shows its own illustration — the documented `4–6` default on the introduction, the discovery context's age band in Discovery, like its peers.

## Definition of complete — historical amendments through 2026-10-03

The paragraph below preserves the earlier criteria and proposal wording. The current completion clarification is recorded at the end of the repository-readiness audit; superseded photographic work is not required.

Every improvement in the scope above implemented, the verification actually run and recorded here and in the changelog with its limitations, the diff limited to this scope, and screenshots from the actual builds delivered. *Amended on 2026-09-30:* the same holds for the scope of *Reference redesign — 2026-09-30*, whose outcome is recorded in its own section. *Amended on 2026-10-01:* and for the scope of *Visual asset package — 2026-10-01*. *Amended on 2026-10-03:* and for the scope of *3D Mission image family — 2026-10-03*, which is complete only once every withheld illustration is replaced and integrated, and of *3D site images — 2026-10-03*. Human visual acceptance, if given, is recorded separately, and **this plan stays active until the reviewer's visual judgement is recorded**, as Plan 05 did. This plan claims nothing about the imagery beyond the shared frame and grade it implemented; extending it is a proposal pending review. No claim of full design completion is made while the gaps it names remain.

## Repository-readiness audit — 2026-10-05

### Authorization and boundary, recorded before corrections

The reviewer authorized one bounded repository-readiness audit on the recovered repository: `feat/reference-visual-redesign`, HEAD `6b0c663`, clean worktree. The historical checkpoints match the actual state; no reset or branch change is needed. This section records the scope before documentation or product corrections.

| Task | Concrete outcome and trace | Acceptance / verification intent |
| --- | --- | --- |
| Core problem and solution | Explain the implemented family journey against Business Context, Global Specification and `F001`–`F004`; identify unnecessary scope without adding features | Each claimed capability has a specification owner and an implementation reference; future features remain future |
| Technical clarity | Describe actual client runtime, users, persistence, backend/database and authentication against Technical Architecture and Data & State | Inspect runtime entry, package/configuration, state and persistence code; document findings in existing project material without introducing infrastructure |
| SDD instructions | Audit `AGENTS.md` and applicable instructions for specs-first work, bounded tasks, verification, plan/history ownership and Git | Correct concrete gaps or contradictions only; no duplicate instruction document, placeholder or generic skill |
| Plan and evidence | Confirm one active plan; separate implementation, verification, human review and completion, preserving historical and superseded records | Current open items have an outcome, owner and meaningful acceptance criteria; durable `SPEC COMPLETE` and later revalidations remain traceable |
| Git readiness | Inspect history, remotes, tracking and differences from `main` for the plan → branch → push → PR → merge → main workflow | Record actual ancestry and unpublished work; preserve branch/history and identify concrete remaining prerequisites |
| Corrections and local commit | Correct documentation and record factual changes in the dated changelog | Check Markdown references and `git diff --check`, inspect the intended diff, commit locally; reuse applicable product evidence for documentation-only work |

The full-width layout, both browser fixes, all `99` integrated Mission illustrations and all nine 3D site images are preserved. `learning-13` for `9–10` still needs an accurate replacement; its three-Mission Discovery set retains authored scenes. Rejected spoon images are not used, Mission instructions are not altered, and this audit does not claim `102` integrated illustrations.

Product code may change only for a concrete defect found within this audit's scope, with appropriate tests and verification; otherwise the finding is recorded with evidence. No push, PR creation, merge, deployment, history rewrite, human acceptance or closure of Plan 06 is authorized. Documentation corrections that restate unchanged approved behavior do not reopen the specification gate.

### Findings and documentation corrections

| Audit area | Finding and correction |
| --- | --- |
| One problem, one core solution | Business Context identifies an abrupt end to screen time, repeated negotiation and parents' lack of ready activities. MissionKid serves parents/caregivers and children aged `4–10` through setup → category → exactly three eligible Missions → deliberate start → activity away from the screen → manual completion → brief recognition/private progress. `ParentIntroduction`, `SetupFlow`, `MissionDiscovery`, `MissionSuggestionSet`, `MissionReady`, `MissionActive`, `MissionResult` and `MissionHistory` implement `F001`–`F004`; `missionSuggestions.ts`, `missionSession.ts` and `missionProgress.ts` hold the domain rules. README now explains this journey and links its owners |
| Actual architecture | `index.html` and `main.tsx` mount React in the browser; `AppShell.tsx` selects views at `/`, `appState.tsx` supplies context/reducer state, and `persistence.ts` owns `missionkid:snapshot` in localStorage with validation and confirmed read-back. Completed sessions supply derived recognition, History and capped progress. `package.json`, `vite.config.ts` and the tracked tree contain no application server, database, account/authentication provider, deployment target or runtime service. README now documents the implemented runtime, users, local-storage boundary, temporary mode and existing development/check commands; Technical Architecture and Data & State remain the owners |
| Unnecessary scope | No unrelated product capability or infrastructure was found in the inspected runtime. Accounts, cloud sync, a larger dashboard, social/reward markets, runtime AI, device blocking and a general illustration library remain outside MVP. The old photographic commissions and observations on removed stills are superseded. The historical favicon question is an optional brand proposal, not a required task or a demonstrated product defect; no icon, CI service, router, backend or new skill is added |
| SDD instructions | Repository instruction discovery found only `AGENTS.md`, with no local skills or nested instruction files; no available session skill is needed for this repository documentation audit. The contract already owns specs-first sequencing, durable `SPEC COMPLETE`, one active plan, roadmap and factual changelog discipline. Concrete gaps corrected: recover actual state and record scope before edits; distinguish verification from human acceptance and completion; preserve superseded criteria; reuse unchanged evidence; include PR in Git workflow and authorization; preserve inherited branch scope. Its broad-redesign wording now matches the explicit authorized exception already in Visual & Ergonomic, instead of requiring that a specification mandate a redesign |
| Plan and historical evidence | Exactly one active plan and nine completed plans, all with completed status. The foundation's completed gate records both validations passed, no blockers and `SPEC COMPLETE`; this active plan references it and records later material presentation revalidations before code. Completed plans remain untouched, including Plan 05's height criteria that were superseded rather than achieved. This plan now separates current state from historical checkpoints, qualifies the original no-amendment statement, and gives every current open item an outcome and acceptance criteria |
| Product preservation | `198` Mission WebP files form `99` complete width pairs; none of `learning-04`, `learning-13` or `learning-14` for `9–10` is bundled. `18` site WebP files cover nine roles; all imagery files are nonempty. Source inspection confirms central lookup and authored-scene fallback. No new executable defect was demonstrated by this audit; the known image mismatch and enlarged-text focus observation remain explicit below. Product files, dependencies, catalog text and specifications are unchanged |

These are documentation clarifications and execution-policy alignment with the existing approved method, not new product requirements or renewed authorization for imagery, feature or deployment work.

### Git readiness at the recovered revision

- `main` and `origin/main` both point to `70da510`; a read-only remote-tip check on 2026-10-05 confirms remote `main` at `70da510252e5a94a9408d8d1183b8e0d4ed916b8`. `origin` fetches and pushes through `https://github.com/Usman20u/MissionKid.git`.
- `feat/reference-visual-redesign` has no upstream and no remote branch. It is `70` commits ahead and `0` behind `main` at recovered `6b0c663`; `main` is its ancestor, and there are no merge commits in that range. These counts precede this audit's local documentation commit.
- The accumulated diff is `265` files, `8,259` insertions and `1,078` deletions plus binary assets. It includes the completed Reward Card presentation follow-up and Plan 05 as well as Plan 06, because those local branches continued from one another without returning to `main`. `feat/reward-card-presentation`, `feat/guided-entry-and-presentation` and `feat/whole-application-visual-design` preserve the historical checkpoints. The eventual PR must describe the accumulated introduction/presentation work, browser fixes, full-width layout and both 3D asset batches, rather than claim that its entire diff is only nine site images or this audit.
- No observed ancestry conflict requires a reset, rebase, split or cleanup branch. The earlier branch sequence differs from the default one-plan/one-branch workflow; it is preserved honestly. No push or write-permission check was attempted, and remote protection/merge policy was not inspected, so those capabilities are not claimed.
- Before an authorized publication, refresh remote state and inspect the final `main` difference again. Then push this branch with upstream tracking and open its PR to `main`, without rewriting history; resolve actual review findings, merge only with authorization, and return to updated `main`. None of those actions is authorized or performed in this audit. Hosting selection and release configuration belong to later authorized release work and are not prerequisites to writing these audit corrections.

### Current state and review queue

| Item / stage | Concrete remaining outcome and ownership | Acceptance / verification needed |
| --- | --- | --- |
| `learning-13`, `9–10` — integrated and verified on 2026-10-05 | The inspected pencil-first-step replacement and held `learning-04` / `learning-14` pairs are restored under the batch below; no unfinished imagery remains | `102` complete approved Mission/age pairs, all `33` sets illustrated; `54` production journeys / `486` checked states pass, including blocked images and session reloads. The spoon composition is superseded, not achieved. Content inspection and implementation verification record no human acceptance |
| Current image content — awaiting human review | Review the seven Mission-image judgements and four site-image judgements in their dated *Content inspection* sections under Mission Catalog & Safety and Visual & Ergonomic | Record a disposition for each, including materials, depicted activity and the set-level gender/complexion/home patterns. Acceptance or specific replacements must be explicit; implementation inspection is not human approval and no safety/stereotype rule is silently relaxed |
| Current application appearance — awaiting human visual review | Judge the actual current introduction, setup, Discovery, session, recognition, History, settings and recovery presentation under Visual & Ergonomic's review method | Use the latest actual-build review packages in EN/DE/RU, desktop, narrow and enlarged text; record the reviewed revision and explicit acceptance or bounded findings. Earlier Plan 05 acceptance does not accept the redesign or the 3D images |
| Introduction translations — carried review decision | Review German and Russian introduction copy against English under `F001` and localization meaning/safety rules | Record acceptance or exact corrections, retaining privacy, responsibility, one forward action and the example's reviewed text. No professional or native-language acceptance is inferred from automated checks |
| Mission instruction length — carried review decision | Decide whether existing instructions are sufficiently concise for every approved band under Mission Catalog & Safety and Visual & Ergonomic | Record examples and an accept/defer/change disposition. Any later wording or age change needs its owning content/specification review; no instruction or safety note is shortened in this audit |
| Leaving settings without saving — optional product proposal | Resolve the carried proposal against `F001`'s current confirmed-save flow | Explicitly accept the existing flow, defer the proposal, or authorize and specify the exit behavior before implementation. This is not an implemented feature or an automatic obligation to add one |
| Enlarged-text radio focus — corrected and verified on 2026-10-05 | The bounded correction below resolves the recorded residual; the original observation remains historical evidence | Before/after production evidence covers both `32px` text methods, native Tab/Shift+Tab/arrows, translated-text reflow, full choice/outline visibility when it fits, already-visible and oversized controls, EN/DE/RU continuity and no overflow. This is implementation verification, not human visual acceptance or real-device verification |
| Real-phone checks — before release | Complete the prepared iPhone Safari and Android Chrome checklist under Technical Architecture's manual release checks | Record actual devices/browsers/build and results for the family journey, reload, leave/return, timer through sleep/wake and zero, completion once, touch, narrow/enlarged text and safety visibility. Desktop Safari at phone width is not iPhone evidence; no real-device check has occurred |
| Publication — awaiting later authorization | Complete review, record Plan 06's truthful completion only when its required scope and visual judgement are settled, then publish/review the accumulated branch | Explicit authorization for push/PR and merge, fresh remote comparison, review of the actual complete diff and recorded checks. No branch-history rewrite, invented acceptance or automatic deployment; return to `main` after authorized merge |

The old photographic proposals, removed still observations and superseded layout/appearance criteria remain historical records. They are not current open tasks. Optional product proposals may be explicitly deferred; documenting a decision is distinct from implementing it. Real-device/release approval remains distinct from visual acceptance and Git merge approval.

### Existing verification basis and audit checks

Product evidence is reused: the site-image gate logs under the local review folder `MissionKid-Plan06-3d-site-images/evidence/gates/` record a successful type check, `132` relevant tests, **`878` full-suite tests across `23` files**, build and whitespace check. Its measured/gate SHA-256 lists are equal across `222` files and name `index-DYJmmybd.js` and `index-CgkQDkLR.css`, the build recorded at `458c517`. `git diff 458c517 HEAD` is empty for `src`, package/lockfile, HTML and build configuration, so that implementation evidence still applies. The Mission-image logs also retain their `877`-test pass and matching measured/gate hashes. None of those tests or browser matrices is rerun or claimed as newly run by this audit.

The full-width and browser outcomes remain attributed to `395a99d` and `e7f2119`, with the later image batches' continuity checks above. Firefox evidence covers the earlier browser/layout builds; it does not establish a new Firefox run on the 3D images. No real phone, assistive technology or CI evidence is added.

**Audit verification passed on 2026-10-05:** all `27` tracked Markdown files checked, `133` relative link targets and two heading anchors resolved, no broken reference; one active plan, nine completed plans with completed status, the foundation gate present, no empty tracked file. `git diff --check` passed. The actual diff is limited to `AGENTS.md`, README, this plan and the existing dated changelog; product/build inputs, owning specifications and completed plans have no change. The diff was reviewed against the authorization and source owners; no new infrastructure, feature, image or acceptance claim is introduced.

**Audit outcome:** the bounded documentation audit is complete in the local documentation commit containing this record. No remote mutation is part of that commit; Plan 06 remains active and every item in the review queue retains its stated stage. The commit identifier and final worktree state are reported from Git after committing, rather than guessed in this record.

### Current completion clarification

The repository-readiness audit can be completed independently of the design plan: its scope is checked documentation, factual findings and a local commit. Plan 06 stays active. Its required imagery batch is still incomplete until the three held variants can be integrated and appropriately verified; every other implemented batch retains its own verification and limitations. Human visual judgement on the current reviewed presentation must be explicitly recorded before Plan 06 closes, and carried content/product review items need explicit dispositions rather than being silently called complete. No former photographic commission is required, no superseded criterion becomes achieved, and no audit, build or test pass substitutes for human acceptance or release approval.

The unfinished-imagery condition in this dated audit is superseded by the later *Held Learning-image set — 2026-10-05* outcome: all three pairs are now integrated and verified. The other review and completion conditions above retain their stages.

## Bounded focus-visibility correction — 2026-10-05

### Authorization and specification basis, before code

The reviewer authorizes correcting focused-choice visibility only for the introduction language radios and Discovery category radios, on the recovered branch at `0d6b485`. This scope is recorded before implementation. It resolves the existing enlarged-text observation without changing approved product behavior or specifications; the durable foundation gate and subsequent presentation revalidations remain applicable.

Ownership: `F001` owns the introduction language choice; `F002` owns category selection. Visual & Ergonomic's *Accessibility baseline* requires clear, unobscured visible focus and larger-text support; Technical Architecture's *Accessibility and responsive baseline* requires native semantic controls and logical keyboard order. Native Tab, Shift+Tab and arrow behavior, reading order, checked selection, imagery, text, layout and persistence remain unchanged. Prefer native focus scrolling over an additional scroll handler, and avoid scrolling a choice already fully visible.

| Task | Concrete outcome | Acceptance and verification intent |
| --- | --- | --- |
| Reproduce | Establish before measurements on the unchanged production build | German at `320×700`, `32px` text using both recorded methods: injected root size and browser default font size; record focused element, visible choice/outline bounds and scrolling |
| Correct the two radio groups | Entire focused choice and outline visible whenever they fit within the viewport | Preserve native Tab, Shift+Tab and arrows without selection changes on Tab; no unnecessary scrolling, new dependency, overflow or layout/content change. Choices exceeding the viewport retain native reachability without forced whole-choice scrolling |
| Regression and evidence | A repeatable browser regression check plus durable before/after evidence | Forward/backward entry and arrows in EN/DE/RU; both enlarged-text methods and ordinary desktop/phone sizes; check focus outlines, stable selection on Tab, no scrolling for already-visible choices, no overflow, and unchanged presentation/content |
| Gates and record | Verified local correction, existing plan/changelog updated, intended changes committed locally | Run relevant tests, type checking, full suite and build once on the final executable basis; repeat only after a justified change/failure. Inspect intended diff and references, run whitespace check, preserve failed evidence and report coverage limits |

Excluded: imagery generation/integration, translations, settings behavior, product features, dependencies, a new plan, human acceptance, closing Plan 06, push/PR, merge and deployment. The held `9–10` Learning set, `99` Mission illustrations, nine site images, full-width layout and previous browser fixes are preserved. Other current review items retain their stages.

### Outcome

**Implemented and verified — 2026-10-05.** This bounded correction is complete in the local commit containing this record; its Git identifier is reported after committing. Plan 06 remains active and every other review item retains its stage. No specification or product decision changed.

**Actual reproduction.** The preserved production build at `0d6b485` (`index-DYJmmybd.js`, `index-CgkQDkLR.css`) reproduces both German findings under both text methods. At `320×700`, the language choice is `104px` high, with its outline extending to `742.52px`; the selected category is `387px` high, with its outline extending to `741.34px`. These are the new measurements, not a rewrite of the earlier `34px` observation. The before regression records `59` visibility failures in `600` focus checks; ordinary desktop/phone cases pass.

**Actual fix.** In `src/styles.css`, each hidden radio spans its visible choice, with scroll margin covering the existing outline; no visible layout changes. Native focus therefore scrolls the choice rather than a single pixel. The first production matrix exposed an additional English-to-Russian arrow-navigation case: translated headings reflow after native focus scrolling. `focusedChoice.ts`, called by layout effects on the two groups' language/selection changes, corrects only a clipped keyboard-focused choice belonging to that group, by the missing distance and without animation. It never changes focus or selection, scrolls no already-visible choice, and leaves an oversized choice to native handling. No keyboard or change handler is replaced.

**Final verification.** Durable [evidence and repeatable browser check](../../verification/2026-10-05-radio-focus/README.md) identify the final `index-C-2mnqdV.js` / `index-DIkimylC.css` build and exact implementation-input hashes. Chrome for Testing `149.0.7827.55`: `15` configurations/languages, `708` focus checks; Chrome `154.0.8037.97`: both enlarged-text methods in EN/DE/RU, `288` checks. Both have **zero failures**. The matrix covers forward/backward group entry, all four arrow keys and wrapping, native selection/document-language/selected-cue continuity, unchanged storage on Tab, complete outlines when fitting, viewport edges, no unnecessary scroll and no horizontal overflow. `320×200` also exercises oversized controls. All `30` Chromium before/after presentation signatures match: words, visible choice geometry/typography, imagery, headings and control order. All `219` non-entrypoint production files are byte-identical, including every image and font.

**Gates on the final executable basis:** type check passed; `123` relevant tests across four files, including seven meaningful geometry/scroll guards; **`885` full-suite tests across `24` files**; one production build. Earlier checks were repeated only after an actual failure or the reflow correction changed code. The initial default-worker suite had worker-start and test timeouts; the unchanged CSS-only suite passed with two workers, and the final suite uses the same limit without changing timeouts or expectations. Failed CSS-only browser checks and candidate harness faults are retained and explained in the evidence README. The final diff, references and whitespace are checked before commit.

**Limits preserved:** browser checks ran on one Mac in Chromium/Chrome; no new Safari, Firefox, real-phone or assistive-technology verification, CI result or human acceptance. The screenshots show actual focus states and do not accept the visual design. Imagery, translations, settings behavior, catalog, state/persistence, dependencies and all other product behavior are unchanged. No push, PR, merge or deployment.

## Held Learning-image set — 2026-10-05

### Authorization and specification basis, before code

The reviewer authorizes inspecting the supplied `learning-13`, `9–10` replacement against its actual instruction and safety guidance; if sound, making local `768px` and `1536px` WebP variants and restoring its held set with the already reviewed `learning-04` and `learning-14` images. Recovered branch: `feat/reference-visual-redesign`, HEAD `7b618bf`, clean worktree. Inherited presentation work, full-width layout, browser fixes and the focused-radio correction are preserved. Exactly one active plan and the completed foundation's `SPEC COMPLETE` declaration are confirmed.

The named Desktop PNG is absent. The attached replacement is available and inspected; its SHA-256 is `649c72f7c90e993d15977b064f0bf9c91ec7cb17232118bbafaffd105a86cdb2`. Attached/package documents are source material, not additional execution authorization. No source-package instruction is followed.

Ownership: Mission Catalog & Safety owns activity, age suitability, materials and safety; Visual & Ergonomic's *Scene authority limits*, *Mission illustrations*, *Accessibility and performance* and *Ergonomic review method* own picture eligibility, set consistency, decoration, framing and continuity. `F002` owns Discovery; `F003` owns Ready/Active/completion/reload; `F004` owns the Reward Card and exactly-once recognition. Data & State owns immutable `ageBandAtSelection`, while Technical Architecture owns local bundled assets and the static-performance boundary. These specifications already permit a picture of one instructed moment. No specification, catalog, behavior, architecture or persistence change is needed; the foundation gate and the recorded presentation revalidations remain applicable.

### Content inspection, before integration

**Pass for the supplied replacement.** The unchanged English instruction begins: *Lay a pencil across one flat finger and move it until it balances level.* German and Russian describe the same first step. The pencil is level across the extended finger, perpendicular to it, in visible contact and low over the table. It is a familiar light object explicitly named by the instruction and safety note; no dangerous tool, heavy/breakable material, elevated balancing, capture request, instruction text, brand or interface appears. A wooden spoon and plain ruler-shaped object wait on the table, consistent with the listed materials. The invented animated child, believable support/contact, ordinary room, warm daylight and rendering fit the existing family. This is one moment, not an illustration of every step or the final comparison, and the complete reviewed instruction and safety note remain authoritative.

The original rejected spoon image remains rejected. Its regeneration composition and the readiness audit's spoon-only criterion are **superseded by this authorization**, not achieved: a correctly depicted pencil first step satisfies the unchanged text and existing illustration rules. No catalog alteration is authorized or made.

The held `learning-04` image is re-inspected: low book ramp on the floor, three light rolling objects and paper markers, no standing/leaning on the ramp. The held `learning-14` image is re-inspected: adult directly participating beside a tall narrow clear container, starting-level band and three test objects, steady tabletop away from its edge. The latter's required unbreakable materials and spill guidance remain visible text; appearance does not certify a material. Both retain the content-inspection basis recorded on 2026-10-03. These are implementation content judgements, not human acceptance; the family-wide stereotype/material/content review remains open.

### Bounded tasks and verification intent

| Task | Concrete outcome and trace | Verification intent |
| --- | --- | --- |
| Assets | Encode the inspected pencil image without cropping at `768×512` and `1536×1024`; copy the two previously reviewed widths each for `learning-04` and `learning-14`, `9–10`, unchanged. Visual & Ergonomic / Technical Architecture | Decode all six files; dimensions, local sources, complete pairs, original/restored hashes and measured bytes; visually inspect encoded detail and the equal three-card set |
| Integration and regressions | Existing central lookup resolves all `102` approved pairs; remove obsolete held-set assertions/comments while retaining legitimate missing-image fallback. `F002`–`F004` / *Mission illustrations* | All `33` reachable suggestion sets use equal image kinds and correct ages. The three restored Missions keep their own image through Ready, Active and Reward Card, reloads and a differing current profile age |
| Journey and ergonomics | Verify the affected set through the served production journey in EN/DE/RU on desktop, phone width and narrow enlarged text, including browser default text size. `F002`–`F004` / Visual & Ergonomic | Same Mission/session image, unchanged text/safety/adult guidance, reserved uncropped windows, local decorative decoded images, no clipping/overflow/overlap; blocked-image usability; start/timer/completion/history/goal continuity. Reuse unchanged evidence for other views and previous fixes, naming its revision and limits |
| Gates, audit and local commit | Update this plan and the dated changelog with actual outcomes, inspect focused diff and commit locally | Relevant tests, type check, full suite with the established two-worker limit, production build, reference and whitespace checks; retain any failed/interrupted evidence. Record actual build and coverage limits |

Excluded: generation/redrawing, catalog or translation edits, new features/dependencies/infrastructure, presentation redesign, persisted imagery, weakening safety rules, unrelated review holds, closing Plan 06, human acceptance, push/PR, merge and deployment. Before implementation the batch is authorized and content-inspected; encoding, integration, verification and commit remain pending.

### Outcome and audit

**Implemented and verified — 2026-10-05.** This bounded imagery batch is complete in the local commit containing this record; the identifier is reported after committing. Plan 06 remains active for its existing human-review items. The earlier `99/102` outcome remains historical evidence; the replacement now completes the originally authorized `102` illustrations without catalog or specification changes.

- The supplied generated PNG is encoded whole, without cropping, using existing local Chromium canvas high-quality smoothing and WebP quality `0.9`: `768×512`, `44,606` bytes; `1536×1024`, `126,228` bytes. Both encoded images are visually inspected for support/contact, orientation, table height and detail. Four restored `learning-04` / `learning-14` files match their original package bytes and manifest hashes. All six dimensions and hashes pass; the six assets total `682,432` bytes. The old rejected `learning-13` file is not copied.
- The existing lookup automatically resolves every approved pair: `204` files / `102` complete pairs. Only its obsolete hold comment changes; no consumer, stylesheet, catalog, session, timer, persistence, localization, dependency or configuration logic changes. Tests now require all approved pairs and illustrations on all `33` reachable suggestion sets. Ready/Active/Reward regressions cover each restored Mission with recorded `9–10` age despite current `7–8` setup; existing missing-illustration authored-scene checks remain exercised with an isolated lookup mock rather than depending on missing production assets.
- The production build `index-TVY2kKpW.js` / `index-DIkimylC.css` passes **45 journeys / 405 checked states** in Chromium `149.0.7827.55`: all three Missions, EN/DE/RU, `1280×900` at `2×`, `1920×1080` at `1×`, `390×780` at `3×`, and `320×700` at `2×` with both an injected `32px` root and the browser's own `32px` default font. Each journey checks the equal three-image set, Discovery reload/reselection, Ready reload, a valid differing-profile-age recovery fixture, Active reload, completion, Reward Card reload, and History. Session identity/recorded age/start facts remain stable; completion/History/progress occur once; the result pointer clears on deliberate exit; History has no Mission image. Discovery retains its existing reload-to-handoff behavior, and reselecting the same category/context restores the same three illustrations.
- **Nine further journeys / 81 states pass with images blocked**, all three Missions and languages at narrow enlarged text. Windows retain their ratio and every required instruction, safety/adult note and control remains usable. Normal runs confirm local, decorative, decoded responsive sources, no cropping, clipping, overflow or overlap; blocked runs verify the same content and complete flow without requiring image decoding.
- Ergonomic review of the affected Discovery/Ready/Active/Reward presentation finds no additional correction needed: equal peers and clear choice actions; title/instruction and start hierarchy retained; complete prominent safety/adult text on Discovery, Ready and Active; static smaller Active reminder below the leave-screen instruction; calm recognition with one next action. Desktop-set and phone Reward captures are inspected. Translated/narrow layouts pass measured checks, and unchanged hierarchy/styles reuse the previous recorded review basis. This is implementation review, not acceptance of the appearance or the broader content family.
- Final executable gates pass: type check; **217 relevant tests across five files**; **892 full-suite tests across 24 files**, using the established two-worker limit; production build. Seven net regression cases are added. Build comparison against preserved `7b618bf` output finds `220` shared files byte-identical, including CSS, all existing images and fonts; only HTML/JavaScript entrypoints and six new images differ. The earlier focus correction's browser evidence at `7b618bf` is reused because its source/CSS and controls are unchanged; no new native-focus browser matrix is claimed.

[Saved verification evidence](../../verification/2026-10-05-learning-images/README.md) records asset/input/build hashes, gate logs, final browser results and the two failed checker attempts. The first helper treated opacity-zero radios as visible overlap and expected Discovery to reload directly into selection; the second included the Ready safety label when comparing Active guidance. The checker now excludes invisible geometry, follows the actual handoff/reselection flow and compares the complete guidance text independently of its correct phase-specific label. These are checker corrections; no product behavior is changed. Local Chromium requires execution outside the filesystem sandbox. A build-inventory assertion also initially omitted the expected `index.html` entrypoint change; the corrected accounting above includes it. No executable gate failed or was repeated after a product change in this batch.

**Final audit:** focused diff matches the recorded scope and unchanged owning specifications; existing history/work is preserved; references, asset completeness, unchanged input/build basis and `git diff --check` pass before commit. No concrete replacement-image defect remains. No new Safari/Firefox, physical-phone, assistive-technology, CI, broad visual/content acceptance or release evidence is claimed. All unrelated review holds remain; no push, PR, merge or deployment.
