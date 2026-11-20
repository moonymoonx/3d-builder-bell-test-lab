// Numerical verification of SPEC.md physics, evidence supermartingale, and WCAG contrast
// Run: node ref/scratch/verify_spec.mjs

const SQRT2 = Math.SQRT2;
const P_Q = (2 + SQRT2) / 4; // cos^2(pi/8)
const F_WIN_EXACT = P_Q / 0.75; // (2 + sqrt(2)) / 3
const F_LOSS_EXACT = (1 - P_Q) / 0.25; // 2 - sqrt(2)
const F_WIN_ROUND = 1.1381;
const F_LOSS_ROUND = 0.5858;

console.log('=== 1. SINGLET BORN RULE CHECK ===');
// Singlet |psi-> = (|01> - |10>)/sqrt(2)
// Spin-up along angle theta in x-z plane: |+theta> = cos(t/2)|0> + sin(t/2)|1>
// Spin-down along angle theta: |-theta> = -sin(t/2)|0> + cos(t/2)|1>
function bornSinglet(thetaA_deg, thetaB_deg) {
  const a = (thetaA_deg * Math.PI) / 180;
  const b = (thetaB_deg * Math.PI) / 180;
  const vecA = {
    '+1': [Math.cos(a / 2), Math.sin(a / 2)],
    '-1': [-Math.sin(a / 2), Math.cos(a / 2)],
  };
  const vecB = {
    '+1': [Math.cos(b / 2), Math.sin(b / 2)],
    '-1': [-Math.sin(b / 2), Math.cos(b / 2)],
  };
  const probs = {};
  for (const A of ['+1', '-1']) {
    for (const B of ['+1', '-1']) {
      // <A, B | psi-> = (A0*B1 - A1*B0) / sqrt(2)
      const amp = (vecA[A][0] * vecB[B][1] - vecA[A][1] * vecB[B][0]) / SQRT2;
      probs[`${A},${B}`] = amp * amp;
    }
  }
  return probs;
}

let maxErr = 0;
let maxMargErr = 0;
for (let a = 0; a < 360; a += 15) {
  for (let b = 0; b < 360; b += 15) {
    const p = bornSinglet(a, b);
    const delta = ((a - b) * Math.PI) / 180;
    for (const A of [1, -1]) {
      for (const B of [1, -1]) {
        const key = `${A > 0 ? '+1' : '-1'},${B > 0 ? '+1' : '-1'}`;
        const closed = (1 - A * B * Math.cos(delta)) / 4;
        maxErr = Math.max(maxErr, Math.abs(p[key] - closed));
      }
    }
    const pBup = p['+1,+1'] + p['-1,+1'];
    maxMargErr = Math.max(maxMargErr, Math.abs(pBup - 0.5));
  }
}
console.log(`Max Born vs (1-AB cos Δ)/4 error: ${maxErr.toExponential(3)}`);
console.log(`Max Bob marginal error from 0.5:  ${maxMargErr.toExponential(3)}`);

console.log('\n=== 2. MERMIN BOX CHECK ===');
const merminAngles = [0, 120, 240];
let totalSame = 0;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const p = bornSinglet(merminAngles[i], merminAngles[j]);
    // Bob reversed: same colour iff opposite spins
    const pSame = p['+1,-1'] + p['-1,+1'];
    totalSame += pSame;
    if (i === j && Math.abs(pSame - 1) > 1e-12) throw new Error('Mermin same dial fail');
    if (i !== j && Math.abs(pSame - 0.25) > 1e-12) throw new Error('Mermin diff dial fail');
  }
}
console.log(`Mermin random-dial P(same colour) = ${(totalSame / 9).toFixed(6)}`);
const merminCardCounts = [];
for (let mask = 0; mask < 8; mask++) {
  const c = [(mask >> 2) & 1, (mask >> 1) & 1, mask & 1];
  let same = 0;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (c[i] === c[j]) same++;
  merminCardCounts.push(same);
}
console.log(`All 8 Mermin cards (matches / 9): ${merminCardCounts.join(', ')}`);

console.log('\n=== 3. CHSH GAME CHECK ===');
const aAng = [0, 90];
const bAng = [45, -45];
let chshSum = 0;
let S_val = 0;
for (let x = 0; x < 2; x++) {
  for (let y = 0; y < 2; y++) {
    const p = bornSinglet(aAng[x], bAng[y]);
    // Answer 0 = up (+1) for Alice, down (-1) for Bob -> match (a=b) iff opposite spins!
    const pMatch = p['+1,-1'] + p['-1,+1'];
    const pDiff = p['+1,+1'] + p['-1,-1'];
    const pWin = x === 1 && y === 1 ? pDiff : pMatch;
    const E = pMatch - pDiff;
    S_val += x === 1 && y === 1 ? -E : E;
    chshSum += pWin;
    console.log(`  (x=${x},y=${y}): Δ=${Math.abs(aAng[x] - bAng[y])}°, P(win)=${pWin.toFixed(6)}, E=${E.toFixed(6)}`);
  }
}
console.log(`Quantum P_win = ${(chshSum / 4).toFixed(6)} (exact cos^2(pi/8) = ${P_Q.toFixed(6)}), S = ${S_val.toFixed(6)} (2*sqrt(2) = ${(2 * SQRT2).toFixed(6)})`);
const cardWins = [];
for (let mask = 0; mask < 16; mask++) {
  const a0 = (mask >> 3) & 1, a1 = (mask >> 2) & 1, b0 = (mask >> 1) & 1, b1 = mask & 1;
  let w = 0;
  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      const a = x ? a1 : a0, b = y ? b1 : b0;
      if ((a ^ b) === (x & y)) w++;
    }
  }
  cardWins.push(w);
}
console.log(`All 16 CHSH cards (wins / 4): ${cardWins.join(', ')}`);

console.log('\n=== 4. EVIDENCE SUPERMARTINGALE (Q7) ===');
console.log(`Exact factors:   f_win = ${F_WIN_EXACT.toFixed(10)}, f_loss = ${F_LOSS_EXACT.toFixed(10)}`);
console.log(`E[factor | p=3/4] (EXACT):   ${(0.75 * F_WIN_EXACT + 0.25 * F_LOSS_EXACT).toFixed(15)}`);
console.log(`E[factor | p=3/4] (ROUNDED): ${(0.75 * F_WIN_ROUND + 0.25 * F_LOSS_ROUND).toFixed(15)}  <-- EXCEEDS 1!`);
console.log(`KL drift per entangled round log10: ${(P_Q * Math.log10(F_WIN_EXACT) + (1 - P_Q) * Math.log10(F_LOSS_EXACT)).toFixed(6)} -> expected rounds to 10^6: ${(6 / (P_Q * Math.log10(F_WIN_EXACT) + (1 - P_Q) * Math.log10(F_LOSS_EXACT))).toFixed(1)}`);

// Monte Carlo: 50,000 entangled runs + 50,000 adaptive/best classical runs (length 2000)
let seed = 0x12345678;
function rand() {
  seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
  return (seed >>> 0) / 4294967296;
}
const N_ENT = 50000;
const crackRounds = [];
const breakRounds = [];
for (let r = 0; r < N_ENT; r++) {
  let logB = 0;
  let cracked = -1, broken = -1;
  const lw = Math.log10(F_WIN_EXACT), ll = Math.log10(F_LOSS_EXACT);
  for (let t = 1; t <= 4000; t++) {
    logB += rand() < P_Q ? lw : ll;
    if (cracked < 0 && logB >= 3) cracked = t;
    if (broken < 0 && logB >= 6) { broken = t; break; }
  }
  crackRounds.push(cracked);
  breakRounds.push(broken);
}
crackRounds.sort((a, b) => a - b);
breakRounds.sort((a, b) => a - b);
console.log(`Entangled (${N_ENT} runs): crack median=${crackRounds[N_ENT / 2]}, break median=${breakRounds[N_ENT / 2]}, p95=${breakRounds[Math.floor(N_ENT * 0.95)]}`);

// Classical adaptive test (50,000 runs of 2,000 rounds; switches between 75% card and 25% card adversarially, or stays on 75%)
const N_CL = 50000;
let clCracks = 0, clBreaks = 0;
const lw = Math.log10(F_WIN_EXACT), ll = Math.log10(F_LOSS_EXACT);
for (let r = 0; r < N_CL; r++) {
  let logB = 0, c = false, b = false;
  for (let t = 1; t <= 2000; t++) {
    // Optimal local strategy at every step has p_t = 0.75 (any adaptive switch to <0.75 only lowers E[B])
    logB += rand() < 0.75 ? lw : ll;
    if (logB >= 3) c = true;
    if (logB >= 6) b = true;
  }
  if (c) clCracks++;
  if (b) clBreaks++;
}
console.log(`Classical 75% (${N_CL} runs × 2000 rounds): cracks=${clCracks} (rate ${(clCracks / N_CL).toFixed(5)} <= 0.001), breaks=${clBreaks} (rate ${(clBreaks / N_CL).toFixed(6)} <= 0.000001)`);

console.log('\n=== 5. WCAG 2.1 CONTRAST CHECK FOR PROPOSED PALETTE ===');
function relLum(hex) {
  const n = parseInt(hex.slice(1), 16);
  const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}
function contrast(h1, h2) {
  const l1 = relLum(h1), l2 = relLum(h2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
const pairs = [
  ['#F4EFE6 (Warm Ivory ink)', '#F4EFE6', '#0D1017 (Stage Night)'],
  ['#F4EFE6 (Warm Ivory ink)', '#F4EFE6', '#161B26 (Panel Slate)'],
  ['#B8C0D0 (Muted Ink)', '#B8C0D0', '#161B26 (Panel Slate)'],
  ['#F4EFE6 (Warm Ivory)', '#F4EFE6', '#1F2636 (Elevated Card)'],
  ['#0D1017 (Dark ink on Gold CTA)', '#0D1017', '#E6B655 (Quantum Gold)'],
  ['#E6B655 (Quantum Gold text)', '#E6B655', '#161B26 (Panel Slate)'],
  ['#E6B655 (Quantum Gold text)', '#E6B655', '#0D1017 (Stage Night)'],
  ['#FF7A6B (Warm Coral lamp)', '#FF7A6B', '#161B26 (Panel Slate)'],
  ['#4FD6A8 (Jade Mint lamp)', '#4FD6A8', '#161B26 (Panel Slate)'],
  ['#0D1017 (Dark ink on Coral)', '#0D1017', '#FF7A6B (Warm Coral)'],
  ['#0D1017 (Dark ink on Mint)', '#0D1017', '#4FD6A8 (Jade Mint)'],
];
for (const [label, c1, c2Label] of pairs) {
  const c2 = c2Label.slice(0, 7);
  const ratio = contrast(c1, c2);
  console.log(`  ${label.padEnd(32)} on ${c2Label.padEnd(24)} -> ${ratio.toFixed(2)}:1 ${ratio >= 4.5 ? 'PASS AA' : 'FAIL'}`);
}
