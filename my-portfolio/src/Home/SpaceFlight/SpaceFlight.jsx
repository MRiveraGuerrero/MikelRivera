import { Component, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './SpaceFlight.module.css';
import StableStars from './StableStars';
import useMouseFlight from './useMouseFlight';
import { isSoundEnabled, toggleSound, playBlip, playSelect, playEngage } from './soundFx';

import { destinations as planets } from '../../Journey/content';
import GalaxyMap from '../../Journey/GalaxyMap';
import PlanetSurface from '../PlanetSurface/PlanetSurface';

const planetPositions = planets.map(p => new THREE.Vector3(...p.position));
const SHIP_MODEL = '/models/optimized/spaceship.glb';
const NO_INPUT = {};
const forward = new THREE.Vector3(0, 0, -1);
const axisY = new THREE.Vector3(0, 1, 0);
const axisX = new THREE.Vector3(1, 0, 0);
const LASER_COUNT = 24;
const MISSILE_COUNT = 8;
const TARGET_CONFIG = [
  [0, 0, -85], [32, 14, -115], [-36, -15, -120], [55, 25, -170], [-65, 28, -190],
  [10, -30, -215], [110, 5, -280], [-120, 10, -270], [40, 70, -360], [-50, -60, -400],
];

class FlightBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? (
      <div className={styles.fallback}>
        3D no disponible / 3D unavailable. <Link to="/">Volver al inicio / Back home</Link>
      </div>
    ) : this.props.children;
  }
}

function PlanetModel({ url, radius, luminous = false }) {
  const { scene } = useGLTF(url, false, true);
  const model = useMemo(() => {
    const object = scene.clone(true);
    object.traverse(child => {
      if (!child.isMesh) return;
      child.raycast = () => null;
      const prepare = original => {
        const material = original.clone();
        material.emissive.set('#ffffff');
        material.emissiveMap = material.map;
        material.emissiveIntensity = luminous ? 0.9 : 0.22;
        material.roughness = 0.55;
        material.metalness = 0.2;
        return material;
      };
      child.material = Array.isArray(child.material) ? child.material.map(prepare) : prepare(child.material);
    });
    const bounds = new THREE.Box3().setFromObject(object);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const scale = (radius * 2) / Math.max(size.x, size.y, size.z, 0.001);
    return { object, scale, offset: center.multiplyScalar(-1) };
  }, [scene, radius, luminous]);

  useEffect(() => () => model.object.traverse(child => {
    if (child.isMesh) (Array.isArray(child.material) ? child.material : [child.material]).forEach(m => m.dispose());
  }), [model]);

  return (
    <group scale={model.scale}>
      <group position={model.offset}>
        <primitive object={model.object} dispose={null} />
      </group>
    </group>
  );
}

class PlanetModelBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

// Stylized Career Space Station
function CareerStation({ color }) {
  const ringRef = useRef();
  useFrame((_, dt) => {
    if (ringRef.current) ringRef.current.rotation.z += dt * 0.25;
  });

  return (
    <group>
      {/* Central Spire Core */}
      <mesh>
        <cylinderGeometry args={[4, 5, 34, 16]} />
        <meshStandardMaterial color="#94a9bf" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Observation Command Dome */}
      <mesh position={[0, 18, 0]}>
        <sphereGeometry args={[4.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.4} roughness={0.2} emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>
      {/* Rotating Habitat Torus */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[20, 2.8, 12, 48]} />
          <meshStandardMaterial color="#b3c8db" metalness={0.65} roughness={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[20, 0.28, 6, 48]} />
          <meshBasicMaterial color="#00f0ff" toneMapped={false} />
        </mesh>
        {[0, 1, 2, 3].map(k => (
          <mesh key={k} rotation={[0, (k * Math.PI) / 2, Math.PI / 2]}>
            <cylinderGeometry args={[0.8, 0.8, 20, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.7} />
          </mesh>
        ))}
      </group>
      {/* Photovoltaic Solar Wings */}
      {[-1, 1].map(side => (
        <group key={side} position={[side * 17, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.5, 0.5, 12, 6]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[side * 5, 0, 0]}>
            <boxGeometry args={[8, 13, 0.4]} />
            <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} emissive="#1d4ed8" emissiveIntensity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Stylized Planet Spheres with personality
function StylizedPlanet({ planet, sun }) {
  const rings = useRef();
  const moon = useRef();

  useFrame((_, dt) => {
    if (rings.current) rings.current.rotation.z += dt * 0.12;
    if (moon.current) moon.current.rotation.y += dt * 0.45;
  });

  if (sun) {
    return (
      <group>
        <mesh>
          <sphereGeometry args={[planet.radius, 48, 32]} />
          <meshStandardMaterial color="#ffc107" emissive="#ff7a00" emissiveIntensity={2.2} roughness={0.3} />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[planet.radius, 32, 24]} />
          <meshBasicMaterial color="#ff9800" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Base Planet Sphere */}
      <mesh>
        <sphereGeometry args={[planet.radius, 48, 32]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={0.52}
          metalness={0.28}
          emissive={planet.color}
          emissiveIntensity={0.22}
        />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh scale={1.04}>
        <sphereGeometry args={[planet.radius, 32, 24]} />
        <meshBasicMaterial
          color={planet.color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Project-specific features */}
      {planet.id === 'impostor' && (
        <group ref={rings} rotation={[1.1, 0.3, 0]}>
          <mesh>
            <torusGeometry args={[planet.radius * 1.5, 0.7, 8, 64]} />
            <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={0.6} />
          </mesh>
          <mesh>
            <torusGeometry args={[planet.radius * 1.8, 0.35, 8, 64]} />
            <meshStandardMaterial color="#e9d5ff" emissive="#c084fc" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )}

      {planet.id === 'auction' && (
        <group ref={moon}>
          <mesh position={[planet.radius * 1.85, planet.radius * 0.35, 0]}>
            <sphereGeometry args={[planet.radius * 0.22, 16, 12]} />
            <meshStandardMaterial color="#fde047" metalness={0.3} roughness={0.6} />
          </mesh>
        </group>
      )}

      {planet.id === 'nfc' && (
        <group rotation={[0.4, 0.8, 0]}>
          <mesh>
            <torusGeometry args={[planet.radius * 1.4, 0.3, 8, 48]} />
            <meshBasicMaterial color="#34d399" toneMapped={false} />
          </mesh>
          <mesh position={[planet.radius * 1.4, 0, 0]}>
            <boxGeometry args={[1.5, 1.5, 2.6]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
          </mesh>
        </group>
      )}

      {planet.id === 'sientame' && (
        <group rotation={[1.3, 0.2, 0]}>
          <mesh>
            <torusGeometry args={[planet.radius * 1.35, 0.45, 8, 64]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function AdaptiveResolution({ paused }) {
  const setDpr = useThree(state => state.setDpr);
  const sample = useRef({ elapsed: 0, frames: 0, warmup: 0, reduced: false });
  useFrame((_, dt) => {
    const s = sample.current;
    if (paused || s.reduced || dt > 0.2) return;
    s.warmup += dt;
    if (s.warmup < 5) return;
    s.elapsed += dt;
    s.frames++;
    if (s.elapsed > 3) {
      if (s.frames / s.elapsed < 42) { setDpr(0.8); s.reduced = true; }
      s.elapsed = 0; s.frames = 0;
    }
  });
  return null;
}

const World = memo(function World({
  input,
  mouse,
  weapons,
  paused,
  reset,
  onTelemetry,
  selected,
  flightState,
  autopilotTarget,
  onDisengageAutopilot,
  onIntroComplete,
}) {
  const introProgress = useRef(0);
  const ship = useRef();
  const flame = useRef();
  const laserMeshes = useRef([]);
  const missileMeshes = useRef([]);
  const targetMeshes = useRef([]);
  const explosionMeshes = useRef([]);
  const targets = useRef(TARGET_CONFIG.map(position => ({
    position: new THREE.Vector3(...position), active: true, explosion: 0, respawn: 0,
  })));
  const projectiles = useRef({
    lasers: Array.from({ length: LASER_COUNT }, () => ({ active: false, position: new THREE.Vector3(), velocity: new THREE.Vector3(), rotation: new THREE.Quaternion(), life: 0 })),
    missiles: Array.from({ length: MISSILE_COUNT }, () => ({ active: false, position: new THREE.Vector3(), velocity: new THREE.Vector3(), rotation: new THREE.Quaternion(), life: 0, target: -1 })),
    laserIndex: 0,
    missileIndex: 0,
    barrel: 1,
    primaryCooldown: 0,
  });
  const flight = flightState;
  const scratch = useRef({ direction: new THREE.Vector3(), camera: new THREE.Vector3(), turn: new THREE.Quaternion(), delta: new THREE.Vector3() });

  useEffect(() => {
    if (reset === 0) { flight.current.speed = 0; return; }
    flight.current.position.set(0, 0, 35);
    flight.current.rotation.identity();
    flight.current.targetRotation.identity();
    flight.current.speed = 0;
    projectiles.current.lasers.forEach(p => { p.active = false; });
    projectiles.current.missiles.forEach(p => { p.active = false; });
    projectiles.current.primaryCooldown = 0;
  }, [reset, flight]);

  useFrame(({ camera }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const f = flight.current;
    const v = scratch.current;
    const keys = paused ? NO_INPUT : input.current;

    if (paused) { mouse.current.x = 0; mouse.current.y = 0; }

    if (!paused) {
      // Autopilot handling
      const hasKeyInput = Object.keys(keys).length > 0;
      const hasMouseInput = Math.abs(mouse.current.x) > 3 || Math.abs(mouse.current.y) > 3;

      if (autopilotTarget !== null && autopilotTarget >= 0 && autopilotTarget < planetPositions.length) {
        const targetPos = planetPositions[autopilotTarget];
        const toTarget = v.delta.copy(targetPos).sub(f.position);
        const dist = toTarget.length() - planets[autopilotTarget].radius;

        if (dist <= 35 || hasKeyInput || hasMouseInput) {
          onDisengageAutopilot();
        } else {
          // Smooth autopilot steering and cruising
          const desiredDir = toTarget.normalize();
          const desiredRot = new THREE.Quaternion().setFromUnitVectors(forward, desiredDir);
          f.targetRotation.slerp(desiredRot, 1 - Math.exp(-4.5 * dt));
          f.rotation.slerp(desiredRot, 1 - Math.exp(-7 * dt));

          const cruiseSpeed = dist > 90 ? 95 : Math.max(22, dist * 0.7);
          f.speed = THREE.MathUtils.damp(f.speed, cruiseSpeed, 2, dt);
        }
      } else {
        // Manual Flight controls
        const yaw = Number(!!(keys.ArrowLeft || keys.KeyA)) - Number(!!(keys.ArrowRight || keys.KeyD));
        const pitch = Number(!!keys.ArrowUp) - Number(!!keys.ArrowDown);
        const mouseYaw = THREE.MathUtils.clamp(mouse.current.x * 0.0022, -0.3, 0.3);
        const mousePitch = THREE.MathUtils.clamp(mouse.current.y * 0.0022, -0.3, 0.3);

        f.targetRotation.multiply(v.turn.setFromAxisAngle(axisY, yaw * dt * 1.05 - mouseYaw));
        f.targetRotation.multiply(v.turn.setFromAxisAngle(axisX, pitch * dt * 0.85 - mousePitch));
        f.targetRotation.normalize();
        f.rotation.slerp(f.targetRotation, 1 - Math.exp(-13 * dt));

        const thrust = keys.KeyW;
        const braking = keys.KeyS || keys.Space;
        f.speed = THREE.MathUtils.damp(
          f.speed,
          braking ? 0 : thrust ? (keys.ShiftLeft || keys.ShiftRight ? 105 : 48) : 0,
          braking ? 4 : thrust ? 1.3 : 0.3,
          dt
        );
      }

      mouse.current.x = 0;
      mouse.current.y = 0;

      v.direction.copy(forward).applyQuaternion(f.rotation);
      f.position.addScaledVector(v.direction, f.speed * dt);

      // Boundary / planet collision damping
      for (let i = 0; i < planets.length; i++) {
        const p = planets[i];
        v.delta.copy(f.position).sub(planetPositions[i]);
        if (v.delta.length() < p.radius + 5) {
          if (v.delta.lengthSq() < 0.001) v.delta.set(0, 0, 1);
          f.position.set(...p.position).add(v.delta.setLength(p.radius + 5));
          f.speed = 0;
        }
      }
      if (f.position.length() > 1400) { f.position.setLength(1400); f.speed = 0; }
    }

    // Weapons / Shooting
    const shots = projectiles.current;
    const launch = (pool, indexKey, speed, life, side) => {
      const projectile = pool[shots[indexKey]];
      shots[indexKey] = (shots[indexKey] + 1) % pool.length;
      projectile.active = true;
      projectile.life = life;
      projectile.position.set(side, -0.25, -3).applyQuaternion(f.rotation).add(f.position);
      projectile.velocity.copy(forward).applyQuaternion(f.rotation).multiplyScalar(speed + f.speed);
      projectile.rotation.copy(f.rotation);
      return projectile;
    };

    if (!paused) {
      shots.primaryCooldown -= dt;
      if (weapons.current.primary > 0 || (weapons.current.primaryHeld && shots.primaryCooldown <= 0)) {
        launch(shots.lasers, 'laserIndex', 250, 2.2, shots.barrel * 1.45);
        shots.barrel *= -1;
        shots.primaryCooldown = 0.11;
        weapons.current.primary = Math.max(0, weapons.current.primary - 1);
        playBlip(920, 0.04, 0.04);
      }
      while (weapons.current.missile > 0) {
        const missile = launch(shots.missiles, 'missileIndex', 110, 6, shots.barrel * 2.1);
        const missileDirection = v.direction.copy(missile.velocity).normalize();
        let bestScore = 0.15;
        missile.target = -1;
        targets.current.forEach((target, i) => {
          if (!target.active) return;
          const offset = v.delta.copy(target.position).sub(missile.position);
          const distance = offset.length();
          const score = missileDirection.dot(offset.normalize()) - distance * 0.0001;
          if (score > bestScore) { bestScore = score; missile.target = i; }
        });
        shots.barrel *= -1;
        weapons.current.missile--;
        playBlip(440, 0.08, 0.05);
      }
    } else {
      weapons.current.primaryHeld = false;
      weapons.current.primary = 0;
      weapons.current.missile = 0;
    }

    const hitTarget = target => {
      target.active = false;
      target.explosion = 0.7;
      target.respawn = 4;
      playSelect();
    };

    const updateProjectiles = (pool, meshes, homing = false) => pool.forEach((projectile, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      projectile.life -= dt;
      projectile.active = projectile.active && projectile.life > 0;
      if (projectile.active) {
        if (homing && projectile.target >= 0 && targets.current[projectile.target].active) {
          const desiredSpeed = projectile.velocity.length();
          v.direction.copy(targets.current[projectile.target].position).sub(projectile.position).normalize().multiplyScalar(desiredSpeed);
          projectile.velocity.lerp(v.direction, 1 - Math.exp(-1.35 * dt));
          projectile.rotation.setFromUnitVectors(forward, v.direction.copy(projectile.velocity).normalize());
        }
        projectile.position.addScaledVector(projectile.velocity, dt);
        for (let p = 0; p < planets.length; p++) {
          if (projectile.position.distanceToSquared(planetPositions[p]) < planets[p].radius ** 2) projectile.active = false;
        }
        for (const target of targets.current) {
          if (target.active && projectile.position.distanceToSquared(target.position) < 16) {
            projectile.active = false;
            hitTarget(target);
            break;
          }
        }
      }
      mesh.visible = projectile.active;
      if (projectile.active) {
        mesh.position.copy(projectile.position);
        mesh.quaternion.copy(projectile.rotation);
      }
    });

    updateProjectiles(shots.lasers, laserMeshes);
    updateProjectiles(shots.missiles, missileMeshes, true);

    // Target crystals animation
    targets.current.forEach((target, i) => {
      const targetMesh = targetMeshes.current[i];
      const explosionMesh = explosionMeshes.current[i];
      if (!targetMesh || !explosionMesh) return;
      if (!target.active) {
        target.respawn -= dt;
        if (target.respawn <= 0) target.active = true;
      } else {
        targetMesh.rotation.y += dt * 0.8;
        targetMesh.rotation.x += dt * 0.4;
      }
      target.explosion = Math.max(0, target.explosion - dt);
      targetMesh.visible = target.active;
      explosionMesh.visible = target.explosion > 0;
      if (target.explosion > 0) {
        const progress = 1 - target.explosion / 0.7;
        explosionMesh.scale.setScalar(1 + progress * 7);
        explosionMesh.children.forEach(child => { child.material.opacity = 1 - progress; });
      }
    });

    // Cinematic intro un-zoom: spaceship starts occupying almost the entire screen, then smoothly pulls back
    let introRatio = 1;
    if (introProgress.current < 1) {
      introProgress.current = Math.min(1, introProgress.current + dt / 1.4);
      // Smooth cubic-out easing
      introRatio = 1 - Math.pow(1 - introProgress.current, 3);
      if (f.speed < 42) {
        f.speed = 42;
      }
      if (introProgress.current >= 1 && onIntroComplete) {
        onIntroComplete();
      }
    }

    ship.current.position.copy(f.position);
    ship.current.quaternion.copy(f.rotation);

    if (introProgress.current < 1) {
      flame.current.scale.set(1.3, 1.3, THREE.MathUtils.lerp(2.8, 1.0, introRatio) * (0.5 + f.speed / 20));
    } else {
      flame.current.scale.set(1, 1, 0.5 + f.speed / 20);
    }

    const camY = THREE.MathUtils.lerp(0.35, 5.0, introRatio);
    const camZ = THREE.MathUtils.lerp(3.6, 17.0, introRatio);
    v.camera.set(0, camY, camZ).applyQuaternion(f.rotation).add(f.position);

    if (introProgress.current < 1) {
      camera.position.lerp(v.camera, 1 - Math.exp(-12 * dt));
    } else {
      camera.position.lerp(v.camera, 1 - Math.exp(-5 * dt));
    }
    camera.quaternion.slerp(f.rotation, 1 - Math.exp(-9 * dt));

    f.tick += dt;
    if (f.tick > 0.18) {
      f.tick = 0;
      const speed = Math.round(f.speed);
      const distances = planets.map((p, i) => Math.max(0, Math.round(f.position.distanceTo(planetPositions[i]) - p.radius)));
      onTelemetry(previous => previous.speed === speed && previous.distances.every((d, i) => d === distances[i]) ? previous : { speed, distances });
    }
  });

  return (
    <>
      <color attach="background" args={['#030612']} />
      <AdaptiveResolution paused={paused} />
      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#bfdfff', '#30304a', 1.4]} />
      <directionalLight position={[50, 90, 60]} intensity={2.6} color="#dbeafe" />
      <pointLight position={[0, 80, -490]} intensity={1600} distance={1200} color="#ffb854" />
      <StableStars />

      {/* Floating Collectible Space Crystals */}
      {targets.current.map((target, i) => (
        <group key={`target-${i}`} position={target.position}>
          <group ref={mesh => { targetMeshes.current[i] = mesh; }}>
            <mesh>
              <octahedronGeometry args={[3.2, 0]} />
              <meshStandardMaterial
                color="#00f0ff"
                emissive="#0284c7"
                emissiveIntensity={0.8}
                roughness={0.25}
                metalness={0.8}
              />
            </mesh>
            <mesh scale={1.22}>
              <octahedronGeometry args={[3.2, 0]} />
              <meshBasicMaterial color="#7ce9ff" wireframe transparent opacity={0.6} toneMapped={false} />
            </mesh>
          </group>
          <group ref={mesh => { explosionMeshes.current[i] = mesh; }} visible={false}>
            <mesh>
              <sphereGeometry args={[1.8, 12, 8]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={1} toneMapped={false} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh scale={1.5}>
              <sphereGeometry args={[1.8, 8, 6]} />
              <meshBasicMaterial color="#ffc72c" wireframe transparent opacity={1} toneMapped={false} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Lasers */}
      {Array.from({ length: LASER_COUNT }, (_, i) => (
        <mesh key={`laser-${i}`} ref={mesh => { laserMeshes.current[i] = mesh; }} visible={false}>
          <boxGeometry args={[0.18, 0.18, 3.4]} />
          <meshBasicMaterial color="#38d9f5" toneMapped={false} transparent opacity={0.95} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}

      {/* Missiles */}
      {Array.from({ length: MISSILE_COUNT }, (_, i) => (
        <group key={`missile-${i}`} ref={mesh => { missileMeshes.current[i] = mesh; }} visible={false}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.28, 1.5, 8]} />
            <meshStandardMaterial color="#dbeafe" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.98]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.26, 1.4, 10]} />
            <meshBasicMaterial color="#ff7a29" toneMapped={false} transparent opacity={0.9} />
          </mesh>
        </group>
      ))}

      {/* Celestial Bodies */}
      {planets.map((p, i) => (
        <group key={p.name} position={p.position}>
          {p.type === 'station' ? (
            <CareerStation color={p.color} />
          ) : p.model ? (
            <PlanetModelBoundary fallback={<StylizedPlanet planet={p} sun={p.type === 'star'} />}>
              <Suspense fallback={<StylizedPlanet planet={p} sun={p.type === 'star'} />}>
                <PlanetModel url={p.model} radius={p.radius} luminous={p.type === 'star'} />
              </Suspense>
            </PlanetModelBoundary>
          ) : (
            <StylizedPlanet planet={p} sun={p.type === 'star'} />
          )}

          {/* Planet Label */}
          <Html position={[0, p.radius + 10, 0]} center style={{ pointerEvents: 'none' }}>
            <span className={`${styles.planetLabel} ${selected === i ? styles.planetLabelSelected : ''}`}>
              {selected === i ? '◈ ' : ''}{p.name}
            </span>
          </Html>
        </group>
      ))}

      {/* Player Spaceship */}
      <group ref={ship}>
        <PlanetModelBoundary fallback={<mesh><coneGeometry args={[1.5, 4, 8]} /><meshStandardMaterial color="#38bdf8" /></mesh>}>
          <Suspense fallback={<mesh><coneGeometry args={[1.5, 4, 8]} /><meshStandardMaterial color="#38bdf8" /></mesh>}>
            <group rotation={[0, -Math.PI / 2, 0]}>
              <PlanetModel url={SHIP_MODEL} radius={3.5} />
            </group>
          </Suspense>
        </PlanetModelBoundary>
        <mesh ref={flame} position={[0, 0, 3.1]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.55, 2.5, 12]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.88} />
        </mesh>
      </group>
    </>
  );
});

function Flight({ flightState, onLand }) {
  const [introActive, setIntroActive] = useState(true);
  const handleIntroComplete = useCallback(() => {
    setIntroActive(false);
  }, []);

  const [cameraSettings] = useState(() => ({
    position: new THREE.Vector3(0, 0.35, 3.6).applyQuaternion(flightState.current.rotation).add(flightState.current.position).toArray(),
    quaternion: flightState.current.rotation.toArray(),
    fov: 65,
    far: 2500,
  }));
  const { language, setLanguage } = useLanguage();
  const es = language === 'es';
  const input = useRef({});
  const [paused, setPaused] = useState(false);
  const { surface, mouse, weapons, locked, failed, capture, release } = useMouseFlight(setPaused);

  useEffect(() => { if (paused) release(); }, [paused, release]);

  const [mapOpen, setMapOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [autopilotTarget, setAutopilotTarget] = useState(null);
  const [reset, setReset] = useState(0);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    distances: planets.map(p => Math.round(flightState.current.position.distanceTo(new THREE.Vector3(...p.position)) - p.radius)),
  });

  const nearby = telemetry.distances.findIndex(d => d <= 35);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  const handleDisengageAutopilot = useCallback(() => {
    setAutopilotTarget(null);
  }, []);

  const handleEngageAutopilot = useCallback((index) => {
    setSelected(index);
    setAutopilotTarget(index);
  }, []);

  useEffect(() => {
    const codes = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'ShiftLeft', 'ShiftRight'];
    const down = e => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (codes.includes(e.code) && !(e.code === 'Space' && /BUTTON|A/.test(e.target.tagName))) {
        e.preventDefault();
        input.current[e.code] = true;
        if (autopilotTarget !== null) setAutopilotTarget(null);
      }
      if (e.code === 'Escape' && !e.repeat && !document.pointerLockElement) setPaused(true);
      if (e.code === 'KeyM' && !e.repeat) {
        e.preventDefault();
        input.current = {};
        setMapOpen(open => !open);
        setPaused(true);
      }
      if (e.code === 'KeyE' && !e.repeat && nearby >= 0 && !paused && !mapOpen) {
        e.preventDefault();
        onLand(nearby);
      }
    };
    const up = e => { delete input.current[e.code]; };
    const clear = () => { input.current = {}; setPaused(true); };
    const clearWhenHidden = () => { if (document.hidden) clear(); };

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clearWhenHidden);

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', clear);
      document.removeEventListener('visibilitychange', clearWhenHidden);
    };
  }, [nearby, paused, mapOpen, onLand, autopilotTarget]);

  const control = (code, label) => (
    <button
      key={code}
      aria-label={label}
      onPointerDown={e => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        input.current[code] = true;
        if (autopilotTarget !== null) setAutopilotTarget(null);
      }}
      onPointerUp={() => delete input.current[code]}
      onPointerCancel={() => delete input.current[code]}
      onLostPointerCapture={() => delete input.current[code]}
    >
      {label}
    </button>
  );

  return (
    <main
      ref={surface}
      className={styles.page}
      onClick={e => {
        if (e.target.tagName === 'CANVAS' && window.matchMedia('(pointer: fine)').matches && !locked && !paused && !mapOpen) {
          capture();
        }
      }}
    >
      <FlightBoundary>
        <Canvas
          camera={cameraSettings}
          dpr={1}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          fallback={<div className={styles.fallback}>WebGL no disponible / unavailable. <Link to="/">Inicio / Home</Link></div>}
        >
          <World
            input={input}
            mouse={mouse}
            weapons={weapons}
            paused={paused || mapOpen}
            reset={reset}
            onTelemetry={setTelemetry}
            selected={selected}
            flightState={flightState}
            autopilotTarget={autopilotTarget}
            onDisengageAutopilot={handleDisengageAutopilot}
            onIntroComplete={handleIntroComplete}
          />
        </Canvas>
      </FlightBoundary>

      {/* Modern Game HUD (smoothly fades in as intro un-zoom finishes) */}
      <div className={`${styles.hudLayer} ${introActive ? styles.hudHidden : styles.hudVisible}`}>
        <header className={styles.header}>
        <Link to="/" className={styles.homeBtn}>
          ← {es ? 'Inicio' : 'Home'}
        </Link>
        <div className={styles.headerTitle}>
          <small>MIKEL RIVERA // EXPLORER</small>
          <h1>{es ? 'Vuelo Libre' : 'Free Flight'}</h1>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.langSelector} role="group" aria-label="Idioma">
            <button
              type="button"
              className={`${styles.langBtn} ${es ? styles.langBtnActive : ''}`}
              onClick={() => setLanguage('es')}
            >
              ES
            </button>
            <span className={styles.langDivider}>/</span>
            <button
              type="button"
              className={`${styles.langBtn} ${!es ? styles.langBtnActive : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className={styles.soundBtn}
            onClick={handleToggleSound}
            title={soundActive ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundActive ? 'AUDIO: ON' : 'AUDIO: OFF'}
          </button>
          <button
            type="button"
            className={styles.mapBtn}
            onClick={() => { setMapOpen(true); setPaused(true); }}
          >
            <span>M</span> {es ? 'Mapa' : 'Map'}
          </button>
          <button
            type="button"
            className={styles.pauseBtn}
            onClick={() => setPaused(p => !p)}
          >
            {paused ? (es ? 'Continuar' : 'Resume') : (es ? 'Pausa' : 'Pause')}
          </button>
        </div>
      </header>

      {/* Autopilot HUD Banner */}
      {autopilotTarget !== null && (
        <div className={styles.autopilotBanner}>
          <span className={styles.autopilotDot} />
          <strong>AUTOPILOT ENGAGED → {planets[autopilotTarget]?.name}</strong>
          <span>({telemetry.distances[autopilotTarget]} u) · Press any key to take control</span>
        </div>
      )}

      {/* Destination Sidebar */}
      <aside className={styles.destinations}>
        <small>{es ? 'SISTEMA PLANETARIO' : 'PLANETARY SYSTEM'}</small>
        {planets.map((p, i) => (
          <div
            key={p.name}
            className={selected === i ? styles.destRowSelected : styles.destRow}
            onClick={() => setSelected(i)}
          >
            <span>
              <i style={{ background: p.color }} />
              {selected === i ? '◈ ' : ''}{p.name}
            </span>
            <span>{telemetry.distances[i]} u</span>
          </div>
        ))}
        <p>{es ? 'Acércate a 35 u de un planeta y pulsa E para aterrizar.' : 'Get within 35 u of a planet and press E to land.'}</p>
      </aside>

      {/* Crosshair */}
      <div className={styles.reticle}>
        <div className={styles.reticleInner} />
      </div>

      {/* Mouse Aim Hint */}
      {!paused && (
        <div className={styles.mouseHint}>
          {locked ? (
            <span>{es ? 'Ratón: orientar · Clic: disparo · Clic derecho: misil · Esc: cursor' : 'Mouse: steer · Click: fire · Right click: missile · Esc: cursor'}</span>
          ) : (
            <button onClick={capture}>
              {es ? 'Clic para pilotar con el ratón' : 'Click to fly with the mouse'}
            </button>
          )}
          {failed && (
            <p role="status">
              {es ? 'Este navegador no permite capturar el cursor. Mantén pulsado y arrastra sobre el espacio para orientar la nave.' : 'This browser cannot capture the cursor. Hold and drag over space to steer the ship.'}
            </p>
          )}
        </div>
      )}

      {/* Pause Menu */}
      {paused && !mapOpen && (
        <div className={styles.paused}>
          <h2>{es ? 'Vuelo en Pausa' : 'Flight Paused'}</h2>
          <button onClick={() => setPaused(false)}>{es ? 'Continuar vuelo' : 'Resume flight'}</button>
          <p><Link to="/portfolio">View Portfolio ↗</Link></p>
        </div>
      )}

      {/* In-Range Landing Prompt */}
      {nearby >= 0 && !paused && (
        <button className={styles.arrival} onClick={() => onLand(nearby)}>
          <span className={styles.arrivalBadge}>[E] LAND &amp; EXPLORE</span>
          <span className={styles.arrivalName}>{planets[nearby].name}</span>
          <small>{planets[nearby].category || 'Destino en rango'}</small>
        </button>
      )}

      {/* Telemetry Footer */}
      <footer className={styles.footer}>
        <div className={styles.speedGauge}>
          <div className={styles.speedValue}>
            <strong>{telemetry.speed.toString().padStart(3, '0')}</strong>
            <small>u/s</small>
          </div>
          <p>
            W {es ? 'acelerar' : 'thrust'} · S / {es ? 'Espacio frenar' : 'Space brake'} · Shift turbo · E land · M map<br />
            {es ? 'Ratón: orientar · Clic: disparo · Clic derecho: misil' : 'Mouse: steer · Click: fire · Right click: missile'}
          </p>
        </div>
        <button
          className={styles.resetBtn}
          onClick={() => {
            input.current = {};
            mouse.current.x = 0;
            mouse.current.y = 0;
            setAutopilotTarget(null);
            setReset(r => r + 1);
          }}
        >
          {es ? 'Reiniciar posición' : 'Reset position'}
        </button>
      </footer>

      {/* Mobile Touch Navigation */}
      <nav className={styles.touch} aria-label={es ? 'Controles de vuelo' : 'Flight controls'}>
        <div>{control('ArrowLeft', '←')}{control('ArrowUp', '↑')}{control('ArrowDown', '↓')}{control('ArrowRight', '→')}</div>
        <div>{control('KeyS', es ? 'Freno' : 'Brake')}{control('KeyW', es ? 'Acelerar' : 'Thrust')}{control('ShiftLeft', 'Turbo')}</div>
      </nav>
      </div>

      {/* XMB Galaxy Navigation Dialog */}
      {mapOpen && (
        <GalaxyMap
          distances={telemetry.distances}
          selected={selected}
          autopilotActive={autopilotTarget !== null}
          onClose={() => { setMapOpen(false); setPaused(false); }}
          onSelect={index => { setSelected(index); setMapOpen(false); setPaused(false); }}
          onEngageAutopilot={handleEngageAutopilot}
        />
      )}
    </main>
  );
}

export default function SpaceFlight({ initialPosition = [0, 0, 35] }) {
  const flightState = useRef({
    position: new THREE.Vector3(...initialPosition),
    rotation: new THREE.Quaternion(),
    targetRotation: new THREE.Quaternion(),
    speed: 0,
    tick: 0,
  });
  const [landed, setLanded] = useState(null);
  const [journal, setJournal] = useState({});

  const land = useCallback(index => {
    const planet = planets[index];
    if (!planet || flightState.current.position.distanceTo(planetPositions[index]) - planet.radius > 35) return;
    flightState.current.speed = 0;
    playSelect();
    setLanded(index);
  }, []);

  const launch = useCallback(() => {
    flightState.current.speed = 0;
    playEngage();
    setLanded(null);
  }, []);

  const discover = useCallback((name, id) => setJournal(previous => {
    const entries = previous[name] || [];
    return entries.includes(id) ? previous : { ...previous, [name]: [...entries, id] };
  }), []);

  return landed === null
    ? <Flight flightState={flightState} onLand={land} />
    : <PlanetSurface key={planets[landed].name} planet={planets[landed]} onLaunch={launch} journal={journal} onDiscover={discover} />;
}
