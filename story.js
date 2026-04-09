// ============================================================
// SKYSLOP — STORY CAMPAIGN: OPERATION SAFE PASSAGE
// India ↔ London through US-Iran Warzone over UAE/Persian Gulf
// ============================================================

import * as THREE from 'https://esm.sh/three@0.162.0';

// ── Route waypoints (simulated real geography, scaled) ──────
// Each waypoint = { name, x, z, altitude, safe }
// The world is oriented: +X = East, -Z = North
const ROUTE_INDIA_TO_LONDON = [
  { name: 'Mumbai Airport (BOM)',       x: 0,     z: 0,     alt: 500,  safe: true,  brief: 'Departing Mumbai with 100 passengers. Destination: London Heathrow.' },
  { name: 'Arabian Sea',                x: -2000, z: -2000, alt: 1200, safe: true,  brief: 'Climbing to cruising altitude over the Arabian Sea. Smooth skies.' },
  { name: 'Approaching UAE Airspace',   x: -4000, z: -4500, alt: 1200, safe: true,  brief: 'Entering UAE airspace. Reports of military activity ahead...' },
  { name: 'WARZONE: Persian Gulf',      x: -5500, z: -6000, alt: 1000, safe: false, brief: '⚠ ALERT: US-Iran conflict zone! Missiles detected. Evade and survive!' },
  { name: 'WARZONE: Strait of Hormuz',  x: -7000, z: -7500, alt: 800,  safe: false, brief: '⚠ Heavy anti-aircraft fire! Fighter jets scrambled. Stay low or go high!' },
  { name: 'WARZONE: Gulf of Oman',      x: -8500, z: -8500, alt: 900,  safe: false, brief: '⚠ Missile barrage incoming! Protect your passengers at all costs!' },
  { name: 'Exiting Warzone',            x: -10000,z: -10000,alt: 1200, safe: true,  brief: 'Cleared the warzone. Passengers are shaken but safe. Entering European airspace.' },
  { name: 'Mediterranean Sea',          x: -12000,z: -12000,alt: 1200, safe: true,  brief: 'Cruising over the Mediterranean. London is within reach.' },
  { name: 'London Heathrow (LHR)',      x: -14000,z: -14000,alt: 300,  safe: true,  brief: 'Begin descent into London Heathrow. Land safely to complete the mission!' },
];

const ROUTE_LONDON_TO_INDIA = ROUTE_INDIA_TO_LONDON.slice().reverse().map((wp, i, arr) => ({
  ...wp,
  brief: i === 0 ? 'Departing London Heathrow with 100 passengers. Destination: Mumbai.'
    : i === arr.length - 1 ? 'Begin descent into Mumbai. Land safely to complete the mission!'
    : wp.safe ? wp.brief.replace('London', 'Mumbai').replace('Mumbai', 'London')
    : wp.brief,
}));

// ── Story chapters ──────────────────────────────────────────
export const STORY_CAMPAIGN = {
  title: 'OPERATION SAFE PASSAGE',
  subtitle: 'India ↔ London Through a Warzone',
  chapters: [
    {
      id: 'ch1',
      name: 'Chapter 1: Mumbai to London',
      desc: 'Transport 100 passengers from Mumbai to London. A US-Iran conflict erupts over the Persian Gulf — fly through missiles and enemy jets to deliver everyone safely.',
      icon: '🛫',
      route: ROUTE_INDIA_TO_LONDON,
      reward: 1000,
      xp: 2000,
      passengers: 100,
      difficulty: 'Normal',
      unlocked: true,
    },
    {
      id: 'ch2',
      name: 'Chapter 2: London to Mumbai',
      desc: 'The return flight. The warzone has intensified — more missiles, more jets, heavier anti-aircraft. Get your passengers home alive.',
      icon: '🛬',
      route: ROUTE_LONDON_TO_INDIA,
      reward: 2000,
      xp: 4000,
      passengers: 100,
      difficulty: 'Hard',
      unlocked: false,  // Unlocked after Ch1
    },
  ],
};

// ── Story state ─────────────────────────────────────────────
export const storyState = {
  active: false,
  chapterIdx: 0,
  waypointIdx: 0,
  passengers: 100,
  passengersLost: 0,
  panicLevel: 0,        // 0-100, increases when hit or near misses
  missilesDodged: 0,
  distanceTraveled: 0,
  dialogueQueue: [],
  dialogueVisible: false,
  currentDialogue: null,
  warzoneMissiles: [],   // active missile objects
  warzoneEnemies: [],    // enemy jet objects
  warzoneFlak: [],       // anti-aircraft explosions
  waypointRings: [],     // navigation rings
  landingPhase: false,
  missionResult: null,   // 'success' | 'failed'
};

// ── Missile class ───────────────────────────────────────────
export function createMissile(scene, origin, target) {
  const group = new THREE.Group();
  // Missile body
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.3, 6, 6),
    new THREE.MeshStandardMaterial({ color: 0xcc3333, metalness: 0.6, roughness: 0.3, emissive: 0xff2200, emissiveIntensity: 0.3 })
  );
  body.rotation.x = Math.PI / 2;
  group.add(body);
  // Exhaust glow
  const exhaust = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 6, 6),
    new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.7 })
  );
  exhaust.position.z = 4;
  group.add(exhaust);
  // Trail particles
  const trail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.8, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.3 })
  );
  trail.rotation.x = Math.PI / 2;
  trail.position.z = 8;
  group.add(trail);

  group.position.copy(origin);
  group.scale.setScalar(3);
  const dir = new THREE.Vector3().subVectors(target, origin).normalize();
  group.userData = {
    velocity: dir.multiplyScalar(250 + Math.random() * 150),
    life: 12, // seconds
    damage: 15 + Math.floor(Math.random() * 10),
    type: 'missile',
  };
  scene.add(group);
  return group;
}

// ── Enemy fighter jet ───────────────────────────────────────
export function createEnemyJet(scene, pos) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.ConeGeometry(2, 12, 6),
    new THREE.MeshStandardMaterial({ color: 0x445544, metalness: 0.5, roughness: 0.4, flatShading: true })
  );
  body.rotation.x = Math.PI / 2;
  group.add(body);
  const wing = new THREE.Mesh(
    new THREE.BoxGeometry(14, 0.3, 3),
    new THREE.MeshStandardMaterial({ color: 0x334433, metalness: 0.4, roughness: 0.5, flatShading: true })
  );
  group.add(wing);
  group.position.copy(pos);
  group.scale.setScalar(2.5);
  group.userData = {
    velocity: new THREE.Vector3((Math.random() - 0.5) * 80, 0, -60 - Math.random() * 40),
    health: 100,
    fireTimer: 2 + Math.random() * 3,
    type: 'enemy_jet',
  };
  scene.add(group);
  return group;
}

// ── Flak/Anti-aircraft burst ────────────────────────────────
export function createFlakBurst(scene, pos) {
  const group = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const spark = new THREE.Mesh(
      new THREE.SphereGeometry(2 + Math.random() * 3, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.8 })
    );
    spark.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30
    );
    group.add(spark);
  }
  // Smoke cloud
  const smoke = new THREE.Mesh(
    new THREE.SphereGeometry(15, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.4 })
  );
  group.add(smoke);
  group.position.copy(pos);
  group.userData = { life: 3, type: 'flak' };
  scene.add(group);
  return group;
}

// ── Waypoint navigation ring ────────────────────────────────
export function createWaypointRing(scene, pos, safe) {
  const ringGeo = new THREE.TorusGeometry(35, 3, 8, 24);
  const color = safe ? 0x00ff88 : 0xff3333;
  const ringMat = new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: 0.5,
    metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.8,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.copy(pos);
  ring.userData = { collected: false, safe };
  scene.add(ring);
  return ring;
}

// ── Warzone spawner ─────────────────────────────────────────
export function spawnWarzoneThreats(scene, playerPos, storyState) {
  const chapter = STORY_CAMPAIGN.chapters[storyState.chapterIdx];
  const wp = chapter.route[storyState.waypointIdx];
  if (!wp || wp.safe) return;

  const diffMultiplier = chapter.difficulty === 'Hard' ? 1.6 : 1.0;

  // Spawn missiles from random directions
  if (Math.random() < 0.025 * diffMultiplier) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 800 + Math.random() * 500;
    const origin = new THREE.Vector3(
      playerPos.x + Math.cos(angle) * dist,
      playerPos.y + (Math.random() - 0.3) * 300,
      playerPos.z + Math.sin(angle) * dist
    );
    const targetJitter = playerPos.clone().add(
      new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100)
    );
    const missile = createMissile(scene, origin, targetJitter);
    storyState.warzoneMissiles.push(missile);
  }

  // Spawn enemy jets
  if (storyState.warzoneEnemies.length < Math.floor(4 * diffMultiplier) && Math.random() < 0.008 * diffMultiplier) {
    const pos = new THREE.Vector3(
      playerPos.x + (Math.random() - 0.5) * 3000,
      playerPos.y + (Math.random() - 0.3) * 500,
      playerPos.z - 1500 - Math.random() * 2000
    );
    const jet = createEnemyJet(scene, pos);
    storyState.warzoneEnemies.push(jet);
  }

  // Spawn flak bursts near player
  if (Math.random() < 0.04 * diffMultiplier) {
    const pos = new THREE.Vector3(
      playerPos.x + (Math.random() - 0.5) * 400,
      playerPos.y + (Math.random() - 0.5) * 200,
      playerPos.z + (Math.random() - 0.5) * 400
    );
    const flak = createFlakBurst(scene, pos);
    storyState.warzoneFlak.push(flak);
  }
}

// ── Update warzone objects ──────────────────────────────────
export function updateWarzoneObjects(dt, scene, playerPos, storyState, callbacks) {
  // Update missiles
  for (let i = storyState.warzoneMissiles.length - 1; i >= 0; i--) {
    const m = storyState.warzoneMissiles[i];
    m.position.add(m.userData.velocity.clone().multiplyScalar(dt));
    m.lookAt(m.position.clone().add(m.userData.velocity));
    m.userData.life -= dt;

    // Missile-player collision
    const dist = m.position.distanceTo(playerPos);
    if (dist < 50) {
      // HIT
      const dmg = m.userData.damage;
      const passLost = Math.max(1, Math.floor(dmg / 5));
      storyState.passengers = Math.max(0, storyState.passengers - passLost);
      storyState.passengersLost += passLost;
      storyState.panicLevel = Math.min(100, storyState.panicLevel + 20);
      callbacks.onHit?.(dmg, passLost);
      removeMesh(scene, m);
      storyState.warzoneMissiles.splice(i, 1);
      continue;
    }

    // Near miss (within 100 units) — dodged
    if (dist < 100 && m.userData.life < 10.5 && !m.userData.nearMissCounted) {
      m.userData.nearMissCounted = true;
      storyState.missilesDodged++;
      storyState.panicLevel = Math.min(100, storyState.panicLevel + 5);
      callbacks.onNearMiss?.();
    }

    // Remove expired
    if (m.userData.life <= 0) {
      removeMesh(scene, m);
      storyState.warzoneMissiles.splice(i, 1);
    }
  }

  // Update enemy jets
  for (let i = storyState.warzoneEnemies.length - 1; i >= 0; i--) {
    const e = storyState.warzoneEnemies[i];
    e.position.add(e.userData.velocity.clone().multiplyScalar(dt));
    e.lookAt(e.position.clone().add(e.userData.velocity));

    // Enemy fires missiles at player
    e.userData.fireTimer -= dt;
    if (e.userData.fireTimer <= 0) {
      e.userData.fireTimer = 3 + Math.random() * 4;
      const missile = createMissile(scene, e.position.clone(), playerPos.clone());
      storyState.warzoneMissiles.push(missile);
      callbacks.onEnemyFire?.();
    }

    // Remove if too far
    if (e.position.distanceTo(playerPos) > 6000) {
      removeMesh(scene, e);
      storyState.warzoneEnemies.splice(i, 1);
    }
  }

  // Update flak
  for (let i = storyState.warzoneFlak.length - 1; i >= 0; i--) {
    const f = storyState.warzoneFlak[i];
    f.userData.life -= dt;
    f.children.forEach(c => {
      if (c.material) c.material.opacity = Math.max(0, f.userData.life / 3);
      c.scale.addScalar(dt * 0.5);
    });

    // Flak damage if very close
    const dist = f.position.distanceTo(playerPos);
    if (dist < 40 && f.userData.life > 2.5) {
      storyState.passengers = Math.max(0, storyState.passengers - 1);
      storyState.passengersLost += 1;
      storyState.panicLevel = Math.min(100, storyState.panicLevel + 8);
      callbacks.onHit?.(5, 1);
    }

    if (f.userData.life <= 0) {
      removeMesh(scene, f);
      storyState.warzoneFlak.splice(i, 1);
    }
  }

  // Decay panic
  storyState.panicLevel = Math.max(0, storyState.panicLevel - dt * 2);

  // Check failure
  if (storyState.passengers <= 0) {
    storyState.missionResult = 'failed';
    callbacks.onMissionFail?.();
  }
}

// ── Check waypoint progression ──────────────────────────────
export function checkWaypointProgress(playerPos, storyState, callbacks) {
  const chapter = STORY_CAMPAIGN.chapters[storyState.chapterIdx];
  if (!chapter) return;
  const wp = chapter.route[storyState.waypointIdx];
  if (!wp) return;

  const wpPos = new THREE.Vector3(wp.x, wp.alt, wp.z);
  const dist = playerPos.distanceTo(wpPos);

  if (dist < 200) {
    callbacks.onWaypointReached?.(wp, storyState.waypointIdx);
    storyState.waypointIdx++;

    // Check mission complete
    if (storyState.waypointIdx >= chapter.route.length) {
      storyState.missionResult = 'success';
      callbacks.onMissionComplete?.(chapter);
    }
  }
}

// ── Get current waypoint info ───────────────────────────────
export function getCurrentWaypoint(storyState) {
  const chapter = STORY_CAMPAIGN.chapters[storyState.chapterIdx];
  if (!chapter || storyState.waypointIdx >= chapter.route.length) return null;
  return chapter.route[storyState.waypointIdx];
}

export function getWaypointDirection(playerPos, storyState) {
  const wp = getCurrentWaypoint(storyState);
  if (!wp) return null;
  const target = new THREE.Vector3(wp.x, wp.alt, wp.z);
  return {
    direction: target.clone().sub(playerPos).normalize(),
    distance: target.distanceTo(playerPos),
    target,
    name: wp.name,
    safe: wp.safe,
  };
}

// ── Cleanup helper ──────────────────────────────────────────
function removeMesh(scene, obj) {
  obj.traverse(c => {
    if (c.geometry) c.geometry.dispose();
    if (c.material) {
      if (Array.isArray(c.material)) c.material.forEach(m => m.dispose());
      else c.material.dispose();
    }
  });
  scene.remove(obj);
}

export function cleanupStoryObjects(scene, storyState) {
  [...storyState.warzoneMissiles, ...storyState.warzoneEnemies, ...storyState.warzoneFlak, ...storyState.waypointRings]
    .forEach(obj => removeMesh(scene, obj));
  storyState.warzoneMissiles.length = 0;
  storyState.warzoneEnemies.length = 0;
  storyState.warzoneFlak.length = 0;
  storyState.waypointRings.length = 0;
}

// ── Reset story state ───────────────────────────────────────
export function resetStoryState(chapterIdx = 0) {
  storyState.active = true;
  storyState.chapterIdx = chapterIdx;
  storyState.waypointIdx = 0;
  storyState.passengers = STORY_CAMPAIGN.chapters[chapterIdx].passengers;
  storyState.passengersLost = 0;
  storyState.panicLevel = 0;
  storyState.missilesDodged = 0;
  storyState.distanceTraveled = 0;
  storyState.missionResult = null;
  storyState.warzoneMissiles = [];
  storyState.warzoneEnemies = [];
  storyState.warzoneFlak = [];
  storyState.waypointRings = [];
  storyState.landingPhase = false;
}
