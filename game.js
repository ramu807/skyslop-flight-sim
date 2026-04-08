import * as THREE from 'https://esm.sh/three@0.162.0';

// ============================================================
// AIRCRAFT DATABASE — Real-world fighter jets & commercial planes
// ============================================================
const AIRCRAFT_DB = {
  fighter: [
    { id:'f22',    name:'F-22 Raptor',        country:'USA',  icon:'✈️', speed:10, agility:9, armor:7, boost:9, free:true },
    { id:'f35',    name:'F-35 Lightning II',   country:'USA',  icon:'✈️', speed:9,  agility:8, armor:8, boost:8, free:true },
    { id:'f16',    name:'F-16 Fighting Falcon', country:'USA', icon:'✈️', speed:8,  agility:9, armor:6, boost:7, free:true },
    { id:'f15',    name:'F-15 Eagle',          country:'USA',  icon:'✈️', speed:9,  agility:7, armor:8, boost:8, free:false },
    { id:'f18',    name:'F/A-18 Super Hornet', country:'USA',  icon:'✈️', speed:8,  agility:8, armor:7, boost:7, free:false },
    { id:'su57',   name:'Su-57 Felon',         country:'RUS',  icon:'✈️', speed:10, agility:9, armor:7, boost:9, free:false, premium:true },
    { id:'su35',   name:'Su-35 Flanker-E',     country:'RUS',  icon:'✈️', speed:9,  agility:10,armor:7, boost:8, free:false },
    { id:'su34',   name:'Su-34 Fullback',      country:'RUS',  icon:'✈️', speed:8,  agility:6, armor:9, boost:7, free:false },
    { id:'mig29',  name:'MiG-29 Fulcrum',      country:'RUS',  icon:'✈️', speed:8,  agility:9, armor:6, boost:7, free:false },
    { id:'mig31',  name:'MiG-31 Foxhound',     country:'RUS',  icon:'✈️', speed:10, agility:5, armor:8, boost:10, free:false, premium:true },
    { id:'j20',    name:'J-20 Mighty Dragon',  country:'CHN',  icon:'✈️', speed:10, agility:8, armor:7, boost:9, free:false, premium:true },
    { id:'j16',    name:'J-16',                country:'CHN',  icon:'✈️', speed:8,  agility:7, armor:7, boost:7, free:false },
    { id:'j10c',   name:'J-10C Vigorous Dragon',country:'CHN', icon:'✈️', speed:8,  agility:9, armor:6, boost:7, free:false },
    { id:'ef2000', name:'Eurofighter Typhoon', country:'EU',   icon:'✈️', speed:9,  agility:9, armor:7, boost:8, free:false },
    { id:'rafale', name:'Dassault Rafale',     country:'FRA',  icon:'✈️', speed:9,  agility:9, armor:7, boost:8, free:false },
    { id:'gripen', name:'JAS 39 Gripen E',     country:'SWE',  icon:'✈️', speed:8,  agility:10,armor:6, boost:7, free:false },
    { id:'f2',     name:'Mitsubishi F-2',      country:'JPN',  icon:'✈️', speed:8,  agility:8, armor:7, boost:7, free:false },
    { id:'tejas',  name:'HAL Tejas Mk2',       country:'IND',  icon:'✈️', speed:7,  agility:8, armor:6, boost:6, free:false },
    { id:'kf21',   name:'KF-21 Boramae',       country:'KOR',  icon:'✈️', speed:9,  agility:8, armor:7, boost:8, free:false, premium:true },
    { id:'tfi',    name:'TAI TF-X Kaan',       country:'TUR',  icon:'✈️', speed:9,  agility:8, armor:7, boost:8, free:false, premium:true },
    { id:'b2',     name:'B-2 Spirit',          country:'USA',  icon:'🛩️', speed:7,  agility:3, armor:10,boost:6, free:false, premium:true },
    { id:'sr71',   name:'SR-71 Blackbird',     country:'USA',  icon:'🛩️', speed:10, agility:4, armor:8, boost:10, free:false, premium:true },
  ],
  commercial: [
    { id:'a380',  name:'Airbus A380',          country:'EU',   icon:'🛫', speed:6, agility:3, armor:10, boost:4, free:true },
    { id:'b747',  name:'Boeing 747-8',         country:'USA',  icon:'🛫', speed:6, agility:3, armor:10, boost:4, free:true },
    { id:'b787',  name:'Boeing 787 Dreamliner',country:'USA',  icon:'🛫', speed:7, agility:4, armor:9,  boost:5, free:true },
    { id:'a350',  name:'Airbus A350 XWB',      country:'EU',   icon:'🛫', speed:7, agility:4, armor:9,  boost:5, free:false },
    { id:'b777',  name:'Boeing 777X',          country:'USA',  icon:'🛫', speed:7, agility:4, armor:10, boost:5, free:false },
    { id:'a330n', name:'Airbus A330neo',       country:'EU',   icon:'🛫', speed:6, agility:4, armor:9,  boost:4, free:false },
    { id:'b737m', name:'Boeing 737 MAX 10',    country:'USA',  icon:'🛫', speed:6, agility:5, armor:8,  boost:4, free:false },
    { id:'a321x', name:'Airbus A321XLR',       country:'EU',   icon:'🛫', speed:6, agility:5, armor:8,  boost:4, free:false },
    { id:'a220',  name:'Airbus A220-300',      country:'EU',   icon:'🛫', speed:6, agility:6, armor:7,  boost:4, free:false },
    { id:'e195',  name:'Embraer E195-E2',      country:'BRA',  icon:'🛫', speed:5, agility:6, armor:7,  boost:3, free:false },
    { id:'c919',  name:'COMAC C919',           country:'CHN',  icon:'🛫', speed:6, agility:5, armor:8,  boost:4, free:false },
    { id:'mc21',  name:'Irkut MC-21',          country:'RUS',  icon:'🛫', speed:6, agility:5, armor:8,  boost:4, free:false },
    { id:'crj',   name:'CRJ-900',             country:'CAN',  icon:'🛫', speed:5, agility:6, armor:7,  boost:3, free:false },
    { id:'atr72', name:'ATR 72-600',           country:'EU',   icon:'🛫', speed:3, agility:5, armor:7,  boost:2, free:false },
    { id:'dash8', name:'De Havilland Dash 8',  country:'CAN',  icon:'🛫', speed:3, agility:5, armor:7,  boost:2, free:false },
    { id:'b767',  name:'Boeing 767-300',       country:'USA',  icon:'🛫', speed:6, agility:4, armor:9,  boost:4, free:false },
    { id:'a340',  name:'Airbus A340-600',      country:'EU',   icon:'🛫', speed:6, agility:3, armor:9,  boost:4, free:false, premium:true },
    { id:'conc',  name:'Concorde (Legend)',     country:'UK/FR',icon:'🛫', speed:10, agility:4, armor:6, boost:10, free:false, premium:true },
  ],
  special: [
    { id:'x15',   name:'X-15 Hypersonic',     country:'USA',  icon:'🚀', speed:10, agility:3, armor:5, boost:10, free:false, premium:true },
    { id:'u2',    name:'U-2 Dragon Lady',     country:'USA',  icon:'🛩️', speed:5,  agility:4, armor:6, boost:3, free:false, premium:true },
    { id:'v22',   name:'V-22 Osprey',         country:'USA',  icon:'🚁', speed:4,  agility:7, armor:8, boost:3, free:false, premium:true },
    { id:'f117',  name:'F-117 Nighthawk',     country:'USA',  icon:'🛩️', speed:7,  agility:5, armor:8, boost:6, free:false, premium:true },
    { id:'an225', name:'Antonov An-225 Mriya', country:'UKR',  icon:'🛫', speed:5,  agility:2, armor:10,boost:3, free:false, premium:true },
    { id:'heli1', name:'AH-64 Apache',        country:'USA',  icon:'🚁', speed:4,  agility:8, armor:8, boost:3, free:false, premium:true },
  ]
};

// ============================================================
// MISSIONS
// ============================================================
const MISSIONS = [
  { id:'freefly', name:'Free Flight', icon:'🌤️', desc:'Explore the open skies', reward:50, xp:100, free:true, type:'free' },
  { id:'rings',   name:'Ring Chase', icon:'🔵', desc:'Fly through checkpoint rings', reward:150, xp:300, free:true, type:'rings' },
  { id:'speed',   name:'Speed Demon', icon:'⚡', desc:'Reach max speed targets', reward:200, xp:400, free:true, type:'speed' },
  { id:'lowfly',  name:'Canyon Run', icon:'🏔️', desc:'Fly low through canyon gates', reward:250, xp:500, free:false, type:'canyon' },
  { id:'dogfight',name:'Dogfight',   icon:'💥', desc:'Shoot down enemy drones', reward:300, xp:600, free:false, type:'dogfight' },
  { id:'escort',  name:'Escort Mission', icon:'🛡️', desc:'Protect the cargo plane', reward:400, xp:800, free:false, type:'escort' },
  { id:'stunt',   name:'Stunt Show',  icon:'🌀', desc:'Perform aerobatic maneuvers', reward:350, xp:700, free:false, type:'stunt' },
  { id:'night',   name:'Night Ops',   icon:'🌙', desc:'Navigate using instruments only', reward:500, xp:1000, free:false, type:'night' },
];

const RANKS = [
  { name:'Cadet',      xp:0 },
  { name:'Wingman',    xp:500 },
  { name:'Pilot',      xp:1500 },
  { name:'Captain',    xp:3500 },
  { name:'Commander',  xp:7000 },
  { name:'Ace',        xp:15000 },
  { name:'Top Gun',    xp:30000 },
  { name:'Legend',      xp:60000 },
];

// ============================================================
// GAME STATE
// ============================================================
const state = {
  phase: 'loading', // loading, menu, playing, paused, complete, paywall
  selectedAircraft: null,
  selectedMission: null,
  selectedCategory: 'fighter',
  player: {
    xp: 0, coins: 250, flights: 0, rank: 'Cadet',
    unlockedAircraft: ['f22','f35','f16','a380','b747','b787'],
    isPro: false,
  },
  // Flight state
  position: new THREE.Vector3(0, 500, 0),
  velocity: new THREE.Vector3(0, 0, -50),
  rotation: new THREE.Euler(0, 0, 0, 'YXZ'),
  speed: 200,
  throttle: 0.5,
  boost: false,
  boostFuel: 100,
  score: 0,
  combo: 0,
  comboTimer: 0,
  missionTime: 0,
  // Mission objects
  rings: [],
  enemies: [],
  ringsCollected: 0,
  enemiesDestroyed: 0,
  // Keys
  keys: {},
};

// ============================================================
// THREE.JS SETUP
// ============================================================
const canvas = document.getElementById('gameCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 80000);
camera.position.set(0, 520, 30);

// Sky
const skyGeo = new THREE.SphereGeometry(40000, 32, 32);
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  uniforms: {
    topColor: { value: new THREE.Color(0x0044aa) },
    bottomColor: { value: new THREE.Color(0x88ccff) },
    sunColor: { value: new THREE.Color(0xffffee) },
    sunDirection: { value: new THREE.Vector3(0.3, 0.6, -0.5).normalize() },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform vec3 sunColor;
    uniform vec3 sunDirection;
    varying vec3 vWorldPosition;
    void main() {
      vec3 dir = normalize(vWorldPosition);
      float h = dir.y * 0.5 + 0.5;
      vec3 sky = mix(bottomColor, topColor, pow(h, 0.7));
      float sun = pow(max(dot(dir, sunDirection), 0.0), 256.0);
      float sunGlow = pow(max(dot(dir, sunDirection), 0.0), 8.0);
      sky += sunColor * sun * 2.0 + sunColor * sunGlow * 0.15;
      gl_FragColor = vec4(sky, 1.0);
    }
  `
});
scene.add(new THREE.Mesh(skyGeo, skyMat));

// Fog
scene.fog = new THREE.FogExp2(0x88bbee, 0.000015);

// Lights
const sunLight = new THREE.DirectionalLight(0xfff5e0, 2.5);
sunLight.position.set(300, 600, -500);
scene.add(sunLight);
const ambientLight = new THREE.AmbientLight(0x445566, 0.6);
scene.add(ambientLight);
const hemiLight = new THREE.HemisphereLight(0x88ccff, 0x446633, 0.4);
scene.add(hemiLight);

// Ground — ocean + terrain
const groundGeo = new THREE.PlaneGeometry(80000, 80000, 128, 128);
const posAttr = groundGeo.attributes.position;
for (let i = 0; i < posAttr.count; i++) {
  const x = posAttr.getX(i);
  const y = posAttr.getY(i);
  const height = Math.sin(x*0.0003)*80 + Math.cos(y*0.0005)*60 + Math.sin(x*0.001+y*0.001)*40;
  posAttr.setZ(i, Math.max(height, 0));
}
groundGeo.computeVertexNormals();
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x1a6633,
  roughness: 0.85,
  metalness: 0.0,
  flatShading: true,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Ocean
const oceanGeo = new THREE.PlaneGeometry(80000, 80000);
const oceanMat = new THREE.MeshStandardMaterial({
  color: 0x0066aa,
  roughness: 0.2,
  metalness: 0.5,
  transparent: true,
  opacity: 0.8,
});
const ocean = new THREE.Mesh(oceanGeo, oceanMat);
ocean.rotation.x = -Math.PI / 2;
ocean.position.y = -2;
scene.add(ocean);

// Clouds
const cloudGroup = new THREE.Group();
const cloudGeo = new THREE.SphereGeometry(1, 8, 6);
for (let i = 0; i < 200; i++) {
  const cloud = new THREE.Mesh(cloudGeo, new THREE.MeshStandardMaterial({
    color: 0xffffff, transparent: true, opacity: 0.5 + Math.random()*0.3,
    roughness: 1, metalness: 0,
  }));
  const scale = 80 + Math.random()*200;
  cloud.scale.set(scale, scale*0.3, scale*0.6);
  cloud.position.set(
    (Math.random()-0.5)*60000,
    300 + Math.random()*2000,
    (Math.random()-0.5)*60000
  );
  cloudGroup.add(cloud);
}
scene.add(cloudGroup);

// Mountains in distance
const mountainGroup = new THREE.Group();
for (let i = 0; i < 30; i++) {
  const h = 400 + Math.random()*1200;
  const mGeo = new THREE.ConeGeometry(200+Math.random()*400, h, 6+Math.floor(Math.random()*4));
  const mMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.3, 0.2, 0.2+Math.random()*0.15),
    flatShading: true, roughness: 0.9,
  });
  const m = new THREE.Mesh(mGeo, mMat);
  const angle = Math.random()*Math.PI*2;
  const dist = 8000+Math.random()*25000;
  m.position.set(Math.cos(angle)*dist, h*0.45, Math.sin(angle)*dist);
  mountainGroup.add(m);
}
scene.add(mountainGroup);

// ============================================================
// PLAYER AIRCRAFT (Procedural)
// ============================================================
function createAircraftMesh(aircraftData) {
  const group = new THREE.Group();
  const isFighter = AIRCRAFT_DB.fighter.some(a => a.id === aircraftData.id);
  const isHeli = aircraftData.icon === '🚁';
  const bodyColor = isFighter ? 0x556677 : 0xddddee;
  const accentColor = isFighter ? 0x334455 : 0x2244aa;

  if (isHeli) {
    // Helicopter body
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(3, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0x445544, metalness: 0.4, roughness: 0.6, flatShading: true })
    );
    body.scale.set(1, 0.7, 2);
    group.add(body);
    // Rotor
    const rotor = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.2, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    rotor.position.y = 2.5;
    rotor.userData.isRotor = true;
    group.add(rotor);
    // Tail
    const tail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.5, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0x445544, flatShading: true })
    );
    tail.rotation.x = Math.PI/2;
    tail.position.z = 7;
    group.add(tail);
  } else if (isFighter) {
    // Fighter fuselage
    const fuselage = new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 14, 6),
      new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.6, roughness: 0.3, flatShading: true })
    );
    fuselage.rotation.x = Math.PI / 2;
    group.add(fuselage);
    // Wings
    const wingGeo = new THREE.BufferGeometry();
    const wingVerts = new Float32Array([
      0,0,0, -8,0,2, -2,0,4,
      0,0,0, 2,0,4, 8,0,2,
    ]);
    wingGeo.setAttribute('position', new THREE.BufferAttribute(wingVerts, 3));
    wingGeo.computeVertexNormals();
    const wingMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.5, roughness: 0.4, side: THREE.DoubleSide, flatShading: true });
    const wings = new THREE.Mesh(wingGeo, wingMat);
    wings.position.z = 2;
    group.add(wings);
    // Tail fins
    const tailFin = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3, 2),
      new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.5, roughness: 0.4 })
    );
    tailFin.position.set(0, 1.2, 6);
    group.add(tailFin);
    // Engine glow
    const engineGlow = new THREE.Mesh(
      new THREE.CircleGeometry(0.8, 8),
      new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.7 })
    );
    engineGlow.position.z = 7;
    engineGlow.userData.isEngine = true;
    group.add(engineGlow);
  } else {
    // Commercial aircraft fuselage
    const fuselage = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 2.5, 20, 8),
      new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.3, roughness: 0.5 })
    );
    fuselage.rotation.x = Math.PI / 2;
    group.add(fuselage);
    // Nose
    const nose = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 8, 6, 0, Math.PI*2, 0, Math.PI/2),
      new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.3, roughness: 0.5 })
    );
    nose.rotation.x = -Math.PI / 2;
    nose.position.z = -10;
    group.add(nose);
    // Wings
    const wingShape = new THREE.BoxGeometry(22, 0.3, 4);
    const wingMesh = new THREE.Mesh(wingShape,
      new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.4, roughness: 0.5 })
    );
    wingMesh.position.z = 0;
    group.add(wingMesh);
    // Tail
    const tailH = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.2, 2),
      new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.4, roughness: 0.5 })
    );
    tailH.position.z = 9;
    group.add(tailH);
    const tailV = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 5, 3),
      new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.4, roughness: 0.5 })
    );
    tailV.position.set(0, 2, 9);
    group.add(tailV);
    // Engines
    for (const side of [-1, 1]) {
      const engine = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1.2, 4, 8),
        new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.6, roughness: 0.3 })
      );
      engine.rotation.x = Math.PI/2;
      engine.position.set(side*5, -1.5, 1);
      group.add(engine);
    }
  }

  group.scale.setScalar(2);
  return group;
}

let playerMesh = null;

// ============================================================
// MISSION OBJECTS
// ============================================================
const ringMeshes = [];
const enemyMeshes = [];

function spawnRings(count=20) {
  clearMissionObjects();
  for (let i = 0; i < count; i++) {
    const ringGeo = new THREE.TorusGeometry(25, 2, 8, 24);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 0.5,
      metalness: 0.8, roughness: 0.2,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(
      (Math.random()-0.5)*8000,
      200 + Math.random()*1500,
      (Math.random()-0.5)*8000
    );
    ring.lookAt(ring.position.x + Math.random()-0.5, ring.position.y, ring.position.z + Math.random()-0.5);
    ring.userData.collected = false;
    scene.add(ring);
    ringMeshes.push(ring);
  }
}

function spawnEnemies(count=8) {
  for (let i = 0; i < count; i++) {
    const eGroup = new THREE.Group();
    const eBody = new THREE.Mesh(
      new THREE.ConeGeometry(3, 10, 6),
      new THREE.MeshStandardMaterial({ color: 0xcc2222, metalness: 0.5, roughness: 0.4, flatShading: true })
    );
    eBody.rotation.x = Math.PI/2;
    eGroup.add(eBody);
    const eWing = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.3, 3),
      new THREE.MeshStandardMaterial({ color: 0x991111, metalness: 0.4, roughness: 0.5, flatShading: true })
    );
    eGroup.add(eWing);
    eGroup.position.set(
      state.position.x + (Math.random()-0.5)*4000,
      state.position.y + (Math.random()-0.5)*500 + 200,
      state.position.z + (Math.random()-0.5)*4000 - 2000
    );
    eGroup.scale.setScalar(2);
    eGroup.userData.health = 100;
    eGroup.userData.velocity = new THREE.Vector3((Math.random()-0.5)*50, 0, -30-Math.random()*40);
    scene.add(eGroup);
    enemyMeshes.push(eGroup);
  }
}

function clearMissionObjects() {
  ringMeshes.forEach(r => { r.geometry.dispose(); r.material.dispose(); scene.remove(r); });
  ringMeshes.length = 0;
  enemyMeshes.forEach(e => { e.traverse(c => { if(c.geometry) c.geometry.dispose(); if(c.material) c.material.dispose(); }); scene.remove(e); });
  enemyMeshes.length = 0;
  state.ringsCollected = 0;
  state.enemiesDestroyed = 0;
}

// ============================================================
// PARTICLES
// ============================================================
const particles = [];
function spawnParticles(pos, color=0xffaa00, count=10) {
  for (let i = 0; i < count; i++) {
    const pGeo = new THREE.SphereGeometry(0.5+Math.random()*1.5, 4, 4);
    const pMat = new THREE.MeshBasicMaterial({ color, transparent:true, opacity:1 });
    const p = new THREE.Mesh(pGeo, pMat);
    p.position.copy(pos);
    p.userData.vel = new THREE.Vector3((Math.random()-0.5)*60, (Math.random()-0.5)*60, (Math.random()-0.5)*60);
    p.userData.life = 1;
    scene.add(p);
    particles.push(p);
  }
}

function updateParticles(dt) {
  for (let i = particles.length-1; i >= 0; i--) {
    const p = particles[i];
    p.position.add(p.userData.vel.clone().multiplyScalar(dt));
    p.userData.life -= dt * 1.5;
    p.material.opacity = Math.max(0, p.userData.life);
    p.scale.setScalar(p.userData.life);
    if (p.userData.life <= 0) {
      p.geometry.dispose();
      p.material.dispose();
      scene.remove(p);
      particles.splice(i, 1);
    }
  }
}

// Contrails
let contrailPoints = [];
let contrailLine = null;

function updateContrails() {
  if (!playerMesh) return;
  contrailPoints.push(playerMesh.position.clone());
  if (contrailPoints.length > 80) contrailPoints.shift();
  if (contrailLine) { scene.remove(contrailLine); contrailLine.geometry.dispose(); contrailLine.material.dispose(); }
  if (contrailPoints.length < 2) return;
  const geo = new THREE.BufferGeometry().setFromPoints(contrailPoints);
  const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
  contrailLine = new THREE.Line(geo, mat);
  scene.add(contrailLine);
}

// ============================================================
// AUDIO (Procedural)
// ============================================================
let audioCtx = null;
let engineOsc = null;
let engineGain = null;

function initAudio() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  engineOsc = audioCtx.createOscillator();
  engineGain = audioCtx.createGain();
  engineOsc.type = 'sawtooth';
  engineOsc.frequency.value = 80;
  engineGain.gain.value = 0.05;
  engineOsc.connect(engineGain).connect(audioCtx.destination);
  engineOsc.start();
}

function playSFX(freq=800, dur=0.12, type='square', vol=0.15) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
}

function updateEngineSound() {
  if (!engineOsc || !engineGain) return;
  const pitchTarget = 60 + state.throttle * 120 + (state.boost ? 80 : 0);
  engineOsc.frequency.value += (pitchTarget - engineOsc.frequency.value) * 0.1;
  engineGain.gain.value = 0.02 + state.throttle * 0.06 + (state.boost ? 0.04 : 0);
}

// ============================================================
// INPUT
// ============================================================
document.addEventListener('keydown', e => {
  state.keys[e.code] = true;
  if (e.code === 'Escape' && state.phase === 'playing') {
    state.phase = 'paused';
    showScreen('pauseMenu');
  }
});
document.addEventListener('keyup', e => { state.keys[e.code] = false; });

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// ============================================================
// UI MANAGEMENT
// ============================================================
function showScreen(id) {
  ['loadingScreen','mainMenu','paywall','pauseMenu','missionComplete'].forEach(s => {
    document.getElementById(s).classList.add('hidden');
  });
  if (id === 'playing') {
    document.getElementById('hud').classList.remove('hidden');
  } else {
    document.getElementById('hud').classList.add('hidden');
    if (id) document.getElementById(id).classList.remove('hidden');
  }
}

function renderAircraftGrid() {
  const grid = document.getElementById('aircraftGrid');
  const cat = state.selectedCategory;
  const aircraft = AIRCRAFT_DB[cat];
  grid.innerHTML = '';
  aircraft.forEach(ac => {
    const unlocked = state.player.unlockedAircraft.includes(ac.id) || ac.free;
    const card = document.createElement('div');
    card.className = `aircraft-card${state.selectedAircraft?.id === ac.id ? ' selected' : ''}${!unlocked ? ' locked' : ''}${ac.premium ? ' premium' : ''}`;
    card.innerHTML = `<div class="ac-icon">${ac.icon}</div><div class="ac-name">${ac.name}</div><div class="ac-type">${ac.country}</div>`;
    card.addEventListener('click', () => {
      if (!unlocked && !ac.premium) {
        // Need coins to unlock
        if (state.player.coins >= 200) {
          state.player.coins -= 200;
          state.player.unlockedAircraft.push(ac.id);
          playSFX(1200, 0.3, 'sine', 0.2);
        } else return;
      }
      if (ac.premium && !state.player.isPro) {
        state.phase = 'paywall';
        showScreen('paywall');
        return;
      }
      state.selectedAircraft = ac;
      renderAircraftGrid();
      renderAircraftStats(ac);
      playSFX(600, 0.1, 'sine', 0.1);
    });
    grid.appendChild(card);
  });
}

function renderAircraftStats(ac) {
  const el = document.getElementById('aircraftStats');
  const stats = [
    { label:'SPEED', val: ac.speed },
    { label:'AGILITY', val: ac.agility },
    { label:'ARMOR', val: ac.armor },
    { label:'BOOST', val: ac.boost },
  ];
  el.innerHTML = stats.map(s => `
    <div class="stat-bar-item">
      <div class="stat-bar-label">${s.label}</div>
      <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${s.val*10}%"></div></div>
      <div class="stat-bar-val">${s.val}/10</div>
    </div>
  `).join('');
}

function renderMissions() {
  const list = document.getElementById('missionList');
  list.innerHTML = '';
  MISSIONS.forEach(m => {
    const locked = !m.free && !state.player.isPro && state.player.flights < 3;
    const card = document.createElement('div');
    card.className = `mission-card${state.selectedMission?.id === m.id ? ' selected' : ''}${locked ? ' locked' : ''}`;
    card.innerHTML = `
      <div class="mission-icon">${m.icon}</div>
      <div class="mission-name">${m.name}${locked ? ' 🔒' : ''}</div>
      <div class="mission-desc">${m.desc}</div>
      <div class="mission-reward">+${m.reward} coins &middot; +${m.xp} XP</div>
    `;
    card.addEventListener('click', () => {
      if (locked) return;
      state.selectedMission = m;
      renderMissions();
      playSFX(500, 0.1, 'sine', 0.1);
    });
    list.appendChild(card);
  });
}

function updatePlayerStatsUI() {
  const rank = RANKS.slice().reverse().find(r => state.player.xp >= r.xp) || RANKS[0];
  state.player.rank = rank.name;
  document.getElementById('playerRank').textContent = rank.name;
  document.getElementById('playerXP').textContent = state.player.xp.toLocaleString();
  document.getElementById('playerCoins').textContent = state.player.coins.toLocaleString();
  document.getElementById('playerFlights').textContent = state.player.flights;
}

// Category tabs
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.selectedCategory = tab.dataset.cat;
    renderAircraftGrid();
  });
});

// Play button
document.getElementById('btnPlay').addEventListener('click', () => {
  if (!state.selectedAircraft) {
    state.selectedAircraft = AIRCRAFT_DB.fighter[0];
  }
  if (!state.selectedMission) {
    state.selectedMission = MISSIONS[0];
  }
  startGame();
});

// ============================================================
// RAZORPAY PAYMENT INTEGRATION
// ============================================================

// ── Configuration ──────────────────────────────────────────────
// IMPORTANT: Replace this test key with your live Razorpay Key ID
// Get yours at: https://dashboard.razorpay.com → Settings → API Keys
// Test key works in sandbox (no real money charged)
const RAZORPAY_KEY_ID = 'rzp_test_REPLACE_WITH_YOUR_KEY';

// Your settlement UPI — Razorpay collects payments and settles
// to the bank account linked in your Razorpay Dashboard.
// To receive funds at 9989424223@ybl, link the corresponding
// bank account in Dashboard → Account & Settings → Bank Account.
const MERCHANT_UPI_VPA = '9989424223@ybl';

// Plan definitions (amounts in paise: ₹399 = 39900 paise)
const PLANS = {
  monthly:  { name: 'Pro Pilot — Monthly',  amount: 39900,  display: '₹399/mo',   description: 'SKYSLOP PRO Monthly Plan' },
  yearly:   { name: 'Pro Pilot — Yearly',   amount: 239900, display: '₹2,399/yr', description: 'SKYSLOP PRO Yearly Plan (Save 50%)' },
  lifetime: { name: 'Pro Pilot — Lifetime',  amount: 399900, display: '₹3,999',    description: 'SKYSLOP PRO Lifetime Access' },
};

let selectedPlan = 'monthly';

// ── Plan selection ─────────────────────────────────────────────
document.querySelectorAll('.pw-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pw-plan').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedPlan = btn.dataset.plan;
  });
});

// ── Success handler ───────────────────────────────────────────
function onPaymentSuccess(response) {
  console.log('[SKYSLOP] Payment successful:', {
    paymentId: response.razorpay_payment_id,
    orderId: response.razorpay_order_id || null,
    signature: response.razorpay_signature || null,
  });

  // ──────────────────────────────────────────────────────────
  // PRODUCTION TODO: Send response.razorpay_payment_id,
  // razorpay_order_id, and razorpay_signature to your backend
  // for verification using:
  //   hmac = crypto.createHmac('sha256', key_secret);
  //   hmac.update(order_id + '|' + payment_id);
  //   generated_signature = hmac.digest('hex');
  // Only grant PRO after server-side verification succeeds.
  // ──────────────────────────────────────────────────────────

  // Activate PRO
  state.player.isPro = true;

  // Store payment proof in memory (for production, persist server-side after signature verification)
  window.__skyslop_pro = {
    active: true,
    paymentId: response.razorpay_payment_id,
    plan: selectedPlan,
    timestamp: Date.now(),
  };

  // Sound effects
  playSFX(1000, 0.5, 'sine', 0.2);
  setTimeout(() => playSFX(1500, 0.3, 'sine', 0.15), 200);
  setTimeout(() => playSFX(1200, 0.4, 'sine', 0.18), 400);

  // Show success toast
  const toast = document.getElementById('paymentToast');
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 5000);

  // Reset button state
  const btn = document.getElementById('btnBuy');
  btn.classList.remove('processing');
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    PRO ACTIVATED
  `;

  // Return to menu
  setTimeout(() => {
    state.phase = 'menu';
    showScreen('mainMenu');
    renderAircraftGrid();
    renderMissions();
    updatePlayerStatsUI();
    // Reset button for next visit
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
      PAY &amp; UPGRADE NOW
    `;
  }, 1500);
}

// ── Failure handler ───────────────────────────────────────────
function onPaymentFailure(response) {
  console.warn('[SKYSLOP] Payment failed:', response.error);

  const btn = document.getElementById('btnBuy');
  btn.classList.remove('processing');
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
    PAY &amp; UPGRADE NOW
  `;

  // Show inline error message
  const secureText = document.querySelector('.pw-secure');
  if (secureText) {
    secureText.textContent = `Payment failed: ${response.error?.description || 'Please try again'}. Your money was not charged.`;
    secureText.style.color = 'var(--color-danger)';
    setTimeout(() => {
      secureText.innerHTML = '&#128274; Secured by Razorpay &middot; UPI &middot; Cards &middot; Net Banking';
      secureText.style.color = '';
    }, 5000);
  }

  playSFX(200, 0.3, 'sawtooth', 0.2);
}

// ── Open Razorpay Checkout ────────────────────────────────────
function openRazorpayCheckout() {
  const plan = PLANS[selectedPlan];

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: plan.amount,  // in paise
    currency: 'INR',
    name: 'SKYSLOP',
    description: plan.description,
    // order_id: 'order_xxxxxxxxx',  // PRODUCTION: create order server-side and pass ID here
    handler: onPaymentSuccess,
    prefill: {
      name: '',
      email: '',
      contact: '',
      // Pre-fill method to UPI for faster Indian checkouts
      method: 'upi',
    },
    notes: {
      plan: selectedPlan,
      game: 'SKYSLOP Flight Simulator',
      merchant_vpa: MERCHANT_UPI_VPA,
    },
    theme: {
      color: '#00c8ff',
    },
    modal: {
      ondismiss: function() {
        console.log('[SKYSLOP] Payment modal dismissed');
        const btn = document.getElementById('btnBuy');
        btn.classList.remove('processing');
        btn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          PAY &amp; UPGRADE NOW
        `;
      },
    },
    config: {
      display: {
        blocks: {
          upi: { name: 'Pay via UPI', instruments: [{ method: 'upi' }] },
          card: { name: 'Pay via Card', instruments: [{ method: 'card' }] },
          netbanking: { name: 'Net Banking', instruments: [{ method: 'netbanking' }] },
          wallet: { name: 'Wallets', instruments: [{ method: 'wallet' }] },
        },
        sequence: ['block.upi', 'block.card', 'block.netbanking', 'block.wallet'],
        preferences: { show_default_blocks: false },
      },
    },
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', onPaymentFailure);
    rzp.open();
  } catch(err) {
    console.error('[SKYSLOP] Razorpay init error:', err);
    // Fallback: show helpful message
    const secureText = document.querySelector('.pw-secure');
    if (secureText) {
      secureText.textContent = 'Payment gateway loading... Please check your internet connection and try again.';
      secureText.style.color = 'var(--color-warning)';
      setTimeout(() => {
        secureText.innerHTML = '&#128274; Secured by Razorpay &middot; UPI &middot; Cards &middot; Net Banking';
        secureText.style.color = '';
      }, 4000);
    }
    const btn = document.getElementById('btnBuy');
    btn.classList.remove('processing');
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
      PAY &amp; UPGRADE NOW
    `;
  }
}

// ── Buy button ────────────────────────────────────────────────
document.getElementById('btnBuy').addEventListener('click', () => {
  const btn = document.getElementById('btnBuy');
  btn.classList.add('processing');
  btn.innerHTML = '<span class="btn-spinner"></span> PROCESSING...';
  openRazorpayCheckout();
});

document.getElementById('btnSkipPay').addEventListener('click', () => {
  state.phase = 'menu';
  showScreen('mainMenu');
});

// ── Restore PRO status from session ────────────────────────────
// For production, persist and restore from your backend database.
if (window.__skyslop_pro?.active) {
  state.player.isPro = true;
  console.log('[SKYSLOP] PRO restored from session');
}

// Pause menu
document.getElementById('btnResume').addEventListener('click', () => {
  state.phase = 'playing';
  showScreen('playing');
});
document.getElementById('btnQuit').addEventListener('click', () => {
  state.phase = 'menu';
  clearMissionObjects();
  showScreen('mainMenu');
  updatePlayerStatsUI();
});

// Mission complete
document.getElementById('btnReplay').addEventListener('click', startGame);
document.getElementById('btnBackMenu').addEventListener('click', () => {
  state.phase = 'menu';
  showScreen('mainMenu');
  updatePlayerStatsUI();
  renderAircraftGrid();
});

// ============================================================
// GAME START
// ============================================================
function startGame() {
  if (!audioCtx) initAudio();
  else audioCtx.resume();

  // Setup aircraft
  if (playerMesh) {
    playerMesh.traverse(c => { if(c.geometry) c.geometry.dispose(); if(c.material) c.material.dispose(); });
    scene.remove(playerMesh);
  }
  playerMesh = createAircraftMesh(state.selectedAircraft);
  scene.add(playerMesh);

  // Reset flight state
  state.position.set(0, 500, 0);
  state.velocity.set(0, 0, -50);
  state.rotation.set(0, 0, 0);
  state.speed = 200;
  state.throttle = 0.5;
  state.boost = false;
  state.boostFuel = 100;
  state.score = 0;
  state.combo = 0;
  state.comboTimer = 0;
  state.missionTime = 0;
  contrailPoints = [];

  // Spawn mission objects
  clearMissionObjects();
  const mission = state.selectedMission;
  if (mission.type === 'rings' || mission.type === 'canyon') spawnRings(25);
  if (mission.type === 'dogfight' || mission.type === 'escort') { spawnRings(10); spawnEnemies(10); }
  if (mission.type === 'stunt') spawnRings(30);
  if (mission.type === 'speed') spawnRings(15);
  if (mission.type === 'night') {
    scene.fog = new THREE.FogExp2(0x112233, 0.00005);
    sunLight.intensity = 0.3;
    ambientLight.intensity = 0.15;
  } else {
    scene.fog = new THREE.FogExp2(0x88bbee, 0.000015);
    sunLight.intensity = 2.5;
    ambientLight.intensity = 0.6;
  }

  state.player.flights++;
  state.phase = 'playing';
  showScreen('playing');

  document.getElementById('hudAircraftName').textContent = state.selectedAircraft.name.toUpperCase();
  document.getElementById('hudMission').textContent = mission.name.toUpperCase();

  // Fade controls hint
  const hint = document.getElementById('controlsHint');
  hint.style.opacity = '0.7';
  setTimeout(() => { hint.style.opacity = '0'; }, 6000);
}

// ============================================================
// FLIGHT PHYSICS
// ============================================================
const _quat = new THREE.Quaternion();
const _euler = new THREE.Euler(0,0,0,'YXZ');
const _forward = new THREE.Vector3();
const _up = new THREE.Vector3(0,1,0);

function updateFlight(dt) {
  const ac = state.selectedAircraft;
  const agilityFactor = ac.agility / 10;
  const speedFactor = ac.speed / 10;
  const boostFactor = ac.boost / 10;
  const pitchRate = 1.5 * agilityFactor;
  const yawRate = 1.0 * agilityFactor;
  const rollRate = 2.5 * agilityFactor;

  // Controls
  let pitch = 0, yaw = 0, roll = 0;
  if (state.keys['KeyW'] || state.keys['ArrowUp']) pitch = -pitchRate;
  if (state.keys['KeyS'] || state.keys['ArrowDown']) pitch = pitchRate;
  if (state.keys['KeyA'] || state.keys['ArrowLeft']) yaw = yawRate;
  if (state.keys['KeyD'] || state.keys['ArrowRight']) yaw = -yawRate;
  if (state.keys['KeyQ']) roll = rollRate;
  if (state.keys['KeyE']) roll = -rollRate;

  // Throttle
  if (state.keys['ShiftLeft'] || state.keys['ShiftRight']) state.throttle = Math.min(1, state.throttle + dt * 0.8);
  if (state.keys['ControlLeft'] || state.keys['ControlRight']) state.throttle = Math.max(0, state.throttle - dt * 0.8);

  // Boost
  state.boost = state.keys['Space'] && state.boostFuel > 0;
  if (state.boost) {
    state.boostFuel = Math.max(0, state.boostFuel - dt * 30);
  } else {
    state.boostFuel = Math.min(100, state.boostFuel + dt * 8);
  }

  // Apply rotation
  _euler.set(state.rotation.x, state.rotation.y, state.rotation.z, 'YXZ');
  _euler.x += pitch * dt;
  _euler.y += yaw * dt;
  _euler.z += roll * dt;
  // Dampen roll back to 0
  _euler.z *= 0.97;
  state.rotation.set(_euler.x, _euler.y, _euler.z);

  // Speed
  const maxSpeed = (100 + speedFactor * 500) * (state.boost ? (1 + boostFactor * 0.5) : 1);
  const targetSpeed = state.throttle * maxSpeed;
  state.speed += (targetSpeed - state.speed) * dt * 2;

  // Forward direction
  _quat.setFromEuler(_euler);
  _forward.set(0, 0, -1).applyQuaternion(_quat);

  // Velocity
  state.velocity.copy(_forward).multiplyScalar(state.speed);

  // Gravity influence
  if (state.speed < 50) state.velocity.y -= 30 * dt;

  // Position
  state.position.add(state.velocity.clone().multiplyScalar(dt));

  // Ground clamp
  if (state.position.y < 20) {
    state.position.y = 20;
    if (state.velocity.y < 0) state.velocity.y = 0;
  }

  // Ceiling
  if (state.position.y > 8000) state.position.y = 8000;

  // Update mesh
  if (playerMesh) {
    playerMesh.position.copy(state.position);
    playerMesh.quaternion.copy(_quat);
    // Rotate helicopter rotors
    playerMesh.traverse(c => {
      if (c.userData.isRotor) c.rotation.y += dt * 30;
      if (c.userData.isEngine) c.material.opacity = 0.3 + state.throttle * 0.7;
    });
  }

  // Camera follow
  const camOffset = new THREE.Vector3(0, 8, 30).applyQuaternion(_quat);
  const targetCamPos = state.position.clone().add(camOffset);
  camera.position.lerp(targetCamPos, dt * 5);
  camera.lookAt(state.position);
}

// ============================================================
// MISSION LOGIC
// ============================================================
function updateMission(dt) {
  state.missionTime += dt;

  // Combo timer
  if (state.combo > 0) {
    state.comboTimer -= dt;
    if (state.comboTimer <= 0) { state.combo = 0; }
  }

  // Ring collection
  ringMeshes.forEach(ring => {
    if (ring.userData.collected) return;
    const dist = state.position.distanceTo(ring.position);
    if (dist < 40) {
      ring.userData.collected = true;
      ring.visible = false;
      state.ringsCollected++;
      state.combo++;
      state.comboTimer = 3;
      const comboMultiplier = Math.min(state.combo, 10);
      state.score += 100 * comboMultiplier;
      spawnParticles(ring.position.clone(), 0x00ff88, 15);
      playSFX(800 + state.combo * 100, 0.2, 'sine', 0.2);
    }
    // Rotate uncollected rings
    ring.rotation.y += dt * 2;
  });

  // Enemy AI
  enemyMeshes.forEach((enemy, idx) => {
    if (enemy.userData.health <= 0) return;
    const vel = enemy.userData.velocity;
    // Chase player loosely
    const toPlayer = state.position.clone().sub(enemy.position).normalize();
    vel.lerp(toPlayer.multiplyScalar(60), dt * 0.5);
    enemy.position.add(vel.clone().multiplyScalar(dt));
    enemy.lookAt(enemy.position.clone().add(vel));
    // Hit detection (player near enemy = damage to enemy, simulating shooting)
    const dist = state.position.distanceTo(enemy.position);
    if (dist < 60 && state.speed > 150) {
      enemy.userData.health -= 50;
      spawnParticles(enemy.position.clone(), 0xff4400, 20);
      playSFX(300, 0.3, 'sawtooth', 0.2);
      if (enemy.userData.health <= 0) {
        enemy.visible = false;
        state.enemiesDestroyed++;
        state.score += 500;
        state.combo++;
        state.comboTimer = 3;
        spawnParticles(enemy.position.clone(), 0xff6600, 30);
        playSFX(200, 0.5, 'sawtooth', 0.25);
      }
    }
  });

  // Mission completion checks
  const mission = state.selectedMission;
  let complete = false;
  if (mission.type === 'rings' && state.ringsCollected >= 25) complete = true;
  if (mission.type === 'speed' && state.speed > 400 && state.ringsCollected >= 15) complete = true;
  if (mission.type === 'canyon' && state.ringsCollected >= 25) complete = true;
  if (mission.type === 'dogfight' && state.enemiesDestroyed >= 10) complete = true;
  if (mission.type === 'stunt' && state.ringsCollected >= 30) complete = true;
  if (mission.type === 'escort' && state.missionTime > 120 && state.enemiesDestroyed >= 5) complete = true;
  if (mission.type === 'night' && state.missionTime > 60 && state.ringsCollected >= 0) complete = true;
  // Free flight never ends auto

  if (complete) {
    completeMission();
  }

  // Score from flying (free flight)
  if (mission.type === 'free') {
    state.score += Math.floor(state.speed * dt * 0.1);
  }
}

function completeMission() {
  state.phase = 'complete';
  const mission = state.selectedMission;
  const timeBonus = Math.max(0, 1000 - Math.floor(state.missionTime) * 5);
  const totalScore = state.score + timeBonus;
  const xpEarned = mission.xp + Math.floor(totalScore / 10);
  const coinsEarned = mission.reward + Math.floor(totalScore / 20);

  state.player.xp += xpEarned;
  state.player.coins += coinsEarned;

  // Grade
  let grade = 'C';
  if (totalScore > 5000) grade = 'S';
  else if (totalScore > 3000) grade = 'A';
  else if (totalScore > 1500) grade = 'B';

  document.getElementById('completeGrade').textContent = grade;
  document.getElementById('completeScore').textContent = totalScore.toLocaleString();
  const mins = Math.floor(state.missionTime/60);
  const secs = Math.floor(state.missionTime%60);
  document.getElementById('completeTime').textContent = `${mins}:${secs.toString().padStart(2,'0')}`;
  document.getElementById('completeXP').textContent = `+${xpEarned.toLocaleString()}`;
  document.getElementById('completeCoins').textContent = `+${coinsEarned.toLocaleString()}`;

  showScreen('missionComplete');
  playSFX(600, 0.3, 'sine', 0.2);
  setTimeout(() => playSFX(900, 0.3, 'sine', 0.15), 200);
  setTimeout(() => playSFX(1200, 0.4, 'sine', 0.2), 400);
}

// ============================================================
// HUD UPDATE
// ============================================================
function updateHUD() {
  const speedKts = Math.floor(state.speed * 1.944);
  const altFt = Math.floor(state.position.y * 3.281);
  const heading = ((Math.floor(THREE.MathUtils.radToDeg(state.rotation.y)) % 360) + 360) % 360;

  document.getElementById('hudSpeed').textContent = speedKts;
  document.getElementById('hudAlt').textContent = altFt.toLocaleString();
  document.getElementById('hudHeading').textContent = heading.toString().padStart(3, '0');
  document.getElementById('hudThrottle').style.width = `${state.throttle * 100}%`;
  document.getElementById('hudScore').textContent = state.score.toLocaleString();

  // Combo
  const comboEl = document.getElementById('hudCombo');
  if (state.combo > 1) {
    comboEl.textContent = `${state.combo}x COMBO`;
    comboEl.style.display = 'block';
  } else {
    comboEl.textContent = '';
  }

  // Warnings
  const warnings = document.getElementById('hudWarnings');
  if (state.position.y < 80) {
    warnings.textContent = '⚠ PULL UP';
    warnings.style.display = 'block';
  } else if (state.boostFuel < 10 && state.boost) {
    warnings.textContent = '⚠ BOOST LOW';
    warnings.style.display = 'block';
  } else {
    warnings.textContent = '';
  }

  // Minimap
  updateMinimap();
}

function updateMinimap() {
  const mc = document.getElementById('minimapCanvas');
  const ctx = mc.getContext('2d');
  ctx.clearRect(0, 0, 150, 150);
  ctx.fillStyle = 'rgba(0, 20, 40, 0.8)';
  ctx.fillRect(0, 0, 150, 150);

  const scale = 0.005;
  const cx = 75, cy = 75;

  // Draw rings
  ctx.fillStyle = '#00ff88';
  ringMeshes.forEach(ring => {
    if (ring.userData.collected) return;
    const rx = cx + (ring.position.x - state.position.x) * scale;
    const ry = cy + (ring.position.z - state.position.z) * scale;
    if (rx > 0 && rx < 150 && ry > 0 && ry < 150) {
      ctx.beginPath();
      ctx.arc(rx, ry, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw enemies
  ctx.fillStyle = '#ff3333';
  enemyMeshes.forEach(e => {
    if (e.userData.health <= 0) return;
    const rx = cx + (e.position.x - state.position.x) * scale;
    const ry = cy + (e.position.z - state.position.z) * scale;
    if (rx > 0 && rx < 150 && ry > 0 && ry < 150) {
      ctx.beginPath();
      ctx.arc(rx, ry, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Player
  ctx.fillStyle = '#00c8ff';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 6);
  ctx.lineTo(cx - 4, cy + 4);
  ctx.lineTo(cx + 4, cy + 4);
  ctx.closePath();
  ctx.fill();
}

// ============================================================
// DEBUG OVERLAY
// ============================================================
let debugFrames = 0, debugLast = performance.now(), debugFPS = 0;
function updateDebug() {
  debugFrames++;
  const now = performance.now();
  if (now - debugLast >= 1000) {
    debugFPS = (debugFrames * 1000) / (now - debugLast);
    debugFrames = 0;
    debugLast = now;
    const info = renderer.info;
    document.getElementById('debugOverlay').textContent =
      `FPS:${debugFPS.toFixed(0)} | Draw:${info.render?.calls} Tri:${info.render?.triangles} | Phase:${state.phase}`;
  }
}

// ============================================================
// GAME LOOP
// ============================================================
const clock = new THREE.Clock();

function gameLoop() {
  requestAnimationFrame(gameLoop);
  const dt = Math.min(clock.getDelta(), 0.1);

  renderer.info.reset();

  if (state.phase === 'playing') {
    updateFlight(dt);
    updateMission(dt);
    updateParticles(dt);
    updateContrails();
    updateEngineSound();
    updateHUD();
  }

  // Animate clouds slowly
  cloudGroup.children.forEach((c, i) => {
    c.position.x += Math.sin(i * 0.1) * dt * 2;
  });

  renderer.render(scene, camera);
  updateDebug();
}

// ============================================================
// TEST HOOKS
// ============================================================
window.render_game_to_text = () => JSON.stringify({
  phase: state.phase,
  position: { x: state.position.x.toFixed(1), y: state.position.y.toFixed(1), z: state.position.z.toFixed(1) },
  speed: state.speed.toFixed(1),
  throttle: state.throttle.toFixed(2),
  score: state.score,
  combo: state.combo,
  boost: state.boost,
  boostFuel: state.boostFuel.toFixed(1),
  aircraft: state.selectedAircraft?.name || 'none',
  mission: state.selectedMission?.name || 'none',
  ringsCollected: state.ringsCollected,
  enemiesDestroyed: state.enemiesDestroyed,
  missionTime: state.missionTime.toFixed(1),
});

window.advanceTime = (ms) => {
  const steps = Math.max(1, Math.round(ms / (1000/60)));
  for (let i = 0; i < steps; i++) {
    if (state.phase === 'playing') {
      updateFlight(1/60);
      updateMission(1/60);
      updateParticles(1/60);
    }
  }
  renderer.render(scene, camera);
};

// ============================================================
// LOADING SEQUENCE
// ============================================================
async function init() {
  const bar = document.getElementById('loadingBar');
  const text = document.getElementById('loadingText');

  const steps = [
    'Calibrating altimeters...', 'Loading aircraft database...',
    'Generating terrain...', 'Configuring avionics...',
    'Fueling aircraft...', 'Checking flight systems...',
    'Ready for takeoff...'
  ];

  for (let i = 0; i < steps.length; i++) {
    text.textContent = steps[i];
    bar.style.width = `${((i + 1) / steps.length) * 100}%`;
    await new Promise(r => setTimeout(r, 350));
  }

  // Default selections
  state.selectedAircraft = AIRCRAFT_DB.fighter[0];
  state.selectedMission = MISSIONS[0];

  // Render menu
  renderAircraftGrid();
  renderAircraftStats(state.selectedAircraft);
  renderMissions();
  updatePlayerStatsUI();

  // Show menu
  setTimeout(() => {
    state.phase = 'menu';
    showScreen('mainMenu');
  }, 400);

  // Start game loop
  gameLoop();
}

init();
