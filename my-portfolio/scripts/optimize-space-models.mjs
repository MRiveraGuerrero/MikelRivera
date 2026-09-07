import { mkdir, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, weld, simplify, textureCompress, meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const models = {
  'lab-planet': 'Meshy_AI_Clockwork_Terra_0907173530_texture.glb',
  'portfolio-planet': 'Meshy_AI_Purple_Gearbot_Planet_0907173759_texture.glb',
  'project-planet': 'Meshy_AI_Neural_Engine_0907174003_texture.glb',
  'work-planet': 'Meshy_AI_Neon_Gearworld_0907174409_texture.glb',
  sun: 'Meshy_AI_Solar_Dynamo_Orb_0907195833_texture.glb',
  spaceship: 'Meshy_AI_Fox_Starfighter_0907200137_texture.glb',
};
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready, MeshoptSimplifier.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder,
});
const triangles = doc => doc.getRoot().listMeshes().flatMap(m => m.listPrimitives()).reduce((sum, p) => sum + (p.getIndices()?.getCount() ?? p.getAttribute('POSITION').getCount()) / 3, 0);
const report = [];
await mkdir(new URL('public/models/optimized/', root), { recursive: true });
for (const [name, source] of Object.entries(models)) {
  const input = fileURLToPath(new URL(`src/Home/assets/3d_models/${source}`, root));
  const output = fileURLToPath(new URL(`public/models/optimized/${name}.glb`, root));
  const doc = await io.read(input);
  const beforeTriangles = triangles(doc);
  const texturePixelsBefore = doc.getRoot().listTextures().reduce((n,t) => { const size=t.getSize(); return n+(size ? size[0]*size[1] : 0); }, 0);
  await doc.transform(
    dedup(), weld(),
    simplify({ simplifier: MeshoptSimplifier, ratio: Math.min(1, (name === 'spaceship' ? 14000 : 22000) / beforeTriangles), error: 0.008 }),
    prune(),
    textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024], quality: 82, effort: 60 }),
    meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
  );
  await io.write(output, doc);
  const check = await io.read(output);
  const afterTriangles = triangles(check);
  const textures = check.getRoot().listTextures().map(t => ({ size: t.getSize(), format: t.getMimeType() }));
  const entry = { name, source, beforeBytes: (await stat(input)).size, afterBytes: (await stat(output)).size, beforeTriangles, afterTriangles, texturePixelsBefore, textures };
  report.push(entry);
  console.log(`${name}: ${(entry.beforeBytes/1e6).toFixed(2)} → ${(entry.afterBytes/1e6).toFixed(2)} MB; ${beforeTriangles} → ${afterTriangles} triangles`);
}
await writeFile(new URL('scripts/space-models-report.json', root), JSON.stringify(report, null, 2) + '\n');
