# MissionKid Plan 06 — whole-application visual design

**Date:** 2026-09-29
**Status:** Scope recorded before implementation at `f68470a`; implemented and verified at `53d6a8d`, recorded under *Outcome*. **Implementation is paused, from 2026-09-29, while the reviewer visually reviews Plan 06**; human visual acceptance is not given and not recorded, and the known visual gaps listed under *Outcome* remain, so this plan stays active. Further imagery is a proposal pending review, not an approved obligation — see *Review hold and clarifications*. **One bounded exception to the pause** is authorized on 2026-09-29: the `helping-11` image integration recorded under *Bounded image integration*, and nothing else — scope recorded at `cca58f0`, implemented and verified at `899ff79`. **On 2026-09-30 the reviewer authorized a complete visual redesign against a newly supplied reference**, recorded under *Reference redesign — 2026-09-30*. It ends the pause for that scope and carries this plan's first specification amendments, recorded at `6f56054`; it is **implemented and verified at `d8bad52`**. Human visual acceptance is not given and not recorded, so this plan stays active.
**Branch:** `feat/whole-application-visual-design`, taken from `9f53610`, the commit that closed Plan 05 on `feat/guided-entry-and-presentation`. That branch is preserved unchanged at its closure. The reference redesign continues on `feat/reference-visual-redesign`, taken from `2e81cec`, the head of `feat/whole-application-visual-design`, which is preserved unchanged. No history was rewritten.

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

## Decisions for the reviewer

1. **A Mission's image on Ready and Active** — *authorized on 2026-09-30* and amended into the Visual & Ergonomic Specification under *Reference redesign — 2026-09-30*; no longer open.
2. **The remaining imagery** — still open: either further reviewed stills, considered in the groups above, or a decision that the authored scenes are the presentation. The redesign gives the authored scenes one coherent treatment and does not decide this.
3. **Carried from Plan 05, still open:** translation review of the introduction copy; Mission instruction length; a way to leave settings without saving; the two still observations for the content reviewer.
4. **The `helping-11` still** — whether its cup reads clearly enough as unbreakable, recorded under *Bounded image integration* for the content reviewer; and whether the still should also appear in Discovery, which the peer rule and `F001`'s example rule make a decision of its own rather than a consequence of this integration.

## Definition of complete

Every improvement in the scope above implemented, the verification actually run and recorded here and in the changelog with its limitations, the diff limited to this scope, and screenshots from the actual builds delivered. *Amended on 2026-09-30:* the same holds for the scope of *Reference redesign — 2026-09-30*, whose outcome is recorded in its own section. Human visual acceptance, if given, is recorded separately, and **this plan stays active until the reviewer's visual judgement is recorded**, as Plan 05 did. This plan claims nothing about the imagery beyond the shared frame and grade it implemented; extending it is a proposal pending review. No claim of full design completion is made while the gaps it names remain.
