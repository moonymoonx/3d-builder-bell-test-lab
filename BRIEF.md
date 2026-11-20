# BRIEF — Bell test lab (3D builder)
Date: 2026-11-21 (Asia/Bangkok). Owner: moony. Source research: ref/SCOUT-bell-lab-ideas.md (Gemini scout, links spot-checked) + ../scouts/quantum-2026-11-21.md idea #1.

## What we're making
One self-contained interactive three.js web page (single index.html, all shapes made in code, no downloaded assets, no network at runtime) that lets anyone *feel* why entanglement is not "two gloves in a box" — by playing a game they cannot win classically, then winning it with entangled pairs.

## Who it's for (in order)
1. Curious general public, no physics background — documentary / pop-science watchers (2022 Nobel, NOVA "Einstein's Quantum Riddle", MinutePhysics). Stuck on: "why isn't it just pre-set instructions?" and "why can't we text faster than light?"
2. High-school students (10–12) and their teachers — want a free, projector-ready, zero-math lab.
3. University students / professors — depth on demand only.

## First slice (chosen overnight; moony delegated the choice — see DECISIONS.md)
- **On-ramp: Mermin's 3-switch mystery box** (zero math). Two matte boxes with a 1/2/3 dial and a red/green lamp. Same dial → always same colour; random dials → same colour only 50% of the time. Visitor designs instruction cards (RRG…) and discovers any card gives ≥ 5/9 ≈ 55.6% same-colour — so 50% is impossible for pre-set instructions. **"Peel off casing"** reveals the analyzers inside.
- **Main: "Beat the 75% wall" — the CHSH cooperative game.** Referee sends Alice and Bob each a random 0/1. They win if their answers match, unless both got 1 (then they must differ). Visitor writes a hidden-variable "playbook", fires rounds, and slams into the 75% ceiling. Flip to entangled pairs with analyzers at the best angles → ~85.4% (cos²(π/8)), the Tsirelson limit. Live S-meter (S = 8·P_win − 4: 2 classical, 2√2 quantum). Bob's own results always stay 50/50 (no faster-than-light messages).
- **Self-guided vs Teacher/projector toggle** (teacher: big type, quantum switch hidden until "the class has voted").
- Next if time: **Myth-buster** mode (try to text faster than light; X-ray the gloves).

## Must beat on feel
Quantum Flytrap virtual lab (2D optics table), fun-with-quantum.org CHSH game, QuVis hidden-variables sim, PhET Quantum Measurement (stops before entanglement).

## Bar (moony's words, about the previous project)
"Too technical, bad quality." He wants a balance of technical and experience: beautiful, captivating, effortless; plain words; every screen answers "why should I care?"; technical depth hidden behind taps. Design standard: DESIGN-RULES.md (Delightful design).

## Rules
Real physics only, computed correctly; every fact sourced in RESEARCH.md; never invent data. No paid APIs. Never publish/deploy/post. Repo private.
