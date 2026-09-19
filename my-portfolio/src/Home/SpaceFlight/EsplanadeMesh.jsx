import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EsplanadeMesh({ radius = 62, paused = false }) {
  const group = useRef();
  const ringGroup = useRef();
  const lightsRef = useRef([]);

  useFrame((_, dt) => {
    if (paused) return;
    if (group.current) {
      group.current.rotation.y += dt * 0.04;
    }
    if (ringGroup.current) {
      ringGroup.current.rotation.y -= dt * 0.08;
    }
  });

  const runwayLights = useMemo(() => {
    const lights = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * (radius * 0.88);
      const z = Math.sin(angle) * (radius * 0.88);
      lights.push([x, 1.2, z]);
    }
    return lights;
  }, [radius]);

  const spokePylons = useMemo(() => {
    const pylons = [];
    const count = 6;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pylons.push({
        angle,
        pos: [Math.cos(angle) * (radius * 0.95), 4, Math.sin(angle) * (radius * 0.95)],
      });
    }
    return pylons;
  }, [radius]);

  return (
    <group ref={group}>
      {/* Central Upper Esplanade Platform (Flat wide landing plateau) */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[radius * 0.92, radius * 0.98, radius * 0.12, 48]} />
        <meshStandardMaterial
          color="#1e2433"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Main Landing Deck Inset */}
      <mesh position={[0, radius * 0.062, 0]} receiveShadow>
        <cylinderGeometry args={[radius * 0.82, radius * 0.82, 0.6, 36]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Outer Rotating Energy Ring / Defense Grid */}
      <group ref={ringGroup}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 1.08, radius * 0.035, 8, 48]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.65}
            wireframe
          />
        </mesh>
      </group>

      {/* Concentric Glowing Landing Strips */}
      <mesh position={[0, radius * 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.76, radius * 0.8, 36]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, radius * 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 0.45, radius * 0.48, 36]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Central Docking Octagon */}
      <mesh position={[0, radius * 0.066, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.22, 8]} />
        <meshStandardMaterial
          color="#78350f"
          emissive="#d97706"
          emissiveIntensity={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Runway Perimeter Warning Beacons */}
      {runwayLights.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <boxGeometry args={[1.6, 1.2, 1.6]} />
          <meshStandardMaterial
            color={idx % 2 === 0 ? '#fbbf24' : '#38bdf8'}
            emissive={idx % 2 === 0 ? '#f59e0b' : '#0284c7'}
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {/* Pylon Towers / Navigational Spires around perimeter */}
      {spokePylons.map((pylon, idx) => (
        <group key={idx} position={pylon.pos} rotation={[0, -pylon.angle, 0]}>
          <mesh position={[0, radius * 0.12, 0]}>
            <boxGeometry args={[4, radius * 0.25, 4]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, radius * 0.26, 0]}>
            <sphereGeometry args={[1.8, 12, 8]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}

      {/* Substructure Support Columns & Industrial Keel */}
      <mesh position={[0, -radius * 0.22, 0]}>
        <cylinderGeometry args={[radius * 0.65, radius * 0.25, radius * 0.35, 16]} />
        <meshStandardMaterial color="#090d16" metalness={0.7} roughness={0.6} />
      </mesh>
      <mesh position={[0, -radius * 0.45, 0]}>
        <coneGeometry args={[radius * 0.24, radius * 0.25, 8]} />
        <meshStandardMaterial color="#1e142e" emissive="#7c2d12" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
