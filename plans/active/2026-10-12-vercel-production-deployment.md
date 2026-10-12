# MissionKid Plan 07 — Vercel production deployment

**Date:** 2026-10-12
**Status:** Active — recorded before any deployment and awaiting the owner's approval. Task 1, this record, is done; Tasks 2–5 are not started. No Vercel project is connected, and nothing is deployed, pushed or merged.
**Branch:** `feat/vercel-production-deployment`, taken from `main` at `8d269b2`.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration. The later presentation revalidations are recorded in [Plan 06](../completed/2026-09-29-whole-application-visual-design.md), merged into `main` through PR #6 (`35ab159`), with its closure merged through PR #7 (`8d269b2`). This plan amends no specification, so no revalidation is required.

**Authorized on 2026-10-12** by the owner's instruction: inspect the build setup, determine the minimal correct Vercel configuration, and record this plan on its own branch. Connecting Vercel, deploying, pushing, opening a pull request and merging are **not yet authorized**. Each needs the owner's approval of this plan or a later explicit instruction.

## Outcome

The exact verified MissionKid V1 — the application tree of `main` at `8d269b25e521651292c90fb7e27a05c0f55f7eb5` — is served by Vercel at a stable public HTTPS production URL, with `main` as the production branch. It is verified on desktop and on at least one real phone. The URL and the result are recorded here, and this plan is then closed.

## Owning specifications

The [Technical Architecture](../../docs/specs/technical/technical-architecture.md) owns this work:

- *Deployment and runtime shape* and *Root-only navigation*: a static SPA served only at `/`, where any non-root path gets a hosting-level not-found response; no application server, serverless function, database, authentication provider or secret.
- *Privacy and child-safety architecture*: no analytics SDK.
- *Security boundaries*: HTTPS, and no family state logged to third parties.
- *Manual release checks*: root-only static-host load and refresh.
- *Performance boundary*: assets served from the application's own origin.
- *Production deployment boundary*: cache, security-header and domain settings are reviewed when a target is selected, and an origin change isolates browser-local data.

In the [Data & State Model](../../docs/specs/technical/data-and-state-model.md), *Privacy, safety, and limitations* scopes family data to one origin and browser profile.

No `F001`–`F004` behavior, Mission content or presentation changes. Those flows are exercised only to verify production.

## Exclusions

Out of scope:

- Supabase or any other backend, database, storage integration or serverless function;
- accounts, login and authentication;
- analytics, Speed Insights and any tracking;
- new product functionality;
- Mission lifecycle, persistence, catalog, localization or design changes;
- a custom domain;
- repository hosting configuration.

Application code changes only if an actual deployment blocker is found, and then work stops and the blocker is reported first.

## Build inspection — 2026-10-12

Inspected at `8d269b2` with a clean worktree. A fresh clone of that commit was installed with `npm ci` and built twice: once with Node `20.20.2` and once with Node `24.21.0`.

| Item | Finding |
| --- | --- |
| Framework | Vite `8.2.2` with `@vitejs/plugin-react` `6.1.1` and React `19.2.8`; no other framework. `vite.config.ts` sets no `base`, so the build is rooted at `/`. |
| Install | `package-lock.json` (lockfile version 3) pins every package exactly. It includes the Linux x64 native packages for Rolldown `1.2.7`, Lightning CSS `1.33.0` and TypeScript `7.0.2`, so a Linux build host installs from it unchanged. |
| Build command | `npm run build`, which runs `tsc --noEmit && vite build`. |
| Output directory | `dist/`, holding `index.html` and `assets/`: `228` files, `27,164,199` bytes. That is one HTML, one JavaScript and one CSS file, three `woff2` fonts and `222` WebP images. |
| Verified artifact | `index.html` loads `/assets/index-AcNT1CgB.js` and `/assets/index-DIkimylC.css`. This is the build that Plan 06's final visual audit and its physical-phone check verified. |
| Node.js | `package.json` requires `>=20.19.0`. Vercel currently offers Node `24.x` (its default) and `22.x`, and resolves a `>=` range to the latest `24.x`. The two local builds produced all `228` files byte-identical by SHA-256. |
| Routing | There is no router, History API use, URL state or deep link; views are selected from application state. |
| Network and secrets | There is no `fetch`, other request or service-worker code. The built JavaScript and CSS contain no external request URL, only XML namespace identifiers and React's error-reference text, and fonts and images are same-origin. The one `import.meta.env` read is Vite's built-in `DEV` flag. There are no environment variables, no `.env` files and no `api/` directory. |
| Favicon | None is built. A browser's automatic `/favicon.ico` request gets the host's not-found response, like any non-root path, and no asset is added. |

## Vercel configuration

**No repository configuration is required.** Vercel detects its Vite preset from `package.json`, and the preset's defaults match this build. So there is no `vercel.json`, no change to `package.json`, `engines`, the Vite configuration or the source, and no environment variable. `.vercel/` is already ignored by Git.

**No SPA rewrite is required, and none may be added.** The application lives only at `/`, and the Technical Architecture makes any other path a hosting-level not-found response. Vercel adds a fallback for a Vite application only when `vercel.json` defines a rewrite, so the default behavior is exactly what the specification requires.

The expected project settings, to be confirmed in the Vercel dashboard at import:

| Setting | Value |
| --- | --- |
| Git repository | `Usman20u/MissionKid` |
| Production branch | `main` |
| Framework preset | Vite, auto-detected |
| Root directory | `./` |
| Install command | `npm install`, Vercel's default for `package-lock.json` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js version | `24.x`, from the `engines` range |
| Environment variables | None |
| Deployment Protection | Vercel's default Standard Protection: the production domain is public; preview and generated deployment URLs require a Vercel login |
| Not enabled | Web Analytics, Speed Insights, storage or database integrations, marketplace integrations, a custom domain |

## Hosting review

The Technical Architecture requires a review of cache, security-header and domain settings once a deployment target is selected.

- **Cache.** For static files, Vercel's documented default is `cache-control: public, max-age=0, must-revalidate`. Every visit revalidates, so a new deployment is never hidden behind a stale copy. Hashed assets therefore get no long-lived browser cache. That would be a performance refinement no specification requires, and it is not part of this plan.
- **Security headers.** HTTPS is required, and Vercel provides it on its domains. No specification requires a custom header. The application loads no third-party script, calls no API, holds no secret and renders no raw HTML, and family data stays in first-party browser storage. Task 3 records the headers production actually sends. Any later hardening, such as a Content Security Policy, would be separate approved work.
- **Domain and origin.** The production origin is the project's Vercel production domain, `https://<project>.vercel.app`; it is `missionkid.vercel.app` if that name is free, and the assigned name is recorded. This origin becomes the boundary of each family's browser-local data. A later custom domain or project rename would be a new origin, and local data would not follow, because no migration exists. So if a custom domain is ever wanted, the decision is best made before the URL is shared with families. It is not part of this plan.
- **Other origins.** Generated deployment URLs, preview URLs and the earlier local and LAN previews are all different origins. None of them is the family's address.

## Sequence

1. The owner approves this plan.
2. The owner imports `Usman20u/MissionKid` in the Vercel dashboard and confirms the settings above; this needs the owner's Vercel login and GitHub access. Nothing is merged into `main` between approval and the first production deployment, so Vercel builds `8d269b2` itself.
3. Production is verified (Tasks 2–4).
4. The result is recorded and this plan is closed (Task 5). Each push, pull request and merge needs explicit authorization.

## Tasks

### Task 1 — Plan recorded

**Outcome.** This plan and its changelog entry are committed on `feat/vercel-production-deployment`, with no other change.

**Verification.** The scoped diff, a reference check and `git diff --check`.

**Status:** done in this commit.

### Task 2 — Connect and deploy

**Outcome.** A Vercel project is connected to `Usman20u/MissionKid` with production branch `main`. Its first production deployment is Ready and assigned to the production domain.

**Verification.** The build log names commit `8d269b2` on `main`, the Vite preset, Node `24.x`, the install, `npm run build` and `dist`, and it ends without an error. Any warning is recorded, such as one about the open `engines` range.

**Status:** not started; needs approval.

### Task 3 — Production check on desktop

**Outcome.** The production domain serves the verified build correctly.

**Verification**, automated against the production domain with `curl` and Chrome for Testing:

1. `https://<domain>/` returns `200` HTML that loads exactly `/assets/index-AcNT1CgB.js` and `/assets/index-DIkimylC.css`, and `http://` redirects to HTTPS.
2. All `228` files of the local `8d269b2` build are fetched from production. Each returns `200` with the same SHA-256 as the manifests in the local review folder `MissionKid-Plan07-vercel-deployment`.
3. Non-root paths such as `/setup`, `/history` and `/missions/helping-11` return a hosting-level `404`, never the application.
4. Response headers for `/`, the JavaScript, the stylesheet, one font and one image are recorded: cache, content type, HSTS and any security headers.
5. A fresh browser profile at `1280×900` and `390×844` runs the full flow:
   - the introduction, switching to German and Russian and back;
   - setup, a Mission Category, and three Missions with images and safety notes;
   - Ready, then Active;
   - a reload on setup, Ready, Active and the Reward Card, each restoring the same view without restarting the timer;
   - completion exactly once, the Reward Card, History with one entry, and the Monthly Goal at `1 / 20`.

   Throughout, the address stays `/`, every request goes to the production origin, the console shows no error and nothing scrolls sideways.

If the owner also checks in a desktop browser, that check is recorded separately from the automated run.

**Status:** not started.

### Task 4 — Real-phone check

**Outcome.** The production URL works on at least one real phone. Preferably the check uses both Plan 06 devices: the iPhone 15 Pro (iOS 18.6, Safari) and the Samsung Galaxy S24 (Android 15, Chrome).

**Verification**, operated by the owner on the production URL:

1. The URL opens over HTTPS without a warning.
2. The introduction and the English, German and Russian language switch work.
3. Setup saves.
4. Discovery shows three Missions with images and safety notes.
5. Ready leads to Active.
6. A reload during Active restores it without restarting the timer.
7. Locking and unlocking the phone returns to Active.
8. The Mission completes exactly once and shows the Reward Card.
9. History shows one completion.
10. Nothing scrolls sideways or is clipped.

Each phone's record gives the device, OS, browser and version, the date, and PASS or FAIL per step. Nothing is inferred, and a simulator or emulator does not count. The test leaves real data in that phone's browser for the production origin; resetting from Settings or clearing site data removes it.

Plan 06 already verified this artifact's presentation and behavior in depth: `432` surface measurements, `30` keyboard walks, and both phones on the LAN preview. Tasks 3 and 4 verify that the host delivers it, without repeating that matrix.

**Status:** not started.

### Task 5 — Record and close

**Outcome.** This plan records the production URL, the Vercel project name and production deployment, the deployed commit, the build facts, the header review, and the Task 3 and Task 4 results. The changelog records the deployment.

In `README.md`, the sentence saying that *no deployment target is configured in this repository* is corrected. It will name the production URL and its Vercel Git integration from `main`, and still state that the repository holds no hosting configuration. The plan's status becomes complete, and it moves to `plans/completed/`.

**Verification.** The scoped documentation diff, a reference check and `git diff --check`.

Merging this documentation into `main` makes Vercel build a new production deployment from the merge commit. Its application tree equals `8d269b2`'s, so it must serve the same asset names. That is checked and reported at merge time, but not written back, since a write-back would trigger another deployment.

**Status:** not started.

## Failure, redeploy and rollback

- **The build fails.** Nothing is served at the production domain. If a Vercel setting is the cause, it is corrected and the dashboard's *Redeploy* runs the build again. If the fix would need a repository change, work stops and the deployment blocker is reported.
- **The first deployment fails a check.** The URL is not shared, the failure is recorded, and work stops for the owner's decision. Instant Rollback cannot help, because no earlier production deployment exists. The owner can make production private at once by switching Deployment Protection to *All Deployments*, which every plan offers.
- **A later production deployment misbehaves**, for example the one after the closure merge. Instant Rollback restores the verified deployment; on the Hobby plan, that is the immediately previous one. After a rollback, Vercel stops assigning new `main` deployments to production until *Undo Rollback* or a promotion, so the record states which deployment serves production.
- **The same commit needs redeploying.** The dashboard's *Redeploy* does this.
- **Family data.** Redeploys and rollbacks keep the same origin, so browser-local family data is unaffected. Only an origin change isolates it.
