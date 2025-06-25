import React, { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import Building, { BUILDING_HEIGHT, FLOOR_HEIGHT, NUM_FLOORS } from './Portfolio2/Building';
import Elevator, { ELEVATOR_HEIGHT } from './Portfolio2/Elevator';
import FloorInfo from './Portfolio2/FloorInfo';
import dingSound from '../../../assets/Sounds/ascensor_ding.mp3';
import '../../../styles/PortfolioIntro.css';

export default function PortfolioIntro2() {
  const [targetY, setTargetY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2);
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
  const containerRef = useRef(null);
  const dingAudioRef = useRef(new Audio(dingSound));

  const getFloorCenterY = useCallback(floorIndex => {
    return -BUILDING_HEIGHT / 2 + (floorIndex * FLOOR_HEIGHT) + (ELEVATOR_HEIGHT / 2);
  }, []);

  const getCurrentFloorIndex = useCallback(currentElevatorY => {
    const currentFloorBaseY = currentElevatorY - (ELEVATOR_HEIGHT / 2);
    return Math.max(0, Math.min(NUM_FLOORS - 1, Math.round((currentFloorBaseY - (-BUILDING_HEIGHT / 2)) / FLOOR_HEIGHT)));
  }, []);

  const playDingSound = () => {
    if (dingAudioRef.current) {
      dingAudioRef.current.currentTime = 0;
      dingAudioRef.current.play();
    }
  };

  const handleKeyDown = useCallback((event) => {
    setTargetY(prevY => {
      let floor = getCurrentFloorIndex(prevY);
      let newTarget = floor;
      if (event.key === 'ArrowUp') {
        playDingSound();
        event.preventDefault();
        newTarget = Math.min(NUM_FLOORS - 1, floor + 1);
      } else if (event.key === 'ArrowDown') {
        playDingSound();
        event.preventDefault();
        newTarget = Math.max(0, floor - 1);
      }
      console.log(floor);
      return getFloorCenterY(newTarget);
    });
  }, [getCurrentFloorIndex, getFloorCenterY]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.focus();
  }, []);

  return (
    <div
      className="portfolio-container flex flex-col items-center justify-center h-screen bg-transparent"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      <Canvas
        className="canvas w-full h-full"
        camera={{ position: [0, 0, -25], fov: 75 }}
        shadows
        onCreated={({ gl }) => gl.setClearColor('#a5e7ea')}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[-5, -1, -7.5]} intensity={1.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        <Suspense fallback={<Html center><span style={{ color: 'black' }}>Loading Model...</span></Html>}>
          <Building />
          <Elevator
            targetY={targetY}
            onUpdateY={(newY) => setCurrentFloorIndex(getCurrentFloorIndex(newY))}
          />
        </Suspense>

        <OrbitControls enableZoom={false} autoRotate={false} enableRotate={false} target={[0, 0, 0]} />

        <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, -BUILDING_HEIGHT / 2 - 0.5, 0]}>
          <planeGeometry args={[100, 50]} />
          <meshStandardMaterial color="gray" />
        </mesh>
        <Html position={[0, 0, 0]} center>
          <FloorInfo currentFloorIndex={currentFloorIndex} />
        </Html>
      </Canvas>
    </div>
  );
}
