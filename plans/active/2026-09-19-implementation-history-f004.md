# MissionKid Implementation Plan 04 — Mission History and the current Monthly Goal

**Date:** 2026-09-19
**Status:** Implemented and verified — ready for review, with one review correction applied inside Task 8. Tasks 1–8 complete. The plan stays active until review concludes; nothing is merged or deployed.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose specification-completion gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration. That declaration states that it does not by itself authorize implementation and that later implementation requires a separate approved plan referencing it. This is that plan, and it is a draft until approved.

It continues [`plans/completed/2026-09-17-implementation-session-f003.md`](../completed/2026-09-17-implementation-session-f003.md) — Plan 03, `F003` with the approved bounded `F004` slice — together with [`plans/completed/2026-09-19-pr4-review-corrections.md`](../completed/2026-09-19-pr4-review-corrections.md) and [`plans/completed/2026-09-19-unknown-start-followup.md`](../completed/2026-09-19-unknown-start-followup.md). All three are historical evidence and are not reopened. Plan 03 recorded exactly which clauses it deferred with the Mission History view; this plan takes up those and nothing else.

The instruction that approved this plan authorizes implementation of Tasks 1–7 as one bounded batch, with the decisions and boundaries recorded below. Ordinary implementation choices inside that scope need no further approval; work stops only for a real authority conflict or for required behaviour outside this scope. Push, pull request, merge and deployment were **not** authorized in that batch.

A later instruction authorized a second bounded batch on this same plan: Task 8 below — keeping the current period current while the record stays open — together with the mutation-accounting correction, the verification both require, their commits, a normal push of this branch and one pull request against `main`. Merge, deployment, force-push, branch deletion and repository-setting changes remain unauthorized. The sentence above about push and pull request describes the first batch and is superseded only for those two.

## Remaining scope

Everything here is already owned by an approved specification. No owning specification changes.

1. **Private Mission History**, derived from validated, uniquely identified completed Mission Sessions for the current Child Profile.
2. **Newest-first ordering with a deterministic tie-break**, and the minimal entry: localized Mission title, the immutable Mission Category the session recorded, and a localized completion context.
3. **Empty History**, explaining that completed Missions appear there and offering the approved route back to Mission Category Selection, with no fabricated examples.
4. **The unavailable-title fallback in History**, which never removes or alters a valid completion, its category, its period or its count.
5. **Accessible navigation into History and back**, obeying the existing current-session and result precedence and the existing focus rules.
6. **Current-local-month Monthly Goal progress**, including a period with zero completions and a new local calendar month, presented as distinct from a restored Reward Card, which names the period its own completion fixed.
7. **A calm retry for a derived-view failure**, preserving the durable completions and claiming no loss and no second increment.
8. **EN / DE / RU**, with targeted accessibility, responsive and ergonomic verification.

## Explicitly out of scope

No duplicate History or counter store, no persisted navigation state, no persisted goal or prompt record, no URL route or router, no dashboard, analytics, filter, search, sharing, ranking or social behaviour, no new dependency, no snapshot version change and no migration. Completion, counting, the display cap and the single twentieth-completion prompt are reused exactly as implemented; none is reimplemented here.

## Reused, not rebuilt

| Existing | Reused for |
| --- | --- |
| `persistence.ts` snapshot validation | Completed sessions are already validated one record at a time, scoped to the Child Profile, coalesced by stable identifier and stripped of conflicting copies. History derives from that output and adds no second trust policy. |
| `deriveMonthlyGoal` in `missionProgress.ts` | Counting, uniqueness, the `20 / 20` cap and the deterministic twentieth-completion identity. The current-month surface calls it with a different period argument; nothing about counting changes. |
| `byCompletionOrder` in `missionProgress.ts` | The locale-independent order — `completedAt`, then stable identifier by code unit — that History reverses for newest-first. |
| `localCompletionPeriodId` in `missionSession.ts` | The `YYYY-MM` local-calendar period identity, already used at completion, now also read from the current clock for the live period. |
| `completionContext` in `MissionResult.tsx` | The localized completion date. It becomes shared rather than duplicated. |
| `MissionResultBoundary` pattern in `MissionResult.tsx` | The shape of a derived-view recovery boundary whose retry re-derives and writes nothing. |
| `AppShell` view selection and focus rules | Navigation, precedence and deliberate focus movement. |

## Approved decisions

**D1 — Where Mission History is entered.** A *secondary* History entry appears in two places: on the `setup-complete-handoff` view, and in Discovery alongside the existing settings entry. History must stay directly reachable after the existing confirmed Reward Card exit returns the family to Discovery, with no reload and no settings edit in between. The entry sits outside Mission cards and never competes with the primary action on either surface.

**D2 — Where current-local-month progress is presented.** One section inside the Mission History view, shown whether or not History has entries, including when it is empty. No second destination and no second action are introduced for it. It stays distinct from a restored Reward Card, which continues to name the period its own completion fixed.

**D3 — Precedence.** `selected`, `ready`, `active` and current-result precedence are preserved exactly. Opening History never ends a session and never clears a result pointer. Navigation stays runtime-only and root-only: nothing about it is persisted and no URL changes.

## Approved implementation boundaries

- History spans **all** completion periods for the current Child Profile. Only the Monthly Goal calculation filters to the current period.
- Reuse the validated completed facts and the existing progress, ordering, localization and recovery logic.
- Immutable completion periods, session identifiers and timestamps are preserved exactly.
- The source collection is never mutated, and the existing ascending twentieth-completion order is never changed to obtain newest-first History.
- Record-level trust rules are reused; no competing validation policy is introduced.
- `F002`'s discovery-cycle reset rule is preserved when the family leaves Discovery: a cycle ends when a Mission is chosen, when age band, language or Mission Category changes, **or when the family leaves discovery** — opening History is leaving discovery.
- The current period is re-read on entry to History, so a calendar rollover between visits is reflected — and, since Task 8, while History stays open.
- No persisted History, counter, navigation or prompt-seen flag; no router, dependency, dashboard or extra feature.

## Choices made under delegated authority

Recorded for review, not asked as questions:

- The derivation lives in `missionProgress.ts` beside `deriveMonthlyGoal`, reusing its `byCompletionOrder` comparator negated for newest-first, rather than in a second module with a second ordering.
- History reuses `result.missionUnavailable`, `result.completedOn`, `result.goal.heading`, `result.goal.progress`, `completionPeriodLabel` and `discovery.action.open`; only four genuinely new strings are added.
- History's one action is the existing route to Mission Category Selection, which is also the empty state's approved route, so no new action is invented.
- The goal-complete message is **not** repeated on History. It belongs to the twentieth completion's Reward Card, and a second surface stating it would read as the repeated prompt `F004` criterion 8 forbids. History shows the plain capped figure.
- The destructive parent reset entry does not render on History, which is reachable from the child-facing discovery doorway.
- The current period is read from the injected clock during render, so entering History again after a rollover shows the new period. **The second half of this choice was wrong and is corrected by Task 8.** It held that a rollover while History is left open on screen would be picked up only on the next entry, with no timer for it. `F004` says the monthly goal period changes when the next local calendar month begins, not when the family next opens the record, and the Technical Architecture's *What survives* table says the same of a new local calendar month. Treating re-entry as the trigger made the record state the wrong month for as long as it stayed open. The first half stands unchanged: the period is still read from the clock and never from a stored record.

## Acceptance mapping

Nothing below is claimed as passing. Each row states what already holds and what this plan must add. Acceptance is claimed only after implementation and verification.

### `F003` clauses deferred with the History view — now held

| Clause | Where it is asserted |
| --- | --- |
| 11 — one completion produces one History entry | `MissionHistory.test.tsx` "is reachable straight after a confirmed Reward Card exit, with no reload or settings edit" (one completion, one entry), "shows one entry per Mission Session and nothing from another profile"; `missionProgress.test.ts` "lists one Mission Session once however often it is stored" |
| 12 — repeat or refresh adds no History entry | `MissionHistory.test.tsx` "is not persisted, and a refresh returns to the approved state" (the stored collection is unchanged by any visit) with `MissionResult.test.tsx` "restores the same result through the pointer, repeating no completion"; `missionProgress.test.ts` "lists one Mission Session once however often it is stored" |

### `F004`

| # | Clause | Where it is asserted |
| --- | --- | --- |
| 1 | One card, one History entry, progress `+1` below `20 / 20` | `MissionResult.test.tsx` "reaches the approved Reward Card in one confirmed write", "counts each completion once and caps the display at the target"; `MissionHistory.test.tsx` "is reachable straight after a confirmed Reward Card exit, with no reload or settings edit" |
| 2 | Resubmission or refresh leaves History and Monthly Goal unchanged | `missionSession.test.ts` "resolves an existing completion without writing or re-reading the clock"; `MissionHistory.test.tsx` "is not persisted, and a refresh returns to the approved state", "counts only this local month while the record keeps every period" |
| 3 | Card shows recognition, title, category, completion context and progress | `MissionResult.test.tsx` "shows the Mission Category and a localized completion context" |
| 4 | History holds only this profile's completed sessions, minimal information, newest first | `MissionHistory.test.tsx` "orders every completion newest first, across periods", "breaks an exact tie deterministically", "shows one entry per Mission Session and nothing from another profile", "shows only the approved minimum for an entry" (EN/DE/RU), "shows the Mission Category the completion recorded", "is a plain list, not a feed or a dashboard"; `missionProgress.test.ts` "the private Mission History" |
| 5 | Empty History shows its empty state and a route to Mission Category Selection | `MissionHistory.test.tsx` "shows the empty record truthfully" (EN/DE/RU), "shows the empty state for a profile whose only completions belong to another" |
| 6 | `ready`/`active` and cancelled or abandoned flows never appear in History or count | The Monthly Goal half as Plan 03 recorded it, plus `MissionHistory.test.tsx` "leaves a stored session and an open result in charge" and `MissionDiscovery.test.tsx` "adds no completed record, result pointer or progress source by discovering", which now also asserts no History entry and no progress figure appear from discovery |
| 7 | New period starts `0 / 20` and completes at exactly twenty | `missionProgress.test.ts` "starts a period with no completions at zero of twenty", "reaches the goal at exactly twenty valid completions"; `MissionHistory.test.tsx` "shows zero of twenty for a month with no completions, with the record empty", "reads the current period on entry, so a rollover shows the new month", and — for a period that begins while the record is open — "names the new month in place, without the family leaving and returning", "catches up on the month after the page was hidden or suspended", "reads zero of twenty for the new month and fabricates nothing when the record is empty", "waits out a month longer than one timer can hold" |
| 8 | Later completions stay in History, display holds `20 / 20`, no repeated prompt | `missionProgress.test.ts` "caps the display at twenty while preserving later completions"; `MissionHistory.test.tsx` "holds at twenty of twenty while later completions stay in the record" |
| 9 | One encouraging parent-approved message, nothing delivered or promised | `MissionResult.test.tsx` "shows the one goal message for the twentieth result and not the twenty-first"; `localization.test.ts` "keeps the goal invitation optional and subject to a parent agreeing" |
| 10 | No gambling, payment, comparison, sharing, child media or manipulation | `MissionResult.test.tsx` "holds no prize, purchase, reveal or pressure behaviour"; `MissionHistory.test.tsx` "is a plain list, not a feed or a dashboard" |

With those clauses now carried by named assertions, the truthful claim is: every `F003` and `F004` acceptance criterion has an automated assertion, and no clause remains deferred to a later plan. That is a statement about the assertions this repository runs, not about human or assistive-technology acceptance, neither of which was performed. It is also not MVP completion: whatever the Roadmap holds beyond `F001`–`F004` is untouched.

## Tasks

Dependency-ordered. Each task is complete only when its verification passes.

### Task 1 — Derive the private History and the current period

**Outcome.** Pure derivation over validated completed sessions: entries for one Child Profile, unique by session identifier, ordered newest first by `completedAt` with the stable identifier as the deterministic tie-break, each carrying the stored category and completion moment. Separately, the current local month's period identity read from the injected clock, so the live period is distinguishable from a completion's own fixed period. Nothing is written, and no second counting or trust policy is introduced.

**Source references.** Data and State Model — Mission History (the three-step derivation), Monthly Goal period and count; `F004` Mission History behavior and Monthly Goal period; Technical Architecture — derived state.

**Likely files.** `src/missionProgress.ts` (extend; reuses `byCompletionOrder`), `src/missionProgress.test.ts`, `src/missionSession.ts` (reuse `localCompletionPeriodId`, no change expected).

**Verification.** Unit tests: newest-first order; an exact `completedAt` tie broken deterministically and independently of interface language; another profile's and another period's records excluded; duplicate identifiers counted once; ordering unchanged by a language or age-band change; a current period with no completions; a month rollover leaving prior entries in History. Each new assertion shown to fail against a controlled mutation.

### Task 2 — Reach Mission History and return

**Outcome.** A `history` application view selected from runtime state alone, with the approved secondary entry on both the `setup-complete-handoff` view and Discovery (D1), and one route back to Mission Category Selection. An `active` session, an open completed result, a `ready` session and a `selected` session keep their existing precedence, and opening History ends neither (D3). Opening History from Discovery ends the discovery cycle, as `F002` already requires of leaving discovery. Focus moves to the view heading exactly as other deliberate context changes do. Nothing about navigation is persisted, and no URL changes.

**Source references.** Technical Architecture — root-only navigation, app shell and navigation responsibilities; `F003` refresh and recovery behavior; Visual and Ergonomic — action hierarchy and deliberate focus movement.

**Likely files.** `src/AppShell.tsx`, `src/appState.tsx`, `src/MissionHistory.tsx` (new), `src/App.test.tsx`, `src/Accessibility.test.tsx`.

**Verification.** Rendered-application tests on the real adapter: History opens and returns from both entries; it is reachable straight after a confirmed Reward Card exit without a reload or a settings edit; a restored `active` session, a restored open result and a restored `ready` session each keep precedence, keep their durable facts and offer no History entry; a refresh while History is open restores the approved state rather than History, because navigation is not persisted; the discovery cycle's shown Missions are not carried back across a visit; focus lands on the view heading once.

### Task 3 — Present each entry, and the title that cannot be shown

**Outcome.** Each entry shows the localized Mission title, the immutable Mission Category the session recorded, and a localized completion context — and nothing else. A Mission the catalog no longer carries keeps its entry, its category, its completion moment, its period membership and its count, with the approved calm localized fallback in place of the title. EN / DE / RU.

**Source references.** `F004` Mission History behavior; Visual and Ergonomic — `F004` Mission History presentation; Data and State Model — a completed session whose Mission content cannot be resolved; Mission Catalog and Safety — localization equivalence.

**Likely files.** `src/MissionHistory.tsx`, `src/localization.ts`, `src/styles.css`, `src/MissionHistory.test.tsx` (new), `src/localization.test.ts`.

**Verification.** Rendered tests in all three languages: the entry carries exactly the approved fields; the category is the one the session stored, not one re-derived from the catalog; a withdrawn Mission keeps its entry and its count with the fallback title; a language change alters labels and dates but not order, membership or counts. The dictionary invariants already enforced — every key resolved by an implemented surface, no unused key, matching interpolation tokens — must hold with the new strings.

### Task 4 — Empty Mission History

**Outcome.** With no completed sessions for this profile, History states plainly that completed Missions will appear there and offers the approved route to Mission Category Selection. No fabricated entries, no sample records, no pressure or gamification.

**Source references.** `F004` empty state; Visual and Ergonomic — empty Mission History row and the empty-state paragraph.

**Likely files.** `src/MissionHistory.tsx`, `src/localization.ts`, `src/MissionHistory.test.tsx`.

**Verification.** Rendered tests in all three languages: the empty state appears only when this profile has no completions; the route reaches Mission Category Selection; another profile's completions do not fill it; no entry-like node is rendered.

### Task 5 — Current-local-month Monthly Goal

**Outcome.** The current period's progress presented as `X / 20 missions` in one section of the History view (D2), shown whether or not History has entries, derived for the month the clock is in now. A period with no completions reads `0 / 20`; after a rollover the new period reads its own figure while prior completions stay in History. It is visibly distinct from a restored Reward Card, which continues to name the period its own completion fixed. Wording stays neutral and encouraging, the display caps at `20 / 20`, and no second goal-complete prompt is created here.

**Source references.** `F004` Monthly Goal target, counting, period, goal completion; Visual and Ergonomic — `F004` Monthly Goal presentation; Data and State Model — Monthly Goal period and count, one goal-complete prompt.

**Likely files.** `src/MissionHistory.tsx`, `src/missionProgress.ts`, `src/localization.ts`, `src/MissionHistory.test.tsx`, `src/MissionResult.test.tsx`.

**Verification.** Rendered tests with an injected clock: zero completions in the current month; a completion in the current month; a rollover where the previous month's completions remain in History while the current figure resets; twenty and twenty-one completions holding `20 / 20`; and a Reward Card restored in a later month still naming its own period while this surface names the current one. No write occurs on any of these paths.

### Task 6 — A calm retry for a derived-view failure

**Outcome.** A failure to derive or render History or the Monthly Goal surface keeps every durable completion intact, says calmly that the view cannot be shown, and offers a retry that re-derives from the same durable facts. It claims no data loss, repeats no completion, mints no identifier and writes nothing. The existing Reward Card boundary is unchanged.

**Source references.** `F004` error and edge states; Visual and Ergonomic — "History or Monthly Goal unavailable"; Technical Architecture — a derived view that is stale or invalid; Data and State Model — recalculate, never repair into a duplicate.

**Likely files.** `src/MissionHistory.tsx`, `src/localization.ts`, `src/MissionHistory.test.tsx`.

**Verification.** A rendered test drives the failure through an injected derivation at a real boundary, as the Reward Card's display-failure test already does, with no production fault switch: the notice appears, the completions in storage are unchanged, the retry restores the same view from the same records, no write occurs, and focus is placed deliberately.

### Task 7 — Acceptance, verification and record

**Outcome.** Every clause in the mapping above is either carried by a named assertion or recorded as still outstanding. Targeted accessibility, responsive and ergonomic review of the new surfaces only. Type check, full suite, production build and diff checks run sequentially. The changelog records what actually happened, and this plan's implementation record is written and the plan closed.

**Source references.** `AGENTS.md` — implementation quality, plan discipline, Git and changelog discipline; Visual and Ergonomic — accessibility and responsive presentation, and the required ergonomic review with `1–3` targeted improvements.

**Likely files.** `changelog/2026-08-17.md`, this plan, `src/Accessibility.test.tsx`, `src/styles.css`.

**Verification.** The criterion-to-assertion matrix built before the final edits; each added assertion shown to fail against a controlled mutation; a focused production-browser check of the new surfaces and their keyboard behavior in EN / DE / RU, without repeating unrelated matrices; then the sequential gate. No raised timeout and no weakened assertion.

### Task 8 — Keep the current month current while the record stays open

**Outcome.** The record's period label and Monthly Goal figure follow the family's local calendar month while the view is open, and after the page has been hidden or suspended, without the family leaving History and coming back. Every stored completion and its immutable `completionPeriodId` are untouched, History still spans every period, counting and the twentieth-completion rule are unchanged, a restored Reward Card still names its own fixed period, and the refresh writes nothing.

**Source references.** `F004` — Monthly period ("changes conceptually when the next local calendar month begins") and acceptance criterion 7; Technical Architecture — *What survives*, both the new-local-calendar-month row and the page-hidden row that already recalculates on visibility or focus return; Visual and Ergonomic — `F004` Monthly Goal presentation, which forbids a countdown or deadline state.

**Likely files.** `src/MissionHistory.tsx`, `src/MissionHistory.test.tsx`.

**Verification.** Rendered tests with an injected clock and controlled timers: a boundary reached while the view is open; a return after hidden time with no timer having run; a new month with no completions, including an empty record; a month longer than one browser timer can hold; and the timer and both listeners released when the record closes. Each asserts the rendered label and figure, the retained record and unchanged storage. Then a focused production-browser check of the refresh against the served build.

**Follow-up authorization, 2026-09-21.** A later instruction reopened this task for one focused correction and nothing else. Inside `useCurrentLocalPeriod` the displayed period and the first scheduled refresh are read from the clock separately — the state initializer makes one reading, and the effect that schedules the next refresh makes another. A local month boundary crossed between those two readings leaves the record naming the month that has just ended while the next refresh is measured from the month that has just begun. The authorization covers reproducing that failure through the rendered application, fixing it, verifying it, updating this plan and the changelog, focused commits, a normal push to the existing branch, and updating the description of pull request #5. Merge, deployment, force-push, branch deletion, a second pull request and repository-setting changes remain unauthorized, and this plan stays active pending review.

## Implementation record

### Task 1 — the derivation

`deriveMissionHistory` sits beside `deriveMonthlyGoal` in `missionProgress.ts` and reads the completed sessions a validated snapshot already produced: one Child Profile, unique by session identifier, every period. Its order is `byCompletionOrder` negated, so the comparator that decides which completion is the twentieth is the same one that decides what is newest — reversing it rather than writing a second comparator is what keeps the two from ever disagreeing. The collection it is given is never sorted in place.

Nine unit assertions hold it, including that History is the exact reverse of the twentieth-completion order and that the source array is untouched. Three mutations were run: reversing the order back, dropping the profile filter and dropping the first-copy guard. The first two failed the suite. The third did not and is recorded as behaviourally equivalent: the `Map` keyed by session identifier deduplicates whether or not the guard is present, and the adapter already excludes conflicting copies of one identifier, so no validated input can distinguish them.

### Tasks 2–6 — the surface

`MissionHistory.tsx` renders this month's goal and the record beneath it, both derived, with a recovery boundary around the whole surface. `AppView` gains `history`; a runtime-only `history` flag selects it, and it sits below every session state, the open result and a live discovery cycle, so nothing the family is actually in can be displaced and the flag can never strand them. Opening the record ends the discovery cycle, as `F002` requires of leaving discovery; the secondary entry appears on the handoff and beside the settings entry in Discovery, outside the Mission cards, and the primary action on each surface is untouched. The destructive reset entry does not render on the record.

Entries carry the Mission title, the category the session froze at selection and a localized completion context, and nothing else. A Mission the catalog no longer carries keeps its entry, its category, its date and its count behind the approved fallback title. The empty state states plainly that completed Missions will appear there and offers the same route to Mission Category Selection that the record itself offers. Opening, reading and leaving the record write nothing.

Seven mutations were run against this surface and each failed the suite: taking the goal period from a record instead of the clock; narrowing History to the current period; showing a raw identifier instead of the fallback title; re-reading the category from the catalog; letting the discovery cycle survive; putting the record above a stored session; and allowing the reset control onto it. A no-op control mutation left the suite green.

### Task 7 — verification and the ergonomic review

Two targeted improvements came out of the review of the new surfaces, and no redesign: the entries list is named by the view heading rather than announced as an unnamed list, and each entry's localized date carries the local calendar day in a `<time dateTime>`, built from local parts for the same reason the completion period is.

**Production-browser check**, Chrome for Testing `148.0.7778.97` against the served build, in English, German and Russian at `390x780` and `320x568` — 51 checks of the new surfaces only: both entries reached and activated from the keyboard with the painted focus ring read from computed style; focus landing on the view heading; this month named and counted from the clock while earlier months stay in the record; one action on the record; nothing written on any path; the return to Mission Category Selection; the entry sitting beside the settings entry in Discovery; and no horizontal scroll or sub-`44x44` target at `320` px with a `32` px root. Unrelated browser matrices were not repeated.

**Limitations, as recorded at the end of the first batch.** No assistive technology was run, so no screen-reader behaviour is claimed beyond the roles, names and structure present in the document. Browser evidence is automation in one engine and is not human sign-off. This repository has no CI. A calendar rollover while the record is left open on screen is picked up on the next entry; no timer was added for it. The three unexplained failures recorded in Plan 03 Task 1 and the two timeouts recorded in its Task 7 remain separately recorded as unexplained.

The rollover sentence in that list is **no longer true of this tree**: Task 8 below added the refresh it said was absent. It is kept as written because it described the tree the 51 browser checks above ran against.

### Task 8 — the month turning under an open record

The reported behaviour was reproduced first: with the record open and the injected clock carried across a month boundary, the label and the figure stayed on the old month, and five new assertions failed against the implementation as it stood.

`useCurrentLocalPeriod` in `MissionHistory.tsx` now holds the live period. It still reads the period from the injected clock and never from a stored record; it only decides when to read it again. One `setTimeout` is scheduled for the first moment of the next local calendar month, built from local calendar parts so daylight saving cannot move where the month begins, and `visibilitychange` and `focus` listeners re-read the clock when the family comes back to a page that was hidden or suspended, because a frozen tab's callback cannot be relied on to have run. A wait longer than the largest delay a browser timer can hold is taken in hops and re-measured at each one, so a record opened on the first moment of a 31-day month cannot overflow into a busy loop. Rescheduling clears the pending callback first, so returns do not accumulate timers, and the effect's cleanup releases the timer and both listeners.

Nothing about the derivation changed. Where the month has not actually turned the value is unchanged and React re-renders nothing, so the record still never ticks and nothing on it counts down. No storage is read or written on any of these paths, no stored `completionPeriodId` is recomputed, History still spans every period, and a restored Reward Card still names the period its own completion fixed.

Six new assertions hold it: the boundary reached in place with the view never left, including a check that nothing moves in the eight quarter-seconds before it; the catch-up after hidden time, with no second timer left running beside the new one; the new month reading `0 / 20` and fabricating nothing while the record is empty; the long month that no single timer can hold; the timer and both listeners released on unmount; and the timer given back when the family returns to Mission Category Selection.

### Task 8 — the month that turns between the two readings on entry

A review of the same task found a second way the record could state the wrong month, this one on entry rather than while the record sat open, and it was reproduced before anything was changed.

`useCurrentLocalPeriod` read the clock twice as the view arrived: the state initializer read it during the first render to seed the period, and the effect read it again on setup, but only to measure the wait from — `schedule(readClock.current())`. Nothing published that second reading. A local month boundary crossed between the two therefore split them: the period on screen came from the month that had just ended, while the wait was measured from the month that had just begun, so the next refresh was due at the month *after* the one the family was actually in.

The failure was observed on the production build before the fix, with the injected clock crossing `2024-03-31 23:59:59.999` to `2024-04-01 00:00:00.000` between those two readings. The record opened on `March 2024` at `2 / 20`; the wait it scheduled was the clamped `2 147 483 647` ms of a wait toward `2024-05-01`, not the `1` ms that separated the first reading from the boundary; one millisecond later, at the moment April began, the record still read `March 2024` at `2 / 20`; and the next month it ever named was `May 2024` at `0 / 20`. April was never displayed at all. Against `F004`'s Monthly period clause and acceptance criterion 7 this is a month of a wrong period label and a wrong figure — the twenty-completion target counted against a month the family had already left.

The effect now calls `refresh()` on setup instead of `schedule(...)`, so one reading both sets the period and measures the wait from the same moment. The first render must still seed the state from its own reading; the effect's reading supersedes it. Where the month has not turned in between — every ordinary entry — `setPeriodId` is given the value the state already holds and React re-renders nothing, so the record still never ticks. The browser check counted exactly two clock readings per entry before and after the change: the fix publishes the second reading rather than adding one.

Nothing else moved. The derivation, the timer hops, the `visibilitychange` and `focus` listeners, the hidden-page guard, the clearing of a pending callback before rescheduling and the cleanup are all unchanged, no storage is read or written on any of these paths, no stored `completionPeriodId` is recomputed, History still spans every period, and a restored Reward Card still names the period its own completion fixed. No string, dependency, view, control or specification changed.

One assertion holds it, through the rendered application and the real persistence adapter: the clock crosses the boundary between the view's two readings on entry, and the record must then name April with April's `0 / 20` while both March completions keep their places and their stored periods, with zero writes; it must then reach `May 2024` from April's own boundary rather than skipping a month it never named.

### Corrected mutation accounting

The earlier record of this plan miscounted its own mutation runs, and the changelog repeated the error. It said "Ten mutations of the implementation were each observed to fail the suite" and then listed ten items, the tenth of which was "a no-op control that correctly left the suite green" — a control that passes is not a killed mutation, and it cannot be one of ten that each failed. The plan's own Task 1 and Tasks 2–6 sections were internally correct but were never added up.

Every mutation named in the earlier record was re-run against the current tree to put the corrected numbers on evidence rather than on arithmetic. No machine-readable log of the original runs was kept, so the original runs themselves cannot be re-inspected; what is recorded below is this re-run, which reproduced each earlier result.

| # | Mutation | Suite | Class |
| --- | --- | --- | --- |
| 1 | Task 1 — the History order reversed back to ascending | 11 tests failed | behaviour-changing, caught |
| 2 | Task 1 — the Child Profile filter dropped from `deriveMissionHistory` | 2 tests failed | behaviour-changing, caught |
| 3 | Task 1 — the first-copy guard dropped from `deriveMissionHistory` | green | equivalent, not caught |
| 4 | Tasks 2–6 — the goal period taken from a stored record instead of the clock | 5 tests failed | behaviour-changing, caught |
| 5 | Tasks 2–6 — History narrowed to the current period | 6 tests failed | behaviour-changing, caught |
| 6 | Tasks 2–6 — a raw Mission identifier shown instead of the fallback title | 3 tests failed | behaviour-changing, caught |
| 7 | Tasks 2–6 — the entry's category re-read from the catalog | 1 test failed | behaviour-changing, caught |
| 8 | Tasks 2–6 — the discovery cycle allowed to survive opening the record | 6 tests failed | behaviour-changing, caught |
| 9 | Tasks 2–6 — the record put above a stored session in view precedence | 1 test failed | behaviour-changing, caught |
| 10 | Tasks 2–6 — the destructive reset control allowed onto the record | 1 test failed | behaviour-changing, caught |
| 11 | Tasks 2–6 — control — a comment added, no behaviour changed | green | control, unchanged behaviour |
| 12 | Task 8 — the month-boundary timer removed | 5 tests failed | behaviour-changing, caught |
| 13 | Task 8 — the visibility and focus listeners removed | 2 tests failed | behaviour-changing, caught |
| 14 | Task 8 — the timer-length clamp removed | 1 test failed | behaviour-changing, caught |
| 15 | Task 8 — the effect cleanup removed | 3 tests failed | behaviour-changing, caught |
| 16 | Task 8 — the pending callback no longer cleared before rescheduling | 1 test failed | behaviour-changing, caught |
| 17 | Task 8 — the hidden-page guard dropped from the return handler | green | equivalent, not caught |
| 18 | Task 8 — control — a comment added, no behaviour changed | green | control, unchanged behaviour |
| 19 | Task 8 — the effect back to scheduling from its own reading without publishing it | 1 test failed | behaviour-changing, caught |
| 20 | Task 8 — the refresh taking two separate clock readings instead of one | green | equivalent, not caught |

**20 mutations have now been run in total: 15 behaviour-changing mutations, every one of them caught by the suite; 3 behaviourally equivalent mutations, correctly not caught; and 2 unchanged-behaviour controls, which left the suite green as controls are meant to.** The killed count is therefore 15, not the ten the earliest record claimed and not the 20 runs it took to establish them. Of these, 11 cover the first batch — 9 caught, 1 equivalent, 1 control — and 9 cover Task 8, which is 6 caught, 2 equivalent and 1 control. Rows 1 to 18 are the runs recorded before the entry-race correction; rows 19 and 20 are that correction's own.

**On the three equivalents.** Dropping the first-copy guard in `deriveMissionHistory` leaves the `Map` keyed by session identifier deduplicating exactly as before, and the adapter already excludes conflicting copies of one identifier, so no validated input can distinguish the two. Dropping the hidden-page guard in the refresh listener only lets the clock be re-read as the page goes away, which reschedules the same callback and shows nobody anything. Splitting the refresh into two clock readings separates two calls that no real clock can put on opposite sides of a month boundary — the entry race exists because a render and an effect are separated by a commit, not because two adjacent statements are. None of the three is a gap in the assertions, and no test was written to make any of them fail.

**On the two controls.** Both were unchanged-behaviour edits — an added comment — run to show that the suite is not failing for unrelated reasons. Each left the suite green, which is what a control passing means and is not a killed mutation.

### Task 8 — verification

Type checking, **799 tests across 22 test files** (793 before this follow-up), the production build and `git diff --check` all pass, run sequentially.

**Re-run after the entry-race correction.** The targeted `MissionHistory` file, type checking, **800 tests across 22 test files**, the production build and `git diff --check` — on the working tree and on the whole branch diff against `main` — all pass, run in that order. The one added test is the entry-race assertion. The six earlier Task 8 assertions still pass unchanged, so the ordinary boundary reached in place, the catch-up after hidden time, the empty new month, the month longer than one timer can hold, the timer and both listeners released on unmount, and the timer given back on the return to Mission Category Selection all still hold.

**Production-browser check of the entry race**, Chrome for Testing `148.0.7778.97`, headed, at `390x780`, in English, German and Russian, against two served production builds — one built from the tree before the change and one from the tree after it. The clock was moved by replacing `Date.now` from outside the application, arming a single crossing from `2024-03-31 23:59:59.999` to `2024-04-01 00:00:00.000` immediately before the record was opened; no production switch was added and the build knows nothing about it. Before the change, all three languages showed the month that had ended — `March 2024`, `März 2024`, `март 2024 г.` — at `2 / 20`. After it, all three showed `April 2024`, `April 2024` and `апрель 2024 г.` at `0 / 20`. In every one of the six runs both March completions stayed in the record with their stored periods `2024-03`, and the page attempted zero storage writes. Each run also counted the clock readings: none before the record was opened, and exactly two during it, before and after the change alike.

**Production-browser check**, Chrome for Testing `148.0.7778.97` against the served build, in English, German and Russian at `390x780` — 33 checks of the period refresh alone. In each language: the record opened naming the current month at `2 / 20`; it held still across eight quarter-second samples while the boundary approached, so nothing ticks; it then turned to the next month at `0 / 20` in place, with the view never left, both completions still listed and zero writes attempted; and separately, a record opened in this month, hidden by switching to another tab, woken a month later on the family's clock and brought back to the front, named the new month at `0 / 20` with both completions kept and zero writes. The application's clock was moved by replacing `Date.now` from outside the application; no production switch was added, and the tab was genuinely hidden and shown rather than sent a synthetic event.

An earlier run of the same script in headless mode failed the sleep-and-return half, and the reason is worth recording: headless kept reporting `document.visibilityState` as `hidden` even in the foreground, so the refresh correctly declined to run. That is the hidden-page guard behaving as intended, not a defect, and it is why the check is recorded as a headed run.

**Ergonomic review.** Task 8 adds no view, no control, no string and no motion; the only visible change is that an already-visible label and figure state the right month. The review of the record's presentation therefore stands as recorded for Task 7, and no further improvement was made — well inside the `1–3` bound rather than a redesign.

**Limitations, as they stand now.** The browser evidence for the entry race is the focused two-build comparison recorded above and nothing wider: the 33 checks of the ordinary refresh and the 51 checks of the record's surfaces were not repeated against the corrected tree, because the change alters neither surface, and the automated suite is what covers them there. No assistive technology was run at any point, so no screen-reader behaviour is claimed beyond the roles, names and structure present in the document. Browser evidence is automation in one engine and is not human sign-off. This repository has no CI, so none of the checks above is a CI result. The refresh depends on the page being allowed to run a timer or to receive `visibilitychange` or `focus`; a browser that delivers none of them — a tab discarded and restored without either event, for instance — shows the month it last read until one arrives or the record is reopened. The record's display-failure path still has no trigger in an unmodified production build, by design, so it is covered by automated evidence only. The three unexplained failures recorded in Plan 03 Task 1 and the two timeouts recorded in its Task 7 remain separately recorded as unexplained.

## New localized strings, for human review

| Key | English | German | Russian |
| --- | --- | --- | --- |
| `view.history.title` | Mission history | Missionsverlauf | История миссий |
| `history.action.open` | Mission history | Missionsverlauf | История миссий |
| `history.empty.body` | Completed Missions will appear here. Nothing has been completed yet. | Erledigte Missionen erscheinen hier. Bisher wurde noch keine erledigt. | Выполненные миссии появятся здесь. Пока не выполнено ни одной. |
| `history.unavailable` | This record cannot be shown right now. Your completed Missions are safe. Try again. | Diese Übersicht kann gerade nicht angezeigt werden. Deine erledigten Missionen sind sicher gespeichert. Versuche es noch einmal. | Этот список сейчас нельзя показать. Твои выполненные миссии сохранены. Попробуй ещё раз. |

No other string was added, and `result.missionUnavailable`, `result.completedOn`, `result.goal.heading`, `result.goal.progress`, `discovery.action.open` and `session.action.retry` are reused unchanged. Task 8 added no string of any kind: the refresh changes which month an existing label names, not the words it uses.

## Definition of complete

Scope items 1–8 implemented and verified, every mapped clause carried by a named assertion, the ergonomic review done with at most three targeted improvements, the changelog updated, and this plan's record written before it moves to `plans/completed/`.

That point has been reached for the work itself, and the plan is recorded as *Implemented and verified — ready for review*. It stays under `plans/active/` rather than moving to `plans/completed/`, because independent review has not happened yet and a status of complete would not be truthful until it has. The branch is pushed to `origin` and [pull request #5](https://github.com/Usman20u/MissionKid/pull/5) is open against `main`, under the authorization recorded under *Authorization basis* above. Review has since returned one correction inside Task 8 — the month that turns between the view's two clock readings on entry — which is recorded above and pushed to the same branch and the same pull request. The plan stays active for the review it is still under. Merge, deployment, force-push, branch deletion and repository-setting changes remain a separate decision this plan does not grant.
