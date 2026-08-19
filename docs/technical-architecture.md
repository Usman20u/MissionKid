# MissionKid MVP Technical Architecture

## Status and authority

This document locks the implementation architecture for MissionKid MVP v1. It is a technical specification, not product code, a UI design, a package manifest, a deployment configuration, or a database design.

The four feature specifications under [docs/specs/](specs/) remain the source of truth for product behavior. This architecture explains how a small web application can support that behavior. If an implementation choice conflicts with a feature specification, the feature specification wins and the conflict must be resolved before code is written.

## Architecture goal

The MVP architecture must deliver the complete parent-guided family flow reliably within a 15-day implementation window while keeping child data and operational complexity low. Decisions are ordered by:

1. reliability;
2. clarity;
3. child privacy;
4. mobile-first usability;
5. minimal dependencies;
6. maintainability;
7. fast implementation; and
8. future extensibility without premature infrastructure.

The architecture deliberately uses a static client application and browser-local persistence. It does not add a backend merely to reproduce behavior that one local family context can support safely on one browser.

## Locked MVP stack

| Concern | MVP choice | Reason |
| --- | --- | --- |
| Application | React with TypeScript | React supports a small state-driven interface; TypeScript makes the closed domain values and transitions explicit before runtime. |
| Build and development | Vite | Vite provides a focused development and production-build path for a static web application without prescribing backend infrastructure. |
| Delivery | Root-only, single-route responsive static SPA served from `/` | One web build supports modern mobile and desktop browsers without native-platform work or URL-based page routing. |
| Application state | React state plus a small context/reducer boundary | The MVP does not need a third-party global-state library. Domain transitions remain centralized and testable. |
| Durable family state | Browser localStorage behind one persistence adapter | The data is small and local, and one whole-snapshot adapter keeps persistence understandable without a backend, package, or database. |
| Mission content | Bundled, controlled, versioned static catalog | Reviewed content is shipped with the application and cannot be generated or changed by a child at runtime. |
| Localization | Bundled static dictionaries for English, German, and Russian | The language set is closed and small; stable keys and a thin localization service are sufficient. |
| Testing | Vitest for domain and adapter tests, React Testing Library for component and full-flow integration tests, plus a manual browser release checklist | This covers the critical behavior without adding a large testing stack. |
| Production hosting | HTTPS static hosting of the Vite production build | The approved MVP has no server-side runtime, secret, or authenticated API requirement. |

Exact dependency versions must be pinned when an implementation plan authorizes package creation. This specification does not create or select a package lockfile. A router, external state library, heavy localization framework, date library, analytics SDK, or UI component framework is not required initially. Any later dependency must solve a documented need and pass privacy, accessibility, size, and maintenance review.

This stack fits the 15-day MVP because one codebase can implement the complete flow, the catalog and translations can be validated as build content, and all required durable state is small enough for one local snapshot. The result remains separable: product rules do not depend on React, and the persistence adapter can be replaced in a future approved architecture without changing the feature behavior.

## Deployment and runtime shape

The production artifact is a static browser application containing the application shell, reviewed mission catalog, and supported localization dictionaries. A static host serves the built HTML, JavaScript, CSS, and content assets over HTTPS.

### Root-only navigation

MissionKid MVP is a single-route static SPA served only from `/`. Setup, Mission Category Selection, suggestions, ready, active Mission Break, Reward Card, Mission History, and Monthly Goal are application views selected by validated product and temporary application state; they are not URL-addressable pages.

- Production hosting needs to serve the SPA shell and its static assets at `/`; no history-route fallback is required for MVP.
- Refresh at `/` reloads the shell, validates and hydrates the persisted snapshot, and restores the application view implied by a recoverable current Mission Session or current-result pointer.
- If no recoverable current flow exists, the shell selects the safe setup or Mission Category view from validated state.
- Deep-link routes, URL-based page state, and direct navigation to child-flow views are outside MVP.
- No router dependency is required solely for MVP navigation.

The application must neither generate nor advertise non-root product URLs. A request for a non-root path is a hosting-level not-found response, not an application recovery path and not an MVP deep link.

The base MVP requires:

- no application server;
- no database;
- no serverless function;
- no authentication provider;
- no payment provider;
- no runtime AI service;
- no private API key;
- no environment secret; and
- no operating-system or device-control integration.

The first application load still requires the static assets to be delivered by the host. No service worker, cache policy, or offline installation behavior is specified, so the architecture must not claim offline support.

## Application boundaries

The implementation should use shallow, feature-oriented boundaries rather than a deep generic folder hierarchy.

| Boundary | Responsibility | Must not own |
| --- | --- | --- |
| App shell and navigation | Start the root-only SPA, select the current application view from validated state, restore a valid flow, manage top-level error containment, and make location and next action understandable. | URL-based page routing, product calculations, direct storage parsing, or catalog mutation. |
| Setup and localization | Resolve English by default, capture one supported age band, change settings later, and expose valid setup context. | Child identity collection, accounts, or mission filtering rules. |
| Mission catalog | Load and validate bundled reviewed content by stable Mission identifier and catalog version. | Family state, runtime generation, popularity ranking, or network content. |
| Mission discovery | Combine valid age band, Mission Category, language completeness, and safety eligibility; provide exactly three choices and bounded replacement sets. | Timer, completion, rewards, or durable History records. |
| Mission session | Enforce the exact selected → ready → active → completed lifecycle, deliberate start/completion, cancellation and abandonment outcomes, and current-session recovery. | New lifecycle states, device monitoring, or completion proof. |
| Timer | Derive calm countdown guidance from the persisted start moment and duration snapshot. | Lifecycle authority, failure judgments, notifications, or background enforcement. |
| Reward handling | Derive one Reward Card from a completed Mission Session and its catalog content. | A separate reward database record, prize fulfillment, or random reward mechanics. |
| Mission History | Derive a newest-first private view from completed Mission Sessions. | A duplicate history store, sharing, or social-feed behavior. |
| Monthly Goal | Derive period membership, raw completion count, capped display, completion state, and the one goal-complete prompt identity. | A mutable counter, public ranking, payment, or assigned real-life reward. |
| Persistence adapter | Serialize, validate, version, read, replace, and reset the single browser-local snapshot; surface typed success or failure to domain actions. | Feature decisions, localized child-facing copy, or silent data repair. |
| Localization | Resolve stable interface keys and Mission content for en, de, or ru; format local completion dates. | Using translated text as identity or weakening safety meaning. |
| Shared domain | Define closed values, invariants, pure calculations, and transition results independent of React and localStorage. | Rendering, direct browser APIs, or hidden side effects. |

UI modules call domain operations rather than editing snapshot fields directly. Only the persistence adapter reads or writes localStorage. Catalog and localization modules are read-only at runtime. This keeps storage failures, content validation, and product transitions testable in isolation.

## End-to-end technical data flow

~~~text
Family setup
→ validated mission context
→ controlled catalog filtering
→ exactly 3 runtime suggestions
→ one selected Mission
→ persisted Mission Session
→ timestamp-derived guidance timer
→ exactly-once completion write
→ derived Reward Card
→ derived Mission History
→ derived Monthly Goal
~~~

| Step | Technical treatment |
| --- | --- |
| Family setup | Validate and persist supported language plus one minimal local Child Profile and age band. Setup completeness is derived. |
| Mission context | Derive current age band, one selected Mission Category, and effective language. The category and discovery cycle are temporary interaction state. |
| Catalog filtering | Validate bundled catalog records, exclude invalid entries, filter by age band and exact category, then order by ascending `catalogOrder` and stable Mission identifier. |
| Three suggestions | Take the first complete deterministic group of three eligible Missions. Keep the current set and cycle-level shown identifiers in runtime state; bounded replacement advances to the next unseen full group and never streams, repeats, or auto-loads more. |
| Mission selection | Create one stable session identifier in selected, persist the attached Mission and immutable selection facts, then make the ready experience available without starting the timer. |
| Deliberate start | Validate ready, persist active and one start timestamp, then derive expected end. Repeated input resolves the same session and cannot restart it. |
| Timer | Recalculate remaining guidance from timestamps and the current clock. Display ticks are temporary and never authoritative. |
| Completion | Validate the same active session, persist completed facts exactly once, assign its local monthly-period identity, and point the current result at that completed session in the same snapshot replacement. |
| Reward Card | Derive the recognition view from the current completed result, catalog content, completion moment, and derived goal progress. |
| History | Select valid completed sessions, sort newest first, and resolve localized presentation. No separate History entries are written. |
| Monthly Goal | Count unique completed session identifiers in the period, cap display at 20, and derive the single prompt from the deterministic twentieth completion. |

## Browser-local persistence strategy

### One namespaced snapshot

The MVP uses one versioned JSON snapshot in one namespaced localStorage entry. The conceptual shape is defined in [data-and-state-model.md](data-and-state-model.md), not duplicated here. It contains settings, one minimal Child Profile, zero or one current non-completed session, completed sessions, a minimal current-result pointer, and snapshot version.

Mission catalog content, translation dictionaries, rendered Reward Cards, Mission History lists, Monthly Goal counters, timer ticks, and discovery sets are not copied into this snapshot.

A state-changing operation follows one five-step path:

1. read and validate the current recognized snapshot, treating a missing snapshot as first use;
2. validate the requested domain transition against that state;
3. produce and validate the next complete in-memory snapshot;
4. serialize and replace the one namespaced storage value, then read back and validate the exact stored result; and
5. treat any serialization, persistence, or read-back failure as an unconfirmed action; publish success only after confirmation, otherwise rehydrate the last valid durable snapshot when possible and offer a calm retry.

Using one replacement value avoids a partial multi-key update in which completion, History, and Monthly Goal disagree. The adapter never writes separate completion, History, reward, or goal-counter values. If validation, serialization, persistence, or read-back fails, the interface must not claim an unrecorded start or completion.

### One-active-tab boundary

MissionKid MVP does not guarantee safe concurrent editing from multiple browser tabs. The supported usage model is one active application tab for one local family context.

### What survives

| Condition | Expected state |
| --- | --- |
| React re-render | All current validated state remains available. |
| Page refresh | Language, Child Profile, selected/ready/active session, completed sessions, and a current completed-result reference recover from the snapshot. |
| Ordinary browser restart | The same data recovers when the same origin and browser profile retain localStorage. |
| Page hidden or background-throttled | An active session remains active; timer display is recalculated on visibility or focus return. |
| New local calendar month | Prior completed sessions remain; current-period progress derives from the new period and begins at zero when no completion belongs to it. |

The selected Mission Category, discovery-cycle queue and shown set, displayed suggestions, loading state, confirmation dialog, transient error message, and current timer tick do not require durable storage. If neither a valid current Mission Session nor a valid current-result pointer exists after refresh, the shell returns to a safe setup or Mission Category path rather than inventing prior discovery state.

### Failure, validation, and schema versions

All stored data is untrusted at load time. Runtime validation must check the snapshot version, closed values, identifiers, catalog references, timestamp/state combinations, uniqueness, and internal references before feature modules use it.

- A missing snapshot is normal first use: use English, require a valid age band, and claim no prior progress.
- A known older version may be migrated only when an explicit, tested, whole-snapshot transformation exists. Initial MVP is not required to invent migrations for historical versions that do not exist.
- If a snapshot version is unsupported, no explicit migration exists, or a known migration fails, do not hydrate, downgrade, partially migrate, or silently overwrite it. Keep the stored value unchanged and offer a calm parent-facing recovery/reset choice; reset requires explicit confirmation.
- Unparseable or structurally invalid data is not used to show completion or progress and is not silently discarded.
- A missing or invalid language resolves to English where the otherwise-valid snapshot can be trusted.
- An invalid age band makes setup incomplete; no exact age is inferred.
- Invalid derived Monthly Goal display data is discarded and recalculated from validated completed sessions because no counter is stored.
- A failed write, quota rejection, blocked storage API, or failed read-back leaves the durable action unconfirmed and offers a calm retry.

The persistence adapter exposes technical failure categories to the application shell, but child-facing text remains calm and action-oriented. It never displays raw exceptions, stack traces, storage keys, or serialized data.

When `localStorage` is unavailable, blocked, or throws, the application may continue in clearly labeled temporary in-memory mode for the current page lifetime. Setup and current-session interaction may proceed in memory, but the parent must be warned that refresh or closing can lose it; MissionKid must not present History, Monthly Goal progress, a start, or a completion as durably saved. Storage retry may be offered. On a successful retry, the adapter first reads and validates any existing durable snapshot before a new write; temporary and durable histories are not guessed or merged. No backend fallback and no technical child-facing error is introduced.

### Reset

Reset is a deliberate parent-facing recovery action, not an automatic response to corruption. After clear confirmation it removes only MissionKid's namespaced snapshot and returns to English with incomplete age setup. It also removes local History and goal sources, and cannot promise recovery because no backend or cloud backup exists.

### Sufficiency and limitations

localStorage is sufficient because the MVP has one small local family context, static content, minimal settings, at most one current session, and compact completed-session facts. The adapter boundary keeps a later persistence replacement possible without building that future system now.

The limitations are explicit:

- data is scoped to one origin, device, browser, and browser profile;
- clearing site data, private-browsing behavior, storage eviction, or an origin change can remove or isolate it;
- there is no cloud backup, cross-device sync, account recovery, or multi-user access control;
- browser-local data is not a secure vault and can be inspected by people or software with access to that browser profile;
- storage availability and capacity are browser-controlled;
- a device clock or timezone can be inaccurate; and
- temporary in-memory mode is not durable across refresh or close.

The MVP therefore stores no sensitive child identity data and makes no claim that local persistence is server-grade security.

## Controlled Mission catalog architecture

The catalog is controlled, versioned product content bundled into the application build. It is not user-generated, fetched from an unreviewed service, or changed by runtime AI.

Each Mission has:

- one stable, language-independent identifier;
- exactly one canonical Mission Category: Movement, Creativity, Helping at Home, Learning, or Calm;
- one or more machine-readable approved age bands: 4–6, 7–8, or 9–10;
- one positive expected guidance duration;
- reviewed title and short instruction content for en, de, and ru;
- optional structured adult-involvement, material, space, or other safety metadata;
- one finite non-negative whole-number `catalogOrder` used for deterministic ordering; and
- catalog version and discovery-eligibility provenance.

Catalog publication must validate stable non-empty identifier uniqueness, closed category and age-band values, positive whole-second duration, complete meaning-equivalent localized title/instruction and required safety content for all three languages, valid required safety metadata, finite non-negative whole-number `catalogOrder`, and reviewed discovery eligibility. It must also verify that every supported age-band, Mission Category, and language context can produce at least three eligible Missions. An invalid controlled record fails the relevant catalog validation test and blocks release; duplicate identifiers invalidate every record sharing that identifier. Duplicate ordering values are allowed because Mission identifier compared by locale-independent Unicode code-point order is the stable tie-breaker.

At runtime, catalog validation is defensive. Invalid records are excluded before discovery and never presented to the child; non-sensitive technical diagnostics may be logged for development, while the family sees only the simple controlled unavailable/exhausted state. Runtime code never guesses missing values, repairs unsafe content, duplicates a Mission, or generates substitute content.

Discovery first retains only valid reviewed Missions matching the selected age band and exact Mission Category, then sorts them by ascending `catalogOrder` and ascending stable Mission identifier using locale-independent Unicode code-point comparison as the exact tie-breaker. The first set is the first three records. A cycle keeps a bounded runtime shown-identifier set; **Another set** advances to the next complete group of three unseen records in that same order. No Mission repeats while a full unseen group remains, no partial group is shown, and replacement is unavailable when fewer than three unseen records remain. If the initial eligible pool contains fewer than three valid Missions, discovery returns the controlled insufficient-content state instead of duplicating content. There is no wraparound, infinite feed, random generation, or engagement-oriented cycling. Ordering never uses popularity, payment, social comparison, behavioral targeting, or engagement optimization.

Normal catalog retirement removes a Mission from future discovery but retains a history-compatible record for existing stable references. An unfinished session may resume from retained content only when that content remains complete, reviewed, and safe for that existing session. If safety approval was withdrawn, or the current reference cannot resolve, the application follows the unrecoverable-session path without completion instead of substituting or generating a Mission.

The actual Mission catalog is a later content deliverable and is not created by this specification.

## Localization architecture

The supported UI languages are exactly English, German, and Russian, identified by stable codes en, de, and ru. English is the default.

Localization uses two bundled content sources:

1. interface dictionaries keyed by stable, language-independent message keys; and
2. Mission content keyed first by stable Mission identifier and then by supported language.

Stable keys, Mission identifiers, category values, session identifiers, and storage fields never depend on translated strings. A language change persists the selected code and re-resolves presentation without changing the Child Profile, Mission identity, session state, timer facts, completion ordering, or Monthly Goal membership.

A thin localization service is sufficient; a heavy localization framework is not required. Browser-native internationalization formatting can render the completion date in the selected language.

Fallback and failure rules are:

- a missing, unsupported, or unreadable selected language resolves to English;
- a missing interface message in German or Russian falls back to its reviewed English message while producing a development diagnostic;
- a Mission missing any required localized title, instruction, or safety content is ineligible for discovery in that language;
- Mission fields are never silently mixed across languages to fill an incomplete Mission; and
- if content for an existing session becomes unavailable unexpectedly, preserve its Mission identity and use the calm recovery path rather than replacing it.

Automated content checks must compare dictionary key sets and catalog-localization completeness before release. English fallback is recovery, not permission to ship incomplete German or Russian UI.

## Mission Session and timer architecture

The domain transition service is the only authority for the exact lifecycle:

~~~text
selected → ready → active → completed
~~~

Cancellation and abandonment end the current flow without completion; they are outcomes, not added states. Pause, failure, expiry, and overtime states do not exist.

On **Start mission**, the durable session records one structurally valid start timestamp and retains the immutable positive whole-second duration captured at selection. Expected end is derived as start timestamp plus duration; it is not another persisted source of truth.

For a live page, derive an initial bounded remaining value from validated wall-clock facts, anchor it to a monotonic clock where the browser provides one, and subtract monotonic elapsed time for later display ticks. A backward wall-clock adjustment therefore cannot make the live display increase. The display may schedule a short periodic render while visible, but it never persists or decrements an authoritative remaining number.

On initial load, visibility or focus return, refresh, and browser restart, validate `startedAt`, the selected duration, derived expected end, and current wall time before establishing a new monotonic anchor. If duration is missing, non-finite, zero, or negative, or recovered current wall time is earlier than a structurally valid `startedAt`, keep the session `active`, show zero remaining guidance, and leave deliberate completion and abandonment available. Otherwise clamp recovered guidance between zero and the full selected duration. Recovery never extends the child's waiting period or invents a punitive state.

At zero:

- display remains at zero with neutral guidance;
- the session remains active;
- no overtime count begins;
- no failure, penalty, alarm, or completion occurs; and
- **Mission done** and deliberate abandonment remain available.

Completion before or after zero uses the same exactly-once transition. To preserve timestamp invariants after a backward clock change, `completedAt` is the later of current wall time and the structurally valid `startedAt`; the immutable local `completionPeriodId` is derived from that normalized timestamp. A malformed or missing `startedAt` remains an invalid session and is not invented. No notification, service worker, operating-system timer, device blocking, third-party app control, or background surveillance is required.

Refresh behavior follows persisted state:

- selected advances through the already-specified transition to ready without starting;
- ready restores the same Mission with no start timestamp;
- active derives its current remaining guidance without resetting;
- completed resolves the same result through the persisted current-result pointer; and
- invalid or unresolvable sessions never auto-complete or receive progress.

## Error and recovery strategy

| Condition | Technical response | Family-facing outcome |
| --- | --- | --- |
| Persistence is missing | Initialize valid first-use memory state. | English appears by default and age setup is required; no History is fabricated. |
| `localStorage` is unavailable, blocked, or throws | Enter labeled temporary in-memory mode and do not merge temporary state into later durable state. | Warn the parent that refresh/close may lose setup, session, History, and progress; offer retry without technical child-facing details. |
| Snapshot version is unsupported or has no successful explicit migration | Do not hydrate, downgrade, migrate speculatively, or overwrite the stored value. | Offer the parent calm recovery or explicitly confirmed reset. |
| Persisted state is invalid or unavailable | Reject it at the adapter boundary; retain raw data until explicit recovery/reset where possible. | Show a calm retry or parent-facing recovery path without technical details. |
| Mission identifier is missing from the catalog | For an unfinished session, do not mutate the reference, start, replace, or count it. | Retry catalog recovery or explicitly leave the unrecoverable flow without completion. A completed record retains count with a localized unavailable-title fallback. |
| Retained Mission is no longer approved as safe | Treat the unfinished current session as unrecoverable; do not start, resume, substitute, or count it. | Offer calm retry or explicit return to Mission Category Selection without completion. |
| Catalog record is invalid at runtime | Exclude it before filtering or ordering and produce a non-sensitive development diagnostic. | Never show invalid content; use the controlled unavailable/exhausted state if fewer than three valid records remain. |
| Filtered catalog has fewer than three eligible Missions | Return no suggestion set. | Keep the prior valid set during replacement, or show the specified unavailable state on first load. |
| Refresh occurs during a session | Validate and restore its recorded state; derive the timer. | The same ready or active Mission returns without duplicate start or completion. |
| Recovered clock is earlier than valid `startedAt`, or duration is invalid | Keep the valid session `active`, set guidance to zero, and normalize a later completion timestamp to no earlier than `startedAt`. | Do not add waiting time; completion or abandonment remains available. |
| Monthly Goal view appears invalid | Ignore the derived display and recalculate from unique validated completed sessions. | Show recalculated progress or a calm retry; never increment speculatively. |
| Translation key is missing | Apply the localization rule for interface versus Mission content. | Use safe reviewed interface fallback or withhold incomplete Mission content; never expose a raw key. |
| Completion storage write fails | Keep the last durable active session authoritative. | Do not show success, Reward Card, History, or increased progress; offer exactly-once-safe retry. |
| Current-result pointer is invalid | Preserve valid completed sessions and reject only the invalid navigation reference. | Do not fabricate a Reward Card; offer Mission History or Mission Category Selection, and repair or clear only the pointer through a validated write. |
| Unexpected render/runtime error | Catch it at the nearest safe boundary, preserve durable state, and log only non-sensitive diagnostics. | Show a calm recovery action to retry or return to a safe parent-guided path. |

Recovery never asks for additional child data, generates replacement mission content, guesses completion, weakens safety guidance, or silently changes a session's attached Mission.

### Recovery scenarios A–I

| Scenario | Deterministic MVP result |
| --- | --- |
| A — Fresh browser | Use in-memory first-use state with English, incomplete age setup, no current session, and no claimed History or progress. Persist only after a valid family action. |
| B — Setup then refresh at `/` | Reload the root SPA, validate and hydrate language plus Child Profile from the stored snapshot, and select the post-setup application view without creating another record. |
| C — Active Mission then leave and return | Ordinary in-app view changes do not abandon it. Restore the same `active` session and recover bounded timer guidance; completion or confirmed abandonment remains available. |
| D — Browser closes during an active Mission | A later visit in one active tab validates and hydrates the same stored `active` session and derives guidance without restarting or completing it. |
| E — Mission removed from catalog | An unresolved or safety-withdrawn unfinished session uses unrecoverable non-completion recovery. A valid completed session keeps its count and uses retained history content or the localized unavailable-title fallback. |
| F — Unsupported stored language | Resolve effective language to English, offer only English/German/Russian, and preserve Mission/session/completion identity. |
| G — Unsupported snapshot version | Use only an explicit supported migration. With no successful migration, leave stored data untouched, do not hydrate it, and offer explicitly confirmed reset. |
| H — Corrupted snapshot | Reject it before deriving product views, keep raw data untouched where possible, and offer parent-facing retry or explicitly confirmed reset without fabricated progress. |
| I — Monthly rollover | Keep all completed sessions and prior History; derive the new local period from immutable completion-period identities and show `0 / 20` until its first valid completion. |

## Privacy and child-safety architecture

The technical data-minimization rule is: **collect the minimum data necessary for the MVP flow.**

The base MVP has:

- no child account or login identity;
- no chat or social graph;
- no public profile, sharing, likes, or leaderboard;
- no child photo, video, audio, or completion-proof upload;
- no precise location, address, school, class, contact detail, or birth date;
- no unnecessary identifying or sensitive child data;
- no advertising identifier or behavioral advertising profile;
- no analytics SDK or third-party social-sharing SDK;
- no payment or financial information;
- no gambling, loot-box, paid-competition, or random-reward system;
- no manipulative engagement loop or pressure to remain in the application;
- no runtime AI mission generation; and
- no device blocking, surveillance, or operating-system control.

Catalog content is reviewed before release for age suitability, safe physical behavior, understandable language, global clarity, and required adult involvement. The architecture never treats a timer or timestamp as proof that a child completed an activity. The parent remains responsible for suitability, supervision, and any optional real-life reward.

The screen is a bridge to the real-world activity. Active-session design must work when the page is hidden or left alone and must not rely on repeated prompts, notifications, or ongoing interaction.

## Security boundaries

No secret is required in frontend source, a Vite environment value, or deployment configuration for the base MVP. There is no private API key to conceal in a client build, and no .env.local file is needed.

Browser-delivered code and localStorage share the origin's security boundary. Local data is not encrypted by MissionKid, authenticated to an individual, or protected from someone with browser-profile access. Avoiding sensitive data is therefore a primary control.

Implementation must:

- serve production assets over HTTPS;
- render reviewed content as text and avoid unsafe raw HTML injection;
- validate local persisted data and static content before use;
- limit storage access to the persistence adapter;
- avoid logging family state, Mission Session data, or child context to third parties;
- keep dependencies minimal and review them before addition; and
- make no claim that local data is tamper-proof, confidential from device users, or backed up.

If future work requires a secret, authenticated service, remote data, or telemetry, the architecture and active plan must be updated before implementation.

## Testing strategy

### Unit tests

Vitest covers pure domain and adapter behavior:

- accepted language, age-band, category, and lifecycle values;
- catalog integrity rejection for missing/duplicate identifier, unsupported category/age band, invalid duration/order/safety data, and incomplete localization;
- age/category/language/safety catalog filtering, deterministic `catalogOrder` plus Mission-identifier ordering, exactly-three grouping, bounded no-repeat advancement, and fewer-than-three handling;
- deliberate and idempotent session transitions;
- timer expected-end, monotonic live display, valid recovery, and backward-clock/invalid-duration zero-guidance behavior;
- duplicate completion protection;
- local monthly-period assignment and boundary behavior;
- raw and capped Monthly Goal calculations;
- deterministic twentieth-completion prompt identity;
- Reward Card and newest-first History derivation;
- whole-snapshot transition validation, serialization, replacement, exact read-back, and write/read-back failure handling;
- snapshot runtime validation, explicit supported migration, unsupported-version recovery, corruption rejection, and localStorage-unavailable degradation; and
- localization fallback and Mission-content completeness.

Wall and monotonic time plus persistence are injected or controlled in tests. Suggestion order contains no randomness.

### Integration and product-flow tests

React Testing Library mounts the application shell with controlled catalog, clock, and persistence adapters. At minimum, automated integration tests cover:

~~~text
setup
→ Mission Category
→ exactly 3 suggestions
→ select
→ ready
→ start
→ leave/return or refresh
→ complete once
→ Reward Card
→ History
→ Monthly Goal progress
~~~

Additional paths cover language and age changes; deterministic first and later suggestion groups; another-set exhaustion; invalid catalog record exclusion; fewer-than-three eligible Missions; ready cancellation; confirmed active abandonment; repeated start/completion input; completion-write failure and retry; active recovery before and after zero; backward wall-clock anomaly; completion followed by refresh or browser restart to the same derived Reward Card; deliberate result exit clearing only the pointer; invalid-pointer recovery; twentieth and twenty-first completions; new-month rollover; missing or safety-withdrawn catalog references; missing translation content; localStorage-unavailable in-memory mode; unsupported snapshot version; corrupted snapshot; and explicitly confirmed reset.

Static-host integration starts only at `/`, refreshes there during setup, ready, active, and completed-result states, verifies hydration-driven view restoration, and verifies that the application generates no deep-link route.

A separate large end-to-end framework is not required initially. It may be proposed in an implementation plan only if browser-level risk cannot be covered by the chosen integration tests and manual release checks.

### Manual release checks

Before release, verify:

- narrow mobile and wider desktop viewports;
- touch, keyboard, visible focus, and no hover-only critical behavior;
- English, German, and Russian switching and text expansion;
- first use, refresh, ordinary browser restart, hidden-page return, and storage-failure recovery;
- root-only static-host load and refresh, with no URL-based product routes;
- exactly-three, empty, exhausted, loading, and retry states;
- timer behavior before and after zero and after a backward clock change;
- Reward Card, empty/non-empty History, Monthly Goal boundary, and new-month behavior;
- calm, non-technical child-facing errors;
- no media, location, account, payment, social, AI, device-control, or secret path; and
- the six-question ergonomic review in AGENTS.md for each screen before polish.

Tests prove only the behavior they execute. Release reporting must distinguish automated checks from manual checks and must not claim browser coverage that did not run.

## Accessibility and responsive baseline

Implementation must use semantic controls and document structure, associated labels and instructions, logical keyboard order, clear visible focus, readable contrast, and touch targets suitable for mobile interaction. Critical actions must not depend only on hover, color, sound, motion, or fine pointer precision.

Screen changes and errors must move or announce focus deliberately without causing repetitive child-facing announcements. A countdown must not make a screen reader announce every tick or create urgency. Motion must be restrained and respect reduced-motion preferences.

The document language and content language must match the selected supported language where applicable. Layouts must tolerate German and Russian expansion, wrapping, and larger user text without hiding primary actions or safety guidance.

The responsive approach is mobile-first, with a clear single primary action and calm reading order at narrow widths before enhancements for wider screens. Parent-facing controls remain trustworthy and control-oriented; child-facing content remains simple, playful, age-appropriate, and not overstimulating. Detailed visual design is a later specification.

## Performance boundary

The MVP should remain a small static application:

- ship only required application code and the controlled catalog/localization content;
- avoid large general-purpose dependencies when browser or small local logic is sufficient;
- perform catalog filtering and derived-state calculations locally;
- keep persisted records minimal and avoid duplicate view data;
- avoid unnecessary network dependency after the static application assets load; and
- keep interactions responsive on modern mobile browsers.

No arbitrary benchmark is invented at this documentation stage. The implementation plan must measure the real production build and investigate material regressions rather than claim an untested target.

## Production deployment boundary

An authorized implementation produces a Vite production build suitable for an HTTPS static host. The host serves the application only at `/`; product views do not require path rewrites, history fallback, or deep-link handling. The base build assumes a modern browser with JavaScript, localStorage, wall/monotonic time and internationalization APIs, and access to the static application assets. If durable storage is unavailable, only the documented temporary in-memory mode is allowed.

No backend, database, server-side rendering service, account provider, runtime environment variable, or secret is required. Hosting-specific cache, security-header, and domain settings must be reviewed when a deployment target is selected, but no SPA path fallback is needed and this stage creates no deployment files or provider configuration.

Changing the production origin changes the browser-local storage boundary and does not migrate family data automatically. That limitation must be considered before the first public deployment.

## Future architecture boundary

The persistence adapter and pure domain boundaries permit future change without prebuilding future infrastructure. The following remain future-only:

- cloud persistence and backup;
- parent accounts and authentication;
- cross-device synchronization;
- multiple Child Profiles;
- school or classroom mode;
- controlled AI-assisted Mission creation with parent review;
- native mobile integration;
- deeper parental-control or device integration; and
- remote analytics, payment, or prize-delivery systems.

None is an MVP module, hidden field, service dependency, or implementation requirement. Each requires product validation, child-safety and privacy review, updated specifications, and an active implementation plan before work begins.
