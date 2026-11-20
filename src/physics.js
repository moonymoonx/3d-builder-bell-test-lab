// Pure quantum & classical physics engine for Bell Test Lab.
// Zero DOM / Three.js dependencies; unit-tested directly under Node.

export const SQRT2 = Math.SQRT2;
export const P_CLASSICAL_MAX = 0.75;
export const P_QUANTUM_OPT = (2 + SQRT2) / 4; // cos^2(pi/8) ≈ 0.8535533906
export const S_CLASSICAL_MAX = 2;
export const S_TSIRELSON = 2 * SQRT2; // ≈ 2.8284271247

// Exact likelihood-ratio betting factors against p <= 3/4 (D11 / SPEC §4).
// E[factor | p = 3/4] = 0.75 * F_WIN + 0.25 * F_LOSS === 1 exactly.
export const EVIDENCE_F_WIN = P_QUANTUM_OPT / P_CLASSICAL_MAX; // (2 + sqrt(2)) / 3
export const EVIDENCE_F_LOSS = (1 - P_QUANTUM_OPT) / (1 - P_CLASSICAL_MAX); // 2 - sqrt(2)
export const LOG10_F_WIN = Math.log10(EVIDENCE_F_WIN);
export const LOG10_F_LOSS = Math.log10(EVIDENCE_F_LOSS);

// Thresholds for glass wall cracks (10^3) and shatter (10^6)
export const EVIDENCE_CRACK_LOG10 = 3;
export const EVIDENCE_BREAK_LOG10 = 6;

// Spin-1/2 angles (degrees)
export const MERMIN_SPIN_ANGLES = [0, 120, 240];
export const MERMIN_PHOTON_ANGLES = [0, 60, 120];
export const CHSH_ALICE_SPIN_ANGLES = [0, 90];
export const CHSH_BOB_SPIN_ANGLES = [45, -45];
export const CHSH_ALICE_PHOTON_ANGLES = [0, 45];
export const CHSH_BOB_PHOTON_ANGLES = [22.5, -22.5];

/**
 * Unbiased uniform random float in [0, 1) using Web Crypto (or Node webcrypto).
 * Never seeded, smoothed, or nudged.
 */
export function cryptoUniform() {
  const buf = new Uint32Array(1);
  globalThis.crypto.getRandomValues(buf);
  return buf[0] / 4294967296;
}

/**
 * Unbiased random integer in [0, n - 1] via rejection sampling on crypto.getRandomValues.
 */
export function cryptoInt(n) {
  if (n <= 1) return 0;
  const max = Math.floor(4294967296 / n) * n;
  const buf = new Uint32Array(1);
  while (true) {
    globalThis.crypto.getRandomValues(buf);
    if (buf[0] < max) return buf[0] % n;
  }
}

/**
 * Born-rule joint probabilities for the spin-1/2 singlet state
 *   |psi-> = (|up,down> - |down,up>) / sqrt(2)
 * measured along coplanar Stern-Gerlach axes thetaA_deg and thetaB_deg (perp to flight).
 *
 * Returns { pp, pm, mp, mm } corresponding to (A=+1,B=+1), (+1,-1), (-1,+1), (-1,-1).
 */
export function singletJointProbs(thetaA_deg, thetaB_deg) {
  const a = (thetaA_deg * Math.PI) / 180;
  const b = (thetaB_deg * Math.PI) / 180;
  // Eigenstates of sigma . n(theta) in the x-z plane:
  // |+theta> = cos(theta/2)|0> + sin(theta/2)|1>
  // |-theta> = -sin(theta/2)|0> + cos(theta/2)|1>
  const ca = Math.cos(a / 2), sa = Math.sin(a / 2);
  const cb = Math.cos(b / 2), sb = Math.sin(b / 2);
  // <A, B | psi-> = (A0 * B1 - A1 * B0) / sqrt(2)
  const ampPP = (ca * sb - sa * cb) / SQRT2;
  const ampPM = (ca * cb - sa * (-sb)) / SQRT2;
  const ampMP = (-sa * sb - ca * cb) / SQRT2;
  const ampMM = (-sa * cb - ca * (-sb)) / SQRT2;
  return {
    pp: ampPP * ampPP,
    pm: ampPM * ampPM,
    mp: ampMP * ampMP,
    mm: ampMM * ampMM,
  };
}

/**
 * Draw one spin pair { spinA: +1|-1, spinB: +1|-1 } directly from the singlet Born rule.
 */
export function sampleSinglet(thetaA_deg, thetaB_deg, rng = cryptoUniform) {
  const p = singletJointProbs(thetaA_deg, thetaB_deg);
  const u = rng();
  if (u < p.pp) return { spinA: 1, spinB: 1 };
  if (u < p.pp + p.pm) return { spinA: 1, spinB: -1 };
  if (u < p.pp + p.pm + p.mp) return { spinA: -1, spinB: 1 };
  return { spinA: -1, spinB: -1 };
}

/**
 * Mermin box lamp mapping (SPEC §4 / D7):
 *   Alice: spin +1 -> 0 (Coral ▲), spin -1 -> 1 (Jade ●)
 *   Bob (reversed wiring): spin +1 -> 1 (Jade ●), spin -1 -> 0 (Coral ▲)
 * Thus same colour <=> opposite spins!
 */
export function spinsToColors(spinA, spinB) {
  const colorA = spinA === 1 ? 0 : 1;
  const colorB = spinB === 1 ? 1 : 0;
  return { colorA, colorB, same: colorA === colorB };
}

/**
 * Exact Mermin same-colour probability for dial indices i, j in {0, 1, 2}.
 */
export function merminProbSame(dialA, dialB) {
  const p = singletJointProbs(MERMIN_SPIN_ANGLES[dialA], MERMIN_SPIN_ANGLES[dialB]);
  return p.pm + p.mp;
}

/**
 * Sample one Mermin box firing (quantum singlet).
 * dialA, dialB in {0, 1, 2}.
 */
export function sampleMerminQuantum(dialA, dialB, rng = cryptoUniform) {
  const { spinA, spinB } = sampleSinglet(MERMIN_SPIN_ANGLES[dialA], MERMIN_SPIN_ANGLES[dialB], rng);
  return { dialA, dialB, spinA, spinB, ...spinsToColors(spinA, spinB) };
}

/**
 * Evaluate a 3-entry Mermin instruction card, e.g. [0, 0, 1] (0 = Coral ▲, 1 = Jade ●).
 * Returns { matches, total: 9, rate, grid: boolean[3][3] }.
 */
export function evaluateMerminCard(card) {
  let matches = 0;
  const grid = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      const same = card[i] === card[j];
      if (same) matches++;
      row.push(same);
    }
    grid.push(row);
  }
  return { matches, total: 9, rate: matches / 9, grid };
}

/**
 * All 8 deterministic Mermin instruction cards (0/1 for dials 1,2,3).
 */
export function allMerminCards() {
  const out = [];
  for (let m = 0; m < 8; m++) {
    const card = [(m >> 2) & 1, (m >> 1) & 1, m & 1];
    out.push({ card, ...evaluateMerminCard(card) });
  }
  return out;
}

/**
 * CHSH winning rule: win iff (a XOR b) === (x AND y).
 */
export function isChshWin(x, y, a, b) {
  return (a ^ b) === (x & y);
}

/**
 * Evaluate a 4-switch classical CHSH card { a0, a1, b0, b1 } (values 0 or 1).
 * Returns { wins, rate, tiles: [{ x, y, a, b, win }] }.
 */
export function evaluateChshCard(card) {
  const { a0, a1, b0, b1 } = card;
  const tiles = [];
  let wins = 0;
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      const a = x === 0 ? a0 : a1;
      const b = y === 0 ? b0 : b1;
      const win = isChshWin(x, y, a, b);
      if (win) wins++;
      tiles.push({ x, y, a, b, win });
    }
  }
  return { wins, rate: wins / 4, tiles };
}

/**
 * All 16 deterministic CHSH classical cards.
 */
export function allChshCards() {
  const out = [];
  for (let m = 0; m < 16; m++) {
    const card = {
      a0: (m >> 3) & 1,
      a1: (m >> 2) & 1,
      b0: (m >> 1) & 1,
      b1: m & 1,
    };
    out.push({ card, ...evaluateChshCard(card) });
  }
  return out;
}

/**
 * Exact quantum CHSH win probability for question pair (x, y) using optimal spin-1/2 angles.
 * Answer 0 = up (+1) for Alice, down (-1) for Bob -> match iff opposite spins.
 */
export function chshQuantumWinProb(x, y) {
  const p = singletJointProbs(CHSH_ALICE_SPIN_ANGLES[x], CHSH_BOB_SPIN_ANGLES[y]);
  const pMatch = p.pm + p.mp;
  const pDiff = p.pp + p.mm;
  return x === 1 && y === 1 ? pDiff : pMatch;
}

/**
 * Sample one CHSH round — either classical card or entangled singlet.
 * Fresh uniform random x, y in {0, 1} unless explicitly provided.
 */
export function sampleChshRound({ mode = 'card', card = { a0: 0, a1: 0, b0: 0, b1: 0 }, x = null, y = null, rng = cryptoUniform, intRng = cryptoInt }) {
  const qx = x === null ? intRng(2) : x;
  const qy = y === null ? intRng(2) : y;
  let a, b, spinA = null, spinB = null;
  if (mode === 'entangled') {
    const draw = sampleSinglet(CHSH_ALICE_SPIN_ANGLES[qx], CHSH_BOB_SPIN_ANGLES[qy], rng);
    spinA = draw.spinA;
    spinB = draw.spinB;
    a = spinA === 1 ? 0 : 1;
    b = spinB === -1 ? 0 : 1; // Bob reversed: answer 0 = spin down (-1)
  } else {
    a = qx === 0 ? card.a0 : card.a1;
    b = qy === 0 ? card.b0 : card.b1;
  }
  const win = isChshWin(qx, qy, a, b);
  return { x: qx, y: qy, a, b, win, spinA, spinB };
}

/**
 * Create a live CHSH run tracker with per-pair counts, exact S +/- 1sigma,
 * and exact test-supermartingale evidence meter (log10 B).
 */
export function createChshRun() {
  return {
    rounds: 0,
    wins: 0,
    log10B: 0,
    maxLog10B: 0,
    crackedAt: null,
    brokenAt: null,
    // per-pair (x,y) index = x*2 + y: { n, match }
    pairs: [
      { n: 0, match: 0 },
      { n: 0, match: 0 },
      { n: 0, match: 0 },
      { n: 0, match: 0 },
    ],
    bobZerosByAlice: [
      { n: 0, zeros: 0 },
      { n: 0, zeros: 0 },
    ],
  };
}

/**
 * Record one CHSH round into a run tracker.
 */
export function recordChshRound(run, r) {
  run.rounds++;
  if (r.win) {
    run.wins++;
    run.log10B += LOG10_F_WIN;
  } else {
    run.log10B += LOG10_F_LOSS;
  }
  if (run.log10B > run.maxLog10B) run.maxLog10B = run.log10B;
  if (run.crackedAt === null && run.log10B >= EVIDENCE_CRACK_LOG10) run.crackedAt = run.rounds;
  if (run.brokenAt === null && run.log10B >= EVIDENCE_BREAK_LOG10) run.brokenAt = run.rounds;

  const idx = r.x * 2 + r.y;
  run.pairs[idx].n++;
  if (r.a === r.b) run.pairs[idx].match++;

  run.bobZerosByAlice[r.x].n++;
  if (r.b === 0) run.bobZerosByAlice[r.x].zeros++;
}

/**
 * Compute CHSH S = E00 + E01 + E10 - E11 and its standard error (1sigma) from per-pair counts.
 */
export function computeChshS(run) {
  let S = 0;
  let varS = 0;
  let valid = true;
  const signs = [1, 1, 1, -1];
  for (let i = 0; i < 4; i++) {
    const { n, match } = run.pairs[i];
    if (n === 0) {
      valid = false;
      continue;
    }
    const p = match / n;
    const E = 2 * p - 1;
    // Var(E) = 4 * p * (1 - p) / n = (1 - E^2) / n
    S += signs[i] * E;
    varS += (1 - E * E) / n;
  }
  const winRate = run.rounds > 0 ? run.wins / run.rounds : 0;
  const seWin = run.rounds > 0 ? Math.sqrt((winRate * (1 - winRate)) / run.rounds) : 0;
  return {
    S: valid ? S : 8 * winRate - 4,
    seS: valid ? Math.sqrt(varS) : 8 * seWin,
    winRate,
    seWin,
    sFromP: 8 * winRate - 4,
    valid,
  };
}

/**
 * Honest 2-standard-error luck band (≈ 95% interval) for a binomial sample.
 * Ensures every sampled readout shown beside a theoretical bound communicates finite-sample noise honestly.
 */
export function formatSampleWithLuck(wins, rounds, refProb = null) {
  if (!rounds || rounds <= 0) {
    return { rate: 0, pct: '—', marginPct: '—', se: 0, text: '—' };
  }
  const rate = wins / rounds;
  const pSe = refProb !== null ? refProb : rate;
  const se = Math.sqrt(Math.max(0, pSe * (1 - pSe)) / rounds);
  const margin = 2 * se;
  const pct = `${(rate * 100).toFixed(1)}%`;
  const marginPct = `${(margin * 100).toFixed(1)}%`;
  return {
    rate,
    pct,
    marginPct,
    se,
    text: `${pct} (luck ±${marginPct})`,
  };
}

// ---- Myth-Buster Physics (100% genuine singlet Born rule & classical glove models — zero faking!) ----

// The 6 optimal non-trivial Mermin "glove" cards (all achieve 100% on same dial and 5/9 ≈ 55.56% on random dials)
export const OPTIMAL_GLOVE_CARDS = [
  [0, 0, 1], [0, 1, 0], [1, 0, 0],
  [1, 1, 0], [1, 0, 1], [0, 1, 1],
];

/**
 * Myth 1: "Text Bob faster than light."
 * Alice encodes a 3-slot message using choices in { '0', '1', 'off' }.
 * Each slot samples `pairsPerLetter` rounds directly from the singlet Born rule:
 *   - Bob's marginal P(b = 0 | Alice choice) = 1/2 identically for '0', '1', AND 'off' (no-signalling).
 *   - Only after Alice's notes arrive at light speed does comparing a vs b on y=1 reveal
 *     ~85.4% match for Alice='0', ~14.6% match (85.4% flip) for Alice='1', and unrecoverable for 'off'.
 */
export function sampleFtlMessage({
  message = ['0', '1', '0'],
  pairsPerLetter = 1200,
  rng = cryptoUniform,
  intRng = cryptoInt,
} = {}) {
  const slots = message.map(choice => {
    let bobCoral = 0;
    let y1Total = 0;
    let y1Same = 0;
    let wins = 0;
    const bobStrip = [];
    const notePairs = []; // First 6 y=1 pairs showing Alice & Bob notes lining up on reveal!

    for (let i = 0; i < pairsPerLetter; i++) {
      const y = intRng(2);
      if (choice === 'off') {
        const draw = sampleSinglet(0, CHSH_BOB_SPIN_ANGLES[y], rng);
        const b = draw.spinB === -1 ? 0 : 1;
        if (b === 0) bobCoral++;
        if (i >= pairsPerLetter - 6) bobStrip.push(b);
      } else {
        const x = choice === '1' ? 1 : 0;
        const r = sampleChshRound({ mode: 'entangled', x, y, rng, intRng });
        if (r.b === 0) bobCoral++;
        if (r.win) wins++;
        if (y === 1) {
          y1Total++;
          if (r.a === r.b) y1Same++;
          if (notePairs.length < 6) notePairs.push({ a: r.a, b: r.b, match: r.a === r.b });
        }
        if (i >= pairsPerLetter - 6) bobStrip.push(r.b);
      }
    }

    const y1MatchRate = y1Total > 0 ? y1Same / y1Total : null;
    const decoded = choice === 'off'
      ? '—'
      : y1MatchRate > 0.5 ? '0' : '1';

    return {
      choice,
      n: pairsPerLetter,
      bobCoral,
      bobCoralRate: bobCoral / pairsPerLetter,
      y1Total,
      y1Same,
      y1MatchRate,
      winRate: choice === 'off' ? null : wins / pairsPerLetter,
      decoded,
      bobStrip,
      notePairs,
    };
  });

  return { slots };
}

/**
 * Myth 2: "It's just two gloves in two boxes."
 * Compares random pre-set glove cards (OPTIMAL_GLOVE_CARDS) vs entangled singlet pairs
 * in the 3-dial Mermin boxes for both same-dial and random-dial tests.
 */
export function sampleGlovesVsEntangled({
  rounds = 1200,
  sameDial = false,
  rng = cryptoUniform,
  intRng = cryptoInt,
} = {}) {
  let gloveSame = 0;
  let entSame = 0;
  let lastGlove = null;
  let lastEnt = null;

  for (let i = 0; i < rounds; i++) {
    const dA = intRng(3);
    const dB = sameDial ? dA : intRng(3);

    // Classical pre-packed gloves: randomly draw one of the 6 optimal 5/9 cards
    const card = OPTIMAL_GLOVE_CARDS[intRng(OPTIMAL_GLOVE_CARDS.length)];
    const gA = card[dA];
    const gB = card[dB];
    if (gA === gB) gloveSame++;
    lastGlove = { dA, dB, colorA: gA, colorB: gB, card };

    // Real entangled singlet pair
    const ent = sampleMerminQuantum(dA, dB, rng);
    if (ent.same) entSame++;
    lastEnt = ent;
  }

  return {
    rounds,
    sameDial,
    gloveMatches: gloveSame,
    gloveRate: gloveSame / rounds,
    entMatches: entSame,
    entRate: entSame / rounds,
    lastGlove,
    lastEnt,
  };
}

/**
 * Myth 3: "Someone has to be watching."
 * Runs honest CHSH entangled singlet trials under either 'human' (live lamp watcher)
 * or 'recorder' (sealed dark-box time-tagger). Both obey the exact same Born-rule statistics.
 */
export function sampleObserverVsRecorder({
  rounds = 2000,
  detector = 'human',
  rng = cryptoUniform,
  intRng = cryptoInt,
} = {}) {
  const run = createChshRun();
  let last = null;
  for (let i = 0; i < rounds; i++) {
    last = sampleChshRound({ mode: 'entangled', rng, intRng });
    recordChshRound(run, last);
  }
  const stats = computeChshS(run);
  return {
    detector,
    rounds: run.rounds,
    wins: run.wins,
    winRate: stats.winRate,
    S: stats.S,
    seS: stats.seS,
    brokenAt: run.brokenAt,
    last,
  };
}
