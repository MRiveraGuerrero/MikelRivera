import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import elevatorSprite from '../../../../assets/SpritesPortfolio/ascensor.webp';
import { BUILDING_HEIGHT, FLOOR_HEIGHT, NUM_FLOORS } from './Building';

const ELEVATOR_SPEED = 0.2;
const ELEVATOR_WIDTH = 3;
const ELEVATOR_HEIGHT = 3;

export default function Elevator({ targetY, onUpdateY }) {
  const meshRef = useRef();
  const [lastFloorIndex, setLastFloorIndex] = useState(null);
  const texture = useLoader(TextureLoader, elevatorSprite);
  const isMobile = window.innerWidth <= 768;

  const initialY = isMobile
    ? -BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2 - 15
    : -BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        ELEVATOR_SPEED
      );

      const currentY = meshRef.current.position.y;
      const currentFloorBaseY = currentY - (ELEVATOR_HEIGHT / 2);
      const currentFloorIndex = Math.max(
        0,
        Math.min(NUM_FLOORS - 1, Math.round((currentFloorBaseY - (-BUILDING_HEIGHT / 2)) / FLOOR_HEIGHT))
      );

      if (currentFloorIndex !== lastFloorIndex) {
        setLastFloorIndex(currentFloorIndex);
        onUpdateY(currentY);
      }
    }
  });

  return (
    <sprite
      ref={meshRef}
      position={[0, initialY, -1]}
      scale={[ELEVATOR_WIDTH, ELEVATOR_HEIGHT, 1]}
    >
      <spriteMaterial map={texture} transparent={true} />
    </sprite>
  );
}

export { ELEVATOR_HEIGHT };
