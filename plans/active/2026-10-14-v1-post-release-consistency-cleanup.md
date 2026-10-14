# MissionKid Plan 08 — V1 Post-Release Consistency Cleanup

**Date:** 2026-10-14
**Status:** Active — recorded before any change. No task is implemented yet.
**Branch:** `feat/v1-post-release-consistency-cleanup`, taken from `main` at `f9ec507`.

## Purpose

This plan resolves the confirmed SHOULD FIX findings S1–S8 of the whole-repository audit of 2026-10-14 without expanding V1.

- MissionKid V1 remains released and live at `https://mission-kid.vercel.app`. No BLOCKER exists.
- This is a bounded consistency and cleanup plan, not V2 work.
- Production behavior stays unchanged except for two approved corrections: the Reward Card's finishing action and the top-level recovery action.
- No backend, authentication, database, analytics, router, AI runtime, new feature or infrastructure work is authorized.
- Completed plans, Git history and existing verification evidence are historical records and are not rewritten.
- Push, pull request, merge and deployment are outside this authorization.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md). Its gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration. Later presentation revalidations are recorded in [Plan 06](../completed/2026-09-29-whole-application-visual-design.md), and [Plan 07](../completed/2026-10-12-vercel-production-deployment.md) deployed V1.

**Authorized on 2026-10-14** by the owner's instruction: the eight tasks below. This includes the owner's decision to retire the dormant drawn-scene fallback in Task 8. That retirement happens only after the specification amendment and focused revalidation are recorded here, before any implementation is removed. Local commits are created only once every task is complete and verified.

**Excluded:**

- a Settings Back or Cancel control;
- a custom domain or a storage-origin migration;
- a Content Security Policy or cache-policy work;
- a backend, accounts, authentication, a database, Supabase or cross-device sync;
- analytics or AI Mission generation;
- new Mission Categories or rewards;
- CI or branch protection;
- a router or a state library;
- any redesign, convenience dependency, broad cleanup or history rewrite.

## Tasks

### Task 1 — Reward Card exit (S1)

**Outcome.** The Reward Card's one action reads as a neutral finish: `Done` / `Fertig` / `Готово`. Its navigation stays the same: it clears only the result pointer and returns to Mission Category Selection.

- At most one calm sentence may say that the family can leave the screen now, and only if it materially improves clarity.
- No streak, loop or "one more Mission" wording is used.
- Completion, Reward Card restoration, History and Monthly Goal are unchanged.

**Trace.**

- Business Context, *Why screen time should lead to real-life action*.
- `F004`, *Reward Card*, which allows "a short next step back to the core product flow or away from the screen".
- Visual & Ergonomic, the *Reward Card* inventory row and *Anti-manipulation visual rules*.

**Verification.**

- The affected Reward Card tests and the localization parity tests.
- The Reward Card in English, German and Russian at narrow, wide and enlarged-text layouts in a browser, reviewed with the ergonomic review questions.

### Task 2 — Top-level error recovery (S2)

**Outcome.** The application error boundary keeps its heading and adds one calm, localized sentence and one recovery button. The button reloads the page, which re-reads stored state without changing it. Nothing is written, cleared or reset, no state is invented, and no technical detail is shown.

**Trace.**

- Technical Architecture, *Error and recovery strategy*: an unexpected render or runtime error.
- Visual & Ergonomic, *Loading, empty, unavailable, error, and recovery presentation*, and the inventory row *Error or recovery state*.

**Verification.**

- App tests in English, German and Russian confirm that the action exists.
- Activating it requests one reload.
- Browser storage is neither written nor cleared, and the raw error text never appears.
- A browser check uses a throwaway instrumented build, which is not committed.

### Task 3 — AGENTS.md precision (S4)

**Outcome.** `AGENTS.md` states five rules:

- at most one active plan, with zero correct when no work is authorized;
- how a plan is opened: its path, its **Date**, **Status** and **Branch** lines, and its `SPEC COMPLETE` reference for implementation work;
- the changelog file and the shape of an entry;
- no AI attribution in commits or pull requests unless the owner asks;
- production is connected to `main`, so merging into `main` is deployment-sensitive.

README no longer points to "the active plan" as if one always exists. No new instruction file is created.

**Trace.** `AGENTS.md`, sections *Authority*, *Governing workflow*, *Plan discipline* and *Git and changelog discipline*.

**Verification.** A read-through against the repository's actual practice, a reference check and `git diff --check`.

### Task 4 — Current-state wording (S5)

**Outcome.** The governing documents stop describing a repository that is unimplemented or undeployed. Approved behavior and architecture do not change; only the wording does.

**Trace.** The owning document of each sentence. Under the non-semantic correction rule in `AGENTS.md`, no revalidation is needed.

**Verification.** Each changed sentence is compared with the one it replaces, followed by a reference check and `git diff --check`.

### Task 5 — One owner for the engineering-language rule (S6)

**Outcome.**

- README, the Business Context, the Global Spec and the Roadmap keep only the product fact: an English, German and Russian UI, with English as the default.
- `AGENTS.md` keeps the engineering rule and its exception for intentional German and Russian product localization.
- Localization does not change.

**Trace.** `AGENTS.md`, *Repository hygiene*; Global Spec, *Language and global requirements*.

**Verification.** A search for remaining copies of the rule.

### Task 6 — Changelog forward rule (S7)

**Outcome.**

- The changelog title becomes general.
- A short note gives the forward convention.
- Every historical entry stays unchanged.
- One concise Plan 08 entry is added, only once the work is complete.

**Trace.** `AGENTS.md`, *Git and changelog discipline*.

**Verification.** The diff shows only the title, the note and the final entry.

### Task 7 — Obsolete Plan 01/02 scaffolding (S8)

**Outcome.**

- `selectMissionStartAvailable` is removed, since it has no production caller. Its test uses assert the stored lifecycle state directly.
- The "later F003 work" comments and the obsolete overlapping comment are corrected.
- The Plan 01 test that asserts the absence of later-function strings is removed, or rewritten to test current behavior.
- Nothing visible to users changes.

**Trace.** `AGENTS.md`, *Decisions, scope, and traceability*: the smallest implementation, with no artifact lacking an approved role. `F002` and `F003` behavior is unchanged.

**Verification.** The Discovery and App tests, and the type check.

### Task 8 — Retire the dormant drawn-scene system (S3)

**Owner decision.** Retire the drawn-scene fallback rather than implement a second production image system. Every shipped Mission already has its reviewed illustration, and the release tests already forbid drawn scenes from rendering.

**Before any code is removed**, these steps are completed and recorded here:

1. Identify the Visual & Ergonomic statements that describe drawn scenes or their set-level fallback.
2. Make the smallest amendment. Production Missions carry the reviewed illustration coverage that the release gate requires. A missing required illustration is a publication defect. V1 keeps no second, drawn-scene fallback.
3. Confirm that no current production presentation changes.
4. Run a focused User Story / traceability check.
5. Run a focused specification consistency audit.

**Then remove** only the drawn-scene system: its components, scene definitions, scene-only CSS, `MissionSceneDefs` uses, and scene-only tests and helpers. The illustration system and every image file stay as they are. If a real production dependency appears, work stops and is reported.

**Trace.** Visual & Ergonomic, *Controlled Mission Mini-World scene system* and *Mission illustrations*; Technical Architecture, *Performance boundary*.

**Verification.**

- The illustration and suggestion tests and the full suite.
- A before-and-after browser comparison of the introduction, Discovery, Ready and Active views, showing identical rendering.
- Image assets byte-identical in the production build.

## Task 8 — specification amendment and revalidation, recorded before any code is removed

**Statements identified.** Visual & Ergonomic is the only specification that describes drawn ("authored") scenes or their fallback. The statements are:

- the *Controlled Mission Mini-World scene system* introduction, where a scene was "one small, distinctive mini-world or diorama" and an illustration was the alternative;
- the authored scene among the images allowed outside Discovery;
- the diorama phrase in *Visual direction*;
- the authored-scene *Three-layer color and material model*;
- the authored-scene sentence in *Scene composition*;
- the scene composition example in *Implementation neutrality*;
- the set-level fallback in *Mission illustrations* ("the whole set keeps its authored scenes until it can");
- the "three Mission illustrations or three authored scenes" rule under *F002 — Exactly-three Mission suggestions*;
- the "scene system's figures" reference in *Bounded product imagery*;
- acceptance criteria 21, 22 and 28, and the scene-system clause in *Explicit non-goals*.

**Amendment.** Each statement above is changed in place to say three things:

- The Mission image is the reviewed Mission illustration.
- Every approved pair of a production Mission and an age band has its illustration before release, as the release gate requires, and a missing required illustration is a publication defect.
- The authored scenes are retired, so V1 keeps no second, drawn-scene fallback.

The authored three-layer model becomes *Color, light, and emphasis* for the illustrations. Its no-ranking rule for focal emphasis is kept word for word.

The following are deliberately unchanged:

- the section's name;
- the scene authority limits, accessibility rules and composition grammar, which now apply to the illustration;
- the *reviewed still* clause, which applies only to a Mission without an illustration — a case the release gate already excludes.

No product behavior, Mission eligibility, safety rule, state, interaction or data fact changes.

**Current production presentation.** Nothing currently visible changes:

- All `102` approved pairs are illustrated, enforced by the coverage test in `MissionSuggestionSet.test.tsx`.
- None of the `33` reachable production sets renders a drawn scene; the same file asserts `sceneSets` is empty.
- `MissionPicture` renders the illustration whenever one resolves.
- The only drawn-scene output in production is `MissionSceneDefs`, a zero-size SVG of filter definitions on the introduction and in Discovery. The before-and-after browser comparison in Task 8's verification must show that removing it has no visible effect.

**Focused User Story / traceability check — PASSED.**

- No user story (`P1`–`P8`, `C1`–`C6`) mentions an image, scene or illustration.
- `F002` lets a Mission card present "a prominent controlled scene as authorized by" Visual & Ergonomic, which the illustration satisfies.
- `F001`'s example Mission is unaffected.
- The Functional Map, Technical Architecture, Data & State Model and Mission Catalog & Safety are unaffected:
  - the static presentation assets stay within the performance boundary;
  - there is no Mission presentation field;
  - there is no snapshot data.

**Focused specification consistency audit — PASSED.** A search of every governing document for scene, authored, diorama, mix, illustration and image leaves no statement that requires, describes or depends on a drawn scene or a mixed set. The F002 reference, the Visual inventory rows, the Ready, Active and Reward Card image rules, and acceptance criteria 21–28 agree with the amendment.

**Renewed authorization.** The owner's decision of 2026-10-14 to retire the drawn-scene fallback authorizes removing the implementation now that this revalidation is recorded.

## Plan-wide verification

- Commands: `npm run typecheck`, `npm test`, `npm run build` and `git diff --check`.
- Targeted tests for every touched area.
- Checks that the work adds:
  - no unsupported localization key;
  - no raw technical error text;
  - no dependency, environment variable or network path;
  - no change to root-only delivery;
  - no change to Mission illustrations;
  - no change to session, completion, History or Monthly Goal semantics.
- A final consistency audit of the touched files across documents, code and tests.

Local evidence goes in the review folder `MissionKid-Plan08-post-release-cleanup`.
