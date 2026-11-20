# Gemini brief 02 — fact-check SPEC, answer questions, write STYLE.md
You are now BOTH researcher and builder for this project (moony moved the build from Claude to you). Claude wrote SPEC.md and PLAN.md and has exited. Work ONLY inside /workspace/3d-builder/bell-test-lab. You may read other files but never write outside this folder, never publish/deploy/post, never run gh or git push (the orchestrator pushes), never touch tmux or other processes. Never invent numbers or links; mark UNVERIFIED.

Read: BRIEF.md, SPEC.md (authoritative), PLAN.md, DECISIONS.md, QUESTIONS.md, DESIGN-RULES.md (the Delightful design standard — the bar), your ref/GEMINI-01-facts-refs.md.

Owner taste (critical): moony rejected his previous project as "too technical, bad quality". He wants beautiful, captivating, effortless; plain words; every screen answers "why should I care?" before data; technical depth behind taps. Balance technical and experience. Must clearly beat Quantum Flytrap and fun-with-quantum on feel.

## Task 1 — RESEARCH.md
Answer every question Q1–Q11 in QUESTIONS.md. Append to RESEARCH.md one section per Q: verdict (CONFIRMED / CORRECTED / UNVERIFIED), the exact plain-language line the page may use (≤ 25 words), and 1–2 real source URLs you opened. Q7 matters: check whether the betting factor ×1.1381 per win / ×0.5858 per loss is a nonnegative supermartingale under every local strategy (adaptive too, fresh uniform questions) and whether Ville's inequality gives P(ever ≥ 10^k) ≤ 10^-k; verify numerically if useful (scripts in ref/scratch/).

## Task 2 — Fact-check SPEC.md section 4 and every number in SPEC.md
Write ref/FACTCHECK-SPEC.md: line-by-line OK / WRONG (with correction + source). Don't edit SPEC.md except to fix an outright physics error (log it in DECISIONS.md as D11+ "Gemini fact-check").

## Task 3 — STYLE.md (one page) — fresh style for this topic
Using your 4 references (Ciechanowski, Nicky Case's Trust, Apple AirPods Pro, Chrome Music Lab) and SPEC's Feel ("a magic trick you may investigate: hushed dark stage, warm lamps, clicking dials, one big release"). Cover: audience & feeling; palette (3–5 colours with roles and hex, contrast-checked ≥ 4.5:1 for text); type (system stack or ≤ 1 tiny inline font, a clear scale incl. teacher ×1.6); lighting & materials for the boxes, source, magnets, motes, glass wall (soft, intentional, never default); motion personality with durations/easing and the reduced-motion fallback; sound mood (WebAudio-synthesised: dial click, lamp bloom, round tick, crack, shatter chord, mute); the wow moment beat by beat; layout for phone portrait (stage above bottom sheet) and desktop (side panel); copy voice (plain, warm, short; banned jargon list for the surface layer); what we explicitly do NOT do (lessons from moony's rejection: no dashboards, no walls of numbers, no tiny labels, no default three.js look).

Log choices in DECISIONS.md (D11+) and a line in LOG.md (time Asia/Bangkok). Then `git add -A && git commit -m "..."` (commit only, no push). End with a 6-line summary.
