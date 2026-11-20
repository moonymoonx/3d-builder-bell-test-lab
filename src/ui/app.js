import {
  EVIDENCE_CRACK_LOG10,
  EVIDENCE_BREAK_LOG10,
  MERMIN_SPIN_ANGLES,
  sampleMerminQuantum,
  evaluateMerminCard,
  evaluateChshCard,
  sampleChshRound,
  createChshRun,
  recordChshRound,
  computeChshS,
  cryptoInt,
  sampleFtlMessage,
  sampleGlovesVsEntangled,
  sampleObserverVsRecorder,
  formatSampleWithLuck,
} from '../physics.js';
import { STEP_COUNT, DEPTH_DRAWERS } from './content.js';

const COLOR_NAMES = ['Coral', 'Jade'];
const COLOR_SYMS = ['▲', '●'];

const SVG_SOUND_ON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
const SVG_SOUND_OFF = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';

export function createApp({ stage, audio, root }) {
  const state = {
    step: 0,
    bridgeOpen: false, // Dedicated "Same puzzle, sharper test." beat between Step 4 and Step 5
    teacher: window.location.hash === '#teacher',
    peeled: false,
    dialA: 0,
    dialB: 0,
    merminSameCount: 0,
    merminSameMatches: 0,
    merminRandCount: 0,
    merminRandMatches: 0,
    merminCard: [0, 0, 1],
    chshCard: { a0: 0, a1: 0, b0: 0, b1: 0 },
    chshMode: 'card',
    chshRun: createChshRun(),
    chshSettled: false,
    shatterBeat: false,
    wallHitBy75: false,
    classVoted: false,
    burstRunning: false,
    alicePolicy: '0', // '0' | '1' | 'random' | 'off'
    bobRun: {
      n0: 0, b0WhenA0: 0,
      n1: 0, b0WhenA1: 0,
      nRand: 0, b0WhenRand: 0,
      nOff: 0, b0WhenOff: 0,
      total: 0, wins: 0, compared: false,
      recent: [],
    },
    depthKey: null,
    idleHint: '',
    lastInteract: performance.now(),
    mythMode: false,
    mythTab: 'ftl', // 'ftl' | 'gloves' | 'observer'
    mythFtl: {
      message: ['0', '1', '0'], // default S · O · S pattern
      sent: false,
      revealed: false,
      result: null,
    },
    mythGloves: {
      sameRes: null,
      randRes: null,
    },
    mythObserver: {
      humanRes: null,
      recorderRes: null,
      mode: 'human', // 'human' | 'recorder'
    },
  };

  let idlePairTimer = null;
  let burstTimer = null;
  let shatterBeatTimer = null;

  const elBackBtn = root.querySelector('#btn-back');
  const elResetBtn = root.querySelector('#btn-reset');
  const elSkipTop = root.querySelector('#btn-skip-top');
  const elMythsBtn = root.querySelector('#btn-myths');
  const elSoundBtn = root.querySelector('#btn-sound');
  const elModeSelf = root.querySelector('#mode-self');
  const elModeTeacher = root.querySelector('#mode-teacher');
  const elStepDots = root.querySelector('#step-dots');
  const elHeroOverlay = root.querySelector('#hero-overlay');
  const elPanel = root.querySelector('#side-panel');
  const elPanelScroll = root.querySelector('#panel-scroll');
  const elPanelFooter = root.querySelector('#panel-footer');
  const elDepthBackdrop = root.querySelector('#depth-backdrop');
  const elDepthContent = root.querySelector('#depth-content');
  const elHintPill = root.querySelector('#idle-hint');

  function touchInteraction() {
    state.lastInteract = performance.now();
    audio.unlock();
    if (state.idleHint) {
      state.idleHint = '';
      elHintPill.hidden = true;
    }
  }

  function stopTimers() {
    if (idlePairTimer) { clearInterval(idlePairTimer); idlePairTimer = null; }
    if (burstTimer) { clearInterval(burstTimer); burstTimer = null; }
    if (shatterBeatTimer) { clearTimeout(shatterBeatTimer); shatterBeatTimer = null; }
    state.burstRunning = false;
  }

  function startIdleHeroLoop() {
    stopTimers();
    const initDraw = sampleMerminQuantum(0, 0);
    stage.bloomLampLeft(initDraw.colorA);
    stage.bloomLampRight(initDraw.colorB);
    const fireOnce = () => {
      if (state.step !== 0) return;
      const draw = sampleMerminQuantum(0, 0);
      stage.spawnMotePair({
        colorA: draw.colorA,
        colorB: draw.colorB,
        entangled: true,
        duration: 0.76,
      });
    };
    setTimeout(fireOnce, 220);
    idlePairTimer = setInterval(fireOnce, 1650);
  }

  function syncLeverVisibility({ snap = true } = {}) {
    const revealed = !state.teacher || state.classVoted || state.step === 6;
    stage.setLeverRevealed(revealed, { snap });
  }

  function createFreshBobRun() {
    return {
      n0: 0, b0WhenA0: 0,
      n1: 0, b0WhenA1: 0,
      nRand: 0, b0WhenRand: 0,
      nOff: 0, b0WhenOff: 0,
      total: 0, wins: 0, compared: false,
      recent: [],
    };
  }

  function syncCardStageVisual() {
    stage.setCardStrip(state.merminCard);
    state.dialA = 0;
    state.dialB = 2;
    stage.setDial('left', 0, 'mermin');
    stage.setDial('right', 2, 'mermin');
    stage.bloomLampLeft(state.merminCard[0]);
    stage.bloomLampRight(state.merminCard[2]);
  }

  function openBridge() {
    stopTimers();
    state.step = 4;
    state.bridgeOpen = true;
    state.peeled = false;
    state.depthKey = null;
    elDepthBackdrop.hidden = true;
    state.idleHint = '';
    elHintPill.hidden = true;
    stage.setStep(4.5);
    stage.setPeel(false, { snap: true });
    stage.setSourceEntangled(true);
    stage.setDial('left', 0, 'chsh');
    stage.setDial('right', 0, 'chsh');
    stage.setTeacherMode(state.teacher);
    render();
    elPanelScroll.scrollTop = 0;
    requestAnimationFrame(() => stage.resize());
  }

  function openMyths(tab = 'ftl') {
    stopTimers();
    state.mythMode = true;
    state.mythTab = tab;
    state.bridgeOpen = false;
    state.shatterBeat = false;
    state.depthKey = null;
    elDepthBackdrop.hidden = true;
    state.idleHint = '';
    elHintPill.hidden = true;

    stage.setMythView(tab);
    stage.setTeacherMode(state.teacher);

    if (tab === 'ftl') {
      stage.setAlicePartition(!state.mythFtl.revealed);
      stage.setDial('left', state.mythFtl.message[0] === '1' ? 1 : 0, 'chsh');
      stage.setDial('right', 1, 'chsh');
      stage.bloomLampRight(0);
    } else if (tab === 'gloves') {
      const showEnt = !!state.mythGloves.randRes;
      stage.setSourceEntangled(showEnt);
      stage.setCardStandVisible(!showEnt);
      stage.setDial('left', 0, 'mermin');
      stage.setDial('right', showEnt ? 2 : 0, 'mermin');
      stage.bloomLampLeft(0);
      stage.bloomLampRight(showEnt ? 1 : 0);
    } else if (tab === 'observer') {
      const useRec = state.mythObserver.mode === 'recorder' || !!state.mythObserver.recorderRes;
      stage.setRecorderHoods(useRec);
      const activeRes = useRec ? state.mythObserver.recorderRes : state.mythObserver.humanRes;
      if (activeRes) {
        stage.setWallState('shattered', { settled: true });
        stage.setShowQuantumLabel(true);
        stage.setArenaProgress(activeRes.winRate, { isQuantum: true, snap: true, rounds: activeRes.rounds });
      } else {
        stage.setWallState('intact');
        stage.setArenaProgress(0, { isQuantum: true, snap: true, rounds: 0 });
      }
      if (!useRec) {
        stage.bloomLampLeft(0);
        stage.bloomLampRight(0);
      }
    }

    render();
    elPanelScroll.scrollTop = 0;
    requestAnimationFrame(() => stage.resize());
  }

  function runMythFtlSend() {
    touchInteraction();
    state.mythFtl.result = sampleFtlMessage({ message: state.mythFtl.message, pairsPerLetter: 1200 });
    state.mythFtl.sent = true;
    state.mythFtl.revealed = false;
    stage.setAlicePartition(true);
    const lastSlot = state.mythFtl.result.slots[state.mythFtl.result.slots.length - 1];
    const lastB = lastSlot.bobStrip[lastSlot.bobStrip.length - 1] ?? 0;
    stage.bloomLampRight(lastB);
    stage.spawnMotePair({ colorA: 0, colorB: lastB, entangled: true, duration: 0.34 });
    audio.playLampPair(lastB, lastB);
    render();
  }

  function runMythFtlReveal({ instant = false } = {}) {
    touchInteraction();
    if (!state.mythFtl.sent) {
      state.mythFtl.result = sampleFtlMessage({ message: state.mythFtl.message, pairsPerLetter: 1200 });
      state.mythFtl.sent = true;
    }
    const finish = () => {
      state.mythFtl.revealed = true;
      stage.setAlicePartition(false);
      stage.bloomLampLeft(0);
      stage.bloomLampRight(0);
      audio.playCompareArrive();
      render();
    };
    if (instant) {
      finish();
    } else {
      stage.triggerComparePulse(finish);
    }
  }

  function runMythGlovesSame() {
    touchInteraction();
    state.mythGloves.sameRes = sampleGlovesVsEntangled({ rounds: 1200, sameDial: true });
    state.mythGloves.randRes = null;
    stage.setSourceEntangled(false);
    stage.setCardStandVisible(true);
    stage.setDial('left', 0, 'mermin');
    stage.setDial('right', 0, 'mermin');
    stage.bloomLampLeft(0);
    stage.bloomLampRight(0);
    stage.spawnMotePair({ colorA: 0, colorB: 0, entangled: false, duration: 0.35 });
    audio.playLampPair(0, 0);
    render();
  }

  function runMythGlovesRandom() {
    touchInteraction();
    if (!state.mythGloves.sameRes) {
      state.mythGloves.sameRes = sampleGlovesVsEntangled({ rounds: 1200, sameDial: true });
    }
    state.mythGloves.randRes = sampleGlovesVsEntangled({ rounds: 4800, sameDial: false });
    stage.setSourceEntangled(true);
    stage.setCardStandVisible(false);
    const le = state.mythGloves.randRes.lastEnt;
    stage.setDial('left', le.dialA, 'mermin');
    stage.setDial('right', le.dialB, 'mermin');
    stage.bloomLampLeft(le.colorA);
    stage.bloomLampRight(le.colorB);
    stage.spawnMotePair({ colorA: le.colorA, colorB: le.colorB, entangled: true, duration: 0.35 });
    audio.playCompareArrive();
    render();
  }

  function runMythObserverHuman() {
    touchInteraction();
    state.mythObserver.mode = 'human';
    state.mythObserver.humanRes = sampleObserverVsRecorder({ rounds: 2000, detector: 'human' });
    state.mythObserver.recorderRes = null;
    stage.setRecorderHoods(false);
    stage.setWallState('shattered', { settled: true });
    stage.setShowQuantumLabel(true);
    stage.setArenaProgress(state.mythObserver.humanRes.winRate, {
      isQuantum: true,
      snap: true,
      rounds: state.mythObserver.humanRes.rounds,
    });
    const last = state.mythObserver.humanRes.last;
    stage.setDial('left', last.x, 'chsh');
    stage.setDial('right', last.y, 'chsh');
    stage.bloomLampLeft(last.a);
    stage.bloomLampRight(last.b);
    audio.playLampPair(last.a, last.b);
    render();
  }

  function runMythObserverRecorder() {
    touchInteraction();
    if (!state.mythObserver.humanRes) {
      state.mythObserver.humanRes = sampleObserverVsRecorder({ rounds: 2000, detector: 'human' });
    }
    state.mythObserver.mode = 'recorder';
    state.mythObserver.recorderRes = sampleObserverVsRecorder({ rounds: 2000, detector: 'recorder' });
    stage.setRecorderHoods(true);
    stage.setWallState('shattered', { settled: true });
    stage.setShowQuantumLabel(true);
    stage.setArenaProgress(state.mythObserver.recorderRes.winRate, {
      isQuantum: true,
      snap: true,
      rounds: state.mythObserver.recorderRes.rounds,
    });
    audio.playCompareArrive();
    render();
  }

  function goto(nextStep) {
    const s = Math.max(0, Math.min(STEP_COUNT - 1, nextStep));
    stopTimers();
    state.step = s;
    state.mythMode = false;
    state.bridgeOpen = false;
    state.shatterBeat = false;
    state.depthKey = null;
    elDepthBackdrop.hidden = true;
    state.idleHint = '';
    elHintPill.hidden = true;
    state.lastInteract = performance.now();

    stage.setStep(s);
    stage.setTeacherMode(state.teacher);
    syncLeverVisibility({ snap: true });

    if (s === 0) {
      state.dialA = 0; state.dialB = 0;
      state.peeled = false;
      stage.setPeel(false, { snap: true });
      stage.setSourceEntangled(true);
      stage.setDial('left', 0, 'mermin');
      stage.setDial('right', 0, 'mermin');
      startIdleHeroLoop();
    } else if (s === 1) {
      state.dialA = 0; state.dialB = 0;
      state.peeled = false;
      stage.setPeel(false, { snap: true });
      stage.setSourceEntangled(true);
      stage.setDial('left', 0, 'mermin');
      stage.setDial('right', 0, 'mermin');
    } else if (s === 2) {
      state.peeled = false;
      stage.setPeel(false, { snap: true });
      stage.setSourceEntangled(true);
    } else if (s === 3) {
      state.peeled = false;
      stage.setPeel(false, { snap: true });
      stage.setSourceEntangled(false);
      syncCardStageVisual();
      stage.spawnMotePair({
        colorA: state.merminCard[0],
        colorB: state.merminCard[2],
        entangled: false,
        duration: 0.45,
      });
    } else if (s === 4) {
      state.dialA = 0;
      state.dialB = 1;
      state.peeled = true;
      stage.setPeel(true);
      stage.setSourceEntangled(true);
      stage.setDial('left', 0, 'mermin');
      stage.setDial('right', 1, 'mermin');
      stage.setStep4ActiveAngles(0, 1);
    } else if (s === 5) {
      if (state.chshMode !== 'card') {
        state.chshRun = createChshRun();
        state.chshSettled = false;
      }
      state.chshMode = 'card';
      state.peeled = false;
      stage.setPeel(false, { snap: true });
      stage.setSourceEntangled(false);
      stage.setWallState('intact');
      const stats = computeChshS(state.chshRun);
      stage.setArenaProgress(state.chshRun.rounds > 0 ? stats.winRate : 0, {
        isQuantum: false,
        snap: true,
        rounds: state.chshRun.rounds,
      });
      stage.setDial('left', 0, 'chsh');
      stage.setDial('right', 0, 'chsh');
      syncLeverVisibility({ snap: true });
    } else if (s === 6) {
      state.chshMode = 'entangled';
      state.peeled = false;
      stage.setPeel(false, { snap: true });
      stage.setSourceEntangled(true);
      stage.setLeverRevealed(true, { snap: true });
      stage.setDial('left', 0, 'chsh');
      stage.setDial('right', 0, 'chsh');
      if (state.chshRun.rounds === 0) {
        stage.setWallState('intact');
        stage.setArenaProgress(0, { isQuantum: true, snap: true, rounds: 0 });
      }
    } else if (s === 7) {
      state.peeled = false;
      state.alicePolicy = '0';
      state.bobRun = createFreshBobRun(); // Always start from an honest fresh tally, never stale!
      stage.setPeel(false, { snap: true });
      stage.setSourceEntangled(true);
      stage.setAlicePartition(true);
    } else if (s === 8) {
      state.peeled = true;
      stage.setPeel(true);
      stage.setSourceEntangled(true);
      stage.setAlicePartition(false);
    }

    render();
    elPanelScroll.scrollTop = 0;
    requestAnimationFrame(() => stage.resize());
  }

  function resetAll() {
    touchInteraction();
    state.merminSameCount = 0;
    state.merminSameMatches = 0;
    state.merminRandCount = 0;
    state.merminRandMatches = 0;
    state.merminCard = [0, 0, 1];
    state.chshCard = { a0: 0, a1: 0, b0: 0, b1: 0 };
    state.chshMode = 'card';
    state.chshRun = createChshRun();
    state.chshSettled = false;
    state.wallHitBy75 = false;
    state.classVoted = false;
    state.bridgeOpen = false;
    state.bobRun = {
      n0: 0, b0WhenA0: 0, n1: 0, b0WhenA1: 0, nRand: 0, b0WhenRand: 0, nOff: 0, b0WhenOff: 0,
      total: 0, wins: 0, compared: false, recent: [],
    };
    stage.setWallState('intact');
    stage.setArenaProgress(0, { isQuantum: false, snap: true, rounds: 0 });
    goto(0);
  }

  function fireMerminSingle(randomDials = false) {
    touchInteraction();
    const dA = randomDials ? cryptoInt(3) : state.dialA;
    const dB = randomDials ? cryptoInt(3) : state.dialB;
    state.dialA = dA;
    state.dialB = dB;
    stage.setDial('left', dA, 'mermin');
    stage.setDial('right', dB, 'mermin');

    const draw = sampleMerminQuantum(dA, dB);
    stage.spawnMotePair({
      colorA: draw.colorA,
      colorB: draw.colorB,
      entangled: true,
      onArrive: () => {
        audio.playLampPair(draw.colorA, draw.colorB);
        if (dA === dB) {
          state.merminSameCount++;
          if (draw.same) state.merminSameMatches++;
        }
        render();
      },
    });
  }

  function fireMerminBatch(n, { randomDials = true, instant = false } = {}) {
    touchInteraction();
    stopTimers();
    if (instant) {
      let last = null;
      for (let i = 0; i < n; i++) {
        const dA = randomDials ? cryptoInt(3) : state.dialA;
        const dB = randomDials ? cryptoInt(3) : state.dialB;
        last = sampleMerminQuantum(dA, dB);
        if (randomDials) {
          state.merminRandCount++;
          if (last.same) state.merminRandMatches++;
        } else {
          state.merminSameCount++;
          if (last.same) state.merminSameMatches++;
        }
      }
      if (last) {
        stage.setDial('left', last.dialA, 'mermin');
        stage.setDial('right', last.dialB, 'mermin');
        stage.bloomLampLeft(last.colorA);
        stage.bloomLampRight(last.colorB);
      }
      render();
      requestAnimationFrame(() => stage.resize());
      return;
    }

    state.burstRunning = true;
    let remaining = n;
    const chunk = Math.max(1, Math.ceil(n / 24));
    burstTimer = setInterval(() => {
      const k = Math.min(chunk, remaining);
      let last = null;
      for (let i = 0; i < k; i++) {
        const dA = randomDials ? cryptoInt(3) : state.dialA;
        const dB = randomDials ? cryptoInt(3) : state.dialB;
        last = sampleMerminQuantum(dA, dB);
        if (randomDials) {
          state.merminRandCount++;
          if (last.same) state.merminRandMatches++;
        } else {
          state.merminSameCount++;
          if (last.same) state.merminSameMatches++;
        }
      }
      remaining -= k;
      if (last) {
        stage.setDial('left', last.dialA, 'mermin');
        stage.setDial('right', last.dialB, 'mermin');
        stage.spawnMotePair({ colorA: last.colorA, colorB: last.colorB, entangled: true, duration: 0.22 });
        audio.playRoundTick(0.25);
      }
      if (remaining <= 0) {
        clearInterval(burstTimer);
        burstTimer = null;
        state.burstRunning = false;
        if (last) audio.playLampPair(last.colorA, last.colorB);
      }
      render();
    }, 52);
  }

  function fireChsh(n, { instant = false, resetIfNewMode = false } = {}) {
    touchInteraction();
    stopTimers();
    const isQuantum = state.chshMode === 'entangled';
    if (resetIfNewMode) {
      state.chshRun = createChshRun();
      state.chshSettled = false;
      stage.setWallState('intact');
      stage.setArenaProgress(0, { isQuantum, snap: true, rounds: 0 });
    }
    if (isQuantum) state.chshSettled = false;

    const stepOne = (emitAudio = true) => {
      const prevCracked = state.chshRun.crackedAt !== null;
      const prevBroken = state.chshRun.brokenAt !== null;
      const r = sampleChshRound({ mode: state.chshMode, card: state.chshCard });
      recordChshRound(state.chshRun, r);
      const nowCracked = state.chshRun.crackedAt !== null;
      const nowBroken = state.chshRun.brokenAt !== null;

      if (!prevCracked && nowCracked) {
        stage.setWallState('cracked');
        if (emitAudio) audio.playGlassCrack();
      }
      if (!prevBroken && nowBroken) {
        stage.setWallState('shattered');
        if (emitAudio) audio.playShatterChord();
        // Give the shatter its own unobstructed ~1.2s cinematic beat (UI dims/recedes, 85.4% & CTA wait!)
        if (!instant) {
          state.shatterBeat = true;
          if (shatterBeatTimer) clearTimeout(shatterBeatTimer);
          shatterBeatTimer = setTimeout(() => {
            state.shatterBeat = false;
            stage.setShowQuantumLabel(true);
            render();
          }, 1200);
        }
      }
      return r;
    };

    if (instant || n === 1) {
      let last = null;
      for (let i = 0; i < n; i++) last = stepOne(n === 1);
      if (isQuantum && state.chshRun.brokenAt === null) {
        for (let extra = 0; extra < 1500 && state.chshRun.brokenAt === null; extra++) last = stepOne(false);
      }
      if (isQuantum && state.chshRun.rounds >= 1500 && state.chshRun.brokenAt !== null) {
        state.chshSettled = true;
      }
      const stats = computeChshS(state.chshRun);
      stage.setArenaProgress(stats.winRate, { isQuantum, snap: instant, rounds: state.chshRun.rounds });
      if (!isQuantum && evaluateChshCard(state.chshCard).wins === 3 && state.chshRun.rounds >= 100) {
        state.wallHitBy75 = true;
      }
      if (last) {
        stage.setDial('left', last.x, 'chsh');
        stage.setDial('right', last.y, 'chsh');
        if (n === 1) {
          stage.spawnMotePair({
            colorA: last.a,
            colorB: last.b,
            entangled: isQuantum,
            onArrive: () => audio.playLampPair(last.a, last.b),
          });
        } else {
          stage.bloomLampLeft(last.a);
          stage.bloomLampRight(last.b);
        }
      }
      render();
      requestAnimationFrame(() => stage.resize());
      return;
    }

    state.burstRunning = true;
    let remaining = n;
    let tickIdx = 0;
    const totalTicks = isQuantum ? 46 : 28;
    const baseChunk = Math.max(1, Math.ceil(n / totalTicks));

    burstTimer = setInterval(() => {
      const accel = isQuantum ? Math.min(2.2, 0.55 + tickIdx * 0.065) : 1.0;
      const k = Math.max(1, Math.min(remaining, Math.round(baseChunk * accel)));
      let last = null;
      for (let i = 0; i < k; i++) last = stepOne(true);
      remaining -= k;
      tickIdx++;

      if (remaining <= 0 && isQuantum && state.chshRun.brokenAt === null && state.chshRun.rounds < 3000) {
        remaining = 60;
      }

      const stats = computeChshS(state.chshRun);
      stage.setArenaProgress(stats.winRate, { isQuantum, rounds: state.chshRun.rounds });
      if (last) {
        stage.setDial('left', last.x, 'chsh');
        stage.setDial('right', last.y, 'chsh');
        stage.spawnMotePair({ colorA: last.a, colorB: last.b, entangled: isQuantum, duration: 0.22 });
        const evProg = Math.max(0, state.chshRun.log10B / EVIDENCE_BREAK_LOG10);
        if (state.chshRun.brokenAt === null || tickIdx % 2 === 0) audio.playRoundTick(evProg);
      }

      if (remaining <= 0) {
        clearInterval(burstTimer);
        burstTimer = null;
        state.burstRunning = false;
        if (isQuantum && state.chshRun.brokenAt !== null) state.chshSettled = true;
        if (!isQuantum && evaluateChshCard(state.chshCard).wins === 3 && state.chshRun.rounds >= 100) {
          state.wallHitBy75 = true;
        }
      }
      render();
    }, 55);
  }

  function triggerBreakthrough({ instant = false, targetRounds = 2000, midShatter = false, settled = false } = {}) {
    touchInteraction();
    state.chshMode = 'entangled';
    state.chshRun = createChshRun();
    state.chshSettled = false;
    goto(6);
    if (midShatter) {
      state.shatterBeat = true;
      stage.setWallState('intact');
      for (let i = 0; i < 1500 && state.chshRun.brokenAt === null; i++) {
        const r = sampleChshRound({ mode: 'entangled' });
        recordChshRound(state.chshRun, r);
      }
      const st = computeChshS(state.chshRun);
      stage.setArenaProgress(st.winRate, { isQuantum: true, snap: true, rounds: state.chshRun.rounds });
      stage.setWallState('shattered', { midShatter: true });
      stage.bloomLampLeft(0);
      stage.bloomLampRight(0);
      render();
      requestAnimationFrame(() => stage.resize());
    } else {
      fireChsh(targetRounds, { instant });
      if (settled) {
        state.shatterBeat = false;
        state.chshSettled = true;
        const st = computeChshS(state.chshRun);
        stage.setWallState('shattered', { settled: true });
        stage.setShowQuantumLabel(true);
        stage.setArenaProgress(st.winRate, { isQuantum: true, snap: true, rounds: state.chshRun.rounds });
        render();
        requestAnimationFrame(() => stage.resize());
      }
    }
  }

  function fireBobAlone(n = 1000, { instant = false } = {}) {
    touchInteraction();
    stopTimers();
    state.bobRun.compared = false;
    stage.setAlicePartition(true);

    const runChunk = k => {
      let last = null;
      for (let i = 0; i < k; i++) {
        const ax = state.alicePolicy === '0' ? 0 : state.alicePolicy === '1' ? 1 : cryptoInt(2);
        const r = sampleChshRound({ mode: 'entangled', x: ax });
        state.bobRun.total++;
        if (r.win) state.bobRun.wins++;
        if (state.alicePolicy === 'off') {
          state.bobRun.nOff++;
          if (r.b === 0) state.bobRun.b0WhenOff++;
        } else if (state.alicePolicy === 'random') {
          state.bobRun.nRand++;
          if (r.b === 0) state.bobRun.b0WhenRand++;
        } else if (ax === 0) {
          state.bobRun.n0++;
          if (r.b === 0) state.bobRun.b0WhenA0++;
        } else {
          state.bobRun.n1++;
          if (r.b === 0) state.bobRun.b0WhenA1++;
        }
        state.bobRun.recent.push({ b: r.b, win: r.win });
        if (state.bobRun.recent.length > 24) state.bobRun.recent.shift();
        last = r;
      }
      return last;
    };

    if (instant) {
      const last = runChunk(n);
      if (last) stage.bloomLampRight(last.b);
      render();
      requestAnimationFrame(() => stage.resize());
      return;
    }

    state.burstRunning = true;
    let remaining = n;
    const chunk = Math.max(1, Math.ceil(n / 20));
    burstTimer = setInterval(() => {
      const k = Math.min(chunk, remaining);
      const last = runChunk(k);
      remaining -= k;
      if (last) {
        stage.setDial('left', last.x, 'chsh');
        stage.setDial('right', last.y, 'chsh');
        stage.spawnMotePair({ colorA: last.a, colorB: last.b, entangled: true, duration: 0.2 });
        audio.playRoundTick(0.15);
      }
      if (remaining <= 0) {
        clearInterval(burstTimer);
        burstTimer = null;
        state.burstRunning = false;
      }
      render();
    }, 48);
  }

  function compareNotes() {
    touchInteraction();
    if (state.bobRun.total === 0) fireBobAlone(1000, { instant: true });
    stage.triggerComparePulse(() => {
      state.bobRun.compared = true;
      stage.setAlicePartition(false);
      audio.playCompareArrive();
      render();
    });
  }

  function openDepth(key) {
    touchInteraction();
    const d = DEPTH_DRAWERS[key];
    if (!d) return;
    state.depthKey = key;
    let liveExtra = '';
    if (key === 'breakthrough' && state.chshRun.rounds > 0) {
      const st = computeChshS(state.chshRun);
      const odds = state.chshRun.maxLog10B >= 6
        ? '< 1 in 1,000,000'
        : state.chshRun.maxLog10B >= 3
          ? '< 1 in 1,000'
          : `about 1 in ${Math.max(1, Math.round(Math.pow(10, Math.max(0, state.chshRun.maxLog10B)))).toLocaleString()}`;
      liveExtra = `
        <div class="depth-live">
          <div><strong>This run (${state.chshRun.rounds.toLocaleString()} rounds):</strong> ${(st.winRate * 100).toFixed(2)}% wins</div>
          <div><strong>Measured S:</strong> ${st.S.toFixed(3)} ± ${st.seS.toFixed(3)} <span class="muted">(classical ≤ 2.000 · Tsirelson 2√2 ≈ 2.828)</span></div>
          <div><strong>Chance of luck:</strong> ${odds} <span class="muted">(log₁₀ B = ${state.chshRun.log10B.toFixed(2)})</span></div>
        </div>
      `;
    }
    elDepthContent.innerHTML = `
      <h3 class="depth-title">${d.title}</h3>
      <p class="depth-plain">${d.plain}</p>
      ${liveExtra}
      <p class="depth-detail">${d.detail}</p>
      <div class="depth-math">${d.math}</div>
      <div class="depth-sources">
        <div class="depth-src-label">Sources</div>
        ${d.sources.map(s => `<div class="depth-src-item">${s}</div>`).join('')}
      </div>
    `;
    elDepthBackdrop.hidden = false;
  }

  function formatLuckChance(log10B) {
    if (log10B >= EVIDENCE_BREAK_LOG10) return { label: 'Chance of luck: < 1 in 1,000,000', cls: 'gold' };
    if (log10B >= EVIDENCE_CRACK_LOG10) return { label: 'Chance of luck: < 1 in 1,000', cls: 'warn' };
    return { label: 'Chance of luck: still possible', cls: 'low' };
  }

  function renderTopBar() {
    elBackBtn.hidden = !state.mythMode && state.step === 0;
    elResetBtn.hidden = !state.mythMode && state.step === 0;
    if (elSkipTop) elSkipTop.hidden = state.mythMode || state.step === 0 || state.step >= 5;
    if (elMythsBtn) {
      elMythsBtn.hidden = !state.mythMode && state.step === 0;
      elMythsBtn.classList.toggle('active', state.mythMode);
      elMythsBtn.textContent = state.mythMode ? '← Story' : 'Myths';
    }
    elModeSelf.classList.toggle('active', !state.teacher);
    elModeTeacher.classList.toggle('active', state.teacher);
    elSoundBtn.setAttribute('aria-pressed', String(!audio.isMuted()));
    elSoundBtn.innerHTML = audio.isMuted() ? SVG_SOUND_OFF : SVG_SOUND_ON;
    elSoundBtn.title = audio.isMuted() ? 'Sound off (tap to unmute)' : 'Sound on (tap to mute)';

    document.documentElement.classList.toggle('teacher-mode', state.teacher);
    stage.setTeacherMode(state.teacher);

    elStepDots.classList.toggle('in-myth', state.mythMode);
    if (state.mythMode) {
      const mythTabs = ['ftl', 'gloves', 'observer'];
      elStepDots.innerHTML = mythTabs.map(mt => {
        const cls = state.mythTab === mt ? 'dot active' : 'dot';
        return `<button class="${cls}" data-mythtab="${mt}" aria-label="Myth ${mt}"></button>`;
      }).join('') + `<button class="dot-myths active" id="btn-myths-mobile" aria-label="Back to story">Story</button>`;
    } else {
      elStepDots.innerHTML = Array.from({ length: STEP_COUNT }, (_, i) => {
        const cls = i === state.step ? 'dot active' : i < state.step ? 'dot done' : 'dot';
        return `<button class="${cls}" data-goto="${i}" aria-label="Step ${i + 1}"></button>`;
      }).join('') + `<button class="dot-myths" id="btn-myths-mobile" aria-label="Myth-buster challenges">Myths</button>`;
    }
  }

  function renderMythPanel() {
    const tab = state.mythTab;
    const tabsHtml = `
      <div class="myth-tabs" role="tablist" aria-label="Myth-buster challenges">
        <button class="myth-tab ${tab === 'ftl' ? 'active' : ''}" data-mythtab="ftl" role="tab">1 · Instant text</button>
        <button class="myth-tab ${tab === 'gloves' ? 'active' : ''}" data-mythtab="gloves" role="tab">2 · Gloves</button>
        <button class="myth-tab ${tab === 'observer' ? 'active' : ''}" data-mythtab="observer" role="tab">3 · Watcher</button>
      </div>
    `;
    let bodyHtml = tabsHtml;
    let footerHtml = '';

    if (tab === 'ftl') {
      const mf = state.mythFtl;
      const slots = mf.result ? mf.result.slots : null;
      const choiceLabel = c => (c === '0' ? 'Dial 0' : c === '1' ? 'Dial 1' : 'Box Off');
      const letterLabel = c => (c === '0' ? 'S' : c === '1' ? 'O' : '—');
      bodyHtml += `
        <div class="step-kicker">Myth 1 · Instant messaging</div>
        <h2 class="step-question">Text Bob faster than light.</h2>
        ${state.teacher && !mf.revealed ? `<div class="predict-banner">Predict first: when Alice taps S · O · S, can Bob read it from his lamp alone?</div>` : ''}
        <p class="step-sub">Tap any slot to set Alice's message (0, 1, or Off), send it, and try reading Bob's lamp alone.</p>

        <div class="myth-msg-row" aria-label="Alice's 3-slot message">
          ${mf.message.map((c, idx) => `
            <button class="msg-slot ${c === 'off' ? 'is-off' : ''}" data-ftlslot="${idx}">
              <span class="ms-ltr">Letter ${idx + 1} (${letterLabel(c)})</span>
              <strong class="ms-val">${choiceLabel(c)}</strong>
            </button>
          `).join('')}
        </div>

        <div class="tally-card compact">
          <div class="tally-header">
            <span>${mf.revealed ? 'Alice + Bob notes' : 'Bob\'s lamp alone (1,200 / slot)'}</span>
            <span class="myth-tag ${mf.revealed ? 'gold' : ''}">${mf.revealed ? 'Decoded from notes!' : mf.sent ? '50/50 noise' : 'Ready'}</span>
          </div>
          ${slots ? `
            <div class="ftl-slots">
              ${slots.map((s, idx) => {
                const bobLuck = formatSampleWithLuck(s.bobCoral, s.n, 0.5);
                if (!mf.revealed) {
                  return `
                    <div class="ftl-col">
                      <div class="ftl-lbl">Slot ${idx + 1}</div>
                      <div class="ftl-rate">${bobLuck.pct} ▲</div>
                      <div class="ftl-luck">luck ±${bobLuck.marginPct}</div>
                      <div class="ftl-mini-dots">
                        ${s.bobStrip.slice(0, 6).map(b => `<span class="m-glyph c${b}">${COLOR_SYMS[b]}</span>`).join('')}
                      </div>
                      <div class="ftl-noise">Can't tell</div>
                    </div>
                  `;
                }
                const matchPct = s.y1MatchRate !== null ? `${(s.y1MatchRate * 100).toFixed(0)}% match` : 'No notes';
                const isHigh = s.y1MatchRate !== null && s.y1MatchRate > 0.5;
                return `
                  <div class="ftl-col ${s.decoded !== '—' ? 'decoded' : ''}">
                    <div class="ftl-lbl">Slot ${idx + 1} · Bob ${bobLuck.pct}</div>
                    <div class="ftl-match-pct ${s.decoded === '—' ? '' : isHigh ? 'gold-txt' : 'coral-txt'}">${matchPct}</div>
                    ${s.notePairs.length > 0 ? `
                      <div class="ftl-pair-row" title="Alice & Bob paired outcomes">
                        ${s.notePairs.map(p => `<span class="p-chip ${p.match ? 'hi' : 'lo'}">${p.match ? '✓' : '≠'}</span>`).join('')}
                      </div>
                    ` : `<div class="ftl-noise">Alice off</div>`}
                    <div class="ftl-dec">${s.decoded === '—' ? 'Blank' : `→ ${letterLabel(s.decoded)} (${s.decoded})`}</div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `<div class="tally-sub">Tap "Send S · O · S" to fire 3,600 entangled pairs while Alice stays behind her screen.</div>`}
        </div>

        ${mf.revealed ? `
          <div class="callout-box">
            <strong>The message travelled in Alice's notes, not the particles.</strong> Entanglement links results, not messages.
          </div>
        ` : `
          <div class="inline-actions">
            <button class="btn-secondary strong" id="btn-myth-ftl-send">${mf.sent ? 'Send fresh burst' : 'Send S · O · S'}</button>
          </div>
        `}
      `;
      footerHtml = `
        ${!mf.sent
          ? `<button class="btn-primary" id="btn-myth-ftl-send">Send S · O · S to Bob</button>`
          : !mf.revealed
            ? `<button class="btn-primary pulse-gold" id="btn-myth-ftl-reveal">Send Alice's notes at light speed →</button>`
            : `<button class="btn-primary" data-mythtab="gloves">Next myth: Two gloves in two boxes&nbsp;→</button>`}
        <button class="btn-depth" data-depth="mythFtl">How do we know?</button>
      `;
    } else if (tab === 'gloves') {
      const mg = state.mythGloves;
      const hasSame = !!mg.sameRes;
      const hasRand = !!mg.randRes;
      const gloveLuck = hasRand ? formatSampleWithLuck(mg.randRes.gloveMatches, mg.randRes.rounds, 5 / 9) : null;
      const entLuck = hasRand ? formatSampleWithLuck(mg.randRes.entMatches, mg.randRes.rounds, 0.5) : null;

      bodyHtml += `
        <div class="step-kicker">Myth 2 · Pre-packed instructions</div>
        <h2 class="step-question">"It's just two gloves in two boxes."</h2>
        ${state.teacher && !hasRand ? `<div class="predict-banner">Predict first: gloves match 100% on same dials — what happens on random dials?</div>` : ''}
        <p class="step-sub">Like sealing a left and right glove in boxes before parting — do entangled pairs just carry fixed pre-packed cards?</p>

        ${hasRand ? `
          <div class="cmp-mini-strip">
            <span>Matching dials (1,200):</span>
            <strong>Gloves 100% · Entangled 100%</strong>
          </div>
        ` : `
          <div class="tally-card compact">
            <div class="tally-header">
              <span>1. Matching dials (1,200 pairs)</span>
              <span class="myth-tag">${hasSame ? 'Identical!' : 'Step 1'}</span>
            </div>
            <div class="cmp-pair">
              <div class="cmp-box"><span>Glove pairs</span><strong>${hasSame ? `${(mg.sameRes.gloveRate * 100).toFixed(1)}%` : '—'}</strong></div>
              <div class="cmp-box gold"><span>Entangled</span><strong>${hasSame ? `${(mg.sameRes.entRate * 100).toFixed(1)}%` : '—'}</strong></div>
            </div>
          </div>
        `}

        <div class="tally-card compact ${hasRand ? 'highlight-gold' : ''}">
          <div class="tally-header">
            <span>2. Random dials (4,800 pairs)</span>
            <span class="myth-tag ${hasRand ? 'gold' : ''}">${hasRand ? 'Gap revealed!' : 'Step 2'}</span>
          </div>
          ${hasRand ? `
            <div class="cmp-bars">
              <div class="cmp-bar-row">
                <div class="cmp-bar-lbl"><span>Best gloves (≥ 55.6%)</span><strong>${gloveLuck.pct} <small>(luck ±${gloveLuck.marginPct})</small></strong></div>
                <div class="bar-track slim"><div class="bar-fill ivory" style="width:${mg.randRes.gloveRate * 100}%"></div><div class="bar-mark" style="left:55.56%"><span>55.6%</span></div></div>
              </div>
              <div class="cmp-bar-row">
                <div class="cmp-bar-lbl"><span class="gold-txt">Entangled (50.0% avg)</span><strong class="gold-txt">${entLuck.pct} <small>(luck ±${entLuck.marginPct})</small></strong></div>
                <div class="bar-track slim"><div class="bar-fill gold" style="width:${mg.randRes.entRate * 100}%"></div><div class="bar-mark" style="left:50%"><span>50%</span></div></div>
              </div>
            </div>
          ` : `<div class="tally-sub">${hasSame ? 'On matching dials, pre-packed gloves look perfect! Now test random dials.' : 'Test matching dials first to see why the glove analogy sounds so convincing.'}</div>`}
        </div>

        ${hasRand ? `
          <div class="callout-box">
            <strong>Gloves carry fixed local instructions.</strong> No pre-packed card like that — without talking — can match entangled pairs.
          </div>
        ` : ''}
      `;
      footerHtml = `
        ${!hasSame
          ? `<button class="btn-primary" id="btn-myth-gloves-same">Test matching dials first</button>`
          : !hasRand
            ? `<button class="btn-primary pulse-gold" id="btn-myth-gloves-rand">Now test random dials&nbsp;→</button>`
            : `<button class="btn-primary" data-mythtab="observer">Next myth: Must someone watch?&nbsp;→</button>`}
        <button class="btn-depth" data-depth="mythGloves">How do we know?</button>
      `;
    } else if (tab === 'observer') {
      const mo = state.mythObserver;
      const hasHuman = !!mo.humanRes;
      const hasRec = !!mo.recorderRes;
      const hLuck = hasHuman ? formatSampleWithLuck(mo.humanRes.wins, mo.humanRes.rounds, 0.853553) : null;
      const rLuck = hasRec ? formatSampleWithLuck(mo.recorderRes.wins, mo.recorderRes.rounds, 0.853553) : null;

      bodyHtml += `
        <div class="step-kicker">Myth 3 · Human consciousness</div>
        <h2 class="step-question">"Someone has to be watching."</h2>
        ${state.teacher && !hasRec ? `<div class="predict-banner">Predict first: if we seal both lamps under dark counters with no human watching, will the score drop to 75%?</div>` : ''}
        <p class="step-sub">Run 2,000 entangled rounds watched live, then cap both lamps with sealed electronic counters and compare.</p>

        <div class="tally-card compact">
          <div class="cmp-pair">
            <div class="cmp-box ${hasHuman ? 'filled' : ''}">
              <span>Human watching</span>
              <strong>${hasHuman ? hLuck.pct : '—'}</strong>
              <small>${hasHuman ? `luck ±${hLuck.marginPct} (${mo.humanRes.wins.toLocaleString()} / 2,000)` : 'Open lamps'}</small>
            </div>
            <div class="cmp-box gold ${hasRec ? 'filled' : ''}">
              <span>Sealed recorder</span>
              <strong class="${hasRec ? 'gold-txt' : ''}">${hasRec ? rLuck.pct : '—'}</strong>
              <small>${hasRec ? `luck ±${rLuck.marginPct} (${mo.recorderRes.wins.toLocaleString()} / 2,000)` : 'No human eyes'}</small>
            </div>
          </div>
          <div class="tally-sub">
            ${hasRec
              ? `Watched live (${hLuck.pct}) vs. sealed recorder (${rLuck.pct}, luck ±${rLuck.marginPct}) — both beat 75% right around nature's 85.4% limit.`
              : hasHuman
                ? `Watched live: ${hLuck.pct} (luck ±${hLuck.marginPct}) — right around nature's 85.4% limit. Now cap both lamps with sealed recorders.`
                : 'Start with open lamps watched live, then swap to sealed dark-box counters.'}
          </div>
        </div>

        ${hasRec ? `
          <div class="callout-box">
            <strong>Electronic detectors log the same ~85.4% pattern automatically</strong> — no human eyes need to watch the lamps.
          </div>
          <div class="inline-actions">
            <button class="btn-secondary ${mo.mode === 'human' ? 'strong' : ''}" id="btn-myth-obs-human">Re-run watched</button>
            <button class="btn-secondary ${mo.mode === 'recorder' ? 'reveal-outline' : ''}" id="btn-myth-obs-rec">Re-run sealed</button>
          </div>
        ` : ''}
      `;
      footerHtml = `
        ${!hasHuman
          ? `<button class="btn-primary" id="btn-myth-obs-human">Run 2,000 (human watching)</button>`
          : !hasRec
            ? `<button class="btn-primary pulse-gold" id="btn-myth-obs-rec">Swap to sealed recorder&nbsp;→</button>`
            : `<button class="btn-primary" id="btn-exit-myths">Back to the main story</button>`}
        <button class="btn-depth" data-depth="mythObserver">How do we know?</button>
      `;
    }

    elPanelScroll.innerHTML = bodyHtml;
    elPanelFooter.innerHTML = footerHtml;
  }

  function render() {
    renderTopBar();
    const isHero = !state.mythMode && state.step === 0;
    root.classList.toggle('is-hero', isHero);
    root.classList.toggle('shatter-focus', state.shatterBeat);
    elHeroOverlay.hidden = !isHero;
    elPanel.hidden = isHero;

    if (isHero) {
      elHeroOverlay.innerHTML = `
        <h1 class="hero-headline">Two boxes. No wires.<br>Same dial, same colour.&nbsp;How?</h1>
        <div class="hero-actions">
          <button class="btn-primary" id="btn-investigate">Investigate</button>
        </div>
      `;
      return;
    }

    if (state.mythMode) {
      renderMythPanel();
      return;
    }

    let bodyHtml = '';
    let footerHtml = '';

    if (state.step === 1) {
      const tested = state.merminSameCount > 0;
      const samePct = tested ? Math.round((state.merminSameMatches / state.merminSameCount) * 100) : 0;
      bodyHtml += `
        <div class="step-kicker">Step 1 · The mystery boxes</div>
        <h2 class="step-question">Same dial, same colour. Every time.</h2>
        <p class="step-sub">Match Alice and Bob's dials and fire. Einstein thought each pair's answers must be settled before they part — like a hidden card.</p>
        <div class="dial-pair">
          <div class="dial-col">
            <div class="dial-label">Alice's dial</div>
            <div class="seg-group">
              ${[0, 1, 2].map(d => `<button class="seg-btn ${state.dialA === d ? 'active' : ''}" data-dial="left:${d}">${d + 1}</button>`).join('')}
            </div>
          </div>
          <div class="dial-col">
            <div class="dial-label">Bob's dial</div>
            <div class="seg-group">
              ${[0, 1, 2].map(d => `<button class="seg-btn ${state.dialB === d ? 'active' : ''}" data-dial="right:${d}">${d + 1}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="tally-card compact">
          <div class="tally-header">
            <span>Same-dial agreement</span>
            <span class="big-num ${tested ? 'gold-txt' : ''}">${tested ? `${samePct}%` : '—'}</span>
          </div>
          <div class="tally-sub">
            ${tested ? `${state.merminSameMatches} / ${state.merminSameCount} same colour — zero misses.` : 'Fire a burst to test if they ever disagree.'}
          </div>
        </div>
        <div class="inline-actions">
          <button class="btn-secondary" id="btn-fire-one">Fire 1 pair</button>
          ${tested ? `<button class="btn-secondary" id="btn-fire-50-same">Fire 50 more</button>` : ''}
        </div>
      `;
      footerHtml = `
        ${tested
          ? `<button class="btn-primary" data-next="2">Let the dials spin →</button>`
          : `<button class="btn-primary" id="btn-fire-50-same">Fire 50 same-dial pairs</button>`}
        <button class="btn-depth" data-depth="merminSame">How do we know?</button>
      `;
    } else if (state.step === 2) {
      const hasRun = state.merminRandCount > 0;
      const pct = hasRun ? (state.merminRandMatches / state.merminRandCount) * 100 : 0;
      bodyHtml += `
        <div class="step-kicker">Step 2 · Random dials</div>
        <h2 class="step-question">Now let both dials spin at random.</h2>
        <p class="step-sub">Fire 1,000 random pairs. Watch how often Alice and Bob flash the same colour.</p>
        ${state.teacher && !hasRun ? `<div class="predict-banner">Predict first: how often will random dials match?</div>` : ''}
        <div class="tally-card">
          <div class="tally-header">
            <span>Same colour</span>
            <span class="big-num">${hasRun ? `${pct.toFixed(1)}%` : '—'}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill gold" style="width:${hasRun ? pct : 0}%"></div>
            <div class="bar-mark" style="left:50%"><span>50%</span></div>
          </div>
          <div class="tally-sub">
            ${hasRun ? `${state.merminRandMatches.toLocaleString()} matches out of ${state.merminRandCount.toLocaleString()} random pairs` : 'Ready to fire 1,000 fresh pairs'}
          </div>
        </div>
        ${hasRun ? `
          <div class="callout-box">
            <strong>Here's the puzzle:</strong> 100% when dials match, yet <strong>~50%</strong> overall — sounds simple until you try to fake it with a hidden card.
          </div>
          <div class="inline-actions">
            <button class="btn-secondary" id="btn-fire-1000-rand" ${state.burstRunning ? 'disabled' : ''}>Fire 1,000 more</button>
          </div>
        ` : ''}
      `;
      footerHtml = `
        ${!hasRun
          ? `<button class="btn-primary" id="btn-fire-1000-rand" ${state.burstRunning ? 'disabled' : ''}>Fire 1,000 random pairs</button>`
          : `<button class="btn-primary" data-next="3">Try faking it with a hidden card →</button>`}
        <button class="btn-depth" data-depth="merminRandom">How do we know?</button>
      `;
    } else if (state.step === 3) {
      const ev = evaluateMerminCard(state.merminCard);
      const pct = (ev.rate * 100).toFixed(1);
      bodyHtml += `
        <div class="step-kicker">Step 3 · Test a hidden card</div>
        <h2 class="step-question">Could a hidden card hit 50%?</h2>
        <p class="step-sub">If hidden cards ran the boxes, 100% agreement on matching dials means both particles would carry the same card. Tap a dial to test:</p>
        <div class="card-switches">
          ${[0, 1, 2].map(i => {
            const c = state.merminCard[i];
            return `
              <button class="lamp-switch c${c}" data-mcard="${i}">
                <span class="sw-dial">Dial ${i + 1}</span>
                <span class="sw-val">${COLOR_SYMS[c]} ${COLOR_NAMES[c]}</span>
              </button>
            `;
          }).join('')}
        </div>
        <div class="grid-3x3-wrap">
          <div class="grid-axes">
            <div class="axis-bob">BOB</div>
            <div class="grid-with-alice">
              <div class="axis-alice">ALICE</div>
              <div class="grid-3x3" role="grid" aria-label="9 dial combinations">
                <div></div><div class="g-hdr">1</div><div class="g-hdr">2</div><div class="g-hdr">3</div>
                ${[0, 1, 2].map(i => `
                  <div class="g-hdr">${i + 1}</div>
                  ${[0, 1, 2].map(j => {
                    const same = ev.grid[i][j];
                    const c = state.merminCard[i];
                    return `<div class="g-cell ${same ? `match c${c}` : 'diff'}" title="${same ? 'Same colour' : 'Different colours'}">${same ? COLOR_SYMS[c] : '≠'}</div>`;
                  }).join('')}
                `).join('')}
              </div>
            </div>
            <div class="grid-micro">Each square = one Alice &amp; Bob dial pair</div>
          </div>
          <div class="grid-readout">
            <div class="big-num">${ev.matches} / 9</div>
            <div class="stat-label">${pct}% match</div>
          </div>
        </div>
        <div class="callout-box">
          <strong>Stuck at 55.6%!</strong> Every hidden card matches at least <strong>5 of 9</strong> — yet the real boxes hover near <strong>50%</strong>.
        </div>
      `;
      footerHtml = `
        <button class="btn-primary" data-next="4">No card works — peel off the casing →</button>
        <button class="btn-depth" data-depth="merminCard">How do we know?</button>
      `;
    } else if (state.step === 4 && state.bridgeOpen) {
      // Dedicated bridge beat: 3-dial boxes → 2-question 75% team game ("Same puzzle, sharper test.")
      bodyHtml += `
        <div class="step-kicker">The bridge · From 3 dials to 2 questions</div>
        <h2 class="step-question">Same puzzle, sharper test.</h2>
        <div class="bridge-diagram" role="img" aria-label="Comparison from 3 dials with a 5.6% gap to 2 questions with a bold 75% glass wall">
          <div class="br-card">
            <div class="br-badge">3 DIALS (1 · 2 · 3)</div>
            <div class="br-stat">55.6% <span>vs</span> 50%</div>
            <div class="br-note">Tiny 5.6% gap</div>
          </div>
          <div class="br-arrow" aria-hidden="true">→</div>
          <div class="br-card gold">
            <div class="br-badge gold-txt">2 QUESTIONS (0 · 1)</div>
            <div class="br-stat gold-txt">75% <span>wall</span></div>
            <div class="br-note">Can nature break through?</div>
          </div>
        </div>
        <p class="step-sub">Same boxes, simpler dials: give Alice and Bob just <strong>0</strong> or <strong>1</strong>. They win by <strong>matching</strong> — unless both get <strong>1</strong>, then they must <strong>differ</strong>.</p>
      `;
      footerHtml = `
        <button class="btn-primary" data-next="5">Play the 75% team game →</button>
        <button class="btn-depth" data-depth="chshCard">How do we know?</button>
      `;
    } else if (state.step === 4) {
      bodyHtml += `
        <div class="step-kicker">Step 4 · Inside the boxes</div>
        <h2 class="step-question">No wires. Just tilted magnets.</h2>
        <p class="step-sub">Each particle meets a tilted magnet (0°, 120°, or 240°) and flashes ▲ Coral or ● Jade. Turn Alice or Bob's dial to rotate the poles.</p>
        <div class="dial-pair">
          <div class="dial-col">
            <div class="dial-label">Alice (${MERMIN_SPIN_ANGLES[state.dialA]}°)</div>
            <div class="seg-group">
              ${[0, 1, 2].map(d => `<button class="seg-btn ${state.dialA === d ? 'active' : ''}" data-dial="left:${d}">${MERMIN_SPIN_ANGLES[d]}°</button>`).join('')}
            </div>
          </div>
          <div class="dial-col">
            <div class="dial-label">Bob (${MERMIN_SPIN_ANGLES[state.dialB]}°)</div>
            <div class="seg-group">
              ${[0, 1, 2].map(d => `<button class="seg-btn ${state.dialB === d ? 'active' : ''}" data-dial="right:${d}">${MERMIN_SPIN_ANGLES[d]}°</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="inline-actions">
          <button class="btn-secondary" id="btn-toggle-peel">${state.peeled ? 'Close casing' : 'Peel off casing'}</button>
          <button class="btn-secondary" id="btn-fire-one">Fire pair</button>
        </div>
      `;
      footerHtml = `
        <button class="btn-primary" id="btn-open-bridge">Same puzzle, sharper test →</button>
        <button class="btn-depth" data-depth="peelOff">How do we know?</button>
      `;
    } else if (state.step === 5) {
      const ev = evaluateChshCard(state.chshCard);
      const st = computeChshS(state.chshRun);
      const hasRun = state.chshRun.rounds > 0;
      const pct = hasRun ? st.winRate * 100 : 0;
      const luckInfo = formatLuckChance(state.chshRun.maxLog10B);
      const leverReady = state.teacher ? state.classVoted : state.wallHitBy75;
      const teacherFireN = 2000;

      bodyHtml += `
        ${state.teacher ? `
          <div class="teacher-pin">
            <strong>Rule:</strong> Both get 0 or 1 · <strong>Match</strong> unless both get 1 (<strong>differ</strong>) · No talking
          </div>
        ` : ''}
        <div class="step-kicker">Step 5 · The team game</div>
        <h2 class="step-question">${state.teacher ? 'Can any card beat 75% — and keep it there?' : 'Can any hidden card beat 75% — and keep it there?'}</h2>
        ${!state.teacher ? `<p class="step-sub">Same boxes, now 0 or 1: match — unless both get 1, then differ. Build the best hidden card you can.</p>` : ''}

        <div class="chsh-switches">
          <div class="sw-row">
            <span class="sw-who">Alice</span>
            <button class="mini-sw c${state.chshCard.a0}" data-ccard="a0">0 → ${COLOR_SYMS[state.chshCard.a0]} ${COLOR_NAMES[state.chshCard.a0]}</button>
            <button class="mini-sw c${state.chshCard.a1}" data-ccard="a1">1 → ${COLOR_SYMS[state.chshCard.a1]} ${COLOR_NAMES[state.chshCard.a1]}</button>
          </div>
          <div class="sw-row">
            <span class="sw-who">Bob</span>
            <button class="mini-sw c${state.chshCard.b0}" data-ccard="b0">0 → ${COLOR_SYMS[state.chshCard.b0]} ${COLOR_NAMES[state.chshCard.b0]}</button>
            <button class="mini-sw c${state.chshCard.b1}" data-ccard="b1">1 → ${COLOR_SYMS[state.chshCard.b1]} ${COLOR_NAMES[state.chshCard.b1]}</button>
          </div>
        </div>

        <div class="rule-strip" aria-label="4 question pairs">
          ${ev.tiles.map(t => `
            <span class="r-chip ${t.win ? 'win' : 'lose'}">${t.x}&amp;${t.y} ${t.win ? '✓' : '✗'}</span>
          `).join('')}
        </div>

        <div class="tally-card compact">
          <div class="tally-header">
            <span>Plan average max: ${Math.round(ev.rate * 100)}.0% (${ev.wins}/4)</span>
            <span class="big-num hero-score">${hasRun ? `${pct.toFixed(1)}%` : '—'}</span>
          </div>
          <div class="tally-sub">
            ${hasRun
              ? (() => {
                  const cLuck = formatSampleWithLuck(state.chshRun.wins, state.chshRun.rounds, ev.rate);
                  return `<strong>A lucky streak can poke past 75% — not keep it there.</strong> (${state.chshRun.wins.toLocaleString()} / ${state.chshRun.rounds.toLocaleString()} · luck ±${cLuck.marginPct})`;
                })()
              : 'Every card leaves a red ✗. Test it against the frosted 75% glass wall.'}
          </div>
          ${hasRun ? `<div class="luck-pill ${luckInfo.cls}">${luckInfo.label}</div>` : ''}
        </div>

        <div class="inline-actions">
          ${!state.teacher ? `<button class="btn-secondary" data-fire="1" ${state.burstRunning ? 'disabled' : ''}>×1</button>` : ''}
          ${!state.teacher ? `<button class="btn-secondary" data-fire="100" ${state.burstRunning ? 'disabled' : ''}>×100</button>` : ''}
          <button class="btn-secondary" data-fire="${state.teacher ? teacherFireN : 1000}" ${state.burstRunning ? 'disabled' : ''}>Fire ${state.teacher ? '2,000' : '1,000'}</button>
          ${hasRun ? `<button class="btn-clear" id="btn-clear-chsh">Clear</button>` : ''}
        </div>
      `;

      footerHtml = `
        ${leverReady
          ? `<button class="btn-primary pulse-gold" id="btn-entangled-lever">Pull lever: Entangled pairs →</button>`
          : state.teacher
            ? `<button class="btn-primary" id="btn-class-voted">The class has voted — reveal lever</button>`
            : `<button class="btn-primary" data-fire="1000" ${state.burstRunning ? 'disabled' : ''}>Fire 1,000 rounds</button>`}
        <button class="btn-depth" data-depth="chshCard">How do we know?</button>
      `;
    } else if (state.step === 6) {
      const st = computeChshS(state.chshRun);
      const qLuck = formatSampleWithLuck(state.chshRun.wins, state.chshRun.rounds, 0.853553);
      const cracked = state.chshRun.crackedAt !== null;
      const broken = state.chshRun.brokenAt !== null;
      const settled = state.chshSettled && broken;
      const luckInfo = formatLuckChance(state.chshRun.maxLog10B);

      const headline = settled
        ? 'Past the 75% wall — ~85.4%.'
        : broken
          ? 'The 75% glass wall just shattered!'
          : 'Entangled pairs vs. the 75% wall…';

      const statusText = settled
        ? `Wall shattered at round ${state.chshRun.brokenAt}. After ${state.chshRun.rounds.toLocaleString()} rounds, the score sits near nature's 85.4% quantum limit.`
        : broken
          ? `Wall shattered at round ${state.chshRun.brokenAt}! Less than a 1-in-a-million chance any hidden card did this by luck.`
          : cracked
            ? `Glass cracking at round ${state.chshRun.crackedAt} — luck ruled out past 1 in 1,000…`
            : 'Firing entangled pairs through the tilted magnets…';

      bodyHtml += `
        <div class="step-kicker">Step 6 · Breakthrough</div>
        <h2 class="step-question">${headline}</h2>
        <p class="step-sub">${statusText}</p>

        <div class="tally-card">
          <div class="tally-header">
            <span>Entangled score</span>
            <span class="big-num hero-score gold-txt">${state.chshRun.rounds > 0 ? qLuck.pct : '—'}</span>
          </div>
          <div class="tally-sub">
            ${state.chshRun.rounds > 0 ? `${state.chshRun.wins.toLocaleString()} / ${state.chshRun.rounds.toLocaleString()} wins (luck ±${qLuck.marginPct} · limit 85.4%)` : 'Starting run…'}
          </div>
          <div class="luck-pill ${luckInfo.cls}">${luckInfo.label}</div>
        </div>

        ${broken ? `
          <div class="callout-box">
            <strong>No hidden card — no plan made in advance without talking — can keep this up.</strong> Real entangled pairs in nature do.
          </div>
        ` : ''}

        <div class="inline-actions">
          <button class="btn-secondary" id="btn-refire-entangled" ${state.burstRunning || state.shatterBeat ? 'disabled' : ''}>Run fresh 2,000 rounds</button>
        </div>
      `;
      footerHtml = `
        <button class="btn-primary" data-next="7" ${state.burstRunning || state.shatterBeat ? 'disabled' : ''}>${state.shatterBeat ? 'Wall shattered…' : 'Can Alice text Bob? →'}</button>
        <button class="btn-depth" data-depth="breakthrough">How do we know?</button>
      `;
    } else if (state.step === 7) {
      const br = state.bobRun;
      const pct0 = br.n0 > 0 ? `${((br.b0WhenA0 / br.n0) * 100).toFixed(1)}%` : '—';
      const pct1 = br.n1 > 0 ? `${((br.b0WhenA1 / br.n1) * 100).toFixed(1)}%` : '—';
      const pctR = br.nRand > 0 ? `${((br.b0WhenRand / br.nRand) * 100).toFixed(1)}%` : '—';
      const pctOff = br.nOff > 0 ? `${((br.b0WhenOff / br.nOff) * 100).toFixed(1)}%` : '—';
      const curPct = state.alicePolicy === '0' ? pct0 : state.alicePolicy === '1' ? pct1 : state.alicePolicy === 'off' ? pctOff : pctR;
      const curN = state.alicePolicy === '0' ? br.n0 : state.alicePolicy === '1' ? br.n1 : state.alicePolicy === 'off' ? br.nOff : br.nRand;
      const curHits = state.alicePolicy === '0' ? br.b0WhenA0 : state.alicePolicy === '1' ? br.b0WhenA1 : state.alicePolicy === 'off' ? br.b0WhenOff : br.b0WhenRand;
      const bobLuck = formatSampleWithLuck(curHits, curN, 0.5);
      const winPct = br.total > 0 ? ((br.wins / br.total) * 100).toFixed(1) : '—';

      const dots = br.compared
        ? [...br.recent].sort((a, b) => Number(b.win) - Number(a.win))
        : br.recent;

      bodyHtml += `
        <div class="step-kicker">Step 7 · No faster-than-light texting</div>
        <h2 class="step-question">Can Alice send Bob an instant message?</h2>
        <p class="step-sub">Switch Alice behind her frosted screen and watch Bob's lamp alone. Does his 50/50 stream ever budge?</p>

        <div class="control-block">
          <div class="dial-label">Alice's box (behind the frosted screen)</div>
          <div class="seg-group four">
            <button class="seg-btn ${state.alicePolicy === '0' ? 'active' : ''}" data-apol="0">Always 0</button>
            <button class="seg-btn ${state.alicePolicy === '1' ? 'active' : ''}" data-apol="1">Always 1</button>
            <button class="seg-btn ${state.alicePolicy === 'random' ? 'active' : ''}" data-apol="random">Random</button>
            <button class="seg-btn ${state.alicePolicy === 'off' ? 'active' : ''}" data-apol="off">Off</button>
          </div>
        </div>

        <div class="tally-card compact">
          <div class="tally-header">
            <span>Bob's ▲ Coral rate</span>
            <span class="big-num">${curPct}</span>
          </div>
          <div class="tally-sub">
            ${curN > 0 ? `${curHits.toLocaleString()} / ${curN.toLocaleString()} flashes (luck ±${bobLuck.marginPct} around 50%)` : 'Tap Fire 2,000 to watch Bob\'s lamp alone.'}
          </div>
          ${dots.length > 0 ? `
            <div class="dot-strip-label">${br.compared ? `Notes combined — ${winPct}% winning pairs (gold):` : 'Bob\'s last 24 flashes (looks like pure coin flips):'}</div>
            <div class="dot-strip">
              ${dots.map(d => br.compared
                ? `<span class="h-dot ${d.win ? 'win' : 'miss'}">${d.win ? '✓' : '·'}</span>`
                : `<span class="h-dot c${d.b}">${COLOR_SYMS[d.b]}</span>`
              ).join('')}
            </div>
          ` : ''}
          <div class="bob-slots four">
            <div class="bob-slot ${br.n0 > 0 ? 'filled' : ''}"><span>A: 0</span><strong>${pct0}</strong></div>
            <div class="bob-slot ${br.n1 > 0 ? 'filled' : ''}"><span>A: 1</span><strong>${pct1}</strong></div>
            <div class="bob-slot ${br.nRand > 0 ? 'filled' : ''}"><span>A: Rand</span><strong>${pctR}</strong></div>
            <div class="bob-slot ${br.nOff > 0 ? 'filled' : ''}"><span>A: Off</span><strong>${pctOff}</strong></div>
          </div>
        </div>

        <div class="inline-actions">
          <button class="btn-secondary strong" id="btn-fire-bob" ${state.burstRunning ? 'disabled' : ''}>Fire 2,000</button>
          <button class="btn-secondary reveal-outline" id="btn-compare-notes" ${state.burstRunning ? 'disabled' : ''}>Bring notes together</button>
        </div>
      `;
      footerHtml = `
        <button class="btn-primary" data-next="8">Was this really tested? →</button>
        <button class="btn-depth" data-depth="noSignal">How do we know?</button>
      `;
    } else if (state.step === 8) {
      bodyHtml += `
        <div class="step-kicker">Step 8 · Reality's strangest proven fact</div>
        <h2 class="step-question">This isn't a trick. Real labs proved it.</h2>
        <div class="real-list">
          <div class="real-item">
            <span class="real-yr">1972 &amp; 1982</span>
            <span>Clauser and Alain Aspect tested entangled light — shattering the 75% hidden-card ceiling.</span>
          </div>
          <div class="real-item">
            <span class="real-yr">2015</span>
            <span>Labs in Delft (1.3 km apart), Vienna, and NIST closed every major loophole at once — and entanglement won again.</span>
          </div>
          <div class="real-item">
            <span class="real-yr">2022 Nobel Prize</span>
            <span>Awarded to Aspect, Clauser, and Zeilinger. Today, the same test powers quantum encryption that flags eavesdroppers.</span>
          </div>
        </div>
        <div class="inline-actions">
          <button class="btn-secondary" id="btn-play-again">Play again</button>
          <button class="btn-secondary" id="btn-switch-teacher">${state.teacher ? 'Self-guided mode' : 'Teacher mode'}</button>
        </div>
      `;
      footerHtml = `
        <button class="btn-primary pulse-gold" id="btn-open-myths">Test 3 famous myths →</button>
        <button class="btn-depth" data-depth="realWorld">How do we know?</button>
      `;
    }

    elPanelScroll.innerHTML = bodyHtml;
    elPanelFooter.innerHTML = footerHtml;
  }

  root.addEventListener('click', e => {
    const t = e.target.closest('button');
    if (!t) return;
    touchInteraction();

    if (t.id === 'btn-investigate') { audio.playDialClick(); goto(1); return; }
    if (t.id === 'btn-skip-top') { audio.playDialClick(); goto(5); return; }
    if (t.id === 'btn-myths' || t.id === 'btn-myths-mobile') {
      audio.playDialClick();
      if (state.mythMode) goto(state.step || 8);
      else openMyths(state.mythTab || 'ftl');
      return;
    }
    if (t.id === 'btn-open-myths') { audio.playDialClick(); openMyths('ftl'); return; }
    if (t.id === 'btn-exit-myths') { audio.playDialClick(); goto(8); return; }
    if (t.dataset.mythtab) { audio.playDialClick(); openMyths(t.dataset.mythtab); return; }
    if (t.dataset.ftlslot !== undefined) {
      const idx = Number(t.dataset.ftlslot);
      const order = ['0', '1', 'off'];
      const next = order[(order.indexOf(state.mythFtl.message[idx]) + 1) % order.length];
      state.mythFtl.message[idx] = next;
      state.mythFtl.sent = false;
      state.mythFtl.revealed = false;
      state.mythFtl.result = null;
      stage.setAlicePartition(true);
      audio.playDialClick();
      render();
      return;
    }
    if (t.id === 'btn-myth-ftl-send') { runMythFtlSend(); return; }
    if (t.id === 'btn-myth-ftl-reveal') { runMythFtlReveal(); return; }
    if (t.id === 'btn-myth-gloves-same') { runMythGlovesSame(); return; }
    if (t.id === 'btn-myth-gloves-rand') { runMythGlovesRandom(); return; }
    if (t.id === 'btn-myth-obs-human') { runMythObserverHuman(); return; }
    if (t.id === 'btn-myth-obs-rec') { runMythObserverRecorder(); return; }
    if (t.id === 'btn-back') {
      audio.playDialClick();
      if (state.mythMode) goto(state.step || 8);
      else if (state.bridgeOpen) goto(4);
      else if (state.step === 5) openBridge();
      else goto(state.step - 1);
      return;
    }
    if (t.id === 'btn-open-bridge') { audio.playDialClick(); openBridge(); return; }
    if (t.id === 'btn-reset' || t.id === 'btn-play-again') { audio.playDialClick(); resetAll(); return; }
    if (t.id === 'btn-sound') { audio.setMuted(!audio.isMuted()); if (!audio.isMuted()) audio.playDialClick(); renderTopBar(); return; }
    if (t.id === 'mode-self') { state.teacher = false; syncLeverVisibility({ snap: true }); audio.playDialClick(); render(); requestAnimationFrame(() => stage.resize()); return; }
    if (t.id === 'mode-teacher') { state.teacher = true; syncLeverVisibility({ snap: true }); audio.playDialClick(); render(); requestAnimationFrame(() => stage.resize()); return; }
    if (t.id === 'btn-switch-teacher') { state.teacher = !state.teacher; audio.playDialClick(); goto(0); return; }
    if (t.id === 'depth-close') { state.depthKey = null; elDepthBackdrop.hidden = true; return; }

    if (t.dataset.goto !== undefined) { audio.playDialClick(); goto(Number(t.dataset.goto)); return; }
    if (t.dataset.next !== undefined) { audio.playDialClick(); goto(Number(t.dataset.next)); return; }
    if (t.dataset.depth) { audio.playDialClick(); openDepth(t.dataset.depth); return; }

    if (t.dataset.dial) {
      const [side, idxStr] = t.dataset.dial.split(':');
      const idx = Number(idxStr);
      if (side === 'left') state.dialA = idx; else state.dialB = idx;
      stage.setDial(side, idx, 'mermin');
      stage.setStep4ActiveAngles(state.dialA, state.dialB);
      audio.playDialClick();
      if (state.step === 4 && !state.bridgeOpen) fireMerminSingle(false);
      else render();
      return;
    }

    if (t.id === 'btn-fire-one') { fireMerminSingle(false); return; }
    if (t.id === 'btn-fire-50-same') { state.dialB = state.dialA; fireMerminBatch(50, { randomDials: false }); return; }
    if (t.id === 'btn-fire-1000-rand') { fireMerminBatch(1000, { randomDials: true }); return; }

    if (t.dataset.mcard !== undefined) {
      const idx = Number(t.dataset.mcard);
      state.merminCard[idx] = state.merminCard[idx] === 0 ? 1 : 0;
      stage.setCardStrip(state.merminCard);
      const colA = state.merminCard[0];
      const colB = state.merminCard[2];
      audio.playLampPair(colA, colB);
      stage.spawnMotePair({ colorA: colA, colorB: colB, entangled: false, duration: 0.34 });
      render();
      return;
    }

    if (t.id === 'btn-toggle-peel') {
      state.peeled = !state.peeled;
      stage.setPeel(state.peeled);
      audio.playDialClick();
      render();
      return;
    }

    if (t.dataset.ccard) {
      const k = t.dataset.ccard;
      state.chshCard[k] = state.chshCard[k] === 0 ? 1 : 0;
      state.chshRun = createChshRun();
      stage.setWallState('intact');
      stage.setArenaProgress(0, { isQuantum: false, snap: true, rounds: 0 });
      audio.playDialClick();
      render();
      return;
    }

    if (t.dataset.fire) {
      const n = Number(t.dataset.fire);
      state.chshMode = 'card';
      fireChsh(n);
      return;
    }

    if (t.id === 'btn-clear-chsh') {
      state.chshRun = createChshRun();
      stage.setWallState('intact');
      stage.setArenaProgress(0, { isQuantum: false, snap: true, rounds: 0 });
      audio.playDialClick();
      render();
      return;
    }

    if (t.id === 'btn-class-voted') {
      state.classVoted = true;
      stage.setLeverRevealed(true, { snap: false }); // Smoothly rises out of the stage pedestal!
      audio.playLeverReveal();
      render();
      return;
    }

    if (t.id === 'btn-entangled-lever' || t.id === 'btn-refire-entangled') {
      audio.playDialClick();
      triggerBreakthrough({ targetRounds: 2000 });
      return;
    }

    if (t.dataset.apol) {
      state.alicePolicy = t.dataset.apol;
      audio.playDialClick();
      fireBobAlone(2000);
      return;
    }

    if (t.id === 'btn-fire-bob') { fireBobAlone(2000); return; }
    if (t.id === 'btn-compare-notes') { compareNotes(); return; }
  });

  elDepthBackdrop.addEventListener('click', e => {
    if (e.target === elDepthBackdrop) {
      state.depthKey = null;
      elDepthBackdrop.hidden = true;
    }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !elDepthBackdrop.hidden) { elDepthBackdrop.hidden = true; return; }
    if (e.key === 'ArrowRight') {
      if (state.step === 4 && !state.bridgeOpen) openBridge();
      else if (state.step < STEP_COUNT - 1) goto(state.step + 1);
    } else if (e.key === 'ArrowLeft') {
      if (state.bridgeOpen) goto(4);
      else if (state.step > 0) goto(state.step - 1);
    } else if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault(); state.teacher = !state.teacher; render();
    }
  });

  const HINTS = {
    1: 'Tap "Fire 50 same-dial pairs" to see Alice and Bob agree every time.',
    2: 'Tap "Fire 1,000 random pairs" to see how often random dials match.',
    3: 'Tap any Dial button to flip the hidden card and watch the 3×3 grid.',
    4: 'Tap 0°, 120°, or 240° to watch Alice or Bob\'s magnet rotate inside.',
    5: 'Tap "Fire 1,000 rounds" to see the best hidden card dent the frosted 75% glass.',
    7: 'Switch Alice between "Always 0" and "Always 1", then tap "Bring notes together".',
  };
  setInterval(() => {
    if (state.teacher || state.burstRunning || state.depthKey) return;
    const h = HINTS[state.step];
    if (h && performance.now() - state.lastInteract > 6500 && !state.idleHint) {
      state.idleHint = h;
      elHintPill.textContent = h;
      elHintPill.hidden = false;
    }
  }, 1000);

  goto(0);

  return {
    goto,
    openBridge,
    openMyths,
    runMythBefore() {
      if (state.mythTab === 'ftl') runMythFtlSend();
      else if (state.mythTab === 'gloves') runMythGlovesSame();
      else if (state.mythTab === 'observer') runMythObserverHuman();
    },
    runMythReveal() {
      if (state.mythTab === 'ftl') runMythFtlReveal({ instant: true });
      else if (state.mythTab === 'gloves') runMythGlovesRandom();
      else if (state.mythTab === 'observer') runMythObserverRecorder();
    },
    fire(n = 1) {
      if (state.step === 1 || (state.step === 4 && !state.bridgeOpen)) {
        if (n === 1) fireMerminSingle(false);
        else fireMerminBatch(n, { randomDials: false, instant: true });
      } else if (state.step === 2) {
        fireMerminBatch(n, { randomDials: true, instant: true });
      } else if (state.step === 5) {
        state.chshMode = 'card';
        fireChsh(n, { instant: true });
      } else if (state.step === 6) {
        state.chshMode = 'entangled';
        fireChsh(n, { instant: true });
      } else if (state.step === 7) {
        fireBobAlone(n, { instant: true });
      }
    },
    triggerBreakthrough,
    setTeacher(val) {
      state.teacher = !!val;
      if (state.teacher) state.classVoted = false;
      syncLeverVisibility({ snap: true });
      render();
      requestAnimationFrame(() => stage.resize());
    },
    setCard(card) {
      if (Array.isArray(card)) {
        state.merminCard = card.slice(0, 3);
        syncCardStageVisual();
      } else {
        state.chshCard = { ...state.chshCard, ...card };
      }
      render();
    },
    peel(val) {
      state.peeled = !!val;
      stage.setPeel(state.peeled, { snap: true });
      render();
    },
    compareNotes() {
      if (state.bobRun.total === 0) fireBobAlone(1000, { instant: true });
      state.bobRun.compared = true;
      stage.setAlicePartition(false);
      render();
    },
    openDepth,
    state,
  };
}
