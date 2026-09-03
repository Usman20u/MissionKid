# MissionKid MVP Data and State Model

## Status and authority

This document defines the conceptual application data and state needed to support MissionKid MVP v1. It is an implementation-planning specification, not product code, a database schema, a storage table design, or an API contract.

The four Function Specifications under [`docs/specs/functions/`](../functions/) remain the source of truth for product behavior. This document describes how the MVP can represent that behavior without adding a backend, authentication, child accounts, or redundant sources of truth.

## Model principles

- One local family context owns one minimal Child Profile in MVP v1. Multiple profiles and accounts are outside scope.
- One versioned browser-local snapshot is the durable source of truth for family settings and Mission Sessions.
- The controlled Mission catalog and localization content are bundled, static, versioned product content. They are not copied into browser-local persistence.
- At most one non-completed Mission Session is current at a time.
- Completed Mission Sessions are the durable source for Reward Cards, Mission History, and Monthly Goal calculations.
- One optional completed-result pointer preserves which completed session's Reward Card is current across refresh without duplicating that session or card.
- Values that can be calculated safely are derived rather than persisted as duplicate counters, cards, or history records.
- Data collection is limited to what the approved MVP flow needs.

## Closed MVP values

The model accepts only the following values:

| Concept | Supported values |
| --- | --- |
| UI language | `en`, `de`, `ru` |
| Default UI language | `en` |
| Age band | `4–6`, `7–8`, `9–10` |
| Mission Category | `Movement`, `Creativity`, `Helping at Home`, `Learning`, `Calm` |
| Mission Session state | `selected`, `ready`, `active`, `completed` |

Localized labels are presentation content, not identifiers. The stable language codes, Mission identifiers, and canonical Mission Category values remain unchanged when the UI language changes.

## Local family ownership

All persisted MVP data belongs to the family context in the current browser profile on the current device. The stable local identifiers distinguish records inside that context; they are not usernames, public identifiers, login credentials, or child accounts.

The MVP has no server-side owner, cloud copy, cross-device identity, public profile, or sharing relationship. “Private” means MissionKid does not publish or transmit the data as a product feature; it does not mean browser-local data is protected from other people or software that can access the same browser profile.

## Controlled Mission catalog

A Mission is controlled, reviewed product content held outside the persisted family snapshot. Its conceptual content is:

| Field | Meaning |
| --- | --- |
| Stable Mission identifier | Language-independent identity used by Mission Sessions and catalog lookups. |
| Mission Category | Exactly one of the five canonical Mission Categories. |
| Suitable age bands | One or more of the three approved inclusive bands for which the complete Mission is reviewed. |
| Expected duration | A positive guidance duration available before selection. |
| Localized title | Reviewed content for `en`, `de`, and `ru`. |
| Localized instruction | Short, reviewed content for `en`, `de`, and `ru`. |
| Optional safety content | Controlled adult-involvement, space, material-condition, and localized safety guidance when relevant. |
| Stable catalog order | A finite non-negative whole-number `catalogOrder` used only for deterministic suggestion ordering. |
| Catalog content version and eligibility | Stable content context and whether the Mission may be offered in discovery. |

These values describe Mission identity and eligibility; catalog validation, deterministic filtering and ordering, and bounded suggestion-set behavior are defined in the technical architecture and discovery specification. The browser snapshot stores only a Mission reference and the immutable selection facts described below. It never copies catalog records or localized Mission content into family persistence.

## One versioned browser-local snapshot

The MVP persists one serialized snapshot under one stable, namespaced browser `localStorage` key. A whole-snapshot update keeps related changes together and avoids separate settings, history, reward, and counter stores drifting apart.

The snapshot contains only these conceptual sections:

| Section | Purpose |
| --- | --- |
| `snapshotVersion` | Identifies the data shape and selects a known validation or migration path. |
| `settings` | The selected UI language. |
| `childProfile` | One stable local profile identifier and its current age band, or no completed profile while setup is incomplete. |
| `currentSession` | Zero or one session in `selected`, `ready`, or `active`. |
| `currentResultSessionId` | Zero or one pointer to the completed session whose result/Reward Card is the current flow. |
| `completedSessions` | The durable collection of uniquely identified sessions in `completed`. |

Setup completion is derived from a valid supported language and a valid Child Profile age band. It is not stored as a second boolean that could contradict those values. Reward Cards, Mission History entries, Monthly Goal counters, and a separate reward-prompt record are also not stored. `currentResultSessionId` is only a navigation/recovery reference to an existing completed session, not a second completion or Reward Card record.

The selected language, Child Profile, current session, current completed-result reference, and completed sessions survive page refresh and ordinary browser restart when browser storage remains available. Temporary navigation, discovery, rendering, and timer-tick state does not.

## Supported concurrency boundary

Multi-tab concurrency is outside the MVP data model. The product snapshot represents one supported active-tab family flow.

## Application Settings

Application Settings contain one persisted value:

| Field | Rule |
| --- | --- |
| `language` | One of `en`, `de`, or `ru`; defaults to `en` when no valid stored choice exists. |

Changing language affects subsequent UI and catalog-content resolution. It does not change record identity, the Child Profile age band, a Mission attached to a session, session timestamps, completion ordering, or Monthly Goal membership.

## Child Profile

The minimal Child Profile contains:

| Field | Rule |
| --- | --- |
| `localProfileId` | Generated locally and stable for the life of this family snapshot. It has no meaning outside the local family context. |
| `ageBand` | Exactly `4–6`, `7–8`, or `9–10`. |

Changing the current age band affects future Mission discovery only. It does not mutate an existing Mission Session or any completed result. Existing sessions therefore carry an immutable age-band snapshot.

The Child Profile does not contain or require a name, birth date, precise age, photo, video, address, precise location, school, class, contact detail, credential, device identifier, or other sensitive or identifying child data.

## Mission Session

### Conceptual fields

Every Mission Session contains the minimum facts needed to preserve its identity, lifecycle, timer, and completion:

| Field | Rule |
| --- | --- |
| `sessionId` | A collision-resistant local identifier, unique within the family snapshot, unchanged for the session's life, and never intentionally reused. It is the idempotency identity for start and completion actions. |
| `childProfileId` | References the one local Child Profile that owned the selection. |
| `missionId` | References the stable Mission in the controlled static catalog. |
| `missionCategoryAtSelection` | Immutable canonical category provenance for the chosen Mission. |
| `ageBandAtSelection` | Records the context under which the Mission was approved and is not changed by later setup edits. |
| `durationSecondsAtSelection` | Immutable positive whole-second guidance-duration snapshot used even if a later catalog release changes the Mission's default duration. |
| `state` | Exactly one lifecycle state: `selected`, `ready`, `active`, or `completed`. |
| `selectedAt` | An absolute timestamp recorded once when the session is created. |
| `startedAt` | An absolute timestamp recorded once on the deliberate transition to `active`; absent before start and never reset. |
| `completedAt` | An absolute timestamp recorded once on the accepted transition to `completed`; absent before completion. |
| `completionPeriodId` | The family's local calendar year and month containing `completedAt`, fixed once at completion and absent beforehand. |

The session does not persist localized Mission text, a live remaining-time counter, completion proof, media, location, points, penalties, or monitoring data. Presentation content resolves from the static catalog in the current supported language.

### Lifecycle

The only lifecycle is:

```text
selected → ready → active → completed
```

| Transition | Required meaning |
| --- | --- |
| Create in `selected` | One deliberate Mission choice creates one session; no timer or completion effect exists. |
| `selected` to `ready` | The ready experience becomes available without another family decision; the timer remains unstarted. |
| `ready` to `active` | One deliberate **Start mission** action records `startedAt` once. |
| `active` to `completed` | One deliberate **Mission done** action records `completedAt` and its local monthly-period identity once. |

There are no `paused`, `failed`, `expired`, `overtime`, `cancelled`, or `abandoned` lifecycle states in MVP. Cancellation of an unstarted selection and confirmed abandonment of an active session are non-completion outcomes: after any required confirmation, the current-session reference is cleared. They create no completed record, Reward Card, Mission History entry, Monthly Goal contribution, penalty, or separate abandonment history.

Ordinary page hiding, navigation, browser closing, or screen locking is not abandonment. It leaves a valid current session recoverable.

### Current and completed placement

- `selected`, `ready`, and `active` may appear only as the optional current Mission Session.
- `completed` may appear only in the completed-session collection.
- `currentResultSessionId`, when present, may reference only one valid session in the completed-session collection and is mutually exclusive with `currentSession`.
- Completing a session is one logical snapshot update: validate the current `active` session, add that same session identifier to completed sessions with its immutable completion facts, clear the current-session position, and set `currentResultSessionId` to that completed session identifier.
- A retry for a session identifier already present in completed sessions returns that existing completion result. It does not append another session or recreate downstream effects.
- Deliberately leaving the completed-result flow clears only `currentResultSessionId`; it does not remove or mutate the completed session.

### Timer state

The persisted timer facts are the session state, immutable `durationSecondsAtSelection`, and `startedAt` once the session is active. Expected end, elapsed time, remaining guidance, and the live display are derived; a decrementing counter is never persisted as authoritative state.

- before `active`, there is no running timer;
- an `active` session has one valid `startedAt` and its immutable duration snapshot;
- when duration and wall-clock timestamps are valid and current wall time is not earlier than `startedAt`, recovered remaining guidance is clamped between zero and `durationSecondsAtSelection`;
- if duration is missing, non-finite, zero, or negative, or if current wall time is earlier than a structurally valid `startedAt`, the session remains `active` and remaining guidance displays zero;
- reaching zero leaves the session `active` and does not fail, expire, or complete it;
- completion remains available before or after zero and when timer guidance has fallen back to zero; and
- on completion, `completedAt` is the later of the current wall-clock timestamp and `startedAt`, and `completionPeriodId` is derived from that normalized completion timestamp in the device's current local calendar context.

This normalization preserves `completedAt >= startedAt` when the device wall clock moves backward without delaying or blocking a self-reported completion. A missing or malformed `startedAt` is still an invalid lifecycle combination and uses session recovery rather than being invented. Timestamps remain device-local records, not proof that the activity occurred.

The technical architecture owns the clock-source, live-tick, backgrounding, and refresh-recovery algorithm that implements these facts and invariants.

## Reward Card

A Reward Card is a derived presentation for one valid completed Mission Session, not a persisted entity. It resolves:

- the Mission title in the current supported language from the controlled catalog;
- the immutable Mission Category provenance from the completed session;
- a localized completion date or time context from `completedAt`;
- the Monthly Goal progress derived for that session's completion period; and
- the approved positive, non-comparative recognition content.

The completed session already provides durable exactly-once identity. Persisting another Reward Card record would duplicate that source and could drift from History or Monthly Goal. While the completed-result flow is current, `currentResultSessionId` selects that same completed session, so refreshing or reopening derives the same Reward Card. Leaving the result clears the pointer, not the completion.

## Mission History

Mission History is a derived private view, not a persisted collection. It is formed by:

1. selecting valid, uniquely identified completed Mission Sessions for the local Child Profile;
2. ordering them newest first by `completedAt`, with stable session identifier as the deterministic tie-breaker; and
3. resolving the Mission title, canonical Mission Category, and localized date or time context for display.

Only completed sessions appear. Additional completions continue to extend History after Monthly Goal reaches its display cap. Language and age-band changes do not rewrite, remove, reorder, or recount completed sessions.

## Monthly Goal

### Period and count

The Monthly Goal target is exactly 20 completed Mission Sessions per local Child Profile and local calendar month.

- When a session first reaches `completed`, its local year-and-month period identity is derived from `completedAt` using the device's local calendar context and persisted immutably on that session.
- A period's raw count is the number of unique valid completed session identifiers belonging to the Child Profile and that period.
- Displayed progress is the smaller of the raw count and 20, so it stays within `0 / 20` through `20 / 20`.
- Sessions completed after the twentieth still remain in Mission History but do not produce an overachievement score.
- A new current local calendar month derives `0 / 20` when it has no completions. Prior sessions are retained; no destructive monthly reset occurs.
- A later timezone or clock-context change does not reassign an already completed session because its completion-period identity was fixed at completion.

No monthly counter or Monthly Goal record is persisted. Recalculation from unique completed-session identifiers prevents one session from counting twice and repairs any stale displayed value automatically.

### One goal-complete prompt

Within each profile and period, completed sessions are ordered by `completedAt`, then by stable session identifier for an exact tie. The twentieth unique completion is therefore deterministic.

The one goal-complete prompt identity is derived from the Child Profile identifier, completion-period identity, and twentieth session identifier. Only that twentieth completion can produce the prompt; the twenty-first and later completions cannot create another. Re-rendering after refresh resolves the same prompt identity rather than creating a new prompt, reward record, History record, or counter record.

The prompt is an invitation for an optional parent-controlled and parent-approved real-life reward. No prize choice, delivery, purchase, payment, guarantee, or child entitlement is represented in persisted data.

## Persisted, runtime, and derived state

| Classification | State | Reason |
| --- | --- | --- |
| Persisted | Snapshot version | Validate compatibility with the stored data shape. |
| Persisted | Selected UI language | Preserve the supported family language across visits. |
| Persisted | Minimal Child Profile | Preserve the local profile identity and current age band. |
| Persisted | Zero or one current non-completed Mission Session | Recover `selected`, `ready`, or `active` without silent lifecycle changes. |
| Persisted | Zero or one current completed-result session identifier | Restore the same completed result/Reward Card after refresh without duplicating it. |
| Persisted | Completed Mission Sessions | One durable source for recognition, History, and progress. |
| Static bundled content | Controlled Mission catalog and `en`/`de`/`ru` localization content | Versioned product content, not family data and not copied into local persistence. |
| Temporary runtime | Current application view, selected Mission Category, discovery-cycle shown identifiers, three displayed suggestions, loading/error state, and confirmation UI | These coordinate the root-only SPA interaction and need not become durable product records. |
| Temporary runtime | Current clock readings and live timer display state | Refreshes guidance only; recovery truth comes from persisted start and duration facts. |
| Derived | Setup completeness and effective fallback language | Calculated from validated settings and Child Profile context. |
| Derived | Eligible Mission pool and exactly three suggestions | Calculated from current context and controlled catalog. |
| Derived | Expected timer end and remaining guidance | Calculated from `startedAt`, duration-at-selection, and current time. |
| Derived | Reward Card | Calculated for one completed session. |
| Derived | Mission History | Calculated from unique completed sessions and catalog presentation content. |
| Derived | Monthly raw count, capped display, complete state, and prompt identity | Calculated from completed sessions and their immutable period identities. |

## Data invariants

1. Snapshot version is recognized before stored data is interpreted.
2. Selected language is exactly `en`, `de`, or `ru`; invalid or missing language resolves safely to `en`.
3. A Child Profile age band is exactly `4–6`, `7–8`, or `9–10`.
4. A Mission Category is exactly Movement, Creativity, Helping at Home, Learning, or Calm.
5. A selected Mission references controlled content with a stable identifier and valid category, age-band, duration, localization, safety, order, and eligibility facts for its selection context.
6. Catalog content is not copied into the family snapshot; the session keeps only its stable Mission reference and immutable selection facts.
7. At most one current Mission Session exists, and its state is `selected`, `ready`, or `active`.
8. Every session identifier is unique across the current position and completed-session collection.
9. Session state moves only through `selected → ready → active → completed`; cancellation and abandonment are outcomes, not states.
10. Mission identifier, `missionCategoryAtSelection`, `ageBandAtSelection`, and the originally valid `durationSecondsAtSelection` are immutable for an existing session.
11. `startedAt` exists only after deliberate start and is written once. `completedAt` and completion-period identity exist only after deliberate completion and are written once.
12. A completed session has one structurally valid `startedAt`, one `completedAt` not earlier than `startedAt`, and one period identity matching the local calendar period fixed from normalized `completedAt`.
13. A malformed duration or a backward wall-clock reading changes recovered timer display to zero; it does not invent a lifecycle state, auto-complete, or prevent deliberate completion of an otherwise valid active session.
14. A completed session cannot occupy `currentSession`, cannot be cancelled or abandoned, and cannot count more than once. It may be referenced by `currentResultSessionId` for result recovery.
15. Reward Card and Mission History content require a valid completed session; neither can be created by setup, discovery, selection, `ready`, `active`, cancellation, or abandonment.
16. Monthly raw count uses unique completed session identifiers for one Child Profile and period. Displayed progress is never negative and never exceeds 20.
17. Additional valid completions after 20 remain in History and cannot create another goal-complete prompt for that period.
18. `currentSession` and `currentResultSessionId` cannot both be present, and `currentResultSessionId` must identify exactly one valid record in `completedSessions`.
19. The persisted product snapshot contains no catalog copy, redundant History list, Reward Card record, Monthly Goal counter, or duplicate goal-prompt record.
20. No state field requests or stores completion proof, child media, precise location, name, birth date, school, contact details, credentials, payment data, public/social data, or advertising profile data.

## Validation and recovery decisions

Stored data is untrusted input on every load. The application validates the complete snapshot shape, supported values, references, lifecycle combinations, timestamps, unique identifiers, and version before exposing derived views or accepting a transition.

Product changes replace the one complete snapshot rather than maintaining partially independent stores. The technical architecture defines the operational validation, replacement, read-back, and failure-handling sequence. If persistence cannot confirm a change, MissionKid must not claim a durable start, completion, History entry, or progress change.

Completion remains keyed by stable session identifier, so a retry resolves an existing completed session instead of adding another.

### Snapshot and environment trust

| Condition | Data decision |
| --- | --- |
| Snapshot is missing | Start from an in-memory empty context with language `en`, no completed setup, no session, and no claimed History or progress. Persist only after a valid family action. |
| Snapshot uses an older supported version | Use only an explicit, tested whole-snapshot migration that preserves stable identifiers and completion facts. |
| Snapshot version is unsupported, has no explicit migration, or migration fails | Do not hydrate, downgrade, partially migrate, or overwrite it. Keep the stored snapshot unchanged and offer a calm parent-facing explanation plus deliberate reset; reset is the only destructive recovery. |
| Snapshot cannot be parsed or has an invalid top-level shape | Do not derive History, rewards, or progress from it and do not silently report data loss. Keep the raw entry untouched until the parent explicitly chooses reset or a supported recovery succeeds. |
| Language is missing or unsupported while the rest is valid | Resolve the effective UI language to `en` and offer `en`, `de`, and `ru`; do not alter Mission or completion identity. |
| Current age band is missing or invalid while the profile identity and completed sessions are valid | Treat setup as incomplete, preserve trustworthy completed sessions for that same local profile, and require one approved age band before future discovery. Do not infer an exact age. |
| Browser `localStorage` is unavailable or persistence fails | Use clearly labeled temporary in-memory state for the current page lifetime, warn that it is not durable, and make no durable History or Monthly Goal claim. No backend fallback is implied. |

### Record-level trust

| Condition | Data decision |
| --- | --- |
| A current session's Mission reference cannot be resolved to content that remains reviewed and safe for that flow | Do not replace the Mission, start, complete, or count it. It may be retried or ended as a non-completion outcome. |
| A valid completed session's Mission content can no longer be resolved | Preserve its immutable completion and Monthly Goal membership. Use its stored canonical category and a calm localized unavailable-title presentation rather than inventing Mission content. |
| A valid current session is `selected` | Restore that selection and continue only through the defined `selected` to `ready` transition; do not start its timer. |
| A valid current session is `ready` or `active` | Restore the same session and state without resetting its facts. Timer guidance for `active` follows the timer-state invariants above. |
| `currentResultSessionId` identifies one valid completed session | Derive the same completed result and Reward Card without applying completion effects again. |
| `currentResultSessionId` is invalid | Reject only the pointer; preserve all valid completed sessions and never fabricate or select a different result. |
| A session has an impossible lifecycle/timestamp combination | Do not invent facts, advance, complete, or count it; exclude its unsafe derived effects. |
| Completed-session identifiers are duplicated | Coalesce identical copies by stable identifier for derived views. Conflicting copies do not count until one deterministic valid record can be recovered. |
| Mission content is incomplete in the selected language | Do not mix languages within the Mission or mutate its identity. Exclude it from discovery and use the specified unavailable recovery for an existing flow. |
| A derived Reward Card, History view, or Monthly Goal display is stale or invalid | Recalculate it from validated, uniquely identified completed sessions; do not repair or create a duplicate persisted view or counter. |

### Explicit reset

Reset is a deliberate parent-facing recovery action with a clear warning. It removes the single product snapshot, including local settings, the Child Profile, unfinished session, current-result pointer, completed-session History source, and Monthly Goal source. The action cannot promise recovery because the MVP has no account, backend, cloud backup, or cross-device sync. After reset, language defaults to `en` and age setup is incomplete.

## Privacy, safety, and limitations

- Browser-local persistence is sufficient for the approved single-device MVP flow because it retains minimal setup and completion state without accounts or a backend.
- Browser-local data is device/browser-profile data, not secure server storage. It is not encrypted by MissionKid, access-controlled by a MissionKid login, or protected from someone who can inspect the same browser profile.
- Clearing site data, using private browsing, changing devices or browser profiles, or browser storage failure can remove or isolate the snapshot. MVP v1 provides no cloud backup, synchronization, recovery account, or cross-device continuity.
- Device clock and timezone settings determine the local completion moment and period at completion. MissionKid does not monitor location or attempt to prove that the device clock is accurate.
- The model contains no child account, authentication data, backend identifier, secret, chat, social graph, public profile, leaderboard, likes, child photo or video, precise location, school data, birth date, contact information, payment information, advertising profile, or completion proof.
- The model supports no behavioral targeting, infinite feed, gambling or loot-box state, paid competition, streak-loss mechanism, device blocking, surveillance, native integration, or uncontrolled AI mission generation.
- Completion remains a parent-guided self-report. Persisted timestamps and state are not evidence that a child performed an activity.

These boundaries implement the principle: **collect the minimum data necessary for the MVP flow.**

## Future boundary

Cloud persistence, parent accounts, multiple Child Profiles, cross-device sync, school/classroom identity, native-device integration, and controlled AI-assisted content are future possibilities only. None is represented as an MVP field or assumed by this model. Any such change requires updated product, privacy, safety, and technical specifications before implementation.
