# MissionKid Implementation Plan 03 — Mission Session and Completion (F003) with the Reward Card and Monthly Goal completion message (F004 slice)

**Date:** 2026-09-17
**Status:** Approved — Tasks 1 to 5 complete under the approved execution allocation clarification; Tasks 6–19 not started

This plan's scope and decisions are approved. Scope approval is not authorization to execute a task: each implementation task begins only when it is explicitly authorized. Tasks 1 to 5 were each explicitly authorized and are complete; no later task has begun.

The scope below plans `F003` in full, except the acceptance clauses explicitly deferred with the Mission History view, together with one deliberately bounded part of `F004`: the Reward Card and the Monthly Goal derivation and completion message that the card must display. That combined scope is approved as decision D1-A, with the History deferrals preserved exactly as documented. Every task below except Tasks 1 to 5 is pending implementation and verification; what those tasks actually changed is recorded in the implementation record at the end of this plan, and nothing else here is a claim about what the repository already does.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md). Its specification-completion gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, blocking implementation guessing `NO`, and the explicit `SPEC COMPLETE` declaration.

Two completed implementation plans define what already exists and where this plan starts:

- [`plans/completed/2026-09-03-implementation-foundation-f001.md`](../completed/2026-09-03-implementation-foundation-f001.md) — the application foundation and `F001` parent setup and localization.
- [`plans/completed/2026-09-07-implementation-discovery-f002.md`](../completed/2026-09-07-implementation-discovery-f002.md) — `F002` Mission discovery and selection, merged to `main` through pull request #3. It stops at one persisted Mission Session in `selected` plus a typed handoff, and it records two items carried to `F003`: the missing post-selection transition surface and the missing return-or-abandon control on an existing-session conflict.

No owning specification has changed since that `SPEC COMPLETE` basis was recorded, other than the authorized 2026-09-09 content and presentation change already revalidated inside Plan 02, so the material-change revalidation rule in `AGENTS.md` is not triggered by this plan. This plan changes no specification; it plans approved behavior from `F003` and from the named `F004` sections.

## Objective

Implement `F003 — Mission Session and Completion`: the lifecycle `selected → ready → active → completed`, the ready start screen and Mission Break transition, exactly-once deliberate start, timestamp-derived approximate countdown guidance, ready cancellation, confirmed abandonment, existing-session conflict resolution, restoration and recovery, and the durable exactly-once completion write with its immutable completion facts.

Implement, from `F004`, the presentation that a confirmed completion must reach: the Reward Card derived from the completed session, its recovery through `currentResultSessionId`, its safe display retry, the Monthly Goal progress derived from unique completed sessions and capped at 20, and the single deterministic goal-complete message at the twentieth valid completion of a period.

Nothing about recognition, progress, or history is persisted as its own record. The completed session remains the one durable source.

## Owning specifications

### `F003` — planned in full in this slice, except the clauses deferred below

- [`docs/specs/functions/003-mission-session-and-completion.md`](../../docs/specs/functions/003-mission-session-and-completion.md) — lifecycle, ready state, Mission Break, active state and timer, leaving and returning, completion and exactly-once behavior, cancellation and abandonment, refresh and recovery, safety and healthy engagement, error and edge states, acceptance criteria 1–21

### `F004` — the named sections planned in this slice

- [`docs/specs/functions/004-rewards-history-and-monthly-goal.md`](../../docs/specs/functions/004-rewards-history-and-monthly-goal.md) — shared completion rule; **Reward Card** behavior and boundaries; **Monthly Goal** target and counting, monthly period, and goal completion; the error and edge states that concern the Reward Card, duplicate completion, refresh, and monthly boundaries
- The same document's **Mission History** section is read as a constraint only: this plan must leave the completed sessions in the exact shape History will later derive from, and must not build the History view.

### Technical and presentation authority

- [`docs/specs/technical/data-and-state-model.md`](../../docs/specs/technical/data-and-state-model.md) — Mission Session fields, lifecycle, current and completed placement, timer state, Reward Card and Monthly Goal derivation, data invariants 1–20, validation and recovery decisions, record-level trust
- [`docs/specs/technical/technical-architecture.md`](../../docs/specs/technical/technical-architecture.md) — Mission Session and timer architecture, the five-step confirmed-write path, error and recovery strategy, recovery scenarios A–I, testing strategy
- [`docs/specs/visual-and-ergonomic.md`](../../docs/specs/visual-and-ergonomic.md) — approved view inventory, ready presentation, Mission Break and active presentation, restored and conflicting-session presentation, abandonment and completion presentation, Reward Card presentation, Monthly Goal presentation constraints, action hierarchy, confirmations, recovery presentation, ergonomic review method
- [`docs/specs/mission-catalog-and-safety.md`](../../docs/specs/mission-catalog-and-safety.md) — safety and adult-involvement meaning that the ready and active presentations must carry unweakened
- [`docs/user-stories.md`](../../docs/user-stories.md) — `P5`, `P7` goal-complete message half, and the child-facing session stories

## In scope

### `F003`

- Snapshot validation widened to the remaining lifecycle: a current session in `ready` or `active`, a completed-session collection, and a non-null `currentResultSessionId`, together with every consumer of that widened contract, in one atomic change.
- The durable `selected → ready` transition, which also resolves sessions written by the shipped `F002` build.
- The ready start screen: Mission identity, category, approximate duration, adult-involvement and safety guidance, away-from-screen expectation, Mission Break wording, one dominant **Start mission**, one secondary return to suggestions.
- Exactly-once deliberate start writing one immutable `startedAt`.
- Approximate countdown guidance derived from `startedAt`, `durationSecondsAtSelection`, wall clock and a monotonic anchor, including visibility return, refresh, zero, backward-clock and malformed-duration behavior.
- The active presentation, including the leave-the-screen instruction, the Mission reminder, calm timer guidance, **Mission done**, and the secondary leave-without-completion path.
- Ready cancellation, confirmed active abandonment, and existing-session conflict resolution.
- The exactly-once completion write as one atomic snapshot replacement, and the retry that is safe when a write landed but its confirmation did not.
- Truthful handling of both write-failure classes on every transition, including rehydration and identity-preserving retry.
- Restoration and recovery for every `F003` state, including unresolvable or safety-withdrawn Missions, duplicated or conflicting completed records, and an invalid current-result pointer.

### `F004` slice

- Direct transition from a confirmed completion to the Reward Card.
- The Reward Card content required by the specification: positive non-comparative recognition, the completed Mission title, its Mission Category, a localized completion context derived from `completedAt`, current Monthly Goal progress, and the approved short next step back to the core flow.
- Recovery of the same Reward Card through `currentResultSessionId` after refresh or reopening, applying no completion effect again.
- A safe display retry when the Reward Card cannot be shown after a confirmed completion.
- Monthly Goal progress derived from unique valid completed sessions for the Child Profile and the period identity fixed at completion, displayed as `X / 20 missions` and capped at 20.
- The one goal-complete message at the deterministic twentieth completion of a period, with no further prompt for the twenty-first and later completions.
- Leaving the completed-result flow clears only `currentResultSessionId`.

### Cross-cutting

- EN/DE/RU coverage, the accessibility and responsive baseline, and the ergonomic review for every implemented view and state.
- Automated and manual verification, audit, changelog, and clean commits.

## Explicitly out of scope

- The standalone **Mission History** view: its list, newest-first ordering, per-entry presentation, empty state, and route back to Mission Category Selection.
- A standalone **Monthly Goal** surface outside the Reward Card.
- Any navigation entry point to History, and any History-specific recovery presentation.
- Any separately persisted Reward Card, History entry, monthly counter, or goal-prompt record.
- New lifecycle states: no `paused`, `failed`, `expired`, `overtime`, `cancelled` or `abandoned` state; cancellation and abandonment stay outcomes.
- Notifications, service workers, background timers, device blocking, third-party app control, operating-system integration, or completion proof of any kind.
- Reopening the Mission catalog, Mission content, Mission scenes, the Task 5 visual system of Plan 02, or `F002` discovery behavior beyond the integration each task names.
- A router, backend, account system, authentication, analytics, runtime AI, new runtime dependency, or configuration change.
- A snapshot migration or a `snapshotVersion` change.
- Multi-tab coordination, cloud retry queues, or any second persistence mechanism.

## `F003` / `F004` boundary under this approved slice

`F003` owns session transitions and durable completion facts. `F004` owns recognition and progress derived from those facts. This slice takes the part of `F004` without which a confirmed completion has nowhere truthful to land. Every row below is prospective.

| Concern | Owner | This plan |
| --- | --- | --- |
| `completed` session record with immutable `completedAt` and `completionPeriodId` | `F003` | Planned in this slice |
| Clearing `currentSession` and setting `currentResultSessionId` atomically | `F003` | Planned in this slice |
| Exactly-once guarantee keyed by `sessionId` | `F003` | Planned in this slice |
| Reward Card content, its restoration and its display retry | `F004` | Planned in this slice |
| Monthly Goal raw count, capped display, period membership | `F004` | Planned in this slice |
| Goal-complete message at the deterministic twentieth completion | `F004` | Planned in this slice |
| Mission History view, ordering, entry presentation, empty state | `F004` | Deferred to the later History implementation |
| Standalone Monthly Goal surface | `F004` | Deferred to the later History implementation |

### Remaining `F004` work after this slice

Precisely these items remain for a later `F004` plan:

1. The Mission History view: selecting valid completed sessions for the Child Profile, ordering newest first by `completedAt` with `sessionId` as the deterministic tie-breaker, and showing only title, Mission Category and localized completion context.
2. The localized unavailable-title fallback where a completed session's Mission content no longer resolves, as it appears in History.
3. The History empty state and its route back to Mission Category Selection.
4. The navigation path that reaches History, and the calm retry presentation when a derived History view cannot be shown.
5. A standalone Monthly Goal presentation, if one is wanted beyond the progress shown on the Reward Card.

`F004` acceptance criteria 4 and 5 belong entirely to that later work, and criterion 1's History clause and criterion 8's History clause become visible only there.

### `F003` acceptance criteria 11, 12 and 14, clause by clause

Reassessed against this slice, separating durable completion effects from presentation. No clause is claimed satisfied by a typed handoff, and no clause is marked as already met: everything below is pending implementation and verification.

| Criterion and clause | Durable effect | Presentation | State under this plan |
| --- | --- | --- | --- |
| 11 — "it reaches `completed`" | Completion write, exactly once per `sessionId` | — | Planned in this slice |
| 11 — "one Reward Card is shown" | Completed session plus current-result pointer | Reward Card rendered from them | Planned in this slice |
| 11 — "one History entry is produced" | The unique completed session is the sole History source; uniqueness is enforced and tested here | The History list itself | **Split** — the durable half is planned in this slice; the visible entry is deferred to the later History implementation |
| 11 — "the completion is applied once under the Monthly Goal rules; displayed progress increases by one only while below `20 / 20`" | Immutable `completionPeriodId`; count derived from unique identifiers | Capped progress on the Reward Card | Planned in this slice |
| 12 — "the same completed result is returned" on repeat or refresh | Idempotent completion by `sessionId`; stable pointer | Same Reward Card re-derived | Planned in this slice |
| 12 — "no additional Reward Card" | No Reward Card is persisted at all | Re-derivation is pure | Planned in this slice |
| 12 — "no additional History entry" | No second completed session can be appended for the same identifier; asserted directly on the completed collection | The History list itself | **Split** — the no-duplicate guarantee is planned here; its appearance in a History view is deferred |
| 12 — "no additional Monthly Goal increment" | Count derives from unique identifiers, never from a counter | Same capped progress | Planned in this slice |
| 14 — Reward Card cannot be displayed after confirmed completion; retry shows the same card without changing History or Monthly Goal again | Completion stays recorded; pointer keeps resolving | Display retry over the same derivation | Planned in this slice |

The `F003` clause "After successful completion, MissionKid transitions directly to the Reward Card" is planned in this slice.

Because the History clauses of criteria 11 and 12 remain deferred, this plan must not claim full `F003` acceptance on completion. Its truthful claim is: every `F003` acceptance criterion is met except the two History-visible clauses named above, which remain with the later `F004` work.

## Recorded decisions

### D1-A — the combined scope (approved)

**Recorded.** One coherent slice of `F003` plus the `F004` Reward Card, its Monthly Goal derivation and the twentieth-completion message. The alternative considered earlier — stopping before completion and deferring it to a following plan — would ship a build in which an active Mission cannot be completed, and was not adopted.

D1-A crosses a function boundary deliberately and visibly: the title, objective, specification references, task sequence and acceptance mapping all name the `F004` scope. The documented History deferrals are preserved: the Mission History view, its empty state and route, the localized unavailable-title fallback as it appears in History, and any standalone Monthly Goal surface remain later `F004` work, and the History-visible clauses of `F003` criteria 11 and 12 remain deferred with them.

### D2 — Format of `completionPeriodId` (approved)

**Recorded.** `completionPeriodId` is `YYYY-MM`, derived from the normalized completion timestamp in the device's current local calendar context and fixed once at completion. The Data and State Model defines the concept — "the family's local calendar year and month containing `completedAt`" — without prescribing a representation, so this records the representation and nothing else. A later timezone or clock-context change does not reassign a session whose period identity was already fixed.

### D3 — Wording of the Mission Break transition and the Reward Card (approved)

**Recorded.** Exact EN/DE/RU wording stays delegated to implementation under the existing localization rules: reviewed English as the safe fallback, meaning-equivalent German and Russian, no language-specific text inside a view, and no reviewed Mission copy duplicated into the dictionaries. `F003` gives suggested English Mission Break wording; `F004` fixes the Reward Card's required content but not its exact sentences, and requires the goal-complete message to invite an optional, parent-approved real-life reward without promising one. Every added string is listed in its task record for human review, as `F002` did for its selection copy.

### D4-B — What a later write does when a completed record cannot be safely retained (approved)

**Recorded.** When hydration finds one or more completed records that are invalid, or conflicting copies sharing an identifier from which no deterministic valid record can be recovered, MissionKid refuses any snapshot-replacing write while that condition persists.

What the refusal means in practice:

- the stored snapshot is left exactly as it is; nothing is trimmed, rewritten, coalesced away or reordered in storage;
- the trustworthy completed facts that were read remain available for the approved read-only derivations, so recognition and progress that are already recorded can still be derived and displayed where an approved view supports it;
- no record is silently dropped from storage, no arbitrary copy of a conflicting pair is chosen as the survivor, and no invented record replaces either;
- a blocked transition is never reported as successful: the family is told, in the approved parent-facing recovery language, that the change could not be saved, and the existing retry path is offered;
- a retry is a fresh read: a later valid re-read that resolves the condition lets the write proceed normally, so the block is a state of the stored data, not a permanent verdict;
- reset stays an explicit parent decision behind its existing warning about exactly what it removes. It is never automatic and is never presented as the only possible outcome.

The refusal is narrow. It is triggered only by unresolved invalid or conflicting **completed** records, and it must not become a blanket refusal of every recoverable condition. These neighbouring cases keep their own already-specified behavior and do not block writes:

| Condition | Behavior, unchanged by D4-B |
| --- | --- |
| Identical duplicate copies of one completed session | Coalesce by stable identifier for derived views; counting is unaffected and writes continue |
| An invalid `currentResultSessionId` | Reject the pointer alone, preserve valid completed sessions, and repair or clear only that pointer through a validated write, as the Technical Architecture authorizes |
| An otherwise valid `active` session with a missing, non-finite, zero or negative `durationSecondsAtSelection` | Hydrate as `active`, show zero guidance, and keep deliberate completion and abandonment available and working; this alone never blocks a write |

Every other identity, profile, reference, lifecycle and timestamp check remains required exactly as specified; D4-B relaxes none of them.

**Scope of the mechanism.** This is a refusal inside the existing adapter and its existing recovery presentation. No quarantine channel, second storage key, migration, schema version change or other recovery infrastructure is introduced.

**On cause.** An unresolved conflicting record is a fact about stored data. This plan draws no conclusion about how it arose; tampering, a partial write and an unrelated storage fault are all consistent with the same observation, and none is claimed.

## Required technical boundaries

- `snapshotVersion` stays `1`. The remaining lifecycle values already belong to the declared snapshot shape, so this is a widening of accepted values inside an unchanged shape, exactly as Plan 02 widened `currentSession` to `selected`. No migration is written, and every snapshot produced by the `F001` and `F002` builds stays valid.
- Continue using the one namespaced key and the one persistence adapter. No feature module touches `window.localStorage`.
- Every state change follows the existing five-step confirmed-write path, and success is published only from the value read back.
- Persist only the Mission Session fields the Data and State Model names. Never persist localized Mission text, a live remaining-time counter, a Reward Card, a History list, a Monthly Goal counter, a goal-prompt record, completion proof, or timer ticks.
- The completion write is one snapshot replacement that changes `currentSession`, `completedSessions` and `currentResultSessionId` together; a partial update is not permitted.
- `completedAt` is the later of the current wall-clock reading and the structurally valid `startedAt`. `completionPeriodId` derives from that normalized timestamp.
- Reward Card, Monthly Goal progress and the goal-complete message are derived on read from validated completed sessions; recalculation, not repair, is the answer to a stale or invalid derived value.
- Timer display state is runtime only: derive from validated timestamps, anchor to a monotonic clock where available, and never let a backward wall-clock adjustment increase the visible remaining time.
- Clock and identifier access stay injectable, reusing the existing `WallClock` and `SessionIdFactory` boundaries in [`src/missionSession.ts`](../../src/missionSession.ts); a monotonic reader is injected the same way.
- Invalid or impossible stored lifecycle combinations are refused, never repaired, never auto-completed, and never counted. A malformed duration on an otherwise valid `active` session is not one of them: it degrades guidance to zero and must stay usable.
- No unsafe cast, no `any`, and no widening of a narrow contract merely to make a widened type compile.
- No new dependency, no configuration change, no secret, no runtime environment dependency.

## Two classes of write failure

The adapter's `unconfirmed` result covers two different situations, and every transition in this plan must treat them as different. Conflating them is how an interface ends up lying about durable state.

| Class | Adapter reasons | What is known about storage | Required treatment |
| --- | --- | --- | --- |
| **A — failed before storage changed** | `invalid-snapshot`, `serialization-failed`, `write-failed` | The replacement was never attempted, or the write itself threw; the previously stored value is what remains | Present the action as not carried out, keep the last truthful state, offer a retry |
| **B — write may have landed, confirmation did not** | `read-back-failed`, `read-back-invalid`, `read-back-mismatch` | Unknown from the failure alone: the new value may already be stored | Claim no success **and** claim no rollback; re-read durable state and present what it actually says; offer a retry that resolves by session identity |

Rules that follow, and that every affected task below inherits:

- Wording follows the evidence. In class B the durable outcome is unknown, so no message, state or test may assert that "nothing was saved", "nothing started", or "the session is still `active`"; the truthful statement is that the outcome could not be confirmed. In class A the failure is established before storage changed, so the interface may say plainly what that evidence supports — that the action was not carried out and the previous state stands.
- Recovery from class B is rehydration through the existing confirmed-write contract — re-read and validate the stored snapshot, then present the state it actually contains — not reconstruction of the state the interface remembers.
- A retry after class B uses the same `sessionId` and the durable facts already stored. It never mints a second identifier, never writes a second `startedAt` or `completedAt`, never removes a timestamp that may already be durable, and never rebuilds an earlier lifecycle state.
- Where rehydration shows the transition did land, the retry resolves that state and the flow continues from it; where it shows the transition did not land, the retry performs it once.
- Blind rollback is forbidden. Nothing in this plan writes a snapshot whose purpose is to undo a transition that may have succeeded.
- Both classes are tested separately for every transition that writes: `selected → ready`, start, completion, ready cancellation, and confirmed abandonment.

The same distinction governs presentation: a class-B state is a pending-or-recovering state, and the interface says that the result is not confirmed and shows the durable state once it has been re-read. It never shows recognition, unrecorded progress, or a started countdown before confirmation, and it never asserts the negative either. A class-A state names the outcome the evidence supports and offers the retry.

## Persistence: what lifecycle expansion actually requires

The shipped `F002` schema deliberately accepts no completed sessions: `completedSessions` is typed as an empty tuple and validation refuses any non-empty value, and `currentResultSessionId` must be `null`. No snapshot written by any shipped build can therefore contain a completed session, and no completion data exists today that could be lost. Whole-snapshot rejection also deletes nothing: the adapter leaves the stored entry untouched and surfaces corrupted or unsupported-version recovery.

The requirements below are consequences of *introducing* completed sessions, not repairs of an existing defect. They matter only once this plan makes completions possible, and they must be built in the same task that makes them possible.

**Hydration recovery** is governed by the record-level trust rules and is deliberately permissive about what can still be derived:

- a single impossible or conflicting completed record must not make the whole snapshot unreadable; valid completions around it are durable facts the specification requires to be preserved and recalculated from;
- identical duplicate copies of one completed session coalesce by stable identifier for derived views;
- conflicting copies that share an identifier do not count until one deterministic valid record can be recovered;
- an invalid `currentResultSessionId` is rejected alone, and valid completed sessions are preserved;
- an invalid age band leaves valid completed sessions intact;
- an otherwise valid `active` session whose `durationSecondsAtSelection` is missing, non-finite, zero or negative still hydrates as `active`, with guidance at zero and deliberate completion and abandonment available — so the schema's structural requirement for `active` is a valid `startedAt`, and a malformed duration degrades guidance instead of invalidating the session;
- exclusion is a read-time decision about what may be derived, never a silent deletion, and it never invents a completion, a timestamp or a period.

**Write confirmation** is strict and stays strict, and its strictness is not a contradiction of the above: recovery decides what can still be *read* from imperfect stored data, while confirmation decides whether what was *intended* to be written is exactly what is now stored. Two failure modes must not masquerade as success:

- a read-back whose parsing normalized, coalesced or excluded anything — the existing adapter already refuses a read-back parsed with `normalized` set, and every record-level exclusion must be reported the same way, so a dropped or coalesced completed session makes the write unconfirmed rather than silently equal;
- a read-back compared too shallowly — [`snapshotsMatch`](../../src/persistence.ts) compares `completedSessions` by length alone, which is exact only while the collection must be empty. Once completions exist, two different collections of equal length would compare as equal, so the comparison becomes field-by-field per session, keyed by identifier, in the same way the current session is already compared.

**What a later write does when a completed record cannot be safely retained** is decision **D4-B** above: the write is refused, the stored snapshot is left untouched, trustworthy completed facts stay available for approved read-only derivation, and the existing parent-facing recovery and retry path is offered until a later valid re-read resolves the condition. Preserving the raw entry during a read does not by itself decide this, because the next ordinary write replaces the whole snapshot.

## Type impact of widening `currentSession`

Widening `MissionKidSnapshot.currentSession` is not local to the persistence module. The current type is `SelectedMissionSession | null`, and the following consumers depend on that narrow contract today, which is why the schema change and its consumer adaptation are one task rather than two:

| Consumer | Dependency | Required work |
| --- | --- | --- |
| [`src/missionSession.ts`](../../src/missionSession.ts) — `MissionSelectionResult` | Declares `session: SelectedMissionSession` on its `created`, `resolved` and `conflict` results | The result contract must distinguish lifecycle states explicitly rather than continue to promise a `selected` session |
| [`src/missionSession.ts`](../../src/missionSession.ts) — `selectMission` | Reads `snapshot.currentSession` and returns it as `resolved` whenever `missionId` matches, regardless of state; publishes `result.snapshot.currentSession` as a created `SelectedMissionSession` | Narrow by `state` at both points: a created session is `selected` by construction, and an existing session must be routed by its own state |
| [`src/appState.tsx`](../../src/appState.tsx) — `currentSession` runtime field, `mission-selection-confirmed` payload, `selectCurrentSession`, `selectMissionStartAvailable` | All typed to `SelectedMissionSession` | Widen to the current-session union and add state-narrowing selectors so views ask for the state they render |
| [`src/MissionDiscovery.tsx`](../../src/MissionDiscovery.tsx) | Dispatches the confirmed session and reads the conflict's `missionId` | Route by the returned state; the conflict presentation gains its control in Task 7 |
| [`src/missionSession.test.ts`](../../src/missionSession.test.ts), [`src/persistence.test.ts`](../../src/persistence.test.ts), [`src/MissionDiscovery.test.tsx`](../../src/MissionDiscovery.test.tsx) | Build `SelectedMissionSession` fixtures and assert `selectCurrentSession(...)?.state` | Fixtures and assertions follow the new contracts without weakening any existing assertion |

The planned shape is one discriminated union on `state`: a shared set of immutable selection facts, `SelectedMissionSession` and `ReadyMissionSession` carrying no `startedAt`, `ActiveMissionSession` adding one, `CompletedMissionSession` adding `completedAt` and `completionPeriodId`, with `CurrentMissionSession` as the union of the first three. Narrowing is by discriminant, never by cast. Task 1 changes the contract and adapts every consumer in the same change, so the repository type-checks, tests and builds at the end of it.

## Minimal likely repository shape

Existing modules carry most of this work. The likely additions are:

- one session-lifecycle domain module extending [`src/missionSession.ts`](../../src/missionSession.ts) with the `ready`, `active` and `completed` transitions, or a sibling module if that file stops being readable;
- one timer-derivation module, pure and clock-injected;
- one completion-derivation module for Monthly Goal progress, period membership and the twentieth-completion identity;
- one ready view, one active view and one result view within the existing shallow shell;
- extensions to [`src/persistence.ts`](../../src/persistence.ts), [`src/appState.tsx`](../../src/appState.tsx), [`src/AppShell.tsx`](../../src/AppShell.tsx), [`src/localization.ts`](../../src/localization.ts) and [`src/styles.css`](../../src/styles.css);
- focused tests colocated with the existing suite.

No component library, state-management package, timer library, date library, design-token catalog, or duplicated configuration layer is introduced.

## Integration points in the shipped code

These are the exact places where this plan meets what `F002` already delivers. They are named so no task discovers them late.

| Shipped behavior | What this plan must do | Task |
| --- | --- | --- |
| [`selectAppView`](../../src/AppShell.tsx) resolves `discovery-categories` whenever a discovery cycle exists | A current `ready` or `active` session, and a valid current-result pointer, must take precedence over discovery in view selection | 2, 6, 10, 11 |
| [`selectMission`](../../src/missionSession.ts) returns `resolved` whenever the stored session carries the same `missionId`, regardless of its state | Choosing the Mission that is already `ready` or `active` must lead back to that session's own surface rather than re-publishing it as a fresh selection | 1, 2, 7 |
| [`selectMission`](../../src/missionSession.ts) returns a typed `conflict` for a different Mission, and the suggestion view states it politely with no control | The conflict becomes actionable: return to the current Mission, or confirm abandonment before a new selection | 7 |
| `mission-selection-confirmed` in [`appState.tsx`](../../src/appState.tsx) mirrors the confirmed session into runtime and clears the cycle's shown identifiers | The same reducer path continues into `ready`, so the runtime session and the durable session never disagree | 1, 2 |
| The shipped selection-unconfirmed message states that nothing has started | Re-read it against the two failure classes in Task 12: for a selection it remains literally true, and no new message may copy its shape into a claim about a start or a completion | 12 |
| The discovery gate refuses `degraded` and `blocked-recovery` states | The session and result views inherit the same gate: temporary in-memory mode claims no durable session, completion or progress | 11 |

## Execution allocation clarification (approved 2026-09-18)

Approved: each functional control is built by the task that implements the
operation it carries out. A presentation task builds the content, wording and
reading hierarchy of its view; the control that performs an operation, and the
action-hierarchy obligation that goes with it, belong to the task that makes that
operation work. Rendering a control whose operation is assigned to a later task
would put a no-op in the product, which `AGENTS.md` forbids as an unexplained
broken control.

| Control | Built by | Operation it performs |
| --- | --- | --- |
| Ready **Start mission** | Task 4 | Exactly-once deliberate start |
| Ready return to suggestions | Task 7 | Ready cancellation |
| Active leave-without-completion control and its confirmation | Task 7 | Confirmed abandonment |
| Active **Mission done** | Task 8 | Exactly-once completion write |

This is an execution-plan clarification only. It changes no approved product
behavior, no owning specification, no task, no task order and no final acceptance
requirement: all nineteen tasks remain, and every control, integration and
action-hierarchy verification obligation moved below is carried by its owning
task rather than dropped. The whole-plan completion requirements under
**Definition of Plan 03 complete** are unchanged and still require the ready
presentation to carry one dominant start action, and the active presentation to
carry **Mission done** and a secondary leave-without-completion path.

## Sequential implementation tasks

Each task states its outcome, specification trace, dependencies, likely files, and verification intent. Each is independently verifiable and must leave type checking, tests and the production build passing.

### Task 1 — Widen the persisted lifecycle and adapt every consumer of the contract

**Outcome.** One atomic change that expands the schema and carries it through the code that depends on it.

Schema and validation: snapshot validation accepts a current session in `selected`, `ready` or `active`, a completed-session collection of uniquely identified sessions in `completed`, and a `currentResultSessionId` that is either null or the identifier of exactly one valid completed session. `ready` requires no `startedAt`; `active` requires one structurally valid `startedAt` and no `completedAt`; `completed` requires `startedAt`, a `completedAt` not earlier than it, and one `completionPeriodId`. A current session and a current-result pointer cannot both be present. Every session identifier is unique across the current position and the completed collection. The lifecycle types form one discriminated union on `state`.

Recovery contracts: hydration validates completed sessions per record; identical duplicates coalesce by identifier for derived views; conflicting copies sharing an identifier are excluded from counting until a deterministic valid record can be recovered; an invalid pointer is rejected alone with valid completions preserved; an invalid age band leaves completions intact; an otherwise valid `active` session with a malformed duration hydrates as `active` for zero-guidance recovery. The stored entry is never rewritten or trimmed as a side effect of reading it. Under D4-B, an unresolved invalid or conflicting completed record refuses any snapshot-replacing write while it persists, leaving stored data untouched and the approved read-only derivations available, while identical duplicates, an invalid pointer and a malformed duration on an otherwise valid `active` session keep their own behavior and never block a write.

Confirmation: the read-back is compared field by field for the current session and for every completed session keyed by identifier, and any normalization, coalescing or exclusion during read-back parsing makes the write unconfirmed.

Consumer adaptation, in the same change: `MissionSelectionResult` distinguishes a created `selected` session, an existing session routed by its own lifecycle state, and a conflict; `selectMission` narrows by discriminant where it reads a stored session and where it publishes a created one, and refuses to treat a `ready` or `active` session as a repeatable selection; application state holds the current-session union with state-narrowing selectors; the Discovery consumers route by the returned state; existing fixtures and assertions follow the new contracts without weakening. No cast, no `any`, no contract widened merely to compile. `snapshotVersion` stays `1` with no migration, and snapshots written by the `F001` and `F002` builds stay valid.

This task adds no ready, active or result presentation and no later lifecycle operation; those belong to Tasks 2 onward.

**Specification trace.** Data and State Model — Mission Session conceptual fields, current and completed placement, timer state and invariant 13, data invariants 7–12, 14, 16, 18, 19, record-level trust; Technical Architecture — failure, validation and schema versions, the five-step confirmed-write path, error and recovery strategy; `F003` lifecycle and the existing-active-session rule.

**Dependencies.** None. Decisions D1-A, D2, D3 and D4-B are recorded.

**Likely files.** `src/persistence.ts`, `src/persistence.test.ts`, `src/missionSession.ts`, `src/missionSession.test.ts`, `src/appState.tsx`, `src/MissionDiscovery.tsx`, `src/MissionDiscovery.test.tsx`.

**Verification intent.** Unit-test each accepted shape and each refusal independently: `ready` carrying `startedAt`; `active` without it; `active` carrying `completedAt`; `completed` with `completedAt` earlier than `startedAt`; a missing or malformed `completionPeriodId`; a duplicate identifier across current and completed; a pointer with no matching completed session; a pointer present together with a current session; an unknown lifecycle value. Test the recovery contracts directly: identical duplicates coalesce; conflicting copies are excluded from counting while the rest of the snapshot survives; an invalid pointer is rejected alone; an invalid age band leaves completions intact; an `active` session with a malformed duration hydrates as `active`. Test that the stored entry is not rewritten by any read, and assert D4-B explicitly: with an unresolved invalid or conflicting completed record present, a snapshot-replacing write is refused, the stored value is byte-unchanged afterwards, the refusal is reported through the existing parent-facing recovery rather than as success, the trustworthy completed facts remain derivable, and a later read in which the condition is absent lets the same write succeed. Assert equally that an identical duplicate, an invalid pointer and a malformed duration on an otherwise valid `active` session each leave writes working. Test that a read-back differing in any single field of any completed session, missing a record that was intended to be written, or parsed with any exclusion or coalescing, is unconfirmed rather than confirmed. Confirm an existing `selected`-only snapshot from the shipped build still hydrates unchanged and that no migration path exists. Test that choosing the Mission of a stored `ready` or `active` session returns the routed result rather than `resolved`-as-selected, that choosing a different Mission still returns a conflict before any write, and that every `F002` behavior already covered by tests keeps passing. Type checking passes with no suppression.

### Task 2 — Confirmed `selected → ready` transition and restoration

**Outcome.** A confirmed selection continues to `ready` without another family decision, through the confirmed-write path, and the chosen Mission stays identifiable while the transition resolves. A stored `selected` session — including one written by the shipped `F002` build — advances to `ready` on load rather than being restored into discovery. A refresh in `ready` restores the same Mission in `ready` with no countdown. Focus moves deliberately to the ready view's heading, and the discovery cycle ends as `F002` already records.

Both write-failure classes are handled truthfully. A class-A failure leaves the previously stored session as it was and the interface says the transition was not carried out. A class-B failure claims neither success nor rollback: the application re-reads durable state and presents what it finds — the session already in `ready`, or still in `selected` — and the retry advances the same `sessionId` once if it has not advanced, or resolves it if it has. No path reconstructs an earlier lifecycle state or mints another identifier.

**Specification trace.** `F003` lifecycle and acceptance criteria 1 and 8, error and edge state "Mission details cannot be shown before start"; Data and State Model record-level trust for a valid current `selected` session; Visual and Ergonomic — selection transition / `selected` row, restored-session presentation, selection/start transition failure row; Technical Architecture — refresh behavior and the five-step path.

**Dependencies.** Task 1.

**Likely files.** `src/missionSession.ts`, `src/missionSession.test.ts`, `src/appState.tsx`, `src/AppShell.tsx`, `src/MissionDiscovery.tsx`, ready view module, `src/localization.ts`, `src/styles.css`, view tests.

**Verification intent.** Test that a confirmed selection reaches a persisted `ready` session with unchanged immutable facts and no `startedAt`; that a hydrated `selected` session advances exactly once; that a refresh in `ready` restores the same session. Test the two failure classes separately: with a write that throws, the stored session is unchanged and the interface offers a retry without claiming a transition; with a write that lands under a failing read-back, the interface claims neither success nor rollback, rehydration shows the durable `ready` session, and the retry resolves that same session rather than writing a second transition or a new identifier. Test that the chosen Mission is identifiable in the resulting view, which closes the gap Plan 02 recorded.

### Task 3 — Ready start screen, safety guidance and Mission Break wording

**Outcome.** The ready view answers, without extra navigation, what the Mission is, what the family will do, its Mission Category, what is needed, its approximate duration, whether an adult must be nearby or take part, any essential safety guidance, and that the Mission has not started. Mission Break wording introduces the brief transition to the real-life Mission in all three languages without implying device blocking, app control, monitoring or enforcement. The view's reading hierarchy leaves room for the one dominant **Start mission** action Task 4 builds and the secondary return to suggestions Task 7 builds, and adds neither itself. Nothing animates, counts down or auto-progresses.

**Specification trace.** `F003` ready state and mission start screen, Mission Break, acceptance criteria 2, 3, 19; Visual and Ergonomic — ready presentation, Mission Break transition, action hierarchy, safety and adult-involvement presentation; Mission Catalog and Safety — unweakened safety and adult-involvement meaning.

**Dependencies.** Task 2.

**Likely files.** ready view module and its test, `src/localization.ts`, `src/localization.test.ts`, `src/styles.css`.

**Verification intent.** Test that every required element renders in EN, DE and RU from catalog content in the selected language; that required safety and adult-involvement wording appears in words before any start is possible; that no countdown, timer element, reward preview, recommendation or extra choice appears; that no control stands in for an operation this task does not implement; and that Mission Break wording makes no blocking, control, monitoring or enforcement claim. The action-hierarchy obligation — exactly one dominant primary action on the ready view — is verified by Task 4 with the action it builds.

### Task 4 — Exactly-once deliberate start

**Outcome.** The ready view gains **Start mission** as its one visually dominant action, and it performs one confirmed transition from `ready` to `active`, writing one immutable `startedAt` from the injected clock. Repeated input — double press, rapid keyboard activation, or a retry after an interrupted confirmation — resolves the same active session without a second session, a second identifier, a moved `startedAt` or a restarted countdown.

Failure handling distinguishes the two classes. Class A: nothing was written, the session is still `ready`, the interface says the Mission has not started and offers a retry. Class B: the interface claims neither a start nor the absence of one; it re-reads durable state and presents what is there. If the stored session is already `active`, the same session and its existing `startedAt` are adopted as they are — never removed, rewritten or replaced with a later reading — and the countdown derives from that stored timestamp. If the stored session is still `ready`, the retry starts it once.

**Specification trace.** `F003` active state and timer items 1–2, error and edge state "Start action is submitted more than once", acceptance criteria 3 and 4; Data and State Model invariant 11; Technical Architecture — deliberate start and the five-step path; Visual and Ergonomic — selection/start transition failure row.

**Dependencies.** Tasks 1–3.

**Likely files.** `src/missionSession.ts`, `src/missionSession.test.ts`, `src/appState.tsx`, ready view, `src/localization.ts`.

**Verification intent.** Test that the ready view offers exactly one dominant primary action and that it is **Start mission**, and that no startable action is offered for a Mission whose content does not resolve to reviewed, safe wording. Test with injected clock and identifier that one start writes one `startedAt`; that a second activation resolves the same session, consumes no identifier and moves no timestamp. Test class A: a throwing write leaves the stored session in `ready` with no `startedAt`, and the interface claims no start. Test class B separately: a write that lands under a failing read-back leaves a durable `active` session with its original `startedAt`; the interface claims no unverified success and no rollback; rehydration presents the active session; and the retry resolves it with the same identifier and the same `startedAt`, starting no second countdown. Assert explicitly that no path deletes a `startedAt` that may already be durable.

### Task 5 — Timer derivation

**Outcome.** A pure derivation turns `startedAt`, `durationSecondsAtSelection` and clock readings into bounded remaining guidance: clamped between zero and the full duration, anchored to a monotonic reading for live ticks so a backward wall-clock adjustment cannot make the display increase, recalculated on load, refresh and visibility or focus return, and never persisted. Zero is a resting state: the session stays `active`, no overtime accrues, nothing fails or auto-completes. A missing, non-finite, zero or negative duration, or a wall-clock reading earlier than a valid `startedAt`, shows zero while completion and abandonment stay available.

**Specification trace.** Technical Architecture — Mission Session and timer architecture; Data and State Model — timer state and invariant 13; `F003` active state and timer items 6–7 and acceptance criteria 7, 9, 10.

**Dependencies.** Task 4.

**Likely files.** timer module and its test, `src/appState.tsx`.

**Verification intent.** Unit-test the derivation as a pure function over injected wall and monotonic readings: mid-session values, exact zero, elapsed-while-hidden, backward wall clock, malformed duration, and clamping at both ends. Test that no tick is persisted, that visibility return recalculates from timestamps rather than from a counter, and that the function is total — every input yields a typed result rather than a throw. The malformed-duration and backward-clock cases are proven end to end in Task 11 from a seeded snapshot, because a pure-function test alone does not show that hydration admits such a session.

### Task 6 — Active presentation

**Outcome.** The active view leads with the instruction to leave the screen and do the Mission, keeps the Mission identity and action reminder, keeps applicable adult-involvement and safety guidance readable, and shows calm approximate time guidance as supporting information. Its reading hierarchy leaves room for the **Mission done** action Task 8 builds and the secondary leave-without-completion path Task 7 builds, and adds neither itself. It requires no interaction while the Mission happens, asks for no proof, and adds no game, score, achievement, recommendation or repeated prompt. At zero the wording becomes neutral guidance without urgency.

**Specification trace.** `F003` active state and timer items 3–5, leaving and returning, safety and healthy engagement; Visual and Ergonomic — Mission Break transition and active presentation, action hierarchy, motion and feedback, anti-manipulation rules.

**Dependencies.** Task 5.

**Likely files.** active view module and its test, `src/localization.ts`, `src/localization.test.ts`, `src/styles.css`, `src/AppShell.tsx`.

**Verification intent.** Test in EN, DE and RU that the leave-the-screen instruction, Mission reminder, safety wording and approximate guidance are present, and that no control stands in for an operation this task does not implement; the presence and prominence of **Mission done** and of the leave-without-completion path are verified by Tasks 8 and 7 with the actions they build. that the timer is not the visual centerpiece and uses no urgency, alarm, overtime or failure styling; that zero reads as neutral guidance with the session still active; that nothing requests proof or interaction; and that the view is stable when left alone.

### Task 7 — Ready cancellation, confirmed abandonment, and conflict resolution

**Outcome.** This task builds the secondary return to suggestions on the ready view and the secondary leave-without-completion control and its confirmation on the active view, each with the operation it performs. From `ready`, the family can return to the three suggestions; the unstarted selection ends with no timer, completion, or downstream effect, and the current session is cleared through a confirmed write. From `active`, leaving through MissionKid requires an explicit confirmation that states the consequence, makes **Keep going** easy and **Leave mission** explicit, and on confirmation clears the current session with no completion, recognition, progress, penalty or shame. Ordinary hiding, closing or navigation is never treated as abandonment. An existing-session conflict — including the one `F002` currently surfaces without a control — presents the current Mission and the approved choice to return to it or confirm abandonment before another Mission can be selected.

Both exits are writes, so both failure classes apply. Class A leaves the session exactly as it was and says the exit was not carried out. Class B claims neither that the Mission was left nor that it was kept: durable state is re-read, and whichever it shows — the session cleared or still present — is what the interface presents. A retry after class B is safe because clearing the same `sessionId` twice is the same outcome; no path recreates a session that may already be gone or writes a completion.

**Specification trace.** `F003` cancellation and abandonment, error and edge states for an active Mission and another Mission requested, acceptance criteria 15, 16, 17, 18; Data and State Model — lifecycle outcomes and invariant 9; Visual and Ergonomic — confirmed abandonment presentation, confirmations, conflicting-session presentation.

**Dependencies.** Tasks 2, 4, 6.

**Likely files.** `src/missionSession.ts`, `src/missionSession.test.ts`, `src/appState.tsx`, ready and active views, `src/MissionSuggestionSet.tsx`, `src/MissionDiscovery.tsx`, `src/localization.ts`, `src/styles.css`, view tests.

**Verification intent.** Test that each exit is present as a secondary action beside the dominant action of its view, never competing with it. Test that cancellation from `ready` clears the session and produces no completed record, pointer or progress source; that abandonment requires confirmation and that cancelling the confirmation changes nothing; that confirmed abandonment clears the session and writes no completion; that hiding or navigating away leaves the session intact; and that a conflict offers return or confirmed abandonment and blocks a second session until resolved. Test both failure classes for both exits: a throwing write leaves the session present and claims no exit; a landed write with a failing read-back leads to rehydration showing the cleared session, with the interface claiming neither outcome before that read and the retry producing no duplicate effect.

### Task 8 — Exactly-once completion write

**Outcome.** The active view gains **Mission done** as its one dominant action, and it performs one atomic snapshot replacement: the same session moves into the completed collection with `state: 'completed'`, `completedAt` normalized to the later of the current wall-clock reading and `startedAt`, and its immutable `completionPeriodId`; `currentSession` is cleared; `currentResultSessionId` points at that completed session. Completion is keyed by `sessionId`: a repeat, a refresh, or a retry after an interrupted confirmation resolves the existing completed session rather than appending another. Completion works identically before and after zero.

Failure handling distinguishes the two classes. Class A: nothing was written, the session remains the stored `active` one, no recognition or progress is shown, and the retry completes it once. Class B: the interface claims no success and equally claims no failure of the underlying write; it re-reads durable state. If the completion landed, the same completed session, its `completedAt` and its `completionPeriodId` are adopted unchanged and the flow continues to the Reward Card; the retry resolves that completion and never appends a second record, moves a timestamp, or recomputes a period. If it did not land, the retry completes the active session once. No path deletes a completion that may already be durable or reconstructs the `active` state over it.

**Specification trace.** `F003` completion and exactly-once behavior, error and edge states for repeated and interrupted completion, acceptance criteria 6, 11, 12, 13; `F004` shared completion rule; Data and State Model — current and completed placement, invariants 8, 11, 12, 14, 18; Technical Architecture — completion step, the five-step path, and the completion-storage-failure row; Visual and Ergonomic — completion pending presentation.

**Dependencies.** Tasks 1–7.

**Likely files.** `src/missionSession.ts`, `src/missionSession.test.ts`, `src/persistence.ts`, `src/persistence.test.ts`, `src/appState.tsx`, active view, `src/localization.ts`.

**Verification intent.** Test that the active view offers **Mission done** as its one dominant action beside the secondary exit Task 7 built. Test that one completion produces exactly one completed record, a cleared current session and a matching pointer in one write; that `completedAt` is never earlier than `startedAt` under a backward clock; that `completionPeriodId` matches the local calendar month of the normalized timestamp; that a second **Mission done** and a refresh both resolve the same completed session. Test the two failure classes separately. Class A: a throwing write leaves the stored session `active`, shows no recognition or progress, and the retry completes it once. Class B: a write that lands under a failing read-back leaves a durable completed session; the interface shows no unverified success and asserts no rollback; rehydration presents the completed result; and the retry resolves that same completion with no second record, no moved `completedAt`, no changed period and no recreated `active` session. Assert explicitly that no path removes a completion that may already be durable.

### Task 9 — Monthly Goal derivation

**Outcome.** A pure derivation over validated completed sessions produces, for one Child Profile and one period identity, the raw count of unique completed session identifiers, the displayed progress capped at 20, whether the goal is complete, and the deterministic identity of the twentieth completion — ordered by `completedAt` with `sessionId` as the exact tie-breaker. A period with no completions derives `0 / 20`. Completions after the twentieth change neither the display nor the prompt identity. Identical duplicate copies coalesce and count once; conflicting copies sharing an identifier do not count. Nothing is persisted: no counter, no prompt record, no cached progress.

**Specification trace.** `F004` Monthly Goal target and counting, monthly period, goal completion, acceptance criteria 7 and 8; Data and State Model — Monthly Goal period and count, one goal-complete prompt, record-level trust for duplicated identifiers, invariants 16 and 17; Technical Architecture — Monthly Goal step and recovery scenario I.

**Dependencies.** Task 8.

**Likely files.** completion-derivation module and its test.

**Verification intent.** Unit-test counting over unique identifiers including identical duplicates and conflicting copies; the cap at 20; a fresh period at `0 / 20`; the deterministic twentieth completion under equal `completedAt` values; that the twenty-first completion produces no new prompt identity; that a session from another profile or another period does not count; and that the derivation is pure and mutates nothing.

### Task 10 — Reward Card presentation, restoration and display retry

**Outcome.** A confirmed completion transitions directly to the Reward Card. The card derives everything it shows from the completed session and the static catalog: positive non-comparative recognition, the completed Mission title in the current language, its Mission Category, a localized completion context from `completedAt`, current Monthly Goal progress, and — only at the deterministic twentieth completion of that period — the one encouraging message inviting an optional, parent-approved real-life reward. A short approved next step returns to the core flow, and leaving clears only `currentResultSessionId`. Refreshing or reopening resolves the same card through the pointer with no completion effect repeated. If the card cannot be shown, completion remains recorded and a retry displays the same recognition without changing anything.

**Specification trace.** `F004` Reward Card behavior and boundaries, shared completion rule, goal completion, acceptance criteria 1, 2, 3, 9, 10; `F003` completion transition and acceptance criteria 11, 12, 14; Data and State Model — Reward Card derivation and invariants 14, 15, 18; Visual and Ergonomic — Reward Card presentation and restored-result presentation.

**Dependencies.** Tasks 8–9.

**Likely files.** result view module and its test, `src/appState.tsx`, `src/AppShell.tsx`, `src/localization.ts`, `src/localization.test.ts`, `src/styles.css`.

**Verification intent.** Test that the card renders every required element in EN, DE and RU; that it derives from the completed session rather than from any persisted card; that a refresh with a valid pointer shows the same card and adds no completion, record or increment; that a display failure keeps completion recorded and the retry shows the same card; that the goal-complete message appears only for the twentieth completion and never for the twenty-first; that leaving clears only the pointer, through a validated write, without touching completed sessions; and that no reveal, rarity, currency, purchase, prize guarantee, comparison or pressure-to-continue behavior exists.

### Task 11 — Restoration and recovery across every implemented state

**Outcome.** Every restoration path behaves truthfully, proven from seeded snapshots through the application flow rather than at unit level alone: `ready` returns as `ready`; `active` returns with recovered bounded guidance and no restart; an `active` session with a malformed duration or a backward clock returns as `active` with zero guidance and both **Mission done** and deliberate abandonment reachable; a valid current-result pointer resolves the same Reward Card without repeating effects; an invalid pointer is rejected alone while valid completed sessions are preserved and no card is fabricated; identical duplicate completions coalesce for derived views and conflicting copies do not count. A current session whose Mission no longer resolves to reviewed, safe content is neither started, completed, substituted nor counted; it offers calm retry or an explicit return without completion. A completed session whose Mission content no longer resolves keeps its completion and its Monthly Goal membership. Corrupted and unsupported-version snapshots keep the existing untouched-and-explain behavior. Temporary in-memory mode makes no durable session, completion or progress claim. An unresolved invalid or conflicting completed record refuses the next snapshot-replacing write under D4-B, leaves the stored snapshot untouched, keeps approved read-only derivation available, and offers the existing parent-facing recovery and retry rather than an automatic reset.

**Specification trace.** `F003` refresh and recovery behavior, error and edge states; `F004` error and edge states for the Reward Card and progress; Data and State Model — record-level trust and snapshot trust tables, invariant 13; Technical Architecture — error and recovery strategy and recovery scenarios C, D, E, G, H, I.

**Dependencies.** Tasks 1–10.

**Likely files.** `src/appState.tsx`, `src/persistence.ts`, `src/AppShell.tsx`, `src/Recovery.test.tsx`, view tests.

**Verification intent.** Drive each path from a seeded snapshot through the rendered application: `ready`; `active` mid-duration; `active` with the duration elapsed while hidden; `active` with a backward clock; `active` with a malformed duration, asserting zero guidance and that completion and abandonment are reachable and work; a valid pointer; an invalid pointer with completions preserved; identical duplicate completions; conflicting copies; an unresolvable Mission on a current session; an unresolvable Mission on a completed session; a corrupted snapshot; an unsupported version; temporary mode. Assert D4-B for a write attempted while an unresolved record is present, and assert that the same write succeeds once a valid re-read no longer finds the condition. Confirm that no path auto-completes, invents a state, restarts a countdown, fabricates a Reward Card, displays fabricated or unconfirmed progress, resets without an explicit parent decision, or silently deletes stored data — and, equally, that validated recorded progress still appears wherever the approved view shows it.

### Task 12 — EN/DE/RU completeness

**Outcome.** Every interface message the new views resolve exists and is complete in English, German and Russian, with lifecycle actions, safety meaning, away-from-screen guidance, cancellation consequences, timer guidance, recognition wording, progress wording and error wording preserving the same behavior in each language. Unconfirmed-outcome wording follows the two-class rule: where the durable outcome is unknown, the message states that the result could not be confirmed and asserts no durable negative such as a Mission not having started or a completion not having been recorded; where a pre-write failure is established, the message may say that the action was not carried out and that the previous state stands. The shipped `F002` selection-unconfirmed wording is re-read against that rule and left unchanged if it remains truthful for a selection. Localized completion context uses the selected language. No view holds language-specific text, no reviewed Mission copy is duplicated into the dictionaries, and no raw key can reach the family.

**Specification trace.** `F003` acceptance criterion 20 and the error and edge states for interrupted confirmation; `F004` error and edge state for language change; Technical Architecture — localization architecture; Visual and Ergonomic — localization resilience and recovery presentation.

**Dependencies.** Tasks 3, 6, 7, 10.

**Likely files.** `src/localization.ts`, `src/localization.test.ts`.

**Verification intent.** Assert identical key sets across the three dictionaries, no empty or placeholder value, no unused key, and that every message the new views ask for resolves in all three languages. Assert that no string used for an unknown-outcome state claims a durable negative, and that the strings used for an established pre-write failure say only what that evidence supports. Confirm that changing language changes labels and localized dates only, never stored completion meaning, ordering or counts. List the added strings in the task record for human review.

### Task 13 — Accessibility and responsive baseline

**Outcome.** Every implemented view and state meets the approved baseline: a sensible heading structure, real controls with clear accessible names, deliberate focus movement on lifecycle changes, an accessible confirmation for abandonment, live-region treatment matched to each state's severity, visible focus, comfortable touch targets, sufficient contrast, reduced-motion respect, and no meaning carried by color alone. Layouts hold at narrow and wide widths and at enlarged text in all three languages.

**Specification trace.** Visual and Ergonomic — accessibility baseline, responsive presentation, motion and feedback; Technical Architecture — accessibility and responsive baseline.

**Dependencies.** Tasks 3, 6, 7, 10, 11.

**Likely files.** `src/styles.css`, view modules, `src/Accessibility.test.tsx`, view tests.

**Verification intent.** Test heading structure, control names and roles, focus movement on `ready`, on start, on the abandonment confirmation, on an unconfirmed-outcome state and on reaching the Reward Card; keyboard operability including repeated activation; and the reduced-motion contract. Record the widths, text scales and languages actually checked.

### Task 14 — Automated acceptance coverage

**Outcome.** Each `F003` acceptance criterion and each in-slice `F004` acceptance criterion has an explicit contract-level automated assertion, except the deferred clauses, which are recorded as deferred rather than asserted through a handoff. Added tests are shown to fail against the defect they claim to protect.

**Specification trace.** `F003` acceptance criteria 1–21; `F004` acceptance criteria 1, 2, 3, 7, 8, 9, 10; Technical Architecture — testing strategy.

**Dependencies.** All implementation tasks that precede it.

**Likely files.** existing test files.

**Verification intent.** Build the criterion-to-test matrix before editing, add only the missing assertions, demonstrate each new test failing against an intentional defect, and record any behaviorally equivalent mutation. Record the History-visible clauses of `F003` criteria 11 and 12 as deferred to the later History implementation, together with the `F004` criteria that belong to it, and state that `F003` acceptance is therefore complete except those clauses.

### Task 15 — Manual product-flow verification

**Outcome.** The built production application is exercised by hand across the lifecycle: selection to ready, refresh in ready, start, leaving and returning, elapsed-while-hidden restoration, zero, completion, the Reward Card, refresh on the Reward Card, a failed card display and its retry, an interrupted completion confirmation and its retry, ready cancellation, confirmed abandonment, conflict resolution, a twentieth completion and a twenty-first, and the recovery paths — in EN, DE and RU at a narrow and a wide viewport. Results are recorded exactly, including which browser and viewports ran and what was not tested.

**Specification trace.** Technical Architecture — manual release checks; `AGENTS.md` honest reporting.

**Dependencies.** Tasks 1–14.

**Likely files.** none; the plan records the results.

**Verification intent.** Report only what ran. Claim no browser, assistive technology or viewport that was not exercised, and record any state that is unreachable in a production build rather than staging a fabricated version of it.

### Task 16 — Ergonomic review

**Outcome.** The review method in the visual specification is applied to every implemented view and state, and one to three justified improvements are implemented and verified. Broad redesign is out of scope.

**Specification trace.** Visual and Ergonomic — ergonomic review method; `AGENTS.md` implementation quality.

**Dependencies.** Tasks 1–15.

**Likely files.** whichever views the justified improvements touch, plus their tests.

**Verification intent.** Record every state reviewed, the questions answered, what changed and what was deliberately left alone with its reason. Re-run affected tests.

### Task 17 — Implementation audit

**Outcome.** The whole plan diff is audited against the owning specifications: lifecycle invariants, one adapter and one snapshot, `snapshotVersion` unchanged, no persisted derived value, exactly-once start and completion, truthful handling of both write-failure classes, non-destructive recovery, derived-only recognition and progress, data minimization, absence of the deferred `F004` work, no unrelated code, no secret, no new dependency. Only real blockers are corrected.

**Specification trace.** `AGENTS.md` implementation quality; all owning specifications above.

**Dependencies.** Tasks 1–16.

**Likely files.** audit findings only, with targeted corrections where a real blocker exists.

**Verification intent.** Evidence-backed audit with re-run checks after any correction; no rewriting of correct work for style.

### Task 18 — Changelog

**Outcome.** The dated changelog records only what actually happened in this plan, names the `F004` scope that was implemented and the `F004` work that remains, states which acceptance clauses remain deferred, and claims no full `F003` acceptance while they are, no MVP completion, and no push, pull request or merge.

**Specification trace.** `AGENTS.md` Git and changelog discipline.

**Dependencies.** Tasks 1–17.

**Likely files.** `changelog/2026-08-17.md`.

**Verification intent.** Compare the entry with the actual diff and recorded results; no shell-command diary, no conversational material, no parallel status authority.

### Task 19 — Final diff, checks and clean-commit readiness gate

**Outcome.** Clean install, type check, tests, production build, diff check, repository review, and secret and personal-data scan all pass; the diff matches the audited work; no blocker remains. Moving this plan to `plans/completed/`, pushing, opening a pull request and merging each require their own explicit authorization.

**Specification trace.** `AGENTS.md` plan discipline, implementation quality, Git and changelog discipline, repository hygiene.

**Dependencies.** Tasks 1–18.

**Likely files.** none beyond this plan.

**Verification intent.** Run every relevant check from a clean tree and report results exactly.

## Git discipline

One focused branch, `feat/implementation-session-f003`; this plan as the sole active plan once approved; focused commits whose subjects match their content; a staged-diff review before each meaningful commit; no attribution trailers or AI metadata in repository material. Push, pull request and merge require explicit authorization for the current work. This plan moves to `plans/completed/` only when its status is truthfully complete.

## Specification-change rule during implementation

If implementation exposes a missing or conflicting requirement, stop the affected work, do not invent behavior, update the owning specification first, and follow the material-change revalidation rule in `AGENTS.md` before resuming. Ordinary implementation choices already delegated by the approved specifications and this plan do not require specification edits.

## Definition of Plan 03 complete

Plan 03 is complete only when all of the following are true:

- the persisted lifecycle accepts exactly `selected`, `ready`, `active` and `completed` in their approved positions, with `snapshotVersion` unchanged and no migration, and every consumer of that contract states what it accepts and returns with no cast or suppression;
- hydration preserves valid completed sessions under the record-level trust rules, coalesces identical duplicates, excludes conflicting copies from counting, rejects an invalid pointer alone, admits an `active` session with a malformed duration for zero-guidance recovery, and never rewrites stored data as a side effect of reading it;
- an unresolved invalid or conflicting completed record refuses snapshot-replacing writes under D4-B while leaving the stored snapshot untouched, keeping approved read-only derivation available, and offering parent-facing recovery and retry rather than an automatic reset, while identical duplicates, an invalid pointer and a malformed duration on an otherwise valid `active` session never block a write;
- write confirmation refuses any read-back that differs from the intended snapshot, including one whose parsing normalized, coalesced or excluded anything;
- every transition distinguishes a failure before storage changed from an interrupted confirmation, claims neither unverified success nor unverified rollback, rehydrates durable state, and retries by session identity without minting an identifier, removing a durable timestamp, or reconstructing an earlier lifecycle state;
- a confirmed selection reaches an identifiable `ready` Mission, and a stored `selected` session advances exactly once;
- the ready presentation carries Mission identity, category, duration, adult-involvement and safety guidance, the away-from-screen expectation and Mission Break wording, with one dominant start action;
- start is deliberate, writes one immutable `startedAt`, and cannot be repeated into a second session or a restarted countdown;
- timer guidance is derived, bounded, monotonic-anchored, recalculated on return, and truthful at zero, under clock anomalies and under a malformed duration, proven from seeded snapshots through the application flow;
- ready cancellation, confirmed abandonment and conflict resolution end flows without completion, recognition, progress, penalty or shame;
- completion is exactly once per `sessionId`, atomic across the three snapshot sections, safe under an interrupted confirmation, and never claimed before confirmation;
- a confirmed completion reaches the Reward Card, the same card recovers through `currentResultSessionId`, a display failure retries safely, and leaving clears only the pointer;
- Monthly Goal progress derives from unique completed sessions and their fixed period identities, caps at 20, and produces exactly one goal-complete message at the deterministic twentieth completion;
- no Reward Card, History entry, monthly counter or goal-prompt record is persisted;
- every restoration and recovery path is truthful and invents nothing;
- EN/DE/RU coverage is complete, no unconfirmed-outcome string claims a durable negative, and the accessibility and responsive baseline covers every implemented view;
- applicable automated tests, type checking and the production build pass;
- manual verification and the ergonomic review are complete and reported accurately;
- the audit passes with no blocker, and the changelog records only factual work, naming the remaining `F004` work and the deferred acceptance clauses;
- no unrelated code, speculative infrastructure, new dependency, secret or personal data exists; and
- focused clean commits exist and the branch is ready for an explicitly authorized push, pull request and merge.

Plan 03 completion is not MissionKid MVP completion, and it is not full `F003` acceptance: the History-visible clauses of `F003` criteria 11 and 12, the Mission History view, its empty state and route, the localized unavailable-title fallback as it appears in History, and any standalone Monthly Goal surface remain `F004` work requiring separately approved plan scope.

## Implementation record

### Task 1 authorization (2026-09-18)

Task 1 was explicitly authorized for execution on branch `feat/implementation-session-f003` from
`5591639`. No later task is authorized by that authorization or by this record.

### Task 1 completion (2026-09-18)

Task 1 is complete and committed as `704b4cc`: the persisted lifecycle is widened
to `selected`, `ready`, `active` and `completed` in their approved positions, and
every consumer of that contract is adapted in the same change.

| Gate | Result |
| --- | --- |
| `npm run typecheck` | Pass, no suppression |
| `npm test` | 443 / 443 pass, 13 files |
| `npm run build` | Pass |
| `git diff --check` | Clean |
| `snapshotVersion` | `1`, unchanged, no migration |
| Storage key and adapter | Unchanged |
| `F001` / `F002` snapshot compatibility | Hydrates unchanged and still writable |
| Interface strings added | None |

**Schema.** One discriminated union on `state` over shared immutable selection
facts. `ready` carries no `startedAt`; `active` requires one structurally valid
`startedAt` and no completion facts; `completed` requires `startedAt`, a
`completedAt` not earlier than it, and one `completionPeriodId` validated against
the approved `YYYY-MM` form. A completed session cannot occupy the current
position, a current session and a current-result pointer cannot both be present,
and one identifier cannot name both an unfinished and a finished session.

**Recovery.** Completed sessions are validated per record, so one unreadable
record no longer makes the snapshot unreadable; identical duplicates coalesce by
identifier; copies of one identifier that disagree are excluded from counting;
an invalid pointer is rejected alone; an invalid age band leaves completions
intact; an otherwise valid `active` session with a missing, null, zero, negative
or fractional duration hydrates as `active` with the stored value preserved
exactly. No read writes, trims or reorders the stored entry.

**D4-B.** Enforced inside the existing adapter, against the value it reads from
storage rather than the snapshot it is handed, so a filtered snapshot cannot pass
the condition. The refusal uses the existing `unconfirmed` result under the added
`blocked-completed-record` reason, leaves the stored value unchanged, keeps the
trustworthy completed facts readable, reaches the family through the existing
parent-facing recovery and retry path, leaves reset available as a parent
decision, and lifts as soon as a later read no longer finds the condition.
Identical duplicates, an invalid pointer and a malformed duration never block a
write. Every confirmed write therefore reads the stored value once before
replacing it; the rest of the five-step path is unchanged.

**Confirmation.** Completed sessions are compared field by field, keyed by
identifier rather than by length or position; a missing record is a mismatch; and
a read-back whose parsing normalized, coalesced or excluded anything is
unconfirmed rather than silently equal.

**Consumers.** `MissionSelectionResult` separates a created session, which is
`selected` by construction, from an existing session returned in its actual
lifecycle state and from a conflict carrying the same. Choosing the Mission of a
session already in `ready` or `active` returns that session rather than
republishing it as a fresh selection, minting no identifier and writing nothing.
Application state holds the current-session union, start availability narrows by
discriminant, and the Discovery handler carries the state it was given. No cast,
no `any`, no suppression, and no contract widened merely to compile.

**Decisions recorded in the implementation.** Three choices delegated by the
approved specifications were made and are named here rather than left implicit:

1. The stored `completionPeriodId` is validated for shape only and never
   recomputed from `completedAt`, because D2 fixes the period at completion and a
   later timezone change must not reassign it.
2. A pointer that arrives beside a current session is rejected alone, keeping
   both the unfinished session and the completed record, because the Technical
   Architecture rejects only the invalid navigation reference.
3. D4-B is scoped to a stored snapshot that parses to a valid top-level shape. An
   unparseable or unsupported-version snapshot keeps its own already-specified
   blocked-recovery behavior, and the domain services already refuse to write
   over it.

**Verification.** The suite gained 64 tests: every accepted lifecycle shape and
each forbidden combination independently, the record-level recovery contracts,
malformed-duration recovery, D4-B refusal with the stored value unchanged and
recovery once valid data is available, exact read-back mismatch detection
including a coalesced or excluded read-back, `F001` and `F002` compatibility, and
lifecycle-state narrowing for created, existing and conflicting sessions. Six
existing assertions were updated to the widened contract and the added pre-write
read rather than weakened.

**Limitations.** One full-suite run during this work reported three failures
across three files; their identity was not captured, and eight consecutive full
runs since, including one under concurrent build load, passed 443 of 443. No
browser or assistive-technology verification applies to this task, which adds no
presentation.

**Scope.** No `selected` to `ready` advancement, start, completion, timer,
cancellation, abandonment, or ready, active or Reward Card view exists. `F002`
selection behavior, the Mission catalog, Mission scenes and the accepted
presentation are unchanged.

### Task 2 authorization (2026-09-18)

Task 2 was explicitly authorized for execution from `44802c9`, with Task 1's source
commit `704b4cc` as its basis. No later task, push or merge is authorized by that
authorization or by this record.

### Task 2 completion (2026-09-18)

Task 2 is complete and committed as `9d56eae`: a confirmed selection continues to
a persisted `ready` session without another family decision, a stored `selected`
session advances on load, and a stored `ready` session restores unchanged.

| Gate | Result |
| --- | --- |
| `npm run typecheck` | Pass, no suppression |
| `npm test` | 471 / 471 pass, 14 files |
| `npm run build` | Pass |
| `git diff --check` | Clean |
| Full-suite runs | 5 pass, one under concurrent build load |
| Manual browser check | Pass — headless Chrome 153.0.8010.37, served production build |
| `snapshotVersion`, storage key, adapter | Unchanged |
| Interface strings added | 6, in EN/DE/RU, listed below |

**Transition.** `advanceSessionToReady` runs the existing five-step path on the
session that is actually stored. It carries every immutable selection fact
unchanged, keeps the same `sessionId` and `selectedAt`, mints no identifier,
writes no timestamp, and writes no `startedAt`. Durable state decides the
operation, which is what makes it idempotent by session identity: a repeat, a
replayed or remounted effect, a refresh and a family retry all read a session
that is already `ready` and write nothing. A session past `ready` is never
rebuilt into an earlier state, and a stored `active` session is left untouched.

**Restoration and presentation.** Hydration mirrors the validated durable current
session into runtime, so restoration presents the state storage holds rather than
one the interface assumed. A current session takes precedence over discovery in
view selection. The Mission stays identifiable while the transition resolves, and
the ready surface names the Mission from the reviewed catalog in the current
language and states that it has not started. Focus enters the Mission area once
and is not taken again when the transition resolves in place. The parent's
recovery and reset controls stay out of the child-facing Mission area.

**Failure classes.** A failure established before storage changed leaves the
stored `selected` session as it was and says the transition was not carried out.
An interrupted confirmation claims neither success nor rollback: durable state is
read again, the same session is presented as `ready` where storage now says so,
and otherwise only the unknown outcome is stated. Nothing retries itself — a
recorded issue is what stops an ordinary render from becoming a write loop — and
no rollback is written over a transition that may have succeeded. A D4-B refusal
leaves the stored snapshot byte for byte as it was and reaches the family through
the existing calm retry.

**Adapter hardening required by this task's authorization.** Task 1's pre-write
read previously continued when the stored value could not be read, which would
have replaced the one stored snapshot while blind to what it held: D4-B could not
be decided and a completed record could have been dropped. An unreadable
pre-write read now refuses the replacement as a write that did not happen.
D4-B's approved behavior, tolerant hydration and strict write confirmation are
otherwise unchanged. Three existing fixtures were made more precise so their
faults still mean what they claimed — the pre-write read succeeds and only the
read that confirms the write fails — with their assertions unchanged.

**Added interface strings, for human review.**

| Key | English |
| --- | --- |
| `view.sessionOpening.title` | Getting your Mission ready |
| `view.sessionReady.title` | Your Mission is ready |
| `session.ready.notStarted` | This Mission has not started yet. |
| `session.transition.notCarriedOut` | This Mission could not be opened just now, and nothing was saved. It has not started. Try again when you are ready. |
| `session.transition.unconfirmed` | MissionKid could not check whether this Mission was opened. It has not started. Try again to see what is saved. |
| `session.action.retry` | Try again |

German and Russian carry the same meaning in the informal child-facing register
already used by discovery. The unknown-outcome string asserts no durable negative
beyond the one the evidence supports in every case: no `startedAt` exists on any
of these paths, so "it has not started" is true whether or not the transition
landed.

**Manual verification.** Against the served production build in headless Chrome,
a seeded `selected` session advanced on load to the `session-ready` view showing
the German Mission title from the reviewed catalog and the not-started statement;
browser storage afterwards held the same `sessionId` and `selectedAt` in
`state: "ready"` with no `startedAt`, an empty completed collection, a null
pointer and `snapshotVersion` `1`; and a refresh in `ready` restored the same
Mission with no countdown.

**Documentation.** The owning specifications already cover this behavior —
`F003` lifecycle and acceptance criteria 1 and 8, the Data and State Model
record-level trust rules for a valid current session, the Visual and Ergonomic
selection-transition, ready and restored-session rows, and the Technical
Architecture refresh behavior and five-step path — so no specification changed and
no conflict was found.

**Limitations.** Until the ready screen gains its approved return-to-suggestions
action in later work, this view offers no route back to Mission choosing; a
refused transition offers its retry and a reload restores the same truthful state.
No assistive technology, second browser, viewport or ergonomic review was
exercised, and none is claimed. The three unexplained test failures recorded in
Task 1 did not recur and remain unexplained rather than resolved.

**Scope.** No start action, countdown, completion, cancellation, abandonment,
conflict control, Reward Card or Monthly Goal behavior, and no `active` or result
view. `F001` and `F002` behavior, the catalog, Mission scenes and the accepted
presentation are unchanged.

### Task 3 authorization (2026-09-18)

Task 3 was explicitly authorized for execution from `1a0d411`, together with a
narrow correction to the two ready-transition messages added in Task 2. No other
lifecycle task, push or merge is authorized by that authorization or by this
record.

### Task 3 completion (2026-09-18)

Task 3 is complete and committed as `f6f0c20`. The ready view answers every
question the specification requires before a Mission can be started, in all three
languages, and adds no control for an operation it does not implement.

| Gate | Result |
| --- | --- |
| `npm run typecheck` | Pass, no suppression |
| `npm test` | 487 / 487 pass, 14 files |
| `npm run build` | Pass |
| `git diff --check` | Clean |
| Manual browser check | Pass — headless Chrome 153.0.8010.37, 360 CSS px Russian and 1280 px |
| Specifications changed | None |
| Interface strings added | 3; 2 corrected — all EN/DE/RU, listed below |

**How the action-hierarchy clause was resolved.** As first delivered, Task 3 was
recorded as complete *except* its action-hierarchy clause: its outcome then read
"**Start mission** is the one visually dominant action; returning to suggestions
is available and secondary", while Task 4 owned the deliberate start and Task 7
owned ready cancellation. Rendering either control without its operation would
have put a no-op handler or misleading navigation in the product, so neither was
built and the clause was reported unmet together with a proposed reallocation.

That reallocation was approved on 2026-09-18 and is recorded under **Execution
allocation clarification** above: **Start mission** is built by Task 4 and the
return to suggestions by Task 7, each with the operation it performs, and the
action-hierarchy verification travels with them. Under the clarified allocation
Task 3's own obligations — content, wording, reading hierarchy and the absence of
any stand-in control — are all satisfied by `f6f0c20` and the verification below,
so Task 3 is closed. Nothing was dropped: the ready view must still carry one
dominant start action and a secondary return before Plan 03 is complete, and
those requirements now sit with Tasks 4 and 7 and in the unchanged **Definition
of Plan 03 complete**.

**Ready content.** Mission title and short instruction, Mission Category,
approximate duration, required adult involvement, applicable safety guidance,
Mission Break wording and the statement that the Mission has not started, all
without extra navigation and none behind optional disclosure. Mission Category
and duration come from the session's own immutable selection facts, so a later
setup edit or catalog release cannot rewrite them; the words come from the
reviewed catalog in the selected language. **Adult nearby** and **Adult takes
part** stay distinguishable in words, and a Mission with no Mission-specific
adult requirement shows no adult line rather than a statement that could read as
a promise that ordinary parental judgment can be skipped. Nothing about
equipment, supervision or safety is invented: the catalog carries no separate
materials field because what a Mission needs belongs to its reviewed instruction
and its safety note, which the Mission Catalog and Safety specification defines
as the home for a safety, material or environment requirement. That is a
deliberate reading of existing specifications, not a gap, so no specification
changed.

**Mission Break.** Start when ready, leave the screen, do the Mission in real
life, come back when done — in all three languages, with no device-blocking,
app-control, parental-control, monitoring, enforcement or proof claim, and no
further decision. Asserted in the suite against those claims in each language.

**Unresolvable Mission content.** A stored Mission that no longer resolves to
reviewed, complete content in the current language is not presented as ready to
start: every part of its content is withheld rather than guessed, the family is
told calmly that it cannot be shown, and the session is left untouched. All 54
published Missions are reviewed, so this path is reached only by a stored
reference the catalog no longer carries. The calm retry and the explicit return
without completion that this state also requires belong to Task 11.

**Task 2 wording correction.** A durable `selected` session already exists before
the ready transition, so neither transition message may claim that nothing at all
was saved. The established-failure message now says only that the Mission could
not be got ready, that it has not started, and that the family can try again; the
unconfirmed message says only that MissionKid could not check whether the Mission
is ready. Both remain specific to this transition, neither may stand in for an
unconfirmed start or completion, and the two failure classes and the retry
behavior are unchanged.

**Strings, for human review.** Every string this plan has added to the Mission
Session views, in all three languages:

| Key | English | German | Russian |
| --- | --- | --- | --- |
| `view.sessionOpening.title` | Getting your Mission ready | Deine Mission wird vorbereitet | Готовим твою миссию |
| `view.sessionReady.title` | Your Mission is ready | Deine Mission ist bereit | Твоя миссия готова |
| `session.ready.notStarted` | This Mission has not started yet. | Diese Mission hat noch nicht begonnen. | Эта миссия ещё не началась. |
| `session.action.retry` | Try again | Noch einmal versuchen | Попробовать ещё раз |
| `session.transition.notCarriedOut` (corrected) | We couldn't get this Mission ready just now. It has not started. Try again. | Diese Mission konnte gerade nicht vorbereitet werden. Sie hat nicht begonnen. Versuche es noch einmal. | Сейчас не удалось подготовить эту миссию. Она не началась. Попробуй ещё раз. |
| `session.transition.unconfirmed` (corrected) | MissionKid couldn't check whether this Mission is ready. It has not started. Try again. | MissionKid konnte nicht prüfen, ob diese Mission bereit ist. Sie hat nicht begonnen. Versuche es noch einmal. | MissionKid не смог проверить, готова ли эта миссия. Она не началась. Попробуй ещё раз. |
| `session.ready.missionBreak.lead` (new) | Time for a Mission. | Zeit für eine Mission. | Время для миссии. |
| `session.ready.missionBreak.body` (new) | Start when you are ready, then leave the screen and do the Mission in real life. Come back when you are done. | Starte, wenn du bereit bist, geh dann weg vom Bildschirm und mach die Mission in echt. Komm zurück, wenn du fertig bist. | Начни, когда будешь готов, потом отойди от экрана и выполни миссию по-настоящему. Возвращайся, когда закончишь. |
| `session.ready.missionUnavailable` (new) | This Mission cannot be shown right now, so it is not ready to start. | Diese Mission kann gerade nicht angezeigt werden und ist deshalb nicht startbereit. | Эту миссию сейчас нельзя показать, поэтому она не готова к старту. |

The ready view reuses the existing reviewed labels for Mission Category, adult
involvement, the safety label and the duration phrasing rather than adding
parallel wording. Those label maps moved into the localization module so a third
view did not add a third copy; no label, key or behavior changed with the move.

**Manual verification.** Against the served production build in headless Chrome
with a seeded Russian `ready` session: at a true 360 CSS-pixel layout the
document scroll width equals the client width and no element extends past the
viewport, and title, category and duration, instruction, adult-involvement note,
safety note, Mission Break wording and the not-started line all wrap and stay
fully visible with nothing ellipsized; at 1280 pixels the same content renders in
the same reading order. Source order matches visual order at both widths. The
view holds exactly one element with a tab index — the programmatic heading
target — and no button or link, so there is no inert control and no keyboard
trap, and its tab order is empty while its actions remain unimplemented.

**Limitations.** No assistive technology, no second browser and no reduced-motion,
contrast or larger-text measurement was exercised, and none is claimed; the
ergonomic review required by the visual specification remains later work. The
unexplained failures recorded in Task 1 did not recur and remain unexplained
rather than resolved.

**Scope.** No lifecycle operation, timer, automatic progression, cancellation,
abandonment, completion or reward behavior, and no inert control standing in for
one. `F001`, `F002` and Task 2 behavior, the catalog, Mission scenes and the
accepted presentation are unchanged.

### Task 4 authorization (2026-09-18)

Task 4 was explicitly authorized for execution from `889fad5`, together with the
execution allocation clarification recorded above and the truthful closure of
Task 3 under it. Tasks 5–19, push and merge are not authorized.

### Task 4 completion (2026-09-18)

Task 4 is complete and committed as `2dafce2`: the ready view carries
**Start mission** as its one dominant action, and that action starts the stored
session exactly once.

| Gate | Result |
| --- | --- |
| `npm run typecheck` | Pass, no suppression |
| `npm test` | 514 / 514 pass, 14 files |
| `npm run build` | Pass |
| `git diff --check` | Clean |
| Manual browser check | Pass — headless Chrome 153.0.8010.37 driven over the DevTools protocol |
| Specifications changed | None |
| Interface strings added | 5, in EN/DE/RU, listed below |

**Start.** Keyed by the session identity the family acted on and decided by
durable state: the requested identity must match the stored current session, that
session must be `ready`, and its Mission must still resolve to reviewed content
that is complete in the current language and still approved for the age context
the session froze at selection. One start writes one `startedAt` from the
injected clock and adds nothing else — no identifier, no invented lifecycle
state, no expected end, countdown or counter — and every immutable selection fact
and unrelated snapshot section is carried through unchanged.

**Idempotence.** Repeated activation resolves the running session and returns the
`startedAt` it already holds: no second write, no later clock reading replacing a
durable timestamp, no second session. A stale activation cannot start a different
Mission, a `selected` session is not startable, `ready` is never rebuilt over a
running session, and opening, rendering, restoring or refreshing starts nothing.

**Failure classes, decided by evidence rather than by category.** Where durable
state is read and still says `ready` — a write refused before storage changed, a
D4-B refusal, the adapter's refusal to replace a snapshot it cannot read, or an
unconfirmed write found not to have landed — the interface says the Mission did
not start and is still ready to start, and the same action is the retry. Where a
fresh read cannot establish what is stored, it says only that MissionKid could
not check whether the Mission started: neither a start nor its absence is
claimed, no rollback is written over a start that may already be durable, and the
ready transition's claim that the Mission has not started is never borrowed.
Where the write landed and only its confirmation was lost, the durable session
and its original `startedAt` are adopted unchanged. Runtime issue state now
carries the operation alongside the outcome, so no message can describe an
operation it did not belong to.

**Handover.** A confirmed start replaces the ready presentation with the running
Mission: which Mission it is, that it happens away from the screen, and the
adult-involvement and safety guidance the family read before starting. No
not-started statement and no start action remain. Timer derivation and display,
the full active presentation, **Mission done** and the leave-without-completion
path stay with Tasks 5, 6, 7 and 8; none is stubbed here. The guidance carried
over is a deliberate choice so that starting does not drop content the visual
specification requires the active presentation to retain, and is not a claim that
Task 6 is done.

**Added interface strings, for human review.**

| Key | English | German | Russian |
| --- | --- | --- | --- |
| `session.action.start` | Start mission | Mission starten | Начать миссию |
| `session.start.notStarted` | We couldn't start this Mission just now. It is still ready to start. Try again. | Diese Mission konnte gerade nicht gestartet werden. Sie ist weiterhin startbereit. Versuche es noch einmal. | Сейчас не удалось начать эту миссию. Она по-прежнему готова к старту. Попробуй ещё раз. |
| `session.start.unconfirmed` | MissionKid couldn't check whether this Mission started. Try again to see. | MissionKid konnte nicht prüfen, ob diese Mission gestartet wurde. Versuche es noch einmal, um es zu sehen. | MissionKid не смог проверить, началась ли эта миссия. Попробуй ещё раз, чтобы увидеть. |
| `view.sessionActive.title` | Your Mission has started | Deine Mission läuft | Твоя миссия началась |
| `session.active.away` | Do the Mission away from the screen, then come back when you are done. | Mach die Mission weg vom Bildschirm und komm zurück, wenn du fertig bist. | Выполни миссию не у экрана и возвращайся, когда закончишь. |

**Verification.** The suite gained 27 tests. At the domain: one start writing one
timestamp with the exact expected field set; repeated activation resolving the
same session with its original timestamp and no second write; a stale request and
a not-yet-ready session starting nothing; an unresolvable Mission and one no
longer approved for its own frozen age context refusing to start; and the three
reads a start makes — the domain's read of durable state, the adapter's pre-write
guard and the read that confirms the write — failed individually so each failure
names the read it comes from. Both classes are covered separately, including a
landed write whose confirmation failed, an unconfirmed write found not to have
landed, a D4-B refusal with the stored bytes unchanged, and a retry that starts
the same session once. Through the rendered application: the handover, one start
under a double activation, a native keyboard-activatable control, focus following
the handover, restoration that neither starts nor restarts, no startable action
for unresolved content, the running Mission in German and Russian, and both
failure classes with wording asserted to differ from the ready transition's.

**Manual verification.** The served production build was driven in headless
Chrome over the DevTools protocol with a seeded Russian `ready` session. At a
true 360 CSS-pixel layout and at 1280 pixels the document scroll width equalled
the client width with no element past the viewport, and the ready view read in
order with one dominant action at the end. One Tab reached **Start mission**, a
real Enter key activated it, and the application moved to the running Mission
with its heading, Mission title, away-from-screen line and both guidance notes,
no control offered, and focus on the new heading with a visible focus ring.
Browser storage then held the same identifier, selection timestamp, duration and
category with `state: "active"` and one `startedAt`; a refresh left both
unchanged and wrote nothing further.

**Limitations.** No assistive technology and no second browser were exercised,
and neither is claimed; the active presentation checked here is the minimal
handover this operation requires, not the full active view. The unexplained
failures recorded in Task 1 did not recur and remain unexplained rather than
resolved.

**Pending after this task.** Timer derivation and display, the full active
presentation, ready cancellation, confirmed abandonment, conflict resolution,
the completion write, the Reward Card and Monthly Goal derivation, and the
acceptance obligations that depend on them, all remain open.

### Task 5 authorization (2026-09-18)

Task 5 was explicitly authorized for execution from `c51948c`, with Task 4's
source commit `2dafce2` and the approved control allocation `60963d9` as its
basis. Tasks 6–19, push and merge are not authorized.

### Task 5 completion (2026-09-18)

Task 5 is complete and committed as `ed52ff8`: remaining guidance is derived from
the running session's own durable facts, anchored for live ticks, recalculated on
every return to the page, and never persisted.

| Gate | Result |
| --- | --- |
| `npm run typecheck` | Pass, no suppression |
| `npm test` | 554 / 554 pass, 15 files |
| `npm run build` | Pass, no circular-import warning |
| `git diff --check` | Clean |
| Snapshot schema, adapter contract, D4-B | Unchanged |
| Timer values persisted | None |
| Interface strings added or changed | None |

**The calculation.** `startedAt` and the duration frozen at selection, plus one
injected wall-clock reading, produce one bounded result: a whole number of
seconds clamped between zero and that duration, rounded up so a second shows
while any of it is left and zero is reached exactly at expiry. Units are explicit
— stored facts in epoch milliseconds and whole seconds, readings in milliseconds.
The function is total: an unusable reading, a malformed duration, a clock earlier
than the start and a structurally invalid start timestamp each return a typed
zero result with the reason attached, and no input produces a throw, a NaN, an
infinity or an invented timestamp.

**Clock ownership.** Both clocks are injected; the defaults read wall time and a
monotonic reading, falling back to wall time only where the browser provides no
monotonic clock. A monotonic reading measures elapsed time within one page
lifetime and nothing else: it is never stored, never compared with a wall-clock
timestamp, and never carried across a reload. Elapsed time is clamped at zero, so
a reading that appears to move backwards holds guidance still rather than raising
it.

**Recovery and re-anchoring.** Guidance is re-read from the timestamps on first
sight of a running Mission and on every visibility or focus return, so time that
passed while the page was hidden is accounted for by the facts rather than by
anything the page counted, and a refresh recovers the real remaining time instead
of resetting to the full duration. Within one page lifetime the value can only
fall: a wall clock rolled back to a time still after the start is capped by what
the previous anchor's elapsed time says, and a rollback to before the start reads
zero. That ceiling is runtime knowledge only — no counter is stored to hold it.
Anchors are keyed by session identity, so one naming another session guides
nothing.

**Runtime integration.** The anchor lives in runtime application state, which
refers to it by type only, so no import cycle reaches the build. A display update
is scheduled only while the page is visible and guidance is above zero; nothing
is scheduled before a Mission is running, at zero, while hidden, or after
unmount, and listeners are removed with the effect. An effect replay leaves one
scheduled tick, not two. Ticks recompute from the anchor, so a late or coalesced
callback shows the time that actually passed.

**Delegated implementation choices, recorded rather than specified elsewhere.**
Rounding up to whole seconds, a one-second scheduling interval, the runtime-only
non-increase ceiling, and the wall-clock fallback where no monotonic clock exists
are ordinary choices the owning specifications delegate. They are documented where
the code makes them; no specification needed a change and none was made.

**Verification.** The suite gained 40 tests with injected clocks and controlled
scheduling and no real-time waits: the derivation at the start, one second in,
midway, under a second, at exact expiry and long past it, at both clamp ends, for
all five malformed-duration cases with the stored value asserted unchanged, for a
clock before the start, for unusable readings, for an invalid start timestamp and
across extreme arithmetic inputs; anchoring for elapsed-time ticking, a single
delayed callback, out-of-order and unusable monotonic readings, a wall clock
moving on, both rollback kinds and separation between session identities; and the
wiring for a session that is not running, midway recovery, a delayed callback,
rest at zero, a hidden page and its return, four repeated visibility and focus
events, both rollback kinds, a malformed duration, a StrictMode effect replay,
cleanup on unmount, a stale anchor, and the absence of any browser-storage write
from ticks, anchoring or page events.

**Limitations.** Unit and wiring tests do not by themselves prove every rendered
recovery flow; the seeded-snapshot end-to-end cases, including completion and
abandonment under a malformed duration or a backward clock, remain Task 11. The
derivation has no rendered consumer yet, which is this plan's split between
derivation and the active presentation that follows it. The unexplained failures
recorded in Task 1 did not recur and remain unexplained rather than resolved.

**Scope.** No countdown presentation, no active-view redesign, no control and no
lifecycle operation. Completion and abandonment are not made conditional on
remaining time; their controls and operations remain later work.

## Approval record

| Item | State |
| --- | --- |
| Draft created | 2026-09-17 |
| Draft revised for the D1-A combined scope | 2026-09-17 |
| Draft revised for atomic schema adaptation, write-failure classes, recovery contracts and prospective status language | 2026-09-17 |
| D1-A — combined `F003` + `F004`-slice scope, History deferrals preserved | Approved 2026-09-17 |
| D2 — `completionPeriodId` as `YYYY-MM` from the normalized completion timestamp in local calendar context | Approved 2026-09-17 |
| D3 — exact EN/DE/RU wording delegated to implementation, added strings reported for review | Approved 2026-09-17 |
| D4-B — refuse snapshot-replacing writes while an unresolved invalid or conflicting completed record persists | Approved 2026-09-17 |
| Scope and decisions approved | Yes |
| Execution allocation clarification — each functional control built by the task implementing its operation | Approved 2026-09-18 |
| Implementation task authorized | Tasks 1 to 5, each authorized 2026-09-18; every later task requires its own explicit authorization |
| Tasks started | Task 1 — complete, committed as `704b4cc`; Task 2 — complete, committed as `9d56eae`; Task 3 — complete, committed as `f6f0c20`; Task 4 — complete, committed as `2dafce2`; Task 5 — complete, committed as `ed52ff8`; Tasks 6–19 not started |
