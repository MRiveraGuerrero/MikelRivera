// src/components/Home/PortfolioIntro1.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useFBX, Html, useTexture } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import styles from "../../../styles/PortfolioIntro.module.css"; // Estilos comunes de intro
import { useLanguage } from '../../../contexts/LanguageContext'; // Asegúrate de la ruta correcta

// COMPONENTES ANIDADOS - MUEVE LA DEFINICIÓN DE 'Model' FUERA DEL COMPONENTE PRINCIPAL
// para que esté disponible en el scope de PortfolioIntro1 al renderizarlo.
function Model({ modelPath, texturePath }) { // <--- ¡Esta función debe estar aquí, fuera del export default!
  const fbx = useFBX(modelPath);
  const textures = texturePath ? useTexture(texturePath) : {};

  fbx.position.set(-10, 0);
  fbx.scale.set(0.01, 0.01, 0.01);
  fbx.traverse((child) => {
    if (child.isMesh) {
      const originalMaterial = child.material;
      child.material = new THREE.MeshStandardMaterial({
        color: originalMaterial ? originalMaterial.color : new THREE.Color('black'),
        map: textures.colorMap || (texturePath ? textures : null),
      });
      if (texturePath && textures.colorMap) {
        textures.colorMap.wrapS = textures.colorMap.wrapT = THREE.RepeatWrapping;
      }
    }
  });
  return <primitive object={fbx} dispose={null} />;
}


// Valores específicos para este PortfolioIntro1
const MODEL_PATH = "/models/stylised-spaceship/source/ship.fbx";
const TEXTURE_PATH = "/models/stylised-spaceship/source/z.png";
const INTRO_TITLE = "Mikel Rivera";
const INTRO_ROLE_KEY = "portfolioIntro.developerRole"; // Clave de traducción

export default function PortfolioIntro1() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className={styles["portfolio-container"]}>
      <Canvas className={`${styles.canvas} ${isMobile ? styles["canvas-mobile"] : ""}`} camera={{ position: [0, 1, 50], fov: 60 }} shadows>
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
        <Stars radius={100} depth={50} count={5000} factor={4} />

        <Suspense fallback={<Html center><span style={{ color: 'white' }}>{t('portfolioIntro.loadingModel')}</span></Html>}>
          <Model modelPath={MODEL_PATH} texturePath={TEXTURE_PATH} /> {/* 'Model' ahora está definido */}
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={true} // Desactivamos el "pan" si es móvil
          enableRotate={true} // Desactivamos la rotación manual si es móvil
          autoRotate
          autoRotateSpeed={0.5}
          target={[0, 1, 0]}
        />
      </Canvas>
      {isMobile && (
        <div className={styles["mobile-touch-overlay"]} />
      )}
      <motion.div
        className={styles["intro-text"]}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h1 className={styles["portfolio-intro"]}>{INTRO_TITLE}</h1>
        <p className={styles["into-title"]}>{t(INTRO_ROLE_KEY)}</p>
      </motion.div>
    </div>
  );
}