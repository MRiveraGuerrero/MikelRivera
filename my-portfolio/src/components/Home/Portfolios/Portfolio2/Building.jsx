import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import buildingSprite from '../../../../assets/SpritesPortfolio/edificio.webp';

const BUILDING_HEIGHT = 30;
const BUILDING_WIDTH = 25;
const FLOOR_HEIGHT = 7;
const NUM_FLOORS = Math.floor(BUILDING_HEIGHT / FLOOR_HEIGHT);
const ELEVATOR_DEPTH = 0.1;

export default function Building() {
  const texture1 = useLoader(TextureLoader, buildingSprite);

  return (
    <mesh position={[-0.25, -0.1, 0]}>
      <boxGeometry args={[BUILDING_WIDTH, BUILDING_HEIGHT, ELEVATOR_DEPTH]} />
      <meshStandardMaterial map={texture1} transparent={true} />

      {Array.from({ length: NUM_FLOORS }).map((_, i) => {
        const y = -BUILDING_HEIGHT / 2 + (i + 1) * FLOOR_HEIGHT;
        return (
          <lineSegments key={i}>
            <bufferGeometry>
              <float32BufferAttribute
                attach="attributes-position"
                array={new Float32Array([
                  -BUILDING_WIDTH / 2, y, ELEVATOR_DEPTH / 2 + 0.01,
                  BUILDING_WIDTH / 2, y, ELEVATOR_DEPTH / 2 + 0.01
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={0xaaaaaa} />
          </lineSegments>
        );
      })}
    </mesh>
  );
}

export { BUILDING_HEIGHT, BUILDING_WIDTH, FLOOR_HEIGHT, NUM_FLOORS };
