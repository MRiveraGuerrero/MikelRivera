import assert from 'node:assert/strict';
import test from 'node:test';
import { nearestInteractable, resolveWalk, WALK_RADIUS } from './walking.js';

const nodes = [
  { id: 'terminal', position: [0, 0], radius: 1.5 },
  { id: 'ship', position: [12, 0], radius: 3.5 },
];
test('interaction requires proximity and selects the closest surface', () => {
  assert.equal(nearestInteractable({ x: 0, z: 30 }, nodes), null);
  assert.equal(nearestInteractable({ x: 0, z: 5 }, nodes), 'terminal');
  assert.equal(nearestInteractable({ x: 8, z: 0 }, nodes), 'ship');
});
test('walking cannot enter terminals or leave the playable surface', () => {
  for (const [x, z] of [[0, 0], [1, 0], [12, 0], [100, -100], [-100, 0]]) {
    const next = resolveWalk(x, z, nodes);
    assert.ok(Number.isFinite(next.x) && Number.isFinite(next.z));
    assert.ok(Math.hypot(next.x, next.z) <= WALK_RADIUS + 0.001);
    for (const node of nodes) assert.ok(Math.hypot(next.x - node.position[0], next.z - node.position[1]) >= node.radius + 0.54);
  }
});
test('normal walking remains unchanged away from obstacles', () => {
  assert.deepEqual(resolveWalk(5, 10, nodes), { x: 5, z: 10 });
});
