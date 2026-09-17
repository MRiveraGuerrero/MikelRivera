import assert from 'node:assert/strict';
import test from 'node:test';
import { getSurfaceContent } from './surfaceContent.js';
import { destinations } from '../../Journey/content.js';
import { WALK_RADIUS } from './walking.js';
const t = { workPage: { items: Object.fromEntries([1, 2, 3, 4].map(i => [`work${i}`, { role: 'Role', desc: 'Description' }])) } };
for (const planet of destinations) {
  test(`${planet.name}: has reachable information, a website portal and a ship`, () => {
    const { nodes } = getSurfaceContent(planet, t, false);
    assert.ok(nodes.some(node => node.kind === 'info' && node.text));
    assert.ok(nodes.some(node => node.kind === 'gateway' && node.links[0].href === planet.path));
    assert.equal(nodes.filter(node => node.kind === 'ship').length, 1);
    assert.equal(new Set(nodes.map(node => node.id)).size, nodes.length);
    for (const node of nodes) assert.ok(Math.hypot(...node.position) + node.radius + 1 < WALK_RADIUS);
  });
}
