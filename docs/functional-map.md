# MissionKid Functional Map

## Status

This document defines the approved MissionKid MVP v1 capability structure for families with children aged 4–10. Implementation status is owned by the repository plan system.

## End-to-end flow

1. Select a UI language.
2. Complete the parent-guided setup and select an age band for a child aged 4–10.
3. The parent or child completes Mission Category Selection.
4. Review three short, age-appropriate real-life mission suggestions.
5. Choose one Mission and continue to its `ready` start experience.
6. Deliberately start the Mission and its guidance timer.
7. Complete the activity away from the screen and mark the Mission as done.
8. View a Reward Card.
9. Save the completion in Mission History and apply it once to Monthly Goal progress, capped visually at `20 / 20`.
10. At 20 completed missions in the month, show one suggestion for an optional, parent-approved real-life reward.

## MVP function map

| Function | MVP behavior | Inputs | Result | MVP limits |
| --- | --- | --- | --- | --- |
| Language selection | Let the family use English, German, or Russian. English is the default. | Selected supported language | The planned interface and mission content use the selected language. | No other UI languages are in MVP v1. MissionKid remains globally positioned rather than country-specific. |
| Parent setup | Establish the minimal parent-guided context needed to begin. | Parent confirmation and setup choices | The family can continue to age band selection. | No account, authentication, payment, child account, or sensitive child data is required. |
| Age band selection | Let the parent select 4–6, 7–8, or 9–10 for a child in the MVP target. | One supported age band | The selected band becomes an input to mission suggestions. | Bands are inclusive. Use an age band, not a birth date. |
| Mission Category Selection | Let the parent or child choose from the five MVP Mission Categories: Movement, Creativity, Helping at Home, Learning, and Calm. | One selected Mission Category | The selected Mission Category becomes an input to mission suggestions. | No social, competitive, or public behavior. |
| Mission suggestions | Present exactly three short, real-life missions suitable for the selected age band and Mission Category. | Age band, Mission Category, and UI language | Three mission choices | MVP suggestions come from a controlled predefined catalog; there is no AI mission generation. Missions should move attention away from the screen. |
| Mission timer | Guide one chosen Mission Session through ready and active states with a simple timer. | Chosen Mission and its expected duration | A visible timer for the active Mission Session | No device blocking, background enforcement, location tracking, or proof collection. |
| Mission completion | Let the child mark the active mission as done after completing it in real life. | Active Mission Session and a deliberate done action | One completed Mission Session | Completion is self-reported and parent-guided. Do not request a photo, video, public post, or other evidence. |
| Reward Card | Show a positive Reward Card after completion. | Completed Mission Session | Recognition of the completed real-life Mission | No money, purchasable reward, payment, public sharing, or public ranking. |
| Mission History | Show completed Mission Sessions for the Child Profile. | Completed Mission Sessions | A private history view | Retain only the minimum mission and completion details. No media, social feed, public profile, or leaderboard. |
| Monthly Goal | Show completed missions against the 20-mission monthly target, such as `0 / 20`, `3 / 20`, or `20 / 20`. | Completed Mission Sessions for the Child Profile during the current monthly goal period | Each completion is applied once; displayed progress caps at `20 / 20`, where one prompt suggests an optional, parent-approved real-life reward | The goal is motivational, not competitive. It has no public ranking, payment, automatic material reward, or repeated goal-complete prompt. |
| Safety boundaries | Keep every MVP function parent-guided, privacy-conscious, and focused on safe real-world activity. | Mission content and all family interactions | A product flow that minimizes child data and avoids unsafe engagement patterns | No infinite feeds, manipulative engagement loops, pressure to remain in the app, likes, child accounts, public leaderboards, public child profiles, gambling or loot-box mechanics, paid competition, child photos or videos, unnecessary sensitive or identifying child data, chat, or social features. Authentication, payments, native mobile work, AI mission generation, device blocking, and secrets also remain out of scope. |

## Functional relationships

- Language selection affects all planned interface labels and mission content.
- The selected age band is the minimal Child Profile context used for mission selection and belongs to the family/parent context.
- Each predefined Mission belongs to one Mission Category and has age suitability; these determine the three eligible mission suggestions.
- Choosing a Mission creates one Mission Session in `selected`; it then follows `selected → ready → active → completed`, and only a deliberate start moves it from `ready` to `active`.
- Marking that Mission Session done creates a Reward Card recognizing the completed real-life Mission, adds the completion to the Child Profile's Mission History, and applies it once under Monthly Goal rules; displayed progress increases only while below `20 / 20`.
- Mission History is a private view of completed Mission Sessions, not a social feed. Monthly Goal aggregates the Child Profile's completed Mission Sessions for the current monthly goal period.

## Completion rules

- A mission is counted only after its active Mission Session is deliberately marked done.
- One completed session appears once in Mission History and is applied once to its monthly period; displayed progress increases only while below `20 / 20`.
- A Reward Card is shown only after completion.
- Reaching `20 / 20` shows one suggestion for an optional, parent-approved real-life reward; MissionKid does not grant or purchase that reward.

## Content and safety requirements

- Mission content must be short, understandable, age-appropriate, and feasible in a normal family setting.
- Missions must avoid dangerous physical actions and must not ask for personal information, precise location, contact with strangers, or media of a child.
- The flow should encourage leaving the screen rather than extending in-app engagement.
- Future real-life rewards remain parent-controlled and parent-approved.
- Any missing content, timer, age-band, retention, or localization detail must be specified before product implementation rather than guessed.

## Function Specification traceability

| Function ID | MVP capabilities | Function Specification |
| --- | --- | --- |
| `F001` | Language selection, parent setup, age band selection | [Parent Setup and Localization](specs/functions/001-parent-setup-and-localization.md) |
| `F002` | Mission Category Selection, mission suggestions, mission selection | [Mission Discovery and Selection](specs/functions/002-mission-discovery-and-selection.md) |
| `F003` | Mission Break, Mission Session lifecycle, timer, mission completion | [Mission Session and Completion](specs/functions/003-mission-session-and-completion.md) |
| `F004` | Reward Card, Mission History, Monthly Goal | [Rewards, History, and Monthly Goal](specs/functions/004-rewards-history-and-monthly-goal.md) |

Safety boundaries apply across all four Function Specifications (`F001`–`F004`).
