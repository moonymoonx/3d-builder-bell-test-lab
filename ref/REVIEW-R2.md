# Bell Test Lab — R2 Cold First-Time Visitor & Teacher Review

*Reviewed cold from `screenshots/r2/` (`00-first` through `09-teacher-mode-proj1280`), first as a curious documentary-watching adult with no physics background, then as a high-school physics teacher projecting for a class. Source code was not read.*

---

## 1. Scores (1–5, strict: 4 = genuinely good, 5 = award-level)

- **Clarity: 3/5** — Plain language, zero banned surface jargon, and a genuinely clever Step 3 hidden-card grid clearly beat Quantum Flytrap and fun-with-quantum, but an unexplained narrative jump from the 3-dial 50% puzzle (Steps 1–4) to the 2-dial 75% game (Step 5) and a physics overclaim on Step 6 hold it back from 4.
- **Ease: 3/5** — Desktop Steps 0–4 feel calm and effortless with generous targets, but mobile (`390×844`) clips key action buttons (`Fire 1,000`, `Bring notes together`) behind the sticky gold CTA, collides 3D labels into the top chrome, and Teacher mode fails back-of-classroom legibility at `1280×720`.
- **Beauty: 3/5** — Screen 0 (`00-first-desk.png`), the warm velvet/brass/gold palette, and UI typography are museum-grade and calm, but the Breakthrough shatter reads as flat gray shrapnel, a dangling brass bracket stays frozen after shatter, magnet labels clip behind blocks, and Step 7's veil looks like a lens smudge.
- **Smoothness: 3/5** — Desktop layout stability and dial/lamp/lever state sync are solid (note: real FPS cannot be measured from software-rendered stills), but a leftover dangling post-shatter bracket looks like a stuck animation frame, Step 6's 3D and 2D bars desync from the printed scores (`83.7%` / `86.4%`), and phone layouts suffer scroll-clipping and chrome collisions.
- **Delight: 3/5** — Opening intrigue, the Step 3 aha grid, Step 4's translucent cutaway, and Teacher mode's `"The class has voted"` gate show real craft, but the centerpiece Breakthrough shatter does not look like glass and will not make a visitor gasp, and Step 3 spends part of Step 6's emotional punch early.

---

## 2. Physics Overclaim Audit & Breakthrough "Wow Moment" Verdict

### Physics Overclaims Flagged
1. **MAJOR OVERCLAIM — Steps 6 & 7 (`06-breakthrough-shatter-*`, `07-settled-85-*`):**
   - **On-screen sentence:** *"What nature just proved: no hidden card could ever do this. **The particles truly wait until you measure.**"*
   - **Why it overclaims:** Bell's theorem rules out *local hidden variables* (no pre-set hidden card / local pre-written instructions can explain >75% wins). It does **not** prove that particles indeterministically "wait until you measure." Deterministic non-local models (e.g., Bohmian mechanics / pilot-wave), Everettian Many-Worlds, and retrocausal/superdeterministic models all reproduce 85.4% without a collapse where particles "wait until you measure." Presenting one popular-science interpretation as *"What nature just proved"* crosses the line.
   - **Accurate replacement:** *"What nature just proved: no hidden card — no pre-set plan written before the particles split — can explain this. Whatever links them cannot be packed inside them in advance."*
2. **Minor imprecision — Screen 0 (`00-first-*`):**
   - *"How do they always agree?"* — Slightly overstates the premise, since Step 2 immediately reveals they only always agree *when the dials match* (and agree ~50% when dials are random). Acceptable as a mystery hook since both dials are shown set to `1`, though worth noting.
3. **Minor shorthand — Steps 6 & 7 (`06-*`, `07-*`):**
   - *"85.4% NATURE LIMIT"* / *"nature's 85.4% limit"* — Technically the *quantum* limit (Tsirelson's bound), not the logical no-signaling ceiling (PR boxes reach 100%). Fine for general-public shorthand since nature follows quantum mechanics, and far less problematic than *"truly wait until you measure."*
4. **Garbled statistical phrasing — Step 6 (`06-*`, `07-*`):**
   - *"Proof against luck: 1 in 1,000,000+ proof"* — Clumsy repetition of `"proof"` and grammatically inverted (it means `< 1 in 1,000,000 chance of luck`, as the subtitle rightly says).

### Breakthrough Wow Moment Verdict (`06-breakthrough-shatter-*`, `07-settled-85-*`)
- **Does it look like glass shattering?** **No.** On desktop (`06-breakthrough-shatter-desk.png`), the shatter renders as a tight vertical column of **opaque, flat matte-gray spiky triangles** with tiny yellow flecks—it looks like metallic shrapnel, crumpled foil, or a spiky gray wire-ball stuck on a rod rather than translucent, refractive glass shards flying outward. On phone (`06-breakthrough-shatter-phone.png`), it shrinks into a tiny messy gray scribble right below the top speaker icon.
- **Would a visitor gasp?** **No.** Four things kill the gasp:
  1. **No explosive motion or light burst:** Shards stay bunched inside the slab's original rectangular footprint; there is no golden flash, shockwave glow, or dramatic shift in the emitter/bar colour (both stay pale ivory-cream).
  2. **The bar barely crosses the line:** Even at `83.7%` (desktop), the 3D bar tip only pokes a hair past the gray shard pile, visually underselling the breakthrough.
  3. **Broken leftover artifact (`07-settled-85-*`):** After the shards vanish, a thin dark vertical wire and the detached bottom brass bracket stay hanging awkwardly in midair under `75% PLAN LIMIT`, looking like a rendering bug.
  4. **The lever isn't heroic:** The brass lever on the emitter pedestal is tiny, pale, and barely noticeable—pulling it doesn't feel like throwing a theatrical laboratory switch.

---

## 3. Per-Screen Review (in Filename Order)

### `00-first` (`00-first-desk.png`, `00-first-phone.png`)
- **Understood in 5s:** Immediately intriguing and calm. Two sleek mystery hardware boxes, a glowing central emitter sending golden light pulses, zero jargon, one unmistakable gold button (`Investigate`). Vastly better first impression than Quantum Flytrap or fun-with-quantum.
- **Confuses:** Nothing conceptually; great spoiler-free hook.
- **Broken / cramped / cheap:**
  - **Desk:** Both headlines wrap with `"agree?"` orphaned alone on line 3. The circular stage floor leaves a faint curved horizon line against the dark void. The green lamp halos look slightly airbrushed/cloudy rather than frosted glass emission.
  - **Phone:** Nearly 40% of the upper screen is empty black void and ~25% below the boxes is empty floor, leaving the hero rig feeling small and distant. The 9-dot progress pill disappears completely on phone (fine on Step 0, worth keeping consistent).

### `01-box-step` (`01-box-step-desk.png`, `01-box-step-phone.png`)
- **Understood in 5s:** Match Alice's and Bob's dials, fire pairs, and see that they light up the same colour 100% of the time—just like carrying a pre-written hidden card. Crisp colorblind-safe floating `●` badges above the domes.
- **Confuses:** Mild action-hierarchy blur—6 dial buttons, `Fire 1 pair`, `Fire 50 more`, top-left `Skip to game`, and gold `Let the dials spin →` all sit onscreen together.
- **Broken / cramped / cheap:**
  - **Floor labels:** `ALICE` and `BOB` look like flat gray sans-serif stickers hovering on the floor rather than perspective-grounded lab plaques, slightly offset from box centers.
  - **Phone:** The bottom sheet claims ~62% of viewport height (squeezing the 3D stage into a thin ~35% strip), making the 3D brass dial numbers `1 2 3` blurry/unreadable and pushing the floating `●` badges close to the top nav pills.

### `02-random-tally` (`02-random-tally-desk.png`, `02-random-tally-phone.png`)
- **Understood in 5s:** Spinning both dials randomly drops same-colour agreement from 100% down to ~50%.
- **Confuses:**
  - A non-physicist wonders: *"Why is 50% a 'catch'? Half matching, half differing sounds totally ordinary—why couldn't a hidden card do that?"* It relies entirely on Step 3 to pay off, which is okay, except...
  - **Number clash:** Desktop shows **`52.0%`** (bar visibly past the `50%` mark) right above `"yet only 50% overall."` Since the classical floor revealed next is `55.6%`, seeing `52.0%` weakens the contrast for a careful viewer.
- **Broken / cramped / cheap:** Cleanest screen on both form factors; phone still has the oversized ~64% bottom sheet.

### `03-card-grid` (`03-card-grid-desk.png`, `03-card-grid-phone.png`)
- **Understood in 5s:** You pick Coral (`▲`) or Jade (`●`) for Dials 1, 2, and 3, and the 3×3 grid instantly shows why *every* card matches at least `5 / 9` (`55.6%`). Genuinely clever, tactile, and accessible.
- **Confuses:**
  - **Missing logical bridge:** `"Tap each dial to write a hidden card for both particles."` A first-timer immediately asks: *"Why can't Alice and Bob have different cards?"* One sentence linking back to Step 1 (*"Because matching dials agreed 100%, both particles must carry the same card"*) would close that loophole cleanly.
  - `"Coral"` and `"Jade"` appear suddenly as button names without prior introduction (minor; legible thanks to icons).
- **Broken / cramped / cheap:** Visually very clean on both desktop and phone; nice subtle switch to an ivory core in the 3D source (though no visible "folded ivory tickets" appear on the motes).

### `04-peel-off` (`04-peel-off-desk.png`, `04-peel-off-phone.png`)
- **Understood in 5s:** The boxes turn ghostly translucent to reveal there are no wires or hidden electronics—just rotatable N/S magnets tilted to `0°`, `120°`, or `240°`.
- **Confuses:** *"Okay, there's a magnet inside—so what does it do to the particle?"* Changing the magnet angle doesn't show a measurement tally or explain how N/S deflection maps to Coral/Jade, making this step feel like a scenic detour rather than an explanatory beat.
- **Broken / cramped / cheap:**
  - **3D label occlusion (broken look):** Inside Alice's box, the yellow `N` block completely covers `0°`, while `120°` and `240°` press against the brass ring and `S` block. Inside Bob's box (`120°`), the `N` block hides `120°` and the `S` block crowds `240°`.
  - **3D craft:** The `N`/`S` blocks look slightly chunky/toy-like, and the 4 dark rubber feet float detached under the translucent box shell.
  - **Phone:** A huge empty dark gap sits inside the bottom sheet between `[Close casing][Fire pair]` and the gold CTA, while the 3D cutaway at the top is tiny.

### `05-game-wall` (`05-game-wall-desk.png`, `05-game-wall-phone.png`)
- **Understood in 5s:** A team game where Alice and Bob get random `0` or `1`, want to match unless both get `1`, and hit a physical `75% PLAN LIMIT` glass barrier.
- **Confuses:**
  - **Major narrative whiplash:** Step 3 *already* declared `"Impossible! Every hidden card matches at least 5 of 9..."` using 3-position dials (`1, 2, 3`). Step 5 suddenly switches to 2-position dials (`0, 1`), separate Alice/Bob cards, and a brand-new `75%` rule with zero explanation of why we abandoned the 3-dial game or why we're testing hidden cards *again*.
  - **Dense control panel:** 15 stacked UI blocks (rule text + 4 card toggles + 4 check tiles + multi-line score box + luck badge + 4 fire/clear controls + CTA) feel closer to a control dashboard than calm single-action pacing.
  - **Hard-to-spot lever:** CTA says `"Pull brass lever: Entangled pairs →"`, but the lever in 3D is a tiny pale pin at the gimbal base, easy to miss.
  - `"Proof against luck: Not proven (could be luck)"` sounds stiff/clinical.
- **Broken / cramped / cheap:**
  - **PHONE CLIPPING BUG (broken):** In `05-game-wall-phone.png`, the bottom row `[×1] [×100] [Fire 1,000] Clear` is **sliced off horizontally** behind the sticky gold CTA!
  - **PHONE TOP COLLISION (broken):** `75% PLAN LIMIT` in 3D collides into the bottom edge of the circular speaker icon in the top bar and renders tiny and blurry.
  - **3D prop look:** The floating horizontal bar + glass slab looks slightly like a disconnected floating sword hilt hanging in midair above the boxes.

### `06-breakthrough-shatter` (`06-breakthrough-shatter-desk.png`, `06-breakthrough-shatter-phone.png`)
- **Understood in 5s:** Entangled pairs pushed the score past 75% (`83.7%` desk / `86.4%` phone) with < 1-in-a-million chance of luck.
- **Confuses:**
  - **Physics overclaim:** `"The particles truly wait until you measure."` (see Section 2).
  - **Duplicate word:** `"Proof against luck: 1 in 1,000,000+ proof"`.
  - **Bar desync:** On desktop (`83.7%`), the 3D bar barely pokes past the 75% mark; on phone (`86.4%`), the 2D card bar clamps visually at `85.4%` despite the number reading `86.4%`. Also having *both* a 3D horizontal bar and a 2D horizontal bar in the card feels redundant.
- **Broken / cramped / cheap:**
  - **Cheap shatter:** Opaque flat-gray spiky shard cluster looks like metallic shrapnel/confetti, not glass; bottom brass bracket floats crookedly below it; emitter and bar fail to ignite gold.
  - **Phone top collision:** Both `75% PLAN LIMIT` and `85.4% NATURE LIMIT` are blurry smears colliding into the top Sound and Start-over buttons.

### `07-settled-85` (`07-settled-85-desk.png`, `07-settled-85-phone.png`)
- **Understood in 5s:** After 2,000 rounds, entangled pairs settle right around `85.4%`, well past the 75% hidden-card limit.
- **Confuses:**
  - Same physics overclaim (`"The particles truly wait until you measure"`) and duplicate `"proof"` badge.
  - Minor headline/number tension on desktop: headline says `85.4% — past the impossible wall.` right above live readout `84.7%`.
- **Broken / cramped / cheap:**
  - **BROKEN LEFTOVER MESH:** Under `75% PLAN LIMIT` on both desktop and phone, a thin dark vertical wire and the detached bottom brass cap of the shattered glass wall hang permanently in midair below the bar!
  - **Phone top collision:** `75% PLAN LIMIT` and `85.4% NATURE LIMIT` still collide with the top bar and are illegible.

### `08-bob-alone` (`08-bob-alone-desk.png`, `08-bob-alone-phone.png`)
- **Understood in 5s:** Great follow-up question (*"Can Alice send Bob an instant message?"*). Alice is veiled on the left while you watch Bob's 50/50 lamp alone on the right—no matter what Alice does, Bob stays at ~50%.
- **Confuses:**
  - **Missing comparison slot:** There are **4** Alice mode buttons (`Always 0`, `Always 1`, `Random`, `Off`) but only **3** readout tiles (`Alice: 0`, `Alice: 1`, `Alice: Off`). `Random` has nowhere to record!
  - `"Bob alone (▲ Coral share)"` is slightly jargon-y (`share`); `"Bring notes together (normal speed)"` is cryptic until clicked.
- **Broken / cramped / cheap:**
  - **Cheap veil:** The veil over Alice looks like a smudgy, low-res oval fog blob with a faint horizontal band at the bottom edge rather than an intentional frosted partition or curtain.
  - **Phone clipping:** The bottom border of `[Bring notes together (normal speed)]` is clipped behind the sticky gold CTA, and the `50%` tick label nearly touches `(▲ Coral share)`.

### `09-teacher-mode` (`09-teacher-mode-desk.png`, `09-teacher-mode-phone.png`, `09-teacher-mode-proj1280.png`)
- **Understood in 5s:** Pinned `Game rule:` reminder at top of rail and `"The class has voted — reveal lever"` CTA are genuinely thoughtful classroom pacing features.
- **Confuses / broken / cramped:**
  - **Teacher phone (`09-teacher-mode-phone.png`) IS BROKEN:** The added `Game rule:` banner pushes the entire `[×1] [×100] [Fire 1,000] Clear` row completely underneath the sticky gold CTA (only ~4px of button top borders peek out, with no scroll cue).
  - **Teacher desktop (`09-teacher-mode-desk.png` & `proj1280`):** Type scaling is nowhere near the promised `×1.6` classroom scale—small rules, muted captions, and dense controls make back-row reading very difficult (detailed in Section 4).

---

## 4. Teacher View: Would It Work on a Projector at the Back of a Classroom?

**Verdict: Partially — the pedagogy is smart, and the 3D boxes/bar read well, but the right-panel UI fails a real back-of-classroom projector test at `1280×720`.**

Checking `09-teacher-mode-proj1280.png` (and `09-teacher-mode-desk.png`) as a high-school physics teacher projecting in a 9-meter room with dimmed—not pitch-black—overhead lights:

- **What works well:**
  - **`"The class has voted — reveal lever"`** is an A+ classroom control—it prevents accidentally spoiling the reveal while students debate whether 75% can be beaten.
  - **Pinned `Game rule:` box** at the top of the rail is the right instinct so students don't forget the rule mid-discussion.
  - **3D stage readability:** The two boxes, glowing lamps, floating `▲`/`●` badges, white progress bar, `75%` header, `ALICE`/`BOB`, and big `75.0%` readout are legible from the back row.
- **What fails from the back row (25–30 ft on a 1280×720 classroom projector):**
  1. **Text is way too small:** Despite STYLE.md specifying `--ts: 1.6` (`≥ 25.6px` body, `≥ 18px` captions, `~48px` headlines), `09-teacher-mode-proj1280.png` only bumps the headline slightly while leaving the pinned `Game rule:` text, `0 & 0 match ✓` cards, `Hidden card (3 of 4 = 75%)`, `750 / 1,000 wins`, and `Proof against luck` at small desktop sizes that back-row students cannot read. On `1920×1080` (`09-teacher-mode-desk.png`), the rail stays narrow with empty space at the bottom instead of scaling up to fill the projection screen.
  2. **Low-contrast dark-on-dark surfaces wash out on real projectors:** `#161B26` cards on `#0D1017` with dim gray secondary copy (`PLAN LIMIT`, `match`, `differ`, `750 / 1,000 wins`) lose contrast quickly under classroom ambient light.
  3. **Tiny 3D details vanish at distance:** The `0` / `1` dial markings on the boxes and the tiny pale **brass lever** at the gimbal base are too small for back-row students to notice when the teacher reveals or pulls it.
  4. **Zero breathing room at 1280×720:** The right panel is packed wall-to-wall vertically; keeping `×1`, `×100`, `Fire 1,000`, and `Clear` all visible leaves no room to make the rule and strategy buttons genuinely classroom-sized.
  5. **Broken on Teacher Phone (`09-teacher-mode-phone.png`):** If a teacher mirrors or tests on a phone, `Fire 1,000` is completely hidden beneath the gold CTA.

---

## 5. Top 8 Fixes (Ranked by Impact on Scores)

### 1. Rebuild the Breakthrough Glass Shatter & Lighting Crescendo (`06`, `07`)
- **Score impact:** **Lifts Delight, Beauty, and Smoothness from 3 → ≥ 4.**
- **What & where:** The 75% glass wall, shatter burst, post-shatter state, emitter core, and 3D/2D bars on Step 6.
- **How it should look:** Replace opaque flat-gray triangle splinters with **translucent, refractive crystal shards** (`#E8F4FF` with bright specular edge glints and warm `#E6B655` backlight) bursting **radially outward and forward** across a wide arc with gravity and tumble (never bunched in a tight vertical rectangle). Trigger a brief golden flash at impact, shift the emitter core and 3D score bar from ivory to glowing **Quantum Gold** as it surges past 75%, accurately match both 3D and 2D bar tips to the live percentage (allow the 2D bar to pass `85.4%` when live runs hit `86.4%`), and **completely remove the shattered glass frame, vertical wire, and dangling bottom brass cap** after break (leaving only a clean faint `75%` tick mark).

### 2. Fix the Physics Overclaim & Clean Up Step 6–7 Microcopy (`06`, `07`, `08`)
- **Score impact:** **Lifts Clarity from 3 → ≥ 4.**
- **What & where:** Amber callout on Step 6, luck-proof pill on Steps 5–6, and Bob's readout card on Step 7.
- **How it should look:**
  - Replace *"What nature just proved: no hidden card could ever do this. The particles truly wait until you measure."* with: *"What nature just proved: no hidden card — no pre-set plan written before the particles split — can explain this. Whatever links them cannot be packed inside them in advance."*
  - Replace `"Proof against luck: 1 in 1,000,000+ proof"` with `"Chance of luck: < 1 in 1,000,000"` (and Step 5: `"Chance of luck: still possible"`).
  - On Step 7 (`08`), rename `"Bob alone (▲ Coral share)"` → `"Bob's ▲ Coral rate"`, and add a 4th comparison tile (`Alice: Random`) so all four Alice controls (`Always 0`, `Always 1`, `Random`, `Off`) have a home.

### 3. Fix Mobile Bottom-Sheet Clipping, Top-Bar Collisions & Screen 0 Framing (`00`, `05`, `06`, `07`, `08`, `09`)
- **Score impact:** **Lifts Ease and Smoothness from 3 → ≥ 4** (and lifts mobile Beauty).
- **What & where:** Phone (`390×844`) bottom sheet layout across Steps 1–7 & Teacher mode; mobile 3D camera/label positions on Steps 0, 5–6.
- **How it should look:** Compact the Step 5 and Step 7 card padding slightly and add safe scroll-bottom padding + a subtle bottom scroll fade above the sticky CTA so `[×1] [×100] [Fire 1,000] Clear` and `[Bring notes together]` are **never clipped or buried** (including in Teacher phone mode). Lower the 3D bar and `75%` / `85.4%` labels ~45px on mobile (or widen camera framing) so they never touch the top `Sound`/`Start over` pills and remain crisp. On `00-first-phone`, raise the 3D rig slightly to remove the 38% empty black top void and balance the headline wrap (`Two boxes. No wires.` / `How do they always agree?`).

### 4. Bridge the Narrative Seam Across Steps 2 → 3 → 4 → 5 (`02`, `03`, `04`, `05`)
- **Score impact:** **Lifts Clarity and Delight from 3 → ≥ 4.**
- **What & where:** Transitional copy on Steps 2, 3, 4, and 5.
- **How it should look:**
  - **Step 2:** Say `"~50% overall"` (matching live ~51–52% runs) and tease why it's strange (*"100% when dials match, yet ~50% overall — sounds simple until you try to fake it."*).
  - **Step 3:** Add the missing one-line link: *"Because matching dials agreed 100%, both particles must carry the same card."*
  - **Step 4:** Explain in one line what the magnet does (*"Each particle hits the magnet and lights ▲ Coral (N) or ● Jade (S)"*) and animate a visible deflected pulse when `Fire pair` is pressed.
  - **Step 5:** Frame the 3-dial → 2-dial shift explicitly as raising the stakes (*"Step 3's gap was only 5.6%. Switch to a 2-dial team game where any hidden plan hits a hard 75% wall — and see if entangled pairs can smash right through it."*).

### 5. Deliver True Classroom-Scale Teacher Mode & Heroic Lever (`09-teacher-mode-*`, `05`)
- **Score impact:** **Lifts Ease and Clarity for classroom use from 3 → ≥ 4.**
- **What & where:** Teacher mode right rail (`proj1280`, `desk`, `phone`) and the 3D brass lever on the central emitter.
- **How it should look:** Enforce true classroom sizing (`≥ 22px` rule/button labels, `≥ 34px` headline, `≥ 48px` live score, `≥ 18px` captions) and brighter secondary ink (`#DCE3F0`) + crisper card borders so it survives a lit classroom projector at `1280×720` and scales proportionally at `1920×1080`. Free up vertical space in Teacher mode by simplifying the fire bar to just `[Fire 1,000]` + `Clear` (hiding `×1` / `×100` behind a small toggle or compact pill). Scale up the 3D brass lever ~2× with a glowing Quantum Gold collar once revealed so students in the back row unmistakably see the switch flip.

### 6. Fix Step 4 Magnet Label Occlusion & Refine Cutaway Hardware (`04-peel-off`)
- **Score impact:** **Lifts Beauty from 3 → ≥ 4.**
- **What & where:** Inside Alice's and Bob's translucent boxes on Step 4.
- **How it should look:** Place the `0°`, `120°`, and `240°` ticks cleanly *outside* the brass circular ring so the rotating `N`/`S` poles never hide or collide with them. Sculpt the poles into tapered satin-steel magnet tips (with subtle brass north accent and upright, crisp `N`/`S` markings) instead of blocky cubes, and fade the four rubber feet slightly when the casing ghosts out so they don't float detached.

### 7. De-Clutter Step 5 & Eliminate the Redundant Double Progress Bar (`05`, `06`, `07`)
- **Score impact:** **Lifts Ease and Beauty toward ≥ 4.**
- **What & where:** Right panel on Steps 5–6 and the 3D horizontal progress gauge.
- **How it should look:** Compress Step 5's four tall rule check boxes into a single crisp horizontal rule strip (`0&0 ✓ · 0&1 ✓ · 1&0 ✓ · 1&1 ✗`) so editing the card and firing immediately dominate the panel. Ground the 3D progress gauge visually (e.g., an architectural dark-brass rail or sleek glass bridge integrated with the stage rather than a floating sword-like bar), and remove the duplicate horizontal bar inside Step 6's right card so the 3D gauge is the single hero display.

### 8. Upgrade Step 7's Privacy Veil, Floor Nameplates & Classical-vs-Quantum Motes (`01`, `03`, `05`, `06`, `08`)
- **Score impact:** **Polishes Beauty and Delight solidly past 4.**
- **What & where:** Alice's veil (`08`), `ALICE`/`BOB` floor text (`01–09`), and particle motes during bursts (`03`, `05`, `06`).
- **How it should look:** Replace the soft radial blur blob over Alice on Step 7 with a crisp frosted-glass privacy screen in a thin dark-brass frame standing between Alice and Bob so it reads as intentional lab apparatus. Replace flat floating `ALICE`/`BOB` sprites with perspective-matched matte-brass floor nameplates centered squarely under each box. Show tiny glowing ivory tickets traveling on card-mode motes vs pure twin Quantum Gold motes in entangled mode so the physical contrast is visible directly on the 3D stage.

---

SCORES clarity=3 ease=3 beauty=3 smooth=3 delight=3
