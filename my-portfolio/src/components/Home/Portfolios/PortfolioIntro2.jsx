// src/components/Home/PortfolioIntro2.jsx
import React, { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three'; // Importa THREE para materiales y geometrías
import "../../../styles/PortfolioIntro.css"; // Asegúrate de que los estilos existan
import { useLanguage } from '../../contexts/LanguageContext';

// Configuración para el edificio y el ascensor
const BUILDING_HEIGHT = 55; // Altura total del edificio
const BUILDING_WIDTH = 5;  // Ancho del edificio
const FLOOR_HEIGHT = 3;    // Altura de cada piso
const NUM_FLOORS = Math.floor(BUILDING_HEIGHT / FLOOR_HEIGHT); // Número de pisos

const ELEVATOR_SPEED = 0.1; // Velocidad de movimiento del ascensor
const ELEVATOR_WIDTH = 2; // Ancho del ascensor
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
function Elevator() {
  const meshRef = useRef();
  const [currentY, setCurrentY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2); // Posición inicial del ascensor
  const [targetY, setTargetY] = useState(-BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2); // Posición objetivo

  // Manejador de eventos de teclado
  const handleKeyDown = useCallback((event) => {
    setTargetY(prevY => {
      let newTargetY = prevY;
      if (event.key === 'ArrowUp') {
        newTargetY = Math.max(
          -BUILDING_HEIGHT / 2 + ELEVATOR_HEIGHT / 2, // Límite inferior
          prevY + FLOOR_HEIGHT
        );
      } else if (event.key === 'ArrowDown') {
        newTargetY = Math.min(
          BUILDING_HEIGHT / 2 - ELEVATOR_HEIGHT / 2, // Límite superior
          prevY - FLOOR_HEIGHT
        );
      }
      return newTargetY;
    });
  }, []);

  // Añadir y remover listeners de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Animación suave del ascensor
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        ELEVATOR_SPEED
      );
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

const INTRO_TITLE = "Mi Segundo Proyecto"; // Título específico para este intro
const INTRO_DESCRIPTION_KEY = "portfolioGrid.project2_description"; // Reusa la clave de descripción

export default function PortfolioIntro2() {
  const { t } = useLanguage();

  return (
    <div className="portfolio-container">
      <Canvas className="canvas" camera={{ position: [0, 0, 15], fov: 75 }} shadows>
        {/* Luces */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 10, 7.5]}
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
        <Suspense fallback={<Html center><span style={{color: 'white'}}>{t('portfolioIntro.loadingModel')}</span></Html>}>
          <Building />
          <Elevator />
        </Suspense>

        {/* Controles de órbita para mover la cámara si es necesario */}
        <OrbitControls enableZoom={false} autoRotate={false} target={[0, 0, 0]} />
      </Canvas>

      {/* Texto de introducción */}
      <motion.div
        className="intro-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="portfolio-intro">{INTRO_TITLE}</h1>
        <p className="into-title">{t(INTRO_DESCRIPTION_KEY)}</p>
        <p className="into-title" style={{ marginTop: '20px', fontSize: '1.2em' }}>
          Usa las flechas ARRIBA y ABAJO para mover el ascensor.
        </p>
      </motion.div>
    </div>
  );
}
