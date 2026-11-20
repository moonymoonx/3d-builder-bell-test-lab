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
  g.addColorStop(0, 'rgba(4,6,11,0.74)');
  g.addColorStop(0.55, 'rgba(4,6,11,0.34)');
  g.addColorStop(1, 'rgba(4,6,11,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function makeFloorPoolTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(256, 256, 18, 256, 256, 252);
  g.addColorStop(0, '#252e40');
  g.addColorStop(0.45, '#161c29');
  g.addColorStop(0.84, '#0f121a');
  g.addColorStop(1, '#0d1017');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Numerals sit cleanly on outer track so the brass pointer needle NEVER obscures them
function makeDialFaceTexture(mode = 'mermin') {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#141925';
  ctx.beginPath();
  ctx.arc(128, 128, 124, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(200,168,107,0.58)';
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
    const labels = [
      { t: '1', deg: -90 },
      { t: '2', deg: 30 },
      { t: '3', deg: 150 },
    ];
    for (const l of labels) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 86, 128 + Math.sin(r) * 86);
    }
  } else {
    ctx.font = '700 36px -apple-system, BlinkMacSystemFont, sans-serif';
    const labels = [
      { t: '0', deg: -135 },
      { t: '1', deg: -45 },
    ];
    for (const l of labels) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 84, 128 + Math.sin(r) * 84);
    }
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

function makeAngleRingTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(244,239,230,0.34)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(128, 128, 102, 0, Math.PI * 2);
  ctx.stroke();

  // Ticks at 0°, 120°, 240°
  const ticks = [
    { deg: -90, label: '0°' },
    { deg: 30, label: '120°' },
    { deg: 150, label: '240°' },
  ];
  ctx.fillStyle = 'rgba(244,239,230,0.88)';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const t of ticks) {
    const r = (t.deg * Math.PI) / 180;
    ctx.strokeStyle = '#E6B655';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(128 + Math.cos(r) * 90, 128 + Math.sin(r) * 90);
    ctx.lineTo(128 + Math.cos(r) * 106, 128 + Math.sin(r) * 106);
    ctx.stroke();
    ctx.fillText(t.label, 128 + Math.cos(r) * 74, 128 + Math.sin(r) * 74);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGlassTexture(crackStage = 0) {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 512);

  // Refractive architectural frost sheen
  const g = ctx.createLinearGradient(0, 0, 256, 512);
  g.addColorStop(0, 'rgba(232,244,255,0.36)');
  g.addColorStop(0.28, 'rgba(200,224,250,0.12)');
  g.addColorStop(0.55, 'rgba(240,248,255,0.28)');
  g.addColorStop(1, 'rgba(195,220,248,0.30)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 512);

  // Diagonal specular glint bands
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.beginPath();
  ctx.moveTo(0, 90); ctx.lineTo(256, 20); ctx.lineTo(256, 62); ctx.lineTo(0, 132);
  ctx.fill();

  // Crisp bright frosted bezel border
  ctx.strokeStyle = 'rgba(244,239,230,0.72)';
  ctx.lineWidth = 5;
  ctx.strokeRect(4, 4, 248, 504);

  if (crackStage >= 1) {
    const cx = 128, cy = 266;
    const branches = [
      [[cx, cy], [86, 202], [38, 146], [10, 108]],
      [[cx, cy], [176, 218], [224, 158], [250, 112]],
      [[cx, cy], [98, 336], [48, 410], [16, 480]],
      [[cx, cy], [168, 332], [218, 404], [248, 474]],
      [[cx, cy], [134, 184], [120, 92]],
      [[cx, cy], [64, 276], [10, 294]],
      [[cx, cy], [194, 282], [250, 260]],
      [[86, 202], [134, 184], [176, 218]],
      [[98, 336], [168, 332]],
    ];
    ctx.strokeStyle = 'rgba(255,250,240,0.96)';
    ctx.shadowColor = '#E6B655';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 3.6;
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

function makeBadgeTexture(text, subtext = '', accent = '#F4EFE6') {
  const c = document.createElement('canvas');
  c.width = 320;
  c.height = 112;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 320, 112);
  ctx.fillStyle = accent;
  ctx.font = '700 40px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 160, subtext ? 38 : 56);
  if (subtext) {
    ctx.fillStyle = 'rgba(244,239,230,0.82)';
    ctx.font = '700 24px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(subtext, 160, 82);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Intentional accessibility badge pill above lamp dome (never looks like a stray floating dot)
function makeLampBadgeTexture(symbol, hexColor) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'rgba(13,16,23,0.78)';
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

function makeVeilTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 18, 64, 64, 64);
  g.addColorStop(0, 'rgba(13,16,23,0.82)');
  g.addColorStop(0.6, 'rgba(13,16,23,0.62)');
  g.addColorStop(1, 'rgba(13,16,23,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
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
  scene.fog = new THREE.FogExp2(COL_NIGHT, 0.042);

  // RoomEnvironment PMREM for studio reflections
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.045).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.62;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(0, 2.5, 8.5);
  camera.lookAt(0, 0.85, 0);

  // Studio lighting rig (boosted automatically in Teacher projector mode!)
  const hemi = new THREE.HemisphereLight(0x88a4da, 0x121724, 0.72);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xfff3df, 1.95);
  keyLight.position.set(3.2, 7.6, 5.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 20;
  keyLight.shadow.camera.left = -5.5;
  keyLight.shadow.camera.right = 5.5;
  keyLight.shadow.camera.top = 5.5;
  keyLight.shadow.camera.bottom = -5.5;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.radius = 4;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x7599db, 1.05);
  rimLight.position.set(-4.5, 4.4, -5.0);
  scene.add(rimLight);

  // Seamless studio pool floor
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(18, 64),
    new THREE.MeshStandardMaterial({
      map: makeFloorPoolTexture(),
      roughness: 0.9,
      metalness: 0.05,
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const shadowTex = makeShadowTexture();
  const veilTex = makeVeilTexture();
  const glowGoldTex = makeRadialTexture('rgba(255,240,200,1)', 'rgba(230,182,85,0.48)');
  const glowIvoryTex = makeRadialTexture('rgba(255,252,245,0.95)', 'rgba(244,239,230,0.35)');
  const glowCoralTex = makeRadialTexture('rgba(255,180,168,1)', 'rgba(255,122,107,0.48)');
  const glowJadeTex = makeRadialTexture('rgba(185,255,228,1)', 'rgba(79,214,168,0.48)');
  const badgeCoralTex = makeLampBadgeTexture('▲', '#FF7A6B');
  const badgeJadeTex = makeLampBadgeTexture('●', '#4FD6A8');
  const dialMerminTex = makeDialFaceTexture('mermin');
  const dialChshTex = makeDialFaceTexture('chsh');
  const angleRingTex = makeAngleRingTexture();
  const poleNTex = makePoleDecalTexture('N', '#C8843B', '#0D1017');
  const poleSTex = makePoleDecalTexture('S', '#93A3BE', '#0D1017');

  const brassMat = new THREE.MeshStandardMaterial({ color: COL_BRASS, roughness: 0.3, metalness: 0.8 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.55, metalness: 0.42 });
  const steelMat = new THREE.MeshStandardMaterial({ color: COL_STEEL, roughness: 0.3, metalness: 0.74 });
  const northPoleMat = new THREE.MeshStandardMaterial({ color: 0xd99b4e, roughness: 0.34, metalness: 0.65 });
  const southPoleMat = new THREE.MeshStandardMaterial({ color: 0x8ea0bc, roughness: 0.34, metalness: 0.68 });

  // ---- Central Quantum Source + Tactile 3D Brass Entanglement Lever ----
  const sourceGroup = new THREE.Group();
  scene.add(sourceGroup);

  const srcShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 1.6),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  );
  srcShadow.rotation.x = -Math.PI / 2;
  srcShadow.position.y = 0.005;
  sourceGroup.add(srcShadow);

  const srcPedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.48, 0.26, 32), darkMetalMat);
  srcPedestal.position.y = 0.13;
  srcPedestal.castShadow = true;
  srcPedestal.receiveShadow = true;
  sourceGroup.add(srcPedestal);

  const srcStem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.45, 20), brassMat);
  srcStem.position.y = 0.45;
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
    emissiveIntensity: 1.85,
    roughness: 0.2,
    metalness: 0.1,
  });
  const sourceCore = new THREE.Mesh(new THREE.SphereGeometry(0.145, 28, 28), coreMat);
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

  const sourcePoint = new THREE.PointLight(COL_GOLD, 1.7, 5.8, 2);
  sourcePoint.position.set(0, 0.96, 0.25);
  sourceGroup.add(sourcePoint);

  // Physical 3D Brass Throw-Lever on front of pedestal (shown in Steps 5 & 6)
  const leverMount = new THREE.Group();
  leverMount.position.set(0, 0.24, 0.46);
  leverMount.visible = false;
  sourceGroup.add(leverMount);

  const leverSlot = new THREE.Mesh(new RoundedBoxGeometry(0.54, 0.12, 0.16, 3, 0.03), darkMetalMat);
  leverMount.add(leverSlot);

  const leverPivot = new THREE.Group();
  leverPivot.position.set(0, 0.02, 0);
  leverMount.add(leverPivot);

  const leverShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.032, 0.34, 16), brassMat);
  leverShaft.position.y = 0.17;
  leverPivot.add(leverShaft);

  const leverKnobMat = new THREE.MeshStandardMaterial({
    color: COL_IVORY,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 0.25,
    roughness: 0.22,
    metalness: 0.35,
  });
  const leverKnob = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 20), leverKnobMat);
  leverKnob.position.y = 0.35;
  leverPivot.add(leverKnob);

  let leverTargetAngle = 0.55; // left = hidden card, right (-0.55) = entangled
  let leverCurrentAngle = 0.55;

  // Notice: ZERO horizontal wire/guide line between boxes! ("Two boxes. No wires.")

  // ---- Mystery Box Builder (Alice left, Bob right) ----
  function createMysteryBox(side, labelText) {
    const group = new THREE.Group();
    const xPos = side === 'left' ? -2.36 : 2.36;
    group.position.set(xPos, 0, 0);
    scene.add(group);

    // Grounded contact shadow
    const sh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.55, 2.25),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    sh.rotation.x = -Math.PI / 2;
    sh.position.y = 0.005;
    group.add(sh);

    // Rubber feet
    const footGeo = new THREE.CylinderGeometry(0.11, 0.12, 0.06, 16);
    for (const fx of [-0.56, 0.56]) {
      for (const fz of [-0.46, 0.46]) {
        const foot = new THREE.Mesh(footGeo, darkMetalMat);
        foot.position.set(fx, 0.03, fz);
        group.add(foot);
      }
    }

    // Two dedicated shells: 100% solid matte graphite (zero X-ray bleed) + Ciechanowski ghost glass shell (crystal-clear cutaway!)
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

    // Crisp Ciechanowski architectural wireframe outline (only visible when peeled)
    const edgesMat = new THREE.LineBasicMaterial({
      color: COL_IVORY,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
    });
    const shellEdges = new THREE.LineSegments(new THREE.EdgesGeometry(shellGeo, 22), edgesMat);
    shellEdges.position.copy(shell.position);
    shellEdges.visible = false;
    group.add(shellEdges);

    // Brass entry aperture port facing the central source
    const port = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.035, 14, 32), brassMat);
    port.rotation.y = Math.PI / 2;
    port.position.set(side === 'left' ? 0.81 : -0.81, 0.96, 0);
    group.add(port);

    // ---- Unmistakable Internal Tilted Twin-Pole Magnet Assembly (revealed on peel-off) ----
    const magnetRoot = new THREE.Group();
    magnetRoot.position.set(0, 0.70, 0.06);
    magnetRoot.visible = false;
    group.add(magnetRoot);

    // Back precision degree dial ring (0° / 120° / 240°)
    const degreeDisc = new THREE.Mesh(
      new THREE.PlaneGeometry(1.02, 1.02),
      new THREE.MeshBasicMaterial({ map: angleRingTex, transparent: true, opacity: 0.92, depthWrite: false })
    );
    degreeDisc.position.z = -0.22;
    magnetRoot.add(degreeDisc);

    // Rotating Twin-Pole Magnet Rotor (rotates cleanly in the front-facing plane so 0°/120°/240° tilt is unmistakable!)
    const magnetRotor = new THREE.Group();
    magnetRoot.add(magnetRotor);

    // Satin outer gimbal ring holding the two pole shoes
    const rotorRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.022, 12, 42), brassMat);
    magnetRotor.add(rotorRing);

    // North Pole (top, warm copper-gold with pointed Stern-Gerlach wedge + crisp 'N' badge)
    const northBlock = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.24, 0.30, 3, 0.03), northPoleMat);
    northBlock.position.set(0, 0.26, 0);
    magnetRotor.add(northBlock);

    const northWedge = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.14, 4), northPoleMat);
    northWedge.rotation.z = Math.PI;
    northWedge.rotation.y = Math.PI / 4;
    northWedge.position.set(0, 0.09, 0);
    magnetRotor.add(northWedge);

    const badgeN = new THREE.Mesh(
      new THREE.PlaneGeometry(0.18, 0.18),
      new THREE.MeshBasicMaterial({ map: poleNTex })
    );
    badgeN.position.set(0, 0.26, 0.155);
    magnetRotor.add(badgeN);

    // South Pole (bottom, cool satin-steel block + crisp 'S' badge)
    const southBlock = new THREE.Mesh(new RoundedBoxGeometry(0.36, 0.24, 0.30, 3, 0.03), southPoleMat);
    southBlock.position.set(0, -0.26, 0);
    magnetRotor.add(southBlock);

    const badgeS = new THREE.Mesh(
      new THREE.PlaneGeometry(0.18, 0.18),
      new THREE.MeshBasicMaterial({ map: poleSTex })
    );
    badgeS.position.set(0, -0.26, 0.155);
    magnetRotor.add(badgeS);

    // Subtle glowing gold axis arrow between the poles (N -> S axis)
    const axisStem = new THREE.Mesh(
      new THREE.BoxGeometry(0.032, 0.34, 0.03),
      new THREE.MeshBasicMaterial({ color: COL_GOLD, transparent: true, opacity: 0.72 })
    );
    magnetRotor.add(axisStem);

    // ---- Front Brushed-Brass Rotary Dial (slides smoothly aside & fades when peeled!) ----
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

    const knobBody = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.145, 0.09, 28), brassMat);
    knobBody.rotation.x = Math.PI / 2;
    dialKnob.add(knobBody);

    // Compact pointer bar — points cleanly toward numeral without ever covering it
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
      roughness: 0.3,
      metalness: 0.0,
      clearcoat: 0.65,
      clearcoatRoughness: 0.22,
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
    lampHalo.position.set(0, 1.56, 0);
    lampHalo.scale.set(1.5, 1.5, 1);
    group.add(lampHalo);

    // Crisp accessibility badge pill above dome (hidden on untouched Step 0 for calm visual purity)
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

    // Soft feathered dark privacy veil for Step 7 ("watch Bob alone") — zero hard rectangle edges!
    const veilMat = new THREE.MeshBasicMaterial({
      map: veilTex,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const veilPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), veilMat);
    veilPlane.position.set(0, 1.15, 1.35);
    veilPlane.visible = false;
    group.add(veilPlane);

    // Centered station label plaque cleanly in front of box
    const labelSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeBadgeTexture(labelText, '', '#D8DFEC'),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      })
    );
    labelSprite.position.set(0, 0.06, 1.18);
    labelSprite.scale.set(1.15, 0.4, 1);
    group.add(labelSprite);

    return {
      group,
      xPos,
      shell,
      shellMat,
      ghostShell,
      ghostShellMat,
      shellEdges,
      edgesMat,
      magnetRoot,
      magnetRotor,
      dialGroup,
      dialFaceMat,
      dialKnob,
      lampMat,
      lampHalo,
      lampSymbol,
      lampLight,
      veilPlane,
      veilMat,
      labelSprite,
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

  // ---- 3D Breakthrough Arena: Sleek Score Track + Thick Refractive 75% Glass Wall ----
  const arenaGroup = new THREE.Group();
  arenaGroup.position.set(0, 2.52, -0.45);
  arenaGroup.visible = false;
  scene.add(arenaGroup);

  const BAR_LEN = 5.6;
  const BAR_X0 = -BAR_LEN / 2;

  // Architectural brushed-dark recessed track with brass endcaps
  const trackMesh = new THREE.Mesh(
    new RoundedBoxGeometry(BAR_LEN + 0.16, 0.24, 0.22, 4, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x161c28, roughness: 0.65, metalness: 0.35 })
  );
  arenaGroup.add(trackMesh);

  for (const ex of [BAR_X0 - 0.10, BAR_X0 + BAR_LEN + 0.10]) {
    const cap = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.30, 0.26, 3, 0.02), brassMat);
    cap.position.x = ex;
    arenaGroup.add(cap);
  }

  // Luminous honest progress bar (drawn at TRUE sampled winRate — never contradicts printed %)
  const barMat = new THREE.MeshStandardMaterial({
    color: COL_IVORY,
    emissive: new THREE.Color(COL_IVORY),
    emissiveIntensity: 0.9,
    roughness: 0.22,
    metalness: 0.12,
  });
  const barFill = new THREE.Mesh(new RoundedBoxGeometry(1, 0.15, 0.24, 2, 0.03), barMat);
  barFill.position.set(BAR_X0, 0, 0.02);
  arenaGroup.add(barFill);

  // Soft ±2sigma whisper shimmer cap at bar tip
  const barSigmaMat = new THREE.MeshBasicMaterial({
    color: COL_GOLD,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const barSigmaCap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.25), barSigmaMat);
  barSigmaCap.visible = false;
  arenaGroup.add(barSigmaCap);

  // Thick, Edge-Lit Refractive-Looking 75% Glass Wall
  const x75 = BAR_X0 + 0.75 * BAR_LEN;
  const glassIntactTex = makeGlassTexture(0);
  const glassCrackedTex = makeGlassTexture(1);

  const wallGroup = new THREE.Group();
  wallGroup.position.set(x75, 0.04, 0.04);
  arenaGroup.add(wallGroup);

  const glassGeo = new THREE.BoxGeometry(0.13, 1.14, 0.68);
  const glassPaneMat = new THREE.MeshPhysicalMaterial({
    map: glassIntactTex,
    color: 0xe6f2ff,
    emissive: new THREE.Color(0x52729c),
    emissiveIntensity: 0.28,
    roughness: 0.08,
    metalness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    transparent: true,
    opacity: 0.52,
    side: THREE.DoubleSide,
  });
  const glassPane = new THREE.Mesh(glassGeo, glassPaneMat);
  wallGroup.add(glassPane);

  // Bright luminous glass edge-lighting rim
  const glassEdgeMat = new THREE.LineBasicMaterial({
    color: 0xeaf4ff,
    transparent: true,
    opacity: 0.85,
  });
  const glassEdgeLines = new THREE.LineSegments(new THREE.EdgesGeometry(glassGeo), glassEdgeMat);
  wallGroup.add(glassEdgeLines);

  // Brushed brass clamping shoes (bottom shoe stays anchored after shatter so 75% label is grounded!)
  const clampGeo = new RoundedBoxGeometry(0.18, 0.07, 0.74, 2, 0.02);
  const clampTop = new THREE.Mesh(clampGeo, brassMat);
  clampTop.position.y = 0.60;
  wallGroup.add(clampTop);
  const clampBot = new THREE.Mesh(clampGeo, brassMat);
  clampBot.position.y = -0.60;
  wallGroup.add(clampBot);

  // Subtle remnant hairline at 75% (visible ONLY after shatter, anchoring the 75% PLAN LIMIT badge)
  const remnantLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, 1.12, 0.022),
    new THREE.MeshBasicMaterial({ color: COL_GLASS, transparent: true, opacity: 0.24 })
  );
  remnantLine.visible = false;
  wallGroup.add(remnantLine);

  const label75 = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: makeBadgeTexture('75%', 'PLAN LIMIT', '#DCE8F8'), transparent: true, depthWrite: false })
  );
  label75.position.set(0, 0.90, 0);
  label75.scale.set(1.12, 0.4, 1);
  wallGroup.add(label75);

  // 85.4% Quantum Gold Horizon — COMPLETELY HIDDEN in Step 5, ignites ONLY on Breakthrough!
  const x85 = BAR_X0 + 0.853553 * BAR_LEN;
  const goldLineMat = new THREE.MeshStandardMaterial({
    color: COL_GOLD,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 1.9,
    roughness: 0.2,
    metalness: 0.75,
    transparent: true,
    opacity: 0.0,
  });
  const goldLine = new THREE.Mesh(new THREE.BoxGeometry(0.045, 1.16, 0.07), goldLineMat);
  goldLine.position.set(x85, 0.04, 0.03);
  goldLine.visible = false;
  arenaGroup.add(goldLine);

  const label85Mat = new THREE.SpriteMaterial({
    map: makeBadgeTexture('85.4%', 'NATURE LIMIT', '#E6B655'),
    transparent: true,
    depthWrite: false,
    opacity: 0.0,
  });
  const label85 = new THREE.Sprite(label85Mat);
  label85.position.set(x85 + 0.44, 0.90, 0);
  label85.scale.set(1.25, 0.44, 1);
  label85.visible = false;
  arenaGroup.add(label85);

  // 72 Slender, Specular, Translucent Glinting Crystal Glass Shards + 24 Golden Sparkle Motes!
  const SHARD_COUNT = 72;
  const shardGeo = new THREE.CylinderGeometry(0.015, 0.09, 0.28, 3);
  const shardMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f8ff,
    emissive: new THREE.Color(0x9ec8f8),
    emissiveIntensity: 0.72,
    roughness: 0.05,
    metalness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    transparent: true,
    opacity: 0.76,
  });
  const shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, SHARD_COUNT);
  shardMesh.visible = false;
  arenaGroup.add(shardMesh);

  const SPARK_COUNT = 24;
  const sparkGeo = new THREE.OctahedronGeometry(0.035, 0);
  const sparkMat = new THREE.MeshBasicMaterial({ color: COL_GOLD, transparent: true, opacity: 0.95 });
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
  const moteSphereGeo = new THREE.SphereGeometry(0.078, 16, 16);
  const cardGeo = new THREE.BoxGeometry(0.22, 0.28, 0.025);
  let cardStripTex = makeCardStripTexture([0, 0, 1]);

  function setCardStrip(cardArr) {
    const next = makeCardStripTexture(cardArr);
    cardStripTex.dispose();
    cardStripTex = next;
  }

  function spawnMotePair({ colorA, colorB, entangled = true, onArrive = null, duration = 0.44 }) {
    const matA = entangled
      ? new THREE.MeshBasicMaterial({ color: COL_GOLD })
      : new THREE.MeshStandardMaterial({ map: cardStripTex, roughness: 0.5, emissive: new THREE.Color(0x4a4236), emissiveIntensity: 0.45 });
    const matB = entangled
      ? new THREE.MeshBasicMaterial({ color: COL_GOLD })
      : new THREE.MeshStandardMaterial({ map: cardStripTex, roughness: 0.5, emissive: new THREE.Color(0x4a4236), emissiveIntensity: 0.45 });
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
  let wallState = 'intact'; // 'intact' | 'cracked' | 'shattered'
  let shatterAge = 0;
  let slowMoTimer = 0;
  let shakeAmount = 0;
  let barTargetPct = 0;
  let barCurrentPct = 0;
  let barTargetSigma = 0;
  let barIsQuantum = false;
  let sourceEntangled = true;
  let showStationLabels = false;
  let showLampBadges = false;
  let stepIndex = 0;

  // Adaptive quality guard for slower phones
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

    const halfSpan = stepIndex === 5 || stepIndex === 6 ? 3.8 : 3.55;
    const vFovRad = (camera.fov * Math.PI) / 180;
    const minZForWidth = halfSpan / (Math.tan(vFovRad / 2) * Math.max(0.42, aspect));

    if (stepIndex === 0) {
      if (isTallPortrait) {
        // Fill upper half of phone screen boldly — zero dead black void!
        const z = Math.max(10.6, minZForWidth * 0.98);
        camTargetPos.set(0, 2.25, z);
        camTargetLook.set(0, 0.15, 0);
      } else {
        const z = Math.max(8.0, minZForWidth * 1.02);
        camTargetPos.set(0, 2.35, z);
        camTargetLook.set(0, 0.78, 0);
      }
    } else if (stepIndex === 4) {
      const z = Math.max(7.6, minZForWidth * 1.0);
      camTargetPos.set(0, 1.95, z);
      camTargetLook.set(0, 0.86, 0);
    } else if (stepIndex === 5 || stepIndex === 6) {
      const z = Math.max(10.4, minZForWidth * 1.05);
      camTargetPos.set(0, 2.55, z);
      camTargetLook.set(0, 1.48, 0);
    } else if (stepIndex === 7) {
      const z = Math.max(8.5, minZForWidth * 1.03);
      camTargetPos.set(0.2, 2.25, z);
      camTargetLook.set(0.2, 0.9, 0);
    } else {
      const z = Math.max(8.3, minZForWidth * 1.03);
      camTargetPos.set(0, 2.3, z);
      camTargetLook.set(0, 0.88, 0);
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
    leverTargetAngle = val ? -0.55 : 0.55;
    leverKnobMat.color.setHex(val ? COL_GOLD : COL_IVORY);
    leverKnobMat.emissiveIntensity = val ? 1.1 : 0.2;
  }

  function setTeacherMode(on) {
    teacherMode = !!on;
    // Projector contrast boost: brighter key/rim & scaled 3D labels
    keyLight.intensity = teacherMode ? 2.5 : 1.95;
    rimLight.intensity = teacherMode ? 1.45 : 1.05;
    hemi.intensity = teacherMode ? 0.95 : 0.72;
    scene.environmentIntensity = teacherMode ? 0.82 : 0.62;
    const ls = teacherMode ? 1.42 : 1.0;
    boxLeft.labelSprite.scale.set(1.15 * ls, 0.4 * ls, 1);
    boxRight.labelSprite.scale.set(1.15 * ls, 0.4 * ls, 1);
    label75.scale.set(1.12 * ls, 0.4 * ls, 1);
    label85.scale.set(1.25 * ls, 0.44 * ls, 1);
  }

  function setStep(step) {
    stepIndex = step;
    showStationLabels = step >= 1;
    showLampBadges = step >= 1;
    arenaGroup.visible = step === 5 || step === 6;
    leverMount.visible = step === 5 || step === 6;
    setDialMode(step === 5 || step === 6 || step === 7 ? 'chsh' : 'mermin');
    boxLeft.dimmed = false;
    boxRight.dimmed = false;
    // Clear privacy veil instantly when leaving Step 7 so no ghost shadow carries over
    if (step !== 7) {
      boxLeft.veilMat.opacity = 0;
      boxLeft.veilPlane.visible = false;
      boxRight.veilMat.opacity = 0;
      boxRight.veilPlane.visible = false;
    }
    updateCameraTargets();
    if (isReducedMotion) {
      camera.position.copy(camTargetPos);
      camCurLook.copy(camTargetLook);
      camera.lookAt(camCurLook);
    }
  }

  function setAliceDimmed(dimmed) {
    boxLeft.dimmed = !!dimmed;
  }

  // Honest 3D bar: always reflects the TRUE sampled winRate (never lies or clamps behind 75%!)
  function setArenaProgress(pct, { isQuantum = false, se = 0, snap = false } = {}) {
    barTargetPct = Math.max(0, Math.min(1, pct));
    barIsQuantum = isQuantum;
    barTargetSigma = se;
    if (snap) {
      barCurrentPct = barTargetPct;
    }
  }

  function setWallState(next, { settled = false } = {}) {
    if (next === wallState && !settled) return;
    wallState = next;
    if (next === 'intact') {
      glassPane.visible = true;
      glassEdgeLines.visible = true;
      clampTop.visible = true;
      clampBot.visible = true;
      remnantLine.visible = false;
      glassPaneMat.map = glassIntactTex;
      glassPaneMat.emissive.setHex(0x52729c);
      glassPaneMat.emissiveIntensity = 0.28;
      glassPaneMat.opacity = 0.52;
      glassPaneMat.needsUpdate = true;
      shardMesh.visible = false;
      sparkMesh.visible = false;
      // Hide 85.4% completely until breakthrough!
      goldLine.visible = false;
      label85.visible = false;
      goldLineMat.opacity = 0.0;
      label85Mat.opacity = 0.0;
    } else if (next === 'cracked') {
      glassPane.visible = true;
      glassEdgeLines.visible = true;
      glassPaneMat.map = glassCrackedTex;
      glassPaneMat.emissive.setHex(COL_GOLD);
      glassPaneMat.emissiveIntensity = 0.65;
      glassPaneMat.opacity = 0.72;
      glassPaneMat.needsUpdate = true;
      if (!isReducedMotion) shakeAmount = 0.07;
    } else if (next === 'shattered') {
      glassPane.visible = false;
      glassEdgeLines.visible = false;
      clampTop.visible = false;
      clampBot.visible = true; // Anchors 75% label visually!
      remnantLine.visible = true;
      goldLine.visible = true;
      label85.visible = true;
      goldLineMat.opacity = 1.0;
      label85Mat.opacity = 1.0;
      if (!isReducedMotion && !settled) {
        shatterAge = 0;
        slowMoTimer = 0.46;
        shakeAmount = 0.13;
        shardMesh.visible = true;
        sparkMesh.visible = true;
        shardMat.opacity = 0.68;
        sparkMat.opacity = 0.95;
        for (let i = 0; i < SHARD_COUNT; i++) {
          const s = shards[i];
          const spreadY = (Math.random() - 0.5) * 1.1;
          s.pos.set(x75 + (Math.random() - 0.5) * 0.12, spreadY, (Math.random() - 0.5) * 0.62);
          // Sweeping outward fountain arc toward the right & camera
          s.vel.set(1.2 + Math.random() * 4.2, 0.5 + spreadY * 2.2 + (Math.random() - 0.3) * 1.8, (Math.random() - 0.45) * 3.4);
          s.rot.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
          s.angVel.set((Math.random() - 0.5) * 11, (Math.random() - 0.5) * 11, (Math.random() - 0.5) * 11);
          const sc = 0.38 + Math.random() * 0.85;
          s.scale.set(sc * 0.55, sc * 1.35, sc * 0.35);
        }
        for (let i = 0; i < SPARK_COUNT; i++) {
          const sp = sparks[i];
          sp.pos.set(x75 + (Math.random() - 0.5) * 0.15, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.5);
          sp.vel.set(1.8 + Math.random() * 3.5, (Math.random() - 0.3) * 2.6, (Math.random() - 0.5) * 2.8);
        }
      } else {
        shardMesh.visible = false;
        sparkMesh.visible = false;
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

    // Adaptive quality guard: if mobile GPU averages >22ms/frame for 2s, step down DPR
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
      sourceHalo.scale.set(1.24 * pulse, 1.24 * pulse, 1);
      coreMat.emissiveIntensity = (sourceEntangled ? 1.9 : 1.15) + Math.sin(elapsed * 2.4) * 0.24;
    }

    // 3D brass entanglement lever smooth throw
    leverCurrentAngle += (leverTargetAngle - leverCurrentAngle) * Math.min(1, rawDt * 12);
    leverPivot.rotation.z = leverCurrentAngle;

    // Crisp peel-off vs 100% solid closed casing (ZERO X-ray bleed when closed!)
    const peelSpeed = isReducedMotion ? 16 : 8.5;
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
      } else {
        // 100% solid velvet matte graphite — impossible to leak interior!
        box.shell.visible = true;
        box.ghostShell.visible = false;
        box.shellEdges.visible = false;
        box.magnetRoot.visible = false;
        box.dialGroup.visible = true;
        box.dialGroup.scale.setScalar(1);
      }

      // Soft feathered privacy veil for Step 7 ("watch Bob alone")
      const veilTarget = box.dimmed ? 0.92 : 0;
      box.veilMat.opacity += (veilTarget - box.veilMat.opacity) * Math.min(1, rawDt * 10);
      box.veilPlane.visible = box.veilMat.opacity > 0.02;

      box.labelSprite.material.opacity += ((showStationLabels ? (box.dimmed ? 0.35 : 0.92) : 0) - box.labelSprite.material.opacity) * Math.min(1, rawDt * 7);

      const rotLerp = isReducedMotion ? 1 : Math.min(1, rawDt * 12);
      box.currentDialRad += (box.targetDialRad - box.currentDialRad) * rotLerp;
      box.currentMagRad += (box.targetMagRad - box.currentMagRad) * rotLerp;
      box.dialKnob.rotation.z = box.currentDialRad;
      box.magnetRotor.rotation.z = box.currentMagRad;

      if (box.lampBloom > 0.01) {
        box.lampBloom = Math.max(0.35, box.lampBloom - rawDt * 0.42);
      }
      const bloom = box.lampColor >= 0 ? box.lampBloom : 0;
      const dimMul = box.dimmed ? 0.22 : 1.0;
      box.lampMat.emissiveIntensity = (0.25 + bloom * 1.3) * dimMul;
      box.lampHalo.material.opacity = bloom * 0.82 * dimMul;
      box.lampLight.intensity = bloom * 2.2 * dimMul;
      box.lampSymbol.material.opacity = (showLampBadges && box.lampColor >= 0) ? Math.min(1, 0.72 + bloom * 0.28) * dimMul : 0;
    }

    // Active flying mote pairs / folded ivory cards
    for (let i = activeMotes.length - 1; i >= 0; i--) {
      const m = activeMotes[i];
      m.t += rawDt / m.duration;
      const u = Math.min(1, m.t);
      const ease = 1 - Math.pow(1 - u, 3);
      const xOff = ease * 1.58;
      const arcY = 0.96 + Math.sin(u * Math.PI) * 0.14;
      m.meshA.position.set(-xOff, arcY, 0);
      m.meshB.position.set(xOff, arcY, 0);
      if (!m.entangled) {
        m.meshA.rotation.y = u * Math.PI * 0.85;
        m.meshB.rotation.y = -u * Math.PI * 0.85;
      }
      if (u >= 1) {
        bloomLamp(boxLeft, m.colorA);
        bloomLamp(boxRight, m.colorB);
        if (m.onArrive) m.onArrive();
        scene.remove(m.meshA);
        scene.remove(m.meshB);
        m.meshA.material.dispose();
        m.meshB.material.dispose();
        activeMotes.splice(i, 1);
      }
    }

    // Light-speed Compare Notes pulse (Step 7)
    if (comparePulse) {
      comparePulse.t += rawDt / comparePulse.duration;
      const u = Math.min(1, comparePulse.t);
      const x = -2.36 + u * 4.72;
      const y = 1.65 + Math.sin(u * Math.PI) * 0.65;
      compareOrb.position.set(x, y, 0.25);
      if (u >= 1) {
        compareOrb.visible = false;
        const cb = comparePulse.onArrive;
        comparePulse = null;
        if (cb) cb();
      }
    }

    // 3D Breakthrough score bar & glinting glass shards
    if (arenaGroup.visible) {
      barCurrentPct += (barTargetPct - barCurrentPct) * Math.min(1, rawDt * 9);
      const len = Math.max(0.04, barCurrentPct * BAR_LEN);
      barFill.scale.x = len;
      barFill.position.x = BAR_X0 + len / 2;
      const targetCol = barIsQuantum && wallState === 'shattered' ? COL_GOLD : barIsQuantum ? 0xf2d288 : COL_IVORY;
      barMat.color.lerp(new THREE.Color(targetCol), Math.min(1, rawDt * 7));
      barMat.emissive.lerp(new THREE.Color(targetCol), Math.min(1, rawDt * 7));
      barMat.emissiveIntensity = barIsQuantum ? 1.25 : 0.78;

      if (barTargetSigma > 0.001 && barCurrentPct > 0.05) {
        barSigmaCap.visible = true;
        const capW = Math.max(0.05, Math.min(0.65, barTargetSigma * 4 * BAR_LEN));
        barSigmaCap.scale.x = capW;
        barSigmaCap.position.set(BAR_X0 + len, 0, 0.03);
        barSigmaMat.color.setHex(targetCol);
      } else {
        barSigmaCap.visible = false;
      }

      if (shardMesh.visible) {
        shatterAge += dt;
        const fade = Math.max(0, 1 - shatterAge / 2.4);
        shardMat.opacity = fade * 0.68;
        sparkMat.opacity = fade * 0.95;
        for (let i = 0; i < SHARD_COUNT; i++) {
          const s = shards[i];
          s.vel.y -= 3.0 * dt;
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
          sp.vel.y -= 1.4 * dt;
          sp.pos.addScaledVector(sp.vel, dt);
          dummy.position.copy(sp.pos);
          dummy.rotation.set(elapsed * 4 + i, elapsed * 3, 0);
          dummy.scale.setScalar(0.6 + fade * 0.7);
          dummy.updateMatrix();
          sparkMesh.setMatrixAt(i, dummy.matrix);
        }
        sparkMesh.instanceMatrix.needsUpdate = true;

        if (fade <= 0.01) {
          shardMesh.visible = false;
          sparkMesh.visible = false;
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
    setAliceDimmed,
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
