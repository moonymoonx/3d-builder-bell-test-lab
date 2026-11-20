import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// STYLE.md 5-colour palette
const COL_NIGHT = 0x0d1017;
const COL_BOX_SHELL = 0x262e3e;
const COL_BRASS = 0xc8a86b;
const COL_STEEL = 0xb0bccf;
const COL_IVORY = 0xf4efe6;
const COL_GOLD = 0xe6b655;
const COL_CORAL = 0xff7a6b;
const COL_JADE = 0x4fd6a8;
const COL_GLASS = 0xdce8f8;

function makeRadialTexture(innerColor, midColor, outerAlpha = 0) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  g.addColorStop(0, innerColor);
  g.addColorStop(0.45, midColor);
  g.addColorStop(1, `rgba(0,0,0,${outerAlpha})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Crisp 4-point optical crystal star sparkle sprite
function makeStarGlintTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);

  const g = ctx.createRadialGradient(64, 64, 1, 64, 64, 34);
  g.addColorStop(0, 'rgba(255,254,248,1)');
  g.addColorStop(0.32, 'rgba(255,232,168,0.75)');
  g.addColorStop(1, 'rgba(230,182,85,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);

  // Horizontal & vertical optical diffraction spikes
  for (const ang of [0, Math.PI / 2, Math.PI / 4, -Math.PI / 4]) {
    ctx.save();
    ctx.translate(64, 64);
    ctx.rotate(ang);
    const len = ang === 0 || ang === Math.PI / 2 ? 60 : 32;
    const wid = ang === 0 || ang === Math.PI / 2 ? 3.2 : 1.8;
    const lg = ctx.createLinearGradient(-len, 0, len, 0);
    lg.addColorStop(0, 'rgba(255,245,210,0)');
    lg.addColorStop(0.5, 'rgba(255,253,245,0.98)');
    lg.addColorStop(1, 'rgba(255,245,210,0)');
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.moveTo(-len, 0);
    ctx.lineTo(0, -wid);
    ctx.lineTo(len, 0);
    ctx.lineTo(0, wid);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Smooth Gaussian exponential golden bloom (ZERO hard outer circle or ring artifact!)
function makeExponentialGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(128, 128);
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      const dx = (x - 63.5) / 63.5;
      const dy = (y - 63.5) / 63.5;
      const r2 = dx * dx + dy * dy;
      const falloff = Math.exp(-r2 * 7.2) * Math.max(0, 1 - r2);
      const core = Math.exp(-r2 * 24.0);
      const idx = (y * 128 + x) * 4;
      img.data[idx] = Math.round(255 * Math.min(1, 0.92 + core * 0.08));
      img.data[idx + 1] = Math.round(255 * Math.min(1, 0.72 + core * 0.26));
      img.data[idx + 2] = Math.round(255 * Math.min(1, 0.34 + core * 0.58));
      img.data[idx + 3] = Math.round(255 * Math.min(1, falloff));
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeShadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 10, 64, 64, 62);
  g.addColorStop(0, 'rgba(4,6,11,0.75)');
  g.addColorStop(0.55, 'rgba(4,6,11,0.34)');
  g.addColorStop(1, 'rgba(4,6,11,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// Seamless dark studio spotlight pool — fades into #0D1017 well inside radius (zero curved horizon seam!)
function makeFloorPoolTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(256, 256, 10, 256, 256, 248);
  g.addColorStop(0, '#222b3d');
  g.addColorStop(0.26, '#151b27');
  g.addColorStop(0.48, '#0f131c');
  g.addColorStop(0.68, '#0d1017');
  g.addColorStop(1, '#0d1017');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeDialFaceTexture(mode = 'mermin') {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#141925';
  ctx.beginPath();
  ctx.arc(128, 128, 124, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(200,168,107,0.68)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(128, 128, 118, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(244,239,230,0.24)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(128 + Math.cos(a) * 106, 128 + Math.sin(a) * 106);
    ctx.lineTo(128 + Math.cos(a) * 114, 128 + Math.sin(a) * 114);
    ctx.stroke();
  }

  ctx.fillStyle = '#F4EFE6';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (mode === 'mermin') {
    ctx.font = '800 36px -apple-system, BlinkMacSystemFont, sans-serif';
    for (const l of [{ t: '1', deg: -90 }, { t: '2', deg: 30 }, { t: '3', deg: 150 }]) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 86, 128 + Math.sin(r) * 86);
    }
  } else {
    ctx.font = '800 46px -apple-system, BlinkMacSystemFont, sans-serif';
    for (const l of [{ t: '0', deg: -135 }, { t: '1', deg: -45 }]) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 80, 128 + Math.sin(r) * 80);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Clean precision graduated tick ring ONLY (degree numbers rendered razor-sharp in screen-space!)
function makeGraduatedRingTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(244,239,230,0.34)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 178, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2 - Math.PI / 2;
    const major = i % 12 === 0;
    ctx.strokeStyle = major ? '#E6B655' : 'rgba(244,239,230,0.24)';
    ctx.lineWidth = major ? 6 : 2;
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(a) * (major ? 164 : 172), 256 + Math.sin(a) * (major ? 164 : 172));
    ctx.lineTo(256 + Math.cos(a) * (major ? 204 : 186), 256 + Math.sin(a) * (major ? 204 : 186));
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makePoleDecalTexture(letter, bg, fg) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = fg;
  ctx.font = '800 76px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makePlaqueTexture(text) {
  const c = document.createElement('canvas');
  c.width = 360;
  c.height = 112;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#121722';
  ctx.fillRect(0, 0, 360, 112);
  ctx.strokeStyle = '#D4B26E';
  ctx.lineWidth = 7;
  ctx.strokeRect(4, 4, 352, 104);
  ctx.fillStyle = '#F7F3EC';
  ctx.font = '800 62px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 180, 58);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// High-contrast engraved brass switch base plate: CARD (left) / ENTANGLED (right), active side lit gold!
function makeLeverPlateTexture(entangled = false) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#141A26';
  ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = '#D4B26E';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 506, 122);

  // Subtle active side highlight band
  if (entangled) {
    ctx.fillStyle = 'rgba(230,182,85,0.18)';
    ctx.fillRect(216, 6, 290, 116);
  } else {
    ctx.fillStyle = 'rgba(244,239,230,0.12)';
    ctx.fillRect(6, 6, 206, 116);
  }

  ctx.fillStyle = entangled ? 'rgba(220,228,242,0.72)' : '#F7F3EC';
  ctx.font = '800 42px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CARD', 110, 66);

  ctx.fillStyle = entangled ? '#F2C15A' : 'rgba(230,182,85,0.76)';
  ctx.font = '800 40px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('ENTANGLED', 360, 66);

  ctx.strokeStyle = 'rgba(212,178,110,0.65)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(214, 22);
  ctx.lineTo(214, 106);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Frosted "luck zone" thick glass slab texture — crisp bright crystal edge on left (75%), soft frosted depth right
function makeFrostedLuckTexture(cracked = false) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 512);

  // Left-to-right frosted gradient (strong crystal face at 75% on left, softer translucent frost across luck margin)
  const g = ctx.createLinearGradient(0, 0, 256, 0);
  g.addColorStop(0.0, 'rgba(240,250,255,0.82)');
  g.addColorStop(0.16, 'rgba(205,232,255,0.44)');
  g.addColorStop(0.62, 'rgba(182,216,248,0.28)');
  g.addColorStop(1.0, 'rgba(220,238,255,0.48)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 512);

  // Subtle diagonal crystal sheen
  ctx.fillStyle = 'rgba(255,255,255,0.20)';
  ctx.beginPath();
  ctx.moveTo(0, 86); ctx.lineTo(256, 12); ctx.lineTo(256, 62); ctx.lineTo(0, 136);
  ctx.fill();
  ctx.fillStyle = 'rgba(230,182,85,0.11)';
  ctx.beginPath();
  ctx.moveTo(0, 340); ctx.lineTo(256, 260); ctx.lineTo(256, 294); ctx.lineTo(0, 374);
  ctx.fill();

  // Subtle frosted horizontal micro-grain lines
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1.5;
  for (let y = 12; y < 512; y += 14) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
  }

  // Crisp etched border
  ctx.strokeStyle = 'rgba(245,252,255,0.88)';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 250, 506);

  if (cracked) {
    const cx = 42, cy = 256;
    const branches = [
      [[cx, cy], [96, 186], [176, 118], [248, 72]],
      [[cx, cy], [110, 224], [192, 198], [250, 174]],
      [[cx, cy], [92, 336], [166, 408], [244, 470]],
      [[cx, cy], [134, 290], [218, 336], [252, 378]],
      [[cx, cy], [38, 146], [64, 52]],
      [[cx, cy], [32, 372], [58, 476]],
      [[96, 186], [110, 224], [134, 290], [92, 336]],
      [[176, 118], [192, 198], [218, 336], [166, 408]],
    ];
    ctx.strokeStyle = 'rgba(255,253,245,0.98)';
    ctx.shadowColor = '#E6B655';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 4;
    for (const pts of branches) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Fully opaque frosted architectural privacy screen (hides Alice's lamp & dial completely!)
function makePrivacyGlassBodyTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 256, 256);
  g.addColorStop(0, '#2a354b');
  g.addColorStop(0.5, '#1e2738');
  g.addColorStop(1, '#29344a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  // Crisp frosted architectural vertical flutes
  for (let x = 0; x < 256; x += 14) {
    ctx.fillStyle = 'rgba(244,239,230,0.045)';
    ctx.fillRect(x, 0, 5, 256);
    ctx.fillStyle = 'rgba(8,11,18,0.16)';
    ctx.fillRect(x + 6, 0, 2, 256);
  }
  // Soft diagonal frost specular band
  ctx.fillStyle = 'rgba(230,242,255,0.08)';
  ctx.beginPath();
  ctx.moveTo(0, 74); ctx.lineTo(256, 14); ctx.lineTo(256, 68); ctx.lineTo(0, 128);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Front-only etched privacy plate "ALICE — HIDDEN" (zero back-face double text!)
function makePrivacyLabelTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 104;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(13,16,23,0.74)';
  ctx.fillRect(0, 0, 512, 104);
  ctx.strokeStyle = 'rgba(200,168,107,0.82)';
  ctx.lineWidth = 5;
  ctx.strokeRect(3, 3, 506, 98);
  ctx.fillStyle = '#F4EFE6';
  ctx.font = '800 42px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ALICE — HIDDEN', 256, 54);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeLampBadgeTexture(symbol, hexColor) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(13,16,23,0.86)';
  ctx.beginPath();
  ctx.arc(64, 64, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = hexColor;
  ctx.lineWidth = 5.5;
  ctx.stroke();
  ctx.fillStyle = hexColor;
  ctx.font = '700 44px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, 64, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeCardStripTexture(cardArr = [0, 0, 1]) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 300;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#F7F2E8';
  ctx.fillRect(0, 0, 256, 300);
  ctx.strokeStyle = '#C8A86B';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 244, 288);

  ctx.fillStyle = '#141925';
  ctx.font = '800 28px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HIDDEN CARD', 128, 38);

  for (let i = 0; i < 3; i++) {
    const isCoral = cardArr[i] === 0;
    ctx.fillStyle = isCoral ? '#FF7A6B' : '#4FD6A8';
    ctx.fillRect(24, 68 + i * 72, 208, 56);
    ctx.fillStyle = '#0D1017';
    ctx.font = '800 38px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(`${i + 1}  ${isCoral ? '▲' : '●'}`, 128, 97 + i * 72);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Build a razor-thin asymmetric beveled crystal glass splinter BufferGeometry with per-vertex edge factor!
function makeCrystalShardGeometry() {
  // Asymmetric sharp pane-glass splinter vertices (front & back faces + beveled rim walls)
  const f = [
    [-0.08, -0.15, 0.008],
    [0.095, -0.05, 0.008],
    [0.012, 0.19, 0.008],
    [-0.075, 0.06, 0.008],
  ];
  const b = f.map(([x, y]) => [x * 0.86, y * 0.86, -0.008]);
  // Center interior point (aEdge = 0.0) so face centers stay crystal-clear while razor edges gleam!
  const cf = [0.002, 0.01, 0.011];
  const cb = [0.002, 0.01, -0.011];

  const pos = [];
  const edge = [];

  const pushTri = (p0, e0, p1, e1, p2, e2) => {
    pos.push(...p0, ...p1, ...p2);
    edge.push(e0, e1, e2);
  };

  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    // Front face fan from clear center to bright rim
    pushTri(cf, 0.0, f[i], 1.0, f[j], 1.0);
    // Back face fan
    pushTri(cb, 0.0, b[j], 1.0, b[i], 1.0);
    // Beveled glass edge wall (full razor edge luminance!)
    pushTri(f[i], 1.0, b[i], 1.0, b[j], 1.0);
    pushTri(f[i], 1.0, b[j], 1.0, f[j], 1.0);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('aEdge', new THREE.Float32BufferAttribute(edge, 1));
  geo.computeVertexNormals();
  return geo;
}

// Custom optical Fresnel + razor-rim + golden-backlight crystal shader (works identically on WebGL & SwiftShader!)
function makeCrystalShardMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uOpacity: { value: 1.0 },
      uBurstPos: { value: new THREE.Vector3(1.45, 2.58, -1.45) },
      uFlash: { value: 1.0 },
    },
    vertexShader: `
      attribute float aEdge;
      varying vec3 vNormalW;
      varying vec3 vWorldPos;
      varying float vEdge;
      varying vec3 vTint;

      void main() {
        vEdge = aEdge;
        #ifdef USE_INSTANCING_COLOR
          vTint = instanceColor;
        #else
          vTint = vec3(0.84, 0.94, 1.0);
        #endif
        mat4 worldMat = modelMatrix;
        #ifdef USE_INSTANCING
          worldMat = modelMatrix * instanceMatrix;
        #endif
        vec4 wp = worldMat * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vNormalW = normalize(mat3(worldMat) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      uniform vec3 uBurstPos;
      uniform float uFlash;
      varying vec3 vNormalW;
      varying vec3 vWorldPos;
      varying float vEdge;
      varying vec3 vTint;

      void main() {
        vec3 N = normalize(vNormalW);
        vec3 V = normalize(cameraPosition - vWorldPos);
        if (!gl_FrontFacing) N = -N;

        // Tinted refractive crystal body + directional specular thin beveled edges (NO uniform flat white sticker outlines!)
        float ndotv = clamp(abs(dot(N, V)), 0.0, 1.0);
        float fresnel = pow(1.0 - ndotv, 2.35);

        vec3 Lkey = normalize(vec3(0.42, 0.85, 0.58));
        vec3 Lgold = normalize(uBurstPos - vWorldPos + vec3(-0.18, 0.06, -0.25));
        vec3 Lrim = normalize(vec3(-0.65, 0.45, -0.6));

        vec3 Hkey = normalize(Lkey + V);
        vec3 Hgold = normalize(Lgold + V);
        vec3 Hrim = normalize(Lrim + V);

        float specKey = pow(max(dot(N, Hkey), 0.0), 56.0);
        float specGold = pow(max(dot(N, Hgold), 0.0), 14.0);
        float specRim = pow(max(dot(N, Hrim), 0.0), 32.0);

        // Ultra-thin light-modulated edge catch (only lit bevels sparkle, never flat uniform white outline!)
        float edgeCatch = smoothstep(0.84, 1.0, vEdge) * (0.28 + 0.72 * max(dot(N, Lkey), max(dot(N, Lgold), 0.0)));

        // Subtle refractive body tint with warm golden caustic transmission near breach
        float distBurst = length(vWorldPos - uBurstPos);
        float caustic = exp(-distBurst * 0.75) * (0.45 + 0.55 * uFlash);
        vec3 glassBody = mix(vTint * vec3(0.54, 0.78, 0.98), vec3(0.98, 0.80, 0.42), caustic * 0.55);
        vec3 goldSpec = vec3(1.0, 0.84, 0.48);
        vec3 iceWhite = vec3(0.98, 0.99, 1.0);

        vec3 col = glassBody * (0.42 + 0.65 * fresnel);
        col += goldSpec * (specGold * (1.05 + 0.55 * uFlash) + edgeCatch * 0.46 * (0.5 + 0.5 * caustic));
        col += iceWhite * (specKey * 1.35 + specRim * 0.55 + edgeCatch * 0.34);

        // Translucent tinted glass interior (0.24..0.44) + gleaming directional facets & thin bevel sparkle
        float alpha = clamp(0.22 + fresnel * 0.42 + edgeCatch * 0.46 + specKey * 0.78 + specGold * 0.45, 0.0, 0.94);
        gl_FragColor = vec4(col, alpha * uOpacity);
      }
    `,
  });
}

export function createStage(container, { reducedMotion = false, highQuality = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  let targetDpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(targetDpr);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Crisp screen-space projected stage label overlay (never blurry, never clipped by 3D geometry!)
  const labelLayer = document.createElement('div');
  labelLayer.id = 'stage-labels';
  labelLayer.setAttribute('aria-hidden', 'true');
  container.appendChild(labelLayer);

  function createStageLabel(cls, html) {
    const el = document.createElement('div');
    el.className = `st-lbl ${cls}`;
    el.innerHTML = html;
    el.hidden = true;
    labelLayer.appendChild(el);
    return el;
  }

  const lbl75 = createStageLabel('st-limit st-75', '<strong>75%</strong><span>PLAN LIMIT</span>');
  const lbl85 = createStageLabel('st-limit st-85', '<strong>85.4%</strong><span>QUANTUM LIMIT</span>');
  const angleLabels = {
    left: [
      createStageLabel('st-ang', '0°'),
      createStageLabel('st-ang', '120°'),
      createStageLabel('st-ang', '240°'),
    ],
    right: [
      createStageLabel('st-ang', '0°'),
      createStageLabel('st-ang', '120°'),
      createStageLabel('st-ang', '240°'),
    ],
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COL_NIGHT);
  scene.fog = new THREE.FogExp2(COL_NIGHT, 0.04);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.045).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.68;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 70);
  camera.position.set(0, 2.5, 8.5);
  camera.lookAt(0, 0.85, 0);

  const hemi = new THREE.HemisphereLight(0x8aa8de, 0x121724, 0.74);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xfff3df, 2.0);
  keyLight.position.set(3.2, 7.6, 5.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 22;
  keyLight.shadow.camera.left = -6;
  keyLight.shadow.camera.right = 6;
  keyLight.shadow.camera.top = 6;
  keyLight.shadow.camera.bottom = -6;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.radius = 4;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x789ce0, 1.12);
  rimLight.position.set(-4.5, 4.4, -5.0);
  scene.add(rimLight);

  // Seamless dark velvet studio floor
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(28, 64),
    new THREE.MeshStandardMaterial({
      map: makeFloorPoolTexture(),
      roughness: 0.92,
      metalness: 0.04,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const shadowTex = makeShadowTexture();
  const glowGoldTex = makeRadialTexture('rgba(255,244,210,1)', 'rgba(230,182,85,0.52)');
  const glowIvoryTex = makeRadialTexture('rgba(255,252,245,0.95)', 'rgba(244,239,230,0.34)');
  const glowCoralTex = makeRadialTexture('rgba(255,148,132,0.92)', 'rgba(255,95,78,0.36)');
  const glowJadeTex = makeRadialTexture('rgba(128,245,204,0.92)', 'rgba(54,205,152,0.36)');
  const starGlintTex = makeStarGlintTexture();
  const expGlowTex = makeExponentialGlowTexture();
  const badgeCoralTex = makeLampBadgeTexture('▲', '#FF7A6B');
  const badgeJadeTex = makeLampBadgeTexture('●', '#4FD6A8');
  const dialMerminTex = makeDialFaceTexture('mermin');
  const dialChshTex = makeDialFaceTexture('chsh');
  const graduatedRingTex = makeGraduatedRingTexture();
  const poleNTex = makePoleDecalTexture('N', '#D99B4E', '#0D1017');
  const poleSTex = makePoleDecalTexture('S', '#90A2BE', '#0D1017');

  const brassMat = new THREE.MeshStandardMaterial({ color: COL_BRASS, roughness: 0.28, metalness: 0.82 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.52, metalness: 0.45 });
  const steelMat = new THREE.MeshStandardMaterial({ color: COL_STEEL, roughness: 0.28, metalness: 0.76 });
  const northPoleMat = new THREE.MeshStandardMaterial({ color: 0xd99b4e, roughness: 0.32, metalness: 0.7 });
  const southPoleMat = new THREE.MeshStandardMaterial({ color: 0x8ea0bc, roughness: 0.32, metalness: 0.72 });

  // ---- Central Quantum Source + Labeled 3D Brass Entanglement Switch Lever ----
  const sourceGroup = new THREE.Group();
  sourceGroup.position.set(0, 0, 0.15);
  scene.add(sourceGroup);

  const srcShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.75, 1.75),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  );
  srcShadow.rotation.x = -Math.PI / 2;
  srcShadow.position.y = 0.005;
  sourceGroup.add(srcShadow);

  const srcPedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.54, 0.28, 32), darkMetalMat);
  srcPedestal.position.y = 0.14;
  srcPedestal.castShadow = true;
  srcPedestal.receiveShadow = true;
  sourceGroup.add(srcPedestal);

  const srcStem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.44, 20), brassMat);
  srcStem.position.y = 0.46;
  sourceGroup.add(srcStem);

  const gimbalOuter = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.028, 16, 48), brassMat);
  gimbalOuter.position.y = 0.96;
  gimbalOuter.castShadow = true;
  sourceGroup.add(gimbalOuter);

  const gimbalInner = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.02, 16, 40), steelMat);
  gimbalInner.position.y = 0.96;
  sourceGroup.add(gimbalInner);

  const coreMat = new THREE.MeshStandardMaterial({
    color: COL_GOLD,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 1.9,
    roughness: 0.2,
    metalness: 0.1,
  });
  const sourceCore = new THREE.Mesh(new THREE.SphereGeometry(0.148, 28, 28), coreMat);
  sourceCore.position.y = 0.96;
  sourceGroup.add(sourceCore);

  const sourceHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowGoldTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    })
  );
  sourceHalo.position.y = 0.96;
  sourceHalo.scale.set(1.28, 1.28, 1);
  sourceGroup.add(sourceHalo);

  const sourcePoint = new THREE.PointLight(COL_GOLD, 1.8, 6.2, 2);
  sourcePoint.position.set(0, 0.96, 0.25);
  sourceGroup.add(sourcePoint);

  // Step 3 visible Hidden-Card Ticket seated in a small brushed-brass easel forward & BELOW the gimbal ring!
  let cardStripTex = makeCardStripTexture([0, 0, 1]);
  const cardDisplayMat = new THREE.MeshStandardMaterial({
    map: cardStripTex,
    roughness: 0.36,
    metalness: 0.04,
    emissive: new THREE.Color(0x3a3428),
    emissiveIntensity: 0.42,
  });
  const cardStandGroup = new THREE.Group();
  cardStandGroup.position.set(0, 0.0, 1.08);
  cardStandGroup.visible = false;
  sourceGroup.add(cardStandGroup);

  const cardStandBase = new THREE.Mesh(new RoundedBoxGeometry(0.66, 0.06, 0.24, 2, 0.02), darkMetalMat);
  cardStandBase.position.y = 0.03;
  cardStandGroup.add(cardStandBase);
  const cardStandLip = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.04, 0.04), brassMat);
  cardStandLip.position.set(0, 0.07, 0.08);
  cardStandGroup.add(cardStandLip);

  const cardDisplay = new THREE.Mesh(new RoundedBoxGeometry(0.56, 0.64, 0.026, 2, 0.01), cardDisplayMat);
  cardDisplay.position.set(0, 0.36, -0.02);
  cardDisplay.rotation.x = -0.22;
  cardStandGroup.add(cardDisplay);

  // Subtle flush matte-brass plinth cap shown in Teacher mode BEFORE "The class has voted — reveal lever"
  const leverCap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.05, 28), darkMetalMat);
  leverCap.position.set(0, 0.025, 0.92);
  leverCap.visible = false;
  sourceGroup.add(leverCap);
  const leverCapRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.014, 10, 28), brassMat);
  leverCapRing.rotation.x = Math.PI / 2;
  leverCapRing.position.y = 0.028;
  leverCap.add(leverCapRing);

  // Heroic Brushed-Brass Laboratory Switch Lever — retracted/hidden in Teacher mode until class votes!
  const leverMount = new THREE.Group();
  leverMount.position.set(0, 0.12, 0.92);
  leverMount.visible = false;
  sourceGroup.add(leverMount);

  const leverBase = new THREE.Mesh(new RoundedBoxGeometry(1.24, 0.24, 0.36, 4, 0.04), darkMetalMat);
  leverBase.castShadow = true;
  leverMount.add(leverBase);

  // High-contrast engraved CARD / ENTANGLED angled brass nameplate (illuminates active side in gold!)
  const leverPlateCardTex = makeLeverPlateTexture(false);
  const leverPlateEntTex = makeLeverPlateTexture(true);
  const leverPlateMat = new THREE.MeshStandardMaterial({ map: leverPlateCardTex, roughness: 0.34, metalness: 0.16 });
  const leverPlateFace = new THREE.Mesh(new THREE.PlaneGeometry(1.16, 0.27), leverPlateMat);
  leverPlateFace.rotation.x = -0.36;
  leverPlateFace.position.set(0, 0.03, 0.20);
  leverMount.add(leverPlateFace);

  const leverCollarMat = new THREE.MeshStandardMaterial({
    color: COL_GOLD,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 0.35,
    roughness: 0.25,
    metalness: 0.8,
  });
  const leverCollar = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.024, 12, 28), leverCollarMat);
  leverCollar.rotation.x = Math.PI / 2;
  leverCollar.position.y = 0.11;
  leverMount.add(leverCollar);

  const leverPivot = new THREE.Group();
  leverPivot.position.set(0, 0.10, 0);
  leverMount.add(leverPivot);

  const leverShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.040, 0.44, 18), brassMat);
  leverShaft.position.y = 0.22;
  leverPivot.add(leverShaft);

  const leverKnobMat = new THREE.MeshStandardMaterial({
    color: COL_IVORY,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 0.45,
    roughness: 0.18,
    metalness: 0.35,
  });
  const leverKnob = new THREE.Mesh(new THREE.SphereGeometry(0.105, 24, 24), leverKnobMat);
  leverKnob.position.y = 0.46;
  leverPivot.add(leverKnob);

  const leverGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowGoldTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.35,
    })
  );
  leverGlow.position.y = 0.46;
  leverGlow.scale.set(0.58, 0.58, 1);
  leverPivot.add(leverGlow);

  let leverTargetAngle = 0.58;
  let leverCurrentAngle = 0.58;

  // ---- Mystery Box Builder (Alice left, Bob right) ----
  function createMysteryBox(side, labelText) {
    const group = new THREE.Group();
    const xPos = side === 'left' ? -2.38 : 2.38;
    group.position.set(xPos, 0, 0.15);
    scene.add(group);

    const sh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.55, 2.25),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = 0.005;
    group.add(sh);

    const footMat = new THREE.MeshStandardMaterial({
      color: 0x181e29,
      roughness: 0.65,
      metalness: 0.3,
      transparent: true,
      opacity: 1.0,
    });
    const footGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.06, 16);
    for (const fx of [-0.56, 0.56]) {
      for (const fz of [-0.46, 0.46]) {
        const foot = new THREE.Mesh(footGeo, footMat);
        foot.position.set(fx, 0.03, fz);
        group.add(foot);
      }
    }

    const shellGeo = new RoundedBoxGeometry(1.62, 1.24, 1.40, 5, 0.14);
    const shellMat = new THREE.MeshStandardMaterial({
      color: COL_BOX_SHELL,
      roughness: 0.74,
      metalness: 0.16,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.position.y = 0.68;
    shell.castShadow = true;
    shell.receiveShadow = true;
    group.add(shell);

    // Crisp architectural glass cutaway ghost shell with fine warm-ivory rim-edge outline
    const ghostShellMat = new THREE.MeshPhysicalMaterial({
      color: 0xbcd4f2,
      roughness: 0.1,
      metalness: 0.08,
      transparent: true,
      opacity: 0.055,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    const ghostShell = new THREE.Mesh(shellGeo, ghostShellMat);
    ghostShell.position.copy(shell.position);
    ghostShell.visible = false;
    group.add(ghostShell);

    const edgesMat = new THREE.LineBasicMaterial({
      color: COL_IVORY,
      transparent: true,
      opacity: 0.54,
      depthWrite: false,
    });
    const shellEdges = new THREE.LineSegments(new THREE.EdgesGeometry(shellGeo, 20), edgesMat);
    shellEdges.position.copy(shell.position);
    shellEdges.visible = false;
    group.add(shellEdges);

    const port = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.035, 14, 32), brassMat);
    port.rotation.y = Math.PI / 2;
    port.position.set(side === 'left' ? 0.81 : -0.81, 0.96, 0);
    group.add(port);

    // ---- Internal Tilted Magnet Assembly (compact etched markers hugging outer ring, zero collar/plaque overlap!) ----
    const magnetRoot = new THREE.Group();
    magnetRoot.position.set(0, 0.65, 0.10);
    magnetRoot.visible = false;
    group.add(magnetRoot);

    const degreeDisc = new THREE.Mesh(
      new THREE.PlaneGeometry(1.06, 1.06),
      new THREE.MeshBasicMaterial({ map: graduatedRingTex, transparent: true, opacity: 0.95, depthWrite: false })
    );
    degreeDisc.position.z = -0.14;
    magnetRoot.add(degreeDisc);

    // Tight etched degree marker anchors: 0° safely below lamp collar, 120°/240° hugging ring inside box bounds!
    const angleAnchors = [
      { x: 0.20, y: 0.43 },   // 0° tucked cleanly beside top gold tick (never covers brass lamp collar!)
      { x: 0.52, y: -0.22 },  // 120° hugging lower-right tick inside box bounds
      { x: -0.52, y: -0.22 }, // 240° hugging lower-left tick inside box bounds
    ].map(pt => {
      const obj = new THREE.Object3D();
      obj.position.set(pt.x, pt.y, 0.24);
      magnetRoot.add(obj);
      return obj;
    });

    const magnetRotor = new THREE.Group();
    magnetRoot.add(magnetRotor);

    const rotorRing = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.02, 12, 42), brassMat);
    magnetRotor.add(rotorRing);

    const northShoe = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.085, 0.16, 6), northPoleMat);
    northShoe.position.set(0, 0.19, 0);
    magnetRotor.add(northShoe);

    const badgeN = new THREE.Mesh(
      new THREE.PlaneGeometry(0.135, 0.135),
      new THREE.MeshBasicMaterial({ map: poleNTex })
    );
    badgeN.position.set(0, 0.19, 0.138);
    magnetRotor.add(badgeN);

    const southShoe = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.14, 0.16, 6), southPoleMat);
    southShoe.position.set(0, -0.19, 0);
    magnetRotor.add(southShoe);

    const badgeS = new THREE.Mesh(
      new THREE.PlaneGeometry(0.135, 0.135),
      new THREE.MeshBasicMaterial({ map: poleSTex })
    );
    badgeS.position.set(0, -0.19, 0.138);
    magnetRotor.add(badgeS);

    const axisStem = new THREE.Mesh(
      new THREE.BoxGeometry(0.028, 0.28, 0.028),
      new THREE.MeshBasicMaterial({ color: COL_GOLD, transparent: true, opacity: 0.85 })
    );
    magnetRotor.add(axisStem);

    const deflectFlash = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowGoldTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0,
      })
    );
    deflectFlash.scale.set(0.52, 0.52, 1);
    magnetRoot.add(deflectFlash);

    // ---- Front Brushed-Brass Rotary Dial ----
    const dialGroup = new THREE.Group();
    dialGroup.position.set(0, 0.64, 0.71);
    group.add(dialGroup);

    const dialBezel = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.036, 14, 40), brassMat);
    dialGroup.add(dialBezel);

    const dialFaceMat = new THREE.MeshStandardMaterial({
      map: dialMerminTex,
      roughness: 0.55,
      metalness: 0.1,
    });
    const dialFace = new THREE.Mesh(new THREE.CircleGeometry(0.325, 36), dialFaceMat);
    dialFace.position.z = 0.008;
    dialGroup.add(dialFace);

    const dialKnob = new THREE.Group();
    dialKnob.position.z = 0.04;
    dialGroup.add(dialKnob);

    const knobBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.09, 28), brassMat);
    knobBody.rotation.x = Math.PI / 2;
    dialKnob.add(knobBody);

    const knobPointer = new THREE.Mesh(
      new THREE.BoxGeometry(0.034, 0.14, 0.03),
      new THREE.MeshStandardMaterial({ color: COL_IVORY, emissive: new THREE.Color(COL_IVORY), emissiveIntensity: 0.35 })
    );
    knobPointer.position.set(0, 0.06, 0.04);
    dialKnob.add(knobPointer);

    // ---- Top Blown-Glass Dome Lamp (Rich saturated Coral/Jade!) ----
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.34, 0.10, 32), brassMat);
    lampBase.position.y = 1.32;
    group.add(lampBase);

    const lampMat = new THREE.MeshPhysicalMaterial({
      color: 0xd0d8e4,
      emissive: new THREE.Color(0x242c3c),
      emissiveIntensity: 0.32,
      roughness: 0.26,
      metalness: 0.0,
      clearcoat: 0.78,
      clearcoatRoughness: 0.18,
    });
    const lampDome = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65), lampMat);
    lampDome.position.y = 1.35;
    group.add(lampDome);

    const lampHalo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowIvoryTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.0,
      })
    );
    lampHalo.position.set(0, 1.52, 0);
    lampHalo.scale.set(1.16, 1.16, 1);
    group.add(lampHalo);

    // Tightened cleanly above lamp dome (y = 1.84) so it NEVER touches the elevated score gallery (BEAM_Y = 2.58)!
    const lampSymbol = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: badgeCoralTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.0,
      })
    );
    lampSymbol.position.set(0, 1.84, 0);
    lampSymbol.scale.set(0.38, 0.38, 1);
    group.add(lampSymbol);

    const lampLight = new THREE.PointLight(COL_IVORY, 0, 3.8, 2);
    lampLight.position.set(0, 1.7, 0.35);
    group.add(lampLight);

    // Myth 3: Sleek Brushed-Brass Sealed Time-Tagger Recorder Hood (caps lamp dome when "Sealed recorder" is active!)
    const recorderHood = new THREE.Group();
    recorderHood.position.set(0, 1.48, 0);
    recorderHood.visible = false;
    group.add(recorderHood);

    const hoodCap = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.36, 32), darkMetalMat);
    hoodCap.castShadow = true;
    recorderHood.add(hoodCap);
    const hoodRim = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.022, 12, 32), brassMat);
    hoodRim.rotation.x = Math.PI / 2;
    hoodRim.position.y = -0.17;
    recorderHood.add(hoodRim);
    const hoodTop = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.05, 32), brassMat);
    hoodTop.position.y = 0.19;
    recorderHood.add(hoodTop);
    const recLedMat = new THREE.MeshStandardMaterial({
      color: 0xff9a3c,
      emissive: new THREE.Color(0xff7a22),
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });
    const recLed = new THREE.Mesh(new THREE.SphereGeometry(0.036, 16, 16), recLedMat);
    recLed.position.set(0, 0.04, 0.34);
    recorderHood.add(recLed);

    // Perspective-grounded matte-brass angled museum easel nameplate (nudged cleanly forward of dial rim!)
    const plaqueGroup = new THREE.Group();
    plaqueGroup.position.set(0, 0.0, 1.15);
    plaqueGroup.visible = false;
    group.add(plaqueGroup);

    const plaqueBase = new THREE.Mesh(new RoundedBoxGeometry(1.12, 0.06, 0.32, 2, 0.02), darkMetalMat);
    plaqueBase.position.y = 0.03;
    plaqueBase.receiveShadow = true;
    plaqueGroup.add(plaqueBase);

    const plaqueBoard = new THREE.Mesh(new RoundedBoxGeometry(1.04, 0.34, 0.04, 2, 0.015), darkMetalMat);
    plaqueBoard.rotation.x = -0.46;
    plaqueBoard.position.set(0, 0.19, 0.01);
    plaqueGroup.add(plaqueBoard);

    const plaqueFace = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0, 0.31),
      new THREE.MeshStandardMaterial({ map: makePlaqueTexture(labelText), roughness: 0.42, metalness: 0.22 })
    );
    plaqueFace.rotation.x = -0.46;
    plaqueFace.position.set(0, 0.20, 0.034);
    plaqueGroup.add(plaqueFace);

    return {
      group,
      xPos,
      footMat,
      shell,
      shellMat,
      ghostShell,
      ghostShellMat,
      shellEdges,
      edgesMat,
      magnetRoot,
      magnetRotor,
      angleAnchors,
      deflectFlash,
      deflectAge: 1,
      dialGroup,
      dialFaceMat,
      dialKnob,
      lampMat,
      lampHalo,
      lampSymbol,
      lampLight,
      recorderHood,
      recLedMat,
      plaqueGroup,
      targetDialRad: 0,
      currentDialRad: 0,
      targetMagRad: 0,
      currentMagRad: 0,
      lampBloom: 0,
      lampColor: -1,
      dimmed: false,
    };
  }

  const boxLeft = createMysteryBox('left', 'ALICE');
  const boxRight = createMysteryBox('right', 'BOB');

  // ---- Step 7 Architectural Frosted Privacy Screen DIRECTLY IN FRONT OF ALICE ----
  // Veils Alice's dial & lamp from viewer/Bob while keeping the particle beam path 100% open!
  const partitionGroup = new THREE.Group();
  partitionGroup.position.set(-2.38, 0, 1.04);
  partitionGroup.visible = false;
  scene.add(partitionGroup);

  const partBase = new THREE.Mesh(new RoundedBoxGeometry(2.26, 0.10, 0.24, 2, 0.02), darkMetalMat);
  partBase.position.y = 0.05;
  partitionGroup.add(partBase);

  const partFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.18, 0.06), brassMat);
  partFrameL.position.set(-1.08, 1.15, 0);
  partitionGroup.add(partFrameL);
  const partFrameR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.18, 0.06), brassMat);
  partFrameR.position.set(1.08, 1.15, 0);
  partitionGroup.add(partFrameR);
  const partFrameTop = new THREE.Mesh(new THREE.BoxGeometry(2.22, 0.06, 0.08), brassMat);
  partFrameTop.position.set(0, 2.24, 0);
  partitionGroup.add(partFrameTop);

  // Fully opaque fluted frosted glass — hides Alice's lamp & dial completely behind ALICE — HIDDEN!
  const partGlass = new THREE.Mesh(
    new THREE.BoxGeometry(2.10, 2.12, 0.045),
    new THREE.MeshStandardMaterial({
      map: makePrivacyGlassBodyTexture(),
      color: 0xdce8fa,
      roughness: 0.42,
      metalness: 0.08,
      transparent: false,
      opacity: 1.0,
    })
  );
  partGlass.position.y = 1.15;
  partitionGroup.add(partGlass);

  // Crisp FrontSide-only etched privacy plaque on upper frosted glass (zero mirrored back-face echo!)
  const partLabelPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.54, 0.31),
    new THREE.MeshBasicMaterial({ map: makePrivacyLabelTexture(), transparent: true, side: THREE.FrontSide })
  );
  partLabelPlane.position.set(0, 1.88, 0.025);
  partitionGroup.add(partLabelPlane);

  let partitionTargetY = 0;
  let partitionCurrentY = 0;

  // ---- Grounded Architectural Light-Beam Score Gallery + Thick Frosted "Luck Zone" Glass Wall ----
  const arenaGroup = new THREE.Group();
  arenaGroup.position.set(0, 0, -1.45);
  arenaGroup.visible = false;
  scene.add(arenaGroup);

  const BEAM_Y = 2.58; // Elevated cleanly ABOVE both floating ▲/● lamp badges (zero collision!)
  const BAR_LEN = 5.8;
  const BAR_X0 = -BAR_LEN / 2;

  // Twin grounded brushed-brass stanchions standing outside Alice/Bob lamp domes
  for (const dir of [-1, 1]) {
    const capX = dir < 0 ? BAR_X0 - 0.10 : BAR_X0 + BAR_LEN + 0.10;
    const postX = dir < 0 ? BAR_X0 - 0.56 : BAR_X0 + BAR_LEN + 0.56;
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.30, 0.16, 24), darkMetalMat);
    plinth.position.set(postX, 0.08, 0);
    plinth.receiveShadow = true;
    arenaGroup.add(plinth);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.052, BEAM_Y, 16), brassMat);
    post.position.set(postX, BEAM_Y / 2 + 0.08, 0);
    post.castShadow = true;
    arenaGroup.add(post);

    const arm = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(postX - capX), 0.09, 0.12), brassMat);
    arm.position.set((postX + capX) / 2, BEAM_Y, 0);
    arenaGroup.add(arm);

    const finial = new THREE.Mesh(new RoundedBoxGeometry(0.14, 0.34, 0.28, 3, 0.03), brassMat);
    finial.position.set(capX, BEAM_Y, 0);
    arenaGroup.add(finial);
  }

  // Sleek recessed obsidian optical channel (lifts slightly in Teacher mode for bright-room projectors)
  const channelMat = new THREE.MeshStandardMaterial({ color: 0x151b28, roughness: 0.56, metalness: 0.4 });
  const channelMesh = new THREE.Mesh(
    new RoundedBoxGeometry(BAR_LEN + 0.08, 0.26, 0.24, 4, 0.05),
    channelMat
  );
  channelMesh.position.y = BEAM_Y;
  arenaGroup.add(channelMesh);

  // Luminous Liquid-Light Beam (always reflects exact live winRate!)
  const barMat = new THREE.MeshStandardMaterial({
    color: COL_IVORY,
    emissive: new THREE.Color(COL_IVORY),
    emissiveIntensity: 1.05,
    roughness: 0.15,
    metalness: 0.05,
  });
  const barFill = new THREE.Mesh(new RoundedBoxGeometry(1, 0.16, 0.26, 3, 0.04), barMat);
  barFill.position.set(BAR_X0, BEAM_Y, 0.02);
  arenaGroup.add(barFill);

  const beamTipGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowIvoryTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.72,
    })
  );
  beamTipGlow.position.set(BAR_X0, BEAM_Y, 0.14);
  beamTipGlow.scale.set(0.76, 0.76, 1);
  arenaGroup.add(beamTipGlow);

  // ---- Thick Edge-Lit Frosted "Luck Zone" Crystal Glass Monolith at 75% ----
  // Left face stands precisely at x75; frosted slab extends rightward by ≈ 2·SE = 2√(0.75·0.25/n)!
  const x75 = BAR_X0 + 0.75 * BAR_LEN;
  const glassIntactTex = makeFrostedLuckTexture(false);
  const glassCrackedTex = makeFrostedLuckTexture(true);

  const wallGroup = new THREE.Group();
  wallGroup.position.set(x75, BEAM_Y, 0.04);
  arenaGroup.add(wallGroup);

  // Unit-width (x = 1) box shifted so its left face is always locked at local x = 0 (exact 75.0%)
  const unitSlabGeo = new THREE.BoxGeometry(1, 1.24, 0.78);
  unitSlabGeo.translate(0.5, 0, 0);

  const glassPaneMat = new THREE.MeshPhysicalMaterial({
    map: glassIntactTex,
    color: 0xe6f4ff,
    emissive: new THREE.Color(0x5e8cc4),
    emissiveIntensity: 0.36,
    roughness: 0.08,
    metalness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.56,
    side: THREE.DoubleSide,
  });
  const glassPane = new THREE.Mesh(unitSlabGeo, glassPaneMat);
  wallGroup.add(glassPane);

  const glassEdgeLines = new THREE.LineSegments(
    new THREE.EdgesGeometry(unitSlabGeo),
    new THREE.LineBasicMaterial({ color: 0xf4faff, transparent: true, opacity: 0.92 })
  );
  wallGroup.add(glassEdgeLines);

  // Bright etched front crystal face right at exact 75% (local x = 0)
  const frontFace75 = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, 1.26, 0.80),
    new THREE.MeshBasicMaterial({ color: 0xf2f9ff, transparent: true, opacity: 0.72 })
  );
  frontFace75.position.x = 0.011;
  wallGroup.add(frontFace75);

  // Subtle internal frosted dent shimmer when a hidden card's beam pushes into the luck zone (> 75%)
  const dentGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowIvoryTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.0,
    })
  );
  dentGlow.position.set(0.08, 0, 0.16);
  dentGlow.scale.set(0.52, 0.92, 1);
  wallGroup.add(dentGlow);

  // Top & bottom brushed-brass clamping rails (dynamically hug the luck-zone slab; vanish cleanly on shatter!)
  const unitClampGeo = new THREE.BoxGeometry(1, 0.068, 0.84);
  unitClampGeo.translate(0.5, 0, 0);
  const clampTop = new THREE.Mesh(unitClampGeo, brassMat);
  clampTop.position.y = 0.654;
  wallGroup.add(clampTop);
  const clampBot = new THREE.Mesh(unitClampGeo, brassMat);
  clampBot.position.y = -0.654;
  wallGroup.add(clampBot);

  // Persistent brass collar brackets mounted directly onto the obsidian channel at exact 75% (NEVER vanish or pop!)
  const mounted75Collar = new THREE.Group();
  const collarTop = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.048, 0.29, 2, 0.01), brassMat);
  collarTop.position.set(0, 0.145, -0.04);
  mounted75Collar.add(collarTop);
  const collarBot = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.048, 0.29, 2, 0.01), brassMat);
  collarBot.position.set(0, -0.145, -0.04);
  mounted75Collar.add(collarBot);
  const collarBack = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.30, 0.26), brassMat);
  collarBack.position.set(0, 0, -0.04);
  mounted75Collar.add(collarBack);
  wallGroup.add(mounted75Collar);

  // 3D anchor for crisp screen-space "75% PLAN LIMIT" badge locked dead-center above exact x75!
  const anchor75 = new THREE.Object3D();
  anchor75.position.set(0, 0.96, 0);
  wallGroup.add(anchor75);

  // ---- Slender Luminous 85.4% Quantum Gold Horizon Hairline (HIDDEN until Breakthrough!) ----
  const x85 = BAR_X0 + 0.853553 * BAR_LEN;
  const goldLineGroup = new THREE.Group();
  goldLineGroup.position.set(x85, BEAM_Y, 0.04);
  goldLineGroup.visible = false;
  arenaGroup.add(goldLineGroup);

  const goldLineMat = new THREE.MeshStandardMaterial({
    color: COL_GOLD,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 2.2,
    roughness: 0.15,
    metalness: 0.82,
    transparent: true,
    opacity: 0.0,
  });
  const goldLine = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 1.24, 12), goldLineMat);
  goldLineGroup.add(goldLine);
  const goldCapTop = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.025, 0.05, 16), brassMat);
  goldCapTop.position.y = 0.63;
  goldLineGroup.add(goldCapTop);
  const goldCapBot = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.05, 16), brassMat);
  goldCapBot.position.y = -0.63;
  goldLineGroup.add(goldCapBot);

  // Staggered higher vertical tier dead-center above exact x85 (NEVER collides with 75% AND never drifts off-mark!)
  const anchor85 = new THREE.Object3D();
  anchor85.position.set(0, 1.48, 0);
  goldLineGroup.add(anchor85);

  let luckWidthTarget = 0.28;
  let luckWidthCurrent = 0.28;

  // ---- Gasp-Worthy Crystal Glass Shatter FX (Smooth Exponential Bloom + Tinted Fresnel Shards + 4-Point Stars) ----
  const shatterFlash = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: expGlowTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.0,
    })
  );
  shatterFlash.position.set(x75 + 0.08, BEAM_Y, 0.36);
  shatterFlash.scale.set(1.0, 1.0, 1);
  shatterFlash.visible = false;
  arenaGroup.add(shatterFlash);

  const shatterPoint = new THREE.PointLight(COL_GOLD, 0, 11, 2);
  shatterPoint.position.set(x75 + 0.2, BEAM_Y, 0.85);
  arenaGroup.add(shatterPoint);

  // 120 Razor-Thin Beveled Tinted Refractive Crystal Shards
  const SHARD_COUNT = 120;
  const shardGeo = makeCrystalShardGeometry();
  const shardMat = makeCrystalShardMaterial();
  const shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, SHARD_COUNT);
  const shardPalette = [
    new THREE.Color(0xc8e8ff),
    new THREE.Color(0x98ccf4),
    new THREE.Color(0xffe6a8),
    new THREE.Color(0xbce0ff),
  ];
  for (let i = 0; i < SHARD_COUNT; i++) {
    shardMesh.setColorAt(i, shardPalette[i % shardPalette.length]);
  }
  if (shardMesh.instanceColor) shardMesh.instanceColor.needsUpdate = true;
  shardMesh.visible = false;
  arenaGroup.add(shardMesh);

  // 64 Additive Micro-Sliver Edge Glints & Crystalline Dust
  const SPARK_COUNT = 64;
  const sparkGeo = new THREE.OctahedronGeometry(0.026, 0);
  sparkGeo.scale(0.35, 1.8, 0.35);
  const sparkMat = new THREE.MeshBasicMaterial({
    color: 0xfff5d4,
    transparent: true,
    opacity: 0.96,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sparkMesh = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_COUNT);
  sparkMesh.visible = false;
  arenaGroup.add(sparkMesh);

  // 18 Optical 4-Point Star Sparkle Sprites riding directly on the brightest crystal shards!
  const STAR_COUNT = 18;
  const starSprites = Array.from({ length: STAR_COUNT }, () => {
    const sp = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: starGlintTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0,
      })
    );
    sp.visible = false;
    arenaGroup.add(sp);
    return sp;
  });

  const shards = Array.from({ length: SHARD_COUNT }, () => ({
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    rot: new THREE.Euler(),
    angVel: new THREE.Vector3(),
    scale: new THREE.Vector3(1, 1, 1),
  }));
  const sparks = Array.from({ length: SPARK_COUNT }, () => ({
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
  }));
  const dummy = new THREE.Object3D();

  // ---- Pooled Flying Light Mote Pairs & Folded Ivory Hidden Cards ----
  const activeMotes = [];
  const moteSphereGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const cardGeo = new THREE.BoxGeometry(0.26, 0.32, 0.025);

  function setCardStrip(cardArr) {
    const next = makeCardStripTexture(cardArr);
    cardStripTex.dispose();
    cardStripTex = next;
    cardDisplayMat.map = cardStripTex;
    cardDisplayMat.needsUpdate = true;
  }

  function spawnMotePair({ colorA, colorB, entangled = true, onArrive = null, duration = 0.44 }) {
    const matA = entangled
      ? new THREE.MeshBasicMaterial({ color: COL_GOLD })
      : new THREE.MeshStandardMaterial({ map: cardStripTex, roughness: 0.45, emissive: new THREE.Color(0x5a5042), emissiveIntensity: 0.55 });
    const matB = entangled
      ? new THREE.MeshBasicMaterial({ color: COL_GOLD })
      : new THREE.MeshStandardMaterial({ map: cardStripTex, roughness: 0.45, emissive: new THREE.Color(0x5a5042), emissiveIntensity: 0.55 });
    const meshA = new THREE.Mesh(entangled ? moteSphereGeo : cardGeo, matA);
    const meshB = new THREE.Mesh(entangled ? moteSphereGeo : cardGeo, matB);

    const haloA = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: entangled ? glowGoldTex : glowIvoryTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: entangled ? 0.92 : 0.48,
      })
    );
    haloA.scale.set(0.56, 0.56, 1);
    meshA.add(haloA);
    meshB.add(haloA.clone());

    scene.add(meshA);
    scene.add(meshB);

    activeMotes.push({
      meshA,
      meshB,
      colorA,
      colorB,
      entangled,
      t: 0,
      duration: isReducedMotion ? 0.14 : duration,
      onArrive,
    });
  }

  // ---- Light-Speed Compare Pulse (Step 7) ----
  let comparePulse = null;
  const compareOrb = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 20, 20),
    new THREE.MeshBasicMaterial({ color: COL_GOLD })
  );
  const compareHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowGoldTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  compareHalo.scale.set(0.95, 0.95, 1);
  compareOrb.add(compareHalo);
  compareOrb.visible = false;
  scene.add(compareOrb);

  // ---- Internal Stage State ----
  let isReducedMotion = reducedMotion;
  let teacherMode = false;
  let leverRevealed = true;
  let leverRiseCurrent = 1;
  let showQuantumLabel = false;
  let peelTarget = 0;
  let peelCurrent = 0;
  let wallState = 'intact';
  let shatterAge = 0;
  let shatterWallElapsed = 0; // real-time elapsed since shatter for 700ms slow-mo curve
  let freezeBurstForShot = false;
  let shakeAmount = 0;
  let breakthroughZoom = 0;
  let barTargetPct = 0;
  let barCurrentPct = 0;
  let barIsQuantum = false;
  let sourceEntangled = true;
  let showStationPlaques = false;
  let showLampBadges = false;
  let recorderHoodsOn = false;
  let stepIndex = 0;

  // Adaptive quality guard for phones (disabled when ?shots / ?q=high!)
  let frameTimeEma = 16;
  let slowFrameTimer = 0;
  let qualityReduced = false;

  const camTargetPos = new THREE.Vector3(0, 2.4, 8.4);
  const camTargetLook = new THREE.Vector3(0, 0.85, 0);
  const camCurLook = new THREE.Vector3(0, 0.85, 0);
  const projVec = new THREE.Vector3();

  function updateCameraTargets() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    const aspect = w / Math.max(1, h);
    const isTallPortrait = aspect < 0.72;
    const isPhoneStage = aspect < 1.25 && stepIndex > 0;

    const halfSpan = stepIndex === 5 || stepIndex === 6 ? 3.92 : stepIndex === 0 && isTallPortrait ? 3.74 : 3.58;
    const vFovRad = (camera.fov * Math.PI) / 180;
    const minZForWidth = halfSpan / (Math.tan(vFovRad / 2) * Math.max(0.42, aspect));

    if (stepIndex === 0) {
      if (isTallPortrait) {
        // Close, tactile, sculptural phone hero: boxes fill ~86% width with clean side margins!
        const z = Math.max(10.1, minZForWidth * 1.0);
        camTargetPos.set(0, 1.98, z);
        camTargetLook.set(0, 0.46, 0.15);
      } else {
        const z = Math.max(7.9, minZForWidth * 1.02);
        camTargetPos.set(0, 2.3, z);
        camTargetLook.set(0, 0.82, 0.15);
      }
    } else if (stepIndex === 4) {
      const z = Math.max(7.8, minZForWidth * 1.03);
      camTargetPos.set(0, 1.88, z);
      camTargetLook.set(0, 0.86, 0.15);
    } else if (stepIndex === 5 || stepIndex === 6) {
      const baseZ = Math.max(isPhoneStage ? 11.4 : 10.9, minZForWidth * 1.07);
      const z = baseZ - breakthroughZoom * 1.45;
      const lx = breakthroughZoom * 0.62;
      const ly = isPhoneStage ? 1.56 : 1.72 + breakthroughZoom * 0.22;
      camTargetPos.set(lx, 2.68, z);
      camTargetLook.set(lx, ly, -0.38);
    } else if (stepIndex === 7) {
      const z = Math.max(8.7, minZForWidth * 1.05);
      camTargetPos.set(0.05, 2.24, z);
      camTargetLook.set(0.05, 0.92, 0.22);
    } else {
      const z = Math.max(8.2, minZForWidth * 1.03);
      camTargetPos.set(0, 2.25, z);
      camTargetLook.set(0, 0.88, 0.15);
    }
  }

  function resize() {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    renderer.setPixelRatio(targetDpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.72 ? 46 : 34;
    camera.updateProjectionMatrix();
    updateCameraTargets();
  }

  function bloomLamp(box, colorIdx) {
    box.lampColor = colorIdx;
    box.lampBloom = 1.0;
    // Rich saturated Coral & Jade blown-glass glow under ACESFilmic
    const col = colorIdx === 0 ? 0xe64030 : 0x10b878;
    const emissiveCol = colorIdx === 0 ? 0xcc2418 : 0x0a9860;
    box.lampMat.color.setHex(col);
    box.lampMat.emissive.setHex(emissiveCol);
    box.lampLight.color.setHex(colorIdx === 0 ? COL_CORAL : COL_JADE);
    box.lampHalo.material.map = colorIdx === 0 ? glowCoralTex : glowJadeTex;
    box.lampSymbol.material.map = colorIdx === 0 ? badgeCoralTex : badgeJadeTex;
  }

  function setDial(side, index, mode = 'mermin') {
    const box = side === 'left' ? boxLeft : boxRight;
    if (mode === 'mermin') {
      const deg = [0, 120, 240][index] || 0;
      box.targetDialRad = -(deg * Math.PI) / 180;
      box.targetMagRad = -(deg * Math.PI) / 180;
    } else {
      const deg = side === 'left' ? (index === 0 ? 0 : 90) : (index === 0 ? 45 : -45);
      box.targetDialRad = (index === 0 ? 45 : -45) * (Math.PI / 180);
      box.targetMagRad = -(deg * Math.PI) / 180;
    }
  }

  function setDialMode(mode) {
    const tex = mode === 'mermin' ? dialMerminTex : dialChshTex;
    boxLeft.dialFaceMat.map = tex;
    boxRight.dialFaceMat.map = tex;
    boxLeft.dialFaceMat.needsUpdate = true;
    boxRight.dialFaceMat.needsUpdate = true;
  }

  function setPeel(peeled, { snap = false } = {}) {
    peelTarget = peeled ? 1 : 0;
    if (snap) peelCurrent = peelTarget;
  }

  function setSourceEntangled(val) {
    sourceEntangled = !!val;
    coreMat.color.setHex(val ? COL_GOLD : COL_IVORY);
    coreMat.emissive.setHex(val ? COL_GOLD : COL_IVORY);
    sourceHalo.material.map = val ? glowGoldTex : glowIvoryTex;
    sourcePoint.color.setHex(val ? COL_GOLD : COL_IVORY);
    leverTargetAngle = val ? -0.58 : 0.58;
    leverPlateMat.map = val ? leverPlateEntTex : leverPlateCardTex;
    leverPlateMat.needsUpdate = true;
    leverKnobMat.color.setHex(val ? COL_GOLD : COL_IVORY);
    leverKnobMat.emissiveIntensity = val ? 1.45 : 0.42;
    leverCollarMat.emissiveIntensity = val ? 1.2 : 0.35;
    leverGlow.material.opacity = val ? 0.85 : 0.3;
  }

  function setLeverRevealed(revealed, { snap = false } = {}) {
    leverRevealed = !!revealed;
    if (snap) leverRiseCurrent = leverRevealed ? 1 : 0;
  }

  function setShowQuantumLabel(show) {
    showQuantumLabel = !!show;
  }

  function setStep4ActiveAngles(idxA, idxB) {
    for (let i = 0; i < 3; i++) {
      angleLabels.left[i].classList.toggle('is-active', i === idxA);
      angleLabels.right[i].classList.toggle('is-active', i === idxB);
    }
  }

  function setTeacherMode(on) {
    teacherMode = !!on;
    // Bright-room classroom projector lift: crisp rim separation on boxes & clear unfilled bar track
    keyLight.intensity = teacherMode ? 2.75 : 2.0;
    rimLight.intensity = teacherMode ? 1.95 : 1.12;
    hemi.intensity = teacherMode ? 1.15 : 0.74;
    scene.environmentIntensity = teacherMode ? 0.96 : 0.68;
    channelMat.color.setHex(teacherMode ? 0x263148 : 0x151b28);
    boxLeft.shellMat.color.setHex(teacherMode ? 0x2f3a50 : COL_BOX_SHELL);
    boxRight.shellMat.color.setHex(teacherMode ? 0x2f3a50 : COL_BOX_SHELL);
  }

  function setRecorderHoods(on) {
    recorderHoodsOn = !!on;
    boxLeft.recorderHood.visible = recorderHoodsOn;
    boxRight.recorderHood.visible = recorderHoodsOn;
    boxLeft.dimmed = recorderHoodsOn;
    boxRight.dimmed = recorderHoodsOn;
  }

  function setStep(step) {
    stepIndex = step;
    showStationPlaques = step >= 1;
    showLampBadges = step >= 1;
    arenaGroup.visible = step === 5 || step === 6;
    cardStandGroup.visible = step === 3;
    partitionGroup.visible = step === 7;
    setRecorderHoods(false);
    if (step !== 6) {
      breakthroughZoom = 0;
      showQuantumLabel = false;
    }
    setDialMode(step >= 4.5 && step <= 7 ? 'chsh' : 'mermin');
    boxLeft.dimmed = false;
    boxRight.dimmed = false;
    updateCameraTargets();
    if (isReducedMotion) {
      camera.position.copy(camTargetPos);
      camCurLook.copy(camTargetLook);
      camera.lookAt(camCurLook);
    }
  }

  function setMythView(mythId) {
    // Reuse the exact same stage hardware cleanly for Myth-buster mode
    showStationPlaques = true;
    showLampBadges = true;
    breakthroughZoom = 0;
    setPeel(false, { snap: true });
    setRecorderHoods(false);
    boxLeft.dimmed = false;
    boxRight.dimmed = false;

    if (mythId === 'ftl') {
      stepIndex = 7;
      arenaGroup.visible = false;
      cardStandGroup.visible = false;
      partitionGroup.visible = true;
      setLeverRevealed(false, { snap: true });
      setDialMode('chsh');
      setSourceEntangled(true);
    } else if (mythId === 'gloves') {
      stepIndex = 3;
      arenaGroup.visible = false;
      cardStandGroup.visible = true;
      partitionGroup.visible = false;
      setLeverRevealed(false, { snap: true });
      setDialMode('mermin');
      setSourceEntangled(false);
    } else if (mythId === 'observer') {
      stepIndex = 6;
      arenaGroup.visible = true;
      cardStandGroup.visible = false;
      partitionGroup.visible = false;
      setLeverRevealed(true, { snap: true });
      setDialMode('chsh');
      setSourceEntangled(true);
    }
    updateCameraTargets();
  }

  function setAlicePartition(raised) {
    boxLeft.dimmed = !!raised;
    partitionTargetY = raised ? 0 : -2.6;
  }

  // Update score beam & honest frosted "luck zone" slab width (≈ 2·SE = 2√(0.75·0.25/n))
  function setArenaProgress(pct, { isQuantum = false, snap = false, rounds = 0 } = {}) {
    barTargetPct = Math.max(0, Math.min(1, pct));
    barIsQuantum = isQuantum;
    // Frosted luck zone shrinks honestly as sample size n grows: 2·SE = 2 * sqrt(0.1875 / n)
    const luckFrac = rounds > 0
      ? Math.min(0.11, 2 * Math.sqrt(0.1875 / Math.max(25, rounds)))
      : 0.048;
    luckWidthTarget = Math.max(0.13, luckFrac * BAR_LEN);
    if (snap) {
      barCurrentPct = barTargetPct;
      luckWidthCurrent = luckWidthTarget;
    }
  }

  function stepShatterPhysics(simDt) {
    shatterAge += simDt;
    const fl = Math.max(0, 1 - shatterAge / 0.48);
    if (shatterFlash.visible) {
      shatterFlash.material.opacity = fl * 0.95;
      const sc = 1.2 + (1 - fl) * 3.0;
      shatterFlash.scale.set(sc, sc * 0.85, 1);
      shatterPoint.intensity = fl * 5.0;
      if (fl <= 0.01) shatterFlash.visible = false;
    }

    const fade = Math.max(0, 1 - shatterAge / 2.2);
    shardMat.uniforms.uOpacity.value = fade;
    shardMat.uniforms.uFlash.value = Math.max(0.25, fl);
    sparkMat.opacity = fade * 0.96;

    for (let i = 0; i < SHARD_COUNT; i++) {
      const s = shards[i];
      s.vel.y -= 3.6 * simDt;
      s.pos.addScaledVector(s.vel, simDt);
      // Keep shards cleanly framed between the bar labels above and Bob's ▲ badge below!
      if (s.pos.y > BEAM_Y + 0.56) {
        s.pos.y = BEAM_Y + 0.56;
        if (s.vel.y > 0) s.vel.y *= -0.25;
      }
      if (s.pos.y < BEAM_Y - 0.56 && s.pos.x > x75 + 0.25 && shatterAge < 0.35) {
        s.pos.y = BEAM_Y - 0.56;
        if (s.vel.y < 0) s.vel.y *= -0.15;
      }
      s.rot.x += s.angVel.x * simDt;
      s.rot.y += s.angVel.y * simDt;
      s.rot.z += s.angVel.z * simDt;
      dummy.position.copy(s.pos);
      dummy.rotation.copy(s.rot);
      dummy.scale.copy(s.scale);
      dummy.updateMatrix();
      shardMesh.setMatrixAt(i, dummy.matrix);
    }
    shardMesh.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < STAR_COUNT; i++) {
      const sp = starSprites[i];
      const s = shards[i * 4];
      sp.position.copy(s.pos);
      sp.position.z += 0.08;
      const twinkle = 0.6 + 0.4 * Math.sin(shatterAge * 18 + i * 2.1);
      sp.material.opacity = fade * twinkle * 0.92;
      const sz = (0.26 + (i % 3) * 0.12) * (0.7 + 0.45 * twinkle);
      sp.scale.set(sz, sz, 1);
      sp.visible = fade > 0.05;
    }

    for (let i = 0; i < SPARK_COUNT; i++) {
      const sp = sparks[i];
      sp.vel.y -= 2.0 * simDt;
      sp.pos.addScaledVector(sp.vel, simDt);
      if (sp.pos.y > BEAM_Y + 0.62) sp.pos.y = BEAM_Y + 0.62;
      dummy.position.copy(sp.pos);
      dummy.rotation.set(shatterAge * 7 + i, shatterAge * 5 + i * 0.5, 0);
      dummy.scale.setScalar(0.75 + fade * 0.85);
      dummy.updateMatrix();
      sparkMesh.setMatrixAt(i, dummy.matrix);
    }
    sparkMesh.instanceMatrix.needsUpdate = true;

    if (fade <= 0.01) {
      shardMesh.visible = false;
      sparkMesh.visible = false;
      shatterPoint.intensity = 0;
      for (const sp of starSprites) sp.visible = false;
    }
  }

  function setWallState(next, { settled = false, midShatter = false } = {}) {
    if (next === wallState && !settled && !midShatter) return;
    wallState = next;
    freezeBurstForShot = false;
    if (next === 'intact') {
      glassPane.visible = true;
      glassEdgeLines.visible = true;
      frontFace75.visible = true;
      clampTop.visible = true;
      clampBot.visible = true;
      glassPaneMat.map = glassIntactTex;
      glassPaneMat.emissive.setHex(0x5e8cc4);
      glassPaneMat.emissiveIntensity = 0.36;
      glassPaneMat.opacity = 0.56;
      glassPaneMat.needsUpdate = true;
      shardMesh.visible = false;
      sparkMesh.visible = false;
      shatterFlash.visible = false;
      shatterPoint.intensity = 0;
      for (const sp of starSprites) sp.visible = false;
      goldLineGroup.visible = false;
      goldLineMat.opacity = 0.0;
      showQuantumLabel = false;
      breakthroughZoom = 0;
      updateCameraTargets();
    } else if (next === 'cracked') {
      glassPane.visible = true;
      glassEdgeLines.visible = true;
      frontFace75.visible = true;
      glassPaneMat.map = glassCrackedTex;
      glassPaneMat.emissive.setHex(COL_GOLD);
      glassPaneMat.emissiveIntensity = 0.92;
      glassPaneMat.opacity = 0.72;
      glassPaneMat.needsUpdate = true;
      breakthroughZoom = 0.72;
      updateCameraTargets();
      if (!isReducedMotion) shakeAmount = 0.06;
    } else if (next === 'shattered') {
      glassPane.visible = false;
      glassEdgeLines.visible = false;
      frontFace75.visible = false;
      clampTop.visible = false;
      clampBot.visible = false;
      dentGlow.material.opacity = 0;
      goldLineGroup.visible = true;
      goldLineMat.opacity = settled ? 1.0 : 0.35;
      showQuantumLabel = settled;

      if (!isReducedMotion && !settled) {
        shatterAge = 0;
        shatterWallElapsed = 0;
        shakeAmount = midShatter ? 0 : 0.14;
        breakthroughZoom = 1.0;
        updateCameraTargets();
        shardMesh.visible = true;
        sparkMesh.visible = true;
        shatterFlash.visible = true;
        shatterFlash.material.opacity = 0.95;
        shatterPoint.intensity = 5.0;
        shardMat.uniforms.uOpacity.value = 1.0;
        shardMat.uniforms.uFlash.value = 1.0;
        sparkMat.opacity = 0.98;

        let seed = 0x91e7a5c3;
        const rnd = midShatter
          ? () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; }
          : Math.random;

        for (let i = 0; i < SHARD_COUNT; i++) {
          const s = shards[i];
          const spread = (rnd() - 0.5) * Math.PI * 1.25;
          const speed = 2.4 + rnd() * 5.2;
          const startY = (rnd() - 0.5) * 0.95;
          const startZ = (rnd() - 0.5) * 0.60;
          s.pos.set(x75 + rnd() * Math.max(0.16, luckWidthCurrent), BEAM_Y + startY, startZ);
          s.vel.set(
            1.4 + Math.cos(spread) * speed * 0.84 + rnd() * 1.9,
            Math.max(-1.4, Math.min(1.8, Math.sin(spread) * speed * 0.38 + startY * 0.7)),
            1.6 + rnd() * 4.4
          );
          s.rot.set(rnd() * 6.28, rnd() * 6.28, rnd() * 6.28);
          s.angVel.set((rnd() - 0.5) * 16, (rnd() - 0.5) * 16, (rnd() - 0.5) * 16);
          const sc = 0.48 + rnd() * 1.05;
          s.scale.set(sc * (0.72 + rnd() * 0.45), sc * (0.85 + rnd() * 0.55), sc);
        }
        for (let i = 0; i < SPARK_COUNT; i++) {
          const sp = sparks[i];
          const a = (rnd() - 0.5) * Math.PI * 1.3;
          const r = 2.6 + rnd() * 5.0;
          sp.pos.set(x75 + rnd() * 0.22, BEAM_Y + (rnd() - 0.5) * 0.8, (rnd() - 0.5) * 0.4);
          sp.vel.set(1.6 + Math.cos(a) * r * 0.8, Math.max(-1.3, Math.min(1.8, Math.sin(a) * r * 0.42)), 1.6 + rnd() * 4.2);
        }

        if (midShatter) {
          for (let step = 0; step < 12; step++) stepShatterPhysics(0.02);
          camera.position.copy(camTargetPos);
          camCurLook.copy(camTargetLook);
          camera.lookAt(camCurLook);
          freezeBurstForShot = true;
        }
      } else {
        shardMesh.visible = false;
        sparkMesh.visible = false;
        shatterFlash.visible = false;
        shatterPoint.intensity = 0;
        for (const sp of starSprites) sp.visible = false;
        breakthroughZoom = 0;
        updateCameraTargets();
      }
    }
  }

  function triggerComparePulse(onArrive) {
    comparePulse = { t: 0, duration: isReducedMotion ? 0.18 : 0.78, onArrive };
    compareOrb.visible = true;
  }

  function setReducedMotion(val) {
    isReducedMotion = !!val;
  }

  function projectPoint(obj3d, { minTop = 58, clampX = 48 } = {}) {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    obj3d.getWorldPosition(projVec);
    projVec.project(camera);
    if (projVec.z > 1) return null;
    return {
      x: Math.max(clampX, Math.min(w - clampX, (projVec.x * 0.5 + 0.5) * w)),
      y: Math.max(minTop, Math.min(h - 18, (-projVec.y * 0.5 + 0.5) * h)),
      w,
    };
  }

  function placeLabel(el, x, y) {
    el.hidden = false;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
  }

  function updateStageLabels() {
    const isPhone = (container.clientWidth || window.innerWidth) < 861;
    const topSafe = isPhone ? 68 : 74;

    if (arenaGroup.visible) {
      // Stagger vertical height of 75% and 85.4% while keeping BOTH locked to their EXACT X marks on the bar!
      const p75 = projectPoint(anchor75, { minTop: topSafe, clampX: 44 });
      const show85 = goldLineGroup.visible && showQuantumLabel;
      const p85 = show85 ? projectPoint(anchor85, { minTop: topSafe, clampX: 54 }) : null;

      // During unobstructed mid-shatter burst, keep stage uncluttered of overlay pills over the shards!
      const isActiveBurst = shardMesh.visible && !showQuantumLabel;
      if (isActiveBurst) {
        lbl75.hidden = true;
        lbl85.hidden = true;
      } else if (p75 && p85) {
        // Guaranteed vertical stagger so they NEVER collide AND stay 100% locked above exact x75 & x85!
        const y75 = p75.y;
        const y85 = Math.max(topSafe, Math.min(p85.y, y75 - (isPhone ? 40 : 52)));
        placeLabel(lbl75, p75.x, y75);
        placeLabel(lbl85, p85.x, y85);
      } else if (p75) {
        placeLabel(lbl75, p75.x, p75.y);
        lbl85.hidden = true;
      } else {
        lbl75.hidden = true;
        lbl85.hidden = true;
      }
    } else {
      lbl75.hidden = true;
      lbl85.hidden = true;
    }

    const showAngles = stepIndex === 4 && peelCurrent > 0.55;
    for (let i = 0; i < 3; i++) {
      if (showAngles) {
        const pL = projectPoint(boxLeft.angleAnchors[i], { minTop: topSafe, clampX: 18 });
        const pR = projectPoint(boxRight.angleAnchors[i], { minTop: topSafe, clampX: 18 });
        if (pL) placeLabel(angleLabels.left[i], pL.x, pL.y); else angleLabels.left[i].hidden = true;
        if (pR) placeLabel(angleLabels.right[i], pR.x, pR.y); else angleLabels.right[i].hidden = true;
      } else {
        angleLabels.left[i].hidden = true;
        angleLabels.right[i].hidden = true;
      }
    }
  }

  // ---- Render Loop ----
  let lastNow = performance.now();
  let animId = 0;
  let elapsed = 0;

  function animate(now) {
    animId = requestAnimationFrame(animate);
    const rawMs = Math.min(80, Math.max(1, now - lastNow));
    const rawDt = Math.min(0.05, rawMs / 1000);
    lastNow = now;

    // Adaptive-quality guard for phones (bypassed when ?shots / ?q=high!)
    if (!highQuality) {
      frameTimeEma = frameTimeEma * 0.92 + rawMs * 0.08;
      if (!qualityReduced && targetDpr > 1.0 && frameTimeEma > 22) {
        slowFrameTimer += rawDt;
        if (slowFrameTimer > 2.0) {
          qualityReduced = true;
          targetDpr = 1.0;
          renderer.setPixelRatio(1.0);
        }
      } else if (frameTimeEma <= 20) {
        slowFrameTimer = 0;
      }
    }

    // Slow-motion curve: 0.25x for 700ms, smoothly easing back to 1.0x over 350ms!
    let timeScale = 1.0;
    if (shardMesh.visible && !freezeBurstForShot) {
      shatterWallElapsed += rawDt;
      if (shatterWallElapsed < 0.70) {
        timeScale = 0.25;
      } else if (shatterWallElapsed < 1.05) {
        const u = (shatterWallElapsed - 0.70) / 0.35;
        timeScale = 0.25 + u * 0.75;
      }
    }
    const dt = rawDt * timeScale;
    elapsed += dt;

    if (!isReducedMotion) {
      gimbalOuter.rotation.y += dt * 0.36;
      gimbalOuter.rotation.x = Math.sin(elapsed * 0.6) * 0.2;
      gimbalInner.rotation.z -= dt * 0.52;
      gimbalInner.rotation.y = Math.cos(elapsed * 0.5) * 0.32;
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.08;
      sourceHalo.scale.set(1.26 * pulse, 1.26 * pulse, 1);
      coreMat.emissiveIntensity = (sourceEntangled ? 1.95 : 1.15) + Math.sin(elapsed * 2.4) * 0.24;
      if (cardStandGroup.visible) {
        cardDisplay.rotation.y = Math.sin(elapsed * 1.1) * 0.08;
      }
      if (recorderHoodsOn) {
        const recPulse = 1.1 + 0.9 * (0.5 + 0.5 * Math.sin(elapsed * 4.5));
        boxLeft.recLedMat.emissiveIntensity = recPulse;
        boxRight.recLedMat.emissiveIntensity = recPulse;
      }
    }

    // Teacher-mode concealed lever: truly hidden flush below stage until revealed, then smoothly rises!
    const onLeverStep = stepIndex === 5 || stepIndex === 6;
    const leverTargetRise = onLeverStep && leverRevealed ? 1 : 0;
    leverRiseCurrent += (leverTargetRise - leverRiseCurrent) * Math.min(1, rawDt * 7.5);
    if (leverTargetRise === 0 && leverRiseCurrent < 0.02) leverRiseCurrent = 0;
    if (leverTargetRise === 1 && leverRiseCurrent > 0.98) leverRiseCurrent = 1;
    leverMount.visible = onLeverStep && leverRiseCurrent > 0.03;
    leverMount.position.y = -0.68 + leverRiseCurrent * 0.80;
    leverCap.visible = onLeverStep && !leverRevealed && leverRiseCurrent < 0.12;

    leverCurrentAngle += (leverTargetAngle - leverCurrentAngle) * Math.min(1, rawDt * 12);
    leverPivot.rotation.z = leverCurrentAngle;

    if (partitionGroup.visible) {
      partitionCurrentY += (partitionTargetY - partitionCurrentY) * Math.min(1, rawDt * 8);
      partitionGroup.position.y = partitionCurrentY;
    }

    const peelSpeed = isReducedMotion ? 16 : 9;
    peelCurrent += (peelTarget - peelCurrent) * Math.min(1, rawDt * peelSpeed);
    if (peelTarget === 0 && peelCurrent < 0.03) peelCurrent = 0;
    if (peelTarget === 1 && peelCurrent > 0.97) peelCurrent = 1;

    const isPeeledVisual = peelCurrent > 0.25;
    for (const box of [boxLeft, boxRight]) {
      if (isPeeledVisual) {
        box.shell.visible = false;
        box.ghostShell.visible = true;
        box.ghostShellMat.opacity = 0.075 * peelCurrent;
        box.shellEdges.visible = true;
        box.edgesMat.opacity = peelCurrent * 0.42;
        box.magnetRoot.visible = true;
        box.dialGroup.visible = false;
        box.footMat.opacity = 0.22;
      } else {
        box.shell.visible = true;
        box.ghostShell.visible = false;
        box.shellEdges.visible = false;
        box.magnetRoot.visible = false;
        box.dialGroup.visible = true;
        box.footMat.opacity = 1.0;
      }

      if (box.deflectAge < 1) {
        box.deflectAge = Math.min(1, box.deflectAge + rawDt * 2.4);
        box.deflectFlash.material.opacity = (1 - box.deflectAge) * 0.9;
        box.deflectFlash.position.y = (box.lampColor === 0 ? 0.14 : -0.14) * box.deflectAge;
      } else {
        box.deflectFlash.material.opacity = 0;
      }

      box.plaqueGroup.visible = showStationPlaques;

      const rotLerp = isReducedMotion ? 1 : Math.min(1, rawDt * 12);
      box.currentDialRad += (box.targetDialRad - box.currentDialRad) * rotLerp;
      box.currentMagRad += (box.targetMagRad - box.currentMagRad) * rotLerp;
      box.dialKnob.rotation.z = box.currentDialRad;
      box.magnetRotor.rotation.z = box.currentMagRad;

      if (box.lampBloom > 0.01) box.lampBloom = Math.max(0.38, box.lampBloom - rawDt * 0.42);
      const bloom = box.lampColor >= 0 ? box.lampBloom : 0;
      const dimMul = box.dimmed ? 0.0 : 1.0; // Completely opaque privacy screen hides Alice's glow!
      box.lampMat.emissiveIntensity = (0.35 + bloom * 0.72) * dimMul;
      box.lampHalo.material.opacity = bloom * 0.62 * dimMul;
      box.lampLight.intensity = bloom * 2.0 * dimMul;
      box.lampSymbol.material.opacity = (showLampBadges && box.lampColor >= 0) ? Math.min(1, 0.78 + bloom * 0.22) * dimMul : 0;
    }

    for (let i = activeMotes.length - 1; i >= 0; i--) {
      const m = activeMotes[i];
      m.t += rawDt / m.duration;
      const u = Math.min(1, m.t);
      const ease = 1 - Math.pow(1 - u, 3);
      const xOff = ease * 1.58;
      const arcY = 0.96 + Math.sin(u * Math.PI) * 0.14;
      m.meshA.position.set(-xOff, arcY, 0.15);
      m.meshB.position.set(xOff, arcY, 0.15);
      if (!m.entangled) {
        m.meshA.rotation.y = u * Math.PI * 0.85;
        m.meshB.rotation.y = -u * Math.PI * 0.85;
      }
      if (u >= 1) {
        bloomLamp(boxLeft, m.colorA);
        bloomLamp(boxRight, m.colorB);
        boxLeft.deflectAge = 0;
        boxRight.deflectAge = 0;
        if (m.onArrive) m.onArrive();
        scene.remove(m.meshA);
        scene.remove(m.meshB);
        m.meshA.material.dispose();
        m.meshB.material.dispose();
        activeMotes.splice(i, 1);
      }
    }

    if (comparePulse) {
      comparePulse.t += rawDt / comparePulse.duration;
      const u = Math.min(1, comparePulse.t);
      const x = -2.38 + u * 4.76;
      const y = 1.65 + Math.sin(u * Math.PI) * 0.65;
      compareOrb.position.set(x, y, 0.35);
      if (u >= 1) {
        compareOrb.visible = false;
        const cb = comparePulse.onArrive;
        comparePulse = null;
        if (cb) cb();
      }
    }

    // ---- Score Gallery + Thick Frosted Luck-Zone Wall + Crystal Shatter ----
    if (arenaGroup.visible) {
      barCurrentPct += (barTargetPct - barCurrentPct) * Math.min(1, rawDt * 9);
      luckWidthCurrent += (luckWidthTarget - luckWidthCurrent) * Math.min(1, rawDt * 6);

      // Update frosted luck-zone slab & brass clamp widths dynamically as rounds grow!
      if (glassPane.visible) {
        glassPane.scale.x = luckWidthCurrent;
        glassEdgeLines.scale.x = luckWidthCurrent;
        clampTop.scale.x = luckWidthCurrent + 0.04;
        clampTop.position.x = -0.02;
        clampBot.scale.x = luckWidthCurrent + 0.04;
        clampBot.position.x = -0.02;
      }

      const len = Math.max(0.04, barCurrentPct * BAR_LEN);
      barFill.scale.x = len;
      barFill.position.x = BAR_X0 + len / 2;

      // Subtle warm frosted dent shimmer whenever a hidden card pushes slightly past 75% into the luck zone!
      if (glassPane.visible && !barIsQuantum && barCurrentPct > 0.746) {
        const dentDepth = Math.max(0.04, (barCurrentPct - 0.75) * BAR_LEN);
        dentGlow.position.x = Math.min(luckWidthCurrent * 0.85, dentDepth);
        dentGlow.material.opacity = 0.52 + 0.14 * Math.sin(elapsed * 5.0);
      } else {
        dentGlow.material.opacity = 0;
      }

      const isGoldenSurge = barIsQuantum && wallState === 'shattered';
      const targetCol = isGoldenSurge ? 0xf2b42e : barIsQuantum ? 0xf5d484 : COL_IVORY;
      const targetEmissive = isGoldenSurge ? 0xd9840c : barIsQuantum ? 0xd8a848 : COL_IVORY;
      barMat.color.lerp(new THREE.Color(targetCol), Math.min(1, rawDt * 8));
      barMat.emissive.lerp(new THREE.Color(targetEmissive), Math.min(1, rawDt * 8));
      barMat.emissiveIntensity = isGoldenSurge ? 1.05 : 0.88;

      beamTipGlow.position.set(BAR_X0 + len, BEAM_Y, 0.14);
      beamTipGlow.material.map = isGoldenSurge ? glowGoldTex : glowIvoryTex;
      beamTipGlow.material.opacity = barCurrentPct > 0.02 ? (isGoldenSurge ? 0.95 : 0.55) : 0;

      if (shardMesh.visible && !freezeBurstForShot) {
        if (shatterWallElapsed > 0.85 && breakthroughZoom > 0) {
          breakthroughZoom = Math.max(0, breakthroughZoom - rawDt * 1.4);
          updateCameraTargets();
        }
        if (shatterWallElapsed > 0.90) {
          showQuantumLabel = true;
          goldLineMat.opacity = Math.min(1.0, goldLineMat.opacity + rawDt * 2.4);
        }
        stepShatterPhysics(dt);
      }
    }

    const camLerp = isReducedMotion ? 1 : Math.min(1, rawDt * 4.8);
    camera.position.lerp(camTargetPos, camLerp);
    camCurLook.lerp(camTargetLook, camLerp);
    if (shakeAmount > 0.002) {
      camera.position.x += (Math.random() - 0.5) * shakeAmount;
      camera.position.y += (Math.random() - 0.5) * shakeAmount;
      shakeAmount *= Math.pow(0.05, rawDt);
    }
    camera.lookAt(camCurLook);

    renderer.render(scene, camera);
    updateStageLabels();
  }

  resize();
  window.addEventListener('resize', resize);
  animId = requestAnimationFrame(animate);

  return {
    resize,
    setStep,
    setMythView,
    setRecorderHoods,
    setDial,
    setPeel,
    setCardStrip,
    setSourceEntangled,
    setLeverRevealed,
    setShowQuantumLabel,
    setStep4ActiveAngles,
    setTeacherMode,
    setAlicePartition,
    setArenaProgress,
    setWallState,
    spawnMotePair,
    bloomLampLeft: c => bloomLamp(boxLeft, c),
    bloomLampRight: c => bloomLamp(boxRight, c),
    triggerComparePulse,
    setReducedMotion,
    destroy() {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    },
  };
}
