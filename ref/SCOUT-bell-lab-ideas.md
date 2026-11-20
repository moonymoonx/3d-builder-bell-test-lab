# Interactive 3D Bell-Test & Entanglement Lab — Audience & Concept Scout

**Date:** 2026-11-21  
**Project Baseline:** Single-page interactive 3D web lab (Three.js, one HTML file, procedural geometry in code, no downloaded assets, real quantum math & experimental data) featuring a 3D Stern-Gerlach / optical bench with Alice & Bob analyzers, live coincidence + CHSH $S$ meter, and a Quantum Singlet vs. Local Hidden Variables toggle.  
**Verification Note (spot-checked 2026-11-21 after Gemini's scout):**
- ArXiv abs pages: all cited IDs returned HTTP 200 with matching titles, including 2026 papers 2610.29834, 2602.14601, and the 22 Sep 2026 v3 revision of 2405.20923.
- Nobel Prize, Perimeter, PhET, QuVis, Fun with Quantum, IBM Quantum Docs, Stanford Encyclopedia, Wikipedia, and lab.quantumflytrap.com: HTTP 200.
- YouTube IDs verified via oEmbed: `068rdc75mHM` = PBS NOVA *Einstein's Quantum Riddle*; `zcqZHYo7ONs` = minutephysics *Bell's Theorem: The Quantum Venn Diagram Paradox*; `jzvkhypE2jI` = Artur Ekert, *Bell inequalities: From Curiosity to Security* (Donostia International Physics Center).
- Physics Stack Exchange: curl from this host returns Cloudflare 403; question IDs were confirmed via the Stack Exchange API and/or web search (114218, 48383, 574214, 119578, 288377, 100864). Re-checked view counts: 114218 = 41,067 (score 35); 48383 = 8,850 (score 12); 119578 = 1,494; 288377 = 988. View/score figures for 574214 and 100864 were not re-checked after the API throttled; both threads exist with titles matching the claims.
- Harvard SEAS event page: curl from this host returned 403; the event is real (Quantum meets K-12, 24 Oct 2026, National Q-12 Education Partnership talk by Emily Edwards), confirmed via web search.
- Exact Google search volumes and YouTube view counts: left *unverifiable*, as Gemini marked them. Reddit was excluded by Gemini after HTTP 403.

---

## Part 1: Largest Realistic Audiences & Evidence of Need

### (A) General Curious Public (No Physics Background — Documentary, Sci-Fi & Pop-Science Watchers)
- **Why this is the largest top-of-funnel audience:** The 2022 Nobel Prize in Physics (Alain Aspect, John F. Clauser, Anton Zeilinger) put Bell inequalities and entanglement on global newsstands, backed by major public explainers from Nobel Prize Outreach, PBS NOVA's full-length documentary *Einstein's Quantum Riddle*, and MinutePhysics's *The Quantum Venn Diagram Paradox*. (Exact global search volumes and YouTube view counts: *unverifiable* via automated fetch.)
- **Core pain points:** Pop-science metaphors ("two gloves/balls in boxes", "spooky instant signaling", sci-fi ansible communicators, and New Age "consciousness collapses the wavefunction" myths) leave curious viewers stuck on two questions: *why isn't entanglement just pre-determined hidden instructions?* and *why can't we use it to text faster than light?*
- **Evidence:**
  - Nobel Prize 2022 official popular-science background explaining why Bell inequalities separate pre-determined "white/black balls" from true entanglement:
https://www.nobelprize.org/prizes/physics/2022/popular-information/
  - PBS NOVA full documentary *Einstein's Quantum Riddle* introducing Bell tests and cosmic-quasar experiments to general TV/web audiences:
https://www.youtube.com/watch?v=068rdc75mHM
  - MinutePhysics explainer *Bell's Theorem: The Quantum Venn Diagram Paradox* tackling Bell's inequality visually for non-specialists:
https://www.youtube.com/watch?v=zcqZHYo7ONs
  - Physics Stack Exchange — 41,067 views (score 35) asking for a "for dummies" intuition after Wikipedia left Bell's theorem opaque:
https://physics.stackexchange.com/questions/114218/bells-theorem-for-dummies-how-does-it-work
  - Physics Stack Exchange — 8,850 views (score 12) asking about the supposed link between quantum physics and consciousness, and 5,556 views (score 30) asking whether entanglement enables FTL coordination:
https://physics.stackexchange.com/questions/48383/connection-between-quantum-physics-and-consciousness
https://physics.stackexchange.com/questions/574214/can-quantum-entanglement-be-used-to-coordinate-actions-at-ftl-speeds-without-b

### (B) High-School Students (Grades 10–12, AP/IB Physics & CS Clubs)
- **Scale & momentum:** National and international K–12 quantum education initiatives (such as the US National Q-12 Education Partnership and Perimeter Institute's free high-school modules) are actively pushing "qubit-first" quantum concepts—polarization, superposition, entanglement, and Bell games—into secondary classrooms. (Exact total K–12 student headcount reached: *unverifiable*.)
- **Core pain points:** Standard Bell derivations require linear algebra and inner products beyond high school, yet teens immediately grasp cooperative games (75% vs. 85.4%), simple switching rules, and hands-on visual tests.
- **Evidence:**
  - Oct 2026 physics education paper demonstrating a secondary-school "qubit-first" curriculum culminating in polarization Bell tests:
https://arxiv.org/abs/2610.29834
  - Oct 2025 (revised Dec 2025) education paper introducing interactive electronic dice specifically because entanglement is too microscopic and abstract for students to visualize:
https://arxiv.org/abs/2510.04931
  - Harvard SEAS overview of the National Q-12 Education Partnership lowering barriers to K–12 quantum information learning:
https://events.seas.harvard.edu/event/quantum-meets-k-12-connecting-students-with-21st-century-physics-topics-and-applications  *(curl from this host: 403; event confirmed via search)*

### (C) University Students (Physics, Quantum Computing, CS & Engineering Undergrads)
- **Scale & momentum:** Entanglement and CHSH inequality violations have become standard components of both upper-division physics labs (popularized by Dehlinger & Mitchell's benchtop SPDC setup and updated in 2024 lab curricula) and introductory quantum-computing tracks (e.g., IBM Qiskit tutorials).
- **Core pain points:** Students can grind through matrix algebra or run a Qiskit notebook yet still struggle to explain *why* the classical CHSH game caps at 75%, *how* $\cos^2(\pi/8)$ emerges geometrically, how finite-sample noise affects $S \pm \sigma$, and what experimental loopholes actually break.
- **Evidence:**
  - Jul 2024 paper (*Undergraduate setup for measuring the Bell inequalities and performing Quantum State Tomography*) noting rapidly growing student demand in quantum technologies despite persistent conceptual hurdles:
https://arxiv.org/abs/2407.11570
  - Dehlinger & Mitchell (2002) classic *American Journal of Physics* undergraduate CHSH lab (typical afternoon measurement $S = 2.307 \pm 0.035$):
https://arxiv.org/abs/quant-ph/0205171
  - IBM Quantum Documentation CHSH tutorial used by quantum-computing learners:
https://quantum.cloud.ibm.com/docs/en/tutorials/chsh-inequality
  - Physics Stack Exchange — 1,494 views asking why the classical CHSH game cannot reach 100%, and 988 views asking how a Bell state yields $\cos(\pi/8)$ probabilities:
https://physics.stackexchange.com/questions/119578/why-isnt-the-best-case-classical-solution-to-the-chsh-game-100
https://physics.stackexchange.com/questions/288377/how-does-using-a-bell-state-lead-to-a-cos-left-frac18-pi-right-probab

### (D) High-School & AP/IB Teachers
- **Scale & demand:** Teachers are hungry for free, zero-install, classroom-ready quantum visualizers—Perimeter Institute reports that its Grade 11/12 quantum classroom resource (*Beyond Bohr*) was one of its **top five downloaded teacher resources for 2024**.
- **Core pain points & simulator gap:** Physical SPDC entangled-photon kits cost thousands of dollars and require dark-room alignment. Meanwhile, **PhET's HTML5 *Quantum Measurement* simulation only covers single 2-level systems** (quantum coins, spin-1/2, Bloch sphere) and does *not* include two-particle entanglement or a Bell test. Teachers need a projector-friendly demo mode plus structured student inquiry tasks.
- **Evidence:**
  - Perimeter Institute news confirming strong 2024 teacher download demand for Grade 11/12 quantum classroom resources:
https://perimeterinstitute.ca/news/perimeters-educational-resources-bring-quantum-science-life
  - Perimeter Institute free customizable high-school quantum lesson compilations:
https://resources.perimeterinstitute.ca/products/the-challenge-of-quantum-reality
https://resources.perimeterinstitute.ca/products/quantum-technology
  - PhET *Quantum Measurement* page confirming it focuses on single 2-level systems rather than Bell tests or two-particle entanglement:
https://phet.colorado.edu/en/simulations/quantum-measurement

### (E) University Professors & Lecturers
- **Scale & need:** Physics, philosophy of science, and quantum-information lecturers routinely teach EPR, Bell/CHSH, the 2022 Nobel experiments, experimental loopholes, and Ekert E91 cryptography—and increasingly seek live browser visualizers to break student misconceptions documented in PER reviews.
- **Simulator gap:** Existing tools are either **2D schematics** (University of St Andrews QuVis HTML5 *Hidden Variables*, Quantum Flytrap 2D drag-and-drop optical table) or **code-only notebooks** (IBM Qiskit), leaving a wide gap for a single-page **3D** interactive bench that connects 3D analyzer geometry, spacetime light-cones, loophole sabotage, and exportable statistical data.
- **Evidence:**
  - Sep 2026 revised PER review (*Addressing misconceptions in university physics: A review and experiences from quantum physics educators*, Majidy) documenting stubborn quantum misconceptions and educator demand for interactive "misconception-trap" tools:
https://arxiv.org/abs/2405.20923
  - QuVis (University of St Andrews) 2D HTML5 Hidden Variables simulation and project overview:
https://www.st-andrews.ac.uk/physics/quvis/
https://www.st-andrews.ac.uk/physics/quvis/simulations_html5/sims/quantum-versus-hv1/quantum-versus-hv1.html
  - Virtual Lab by Quantum Flytrap (2022), a 2D drag-and-drop optical table supporting up to three entangled photons:
https://arxiv.org/abs/2203.13300

---

## Part 2: 7 Ranked Concepts for HOW the 3D Bell Lab Page Could Work

*(All 7 concepts are framings, modes, or interactive mechanics inside the **same** single-page 3D Bell-Test & Entanglement Lab, reusing one procedural Three.js apparatus.)*

### Rank 1: The CHSH Cooperative Game Mode ("Beat the 75% Classical Wall")
- **(1) Concept:** Frame Bell's inequality as the two-player cooperative CHSH game—Alice and Bob must output matching bits unless both receive `1`—letting visitors try to beat the 75% classical win-rate cap with custom hidden-variable "cheat sheets" before unlocking ~85.4% with entanglement.
- **(2) Audiences Served:** **(A) General Public**, **(B) High-School Students**, **(C) University Students**, **(D) Teachers**. Replaces intimidating correlator algebra ($|E(a,b)+E(a,b')+E(a',b)-E(a',b')|\le 2$) with a 15-second game rule anyone understands, while mapping 1-to-1 to the exact CHSH bound ($P_{\text{win}} = \frac{1}{2} + \frac{S}{8}$).
- **(3) What the 3D Page Does & Wow Moment:** The 3D bench renders two soundproof glass booths (Alice & Bob) with a central Referee pulsing `0`/`1` question beams; before switching on quantum pairs, visitors build or edit a classical "Hidden-Variable Playbook" (lookup table of pre-shared instructions carried inside each particle) and fire 500 rapid rounds. A glowing 3D scoreboard wall marks the **75.0% Classical Ceiling** and **85.36% Quantum Tsirelson Bound**. **Wow moment:** No matter how cleverly a visitor edits the classical playbook, the live 3D win-rate bar slams into the 75% glass ceiling and refuses to budge—until they flip the source to **Entangled Bell Pair**, tilt the 3D analyzers to $\pi/8$ increments, and watch the bar shatter straight through 75% and lock onto ~85.4%.
  - *Classroom mode:* **Teacher Demo Mode** hides the quantum toggle initially, puts the 4-case rule table in large projector font, and lets a class vote on a classical strategy to try to beat 75% together.
- **(4) Sources:**
  - Cleve, Høyer, Toner & Watrous (2004) foundational nonlocal-games paper establishing classical vs. quantum win bounds for cooperative games:
https://arxiv.org/abs/quant-ph/0404076
  - *Fun with Quantum* browser CHSH game highlighting the 75% vs. 85.4% framing for learners and teachers alongside the 2022 Nobel Prize:
https://fun-with-quantum.org/play/chsh-game/
  - Dec 2025 arXiv paper (*The CHSH Game, Tsirelson's Bound, and Causal Locality*) underscoring enduring pedagogical and foundational focus on the CHSH game framing:
https://arxiv.org/abs/2512.18105
- **(5) Effort:** **M**

---

### Rank 2: Pop-Science & Sci-Fi Myth-Buster Challenges ("Try to Text Faster Than Light")
- **(1) Concept:** Three bite-sized interactive "Break Physics" challenges built onto the 3D bench that let visitors personally test—and falsify—the three biggest documentary/sci-fi myths: FTL signaling, "gloves in a box," and "consciousness collapses the wavefunction."
- **(2) Audiences Served:** **(A) General Curious Public**, **(B) High-School Students**, **(D) Teachers**. Directly targets the exact misconceptions people bring from YouTube, movies, and pop-science articles (matching PER's "misconception-trap" pedagogy).
- **(3) What the 3D Page Does & Wow Moment:** Visitors pick one of three interactive challenge tabs on the 3D apparatus: (i) **Build an FTL Telegraph**—Alice rapidly flips her analyzer angle or switches measurement on/off to tap out an SOS bitstring while watching Bob's live detector monitor; (ii) **X-Ray the Gloves**—switch on "classical hidden arrows" inside the flying photons and watch them pass matching angles perfectly yet fail the tilted Bell angles; (iii) **Unplug the Human**—toggle between a human observer icon and a sealed dark-box datalogger to see identical interference/correlation statistics, proving detectors—not minds—produce outcomes. **Wow moment:** In the FTL Telegraph challenge, Alice frantically rotates her polarizer to send `11110000`, yet Bob's local display stubbornly churns out 50/50 white noise—only when a **light-speed classical radio pulse** arrives from Alice does the hidden correlation mask align and reveal the pattern, making the No-Signaling Theorem click instantly.
  - *Classroom mode:* **Misconception-Check Mode** prompts students to predict what Bob's screen will show *before* pressing "Send SOS."
- **(4) Sources:**
  - Physics Stack Exchange — 3,876 views (score 27) asking whether changing measurement basis on one half of an entangled pair can send FTL messages:
https://physics.stackexchange.com/questions/100864/the-choice-of-measurement-basis-on-one-half-of-an-entangled-state-affects-the-ot
  - Physics Stack Exchange — 8,850 views (score 12) examining the pop-science myth connecting quantum mechanics and human consciousness:
https://physics.stackexchange.com/questions/48383/connection-between-quantum-physics-and-consciousness
  - Sep 2026 revised PER review (Majidy) advocating misconception-eliciting activities ("misconception-trap quizzes") in quantum instruction:
https://arxiv.org/abs/2405.20923
- **(5) Effort:** **S**

---

### Rank 3: The 2022 Nobel Prize Time-Machine (Clauser 1972 → Aspect 1982 → Zeilinger 1998/2015)
- **(1) Concept:** A chronological 3D apparatus morpher that transforms the optical bench across the actual Nobel-winning milestone experiments—showing procedurally what each laureate added to close the previous generation's weakness.
- **(2) Audiences Served:** **(A) General Public**, **(B) High-School Students**, **(C) University Students**, **(E) Professors / Lecturers**. Anchors abstract equations to a gripping 50-year human detective story celebrated by the 2022 Nobel Prize.
- **(3) What the 3D Page Does & Wow Moment:** A timeline scrubber at the bottom smoothly morphs the 3D procedural geometry between four historic eras with real published parameters: **1972 Clauser–Freedman** (calcium atomic cascade + fixed polarizers), **1982 Aspect** (ultrasonic acousto-optic switches flipping paths every ~10 ns mid-flight), **1998/2015 Zeilinger** (SPDC crystal + 400 m fiber + fast electro-optic randomizers / high-efficiency detectors), and **2015 Hensen (Delft)** (1.3 km separated NV-center diamonds with herald entanglement swapping). Translucent expanding **3D spacetime light-cone rings** radiate from each switching event. **Wow moment:** Scrubbing from 1972 to 1982 and watching the glowing light-cone from Alice's mid-flight switch fail to reach Bob's detector before Bob's photon clicks—visually proving *why* Alain Aspect won the Nobel Prize.
  - *Classroom mode:* **Lecture Storyboard Mode** binds keys `1`–`4` to clean, uncluttered camera angles with minimal HUD for professors lecturing live on a projector.
- **(4) Sources:**
  - Nobel Prize in Physics 2022 official press release summarizing Aspect, Clauser, and Zeilinger's milestones:
https://www.nobelprize.org/prizes/physics/2022/press-release/
  - Feb 2026 review paper (*The road of quantum entanglement: from Einstein to 2022 Nobel Prize in Physics*) tracing the historical progression of Bell experiments:
https://arxiv.org/abs/2602.14601
  - Hensen et al. (2015) landmark 1.3 km loophole-free Bell test using entangled electron spins in diamond:
https://arxiv.org/abs/1508.05949
- **(5) Effort:** **M**

---

### Rank 4: Loophole Saboteur Mode (Locality, Detection $\eta$, & Cosmic Quasar Freedom-of-Choice)
- **(1) Concept:** Flip the script and let the visitor play a clever local-realist skeptic trying to *cheat* the Bell test and fake $S > 2$ using purely classical particles by exploiting the three famous experimental loopholes—until the lab slams each loophole shut.
- **(2) Audiences Served:** **(C) University Students**, **(E) Professors / Lecturers**, **(A) Curious Public**, **(B) Advanced High-School Students**. Explains *why* physicists spent 43 years after Clauser (1972 → 2015/2018) building 1.3 km links, >83% superconducting detectors, and quasar-triggered switches.
- **(3) What the 3D Page Does & Wow Moment:** Three interactive "Sabotage Sliders" appear alongside the **Classical Hidden-Variable** source: (i) **Shrink Distance / Slow Switches (Locality Loophole)**—classical signaling arcs visibly race across the bench before measurement finishes; (ii) **Lower Detector Efficiency $\eta$ (Detection / Fair-Sampling Loophole)**—below the ~82.8% CHSH efficiency threshold, classical particles strategically "refuse to click" on unfavorable angles, letting a 100% classical model fake $S = 2.6+$ until the user turns on "Count Missed Clicks as `0`"; (iii) **Cosmic Quasar Switch (Freedom-of-Choice Loophole)**—zooms the 3D camera out to show two ancient light beams from opposite high-redshift quasars randomly steering Alice and Bob's polarizers (modeled on the 2018 Rauch/Zeilinger Cosmic Bell Test). **Wow moment:** Watching a purely classical hidden-variable model *cheat* its way to $S = 2.75$ at 70% detector efficiency—then dragging the efficiency slider past **82.8%** and watching the fake violation collapse abruptly back under 2.0!
  - *Classroom mode:* **Skeptic Challenge Worksheet** asks university students to find the exact critical efficiency $\eta$ where their classical cheat stops working and compare with the Eberhard/CHSH theoretical threshold.
- **(4) Sources:**
  - Rauch et al. / Zeilinger & Kaiser (2018) *Cosmic Bell Test using Random Measurement Settings from High-Redshift Quasars*:
https://arxiv.org/abs/1808.05966
  - Hensen et al. (2015 & 2016) loophole-free Bell tests simultaneously closing locality and detection loopholes:
https://arxiv.org/abs/1508.05949
https://arxiv.org/abs/1603.05705
  - Stanford Encyclopedia of Philosophy entry on Bell's Theorem detailing the locality, detection, and measurement-independence loopholes:
https://plato.stanford.edu/entries/bell-theorem/
- **(5) Effort:** **L**

---

### Rank 5: Mermin's 3-Switch Mystery Box Mode (Zero-Math On-Ramp)
- **(1) Concept:** Start with N. David Mermin's famous 3-setting red/green light boxes ($0^\circ, 120^\circ, 240^\circ$) so complete beginners prove Bell's theorem with 5th-grade counting ($5/9 \approx 55.6\%$ vs. $50\%$) before ever seeing a polarizer or equation—then "peel open" the boxes to reveal the 3D quantum bench underneath.
- **(2) Audiences Served:** **(A) General Public**, **(B) High-School Students**, **(D) Teachers**. Mermin's 3-switch device is widely regarded as the cleanest zero-trigonometry proof of Bell's theorem ever written.
- **(3) What the 3D Page Does & Wow Moment:** Alice and Bob's stations first appear as sleek matte-black 3D cubes with a physical `1 / 2 / 3` rotary dial and big Red/Green dome lamps. Same-dial shots always flash identical colors (100% correlated), while random-dial shots flash identical colors only **50%** of the time. Visitors open an "Instruction Card Designer" (`RRR`, `RRG`, `RGR`, etc.) to load pre-printed instruction sets into the central source and discover by hand that every mixed card (`RRG`) matches 5 out of 9 dial combos (**55.6%**) and uniform cards (`RRR`) match 100%—making 50% mathematically impossible. **Wow moment:** Clicking **"Peel Off Casing"** smoothly dissolves the black mystery cubes into transparent wireframes, revealing the 3D Stern-Gerlach magnets rotated by $120^\circ$ inside and seamlessly transitioning the visitor into the full CHSH angle explorer.
  - *Classroom mode:* **5-Minute Bell-Ringer Activity** lets high-school students compete to build an instruction-card deck that gets closest to 50% (everyone hits the 55.6% brick wall).
- **(4) Sources:**
  - Wikipedia overview of Mermin's 3-switch device and the $5/9$ vs. $1/2$ counting proof:
https://en.wikipedia.org/wiki/Mermin%27s_device
  - Stanford Encyclopedia of Philosophy entry on Bell's Theorem citing Mermin's pedagogical formulation of Bell locality:
https://plato.stanford.edu/entries/bell-theorem/
  - Oct 2026 secondary-school PER paper (*A qubit-first learning path to Bell's inequalities*) validating conceptual-first paths to Bell violations before heavy formalism:
https://arxiv.org/abs/2610.29834
- **(5) Effort:** **S**

---

### Rank 6: Ekert E91 Quantum Cryptography & "Catch Eve the Eavesdropper" Mode
- **(1) Concept:** Turn CHSH $S$ from an abstract philosophy score into a real-time cybersecurity alarm by letting visitors run Artur Ekert's 1991 entangled-key protocol and drop an eavesdropper ("Eve") onto the 3D optical channel.
- **(2) Audiences Served:** **(C) University Students (Physics + CS)**, **(B) High-School STEM/CS Students**, **(A) Tech-Curious Public**, **(E) Professors**. Directly answers *"Okay, cool—but what is Bell's inequality actually GOOD for?"*
- **(3) What the 3D Page Does & Wow Moment:** A live binary **Secret Key Strip** fills up whenever Alice and Bob randomly pick matching angles, while mismatched angles continuously feed the 3D CHSH $S$-meter (glowing green at $S \approx 2.82$, **"QUANTUM SECURE"**). Visitors click **"Deploy Eve (Intercept-Resend)"**—a 3D eavesdropper prism + clone-detector drops onto the fiber mid-path, reading photons and re-emitting replacements. Eve's stolen key bits appear in a hacker terminal, *but* her measurements destroy entanglement, causing the live $S$-meter to plummet from $2.82$ down toward $\le 2.0$ (with a slider for partial-intercept fraction so students see the trade-off between Eve's knowledge and Bell violation!). **Wow moment:** Flipping Eve on and watching the 3D beam lose its entangled shimmer while the CHSH security gauge crashes across the $S = 2.0$ red line and locks the key vault with **"EAVESDROPPER DETECTED—ABORT KEY."**
  - *Classroom mode:* **CS/Physics Lab Challenge** asks students to hide Eve by intercepting only $p\%$ of photons and observe how many pairs Alice & Bob need to catch her reliably.
- **(4) Sources:**
  - Experimental demonstration of the Ekert E91 QKD protocol using CHSH violation to certify channel security:
https://arxiv.org/abs/1501.05686
  - Artur Ekert lecture (Donostia International Physics Center): *Bell inequalities: From Curiosity to Security*:
https://www.youtube.com/watch?v=jzvkhypE2jI
  - Overview of the E91 protocol showing how matching bases generate the key while mismatched bases test the CHSH inequality for eavesdropping:
https://en.wikipedia.org/wiki/Quantum_key_distribution#E91_protocol:_Artur_Ekert_(1991)
- **(5) Effort:** **M**

---

### Rank 7: Live Statistical Significance, Finite-Sample Noise & Martingale Betting Mode
- **(1) Concept:** Simulate genuine shot-by-shot photon statistics, realistic lab imperfections (visibility, dark counts), live confidence bars ($S \pm \sigma$), and a round-by-round **Martingale Betting Bankroll** that converts accumulating clicks into a rigorous finite-sample $p$-value against local realism.
- **(2) Audiences Served:** **(C) University Students (especially advanced undergrad lab courses)**, **(E) Professors / Lecturers**, **(D) AP/IB Physics & Statistics Teachers**. Solves a major conceptual blind spot: beginners think a single trial "violates Bell's inequality," while lab students need to understand statistical uncertainty, optional stopping, and why real undergrad rigs measure $S \approx 2.31 \pm 0.04$ rather than $2.828$.
- **(3) What the 3D Page Does & Wow Moment:** Instead of hard-coding analytic curves, the bench runs true Monte Carlo photon emissions with speed controls (`1x` single-click to `500x` burst), adjustable **Entanglement Visibility** and **Dark-Count Noise**, a live scrolling $S(N)$ convergence ribbon with $\pm 1\sigma / \pm 3\sigma$ bands, and a **Skeptic's Bankroll Gauge** (starting at \$1.00; using a Prediction-Based-Ratio / martingale bet against local realism, Ville's inequality guarantees $p \le 1 / \text{Bankroll}$). **Wow moment:** Running a **Classical Hidden-Variable** bench for just $N = 15$ trials and watching a lucky statistical fluctuation briefly pop *above* $S = 2.0$ (teaching why small samples fool you!)—then switching to **Quantum** and watching the betting bankroll compound exponentially past $\$1{,}000 \to \$10^6$ ($p < 10^{-6}$) as the error band pulls cleanly away from 2.0.
  - *Classroom mode:* **Student Lab Worksheet Mode** mimics a real SPDC bench (like Dehlinger & Mitchell's 16 angle-pair table), injects realistic Poisson noise + visibility tuning, and offers a one-click **Export Trials CSV** button so students can compute $S$, $\sigma_S$, and $p$-values in Excel/Python for lab credit.
- **(4) Sources:**
  - Zhang, Glancy & Knill (2011) introducing Prediction-Based-Ratio (PBR) martingale/betting $p$-values for rigorous finite-sample rejection of local realism:
https://arxiv.org/abs/1108.2468
  - Elkouss & Wehner (2015/2016) (*Nearly optimal P-values for all Bell inequalities*) quantifying exact statistical evidence against LHV models in finite trials:
https://arxiv.org/abs/1510.07233
  - Dehlinger & Mitchell (2002) and Jul 2024 undergraduate Bell-test lab papers illustrating finite-sample CHSH uncertainty in university labs ($S = 2.307 \pm 0.035$):
https://arxiv.org/abs/quant-ph/0205171
https://arxiv.org/abs/2407.11570
- **(5) Effort:** **M**

---

## Part 3: How These Fit Into ONE Single-Page Three.js Build

Rather than seven separate apps, all seven concepts work cleanly as **mode tabs layered onto the same procedural 3D optical/Stern-Gerlach bench** (reusing one source, two rotatable analyzer rigs, photon beam shaders, and a collapsible right-hand readout):

1. **Default Landing (Zero-Friction Hook):** Opens straight into **Mermin 3-Switch / CHSH Game** (Ranks 1 & 5) so general visitors and high-schoolers feel the 75% / 55.6% classical brick wall within 30 seconds—then "Peel Off Casing" reveals the full 3D analyzers.
2. **Explore Ribbon Tabs:** `CHSH Game` | `Myth-Buster (FTL)` | `2022 Nobel` | `Loopholes & Quasars` | `Catch Eve (E91)` | `Stats & Lab CSV`.
3. **Top-Right Classroom Toggle:** Switches between **Self-Guided**, **Teacher Projector Demo** (large fonts, chapter hotkeys, hidden quantum toggle until class votes), and **Student Lab Worksheet** (realistic Poisson noise, 16-angle CHSH table, one-click CSV export).

---

## Part 4: Existing Simulators & Explainers the Page Would Need to Beat

These are the live tools and explainers Gemini opened and used as the comparison set. All links below were re-checked (HTTP 200 unless noted).

- **Fun with Quantum — The CHSH Game** — https://fun-with-quantum.org/play/chsh-game/ — A clear browser game using the 75% classical vs ~85.4% quantum win-rate framing, tied to the 2022 Nobel Prize. 2D / abstract; no 3D apparatus, no editable hidden-variable playbook on a physical bench, no classroom projector or lab-CSV modes.
- **PhET *Quantum Measurement*** — https://phet.colorado.edu/en/simulations/quantum-measurement — Polished HTML5 sim for single two-level systems (quantum coins, spin-1/2, Bloch sphere). The page does not mention Bell tests, CHSH, or two-particle entanglement, so it does not cover this lab's core topic.
- **QuVis (University of St Andrews) — Hidden Variables** — https://www.st-andrews.ac.uk/physics/quvis/simulations_html5/sims/quantum-versus-hv1/quantum-versus-hv1.html (project hub: https://www.st-andrews.ac.uk/physics/quvis/) — A respected HTML5 teaching sim of quantum vs hidden-variable behaviour, but it remains a 2D schematic.
- **Virtual Lab by Quantum Flytrap** — https://lab.quantumflytrap.com/ (paper: https://arxiv.org/abs/2203.13300) — Excellent 2D drag-and-drop optical table with ready-made Bell-state, CHSH, and Ekert E91 experiments, used in university courses. Still a top-down 2D table, not a 3D analyzer/spacetime-loophole bench with a live statistical lab export.
- **IBM Quantum Documentation — CHSH inequality tutorial** — https://quantum.cloud.ibm.com/docs/en/tutorials/chsh-inequality — The standard code-first path for quantum-computing students. A notebook, not a visual apparatus a general or high-school audience can explore without writing code.
- **Perimeter Institute high-school quantum lesson compilations** — https://resources.perimeterinstitute.ca/products/the-challenge-of-quantum-reality and https://resources.perimeterinstitute.ca/products/quantum-technology — Strong free teacher resources (Perimeter also reports *Beyond Bohr* was one of its top-five downloaded teacher resources in 2024: https://perimeterinstitute.ca/news/perimeters-educational-resources-bring-quantum-science-life). These are lesson packs, not an interactive 3D Bell lab.

**Gap these leave:** a single free webpage that joins a 3D Alice–Bob bench, a cooperative CHSH / Mermin game on-ramp, documentary myth-busting, the 2022 Nobel experimental story, loophole sabotage, E91 eavesdropping, and exportable lab statistics, with a teacher-projector / student-worksheet toggle.

---

## Part 5: Recommendation for the First Slice

From Gemini's own architecture note in Part 3:

- **Build first (core of the first slice):** Rank 1, the CHSH Cooperative Game ("Beat the 75% Classical Wall"), with Rank 5, Mermin's 3-Switch Mystery Box, as the zero-math on-ramp. Land on the mystery boxes / game so a general visitor or high-school class hits the classical 75% / 55.6% wall within about 30 seconds, then "Peel Off Casing" into the 3D analyzers. Include the **Self-Guided / Teacher Projector Demo** toggle (large fonts, hidden quantum switch until the class votes) from the start.
- **Add next (small, high-leverage layer):** Rank 2, Pop-Science & Sci-Fi Myth-Buster Challenges (effort S) — the FTL telegraph, gloves/hidden-arrows, and "unplug the human" tests that serve the same public and classroom audiences.
- **Later modes on the same bench:** Rank 3, 2022 Nobel Time-Machine (lecture storyboard keys); Rank 6, Catch Eve / E91 (answers "what is this good for?"); Rank 7, live statistics, martingale p-values, and student-lab CSV export; Rank 4, Loophole Saboteur (effort L — richest, but heaviest) with the cosmic-quasar freedom-of-choice zoom-out.
