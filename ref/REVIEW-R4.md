# Bell Test Lab — First-Time Visitor & Teacher Review (R4)

Reviewed cold from the 23 screenshots in `screenshots/r4/` (`00-first` → `09-teacher`, desktop `1920×1080`, phone `390×844 @2x`, and `1280×720` classroom projector) against the bar in `DESIGN-RULES.md` and `STYLE.md`.

---

## 1. Scores (1–5, strict)

- **Clarity: 4** — Almost every step lands within 5 seconds with zero jargon and standout visual proofs (the 3×3 hidden-card grid, 4-case truth pills, and 3-to-2 bridge), though noisy starting numbers (`76.9%` on a 75% card plan; `46.5%` / `53.8%` on Bob alone with no `n`) and a pre-revealed Teacher lever create brief double-takes.
- **Ease: 4** — One clear gold CTA anchored at the bottom of every screen, generous thumb targets, consistent navigation/reset/sound chrome, and zero overflow across desktop, phone, and `1280×720`, held back slightly by missing progress dots on phone and a bare-text `Clear` link.
- **Beauty: 4** — Calm, museum-grade dark-velvet hardware with brushed brass, frosted domes, and disciplined colour+shape pairing clearly beats Quantum Flytrap and fun-with-quantum.org, while tiny distant phone-hero framing, oversized Step 4 phone degree pills, and a ringed radial glow sprite in Step 6 keep it short of award-level 5.
- **Smoothness: 4** — Strong visual continuity (locked 3D stage anchors, clear motion cues in mid-flight motes, rotated magnet poles, thrown lever, and shard burst) and zero clipped layouts; minor vertical bottom-sheet height jumps on phone and drifting `75%`/`85.4%` bar badges between `05`–`07` show slight seams. *(Note: real-time FPS cannot be measured from static software-rendered PNGs.)*
- **Delight: 3** — The interactive concepts are genuinely captivating, but four visible seams undercut the peak magic beats: an empty-feeling phone hero (`00`), flat white-rimmed shards + ringed halo in the shatter (`06`), Alice's bright lamp showing straight through `"ALICE — HIDDEN"` (`08`), and Teacher mode's `"reveal lever"` button appearing while the lever is already sitting on stage (`09`).

---

## 2. Per-Screen Review

### `00-first` (Landing / Hero — desk & phone)
- **Understood in 5 seconds:** Two unconnected mystery hardware boxes with brass `1–2–3` dials are flashing the same warm coral colour after receiving glowing gold orbs from a central emitter. One button: **Investigate**. Intriguing, zero spoilers, zero jargon.
- **Confusing:** Nothing conceptually; on phone, without visible flying motes, you don't immediately see the emitter sending anything to the boxes.
- **Broken / cramped / cheap / default:**
  - **Phone framing (`00-first-phone.png`):** The three objects sit tiny in a thin horizontal band (~18% of screen height) surrounded by vast empty dark void above and blank grey floor below, losing the sculptural intimacy desktop has.
  - **Missing progress cue on phone:** Desktop shows subtle step dots at top centre; phone omits them entirely (here and on every subsequent screen).
  - Minor: desktop shows a faint curved floor-to-void horizon line across the upper middle; softening that fog transition would feel more seamless.

### `01-box-step` (Step 1 · The Mystery Boxes — desk & phone)
- **Understood in 5 seconds:** The boxes belong to Alice and Bob; set both dials to the same number, fire pairs, and they match 100% (`50 / 50 same colour — zero misses`). Colourblind-safe `●` symbols float cleanly above the jade lamps.
- **Confusing:** Nothing — Einstein's "hidden card" intuition is introduced naturally in one plain sentence.
- **Broken / cramped / cheap / default:**
  - On phone (`01-box-step-phone.png`), the top edge of the `ALICE` / `BOB` plaques barely kisses the bottom rim of the brass dials.
  - Desktop right rail has a very tall blank gap between `Fire 1 pair / Fire 50 more` and the bottom CTA (calm, though slightly lopsided). `Skip to game` appears in desktop top-left chrome but is absent on phone.

### `02-random-tally` (Step 2 · Random Dials — desk & phone)
- **Understood in 5 seconds:** Spin both dials randomly across 1,000 pairs and Alice and Bob match only ~50% (`50.4%` desk / `50.6%` phone). The amber callout cleanly frames the hook: *100% when dials match, ~50% overall — try faking that with a hidden card.*
- **Confusing:** Nothing; the mystery immediately makes you want to click **Try faking it with a hidden card →**.
- **Broken / cramped / cheap / default:** Clean on both viewports. No broken or technical elements.

### `03-card-grid` (Step 3 · Test a Hidden Card — desk & phone)
- **Understood in 5 seconds:** Standout screen. Tapping `Dial 1 / 2 / 3` flips a shared card (`▲ Coral` / `● Jade`) and updates a super-clear 3×3 Alice×Bob matrix showing `5 / 9 (55.6% match)` — making Mermin's impossibility proof instantly obvious without equations.
- **Confusing:** Nothing. A curious non-physicist gets the "aha!" immediately.
- **Broken / cramped / cheap / default:**
  - In the 3D scene, the ivory `HIDDEN CARD` stands dead-centre in front of the emitter, half-eclipsing the brass gimbal ring so the ring pokes out behind it like a handle; on phone, the card's `1: ▲ / 2: ▲ / 3: ●` lines are tiny and soft.
  - Phone bottom sheet grows tall (~58% of viewport), squeezing the stage into a narrow upper band (no clipping, but noticeably tighter than Step 1).

### `04-peel-off` (Step 4 · Inside the Boxes — desk & phone)
- **Understood in 5 seconds:** The outer box shells turn translucent to prove there are no trick wires — just rotating `N`/`S` magnets tilted to `0°`, `120°`, or `240°`.
- **Confusing:** Slight "why now?" beat: after the thrilling 55.6% vs 50% contradiction in Step 3, peeling the casing shows *what's inside*, then the CTA jumps straight to **Same puzzle, sharper test →** without saying on-screen why a sharper test is needed (that comes in `04b`).
- **Broken / cramped / cheap / default:**
  - **Phone visual collision (`04-peel-off-phone.png`):** The floating dark pills `0°`, `120°`, `240°` are far too large for the phone-scale boxes — `0°` covers the lamp collar and cuts into the magnet ring, while `240°` and `120°` crowd the box edges and plaques. Even on desktop, `0°` sits right on the lamp's brass collar.
  - The ghosted translucent box shell looks slightly soft/smudgy rather than crisp technical-cutaway glass with a clean edge outline.

### `04b-bridge` (The Bridge · From 3 Dials to 2 Questions — desk & phone)
- **Understood in 5 seconds:** Smart, concise transition explaining why we're switching from 3 dials (`55.6% vs 50% — Tiny 5.6% gap`) to 2 questions (`0 · 1`, `75% wall`), and the 3D dials physically update to `0 / 1`.
- **Confusing:** Minor: the new rule (*match unless both get 1, then differ*) arrives cleanly, though a first-timer briefly wonders why that specific rule was chosen until they play Step 5.
- **Broken / cramped / cheap / default:** Feels a touch slide-like (no stage interaction on this step, and desktop right rail is ~65% empty), though keeping it brief is the right call.

### `05-game-wall` (Step 5 · The Team Game — desk & phone)
- **Understood in 5 seconds:** Build the best 2-question hidden card for Alice and Bob; the four truth pills (`0&0 ✓`, `0&1 ✓`, `1&0 ✓`, `1&1 ✗`) instantly show why any card maxes out at 3/4 = 75%, while a glowing bar presses right up against a frosted `75% PLAN LIMIT` glass slab overhead.
- **Confusing:**
  - **Lucky-run contradiction on phone (`05-game-wall-phone.png`):** The headline asks *"Can any hidden card beat 75%?"* while the big bold readout directly below displays **`76.9%`** (`769 / 1,000`)! Although `"Luck can dent the glass. It can't break it."` and `"Chance of luck: still possible"` help explain it, seeing `76.9%` right under *"beat 75%?"* still causes a momentary "wait, didn't I just beat it?" double-take.
  - The CTA `"Pull brass lever: Entangled pairs →"` is slightly awkward phrasing — a user may hesitate briefly wondering if they should click the 3D lever or the button.
- **Broken / cramped / cheap / default:**
  - `Clear` beside `Fire 1,000` is a small bare underlined text link, not a comfortable ≥44px touch target on phone.
  - The `75% PLAN LIMIT` badge floats quite high above the glass slab with an empty dark gap between them.

### `06-breakthrough-shatter` (Step 6 · Breakthrough — desk & phone)
- **Understood in 5 seconds:** The brass lever flipped to `ENTANGLED`, the score bar turned gold and blasted past the 75% wall (`83.6%` desk / `83.7%` phone), glass shards exploded outward, and `Chance of luck: < 1 in 1,000,000` proves no hidden card can explain it.
- **Confusing:** Seeing the `85.4% QUANTUM LIMIT` badge and the finished CTA (`Can Alice text Bob? →`) already active while the score is still at `83.6%` mid-shatter slightly steps on the reveal beat.
- **Broken / cramped / cheap / default:**
  - **Circular glow disc artifact (`06-breakthrough-shatter-desk.png`):** A large circular tan/gold halo behind the impact shows a visible outer ring edge, reading like a cheap 2D billboard sprite against the otherwise refined 3D hardware.
  - **Shard finish & phone overlap (`06-breakthrough-shatter-phone.png`):** Shards have uniform bright white outlines that feel slightly flat/vector-sticker-like; on phone, the shard burst collides with the `85.4% QUANTUM LIMIT` badge and partially obscures Bob's `▲` icon.
  - The glass wall's top/bottom brass caps vanish abruptly here, then reappear as tiny floating gold stubs in `07`.

### `07-settled-85` (Step 6 Settled · ~85.4% — desk & phone)
- **Understood in 5 seconds:** The shards cleared, leaving a serene golden bar resting at the glowing `85.4% QUANTUM LIMIT` hairline after 2,000 rounds (`86.6%` desk / `85.4%` phone), with `< 1 in 1,000,000` chance of luck and a clean plain-English takeaway.
- **Confusing:**
  - **Badge-to-marker misalignment:** To keep `75% PLAN LIMIT` and `85.4% QUANTUM LIMIT` from colliding, both badges drift sideways off their actual ticks on the bar (especially obvious on `07-settled-85-phone.png`, where `75% PLAN LIMIT` sits far left of the 75% stubs and `85.4% QUANTUM LIMIT` sits right of the gold needle).
  - The two tiny floating gold stubs left at 75% aren't visually attached to the bar rail, so at a glance they look slightly like stray pixels/artifacts rather than broken brackets.
- **Broken / cramped / cheap / default:** Otherwise gorgeous, calm, and high-impact.

### `08-bob-alone` (Step 7 · No Faster-Than-Light Texting — desk & phone)
- **Understood in 5 seconds:** A brass-framed fluted privacy screen drops over Alice (`ALICE — HIDDEN`); you flip Alice's setting (`Always 0`, `Always 1`, `Random`, `Off`) and watch Bob's lamp alone (`Bob's last 24 flashes`) to test whether Alice can send an instant message.
- **Confusing:**
  - **Noisy opening percentage without `n`:** Right below *"Does his 50/50 stream ever budge?"*, the huge readout says **`46.5%`** on desktop and **`53.8%`** on phone — with no trial count shown! A first-timer immediately thinks *"Wait — 46.5% DID budge from 50%!"* until they think to press `Fire 1,000`.
  - **`Bring notes together`:** Intriguing button, but it isn't obvious on first glance what it will do before you've tested at least two of Alice's settings.
- **Broken / cramped / cheap / default:**
  - **Broken privacy illusion:** Even behind the `"ALICE — HIDDEN"` frosted screen, Alice's glowing jade lamp dome and `0/1` dial pointer remain plainly legible through the glass, slightly undercutting the "hidden from Bob" staging.
  - *(Note: Step 8, `"Was this really tested?"`, was not included in `screenshots/r4/` and could not be reviewed.)*

### `09-teacher-mode` (Teacher Mode — desk, phone & `1280×720` projector)
- **Understood in 5 seconds:** Larger classroom-oriented UI with a pinned amber `Rule:` reminder at top right, a single `Fire 2,000` button, and a class-vote pause button (**`The class has voted — reveal lever`**).
- **Confusing / Broken:**
  - **Pre-revealed lever bug (all three viewports):** The big gold CTA promises **`The class has voted — reveal lever`**, yet the brass lever labeled `CARD | ENTANGLED` is **already sitting right there in plain sight** on the emitter plinth!
  - Same lucky-run `75.9%` over 75% moment appears on `09-teacher-mode-phone.png`.
- **Cramped / cheap / projector issues:** See Section 5 below (secondary text didn't scale up to the `×1.6` Teacher bar; `CARD | ENTANGLED` plinth text is unreadable at distance; dark-on-dark box contrast risks washing out on bright-room projectors).

---

## 3. Breakthrough Wow Moment & Physics Accuracy Audit

### Breakthrough Wow Moment (`06-breakthrough-shatter-*` → `07-settled-85-*`)
- **Does it look like glass shattering?** **Yes — unmistakably shards of glass**, not confetti or sparkles. The angular polygon geometry, transparency, and scatter trajectory clearly read as a breached glass barrier, and the follow-up calm settle at `85.4%` (`07`) is classy and well-paced.
- **Would a visitor gasp?** They would genuinely go **"Whoa!"** and smile — it already crushes Quantum Flytrap and fun-with-quantum.org on emotional payoff. However, it falls **just short of a true cinematic gasp** because:
  1. The oversized radial glow disc behind the breach has a visible circular outer edge that looks like a 2D game sprite.
  2. Uniform bright-white rims on every shard make the cluster read slightly like a flat vector FX overlay rather than 3D crystal pieces refracting warm gold light.
  3. On phone, the burst collides with the `85.4% QUANTUM LIMIT` badge and Bob's `▲` marker, and the post-shatter UI is already visible during the mid-air explosion rather than letting the shatter breathe for a beat.

### Physics Overclaim Check (Every On-Screen Sentence)
Overall, the physics copy is **remarkably disciplined and accurate** — zero "spooky action at a distance," zero "particles talk faster than light," zero "reality doesn't exist until observed." Every headline and takeaway stays faithfully anchored to what Bell's theorem and real experiments actually rule out. Only **three minor phrasing tightenings** are worth making so even a strict physicist won't nitpick:
1. **Step 5 (`05-game-wall-*`, `09-teacher-mode-*`):** `"Can any hidden card beat 75%?"` + `"Luck can dent the glass. It can't break it."` — Technically a hidden card *can* beat 75% on a finite lucky run (and literally does on `05-phone` at `76.9%` and `09-phone` at `75.9%`), and luck has a tiny non-zero chance of exceeding any finite bar. Tightening to `"Can any hidden card average over 75%?"` and `"A lucky streak can poke past 75% — not sustain it."` removes the contradiction and absolute claim.
2. **Step 6 (`06` & `07`):** `"No hidden card — no plan made in advance without talking — can do this."` — Adding one word (`"can sustain this"` or `"can reliably do this"`) makes the statement airtight against the pedantic objection that a hidden card *could* fluke 83.6% with probability `< 10⁻⁶`.
3. **Step 7 (`08-bob-alone-*`):** `"Bob's last 24 flashes (pure coin flips):"` — Slightly poetic; `"looks like pure coin flips"` (or `"indistinguishable from coin flips"`) is cleaner because Bob's outcomes are still correlated with Alice's when notes are later compared.

---

## 4. Top 8 Fixes (Ranked by Impact on Scores)

1. **[Lifts Delight 3 → ≥ 4, +Beauty] Upgrade Step 6 glass-shatter polish and give the shatter its own unobstructed beat (`06-breakthrough-shatter-*`).**
   - *Where:* 3D shatter effect and Step 6 panel transition (`06-desk`, `06-phone`).
   - *How it should look:* Replace the wide circular radial-gradient halo (which shows a faint hard outer ring) with a tighter exponential bloom flash at the breach point. Vary shard opacity/thickness with directional warm-gold specular glints instead of uniform crisp white outlines on every polygon. Keep the 75% brass brackets mounted cleanly on the bar track so they don't vanish in `06` and pop back as floating stubs in `07`. Slightly narrow scatter on phone so shards never hit the `85.4%` badge or Bob's `▲` glyph, and hold the `85.4% QUANTUM LIMIT` badge + next-step CTA for ~800 ms until the burst clears.

2. **[Lifts Delight 3 → ≥ 4, +Clarity] Actually conceal the 3D brass lever in Teacher mode until `"The class has voted — reveal lever"` is clicked (`09-teacher-mode-*`).**
   - *Where:* Emitter pedestal lever in Step 5 when `Teacher` mode is active.
   - *How it should look:* Retract the brass lever flush inside the pedestal (showing a plain matte brass cap with no `CARD | ENTANGLED` plate) until the teacher clicks `"The class has voted — reveal lever"`. On click, smoothly raise the glowing gold lever into place and switch the CTA to `"Pull lever: Entangled pairs →"`.

3. **[Lifts Delight 3 → ≥ 4, +Beauty] Reframe the phone landing hero so the first 5 seconds feel close, tactile, and alive (`00-first-phone.png`).**
   - *Where:* Portrait phone camera framing and initial emitter animation on screen `00`.
   - *How it should look:* Zoom the portrait camera in so the two boxes and central emitter fill ~88% of phone width (~30–34% height) with balanced negative space above and below, and ensure a pair of warm-gold motes is already visibly mid-flight on load so the visual story ("emitter sends pairs to both boxes") reads immediately.

4. **[Lifts Delight 3 → ≥ 4, +Clarity] Make Alice's `"ALICE — HIDDEN"` frosted screen truly opaque and stabilize Bob's opening 50/50 readout (`08-bob-alone-*`).**
   - *Where:* Fluted privacy screen and Bob's readout card in Step 7 (`08-desk`, `08-phone`).
   - *How it should look:* Increase the glass frost/blur opacity so Alice's green lamp and dial angle can't be read right through `"ALICE — HIDDEN"` (leave only a soft dark box silhouette). Auto-seed or default Bob's initial sample to 1,000 flashes (so his rate opens cleanly around `~49.5–50.5%` instead of noisy `46.5%` / `53.8%`) and display the count (`e.g., 502 / 1,000 flashes`) directly under the percentage.

5. **[+Beauty, +Clarity] Fix overlapping 3D degree pills on Step 4 phone and crisp up the cutaway ghost shell (`04-peel-off-*`).**
   - *Where:* `0° / 120° / 240°` labels and translucent box casings in Step 4 (`04-phone`, `04-desk`).
   - *How it should look:* Replace the bulky dark floating badges (which overlap lamps, magnet rings, and box borders on phone) with compact etched degree markers hugging the outer brass magnet ring, highlighting only the active angle in warm gold. Add a subtle crisp `#F4EFE6` rim-edge outline on the peeled ghost casing so it reads as an intentional glass cutaway instead of a soft smudge.

6. **[+Clarity, +Beauty — Teacher Projector] Apply full Teacher scale to secondary copy, boost `CARD | ENTANGLED` & plaque legibility, and add a subtle projector rim-light lift (`09-teacher-mode-*`).**
   - *Where:* Teacher mode panel typography (`Rule:`, `Plan max`, `Luck can dent...`, `Chance of luck`, `Clear`, `How do we know?`), 3D lever plinth, `ALICE`/`BOB` plaques, and box lighting.
   - *How it should look:* Bring all Teacher secondary text up to `≥ 18px` at `1280×720`. Render `CARD | ENTANGLED` and `ALICE` / `BOB` in crisp warm ivory (`#F4EFE6`) on dark `#161B26` plates at larger type size (with the active lever side illuminated in gold), and slightly brighten box edge rim-lighting + the unfilled `75%–100%` bar track in Teacher mode so they don't wash out under classroom lights.

7. **[+Clarity, +Smoothness] Tighten lucky-run copy (`76.9%` vs `75%`) and align the `75%` / `85.4%` badges to their exact bar marks (`05`–`07`).**
   - *Where:* Step 5 headline/subcopy (`05-phone`, `09-phone`) and overhead bar badges (`05`, `06`, `07`).
   - *How it should look:* Use `"Can any hidden card average over 75%?"`, `Plan average max: 75.0% (3/4)`, and `"A lucky streak can poke past 75% — not sustain it."` On `06` and `07`, stagger the vertical height of `75% PLAN LIMIT` and `85.4% QUANTUM LIMIT` slightly with delicate hairline ticks dropping directly onto their exact X positions on the bar, so neither badge drifts off-mark.

8. **[+Ease, +Smoothness] Add phone step-progress indicator, make `Clear` a full 44px button, and seat Step 3's `HIDDEN CARD` cleanly (`00`–`08` phone, `03`, `05`).**
   - *Where:* Phone top chrome, Step 5/Teacher `Clear` link, and Step 3 central card prop.
   - *How it should look:* Add a slim segmented progress bar (or compact dots) just under the phone top bar so mobile users see where they are in the 8-step story. Restyle `Clear` as a quiet outlined button matching `Fire 1,000` height (`≥ 44px`). In Step 3, place the ivory `HIDDEN CARD` in a small dedicated brass holder slightly forward/lower of the emitter core so it doesn't awkwardly bisect the brass gimbal ring, with sharper high-contrast `1 / 2 / 3` symbols on phone.

---

## 5. Teacher View — Will It Work on a Classroom Projector?

**Short verdict: Almost — structurally very strong, needs 3 targeted legibility fixes to shine from the back row.**

Looking directly at `09-teacher-mode-proj1280.png` (`1280×720`):
- **What already works great:** Zero scrolling or clipping at `1280×720`; the headline (`Can any card beat 75%?`), massive `74.3%` score, colour+shape `Alice`/`Bob` buttons, `0&0 ✓` / `1&1 ✗` truth pills, `Fire 2,000`, and gold CTA are all bold and effortlessly readable from 30 feet away. Collapsing `×1 / ×100 / Fire 1,000` into a single `Fire 2,000` and pinning the `Rule:` banner are smart classroom ergonomics, and the **class-vote pause** before the quantum reveal is pedagogy gold.
- **What fails from the back of a real classroom:**
  1. **The lever spoiler:** `"The class has voted — reveal lever"` loses its theatrical punch because the `CARD | ENTANGLED` lever is already sitting on stage before the teacher clicks.
  2. **Unscaled fine print:** `CARD | ENTANGLED` on the 3D plinth is completely unreadable past row 2; `STEP 5 · THE TEAM GAME`, `Plan max: 75.0% (3/4)`, `Luck can dent the glass...`, `Chance of luck: still possible`, `Clear`, and `How do we know?` did not receive the promised `×1.6` Teacher scale and will blur into grey lines from the back row.
  3. **Bright-room projector contrast:** Dark charcoal boxes (`#242B3A`) on a dark slate floor (`#111520`) plus low-contrast light-grey-on-mid-grey `ALICE`/`BOB` plaques and the faint unfilled `75%–100%` bar track look sleek on an OLED laptop, but will wash out on a typical classroom ceiling projector with ambient light unless Teacher mode adds slightly brighter rim separation and higher-contrast plaque text.

---

`SCORES clarity=4 ease=4 beauty=4 smooth=4 delight=3`
