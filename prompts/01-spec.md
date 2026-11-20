You are Claude Code, the spec writer and sole coder for the "Bell test lab" in this folder (3D builder project). The orchestrator relays between you and Gemini (fact-checker / design reviewer). You never block on facts: if you need a fact, append it to QUESTIONS.md (format inside) and use a clearly marked placeholder (e.g. `/*Q3*/`), then keep going.

Read first: BRIEF.md, DECISIONS.md, DESIGN-RULES.md (the Delightful design standard — follow it strictly), ref/SCOUT-bell-lab-ideas.md (Rank 1, Rank 5, Rank 2, Part 3, Part 4 matter most).

CONTEXT ON TASTE: the owner just rejected his previous project (a 3D periodic table) as "too technical, bad quality" — data and features piled on without feel. He wants a balance of technical and experience; beautiful, captivating, effortless; plain words a curious non-physicist understands; every screen must answer "why should I care?" before showing any data; technical depth hidden behind taps. Must clearly beat Quantum Flytrap and fun-with-quantum.org's CHSH game on feel.

TASK NOW (writing only, no code yet): write SPEC.md — ONE page (aim ≤ 900 words), plain language, for the first slice in BRIEF.md. Sections:
1. One-line pitch + why someone should care.
2. Feel (most important): audience & feeling; the first 5 seconds (what is on screen before any interaction — beautiful on its own); a 3-step path to the wow moment; the designed wow moment; the full user flow as a short numbered story (Mermin box on-ramp → peel off casing → 75% wall game → entangled pairs break through → "but Bob alone sees only coin flips" → what next); what is hidden behind taps (the maths, S value, angles, sources).
3. Interactions & screens: one main action per screen; Self-guided vs Teacher/projector toggle behaviour; undo/reset; phone + desktop.
4. Physics model (must be exactly right; state it so a fact-checker can verify): Mermin box (settings 0/120/240°, same-colour probability 1 for same dial, 1/4 for different dials → 1/2 overall; any instruction card ≥ 5/9); CHSH game rule, best classical 75%, quantum cos²(π/8) ≈ 85.36% with the exact state and analyzer angles you will simulate, S = 8·P_win − 4, Tsirelson 2√2, Bob's marginals 50/50 regardless of Alice's setting. Say how you'll sample outcomes (true random from the quantum probabilities, no faked numbers) and how the classical playbook is evaluated (exact, from the 4 question pairs, plus sampled runs).
5. Tech: one self-contained index.html, three.js inlined (copy ../periodic-table/node_modules/three/build/three.module.min.js — r170 — into vendor/ and inline it via a tiny build script tools/build.mjs; no CDN, no fonts/images/models downloaded, all shapes in code, system font stack or one inline font only if tiny), WebAudio synthesized sounds, target ≤ 1.5 MB, 60fps on a normal phone, reduced-motion support.
6. Out of scope for this slice; next (Myth-buster).
7. Acceptance checks (≤ 10 bullets) the reviewer can verify from screenshots and a quick play.

Also write a short PLAN.md: milestones M1 hero scene + Mermin box at full polish; M2 peel-off + CHSH game + S-meter; M3 teacher mode + polish + phone; M4 myth-buster (if time). Each with 2–4 acceptance checks.

Do NOT write STYLE.md yet — Gemini is gathering 3–4 reference designs; you'll get them next. Add any fact questions to QUESTIONS.md. When done, reply with a 5-line summary and stop.
