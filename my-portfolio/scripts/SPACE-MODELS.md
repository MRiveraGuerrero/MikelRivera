# Space flight models

Original Meshy exports are preserved in `src/Home/assets/3d_models/` and are not imported by the game. Runtime assets are the six GLBs in `public/models/optimized/`.

Run `npm run optimize:models` after replacing an original. The reproducible pipeline welds and deduplicates geometry, simplifies toward 22,000 triangles per planet / 14,000 for the ship with a 0.8% error limit, resizes textures to at most 1024px, encodes WebP at quality 82, and applies Meshopt geometry compression. The game uses the bundled Meshopt decoder (no external Draco download).

`space-models-report.json` records source/output bytes, actual triangle counts and texture dimensions. Texture reduction lowers GPU memory use as well as download size. Simplification reduces rendering cost; compression alone would not reduce triangle count.

Mapping: Clockwork Terra = Lab; Purple Gearbot = Portfolio; Neural Engine = Projects; Neon Gearworld = Work; Solar Dynamo = Sun; Fox Starfighter = ship.

The game caps pixel density at 1, with a one-way reduction to 0.8 after sustained slow frames. Telemetry updates at most five times a second and skips unchanged values; the scene is memoized. Model loads have isolated placeholders and error fallbacks, so navigation and flight remain available while assets load.
