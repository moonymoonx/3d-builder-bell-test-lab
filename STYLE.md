# STYLE — Bell Test Lab (One-Page Style Card)

**Design DNA:** Synthesized from four live references — **Apple AirPods Pro** (sculptural twin-object studio staging & serene negative space), **Bartosz Ciechanowski** (tactile translucent cutaways & physical clarity), **Nicky Case's *Evolution of Trust*** (spoiler-free *"play → hit the wall → aha!"* pacing & warm voice), and **Chrome Music Lab** (zero-instruction bottom instrument controls & one-tap inspect reveal) — tuned to SPEC's mood: **"a magic trick you may investigate."**

## 1. Audience & Feeling
- **Who:** Curious general public (NOVA / Veritasium / documentary watchers) first, then high-school classrooms (ages 15–18 + teachers on projectors).
- **Feeling:** Hushed wonder + playful *"wait, what?!"* — calm, tactile, museum-grade hardware on dark velvet. Never frantic arcade, never university CAD tool.

## 2. Palette (5 Colours — All Text Pairs WCAG AA Verified ≥ 4.5:1)
| Role | Name | Hex | Contrast Verified (WCAG 2.1) |
|---|---|---|---|
| Stage / Void | **Stage Night** | `#0D1017` | Base canvas; UI surfaces lift softly to `#161B26` (Panel Slate) and `#1F2636` (Card) |
| Primary Ink | **Warm Ivory** | `#F4EFE6` | **16.61:1** on `#0D1017`; **15.04:1** on `#161B26` (muted ink `#B8C0D0`: **9.43:1**) |
| Hero / Quantum | **Quantum Gold** | `#E6B655` | **10.14:1** (`#0D1017` ink on CTA button); **9.18:1** gold text on `#161B26`. Role: primary action, emitter core, 85.4% horizon line |
| Lamp A ("Red" / ▲) | **Warm Coral** | `#FF7A6B` | **6.77:1** on `#161B26`; **7.47:1** (`#0D1017` ink on fill). Always paired with **▲ triangle** + `C5` tone |
| Lamp B ("Green" / ●) | **Jade Mint** | `#4FD6A8` | **9.45:1** on `#161B26`; **10.44:1** (`#0D1017` ink on fill). Always paired with **● circle** + `G5` tone |

*Rule:* Colour never carries meaning alone — every lamp, card switch, and tile pairs hue + distinct geometric glyph (`▲` vs `●`) + distinct tone.

## 3. Typography (Zero External Fonts, Clear Scale + Teacher ×1.6)
- **Primary UI & Headlines:** `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif` (weights `500 / 600 / 700`; tight `-0.02em` tracking on headlines; `font-variant-numeric: tabular-nums` on all counters and percentages).
- **Depth Drawer Only (maths/citations behind taps):** `ui-monospace, "SF Mono", Menlo, Consolas, monospace`.
- **Scale (`--ts: 1`, Teacher mode `--ts: 1.6`):**
  - Hero question: `clamp(22px, 3vw, 32px) × var(--ts)` (Teacher desktop ≈ `48px`)
  - Step prompt / body: `16px × var(--ts)` (`25.6px` Teacher), max measure `42ch`, line-height `1.45`
  - Primary CTA label: `17px × var(--ts)`, weight `600`, min button height `56px`
  - Live score / tally: `34px × var(--ts)` bold `tabular-nums`
  - Quiet chrome / captions: `13px × var(--ts)` (`≥ 18px` Teacher)

## 4. Lighting & 3D Materials (Soft, Intentional, Never Default)
- **Stage & Rig:** Matte dark-slate floor (`#111520`, `roughness: 0.92`) catching a soft circular studio pool that fades cleanly into `#0D1017` exponential fog — zero gridlines, zero horizon seam. Soft warm key directional light (`#FFF4E0`, soft PCF shadow), cool slate-blue hemisphere fill (`#6B84B8` / `#141824`), and gentle rim light for Apple-style edge separation.
- **Mystery Boxes (Alice & Bob):** Rounded matte anodized-graphite shells (`#242B3A`, `roughness: 0.78`, `metalness: 0.14`), brushed-brass `1–2–3` rotary dials (`#C8A86B`, `metalness: 0.65`, `roughness: 0.34`), and frosted blown-glass lamp domes that bloom warmly from within on fire.
- **Peel-Off State:** Outer casing dissolves smoothly into a Ciechanowski translucent ghost shell (`opacity: 0.14`, thin `#F4EFE6` edge outline) exposing sculpted satin-steel Stern–Gerlach magnet poles (`#9AA5B8` with subtle brass north tip) rotating cleanly to `0° / 120° / 240°` (or `0° / 90°` & `45° / −45°`).
- **Central Source & Motes:** Brushed-brass gimbal ring cradling a softly breathing `#E6B655` core. Paired light motes (instanced warm-gold spheres + soft additive halo sprites) glide in twin arcs to the boxes; in card mode each mote visibly carries a tiny folded ivory ticket.
- **75% Glass Wall:** Translucent architectural frost slab (`#DCE8F8`, `opacity: 0.18`, crisp beveled top rail, etched `75%` hairline) standing physically across the score bar; luminous fracture lines etch across it at $B \ge 10^3$, shattering into ~30 tumbling instanced shards at $B \ge 10^6$.

## 5. Motion Personality & Reduced Motion
- **Personality:** Weighted, crisp, magnetic — *a precision optical instrument resting on dark velvet*. Steady `60 fps` (`dpr ≤ 2`).
- **Timings:** Tap feedback `≤ 90 ms` (`ease-out`); dial detent snap `220 ms` (slight 4° overshoot settle); single mote flight `420 ms` (`cubic-bezier(0.22, 1, 0.36, 1)`); casing peel `450 ms`; camera framing shifts `550 ms` ease-out; wall shatter `900 ms` (`0.28×` slow-motion beat for `450 ms`, then calm settle).
- **Reduced Motion (`prefers-reduced-motion: reduce`):** Disable camera swoops, particle shatter motion, and rapid flashing; substitute crisp `180 ms` opacity crossfades (casing crossfade, instant clean fracture → open horizon, calm numeric settle).

## 6. Sound Mood (WebAudio-Synthesised, Unlocked on First Tap, Mute Always Visible)
- **Dial click:** `14 ms` band-passed noise burst + subtle `1.8 kHz` tactile wood/brass detent tick.
- **Lamp bloom:** Soft sine+triangle marimba chime — **`C5` (523 Hz)** for Warm Coral ▲, **`G5` (784 Hz)** for Jade Mint ● (harmonious unison when matching, open fifth when differing).
- **Round tick (burst / drumroll):** Muted soft pulse that accelerates gently during the 1,000-round burst, subtly brightening in filter cutoff as evidence $\log_{10} B$ climbs.
- **Glass crack ($B \ge 10^3$):** Crisp high-passed crystalline snap (`3.2 kHz` + `4.8 kHz` resonant ping).
- **Shatter chord ($B \ge 10^6$):** Short shimmering glass scatter melting into a warm, spacious unresolved-to-resolved major-ninth swell (`D3–A3–E4–F#4`, 1.4 s soft decay) — hushed awe, never casino bells.

## 7. The Wow Moment — Beat by Beat ("Breakthrough")
1. **The Wall (tension):** Your best 75% card finishes 1,000 rounds; the glowing ivory bar presses firmly against the frosted `75%` glass wall and stops dead. Silence holds for half a beat.
2. **The Lever (agency):** The brass **Use entangled pairs** switch illuminates in Quantum Gold (in Teacher mode, only after **"The class has voted"**). One deliberate pull clicks it home; the source core shifts from ivory-ticket pulses to twin golden motes.
3. **The Drumroll & Crack (escalation):** Rounds fire smoothly, accelerating into a tactile pulse. Around round ~190 ($B \ge 10^3$), hairline cracks spiderweb across the glass with a crystalline *tink* as the bar leans past 75%.
4. **The Shatter (release):** Around round ~400 ($B \ge 10^6$, < 1-in-a-million chance of luck), time briefly slows (`0.28×`), the glass wall fractures into drifting golden-lit shards to the warm resolve chord, and the bar glides smoothly past.
5. **The Settle (wonder):** Shards fade away; a calm gold hairline illuminates at **85.4% — nature's limit**. One quiet sentence names what just happened, with **"How do we know?"** resting quietly below.

## 8. Layout & Chrome
- **Top floating bar (minimal, always visible):** `← Back` | subtle step progress dots | `Self-guided · Teacher` pill | `Sound` toggle | `Start over`.
- **Phone portrait (`390×844`):** 3D stage occupies top `56%` (two boxes cleanly framed above the fold); rounded bottom sheet (`44%`, `#161B26`) holds the one-line question, tactile switches, and bottom-centre `≥ 56 px` primary gold CTA inside thumb reach.
- **Desktop / landscape (`≥ 900px`):** Open 3D stage on the left (`65%` width) with generous breathing space; calm right rail (`360px`, `#161B26`, `28px` padding) holding the headline, one active interaction, and bottom-anchored primary CTA.

## 9. Copy Voice & Banned Surface Jargon
- **Voice:** Warm, curious, documentary-short (1–2 sentences max per step). Ask the intriguing question *before* showing any number. Never spoil the 75% vs 85.4% reveal on screen 1.
- **Banned on surface screens (permitted ONLY inside "How do we know?" taps):** *Hilbert space, singlet, ket (`|↑↓⟩`), eigenstate, density matrix, CHSH inequality, Tsirelson bound, `a ⊕ b = x · y`, local hidden variable (LHV), supermartingale, Ville's inequality, p-value, standard deviation / σ, Stern–Gerlach, fair-sampling loophole, PRNG.* Use plain words on the surface: *hidden card, paired particles, magnets, luck ruled out, nature's 85% ceiling*.

## 10. What We Explicitly Do NOT Do
- **No dashboards or physics IDEs:** Zero stacked sidebars, zero 4×4 unitary matrices, zero Dirac kets on the main stage (unlike Quantum Flytrap).
- **No formula worksheets or spoiled twists:** Zero opening algebra paragraphs, zero bare spreadsheet tables, never spoil "75% vs 85.4%" in the subtitle before the user plays (unlike fun-with-quantum).
- **No welcome modals or walls of numbers:** Never block the first 5 seconds with an "OK" dialog; never show raw multi-column statistics on the main screen.
- **No tiny labels or default three.js look:** Zero `< 13 px` text (`< 18 px` Teacher), zero `< 44 px` tap targets, zero neon wireframe grids, flat plastic shading, or harsh pure-black voids.
