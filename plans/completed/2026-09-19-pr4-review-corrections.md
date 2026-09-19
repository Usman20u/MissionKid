# MissionKid Correction Plan — PR #4 review findings

**Date:** 2026-09-19
**Status:** Completed

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

## Implementation record

### Task 1 completion — an unknown start outcome governs the whole presentation

**Reproduced first.** With a stored `ready` session and every read after the
start write failing, durable state became `active` with a real `startedAt` while
the page showed the heading "Your Mission is ready", the sentence "This Mission
has not started yet." and the action **Start mission** — three assertions that
the Mission had not begun, above a notice correctly saying nobody could check.
The write had in fact landed, so the sentence was not merely unproven but false.

**Corrected.** One selector, `isStartOutcomeUnknown`, now answers the question
once, and the shell heading, the state statement and the action wording all read
it, so no part of the page can contradict another or the notice. The heading
becomes its own message, the not-started sentence is withheld, and the same
control keeps being the retry but is worded as one. Mission identity, the
instruction, adult-involvement and safety guidance, the Mission Break wording and
the way back to suggestions are all preserved — each is true either way.

An established refusal is deliberately untouched: where the write was refused
before storage changed, the Mission is known not to have started, the ordinary
ready heading and the not-started sentence remain, and **Start mission** remains
the wording.

**Verified.** `MissionReady.test.tsx` asserts the whole rendered application in
English, German and Russian: durable state really is `active`, the heading is not
the ready heading, the not-started sentence appears nowhere in the document body,
the start wording is gone, the Mission and its guidance remain, and the retry
resolves the same session and its original `startedAt` with no further write. A
separate test holds the established-refusal case unchanged. Three mutations were
each shown to fail the suite: restoring the unconditional sentence, restoring the
ready heading, and restoring the start wording.

### Task 2 completion — lifecycle facts survive a confirmed setup save

**Reproduced first.** From an incomplete age context holding a valid `active`
session and one completed record, completing setup left storage correct but
showed `setup-complete-handoff`: the running Mission was gone from the interface
while durable state still held it.

**Corrected.** `durableLifecycleFacts` derives the session, the completed
collection and the result pointer from a validated snapshot, and both hydration
and the `setup-save-confirmed` reducer now read them from it. The reducer derives
from the snapshot the write confirmed rather than spreading the runtime facts it
replaces, so the approved session and result view precedence resolves
immediately.

**Verified.** `Restoration.test.tsx` drives the real adapter and the rendered
application: a running Mission resumes without a refresh with its frozen
selection facts intact — including the age band it was chosen under, which the
parent's edit does not rewrite — and a Reward Card resumes with its completion,
period and count unchanged. Two further tests hold the cases that must not
change: a save with completions but nothing open still reaches the handoff and
still carries the records, and first-use setup still reaches the handoff with
nothing else. Two mutations were shown to fail: dropping the facts entirely, and
carrying the records while dropping the session and pointer.

### Task 3 completion — timer arithmetic stays finite

**Reproduced first.** `deriveGuidance` on a session with
`durationSecondsAtSelection: 1e308` returned `remainingSeconds: Infinity`.
`Number.isInteger` accepts the value; multiplying by a thousand overflows.

**Corrected.** A duration guides a countdown only while its millisecond value
stays an exact integer. The bound is derived from `Number.MAX_SAFE_INTEGER`, so
it is the representation's limit rather than a product rule about Mission length,
and no reviewed Mission approaches it. Beyond it the existing
`malformed-duration` fallback applies: the stored value is not rewritten, and
because the guard sits in `measureRemaining`, derivation, anchoring and ticking
from an anchor are all covered.

**Verified.** Boundary tests prove the degradation for an overflowing value, for
one second past the measurable range and for `Number.MAX_SAFE_INTEGER`; that the
value exactly on the boundary still guides normally; and that no accepted stored
duration crossed with several wall-clock readings yields a non-finite result
through any of the three paths. A rendered test proves the fallback does not turn
the Mission into a recovery surface: the guidance reads the approved neutral
wording, and **Mission done** and **Leave mission** both remain. Removing the
bound fails four tests.

### Task 4 completion — narrow documentation corrections

Plan 03's final approval row said closure, push and the pull request were
unauthorized, which its own closure record contradicted. It now records each as
authorized and done with its commit, keeps merge, deployment and branch deletion
unauthorized, and points here. Every historical entry above it is unchanged.

Two statements in the pull request description were corrected:

- The problem statement said a refresh lost whatever the family was in the middle
  of. `F002` already persisted a `selected` Mission Session, so a refresh did not
  lose all selected-session state. What was missing was everything after
  selection: no `ready` screen, no start, no timer, no completion and no way out.
- The recovery paragraph said that leaving a Mission whose content is unavailable
  *or whose stored timestamps are impossible* takes confirmed abandonment.
  Confirmed abandonment belongs to a **valid stored `active` session whose
  Mission content is unavailable**. An impossible `startedAt` is a different
  case, checked directly rather than assumed: `1.5`, `-1` and a non-finite value
  each make the whole snapshot `corrupted` at hydration, which routes to the
  parent-facing recovery surface under the snapshot validation rules and never
  reaches the Mission recovery surface at all.

Both are recorded as findings from the independent review of #4 and corrected
now. Neither was detected by the Task 17 implementation audit, and nothing here
claims otherwise.

### Task 5 completion — verification

**Production-browser checks**, Chrome for Testing `149.0.7827.55` against the
served build, in English, German and Russian at `320x568` and `1280x900` — 18
checks, all as required:

- an unconfirmed start reached by keyboard, with the painted focus ring read from
  computed style: durable state really `active`, the heading changed, the
  not-started sentence absent from the document, the action reworded, the Mission
  still named, and no horizontal scroll or overflow;
- the retry resolving to the running Mission with the original `startedAt`, no
  completion recorded, and focus moving to the new heading as a deliberate
  transition should;
- a confirmed setup save resuming the running Mission immediately, with its
  frozen `ageBandAtSelection` unchanged by the parent's edit.

**Layout for the changed state only** — 18 combinations, three languages, three
viewports, both text scales: no horizontal scroll, no overflow, no ellipsis and
no target under `44x44` CSS px. The new heading is longer than the one it
replaces and was checked at `320` px with a `32` px root in all three languages.
Unrelated browser matrices were not repeated.

**Limitations unchanged.** No assistive technology was run. Browser evidence is
automation in one engine and is not human sign-off. This repository has no CI.
The three unexplained failures recorded in Plan 03 Task 1 and the two timeouts
recorded in its Task 7 remain separately recorded as unexplained.

## Definition of complete

All four findings corrected and verified, evidence recorded here, the changelog updated, focused commits pushed to the existing branch, and PR #4's description corrected. Merge, deployment and the remaining `F004` work stay out of scope.

## Closure (2026-09-19)

Every obligation above is satisfied, so this plan is complete and moves to `plans/completed/`, leaving `plans/active/` empty. Its findings came from the independent review of pull request #4 and are corrected in `a0273dc`, `406a8c5` and `8bbc402`; the documentation corrections travel with this record.

Merging, deployment, branch deletion and the remaining `F004` work remain unauthorized and undone. Pull request #4 stays open for another review.
