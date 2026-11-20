# SPEC — Bell test lab · first slice
Draft for moony, 21 Nov 2026. Look and sound: STYLE.md (next). `/*Qn*/` = fact awaiting a source.

## 1. Pitch
**Play a game no secret plan can win more than 75% of the time, then win 85% with entangled particles.**
Why care: particles can be more in tune than any plan allows, yet can't carry a message. That is reality's strangest proven fact. Proving it won the 2022 Nobel Prize /*Q2*/, and it underpins entanglement-based encryption /*Q9*/.

## 2. Feel
**Audience & feeling.** Curious adults and teens who watch science documentaries, then classrooms. *A magic trick you may investigate*: a hushed dark stage, warm lamps, clicking dials, one big release. Every step asks a question worth caring about, lets you act, then answers. Flytrap and fun-with-quantum are flat 2D; ours has objects, stakes and one big moment.

**First 5 seconds.** Two matte boxes stand far apart on a softly lit stage, each with a 1-2-3 dial and a lamp; a source glows between them. Every ~2 s a pair of light motes glides out, and with the dials matched both lamps bloom the same colour. **"Two boxes. No wires. How do they always agree?"** One button: **Investigate**.

**Path to the wow.** ① The boxes agree when the dials match. ② Every card that tries to fake it hits a wall. ③ Swap in entangled pairs.

**Wow: Breakthrough.** Your best card is stuck at a glass wall marked 75%. Pull **Entangled pairs**: rounds speed up like a drumroll, cracks spread as luck is ruled out, and the wall shatters in slow motion to a deep chord. The bar settles on a gold line at 85%, nature's limit.

**Story.**
1. *"Same dial, same colour. Every time. How?"* Maybe each pair carries a hidden card (1 red, 2 red, 3 green), as Einstein suspected /*Q3*/.
2. *"Let the dials spin."* Of 1,000 random pairs, only 50% match.
3. *"Could a card do that?"* Flip its lamps; a 3×3 grid shows every card matches at least 5 of 9, never 50%.
4. *"What's inside?"* Peel off the casing: magnets turn with the dials (0°/120°/240°), and the source makes entangled pairs.
5. *"Can you beat 75%?"* Alice and Bob each get a 0 or 1. They win if their answers match, unless both got 1 (then they must differ). No talking. Write their card with four switches; tiles show the pair it always loses. Over 1,000 rounds the bar stops at the glass.
6. **Breakthrough.**
7. *"Can Alice text Bob faster than light?"* Bob's lamp alone shows coin flips, whatever Alice does. Matches appear only when **Compare notes** brings her list at light speed.
8. *"It's real":* experiments since 1972 /*Q6*/; Teacher mode, Myth-buster, Play again.

**Behind taps.** "How do we know?" on every result: a sentence, then numbers, then maths and sources (5/9 count, four-tile proof, S, angles, state, sampling, loopholes /*Q10*/).

## 3. Interactions & screens
- One main action per step, big (≥ 56 px) and bottom-centre; all else quieter. Feedback within 100 ms.
- Always visible: Back, step dots, Start over, sound, **Self-guided | Teacher**.
- **Self-guided:** one hint after ~6 s idle. The lever unlocks once a 75% card hits the wall. "Skip to the game" on screen 1.
- **Teacher/projector:** type ×1.6, no hints, pinned rule table, "Predict first" before reveals. The lever stays hidden until "The class has voted". Keys; `#teacher` link.
- **Undo/reset:** switches flip back, tallies have Clear, no dead ends.
- **Phone portrait:** stage above a thumb-reach bottom sheet. Landscape/desktop: side panel.

## 4. Physics model
- **State:** singlet (|↑↓⟩ − |↓↑⟩)/√2; Stern–Gerlach axes ⟂ flight. A, B = ±1 at axis gap Δ: P(A,B) = (1 − AB cos Δ)/4, so P(opposite) = cos²(Δ/2) and each side alone is 50/50.
- **Mermin:** dials 0°/120°/240°; Bob's lamp wiring reversed (same colour = opposite spins) /*Q1*/. P(same colour): same dial 1, different dials ¼, random dials 3/9·1 + 6/9·¼ = ½. A card (colour per dial, same in both particles) matches 9/9 or 5/9, so any mix ≥ 5/9 ≈ 55.6%.
- **CHSH:** fresh fair bits x, y; win iff a⊕b = x·y. 16 cards (a(0), a(1), b(0), b(1)) each win exactly 3 or 1 of the 4 pairs (XOR-ing the four win conditions gives 0 = 1), so ≤ 75%. Scored exactly and by sampled runs.
- **Entangled:** Alice 0°/90°, Bob 45°/−45° for questions 0/1; answer 0 = up for Alice, down for Bob. Δ = 45° (pairs 00, 01, 10), 135° (11), so P(win) = cos²(π/8) = (2+√2)/4 ≈ 85.36% for each.
- **S** = E₀₀ + E₀₁ + E₁₀ − E₁₁, E = P(match) − P(differ); S = 8·P_win − 4 for uniform questions. Cards ≤ 2; entangled 2√2, Tsirelson's bound /*Q5*/.
- **Bob alone:** P(b = 0) = ½ for all x, y /*Q8*/. Photons use half the angles /*Q4*/.
- **Sampling:** crypto.getRandomValues /*Q11*/, fresh each round. Born rule on the state vector → joint probabilities (unit-tested) → one draw. Raw counts, never seeded, smoothed or nudged.
- **Wall = evidence:** B = 1 at the start of each run, multiplied by the exact likelihood ratios f_win = P_q / (3/4) = (2+√2)/3 (≈ 1.1381) per win and f_loss = (1−P_q) / (1/4) = 2−√2 (≈ 0.5858) per loss (computed exactly in float, never from rounded 4-digit literals). A card wins a round with chance ≤ ¾, so by Ville's inequality P(B ever ≥ 10ᵏ) ≤ 10⁻ᵏ /*Q7*/. Cracks at 10³, breaks at 10⁶. In 100k simulations, entangled runs broke it near round 400 (95% by 720); 75% cards never.

## 5. Tech
- `tools/build.mjs` makes one `index.html`, inlining `vendor/three.module.min.js` (r170, 0.69 MB, from `../periodic-table/node_modules/three/build/`), `src/` and CSS. No CDN, network, fonts, images or models; shapes in code.
- WebAudio-synthesised sound from the first tap; mute visible.
- ≤ 1.5 MB; 60 fps on a normal phone (instancing, pixel ratio ≤ 2); `?fps` meter; reduced motion uses fades.
- Lamps pair colour with a symbol and a tone; contrast ≥ 4.5:1; physics tested with `node --test`.

## 6. Out of scope; next
Out: Nobel timeline, loopholes, E91, statistics, worksheets, noise, languages. **Next: Myth-buster.** "Try to text faster than light" (Bob sees noise until a light-speed message arrives) and "X-ray the gloves".

## 7. Acceptance checks
1. Untouched first view (390×844, 1920×1080): stage, one headline, one button.
2. Same dial: 50 of 50 fires same colour. Random dials, 1,000 fires: 45–55%.
3. All 8 box cards: exactly 9/9 or 5/9.
4. Peel-off: magnets at 0°/120°/240° follow the dials.
5. All 16 game cards: 75% or 25% with their losing tile. A 75% card over 1,000 rounds: 71–79%, wall holds.
6. Entangled pairs break the wall; at 2,000 rounds 83–88%, S 2.64–3.02.
7. Bob's 0s: 43–57% for each of Alice's questions over 1,000 rounds.
8. Teacher mode: lever hidden until "The class has voted".
9. Every step: Back and Start over; jargon only behind taps.
10. ≤ 1.5 MB, opens from file:// with zero requests and errors; reduced motion respected.
