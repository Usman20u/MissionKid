# MissionKid Follow-up — an unknown start outcome must survive a later failed action

**Date:** 2026-09-19
**Status:** Completed

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

## Implementation record

### Reproduced first

The sequence above was run against the rendered application on the real adapter
before anything was changed, in English, German and Russian. After the failed
exit the heading read "Your Mission is ready" / "Deine Mission ist bereit" /
"Твоя миссия готова" again, the page stated the Mission had not started, and the
action read **Start mission** — while durable state held the session `active`
with its real `startedAt` and exactly one write had occurred. The production
build carried the same defect: built from the unchanged source and driven in the
browser, it failed the four assertions about the sequence after the failed exit.

### Corrected

Runtime keeps one field, `unknownStartSessionId`, naming the session whose start
outcome nobody could establish. `isStartOutcomeUnknown` reads that field against
the session that is actually current, instead of inspecting whichever issue
happens to be latest.

Only a start's own outcome moves the field: an `unconfirmed` start names the
session, an established refusal clears it, and every other operation's failure —
including one that could not read storage at all — leaves it exactly as it
stands. Each reducer case that already cleared `sessionIssue` because durable
facts arrived now clears this field with them, so durable evidence still settles
the question wherever it arrives.

Nothing else changed. No persisted flag, no new storage key, no snapshot change,
no new message, no dependency and no refactor beyond the one selector and the
field it reads. The notice still follows the last operation attempted, so the
failed exit says truthfully that MissionKid could not leave the Mission, while
the heading keeps asking whether it started. The established refusal and the
confirmed abandonment of an `active` Mission are untouched.

### Verified

`MissionReady.test.tsx` drives the real adapter and the rendered application
through the whole sequence in English, German and Russian: the start lands and
stays unconfirmable; the exit fails while reads are down; the notice becomes the
exit's; the heading still asks; the not-started sentence appears nowhere in the
document; the two controls read the retry and the way back; the Mission title,
its instruction and its safety note are still present; activating the way out
again meets the same refusal with no further write and no abandonment; and with
reads restored the retry adopts the same `active` session and its original
`startedAt` without writing again. A second test takes the way out after reads
recover: durable state is followed rather than cleared, the running Mission is
adopted without a write, and leaving it then still opens the confirmation. Three
further assertions hold the state rules the page cannot show — durable evidence
settles the question whichever action carries it, a name left over from another
session answers nothing, and no other operation's failure in either outcome
settles it.

Four mutations were each shown to fail the suite and then reverted: deriving the
answer from the latest issue again, dropping the start-only guard, dropping the
clearing on a confirmed start, and dropping the clearing on an adoption. A fifth,
making the selector ignore the session it names, fails the identity assertion.

**Production-browser check**, Chrome for Testing `148.0.7778.97` against the
served production build, in English, German and Russian at `390x780` — 54 checks
covering only the changed sequence and its keyboard behavior, all as required:
the start reached by keyboard with its painted focus ring read from computed
style and activated with Enter; durable state really `active`; the heading
asking; the not-started sentence absent from the document; the action reworded;
the way out activated from the keyboard while reads fail, leaving the heading,
the wording and durable state unchanged with focus still on the control the
family used; a repeated activation changing nothing; and the retry adopting the
running Mission with the original `startedAt` and no further write. Unrelated
browser matrices were not repeated.

**Gates.** Type check, 745 tests across 21 test files and the production build
pass; `git diff --check` is clean. No timeout was raised and no assertion
weakened.

**Limitations unchanged.** No assistive technology was run. Browser evidence is
automation in one engine and is not human sign-off. This repository has no CI.
The three unexplained failures recorded in Plan 03 Task 1 and the two timeouts
recorded in its Task 7 remain separately recorded as unexplained.

## Closure (2026-09-19)

Every obligation above is satisfied, so this plan is complete and moves to `plans/completed/`, leaving `plans/active/` empty. The correction is `7ad1aca`; this record and the changelog entry travel with it.

Plan 03 is not reopened and the deferred `F004` work stays deferred. Merging, deployment and branch deletion remain unauthorized and undone. Pull request #4 stays open.
