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

- Four focused MVP feature specifications under `docs/specs/`
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

- `docs/technical-architecture.md` — complete
- `docs/data-and-state-model.md` — complete
- One locked, minimal MVP web stack and deployment boundary
- Browser-local persistence, recovery, and versioning strategy
- Conceptual application data, state, invariants, and recovery rules

### Completion criteria

- The architecture selects React, TypeScript, Vite, a root-only single-route responsive static web application, browser-local persistence, a static controlled Mission catalog, and static English, German, and Russian localization dictionaries.
- Application boundaries and the complete setup-to-Monthly-Goal technical data flow distinguish persisted, temporary runtime, bundled static, and derived state.
- Persistence behavior covers refresh, browser restart, temporary in-memory degradation, write failure, invalid or corrupted data, unsupported schema versions, reset, and one simplified versioned `localStorage` snapshot without claiming cloud or offline support.
- MVP supports one active tab at a time; concurrent multi-tab use and multi-writer coordination are explicitly unsupported rather than implemented through locking, lease, takeover, or stale-write protocols.
- Mission catalog behavior uses deterministic ordering, bounded set advancement, defensive invalid-record exclusion, and controlled insufficient-content handling.
- Documentation ownership is explicit: the feature specifications own Mission Catalog discovery and timer product behavior, the Technical Architecture owns stack, module, flow, and deployment decisions, and the Data and State Model owns conceptual state and persistence representation without duplicating those rules.
- Localization, backward-clock-safe timer guidance, deterministic recovery, privacy, child safety, security, accessibility, responsive behavior, performance, deployment, testing, and future-only boundaries are defined.
- The data and state model preserves the exact Mission Session lifecycle and uses completed Mission Sessions as the sole source for derived Reward Cards, Mission History, Monthly Goal progress, and the one goal-complete prompt identity.
- Technical tests cover the supported one-active-tab flow, deterministic catalog behavior, storage and version recovery, static-SPA hydration, and backward-clock anomalies in addition to the core product flow.
- No backend, authentication, product code, database migration, package, runtime tooling, UI implementation, deployment configuration, or secret is added.
- The unnecessary multi-tab concurrency architecture was removed, and the focused technical cleanup passed re-audit.
- Both technical documents passed final manual review; the Technical Specification Layer is complete, and implementation guessing is no longer required for this technical layer.
- The overall foundation plan remains `Active` because later specification layers remain.
