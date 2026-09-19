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
];
const RADII = [68, 88, 60, 66, 155, 72, 82, 50];

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

// Sparse encounters across the inner, middle and outer system. The radial
// gaps stay clear of every moving planet throughout its full revolution.
export const shootingTargets = [320, 680, 950, 1210, 1735, 2350].map((radius, index) => {
  const angle = index * 2.399963 + 0.65;
  const elevation = Math.sin(index * 1.7) * 0.35;
  return [
    SYSTEM_CENTER[0] + Math.cos(angle) * Math.cos(elevation) * radius,
    SYSTEM_CENTER[1] + Math.sin(elevation) * radius,
    SYSTEM_CENTER[2] + Math.sin(angle) * Math.cos(elevation) * radius,
  ];
});
