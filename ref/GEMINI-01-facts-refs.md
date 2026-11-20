# Bell Test Lab — Verified Physics Facts & Reference Designs

Research & fact-check report for `/workspace/3d-builder/bell-test-lab`. All equations verified analytically and numerically; all primary papers, experimental values, and live reference sites checked directly.

---

## Part A — Physics Facts

### 1. CHSH Game Rule & Classical Bound (`3/4`)
- **Exact statement:** A referee sends Alice a uniformly random bit $x \in \{0,1\}$ and Bob a uniformly random bit $y \in \{0,1\}$. Separated so they cannot communicate during a round, Alice outputs $a \in \{0,1\}$ and Bob outputs $b \in \{0,1\}$. They win iff
  $$a \oplus b = x \land y$$
  (i.e., their answers must **match** when $(x,y) \in \{(0,0),(0,1),(1,0)\}$, and must **differ** when $(x,y) = (1,1)$).
- **Best classical win probability:** **$P_{\text{win}}^{\text{classical}} \le \frac{3}{4} = 75\%$**.
- **Why deterministic strategies suffice & shared randomness doesn't help:**
  - Any deterministic classical strategy specifies four bits $(a_0, a_1, b_0, b_1) \in \{0,1\}^4$ (16 possible tables). Winning all four cases requires simultaneously:
    $$a_0 \oplus b_0 = 0,\quad a_0 \oplus b_1 = 0,\quad a_1 \oplus b_0 = 0,\quad a_1 \oplus b_1 = 1.$$
    Summing all four equations modulo 2 gives $0 = 1$ (each variable appears twice on the left, so the LHS is identically $0$, while the RHS sums to $1$). Hence **no deterministic table can win more than 3 of the 4 equally likely pairs**, giving $P_{\text{win}} \le 3/4$ (achieved, e.g., by always answering $a_0=a_1=b_0=b_1=0$).
  - Any classical strategy using local or shared randomness (a pre-shared hidden variable $\lambda$ drawn from a distribution $p(\lambda)$) is a **convex combination** of deterministic strategies:
    $$P_{\text{win}} = \sum_{\lambda} p(\lambda)\, P_{\text{win}}(\lambda) \le \sum_{\lambda} p(\lambda)\cdot \frac{3}{4} = \frac{3}{4}.$$
    Shared randomness can only average over deterministic tables, never beat the best deterministic table.
- **Sources:**
  - Cleve, Høyer, Toner, & Watrous (2004), *"Consequences and Limits of Nonlocal Strategies"*, arXiv:quant-ph/0404076 — https://arxiv.org/abs/quant-ph/0404076
  - IBM Quantum Learning, *"CHSH game"* (Basics of Quantum Information — Entanglement in Action) — https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action/chsh-game

---

### 2. Optimal Quantum Strategy & Photon Polarization Angles
- **Exact statement:** Sharing a maximally entangled Bell state, Alice and Bob achieve an optimal win probability of
  $$P_{\text{win}}^{\text{quantum}} = \cos^2\!\left(\frac{\pi}{8}\right) = \frac{2+\sqrt{2}}{4} \approx 0.853553 \;\; (\approx 85.36\%).$$
- **Photon polarization realization:**
  - **Shared state:** $|\Phi^+\rangle = \frac{1}{\sqrt{2}}\big(|HH\rangle + |VV\rangle\big)$.
  - **Measurement rule:** Alice sets a two-channel linear polarizer to angle $\alpha$ (transmitted along $\alpha \Rightarrow a=0$; orthogonal along $\alpha+90^\circ \Rightarrow a=1$) and Bob sets his to angle $\beta$ (along $\beta \Rightarrow b=0$; along $\beta+90^\circ \Rightarrow b=1$). Because $|\Phi^+\rangle$ is rotationally invariant in the $H/V$ plane,
    $$P(a=b \mid \alpha,\beta) = \cos^2(\alpha-\beta), \qquad P(a \neq b \mid \alpha,\beta) = \sin^2(\alpha-\beta).$$
  - **Optimal angles (in degrees):**
    - **Alice:** $x=0 \Rightarrow \alpha_0 = 0^\circ$, $\;x=1 \Rightarrow \alpha_1 = 45^\circ$.
    - **Bob:** $y=0 \Rightarrow \beta_0 = 22.5^\circ$, $\;y=1 \Rightarrow \beta_1 = -22.5^\circ$ (equivalently $157.5^\circ$, since polarizer orientation is periodic mod $180^\circ$).
- **Verification of all 4 question pairs:**

  | Question $(x,y)$ | Win condition | Alice $\alpha_x$ | Bob $\beta_y$ | $\|\alpha_x - \beta_y\|$ | Win probability |
  | :--- | :--- | :---: | :---: | :---: | :--- |
  | $(0,0)$ | Same ($a=b$) | $0^\circ$ | $22.5^\circ$ | $22.5^\circ$ | $\cos^2(22.5^\circ) \approx 0.8536$ |
  | $(0,1)$ | Same ($a=b$) | $0^\circ$ | $-22.5^\circ$ | $22.5^\circ$ | $\cos^2(22.5^\circ) \approx 0.8536$ |
  | $(1,0)$ | Same ($a=b$) | $45^\circ$ | $22.5^\circ$ | $22.5^\circ$ | $\cos^2(22.5^\circ) \approx 0.8536$ |
  | $(1,1)$ | Different ($a \neq b$) | $45^\circ$ | $-22.5^\circ$ | $67.5^\circ$ | $\sin^2(67.5^\circ) = \cos^2(22.5^\circ) \approx 0.8536$ |

  Every single question pair wins with identical probability $\cos^2(22.5^\circ) = \cos^2(\pi/8) \approx 85.36\%$.
- **Sources:**
  - Cleve, Høyer, Toner, & Watrous (2004), arXiv:quant-ph/0404076 — https://arxiv.org/abs/quant-ph/0404076
  - IBM Quantum Learning, *"CHSH game"* — https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information/entanglement-in-action/chsh-game

---

### 3. Relation Between $P_{\text{win}}$ and CHSH $S$, Local Bound, and Tsirelson Bound
- **Exact statement:** Define the correlation for setting pair $(x,y)$ as $E(x,y) = P(a=b \mid x,y) - P(a \neq b \mid x,y) \in [-1,1]$, and the CHSH combination
  $$S = E(0,0) + E(0,1) + E(1,0) - E(1,1).$$
  Since $P(\text{win}\mid x,y) = \frac{1+E(x,y)}{2}$ for $(0,0),(0,1),(1,0)$ and $P(\text{win}\mid 1,1) = \frac{1-E(1,1)}{2}$, averaging over the 4 equally likely pairs yields
  $$P_{\text{win}} = \frac{1}{2} + \frac{S}{8} \quad \Longleftrightarrow \quad S = 8\,P_{\text{win}} - 4.$$
- **Bounds:**
  - **Local hidden-variable (CHSH) bound:** $|S| \le 2 \;\Longleftrightarrow\; P_{\text{win}} \le \frac{3}{4} = 75\%$.
  - **Tsirelson (quantum) bound:** $|S| \le 2\sqrt{2} \approx 2.8284 \;\Longleftrightarrow\; P_{\text{win}} \le \frac{2+\sqrt{2}}{4} \approx 85.36\%$.
- **Sources:**
  - Clauser, Horne, Shimony, & Holt (1969), *"Proposed Experiment to Test Local Hidden-Variable Theories"*, *Phys. Rev. Lett.* 23, 880–884 — https://doi.org/10.1103/physrevlett.23.880
  - Cirel'son / Tsirelson (1980), *"Quantum generalizations of Bell's inequality"*, *Lett. Math. Phys.* 4, 93–100 — https://doi.org/10.1007/bf00417500
  - Stanford Encyclopedia of Philosophy, *"Bell's Theorem"* — https://plato.stanford.edu/entries/bell-theorem/

---

### 4. No-Signaling (Marginals Always `1/2`)
- **Exact statement:** For the maximally entangled state $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|HH\rangle + |VV\rangle)$, Bob's reduced density matrix is $\rho_B = \operatorname{Tr}_A(|\Phi^+\rangle\langle\Phi^+|) = \frac{1}{2}I$. Consequently, for **any** polarizer angle $\beta$ chosen by Bob, his local outcome probabilities are strictly
  $$P(b=0 \mid x,y) = \sum_{a \in \{0,1\}} P(a,b=0 \mid x,y) = \frac{\cos^2(\alpha_x-\beta_y)}{2} + \frac{\sin^2(\alpha_x-\beta_y)}{2} = \frac{1}{2}, \qquad P(b=1 \mid x,y) = \frac{1}{2},$$
  **regardless of Alice's setting $\alpha_x$ and regardless of whether Alice measures at all** (the same holds symmetrically for Alice). Because $\sum_a P(a,b\mid x,y) = P(b\mid y)$ is completely independent of $x$, Alice cannot change Bob's local statistics to transmit any message faster than light.
- **Sources:**
  - Brunner, Cavalcanti, Pironio, Scarani, & Wehner (2014), *"Bell nonlocality"*, *Rev. Mod. Phys.* 86, 419 (arXiv:1303.2849) — https://arxiv.org/abs/1303.2849
  - Stanford Encyclopedia of Philosophy, *"Bell's Theorem"* — https://plato.stanford.edu/entries/bell-theorem/

---

### 5. Mermin's 3-Switch Mystery Device (Spin-½ and Photon Versions)
- **Exact statement (observed device behavior):** Two separated boxes each have a 3-position switch ($1, 2, 3$) and a red/green lamp ($R, G$). On each run, a central source emits a pair of particles, one to each box:
  1. **Same setting** ($(1,1), (2,2), (3,3)$): the two boxes **always** flash the **same colour** ($P(\text{same}\mid i=j) = 1$, with $R$ and $G$ each occurring $50\%$ of the time).
  2. **Random settings** (uniform over all $9$ pairs $(i,j)$): the two boxes flash the **same colour exactly $1/2$ ($50\%$) of the time** overall — which requires **same colour $1/4$ ($25\%$) of the time when settings differ**:
     $$P(\text{same}) = \frac{3}{9}\cdot 1 + \frac{6}{9}\cdot \frac{1}{4} = \frac{1}{3} + \frac{1}{6} = \frac{1}{2}.$$
- **Why any pre-set instruction set fails ($\ge 5/9$):** To guarantee identical colours whenever both dials match, both particles in a pair must carry the **same** 3-letter instruction card from $\{RRR, RRG, RGR, GRR, GGR, GRG, RGG, GGG\}$:
  - For $RRR$ or $GGG$: all $9/9 = 100\%$ of setting pairs flash the same colour.
  - For any mixed card (two of one colour, one of the other, e.g., $RRG$): $2^2 + 1^2 = 5$ of the $9$ equally likely setting pairs flash the same colour ($5/9 \approx 55.56\%$).
  - Therefore, **any** instruction card — and any random mixture of instruction cards — produces the same colour at least **$5/9 \approx 55.56\%$** of the time, contradicting the observed **$1/2 = 50\%$**.
- **Physical realizations:**
  - **Spin-½ singlet (Mermin's original 1981/1985 realization):** Spin-½ singlet state $|\Psi^-\rangle = \frac{1}{\sqrt{2}}(|\uparrow\downarrow\rangle - |\downarrow\uparrow\rangle)$ measured by coplanar Stern–Gerlach analyzers oriented at **$0^\circ, 120^\circ, 240^\circ$**, with **opposite colour conventions** on the two detectors: as Mermin (1981, p. 943) states, *"One detector flashes red or green according to whether the measured spin is along or opposite to the field; the other uses the opposite color convention. Thus when the same colors flash the measured spin components are different."* Since $P(\text{opposite spins}) = \cos^2(\Delta\theta/2)$, same setting ($\Delta\theta=0^\circ$) gives $\cos^2(0^\circ)=1$ (always same colour) and different settings ($\Delta\theta=\pm 120^\circ$) give $\cos^2(60^\circ)=1/4$ (same colour $25\%$ of the time), yielding $1/2$ overall.
  - **Polarization photons (confirmed numbers):** State $|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|HH\rangle + |VV\rangle)$ with linear polarizers at **$0^\circ, 60^\circ, 120^\circ$** and the **same colour convention** on both detectors (e.g., transmitted = Green, orthogonal = Red). Because $P(\text{same colour}) = \cos^2(\alpha_i - \alpha_j)$:
    - Same setting ($|\Delta\alpha| = 0^\circ$, 3 of 9 pairs): $\cos^2(0^\circ) = 1$.
    - Different settings ($|\Delta\alpha| = 60^\circ$ or $120^\circ$, 6 of 9 pairs): $\cos^2(60^\circ) = (1/2)^2 = 1/4$ and $\cos^2(120^\circ) = (-1/2)^2 = 1/4$.
    - Overall over all 9 equally likely pairs: $\frac{3 \times 1 + 6 \times (1/4)}{9} = \frac{4.5}{9} = \frac{1}{2} = 50\%$. **Confirmed exact.**
- **Sources:**
  - Mermin (1981), *"Bringing home the atomic world: Quantum mysteries for anybody"*, *Am. J. Phys.* 49(10), 940–943 — https://doi.org/10.1119/1.12594
  - Mermin (1985), *"Is the Moon There When Nobody Looks? Reality and the Quantum Theory"*, *Physics Today* 38(4), 38–47 — https://doi.org/10.1063/1.880968

---

### 6. Real Experiments ("This Was Tested" Note)
- **Aspect et al. (1982) — Orsay, France:**
  - *Aspect, Grangier, & Roger*, *Phys. Rev. Lett.* 49, 91 (1982): two-channel polarization analyzers with entangled calcium-cascade photons; measured CHSH **$S = 2.697 \pm 0.015$** vs. local bound $S \le 2$ (a $>40\sigma$ violation).
    - Source: https://doi.org/10.1103/physrevlett.49.91
  - *Aspect, Dalibard, & Roger*, *Phys. Rev. Lett.* 49, 1804 (1982): rapid acousto-optical switching of analyzer orientations *while photons were in flight* (first test targeting the locality loophole); tested the single-channel inequality $-1 \le S \le 0$ and measured **$S = 0.101 \pm 0.020$** ($5\sigma$ violation, agreeing with the quantum prediction $0.112$).
    - Sources: https://doi.org/10.1103/physrevlett.49.1804 and Nobel Committee 2022 Scientific Background — https://www.nobelprize.org/prizes/physics/2022/advanced-information/
- **2015 Loophole-Free Bell Tests (closing locality and detection loopholes simultaneously):**
  - **Delft (Hensen et al., *Nature* 526, 682–686, 2015):** Entangled electron spins in diamond separated by **1.3 km**; over 245 trials testing CHSH $S \le 2$, measured **$S = 2.42 \pm 0.20$**, null-hypothesis **$p = 0.039$**.
    - Sources: https://arxiv.org/abs/1508.05949 and https://doi.org/10.1038/nature15759
  - **Vienna (Giustina et al., *Phys. Rev. Lett.* 115, 250401, 2015):** Entangled photons with superconducting detectors and rapid setting generation; tested a Clauser–Horne / Eberhard-type inequality (no CHSH $S$ reported) with statistical **$p \le 3.74 \times 10^{-31}$ ($11.5\sigma$)**.
    - Sources: https://arxiv.org/abs/1511.03190 and https://doi.org/10.1103/physrevlett.115.250401
  - **NIST (Shalm et al., *Phys. Rev. Lett.* 115, 250402, 2015):** Spacelike-separated entangled photons with high-efficiency superconducting detectors and fast random generators; tested a CH/Eberhard-type inequality (no CHSH $S$ reported), achieving **$p = 5.9 \times 10^{-9}$** (smallest predictability-adjusted **$p = 2.3 \times 10^{-7}$**).
    - Sources: https://arxiv.org/abs/1511.03189 and https://doi.org/10.1103/physrevlett.115.250402
- **2022 Nobel Prize in Physics:** Awarded jointly to **Alain Aspect, John F. Clauser, and Anton Zeilinger** *"for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science."*
  - Sources: https://www.nobelprize.org/prizes/physics/2022/summary/ and https://www.nobelprize.org/prizes/physics/2022/popular-information/

---

### 7. Common Myths & Correct One-Line Answers
1. **"It's just like putting two gloves (or Bertlmann's socks) in two boxes."**
   - **One-line answer:** Pre-packed gloves obey local hidden instructions and can never beat 75% in the CHSH game (or drop below 55.6% matches in Mermin's box), whereas real entangled particles have no pre-set values and reliably beat both limits.
   - **Sources:** Bell (1981), *"Bertlmann's Socks and the Nature of Reality"* — https://doi.org/10.1051/jphyscol:1981202 ; Nobel Prize 2022 Popular Science Background — https://www.nobelprize.org/prizes/physics/2022/popular-information/
2. **"Measuring one particle sends a faster-than-light message to its twin."**
   - **One-line answer:** No message can travel faster than light, because each person's own stream of outcomes is always a pure 50/50 coin flip regardless of what the distant partner does — the correlation only appears when they later compare notes at light speed or slower.
   - **Sources:** Caltech Science Exchange, *"What Is Entanglement and Why Is It Important?"* — https://scienceexchange.caltech.edu/topics/quantum-science-explained/entanglement ; Brunner et al. (2014) — https://arxiv.org/abs/1303.2849
3. **"Human consciousness collapses the quantum state."**
   - **One-line answer:** A "measurement" needs no mind or human watcher — any physical interaction with a detector, polarizer, or surrounding environment (decoherence) produces the exact same quantum outcomes.
   - **Sources:** Caltech Science Exchange, *"What Is Quantum Physics?"* — https://scienceexchange.caltech.edu/topics/quantum-science-explained/quantum-physics ; Stanford Encyclopedia of Philosophy, *"The Role of Decoherence in Quantum Mechanics"* — https://plato.stanford.edu/entries/qm-decoherence/

---

## Part B — Reference Designs for Look & Feel

**Target audience & feeling:** Curious general public (documentary watchers) + high-school classes; **wonder + playful "wait, what?"**, calm and premium, zero technical intimidation. All four references and both existing Bell sims below were opened and visually inspected in Chromium (`1440×900`) alongside their live stylesheets.

### 1. Bartosz Ciechanowski — *Cameras and Lenses*
- **URL:** https://ciechanow.ski/cameras-and-lenses/
- **First 5 seconds:** An ultra-calm editorial header (`#2052BB` cobalt band over `#F8F8F8` soft off-white) gives way within one screen to a live, crisp 3D optical scene — matte green and red spheres on a soft checkerboard stage beside a translucent cutaway camera and its live rendered view. No popups, no controls clutter, instant physical intuition.
- **Palette / Type / Lighting / Motion:**
  - *Palette:* Warm light-neutral canvas (`#F8F8F8`), soft charcoal ink (`#444444`), one confident cobalt accent (`#2052BB`), and physical matte object colors (green `#68C626`, coral-red) that earn attention only inside the 3D scene.
  - *Type:* Single clean humanist sans (`IBM Plex Sans`), generous `44rem` reading measure, airy line-height.
  - *Lighting:* Soft studio hemisphere illumination with subtle ground contact shadows and delicate translucent cutaway planes — zero harsh specular glare or dark-mode neon.
  - *Motion:* Direct-manipulation 60fps response; every dragged parameter immediately shifts light rays and optical geometry with zero decorative wobble.
- **Concrete idea to steal:** **Translucent cutaway casing on a calm matte stage.** When the visitor taps *"Peel off casing"* on Mermin's mystery boxes, smoothly fade the opaque matte shell into a clean, Ciechanowski-style ghosted wireframe/translucent housing so the glowing polarizer disk and beam paths inside stay spatially anchored to the box they just played with.

### 2. Nicky Case — *The Evolution of Trust*
- **URL:** https://ncase.me/trust/
- **First 5 seconds:** Pure white stage (`#FFFFFF`) framed by a gentle rotating ring of expressive minimalist characters linked by faint hairline connections, centering a playful title (`THE EVOLUTION OF TRUST`), an honest *"playing time"* cue, a single primary start button, and an unmistakable `SOUND ON` toggle in the bottom corner. You immediately sense: *"this is a playful game that's going to surprise me."*
- **Palette / Type / Lighting / Motion:**
  - *Palette:* Crisp white (`#FFFFFF`), warm ink (`#333333`), dark charcoal footer (`#222222`), and sparing emotional accent colors used strictly to signal states/roles.
  - *Type:* Friendly, human display type (`FuturaHandwritten`) at large comfortable sizes (`20px+`) — feels like a witty guide talking to you, not a textbook.
  - *Lighting / Material:* Flat, ultra-legible, high-contrast silhouette readability with generous breathing room around every focal interaction.
  - *Motion & Pacing:* Micro-chapter escalation — you **play** a tiny 3-click round first, feel a surprise ("wait, why did I lose?"), and only *then* does one short sentence name the insight. Subtle procedural sound effects give every click and score change tactile satisfaction.
- **Concrete idea to steal:** **Withhold the punchline and pace by discovery ("play → hit the wall → reveal").** Never spoil *"75% classical vs 85.4% quantum"* on the landing screen; let the visitor try to beat Mermin's box or the 75% CHSH ceiling with their own playbook first, feel the brick wall, and trigger the quantum switch as a genuine *"wait, what?!"* plot twist.

### 3. Apple — *AirPods Pro 3* Product Page
- **URL:** https://www.apple.com/airpods-pro/
- **First 5 seconds:** Monumental negative space on a serene near-white studio void, showcasing **two symmetrical sculptural objects** suspended face-to-face with museum-grade softbox wrap lighting, subtle ambient occlusion, one crisp bold headline anchored low-left, a tiny unobtrusive pause toggle top-right, and a single calm pill CTA bottom-right. Immediately reads as calm, confident, and unmistakably premium.
- **Palette / Type / Lighting / Motion:**
  - *Palette:* Studio alabaster/white stage (`#FFFFFF` / `#F5F5F7`), deep obsidian type (`#1D1D1F`), a single restrained accent blue (`#0071E3`) reserved strictly for the primary action pill.
  - *Type:* Tightly tracked geometric sans (`SF Pro Display`) with dramatic hero-to-caption scale hierarchy — max 1–2 short lines per beat.
  - *Lighting:* Multi-bounce softbox studio lighting with smooth Fresnel rim highlights and zero visible gridlines, floor clutter, or harsh black shadows.
  - *Motion:* Smooth, damped ease-out camera choreography (and explicit reduced-motion/pause respect) where objects glide effortlessly from sealed exterior to exploded internal view.
- **Concrete idea to steal:** **Sculptural twin-box hero staging.** Open the Bell Test Lab on two symmetrical, tactile matte-ceramic mystery boxes floating cleanly in calm studio lighting (Alice left, Bob right, faint glowing emitter bead centered between them) with generous whitespace and a single bold interactive cue — making the first 5 seconds look like a museum hardware reveal rather than a physics applet.

### 4. Google Creative Lab — *Chrome Music Lab: Sound Waves*
- **URL:** https://musiclab.chromeexperiments.com/Sound-Waves/
- **First 5 seconds:** Zero instructions, zero paragraphs, zero modal popups. A spotless white canvas with a minimal top bar (back arrow, tracked uppercase title `SOUND WAVES`, tiny yellow `?` icon), a responsive field of crisp cyan dots that physically ripple the instant you press any oversized bottom key, and a single floating magnifying-glass button (`+`) to zoom right inside one oscillating particle.
- **Palette / Type / Lighting / Motion:**
  - *Palette:* Pure gallery white (`#FFFFFF`), charcoal hardware keys (`#333333`), a single vivid cyan (`#00B0FF`-range) for the physical wave phenomenon, and a warm amber `?` dot for optional help.
  - *Type:* Clean geometric uppercase micro-label in the header; almost the entire viewport is the interactive instrument itself.
  - *Lighting / Material:* Crisp minimalist geometry with soft Material elevation shadows only on the single interactive floating action button.
  - *Motion:* Instantaneous (<16ms) tactile cause-and-effect paired with synthesized Web Audio tone, plus a smooth one-tap zoom transition between macro behavior and single-particle mechanism.
- **Concrete idea to steal:** **Zero-instruction bottom instrument dock + one-tap "zoom/inspect" FAB.** Put giant, thumb-friendly physical controls right at the bottom (the `1 / 2 / 3` dial or `Fire 1 / Fire 100` trigger), hide all technical explanation behind a tiny quiet `?` / `Depth` icon, and give the *"Peel off casing"* / *"Inspect Alice & Bob's marginals"* reveal a single clean floating action button.

---

### What the Existing Bell Sims Get Wrong on Feel

- **Quantum Flytrap Virtual Lab (`https://lab.quantumflytrap.com/`):**
  - *Immediate sensory overload:* On load, a first-time visitor is trapped behind a generic *"Welcome to Quantum Lab — OK"* popup sitting on top of a neon deep-violet IDE crowded on all four edges: a left toolbox of 15+ cryptic optics/gate icons (`λ/4`, `CNOT`, `Variable`), an already-open *"Non-polarizing beam splitter"* modal showing a **4×4 complex unitary matrix with phase pie charts**, a top simulation transport bar, and a right sidebar displaying a *"Many-Worlds Tree"* and raw Dirac ket notation (`1.00 exp(0.00i) | 9 8 → H ⟩`).
  - *Tonal clash & zero story:* Cute cartoon sprites (a Pac-Man detector and a googly-eyed rock) collide awkwardly with a grad-school linear-algebra workbench. There is no guided first action and no answer to *"why should I care?"* — a general-public visitor or high-school student bounces in under 5 seconds.

- **Fun with Quantum — *The CHSH Game* (`https://fun-with-quantum.org/play/chsh-game/`):**
  - *Academic worksheet, not a physical wonder:* While much cleaner visually (`#f6f7fa` paper, `#0c7693` cyan, `#c22f6e` magenta, 4 numbered step pills), it plays like a static 2D homework form — bare `if x = 0, answer [0]` toggle boxes, four red/green bordered logic squares (`x = 0 · y = 0 / a = 0, b = 1 ✗`), and three dense serif paragraphs that open with the formula `a ⊕ b = x · y`.
  - *Spoils the twist & lacks visceral feel:* The subtitle immediately gives away the ending (*"75% for any classical team, 85.4% with entanglement"*) before the visitor ever tries to win; there are no physical rooms, flying photon pairs, rotatable analyzers, animation anticipation, or sound feedback; and *"The real Qiskit code — interactive Jupyter notebook"* looms right below the fold, framing the whole page as a quantum-programming class rather than a captivating human mystery.

---

## 5-Line Summary
1. **CHSH & Tsirelson math verified:** Classical local strategies (even with shared randomness) cap at $P_{\text{win}} \le 3/4$ ($S \le 2$); entangled photons $|\Phi^+\rangle = (|HH\rangle+|VV\rangle)/\sqrt{2}$ with Alice at $0^\circ, 45^\circ$ and Bob at $+22.5^\circ, -22.5^\circ$ win every question pair with $\cos^2(22.5^\circ) = (2+\sqrt{2})/4 \approx 85.36\%$ ($S = 8P_{\text{win}}-4 = 2\sqrt{2} \approx 2.828$), while Bob's marginal stays strictly $1/2$ (no-signaling).
2. **Mermin's box verified for both spins and photons:** Any pre-set instruction card yields $\ge 5/9 \approx 55.56\%$ same-colour flashes over the 9 equally likely setting pairs, whereas $|\Phi^+\rangle$ photons with polarizers at $0^\circ, 60^\circ, 120^\circ$ (same colour convention) — or spin-½ singlets at $0^\circ, 120^\circ, 240^\circ$ (opposite colour conventions) — give $100\%$ same colour on matching dials, $25\%$ on differing dials, and $50\%$ overall.
3. **Experimental milestones cited cleanly:** Aspect 1982 ($S=2.697\pm0.015$ in PRL 49, 91; time-varying $S=0.101\pm0.020$ vs. $\le 0$ in PRL 49, 1804), the 2015 loophole-free trio — Delft/Hensen ($S=2.42\pm0.20$, $p=0.039$, 1.3 km), Vienna/Giustina ($p\le 3.74\times10^{-31}$, $11.5\sigma$), NIST/Shalm ($p=5.9\times10^{-9}$, adjusted $2.3\times10^{-7}$) — and the 2022 Nobel Prize (Aspect, Clauser, Zeilinger), plus sourced one-liners debunking the gloves, FTL-messaging, and consciousness myths.
4. **Look-and-feel recipe from 4 live references:** Pair Apple's serene softbox twin-object staging and Ciechanowski's tactile translucent cutaways with Nicky Case's spoiler-free *"play → hit the wall → aha!"* pacing and Chrome Music Lab's zero-instruction bottom instrument dock + one-tap inspect toggle.
5. **Clear gap over existing Bell sims:** Quantum Flytrap overwhelms newcomers with dark-violet unitary matrices, Dirac kets, and stacked modals, while Fun with Quantum spoils the twist and feels like a static 2D formula worksheet — leaving a wide-open lane for a calm, sculptural, playful 3D experience.
