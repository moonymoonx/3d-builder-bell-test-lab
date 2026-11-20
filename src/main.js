import { createStage } from './scene/stage.js';
import { createAudio } from './audio.js';
import { createApp } from './ui/app.js';

const root = document.getElementById('app');
const stageEl = document.getElementById('stage-wrap');
const loaderEl = document.getElementById('loader');

const params = new URLSearchParams(window.location.search);
const highQuality = params.has('shots') || params.get('q') === 'high';

const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const stage = createStage(stageEl, { reducedMotion: mqReduce.matches, highQuality });
mqReduce.addEventListener?.('change', e => stage.setReducedMotion(e.matches));

const audio = createAudio();
const app = createApp({ stage, audio, root });

// Expose clean scripted testing handle (G03 brief)
window.__bell = app;

// Fade out serene loading veil as soon as first WebGL frame paints
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    if (loaderEl) {
      loaderEl.classList.add('done');
      setTimeout(() => loaderEl.remove(), 420);
    }
  });
});

// Optional ?fps HUD (SPEC §5)
if (new URLSearchParams(window.location.search).has('fps')) {
  const pill = document.createElement('div');
  pill.id = 'fps-pill';
  pill.textContent = '-- fps';
  document.body.appendChild(pill);
  let frames = 0;
  let last = performance.now();
  const loop = now => {
    frames++;
    if (now - last >= 500) {
      pill.textContent = `${Math.round((frames * 1000) / (now - last))} fps`;
      frames = 0;
      last = now;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
