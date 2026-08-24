# Mission Discovery and Selection Specification

## Status

Planned for MissionKid MVP v1; not implemented.

## Purpose

Mission discovery gives a family a small, understandable choice of safe real-life activities. Using the age context and one selected Mission Category, MissionKid presents exactly three suitable missions from a controlled predefined catalog. The flow should help the child choose quickly and leave the screen to complete the activity.

## Scope

This specification covers:

- Mission Category selection;
- eligibility of predefined catalog missions;
- presentation of exactly three mission suggestions;
- requesting a different complete set when appropriate;
- choosing one mission; and
- transition to a Mission Session.

The supported age bands are exactly:

- `4–6`
- `7–8`
- `9–10`

The five Mission Categories are exactly:

- Movement
- Creativity
- Helping at Home
- Learning
- Calm

## Preconditions and inputs

Discovery requires a completed parent-guided setup with:

- one supported age band; and
- one supported UI language: English, German, or Russian.

English is the default UI language. The selected age band is minimal Child Profile context, not a birth date or child account. If the setup is incomplete or contains no valid supported age band, MissionKid must not infer an age or present missions.

Before discovery begins, a missing, unsupported, or unreadable language choice resolves to English as defined by the parent setup and localization specification. Discovery therefore receives one supported UI language and does not block solely because an earlier language value was invalid.

The parent or child may select a Mission Category. The parent remains responsible for deciding whether a suggested mission is appropriate for the child and current environment.

## Controlled predefined mission catalog

All MVP suggestions come from a controlled, predefined mission catalog. Catalog content must pass human review for age suitability, safety, localization meaning, global clarity, and fit with its Mission Category before it is eligible for display. MVP discovery does not generate, rewrite, or expand missions with AI.

Each Mission conceptually includes:

- a stable identifier shared across its localizations;
- a localized title;
- a localized short instruction;
- exactly one Mission Category;
- one or more supported age bands for which the complete activity is suitable;
- an expected duration for later timer guidance; and
- basic safety metadata when relevant, such as required adult involvement, space or material conditions, and a short localized safety note.

These are product-level content requirements, not database columns, API fields, or an implementation schema.

For every supported age band, Mission Category, and UI language combination offered in MVP, the reviewed catalog must contain at least three eligible missions. A mission is eligible only when:

- its Mission Category exactly matches the selected Mission Category;
- it is approved for the entire selected age band;
- its title, instruction, and any required safety note are available in the selected UI language;
- its localized content retains the approved instruction and safety meaning; and
- its current reviewed safety metadata permits it to be offered.

MissionKid must never fill a set by relaxing the age band, changing the selected Mission Category, mixing UI languages, or using unreviewed content.

## Category selection behavior

- The family can choose one of the five Mission Categories.
- Selecting a Mission Category starts discovery for the current age band and UI language.
- Changing the Mission Category discards the displayed suggestion set and requests a new set for the newly selected category.
- If the age band or UI language changes, any displayed suggestions must be reevaluated and replaced with a complete eligible set for the new context.
- Category selection must not introduce ranking, popularity, social comparison, or public activity.

## Suggestion set behavior

- A successful discovery result contains exactly three distinct eligible Missions.
- The three Missions are presented as a bounded choice, not as an infinite or continuously scrolling feed.
- No mission is presented as more important because of popularity, payment, competition, or engagement optimization.
- Discovery must not automatically start a Mission Session or timer.

### Mission card content

Each Mission card must communicate:

- localized title;
- localized short instruction;
- Mission Category;
- expected duration; and
- a concise localized safety or adult-involvement note when the mission requires one.

The content should be short, understandable, age-appropriate, and usable on mobile. It must give the family enough information to judge the activity before choosing it without adding unnecessary visual or interaction noise.

## Requesting another set

The family may request another set when the current discovery cycle has at least three eligible missions that have not already been shown in that cycle.

- A successful request replaces the current set with exactly three distinct eligible missions.
- A mission already shown in the current discovery cycle must not appear again in a later set in that cycle.
- The current set remains available until a complete replacement set is ready.
- When fewer than three unseen eligible missions remain, another set is unavailable; MissionKid keeps the current three choices rather than showing a partial set or recycling suggestions indefinitely.
- Requesting another set is a deliberate, bounded action. MissionKid must not auto-load more missions or create an infinite feed.

A discovery cycle uses one age band, one UI language, and one Mission Category. It ends when a mission is chosen, any of those inputs changes, or the family leaves discovery.

## Choosing a mission and transition

- The family chooses one of the three displayed Missions with a deliberate action.
- A successful choice creates one Mission Session that references the current Child Profile context and the chosen Mission.
- The new Mission Session enters the `selected` state and transitions to the mission start/ready experience.
- Choosing a mission does not start the timer automatically. Starting the activity is a separate deliberate action defined by the Mission Session and completion specification.
- Repeated activation of the same choice during the transition must not create multiple Mission Sessions.
- Discovery itself does not mark a mission complete, create a Reward Card, add Mission History, or increment Monthly Goal progress.

## Content and safety rules

Every suggested mission must:

- be short and understandable for the selected age band;
- encourage a real-life activity away from the screen;
- avoid dangerous physical actions, unsafe equipment, unsupervised travel, purchases, and contact with strangers;
- avoid requiring a child name, exact birth date, contact details, precise location, photo, video, or other sensitive or identifying child data;
- avoid shame, pressure, streak-loss threats, manipulative engagement, gambling, loot-box mechanics, and paid competition; and
- remain culturally neutral enough for a global family product.

Mission instructions and safety notes must preserve the same meaning in English, German, and Russian. A mission that needs supervision or particular safe conditions must say so clearly before selection. MissionKid provides reviewed suggestions but does not replace parental judgment or supervision.

## Empty, unavailable, and error states

### Incomplete setup

If no valid age band is available, discovery explains that parent-guided setup must be completed and provides a route back to the age-context step. It shows no mission suggestions and does not infer an age. A missing, unsupported, or unreadable language value resolves to English before this check.

### No complete eligible set

If fewer than three eligible missions exist for the selected age band, Mission Category, and UI language, MissionKid shows no partial set. It explains that missions are currently unavailable and allows the family to retry or return to Mission Category selection. It does not substitute unsafe, unreviewed, incorrectly localized, or age-inappropriate content.

### No further complete set

If the current three choices are valid but fewer than three unseen eligible missions remain in the discovery cycle, the current set stays usable and another set is unavailable. This is a bounded-catalog state, not a failure.

### Catalog loading failure

If the first set cannot be loaded, MissionKid shows no selectable partial result, preserves the selected context, and offers a retry or return to Mission Category selection.

If a replacement set cannot be loaded, MissionKid retains the current three valid choices and offers a retry. A failed request must not clear or partially replace the current set.

### Selection transition failure

If a chosen mission cannot transition into a Mission Session, no timer starts and no completion is recorded. MissionKid keeps or restores the discovery choices and lets the family retry or choose another mission. Retrying must not produce duplicate Mission Sessions.

## Acceptance criteria

1. Given completed setup with age band `4–6`, `7–8`, or `9–10`, a supported UI language, and any one of the five Mission Categories, when discovery succeeds, exactly three distinct Missions are presented.
2. Every presented Mission matches the selected Mission Category, is approved for the entire selected age band, and has complete reviewed content in the selected UI language.
3. Mission Category selection offers only Movement, Creativity, Helping at Home, Learning, and Calm, with no alternative category labels.
4. Every presented mission choice includes a localized title, localized short instruction, Mission Category, expected duration, and any required localized safety or adult-involvement note.
5. No discovery result comes from AI generation or from content that has not passed catalog review.
6. Given at least three unseen eligible Missions in the current discovery cycle, when another set is requested successfully, the current set is replaced by exactly three distinct eligible Missions and none was previously shown in that cycle.
7. Given fewer than three unseen eligible Missions, another set is unavailable, the current set remains usable, and no partial or automatically recycling feed appears.
8. Given an incomplete setup, discovery presents no missions and directs the family to complete parent-guided setup without inferring age context.
9. Given fewer than three eligible catalog Missions for the active age band, Mission Category, and UI language, discovery presents no partial set and does not relax eligibility rules.
10. Given a replacement-loading error, the current three valid choices remain available and no partial replacement appears.
11. When one displayed Mission is chosen successfully, exactly one Mission Session is created in the `selected` state and the family reaches the mission start/ready experience without the timer starting automatically.
12. Repeated activation during a mission-selection transition does not create duplicate Mission Sessions.
13. Merely viewing, replacing, or choosing suggestions does not add Mission History, increment Monthly Goal progress, or create a Reward Card.
14. All displayed missions pass the documented age, safety, localization, and global-suitability rules and encourage completion away from the screen.
15. Discovery requests no child account, completion proof, child photo or video, or unnecessary sensitive or identifying child data and provides no chat, social, public, payment, competition, or device-blocking behavior.

## Explicit non-goals

This specification does not define database tables, storage technology, API contracts, selection algorithms, UI layouts, visual design, product code, or runtime architecture. It does not authorize AI mission generation, device blocking, authentication, payments, social features, public profiles, public leaderboards, child accounts, photos or videos, or real prize delivery.
