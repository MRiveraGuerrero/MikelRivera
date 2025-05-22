// src/components/PortfolioIntro.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import "../../styles/PortfolioIntro.css";

function RotatingSphere() {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} rotation={[0.4, 0.2, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#00ffff" wireframe />
    </mesh>
  );
}

export default function PortfolioIntro() {
  return (
    <div className="portfolio-container">
      <Canvas className="canvas" camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <RotatingSphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <motion.div
        className="intro-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h1>Mikel Rivera</h1>
        <p>Developer</p>
      </motion.div>
    </div>
  );
}
