# MissionKid Correction Plan — PR #4 review findings

**Date:** 2026-09-19
**Status:** Approved and authorized — four bounded corrections; execution approved with this plan

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration.

The work being corrected is [`plans/completed/2026-09-17-implementation-session-f003.md`](../completed/2026-09-17-implementation-session-f003.md) — Plan 03, `F003` with the approved bounded `F004` slice — completed and published for review as pull request #4. Its historical task records are preserved unchanged; this plan does not reopen it.

Scope and execution are approved by the instruction that raised these findings. No owning specification changes here: every correction below restores behavior that an owning specification already requires.

## Scope

Four findings from the independent review of PR #4, and nothing else.

## Explicitly out of scope

The remaining `F004` work — Mission History, its route, empty state and unavailable-title presentation, and any standalone Monthly Goal surface — stays deferred. No dependency, configuration, snapshot version or specification change. No merge, deployment or branch deletion.

## Tasks

### Task 1 — An unknown start outcome must govern the whole presentation

**Finding, reproduced.** With a stored `ready` session, when the start write lands but every following read fails, durable state becomes `active` with a real `startedAt` while the domain reports `unconfirmed` and runtime keeps `ready`. The alert is truthful, but the view heading still reads "Your Mission is ready" and the page still states "This Mission has not started yet." — a durable negative that is factually wrong, because the start did happen.

**Outcome.** For this unknown outcome the whole presentation stops asserting either a confirmed start or its absence: the view heading, the state statement and the action wording. Mission identity, adult-involvement and safety guidance and an appropriate retry are preserved. Retry resolves the same durable session and its original `startedAt` with no second start write. A pre-write refusal that was genuinely established may still say the Mission has not started.

**Specification trace.** `F003` — completion and exactly-once behavior, error and edge states ("Do not show unverified success"); Technical Architecture — the two write-failure classes; Visual and Ergonomic — loading, empty, unavailable, error and recovery presentation ("Keep or restore the last truthful state").

**Verification intent.** Assert against the whole rendered application in EN, DE and RU, not only the alert. Demonstrate that restoring the unconditional not-started statement fails the test.

### Task 2 — Lifecycle facts must survive a confirmed setup save

**Finding, reproduced.** From an incomplete age context holding a valid `active` session and one completed record, choosing an approved age band and saving successfully leaves storage correct — `saveSetup` preserves every fact — but the `setup-save-confirmed` reducer rebuilds runtime from settings and profile alone. The view becomes `setup-complete-handoff`, and the running Mission, the completed collection and any result pointer are absent from runtime until a refresh. The same happens with a valid completed-result pointer.

**Outcome.** The reducer derives runtime from the confirmed snapshot, so the session, the completed collection and the result pointer survive the save and the approved session/result view precedence resumes immediately without a refresh. Session identifiers, frozen selection facts, timestamps, completion periods and counts are unchanged. First-use and ordinary setup behavior are retained.

**Specification trace.** `F001` — setup and localization; Data and State Model — one snapshot, one runtime projection; `F003` — refresh and recovery behavior.

**Verification intent.** Drive the real adapter and the rendered application for both the active-session case and the result-pointer case. Demonstrate that rebuilding from settings and profile alone fails the test.

### Task 3 — Timer arithmetic must stay finite

**Finding, reproduced.** A hydrated `active` session carrying `durationSecondsAtSelection: 1e308` yields `remainingSeconds: Infinity`. `Number.isInteger` accepts the finite value; multiplying it by `1000` overflows.

**Outcome.** Derivation and anchoring produce a finite, bounded result for every stored input the snapshot validator accepts. Where timing cannot be represented safely the approved guidance fallback is used, without rewriting the stored duration and without preventing completion or confirmed abandonment. No arbitrary product duration limit is introduced and no catalog content changes.

**Specification trace.** Technical Architecture — timer mechanics; `F003` — the timer display is temporarily unavailable, and zero guidance.

**Verification intent.** Boundary tests proving finite bounded results, with normal timing behavior unchanged.

### Task 4 — Narrow documentation corrections

**Outcome.** Plan 03's final approval-table row is corrected where it still says closure, push and pull request were unauthorized, which contradicts its own closure record; historical entries stay. Two statements in the PR description are corrected: `F002` already persisted `selected` sessions, so a refresh did not simply lose all selected-session state; and confirmed abandonment is required for a valid `active` session whose content is unavailable, which is not generalized to every invalid timestamp or corrupted snapshot, each of which follows its own validation rules.

**Specification trace.** `AGENTS.md` — plan discipline, Git and changelog discipline, honest reporting.

**Verification intent.** Record these as review findings corrected now. Do not claim the earlier audit detected them.

### Task 5 — Verification and publication

**Outcome.** Focused regression tests shown to catch each defect; production-browser checks for the unknown-start presentation and the age-context recovery, including affected focus and narrow-screen behavior; then type check, full suite, production build and diff checks run sequentially, with complete logs kept outside the repository. The changelog and this plan record what actually happened, and PR #4 is updated in place.

**Specification trace.** `AGENTS.md` — implementation quality, Git and changelog discipline.

**Verification intent.** No weakened assertion, no raised timeout, no unrelated browser matrix repeated.

## Definition of complete

All four findings corrected and verified, evidence recorded here, the changelog updated, focused commits pushed to the existing branch, and PR #4's description corrected. Merge, deployment and the remaining `F004` work stay out of scope.
