export const WALK_RADIUS = 37;
export const INTERACTION_RANGE = 4.6;
export const SPAWN = [0, 8];

export function nearestInteractable(position, nodes) {
  let nearest = null;
  let distance = INTERACTION_RANGE;
  for (const node of nodes) {
    const current = Math.hypot(position.x - node.position[0], position.z - node.position[1]) - node.radius;
    if (current < distance) { nearest = node.id; distance = current; }
  }
  return nearest;
}

// Circle collisions keep movement independent of render geometry and frame rate.
export function resolveWalk(x, z, obstacles) {
  for (let pass = 0; pass < 3; pass++) {
    for (const obstacle of obstacles) {
      const dx = x - obstacle.position[0], dz = z - obstacle.position[1];
      const distance = Math.hypot(dx, dz);
      const radius = obstacle.radius + 0.55;
      if (distance < radius) {
        x = obstacle.position[0] + (distance > 0.0001 ? dx / distance : 1) * radius;
        z = obstacle.position[1] + (distance > 0.0001 ? dz / distance : 0) * radius;
      }
    }
  }
  const distance = Math.hypot(x, z);
  if (distance > WALK_RADIUS) { x *= WALK_RADIUS / distance; z *= WALK_RADIUS / distance; }
  return { x, z };
}
