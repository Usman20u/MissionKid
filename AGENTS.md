# MissionKid Repository Execution Contract

## Authority

- `docs/business-context.md` owns the real problem and business framing.
- `docs/global-spec.md` owns product purpose and MVP boundaries.
- `docs/functional-map.md` owns the capability map; `docs/user-stories.md` validates approved behavior and traceability but does not add behavior.
- `docs/specs/functions/` contains the detailed functional behavior owned by stable IDs `F001`–`F004`.
- `docs/specs/technical/` owns architecture, data and state, persistence, technical recovery, timer and localization mechanics, and implementation boundaries.
- `docs/specs/mission-catalog-and-safety.md` owns Mission content eligibility, writing, age suitability, adult-involvement meaning, localization equivalence, and content safety.
- `docs/specs/visual-and-ergonomic.md` owns presentation, ergonomics, responsive presentation, accessibility presentation, and visual safety prominence.
- `docs/roadmap.md` owns phased future scope; a roadmap item is not implementation authorization.
- The repository plan system owns current execution status. Exactly one plan may be active under `plans/active/`; completed plans under `plans/completed/` are authoritative historical evidence. `AGENTS.md` defines policy, not live project status.
- The active plan owns authorized execution scope but cannot override an owning specification. The dated changelog records factual completed project changes and does not authorize work.

## Governing workflow and implementation gate

Before making changes, read the active plan and the specifications that own or constrain the requested work.

Progress new work through the applicable stages in this order; do not repeat stages that are already complete and still valid:

```text
REAL PROBLEM
→ BUSINESS CONTEXT
→ GLOBAL SPEC
→ FUNCTIONAL MAP
→ FUNCTION SPECS
→ TECHNICAL SPECS
→ CROSS-CUTTING SPECS
→ USER-STORY / TRACEABILITY VALIDATION
→ FULL SPEC AUDIT
→ SPEC COMPLETE
→ IMPLEMENTATION PLAN
→ CODE
→ TEST
→ AUDIT
→ CHANGELOG
→ COMMIT
→ MERGE / RELEASE
```

The specification/foundation plan may declare `SPEC COMPLETE` only after it records all of the following:

1. User Story / traceability validation passed;
2. Full Specification Audit passed;
3. every blocker required for specification completion is resolved; and
4. the explicit declaration `SPEC COMPLETE`.

That plan must then have truthful completed status and move from `plans/active/` to `plans/completed/`. The completed specification/foundation plan containing the declaration is the durable repository evidence that the specification gate passed. Do not infer `SPEC COMPLETE` from approved individual specifications, the absence of known blockers, Technical Specifications, a clean working tree, or an active implementation plan's assertion.

Only after that move may an approved implementation plan become the sole active plan. It must explicitly reference the completed specification/foundation plan and its recorded `SPEC COMPLETE` declaration.

Product implementation requires both:

1. durable `SPEC COMPLETE` evidence in the completed specification/foundation plan; and
2. the sole active plan to be an approved implementation plan that references that evidence.

An active plan alone and Technical Specifications alone do not authorize code. If either condition is absent, do not implement product code or add product runtime, `src/`, package or runtime setup, implementation dependencies, backend, database, or deployment implementation.

`SPEC COMPLETE` remains valid only while its approved specification basis remains valid. A later material change to an approved specification that affects product behavior, architecture or technical boundaries, Mission eligibility or safety, state or interaction rules, or other implementation requirements pauses affected implementation until the applicable specification stages, User Story / traceability validation, and Full Specification Audit are revalidated and renewed authorization is explicitly recorded in the repository plan system; the earlier completed gate does not authorize the affected work. Clearly non-semantic documentation corrections—including typos, Markdown formatting, and reference or path fixes—and ordinary implementation choices delegated by unchanged approved specifications do not trigger revalidation.

## Decisions, scope, and traceability

- Specifications are the source of truth for approved behavior. Do not invent unspecified behavior or silently reinterpret an approved specification.
- Stop and report when authoritative specifications conflict, required product behavior is missing, requested work contradicts approved scope, completion would require inventing a product or specification decision, or a change would weaken an approved safety, privacy, state, or interaction rule.
- Do not stop for an ordinary implementation choice already delegated by approved specifications and the active implementation plan; make the smallest reasonable choice and verify it.
- Follow `ONE PROBLEM → ONE PROJECT → ONE SOLUTION`. Use the smallest implementation that fully satisfies approved requirements.
- Do not add convenience or future features, speculative infrastructure, abstractions, services, dependencies, configuration, or documentation solely for perceived professionalism. Every artifact and dependency needs a clear role in approved work.
- Trace behavior-affecting work to `F001`, `F002`, `F003`, or `F004`, or to the appropriate cross-cutting specification. Implementation plans must identify the relevant ownership; do not require Function IDs on every code line, commit line, or test.
- Never weaken authoritative safety, privacy, MVP, or future-scope boundaries. Consult and update the owning specification and active plan before an approved behavior or architecture change.

## Plan discipline

- Keep exactly one active work or implementation plan under `plans/active/`; move it to `plans/completed/` only when its status is truthfully complete.
- Plan status must reflect repository reality.
- Every plan task needs a concrete outcome, specification trace, and verification or test intent.
- Do not add a parallel project-management system.

## Implementation quality

- Verify implementation behavior against its owning specifications, including applicable error and recovery behavior. Build or compilation success alone is insufficient.
- Give every implementation task a test or verification intent, run the relevant checks before claiming completion, and report failures and checks truthfully.
- Every approved MVP view or state that is implemented must receive the ergonomic review required by `docs/specs/visual-and-ergonomic.md` before it is considered polished. Prefer `1–3` targeted improvements; do not perform a broad redesign unless the specification requires it.
- Before a meaningful commit, inspect the actual diff, run relevant validation, compare behavior with owning specifications, confirm no unrelated changes, identify real blockers, and make targeted fixes only. Audit is a quality gate, not permission for scope expansion; do not rewrite correct work merely for style.

## Git and changelog discipline

Use this working model unless an approved workflow explicitly requires otherwise:

```text
one plan → one focused branch → work → tests/checks → audit → clean commit(s) → push → merge → return to main
```

- Create a branch only when it is useful, not to appear sophisticated. Do not mix unrelated work or casually rewrite Git history.
- Do not push or merge without explicit authorization for the current work.
- Update the dated changelog for every meaningful change. Record factual project changes only; do not claim implementation that does not exist, rewrite history for presentation, turn the changelog into a shell-command diary, or include conversational coaching.

## Repository hygiene

- Keep the repository minimal and add only files required by approved specifications and the active plan.
- Keep repository content, specifications, code, changelog entries, and commit messages in English.
- Report only implementation, completion, test, and verification work that actually occurred.
- Repository material must read as MissionKid project material. Do not add unrelated mentor, reviewer, or person names; coaching or conversation text; prompt history; hidden reasoning; unnecessary AI metadata; personal information; generated junk; or speculative future features presented as approved scope.
- Never add secrets, credentials, tokens, or private keys.
