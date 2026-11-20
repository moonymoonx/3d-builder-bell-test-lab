// Synthesised WebAudio sound design — zero external files, unlocked on first user gesture.
// Follows STYLE.md §6: dial click, C5/G5 lamp blooms, round ticks, crack, shatter resolve chord.

export function createAudio() {
  let ctx = null;
  let muted = false;
  let noiseBuf = null;

  function ensure() {
    if (muted) return null;
    if (!ctx) {
      const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      // Prebuild a 0.15s white noise buffer for tactile clicks & glass scatter
      const len = Math.floor(ctx.sampleRate * 0.15);
      noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const ch = noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function unlock() {
    ensure();
  }

  function setMuted(val) {
    muted = !!val;
  }

  function isMuted() {
    return muted;
  }

  // Tactile rotary switch detent: 14ms filtered burst + 1.8 kHz woody ping
  function playDialClick() {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;

    const src = c.createBufferSource();
    src.buffer = noiseBuf;
    const bp = c.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1850;
    bp.Q.value = 3.2;
    const g = c.createGain();
    g.gain.setValueAtTime(0.14, now);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.018);
    src.connect(bp).connect(g).connect(c.destination);
    src.start(now);
    src.stop(now + 0.022);

    const osc = c.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.024);
    const og = c.createGain();
    og.gain.setValueAtTime(0.06, now);
    og.gain.exponentialRampToValueAtTime(0.0008, now + 0.028);
    osc.connect(og).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.032);
  }

  // Warm marimba chime: color 0 (Warm Coral ▲) = C5 (523.25 Hz), color 1 (Jade Mint ●) = G5 (783.99 Hz)
  function playLampPair(colorA, colorB) {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;
    const freqs = colorA === colorB
      ? [colorA === 0 ? 523.25 : 783.99]
      : [523.25, 783.99];
    freqs.forEach((f, idx) => {
      const t = now + idx * 0.028;
      const osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      const over = c.createOscillator();
      over.type = 'triangle';
      over.frequency.setValueAtTime(f * 2, t);

      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.09, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.34);

      const og = c.createGain();
      og.gain.setValueAtTime(0.018, t);
      og.gain.exponentialRampToValueAtTime(0.0005, t + 0.1);

      osc.connect(g).connect(c.destination);
      over.connect(og).connect(c.destination);
      osc.start(t);
      over.start(t);
      osc.stop(t + 0.36);
      over.stop(t + 0.12);
    });
  }

  // Muted woodblock pulse during 1000-round drumroll, subtly rising with evidence
  function playRoundTick(evidenceProgress = 0) {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;
    const osc = c.createOscillator();
    osc.type = 'sine';
    const base = 340 + Math.min(1, Math.max(0, evidenceProgress)) * 320;
    osc.frequency.setValueAtTime(base, now);
    osc.frequency.exponentialRampToValueAtTime(base * 0.65, now + 0.032);
    const g = c.createGain();
    g.gain.setValueAtTime(0.036, now);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.036);
    osc.connect(g).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Glass crack at B >= 10^3: crystalline high-passed snap + resonant shimmer
  function playGlassCrack() {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;

    const src = c.createBufferSource();
    src.buffer = noiseBuf;
    const hp = c.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 2800;
    const g = c.createGain();
    g.gain.setValueAtTime(0.18, now);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.08);
    src.connect(hp).connect(g).connect(c.destination);
    src.start(now);
    src.stop(now + 0.09);

    [3180, 4760].forEach((f, i) => {
      const osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.012);
      const og = c.createGain();
      og.gain.setValueAtTime(0.045, now + i * 0.012);
      og.gain.exponentialRampToValueAtTime(0.0005, now + 0.32);
      osc.connect(og).connect(c.destination);
      osc.start(now + i * 0.012);
      osc.stop(now + 0.35);
    });
  }

  // Shatter chord at B >= 10^6: brief glass cascade + warm D-major-9th resolve (D3-A3-E4-F#4)
  function playShatterChord() {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;

    // Shimmering glass scatter (5 tiny crystalline pings)
    const pings = [2640, 3520, 4180, 5280, 3120];
    pings.forEach((f, i) => {
      const t = now + i * 0.024;
      const osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      const g = c.createGain();
      g.gain.setValueAtTime(0.032, t);
      g.gain.exponentialRampToValueAtTime(0.0004, t + 0.28);
      osc.connect(g).connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    });

    // Soft glass noise burst
    const src = c.createBufferSource();
    src.buffer = noiseBuf;
    const hp = c.createBiquadFilter();
    hp.type = 'bandpass';
    hp.frequency.value = 3400;
    hp.Q.value = 1.1;
    const ng = c.createGain();
    ng.gain.setValueAtTime(0.14, now);
    ng.gain.exponentialRampToValueAtTime(0.0008, now + 0.14);
    src.connect(hp).connect(ng).connect(c.destination);
    src.start(now);
    src.stop(now + 0.15);

    // Warm deep resolve chord: D3 (146.83), A3 (220), E4 (329.63), F#4 (369.99)
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(600, now);
    lp.frequency.exponentialRampToValueAtTime(1900, now + 0.35);
    lp.frequency.exponentialRampToValueAtTime(750, now + 1.65);
    lp.connect(c.destination);

    [146.83, 220.0, 329.63, 369.99].forEach((f, i) => {
      const osc = c.createOscillator();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(f, now + 0.04);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, now + 0.04);
      g.gain.linearRampToValueAtTime(i === 0 ? 0.12 : 0.068, now + 0.22);
      g.gain.exponentialRampToValueAtTime(0.0006, now + 1.75);
      osc.connect(g).connect(lp);
      osc.start(now + 0.04);
      osc.stop(now + 1.8);
    });
  }

  // Gentle light-speed arrival ping for Compare notes
  function playCompareArrive() {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;
    [440, 659.25].forEach((f, i) => {
      const t = now + i * 0.07;
      const osc = c.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.07, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0006, t + 0.45);
      osc.connect(g).connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.48);
    });
  }

  // Mechanical brass lever rise + warm golden unlock chime (Teacher reveal lever)
  function playLeverReveal() {
    const c = ensure();
    if (!c) return;
    const now = c.currentTime;

    // Smooth rising brass hum
    const osc = c.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(196, now);
    osc.frequency.exponentialRampToValueAtTime(392, now + 0.28);
    const g = c.createGain();
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(0.08, now + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0008, now + 0.36);
    osc.connect(g).connect(c.destination);
    osc.start(now);
    osc.stop(now + 0.38);

    // Crisp mechanical latch click + warm fifth chime
    [587.33, 880.0].forEach((f, i) => {
      const t = now + 0.22 + i * 0.055;
      const ch = c.createOscillator();
      ch.type = 'sine';
      ch.frequency.setValueAtTime(f, t);
      const cg = c.createGain();
      cg.gain.setValueAtTime(0.001, t);
      cg.gain.linearRampToValueAtTime(0.075, t + 0.012);
      cg.gain.exponentialRampToValueAtTime(0.0006, t + 0.42);
      ch.connect(cg).connect(c.destination);
      ch.start(t);
      ch.stop(t + 0.45);
    });
  }

  return {
    unlock,
    setMuted,
    isMuted,
    playDialClick,
    playLampPair,
    playRoundTick,
    playGlassCrack,
    playShatterChord,
    playCompareArrive,
    playLeverReveal,
  };
}
