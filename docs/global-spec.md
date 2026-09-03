# MissionKid Global Product Specification

## Status

This document defines the MissionKid MVP v1 product behavior.

## Product purpose

MissionKid helps families with children aged 4–10 turn screen time into useful real-life missions. It gives a child a small set of age-appropriate activities, supports completion away from the screen, and records progress without making the product itself the destination.

MissionKid is a global, parent-guided family product. It is not country-specific and does not replace parental judgment or supervision.

## Core user flow

1. The parent selects the interface language and the child's age band.
2. The parent or child selects a Mission Category: Movement, Creativity, Helping at Home, Learning, or Calm.
3. MissionKid presents exactly three short, predefined real-life missions.
4. The child chooses one mission.
5. The child reviews the mission in its `ready` state and deliberately starts it; the guidance timer begins.
6. The child leaves the screen and completes the mission in real life.
7. The child marks the mission as done.
8. MissionKid shows a Reward Card.
9. The completed mission is added to Mission History.
10. The completion is applied once to Monthly Goal, whose display increases until `20 / 20`. At 20 completed missions, MissionKid shows one suggestion that the family choose an optional, parent-approved real-life reward.

## Language and global requirements

- Repository, specification, code, and commit language: English.
- MVP interface languages: English, German, and Russian.
- Default interface language: English.
- Content must be understandable across regions and avoid unnecessary country-specific references, cultural assumptions, purchases, and location-dependent requirements.
- All localized mission content must retain the same age suitability and safety meaning.

## Main entities

These entities and relationships are conceptual product definitions only; they do not define database tables or an implementation architecture.

### Child Profile

A Child Profile represents the minimal child context required for mission selection and belongs to the family/parent context. It is not a child account. In the MVP it contains one inclusive age band—4–6, 7–8, or 9–10—and must not require a child's name, exact birth date, contact information, precise location, photo, video, credentials, or other sensitive or identifying personal data.

### Mission

A predefined, short real-life activity from a controlled predefined mission catalog, intended to be completed away from the screen. Each Mission belongs to one Mission Category and has age suitability, a concise instruction, an expected duration for timer use, and any necessary safety guidance. The five MVP Mission Categories are Movement, Creativity, Helping at Home, Learning, and Calm.

### Mission Session

A Mission Session represents one selected Mission being performed. It references one Child Profile and one Mission, and follows the lifecycle `selected → ready → active → completed`. A session becomes eligible for history and goal progress only when the child marks it as done. The timer supports the activity but does not monitor the child or control the device.

### Reward Card

A brief, positive acknowledgement created after successful Mission Session completion. It recognizes the completed real-life mission, has no monetary value, involves no payment, and does not guarantee a real-life reward.

### Mission History

A private history view of completed Mission Sessions for the Child Profile. It is not a separate social feed, public profile, or leaderboard. Completion does not require photo or video evidence.

### Monthly Goal

The aggregation of completed Mission Sessions for the Child Profile during the current monthly goal period, against an MVP target of 20. It is displayed as progress such as `3 / 20 missions` and caps at `20 / 20 missions`. When the goal is reached, MissionKid shows one encouraging prompt for the family to choose an optional, parent-approved real-life reward. MissionKid does not deliver a real prize, initiate a purchase, or assign a reward automatically in the MVP.

## MVP features

- Interface language selection for English, German, and Russian, defaulting to English.
- Parent-guided setup without authentication.
- Child age-band selection using 4–6, 7–8, or 9–10 without sensitive data.
- Selection of one Mission Category—Movement, Creativity, Helping at Home, Learning, or Calm—by the parent or child.
- Three age-appropriate suggestions from a controlled predefined mission catalog per selection.
- Selection of one mission and a simple mission timer.
- Manual mission completion.
- A Reward Card after completion.
- Private Mission History containing completed missions.
- Monthly Goal progress toward 20 completed missions.
- One parent-directed suggestion for an optional, parent-approved real-life reward after 20 completions.
- Safety-conscious, globally suitable mission content.

## Out of scope for MVP v1

- Authentication and user login.
- Child accounts or child-facing identity profiles.
- Payments, purchases, subscriptions, or monetary rewards.
- Social features, chat, sharing, likes, public child profiles, and public leaderboards.
- Photos or videos of children, including completion-proof uploads.
- Infinite feeds, manipulative engagement loops, or pressure to remain inside the app.
- Gambling or loot-box mechanics and paid competition.
- Native mobile application development.
- AI mission generation.
- Device blocking, screen-time enforcement, surveillance, or background monitoring.
- Sensitive child-data collection, including exact birth dates, contact details, and precise location.

## Safety requirements

- A parent controls setup and judges whether a mission is appropriate for the child and current environment.
- Missions must be age-appropriate, short, understandable, inclusive, and feasible without dangerous physical actions, unsafe equipment, purchases, unsupervised travel, or interaction with strangers.
- The product should encourage the child to leave the screen to complete the mission and must not use infinite feeds, manipulative engagement loops, or pressure to remain inside the app.
- The experience must not contain likes, public leaderboards, public child profiles, gambling or loot-box mechanics, or paid competition.
- The experience must not request child photos or videos or collect unnecessary sensitive or identifying child data.
- Reward language must remain encouraging and must not pressure a parent to spend money. Any future real-life reward remains parent-controlled and parent-approved.
- History and progress must remain private; no competitive public comparison is allowed.
- Localization must not weaken or omit safety guidance.

## Product ergonomics

The interface must help users understand and act, not merely look attractive. Later screen specifications and reviews must make the user's location, primary action, next action, overall flow, and mobile behavior clear while removing unnecessary visual or interaction noise. Parent-facing interfaces should feel calm, trustworthy, clear, and control-oriented. Child-facing mission interfaces should feel simple, playful, encouraging, age-appropriate, not overstimulating, and not manipulative.

## MVP success criteria

The MVP specification is satisfied when:

- A family with a child aged 4–10 can complete the full flow from language and age-band selection through Mission Category selection, one of three mission choices, deliberate timer start, manual completion, Reward Card, History, and Monthly Goal progress.
- Completing a mission adds exactly one completion to History and applies that completion exactly once to its monthly period; displayed goal progress increases only while below `20 / 20`.
- Progress is visible against a target of 20, and reaching 20 produces one suggestion for an optional, parent-approved real-life reward.
- The complete interface is available in English, German, and Russian, with English used by default and safety meaning preserved across languages.
- The flow directs the child to a real-world activity and does not require ongoing in-app engagement or completion proof.
- No MVP behavior depends on authentication, payments, social interaction, child accounts, public rankings, child media, native apps, AI generation, device blocking, or sensitive child data.
- Mission content passes an age-suitability, global-clarity, and safety review before release.
