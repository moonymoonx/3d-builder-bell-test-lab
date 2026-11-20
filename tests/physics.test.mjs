import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SQRT2,
  P_CLASSICAL_MAX,
  P_QUANTUM_OPT,
  S_CLASSICAL_MAX,
  S_TSIRELSON,
  EVIDENCE_F_WIN,
  EVIDENCE_F_LOSS,
  MERMIN_SPIN_ANGLES,
  CHSH_ALICE_SPIN_ANGLES,
  CHSH_BOB_SPIN_ANGLES,
  singletJointProbs,
  merminProbSame,
  allMerminCards,
  allChshCards,
  chshQuantumWinProb,
  sampleChshRound,
  createChshRun,
  recordChshRound,
  computeChshS,
  cryptoUniform,
  cryptoInt,
} from '../src/physics.js';

test('Singlet Born rule matches (1 - A*B*cos(Delta))/4 across 0-360° and marginals = 1/2', () => {
  for (let a = 0; a < 360; a += 15) {
    for (let b = 0; b < 360; b += 15) {
      const p = singletJointProbs(a, b);
      const d = ((a - b) * Math.PI) / 180;
      const expectedPP = (1 - Math.cos(d)) / 4;
      const expectedPM = (1 + Math.cos(d)) / 4;
      assert.ok(Math.abs(p.pp - expectedPP) < 1e-12);
      assert.ok(Math.abs(p.mm - expectedPP) < 1e-12);
      assert.ok(Math.abs(p.pm - expectedPM) < 1e-12);
      assert.ok(Math.abs(p.mp - expectedPM) < 1e-12);
      assert.ok(Math.abs(p.pp + p.pm + p.mp + p.mm - 1) < 1e-12);
      // Bob's marginal P(B = +1) = 1/2 and P(B = -1) = 1/2 regardless of Alice's angle
      assert.ok(Math.abs(p.pp + p.mp - 0.5) < 1e-12);
      assert.ok(Math.abs(p.pm + p.mm - 0.5) < 1e-12);
    }
  }
});

test('Mermin box: same dial = 1, different dial = 1/4, random = 1/2, all 8 cards >= 5/9', () => {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const ps = merminProbSame(i, j);
      if (i === j) assert.ok(Math.abs(ps - 1) < 1e-12);
      else assert.ok(Math.abs(ps - 0.25) < 1e-12);
      sum += ps;
    }
  }
  assert.ok(Math.abs(sum / 9 - 0.5) < 1e-12);

  const cards = allMerminCards();
  assert.equal(cards.length, 8);
  let nines = 0, fives = 0;
  for (const c of cards) {
    assert.ok(c.matches === 9 || c.matches === 5);
    assert.ok(c.rate >= 5 / 9 - 1e-12);
    if (c.matches === 9) nines++;
    if (c.matches === 5) fives++;
  }
  assert.equal(nines, 2);
  assert.equal(fives, 6);
});

test('CHSH classical cards: all 16 win 3/4 (8 cards) or 1/4 (8 cards)', () => {
  const cards = allChshCards();
  assert.equal(cards.length, 16);
  let threeQuarter = 0, oneQuarter = 0;
  for (const c of cards) {
    assert.ok(c.wins === 3 || c.wins === 1);
    assert.ok(c.rate <= P_CLASSICAL_MAX);
    if (c.wins === 3) threeQuarter++;
    if (c.wins === 1) oneQuarter++;
  }
  assert.equal(threeQuarter, 8);
  assert.equal(oneQuarter, 8);
});

test('CHSH quantum angles achieve cos^2(pi/8) on all 4 question pairs and S = 2*sqrt(2)', () => {
  const expected = Math.pow(Math.cos(Math.PI / 8), 2);
  assert.ok(Math.abs(P_QUANTUM_OPT - expected) < 1e-15);
  let sum = 0;
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      const pw = chshQuantumWinProb(x, y);
      assert.ok(Math.abs(pw - expected) < 1e-12);
      sum += pw;
    }
  }
  const avg = sum / 4;
  const S = 8 * avg - 4;
  assert.ok(Math.abs(S - S_TSIRELSON) < 1e-12);
  assert.equal(S_CLASSICAL_MAX, 8 * P_CLASSICAL_MAX - 4);
});

test('Bob marginal is strictly 1/2 for each Alice CHSH setting', () => {
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      const p = singletJointProbs(CHSH_ALICE_SPIN_ANGLES[x], CHSH_BOB_SPIN_ANGLES[y]);
      // Bob answer 0 = spin down (-1)
      const pBob0 = p.pm + p.mm;
      assert.ok(Math.abs(pBob0 - 0.5) < 1e-12);
    }
  }
});

test('Evidence supermartingale factors satisfy E[factor | p <= 3/4] <= 1 strictly and pass Monte Carlo', () => {
  const expAtThreeQuarters = 0.75 * EVIDENCE_F_WIN + 0.25 * EVIDENCE_F_LOSS;
  assert.ok(Math.abs(expAtThreeQuarters - 1) < 1e-14);
  assert.ok(expAtThreeQuarters <= 1 + 1e-15);
  assert.ok(EVIDENCE_F_WIN > EVIDENCE_F_LOSS);

  // Fast deterministic PRNG for 10,000-run Monte Carlo validation
  let s = 0x51a7b3c9;
  const prng = () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
  const intPrng = n => Math.floor(prng() * n);

  const N = 10000;
  const breaks = [];
  for (let r = 0; r < N; r++) {
    const run = createChshRun();
    for (let t = 0; t < 2000 && run.brokenAt === null; t++) {
      recordChshRound(run, sampleChshRound({ mode: 'entangled', rng: prng, intRng: intPrng }));
    }
    assert.ok(run.brokenAt !== null, 'entangled run should break within 2000 rounds');
    breaks.push(run.brokenAt);
  }
  breaks.sort((a, b) => a - b);
  const median = breaks[N / 2];
  assert.ok(median >= 370 && median <= 440, `median break ${median} near 405`);

  // 10,000 classical 75% card runs of 1,000 rounds: 0 false breaks expected
  let falseBreaks = 0;
  for (let r = 0; r < N; r++) {
    const run = createChshRun();
    for (let t = 0; t < 1000; t++) {
      recordChshRound(run, sampleChshRound({ mode: 'card', card: { a0: 0, a1: 0, b0: 0, b1: 0 }, rng: prng, intRng: intPrng }));
    }
    if (run.brokenAt !== null) falseBreaks++;
  }
  assert.equal(falseBreaks, 0);
});

test('crypto.getRandomValues sampling works cleanly and S estimator agrees with 8P - 4', () => {
  const run = createChshRun();
  for (let i = 0; i < 2000; i++) {
    const r = sampleChshRound({ mode: 'entangled', rng: cryptoUniform, intRng: cryptoInt });
    recordChshRound(run, r);
  }
  const stats = computeChshS(run);
  assert.ok(stats.winRate > 0.80 && stats.winRate < 0.90, `winRate=${stats.winRate}`);
  assert.ok(stats.S > 2.4 && stats.S < 3.2, `S=${stats.S}`);
  assert.ok(run.brokenAt !== null);
});
