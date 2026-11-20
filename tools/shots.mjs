#!/usr/bin/env node
// Screenshots + console errors + FPS sample in headless Chromium (SwiftShader software WebGL — FPS here is a pessimistic lower bound, not a phone number).
// Uses the shared Playwright install in ../tools-env (read-only). Usage:
//   node tools/shots.mjs [file=index.html] [--out=screenshots/r1] [--steps=steps.json]
// steps.json (optional): [{"name":"after-investigate","click":"text=Investigate","wait":1500}, {"name":"x","eval":"window.__bell?.goto(3)","wait":1000}]
import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PW = process.env.PLAYWRIGHT_DIR || path.resolve(ROOT, '../tools-env/node_modules/playwright');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(ROOT, '../tools-env/browsers');
const { chromium } = await import(path.join(PW, 'index.mjs'));
const a = process.argv.slice(2); const opt = k => (a.find(x => x.startsWith(`--${k}=`)) || '').split('=').slice(1).join('=');
const file = a.find(x => !x.startsWith('--')) || 'index.html';
const OUT = path.join(ROOT, opt('out') || 'screenshots/latest'); fs.mkdirSync(OUT, { recursive: true });
const steps = opt('steps') ? JSON.parse(fs.readFileSync(path.join(ROOT, opt('steps')), 'utf8')) : [];
const SIZES = { desk: { width: 1920, height: 1080 }, phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const report = {};
for (const [sz, vp] of Object.entries(SIZES)) {
  const { width, height, ...rest } = vp;
  const ctx = await b.newContext({ viewport: { width, height }, ...rest });
  const p = await ctx.newPage(); const errs = []; const reqs = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('pageerror', e => errs.push(String(e)));
  p.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) reqs.push(r.url()); });
  await p.goto('file://' + path.join(ROOT, file)); await p.waitForTimeout(3500);
  await p.screenshot({ path: path.join(OUT, `00-first-${sz}.png`) });
  const fps = await p.evaluate(() => new Promise(r => { let n = 0; const t0 = performance.now(); const f = () => { n++; performance.now() - t0 < 2000 ? requestAnimationFrame(f) : r(Math.round(n / 2)); }; requestAnimationFrame(f); }));
  let i = 1;
  for (const s of steps) {
    try { if (s.click) await p.click(s.click, { timeout: 4000 }); if (s.eval) await p.evaluate(s.eval); } catch (e) { errs.push(`step ${s.name}: ${e.message.split('\n')[0]}`); }
    await p.waitForTimeout(s.wait || 1200); await p.screenshot({ path: path.join(OUT, `${String(i++).padStart(2, '0')}-${s.name}-${sz}.png`) });
  }
  report[sz] = { fps_swiftshader: fps, errors: errs, externalRequests: reqs }; await ctx.close();
}
await b.close(); fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2));
