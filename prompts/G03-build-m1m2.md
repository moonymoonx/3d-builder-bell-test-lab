# Gemini brief 03 — BUILD the first slice (M1 + M2) at full polish
You are the builder now. Work ONLY inside /workspace/3d-builder/bell-test-lab (write/edit files, run node, git add/commit, local http server, `node tools/shots.mjs`). Never write outside this folder, never run gh / git push / any deploy, never install anything globally, no network fetches at runtime in the page. three.js r170 is already in vendor/ (see vendor/README.md) — use it; no CDN.

Read and follow, in this priority: SPEC.md (what), STYLE.md (look/sound/motion — the style card you wrote), DESIGN-RULES.md (the bar; Layer 1 rules are non-negotiable), RESEARCH.md (only use facts/lines from here; anything unsourced gets a visible-to-us `/*Qn*/` placeholder + a new line in QUESTIONS.md), PLAN.md (milestones), DECISIONS.md.

Owner taste (critical): his last project was rejected as "too technical, bad quality". This must feel like a premium, calm, magical object you want to touch — Apple-product staging + Ciechanowski tactility + Nicky Case pacing. Plain words, one main action per screen, every screen answers "why should I care?" first, numbers and maths only behind "How do we know?" taps. No dashboards, no walls of numbers, no tiny labels, no default three.js look (no default grey MeshStandard on black, no harsh lights, no aliasing — use soft area-like lighting, an environment (RoomEnvironment via PMREM), tone mapping, gentle bloom only if it stays 60fps, soft contact shadows).

## Structure
- src/ (main.js, physics.js, scene/*.js, ui/*.js, audio.js, style.css, index.template.html) → `node tools/build.mjs` writes ONE self-contained `index.html` in the repo root: CSS + JS inlined; three and addons inlined via an import map whose entries are data: URLs (or equivalent that works from file:// with zero requests). Target ≤ 1.5 MB.
- physics.js is pure and unit-tested: `node --test tests/` — Mermin probabilities (1, 1/4, 1/2, 5/9 for all 8 cards), all 16 CHSH cards = 3/4 or 1/4, quantum angles give cos²(π/8) on each of the 4 pairs, Bob's marginal = 1/2 for each Alice setting, S = 8P−4, the evidence-meter factors. Sampling with crypto.getRandomValues, Born rule from the state, never faked.
- Expose `window.__bell = { goto(step), fire(n), state }` for scripted screenshots.

## Scope for this round (PLAN M1 + M2)
1. First 5 seconds: the stage of SPEC §2 — two boxes, the glowing source, motes gliding out every ~2 s, both lamps blooming the same colour, the one-line question, one big "Investigate" button. Beautiful on its own before any interaction. Pleasant loading state.
2. Mermin box on-ramp (story steps 1–3) with dials, lamps, the 1,000-random-pairs tally (big friendly bar, not a table), and the card designer with the 3×3 grid revealing ≥ 5/9.
3. Peel off casing → magnets at 0°/120°/240° follow the dials.
4. The CHSH "Beat the 75% wall" game: four-switch card, losing tile, fire rounds (×1, ×100, ×1000), the bar against the glass wall, evidence-driven cracks; the Entangled pairs lever; the Breakthrough wow moment exactly as STYLE.md choreographs it (slow-motion shatter, deep chord, settle on the gold 85% line).
5. Step 7 "Can Alice text Bob?" — Bob alone is coin flips; Compare notes reveals the matches.
6. Always visible: Back, step dots, Start over, sound toggle, Self-guided | Teacher (teacher can be basic this round: ×1.6 type, no hints, lever hidden until "The class has voted").
7. Phone portrait (stage above bottom sheet, thumb-reach buttons ≥ 56 px) and desktop (side panel). Reduced motion. Contrast ≥ 4.5:1.

## Check your own work before reporting
- `node --test tests/` passes; `node tools/build.mjs` runs; index.html size printed.
- `node tools/shots.mjs index.html --out=screenshots/r0 --steps=tools/steps.json` (write tools/steps.json that walks the story using window.__bell / clicks: first view, box step, random tally, card grid, peel-off, game with card at the wall, breakthrough mid-shatter, settled 85%, Bob-alone, teacher mode). Look at EVERY screenshot yourself (open the PNGs) and fix what looks unpolished, cramped, technical or broken before you report. report.json must show zero console errors and zero external requests. (FPS in SwiftShader is a pessimistic lower bound; note it.)
- Commit with a clear message (no push). Log decisions in DECISIONS.md and a line in LOG.md (Asia/Bangkok time). Reply with a 6-line summary and the list of screenshot files.
