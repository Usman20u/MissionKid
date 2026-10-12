# Plan 06 — restored Learning illustrations, 2026-10-05

Evidence for the bounded [Held Learning-image set](../../plans/completed/2026-09-29-whole-application-visual-design.md#held-learning-image-set--2026-10-05). This records implementation inspection and verification, without human acceptance or release approval.

Baseline: clean `feat/reference-visual-redesign` at `7b618bfdf059c2bb32901b6e2ea030b431589a5f`, production `index-C-2mnqdV.js` / `index-DIkimylC.css`. Checked build: **`index-TVY2kKpW.js` / `index-DIkimylC.css`**.

[Assets](assets.json) pin the supplied PNG hash, encoding method, six WebP dimensions/bytes/hashes and unchanged package/manifest matches for `learning-04` and `learning-14`. The named Desktop replacement was absent; the attachment was inspected and used. The pencil sits across one flat finger, low over a table, matching the first step of learning-13's unchanged instruction. The earlier spoon composition is superseded, not achieved; the rejected spoon file is not used.

[Build basis](build-basis.json) pins input, checker and production-file SHA-256 hashes. The preserved baseline has 222 files and the final build 228: six new images plus replacement JavaScript, the prior JavaScript removed, and `index.html` updated. All 220 other shared files are byte-identical, including CSS, existing imagery and fonts. The source diff changes only the obsolete lookup comment, affected tests and six assets; consumer/state/persistence/catalog/configuration files remain unchanged.

| Production browser check | Journeys | Checked states | Failures |
| --- | ---: | ---: | ---: |
| [Normal images](browser.json) / [log](browser.log) | 45 | 405 | 0 |
| [Blocked images](blocked-browser.json) / [log](blocked-browser.log) | 9 | 81 | 0 |

Chromium `149.0.7827.55`, isolated contexts on one Mac. Every normal combination includes all three restored Missions and EN/DE/RU: desktop `1280×900` / `2×`, wide `1920×1080` / `1×`, phone width `390×780` / `3×`, and `320×700` / `2×` with both injected root and browser-default `32px` text. Blocked images cover all Missions/languages at the enlarged-root configuration.

Each journey follows setup → Learning second set → Ready → Active → Reward Card → History. Checks include Discovery reload to the existing handoff followed by reselecting the same context; Ready/Active/result reloads; an isolated valid storage fixture whose current profile age becomes `7–8` while the session keeps `9–10`; same illustration identity (either responsive width), unchanged complete instruction/safety/adult wording, local decorative images, uncropped reserved windows, no clipping/overflow/visible overlap, stable session/start facts, completion once, `1 / 20` progress, cleared result pointer after deliberate exit and no image in History. The blocked run completes the same usable flow with no reliance on decoded images.

Final gates: [type check](typecheck.log); [217 relevant tests](relevant-tests.log); [892 full-suite tests across 24 files](full-suite.log), with the established two-worker limit; [production build](build.log). Seven net cases extend recorded-age regressions across the restored set. Catalog coverage requires all 102 approved pairs and all 33 reachable sets to be illustrated; missing-illustration authored-scene tests use an isolated mock, so they remain covered without missing production assets.

Saved gate logs normalize the checkout path and terminal styling. The staged whitespace check found extra blank EOF lines in three imported logs; those lines were removed without changing any result or rerunning executable checks.

Failed checker attempts are retained:

- [First smoke](smoke-harness-failure.json) / [log](smoke-browser.log): the older layout helper counted opacity-zero radio hit areas as visible overlaps; the checker also expected Discovery reload to preserve an ephemeral selection instead of following the approved handoff.
- [Second smoke](smoke-label-failure.json) / [log](corrected-smoke.log): Active correctly uses a different safety label from Ready. Comparing complete note bodies independently of the label removes the false failure while retaining every safety/adult word.
- The final helper excludes opacity-zero elements from visible-overlap geometry and the checker follows handoff/reselection. No product change resolves these checker faults. The build comparison initially expected `index.html` unchanged; corrected accounting includes its new JavaScript reference.

Temporary local review files remain under `/private/tmp/missionkid-learning-set/`: the executed checker/helper, encoding script, preserved baseline build, raw logs and the inspected desktop-set and phone Reward captures. Their checker hashes are recorded above; durable results are saved here. The helper derives from the existing Plan 06 Mission-image browser harness. Chromium launches outside the filesystem sandbox using an existing local installation; no project dependency is added.

The prior focus correction's browser evidence at `7b618bf` remains applicable to unchanged source/CSS/controls; the full suite also includes its guards. No new native-focus matrix, Safari/Firefox, real phone, assistive technology, CI or human acceptance is claimed. Broader content-family, translation and visual review remain open in Plan 06.
