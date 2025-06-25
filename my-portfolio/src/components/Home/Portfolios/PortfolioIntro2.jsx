import React, { useRef, useState, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'; // Importa useLoader
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three'; // Importa TextureLoader
import elevatorSprite from '../../../assets/SpritesPortfolio/ascensor.webp'; // Reemplaza con la ruta a tu sprite WebP
import buildingSprite from '../../../assets/SpritesPortfolio/edificio.webp';
import dingSound from '../../../assets/Sounds/ascensor_ding.mp3';
import "../../../styles/PortfolioIntro.css";

// Building and Elevator Configuration
const BUILDING_HEIGHT = 30; // Total building height
const BUILDING_WIDTH = 25; // Building width
const FLOOR_HEIGHT = 7; // Height of each floor
const NUM_FLOORS = Math.floor(BUILDING_HEIGHT / FLOOR_HEIGHT); // Number of floors

const ELEVATOR_SPEED = 0.2; // Elevator movement speed
const ELEVATOR_WIDTH = 3; // Elevator width (ancho del sprite)
const ELEVATOR_HEIGHT = 3; // Elevator height (alto del sprite)
const ELEVATOR_DEPTH = 0.1; // Reduced depth for a more 2D sprite feel

// Building Component
function Building() {
  const texture1 = useLoader(TextureLoader, buildingSprite);

  return (
    <mesh position={[-0.25, -0.1, 0]}>
      {/* Box geometry for the building */}
      <boxGeometry args={[BUILDING_WIDTH, BUILDING_HEIGHT, ELEVATOR_DEPTH]} />
      {/* Aquí es donde aplicas la textura al material del mesh */}
      <meshStandardMaterial map={texture1} transparent={true} /> 
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
function Elevator({ targetY, onUpdateY  }) {
  const meshRef = useRef();
  const [lastFloorIndex, setLastFloorIndex] = useState(null);
  const texture = useLoader(TextureLoader, elevatorSprite);

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
        onUpdateY(currentY); // <- Pasamos la posición real en Y
      }
    }
  });

  return (
    <sprite ref={meshRef} position={[0, -BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2, -1]} scale={[ELEVATOR_WIDTH, ELEVATOR_HEIGHT, 1]}>
      <spriteMaterial attach="material" map={texture} transparent={true} />
      
    </sprite>
    
  );
}


export default function PortfolioIntro2() {
  const [targetY, setTargetY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2);
  const containerRef = useRef(null); // Ref for the main container div
  const dingAudioRef = useRef(new Audio(dingSound));
  const [currentFloorIndex, setCurrentFloorIndex] = useState(0);
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

  const playDingSound = () => {
    if (dingAudioRef.current) {
      dingAudioRef.current.currentTime = 0; // Reinicia el sonido si ya se estaba reproduciendo
      dingAudioRef.current.play();
    }
  };

  // Keyboard event handler
  const handleKeyDown = useCallback((event) => {
    setTargetY(prevY => {
      let currentFloorIndex = getCurrentFloorIndex(prevY);
      let newTargetFloorIndex = currentFloorIndex;
      if (event.key === 'ArrowUp') {
        playDingSound();
        event.preventDefault(); // Prevents window scrolling
        newTargetFloorIndex = Math.min(NUM_FLOORS - 1, currentFloorIndex + 1);
      } else if (event.key === 'ArrowDown') {
        playDingSound();
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
          position={[-5, -1, -7.5]}
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
          <Elevator
            targetY={targetY}
            onUpdateY={(newY) => {
              const floor = getCurrentFloorIndex(newY); // Ahora sí usamos la Y para calcular el piso
              setCurrentFloorIndex(floor);
            }}
          />
 {/* Pass targetY to the elevator */}
        </Suspense>

        {/* Orbit controls to move the camera if needed */}
        <OrbitControls enableZoom={false} autoRotate={false} enableRotate={false} target={[0, 0, 0]} />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 3, 0, 0]} position={[0, -BUILDING_HEIGHT / 2 - 0.5, 0]}>
          <planeGeometry args={[100, 50]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      </Canvas>
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-4 frente">
        {currentFloorIndex === 0 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Planta Baja</h2>
            <ul>
              <li>Recepción</li>
              <li>Sala de espera</li>
            </ul>
          </div>
        )}
        {currentFloorIndex === 1 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Piso 1</h2>
            <ul>
              <li>Oficina A</li>
              <li>Oficina B</li>
            </ul>
          </div>
        )}
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4">
        {currentFloorIndex === 0 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Info</h2>
            <ul>
              <li>Horarios</li>
              <li>Contacto</li>
            </ul>
          </div>
        )}
        {currentFloorIndex === 1 && (
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="font-bold mb-2">Servicios</h2>
            <ul>
              <li>Impresiones</li>
              <li>Consultoría</li>
            </ul>
          </div>
        )}
      </div>
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