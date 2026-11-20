# RESEARCH — sourced facts (Gemini fact-checks; orchestrator verifies links)

### Q1 — Mermin's 3-switch device & colour convention
- **Verdict:** **CONFIRMED**
- **Plain-language line (21 words):** "Each box hides a magnet tilted to 0°, 120°, or 240°; opposite spins trigger matching lamp colours, so matching dials always agree."
- **Notes:** Mermin (1981, *Am. J. Phys.* 49, 940–943) and Mermin (1985, *Physics Today* 38(4), 38–47) both use a spin-½ singlet measured along coplanar Stern–Gerlach axes at 0°, 120°, and 240°. On p. 943 of the 1981 paper, Mermin explicitly states that one detector uses the opposite red/green wiring so that opposite measured spins flash the same colour (giving 100% same colour on equal settings, 25% on differing settings, and 50% overall vs. ≥ 5/9 for any instruction card).
- **Sources:**
  - https://doi.org/10.1119/1.12594 (Mermin 1981, *Am. J. Phys.* 49, 940–943)
  - https://doi.org/10.1063/1.880968 (Mermin 1985, *Physics Today* 38(4), 38–47)

### Q2 — 2022 Nobel Prize in Physics
- **Verdict:** **CONFIRMED**
- **Plain-language line (21 words):** "Proving entangled particles break nature's classical limits won Alain Aspect, John Clauser, and Anton Zeilinger the 2022 Nobel Prize in Physics."
- **Notes:** Exact citation: *"for experiments with entangled photons, establishing the violation of Bell inequalities and pioneering quantum information science"*, awarded jointly (1/3 share each) to **Alain Aspect**, **John F. Clauser**, and **Anton Zeilinger**. Saying "proving it won the 2022 Nobel Prize" is fair and accurate for Bell-inequality violation with entangled photons.
- **Sources:**
  - https://www.nobelprize.org/prizes/physics/2022/summary/
  - https://www.nobelprize.org/prizes/physics/2022/popular-information/

### Q3 — Einstein framing & "spooky action at a distance"
- **Verdict:** **CORRECTED** (softened nuance)
- **Plain-language line (20 words):** "Einstein doubted 'spooky action at a distance' and thought a particle's outcomes must be settled before the pair ever parted."
- **Notes:** In EPR (*Phys. Rev.* 47, 777–780, 1935), Einstein, Podolsky, and Rosen argued that quantum mechanics is *incomplete* (if locality holds, correlated distant outcomes must reflect pre-existing "elements of reality"), though SEP notes Einstein never embraced a specific hidden-variable mechanism. The phrase *"spukhafte Fernwirkungen"* ("spooky actions at a distance") comes from Einstein's letter to Max Born dated **3 March 1947** (*The Born–Einstein Letters*, 1971, pp. 157–158). Framing it as "outcomes settled before they parted" rather than attributing a literal instruction-card theory to Einstein is historically safer.
- **Sources:**
  - https://doi.org/10.1103/physrev.47.777 (Einstein, Podolsky, & Rosen 1935, *Phys. Rev.* 47, 777–780)
  - https://plato.stanford.edu/entries/qt-epr/ (Stanford Encyclopedia of Philosophy, *"The Einstein-Podolsky-Rosen Argument in Quantum Theory"*)

### Q4 — Photon polarization angles & experimental states
- **Verdict:** **CONFIRMED** (with experimental nuance for 2015 photon tests)
- **Plain-language line (23 words):** "Real labs often use entangled light particles instead of spins — the exact same game, just with polarizing filters turned to half the angles."
- **Notes:** For maximally entangled polarization photons $|\Phi^+\rangle = (|HH\rangle + |VV\rangle)/\sqrt{2}$, $P(\text{same}) = \cos^2(\alpha-\beta)$, so exact half-angles work with identical detector wiring: 0°/60°/120° for Mermin and Alice 0°/45°, Bob 22.5°/−22.5° (157.5°) for CHSH. Aspect et al. (1982) used this maximally entangled $|\Phi^+\rangle$-type calcium-cascade state at 22.5° increments. **Nuance for depth panel:** the 2015 loophole-free photon tests (Giustina et al. in Vienna, Shalm et al. at NIST) used **non-maximally entangled** states and skewed Eberhard-optimized angles (per Eberhard 1993) to tolerate real-world detector loss.
- **Sources:**
  - https://doi.org/10.1103/physrevlett.49.91 (Aspect, Grangier, & Roger 1982)
  - https://doi.org/10.1103/physreva.47.r747 (Eberhard 1993) and https://arxiv.org/abs/1511.03190 (Giustina et al. 2015)

### Q5 — CHSH inequality, CHSH game, and Tsirelson's bound
- **Verdict:** **CONFIRMED**
- **Plain-language line (19 words):** "Any secret plan caps out at 75%; quantum entanglement reaches 85.4% — a hard limit in nature proven by Tsirelson."
- **Notes:** All three citations verified directly via Crossref and arXiv: Clauser, Horne, Shimony, & Holt (*Phys. Rev. Lett.* 23, 880–884, 1969) give $|S| \le 2$; Cirel'son / Tsirelson (*Lett. Math. Phys.* 4, 93–100, 1980) proves the quantum maximum $2\sqrt{2}$; Cleve, Høyer, Toner, & Watrous (arXiv:quant-ph/0404076, 2004) frame CHSH as the nonlocal game with classical cap $3/4$ and quantum maximum $\cos^2(\pi/8) = (2+\sqrt{2})/4 \approx 85.36\%$.
- **Sources:**
  - https://doi.org/10.1103/physrevlett.23.880 (CHSH 1969) and https://doi.org/10.1007/bf00417500 (Tsirelson 1980)
  - https://arxiv.org/abs/quant-ph/0404076 (Cleve, Høyer, Toner, & Watrous 2004)

### Q6 — Real measured Bell results for "It's real"
- **Verdict:** **CONFIRMED** (with inequality types flagged)
- **Plain-language line (22 words):** "Real labs tested this for decades — from 1972 and Aspect's 1982 experiment to 2015 loophole-free tests — and entanglement won every time."
- **Notes:** Verified measured values and which use CHSH $S$:
  - **Freedman & Clauser (1972, *PRL* 28, 938):** **Not CHSH $S$**; used Freedman's ratio inequality $\delta \le 0$ and measured **$\delta = 0.050 \pm 0.008$** ($>6\sigma$; Nobel 2022 Scientific Background, p. 7).
  - **Aspect, Grangier, & Roger (1982, *PRL* 49, 91):** **CHSH $S$** ($|S| \le 2$); measured **$S = 2.697 \pm 0.015$** ($>40\sigma$). (The follow-up *PRL* 49, 1804 with time-varying analyzers used $-1 \le S \le 0$ and measured $S = 0.101 \pm 0.020$, $5\sigma$.)
  - **Hensen et al. / Delft (2015, *Nature* 526, 682):** **CHSH $S$** ($S \le 2$), loophole-free across 1.3 km; measured **$S = 2.42 \pm 0.20$** over 245 trials ($p = 0.039$).
  - *(Also 2015 loophole-free photon tests using CH/Eberhard inequalities, not CHSH $S$: Vienna/Giustina $p \le 3.74\times 10^{-31}$, $11.5\sigma$; NIST/Shalm $p = 5.9\times 10^{-9}$, adjusted $2.3\times 10^{-7}$.)*
- **Sources:**
  - https://www.nobelprize.org/prizes/physics/2022/advanced-information/ (Nobel 2022 Scientific Background PDF covering Freedman–Clauser 1972 & Aspect 1982)
  - https://arxiv.org/abs/1508.05949 (Hensen et al. 2015, Delft) and https://doi.org/10.1103/physrevlett.49.91 (Aspect et al. 1982)

### Q7 — Evidence meter (test supermartingale & Ville's inequality)
- **Verdict:** **CORRECTED** (exact factors required; rounded 4-digit literals break supermartingale)
- **Plain-language line (22 words):** "This shatter means less than a one-in-a-million chance any secret plan — even one adapting on the fly — reached here by luck."
- **Notes:** With **exact** likelihood-ratio factors $f_W = P_q / \frac{3}{4} = \frac{2+\sqrt{2}}{3} \approx 1.1380711875$ and $f_L = (1-P_q)/\frac{1}{4} = 2-\sqrt{2} \approx 0.5857864376$, any local strategy — deterministic, randomized, or adaptive with arbitrary memory of past rounds — still satisfies $p_t = P(\text{win}_t \mid \mathcal{F}_{t-1}) \le 3/4$ when questions $(x_t, y_t)$ are fresh and uniform. Thus $\mathbb{E}[B_t / B_{t-1} \mid \mathcal{F}_{t-1}] = f_L + p_t(f_W - f_L) \le \frac{3}{4} f_W + \frac{1}{4} f_L = 1$, making $(B_t)$ a nonnegative test supermartingale with $B_0 = 1$. By **Ville's inequality (1939)**, $P(\sup_t B_t \ge 10^k) \le 10^{-k}$ even under continuous live watching / optional stopping. **Important catch:** using the 4-decimal rounded literals `1.1381` and `0.5858` from `SPEC.md` gives $0.75(1.1381) + 0.25(0.5858) = 1.000025 > 1$, violating the supermartingale condition; code must compute from exact `P_q`. Verified numerically in `ref/scratch/verify_spec.mjs`: across 50,000 entangled runs, median crack ($10^3$) = round 193, median break ($10^6$) = round 405, 95th percentile = round 718; across 50,000 75%-card runs of 2,000 rounds, 45 cracked (0.09% ≤ 0.1%) and 0 broke (≤ $10^{-6}$).
- **Sources:**
  - https://arxiv.org/abs/0912.4269 (Shafer, Shen, Vereshchagin, & Vovk 2011, *"Test Martingales, Bayes Factors and p-Values"* — Ville 1939)
  - https://arxiv.org/abs/1108.2468 (Zhang, Glancy, & Knill 2011, PBR / memory-robust Bell analysis) and https://arxiv.org/abs/quant-ph/0110137 (Gill 2003, martingale Bell tests)

### Q8 — No-signalling theorem
- **Verdict:** **CONFIRMED**
- **Plain-language line (24 words):** "No matter what Alice does to her particle, Bob's lamp stays a pure 50/50 coin flip — so no message can cross faster than light."
- **Notes:** Ghirardi, Rimini, & Weber (*Lett. Nuovo Cimento* 27, 293–298, 1980) proved generally that local measurements on one half of an entangled state cannot alter the reduced density matrix $\rho_B = \operatorname{Tr}_A(\rho_{AB})$ or marginal probabilities of the distant partner; for the singlet, $P(b=0 \mid x,y) = 1/2$ identically for all $x,y$.
- **Sources:**
  - https://doi.org/10.1007/bf02817189 (Ghirardi, Rimini, & Weber 1980)
  - https://arxiv.org/abs/1303.2849 (Brunner et al. 2014, *Rev. Mod. Phys.* 86, 419)

### Q9 — Bell tests & entanglement-based encryption
- **Verdict:** **CONFIRMED**
- **Plain-language line (21 words):** "Because no eavesdropper can fake an 85% score with secret instructions, Bell tests power quantum encryption that flags anyone listening in."
- **Notes:** Artur Ekert (*Phys. Rev. Lett.* 67, 661–663, 1991) proposed using Bell-inequality violations on entangled pairs to certify key secrecy (E91), launching device-independent quantum key distribution (DI-QKD). The 2022 Nobel Prize popular background explicitly highlights secure quantum-encrypted communication as a direct application.
- **Sources:**
  - https://doi.org/10.1103/physrevlett.67.661 (Ekert 1991, *"Quantum cryptography based on Bell's theorem"*)
  - https://www.nobelprize.org/prizes/physics/2022/popular-information/

### Q10 — Loopholes panel (what Bell rules out vs. leaves open)
- **Verdict:** **CONFIRMED**
- **Plain-language line (22 words):** "Closing every lab loophole rules out local hidden plans, leaving only genuine quantum nonlocality — unless distant choices were secretly rigged in advance."
- **Plain 3-line summary for depth panel:**
  1. **Three loopholes labs had to shut:** *locality* (stations far apart, settings switched mid-flight so no light-speed signal can pass), *detection* (catching enough pairs so missed particles can't bias the score), and *freedom of choice* (settings independent of the source).
  2. **What loophole-free Bell violations rule out:** every **local hidden-variable** explanation — any model where particles carry pre-set local instructions and influence never outruns light.
  3. **What they do *not* rule out:** genuinely **nonlocal** hidden-variable theories (such as de Broglie–Bohm / Bohmian mechanics), or **superdeterminism** (cosmic conspiracies denying independent measurement choices), as well as standard quantum mechanics itself.
- **Sources:**
  - https://plato.stanford.edu/entries/bell-theorem/ (Stanford Encyclopedia of Philosophy, *"Bell's Theorem"*)
  - https://arxiv.org/abs/1508.05949 (Hensen et al. 2015, loophole-free Bell test)

### Q11 — `crypto.getRandomValues` randomness wording
- **Verdict:** **CONFIRMED** (do not overclaim "true quantum random")
- **Plain-language line (18 words):** "Each round draws fresh, unpredictable questions from your device's built-in cryptographic random generator — never pre-scripted, never nudged."
- **Notes:** Under the W3C Web Cryptography API and MDN documentation, `Crypto.getRandomValues()` provides **cryptographically strong pseudo-random values** generated by a user-agent PRNG seeded from a high-entropy OS source — not a hardware "true" quantum random number generator. Plain UI copy must describe it as unpredictable / cryptographic device randomness, never "true quantum randomness."
- **Sources:**
  - https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  - https://www.w3.org/TR/webcrypto/
