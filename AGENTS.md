# Repository Instructions

## Workflow

- Work specs-first. Read the relevant specifications and active plan before making changes.
- Detailed Function Specifications live in `docs/specs/functions/` and use stable `F001`–`F004` identifiers; Technical Specifications live in `docs/specs/technical/`. `docs/specs/mission-catalog-and-safety.md` remains the separate cross-cutting Mission content and safety specification.
- Do not write product code unless an active plan explicitly authorizes it. The current foundation plan does not authorize product code.
- Do not change architecture without first updating the relevant specifications and aligning the active plan.
- Do not make generic or unrelated redesigns. Every design change must address a documented product need.
- Report missing or conflicting context instead of guessing.

## Product foundation

- The MVP serves families with children aged 4–10. Use the inclusive age bands `4–6`, `7–8`, and `9–10` defined in the parent setup and localization specification.
- Use `Mission Category` as the canonical product term. The five MVP Mission Categories are exactly `Movement`, `Creativity`, `Helping at Home`, `Learning`, and `Calm`.
- Do not introduce alternative labels for `Mission Category`. `Monthly Goal` is a separate concept from `Mission Category`.

## Ergonomic working rule

The interface must help users understand and act, not merely look attractive. Before applying UI polish, complete a short ergonomic review of every later screen by asking:

1. Where am I?
2. What is the primary action?
3. What should I do next?
4. Is the flow obvious?
5. Does it work clearly on mobile?
6. Is there unnecessary visual or interaction noise?

AI and developer UI work must avoid generic redesigns, propose one to three small useful improvements, and preserve established product logic unless a specification explicitly changes it.

- Parent-facing interfaces should feel calm, trustworthy, clear, and control-oriented.
- Child-facing mission interfaces should feel simple, playful, encouraging, age-appropriate, not overstimulating, and not manipulative.

## Quality and repository hygiene

- Do not make fake implementation, completion, test, or verification claims. Report only work and checks that actually occurred.
- Keep the folder structure minimal and add only files required by an approved specification or active plan.
- Update the dated changelog for every meaningful change.
- Keep repository content, specifications, code, and commit messages in English.

## Child safety and security

- MissionKid must not contain infinite feeds, manipulative engagement loops, pressure to remain inside the app, likes, public leaderboards, public child profiles, gambling or loot-box mechanics, paid competition, child photos or videos, or unnecessary sensitive or identifying child data.
- Missions must be age-appropriate, short, and understandable; avoid dangerous physical actions; and encourage leaving the screen for completion.
- Future real-life rewards must remain parent-controlled and parent-approved.
- Do not add child accounts, social features, or chat.
- Never add secrets, credentials, tokens, or private keys to the repository.
- Treat authentication, payments, native mobile work, AI mission generation, and device blocking as out of scope unless future specifications and an active plan explicitly authorize them.
