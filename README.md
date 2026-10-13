# MissionKid

MissionKid helps families turn the end of children's screen time into a short real-life activity. Parents get a ready choice of age-appropriate activities, and children choose what to do next with adult guidance.

The MVP serves families with children aged 4–10 using the inclusive age bands 4–6, 7–8, and 9–10.

## MVP v1

On first use, a brief parent introduction leads into setup. The core journey is:

1. A parent selects the interface language and the child's age band.
2. A parent or child selects one Mission Category: Movement, Creativity, Helping at Home, Learning, or Calm.
3. MissionKid presents three short real-life missions.
4. The child chooses one mission and reviews its ready-to-start information.
5. The child deliberately starts the timer and completes the mission away from the screen.
6. The child marks the mission as done and receives a Reward Card.
7. Mission History records the completion, while Monthly Goal tracks progress toward 20 missions.
8. At 20 completed missions, MissionKid shows one suggestion that the parent choose an optional, parent-approved real-life reward.

## Language

Repository content, code, specifications, and commit messages use English. The MVP UI supports English, German, and Russian, with English as the default.

MissionKid is a global product and is not specific to any country.

## Scope and safety boundaries

The MVP uses only minimal, non-sensitive child profile information. It must not contain infinite feeds, manipulative engagement loops, pressure to remain inside the app, likes, public leaderboards, public child profiles, gambling or loot-box mechanics, paid competition, child photos or videos, or unnecessary sensitive or identifying child data.

Missions must be age-appropriate, short, and understandable; avoid dangerous physical actions; and encourage the child to leave the screen to complete them. Any future real-life reward remains parent-controlled and parent-approved.

Child accounts, social features, chat, authentication, payments, native mobile apps, AI mission generation, and device blocking are also outside the MVP. Secrets must never be stored in the repository.

## Repository contents

This repository is the home for MissionKid MVP v1 product specifications, execution rules, plans, and implementation artifacts.

The [Business Context](docs/business-context.md) defines the problem, the [Global Specification](docs/global-spec.md) defines MVP scope, and [F001–F004](docs/functional-map.md#function-specification-traceability) own the core journey. [AGENTS.md](AGENTS.md) governs execution; the active plan under `plans/active/`, when one is open, owns current work and [completed plans](plans/completed/) retain historical evidence. The [roadmap](docs/roadmap.md) describes future scope without authorizing it.

## Runtime and persistence

The implemented client is a React and TypeScript application built with Vite. It runs in the family's mobile or desktop browser at `/`; setup, Discovery, Mission sessions, the Reward Card and History are state-selected views, with no URL routing. [src/main.tsx](src/main.tsx) mounts the client, [src/AppShell.tsx](src/AppShell.tsx) selects the view, and [src/appState.tsx](src/appState.tsx) manages application state. Production is served over HTTPS at [https://mission-kid.vercel.app](https://mission-kid.vercel.app), built from `main` by Vercel's Git integration with its Vite defaults; the repository holds no hosting configuration.

There is no application backend, database, authentication or account system. A parent or caregiver controls setup and judges suitability; a child aged 4–10 chooses and performs a Mission with the required adult involvement. The supported model is one local family context with one minimal Child Profile and one active application tab.

[src/persistence.ts](src/persistence.ts) stores one validated, versioned JSON snapshot under `missionkid:snapshot` in browser `localStorage`. It contains language, a local profile identifier and age band, the current session, completed sessions and the current-result pointer. Writes are confirmed by reading back the stored result. Reward Cards, History and Monthly Goal progress derive from completed sessions; there is no separate reward, history or counter store. Mission text, translations, fonts and images are bundled static content.

Persistence belongs to the same origin and browser profile. Clearing site data or changing the origin, device or browser profile does not carry progress over; there is no cloud backup or synchronization. When storage is unavailable, the approved temporary mode keeps state only for the page lifetime and warns the parent. The first load requires delivery of static assets; offline installation is not implemented. The owning [Technical Architecture](docs/specs/technical/technical-architecture.md) and [Data and State Model](docs/specs/technical/data-and-state-model.md) define these boundaries and recovery rules.

## Local development and checks

Use Node.js `>=20.19.0`, as required by [package.json](package.json). Run `npm ci`, then `npm run dev` and open the root address Vite reports. `npm run typecheck` checks TypeScript, `npm test` runs the automated suite, and `npm run build` checks TypeScript and creates the static production artifact in `dist/`. Browser and ergonomic verification remains necessary for affected presentation work, as specified in the active plan.
