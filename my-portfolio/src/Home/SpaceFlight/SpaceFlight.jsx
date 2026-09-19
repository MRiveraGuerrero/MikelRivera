import { Component, memo, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Detailed, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './SpaceFlight.module.css';
import StableStars from './StableStars';
import CelestialBody from './CelestialBody';
import useMouseFlight from './useMouseFlight';
import { isSoundEnabled, toggleSound, playBlip, playSelect, playEngage } from './soundFx';

import { solarBodies as planets, orbitalPosition, shootingTargets, SYSTEM_CENTER, SYSTEM_LIMIT } from '../../Journey/solarSystem';
import GalaxyMap from '../../Journey/GalaxyMap';
import PlanetSurface from '../PlanetSurface/PlanetSurface';

const systemCenter = new THREE.Vector3(...SYSTEM_CENTER);
const SHIP_MODEL = '/models/optimized/spaceship.glb';
const NO_INPUT = {};
const forward = new THREE.Vector3(0, 0, -1);
const axisY = new THREE.Vector3(0, 1, 0);
const axisX = new THREE.Vector3(1, 0, 0);
const LASER_COUNT = 24;
const MISSILE_COUNT = 8;
const TARGET_CONFIG = shootingTargets;

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
function CareerStation() {
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

function AdaptiveResolution({ paused }) {
  const setDpr = useThree(state => state.setDpr);
  const sample = useRef({ elapsed: 0, frames: 0, warmup: 0, level: 0 });
  useFrame((_, dt) => {
    const s = sample.current;
    if (paused || document.hidden) { s.elapsed = 0; s.frames = 0; return; }
    s.warmup += dt;
    if (s.warmup < 2) return;
    s.elapsed += Math.min(dt, 1);
    s.frames++;
    if (s.elapsed >= 2) {
      // Include slow frames: previously frames over 200 ms were ignored,
      // preventing the devices that need it most from reducing resolution.
      const levels = [1, 0.85, 0.7, 0.6];
      if (s.frames / s.elapsed < 45 && s.level < levels.length - 1) {
        s.level++;
        setDpr(levels[s.level]);
      }
      s.elapsed = 0; s.frames = 0;
    }
  });
  return null;
}

const World = memo(function World({
  input,
  mouse,
  weapons,
  mobileControls,
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
  const bodyMeshes = useRef([]);
  const planetPositions = flightState.current.planetPositions;
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
  const scratch = useRef({
    direction: new THREE.Vector3(), camera: new THREE.Vector3(),
    turn: new THREE.Quaternion(), desiredRotation: new THREE.Quaternion(), delta: new THREE.Vector3(),
    aimRay: new THREE.Ray(), aimPoint: new THREE.Vector3(),
    aimHit: new THREE.Vector3(), aimSphere: new THREE.Sphere(),
    orbital: [], obstacle: new THREE.Vector3(), avoidance: new THREE.Vector3(),
  });

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

    // A single simulation clock survives landing and freezes with the flight UI.
    if (!paused) {
      f.systemTime += dt;
      planets.forEach((body, i) => {
        orbitalPosition(body, f.systemTime, v.orbital);
        planetPositions[i].fromArray(v.orbital);
      });
    }
    planets.forEach((_, i) => bodyMeshes.current[i]?.position.copy(planetPositions[i]));

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
          if (dist <= 35) f.speed = 0;
          onDisengageAutopilot(dist <= 35);
        } else {
          // Smooth autopilot steering and cruising
          const targetDistance = toTarget.length();
          const desiredDir = toTarget.normalize();
          // Bend the route around intervening worlds instead of flying into them.
          for (let i = 0; i < planets.length; i++) {
            if (i === autopilotTarget) continue;
            v.obstacle.copy(planetPositions[i]).sub(f.position);
            const along = v.obstacle.dot(desiredDir);
            if (along <= 0 || along >= targetDistance || along > 650) continue;
            v.avoidance.copy(desiredDir).multiplyScalar(along).sub(v.obstacle);
            const clearance = planets[i].radius + 100;
            if (v.avoidance.length() >= clearance) continue;
            if (v.avoidance.lengthSq() < 0.01) {
              v.avoidance.crossVectors(desiredDir, axisY);
              if (v.avoidance.lengthSq() < 0.01) v.avoidance.copy(axisX);
            }
            desiredDir.add(v.avoidance.setLength(clearance / Math.max(along, 50))).normalize();
          }
          const desiredRot = v.desiredRotation.setFromUnitVectors(forward, desiredDir);
          f.targetRotation.slerp(desiredRot, 1 - Math.exp(-4.5 * dt));
          f.rotation.slerp(desiredRot, 1 - Math.exp(-7 * dt));

          const cruiseSpeed = Math.min(240, Math.max(12, (dist - 25) * 0.65));
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

        const thrust = mobileControls.enabled ? mobileControls.moving : keys.KeyW;
        const braking = mobileControls.enabled ? !mobileControls.moving : keys.KeyS || keys.Space;
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
          f.position.copy(planetPositions[i]).add(v.delta.setLength(p.radius + 5));
          f.speed = 0;
        }
      }
      v.delta.copy(f.position).sub(systemCenter);
      if (v.delta.length() > SYSTEM_LIMIT) { f.position.copy(systemCenter).add(v.delta.setLength(SYSTEM_LIMIT)); f.speed = 0; }
    }

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

    // Weapons / Shooting
    const shots = projectiles.current;
    let aimReady = false;
    const prepareAim = () => {
      if (aimReady) return;
      aimReady = true;
    // Aim through the visible reticle using this frame's camera, not the ship's
    // forward axis: the chase camera sits above the barrels and lags on turns.
    v.aimRay.origin.copy(camera.position);
    v.aimRay.direction.copy(forward).applyQuaternion(camera.quaternion);
    v.aimRay.at(500, v.aimPoint);
    let aimDistance = 500;
    const aimAtSphere = (position, radius) => {
      v.aimSphere.set(position, radius);
      if (!v.aimRay.intersectSphere(v.aimSphere, v.aimHit)) return;
      const distance = camera.position.distanceTo(v.aimHit);
      if (distance < aimDistance) {
        aimDistance = distance;
        v.aimPoint.copy(v.aimHit);
      }
    };
    planets.forEach((planet, i) => aimAtSphere(planetPositions[i], planet.radius));
    targets.current.forEach(target => {
      if (target.active) aimAtSphere(target.position, 4);
    });
    };
    const launch = (pool, indexKey, speed, life, side) => {
      prepareAim();
      const projectile = pool[shots[indexKey]];
      shots[indexKey] = (shots[indexKey] + 1) % pool.length;
      projectile.active = true;
      projectile.life = life;
      projectile.position.set(side, -0.25, -3).applyQuaternion(f.rotation).add(f.position);
      v.direction.copy(v.aimPoint).sub(projectile.position).normalize();
      projectile.velocity.copy(v.direction).multiplyScalar(speed + f.speed);
      projectile.rotation.setFromUnitVectors(forward, v.direction);
      return projectile;
    };

    if (!paused) {
      shots.primaryCooldown -= dt;
      if (weapons.current.primary > 0 || ((mobileControls.enabled ? mobileControls.firing : weapons.current.primaryHeld) && shots.primaryCooldown <= 0)) {
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
      target.respawn = 45;
      playSelect();
    };

    const updateProjectiles = (pool, meshes, homing = false) => pool.forEach((projectile, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      if (!projectile.active) { mesh.visible = false; return; }
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
      } else if (target.position.distanceToSquared(f.position) < 1000000) {
        targetMesh.rotation.y += dt * 0.8;
        targetMesh.rotation.x += dt * 0.4;
      }
      target.explosion = Math.max(0, target.explosion - dt);
      const nearbyTarget = target.position.distanceToSquared(f.position) < 1000000;
      targetMesh.visible = target.active && nearbyTarget;
      explosionMesh.visible = target.explosion > 0 && nearbyTarget;
      if (target.explosion > 0) {
        const progress = 1 - target.explosion / 0.7;
        explosionMesh.scale.setScalar(1 + progress * 7);
        explosionMesh.children.forEach(child => { child.material.opacity = 1 - progress; });
      }
    });

    f.tick += dt;
    if (f.tick > 0.25) {
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
      <pointLight position={SYSTEM_CENTER} intensity={16000} distance={8500} color="#ffb854" />
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
        <group key={p.name} ref={mesh => { bodyMeshes.current[i] = mesh; if (mesh) mesh.position.copy(planetPositions[i]); }}>
          {p.type === 'station' ? (
            <Detailed distances={[0, 1100]} hysteresis={0.15}>
              <group scale={p.radius / 22}><CareerStation /></group>
              <group>
                <mesh><octahedronGeometry args={[p.radius * .55, 0]} /><meshLambertMaterial color="#a1c5d7" /></mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[p.radius * .85, p.radius * .08, 4, 24]} />
                  <meshBasicMaterial color="#67c8d3" />
                </mesh>
              </group>
            </Detailed>
          ) : <CelestialBody planet={p} paused={paused} />}

          {/* Planet Label */}
          <Html eps={1.5} position={[0, p.radius + 10, 0]} center style={{ pointerEvents: 'none' }}>
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
    far: 12000,
  }));
  const { language, setLanguage } = useLanguage();
  const es = language === 'es';
  const input = useRef({});
  const [paused, setPaused] = useState(false);
  const [mobile, setMobile] = useState(() => window.matchMedia('(pointer: coarse), (hover: none)').matches);
  const [moving, setMoving] = useState(true);
  const [firing, setFiring] = useState(false);
  const touchDrag = useRef(null);
  const mobileControls = useMemo(() => ({ enabled: mobile, moving, firing }), [mobile, moving, firing]);

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse), (hover: none)');
    const change = () => setMobile(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  const [help, setHelp] = useState('intro');
  const helpButton = useRef(null);
  const { surface, mouse, weapons, locked, failed, capture, release } = useMouseFlight(setPaused, { weaponsEnabled: !mobile });

  useEffect(() => { if (paused) { touchDrag.current = null; release(); } }, [paused, release]);

  const [mapOpen, setMapOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [autopilotTarget, setAutopilotTarget] = useState(null);
  const [reset, setReset] = useState(0);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    distances: planets.map((p, i) => Math.max(0, Math.round(flightState.current.position.distanceTo(flightState.current.planetPositions[i]) - p.radius))),
  });

  const nearby = telemetry.distances.findIndex(d => d <= 35);

  useEffect(() => {
    if (introActive || help !== 'intro' || paused || mapOpen) return;
    const timer = window.setTimeout(() => setHelp(null), 12000);
    return () => window.clearTimeout(timer);
  }, [introActive, help, paused, mapOpen]);

  const closeHelp = () => {
    setHelp(null);
    setPaused(false);
    helpButton.current?.focus();
  };


  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  const handleDisengageAutopilot = useCallback((arrived = false) => {
    setAutopilotTarget(null);
    if (arrived) setMoving(false);
  }, []);

  const handleEngageAutopilot = useCallback((index) => {
    setSelected(index);
    setAutopilotTarget(index);
  }, []);

  useEffect(() => {
    const codes = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'ShiftLeft', 'ShiftRight'];
    const down = e => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable) return;
      if (e.code === 'KeyI' && !e.repeat && !mapOpen && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        input.current = {};
        setHelp(help ? null : 'manual');
        setPaused(!help);
        return;
      }
      if (e.code === 'Escape' && help && !e.repeat) {
        setHelp(null);
        return;
      }
      if (codes.includes(e.code) && !(e.code === 'Space' && /BUTTON|A/.test(e.target.tagName))) {
        e.preventDefault();
        if (paused || mapOpen || help === 'manual') return;
        setHelp(null);
        input.current[e.code] = true;
        if (autopilotTarget !== null) setAutopilotTarget(null);
      }
      if (e.code === 'Escape' && !e.repeat && !document.pointerLockElement) setPaused(true);
      if (e.code === 'KeyM' && !e.repeat) {
        e.preventDefault();
        input.current = {};
        setHelp(null);
        setMapOpen(open => !open);
        setPaused(!mapOpen);
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
  }, [nearby, paused, mapOpen, onLand, autopilotTarget, help]);

  const endTouchDrag = e => {
    if (touchDrag.current?.id !== e.pointerId) return;
    touchDrag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <main
      ref={surface}
      className={styles.page}
      onPointerDown={e => {
        if (!mobile || e.pointerType !== 'touch' || e.target.tagName !== 'CANVAS' || paused || mapOpen || introActive || touchDrag.current) return;
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        touchDrag.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
        setHelp(null);
        setAutopilotTarget(null);
      }}
      onPointerMove={e => {
        const drag = touchDrag.current;
        if (!drag || drag.id !== e.pointerId || paused || mapOpen) return;
        e.preventDefault();
        mouse.current.x += e.clientX - drag.x;
        mouse.current.y += e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
      }}
      onPointerUp={endTouchDrag}
      onPointerCancel={endTouchDrag}
      onLostPointerCapture={endTouchDrag}
      onClick={e => {
        if (e.target.tagName === 'CANVAS' && !mobile && window.matchMedia('(pointer: fine)').matches && !locked && !paused && !mapOpen) {
          setHelp(null);
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
            mobileControls={mobileControls}
            paused={paused || mapOpen || help === 'manual'}
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
        <div className={styles.headerActions}>
          <button ref={helpButton} type="button" className={styles.infoBtn}
            aria-label={es ? 'Ayuda y ajustes (I)' : 'Help and settings (I)'}
            aria-expanded={Boolean(help)} aria-controls="flight-help"
            onClick={() => { input.current = {}; setHelp(help ? null : 'manual'); setPaused(!help); }}>i</button>
          <button
            type="button"
            className={styles.mapBtn}
            onClick={() => { input.current = {}; setHelp(null); setMapOpen(true); setPaused(true); }}
          >
            <span>M</span> {es ? 'Mapa' : 'Map'}
          </button>
          <button
            type="button"
            className={styles.pauseBtn}
            onClick={() => { input.current = {}; setHelp(null); setPaused(p => !p); }}
          >
            {paused ? (es ? 'Continuar' : 'Resume') : (es ? 'Pausa' : 'Pause')}
          </button>
        </div>
      </header>

      {/* Autopilot HUD Banner */}
      {autopilotTarget !== null && !help && !mapOpen && (
        <div className={styles.autopilotBanner}>
          <span className={styles.autopilotDot} />
          <strong>{es ? 'Rumbo a' : 'Flying to'} {planets[autopilotTarget]?.name}</strong>
          <button type="button" onClick={() => handleDisengageAutopilot()}>{es ? 'Cancelar' : 'Cancel'}</button>
        </div>
      )}

      {!paused && !mapOpen && <div className={styles.reticle}><div className={styles.reticleInner} /></div>}

      {help && !mapOpen && (
        <section id="flight-help" className={styles.helpPanel} aria-label={es ? 'Cómo explorar' : 'How to explore'}
          onPointerEnter={() => { if (help === 'intro') setHelp('reading'); }}
          onFocusCapture={() => { if (help === 'intro') setHelp('reading'); }}>
          <div className={styles.helpHeading}>
            <h2>{es ? 'Explora a tu ritmo' : 'Explore at your own pace'}</h2>
            <button type="button" onClick={closeHelp} aria-label={es ? 'Cerrar ayuda' : 'Close help'}>×</button>
          </div>
          <div className={styles.desktopHelp}>
            <p><kbd>W</kbd> {es ? 'Acelerar' : 'Thrust'} <kbd>S</kbd> {es ? 'Frenar' : 'Brake'}</p>
            <p><kbd>↑ ↓ ← →</kbd> {es ? 'Orientar · o haz clic en el espacio para usar el ratón.' : 'Steer · or click space to use the mouse.'}</p>
          </div>
          <div className={styles.mobileHelp}>
            <p>{es ? 'La nave avanza sola. Arrastra sobre el espacio para girar. Toca Parar o Acelerar para cambiar la marcha, y Disparo para activar o desactivar el fuego continuo.' : 'The ship moves forward automatically. Drag across space to steer. Tap Stop or Thrust to change movement, and Fire to toggle continuous fire.'}</p>
          </div>
          <p>{es ? 'Abre Mapa para elegir un destino. Al acercarte, toca Aterrizar para explorar.' : 'Open Map to choose a destination. When nearby, tap Land to explore.'}</p>
          {failed && <p role="status">{es ? 'Si el ratón no se captura, mantén pulsado y arrastra para orientar.' : 'If mouse capture is unavailable, click and drag to steer.'}</p>}
          <details>
            <summary>{es ? 'Más controles y ajustes' : 'More controls and settings'}</summary>
            <p className={styles.desktopHelp}>{es ? 'Shift: turbo · Espacio: frenar · E: aterrizar · M: mapa · Esc: pausa · Clic: disparar · Clic derecho: misil.' : 'Shift: boost · Space: brake · E: land · M: map · Esc: pause · Click: fire · Right click: missile.'}</p>
            <div className={styles.settings}>
              <button type="button" onClick={() => setLanguage(es ? 'en' : 'es')}>{es ? 'Idioma: ES' : 'Language: EN'}</button>
              <button type="button" onClick={handleToggleSound} aria-pressed={soundActive}>{es ? 'Sonido' : 'Sound'}: {soundActive ? 'ON' : 'OFF'}</button>
              <button type="button" onClick={() => {
                input.current = {}; mouse.current.x = 0; mouse.current.y = 0;
                setAutopilotTarget(null); setReset(r => r + 1); closeHelp();
              }}>{es ? 'Reiniciar posición' : 'Reset position'}</button>
            </div>
          </details>
          <button type="button" className={styles.helpDone} onClick={closeHelp}>{es ? 'Entendido, a explorar' : 'Got it, let’s explore'}</button>
          <small>{es ? 'La ayuda se oculta al empezar. Vuelve con ⓘ o la tecla I.' : 'Help hides when you start. Reopen with ⓘ or the I key.'}</small>
        </section>
      )}

      {/* Pause Menu */}
      {paused && !mapOpen && !help && (
        <div className={styles.paused}>
          <h2>{es ? 'Vuelo en Pausa' : 'Flight Paused'}</h2>
          <button onClick={() => setPaused(false)}>{es ? 'Continuar vuelo' : 'Resume flight'}</button>
          <p><Link to="/portfolio">View Portfolio ↗</Link></p>
        </div>
      )}

      {/* In-Range Landing Prompt */}
      {nearby >= 0 && !paused && !mapOpen && !help && (
        <button className={styles.arrival} onClick={() => onLand(nearby)}>
          <span className={styles.arrivalBadge}>{es ? 'Aterrizar' : 'Land'}</span>
          <span className={styles.arrivalName}>{planets[nearby].name}</span>
          <small>{planets[nearby].category || 'Destino en rango'}</small>
        </button>
      )}

      {/* Telemetry Footer */}
      <footer className={styles.footer}>
        <div>
          <div className={styles.speedValue}>
            <strong>{telemetry.speed.toString().padStart(3, '0')}</strong>
            <small>u/s</small>
          </div>
        </div>
      </footer>

      {mobile && !paused && !mapOpen && help !== 'manual' && (
        <nav className={styles.touch} aria-label={es ? 'Controles de vuelo' : 'Flight controls'}>
          <button type="button" aria-pressed={moving}
            aria-label={es ? 'Avance automático' : 'Automatic movement'}
            onClick={() => { setMoving(value => !value); setHelp(null); setAutopilotTarget(null); }}>
            <span aria-hidden="true">{moving ? 'Ⅱ' : '▶'}</span>
            {moving ? (es ? 'Parar' : 'Stop') : (es ? 'Acelerar' : 'Thrust')}
          </button>
          <button type="button" aria-pressed={firing}
            aria-label={es ? 'Disparo continuo' : 'Continuous fire'}
            onClick={() => { setFiring(value => !value); setHelp(null); }}>
            <span aria-hidden="true">◎</span>
            {es ? 'Disparo' : 'Fire'} · {firing ? 'ON' : 'OFF'}
          </button>
        </nav>
      )}
      </div>

      {/* XMB Galaxy Navigation Dialog */}
      {mapOpen && (
        <GalaxyMap
          distances={telemetry.distances}
          shipPosition={flightState.current.position.toArray()}
          bodyPositions={flightState.current.planetPositions.map(position => position.toArray())}
          selected={selected}
          autopilotActive={autopilotTarget !== null}
          onClose={() => { setMapOpen(false); setPaused(false); }}
          onSelect={index => setSelected(index)}
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
    systemTime: 0,
    planetPositions: planets.map(body => new THREE.Vector3(...body.position)),
  });
  const [landed, setLanded] = useState(null);
  const [journal, setJournal] = useState({});

  const land = useCallback(index => {
    const planet = planets[index];
    if (!planet || flightState.current.position.distanceTo(flightState.current.planetPositions[index]) - planet.radius > 35) return;
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
