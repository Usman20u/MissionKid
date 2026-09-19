# MissionKid Follow-up — an unknown start outcome must survive a later failed action

**Date:** 2026-09-19
**Status:** Approved and authorized — one bounded correction; execution approved with this plan

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records the explicit `SPEC COMPLETE` declaration.

This follows [`plans/completed/2026-09-19-pr4-review-corrections.md`](../completed/2026-09-19-pr4-review-corrections.md), whose Task 1 corrected the unknown-start presentation. That record stands as written: the correction it made is real and still holds. One further path through the same finding was independently reproduced afterwards and is corrected here. [`plans/completed/2026-09-17-implementation-session-f003.md`](../completed/2026-09-17-implementation-session-f003.md) — Plan 03 — is not reopened, and the deferred `F004` work stays deferred.

Scope and execution are approved by the instruction that raised this follow-up. No owning specification changes: this restores behavior the failure and recovery requirements already demand.

## The finding, reproduced first

1. Restore a `ready` session.
2. Let **Start mission** persist `active`, then fail every subsequent storage read.
3. The unknown-start presentation appears correctly: heading "Did your Mission start?", no not-started sentence, the action reworded to the retry.
4. While reads still fail, activate **Back to suggestions**.
5. `leaveMissionSession` cannot read durable state and returns `unavailable`.
6. `MissionReady.cancel` dispatches `{ operation: 'exit', outcome: 'failed' }`.
7. That issue replaces the start issue, and `isStartOutcomeUnknown` — derived from the single latest issue — becomes false.
8. The page again reads "Your Mission is ready", states "This Mission has not started yet." and labels the action **Start mission**, while durable state is `active` with a real `startedAt` and exactly one write has occurred.

The exit established no durable fact at all — it could not even read storage — yet changing which notice is shown silently settled a lifecycle question that remains open.

## Outcome

Uncertainty about a session's start survives any later action that establishes no new durable facts, and is cleared only by durable evidence. Changing the latest operation notice changes the message and nothing else. Heading, body, notices and action wording stay truthful together; Mission identity, adult-involvement and safety guidance and an appropriate retry are preserved. An established refusal and confirmed active abandonment are untouched.

## Correction

`isStartOutcomeUnknown` stops deriving from whichever issue happens to be latest. Runtime keeps one field naming the session whose start outcome is unknown. It is set by a start issue whose outcome is unconfirmed, cleared by a start issue whose outcome was established, and otherwise left exactly as it is — so another operation's notice cannot move it.

Every reducer case that already clears `sessionIssue` does so because durable facts arrived; each clears this field with it. `mission-session-transition-failed` is the one case that does not, which is precisely the defect.

Runtime only: no persisted flag, no new storage key, no snapshot change, no dependency, no refactor beyond the one selector and the field it reads.

**Specification trace.** `F003` — completion and exactly-once behavior, error and edge states ("Do not show unverified success"); Technical Architecture — the two write-failure classes; Visual and Ergonomic — loading, empty, unavailable, error and recovery presentation ("Keep or restore the last truthful state").

## Verification intent

A real-adapter, rendered-application regression for the whole sequence in EN, DE and RU, shown to fail before the fix; the whole page asserted after the failed exit, including repeated activation, with no further write and no abandonment; reads restored so the retry adopts the same active session and its original `startedAt` without another write; **Back to suggestions** after reads recover following the active session rather than abandoning it, with an actual active exit still requiring confirmation; a focused production-browser check of the sequence and its keyboard behavior; then type check, full suite, production build and diff checks, sequentially.

## Definition of complete

The finding corrected and verified, evidence recorded here, the changelog updated, focused commits pushed to the existing branch, and PR #4 updated. No merge, deployment, branch deletion or deferred `F004` work.
