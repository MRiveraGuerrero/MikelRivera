// src/components/Home/PortfolioIntro2.jsx
import React, { useRef, useState, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
//import { motion } from 'framer-motion';
import * as THREE from 'three';
// import "../../../styles/PortfolioIntro.css"; // Removed due to resolution error
// import { useLanguage } from '../../contexts/LanguageContext'; // Removed due to resolution error

// Configuración para el edificio y el ascensor
const BUILDING_HEIGHT = 40; // Altura total del edificio
const BUILDING_WIDTH = 15; // Ancho del edificio
const FLOOR_HEIGHT = 3; // Altura de cada piso
const NUM_FLOORS = Math.floor(BUILDING_HEIGHT / FLOOR_HEIGHT); // Número de pisos

const ELEVATOR_SPEED = 0.1; // Velocidad de movimiento del ascensor
const ELEVATOR_WIDTH = 20; // Ancho del ascensor
const ELEVATOR_HEIGHT = 2.5; // Altura del ascensor
const ELEVATOR_DEPTH = 2; // Profundidad del ascensor

// Componente para el edificio (líneas simples)
function Building() {
  const points = [];

  // Líneas verticales (paredes)
  points.push(new THREE.Vector3(-BUILDING_WIDTH / 2, -BUILDING_HEIGHT / 2, 0));
  points.push(new THREE.Vector3(-BUILDING_WIDTH / 2, BUILDING_HEIGHT / 2, 0));

  points.push(new THREE.Vector3(BUILDING_WIDTH / 2, -BUILDING_HEIGHT / 2, 0));
  points.push(new THREE.Vector3(BUILDING_WIDTH / 2, BUILDING_HEIGHT / 2, 0));

  // Líneas horizontales (pisos)
  for (let i = 0; i <= NUM_FLOORS; i++) {
    const y = -BUILDING_HEIGHT / 2 + i * FLOOR_HEIGHT;
    points.push(new THREE.Vector3(-BUILDING_WIDTH / 2, y, 0));
    points.push(new THREE.Vector3(BUILDING_WIDTH / 2, y, 0));
  }

  // Crear la geometría de líneas
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Crear material de línea
  const material = new THREE.LineBasicMaterial({ color: 0xffffff }); // Líneas blancas

  return (
    <lineSegments geometry={geometry} material={material} />
  );
}

// Componente para el ascensor
function Elevator({ targetY }) {
  const meshRef = useRef();
  const [currentY, setCurrentY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2);

  // Animación suave del ascensor
  useFrame(() => {
    if (meshRef.current) {
      // Interpola linealmente la posición actual hacia la posición objetivo
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        ELEVATOR_SPEED
      );
      // Actualiza el estado currentY para reflejar la posición actual del mesh
      setCurrentY(meshRef.current.position.y);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, currentY, 0]}>
      <boxGeometry args={[ELEVATOR_WIDTH, ELEVATOR_HEIGHT, ELEVATOR_DEPTH]} />
      <meshStandardMaterial color="hotpink" wireframe={true} /> {/* Ascensor wireframe */}
    </mesh>
  );
}

const INTRO_TITLE = "Mi Segundo Proyecto";
const INTRO_DESCRIPTION = "Explore this interactive 3D building with an elevator controlled by arrow keys or buttons."; // Hardcoded description

export default function PortfolioIntro2() {
  // const { t } = useLanguage(); // Removed use of useLanguage hook
  const [targetY, setTargetY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2);

  // Función para obtener la posición Y del centro de un piso dado su índice
  const getFloorCenterY = useCallback((floorIndex) => {
    return -BUILDING_HEIGHT / 2 + (floorIndex * FLOOR_HEIGHT) + (ELEVATOR_HEIGHT / 2);
  }, []);

  // Función para calcular el índice del piso actual
  const getCurrentFloorIndex = useCallback((currentElevatorY) => {
    const currentFloorBaseY = currentElevatorY - (ELEVATOR_HEIGHT / 2);
    return Math.round((currentFloorBaseY - (-BUILDING_HEIGHT / 2)) / FLOOR_HEIGHT);
  }, []);


  // Manejador de eventos de teclado
  const handleKeyDown = useCallback((event) => {
    setTargetY(prevY => {
      let currentFloorIndex = getCurrentFloorIndex(prevY);
      let newTargetFloorIndex = currentFloorIndex;

      if (event.key === 'ArrowUp') {
        event.preventDefault(); // PREVIENE EL DESPLAZAMIENTO DE LA VENTANA
        newTargetFloorIndex = Math.min(NUM_FLOORS - 1, currentFloorIndex + 1);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault(); // PREVIENE EL DESPLAZAMIENTO DE LA VENTANA
        newTargetFloorIndex = Math.max(0, currentFloorIndex - 1);
      }
      return getFloorCenterY(newTargetFloorIndex);
    });
  }, [getFloorCenterY, getCurrentFloorIndex]);

  // Manejador de clic para el botón "Up"
  const handleUpClick = useCallback(() => {
    setTargetY(prevY => {
      let currentFloorIndex = getCurrentFloorIndex(prevY);
      const newTargetFloorIndex = Math.min(NUM_FLOORS - 1, currentFloorIndex + 1);
      return getFloorCenterY(newTargetFloorIndex);
    });
  }, [getFloorCenterY, getCurrentFloorIndex]);

  // Manejador de clic para el botón "Down"
  const handleDownClick = useCallback(() => {
    setTargetY(prevY => {
      let currentFloorIndex = getCurrentFloorIndex(prevY);
      const newTargetFloorIndex = Math.max(0, currentFloorIndex - 1);
      return getFloorCenterY(newTargetFloorIndex);
    });
  }, [getFloorCenterY, getCurrentFloorIndex]);


  return (
    <div
      className="portfolio-container flex flex-col items-center justify-center h-screen bg-gray-900" // Added Tailwind classes
      tabIndex={0} // Hace que el div sea enfocable
      onKeyDown={handleKeyDown} // Captura los eventos de teclado
    >
      <Canvas className="canvas w-full h-full" camera={{ position: [0, 0, -25], fov: 75 }} shadows> {/* Added Tailwind classes */}
        {/* Luces */}
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

        {/* Componentes del edificio y el ascensor */}
        <Suspense fallback={<Html center><span style={{color: 'white'}}>Loading Model...</span></Html>}> {/* Hardcoded loading text */}
          <Building />
          <Elevator targetY={targetY} /> {/* Pasamos targetY al ascensor */}
        </Suspense>

        {/* Controles de órbita para mover la cámara si es necesario */}
        <OrbitControls enableZoom={false} autoRotate={false} enableRotate={false} target={[0, 0, 0]} />
      </Canvas>


      {/* Control Panel for Elevator */}
      <div className="flex flex-row space-5-4 mt-8"> {/* Added Tailwind classes for spacing and layout */}
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
