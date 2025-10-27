// src/components/Home/PortfolioIntro2.jsx
import React, { useRef, Suspense } from 'react'; // Asegúrate de importar useRef y Suspense
import { Canvas, useFrame } from '@react-three/fiber'; // Importa Canvas y useFrame
import { OrbitControls, Stars, Html } from '@react-three/drei'; // Importa OrbitControls, Stars, Html
import { motion } from 'framer-motion';
import "../../../styles/PortfolioIntro.css";
import { useLanguage } from '../../../contexts/LanguageContext';

// Componente para el cubo animado
function AnimatedCube() {
  const meshRef = useRef(); // Referencia para el cubo

  // Animación de subida y bajada
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Mueve el cubo hacia arriba y abajo en el eje Y
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.7; // Ajusta velocidad (0.8) y amplitud (0.7)
      // Opcional: una ligera rotación para hacerlo más interesante
      meshRef.current.rotation.x += 0.015;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} /> {/* Un cubo de 2x2x2 unidades */}
      <meshStandardMaterial color="hotpink" /> {/* Color del cubo, puedes cambiarlo */}
    </mesh>
  );
}

const INTRO_TITLE = "Mi Segundo asdasdProyecto"; // Título específico para este intro
const INTRO_DESCRIPTION_KEY = "portfolioGrid.project2_description"; // Reusa la clave de descripción

export default function PortfolioIntro4() {
  const { t } = useLanguage();

  return (
    <div className="portfolio-container">
      <Canvas className="canvas" camera={{ position: [0, 1, 50], fov: 60 }} shadows>
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

        <Suspense fallback={<Html center><span style={{color: 'white'}}>{t('portfolioIntro.loadingModel')}</span></Html>}>
          <AnimatedCube /> {/* Renderiza el nuevo componente del cubo */}
        </Suspense>
        {/* Desactiva autoRotate si solo quieres el movimiento de subida/bajada */}
        <OrbitControls enableZoom={false} autoRotate={false} target={[0, 0, 0]} /> {/* Ajusta el target al centro del cubo */}
      </Canvas>
      <motion.div
        className="intro-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="portfolio-intro">{INTRO_TITLE}</h1>
        <p className="into-title">{t(INTRO_DESCRIPTION_KEY)}</p>
      </motion.div>
    </div>
  );
}