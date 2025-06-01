// src/components/PortfolioIntro.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useFBX, Html } from '@react-three/drei'; // Importa useFBX y Html para el fallback
import { Suspense, useRef } from 'react'; // Importa Suspense para la carga del modelo
import { motion } from 'framer-motion';
// Asegúrate de que la ruta a tu CSS sea correcta desde la ubicación de este archivo.
// Si PortfolioIntro.jsx está en src/components/Home/, y styles está en src/styles/
// la ruta sería "../../styles/PortfolioIntro.css"
// Si PortfolioIntro.jsx está en src/components/, y styles está en src/styles/
// la ruta sería "../styles/PortfolioIntro.css"
import "../../styles/PortfolioIntro.css"; // Ajusta esta ruta si es necesario

// Componente para cargar y mostrar el modelo FBX
function Model({ modelPath }) {
  const fbx = useFBX(modelPath);
  

  // --- Ajustes del Modelo FBX ---
  // Es muy común que necesites ajustar la escala, posición y rotación de tu modelo.
  // Descomenta y modifica las siguientes líneas según sea necesario:
  fbx.scale.set(0.05, 0.05, 0.05); // Modelo escalado para ser mucho más pequeño
  // fbx.position.set(0, -1, 0);      // Ejemplo: mover el modelo (ej. más abajo)
  // fbx.rotation.set(0, Math.PI / 2, 0); // Ejemplo: rotar el modelo 90 grados en el eje Y

  // Si tu modelo FBX tiene animaciones, puedes acceder a ellas a través de fbx.animations
  // y usar useAnimations de @react-three/drei para reproducirlas.

  // El modelo FBX puede tener sus propios materiales. Si no se ven bien o quieres cambiarlos:
  // fbx.traverse((child) => {
  //   if (child.isMesh) {
  //     // Ejemplo: aplicar un material básico si las texturas no cargan
  //     // child.material = new MeshStandardMaterial({ color: 'orange' });
  //     // Si el nombre de tu FBX ("_texture") implica que tiene texturas,
  //     // asegúrate de que los archivos de textura estén en la misma carpeta
  //     // que el FBX en `public/models/` o que las rutas en el FBX sean correctas.
  //   }
  // });

  return <primitive object={fbx} dispose={null} />;
}

// Tu esfera rotatoria original (puedes decidir si la mantienes o la quitas)
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
  // --- Ruta a tu modelo FBX ---
  // 1. ASEGÚRATE de que tu archivo .fbx esté en la carpeta `public` de tu proyecto.
  //    Por ejemplo: `my-portfolio/public/models/Dapper_Adventurer_0525193529_texture.fbx`
  // 2. La ruta aquí DEBE empezar con '/' y ser relativa a la carpeta `public`.
  const fbxModelPath = "/models/Young_Professional_0530221802_texture.fbx"; // Modelo actualizado

  return (
    <div className="portfolio-container">
      {/* Ajuste de la cámara: elevamos la posición Y y mantenemos la distancia Z. */}
      {/* La posición Z de la cámara se ha cambiado a 324, ajústala si el modelo se ve muy lejos o cerca después de escalar. */}
      <Canvas className="canvas" camera={{ position: [0, 1, 20], fov: 60 }} shadows> {/* Habilitar sombras en el Canvas */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 10, 7.5]} // Ajusta la posición para mejores sombras
          intensity={1.5}
          castShadow // La luz direccional proyecta sombras
          shadow-mapSize-width={1024} // Calidad de la sombra
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />


        <Stars radius={100} depth={50} count={5000} factor={4} />

        {/* <RotatingSphere /> */} {/* Puedes comentar o eliminar la esfera original */}

        <Suspense fallback={<Html center><span style={{color: 'white'}}>Cargando modelo...</span></Html>}>
          <Model modelPath={fbxModelPath} />
        </Suspense>
        {/* Ajuste de OrbitControls: añadimos un 'target' para que apunte más arriba del modelo. */}
        {/* El valor '1' en el target [0, 1, 0] es una estimación. Ajústalo a la altura deseada de tu modelo. */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} target={[0, 1, 0]} />
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
