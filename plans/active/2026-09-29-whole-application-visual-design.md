# MissionKid Plan 06 — whole-application visual design

**Date:** 2026-09-29
**Status:** Scope recorded before implementation at `f68470a`; implemented and verified at `53d6a8d`, recorded under *Outcome*. **Implementation is paused, from 2026-09-29, while the reviewer visually reviews Plan 06**; human visual acceptance is not given and not recorded, and the known visual gaps listed under *Outcome* remain, so this plan stays active. Further imagery is a proposal pending review, not an approved obligation — see *Review hold and clarifications*. **One bounded exception to the pause** is authorized on 2026-09-29: the `helping-11` image integration recorded under *Bounded image integration*, and nothing else.
**Branch:** `feat/whole-application-visual-design`, taken from `9f53610`, the commit that closed Plan 05 on `feat/guided-entry-and-presentation`. That branch is preserved unchanged at its closure. No history was rewritten.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration.

It follows the completed implementation plans `F001`–`F004`, the Reward Card follow-up, and [Plan 05](../completed/2026-09-22-guided-entry-and-presentation.md), closed on 2026-09-29 with the reviewer's visual acceptance of its reviewed presentation. All of them are historical evidence and none is reopened. Plan 05's specification amendments were revalidated there and are unchanged; this plan amends no specification.

**Authorized on 2026-09-29** by the reviewer's instruction: continue the whole-application visual design, using the supplied warm, cream-and-green photographic Discovery reference as the established direction, across the parent introduction and setup; Discovery, its Mission Categories and Mission cards; Ready, Active and the leave confirmation; settings and the setup handoff; temporary mode, recovery, reset and the empty and error states; and the relationship to the accepted Reward Card and History. The instruction asks for concrete gaps from the existing inventory, this scope recorded before code, and cohesive improvements through reusable presentation rules; for the current step, the main action and the secondary actions to be immediately understandable; for honest treatment of the Mission imagery; and for verification in English, German and Russian on desktop, mobile and narrow enlarged-text layouts.

**Excluded:** pushing, a pull request, merging, deployment and branch deletion.

## Specification check, before code

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

## Decisions for the reviewer

1. **A Mission's image on Ready and Active** — a proposal only. It would need a Visual & Ergonomic amendment and revalidation before any work, and it is not approved.
2. **The remaining imagery** — a proposal only: either further reviewed stills, considered in the groups above, or a decision that the authored scenes are the presentation. Neither is approved, and both depend on review of the actual design and of the applicable content rules.
3. **Carried from Plan 05, still open:** translation review of the introduction copy; Mission instruction length; a way to leave settings without saving; the two still observations for the content reviewer.
4. **The `helping-11` still** — whether its cup reads clearly enough as unbreakable, recorded under *Bounded image integration* for the content reviewer; and whether the still should also appear in Discovery, which the peer rule and `F001`'s example rule make a decision of its own rather than a consequence of this integration.

## Definition of complete

Every improvement in the scope above implemented, the verification actually run and recorded here and in the changelog with its limitations, the diff limited to this scope, and screenshots from the actual builds delivered. Human visual acceptance, if given, is recorded separately, and **this plan stays active until the reviewer's visual judgement is recorded**, as Plan 05 did. This plan claims nothing about the imagery beyond the shared frame and grade it implemented; extending it is a proposal pending review. No claim of full design completion is made while the gaps it names remain.
