# MissionKid Visual & Ergonomic Specification

## Status and authority

**Status:** Approved — specification complete

This document defines how approved MissionKid MVP v1 behavior is presented clearly, safely, responsively, and consistently. It owns visual hierarchy and ergonomic presentation only. It does not change product behavior, create a new Function ID, define runtime architecture, alter Mission eligibility, or authorize implementation.

The normalized Function mapping remains:

| Function ID | Behavior source |
| --- | --- |
| `F001` | [Parent Setup and Localization](functions/001-parent-setup-and-localization.md) |
| `F002` | [Mission Discovery and Selection](functions/002-mission-discovery-and-selection.md) |
| `F003` | [Mission Session and Completion](functions/003-mission-session-and-completion.md) |
| `F004` | [Rewards, History, and Monthly Goal](functions/004-rewards-history-and-monthly-goal.md) |

This is a cross-cutting presentation specification and does not receive a Function ID. When this document describes a view, action, state, confirmation, or recovery surface, the relevant Function Specification and the [Technical Architecture](technical/technical-architecture.md) remain authoritative for whether that behavior exists and what it does.

## Purpose

MissionKid should feel polished because it is easy to understand and act on, not because it captures attention. Presentation must:

- help a parent understand context, control, and consequences quickly;
- help a child understand the Mission and the next action quickly;
- support the transition from screen use to a real-world activity;
- make the intended primary action obvious while keeping required safe exits available;
- minimize unnecessary reading, decisions, and interaction;
- remain clear on a small phone and adapt without changing hierarchy on wider screens;
- remain usable in English, German, and Russian;
- make required adult involvement and essential safety guidance noticeable;
- distinguish parent-oriented utility from child-oriented Mission presentation;
- include accessibility in the baseline rather than treating it as later polish; and
- avoid manipulative, competitive, or overstimulating presentation.

This is not a pixel-perfect design document.

## Core ergonomic rule

Every approved MVP view or state that is implemented must make these answers obvious before it is considered polished:

1. Where am I?
2. What is most important here?
3. What is the primary action?
4. What happens next?
5. Is there important safety or adult context?
6. Does this remain clear on a small phone?
7. Can anything unnecessary be removed?

The interface should feel simple before it feels impressive.

Normally, one view has one visually dominant primary action. A bounded set of peer choices is an intentional exception: the five Mission Categories are equal choices, and the three Mission suggestions are equal choices. In those views, the choice group is dominant and no individual option is visually promoted over another.

## Screen-to-real-life principle

The presentation supports one short journey:

```text
screen
→ choose Mission
→ understand Mission
→ start Mission
→ leave the screen
→ perform real-world activity
→ return briefly
→ complete
→ receive recognition and progress
```

The interface must make it easy to stop using MissionKid. It must not add content or feedback whose purpose is to keep the child looking at the screen before, during, or immediately after a Mission.

## Presentation tones

### Parent-oriented presentation

Parent-oriented presentation applies to setup, language and age context, History review, Monthly Goal consequences, storage/recovery information, reset, and parent-owned reward context. It should feel:

- calm and restrained;
- trustworthy and explicit about consequences;
- control-oriented without becoming administrative;
- readable at a glance, with denser supporting information only where it helps a decision; and
- clearly separate from child entertainment patterns.

Control and recovery surfaces must not become unnecessarily childish. Parent-facing wording may explain loss, persistence, or reset consequences more directly, but it must remain understandable and avoid implementation jargon when that jargon does not help the decision.

### Child-oriented presentation

Child-oriented presentation applies most strongly to Mission choice, ready, active, completion, and Reward Card experiences. It should feel:

- warm, encouraging, and age-appropriate;
- simple to scan;
- playful only where playfulness improves comprehension;
- focused on one real-world action; and
- calm enough to leave without feeling that more interaction is expected.

It must not resemble a short-video feed, casino game, competitive lobby, social network, prize marketplace, or achievement economy.

### Shared family presentation

Some approved views can be used by either a parent or child. Shared views should use child-readable structure with parent-readable context. Safety and consequences must never be hidden to preserve a playful tone, and parent controls must not visually compete with the child's current Mission action.

## Mobile-first and responsive presentation

MissionKid MVP is a responsive web application designed mobile-first. Presentation must:

- use a clear single-column reading order on narrow screens;
- avoid horizontal scrolling for primary content and actions;
- keep the primary action easy to identify and reach without obscuring safety content;
- keep required secondary and safe-exit actions available without giving them equal visual weight;
- use touch targets suitable for comfortable mobile interaction;
- avoid hover-dependent or fine-pointer-dependent critical behavior;
- keep confirmations, recovery surfaces, and controls usable at narrow widths;
- allow cards, headings, instructions, buttons, and notices to grow or wrap;
- avoid truncating critical instructions, consequences, adult-involvement text, or safety guidance with ellipsis;
- remain usable with larger text; and
- preserve the same content order and action hierarchy when additional desktop space is available.

No arbitrary device breakpoint is defined here. Wider layouts may place peer choices beside one another only when equal prominence, readable order, localization resilience, and safety visibility remain intact.

## Approved MVP view and state inventory

The inventory below describes presentation responsibilities only. It does not create URL pages; Technical Architecture keeps these as views in the root-only SPA.

| Approved view or state | Dominant information | Primary action or interaction | Secondary information or actions | Safety or adult context | Must not compete visually |
| --- | --- | --- | --- | --- | --- |
| Initial setup (`F001`) | Supported language and one required age band | Complete the approved setup and continue | English default, brief explanation of age context | Parent responsibility and privacy-minimal setup | Accounts, identity fields, tutorial slides, permissions, personalization |
| Approved language/age context changes (`F001`) | Current value and effect of the proposed change | Confirm the approved change | Consequences for future discovery; unchanged existing sessions/progress | Parent judgment remains authoritative | New profile management or unrelated settings |
| Mission Category Selection (`F002`) | The five canonical Mission Categories as one peer choice group | Select one category | Current approved context where useful | No category implies greater safety, value, or achievement | Rankings, trends, premium treatment, one favored category |
| Incomplete-setup discovery gate (`F001`/ `F002`) | The required age context is missing or invalid | Return to the approved age-context step | Preserve any other valid setup choice; English remains the fallback | Parent-guided setup remains private | Mission suggestions, inferred age, or a false continuation |
| Initial discovery loading (`F002`) | The selected context and calm loading status | No invented action while a valid request is pending | Safe return or retry only when the owning behavior provides it | No partial or unreviewed content | Fake progress, auto-loading feed, placeholder Missions presented as real |
| Exactly-three suggestions (`F002`) | Three equally prominent, comparable Mission options | Select one of the current three Missions | Bounded `Another set` when available; context needed to compare | Required adult involvement and concise safety guidance on each relevant option | Popularity, ratings, swipe-feed behavior, a visually recommended winner |
| Selection transition / `selected` (`F002`/ `F003`) | The chosen Mission remains identifiable while the transition resolves | No additional family decision | Calm pending or retry feedback if needed | Preserve the chosen Mission and its safety meaning | A second start action, duplicate selection, unrelated navigation |
| Ready Mission (`F003`) | Mission title, action, Mission Category, what is needed, approximate duration, and away-from-screen expectation | **Start mission** | Return to the current suggestions without starting | Full applicable adult-involvement and safety guidance | Timer movement, recommendations, reward content, extra setup |
| Mission Break transition and active Mission (`F003`) | Leave-the-screen instruction and the current Mission reminder | **Mission done** when the family returns | Calm approximate timer guidance; explicit leave-without-completion path | Applicable adult-involvement and safety guidance remains readable | Mini-games, recommendations, achievements, scores, repeated prompts |
| Existing-active-session conflict (`F003`) | The current active Mission and the need to resolve it first | Return to the active Mission | Explicitly confirmed abandonment before another Mission can be selected | Preserve the current Mission and its consequences | A second Mission Session or hidden abandonment |
| Restored ready, active, or completed result (`F003`/ `F004`) | The same truthful Mission state or completed result | The same action available for that restored state | Calm recovery context only where needed | Preserve applicable safety and recorded completion truth | Restarted timer, duplicate completion, or newly earned recognition |
| Completion pending (`F003`) | Completion is being confirmed, not yet claimed | Retry only if the approved operation is unconfirmed | Preserve the active Mission context | No fabricated success or progress | Reward Card, celebratory feedback, or goal increase before confirmation |
| Reward Card (`F003`/ `F004`) | Brief positive recognition of the completed Mission | A short approved next step back to the core flow or away from the screen | Mission/category identity, completion context, Monthly Goal progress | Parent-controlled reward meaning at goal completion | Random reveal, currency, prize value, pressure to start another Mission |
| Mission History (`F004`) | Newest-first completed Mission records | Review the private record | Minimal title, category, and localized completion context | Parent-oriented private context | Social-feed styling, analytics dashboard, likes, sharing, rankings |
| Empty Mission History (`F004`) | Completed Missions will appear here | Approved route back to Mission Category Selection | No fabricated examples | Calm parent/family context | Empty-state gamification or pressure |
| Monthly Goal (`F004`) | Current progress as `X / 20 missions` | No new action is invented by this specification | Current-period context and one approved goal-complete message | Any real-life reward is optional and parent-controlled | Countdown pressure, streaks, overachievement score, reward marketplace |
| Confirmation (`F003` or Technical recovery) | The action and its meaningful consequence | The safe continuation choice or the explicitly requested destructive action, according to the owning specification | A clear alternative | Parent-facing consequence where appropriate | Guilt, fear, hidden exit, ambiguous labels |
| Error or recovery state | What could not be completed and the safe next step | Approved retry, return, or confirmed reset | Consequence detail appropriate to parent or child | No child blame; safety and data truth preserved | Raw exceptions, internal identifiers, fabricated progress or Missions |

The `selected` state does not require a new destination screen, and Mission Break is not a separate activity or lifecycle state. The lifecycle remains exactly `selected → ready → active → completed`.

## F001 — Setup and localization presentation

Initial setup must feel short and parent-guided.

- Language and age-band context are the only setup choices.
- English appears as the approved default; German and Russian remain equally understandable choices.
- The three age bands are exactly `4–6`, `7–8`, and `9–10`.
- The age-band explanation should say that it helps present suitable Missions without suggesting a diagnosis, assessment, exact ability, or replacement for parental judgment.
- A missing or invalid age band must be clearly identified before discovery; the presentation must not appear to continue successfully.
- The continuation action should be visually dominant after the required context is understandable.
- Later language or age changes must communicate their approved effect without implying that existing Mission Sessions, History, or Monthly Goal progress will be rewritten.

Setup must not present account creation, child name, birth date, child photo, profile personalization, questionnaires, onboarding carousels, unnecessary tutorials, or permission requests.

## F002 — Mission Category Selection presentation

The five and only five Mission Categories are:

- Movement
- Creativity
- Helping at Home
- Learning
- Calm

They form one bounded peer-choice group.

- Labels are authoritative and must remain visible even when icons or illustrations are used.
- Meaning must not depend on color, icon recognition, or placement.
- No category may appear premium, recommended, trending, harder, more mature, or more valuable.
- Longer German and Russian labels must wrap or expand without clipping or changing relative importance.
- Selection state must be distinguishable without color alone.
- The group must remain easy to scan and operate on a narrow screen.

This specification adds no category and changes no category behavior.

When Mission Category, age context, or language changes, presentation must not leave stale suggestions looking eligible for the new context. The currently displayed set is discarded or reevaluated and replaced exactly as `F002` requires; this document does not define the filtering or replacement mechanics.

## F002 — Exactly-three Mission suggestions

The three suggestions are a deliberate bounded choice, not a content feed.

Each option must make the approved comparison information easy to scan:

- localized Mission title;
- localized short instruction;
- Mission Category;
- approximate expected duration;
- required adult-involvement wording when applicable; and
- concise essential safety guidance when applicable.

All three options must receive equal visual weight. A stable reading order may be used, but order must not look like rank or recommendation. Information should follow the same hierarchy across all three so the family can compare without dense scanning.

`Another set`, when available under `F002`, remains visually secondary to choosing one of the current Missions. It must not resemble refresh gambling, autoplay, swiping, or endless discovery. When another complete set is unavailable, the current three choices remain visually usable; absence of another set is a bounded state, not child failure.

During a replacement request, the current valid set remains the meaningful content. Loading presentation must not partially replace it, fabricate a fourth option, or imply an infinite supply.

## F003 — Ready Mission presentation

The ready presentation must answer, without extra navigation:

- What is the Mission?
- What will the child or family do?
- Which Mission Category does it belong to?
- What is needed?
- Approximately how long may it take?
- Must an adult be nearby or participate?
- Is there essential safety guidance?
- Has the Mission started?

The Mission title and short instruction establish the reading hierarchy. Mission Category, required adult involvement, and applicable safety guidance must appear before the family commits to starting and must not be hidden behind optional disclosure.

**Start mission** is the single visually dominant action. Returning to suggestions remains available but less prominent. Entering ready does not start the timer, and the presentation must not suggest otherwise through animation, countdown styling, or automatic progression.

No recommendation, reward preview, extra tutorial, or unnecessary intermediate choice belongs between ready and the approved start action.

## F003 — Mission Break transition and active presentation

Mission Break is the brief transition from passive screen use to the selected real-life Mission. It is part of the approved ready-to-active experience, not another lifecycle state, activity, or reward.

The transition and active presentation should prioritize:

1. a short instruction to leave the screen and do the Mission;
2. the Mission identity and action reminder;
3. any applicable adult-involvement and safety guidance;
4. calm approximate time guidance; and
5. **Mission done** for the family's brief return.

The timer is supporting information, not a score, deadline, proof, or visual centerpiece that demands watching. It must not use urgent color shifts, stressful motion, alarms, overtime counting, penalties, or failure styling. At zero, neutral guidance replaces any sense of countdown urgency while the session remains active and completion remains available.

The active presentation must work when ignored. It must not require interaction during the Mission or add recommendations, mini-games, achievements, points, live scores, unrelated navigation, animated distractions, or repeated return prompts.

The approved leave-without-completion path remains discoverable but visually secondary. Ordinary page hiding, closing, or leaving is not presented as confirmed abandonment.

## F003/F004 — Restored and conflicting-session presentation

Restoration must show the same truthful state rather than presenting a fresh start:

- restored `ready` shows the same Mission as ready, with no running timer;
- restored `active` shows the same Mission and recovered approximate guidance without visually resetting to the full duration;
- restored `completed` shows the same completed result or Reward Card without suggesting another completion or progress increment; and
- repeated start input returns the same active Mission presentation without a second session, countdown, or start effect.

If another Mission is requested while one is active, presentation must identify the current Mission and provide the approved choice to return to it or explicitly confirm abandonment. A new selection must not appear available until that approved conflict is resolved.

## F003 — Confirmed abandonment and completion presentation

Leaving an active Mission through MissionKid uses the confirmation already required by `F003`.

- The consequence—that the Mission will not count—must be explicit.
- The safe continuation choice, such as the approved **Keep going**, must be easy to identify.
- The destructive choice, such as the approved **Leave mission**, must be explicit and visually separated.
- Neither choice may use guilt, shame, urgency, or a hidden exit.

Completion feedback must wait until completion is confirmed. A pending or failed write must retain an understandable active-session context, explain that completion has not been recorded, and offer the approved safe retry. It must not show recognition, History, or increased progress early.

## F003/F004 — Reward Card presentation

The Reward Card is short recognition of a valid completed Mission.

It must present:

- positive, non-comparative acknowledgement;
- the completed Mission title;
- Mission Category;
- localized completion context; and
- current Monthly Goal progress.

Recognition should be warm but brief. It must not use concealed or random reveals, rarity, collectible economies, currency, purchasing, prize guarantees, public comparison, or escalating animation.

The Reward Card must not pressure the family to begin another Mission. It must provide the approved short next step back to the core flow or away from the screen, and preserving completion must not depend on further interaction.

## F004 — Mission History presentation

Mission History is a calm, private record.

- Completed entries use a stable, newest-first reading order.
- Each entry gives only the approved minimal information: Mission title, Mission Category, and localized completion context.
- Entries should be scannable without resembling social posts or a behavioral analytics dashboard.
- Missing catalog title recovery may use the approved calm localized unavailable-title presentation without changing the completed record.
- Language changes may change labels and localized dates, but visual order and completion meaning remain stable.

The empty state should state simply that completed Missions will appear there and provide the approved route to Mission Category Selection. It must not fabricate sample completions, create social proof, or pressure the family to fill the view.

## F004 — Monthly Goal presentation

The fixed target is `20 completed Missions` in the current local monthly period.

- Progress is communicated plainly as `X / 20 missions`.
- Visual progress must remain understandable without color or animation.
- Below target, wording and styling remain neutral and encouraging; there is no shame, deadline, countdown, or streak-loss state.
- At and after the twentieth valid completion, the display remains `20 / 20 missions`; later completions create no overachievement score or new goal-complete prompt.
- A refresh may restore the same completed result and deterministic prompt identity without presenting it as a new achievement.
- A new local calendar month presents `0 / 20 missions` while prior completed Missions remain available in History.
- The one approved goal-complete message may be positive but must clearly keep any real-life reward optional, parent-controlled, and parent-approved.

This presentation does not add a reward picker, prize entitlement, purchase path, marketplace, fulfillment flow, or verification step.

## Action hierarchy

Action treatment should be consistent across the MVP:

- one visually dominant primary action when the next action is singular and known;
- a clearly bounded, equally weighted choice group where approved peer options exist;
- limited secondary actions with lower prominence;
- safe exit available without becoming the happy-path action;
- destructive and reset actions separated from routine actions;
- disabled or unavailable behavior explained by understandable context rather than appearing broken; and
- no action hierarchy based only on color.

Multiple equally dominant buttons must not be used merely to avoid making a decision about hierarchy. Conversely, hierarchy must not hide a required recovery, cancellation, or safe-exit option.

## Confirmations

Confirmations are reserved for consequences already justified by approved behavior or meaningful state protection, including active Mission abandonment and destructive reset.

Every confirmation must:

- identify the action;
- state the meaningful consequence;
- distinguish the safe alternative from the destructive choice;
- preserve keyboard, touch, and visible-focus usability;
- remain readable on a narrow screen and with larger text; and
- avoid guilt, fear, urgency, or manipulative defaults.

Routine harmless navigation must not gain confirmation dialogs solely to make the interface seem more formal. An approved change such as language or age context may use a clear apply/confirm action without requiring a modal dialog.

## Safety and adult-involvement presentation

[Mission Catalog and Safety](mission-catalog-and-safety.md) owns eligibility, content, and the meaning of adult involvement. This document owns prominence and readability.

- Required adult involvement must use explicit localized wording; an icon or color may reinforce but never replace it.
- **Adult nearby required** and **Adult participation required** must remain distinguishable in words.
- **No special adult assistance required** must not be presented as a guarantee that no parental judgment or ordinary supervision is needed.
- Relevant Mission suggestions show a concise requirement before selection.
- Ready presentation shows the applicable requirement and safety guidance before start.
- Active presentation retains the applicable adult-involvement and safety guidance for the current Mission.
- Safety content remains close enough to the Mission action to be understood as part of that action.
- Important guidance must not be buried in dense utility text, hidden behind decoration, or truncated on small screens.

This specification adds no parent approval flow, supervision verification, permission system, or new adult-involvement level.

## Localization resilience

The supported languages remain English, German, and Russian, with English as the default.

- Layout must not assume equal string length.
- Controls and buttons may grow or wrap rather than clip meaning.
- Fixed-height text containers must not hide localized content or larger text.
- Mission cards must remain comparable when one translation is longer.
- Headings and instructions may wrap while preserving their hierarchy.
- Critical safety, adult-involvement, error, and consequence text must never be ellipsized.
- Cyrillic must render with the same legibility and hierarchy as Latin text.
- Document and content language identification must match the selected supported language where applicable.
- A language change must not rearrange the product flow or create a language-specific screen.
- Interface fallback and Mission-content completeness continue to follow `F001` and the Technical Specifications; presentation must never silently combine Mission languages.

Literal translation is not required. Mission Catalog and Safety owns meaning equivalence; this document owns layout resilience.

## Typography principles

No final font family is selected here.

- Use a readable hierarchy that makes location, Mission instruction, safety context, and action labels easy to distinguish.
- Child-facing Mission instructions require strong legibility and comfortable reading density.
- Decorative lettering must not carry important instructions, safety, errors, or consequences.
- Excessive all-caps must not be used for emphasis or urgency.
- Parent utility text may be denser than child Mission text but must remain readable.
- Latin and Cyrillic characters, punctuation, and numerals must render clearly.
- Text resizing must preserve content order, action visibility, and hierarchy.

## Color principles

No final palette or exact color token is selected here.

- Text, controls, focus, notices, and essential boundaries require adequate contrast.
- No status, category, action, safety meaning, or error may depend on color alone.
- Category color may reinforce a visible label but cannot replace it.
- Destructive actions must be distinguishable without panic, danger theater, or accidental prominence.
- Child-oriented views may be more expressive than parent-oriented utility views while remaining calm.
- Neon, casino-like, high-pressure, scarcity, and urgent countdown presentation are prohibited.

## Icons and imagery

Icons and illustrations may support comprehension but remain secondary to text.

- Labels remain authoritative.
- Decoration must not obscure Mission instructions, actions, progress, adult requirements, or safety guidance.
- Imagery must avoid stereotypes involving gender, culture, race, ability, housing, resources, or family structure.
- Unsafe behavior must not be made attractive or aspirational.
- Decorative content must not compete with the primary action or create a false content feed.
- No visual pattern may invite or require child photo or video upload.

## Motion and feedback

Motion is limited to an understandable state change, lightweight focus guidance, or brief positive completion feedback.

- No essential meaning depends on animation.
- Reduced-motion preferences must be respected.
- Flashing, endless loops, urgency pulses, repeated reward animation, autoplay attention capture, and stressful timer motion are prohibited.
- Completion feedback remains brief and non-random.
- Loading feedback remains calm and must not imply fake progress.
- Timer updates must not create escalating visual pressure.

## Accessibility baseline

The ergonomic baseline applies before implementation polish:

- semantic structure and controls communicate purpose;
- instructions and controls have understandable labels;
- keyboard order follows the visible reading and action order;
- visible focus is clear and not obscured;
- touch targets are suitable for mobile use;
- text and interactive states have adequate contrast;
- no critical behavior depends only on hover, color, sound, motion, or fine pointer precision;
- state changes and errors move focus or provide an appropriate announcement without repetitive interruption;
- timer presentation does not cause a screen reader to announce every tick;
- motion respects reduced-motion preferences; and
- larger text and text expansion preserve primary actions and safety guidance.

This document does not prescribe framework-specific accessibility implementation.

## Loading, empty, unavailable, error, and recovery presentation

Technical Specifications own recovery mechanics. Presentation follows the approved outcome:

| Existing state | Ergonomic treatment | Safe next action | Must not imply |
| --- | --- | --- | --- |
| First discovery request loading | Preserve selected context; use calm, minimal status feedback | Wait, or an approved safe return if available | A partial set, generated Mission, or guaranteed timing |
| Replacement set loading | Keep the current three valid choices understandable | Continue using the current set or approved retry after failure | That the current set disappeared or a feed is loading |
| Fewer than three eligible Missions | Show one controlled unavailable surface, not partial cards | Retry or return to Mission Category Selection | Relaxed eligibility, unsafe filler, or child fault |
| No further complete set | Keep the current three usable; explain bounded availability unobtrusively | Choose a current Mission | Failure, scarcity pressure, or infinite cycling |
| Selection/start transition failure | Keep or restore the last truthful state | Retry or choose/return as approved | That a new session or timer started |
| Mission details unavailable before start | Do not present the Mission as startable | Retry or return to suggestions | Guessed content or weakened safety |
| Valid active Mission Session with a temporarily unavailable timer display or valid remaining guidance time resolved to zero | Keep Mission instruction and approximate-duration context when possible | Complete or deliberately abandon as approved | Failure, overtime, or required extra waiting |
| Completion unconfirmed | Keep the recoverable active-session context | Exactly-once-safe retry | Reward, History, or progress already recorded |
| Reward Card unavailable after confirmed completion | State that completion remains recorded | Retry the same recognition | A second completion or lost progress |
| Temporary in-memory mode | Use a clearly parent-oriented warning that refresh/close may lose setup, session, History, and progress | Retry durable storage where approved | Durable saving, cloud fallback, or merged temporary History |
| Unsupported or corrupted saved state | Use calm parent-facing explanation and preserve truth | Retry supported recovery or explicitly confirmed reset | Automatic repair, silent deletion, or fabricated progress |
| Explicit reset | State that local settings, Child Profile context, unfinished Mission, History source, and Monthly Goal source will be removed and cannot be recovered by MissionKid | Confirm reset or cancel safely | Automatic reset, cloud backup, or partial preservation |
| Missing or safety-withdrawn unfinished Mission | Explain that the current Mission cannot safely continue | Retry recovery or explicitly return without completion | A substituted Mission or completion |
| Invalid completed-result pointer | Do not fabricate a Reward Card | Offer approved History or Mission Category path | That completed sessions were deleted |
| History or Monthly Goal unavailable | Preserve the recorded completion and use calm retry presentation | Retry the derived view | Speculative increment or claimed data loss |
| Empty History | Explain that completed Missions will appear here | Return to Mission Category Selection | Sample records or engagement pressure |

Child-facing errors use plain, calm, action-oriented language and never expose storage terminology, snapshot versions, stack traces, raw exceptions, serialized data, or internal identifiers. Parent-facing recovery may explain meaningful consequences, especially temporary storage and reset, but technical detail is included only when it helps a safe choice.

Technical failure must never look like child failure.

## Visual consistency without a design system

The MVP should use a small coherent family of presentation patterns for:

- primary and secondary action hierarchy;
- bounded category and Mission choices;
- headings and location context;
- safety and adult-involvement notices;
- calm progress;
- confirmations;
- loading and unavailable states; and
- error and recovery surfaces.

Consistency means the same kind of information has recognizable hierarchy and consequence across views. It does not authorize a component library, token catalog, illustration system, or full design system.

## Anti-manipulation visual rules

The following patterns are prohibited:

- infinite or continuously loading feeds;
- autoplay recommendations;
- swipe-feed discovery;
- fake scarcity or expiring choices;
- streak-loss warnings;
- social-proof pressure;
- public child comparison;
- popularity, likes, ratings, or trending labels;
- random reward reveals or loot-box presentation;
- urgent or punitive countdown styling;
- deliberately difficult exit;
- excessive or repeated notifications;
- repeated completion/reward loops;
- pressure to choose “one more Mission”;
- prize-marketplace or game-economy presentation; and
- animation whose purpose is attention capture rather than comprehension.

MissionKid should make it easy to stop using MissionKid.

## Ergonomic review method

For every approved MVP view or state that is implemented, reviewers ask the following before it is considered polished:

1. Can the user tell where they are?
2. Is the primary action or approved peer-choice group obvious?
3. Is the next step and overall flow clear?
4. Is important safety or adult context noticeable?
5. Does it work on a small phone?
6. Do English, German, and Russian remain understandable?
7. Is anything unnecessary competing for attention?
8. Does a child-facing Mission view encourage real-world action instead of more screen interaction?
9. Does the parent-facing view feel controlled and trustworthy?
10. Does any pattern create pressure, manipulation, or unnecessary engagement?

After a review, prefer one to three targeted improvements. The checklist is not permission for a broad redesign or behavior change.

## Source-of-truth boundaries

- Business Context owns the real problem and business framing.
- Global Product Specification owns product purpose and MVP boundaries.
- Functional Map owns the capability map.
- Roadmap owns phased scope; v1.1 and v2+ items remain future unless separately specified and authorized.
- `F001`–`F004` own detailed functional interaction behavior.
- Technical Specifications own architecture, persistence, application state, technical recovery, timer mechanics, localization mechanics, and implementation boundaries.
- Mission Catalog and Safety owns Mission eligibility, content writing, age suitability, adult-involvement definitions, localization equivalence, and content safety.
- This Visual & Ergonomic Specification owns visual hierarchy, ergonomic clarity, responsive presentation, accessibility presentation, visual safety prominence, parent/child presentation tone, and UI localization resilience.
- Later implementation plans own concrete implementation work.

If presentation would require new behavior, a new state, a new data fact, a changed recovery outcome, changed Mission eligibility, or a new product feature, the owning specification and active plan must be updated before implementation. This document must not be used to bypass those sources.

## Acceptance criteria

1. Every approved MVP view or state that is implemented makes location, dominant information, primary action or peer-choice group, and next step understandable before it is considered polished.
2. Narrow mobile presentation uses a clear reading order without horizontal scrolling, hidden safety information, hover-only critical behavior, or truncated critical text.
3. English, German, and Russian presentation uses the selected language identification where applicable and tolerates text expansion, wrapping, Cyrillic, and larger text without changing product flow or hiding primary actions.
4. Parent-oriented views feel calm, trustworthy, restrained, and explicit about control and consequences.
5. Child-oriented Mission views feel warm, simple, encouraging, and easy to leave without becoming overstimulating or manipulative.
6. The five Mission Categories remain equally presented, label-led, and free from ranking, premium, trending, or color-only meaning.
7. Discovery presents exactly three equally weighted Mission options and keeps `Another set` secondary and bounded.
8. Ready presentation makes Mission action, Mission Category, duration, required adult involvement, applicable safety guidance, away-from-screen expectation, and not-yet-started status clear, with **Start mission** dominant.
9. Mission Break remains a brief transition, and active presentation is intentionally low-interaction, passive when left alone, non-punitive at zero, and free from recommendations or entertainment.
10. Required adult involvement and applicable safety guidance are explicit, localized, readable on small screens, and never communicated only through color, icons, or hidden metadata.
11. Completion feedback appears only after confirmed completion and cannot fabricate Reward Card, History, or Monthly Goal progress.
12. Reward Card recognition is brief, non-comparative, non-random, non-monetary, and free from gambling or prize-marketplace presentation.
13. Mission History remains a minimal newest-first private record, including a simple truthful empty state, and never resembles a social feed or analytics dashboard.
14. Monthly Goal communicates `X / 20 missions` calmly, caps at `20 / 20 missions`, presents `0 / 20 missions` for a new month while retaining prior History, creates no shame or countdown pressure, and keeps real-life rewards optional and parent-controlled.
15. Confirmations are limited to approved consequential actions, state consequences clearly, preserve safe alternatives, and avoid guilt or hidden exits.
16. Error and recovery presentation preserves truthful state, provides an approved safe next action, avoids child blame and raw technical details, and never fabricates Mission content or progress.
17. Critical controls and content support semantic clarity, keyboard use, visible focus, adequate contrast, comfortable touch, reduced motion, screen-reader-safe timer updates, and larger text.
18. No visual pattern introduces an infinite feed, autoplay, fake scarcity, streak pressure, social proof, public comparison, random reward, urgent countdown manipulation, or pressure to continue.
19. No presentation rule changes the `F001`–`F004` behavior, Technical Specification mechanics, or Mission Catalog and Safety eligibility rules.
20. An ergonomic review results in one to three targeted improvements rather than a generic redesign.

## Explicit non-goals

This specification does not define or authorize:

- an exact final palette or color tokens;
- an exact final font family or typography tokens;
- a logo or brand identity;
- an illustration library;
- a complete design system;
- detailed design tokens;
- a component-library choice;
- pixel-perfect mockups or wireframes;
- a marketing website;
- native-application design;
- social, chat, sharing, leaderboard, or public-profile UI;
- payment, purchase, subscription, prize, or reward-marketplace UI;
- child account or identifying-profile UI;
- a larger Parent Dashboard;
- admin, CMS, editorial, or moderation UI;
- actual Mission catalog entries;
- new product screens, lifecycle states, actions, or features;
- implementation tasks, product code, packages, runtime tooling, database work, or deployment configuration.
