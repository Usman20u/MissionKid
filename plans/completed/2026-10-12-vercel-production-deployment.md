# MissionKid Plan 07 — Vercel production deployment

**Date:** 2026-10-12
**Status:** Complete. MissionKid V1 is deployed to Vercel production and verified. The Vercel project `mission-kid` builds `main`, and its first production deployment, `dpl_7aejsM2tdNwHtXnT6NBdwxdKUJZq`, is Ready from `8d269b2` and serves `https://mission-kid.vercel.app`. The desktop and real-phone production smoke tests passed. BLOCKERS: none. This was recorded on 2026-10-13 under *Production deployment and verification — 2026-10-13*. On the same day, the owner authorized publishing this closure through a pull request to `main`.
**Branch:** `feat/vercel-production-deployment`, taken from `main` at `8d269b2`. The plan was recorded at `00d2916`, and the closure in the commit after it.

## Authorization basis

The durable specification-completion evidence is [`plans/completed/2026-08-17-missionkid-mvp-foundation-plan.md`](../completed/2026-08-17-missionkid-mvp-foundation-plan.md), whose gate records User Story / Traceability Validation `PASSED — 10/10`, Full Specification Audit `PASSED — 10/10`, specification blockers `NONE`, and the explicit `SPEC COMPLETE` declaration. The later presentation revalidations are recorded in [Plan 06](../completed/2026-09-29-whole-application-visual-design.md), merged into `main` through PR #6 (`35ab159`), with its closure merged through PR #7 (`8d269b2`). This plan amends no specification, so no revalidation is required.

**Authorized on 2026-10-12** by the owner's instruction: inspect the build setup, determine the minimal correct Vercel configuration, and record this plan on its own branch. Connecting Vercel, deploying, pushing, opening a pull request and merging are **not yet authorized**. Each needs the owner's approval of this plan or a later explicit instruction.

**Deployed and closed on 2026-10-13.** The owner connected the Vercel project and deployed. The owner's closure instruction then authorized these steps:

- record the verified production result;
- close this plan and move it to `plans/completed/`;
- update the changelog and the references repository convention requires;
- commit the documentation-only closure and push this branch;
- open a pull request to `main` and verify that it is documentation-only and conflict-free;
- merge it with a normal merge commit and sync local `main`;
- verify that the resulting production deployment is Ready.

Supabase, backend work and another product plan remain excluded. Application source, tests, the catalog, localization, persistence, assets and Vercel runtime configuration stay unchanged.

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
- **Domain and origin.** The production origin is the project's Vercel production domain, `https://<project>.vercel.app`; it is `missionkid.vercel.app` if that name is free, and the assigned name is recorded. This origin becomes the boundary of each family's browser-local data. A later custom domain or project rename would be a new origin, and local data would not follow, because no migration exists. So if a custom domain is ever wanted, the decision is best made before the URL is shared with families. It is not part of this plan. *Recorded on 2026-10-13: the project is `mission-kid`, so the production origin is `https://mission-kid.vercel.app`. See* Production deployment and verification — 2026-10-13.
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

**Status:** done at `00d2916`.

### Task 2 — Connect and deploy

**Outcome.** A Vercel project is connected to `Usman20u/MissionKid` with production branch `main`. Its first production deployment is Ready and assigned to the production domain.

**Verification.** The build log names commit `8d269b2` on `main`, the Vite preset, Node `24.x`, the install, `npm run build` and `dist`, and it ends without an error. Any warning is recorded, such as one about the open `engines` range.

**Status:** done on 2026-10-13. The project is connected, and the first production deployment of `8d269b2` is Ready. The build log itself was not inspected for this record, so the Node version and any build warning are not recorded. Instead, the production files are byte-identical to the local `8d269b2` build, which shows the build's outcome.

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

**Status:** done on 2026-10-13. The owner's desktop check passed, and automated checks 1–4 ran in full and passed. The full flow in check 5 was not run. A shorter automated load ran instead and passed, and the owner's closure instruction superseded the full flow, as recorded under *Superseded criteria*.

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

**Status:** done on 2026-10-13. The owner reports a PASS on a real phone covering four points: the site opens, text loads, imagery loads, and *Set up MissionKid* works. The device, OS and browser were not recorded. The remaining steps were not reported, and the owner's closure instruction superseded them, as recorded under *Superseded criteria*.

### Task 5 — Record and close

**Outcome.** This plan records the production URL, the Vercel project name and production deployment, the deployed commit, the build facts, the header review, and the Task 3 and Task 4 results. The changelog records the deployment.

In `README.md`, the sentence saying that *no deployment target is configured in this repository* is corrected. It will name the production URL and its Vercel Git integration from `main`, and still state that the repository holds no hosting configuration. The plan's status becomes complete, and it moves to `plans/completed/`.

**Verification.** The scoped documentation diff, a reference check and `git diff --check`.

Merging this documentation into `main` makes Vercel build a new production deployment from the merge commit. Its application tree equals `8d269b2`'s, so it must serve the same asset names. That is checked and reported at merge time, but not written back, since a write-back would trigger another deployment.

**Status:** done in the closure commit. The merge-time check is reported with the pull request and is not written back.

## Failure, redeploy and rollback

- **The build fails.** Nothing is served at the production domain. If a Vercel setting is the cause, it is corrected and the dashboard's *Redeploy* runs the build again. If the fix would need a repository change, work stops and the deployment blocker is reported.
- **The first deployment fails a check.** The URL is not shared, the failure is recorded, and work stops for the owner's decision. Instant Rollback cannot help, because no earlier production deployment exists. The owner can make production private at once by switching Deployment Protection to *All Deployments*, which every plan offers.
- **A later production deployment misbehaves**, for example the one after the closure merge. Instant Rollback restores the verified deployment; on the Hobby plan, that is the immediately previous one. After a rollback, Vercel stops assigning new `main` deployments to production until *Undo Rollback* or a promotion, so the record states which deployment serves production.
- **The same commit needs redeploying.** The dashboard's *Redeploy* does this.
- **Family data.** Redeploys and rollbacks keep the same origin, so browser-local family data is unaffected. Only an origin change isolates it.

## Production deployment and verification — 2026-10-13

| Item | Result |
| --- | --- |
| Vercel project | `mission-kid`, connected to `Usman20u/MissionKid` by the owner |
| Framework preset | Vite |
| Production branch | `main` |
| Deployed commit | `8d269b25e521651292c90fb7e27a05c0f55f7eb5` |
| Production deployment | `dpl_7aejsM2tdNwHtXnT6NBdwxdKUJZq`, Ready. GitHub records it as a `Production` deployment of `8d269b2` created by Vercel, with the commit status *Deployment has completed* at `2026-10-13T07:50:13Z` |
| Production URL | `https://mission-kid.vercel.app`, the family's address and the origin of browser-local family data |
| Other observed aliases | `mission-kid-usman20us-projects.vercel.app` and `mission-kid-git-main-usman20us-projects.vercel.app`. Both redirect to the Vercel login under Standard Protection, so neither is public or a family address |
| Repository changes for the deployment | None: no `vercel.json`, environment variable, backend, Supabase or application source change |

This plan expected a project named `missionkid`; Vercel assigned `mission-kid`. As planned, the assigned name is recorded, and `https://mission-kid.vercel.app` is the production origin.

### Desktop smoke test — PASS

- **Owner, manual.** The owner opened the public production URL in a desktop browser, and the introduction rendered correctly.
- **Automated**, run from the development Mac at about `08:00` UTC on 2026-10-13 against `https://mission-kid.vercel.app`:
  1. `/` returns `200` `text/html`, loading exactly `/assets/index-AcNT1CgB.js` and `/assets/index-DIkimylC.css`, and `http://` answers `308` to `https://mission-kid.vercel.app/`.
  2. All `228` files of the local `8d269b2` build return `200` from production with identical SHA-256, so production serves exactly the build Plan 06 verified.
  3. `/setup`, `/history`, `/missions/helping-11`, `/index.htm` and `/favicon.ico` return Vercel's plain-text `404`, never the application.
  4. Headers were recorded for `/`, the JavaScript, the stylesheet, one font and one image, as listed under *Hosting review results* below.
  5. The full flow was replaced by a shorter load. A fresh Chrome for Testing `149` profile at `1280×900` and at `390×844` showed the English introduction with its hero image and no broken image. It opened setup through *Set up MissionKid* with the address still `/`. Each run made `11` requests, all to `https://mission-kid.vercel.app`, with no failed request, no console error and no sideways scroll.

### Real-phone smoke test — PASS

- **Owner, manual, on 2026-10-13.** The owner opened `https://mission-kid.vercel.app` on a real phone. The site opens, text loads, imagery loads, and *Set up MissionKid* works.
- The device, OS and browser were not recorded, and no screenshot was taken.

### Hosting review results

- **Cache.** Every checked file is served with `cache-control: public, max-age=0, must-revalidate`, Vercel's documented default, as expected.
- **Security.** HTTPS is served with `strict-transport-security: max-age=63072000; includeSubDomains; preload`, and HTTP redirects with `308`. No other security header is set, as expected without configuration.
- **Cross-origin header.** Static files carry Vercel's default `access-control-allow-origin: *`. They are public, carry no credentials and hold no family data, so this exposes nothing.
- **Content types.** `text/html`, `application/javascript`, `text/css`, `font/woff2` and `image/webp`, all correct.
- **Domain.** Settled as planned; no custom domain.

### Superseded criteria

Two planned criteria were neither run nor reported:

- Task 3's full automated flow in check 5;
- Task 4's steps beyond the four the owner reported, together with the per-step device record.

They are not marked achieved. The owner's closure instruction of 2026-10-13 supersedes them: it accepts the owner's desktop and phone checks as the production smoke test. The basis for that is that production serves files byte-identical to the build Plan 06 verified on every view in English, German and Russian, and on two real phones through the Mission journey to the Reward Card and History. The host only delivers those static files.

The local review folder `MissionKid-Plan07-vercel-deployment` holds the build manifests, the production hashes, the headers, the route checks, the browser-load result and the script that produced it.

## Closure — 2026-10-13

Plan 07 is complete, and MissionKid V1 is deployed to production:

- **Production URL:** `https://mission-kid.vercel.app`
- **Initial verified production commit:** `8d269b2`
- **Production deployment:** `dpl_7aejsM2tdNwHtXnT6NBdwxdKUJZq`
- **Desktop production smoke test:** PASS
- **Real-phone production smoke test:** PASS
- **BLOCKERS:** none

No application source, test, catalog, localization, persistence, asset or Vercel runtime configuration changed during this plan. `README.md` now names the production URL.

Merging this closure into `main` creates a new production deployment from the merge commit, whose application tree is `8d269b2`'s. Its readiness and unchanged files are checked at merge time and reported with the pull request, not written back here.
