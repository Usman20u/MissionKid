# MissionKid Roadmap

## Roadmap status

MissionKid is currently in the planning and specification foundation stage. The phases below describe intended direction, not completed functionality or delivery commitments. No product or runtime implementation has been added.

## MVP v1 — complete core family flow

**Status: planned; not implemented.**

MVP v1 contains the complete core MissionKid flow:

- English, German, and Russian UI, with English as the default.
- Minimal parent setup without accounts or authentication.
- Age range selection for children aged 4–10 without birth dates or sensitive profile data. Exact selectable age bands will be defined later in the relevant feature specification.
- Mission Category Selection for Movement, Creativity, Helping at Home, Learning, and Calm.
- Three reviewed, age-appropriate, real-life mission suggestions per selection.
- One chosen mission, a Mission Session, and a mission timer.
- Self-reported mission completion without photo, video, or other proof.
- A positive Reward Card after completion.
- Private Mission History for completed missions.
- Monthly Goal progress toward 20 completed missions.
- A suggestion at `20/20` that the parent choose a real-life reward.
- Safety and privacy boundaries applied across the full flow.

MVP v1 is complete only when the documented flow works end to end in all three MVP languages, saves one completion consistently, updates monthly progress once, and respects the safety boundaries. These are acceptance targets, not claims about the current repository.

## v1.1 — refinement and limited parent overview

**Status: future; not implemented.**

This phase may refine and polish the existing MVP experience without expanding its core product model:

- Apply ergonomic review findings before visual polish.
- Improve accessibility, readability, responsive behavior, and clarity of the off-screen transition.
- Refine translations and localization quality across English, German, and Russian.
- Improve timer, completion, history, and monthly progress reliability.
- Refine reviewed mission content using family feedback and safety review.
- Improve empty, error, resume, and completed states.
- Make limited improvements to the parent overview of existing Mission History and Monthly Goal information without introducing a larger Parent Dashboard, child accounts, or sensitive data.

The v1.1 scope requires updated specifications and an active implementation plan before work begins.

## v2+ — possible future features

**Status: future concepts only; not implemented, approved, or committed.**

Potential v2+ exploration may include:

- **Season Rewards:** longer-term themed acknowledgement beyond the monthly goal.
- **Family Quests:** shared, parent-guided activities for a household.
- **Larger Parent Dashboard capabilities:** expanded private controls and progress summaries beyond the limited v1.1 parent overview.
- **School/classroom mode:** a separately specified experience with appropriate consent, privacy, and safeguarding requirements.
- **AI-assisted mission suggestions with parent approval:** optional suggestions that a parent must review and approve before a child can see or start them.

Each concept requires its own validation, safety review, privacy review, specification update, and active plan. All v2+ concepts are unimplemented; listing a concept here does not authorize implementation. AI mission generation is specifically outside MVP v1.

## Boundaries across phases

The current project does not include authentication, payments, social features, chat, child accounts, photos or videos of children, public leaderboards, native mobile app work, AI mission generation, device blocking, or secrets. A future roadmap item cannot silently introduce any of these capabilities; any boundary change would require an explicit specification and safety decision before implementation.

MissionKid remains a global family product. Future work must not make it country-specific, and any language expansion must preserve the English repository, code, specification, and commit language conventions.
