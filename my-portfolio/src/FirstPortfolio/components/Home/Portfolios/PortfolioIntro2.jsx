import React, { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import Building, { BUILDING_HEIGHT, FLOOR_HEIGHT, NUM_FLOORS } from './Portfolio2/Building';
import Elevator, { ELEVATOR_HEIGHT } from './Portfolio2/Elevator';
import FloorInfo from './Portfolio2/FloorInfo';
import dingSound from '../../../assets/Sounds/ascensor_ding.mp3';
import styles from '../../../styles/PortfolioIntro.module.css';

export default function PortfolioIntro2() {

  const [currentFloorIndex, setCurrentFloorIndex] = useState(3);
  const containerRef = useRef(null);
  const dingAudioRef = useRef(new Audio(dingSound));
  const isMobile = window.innerWidth <= 768;
  const SCALE_FACTOR = isMobile ? 0.5 : 1;
  const CAMERA_Z = isMobile ? -25 : -25;
  const POSITION_Y = isMobile ? -25 : -25;
  const initialTargetY = isMobile
  const GROUND_Y = isMobile
    ? -BUILDING_HEIGHT / 2 - 15  // más abajo en móvil
    : -BUILDING_HEIGHT / 2;       // el original en desktop

  const [targetY, setTargetY] = useState(initialTargetY);

  const getFloorCenterY = useCallback((floorIndex) => {
    return GROUND_Y + (floorIndex * FLOOR_HEIGHT) + (ELEVATOR_HEIGHT / 2);
  }, [GROUND_Y]);

  const getCurrentFloorIndex = useCallback((currentElevatorY) => {
    const currentFloorBaseY = currentElevatorY - (ELEVATOR_HEIGHT / 2);
    return Math.max(
      0,
      Math.min(NUM_FLOORS - 1, Math.round((currentFloorBaseY - GROUND_Y) / FLOOR_HEIGHT))
    );
  }, [GROUND_Y]);

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
      className={`${styles["portfolio-container"]} flex flex-col items-center justify-center h-screen bg-transparent`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      <Canvas
        className={`${styles.canvas} w-full h-full`}
        camera={{ position: [0, 0, CAMERA_Z], fov: 75 }}
        shadows
        onCreated={({ gl }) => gl.setClearColor('#a5e7ea')}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[-5, -1, -7.5]} intensity={1.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        <Suspense fallback={<Html center><span style={{ color: 'black' }}>Loading Model...</span></Html>}>
          <group scale={[SCALE_FACTOR, SCALE_FACTOR, SCALE_FACTOR]}>
            <Building />
            <Elevator
              targetY={targetY}
              onUpdateY={(newY) => setCurrentFloorIndex(getCurrentFloorIndex(newY))}
            />
          </group>
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
      {isMobile && (
        <div className={styles["mobile-touch-overlay"]}>
          <div className={styles["mobile-controls"]}>
            <button onClick={() => handleKeyDown({ key: 'ArrowUp', preventDefault: () => { } })}>Subir</button>
            <button onClick={() => handleKeyDown({ key: 'ArrowDown', preventDefault: () => { } })}>Bajar</button>
          </div>
        </div>
      )}
    </div>
  );
}
