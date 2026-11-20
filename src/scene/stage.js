import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// Palette from STYLE.md
const COL_NIGHT = 0x0d1017;
const COL_SLATE_FLOOR = 0x111520;
const COL_BOX_SHELL = 0x262e3e;
const COL_BRASS = 0xc8a86b;
const COL_STEEL = 0xa8b4c8;
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
  g.addColorStop(0, 'rgba(4,6,11,0.72)');
  g.addColorStop(0.55, 'rgba(4,6,11,0.32)');
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
  g.addColorStop(0, '#222a3a');
  g.addColorStop(0.45, '#151a26');
  g.addColorStop(0.85, '#0e1119');
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
  ctx.fillStyle = '#171c28';
  ctx.beginPath();
  ctx.arc(128, 128, 122, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(200,168,107,0.55)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(128, 128, 114, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle inner ticks
  ctx.strokeStyle = 'rgba(244,239,230,0.22)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(128 + Math.cos(a) * 98, 128 + Math.sin(a) * 98);
    ctx.lineTo(128 + Math.cos(a) * 108, 128 + Math.sin(a) * 108);
    ctx.stroke();
  }

  ctx.fillStyle = '#F4EFE6';
  ctx.font = '600 32px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (mode === 'mermin') {
    const labels = [
      { t: '1', deg: -90 },
      { t: '2', deg: 30 },
      { t: '3', deg: 150 },
    ];
    for (const l of labels) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 76, 128 + Math.sin(r) * 76);
    }
  } else {
    const labels = [
      { t: '0', deg: -135 },
      { t: '1', deg: -45 },
    ];
    for (const l of labels) {
      const r = (l.deg * Math.PI) / 180;
      ctx.fillText(l.t, 128 + Math.cos(r) * 74, 128 + Math.sin(r) * 74);
    }
  }
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

  // Frosted subtle gradient
  const g = ctx.createLinearGradient(0, 0, 256, 512);
  g.addColorStop(0, 'rgba(220,232,248,0.22)');
  g.addColorStop(0.5, 'rgba(220,232,248,0.08)');
  g.addColorStop(1, 'rgba(220,232,248,0.20)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 512);

  // Vertical frost shimmer lines
  ctx.strokeStyle = 'rgba(244,239,230,0.32)';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 248, 504);

  // Etched "75%" mark near top
  ctx.fillStyle = 'rgba(244,239,230,0.92)';
  ctx.font = '700 44px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('75%', 128, 72);

  if (cracked) {
    // Luminous stress spiderweb cracks radiating from impact point (128, 280)
    const cx = 128, cy = 280;
    const branches = [
      [[cx, cy], [92, 220], [44, 158], [16, 118]],
      [[cx, cy], [174, 232], [218, 172], [248, 124]],
      [[cx, cy], [105, 345], [58, 412], [22, 475]],
      [[cx, cy], [162, 338], [210, 405], [244, 468]],
      [[cx, cy], [134, 198], [122, 126]],
      [[cx, cy], [70, 290], [18, 304]],
      [[cx, cy], [190, 292], [246, 276]],
      [[92, 220], [134, 198], [174, 232]],
      [[105, 345], [162, 338]],
    ];
    ctx.strokeStyle = 'rgba(244,239,230,0.95)';
    ctx.shadowColor = '#E6B655';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 3.2;
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
  c.width = 256;
  c.height = 96;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 256, 96);
  ctx.fillStyle = accent;
  ctx.font = '700 34px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 128, subtext ? 34 : 48);
  if (subtext) {
    ctx.fillStyle = 'rgba(244,239,230,0.72)';
    ctx.font = '600 22px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText(subtext, 128, 70);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeLampSymbolTexture(symbol, hexColor) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = hexColor;
  ctx.shadowColor = hexColor;
  ctx.shadowBlur = 16;
  ctx.font = '700 68px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, 64, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createStage(container, { reducedMotion = false } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COL_NIGHT);
  scene.fog = new THREE.FogExp2(COL_NIGHT, 0.048);

  // Soft studio RoomEnvironment via PMREM (premium satin reflections)
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.045).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.58;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(0, 3.0, 9.4);
  camera.lookAt(0, 0.85, 0);

  // Studio lighting rig: warm key + cool slate fill + subtle rim
  const hemi = new THREE.HemisphereLight(0x7c97cc, 0x10141f, 0.65);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight(0xfff1dc, 1.85);
  keyLight.position.set(3.2, 7.6, 5.2);
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

  const rimLight = new THREE.DirectionalLight(0x6d8fd0, 0.95);
  rimLight.position.set(-4.5, 4.2, -5.0);
  scene.add(rimLight);

  // Seamless studio pool floor
  const floorGeo = new THREE.CircleGeometry(18, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    map: makeFloorPoolTexture(),
    roughness: 0.92,
    metalness: 0.05,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const shadowTex = makeShadowTexture();
  const glowGoldTex = makeRadialTexture('rgba(255,238,195,1)', 'rgba(230,182,85,0.45)');
  const glowIvoryTex = makeRadialTexture('rgba(255,252,245,0.95)', 'rgba(244,239,230,0.35)');
  const glowCoralTex = makeRadialTexture('rgba(255,190,180,1)', 'rgba(255,122,107,0.45)');
  const glowJadeTex = makeRadialTexture('rgba(195,255,232,1)', 'rgba(79,214,168,0.45)');
  const symCoralTex = makeLampSymbolTexture('▲', '#FF7A6B');
  const symJadeTex = makeLampSymbolTexture('●', '#4FD6A8');
  const dialMerminTex = makeDialFaceTexture('mermin');
  const dialChshTex = makeDialFaceTexture('chsh');

  // Shared PBR materials
  const brassMat = new THREE.MeshStandardMaterial({
    color: COL_BRASS,
    roughness: 0.32,
    metalness: 0.78,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x1a202c,
    roughness: 0.55,
    metalness: 0.42,
  });
  const steelMat = new THREE.MeshStandardMaterial({
    color: COL_STEEL,
    roughness: 0.34,
    metalness: 0.72,
  });

  // ---- Central Source Emitter (x = 0) ----
  const sourceGroup = new THREE.Group();
  sourceGroup.position.set(0, 0, 0);
  scene.add(sourceGroup);

  const srcShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  );
  srcShadow.rotation.x = -Math.PI / 2;
  srcShadow.position.y = 0.005;
  sourceGroup.add(srcShadow);

  const srcPedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.44, 0.24, 32), darkMetalMat);
  srcPedestal.position.y = 0.12;
  srcPedestal.castShadow = true;
  srcPedestal.receiveShadow = true;
  sourceGroup.add(srcPedestal);

  const srcStem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.45, 20), brassMat);
  srcStem.position.y = 0.44;
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
    emissiveIntensity: 1.8,
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
  sourceHalo.scale.set(1.25, 1.25, 1);
  sourceGroup.add(sourceHalo);

  const sourcePoint = new THREE.PointLight(COL_GOLD, 1.6, 5.5, 2);
  sourcePoint.position.set(0, 0.96, 0.2);
  sourceGroup.add(sourcePoint);

  // Subtle horizontal beam guide filaments (faint warm optical axis)
  const guideMat = new THREE.MeshBasicMaterial({
    color: COL_GOLD,
    transparent: true,
    opacity: 0.09,
    depthWrite: false,
  });
  const guideTube = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 3.6, 8), guideMat);
  guideTube.rotation.z = Math.PI / 2;
  guideTube.position.y = 0.96;
  scene.add(guideTube);

  // ---- Mystery Box Builder (Alice left, Bob right) ----
  function createMysteryBox(side, labelText) {
    const group = new THREE.Group();
    const xPos = side === 'left' ? -2.38 : 2.38;
    group.position.set(xPos, 0, 0);
    scene.add(group);

    // Contact shadow
    const sh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.5, 2.2),
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

    // Outer matte anodized-graphite shell (peels away smoothly to translucent Ciechanowski ghost!)
    const shellGeo = new RoundedBoxGeometry(1.62, 1.24, 1.40, 5, 0.14);
    const shellMat = new THREE.MeshStandardMaterial({
      color: COL_BOX_SHELL,
      roughness: 0.76,
      metalness: 0.16,
      transparent: true,
      opacity: 1.0,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.position.y = 0.68;
    shell.castShadow = true;
    shell.receiveShadow = true;
    group.add(shell);

    // Ghost edge outline (becomes subtly visible when peeled)
    const edgesMat = new THREE.LineBasicMaterial({
      color: COL_IVORY,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    const shellEdges = new THREE.LineSegments(new THREE.EdgesGeometry(shellGeo, 28), edgesMat);
    shellEdges.position.copy(shell.position);
    group.add(shellEdges);

    // Brass entry aperture port facing the central source
    const port = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.035, 14, 32), brassMat);
    port.rotation.y = Math.PI / 2;
    port.position.set(side === 'left' ? 0.81 : -0.81, 0.96, 0);
    group.add(port);

    // ---- Internal Stern-Gerlach Magnet Assembly (revealed on peel-off!) ----
    const magnetRoot = new THREE.Group();
    magnetRoot.position.set(0, 0.72, 0);
    group.add(magnetRoot);

    // Internal machined ring housing
    const magRing = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.022, 12, 40), darkMetalMat);
    magRing.rotation.y = Math.PI / 2;
    magnetRoot.add(magRing);

    // Rotating magnet rotor (rotates around X axis = perpendicular to flight!)
    const magnetRotor = new THREE.Group();
    magnetRoot.add(magnetRotor);

    // North pole (warm brass-tipped tapered wedge pointing +Y at 0°)
    const northPole = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.22, 0.24), brassMat);
    northPole.position.set(0, 0.27, 0);
    magnetRotor.add(northPole);
    const northTip = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.14, 4), brassMat);
    northTip.rotation.z = Math.PI;
    northTip.rotation.y = Math.PI / 4;
    northTip.position.set(0, 0.10, 0);
    magnetRotor.add(northTip);

    // South pole (satin titanium block at -Y)
    const southPole = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.22, 0.24), steelMat);
    southPole.position.set(0, -0.27, 0);
    magnetRotor.add(southPole);

    // Curved yoke connecting north & south poles
    const yoke = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.042, 12, 24, Math.PI), steelMat);
    yoke.rotation.y = Math.PI / 2;
    yoke.rotation.z = -Math.PI / 2;
    magnetRotor.add(yoke);

    // Axis arrow indicator visible from front when peeled (tilts in Z-Y plane AND mirrored neatly in front X-Y view!)
    // Note: physically Stern-Gerlach axes are perp to flight (Y-Z plane). To make the 0°/120°/240° tilt
    // crystal-clear from the front 3/4 camera, we show a clean front-angled brass compass needle & degree arc!
    const frontIndicator = new THREE.Group();
    frontIndicator.position.set(0, 0.72, 0.36);
    group.add(frontIndicator);

    const indicatorRing = new THREE.Mesh(
      new THREE.RingGeometry(0.34, 0.37, 48),
      new THREE.MeshBasicMaterial({ color: COL_IVORY, transparent: true, opacity: 0, side: THREE.DoubleSide })
    );
    frontIndicator.add(indicatorRing);

    const indicatorNeedle = new THREE.Group();
    frontIndicator.add(indicatorNeedle);
    const needleNorth = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, 0.28, 0.04),
      new THREE.MeshStandardMaterial({ color: COL_GOLD, emissive: new THREE.Color(COL_GOLD), emissiveIntensity: 0.65, transparent: true, opacity: 0 })
    );
    needleNorth.position.y = 0.14;
    indicatorNeedle.add(needleNorth);
    const needleSouth = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, 0.26, 0.04),
      new THREE.MeshStandardMaterial({ color: COL_STEEL, transparent: true, opacity: 0 })
    );
    needleSouth.position.y = -0.13;
    indicatorNeedle.add(needleSouth);

    // ---- Front Brushed-Brass Rotary Dial ----
    const dialGroup = new THREE.Group();
    dialGroup.position.set(0, 0.64, 0.71);
    group.add(dialGroup);

    const dialBezel = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.036, 14, 40), brassMat);
    dialGroup.add(dialBezel);

    const dialFaceMat = new THREE.MeshStandardMaterial({
      map: dialMerminTex,
      roughness: 0.55,
      metalness: 0.1,
      transparent: true,
      opacity: 1.0,
    });
    const dialFace = new THREE.Mesh(new THREE.CircleGeometry(0.315, 36), dialFaceMat);
    dialFace.position.z = 0.008;
    dialGroup.add(dialFace);

    const dialKnob = new THREE.Group();
    dialKnob.position.z = 0.04;
    dialGroup.add(dialKnob);

    const knobBody = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.09, 28), brassMat);
    knobBody.rotation.x = Math.PI / 2;
    dialKnob.add(knobBody);

    const knobPointer = new THREE.Mesh(
      new THREE.BoxGeometry(0.036, 0.20, 0.03),
      new THREE.MeshStandardMaterial({ color: COL_IVORY, emissive: new THREE.Color(COL_IVORY), emissiveIntensity: 0.3 })
    );
    knobPointer.position.set(0, 0.075, 0.04);
    dialKnob.add(knobPointer);

    // ---- Top Blown-Glass Dome Lamp ----
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.34, 0.10, 32), brassMat);
    lampBase.position.y = 1.32;
    group.add(lampBase);

    const lampMat = new THREE.MeshPhysicalMaterial({
      color: 0xdce2ec,
      emissive: new THREE.Color(0x283042),
      emissiveIntensity: 0.4,
      roughness: 0.32,
      metalness: 0.0,
      clearcoat: 0.55,
      clearcoatRoughness: 0.28,
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

    const lampSymbol = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: symCoralTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.0,
      })
    );
    lampSymbol.position.set(0, 2.02, 0);
    lampSymbol.scale.set(0.48, 0.48, 1);
    group.add(lampSymbol);

    const lampLight = new THREE.PointLight(COL_IVORY, 0, 3.6, 2);
    lampLight.position.set(0, 1.7, 0.3);
    group.add(lampLight);

    // Quiet station label below box (hidden on step 0)
    const labelSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeBadgeTexture(labelText, '', '#B8C0D0'),
        transparent: true,
        depthWrite: false,
        opacity: 0,
      })
    );
    labelSprite.position.set(0, 0.14, 1.05);
    labelSprite.scale.set(1.1, 0.42, 1);
    group.add(labelSprite);

    return {
      group,
      xPos,
      shell,
      shellMat,
      edgesMat,
      dialGroup,
      dialFaceMat,
      dialKnob,
      magnetRotor,
      indicatorRing,
      indicatorNeedle,
      needleNorth,
      needleSouth,
      lampMat,
      lampHalo,
      lampSymbol,
      lampLight,
      labelSprite,
      targetDialRad: 0,
      currentDialRad: 0,
      targetMagRad: 0,
      currentMagRad: 0,
      lampBloom: 0,
      lampColor: -1, // 0 = Coral ▲, 1 = Jade ●
      dimmed: false,
    };
  }

  const boxLeft = createMysteryBox('left', 'ALICE');
  const boxRight = createMysteryBox('right', 'BOB');

  // ---- 3D Breakthrough Arena: Score Bar + Frosted 75% Glass Wall + 85.4% Gold Horizon ----
  const arenaGroup = new THREE.Group();
  arenaGroup.position.set(0, 2.26, -0.45);
  arenaGroup.visible = false;
  scene.add(arenaGroup);

  const BAR_LEN = 5.6;
  const BAR_X0 = -BAR_LEN / 2;

  // Sleek dark track rail
  const trackMesh = new THREE.Mesh(
    new RoundedBoxGeometry(BAR_LEN + 0.12, 0.24, 0.20, 3, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x161b26, roughness: 0.75, metalness: 0.25 })
  );
  arenaGroup.add(trackMesh);

  // Luminous growing progress bar
  const barMat = new THREE.MeshStandardMaterial({
    color: COL_IVORY,
    emissive: new THREE.Color(COL_IVORY),
    emissiveIntensity: 0.85,
    roughness: 0.25,
    metalness: 0.1,
  });
  const barFill = new THREE.Mesh(new THREE.BoxGeometry(1, 0.16, 0.22), barMat);
  barFill.position.set(BAR_X0, 0, 0.02);
  arenaGroup.add(barFill);

  // Soft ±2sigma whisper cap on bar tip
  const barSigmaMat = new THREE.MeshBasicMaterial({
    color: COL_GOLD,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const barSigmaCap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.24), barSigmaMat);
  barSigmaCap.visible = false;
  arenaGroup.add(barSigmaCap);

  // Frosted 75% Glass Wall
  const x75 = BAR_X0 + 0.75 * BAR_LEN;
  const glassIntactTex = makeGlassTexture(false);
  const glassCrackedTex = makeGlassTexture(true);

  const wallGroup = new THREE.Group();
  wallGroup.position.set(x75, 0.04, 0.04);
  arenaGroup.add(wallGroup);

  const glassPaneMat = new THREE.MeshPhysicalMaterial({
    map: glassIntactTex,
    color: COL_GLASS,
    emissive: new THREE.Color(0x4a6080),
    emissiveIntensity: 0.22,
    roughness: 0.18,
    metalness: 0.05,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const glassPane = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.12, 0.62), glassPaneMat);
  wallGroup.add(glassPane);

  // Brass top & bottom clamps on the glass wall
  const clampGeo = new THREE.BoxGeometry(0.15, 0.06, 0.68);
  const clampTop = new THREE.Mesh(clampGeo, brassMat);
  clampTop.position.y = 0.58;
  wallGroup.add(clampTop);
  const clampBot = new THREE.Mesh(clampGeo, brassMat);
  clampBot.position.y = -0.58;
  wallGroup.add(clampBot);

  const label75 = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: makeBadgeTexture('75%', 'PLAN LIMIT', '#DCE8F8'), transparent: true, depthWrite: false })
  );
  label75.position.set(0, 0.78, 0);
  label75.scale.set(1.02, 0.38, 1);
  wallGroup.add(label75);

  // 85.4% Quantum Gold Horizon Marker
  const x85 = BAR_X0 + 0.853553 * BAR_LEN;
  const goldLineMat = new THREE.MeshStandardMaterial({
    color: COL_GOLD,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 0.45,
    roughness: 0.25,
    metalness: 0.7,
    transparent: true,
    opacity: 0.35,
  });
  const goldLine = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.15, 0.06), goldLineMat);
  goldLine.position.set(x85, 0.04, 0.02);
  arenaGroup.add(goldLine);

  const label85Mat = new THREE.SpriteMaterial({
    map: makeBadgeTexture('85.4%', 'NATURE LIMIT', '#E6B655'),
    transparent: true,
    depthWrite: false,
    opacity: 0.0,
  });
  const label85 = new THREE.Sprite(label85Mat);
  label85.position.set(x85 + 0.28, 0.78, 0);
  label85.scale.set(1.14, 0.42, 1);
  arenaGroup.add(label85);

  // 36 Tumbling Instanced Glass Shards for Breakthrough Slow-Motion Shatter!
  const SHARD_COUNT = 36;
  const shardGeo = new THREE.TetrahedronGeometry(0.14, 0);
  const shardMat = new THREE.MeshPhysicalMaterial({
    color: 0xeef5ff,
    emissive: new THREE.Color(COL_GOLD),
    emissiveIntensity: 0.32,
    roughness: 0.14,
    metalness: 0.12,
    transparent: true,
    opacity: 0.9,
  });
  const shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, SHARD_COUNT);
  shardMesh.visible = false;
  arenaGroup.add(shardMesh);

  const shards = Array.from({ length: SHARD_COUNT }, () => ({
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    rot: new THREE.Euler(),
    angVel: new THREE.Vector3(),
    scale: new THREE.Vector3(1, 1, 1),
  }));
  const dummy = new THREE.Object3D();

  // ---- Pooled Flying Light Mote Pairs (and optional tiny folded ivory cards) ----
  const activeMotes = [];
  const moteSphereGeo = new THREE.SphereGeometry(0.075, 16, 16);
  const cardGeo = new THREE.BoxGeometry(0.16, 0.20, 0.02);

  function spawnMotePair({ colorA, colorB, entangled = true, onArrive = null, duration = 0.44 }) {
    const matA = new THREE.MeshBasicMaterial({ color: entangled ? COL_GOLD : COL_IVORY });
    const matB = new THREE.MeshBasicMaterial({ color: entangled ? COL_GOLD : COL_IVORY });
    const meshA = new THREE.Mesh(entangled ? moteSphereGeo : cardGeo, matA);
    const meshB = new THREE.Mesh(entangled ? moteSphereGeo : cardGeo, matB);

    const haloA = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: entangled ? glowGoldTex : glowIvoryTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: entangled ? 0.92 : 0.55,
      })
    );
    haloA.scale.set(0.55, 0.55, 1);
    meshA.add(haloA);

    const haloB = haloA.clone();
    meshB.add(haloB);

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
  let stepIndex = 0;

  // Camera framing targets
  const camTargetPos = new THREE.Vector3(0, 2.75, 8.8);
  const camTargetLook = new THREE.Vector3(0, 0.95, 0);
  const camCurLook = new THREE.Vector3(0, 0.95, 0);

  function updateCameraTargets() {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    const aspect = w / Math.max(1, h);
    const isPortrait = aspect < 1.05;

    // Horizontal half-width needed so both boxes (-3.45..+3.45) always sit inside frame with margin
    const halfSpan = stepIndex === 5 || stepIndex === 6 ? 3.85 : 3.65;
    const vFovRad = (camera.fov * Math.PI) / 180;
    const minZForWidth = halfSpan / (Math.tan(vFovRad / 2) * Math.max(0.38, aspect));

    if (stepIndex === 0) {
      const z = Math.max(isPortrait ? 13.6 : 8.2, minZForWidth * 1.04);
      camTargetPos.set(0, isPortrait ? 2.8 : 2.35, z);
      camTargetLook.set(0, isPortrait ? 0.45 : 0.82, 0);
    } else if (stepIndex === 4) {
      const z = Math.max(7.9, minZForWidth * 1.02);
      camTargetPos.set(0, 2.05, z);
      camTargetLook.set(0, 0.86, 0);
    } else if (stepIndex === 5 || stepIndex === 6) {
      const z = Math.max(10.0, minZForWidth * 1.05);
      camTargetPos.set(0, 2.5, z);
      camTargetLook.set(0, 1.38, 0);
    } else if (stepIndex === 7) {
      const z = Math.max(8.7, minZForWidth * 1.04);
      camTargetPos.set(0.25, 2.25, z);
      camTargetLook.set(0.25, 0.9, 0);
    } else {
      const z = Math.max(8.5, minZForWidth * 1.04);
      camTargetPos.set(0, 2.35, z);
      camTargetLook.set(0, 0.88, 0);
    }
  }

  function resize() {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Slightly widen FOV on tall portrait mobile screens so perspective stays intimate without clipping
    camera.fov = camera.aspect < 0.7 ? 42 : 34;
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
    box.lampSymbol.material.map = colorIdx === 0 ? symCoralTex : symJadeTex;
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

  function setPeel(peeled) {
    peelTarget = peeled ? 1 : 0;
  }

  function setSourceEntangled(val) {
    sourceEntangled = !!val;
    coreMat.color.setHex(val ? COL_GOLD : COL_IVORY);
    coreMat.emissive.setHex(val ? COL_GOLD : COL_IVORY);
    sourceHalo.material.map = val ? glowGoldTex : glowIvoryTex;
    sourcePoint.color.setHex(val ? COL_GOLD : COL_IVORY);
    guideMat.color.setHex(val ? COL_GOLD : COL_IVORY);
  }

  function setStep(step) {
    stepIndex = step;
    showStationLabels = step >= 1;
    arenaGroup.visible = step === 5 || step === 6;
    setDialMode(step === 5 || step === 6 || step === 7 ? 'chsh' : 'mermin');
    boxLeft.dimmed = false;
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

  function setArenaProgress(pct, { isQuantum = false, se = 0, snap = false } = {}) {
    barTargetPct = Math.max(0, Math.min(1, pct));
    barIsQuantum = isQuantum;
    barTargetSigma = se;
    if (snap) {
      barCurrentPct = wallState === 'shattered' ? barTargetPct : Math.min(barTargetPct, 0.746);
    }
  }

  function setWallState(next, { settled = false } = {}) {
    if (next === wallState && !settled) return;
    wallState = next;
    if (next === 'intact') {
      glassPane.visible = true;
      clampTop.visible = true;
      clampBot.visible = true;
      glassPaneMat.map = glassIntactTex;
      glassPaneMat.emissive.setHex(0x4a6080);
      glassPaneMat.emissiveIntensity = 0.22;
      glassPaneMat.opacity = 0.78;
      glassPaneMat.needsUpdate = true;
      shardMesh.visible = false;
      label85Mat.opacity = 0.0;
      goldLineMat.opacity = 0.32;
      goldLineMat.emissiveIntensity = 0.45;
      barCurrentPct = Math.min(barCurrentPct, 0.75);
    } else if (next === 'cracked') {
      glassPane.visible = true;
      glassPaneMat.map = glassCrackedTex;
      glassPaneMat.emissive.setHex(COL_GOLD);
      glassPaneMat.emissiveIntensity = 0.55;
      glassPaneMat.opacity = 0.88;
      glassPaneMat.needsUpdate = true;
      if (!isReducedMotion) shakeAmount = 0.07;
    } else if (next === 'shattered') {
      glassPane.visible = false;
      clampTop.visible = false;
      clampBot.visible = false;
      label85Mat.opacity = 1.0;
      goldLineMat.opacity = 1.0;
      goldLineMat.emissiveIntensity = 1.9;
      if (!isReducedMotion && !settled) {
        shatterAge = 0;
        slowMoTimer = 0.46;
        shakeAmount = 0.14;
        shardMesh.visible = true;
        shardMat.opacity = 0.92;
        for (let i = 0; i < SHARD_COUNT; i++) {
          const s = shards[i];
          s.pos.set(
            x75 + (Math.random() - 0.5) * 0.16,
            (Math.random() - 0.5) * 1.0,
            (Math.random() - 0.5) * 0.55
          );
          s.vel.set(
            1.1 + Math.random() * 2.8,
            0.3 + (Math.random() - 0.35) * 2.4,
            (Math.random() - 0.5) * 2.4
          );
          s.rot.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
          s.angVel.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
          const sc = 0.55 + Math.random() * 0.95;
          s.scale.set(sc * 0.5, sc * 1.15, sc * 0.8);
        }
      } else {
        shardMesh.visible = false;
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
    const rawDt = Math.min(0.05, Math.max(0.001, (now - lastNow) / 1000));
    lastNow = now;

    // Slow-motion beat on shatter (0.28x for 450ms)
    let timeScale = 1.0;
    if (slowMoTimer > 0) {
      slowMoTimer = Math.max(0, slowMoTimer - rawDt);
      timeScale = 0.28;
    }
    const dt = rawDt * timeScale;
    elapsed += dt;

    // Gentle gimbal motion & source core breathing
    if (!isReducedMotion) {
      gimbalOuter.rotation.y += dt * 0.38;
      gimbalOuter.rotation.x = Math.sin(elapsed * 0.6) * 0.22;
      gimbalInner.rotation.z -= dt * 0.55;
      gimbalInner.rotation.y = Math.cos(elapsed * 0.5) * 0.35;
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.08;
      sourceHalo.scale.set(1.22 * pulse, 1.22 * pulse, 1);
      coreMat.emissiveIntensity = (sourceEntangled ? 1.85 : 1.15) + Math.sin(elapsed * 2.4) * 0.25;
    }

    // Smooth casing peel-off
    const peelSpeed = isReducedMotion ? 14 : 6.5;
    peelCurrent += (peelTarget - peelCurrent) * Math.min(1, rawDt * peelSpeed);
    const shellOp = 1 - peelCurrent * 0.86;
    const edgeOp = peelCurrent * 0.36;
    const indOp = peelCurrent * 0.92;
    for (const box of [boxLeft, boxRight]) {
      const dimMul = box.dimmed ? 0.38 : 1.0;
      box.shellMat.opacity = shellOp * dimMul;
      box.shellMat.depthWrite = shellOp > 0.65 && !box.dimmed;
      box.dialFaceMat.opacity = (1 - peelCurrent * 0.68) * dimMul;
      box.edgesMat.opacity = edgeOp * dimMul;
      box.indicatorRing.material.opacity = indOp * 0.55 * dimMul;
      box.needleNorth.material.opacity = indOp * dimMul;
      box.needleSouth.material.opacity = indOp * dimMul;
      box.labelSprite.material.opacity += ((showStationLabels ? (box.dimmed ? 0.35 : 0.85) : 0) - box.labelSprite.material.opacity) * Math.min(1, rawDt * 6);

      // Smooth dial & magnet rotation
      const rotLerp = isReducedMotion ? 1 : Math.min(1, rawDt * 11);
      box.currentDialRad += (box.targetDialRad - box.currentDialRad) * rotLerp;
      box.currentMagRad += (box.targetMagRad - box.currentMagRad) * rotLerp;
      box.dialKnob.rotation.z = box.currentDialRad;
      box.magnetRotor.rotation.x = box.currentMagRad;
      box.indicatorNeedle.rotation.z = box.currentMagRad;

      // Lamp bloom decay
      if (box.lampBloom > 0.01) {
        box.lampBloom = Math.max(0.32, box.lampBloom - rawDt * 0.45);
      }
      const bloom = box.lampColor >= 0 ? box.lampBloom : 0;
      box.lampMat.emissiveIntensity = 0.25 + bloom * 1.25;
      box.lampHalo.material.opacity = bloom * 0.85 * dimMul;
      box.lampLight.intensity = bloom * 2.2 * dimMul;
      box.lampSymbol.material.opacity = box.lampColor >= 0 ? Math.min(1, 0.55 + bloom * 0.45) * dimMul : 0;
    }

    // Active flying mote pairs
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
        m.meshA.rotation.y = u * Math.PI;
        m.meshB.rotation.y = -u * Math.PI;
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

    // Compare notes light-speed pulse (Step 7)
    if (comparePulse) {
      comparePulse.t += rawDt / comparePulse.duration;
      const u = Math.min(1, comparePulse.t);
      const x = -2.38 + u * 4.76;
      const y = 1.65 + Math.sin(u * Math.PI) * 0.65;
      compareOrb.position.set(x, y, 0.25);
      if (u >= 1) {
        compareOrb.visible = false;
        const cb = comparePulse.onArrive;
        comparePulse = null;
        if (cb) cb();
      }
    }

    // 3D Breakthrough score bar & glass shatter shards
    if (arenaGroup.visible) {
      const visualTarget = wallState === 'shattered' ? barTargetPct : Math.min(barTargetPct, 0.746);
      barCurrentPct += (visualTarget - barCurrentPct) * Math.min(1, rawDt * 8);
      const len = Math.max(0.04, barCurrentPct * BAR_LEN);
      barFill.scale.x = len;
      barFill.position.x = BAR_X0 + len / 2;
      const targetCol = barIsQuantum ? COL_GOLD : COL_IVORY;
      barMat.color.lerp(new THREE.Color(targetCol), Math.min(1, rawDt * 6));
      barMat.emissive.lerp(new THREE.Color(targetCol), Math.min(1, rawDt * 6));
      barMat.emissiveIntensity = barIsQuantum ? 1.25 : 0.72;

      if (barTargetSigma > 0.001 && barCurrentPct > 0.05) {
        barSigmaCap.visible = true;
        const capW = Math.max(0.06, Math.min(0.8, barTargetSigma * 4 * BAR_LEN));
        barSigmaCap.scale.x = capW;
        barSigmaCap.position.set(BAR_X0 + len, 0, 0.03);
        barSigmaMat.color.setHex(targetCol);
      } else {
        barSigmaCap.visible = false;
      }

      if (shardMesh.visible) {
        shatterAge += dt;
        const fade = Math.max(0, 1 - shatterAge / 2.2);
        shardMat.opacity = fade * 0.92;
        for (let i = 0; i < SHARD_COUNT; i++) {
          const s = shards[i];
          s.vel.y -= 3.2 * dt;
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
        if (fade <= 0.01) shardMesh.visible = false;
      }
    }

    // Smooth camera choreography + subtle shake on crack/shatter
    const camLerp = isReducedMotion ? 1 : Math.min(1, rawDt * 4.5);
    camera.position.lerp(camTargetPos, camLerp);
    camCurLook.lerp(camTargetLook, camLerp);
    if (shakeAmount > 0.002) {
      camera.position.x += (Math.random() - 0.5) * shakeAmount;
      camera.position.y += (Math.random() - 0.5) * shakeAmount;
      shakeAmount *= Math.pow(0.06, rawDt);
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
    setSourceEntangled,
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
