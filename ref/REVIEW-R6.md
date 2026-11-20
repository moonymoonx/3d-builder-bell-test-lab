# Bell Test Lab — First-Time-Visitor & Teacher Review (R6)

Reviewed cold from all 35 PNGs in `screenshots/r6/` (`00-first` through `12b-myth-observer-after`, desktop `1920×1080`, phone `390×844 @2x`, plus `1280×720` projector), judged against `DESIGN-RULES.md` and `STYLE.md` purely from what is visible on screen.

---

## 1. Whole-Page Scores (1–5)

- **Clarity: 3** — The core story (`00`–`08`) is genuinely clear (4/5 on its own, zero surface jargon, crisp physical metaphors), but the newly added Myth-buster mode drops whole-page clarity below 4 with a visible math/label contradiction (`Glove pairs (≥ 55.6%)` showing `55.2%` on `11b`), a `"Decoded: S (0)"` reveal that never displays any decoded correlation percentage (`10b`), `"Watched live: ~85.4%"` printed beneath an `84.4%` result (`12a/b-phone`), `"FTL"` jargon, and a physics overclaim on `11b`.
- **Ease: 4** — One clear gold primary action per screen, thumb-friendly targets, clean `← Back` / `Start over` / `Teacher` chrome, and smart Teacher vote-gating; held back from 5 by phone floating-badge collisions (`04`, `05`, `07`, `09`, `12`), vertical clipping on `11b-phone`, and redundant action buttons in Myths 2 and 3.
- **Beauty: 4** — Museum-grade matte graphite, brushed brass, warm blown-glass domes, translucent magnet cutaways, and faceted glass shards look calm and bespoke (far ahead of Quantum Flytrap and fun-with-quantum.org); held back from 5 by phone 3D label overlaps, clipped left edge of Alice's screen (`08`, `10a`), bunched particle blobs at box ports (`00`, `01`), and an orphaned `→` arrow wrap on `11b-desk`.
- **Smoothness: 4** — Strong visual motion cues (flying hidden cards in `03`, translucent peel-off in `04`, lever flip and dimmed-rail shatter beat in `06`, sealed caps snapping onto lamps in `12b`) and steady layout framing across most screens (note: actual FPS cannot be measured from static software-rendered screenshots); docked for vertical callout clipping on `11b-phone` and bunched-up port particles on `00`/`01`.
- **Delight: 4** — The 3D hidden-card easel (`03`), crystalline glass-wall shatter (`06`), and matte-black electronic recorder caps (`12b`) create real "wait, what?!" wonder and clearly beat Quantum Flytrap and fun-with-quantum.org on feel; Myth 1's flat decode reveal (`10b`) and Myth 2's self-contradicting `55.2%` result (`11b`) keep it from a 5.

---

## 2. Myth-Buster Mode Sub-Review (`10a`–`12b` Alone)

### Myth-Buster Scores (1–5)
- **Clarity: 3** — Three concrete number/label inconsistencies (`55.2%` next to `≥ 55.6%` in `11b`, no correlation readout behind `Decoded: S (0)` in `10b`, `84.4%` next to `~85.4%` in `12a/b-phone`), `"FTL"` jargon in tab 1, an unexplained `"two gloves"` analogy, and a physics overclaim in `11b`.
- **Ease: 3** — Redundant buttons on `11a` (`Test same dials` when step 1 is already complete) and `12a` (`Sealed recorder` right above `Swap to sealed recorder →`), clipped bottom callout on `11b-phone`, colliding limit badges on `12a/b-phone`, and 9 inactive story progress dots lingering in the top bar.
- **Beauty: 4** — Preserves the refined dark-velvet hardware look and introduces great physical recorder caps (`12b`), but loses polish on `11b-phone` clipping, `11b-desk` orphan `→` line wrap, `10a-phone` clipped screen edge, and pure coral/jade dots in `10a/b` that drop the `▲`/`●` glyph pairing.
- **Smoothness: 4** — Clear before→after visual storytelling on the 3D stage (screen removal in `10b`, card easel clearing in `11b`, recorder caps in `12b`; FPS not measurable in static shots), with layout stability broken only by `11b-phone` vertical clipping.
- **Delight: 3** — The SOS 3-slot framing and physical recorder caps (`12b`) are smart ideas, but Myth 1's payoff falls flat without a visible decoded pattern (`10b`) and Myth 2's `"Gap revealed!"` moment deflates when `55.2%` visibly undercuts its own `≥ 55.6%` bound (`11b`).

### Number-vs-Label Consistency Check (`10a`–`12b`)
| Screen | On-Screen Label | Shown Value(s) | Verdict |
|---|---|---|---|
| `10a-desk` | `Bob's lamp alone (600 pairs / slot)` · `50/50 noise` | Slot 1 `54.5% ▲` (5 coral, 1 jade dots), Slot 2 `50.3% ▲` (4/2), Slot 3 `49.8% ▲` (2/4) | **Caution**: `54.5%` (327/600, +2.2σ) paired with 5-of-6 red dots looks visually biased right next to `50/50 noise`. Also dots omit `▲`/`●` glyphs. |
| `10a-phone` | `Bob's lamp alone (600 pairs / slot)` · `50/50 noise` | `49.5% ▲`, `51.8% ▲`, `50.3% ▲` | **Consistent** numerically, though dots still omit `▲`/`●` glyphs. |
| `10b-desk` & `10b-phone` | `After notes meet at light speed` · `Decoded!` · `"the pattern only appeared after Alice's notes arrived"` | Exact same `54.5% / 50.3% / 49.8%` (desk) and `49.5% / 51.8% / 50.3%` (phone) with `Decoded: S (0)`, `O (1)`, `S (0)` | **Clarity Bug**: No Alice-vs-Bob match/correlation percentage (e.g., `~85% match` vs `~15% match`) is shown! Showing unchanged ~50% rates next to `Decoded: S (0)` hides *how* the message was decoded and contradicts `"the pattern only appeared"`. |
| `11a-desk` & `11a-phone` | `1. Matching dials (1,200 pairs)` · `Identical!` | `Glove pairs: 100.0%` · `Entangled: 100.0%` | **Consistent.** |
| `11b-desk` & `11b-phone` | `Glove pairs (≥ 55.6%)` vs `Entangled (~50.0%)` | Desk: `55.2%` vs `50.2%`. Phone: `55.2%` vs `48.8%`. | **Critical Clarity Bug (both viewports)**: (1) Sampled `55.2%` **visibly violates** its own `≥ 55.6%` label and stops *left* of the vertical tick mark (due to finite-sample noise on 2,400 pairs around 55.56%). (2) The unlabeled vertical tick on the `Entangled (~50.0%)` bar sits at the exact same `55.6%` x-position as the top bar, making `50.2%` on `11b-desk` look *below* `50.0%`! |
| `12a-desk` | `Human watching` / `"Watched live: ~85.4%."` | `85.2%` (`1,704 / 2,000` = `85.20%`) | Arithmetic exact; caption `~85.4%` is close (0.2% off) but clearly hardcoded. |
| `12a-phone` | `Human watching` / `"Watched live: ~85.4%."` | `84.4%` (`1,687 / 2,000` = `84.35%`) | **Clarity Bug**: Caption hardcodes `"Watched live: ~85.4%"` directly beneath a measured `84.4%` result (1.0 point off). |
| `12b-desk` | `Human watching` vs `Sealed recorder` / `"same ~85.4%"` | `85.2% (1,704/2,000)` vs `85.3% (1,705/2,000)` | Arithmetic exact (`85.20%`, `85.25%`); close to `~85.4%`. |
| `12b-phone` | `Human watching` vs `Sealed recorder` / `"same ~85.4%"` | `84.4% (1,687/2,000)` vs `84.6% (1,692/2,000)` | **Clarity Bug**: Both runs are `84.x%` (`84.4%` & `84.6%`), yet the takeaway claims `"Detectors log the same ~85.4%"` without distinguishing measured score from the 85.4% theoretical average. |

---

## 3. Breakthrough Wow Moment (`06-breakthrough-shatter` & `07-settled-85`)

- **Does it look like glass shattering?** **Yes — impressively so.** On `06-breakthrough-shatter-desk.png`, the frosted vertical wall genuinely explodes into dozens of sharp, faceted translucent shards with icy-blue refractions, warm gold reflections, and bright specular star-glints right where the golden bar bursts past 75%. The physical brass lever visibly sitting on `ENTANGLED` grounds the cause-and-effect.
- **Would a visitor gasp?** **On desktop, yes — close to a genuine gasp.** Dimming the right-hand rail during the slow-motion shatter beat is a smart theatrical move that draws all eyes to the explosion.
- **Where it loses punch:**
  - On **phone** (`06-breakthrough-shatter-phone.png`), the shatter fills a smaller top strip, shards overlap Bob's `▲` lamp icon, and the bottom sheet dims much less dramatically than desktop's rail, weakening the spotlight effect.
  - On **desktop** (`06-breakthrough-shatter-desk.png`), the dimmed rail drops so dark that `"The 75% glass wall just shattered!"` and `88.7%` nearly read as disabled/broken if you glance right during the beat.
  - Immediately afterward on **phone** (`07-settled-85-phone.png`), the serene settle is marred by the `85.4% QUANTUM LIMIT` pointer stem cutting straight through the `75% PLAN LIMIT` badge.

---

## 4. Physics Precision & Overclaim Audit

Overall, the core story shows **exemplary physics discipline** — Step 6 (`06`/`07`) deserves special credit for stating: *"No hidden card — no plan made in advance without talking — can keep this up. Real entangled pairs in nature do."* Two Myth-buster sentences cross or blur the line:

1. **`11b` (Myth 2) — Clear overclaim:**
   - On-screen: `"Gloves carry instructions. Entangled pairs don't — and the numbers prove it."`
   - Why it overclaims: Bell's theorem rules out **local** pre-packed instructions (plans fixed in advance with no communication or measurement-choice conspiracy), not every possible hidden-variable model (e.g., non-local pilot-wave theories). Asserting flatly that entangled pairs don't carry instructions goes beyond what the numbers prove.
   - Fix: `"Gloves carry fixed local instructions. No pre-packed card like that — without talking — can match entangled pairs."`
2. **`12b` (Myth 3) — Mild overclaim / phrasing precision:**
   - On-screen: `"Both runs shatter 75% identically — real Bell tests log every click automatically with electronic time-taggers."` and `"Detectors log the same ~85.4% whether anyone is watching or not. No human consciousness is required."`
   - Why to tighten: (a) On `12a/12b`, the 75% glass wall isn't actually present/shattering in the scene, so `"beat 75% identically"` matches what's shown; (b) `"electronic time-taggers"` is mild lab jargon; (c) a sharp student will ask *"didn't a human eventually read the log?"* — tighten to `"Electronic detectors log the same ~85.4% pattern automatically — no human eyes need to watch the lamps."`

---

## 5. Per-Screen Walkthrough

- **`00-first` (desk & phone):**
  - *5-second read:* Immediately captivating. Two mysterious brass-dialed boxes, no wires, matching glowing mint lamps, golden motes streaming from a brass gimbal core, one intriguing question (`"Two boxes. No wires. Same dial, same colour. How?"`), and one gold button (`Investigate`). No spoilers, no jargon.
  - *Issues:* Minor only — on `00-first-desk.png`, pairs of golden motes bunch into slightly blobby figure-eights near the box entry ports. On phone, the top progress dots are hidden on screen 0 while shown on desktop (fine, actually cleaner on phone).
- **`01-box-step` (desk & phone):**
  - *5-second read:* Alice and Bob nameplates appear, floating `▲` glyphs reinforce coral lamps (great accessibility), dials match at `1`, `100%` (50/50) agreement is clear, and Einstein's "hidden card" hypothesis sets up the mystery.
  - *Issues:* On `01-box-step-desk.png`, three overlapping gold discs clump right outside each box port like a glowing caterpillar instead of cleanly spaced motes.
- **`02-random-tally` (desk & phone):**
  - *5-second read:* Instant hook — dials spin to random positions, agreement drops to `~50%` (`47.6%` desk / `51.3%` phone), and the callout poses the puzzle (`"100% when dials match, yet ~50% overall — sounds simple until you try to fake it with a hidden card"`).
  - *Issues:* None. Clean, calm, and well-paced on both viewports.
- **`03-card-grid` (desk & phone):**
  - *5-second read:* Standout screen. A physical `HIDDEN CARD` easel appears by the source and tiny matching cards fly into both boxes! The 3 chunky colour+glyph dial toggles and 3×3 Alice×Bob matrix make `5 / 9 (55.6%)` self-evident in seconds.
  - *Issues:* On `03-card-grid-phone.png`, the text on the 3D `HIDDEN CARD` easel is tiny/soft, though the colour rows still communicate the idea and the bottom sheet carries the readable controls.
- **`04-peel-off` (desk & phone):**
  - *5-second read:* Translucent ghost casings reveal sculpted `N`/`S` magnets rotating to `0°`, `120°`, `240°` — tactile and unmistakably "no wires inside."
  - *Confusions / Issues:* **Phone layout collision** (`04-peel-off-phone.png`): the `0°`, `120°`, `240°` angle badges are oversized for the smaller phone boxes — `0°` overlaps Alice's `N` pole, and `120°`/`240°` sit directly over box corners and crowd the `ALICE`/`BOB` nameplates. Also, a first-timer might briefly wonder how seeing the magnets leads to `"Same puzzle, sharper test →"` until they reach the next step.
- **`04b-bridge` (desk & phone):**
  - *5-second read:* Smart narrative bridge. Dials visibly switch to `0` and `1`, two side-by-side cards compare `55.6% vs 50% (Tiny 5.6% gap)` against `75% wall (Can nature break through?)`, and the 2-question match/differ rule is stated in one bolded sentence without spoiling 85.4%.
  - *Issues:* On `04b-bridge-phone.png`, the body text sits a bit tight against the divider above the gold CTA; minor.
- **`05-game-wall` (desk & phone):**
  - *5-second read:* Brilliant physical metaphor — a glowing horizontal score bar presses right into a frosted `75% PLAN LIMIT` glass wall while the `CARD | ENTANGLED` lever sits at `CARD`. The four `0&0 ✓`, `0&1 ✓`, `1&0 ✓`, `1&1 ✗` pills instantly explain the 3/4 = 75% ceiling, and the copy smartly explains `75.5%` on desktop as a finite-sample lucky streak.
  - *Issues:* **Phone badge obstruction** (`05-game-wall-phone.png`): the `75% PLAN LIMIT` dark pill sits *directly over* the glass wall and bar contact point, hiding the physical collision that creates the tension!
- **`06-breakthrough-shatter` (desk & phone):**
  - *5-second read:* Dramatic glass explosion as the entangled bar breaks past 75% with `< 1 in 1,000,000` luck badge.
  - *Issues:* Desktop right rail dims slightly too aggressively (bordering on illegible during the beat); phone bottom sheet barely dims, and shards overlap Bob's `▲` lamp badge.
- **`07-settled-85` (desk & phone):**
  - *5-second read:* Calm aftermath — golden bar settled at `85.4% QUANTUM LIMIT` well past the `75% PLAN LIMIT` notch, `1,708 / 2,000 wins (85.4%)`, next hook `Can Alice text Bob? →`.
  - *Issues:* **Phone badge collision** (`07-settled-85-phone.png`): the `85.4% QUANTUM LIMIT` stem cuts straight through the `75% PLAN LIMIT` pill. Minor wording polish: `"quantum nature's 85.4% average limit"` reads slightly stiffly (`"nature's 85.4% quantum limit"` is smoother).
- **`08-bob-alone` (desk & phone):**
  - *5-second read:* Handsome fluted privacy screen (`ALICE — HIDDEN`) hides Alice while Bob's lamp stays stubbornly at ~50% (`50.2%` desk / `50.5%` phone) with a clear 24-flash `▲`/`●` history grid and 4 Alice-setting summary tiles.
  - *Issues:* **Left-edge clipping**: Alice's `ALICE — HIDDEN` brass frame is visibly cropped on the left edge of `08-bob-alone-phone.png` (and nearly touches the left border on desktop). Also, with 3 of the 4 Alice tiles still `—`, a gentle visual cue encouraging the user to click `Always 1` or `Off` before jumping straight to the gold CTA would deepen the aha! moment.
- **`09-teacher-mode` (desk, phone, `proj1280`):**
  - *5-second read:* Rule banner pinned at the top, larger panel typography, entangled lever hidden behind an empty brass socket until `"The class has voted — reveal lever"` is pressed.
  - *Issues:* Covered in Section 6 below (projector contrast/subtext size on `1280×720`, and the same `75% PLAN LIMIT` pill blocking the bar-wall contact on `09-teacher-mode-phone.png`).
- **`10a` & `10b` (Myth 1 — FTL Text, desk & phone):**
  - *5-second read:* Try texting `S-O-S` via Alice's hidden dials (`0, 1, 0`) and read Bob's 50/50 noise; then lift the screen at light speed.
  - *Confusions / Issues:* `"FTL Text"` tab uses unexplained acronym jargon; Alice's screen is clipped on the left edge (`10a-desk` & `10a-phone`); the 6 tiny dots per slot drop the `▲`/`●` glyph rule (colour-only red/green circles); `10a-desk` Slot 1 shows `54.5%` + 5/6 coral dots right under `50/50 noise`; and **`10b` never shows the decoded Alice-Bob correlation percentage**, leaving `"Decoded: S (0)"` looking unsupported over unchanged ~50% rates.
- **`11a` & `11b` (Myth 2 — Gloves, desk & phone):**
  - *5-second read:* Side-by-side test of pre-packed "glove cards" vs entangled pairs: identical `100.0%` on matching dials, diverging on random dials.
  - *Confusions / Issues:* Never briefly explains the left/right-glove-in-boxes metaphor for newcomers (`"glove cards"` blurs two metaphors); `11a` shows a redundant `Test same dials` button when matching dials are already complete; **`11b` shows `55.2%` next to `Glove pairs (≥ 55.6%)`** on both desktop and phone, with an unlabeled `55.6%` tick on the `Entangled (~50.0%)` bar; **`11b-phone` clips the bottom border of the takeaway callout**; `11b-desk` orphans the `→` arrow alone on line 2 of the CTA button; and `"Entangled pairs don't — and the numbers prove it"` overclaims the physics.
- **`12a` & `12b` (Myth 3 — Watcher, desk & phone):**
  - *5-second read:* Compare 2,000 rounds watched live against 2,000 rounds with matte-black brass-trimmed sealed electronic recorder caps physically covering both lamps (`12b` looks great!).
  - *Confusions / Issues:* `12a` duplicates the next action (`Sealed recorder` button right above `Swap to sealed recorder →`); `12a/b-phone` prints `"Watched live: ~85.4%"` / `"same ~85.4%"` right under `84.4%` and `84.6%`; `12a/b-phone` repeats the `85.4%`/`75%` badge stem collision; `"electronic time-taggers"` is mild jargon; and 9 dead story dots sit in the top bar across all Myth screens.

---

## 6. Teacher View — Classroom Projector Check (`1280×720`)

**Verdict: Mostly works — genuinely classroom-ready on layout and pacing, with a few back-of-room legibility fixes needed before it's effortless in a lit room.**

- **What already nails classroom projection (`09-teacher-mode-proj1280.png`):**
  - **Zero clipping at `1280×720`**: Every element from the top bar down to `How do we know?` fits cleanly inside 720px height without scrolling.
  - **Pedagogy is spot-on**: The pinned gold-bordered `Rule` banner keeps the game rules visible during class debate, hiding the entangled lever behind `"The class has voted — reveal lever"` prevents spoilers, and collapsing `×1`/`×100`/`Fire 1,000` into a single `Fire 2,000` + `Clear` row removes clutter.
  - **Hero elements read from 9 meters away**: The headline, `74.9%` score, Coral/Jade card buttons, `0&0 ✓`…`1&1 ✗` pills, `ALICE`/`BOB` plates, glowing score bar, and gold CTA have strong size and contrast.
- **What struggles from the back row on a washed-out projector:**
  - **Muted secondary text is too small and low-contrast**: `Plan average max: 75.0% (3/4)`, `"A lucky streak can poke past 75% — not keep it there. (1,498 / 2,000)"`, `Chance of luck: still possible`, the top bar controls (`← Back`, `Myths`, `Teacher`), and `PLAN LIMIT` under `75%` are noticeably smaller than `STYLE.md`'s promised `1.6×` (`≥ 18px`) floor and use muted slate-gray ink on dark navy that washes out under classroom ceiling lights.
  - **3D stage compression**: At `1280px`, the wider Teacher rail claims ~40% of the width, shrinking the `0` and `1` dial markings to back-row squint size and keeping the frosted glass wall fairly subtle against the dark background.

---

## 7. Top 8 Fixes (Ranked by Impact on Scores)

1. **[Lifts Whole-Page Clarity & Myth-Buster Clarity/Delight from 3 → ≥ 4] Fix Myth 2's `55.2%` vs `≥ 55.6%` contradiction and misaligned bar tick (`11b-desk`, `11b-phone`)**
   - *What & where:* In Myth 2's `2. Random dials` card (`11b`), replace the hard inequality label `Glove pairs (≥ 55.6%)` with `Glove pairs (avg ≥ 55.6%)` — or even better, increase the burst to `10,000 pairs` (or show the exact theoretical floor `55.6% min` alongside the live sample) so random sampling almost never undercuts the headline floor — AND label the vertical reference line explicitly as `55.6% card floor` spanning both bars (or give `Entangled` its own `50%` tick clearly positioned at 50% instead of sitting unlabeled at 55.6%).
   - *How it should look:* A single labeled vertical dashed/hairline reference (`55.6% card minimum`) passing through both bars so the user immediately sees the white Glove bar hovering right on/above the line while the gold Entangled bar drops clearly below it near `50%`.

2. **[Lifts Whole-Page Clarity & Myth-Buster Clarity/Delight from 3 → ≥ 4] Show the actual Alice–Bob match percentage when Myth 1 decodes (`10b-desk`, `10b-phone`)**
   - *What & where:* In Myth 1's `After notes meet at light speed` card (`10b`), don't leave only Bob's unchanged `~50% ▲` rate above `Decoded: S (0)`.
   - *How it should look:* Once Alice's notes arrive, reveal a clear second row or transition inside each slot card showing the **Alice–Bob agreement rate** (e.g., `85% match → S (0)`, `15% match → O (1)`, `85% match → S (0)`) alongside a quiet caption (`Bob alone: 50%`). Also replace the 6 colour-only circles with `▲` / `●` glyphs (matching Step 7's accessibility standard), and change tab `1 · FTL Text` to `1 · Instant Text`.

3. **[Lifts Whole-Page Clarity & Myth-Buster Clarity from 3 → ≥ 4] Make Myth 3's captions reflect the live sampled numbers & tighten the two physics claims (`11b`, `12a`, `12b`)**
   - *What & where:* (a) On `12a` and `12b`, interpolate the actual measured percentages instead of hardcoding `~85.4%` (e.g., `"Watched live: 84.4% (near nature's 85.4% limit)"` and `"Detectors log the same score (84.4% vs 84.6%) — both near nature's 85.4% limit"`). (b) On `11b`, fix the physics overclaim to `"Gloves carry fixed local instructions. No pre-packed card like that — without talking — can match entangled pairs."` and add one 10-word sentence in `11a` explaining the left/right-glove-in-boxes metaphor. (c) On `12b`, swap `"electronic time-taggers"` for `"electronic counters"`, `"shatter 75%"` for `"beat 75%"`, and `"No human consciousness is required"` for `"No human eyes need to watch the lamps."`

4. **[Lifts Myth-Buster Ease from 3 → ≥ 4 & boosts phone Beauty] Fix phone 3D floating-badge collisions and clipped elements (`04`, `05`, `07`, `08`, `09`, `10a`, `11b`, `12a/b` phone)**
   - *What & where:*
     - **`05-phone` & `09-phone`**: Move the `75% PLAN LIMIT` pill *above* the top of the glass wall (matching desktop) so it never covers the glowing bar pressing into the glass.
     - **`07-phone`, `12a-phone`, `12b-phone`**: Offset the `75% PLAN LIMIT` badge slightly left (or below the bar) and `85.4% QUANTUM LIMIT` slightly right so the `85.4%` stem never pierces the `75%` pill.
     - **`04-phone`**: Shrink the `0°` / `120°` / `240°` pills and push them slightly outside the brass ring so they don't cover Alice's `N` pole or collide with `ALICE`/`BOB`.
     - **`08-phone` & `10a-phone`**: Pull the camera back ~8% (or nudge Alice's screen slightly inward) so the left brass frame of `ALICE — HIDDEN` isn't cropped at the viewport edge.
     - **`11b-phone`**: Tighten vertical padding inside the two comparison cards by ~6px (or allow comfortable sheet padding above the sticky footer) so the gold takeaway callout never clips at the bottom.

5. **[Lifts Myth-Buster Ease from 3 → ≥ 4] Remove redundant Myth-mode buttons, orphan arrow wrap, and dead story dots (`10a`–`12b`)**
   - *What & where:* (a) Hide the 9 inactive story progress dots in the top bar while in Myth-buster mode (replace with 3 subtle myth dots or nothing, since the 3 tabs already show position). (b) On `11a`, rename `Test same dials` to `Re-run matching dials` (or make it a quiet icon/link) so it doesn't compete with `Now test random dials →`. (c) On `12a`, remove the duplicate `[Human watching] [Sealed recorder]` toggle row until *after* the user clicks `Swap to sealed recorder →` (keep it on `12b` with a clear filled active state on `Sealed recorder`). (d) On `11b-desk`, shorten the CTA to `Next myth: Must someone watch? →` (or add `white-space: nowrap` on the last word + arrow) so `→` never wraps alone onto line 2.

6. **Boost Teacher-mode secondary text contrast and legibility for `1280×720` projectors (`09-teacher-mode-proj1280`)**
   - *What & where:* In Teacher mode, bump secondary card text (`Plan average max`, `"A lucky streak..."`, `Chance of luck`) to `≥ 18px` with brighter `#D6DCE8` ink, slightly brighten the frosted glass wall's edge rim and `75% PLAN LIMIT` subtitle, and cap the Teacher rail at ~`440px` on `1280px` viewports so the 3D boxes and `0`/`1` dial markings stay larger from the back row.

7. **Polish the breakthrough shatter spotlight on both phone and desktop (`06-breakthrough-shatter`)**
   - *What & where:* Keep the desktop right rail readable during the slow-motion beat (dim to ~`0.55` opacity instead of near-invisible, keeping `"The 75% glass wall just shattered!"` crisp), apply a matching ~`0.55` dim to the phone bottom sheet during the shatter beat so phone visitors get the same theatrical gasp, and keep the shard burst centered slightly higher/tighter around the glass bar so shards don't clutter Bob's `▲` lamp icon on phone.

8. **Clean up bunched particle streams at box ports (`00-first-desk`, `01-box-step-desk`)**
   - *What & where:* Space out the mote emission interval / fade motes smoothly as they enter the brass intake ports so 2–3 gold discs never clump into a figure-eight or caterpillar blob right outside Alice's and Bob's ports.

---

`SCORES clarity=3 ease=4 beauty=4 smooth=4 delight=4`
