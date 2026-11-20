// Sourced copy & "How do we know?" depth drawers — strictly grounded in RESEARCH.md (Q1-Q11).
// Zero jargon on surface screens; maths, S-values, and primary citations live behind taps.

export const STEP_COUNT = 9; // 0..8

export const DEPTH_DRAWERS = {
  merminSame: {
    title: 'How do we know? — Same dial, same colour',
    plain: 'Each box hides a magnet tilted to 0°, 120°, or 240°; opposite spins trigger matching lamp colours, so matching dials always agree.',
    detail: 'Einstein doubted "spooky action at a distance" (letter to Max Born, 3 March 1947) and thought a particle\'s outcomes must be settled before the pair ever parted (EPR, 1935).',
    math: 'Singlet state (|↑↓⟩ − |↓↑⟩)/√2 · P(A,B) = (1 − AB cos Δ)/4 · At Δ = 0°, P(opposite spins) = cos²(0°) = 1.',
    sources: [
      'Mermin, Am. J. Phys. 49, 940 (1981) — doi:10.1119/1.12594',
      'Einstein, Podolsky, & Rosen, Phys. Rev. 47, 777 (1935) — doi:10.1103/physrev.47.777',
    ],
  },
  merminRandom: {
    title: 'How do we know? — Why random dials hit 50%',
    plain: 'When both dials match (3 of 9 pairs), the lamps always agree. When dials differ (6 of 9 pairs), quantum spins give matching lamps only 1/4 of the time.',
    detail: 'Each round draws fresh, unpredictable questions from your device\'s built-in cryptographic random generator — never pre-scripted, never nudged.',
    math: 'P(same) = (3/9)·1 + (6/9)·cos²(120°/2) = 1/3 + (2/3)·(1/4) = 1/2 (50%).',
    sources: [
      'Mermin, Physics Today 38(4), 38 (1985) — doi:10.1063/1.880968',
      'W3C Web Cryptography API / MDN Crypto.getRandomValues()',
    ],
  },
  merminCard: {
    title: 'How do we know? — Why every hidden card scores ≥ 5/9',
    plain: 'To guarantee agreement whenever both dials match, both particles must carry the same 3-colour hidden card — and every 3-colour card matches on at least 5 of the 9 dial pairs.',
    detail: 'All-same cards (▲▲▲ or ●●●) match 9/9 (100%). Any 2-and-1 card (like ▲▲●) matches on 2² + 1² = 5 of 9 pairs (55.6%). Mixing cards at random only averages ≥ 55.6%.',
    math: '8 deterministic cards → matches ∈ {9/9, 5/9}. Any convex mixture obeys P(same) ≥ 5/9 ≈ 55.56% > 50%.',
    sources: [
      'Mermin, Am. J. Phys. 49, 940 (1981) — doi:10.1119/1.12594',
    ],
  },
  peelOff: {
    title: 'How do we know? — Inside the boxes',
    plain: 'Real labs often use entangled light particles instead of spins — the exact same game, just with polarizing filters turned to half the angles.',
    detail: 'Here we show spin-½ particles passing through magnets at 0°, 120°, and 240° (with Bob\'s lamp wired opposite). Photons in (|HH⟩ + |VV⟩)/√2 use polarizers at 0°, 60°, and 120° with identical wiring.',
    math: 'Spin-½: P(opp) = cos²(Δ/2) at 0°/120°/240°. Photons: P(same) = cos²(Δα) at 0°/60°/120°.',
    sources: [
      'Mermin, Am. J. Phys. 49, 940 (1981) — doi:10.1119/1.12594',
      'Aspect, Grangier, & Roger, PRL 49, 91 (1982) — doi:10.1103/physrevlett.49.91',
    ],
  },
  chshCard: {
    title: 'How do we know? — Why no hidden card beats 75%',
    plain: 'Any hidden card caps out at 75%; quantum entanglement reaches 85.4% — a hard limit in nature proven by Tsirelson.',
    detail: 'A hidden card picks 4 answers: Alice for 0 or 1, Bob for 0 or 1. Winning all 4 cases requires 3 matches and 1 mismatch — impossible because matching 0-0, 0-1, and 1-0 forces 1-1 to match too.',
    math: 'CHSH game: win iff a ⊕ b = x · y. Summing the 4 equations mod 2 gives 0 = 1. All 16 deterministic cards win 3/4 (8 cards) or 1/4 (8 cards); shared randomness cannot exceed 3/4 (S ≤ 2).',
    sources: [
      'Clauser, Horne, Shimony, & Holt, PRL 23, 880 (1969) — doi:10.1103/physrevlett.23.880',
      'Cleve, Høyer, Toner, & Watrous (2004) — arxiv.org/abs/quant-ph/0404076',
    ],
  },
  breakthrough: {
    title: 'How do we know? — Ruling out luck & measuring S',
    plain: 'This shatter means less than a one-in-a-million chance any hidden card — even one adapting on the fly — reached here by luck.',
    detail: 'Alice measures at 0° / 90° and Bob at 45° / −45° (photons use half: 0° / 45° and 22.5° / −22.5°). Each round updates an exact betting score: ×(2+√2)/3 per win, ×(2−√2) per loss. Under any local plan, expected multiplier ≤ 1, so Ville\'s inequality guarantees P(ever ≥ 10⁶) ≤ 10⁻⁶.',
    math: 'P_win = cos²(π/8) = (2+√2)/4 ≈ 85.36% · S = E₀₀+E₀₁+E₁₀−E₁₁ = 8·P_win − 4 · Classical S ≤ 2 · Tsirelson bound S ≤ 2√2 ≈ 2.828.',
    sources: [
      'Cirel\'son / Tsirelson, Lett. Math. Phys. 4, 93 (1980) — doi:10.1007/bf00417500',
      'Shafer et al. (2011) — arxiv.org/abs/0912.4269 · Zhang, Glancy, & Knill (2011) — arxiv.org/abs/1108.2468',
    ],
  },
  noSignal: {
    title: 'How do we know? — Why no message outruns light',
    plain: 'No matter what Alice does to her particle, Bob\'s lamp stays a pure 50/50 coin flip — so no message can cross faster than light.',
    detail: 'Measuring Alice\'s particle never alters Bob\'s local probabilities. The extra correlation only shows up when Alice brings her list of questions and answers to Bob at normal (light-speed or slower) speed.',
    math: 'Reduced state ρ_B = Tr_A(|ψ⁻⟩⟨ψ⁻|) = I/2 ⇒ P(b = 0 | x, y) = 1/2 identically for all x, y.',
    sources: [
      'Ghirardi, Rimini, & Weber, Lett. Nuovo Cimento 27, 293 (1980) — doi:10.1007/bf02817189',
      'Brunner et al., Rev. Mod. Phys. 86, 419 (2014) — arxiv.org/abs/1303.2849',
    ],
  },
  realWorld: {
    title: 'How do we know? — Experiments, loopholes & myths',
    plain: 'Closing every lab loophole rules out local hidden plans, leaving only genuine quantum nonlocality — unless distant choices were secretly rigged in advance.',
    detail: '• 1972 (Freedman & Clauser, PRL 28, 938): δ = 0.050 ± 0.008 (>6σ, Freedman inequality). • 1982 (Aspect, Grangier, & Roger, PRL 49, 91): CHSH S = 2.697 ± 0.015 (>40σ). • 2015 loophole-free: Delft (Hensen et al., 1.3 km) CHSH S = 2.42 ± 0.20 (p = 0.039); Vienna (Giustina et al., non-maximally entangled photons) p ≤ 3.74×10⁻³¹ (11.5σ); NIST (Shalm et al.) p = 5.9×10⁻⁹ (adjusted 2.3×10⁻⁷).',
    math: 'What Bell rules out: all local hidden variables (once locality, detection, and freedom-of-choice loopholes are closed). Not ruled out: nonlocal hidden variables (e.g. Bohmian mechanics) or superdeterminism. Myths: not pre-packed gloves (can\'t beat 75%); no FTL texts (Bob stays 50/50); no human consciousness needed (physical detector interaction / decoherence suffices).',
    sources: [
      'Nobel Prize in Physics 2022 — nobelprize.org/prizes/physics/2022/summary/',
      'Hensen et al. (2015) — arxiv.org/abs/1508.05949 · SEP "Bell\'s Theorem" — plato.stanford.edu/entries/bell-theorem/',
      'Ekert, PRL 67, 661 (1991) — doi:10.1103/physrevlett.67.661',
    ],
  },
};
