# PLAN — Bell test lab, first slice
SPEC.md says *what*; this says *how and in what order*. LOG.md = what happened; DECISIONS.md = choices.

**Before M1 visuals:** STYLE.md, from Gemini's 3–4 reference designs (palette, type, light/material, motion, sound, wow). Physics, tests and the build script can start now.

## Layout
```
src/physics.js     pure maths: singlet Born rule, Mermin + CHSH scoring, evidence meter, crypto RNG
src/app/           stage (three.js), steps, UI, audio, teacher mode
src/index.html, src/styles.css
vendor/three.module.min.js   r170, copied from ../periodic-table/node_modules/three/build/
tools/build.mjs    -> index.html: wraps three's export list in an IIFE + tiny ES-module bundler
                   (same approach as ../periodic-table/tools/build.mjs); fails on http(s)/fetch/import() or > 1.5 MB
tools/shots.mjs    headless screenshots (Playwright from ../tools-env, outside the repo)
tests/             node --test
index.html         built and committed, so it opens offline
```

## Milestones
Each ends with tests, a build, screenshots, LOG.md and DECISIONS.md, and a commit.

**M1: hero scene + Mermin box at full polish**
- The untouched first 5 s at 390×844 and 1920×1080 matches SPEC §2 and STYLE.md. Text paints in < 1 s, 3D in < 3 s, with zero console errors.
- Same dial gives 50 of 50 the same colour; 1,000 random fires give 45–55%. All 8 cards show exactly 9/9 or 5/9 on the grid.
- `node --test`: Born-rule probabilities equal (1 − AB cos Δ)/4 across 0–360°, marginals are ½, and the card enumeration holds.
- Midway gate: screenshots plus a short recording, reviewed against DESIGN-RULES Layer 1, go to moony.

**M2: peel-off + CHSH game + S-meter**
- Peel-off: magnets follow the dials at 0°/120°/240°. Reduced motion uses a crossfade.
- All 16 cards are exact (8 at 75%, 8 at 25%) with their losing tile. A 75% card over 1,000 rounds gives 71–79% and the wall holds.
- Entangled: tests give P(win) = (2+√2)/4 per pair and S = 2√2. The evidence-meter simulation (≥ 10k runs) breaks near round 400 with no false breaks. In the app, 2,000 rounds give 83–88% and S (behind a tap, from per-pair rates ±1σ) gives 2.64–3.02. The bar's soft top shows ±2σ, and a wall still cracked at round 1,000 keeps playing until it breaks.
- Bob alone: his 0s read 43–57% for each of Alice's questions, and Compare notes travels visibly at light speed.

**M3: teacher mode + polish + phone**
- Teacher mode has ×1.6 type, the lever hidden until "The class has voted", Predict-first cards, keys and `#teacher`.
- First-time-user test (acting as the audience, no instructions): clarity, ease, beauty, smoothness and delight each ≥ 4/5, with fixes logged.
- Phone portrait, landscape and desktop screenshots; ≤ 1.5 MB; file:// with zero requests; reduced motion; `?fps` ≥ 55 on a mid-range phone (needs moony's phone).

**M4: Myth-buster (if time)**
- "Text faster than light": Alice taps a pattern and Bob's tally stays 50/50 (tested). The pattern shows only after a light-speed message.
- "X-ray the gloves": hidden-arrow pairs (P(opposite) = 1 − Δ/180°) score exactly 5/9 in the boxes and 75% at the game's angles (tested).
- Teacher mode shows "Predict first" before each reveal. Copy is sourced via QUESTIONS.md first.

Not verifiable here: real-phone FPS, and moony's taste sign-off.
