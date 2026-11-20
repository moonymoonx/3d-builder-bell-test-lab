# Bell Test Lab — First-Time Visitor & Teacher Review (R1)

*Cold review from screenshots `screenshots/r1/00-first` through `09-teacher-mode` (desktop `1920×1080` and phone `390×844 @2x`). Judged strictly on what is visible on screen, first as a documentary-watching adult with no physics background, then as a high-school physics teacher projecting to a classroom.*

---

## 1. Scores (1–5, Strict)

- **Clarity: 3/5** — The guided story beats typical physics tools by avoiding equation walls, but on-screen contradictions (`75.6%` and `77.0%` labeled *"Wall holds solid"* behind the 75% bar; `86.1%` drawn left of `85.4%`), missing *"why should I care?"* payoffs in Steps 2 and 6, an unlabeled 3×3 grid, a visible line right under *"No wires"*, and a `(See S & maths)` jargon leak hold it below 4.
- **Ease: 3/5** — Desktop controls are clean and easy to reach, but on phone (`390×844`) Steps 5, 7, and Teacher mode overflow the bottom sheet, slicing off the Fire buttons and pushing the primary gold CTA completely off-screen, while Step 1's brightest button encourages skipping before firing.
- **Beauty: 3/5** — The opening desktop stage has refined dark-velvet framing and tasteful brass-and-graphite hardware, but opaque paper-like shatter shards, an obscured unreadable magnet cutaway, ghostly X-ray casing bleed in Steps 5 and 7, a clunky floating 3D bar, and a muddy OS-emoji speaker icon pull it short of museum-grade.
- **Smoothness: 3/5** — Chrome and camera framing stay steady across desktop steps with clear dial and mote motion cues (note: actual FPS cannot be measured in software-rendered stills), but incomplete casing opacity transitions (translucent bleed in Steps 5/7 and mismatched Alice/Bob opacity in Step 7), phone sheet height jumps/clipping, and number-to-bar clamping glitches hurt perceived polish.
- **Delight: 3/5** — The opening intrigue, interactive 3×3 card puzzle, plain-English *"1-in-a-million chance of luck"* framing, and Teacher vote gate show real heart, yet the centerpiece shatter wow-moment is undercut by crumpled-paper shards, a pre-spoiled 85.4% marker in Step 5, the 75.6%/77.0% contradiction, and a missing closing revelation about nature.

---

## 2. Per-Screen Review (00 → 09, Desktop & Phone)

### `00-first` — Opening Stage (`desk` & `phone`)
- **Understood in 5 seconds:** Two brass-dialed mystery boxes sit on a dark stage with glowing mint domes and golden light motes flying out of a central ring; one bold question (*"Two boxes. No wires. How do they always agree?"*) and one obvious gold button (*"Investigate"*). Calm, zero clutter, genuinely intriguing on desktop.
- **Confusing / off:**
  - **Visible "wire" under *"No wires."*:** A thin straight grey line runs horizontally from the left box's side port through the center gimbal into the right box's side port. Saying *"No wires."* right underneath a visible connecting line immediately undercuts the premise.
  - **Spoiler link:** `Skip to the 75% game →` introduces "75%" before the visitor has even seen the mystery (breaking the spoiler-free rule and confusing a cold visitor).
  - **Floating mint dots:** Two small glowing green circles levitate above the lamp domes with no context; before seeing the coral `▲` in Step 1, they look like stray floating particles or lens artifacts rather than shape-accessibility badges.
  - **Dial numeral overlap:** The white pointer needle sits directly over the digit `1`, partially obscuring it.
- **Broken / cheap / cramped:**
  - **Phone framing (`00-first-phone.png`):** The top ~40% of the screen is empty black void, shrinking the two boxes into small, noticeably dimmer silhouettes near the middle. Brand title and progress dots disappear completely on phone.
  - **Top-right sound button:** Uses a low-contrast, blue-tinted OS speaker emoji inside a dark circle instead of a crisp custom SVG icon.

### `01-box-step` — Step 1: The Mystery Boxes (`desk` & `phone`)
- **Understood in 5 seconds:** The boxes are now `ALICE` and `BOB`, both set to dial `1`, both flashing warm coral with `▲` above. The right rail / bottom sheet asks *"Same dial, same colour. Every time. How?"* with `1 / 2 / 3` dial buttons and `Fire 1 pair` / `Fire 50 matched`.
- **Confusing / off:**
  - **No tally / proof of "Every time":** There is no counter showing `50 / 50 matches (100%)`. Pressing `Fire 50 matched` leaves no visible evidence on screen, and *"matched"* is ambiguous to a non-physicist (matched dials or matched colours?).
  - **Inverted button hierarchy:** The copy tells you to set dials and fire, yet the bright Quantum Gold CTA at the bottom is **`Let the dials spin →`** (skipping the step), while `Fire 1 pair` and `Fire 50 matched` are dim dark buttons. A first-timer's thumb naturally hits the gold CTA and skips testing.
  - **Naming mismatch:** The floor says `ALICE` and `BOB`, but the buttons say `Left dial` and `Right dial` (then later steps switch to `Alice` and `Bob`).
  - **Missing "hidden card" visual:** The text mentions *"like a hidden card"*, yet the 3D motes show plain golden spheres with no folded ivory ticket or card cue.
- **Broken / cheap / cramped:**
  - **Desktop right rail:** Huge empty vertical void (~40% of rail height) sits between the Fire buttons and bottom CTA.
  - **Floor labels:** `ALICE` and `BOB` sit off-center to the left of each box, overlapping the front-left rubber feet.

### `02-random-tally` — Step 2: Random Dials (`desk` & `phone`)
- **Understood in 5 seconds:** Dials spin randomly (`1` vs `3` on desktop, `2` vs `2` on phone) and a clean tally card reports `Same colour: 49.9%` (`499 matches out of 1,000 random pairs` on desktop; `51.9%` on phone) with a gold bar right at the `50%` mark.
- **Confusing / off:**
  - **Missing *"Why should I care?"*:** A non-physicist sees `49.9%` / `51.9%` and thinks *"50% is just a coin flip — so what?"* Nothing explains *why* getting 100% when dials match and 50% overall is a jaw-dropping paradox.
  - **Terminology drift:** Step 1 says *"hidden card"*, Step 2's CTA says *"secret card"*, Step 3 mixes *"HIDDEN CARD"*, *"secret card"*, and *"hidden instruction card"*.
- **Broken / cheap / cramped:**
  - **Upside-down button order:** `Fire 1,000 more` is placed *underneath* the primary gold CTA `Could a secret card do that? →` (inconsistent with Step 6, where `Run fresh 2,000 rounds` sits above the gold CTA), leaving another tall blank gap in the middle of the desktop rail.

### `03-card-grid` — Step 3: Test a Hidden Card (`desk` & `phone`)
- **Understood in 5 seconds:** Three big tactile toggle buttons (`Dial 1 ▲ Coral`, `Dial 2 ▲ Coral`, `Dial 3 ● Jade`) let you program a hidden instruction card; a 3×3 grid below instantly scores `5 / 9` (`55.6% match`). Best interactive beat so far!
- **Confusing / off:**
  - **Unlabeled 3×3 axes & dark cells:** The grid shows `1 2 3` along the top and left, with **no `ALICE` / `BOB` labels**, and the 4 mismatched cells are dark squares with tiny faint dots (`·`) that take 10–15 seconds to decode as "different colours".
  - **Buried punchline:** *"Boxes hit **50%**. Every card scores at least **55.6%**."* is the moment hidden cards die, yet it's set in small muted body text inside the card instead of an unmistakable "aha!" callout.
  - **Abrupt transition:** `Peel off the casing →` jumps straight to opening the boxes without a bridging prompt (*"No card works — so what's inside?"*).
- **Broken / cheap / cramped:**
  - **Dead 3D stage:** Both 3D boxes sit frozen on mint green at dial `1` with zero connection to the card colours being toggled (especially noticeable on phone, where the top ~38% is a static scene).

### `04-peel-off` — Step 4: Inside the Boxes (`desk` & `phone`)
- **Understood in 5 seconds:** The dark casings fade translucent and the prompt says *"No wires. No cards. Just tilted magnets. Turn either dial to watch the magnet inside snap to 0°, 120°, or 240°."* Controls let you switch angles, close casing, or fire a pair.
- **Confusing / off:**
  - **The cutaway does NOT look like a tilted magnet:** The opaque brass `1-2-3` dial stays parked right in front of the box, obscuring the interior. Behind it you see a chunky brass rectangle, a grey vertical ring intersecting the dial, a black curved tube going up to the lamp (which ironically looks like a wire right under *"No wires"*!), and a grey block at the bottom. Worse, both magnets default to `0°`, so nothing looks *tilted* on arrival.
  - **Abrupt leap to Step 5:** The CTA says `Play the 75% game →` without explaining what a "75% game" has to do with `0° / 120° / 240°` magnets (and Step 5 immediately changes the dials to `0` and `1`).
- **Broken / cheap / cramped:**
  - **Cheap ghost-shell look:** The translucent casing lacks a crisp architectural edge outline, leaving the 4 black rubber feet and side brass ports looking like disconnected floating pieces.

### `05-game-wall` — Step 5: The Team Game (`desk` & `phone`)
- **Understood in 5 seconds:** *"Can you beat 75%?"* Alice and Bob get random `0` or `1`, win if answers match unless both got `1`. Four coral strategy toggles (`If 0 → ▲`, `If 1 → ▲`), four green/red rule checks (`0 & 0 match ✓` … `1 & 1 differ ✗`), a tally card, and a huge 3D score bar slamming into a `75% PLAN LIMIT` glass wall.
- **Confusing / off:**
  - **Major credibility bug (`75.6%` on phone says `"Wall holds solid"`):** In `05-game-wall-phone.png`, the giant readout says **`75.6%`** (`756 / 1,000 wins`), yet the bar is visually clamped *to the left* of the `75% wall` line and reads *"Wall holds solid"*! (Even worse in Teacher mode: **`77.0%`**!) A visitor immediately thinks the app is rigged or broken because 75.6% > 75%.
  - **Pre-spoiled 85.4% marker:** A thin, unlabeled vertical gold stick hovers in mid-air to the right of the glass wall in Step 5, visually confusing the 3D scene and spoiling where the next limit sits.
  - **"Pull lever" with no lever:** The bottom CTA says `Pull lever: Use entangled pairs →`, yet it's a plain flat rectangle button with no lever anywhere on screen.
  - **Cognitive overload & duplicate bars:** Rules + 4 toggles (missing the word `Coral`/`Jade`) + 4 outcome tiles + a 2D progress bar duplicating the 3D progress bar + 4 fire/clear buttons + bottom CTA all arrive at once.
- **Broken / cheap / cramped:**
  - **Severe phone clipping (`05-game-wall-phone.png`):** The `×1 | ×100 | Fire 1,000 | Clear` row is sliced in half at the bottom edge of the viewport, and the primary gold CTA (`Pull lever: Use entangled pairs →`) + `How do we know?` are **completely pushed off-screen**.
  - **Ghostly X-ray casing bleed:** On desktop, Bob's (and slightly Alice's) supposedly opaque dark box visibly leaks the internal magnet silhouette through the front shell.
  - **Clunky 3D bar & overlap:** The floating white bar + glass wall + stray gold stick reads like a crude horizontal sword/plank, and the bottom of the gold stick/wall hovers right over Bob's floating `▲` badge. The `0` and `1` dial markings are tiny and crowded against the bezel.

### `06-breakthrough-shatter` — Step 6: Breakthrough / Shatter (`desk` & `phone`)
- **Understood in 5 seconds:** *"85.4% — past the impossible wall. Wall shattered at round 539! Less than a 1-in-a-million chance of luck."* The 3D bar pushes past the exploding `75% PLAN LIMIT` to a newly labeled `85.4% NATURE LIMIT`.
- **Confusing / off:**
  - **Premature "Settled" text & mismatched headline:** At round 539 (`84.4%` desk / `84.3%` phone), the subtitle already claims *"Settled on nature's limit"* while the shatter is still mid-flight and 1,400+ rounds remain.
  - **Surface jargon leak:** Bottom link suddenly reads `How do we know? (See S & maths)` — a general-public visitor has no idea what **`S`** is.
  - **Missing *"why should I care?"* revelation:** Celebrates breaking 75% → 85.4% without stating in plain words what that shatters about reality (that no pre-written plan exists; nature really waits until you measure).
- **Broken / cheap / cramped:**
  - **Paper-like shatter shards:** The exploding glass wall looks like opaque matte light-grey crumpled paper / origami triangles clumped tightly in a narrow vertical column instead of shimmering translucent golden-lit glass shards.
  - **Crowded 2D tick labels:** `75%` and `85.4%` nearly collide above the 2D bar.
  - **Unexpected open casings:** Both boxes are suddenly translucent again behind the `0/1` dials, making the tiny `0` and `1` numerals hard to read against the internal blocks behind them.

### `07-settled-85` — Step 6: Settled (`desk` & `phone`)
- **Understood in 5 seconds:** After 2,000 rounds, the glass shards have vanished and the bar rests at the `85.4% NATURE LIMIT` gold line (`1,721 / 2,000 wins = 86.1%` on desk; `84.8%` on phone).
- **Confusing / off:**
  - **Another number-vs-bar contradiction (`07-settled-85-desk.png`):** The giant readout says **`86.1%`** (exceeding the `85.4% NATURE LIMIT`!), yet the 3D bar stops flush at `85.4%` and the 2D gold bar stops slightly *to the left* of `85.4%`! Without a brief cue (*"hovers around 85.4%"*) and honest bar alignment, `86.1%` vs `NATURE LIMIT 85.4%` looks like a bug.
  - **Orphaned label:** `75% PLAN LIMIT` floats over empty black air with no subtle remnant/dashed mark showing where the broken wall stood.
  - **Same `(See S & maths)` jargon leak** at the bottom.

### `08-bob-alone` — Step 7: No Faster-Than-Light Texting (`desk` & `phone`)
- **Understood in 5 seconds:** *"Can Alice send Bob an instant message?"* Toggle Alice's side (`Always 0`, `Always 1`, `Random`, `Off`), fire 1,000 rounds, and check whether Bob's standalone `▲ share` (`48.9%` desk / `48.5%` phone) ever budges from `50%`. Great conceptual beat!
- **Confusing / off:**
  - **3D stage doesn't isolate Bob:** The text says *"watch Bob's lamp alone"*, yet Alice's box is still brightly glowing mint-green right beside Bob — there is no visual dimming/curtain putting you in Bob's isolated shoes.
  - **Cryptic secondary button:** `Compare notes (light speed)` reads slightly telegraphic/technical for a layperson (better: *"Bring notes together (normal speed)"*).
  - **Code-like comparison strip:** `Alice=0: 48.9% · Alice=1: — · Off: —` looks cramped and programmer-ish instead of three inviting visual slots to fill.
- **Broken / cheap / cramped:**
  - **Phone cut-off again (`08-bob-alone-phone.png`):** The primary gold CTA (`Was this really tested? →`) and `How do we know?` are pushed completely below the fold!
  - **Mismatched box opacity:** On both desktop and phone, Alice's box is visibly translucent (showing the internal magnet) while Bob's box is mostly opaque with faint X-ray bleed-through.

### `09-teacher-mode` — Teacher Mode (`desk` & `phone`)
- **Understood in 5 seconds:** Adds a yellow-outlined `Rule:` banner at the top of the panel and locks the breakthrough CTA behind **`The class has voted — reveal switch`** (an awesome classroom feature!).
- **Confusing / off:**
  - **The `77.0%` + `"Wall holds solid"` bug hits dead-center (`09-teacher-mode-desk.png`)!** Projecting `77.0% (770 / 1,000 wins)` right next to a bar stopped *before* 75% and captioned *"Wall holds solid"* will cause an immediate classroom derailment.
  - **Duplicated rule text:** The new `Rule:` box repeats the exact body paragraph sitting 40px below it word-for-word, wasting prime vertical space.
- **Broken / cheap / cramped:**
  - **Nowhere near ×1.6 projector scale:** Desktop font sizes barely grew ~15–20% over Self-guided mode, and 3D labels (`ALICE`, `BOB`, `75% PLAN LIMIT`) didn't scale at all.
  - **Unusable phone clipping (`09-teacher-mode-phone.png`):** The extra `Rule:` banner shoves the entire score card, progress bar, Fire buttons, and the giant `The class has voted — reveal switch` CTA completely off the screen, slicing the `0 & 0 match` row in half.

---

## 3. Top 8 Fixes (Ranked by Impact on Scores)

1. **Eliminate the score-vs-wall contradictions (`75.6%`/`77.0%` & `86.1%`) and add the missing *"why should I care?"* payoffs** *(Brings **Clarity** 3 → ≥ 4, helps lift **Delight** 3 → ≥ 4)*
   - **Where:** Steps 2, 3, 5, 6 (both 2D tally card and 3D progress bar) and Teacher mode.
   - **How it should look:** Never clamp a bar below `75%` while printing `77.0% · Wall holds solid`. Instead, render the bar honestly to the live sample percentage and display a soft translucent *"random luck zone"* shimmer around 75% (e.g., if a 3-of-4 card rolls `77.0%` on 1,000 tries, show `"77.0% — just random luck on 1,000 tries (needs 1-in-a-million proof to break the 75% wall)"`, or add a small *"Proof against luck"* pill that stays low for cards and rockets to `1 in 1,000,000+` for entangled pairs). On Step 6, let `86.1%` sit honestly just past the `85.4%` hairline with copy *"86.1% — hovers around nature's 85.4% limit"*, and only switch the caption to *"Settled on nature's limit"* after the full 2,000 rounds finish. Add crisp 1-sentence payoffs on Step 2 (*"100% when dials match, yet 50% overall — could a hidden plan pull that off?"*), Step 3 (*"Impossible! Every card hits at least 55.6% — yet the boxes hit 50%."*), and Step 6 (*"No hidden plan could ever do this. Nature really doesn't pick the answers until you look."*).

2. **Fix phone bottom-sheet overflow & opening stage framing** *(Brings **Ease** 3 → ≥ 4, helps lift **Smoothness** 3 → ≥ 4)*
   - **Where:** Phone portrait (`390×844`) across Screens `00`, `05`, `07`, and `09`.
   - **How it should look:** Pin the primary gold CTA (`≥ 54px`) and `How do we know?` inside a fixed bottom footer of the sheet so the main action is **always** visible inside thumb reach without scrolling. Remove the redundant 2D progress bar in Step 5 (since the 3D bar sits right above it) and tighten card padding so `Alice/Bob` toggles, the 4 mini rule tiles, the numeric readout, and `×1 / ×100 / Fire 1,000` all fit cleanly above the pinned CTA. On `00-first-phone.png`, shift the camera closer/higher so the two boxes fill the upper half brightly instead of sitting small below a 40% black void.

3. **Redesign the Step 6 shatter wow-moment & 3D score bar** *(Brings **Beauty** 3 → ≥ 4 and **Delight** 3 → ≥ 4)*
   - **Where:** 3D stage in Steps 5 and 6 (`05`, `06`, `07`, `09`).
   - **How it should look:** Hide the `85.4% NATURE LIMIT` gold line completely during Step 5 so it doesn't spoil the reveal or look like a floating stick; illuminate it smoothly *only* after the glass wall breaks in Step 6. Replace the opaque grey paper-like shatter chunks with translucent, specular glass shards (`opacity ~0.45`, bright `#F4EFE6`/`#E6B655` beveled edges) exploding outward in a wide sweeping 3D arc with warm golden sparkle motes. Upgrade the flat white 3D bar into a sleek beveled luminous track that turns glowing Quantum Gold as it passes 75%, raise it ~15% higher so it never crowds Bob's floating `▲`/`●` badge, and leave a subtle frosted base/dashed hairline at `75%` after shatter so `75% PLAN LIMIT` stays anchored.

4. **Rebuild the Step 4 magnet cutaway & fix casing opacity bleed-through** *(Brings **Beauty** 3 → ≥ 4 and **Smoothness** 3 → ≥ 4)*
   - **Where:** 3D boxes in Steps 4, 5, 6, and 7 (`04`–`08`).
   - **How it should look:** When peeled open in Step 4, fade the opaque brass front dial down to ~18% ghost opacity (or recess it cleanly to a small badge) and raise the camera angle slightly so the interior is unobstructed. Sculpt an unmistakable satin-steel C-magnet / twin-pole assembly with a warm brass North indicator arrow and faint angle ring (`0° / 120° / 240°`), and start Alice at `0°` and Bob at `120°` so *"tilted magnets"* reads visually in 1 second. Add a crisp thin `#F4EFE6` edge outline to the translucent casing. When casings close in Steps 5 and 7, restore full `opacity: 1.0` with `depthWrite: true` on **both** boxes equally — eliminating the smudgy X-ray bleed in Step 5 and the mismatched Alice-open / Bob-closed bug in Step 7.

5. **Remove the misleading "wire", fix Step 00 spoiler, `(See S & maths)` leak, and micro-craft details** *(Helps lift **Clarity** and **Beauty** to ≥ 4)*
   - **Where:** Global 3D stage, top bar, Steps 00, 01, 06, 07.
   - **How it should look:** Remove the thin horizontal grey line connecting the boxes through the central source (the flying golden motes already communicate emission without contradicting *"No wires."*). Rename Screen 00's sub-link to `Skip to the game →`. Change Steps 6–7's bottom link to `How do we know?` (zero unexplained `S` on the surface). Replace the top-right emoji speaker with a crisp monochrome SVG speaker icon with a clear muted slash. Move dial numerals (`1/2/3` and `0/1`) slightly outward onto the bezel track so the white needle never covers `1` or clips `0`/`1`, and center `ALICE` and `BOB` cleanly under each box.

6. **Make Teacher Mode genuinely projector-ready (true ×1.5–1.6 scale, contrast boost, no duplicated copy)** *(Essential for classroom **Clarity** & **Ease** ≥ 4)*
   - **Where:** Teacher mode (`09-teacher-mode-desk.png` & `-phone.png`, plus all steps in Teacher mode).
   - **How it should look:** When `Teacher` is active on desktop, widen the right rail to `440–480px`, hide the redundant prose paragraph whenever the top `Rule:` banner is shown, and genuinely scale typography up (`40–44px` headlines, `52px` score percentages, `20–22px` button labels, `≥ 18px` captions). Scale 3D floating labels (`ALICE`, `BOB`, `75% PLAN LIMIT`, `85.4% NATURE LIMIT`) by ~1.5×, brighten key/rim lighting on the dark boxes by ~25%, and strengthen card/button borders so dark slate doesn't wash out under classroom lights.

7. **Fix Step 1 action priority + match counter, and make Steps 1, 3, and 7 visually alive on the 3D stage** *(Helps lift **Ease** and **Delight** to ≥ 4)*
   - **Where:** Steps 1, 2, 3, and 7 (`01`, `02`, `03`, `08`).
   - **How it should look:** On Step 1, elevate `Fire 1 pair` / `Fire 50 pairs` visually until the user fires once (keeping `Let the dials spin →` muted until a result appears, then glowing gold), add a live match counter card (`100% matched · 50 / 50 pairs`) filling the empty rail space, and rename `Left/Right dial` to `Alice's dial / Bob's dial`. On Step 2, move `Fire 1,000 more` above the gold CTA to match Step 6. On Step 3, add `ALICE` (rows) and `BOB` (columns) axis labels + subtle `≠` marks on mismatched dark squares, and animate small folded ivory card tickets traveling from the source with the user's chosen 3-colour strip. On Step 7, softly dim/veil Alice's side of the 3D stage until `Compare notes` is clicked so *"watch Bob's lamp alone"* is felt visually, and style `Alice=0 / Alice=1 / Off` as three clean labeled pills.

8. **Give Step 5 a genuine tactile switch (or honest CTA copy) and unify strategy labels** *(Helps lift **Ease** and **Delight** to ≥ 4)*
   - **Where:** Step 5 (`05-game-wall-desk.png` & `-phone.png`).
   - **How it should look:** Replace the plain flat `Pull lever: Use entangled pairs →` button with either a real brass throw-switch / slide-lever control that clicks visibly into place (matching the instrument mood) or straightforward copy (`Switch to entangled pairs →`) so the UI never promises a lever that isn't there. Include colour words on the four strategy toggles (`If 0 → ▲ Coral` / `● Jade`) to stay consistent with Step 3.

---

## 4. Teacher View: Would It Work on a Projector at the Back of a Classroom?

**Verdict: Not yet — great pedagogical structure, but it fails back-row legibility and classroom credibility in its current state.**

- **What works brilliantly for teaching:**
  - The **`The class has voted — reveal switch`** gate is a standout classroom mechanic — teachers can pause for a show-of-hands prediction without accidentally triggering the quantum reveal.
  - The clean right-hand panel keeps the left two-thirds open for the 3D apparatus, and the `Rule:` reminder banner is the right instinct for keeping the CHSH game rules visible during discussion.
- **What fails from 8–10 meters back on a classroom projector:**
  1. **Type is still too small:** Despite the spec calling for `×1.6`, `09-teacher-mode-desk.png` only bumps UI text by ~15–20%. From the back row, `75% PLAN LIMIT`, `0 & 0 match`, `Card score (3 of 4 = 75%)`, `770 / 1,000 wins`, and the tiny `0`/`1` dial markings will blur into illegibility.
  2. **The `77.0%` / `"Wall holds solid"` contradiction (`09-teacher-mode-desk.png`) is a live grenade in front of teenagers:** A student will immediately point out that `77.0% > 75%` and question whether the simulation is faking the wall. That single bug must be fixed before any teacher projects this live.
  3. **Projector washout risk:** Dark-graphite boxes (`#242B3A`) on a near-black stage (`#0D1017`–`#111520`) with subtle dark-slate buttons (`×1`, `×100`, `Fire 1,000`) look sleek on an OLED laptop in a dim room, but under fluorescent classroom lights on a mid-brightness projector, those low-contrast dark surfaces will flatten together.
  4. **Duplicated copy & mobile mirroring failure:** Repeating the full rule paragraph right below the `Rule:` box wastes space needed for genuinely big projector text, and on phone/narrow displays (`09-teacher-mode-phone.png`) Teacher mode pushes the entire score readout and vote button off-screen.

With Fixes #1 (honest wall/luck readout) and #6 (true ×1.5–1.6 scaling + projector contrast boost + removing duplicate rule text), Teacher mode would quickly turn from "risky to project" into a genuinely memorable classroom demo.

SCORES clarity=3 ease=3 beauty=3 smooth=3 delight=3
