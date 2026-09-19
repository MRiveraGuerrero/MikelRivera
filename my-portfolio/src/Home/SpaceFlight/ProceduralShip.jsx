import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Interceptor Alfa — Sleek needle scout with delta wings and dual cannons
function InterceptorModel() {
  return (
    <group>
      {/* Main Fuselage Needle */}
      <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.9, 4.8, 6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Cockpit Canopy */}
      <mesh position={[0, 0.45, -0.2]} scale={[0.45, 0.35, 1.3]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#0284c7" emissive="#00f0ff" emissiveIntensity={0.8} roughness={0.1} />
      </mesh>

      {/* Delta Main Wings */}
      <mesh position={[0, -0.05, 0.4]} scale={[4.2, 0.08, 1.8]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Wingtip Cannons & Glow Fin */}
      {[-2.05, 2.05].map((x, i) => (
        <group key={i} position={[x, 0, 0.2]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.12, 2.2, 8]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.2, 0.2]}>
            <boxGeometry args={[0.04, 0.45, 0.9]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      ))}

      {/* Vertical Tail Stabilizer */}
      <mesh position={[0, 0.65, 1.1]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.08, 0.9, 1.1]} />
        <meshStandardMaterial color="#0284c7" metalness={0.7} />
      </mesh>

      {/* Dual Rear Engine Thrusters */}
      {[-0.42, 0.42].map((x, i) => (
        <mesh key={i} position={[x, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.32, 0.8, 12]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// 2. Valkyrie Gunship — Heavy twin-fuselage armored catamaran with quad cannons
function ValkyrieModel() {
  return (
    <group>
      {/* Central Armored Cross-Deck */}
      <mesh position={[0, 0, 0.2]} scale={[2.8, 0.45, 1.9]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Central Reinforced Cockpit Visor */}
      <mesh position={[0, 0.35, -0.2]} scale={[0.8, 0.4, 1.1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#b91c1c" emissive="#ef4444" emissiveIntensity={0.65} />
      </mesh>

      {/* Heavy Twin Fuselage Pods */}
      {[-1.55, 1.55].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Main Pod Body */}
          <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.7, 4.4, 5]} />
            <meshStandardMaterial color="#7f1d1d" metalness={0.8} roughness={0.35} />
          </mesh>

          {/* Heavy Forward Plasma Barrel */}
          <mesh position={[0, -0.15, -2.4]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.2, 1.8, 8]} />
            <meshStandardMaterial color="#18181b" metalness={0.95} />
          </mesh>

          {/* Outer Angled Armor Winglet */}
          <mesh position={[x > 0 ? 0.6 : -0.6, 0.1, 0.4]} rotation={[0, 0, x > 0 ? -0.3 : 0.3]}>
            <boxGeometry args={[1.2, 0.1, 1.6]} />
            <meshStandardMaterial color="#991b1b" metalness={0.8} />
          </mesh>

          {/* Heavy Rear Exhaust Nozzle */}
          <mesh position={[0, 0, 1.9]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.46, 0.9, 12]} />
            <meshStandardMaterial color="#27272a" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Center Heavy Booster */}
      <mesh position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.4, 0.8, 12]} />
        <meshStandardMaterial color="#ea580c" emissive="#c2410c" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// 3. Phantom Dart — Supersonic stealth interceptor with forward-swept wings
function PhantomModel() {
  return (
    <group>
      {/* Razor Sharp Stealth Fuselage */}
      <mesh position={[0, 0, -0.6]} scale={[0.85, 0.35, 4.6]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#09090b" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Stealth Violet Cockpit Slit */}
      <mesh position={[0, 0.28, -0.8]} scale={[0.28, 0.18, 1.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#7e22ce" emissive="#c084fc" emissiveIntensity={0.95} />
      </mesh>

      {/* Forward-Swept Wings (Agile Stealth Aesthetic) */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 0.4, 0, 0.2]} rotation={[0, side * 0.45, side * -0.08]}>
          <mesh position={[side * 1.6, 0, -0.4]} scale={[2.8, 0.06, 1.3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Wingtip Razor Fins */}
          <mesh position={[side * 2.9, 0.3, -0.6]} rotation={[0, 0, side * 0.5]}>
            <boxGeometry args={[0.06, 0.7, 1.1]} />
            <meshStandardMaterial color="#581c87" emissive="#a855f7" emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Dual Twin Tail Rudders */}
      {[-0.45, 0.45].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 1.2]} rotation={[0, 0, x > 0 ? 0.35 : -0.35]}>
          <boxGeometry args={[0.06, 0.8, 1.0]} />
          <meshStandardMaterial color="#3b0764" metalness={0.8} />
        </mesh>
      ))}

      {/* High-Tech Antimatter Ring Thruster */}
      <mesh position={[0, 0, 1.8]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.12, 8, 24]} />
        <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

// 4. Nebula Sovereign — Majestic golden flagship with quantum core & tiered wings
function SovereignModel() {
  const coreRef = useRef();

  useFrame((_, dt) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += dt * 1.8;
      coreRef.current.rotation.x += dt * 0.9;
    }
  });

  return (
    <group>
      {/* Main Golden Hull */}
      <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.7, 1.2, 4.4, 6]} />
        <meshStandardMaterial color="#b45309" emissive="#78350f" emissiveIntensity={0.3} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Golden Nose Prow */}
      <mesh position={[0, 0, -2.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.72, 1.4, 6]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.5} metalness={0.98} roughness={0.1} />
      </mesh>

      {/* Exposed Quantum Gravity Core (Vortex generator for bolts) */}
      <group position={[0, 0.4, 0]}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#fde047" emissive="#f59e0b" emissiveIntensity={1.8} wireframe />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.04, 6, 24]} />
          <meshBasicMaterial color="#fde047" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Tiered Flagship Wings */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 0.8, -0.05, 0.3]}>
          {/* Main Swept Wing */}
          <mesh position={[side * 1.5, 0, 0]} rotation={[0, side * -0.2, 0]}>
            <boxGeometry args={[2.8, 0.12, 1.8]} />
            <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.2} />
          </mesh>
          {/* Secondary Golden Foil */}
          <mesh position={[side * 2.2, 0.25, 0.6]} rotation={[0, side * -0.3, 0]}>
            <boxGeometry args={[1.8, 0.08, 1.2]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Wingtip Solar Fin */}
          <mesh position={[side * 3.1, 0.5, 0.4]} rotation={[0, 0, side * 0.3]}>
            <boxGeometry args={[0.08, 1.2, 1.4]} />
            <meshStandardMaterial color="#fde047" emissive="#b45309" emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}

      {/* Quad Imperial Thrusters */}
      {[-0.6, 0.6].map((x, xi) =>
        [-0.2, 0.2].map((y, yi) => (
          <mesh key={`${xi}-${yi}`} position={[x, y, 2.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.7, 12]} />
            <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.6} metalness={0.95} />
          </mesh>
        ))
      )}
    </group>
  );
}

export default function ProceduralShip({ shipId = 'interceptor', scale = 1 }) {
  return (
    <group scale={scale}>
      {shipId === 'valkyrie' && <ValkyrieModel />}
      {shipId === 'phantom' && <PhantomModel />}
      {shipId === 'sovereign' && <SovereignModel />}
      {shipId === 'interceptor' && <InterceptorModel />}
      {!['valkyrie', 'phantom', 'sovereign', 'interceptor'].includes(shipId) && <InterceptorModel />}
    </group>
  );
}
