import React, { useRef, useState, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'; // Importa useLoader
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three'; // Importa TextureLoader
import elevatorSprite from '../../../assets/SpritesPortfolio/ascensor.webp'; // Reemplaza con la ruta a tu sprite WebP

// Building and Elevator Configuration
const BUILDING_HEIGHT = 30; // Total building height
const BUILDING_WIDTH = 25; // Building width
const FLOOR_HEIGHT = 7; // Height of each floor
const NUM_FLOORS = Math.floor(BUILDING_HEIGHT / FLOOR_HEIGHT); // Number of floors

const ELEVATOR_SPEED = 0.1; // Elevator movement speed
const ELEVATOR_WIDTH = 5; // Elevator width (ancho del sprite)
const ELEVATOR_HEIGHT = 2.5; // Elevator height (alto del sprite)
const ELEVATOR_DEPTH = 0.1; // Reduced depth for a more 2D sprite feel

// Building Component
function Building() {
  return (
    <mesh position={[0, 0, 0]}>
      {/* Box geometry for the building */}
      <boxGeometry args={[BUILDING_WIDTH, BUILDING_HEIGHT, ELEVATOR_DEPTH]} />
      {/* Standard material for a solid appearance and color */}
      <meshStandardMaterial color="#BC0119" /> {/* Light blue color for the building */}

      {/* Horizontal lines to simulate floors inside the building */}
      {Array.from({ length: NUM_FLOORS }).map((_, i) => {
        const y = -BUILDING_HEIGHT / 2 + (i + 1) * FLOOR_HEIGHT; // +1 to start from the first actual floor
        return (
          <lineSegments key={i}>
            <bufferGeometry attach="geometry" >
              <float32BufferAttribute
                attach="attributes-position"
                array={new Float32Array([
                  -BUILDING_WIDTH / 2, y, ELEVATOR_DEPTH / 2 + 0.01,
                  BUILDING_WIDTH / 2, y, ELEVATOR_DEPTH / 2 + 0.01
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={0xaaaaaa} /> {/* Light grey floor lines */}
          </lineSegments>
        );
      })}
    </mesh>
  );
}

// Elevator Component
function Elevator({ targetY }) {
  const meshRef = useRef();
  const [currentY, setCurrentY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2);

  // Carga la textura del sprite
  const texture = useLoader(TextureLoader, elevatorSprite);

  // Smooth elevator animation
  useFrame(() => {
    if (meshRef.current) {
      // Linearly interpolate the current position towards the target position
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        ELEVATOR_SPEED
      );
      // Update the currentY state to reflect the mesh's current position
      setCurrentY(meshRef.current.position.y);
    }
  });

  return (
    // Usa <sprite> en lugar de <mesh> para el ascensor
    // Se ha cambiado la posición Z a 0.1 para que esté delante del edificio
    <sprite ref={meshRef} position={[0, currentY, -1]} scale={[ELEVATOR_WIDTH, ELEVATOR_HEIGHT, 1]}>
      <spriteMaterial attach="material" map={texture} transparent={true} />
    </sprite>
  );
}

export default function PortfolioIntro2() {
  const [targetY, setTargetY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2);
  const containerRef = useRef(null); // Ref for the main container div

  // Function to get the Y position of the center of a floor given its index
  const getFloorCenterY = useCallback((floorIndex) => {
    return -BUILDING_HEIGHT / 2 + (floorIndex * FLOOR_HEIGHT) + (ELEVATOR_HEIGHT / 2);
  }, []);

  // Function to calculate the current floor index
  const getCurrentFloorIndex = useCallback((currentElevatorY) => {
    const currentFloorBaseY = currentElevatorY - (ELEVATOR_HEIGHT / 2);
    // Ensure the index is not negative and does not exceed the number of floors
    return Math.max(0, Math.min(NUM_FLOORS - 1, Math.round((currentFloorBaseY - (-BUILDING_HEIGHT / 2)) / FLOOR_HEIGHT)));
  }, []);

  // Keyboard event handler
  const handleKeyDown = useCallback((event) => {
    setTargetY(prevY => {
      let currentFloorIndex = getCurrentFloorIndex(prevY);
      let newTargetFloorIndex = currentFloorIndex;

      if (event.key === 'ArrowUp') {
        event.preventDefault(); // Prevents window scrolling
        newTargetFloorIndex = Math.min(NUM_FLOORS - 1, currentFloorIndex + 1);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault(); // Prevents window scrolling
        newTargetFloorIndex = Math.max(0, currentFloorIndex - 1);
      }
      return getFloorCenterY(newTargetFloorIndex);
    });
  }, [getFloorCenterY, getCurrentFloorIndex]);

  // Click handler for the "Up" button
  const handleUpClick = useCallback(() => {
    setTargetY(prevY => {
      let currentFloorIndex = getCurrentFloorIndex(prevY);
      const newTargetFloorIndex = Math.min(NUM_FLOORS - 1, currentFloorIndex + 1);
      return getFloorCenterY(newTargetFloorIndex);
    });
  }, [getFloorCenterY, getCurrentFloorIndex]);

  // Click handler for the "Down" button
  const handleDownClick = useCallback(() => {
    setTargetY(prevY => {
      let currentFloorIndex = getCurrentFloorIndex(prevY);
      const newTargetFloorIndex = Math.max(0, currentFloorIndex - 1);
      return getFloorCenterY(newTargetFloorIndex);
    });
  }, [getFloorCenterY, getCurrentFloorIndex]);

  // Effect to focus the div when the component mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []); // Empty dependency array means this runs once on mount


  return (
    <div
      className="portfolio-container flex flex-col items-center justify-center h-screen bg-transparent" // Changed background to transparent
      tabIndex={0} // Makes the div focusable
      onKeyDown={handleKeyDown} // Captures keyboard events
      ref={containerRef} // Attach the ref to the div
    >
      <Canvas
        className="canvas w-full h-full"
        camera={{ position: [0, 0, -25], fov: 75 }}
        shadows
        onCreated={({ gl }) => {
          gl.setClearColor('#a5e7ea'); // Set sky blue background color directly on the Canvas
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, -10, 7.5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        {/* Building and Elevator Components */}
        <Suspense fallback={<Html center><span style={{color: 'black'}}>Loading Model...</span></Html>}>
          <Building />
          <Elevator targetY={targetY} /> {/* Pass targetY to the elevator */}
        </Suspense>

        {/* Orbit controls to move the camera if needed */}
        <OrbitControls enableZoom={false} autoRotate={false} enableRotate={false} target={[0, 0, 0]} />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, -BUILDING_HEIGHT / 2 - 0.5, 0]}>
          <planeGeometry args={[100, 50]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </Canvas>

      {/* Control Panel for Elevator */}
      <div className="flex flex-row space-x-4 mt-8">
        <button
          onClick={handleUpClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
        >
          <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
          Up
        </button>
        <button
          onClick={handleDownClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
        >
          <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          Down
        </button>
      </div>
    </div>
  );
}