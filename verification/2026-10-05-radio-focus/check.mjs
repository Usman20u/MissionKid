// Browser regression for Plan 06's two native radio groups. Uses an existing
// Playwright installation supplied by the caller; adds no project dependency.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const [base, output, captures] = process.argv.slice(2);
if (!base || !output || !process.env.MISSIONKID_PLAYWRIGHT) {
  throw new Error('Usage: MISSIONKID_PLAYWRIGHT=<module> MISSIONKID_BROWSER=<executable> node check.mjs <url> <report.json> [capture-directory]');
}
const { chromium } = await import(pathToFileURL(process.env.MISSIONKID_PLAYWRIGHT).href);
const browser = await chromium.launch({
  headless: true,
  ...(process.env.MISSIONKID_BROWSER_CHANNEL
    ? { channel: process.env.MISSIONKID_BROWSER_CHANNEL }
    : { executablePath: process.env.MISSIONKID_BROWSER }),
});
const configs = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'phone', width: 390, height: 780, mobile: true },
  { name: 'root32', width: 320, height: 700, mobile: true, method: 'root' },
  { name: 'browser32', width: 320, height: 700, mobile: true, method: 'browser' },
  { name: 'short-root32', width: 320, height: 200, mobile: true, method: 'root' },
].filter((config) => !process.env.MISSIONKID_FOCUS_CONFIGS || process.env.MISSIONKID_FOCUS_CONFIGS.split(',').includes(config.name));
const languages = ['en', 'de', 'ru'];
const runLanguages = languages.filter((language) => !process.env.MISSIONKID_FOCUS_LANGUAGES || process.env.MISSIONKID_FOCUS_LANGUAGES.split(',').includes(language));
const categories = ['Movement', 'Creativity', 'Helping at Home', 'Learning', 'Calm'];
const report = { browser: browser.version(), base, builds: [], cases: [], failures: [] };
const baseline = process.env.MISSIONKID_FOCUS_BASELINE
  ? JSON.parse(readFileSync(process.env.MISSIONKID_FOCUS_BASELINE, 'utf8')) : null;
const hash = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.getAnimations().every((a) => a.playState !== 'running'));
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function presentation(page) {
  return page.evaluate(() => ({
    words: document.body.innerText,
    headings: [...document.querySelectorAll('h1,h2,h3')].map((e) => `${e.tagName}:${e.textContent}`),
    choices: [...document.querySelectorAll('label')].map((e) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return [e.textContent, r.left + scrollX, r.top + scrollY, r.width, r.height, s.fontSize, s.lineHeight];
    }),
    images: [...document.images].map((e) => [new URL(e.src).pathname, e.getAttribute('srcset'), e.getAttribute('alt')]),
    order: [...document.querySelectorAll('input,button')].map((e) => [e.tagName, e.name, e.value, e.textContent]),
  }));
}

async function enterGroup(page, name) {
  await page.mouse.click(2, 2);
  await page.evaluate(() => scrollTo(0, 0));
  for (let i = 0; i < 20; i += 1) {
    await page.keyboard.press('Tab');
    if (await page.evaluate((n) => document.activeElement?.name === n, name)) return;
  }
  throw new Error(`Could not reach ${name} with Tab`);
}

try {
  for (const config of configs) {
    for (const language of runLanguages) {
      const context = await browser.newContext({
        viewport: { width: config.width, height: config.height },
        deviceScaleFactor: 2,
        isMobile: Boolean(config.mobile),
        hasTouch: Boolean(config.mobile),
      });
      const page = await context.newPage();
      const row = { config: config.name, language, root: null, signatures: {}, checks: 0, oversized: 0, stops: [], failures: [] };
      report.cases.push(row);
      const check = (condition, message) => { if (!condition) row.failures.push(message); };
      page.on('pageerror', (error) => row.failures.push(`page error: ${error.message}`));
      if (config.method === 'root') {
        await page.addInitScript(() => {
          const add = () => {
            const style = document.createElement('style');
            style.textContent = 'html { font-size: 32px !important; }';
            document.head.prepend(style);
          };
          if (document.head) add(); else document.addEventListener('DOMContentLoaded', add, { once: true });
        });
      }
      if (config.method === 'browser') {
        const cdp = await context.newCDPSession(page);
        await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32 } });
      }

      async function inspect(name, expected, action) {
        await settle(page);
        const stop = await page.evaluate(() => {
          const input = document.activeElement;
          const choice = input?.closest('label');
          if (!choice) return { focused: input?.tagName };
          const r = choice.getBoundingClientRect();
          const s = getComputedStyle(choice);
          const margin = parseFloat(s.outlineWidth) + Math.max(0, parseFloat(s.outlineOffset));
          const bounds = [r.left - margin, r.top - margin, r.right + margin, r.bottom + margin];
          return {
            name: input.name, value: input.value, checked: input.checked,
            language: document.documentElement.lang,
            selectedCue: choice.querySelector('.mission-world__state')?.textContent.includes('✓'),
            ring: input.matches(':focus-visible') && s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2,
            choice: [r.left, r.top, r.width, r.height], outline: bounds,
            viewport: [innerWidth, innerHeight], scroll: [scrollX, scrollY],
            fits: r.width + 2 * margin <= innerWidth && r.height + 2 * margin <= innerHeight,
            visible: bounds[0] >= -0.5 && bounds[1] >= -0.5 && bounds[2] <= innerWidth + 0.5 && bounds[3] <= innerHeight + 0.5,
            overflow: document.documentElement.scrollWidth - innerWidth,
          };
        });
        row.checks += 1;
        if (!stop.fits) row.oversized += 1;
        // Retain entry/backward measurements and failures; successful arrow
        // steps are counted instead of duplicating hundreds of rectangles.
        if (action.endsWith('Tab in') || (stop.fits && !stop.visible) || !stop.ring) row.stops.push({ action, ...stop });
        check(stop.name === name && stop.value === expected && stop.checked, `${action}: native focus/selection ${JSON.stringify(stop)}`);
        if (name === 'introduction-language') check(stop.language === expected, `${action}: language change did not reach the document`);
        if (name === 'discovery-category') check(stop.selectedCue, `${action}: category change did not reach the selected cue`);
        check(stop.ring, `${action}: focus ring missing`);
        check(!stop.fits || stop.visible, `${action}: fitting choice/outline offscreen`);
        check(stop.overflow <= 1 && stop.scroll[0] === 0, `${action}: horizontal overflow/scroll`);
        return stop;
      }

      async function exercise(name, values, initial, phase) {
        const signature = hash(await presentation(page));
        row.signatures[phase] = signature;
        if (baseline) {
          const before = baseline.cases.find((c) => c.config === config.name && c.language === language);
          check(before?.signatures[phase] === signature, `${phase}: words/layout/imagery/order differ from baseline`);
        }
        const stored = await page.evaluate(() => localStorage.getItem('missionkid:snapshot'));
        await enterGroup(page, name);
        await inspect(name, initial, `${phase}: Tab in`);
        if (captures && language === 'de' && ['root32', 'browser32'].includes(config.name)) {
          mkdirSync(captures, { recursive: true });
          await page.screenshot({ path: join(captures, `${config.name}-${phase}.png`) });
        }
        await page.keyboard.press('Tab');
        check(await page.evaluate((n) => document.activeElement?.name !== n, name), `${phase}: group must be one Tab stop`);
        check(await page.locator(`input[name="${name}"]:checked`).inputValue() === initial, `${phase}: Tab changed selection`);
        await page.keyboard.press('Shift+Tab');
        await inspect(name, initial, `${phase}: Shift+Tab in`);
        check(await page.evaluate(() => localStorage.getItem('missionkid:snapshot')) === stored, `${phase}: Tab changed persisted state`);
        for (const [key, direction] of [['ArrowRight', 1], ['ArrowLeft', -1], ['ArrowDown', 1], ['ArrowUp', -1]]) {
          for (let i = 1; i <= values.length; i += 1) {
            await page.keyboard.press(key);
            const index = (values.indexOf(initial) + direction * i + values.length) % values.length;
            await inspect(name, values[index], `${phase}: ${key} ${i}`);
          }
        }
        check(hash(await presentation(page)) === signature, `${phase}: arrow round trips changed words/layout/imagery/order`);

        // Native focus on an already fully visible choice must not scroll.
        // Short viewports also exercise choices larger than the viewport.
        await page.locator(`input[name="${name}"]:checked`).evaluate((input) => input.closest('label').scrollIntoView({ block: 'center' }));
        await settle(page);
        const visible = await inspect(name, initial, `${phase}: centered`);
        const start = await page.evaluate(() => [scrollX, scrollY]);
        await page.evaluate(() => { const input = document.activeElement; input.blur(); input.focus(); });
        const returned = await inspect(name, initial, `${phase}: visible refocus`);
        if (visible.fits && visible.visible) check(returned.scroll.every((v, i) => Math.abs(v - start[i]) <= 0.5), `${phase}: unnecessary scroll on re-entry`);
        if (visible.fits) {
          // Exercise outline-only clipping as well as an offscreen choice.
          // Fully visible edge positions must not trigger extra scrolling.
          for (const edge of ['top-visible', 'bottom-visible', 'top-outline', 'bottom-outline']) {
            const before = await page.evaluate((edge) => {
              const input = document.activeElement;
              const r = input.closest('label').getBoundingClientRect();
              const s = getComputedStyle(input.closest('label'));
              const pad = parseFloat(s.outlineWidth) + Math.max(0, parseFloat(s.outlineOffset));
              const top = edge.startsWith('top') ? (edge.endsWith('visible') ? pad : 0) : innerHeight - r.height - (edge.endsWith('visible') ? pad : 0);
              scrollTo(0, scrollY + r.top - top);
              const actual = input.closest('label').getBoundingClientRect();
              return { y: scrollY, outline: [actual.top - pad, actual.bottom + pad], visible: actual.top - pad >= 0 && actual.bottom + pad <= innerHeight };
            }, edge);
            await page.evaluate(() => { const input = document.activeElement; input.blur(); input.focus(); });
            const after = await inspect(name, initial, `${phase}: ${edge}`);
            if (before.visible) check(Math.abs(after.scroll[1] - before.y) <= 0.5, `${phase}: unnecessary scroll at ${edge}: ${JSON.stringify(before)} -> ${after.scroll[1]}`);
          }
        }
      }

      try {
        await page.goto(base, { waitUntil: 'load' });
        await page.waitForSelector('[data-view="introduction"]');
        const build = await page.locator('script[type="module"][src]:not([src="/@vite/client"])').getAttribute('src');
        if (!report.builds.includes(build)) report.builds.push(build);
        if (language !== 'en') await page.locator(`input[name="introduction-language"][value="${language}"]`).evaluate((input) => input.closest('label').click());
        await settle(page);
        row.root = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
        if (config.method) check(row.root === '32px', 'text-size method did not produce 32px root');
        await exercise('introduction-language', languages, language, 'introduction');
        check(await page.evaluate(() => localStorage.length === 0), 'introduction wrote storage');
        check(await page.locator('html').getAttribute('lang') === language, 'language round trip did not restore document language');
        await page.click('button.introduction__action');
        await page.waitForSelector('[data-view="setup-first-use"]');
        await page.locator('input[name="setup-age-band"][value="7–8"]').evaluate((input) => input.closest('label').click());
        await page.click('form button[type="submit"]');
        await page.waitForSelector('[data-view="setup-complete-handoff"]');
        await page.click('.setup-complete__actions .button--primary');
        await page.waitForSelector('[data-view="discovery-categories"]');
        await page.locator('input[name="discovery-category"][value="Helping at Home"]').evaluate((input) => input.closest('label').click());
        await page.waitForSelector('.mission-suggestions .mission-card');
        await exercise('discovery-category', categories, 'Helping at Home', 'discovery');
      } catch (error) {
        row.failures.push(error.message);
      } finally {
        report.failures.push(...row.failures.map((failure) => `${config.name}/${language}: ${failure}`));
        console.log(`${config.name}/${language}: ${row.checks} focus checks, ${row.failures.length} failures`);
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
}
if (report.failures.length) process.exitCode = 1;
