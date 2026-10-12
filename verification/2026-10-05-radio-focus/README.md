# Plan 06 — radio focus visibility, 2026-10-05

Evidence for the bounded correction authorized in [Plan 06](../../plans/active/2026-09-29-whole-application-visual-design.md#bounded-focus-visibility-correction--2026-10-05). This verifies implementation; it records no human acceptance or release approval.

Baseline: clean `feat/reference-visual-redesign` at `0d6b485`, whose product inputs match `458c517`. The preserved production build is `index-DYJmmybd.js` / `index-CgkQDkLR.css`. Final checked build: **`index-C-2mnqdV.js` / `index-DIkimylC.css`**. [Build basis](build-basis.json) pins entrypoint and implementation-input SHA-256 hashes; all 219 other build files, including images/fonts, are unchanged.

The hidden radios now occupy their whole choice, with scroll margin for the outline. A small [visibility guard](../../src/focusedChoice.ts), run after language/selection rendering, handles translated-text or selected-cue reflow after native focus scrolling. It checks only the keyboard-focused radio inside the relevant group, never changes focus/selection, skips already-visible and oversized choices, and scrolls only the missing distance without animation. Native Tab, Shift+Tab and arrows remain responsible for navigation.

| Production check | Cases | Focus checks | Failures |
| --- | ---: | ---: | ---: |
| [Before, Chromium 149](before.json) | 15 | 600 | 59 |
| [CSS-only attempt, Chromium 149](css-only-after.json) | 15 | 708 | 8 |
| [CSS-only attempt, Chrome 154](css-only-chrome.json) | 6 | 288 | 8 |
| [Final, Chromium 149](after.json) | 15 | 708 | **0** |
| [Final, Chrome 154](chrome-after.json) | 6 | 288 | **0** |

Each run uses isolated browser contexts on one Mac. Chromium covers EN/DE/RU at `1280×900`, `390×780`, `320×700` with both text methods, and `320×200` with an enlarged root for oversized controls. Chrome covers both enlarged-text methods in all three languages. Both methods yield an actual `32px` computed root: an init-script CSS override, or Chromium's `Page.setFontSizes` standard browser font setting.

The [browser regression](check.mjs) walks the ordinary introduction → setup → Discovery flow. It asserts forward Tab entry, group exit and Shift+Tab return, all four arrow keys/wrapping, selected values, document language/category cue, and unchanged storage on Tab. It measures the complete choice plus computed outline, overflow and scrolling; exercises already-visible and outline-only-clipped viewport edges; and leaves controls larger than the viewport to native handling. All 30 final Chromium presentation signatures match the before build: words, headings, visible choice geometry/typography, image sources and control order. The before run proves the visibility check detects the original defect; the CSS-only attempt detects the reflow defect.

`before-captures/` and `after-captures/` contain the German introduction/category keyboard-entry states. Both text methods produced byte-identical PNGs for each state: [equivalence hashes](capture-equivalence.json) record this, and only one root32-named copy of each pair is stored. Captures are viewport-only; full-page capture can reset the browser font setting. Final German outline bottoms are `699.52px` (introduction) and `549.34px` (Discovery), within the `700px` viewport; before they were `742.52px` and `741.34px`.

Final gates: [type checking](typecheck.log), [123 relevant tests](relevant-tests.log), [885 full-suite tests / 24 files](full-suite.log), and [production build](build.log). Seven [unit regressions](../../src/focusedChoice.test.ts) cover already-visible outlines, minimal reflow correction without changing focus/selection, top/right outline clipping, oversized controls, outside focus and pointer-only interaction. Build runs use Vite directly after the separate type check, avoiding a duplicate type-check invocation. [Chromium](browser.log) and [Chrome](chrome.log) logs retain per-case totals.

Earlier attempts are retained honestly:

- `full-suite-first.log`: the default-worker CSS-only run timed out starting two workers and in one test. `css-only-full-suite.log` passes 878 tests with two workers; the final suite uses that limit and passes 885. No timeout, expectation or project configuration was weakened.
- `css-only-*.json` / logs: the first production matrix found English-to-Russian heading reflow after native focus, justifying the layout-effect guard and repeating gates on the changed executable basis.
- `candidate-harness-failure.json`: the development page has three module scripts; the initial build-name selector expected one. The selector was corrected. `candidate.json` records the successful initial German candidate check.
- `candidate-edges.json`: one development-page navigation interrupted a case, and a pre-focus 0.5px tolerance misclassified a legitimate subpixel-clipping correction as unnecessary scrolling. Exact pre-focus visibility bounds fix that classification; `candidate-edges-corrected.json` passes both German methods. This changes the checker, not product requirements.

Stored gate logs normalize the checkout path and remove terminal styling/trailing whitespace; results and failures are retained. No new Safari/Firefox focus check, physical phone, assistive-technology or CI result is claimed. Earlier unrelated product evidence remains attributed to its original revisions. Imagery and all human-review items remain unchanged.

To run against a loopback-served production build, supply existing tool/browser locations; nothing is installed into the project:

```sh
MISSIONKID_PLAYWRIGHT=/path/to/playwright/index.mjs \
MISSIONKID_BROWSER=/path/to/chromium \
node verification/2026-10-05-radio-focus/check.mjs \
  http://127.0.0.1:4173/ /tmp/missionkid-radio-focus.json
```

Optional inputs: `MISSIONKID_BROWSER_CHANNEL=chrome` uses installed Chrome instead of an executable path; `MISSIONKID_FOCUS_CONFIGS=root32,browser32` and `MISSIONKID_FOCUS_LANGUAGES=de` narrow a run; `MISSIONKID_FOCUS_BASELINE=<before.json>` compares presentation signatures on the same browser basis. An optional third positional argument saves the four German viewport captures. Failed checks return a nonzero exit status. Baseline reproduction needs the unchanged build; do not reset the working branch to obtain it.
