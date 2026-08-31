# MissionKid MVP Foundation Plan

**Date:** 2026-08-17
**Status:** Active

## Goal

Create a minimal, professional, specs-first repository foundation for MissionKid's global MVP without adding product or runtime implementation.

## Scope

- Define the product problem, users, value, global positioning, safety principles, and MVP boundaries.
- Specify the MVP flow, Mission Categories, conceptual entity relationships, features, success criteria, and functional map for families with children aged 4–10.
- Document the phased roadmap and clearly separate future features from MVP v1.
- Establish repository guidance, language policy, audit criteria, and a dated change record.

## Out of scope

- Product code, runtime implementation, UI implementation, and project scaffolding
- Authentication, payments, social features, chat, and child accounts
- Photos or videos of children and public leaderboards
- Native mobile app work, AI mission generation, and device blocking
- Secrets and folders or tooling not required by the Day 1 foundation

## Day 1 deliverables

- `README.md`
- `AGENTS.md`
- `docs/business-context.md`
- `docs/global-spec.md`
- `docs/functional-map.md`
- `docs/roadmap.md`
- `plans/active/2026-08-17-missionkid-mvp-foundation-plan.md`
- `plans/completed/`
- `changelog/2026-08-17.md`

## Acceptance criteria

- The repository describes MissionKid as a global family product that turns screen time into short real-life action.
- The MVP target is consistently documented as families with children aged 4–10 using the inclusive age bands 4–6, 7–8, and 9–10.
- Mission Category is the only category-selection term, with Movement, Creativity, Helping at Home, Learning, and Calm as the five MVP categories.
- The complete MVP v1 flow, its main entities, and only MVP-level functions are documented consistently.
- English is documented as the repository, code, specification, commit, and default UI language; German and Russian are documented as additional MVP UI languages.
- Child safety principles and all MVP exclusions are explicit, including no infinite feeds, manipulative engagement loops, in-app retention pressure, public child profiles, likes, gambling or loot-box mechanics, or paid competition.
- Conceptual entity ownership and relationships are clear without introducing database design.
- Future roadmap ideas are clearly marked as future and not implemented.
- Repository instructions enforce specs-first work, active-plan authorization, honest reporting, a targeted ergonomic review before UI polish, minimal structure, changelog updates, and safe handling of missing context.
- No product code, runtime implementation, package tooling, secrets, or unnecessary files are present.
- The dated changelog accurately records the foundation work.

## Checks

Run from the repository root:

```bash
git status --short
find . -maxdepth 4 -type f | sort
```

If the directory is not a Git repository, report that clearly instead of presenting a fabricated Git status.

Review the resulting file list and content against every acceptance criterion and hard boundary.

## Completion rules

1. All Day 1 deliverables exist and agree with the product brief.
2. The required checks have run, with any missing Git repository or other issue reported accurately.
3. No unexpected file, implementation artifact, or secret is present.
4. The changelog reflects the verified repository state.
5. Keep this plan active until all criteria pass; move it to `plans/completed/` only as a deliberate later change.
6. `plans/completed/` may remain empty and untracked until the first plan is completed; no placeholder file is required.

## Day 2 feature-spec layer

**Status:** Completed — ready for re-audit

### Deliverables

- Four focused MVP Function Specifications under `docs/specs/functions/`
- Concise parent and child user stories in `docs/user-stories.md`
- Capability-to-spec traceability in `docs/functional-map.md`
- Product-level alignment for the approved age bands, controlled predefined mission catalog, and Mission Session lifecycle

### Completion criteria

- The four specifications cover the complete MVP flow with testable acceptance criteria and relevant edge states.
- User stories map only to behavior defined by the MVP specifications.
- Mission Break is defined as a guided transition and not device blocking or operating-system control.
- Monthly Goal remains fixed at 20 valid completed Mission Sessions per monthly period.
- Documentation terminology and safety boundaries remain consistent.
- No product code, runtime tooling, packages, or UI implementation are added.
- Required consistency and diff checks pass.

## Day 3 technical-spec layer

**Status:** Complete — passed cleanup re-audit and final manual review

### Deliverables

- `docs/specs/technical/technical-architecture.md` — complete
- `docs/specs/technical/data-and-state-model.md` — complete
- One locked, minimal MVP web stack and deployment boundary
- Browser-local persistence, recovery, and versioning strategy
- Conceptual application data, state, invariants, and recovery rules

### Completion criteria

- The architecture selects React, TypeScript, Vite, a root-only single-route responsive static web application, browser-local persistence, a static controlled Mission catalog, and static English, German, and Russian localization dictionaries.
- Application boundaries and the complete setup-to-Monthly-Goal technical data flow distinguish persisted, temporary runtime, bundled static, and derived state.
- Persistence behavior covers refresh, browser restart, temporary in-memory degradation, write failure, invalid or corrupted data, unsupported schema versions, reset, and one simplified versioned `localStorage` snapshot without claiming cloud or offline support.
- MVP supports one active tab at a time; concurrent multi-tab use and multi-writer coordination are explicitly unsupported rather than implemented through locking, lease, takeover, or stale-write protocols.
- Mission catalog behavior uses deterministic ordering, bounded set advancement, defensive invalid-record exclusion, and controlled insufficient-content handling.
- Documentation ownership is explicit: the Function Specifications own Mission Catalog discovery and timer product behavior, the Technical Architecture owns stack, module, flow, and deployment decisions, and the Data and State Model owns conceptual state and persistence representation without duplicating those rules.
- Localization, backward-clock-safe timer guidance, deterministic recovery, privacy, child safety, security, accessibility, responsive behavior, performance, deployment, testing, and future-only boundaries are defined.
- The data and state model preserves the exact Mission Session lifecycle and uses completed Mission Sessions as the sole source for derived Reward Cards, Mission History, Monthly Goal progress, and the one goal-complete prompt identity.
- Technical tests cover the supported one-active-tab flow, deterministic catalog behavior, storage and version recovery, static-SPA hydration, and backward-clock anomalies in addition to the core product flow.
- No backend, authentication, product code, database migration, package, runtime tooling, UI implementation, deployment configuration, or secret is added.
- The unnecessary multi-tab concurrency architecture was removed, and the focused technical cleanup passed re-audit.
- Both technical documents passed final manual review; the Technical Specification Layer is complete, and implementation guessing is no longer required for this technical layer.
- The overall foundation plan remains `Active` because later specification layers remain.

## Day 4 Mission Catalog & Safety specification layer

**Status:** Complete — passed specification audit and final manual review

### Deliverable

- `docs/specs/mission-catalog-and-safety.md`

### Completion criteria

- The specification defines a Mission around the approved screen-to-real-world product problem and preserves the exact five Mission Categories and age bands `4–6`, `7–8`, and `9–10`.
- Mission content shape remains aligned with the Technical Architecture and Data and State Model without redefining storage or runtime algorithms.
- Content-writing, age-scaling, child-safety, adult-involvement, materials/environment, category-specific, privacy, reward/engagement, and English/German/Russian localization rules are explicit and non-diagnostic.
- Catalog eligibility, invalid or incomplete content exclusion, existing-session safety, and conceptual exactly-three coverage are defined without creating Mission entries or inventing a catalog size.
- Source-of-truth ownership is explicit: Function Specifications own interaction behavior; Technical Architecture owns runtime implementation; Data and State Model owns conceptual data and state; this specification owns content eligibility, safety, age suitability, and writing rules; later visual specifications own presentation.
- No actual Mission catalog, product code, runtime AI, CMS or moderation platform, backend, package, runtime tooling, database, deployment configuration, or new product feature is added.
- `docs/specs/mission-catalog-and-safety.md` passed strict specification audit, the targeted manual-review fix, and final manual confirmation.
- The adult-involvement ambiguity was resolved, and exact interaction/presentation timing was returned to the relevant interaction and later Visual/Ergonomic specification layers.
- The Mission Catalog & Safety Layer is complete; no actual Mission catalog or Mission entries, product code, or runtime tooling were added.
- The overall foundation plan remains `Active` because later specification layers remain.

## Specification structure normalization

**Status:** Complete — Specification Structure Audit passed with no blockers

### Structural changes

- The four approved Function Specifications now use stable identifiers `F001`–`F004` and numbered paths under `docs/specs/functions/`.
- Technical Architecture and Data and State Model now live under `docs/specs/technical/`.
- Mission Catalog and Safety remains separate at `docs/specs/mission-catalog-and-safety.md` as a cross-cutting content and safety specification.
- The Functional Map and all User Stories trace correctly to `F001`–`F004` at their normalized paths.
- The repository stale-path and Markdown-link audit passed with no broken or incorrect specification links.
- Function Specification contents remained semantically unchanged, Technical Specification meaning remained unchanged, and Mission Catalog and Safety remained unchanged.
- No approved product behavior or technical behavior changed.
- No product implementation, actual Mission catalog, package, runtime tooling, backend, database, deployment configuration, or secret was added.
- The Specification Structure Audit passed with no blockers.
- The overall foundation plan remains `Active`.

## Day 5 Visual & Ergonomic specification layer

**Status:** Complete — focused re-audit passed 10/10 with no blockers and final manual approval passed

### Deliverable

- `docs/specs/visual-and-ergonomic.md`

### Approved scope

- Defines documentation-only visual hierarchy, ergonomic clarity, mobile-first responsive presentation, accessibility presentation, safety prominence, parent/child presentation tone, localization resilience, and anti-manipulation rules for the approved MVP.
- Covers only the presentation of behavior owned by Function Specifications `F001`–`F004` and preserves the mechanics and rules owned by the Technical Specifications and Mission Catalog and Safety.
- Introduces no new Function ID, product behavior, actual Mission entry, mockup, design system, product code, package, or runtime tooling.
- The Visual & Ergonomic Specification is approved and complete.
- The overall foundation plan remains `Active`.

### Completion record

- The strict source-of-truth audit found exactly two targeted blockers.
- Timer/recovery scope was narrowed to valid active Mission Sessions, without changing recovery mechanics or product behavior.
- Ergonomic review coverage was corrected to every approved MVP view or state that is implemented before it is considered polished.
- The focused re-audit passed with a score of 10/10 and no blockers.
- Final manual document review and approval passed.
- Final Mission Catalog link and recovery-table Markdown formatting corrections were completed without semantic change.
- The Visual & Ergonomic Layer is complete; no product or technical behavior changed, and no design system, mockups, actual Mission entries, product code, packages, or runtime tooling were added.

## AGENTS execution-contract finalization

**Status:** Complete — `AGENTS.md` approved after final manual confirmation

### Finalization record

- The AGENTS / AI Execution Rules Audit completed, and the targeted repository execution-contract finalization was performed.
- No `SKILL.md` was created because the audit determined `NO SKILL NEEDED`.
- The stale Technical Architecture ergonomic reference was corrected to the approved Visual & Ergonomic Specification without changing technical meaning.
- Approved product behavior and specification meaning remained unchanged; no product code or runtime tooling was added.
- The execution-contract layer passed focused re-audit and remained awaiting final manual review at that stage; it was not yet complete or approved.
- The overall foundation plan remains `Active`; implementation remains unauthorized pending User Story / traceability validation, Full Specification Audit, explicit `SPEC COMPLETE`, and a future approved active implementation plan.

### Durable authorization correction

- The full AGENTS final audit scored `9/10` and found one remaining blocker: transient AGENTS project-state wording and undefined durable `SPEC COMPLETE` evidence and current-status authority.
- Transient live project status was removed from `AGENTS.md`; the repository plan system now owns current execution status.
- A truthfully completed specification/foundation plan under `plans/completed/` is now defined as the durable owner of explicit `SPEC COMPLETE` evidence after passed traceability validation, passed Full Specification Audit, and resolved completion blockers.
- A later approved implementation plan must become the sole active plan and reference that completed gate evidence; the specification/foundation plan and implementation plan cannot remain active together.
- Technical Specification ownership wording was narrowed from generic recovery to technical recovery without changing technical or product behavior.
- No `SKILL.md`, product code, runtime tooling, or new project-management file was added.

### Focused authorization re-audit

- The focused read-only re-audit confirmed that the transient-state blocker was resolved, durable `SPEC COMPLETE` evidence and implementation authorization are unambiguous, scenarios A–F passed, and no source-of-truth conflict or technical behavior change occurred; it also confirmed `NO SKILL NEEDED`.
- At that stage, AGENTS remained awaiting final manual review and was not yet approved; the overall foundation plan remained `Active`.

### Post-`SPEC COMPLETE` validity guard

- Final manual AGENTS review found one post-`SPEC COMPLETE` validity edge case: completed gate evidence could otherwise be read as automatically authorizing affected implementation after a material change to its approved specification basis.
- A targeted validity guard was added so material approved-specification changes affecting product behavior, architecture or technical boundaries, Mission eligibility or safety, state or interaction rules, or other implementation requirements invalidate automatic reliance on stale gate evidence for affected implementation; the applicable specification, traceability, and Full Specification Audit stages must be revalidated, and renewed authorization must be explicit.
- Typo corrections, Markdown formatting, reference or path fixes, and other clearly non-semantic documentation corrections do not trigger revalidation.
- No product behavior or technical behavior changed; AGENTS remains awaiting final manual confirmation and is not yet approved, and the overall foundation plan remains `Active`.

### Completion record

- Final manual confirmation passed; `AGENTS.md` is approved, and the AI Execution Contract Layer is complete.
- `NO SKILL NEEDED` remains the final decision; no product behavior, technical behavior, product code, packages or runtime tooling, or Mission content changed.
- The overall foundation plan remains `Active`; `SPEC COMPLETE` has not been declared, and no implementation plan was created.
