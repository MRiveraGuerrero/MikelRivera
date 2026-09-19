import { destinations } from './content.js';

export const SYSTEM_CENTER = [0, 0, -1800];
export const SYSTEM_LIMIT = 2900;

// Each body has a distinct circular orbit in its own inclined plane.
// Angular speeds are radians/second: a revolution takes roughly 1–4 hours.
const ORBITS = [
  [540, 0.18, 0.2, 0.8, 0.0018],
  [820, -0.26, 0.9, 2.5, 0.0013],
  [1080, 0.38, 1.7, 4.2, 0.0010],
  [1340, -0.32, 2.4, 5.4, 0.0008],
  null,
  [1600, 0.46, 0.5, 3.4, 0.00065],
  [1870, -0.4, 1.3, 1.6, 0.0005],
  [2160, 0.3, 2.8, 0.1, 0.0004],
  // Orbit 8: El Taller shares Orbit 2 (radius 1080) at antipodal phase (+PI) so they never collide
  [1080, 0.38, 1.7, (4.2 + Math.PI) % (Math.PI * 2), 0.0010],
];
const RADII = [68, 88, 60, 66, 155, 72, 82, 50, 32];

export function orbitalPosition(body, time, output = []) {
  const orbit = body.orbit;
  if (!orbit) {
    output[0] = SYSTEM_CENTER[0]; output[1] = SYSTEM_CENTER[1]; output[2] = SYSTEM_CENTER[2];
    return output;
  }
  const angle = orbit.phase + time * orbit.speed;
  const x = Math.cos(angle) * orbit.radius;
  const z = Math.sin(angle) * orbit.radius;
  const tiltedZ = z * Math.cos(orbit.inclination);
  output[0] = SYSTEM_CENTER[0] + x * Math.cos(orbit.node) - tiltedZ * Math.sin(orbit.node);
  output[1] = SYSTEM_CENTER[1] + z * Math.sin(orbit.inclination);
  output[2] = SYSTEM_CENTER[2] + x * Math.sin(orbit.node) + tiltedZ * Math.cos(orbit.node);
  return output;
}

export function orbitPoints(body, segments = 160) {
  if (!body.orbit) return [];
  return Array.from({ length: segments + 1 }, (_, index) =>
    orbitalPosition(body, index / segments * Math.PI * 2 / body.orbit.speed));
}

// Keep portfolio content and the decorative gateway independent of flight scale.
export const solarBodies = destinations.map((body, index) => {
  const values = ORBITS[index];
  const orbit = values ? { radius: values[0], inclination: values[1], node: values[2], phase: values[3], speed: values[4] } : null;
  const expanded = { ...body, radius: RADII[index], orbit };
  return { ...expanded, position: orbitalPosition(expanded, 0) };
});

// Dense encounters across departure corridor and orbital crystal belts.
const BELT_CONFIGS = [
  { radius: 360, count: 8, heightVar: 80, radVar: 30 },
  { radius: 680, count: 12, heightVar: 100, radVar: 40 },
  { radius: 950, count: 16, heightVar: 120, radVar: 50 },
  { radius: 1220, count: 16, heightVar: 140, radVar: 50 },
  { radius: 1480, count: 16, heightVar: 150, radVar: 60 },
  { radius: 1740, count: 18, heightVar: 160, radVar: 60 },
  { radius: 2020, count: 16, heightVar: 180, radVar: 70 },
  { radius: 2380, count: 18, heightVar: 200, radVar: 80 },
];

const departureCorridorTargets = [
  [30, 12, -90],
  [-45, -18, -180],
  [65, 28, -310],
  [-75, 22, -460],
  [95, -30, -620],
  [-110, -42, -800],
  [80, 50, -1020],
  [-90, 35, -1250],
  [110, -25, -1480],
  [-60, -55, -1680],
];

const beltTargets = [];
BELT_CONFIGS.forEach((belt, bIdx) => {
  for (let i = 0; i < belt.count; i++) {
    const baseAngle = (i / belt.count) * Math.PI * 2 + (bIdx * 0.73);
    const rOffset = Math.sin(i * 3.7 + bIdx) * belt.radVar;
    const r = belt.radius + rOffset;
    const elev = Math.sin(i * 2.3 + bIdx * 1.6) * (belt.heightVar / r);
    const x = SYSTEM_CENTER[0] + Math.cos(baseAngle) * Math.cos(elev) * r;
    const y = SYSTEM_CENTER[1] + Math.sin(elev) * r;
    const z = SYSTEM_CENTER[2] + Math.sin(baseAngle) * Math.cos(elev) * r;
    beltTargets.push([x, y, z]);
  }
});

export const shootingTargets = [...departureCorridorTargets, ...beltTargets];

// Meteorites / Asteroid fields across the solar system
const ASTEROID_BELT_RINGS = [
  { radius: 880, count: 12, heightVar: 90 },
  { radius: 1360, count: 14, heightVar: 120 },
  { radius: 1950, count: 10, heightVar: 140 },
];

const departureAsteroids = [
  { position: [-40, 20, -140], radius: 4.5, health: 1, oreColor: '#ea580c' },
  { position: [55, -25, -280], radius: 6.0, health: 2, oreColor: '#06b6d4' },
  { position: [-65, 30, -520], radius: 5.2, health: 1, oreColor: '#eab308' },
  { position: [80, -20, -820], radius: 6.8, health: 2, oreColor: '#a855f7' },
  { position: [-95, -35, -1180], radius: 5.5, health: 1, oreColor: '#ea580c' },
  { position: [70, 40, -1520], radius: 6.2, health: 2, oreColor: '#06b6d4' },
];

const beltAsteroids = [];
const ORE_COLORS = ['#ea580c', '#06b6d4', '#eab308', '#a855f7', '#10b981'];

ASTEROID_BELT_RINGS.forEach((belt, bIdx) => {
  for (let i = 0; i < belt.count; i++) {
    const angle = (i / belt.count) * Math.PI * 2 + bIdx * 0.9;
    const r = belt.radius + (Math.sin(i * 4.1 + bIdx) * 60);
    const elev = Math.sin(i * 2.8 + bIdx * 1.4) * (belt.heightVar / r);
    const x = SYSTEM_CENTER[0] + Math.cos(angle) * Math.cos(elev) * r;
    const y = SYSTEM_CENTER[1] + Math.sin(elev) * r;
    const z = SYSTEM_CENTER[2] + Math.sin(angle) * Math.cos(elev) * r;
    const radius = 3.8 + (i % 4) * 0.9;
    beltAsteroids.push({
      position: [x, y, z],
      radius,
      health: radius > 5 ? 2 : 1,
      oreColor: ORE_COLORS[(i + bIdx) % ORE_COLORS.length],
    });
  }
});

export const asteroidConfigs = [...departureAsteroids, ...beltAsteroids];

// Patrol & Rogue flying spaceships roaming the system
export const patrolShipConfigs = [
  {
    name: 'Vanguard Alpha',
    center: [0, 0, -850],
    radius: 320,
    speed: 0.12,
    inclination: 0.25,
    node: 0.4,
    phase: 0,
    heightAmp: 50,
    health: 2,
    canopyColor: '#ef4444',
  },
  {
    name: 'Solar Scout I',
    center: SYSTEM_CENTER,
    radius: 580,
    speed: 0.08,
    inclination: 0.15,
    node: 1.1,
    phase: 1.2,
    heightAmp: 60,
    health: 2,
    canopyColor: '#f97316',
  },
  {
    name: 'Phantom Interceptor',
    center: SYSTEM_CENTER,
    radius: 880,
    speed: 0.07,
    inclination: -0.28,
    node: 2.2,
    phase: 3.4,
    heightAmp: 80,
    health: 3,
    canopyColor: '#a855f7',
  },
  {
    name: 'Corsair Marauder',
    center: SYSTEM_CENTER,
    radius: 1180,
    speed: -0.065,
    inclination: 0.35,
    node: 0.8,
    phase: 2.1,
    heightAmp: 90,
    health: 3,
    canopyColor: '#ef4444',
  },
  {
    name: 'Apex Runner',
    center: SYSTEM_CENTER,
    radius: 1450,
    speed: 0.055,
    inclination: -0.32,
    node: 2.7,
    phase: 4.8,
    heightAmp: 100,
    health: 2,
    canopyColor: '#06b6d4',
  },
  {
    name: 'Void Sentinel',
    center: SYSTEM_CENTER,
    radius: 1780,
    speed: -0.045,
    inclination: 0.4,
    node: 1.6,
    phase: 0.5,
    heightAmp: 110,
    health: 3,
    canopyColor: '#ec4899',
  },
  {
    name: 'Kuiper Ghost',
    center: SYSTEM_CENTER,
    radius: 2150,
    speed: 0.04,
    inclination: 0.22,
    node: 3.1,
    phase: 5.5,
    heightAmp: 120,
    health: 3,
    canopyColor: '#8b5cf6',
  },
  {
    name: 'Rogue Raider',
    center: [50, -30, -500],
    radius: 280,
    speed: -0.11,
    inclination: -0.35,
    node: 1.8,
    phase: 2.6,
    heightAmp: 60,
    health: 2,
    canopyColor: '#ef4444',
  },
];


