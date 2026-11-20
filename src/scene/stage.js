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

// Seamless dark studio spotlight pool — fades smoothly into #0D1017 with zero curved horizon edge
function makeFloorPoolTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(256, 256, 12, 256, 256, 250);
  g.addColorStop(0, '#222b3d');
  g.addColorStop(0.32, '#161c29');
  g.addColorStop(0.65, '#0f131c');
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

  ctx.strokeStyle = 'rgba(200,168,107,0.62)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(128, 128, 118, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(244,239,230,0.22)';
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
    ctx.font = '700 32px -apple-system, BlinkMacSystemFont, sans-serif';
    for (const l of [{ t: '1', deg: -90 }, { t: '2', deg: 30 }, { t: '3', deg: 150 }]) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 86, 128 + Math.sin(r) * 86);
    }
  } else {
    ctx.font = '800 40px -apple-system, BlinkMacSystemFont, sans-serif';
    for (const l of [{ t: '0', deg: -135 }, { t: '1', deg: -45 }]) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 82, 128 + Math.sin(r) * 82);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// 0°, 120°, 240° degree markings placed cleanly OUTSIDE the brass ring so the N/S magnet NEVER covers them!
function makeOuterAngleRingTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);

  // Subtle precision graduated outer circle
  ctx.strokeStyle = 'rgba(244,239,230,0.34)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 166, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const major = i % 12 === 0;
    ctx.strokeStyle = major ? '#E6B655' : 'rgba(244,239,230,0.24)';
    ctx.lineWidth = major ? 5 : 2;
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(a) * (major ? 156 : 162), 256 + Math.sin(a) * (major ? 156 : 162));
    ctx.lineTo(256 + Math.cos(a) * (major ? 182 : 172), 256 + Math.sin(a) * (major ? 182 : 172));
    ctx.stroke();
  }

  // Labels sit cleanly outside brass ring (r = 200) — fully below top lamp collar & never hidden by N/S poles!
  ctx.fillStyle = '#F4EFE6';
  ctx.font = '800 38px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const t of [{ deg: -90, label: '0°' }, { deg: 30, label: '120°' }, { deg: 150, label: '240°' }]) {
    const r = (t.deg * Math.PI) / 180;
    ctx.fillText(t.label, 256 + Math.cos(r) * 204, 256 + Math.sin(r) * 204);
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
  ctx.font = '800 72px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 64, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Perspective-grounded matte-brass floor nameplate (replaces floating gray sticker)
function makePlaqueTexture(text) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 88;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#181e2c';
  ctx.fillRect(0, 0, 256, 88);
  ctx.strokeStyle = '#C8A86B';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 80);
  ctx.fillStyle = '#F4EFE6';
  ctx.font = '800 46px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, 46);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGlassTexture(cracked = false) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 512);

  // Specular architectural crystal sheen
  const g = ctx.createLinearGradient(0, 0, 256, 512);
  g.addColorStop(0, 'rgba(232,246,255,0.42)');
  g.addColorStop(0.28, 'rgba(185,222,255,0.12)');
  g.addColorStop(0.55, 'rgba(244,250,255,0.34)');
  g.addColorStop(1, 'rgba(180,218,255,0.28)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 512);

  // Diagonal crystal refraction bands
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath();
  ctx.moveTo(0, 96); ctx.lineTo(256, 16); ctx.lineTo(256, 62); ctx.lineTo(0, 142);
  ctx.fill();
  ctx.fillStyle = 'rgba(230,182,85,0.10)';
  ctx.beginPath();
  ctx.moveTo(0, 340); ctx.lineTo(256, 260); ctx.lineTo(256, 290); ctx.lineTo(0, 370);
  ctx.fill();

  ctx.strokeStyle = 'rgba(244,250,255,0.85)';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 504);

  if (cracked) {
    const cx = 128, cy = 266;
    const branches = [
      [[cx, cy], [84, 198], [34, 140], [8, 96]],
      [[cx, cy], [178, 212], [228, 152], [252, 102]],
      [[cx, cy], [96, 342], [44, 418], [14, 488]],
      [[cx, cy], [170, 336], [220, 410], [250, 480]],
      [[cx, cy], [134, 178], [120, 74]],
      [[cx, cy], [58, 276], [8, 298]],
      [[cx, cy], [198, 282], [252, 256]],
      [[84, 198], [134, 178], [178, 212]],
      [[96, 342], [170, 336]],
      [[34, 140], [58, 276], [44, 418]],
      [[228, 152], [198, 282], [220, 410]],
    ];
    ctx.strokeStyle = 'rgba(255,252,245,0.98)';
    ctx.shadowColor = '#E6B655';
    ctx.shadowBlur = 16;
    ctx.lineWidth = 3.8;
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

function makePartitionTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 256, 512);
  g.addColorStop(0, 'rgba(38,48,68,0.68)');
  g.addColorStop(0.5, 'rgba(26,33,48,0.52)');
  g.addColorStop(1, 'rgba(38,48,68,0.72)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 512);
  // Subtle vertical architectural flute lines
  ctx.strokeStyle = 'rgba(244,239,230,0.08)';
  ctx.lineWidth = 2;
  for (let x = 16; x < 256; x += 16) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeBadgeTexture(text, subtext = '', accent = '#F4EFE6') {
  const c = document.createElement('canvas');
  c.width = 360;
  c.height = 120;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 360, 120);
  ctx.fillStyle = accent;
  ctx.font = '800 44px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 180, subtext ? 40 : 60);
  if (subtext) {
    ctx.fillStyle = 'rgba(244,239,230,0.88)';
    ctx.font = '700 26px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(subtext, 180, 88);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeLampBadgeTexture(symbol, hexColor) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(13,16,23,0.82)';
  ctx.beginPath();
  ctx.arc(64, 64, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = hexColor;
  ctx.lineWidth = 5;
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
  c.width = 96;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#F4EFE6';
  ctx.fillRect(0, 0, 96, 128);
  ctx.strokeStyle = '#C8A86B';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 90, 122);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = cardArr[i] === 0 ? '#FF7A6B' : '#4FD6A8';
    ctx.fillRect(16, 18 + i * 32, 64, 22);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createStage(container, { reducedMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  let targetDpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(targetDpr);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COL_NIGHT);
  scene.fog = new THREE.FogExp2(COL_NIGHT, 0.044);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.045).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.65;
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

  const rimLight = new THREE.DirectionalLight(0x789ce0, 1.1);
  rimLight.position.set(-4.5, 4.4, -5.0);
  scene.add(rimLight);

  // Seamless dark velvet studio floor (large radius = zero curved horizon edge!)
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
  const glowCoralTex = makeRadialTexture('rgba(255,175,162,0.92)', 'rgba(255,122,107,0.34)');
  const glowJadeTex = makeRadialTexture('rgba(175,255,222,0.92)', 'rgba(79,214,168,0.34)');
  const badgeCoralTex = makeLampBadgeTexture('▲', '#FF7A6B');
  const badgeJadeTex = makeLampBadgeTexture('●', '#4FD6A8');
  const dialMerminTex = makeDialFaceTexture('mermin');
  const dialChshTex = makeDialFaceTexture('chsh');
  const outerAngleRingTex = makeOuterAngleRingTexture();
  const poleNTex = makePoleDecalTexture('N', '#D99B4E', '#0D1017');
  const poleSTex = makePoleDecalTexture('S', '#90A2BE', '#0D1017');

  const brassMat = new THREE.MeshStandardMaterial({ color: COL_BRASS, roughness: 0.28, metalness: 0.82 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.52, metalness: 0.45 });
  const steelMat = new THREE.MeshStandardMaterial({ color: COL_STEEL, roughness: 0.28, metalness: 0.76 });
  const northPoleMat = new THREE.MeshStandardMaterial({ color: 0xd99b4e, roughness: 0.32, metalness: 0.7 });
  const southPoleMat = new THREE.MeshStandardMaterial({ color: 0x8ea0bc, roughness: 0.32, metalness: 0.72 });

  // ---- Central Quantum Source + Heroic 3D Brass Entanglement Lever ----
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

  // Heroic 2× Brushed-Brass Laboratory Switch Lever (unmistakable from back of classroom!)
  const leverMount = new THREE.Group();
  leverMount.position.set(0, 0.22, 0.56);
  leverMount.visible = false;
  sourceGroup.add(leverMount);

  const leverBase = new THREE.Mesh(new RoundedBoxGeometry(0.84, 0.20, 0.26, 4, 0.04), darkMetalMat);
  leverBase.castShadow = true;
  leverMount.add(leverBase);

  const leverCollarMat = new THREE.MeshStandardMaterial({
    color: COL_GOLD,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 0.35,
    roughness: 0.25,
    metalness: 0.8,
  });
  const leverCollar = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 12, 28), leverCollarMat);
  leverCollar.rotation.x = Math.PI / 2;
  leverCollar.position.y = 0.10;
  leverMount.add(leverCollar);

  const leverPivot = new THREE.Group();
  leverPivot.position.set(0, 0.08, 0);
  leverMount.add(leverPivot);

  const leverShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.044, 0.54, 18), brassMat);
  leverShaft.position.y = 0.27;
  leverPivot.add(leverShaft);

  const leverKnobMat = new THREE.MeshStandardMaterial({
    color: COL_IVORY,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 0.45,
    roughness: 0.18,
    metalness: 0.35,
  });
  const leverKnob = new THREE.Mesh(new THREE.SphereGeometry(0.115, 24, 24), leverKnobMat);
  leverKnob.position.y = 0.56;
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
  leverGlow.position.y = 0.56;
  leverGlow.scale.set(0.65, 0.65, 1);
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

    // Rubber feet (softly fade when casing ghosts out so they never float detached!)
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

    // Two dedicated shells: 100% solid matte graphite + crisp Ciechanowski ghost shell
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

    const ghostShellMat = new THREE.MeshPhysicalMaterial({
      color: 0xb8cde8,
      roughness: 0.16,
      metalness: 0.08,
      transparent: true,
      opacity: 0.13,
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
      opacity: 0.46,
      depthWrite: false,
    });
    const shellEdges = new THREE.LineSegments(new THREE.EdgesGeometry(shellGeo, 22), edgesMat);
    shellEdges.position.copy(shell.position);
    shellEdges.visible = false;
    group.add(shellEdges);

    const port = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.035, 14, 32), brassMat);
    port.rotation.y = Math.PI / 2;
    port.position.set(side === 'left' ? 0.81 : -0.81, 0.96, 0);
    group.add(port);

    // ---- Sleek Sculpted Internal Tilted Magnet Assembly (zero label occlusion!) ----
    const magnetRoot = new THREE.Group();
    magnetRoot.position.set(0, 0.59, 0.08);
    magnetRoot.visible = false;
    group.add(magnetRoot);

    // Outer graduated degree ring (0° / 120° / 240° clearly visible below top lamp collar & outside magnet sweep!)
    const degreeDisc = new THREE.Mesh(
      new THREE.PlaneGeometry(1.14, 1.14),
      new THREE.MeshBasicMaterial({ map: outerAngleRingTex, transparent: true, opacity: 0.96, depthWrite: false })
    );
    degreeDisc.position.z = -0.18;
    magnetRoot.add(degreeDisc);

    // Compact sculpted tapered twin-pole rotor (stays strictly inside r = 0.34)
    const magnetRotor = new THREE.Group();
    magnetRoot.add(magnetRotor);

    const rotorRing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.018, 12, 42), brassMat);
    magnetRotor.add(rotorRing);

    // Tapered North pole shoe (warm brushed brass + crisp 'N' badge)
    const northShoe = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.085, 0.16, 6), northPoleMat);
    northShoe.position.set(0, 0.19, 0);
    magnetRotor.add(northShoe);

    const badgeN = new THREE.Mesh(
      new THREE.PlaneGeometry(0.13, 0.13),
      new THREE.MeshBasicMaterial({ map: poleNTex })
    );
    badgeN.position.set(0, 0.19, 0.135);
    magnetRotor.add(badgeN);

    // Tapered South pole shoe (cool satin steel + crisp 'S' badge)
    const southShoe = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.14, 0.16, 6), southPoleMat);
    southShoe.position.set(0, -0.19, 0);
    magnetRotor.add(southShoe);

    const badgeS = new THREE.Mesh(
      new THREE.PlaneGeometry(0.13, 0.13),
      new THREE.MeshBasicMaterial({ map: poleSTex })
    );
    badgeS.position.set(0, -0.19, 0.135);
    magnetRotor.add(badgeS);

    // Slim golden magnetic-axis needle
    const axisStem = new THREE.Mesh(
      new THREE.BoxGeometry(0.028, 0.28, 0.028),
      new THREE.MeshBasicMaterial({ color: COL_GOLD, transparent: true, opacity: 0.82 })
    );
    magnetRotor.add(axisStem);

    // Subtle interior deflection sparkle flash when firing in Step 4
    const deflectFlash = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowGoldTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0,
      })
    );
    deflectFlash.scale.set(0.48, 0.48, 1);
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

    // ---- Top Blown-Glass Dome Lamp ----
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.34, 0.10, 32), brassMat);
    lampBase.position.y = 1.32;
    group.add(lampBase);

    const lampMat = new THREE.MeshPhysicalMaterial({
      color: 0xdce2ec,
      emissive: new THREE.Color(0x283042),
      emissiveIntensity: 0.38,
      roughness: 0.28,
      metalness: 0.0,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
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
    lampHalo.position.set(0, 1.54, 0);
    lampHalo.scale.set(1.22, 1.22, 1);
    group.add(lampHalo);

    const lampSymbol = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: badgeCoralTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.0,
      })
    );
    lampSymbol.position.set(0, 1.98, 0);
    lampSymbol.scale.set(0.42, 0.42, 1);
    group.add(lampSymbol);

    const lampLight = new THREE.PointLight(COL_IVORY, 0, 3.8, 2);
    lampLight.position.set(0, 1.7, 0.35);
    group.add(lampLight);

    // Perspective-grounded matte-brass angled museum easel nameplate (zero clipping!)
    const plaqueGroup = new THREE.Group();
    plaqueGroup.position.set(0, 0.0, 1.06);
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
      deflectFlash,
      deflectAge: 1,
      dialGroup,
      dialFaceMat,
      dialKnob,
      lampMat,
      lampHalo,
      lampSymbol,
      lampLight,
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

  // ---- Step 7 Architectural Frosted-Glass Lab Partition (NO smudge blobs!) ----
  const partitionGroup = new THREE.Group();
  partitionGroup.position.set(-1.18, 0, 0.15);
  partitionGroup.visible = false;
  scene.add(partitionGroup);

  const partBase = new THREE.Mesh(new RoundedBoxGeometry(0.18, 0.10, 2.4, 2, 0.02), darkMetalMat);
  partBase.position.y = 0.05;
  partitionGroup.add(partBase);

  const partFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.25, 0.06), brassMat);
  partFrameL.position.set(0, 1.18, -1.16);
  partitionGroup.add(partFrameL);
  const partFrameR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.25, 0.06), brassMat);
  partFrameR.position.set(0, 1.18, 1.16);
  partitionGroup.add(partFrameR);
  const partFrameTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 2.40), brassMat);
  partFrameTop.position.set(0, 2.30, 0);
  partitionGroup.add(partFrameTop);

  const partGlass = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 2.18, 2.26),
    new THREE.MeshPhysicalMaterial({
      map: makePartitionTexture(),
      color: 0xd0e2f8,
      roughness: 0.25,
      metalness: 0.08,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    })
  );
  partGlass.position.y = 1.18;
  partitionGroup.add(partGlass);

  let partitionTargetY = 0;
  let partitionCurrentY = 0;

  // ---- Grounded Architectural Light-Beam Score Gallery + Thick Crystal 75% Glass Monolith ----
  // Stands physically on the studio floor behind the boxes (z = -1.45) — NEVER a floating plank!
  const arenaGroup = new THREE.Group();
  arenaGroup.position.set(0, 0, -1.45);
  arenaGroup.visible = false;
  scene.add(arenaGroup);

  const BEAM_Y = 2.08;
  const BAR_LEN = 5.8;
  const BAR_X0 = -BAR_LEN / 2;

  // Twin grounded brass stanchion pillars set slightly OUTSIDE the boxes so lamp domes have clean dark silhouette!
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

  // Sleek recessed obsidian optical channel
  const channelMesh = new THREE.Mesh(
    new RoundedBoxGeometry(BAR_LEN + 0.08, 0.26, 0.24, 4, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x131824, roughness: 0.6, metalness: 0.4 })
  );
  channelMesh.position.y = BEAM_Y;
  arenaGroup.add(channelMesh);

  // Luminous Liquid-Light Beam (always rendered at TRUE live winRate!)
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

  // Bright liquid-light tip glow sprite following the beam front
  const beamTipGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowIvoryTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.72,
    })
  );
  beamTipGlow.position.set(BAR_X0, BEAM_Y, 0.12);
  beamTipGlow.scale.set(0.75, 0.75, 1);
  arenaGroup.add(beamTipGlow);

  // Thick, Edge-Lit Refractive-Looking 75% Crystal Glass Monolith
  const x75 = BAR_X0 + 0.75 * BAR_LEN;
  const glassIntactTex = makeGlassTexture(false);
  const glassCrackedTex = makeGlassTexture(true);

  const wallGroup = new THREE.Group();
  wallGroup.position.set(x75, BEAM_Y, 0.04);
  arenaGroup.add(wallGroup);

  const glassGeo = new THREE.BoxGeometry(0.16, 1.32, 0.82);
  const glassPaneMat = new THREE.MeshPhysicalMaterial({
    map: glassIntactTex,
    color: 0xe6f4ff,
    emissive: new THREE.Color(0x628ec2),
    emissiveIntensity: 0.35,
    roughness: 0.05,
    metalness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.44,
    side: THREE.DoubleSide,
  });
  const glassPane = new THREE.Mesh(glassGeo, glassPaneMat);
  wallGroup.add(glassPane);

  const glassEdgeLines = new THREE.LineSegments(
    new THREE.EdgesGeometry(glassGeo),
    new THREE.LineBasicMaterial({ color: 0xf4faff, transparent: true, opacity: 0.92 })
  );
  wallGroup.add(glassEdgeLines);

  // Brushed brass clamping shoes (BOTH vanish cleanly on shatter — ZERO dangling artifacts!)
  const clampGeo = new RoundedBoxGeometry(0.22, 0.075, 0.88, 2, 0.02);
  const clampTop = new THREE.Mesh(clampGeo, brassMat);
  clampTop.position.y = 0.69;
  wallGroup.add(clampTop);
  const clampBot = new THREE.Mesh(clampGeo, brassMat);
  clampBot.position.y = -0.69;
  wallGroup.add(clampBot);

  // Clean flush tick mark on the rail after shatter (zero floating wires or hanging brackets!)
  const tick75 = new THREE.Mesh(
    new THREE.BoxGeometry(0.032, 0.36, 0.28),
    new THREE.MeshBasicMaterial({ color: COL_GLASS, transparent: true, opacity: 0.42 })
  );
  tick75.visible = false;
  wallGroup.add(tick75);

  const label75 = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: makeBadgeTexture('75%', 'PLAN LIMIT', '#DCE8F8'), transparent: true, depthWrite: false })
  );
  label75.position.set(0, 1.04, 0);
  label75.scale.set(1.16, 0.4, 1);
  wallGroup.add(label75);

  // 85.4% Quantum Gold Horizon Pillar (COMPLETELY HIDDEN until Breakthrough!)
  const x85 = BAR_X0 + 0.853553 * BAR_LEN;
  const goldLineMat = new THREE.MeshStandardMaterial({
    color: COL_GOLD,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 2.1,
    roughness: 0.18,
    metalness: 0.78,
    transparent: true,
    opacity: 0.0,
  });
  const goldLine = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.24, 0.09), goldLineMat);
  goldLine.position.set(x85, BEAM_Y, 0.04);
  goldLine.visible = false;
  arenaGroup.add(goldLine);

  const label85Mat = new THREE.SpriteMaterial({
    map: makeBadgeTexture('85.4%', 'QUANTUM LIMIT', '#E6B655'),
    transparent: true,
    depthWrite: false,
    opacity: 0.0,
  });
  const label85 = new THREE.Sprite(label85Mat);
  label85.position.set(x85 + 0.48, BEAM_Y + 1.04, 0);
  label85.scale.set(1.28, 0.44, 1);
  label85.visible = false;
  arenaGroup.add(label85);

  // Golden impact flash shockwave on shatter!
  const shatterFlash = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowGoldTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.0,
    })
  );
  shatterFlash.position.set(x75, BEAM_Y, 0.35);
  shatterFlash.scale.set(0.5, 0.5, 1);
  shatterFlash.visible = false;
  arenaGroup.add(shatterFlash);

  const shatterPoint = new THREE.PointLight(COL_GOLD, 0, 9, 2);
  shatterPoint.position.set(x75, BEAM_Y, 0.65);
  arenaGroup.add(shatterPoint);

  // 140 Translucent, High-Specular, Warm-Backlit Crystal Glass Shards + 48 Additive Edge Glints!
  const SHARD_COUNT = 140;
  // Thin razor-like diamond crystal shard geometry
  const shardGeo = new THREE.OctahedronGeometry(0.11, 0);
  shardGeo.scale(0.28, 1.35, 0.65);
  const shardMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf6ff,
    emissive: new THREE.Color(0xdcb464),
    emissiveIntensity: 0.62,
    roughness: 0.04,
    metalness: 0.28,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 2.6,
    transparent: true,
    opacity: 0.56,
  });
  const shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, SHARD_COUNT);
  shardMesh.visible = false;
  arenaGroup.add(shardMesh);

  const SPARK_COUNT = 48;
  const sparkGeo = new THREE.OctahedronGeometry(0.032, 0);
  const sparkMat = new THREE.MeshBasicMaterial({
    color: 0xfff0c8,
    transparent: true,
    opacity: 0.96,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sparkMesh = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_COUNT);
  sparkMesh.visible = false;
  arenaGroup.add(sparkMesh);

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
  let cardStripTex = makeCardStripTexture([0, 0, 1]);

  function setCardStrip(cardArr) {
    const next = makeCardStripTexture(cardArr);
    cardStripTex.dispose();
    cardStripTex = next;
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
  let peelTarget = 0;
  let peelCurrent = 0;
  let wallState = 'intact';
  let shatterAge = 0;
  let slowMoTimer = 0;
  let shakeAmount = 0;
  let breakthroughZoom = 0; // eases camera in during crack/shatter, then eases back!
  let barTargetPct = 0;
  let barCurrentPct = 0;
  let barIsQuantum = false;
  let sourceEntangled = true;
  let showStationPlaques = false;
  let showLampBadges = false;
  let stepIndex = 0;

  // Adaptive quality guard for phones
  let frameTimeEma = 16;
  let slowFrameTimer = 0;
  let qualityReduced = false;

  const camTargetPos = new THREE.Vector3(0, 2.4, 8.4);
  const camTargetLook = new THREE.Vector3(0, 0.85, 0);
  const camCurLook = new THREE.Vector3(0, 0.85, 0);

  function updateCameraTargets() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    const aspect = w / Math.max(1, h);
    const isTallPortrait = aspect < 0.72;
    const isPhoneStage = aspect < 1.25 && stepIndex > 0;

    const halfSpan = stepIndex === 5 || stepIndex === 6 ? 3.85 : 3.5;
    const vFovRad = (camera.fov * Math.PI) / 180;
    const minZForWidth = halfSpan / (Math.tan(vFovRad / 2) * Math.max(0.42, aspect));

    if (stepIndex === 0) {
      if (isTallPortrait) {
        // Bold hero boxes filling upper-middle of phone screen — zero 40% black void!
        const z = Math.max(9.6, minZForWidth * 0.94);
        camTargetPos.set(0, 2.05, z);
        camTargetLook.set(0, 0.28, 0.15);
      } else {
        const z = Math.max(7.9, minZForWidth * 1.02);
        camTargetPos.set(0, 2.3, z);
        camTargetLook.set(0, 0.82, 0.15);
      }
    } else if (stepIndex === 4) {
      const z = Math.max(7.5, minZForWidth * 1.0);
      camTargetPos.set(0, 1.88, z);
      camTargetLook.set(0, 0.84, 0.15);
    } else if (stepIndex === 5 || stepIndex === 6) {
      // On phone, lower lookAt.y so 75% / 85.4% badges sit cleanly BELOW top chrome pills!
      const baseZ = Math.max(isPhoneStage ? 11.4 : 10.6, minZForWidth * 1.06);
      const z = baseZ - breakthroughZoom * 1.35;
      const lx = breakthroughZoom * 0.65;
      const ly = isPhoneStage ? 1.28 : 1.48 + breakthroughZoom * 0.25;
      camTargetPos.set(lx, 2.48, z);
      camTargetLook.set(lx, ly, -0.35);
    } else if (stepIndex === 7) {
      const z = Math.max(8.5, minZForWidth * 1.03);
      camTargetPos.set(0.18, 2.2, z);
      camTargetLook.set(0.18, 0.88, 0.15);
    } else {
      const z = Math.max(8.2, minZForWidth * 1.03);
      camTargetPos.set(0, 2.25, z);
      camTargetLook.set(0, 0.88, 0.15);
    }
  }

  function resize() {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 0.72 ? 46 : 34;
    camera.updateProjectionMatrix();
    updateCameraTargets();
  }

  function bloomLamp(box, colorIdx) {
    box.lampColor = colorIdx;
    box.lampBloom = 1.0;
    const col = colorIdx === 0 ? COL_CORAL : COL_JADE;
    const emissiveCol = colorIdx === 0 ? 0xff4c3b : 0x22cc8e;
    box.lampMat.color.setHex(col);
    box.lampMat.emissive.setHex(emissiveCol);
    box.lampLight.color.setHex(col);
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
    leverKnobMat.color.setHex(val ? COL_GOLD : COL_IVORY);
    leverKnobMat.emissiveIntensity = val ? 1.5 : 0.4;
    leverCollarMat.emissiveIntensity = val ? 1.2 : 0.35;
    leverGlow.material.opacity = val ? 0.85 : 0.3;
  }

  function setTeacherMode(on) {
    teacherMode = !!on;
    keyLight.intensity = teacherMode ? 2.6 : 2.0;
    rimLight.intensity = teacherMode ? 1.5 : 1.1;
    hemi.intensity = teacherMode ? 1.0 : 0.74;
    scene.environmentIntensity = teacherMode ? 0.86 : 0.65;
    const ls = teacherMode ? 1.38 : 1.0;
    label75.scale.set(1.16 * ls, 0.4 * ls, 1);
    label85.scale.set(1.28 * ls, 0.44 * ls, 1);
  }

  function setStep(step) {
    stepIndex = step;
    showStationPlaques = step >= 1;
    showLampBadges = step >= 1;
    arenaGroup.visible = step === 5 || step === 6;
    leverMount.visible = step === 5 || step === 6;
    partitionGroup.visible = step === 7;
    if (step !== 6) breakthroughZoom = 0;
    setDialMode(step === 5 || step === 6 || step === 7 ? 'chsh' : 'mermin');
    boxLeft.dimmed = false;
    boxRight.dimmed = false;
    updateCameraTargets();
    if (isReducedMotion) {
      camera.position.copy(camTargetPos);
      camCurLook.copy(camTargetLook);
      camera.lookAt(camCurLook);
    }
  }

  function setAlicePartition(raised) {
    boxLeft.dimmed = !!raised;
    partitionTargetY = raised ? 0 : -2.6;
  }

  function setArenaProgress(pct, { isQuantum = false, snap = false } = {}) {
    barTargetPct = Math.max(0, Math.min(1, pct));
    barIsQuantum = isQuantum;
    if (snap) barCurrentPct = barTargetPct;
  }

  function setWallState(next, { settled = false } = {}) {
    if (next === wallState && !settled) return;
    wallState = next;
    if (next === 'intact') {
      glassPane.visible = true;
      glassEdgeLines.visible = true;
      clampTop.visible = true;
      clampBot.visible = true;
      tick75.visible = false;
      glassPaneMat.map = glassIntactTex;
      glassPaneMat.emissive.setHex(0x628ec2);
      glassPaneMat.emissiveIntensity = 0.35;
      glassPaneMat.opacity = 0.44;
      glassPaneMat.needsUpdate = true;
      shardMesh.visible = false;
      sparkMesh.visible = false;
      shatterFlash.visible = false;
      shatterPoint.intensity = 0;
      goldLine.visible = false;
      label85.visible = false;
      goldLineMat.opacity = 0.0;
      label85Mat.opacity = 0.0;
      breakthroughZoom = 0;
      updateCameraTargets();
    } else if (next === 'cracked') {
      glassPane.visible = true;
      glassEdgeLines.visible = true;
      glassPaneMat.map = glassCrackedTex;
      glassPaneMat.emissive.setHex(COL_GOLD);
      glassPaneMat.emissiveIntensity = 0.85;
      glassPaneMat.opacity = 0.68;
      glassPaneMat.needsUpdate = true;
      breakthroughZoom = 0.7;
      updateCameraTargets();
      if (!isReducedMotion) shakeAmount = 0.06;
    } else if (next === 'shattered') {
      // Remove ENTIRE glass pane, frame, AND both clamps — ZERO dangling brackets!
      glassPane.visible = false;
      glassEdgeLines.visible = false;
      clampTop.visible = false;
      clampBot.visible = false;
      tick75.visible = true;
      goldLine.visible = true;
      label85.visible = true;
      goldLineMat.opacity = 1.0;
      label85Mat.opacity = 1.0;
      if (!isReducedMotion && !settled) {
        shatterAge = 0;
        slowMoTimer = 0.52;
        shakeAmount = 0.14;
        breakthroughZoom = 1.0;
        updateCameraTargets();
        shardMesh.visible = true;
        sparkMesh.visible = true;
        shatterFlash.visible = true;
        shatterFlash.material.opacity = 0.95;
        shatterFlash.scale.set(1.2, 1.2, 1);
        shatterPoint.intensity = 4.2;
        shardMat.opacity = 0.64;
        sparkMat.opacity = 0.98;
        for (let i = 0; i < SHARD_COUNT; i++) {
          const s = shards[i];
          const angle = Math.random() * Math.PI * 2;
          const speed = 2.0 + Math.random() * 5.2;
          const startY = (Math.random() - 0.5) * 1.24;
          const startZ = (Math.random() - 0.5) * 0.72;
          s.pos.set(x75 + (Math.random() - 0.5) * 0.16, BEAM_Y + startY, startZ);
          // Explosive radial + forward fountain burst (never bunched in a column!)
          s.vel.set(
            1.4 + Math.cos(angle) * speed * 0.75 + Math.random() * 2.4,
            0.7 + Math.sin(angle) * speed * 0.65 + startY * 1.6,
            1.2 + Math.random() * 3.8
          );
          s.rot.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
          s.angVel.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14);
          const sc = 0.45 + Math.random() * 1.15;
          s.scale.set(sc * 0.7, sc * 1.25, sc * 0.85);
        }
        for (let i = 0; i < SPARK_COUNT; i++) {
          const sp = sparks[i];
          const a = Math.random() * Math.PI * 2;
          const r = 2.4 + Math.random() * 4.6;
          sp.pos.set(x75, BEAM_Y + (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.4);
          sp.vel.set(1.6 + Math.cos(a) * r * 0.8, 0.8 + Math.sin(a) * r * 0.7, 1.4 + Math.random() * 3.5);
        }
      } else {
        // Calm settled state: zero shards, camera eased cleanly back!
        shardMesh.visible = false;
        sparkMesh.visible = false;
        shatterFlash.visible = false;
        shatterPoint.intensity = 0;
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

  // ---- Render Loop ----
  let lastNow = performance.now();
  let animId = 0;
  let elapsed = 0;

  function animate(now) {
    animId = requestAnimationFrame(animate);
    const rawMs = Math.min(80, Math.max(1, now - lastNow));
    const rawDt = Math.min(0.05, rawMs / 1000);
    lastNow = now;

    // Adaptive-quality guard for phones (drops DPR if frame time > 22ms)
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

    let timeScale = 1.0;
    if (slowMoTimer > 0) {
      slowMoTimer = Math.max(0, slowMoTimer - rawDt);
      timeScale = 0.28;
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
    }

    leverCurrentAngle += (leverTargetAngle - leverCurrentAngle) * Math.min(1, rawDt * 12);
    leverPivot.rotation.z = leverCurrentAngle;

    // Step 7 frosted lab partition slide
    if (partitionGroup.visible) {
      partitionCurrentY += (partitionTargetY - partitionCurrentY) * Math.min(1, rawDt * 8);
      partitionGroup.position.y = partitionCurrentY;
    }

    // Dedicated solid vs ghost shell swap
    const peelSpeed = isReducedMotion ? 16 : 9;
    peelCurrent += (peelTarget - peelCurrent) * Math.min(1, rawDt * peelSpeed);
    if (peelTarget === 0 && peelCurrent < 0.03) peelCurrent = 0;
    if (peelTarget === 1 && peelCurrent > 0.97) peelCurrent = 1;

    const isPeeledVisual = peelCurrent > 0.25;
    for (const box of [boxLeft, boxRight]) {
      if (isPeeledVisual) {
        box.shell.visible = false;
        box.ghostShell.visible = true;
        box.ghostShellMat.opacity = 0.13 * peelCurrent;
        box.shellEdges.visible = true;
        box.edgesMat.opacity = peelCurrent * 0.48;
        box.magnetRoot.visible = true;
        box.dialGroup.visible = false;
        box.footMat.opacity = 0.24;
      } else {
        box.shell.visible = true;
        box.ghostShell.visible = false;
        box.shellEdges.visible = false;
        box.magnetRoot.visible = false;
        box.dialGroup.visible = true;
        box.footMat.opacity = 1.0;
      }

      // Interior magnet deflection flash decay (Step 4)
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

      if (box.lampBloom > 0.01) box.lampBloom = Math.max(0.35, box.lampBloom - rawDt * 0.42);
      const bloom = box.lampColor >= 0 ? box.lampBloom : 0;
      const dimMul = box.dimmed ? 0.25 : 1.0;
      box.lampMat.emissiveIntensity = (0.25 + bloom * 1.35) * dimMul;
      box.lampHalo.material.opacity = bloom * 0.65 * dimMul;
      box.lampLight.intensity = bloom * 2.2 * dimMul;
      box.lampSymbol.material.opacity = (showLampBadges && box.lampColor >= 0) ? Math.min(1, 0.76 + bloom * 0.24) * dimMul : 0;
    }

    // Active flying mote pairs / folded ivory cards
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

    // Grounded Light-Beam Score Gallery + Dramatic Crystal Glass Shatter!
    if (arenaGroup.visible) {
      barCurrentPct += (barTargetPct - barCurrentPct) * Math.min(1, rawDt * 9);
      const len = Math.max(0.04, barCurrentPct * BAR_LEN);
      barFill.scale.x = len;
      barFill.position.x = BAR_X0 + len / 2;

      const isGoldenSurge = barIsQuantum && wallState === 'shattered';
      const targetCol = isGoldenSurge ? 0xf2b940 : barIsQuantum ? 0xf5d484 : COL_IVORY;
      const targetEmissive = isGoldenSurge ? 0xd98e14 : barIsQuantum ? 0xd8a848 : COL_IVORY;
      barMat.color.lerp(new THREE.Color(targetCol), Math.min(1, rawDt * 8));
      barMat.emissive.lerp(new THREE.Color(targetEmissive), Math.min(1, rawDt * 8));
      barMat.emissiveIntensity = isGoldenSurge ? 1.2 : 0.88;

      beamTipGlow.position.set(BAR_X0 + len, BEAM_Y, 0.14);
      beamTipGlow.material.map = isGoldenSurge ? glowGoldTex : glowIvoryTex;
      beamTipGlow.material.opacity = barCurrentPct > 0.02 ? (isGoldenSurge ? 0.95 : 0.55) : 0;

      if (shardMesh.visible) {
        shatterAge += dt;
        // Golden impact shockwave flash fades cleanly over first 0.55s
        if (shatterFlash.visible) {
          const fl = Math.max(0, 1 - shatterAge / 0.55);
          shatterFlash.material.opacity = fl * 0.95;
          const sc = 1.4 + (1 - fl) * 4.2;
          shatterFlash.scale.set(sc, sc, 1);
          shatterPoint.intensity = fl * 4.2;
          if (fl <= 0.01) shatterFlash.visible = false;
        }
        // Camera eases smoothly back after 0.75s
        if (shatterAge > 0.75 && breakthroughZoom > 0) {
          breakthroughZoom = Math.max(0, breakthroughZoom - rawDt * 1.4);
          updateCameraTargets();
        }
        const fade = Math.max(0, 1 - shatterAge / 2.2);
        shardMat.opacity = fade * 0.66;
        sparkMat.opacity = fade * 0.98;
        for (let i = 0; i < SHARD_COUNT; i++) {
          const s = shards[i];
          s.vel.y -= 3.6 * dt;
          s.pos.addScaledVector(s.vel, dt);
          s.rot.x += s.angVel.x * dt;
          s.rot.y += s.angVel.y * dt;
          s.rot.z += s.angVel.z * dt;
          dummy.position.copy(s.pos);
          dummy.rotation.copy(s.rot);
          dummy.scale.copy(s.scale);
          dummy.updateMatrix();
          shardMesh.setMatrixAt(i, dummy.matrix);
        }
        shardMesh.instanceMatrix.needsUpdate = true;

        for (let i = 0; i < SPARK_COUNT; i++) {
          const sp = sparks[i];
          sp.vel.y -= 1.8 * dt;
          sp.pos.addScaledVector(sp.vel, dt);
          dummy.position.copy(sp.pos);
          dummy.rotation.set(elapsed * 5 + i, elapsed * 4, 0);
          dummy.scale.setScalar(0.7 + fade * 0.9);
          dummy.updateMatrix();
          sparkMesh.setMatrixAt(i, dummy.matrix);
        }
        sparkMesh.instanceMatrix.needsUpdate = true;

        if (fade <= 0.01) {
          shardMesh.visible = false;
          sparkMesh.visible = false;
          shatterPoint.intensity = 0;
        }
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
  }

  resize();
  window.addEventListener('resize', resize);
  animId = requestAnimationFrame(animate);

  return {
    resize,
    setStep,
    setDial,
    setPeel,
    setCardStrip,
    setSourceEntangled,
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
