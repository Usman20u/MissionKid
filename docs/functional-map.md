# MissionKid Functional Map

## Status

This document defines the planned MissionKid MVP v1 functions for families with children aged 4–10. It is a functional specification only; no product or runtime implementation exists yet.

## End-to-end flow

1. Select a UI language.
2. Complete the parent-guided setup and select an age range for a child aged 4–10.
3. The parent or child completes Mission Category Selection.
4. Review three short, age-appropriate real-life mission suggestions.
5. Choose one mission and start its timer.
6. Complete the activity away from the screen and mark the mission as done.
7. View a Reward Card.
8. Save the completion in Mission History and update Monthly Goal progress.
9. At 20 completed missions in the month, suggest that the parent choose a real-life reward.

## MVP function map

| Function | MVP behavior | Inputs | Result | MVP limits |
| --- | --- | --- | --- | --- |
| Language selection | Let the family use English, German, or Russian. English is the default. | Selected supported language | The planned interface and mission content use the selected language. | No other UI languages are in MVP v1. MissionKid remains globally positioned rather than country-specific. |
| Parent setup | Establish the minimal parent-guided context needed to begin. | Parent confirmation and setup choices | The family can continue to age range selection. | No account, authentication, payment, child account, or sensitive child data is required. |
| Age range selection | Let the parent select a predefined age range for a child aged 4–10. | One supported age range | The selected range becomes an input to mission suggestions. | Use an age range, not a birth date. Exact selectable age bands must be defined later in the relevant feature specification. |
| Mission Category Selection | Let the parent or child choose from the five MVP Mission Categories: Movement, Creativity, Helping at Home, Learning, and Calm. | One selected Mission Category | The selected Mission Category becomes an input to mission suggestions. | No social, competitive, or public behavior. |
| Mission suggestions | Present exactly three short, real-life missions suitable for the selected age range and Mission Category. | Age range, Mission Category, and UI language | Three mission choices | MVP suggestions come from reviewed content; there is no AI mission generation. Missions should move attention away from the screen. |
| Mission timer | Start the timer after one mission is chosen and keep the active mission visible. | Chosen mission and its defined duration | A visible timer for the active Mission Session | No device blocking, background enforcement, location tracking, or proof collection. Timer details must be specified before implementation. |
| Mission completion | Let the child mark the active mission as done after completing it in real life. | Active Mission Session and a deliberate done action | One completed Mission Session | Completion is self-reported and parent-guided. Do not request a photo, video, public post, or other evidence. |
| Reward Card | Show a positive Reward Card after completion. | Completed Mission Session | Recognition of the completed real-life Mission | No money, purchasable reward, payment, public sharing, or public ranking. |
| Mission History | Show completed Mission Sessions for the Child Profile. | Completed Mission Sessions | A private history view | Retain only the minimum mission and completion details. No media, social feed, public profile, or leaderboard. |
| Monthly Goal | Show completed missions against the 20-mission monthly target, such as `0/20`, `3/20`, or `20/20`. | Completed Mission Sessions for the Child Profile during the current monthly goal period | Updated monthly progress; at `20/20`, a prompt for the parent to choose a real-life reward | The goal is motivational, not competitive. It has no public ranking, payment, or automatic material reward. |
| Safety boundaries | Keep every MVP function parent-guided, privacy-conscious, and focused on safe real-world activity. | Mission content and all family interactions | A product flow that minimizes child data and avoids unsafe engagement patterns | No infinite feeds, manipulative engagement loops, pressure to remain in the app, likes, child accounts, public leaderboards, public child profiles, gambling or loot-box mechanics, paid competition, child photos or videos, unnecessary sensitive or identifying child data, chat, or social features. Authentication, payments, native mobile work, AI mission generation, device blocking, and secrets also remain out of scope. |

## Functional relationships

- Language selection affects all planned interface labels and mission content.
- The selected age range is the minimal Child Profile context used for mission selection and belongs to the family/parent context.
- Each predefined Mission belongs to one Mission Category and has age suitability; these determine the three eligible mission suggestions.
- Choosing a Mission creates the active Mission Session, which references one Child Profile and one Mission and tracks its selected, started, and completed lifecycle.
- Marking that Mission Session done creates a Reward Card recognizing the completed real-life mission, adds the completion to the Child Profile's Mission History, and increments Monthly Goal progress once.
- Mission History is a private view of completed Mission Sessions, not a social feed. Monthly Goal aggregates the Child Profile's completed Mission Sessions for the current monthly goal period.

## Completion rules

- A mission is counted only after its active Mission Session is deliberately marked done.
- One completed session appears once in Mission History and creates one increment of monthly progress.
- A Reward Card is shown only after completion.
- Reaching `20/20` shows a suggestion for a parent-selected real-life reward; MissionKid does not grant or purchase that reward.

## Content and safety requirements

- Mission content must be short, understandable, age-appropriate, and feasible in a normal family setting.
- Missions must avoid dangerous physical actions and must not ask for personal information, precise location, contact with strangers, or media of a child.
- The flow should encourage leaving the screen rather than extending in-app engagement.
- Future real-life rewards remain parent-controlled and parent-approved.
- Any missing content, timer, age-range, retention, or localization detail must be specified before product implementation rather than guessed.
