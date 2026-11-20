# Bell Test Lab — First-Time-Visitor & Teacher Review (R5)

*Reviewed cold from all 23 screenshots in `screenshots/r5/` (`00-first` → `09-teacher`, desktop `1920×1080`, phone `390×844 @2x`, and projector `1280×720`) against `DESIGN-RULES.md` and `STYLE.md`, first as a curious documentary-watching adult with no physics background, then as a high-school physics teacher planning to project this in class.*

---

## 1. Scores (1–5, strict)

- **Clarity: 4/5** — Zero surface jargon, clean narrative progression (`mystery → 50% → 5/9 card limit → peel-off → 3-to-2 bridge → 75% wall → shatter → no-texting`), and every screen answers "why should I care?"; held from 5 by ambiguous card-toggle copy on Step 3 (`"Tap a dial to test:"`), untappable-looking strategy pills on Step 5, and `86.4%` poking past the `85.4% QUANTUM LIMIT` label on Step 6.
- **Ease: 4/5** — One unmistakable gold CTA per screen, generous thumb-friendly targets on phone, always-visible `← Back` / `Sound` / `Start over` / `Self-guided · Teacher` controls, and smart Teacher spoiler-gating; held from 5 by subtle toggle affordance gaps on Steps 3 & 5, a non-interactive Step 4b bridge, and `Skip to game` being absent on mobile.
- **Beauty: 4/5** — Cohesive dark-velvet museum hardware, brushed brass, luminous glass domes, crisp Ciechanowski cutaway, and a showstopping faceted shatter clearly outperform Quantum Flytrap and fun-with-quantum; held from 5 (and kept close to the 3/4 line on mobile) by flat overlapping mote discs (`00–02`), cropped `ALICE — HIDDEN` framing (`08`), overlapping 3D badges on phone (`04`, `07`), and excessive empty top void on `00-first-phone`.
- **Smoothness: 4/5** — *(Note: real-time FPS cannot be measured from static software-rendered screenshots; judged from layout stability and visual motion cues.)* Chrome, rails, and phone sheets stay rock-steady across all 23 frames with zero text clipping or scroll overflow, and state transitions (dial detents, cutaway, lever throw, shatter dimming) read clearly; held from 5 by motes bunching/clipping at the box ports (`00–02`, `09-proj1280`), the abrupt disappearance/reappearance of the `75%` badge across `06 → 07`, and off-frame cropping on `08`.
- **Delight: 4/5** — The 3D glass wall shattering into gleaming faceted shards while the UI dims into a hushed spotlight (`06`) is a genuine, memorable wow moment, backed by tactile props (the 3D hidden-card easel, rotating cutaway magnets, brass lever, frosted privacy screen); held from 5 by a distant, under-framed phone opening (`00-first-phone`), shards crowding Bob's floating `▲` glyph (`06`), and the mild post-climax confusion of `86.4%` exceeding `85.4% QUANTUM LIMIT` (`07`).

---

## 2. Per-Screen Review

### `00-first` (Landing / Hook — `desk` & `phone`)
- **Understood in 5 seconds:** Two unconnected mystery boxes with dials (`1–2–3`) and lamps receive light pulses from a central emitter; matching dials light up the same colour, and **"Investigate"** starts the mystery. Zero formulas, zero spoilers, zero modal walls.
- **Confuses a first-timer:** Nothing conceptually. Minor accessibility gap: the headline says *"Same dial, same colour"*, yet unlike Steps 1–7, screen `00` omits the floating `●` glyph above the lamps — a colour-blind visitor gets no shape cue on the opening frame.
- **Broken / cramped / cheap / default:**
  - **Chunky mote sprites (`desk`):** The paired light motes look like flat, overlapping opaque yellow discs stacked like glowing caterpillars near the brass ports — the only "default 3D particle" element in an otherwise sculptural scene.
  - **Phone framing (`phone`):** The top ~42% is empty dark void, pushing the boxes down into the middle at a small scale (dial numbers `1–2–3` are tiny) with another empty floor gap above the headline.

### `01-box-step` (Step 1 · The Mystery Boxes — `desk` & `phone`)
- **Understood in 5 seconds:** Set Alice and Bob to the same dial, fire pairs, see `100%` same-colour agreement (`50 / 50 — zero misses`), and grasp Einstein's common-sense hypothesis ("like a hidden card"). Floating `▲` badges above the coral lamps add instant shape+colour clarity.
- **Confuses a first-timer:** Very clear. One minor visual competition: the selected dial buttons (`1` and `1`) use the exact same solid Quantum Gold fill as the bottom CTA (`Let the dials spin →`), slightly splitting focus on phone.
- **Broken / cramped / cheap / default:**
  - **Port bunching (`desk`):** Three overlapping golden mote discs jam awkwardly against the brass side port on both boxes.
  - **Sparse desktop rail (`desk`):** Nearly half the right rail between `Fire 1 pair / Fire 50 more` and `Let the dials spin →` is blank dark slate (calm, though slightly disconnected).
  - `Skip to game` appears in the desktop top bar but disappears on phone.

### `02-random-tally` (Step 2 · Random Dials — `desk` & `phone`)
- **Understood in 5 seconds:** Spin both dials randomly for 1,000 rounds; matches hover right around `50%` (`51.5%` desk / `47.5%` phone). The gold callout box (*"Here's the puzzle: 100% when dials match, yet ~50% overall — sounds simple until you try to fake it with a hidden card"*) directly answers *"why should I care?"* and creates strong pull into Step 3.
- **Confuses a first-timer:** Nothing; the callout anticipates the exact "isn't 50% just coin flips?" reaction and turns it into the hook.
- **Broken / cramped / cheap / default:**
  - Half-clipped glowing mote blobs protrude slightly from both boxes' side ports (`desk`), looking like glowing ear-bumps rather than particles cleanly entering a port.

### `03-card-grid` (Step 3 · Test a Hidden Card — `desk` & `phone`)
- **Understood in 5 seconds:** An ivory `HIDDEN CARD` easel stands in the 3D scene (`1 ▲ / 2 ▲ / 3 ●`) paired with a super-readable 3×3 Alice×Bob matrix showing `5 / 9 (55.6% match)`. The visual pigeonhole proof (*"Stuck at 55.6%! Every hidden card matches at least 5 of 9 — yet the real boxes hover near 50%"*) lands fast without algebra.
- **Confuses a first-timer:**
  - **Misleading micro-copy:** `"Tap a dial to test:"` sits directly above `[Dial 1 ▲ Coral] [Dial 2 ▲ Coral] [Dial 3 ● Jade]`. A first-timer can easily think tapping a button rotates the box dial rather than *flipping that dial's colour on the hidden card*.
  - The CTA *"No card works — peel off the casing →"* is slightly abrupt/engineering-flavored; *"Peek inside the boxes →"* would more naturally signal "let's check for secret wires."
- **Broken / cramped / cheap / default:**
  - On `phone`, the 3D `HIDDEN CARD` easel is small and pale, making `1 ▲ / 2 ▲ / 3 ●` faint against the ivory card; on both views it overlaps the lower stem of the central gimbal.

### `04-peel-off` (Step 4 · Inside the Boxes — `desk` & `phone`)
- **Understood in 5 seconds:** The outer box shells dissolve into sleek translucent ghost casings showing there are no hidden wires or radios — just rotating brass/steel `N/S` magnets tilted to `0°`, `120°`, or `240°`. Controls let you rotate Alice/Bob's magnets, close the casing, or fire a pair.
- **Confuses a first-timer:** Why `0° / 120° / 240°` specifically? That's okay to leave behind *"How do we know?"*, though firing a pair gives no visible on-panel tally or feedback line, leaving the right rail a bit empty on desktop.
- **Broken / cramped / cheap / default:**
  - **Cramped/colliding 3D badges (`phone`):** On `04-peel-off-phone`, the floating `0°`, `120°`, and `240°` tags are oversized relative to the mobile boxes — `0°` collides with Alice's magnet ring/lamp base, and `240°` / `120°` overlap the box interior and the `ALICE` / `BOB` nameplate corners.
  - On `desk`, the painted `N` and `S` letters rotate upside-down/sideways with Bob's magnet (`120°`), slightly hurting quick readability.

### `04b-bridge` (The Bridge · From 3 Dials to 2 Questions — `desk` & `phone`)
- **Understood in 5 seconds:** Clean two-card visual handoff explaining *why* we're switching games: `3 DIALS (1 · 2 · 3): 55.6% vs 50% (Tiny 5.6% gap)` → `2 QUESTIONS (0 · 1): 75% wall (Can nature break through?)`. The 3D dials physically morph to `0 · 1`, and the 85.4% payoff stays unspoiled.
- **Confuses a first-timer:** The rule (*"win by matching — unless both get 1, then they must differ"*) is concise, though there is no quick interactive test on this screen to practice a round before jumping in.
- **Broken / cramped / cheap / default:**
  - **Subtle stage mismatch (`desk` & `phone`):** Both 3D dials point to `0`, yet Alice glows Coral `▲` and Bob glows Jade `●` — visually illustrating a *loss* right next to the explanation *"win by matching"*. Setting both lamps to match on `0 & 0` would subtly reinforce the rule.

### `05-game-wall` (Step 5 · The Team Game / 75% Wall — `desk` & `phone`)
- **Understood in 5 seconds:** A brass gantry holds a glowing ivory score bar pressed flat against a vertical frosted glass barrier labeled **`75% PLAN LIMIT`**. The 4 outcome chips (`0&0 ✓`, `0&1 ✓`, `1&0 ✓`, `1&1 ✗`) make the `75.0% (3/4)` ceiling obvious in seconds. Brilliant handling of statistical noise on phone (`75.1%` / `751 / 1,000`): *"A lucky streak can poke past 75% — not keep it there"* + **`Chance of luck: still possible`**. The physical `CARD | ENTANGLED` lever sits front-and-center ready to pull.
- **Confuses a first-timer:**
  - **Weak toggle affordance:** Because all four card buttons start filled solid Coral (`0 → ▲ Coral`, `1 → ▲ Coral`), they look somewhat like static status readouts rather than interactive flip switches — a visitor might never realize they can tap them to try different plans.
  - Slight terminology drift between `"hidden card"` (headline/lever) and `"plan"` (`75% PLAN LIMIT`, `Plan average max`), though still clear in context.
- **Broken / cramped / cheap / default:**
  - On `phone`, the `CARD | ENTANGLED` nameplate on the 3D lever is quite small and sits closely against the central emitter base. Otherwise clean and balanced.

### `06-breakthrough-shatter` (Step 6 · Breakthrough — Shatter Beat — `desk` & `phone`)
- **Understood in 5 seconds:** The lever is thrown to `ENTANGLED`, the bar turns radiant gold, and the frosted `75%` glass wall **explodes into dozens of faceted, sparkling shards** as the bar punches past 75% (`86.4%` desk / `85.4%` phone, `< 1 in 1,000,000` luck). The entire UI panel dims down to spotlight the 3D stage.
- **Confuses a first-timer:** Nothing — the visual storytelling is visceral and crystal clear.
- **Broken / cramped / cheap / default:**
  - **Shard cloud overlaps Bob's `▲` glyph (`desk` & `phone`):** Falling shards pass right in front of Bob's floating coral triangle icon, cluttering that corner of the silhouette.
  - **UI dimming reads slightly heavy in a still (`desk`):** At ~20–25% opacity the dimmed rail (`Wall shattered...`) looks almost disabled if a viewer glances right during the slow-mo beat.
  - The `75% PLAN LIMIT` badge vanishes abruptly during the shatter frame and pops back in on `07`.

### `07-settled-85` (Step 6 · Breakthrough — Settled at ~85.4% — `desk` & `phone`)
- **Understood in 5 seconds:** Calm aftermath: the gold bar settles near a new brass hairline (`85.4% QUANTUM LIMIT`), luck is ruled out (`< 1 in 1,000,000`), and one crisp sentence states the takeaway: *"No hidden card — no plan made in advance without talking — can keep this up. Real entangled pairs in nature do."* Next CTA (`Can Alice text Bob? →`) nails the viewer's exact next question.
- **Confuses a first-timer:**
  - **Number vs. "LIMIT" clash (`desk` & `phone`):** The 3D badge says **`85.4% QUANTUM LIMIT`**, yet the live score reads **`86.4%`** (desk) / **`86.5%`** (phone), and the glowing bar tip visibly pokes *past* the gold hairline! Even though the body text correctly says *"scores hover around quantum nature's 85.4% average limit"*, a sharp student or curious adult will immediately ask: *"Wait — how did it beat the quantum limit?!"*
- **Broken / cramped / cheap / default:**
  - **3D label collision (`phone`):** On `07-settled-85-phone`, the vertical stem from `85.4% QUANTUM LIMIT` runs directly behind the right side of the `75% PLAN LIMIT` pill, and the two pills crowd each other.
  - Minor copy polish: `"quantum nature's 85.4% average limit"` reads slightly awkwardly; `"nature's 85.4% average limit"` is cleaner.

### `08-bob-alone` (Step 7 · No Faster-Than-Light Texting — `desk` & `phone`)
- **Understood in 5 seconds:** A ribbed frosted-glass screen labeled **`ALICE — HIDDEN`** blocks Alice's box so we watch only Bob. Switching Alice (`Always 0`, `Always 1`, `Random`, `Off`) leaves Bob's lamp hovering at ~50% (`49.4%` desk / `51.6%` phone) — visually proving no instant messaging is possible — with a 24-flash coin-flip strip, a 4-mode comparison strip (`A: 0`, `A: 1`, `A: Rand`, `A: Off`), and a `Bring notes together` button.
- **Confuses a first-timer:** Nothing conceptually — this is one of the clearest no-signaling demos on the web.
- **Broken / cramped / cheap / default:**
  - **Cropped 3D screen (`desk` & `phone`):** The left brass edge of the `ALICE — HIDDEN` frosted screen is sliced right off the left viewport border on **both** desktop and phone! Looks like an unintended camera-framing bug.
  - **Visual density (`desk` & `phone`):** Densest panel in the app; on desktop the 24 tiny `▲`/`●` flash tiles are dark and slightly cramped, and on phone the bottom sheet grows to ~55% of viewport height.
  - Minor redundancy: `ALICE — HIDDEN` appears at the top of the screen while `ALICE` also sits on the nameplate right below it.

### `09-teacher-mode` (Teacher Mode — `desk`, `phone`, & `proj1280`)
- **Understood in 5 seconds:** A high-visibility `Rule:` banner pins the game rules to the top of the panel; the `CARD | ENTANGLED` lever is hidden inside a closed floor socket until the teacher clicks **`The class has voted — reveal lever`**; burst buttons simplify to `Fire 2,000` + `Clear`.
- **Confuses a first-timer / student:** Nothing — the persistent rule reminder and spoiler-free lever lock are genuinely thoughtful classroom UX.
- **Broken / cramped / cheap / default:**
  - On `proj1280`, all controls fit cleanly with zero clipping or scrollbars, and the main headline, card buttons, `75.2%`, and CTA scale up nicely. However, the gold kicker (`STEP 5 · THE TEAM GAME`), the muted `Chance of luck: still possible` pill, `"PLAN LIMIT"` sub-text, and `How do we know?` remain small/low-contrast for back-row students.
  - On `proj1280`, the side ports show the same half-clipped glowing mote bump seen in `02`, and the left/right gantry posts sit close to the edges of the narrowed 3D pane.

---

## 3. Breakthrough Wow Moment & Physics Accuracy Audit (R5 Extra)

### Does the Breakthrough (`06-breakthrough-shatter`) Look Like Glass Shattering — and Would a Visitor Gasp?
- **Does it look like glass shattering?** **Yes — unmistakably.** The translucent icy-blue/silver faceted shards with bright specular glints, warm gold reflections, radial burst around the impact point, and leftover brass wall brackets read immediately as real shattered architectural glass rather than generic confetti or cube debris.
- **Would a visitor gasp?** **Yes, very likely — especially in motion with the slow-motion beat and chime.** Dimming the entire side rail / bottom sheet to throw a theatrical spotlight onto the exploding 3D barrier is an inspired touch; it turns a statistics threshold into a physical climax.
- **To push it from "genuinely impressive" to "unforgettable":**
  1. Bias the shard burst slightly upward/forward or briefly fade Bob's floating `▲` glyph during the 900ms shatter so shards don't clutter right over Bob's lamp icon.
  2. Keep the dimmed rail's headline/score slightly more readable (~35–40% opacity instead of ~20%) so it feels like a cinematic spotlight rather than a greyed-out overlay.
  3. Smoothly dissolve the `75% PLAN LIMIT` badge out on impact and fade it back in subtly at the broken bracket when settling (`07`), avoiding a pop-out/pop-in cut.

### Physics Overclaiming Audit (Every On-Screen Sentence)
- **Overall verdict: Exceptionally disciplined.** Across all 23 screenshots, **not a single surface sentence overclaims** what particles "really" do (zero "instantaneous spooky communication", zero "particles decide at measurement", zero "reality doesn't exist until observed"). The climax takeaway — *"No hidden card — no plan made in advance without talking — can keep this up. Real entangled pairs in nature do."* — stays strictly and accurately within what a Bell test actually rules out.
- **Three minor precision/framing items worth tightening (none are egregious woo, but sharp teachers or students will notice):**
  1. **`07-settled-85` — `85.4% QUANTUM LIMIT` badge vs. `86.4%` / `86.5%` displayed score:** Calling `85.4%` a bare `LIMIT` while the bar literally sticks past it at `86.4%` confuses a long-run expected bound (Tsirelson average) with a hard per-run cap. Rename the 3D badge to **`85.4% QUANTUM AVG`** (or **`~85.4% AVG LIMIT`**) and/or note `(±1% per 2,000 runs)` so students don't think the quantum limit was violated.
  2. **`04-peel-off` — *"Each particle meets a tilted magnet (0°, 120°, or 240°) and flashes ▲ Coral or ● Jade."*:** Mild shorthand — the *detector lamp* flashes, not the particle itself (*"triggers ▲ Coral or ● Jade"* is cleaner). Also, for physics teachers inspecting `0° / 120° / 240°`, a standard spin-1/2 singlet yields *opposite* results at identical magnet angles (`0°` & `0°`), so same-dial-same-colour implicitly assumes opposite colour wiring on Bob's box (totally fine pedagogically — just ensure *"How do we know?"* notes this convention).
  3. **`07-settled-85` — silent free-choice assumption:** *"No hidden card — no plan made in advance without talking — can keep this up"* accurately captures locality + realism while silently assuming dials are chosen independently of the card (freedom of choice). Totally right to keep off the surface; just ensure *"How do we know?"* names it alongside loopholes.

---

## 4. Top 8 Fixes (Ranked by Score Impact)

*Note: All five scores currently sit at **4/5** (already meeting ≥ 4). Items **#1, #2, and #3** protect **Beauty** from dipping below 4 on mobile/edge frames and, combined with #4–#8, represent the clearest path from 4 → 5.*

1. **Fix cropped `ALICE — HIDDEN` frosted screen (`08-bob-alone-desk` & `08-bob-alone-phone`)** — *Impact: Beauty, Smoothness*
   - **What/Where:** Step 7 camera framing / screen X-position on both desktop and phone.
   - **How it should look:** Pull the camera back ~10% (or nudge the frosted screen slightly inward toward center) so its full left brass frame and shadow sit cleanly inside the viewport with matching left/right breathing margins to Bob's box. Optionally remove the duplicate `ALICE` nameplate underneath when the screen already displays `ALICE — HIDDEN`.

2. **Fix colliding 3D badges on phone (`04-peel-off-phone` & `07-settled-85-phone`)** — *Impact: Beauty, Clarity*
   - **What/Where:** Mobile 3D HTML/sprite annotations on Step 4 (`0° / 120° / 240°`) and Step 6 settled (`75% PLAN LIMIT` + `85.4% QUANTUM LIMIT`).
   - **How it should look:** On viewports `< 600px`, scale the `0° / 120° / 240°` tags down ~25% and push their radius slightly outward/upward so they never touch the magnet ring or `ALICE`/`BOB` nameplates (or show only the *active* angle badge in gold on phone). On `07-settled-85-phone`, place the `75% PLAN LIMIT` tag *below* the score bar (or stagger it further left) so the `85.4%` stem never crosses behind it.

3. **Replace chunky overlapping mote discs with sleek luminous light pulses (`00`, `01`, `02`, `09-proj1280`)** — *Impact: Beauty, Smoothness, Delight*
   - **What/Where:** Central emitter mote stream in 3D across Steps 0–2 and Teacher bursts.
   - **How it should look:** Replace the large opaque flat discs with smaller, tighter warm-gold core spheres trailing delicate, tapered additive light streaks/comets, and fade/scale motes down smoothly *before* they touch the brass box port rim so they slip cleanly inside instead of bunching into glowing lumps on the port edge.

4. **Resolve the `86.4%` vs. `85.4% QUANTUM LIMIT` tension (`07-settled-85-desk` & `phone`)** — *Impact: Clarity, Delight*
   - **What/Where:** Step 6 settled 3D horizon badge and copy.
   - **How it should look:** Rename the gold 3D badge from `85.4% QUANTUM LIMIT` to **`~85.4% QUANTUM AVG`** (or **`85.4% NATURE'S AVG`**), shorten the body phrase `"quantum nature's 85.4% average limit"` to `"nature's 85.4% average limit"`, and consider bumping the settle burst to 4,000–5,000 rounds (halving visual jitter around the gold hairline) or clamping the visual bar glow softly onto the needle when within statistical noise while displaying the honest exact percentage in the card.

5. **Make interactive card toggles unmistakably tappable (`03-card-grid` & `05-game-wall`)** — *Impact: Clarity, Ease*
   - **What/Where:** Step 3 (`Dial 1 / 2 / 3` colour buttons) and Step 5 (Alice & Bob `0 → ▲ Coral` / `1 → ▲ Coral` pills).
   - **How it should look:** Change Step 3's prompt from `"Tap a dial to test:"` to **`"Tap a row to flip its colour on the card:"`**, and add a subtle `⇄` flip glyph + crisp inner highlight/pressable elevation to the 3 pills on Step 3 and all 4 pills on Step 5 (plus a micro-hint `"Tap any switch to change your card"` on Step 5) so users immediately feel invited to experiment.

6. **Improve phone first-5-seconds hero framing (`00-first-phone`)** — *Impact: Beauty, Delight*
   - **What/Where:** Mobile portrait camera framing on screen `00` (and slightly on `01–04`).
   - **How it should look:** Raise the 3D rig vertically into the upper-middle third (cutting the dead top void in half) and zoom ~18–22% closer so the twin boxes, brass dials, and glowing gimbal feel sculptural and immediate on a phone screen. Also add a subtle `●` glyph above the lamps on `00` (or gently pulse it) so `"Same dial, same colour"` works for colour-blind visitors from frame one.

7. **Polish the shatter silhouette (`06-breakthrough-shatter`)** — *Impact: Delight, Beauty*
   - **What/Where:** Step 6 shatter animation beat (desktop & phone).
   - **How it should look:** Briefly fade out Alice and Bob's floating `▲`/`●` lamp glyphs during the 900ms shatter so exploding glass shards don't overlap Bob's triangle; bias shard initial velocities slightly upward/outward into the dark sky above the bar; keep the dimmed UI panel at ~35% opacity so the headline/score stays legible as a quiet caption; and fade the `75% PLAN LIMIT` label smoothly rather than snapping it off/on.

8. **Boost Teacher Mode projector contrast & back-row floor (`09-teacher-mode-proj1280` & `desk`)** — *Impact: Ease, Clarity (Classroom)*
   - **What/Where:** Teacher Mode stylesheet (`--ts` scaling, muted text contrast, and 3D pane margins).
   - **How it should look:** Ensure every caption/pill in Teacher Mode (`STEP 5 · THE TEAM GAME`, `Chance of luck: still possible`, `PLAN LIMIT`, `How do we know?`) meets `≥ 18px` and lifts muted text from `#B8C0D0` to `#DCE3F0` with stronger card borders (`rgba(255,255,255,0.22)`) so nothing washes out on a bright-room projector; also pull the `1280×720` Teacher 3D camera out ~8% so the brass gantry posts have comfortable side margin.

---

## 5. Teacher View — Would It Work on a Projector at the Back of a Classroom?

**Verdict: Yes — with minor contrast/floor-size polish, it is already classroom-ready at `1280×720` and far better than existing Bell/CHSH classroom demos.**

What **already works brilliantly** on `09-teacher-mode-proj1280.png`:
- **Zero scroll, zero clipping at `1280×720`:** Every control, the rule strip, the 4 strategy buttons, the `0&0 / 0&1 / 1&0 / 1&1` checks, the huge `75.2%` counter, `Fire 2,000`, `Clear`, and **`The class has voted — reveal lever`** fit cleanly above the fold.
- **Spoiler-proof classroom pacing:** Hiding the 3D `CARD | ENTANGLED` lever behind a recessed floor socket until the teacher taps `"The class has voted — reveal lever"` solves the #1 classroom problem (students reading ahead before voting on whether 75% can be beaten).
- **Persistent `Rule:` reminder bar:** Keeps the `0/1` match-unless-both-1 rule pinned in plain view during whole-class discussion.
- **Readable hero elements from 25–30 ft:** The 3D `75%` glass wall, glowing bar, coral/jade lamps + `▲`/`●` icons, `75.2%` score, 4 card switches, and gold CTA are all large and unmistakable from the back row.

What **a teacher should watch out for** (easy fixes in #8 above):
- **Secondary labels fall slightly small for back-row seats** on `1280×720`: `STEP 5 · THE TEAM GAME`, `Chance of luck: still possible` (dark grey on dark slate), `PLAN LIMIT` under `75%`, and `How do we know?` will blur past ~20 ft.
- **Dark-on-dark projector washout:** On an older ceiling LCD projector with classroom blinds partially open, the dark `#161B26` cards, `#242B3A` boxes, and unlit dark score-bar track will flatten together. Slightly brighter panel borders, a brighter unlit bar-track outline, and whiter secondary ink in Teacher Mode would make it hold up even under fluorescent lights.
- **Tight 3D margins on `proj1280`:** Widening the right panel for Teacher scale leaves the left/right brass gantry posts quite close to the viewport edges; a tiny ~8% camera pullback in Teacher Mode gives the stage room to breathe.

---

SCORES clarity=4 ease=4 beauty=4 smooth=4 delight=4
