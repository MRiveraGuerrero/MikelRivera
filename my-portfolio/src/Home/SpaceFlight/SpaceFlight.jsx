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
import { isSoundEnabled, toggleSound, playBlip, playSelect, playEngage, playBoltPickup } from './soundFx';

import { solarBodies as planets, orbitalPosition, shootingTargets, asteroidConfigs, patrolShipConfigs, SYSTEM_CENTER, SYSTEM_LIMIT } from '../../Journey/solarSystem';
import GalaxyMap from '../../Journey/GalaxyMap';
import PlanetSurface from '../PlanetSurface/PlanetSurface';
import WorkshopDialog from './WorkshopDialog';
import HangarEsplanade from './HangarEsplanade';
import EsplanadeMesh from './EsplanadeMesh';
import ProceduralShip from './ProceduralShip';
import { getUpgrades } from './upgrades';
import { getSelectedShip } from './ships';

const systemCenter = new THREE.Vector3(...SYSTEM_CENTER);
const SHIP_MODEL = '/models/optimized/spaceship.glb';
const LANDING_RANGE = 80;
const NO_INPUT = {};
const forward = new THREE.Vector3(0, 0, -1);
const axisY = new THREE.Vector3(0, 1, 0);
const axisX = new THREE.Vector3(1, 0, 0);
const LASER_COUNT = 24;
const MISSILE_COUNT = 8;
const BOLT_COUNT = 72;
const TARGET_CONFIG = shootingTargets;
const TARGET_PALETTES = [
  { color: '#00f0ff', emissive: '#0284c7', wireColor: '#7ce9ff' }, // Cyan Plasma
  { color: '#ff3388', emissive: '#be185d', wireColor: '#ff88bb' }, // Magenta Warp
  { color: '#ffb020', emissive: '#d97706', wireColor: '#fed7aa' }, // Solar Amber
  { color: '#00ffaa', emissive: '#059669', wireColor: '#a7f3d0' }, // Quantum Emerald
  { color: '#a855f7', emissive: '#7c3aed', wireColor: '#d8b4fe' }, // Cosmic Amethyst
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

function PlanetModel({ url, radius, luminous = false, tint }) {
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
        if (tint) {
          material.color = new THREE.Color(tint);
        }
        return material;
      };
      child.material = Array.isArray(child.material) ? child.material.map(prepare) : prepare(child.material);
    });
    const bounds = new THREE.Box3().setFromObject(object);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const scale = (radius * 2) / Math.max(size.x, size.y, size.z, 0.001);
    return { object, scale, offset: center.multiplyScalar(-1) };
  }, [scene, radius, luminous, tint]);

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

// Stylized Career Space Station (consistent far and near: crystal octahedron core & glowing cyan orbital torus)
function CareerStation({ radius = 22 }) {
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((_, dt) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += dt * 0.15;
      coreRef.current.rotation.x += dt * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.22;
    }
  });

  const coreRadius = radius * 0.55;
  const torusRadius = radius * 0.85;
  const torusTube = radius * 0.08;

  return (
    <group>
      {/* Central Rotating Faceted Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[coreRadius, 0]} />
        <meshLambertMaterial color="#a1c5d7" />
      </mesh>
      {/* Delicate crystal edge wireframe */}
      <mesh scale={1.01}>
        <octahedronGeometry args={[coreRadius, 0]} />
        <meshBasicMaterial color="#bae6fd" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Station Torus Ring */}
      <group ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[torusRadius, torusTube, 16, 48]} />
          <meshBasicMaterial color="#67c8d3" />
        </mesh>
        <mesh>
          <torusGeometry args={[torusRadius, torusTube * 0.38, 8, 36]} />
          <meshBasicMaterial color="#e0f7fa" wireframe transparent opacity={0.4} />
        </mesh>
      </group>
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
  onCollectCredits,
  upgrades,
  selectedShip,
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
  const boltMeshes = useRef([]);
  const boltIndex = useRef(0);
  const bolts = useRef(Array.from({ length: BOLT_COUNT }, () => ({
    active: false,
    position: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    rotSpeed: new THREE.Vector3(),
    homingDelay: 0,
    speed: 50,
    life: 0,
    value: 20,
  })));

  const asteroidMeshes = useRef([]);
  const asteroidExplosionMeshes = useRef([]);
  const asteroids = useRef(asteroidConfigs.map(cfg => ({
    position: new THREE.Vector3(...cfg.position),
    drift: new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 3),
    rotSpeed: new THREE.Vector3((Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.6),
    radius: cfg.radius,
    health: cfg.health,
    maxHealth: cfg.health,
    oreColor: cfg.oreColor,
    active: true,
    explosion: 0,
    respawn: 0,
  })));

  const npcMeshes = useRef([]);
  const npcExplosionMeshes = useRef([]);
  const npcShips = useRef(patrolShipConfigs.map(cfg => ({
    position: new THREE.Vector3(...cfg.center),
    center: cfg.center,
    radius: cfg.radius,
    speed: cfg.speed,
    inclination: cfg.inclination,
    node: cfg.node,
    phase: cfg.phase,
    heightAmp: cfg.heightAmp,
    health: cfg.health,
    maxHealth: cfg.health,
    name: cfg.name,
    canopyColor: cfg.canopyColor,
    active: true,
    explosion: 0,
    respawn: 0,
  })));
  const targets = useRef(TARGET_CONFIG.map((position, i) => {
    const palette = TARGET_PALETTES[i % TARGET_PALETTES.length];
    const pos = Array.isArray(position) ? position : position.position;
    return {
      position: new THREE.Vector3(...pos),
      active: true,
      explosion: 0,
      respawn: 0,
      color: palette.color,
      emissive: palette.emissive,
      wireColor: palette.wireColor,
      scale: 0.9 + (i % 3) * 0.22,
    };
  }));
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
  const acrobatics = useRef({
    rollActive: false,
    rollDirection: 0,
    rollProgress: 0,
    rollDuration: 0.62,
    bankAngle: 0,
    pitchAngle: 0,
    swayTime: 0,
    lateralOffset: 0,
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

    const spawnBolts = (origin, count = 5) => {
      for (let k = 0; k < count; k++) {
        const bolt = bolts.current[boltIndex.current];
        boltIndex.current = (boltIndex.current + 1) % BOLT_COUNT;
        bolt.active = true;
        bolt.position.copy(origin);
        const spread = 18 + Math.random() * 16;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        bolt.velocity.set(
          Math.cos(theta) * Math.cos(phi) * spread,
          Math.sin(phi) * spread,
          Math.sin(theta) * Math.cos(phi) * spread
        );
        bolt.homingDelay = 0.2 + Math.random() * 0.15;
        bolt.speed = 55;
        bolt.rotSpeed.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16, (Math.random() - 0.5) * 16);
        bolt.life = 7;
        bolt.value = Math.floor(15 + Math.random() * 20);
      }
    };

    const hitTarget = target => {
      target.active = false;
      target.explosion = 0.7;
      target.respawn = 8 + Math.random() * 6;
      spawnBolts(target.position, 4 + Math.floor(Math.random() * 4));
      playSelect();
    };

    const hitAsteroid = ast => {
      ast.active = false;
      ast.explosion = 0.8;
      ast.respawn = 10 + Math.random() * 6;
      spawnBolts(ast.position, 4 + Math.floor(Math.random() * 4));
      playSelect();
    };

    const hitNpcShip = npc => {
      npc.active = false;
      npc.explosion = 1.0;
      npc.respawn = 16 + Math.random() * 8;
      spawnBolts(npc.position, 8 + Math.floor(Math.random() * 5));
      playSelect();
    };

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

        if (dist <= LANDING_RANGE || hasKeyInput || hasMouseInput) {
          if (dist <= LANDING_RANGE) f.speed = 0;
          onDisengageAutopilot(dist <= LANDING_RANGE);
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
        // Acrobatic barrel roll triggers from Q (left) or E (right)
        const acro = acrobatics.current;
        if (keys.rollLeft && !acro.rollActive) {
          delete input.current.rollLeft;
          acro.rollActive = true;
          acro.rollDirection = 1; // Voltereta a la izquierda (Q)
          acro.rollProgress = 0;
          playBlip(680, 0.08, 0.06);
        }
        if (keys.rollRight && !acro.rollActive) {
          delete input.current.rollRight;
          acro.rollActive = true;
          acro.rollDirection = -1; // Voltereta a la derecha (E)
          acro.rollProgress = 0;
          playBlip(780, 0.08, 0.06);
        }

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
        const thrusterLvl = upgrades?.thrusters || 1;
        const speedMult = selectedShip?.speedMultiplier || 1.0;
        const thrustMax = (48 + (thrusterLvl - 1) * 10) * speedMult;
        const boostMax = (105 + (thrusterLvl - 1) * 22) * speedMult;
        f.speed = THREE.MathUtils.damp(
          f.speed,
          braking ? 0 : thrust ? (keys.ShiftLeft || keys.ShiftRight ? boostMax : thrustMax) : 0,
          braking ? 4 : thrust ? (1.3 + (thrusterLvl - 1) * 0.15) : 0.3,
          dt
        );
      }

      mouse.current.x = 0;
      mouse.current.y = 0;

      v.direction.copy(forward).applyQuaternion(f.rotation);

      // Automatic Planetary Proximity Redirection & Collision Avoidance
      for (let i = 0; i < planets.length; i++) {
        const p = planets[i];
        const isTaller = p.id === 'taller' || p.name === 'El Taller';
        v.delta.copy(f.position).sub(planetPositions[i]);

        if (isTaller) {
          // El Taller is a flat horizontal landing platform/deck, NOT a spherical globe
          const platRadius = p.radius * 0.95;
          const platHalfHeight = Math.max(2.2, p.radius * 0.08);

          // Find closest point on the flat platform cylinder
          const horizDist = Math.hypot(v.delta.x, v.delta.z);
          const horizScale = horizDist > 0.001 ? Math.min(1, platRadius / horizDist) : 1;
          const closeX = v.delta.x * horizScale;
          const closeZ = v.delta.z * horizScale;
          const closeY = Math.max(-platHalfHeight, Math.min(platHalfHeight, v.delta.y));

          // Vector from the closest point of the platform geometry to the ship
          v.avoidance.set(v.delta.x - closeX, v.delta.y - closeY, v.delta.z - closeZ);
          const distToPlat = v.avoidance.length();
          const platBuffer = 6.0; // Tight local cushion around actual visible platform geometry

          if (distToPlat < platBuffer && distToPlat > 0.0001) {
            const outward = v.avoidance.normalize();
            const radialHeading = v.direction.dot(outward);
            const penetration = Math.max(0, Math.min(1, 1 - distToPlat / platBuffer));

            if (radialHeading < 0.15) {
              const deflectFactor = (-radialHeading + 0.35) * (1.6 + penetration * 2.5);
              const deflectDir = v.obstacle.copy(v.direction).addScaledVector(outward, deflectFactor).normalize();
              v.turn.setFromUnitVectors(forward, deflectDir);
              f.rotation.slerp(v.turn, Math.min(1, dt * (7.0 + penetration * 12.0)));
              f.targetRotation.copy(f.rotation);

              const repulseSpeed = Math.max(25, f.speed * 0.9 + 18) * Math.pow(penetration, 1.2);
              f.position.addScaledVector(outward, repulseSpeed * dt);
            }

            // Hard clearance boundary right at the platform surface
            const minSafeDist = 1.8;
            if (distToPlat < minSafeDist) {
              f.position.set(
                planetPositions[i].x + closeX + outward.x * minSafeDist,
                planetPositions[i].y + closeY + outward.y * minSafeDist,
                planetPositions[i].z + closeZ + outward.z * minSafeDist
              );
              if (radialHeading < 0) {
                f.speed = Math.max(12, f.speed * 0.88);
              }
            }
          }
          continue;
        }

        // Spherical celestial body collision avoidance
        const dist = v.delta.length();
        // Allow the ship to fly significantly closer to the surface before gentle deflection begins
        const buffer = Math.max(16, p.radius * 0.18);
        const avoidanceRadius = p.radius + buffer;

        if (dist < avoidanceRadius && dist > 0.001) {
          const outward = v.delta.normalize(); // unit vector pointing radially away from planet center
          const radialHeading = v.direction.dot(outward); // < 0 means ship is flying inward toward the planet
          const penetration = Math.max(0, Math.min(1, 1 - (dist - p.radius) / buffer));

          // If heading directly toward the planet, smoothly curve and redirect trajectory tangent and outward
          if (radialHeading < 0.12) {
            // Deflect trajectory away from planet center to form a smooth orbital slipstream
            const deflectFactor = (-radialHeading + 0.35) * (1.6 + penetration * 2.5);
            const deflectDir = v.avoidance.copy(v.direction).addScaledVector(outward, deflectFactor).normalize();
            v.turn.setFromUnitVectors(forward, deflectDir);
            f.rotation.slerp(v.turn, Math.min(1, dt * (7.0 + penetration * 12.0)));
            f.targetRotation.copy(f.rotation);

            // Repulsor cushion push outward so the ship glides cleanly around the atmosphere
            const repulseSpeed = Math.max(28, f.speed * 0.9 + 20) * Math.pow(penetration, 1.3);
            f.position.addScaledVector(outward, repulseSpeed * dt);
          }

          // Absolute hard safe boundary right above surface: never allow clipping or getting stuck in the planet mesh
          const minSafeDist = p.radius + 2.5;
          if (dist < minSafeDist) {
            f.position.copy(planetPositions[i]).addScaledVector(outward, minSafeDist);
            if (radialHeading < 0) {
              f.speed = Math.max(12, f.speed * 0.88);
            }
          }
        }
      }

      // Apply forward velocity along redirected heading
      v.direction.copy(forward).applyQuaternion(f.rotation);
      f.position.addScaledVector(v.direction, f.speed * dt);

      // System limit boundary
      v.delta.copy(f.position).sub(systemCenter);
      if (v.delta.length() > SYSTEM_LIMIT) {
        f.position.copy(systemCenter).add(v.delta.setLength(SYSTEM_LIMIT));
        f.speed = 0;
      }

      // Physical ramming / ship collisions with space objects
      for (const target of targets.current) {
        if (target.active && f.position.distanceToSquared(target.position) < 144) {
          hitTarget(target);
          v.shake = 0.8;
          playBlip(420, 0.08, 0.08);
          break;
        }
      }
      const hullLvl = upgrades?.hull || 1;
      const armorMult = selectedShip?.armorMultiplier || 1.0;
      for (const ast of asteroids.current) {
        if (ast.active && f.position.distanceToSquared(ast.position) < (ast.radius + 6.5) ** 2) {
          hitAsteroid(ast);
          f.speed = Math.max(12, f.speed * Math.min(0.96, (0.72 + (hullLvl - 1) * 0.06) * armorMult));
          v.shake = Math.max(0.5, (1.4 - (hullLvl - 1) * 0.15) / armorMult);
          playBlip(180, 0.14, 0.12);
          break;
        }
      }
      for (const npc of npcShips.current) {
        if (npc.active && f.position.distanceToSquared(npc.position) < 144) {
          hitNpcShip(npc);
          f.speed = Math.max(12, f.speed * Math.min(0.96, (0.65 + (hullLvl - 1) * 0.07) * armorMult));
          v.shake = Math.max(0.6, (1.6 - (hullLvl - 1) * 0.15) / armorMult);
          playBlip(240, 0.16, 0.14);
          break;
        }
      }
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

    // Acrobatic Voltereta (Barrel Roll) & dynamic attitude simulation
    const acro = acrobatics.current;
    let rollAngle = 0;
    let barrelLift = 0;
    let targetSide = 0;

    if (acro.rollActive) {
      acro.rollProgress += dt / acro.rollDuration;
      if (acro.rollProgress >= 1) {
        acro.rollActive = false;
        acro.rollProgress = 0;
      } else {
        const p = acro.rollProgress;
        const ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
        rollAngle = acro.rollDirection * ease * Math.PI * 2;
        barrelLift = (1 - Math.cos(p * Math.PI * 2)) * 2.2;

        // Snaps to the side fast, holds out wide during the roll, then begins return
        if (p < 0.28) {
          targetSide = -acro.rollDirection * 12.0 * Math.sin((p / 0.28) * (Math.PI / 2));
        } else if (p < 0.72) {
          targetSide = -acro.rollDirection * 12.0;
        } else {
          const returnP = (p - 0.72) / 0.28;
          targetSide = -acro.rollDirection * 12.0 * (0.5 + 0.5 * Math.cos(returnP * Math.PI));
        }
      }
    }

    // Damp lateral offset so it holds wide longer and glides back smoothly without rushing immediately to center
    acro.lateralOffset = THREE.MathUtils.damp(acro.lateralOffset || 0, targetSide, 4.2, dt);
    const barrelSide = acro.lateralOffset;

    // Dynamic banking into steering turns
    const yawInput = Number(!!(keys.ArrowLeft || keys.KeyA)) - Number(!!(keys.ArrowRight || keys.KeyD));
    const mouseYawInput = THREE.MathUtils.clamp(mouse.current.x * 0.0022, -0.3, 0.3);
    const turnDemand = yawInput * 0.75 - mouseYawInput * 3.2;
    const targetBank = Math.max(-0.65, Math.min(0.65, turnDemand * 0.7));
    acro.bankAngle = THREE.MathUtils.damp(acro.bankAngle, targetBank, 6.0, dt);

    // Dynamic pitch gestures (aerodynamic lean on thrust, slight nose up on braking)
    const pitchInput = Number(!!keys.ArrowUp) - Number(!!keys.ArrowDown);
    const mousePitchInput = THREE.MathUtils.clamp(mouse.current.y * 0.0022, -0.3, 0.3);
    const targetPitch = pitchInput * 0.12 - mousePitchInput * 0.5;
    const thrusting = mobileControls.enabled ? mobileControls.moving : keys.KeyW;
    const boosting = thrusting && (keys.ShiftLeft || keys.ShiftRight);
    const brakingState = mobileControls.enabled ? !mobileControls.moving : keys.KeyS || keys.Space;
    const accelPitch = boosting ? -0.055 : thrusting ? -0.025 : brakingState ? 0.045 : 0;
    acro.pitchAngle = THREE.MathUtils.damp(acro.pitchAngle, targetPitch + accelPitch, 5.5, dt);

    // Organic flight sway & micro-gestures so ship attitude breathes naturally instead of rigid 180° line
    acro.swayTime += dt;
    const st = acro.swayTime;
    const swayRoll = Math.sin(st * 1.5) * 0.028 + Math.sin(st * 0.72) * 0.014;
    const swayPitch = Math.cos(st * 1.25) * 0.020 + Math.sin(st * 2.2) * 0.009;
    const swayYaw = Math.sin(st * 0.85) * 0.016;

    const totalRoll = acro.bankAngle + swayRoll + rollAngle;
    const totalPitch = acro.pitchAngle + swayPitch;
    const totalYaw = swayYaw;

    // Update 3D ship position with corkscrew barrel roll displacement
    if (acro.rollActive || Math.abs(barrelSide) > 0.05) {
      v.obstacle.set(barrelSide, barrelLift, 0).applyQuaternion(f.rotation);
      ship.current.position.copy(f.position).add(v.obstacle);
    } else {
      ship.current.position.copy(f.position);
    }

    // Apply combined orientation (heading + dynamic bank + pitch gesture + organic sway + roll)
    v.turn.setFromEuler(new THREE.Euler(totalPitch, totalYaw, totalRoll, 'YXZ'));
    ship.current.quaternion.copy(f.rotation).multiply(v.turn);

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
    // Camera subtly reacts to ship banking for athletic, cinematic feel
    const camRoll = acro.bankAngle * 0.22 + (acro.rollActive ? acro.rollDirection * Math.sin(acro.rollProgress * Math.PI) * 0.16 : 0);
    v.turn.setFromAxisAngle(forward, camRoll);
    const camTargetRot = v.desiredRotation.copy(f.rotation).multiply(v.turn);
    camera.quaternion.slerp(camTargetRot, 1 - Math.exp(-7 * dt));
    v.shake = Math.max(0, (v.shake || 0) - dt * 4.5);
    if (v.shake > 0) {
      camera.position.x += (Math.random() - 0.5) * v.shake;
      camera.position.y += (Math.random() - 0.5) * v.shake;
    }

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
      if (target.active) aimAtSphere(target.position, 4.5 * (target.scale || 1));
    });
    asteroids.current.forEach(ast => {
      if (ast.active) aimAtSphere(ast.position, ast.radius * 1.15);
    });
    npcShips.current.forEach(npc => {
      if (npc.active) aimAtSphere(npc.position, 5.5);
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

    const blasterLvl = upgrades?.blasters || 1;
    // Base ship fires much slower (~0.45s cooldown) and speeds up with upgrades
    const blasterCooldown = Math.max(0.08, 0.45 - (blasterLvl - 1) * 0.08);
    const laserSpeed = 250 + (blasterLvl - 1) * 35;

    if (!paused) {
      shots.primaryCooldown -= dt;
      if (weapons.current.primary > 0 || ((mobileControls.enabled ? mobileControls.firing : weapons.current.primaryHeld) && shots.primaryCooldown <= 0)) {
        launch(shots.lasers, 'laserIndex', laserSpeed, 2.2, shots.barrel * 1.45);
        shots.barrel *= -1;
        shots.primaryCooldown = blasterCooldown;
        weapons.current.primary = Math.max(0, weapons.current.primary - 1);
        playBlip(920, 0.04, 0.04);
      }
      while (weapons.current.missile > 0) {
        const missile = launch(shots.missiles, 'missileIndex', 110, 6, shots.barrel * 2.1);
        const missileDirection = v.direction.copy(missile.velocity).normalize();
        let bestScore = 0.15;
        missile.targetType = null;
        missile.targetIndex = -1;

        npcShips.current.forEach((npc, i) => {
          if (!npc.active) return;
          const offset = v.delta.copy(npc.position).sub(missile.position);
          const distance = offset.length();
          const score = missileDirection.dot(offset.normalize()) - distance * 0.0001 + 0.12;
          if (score > bestScore) { bestScore = score; missile.targetType = 'ship'; missile.targetIndex = i; }
        });

        targets.current.forEach((target, i) => {
          if (!target.active) return;
          const offset = v.delta.copy(target.position).sub(missile.position);
          const distance = offset.length();
          const score = missileDirection.dot(offset.normalize()) - distance * 0.0001;
          if (score > bestScore) { bestScore = score; missile.targetType = 'crystal'; missile.targetIndex = i; }
        });

        asteroids.current.forEach((ast, i) => {
          if (!ast.active) return;
          const offset = v.delta.copy(ast.position).sub(missile.position);
          const distance = offset.length();
          const score = missileDirection.dot(offset.normalize()) - distance * 0.0001 - 0.05;
          if (score > bestScore) { bestScore = score; missile.targetType = 'asteroid'; missile.targetIndex = i; }
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

    const updateProjectiles = (pool, meshes, homing = false) => pool.forEach((projectile, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      if (!projectile.active) { mesh.visible = false; return; }
      projectile.life -= dt;
      projectile.active = projectile.active && projectile.life > 0;
      if (projectile.active) {
        if (homing && projectile.targetType) {
          let targetPos = null;
          if (projectile.targetType === 'ship' && npcShips.current[projectile.targetIndex]?.active) {
            targetPos = npcShips.current[projectile.targetIndex].position;
          } else if (projectile.targetType === 'crystal' && targets.current[projectile.targetIndex]?.active) {
            targetPos = targets.current[projectile.targetIndex].position;
          } else if (projectile.targetType === 'asteroid' && asteroids.current[projectile.targetIndex]?.active) {
            targetPos = asteroids.current[projectile.targetIndex].position;
          }
          if (targetPos) {
            const desiredSpeed = projectile.velocity.length();
            v.direction.copy(targetPos).sub(projectile.position).normalize().multiplyScalar(desiredSpeed);
            projectile.velocity.lerp(v.direction, 1 - Math.exp(-2.2 * dt));
            projectile.rotation.setFromUnitVectors(forward, v.direction.copy(projectile.velocity).normalize());
          }
        }
        projectile.position.addScaledVector(projectile.velocity, dt);
        for (let p = 0; p < planets.length; p++) {
          if (projectile.position.distanceToSquared(planetPositions[p]) < planets[p].radius ** 2) projectile.active = false;
        }
        for (const target of targets.current) {
          if (target.active && projectile.position.distanceToSquared(target.position) < 64 * (target.scale || 1)) {
            projectile.active = false;
            hitTarget(target);
            break;
          }
        }
        if (projectile.active) {
          for (const ast of asteroids.current) {
            if (ast.active && projectile.position.distanceToSquared(ast.position) < (ast.radius + 6.0) ** 2) {
              projectile.active = false;
              hitAsteroid(ast);
              break;
            }
          }
        }
        if (projectile.active) {
          for (const npc of npcShips.current) {
            if (npc.active && projectile.position.distanceToSquared(npc.position) < 64) {
              projectile.active = false;
              hitNpcShip(npc);
              break;
            }
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
      } else if (target.position.distanceToSquared(f.position) < 2250000) {
        targetMesh.rotation.y += dt * 0.8;
        targetMesh.rotation.x += dt * 0.4;
      }
      target.explosion = Math.max(0, target.explosion - dt);
      const nearbyTarget = target.position.distanceToSquared(f.position) < 2250000;
      targetMesh.visible = target.active && nearbyTarget;
      explosionMesh.visible = target.explosion > 0 && nearbyTarget;
      if (target.explosion > 0) {
        const progress = 1 - target.explosion / 0.7;
        explosionMesh.scale.setScalar((target.scale || 1) * (1 + progress * 7));
        explosionMesh.children.forEach(child => { child.material.opacity = 1 - progress; });
      }
    });

    // Update Guitones (Bolts) homing to ship
    bolts.current.forEach((bolt, i) => {
      const mesh = boltMeshes.current[i];
      if (!mesh) return;
      if (!bolt.active) {
        mesh.visible = false;
        return;
      }
      bolt.life -= dt;
      if (bolt.life <= 0) {
        bolt.active = false;
        mesh.visible = false;
        return;
      }
      mesh.visible = true;
      bolt.homingDelay -= dt;

      const magnetLvl = upgrades?.magnet || 1;
      const magnetBonus = selectedShip?.magnetBonus || 0;
      const collectDist = 6.5 + (magnetLvl - 1) * 2.8 + magnetBonus;
      const maxBoltSpeed = 340 + (magnetLvl - 1) * 55;
      const boltAccel = 280 + (magnetLvl - 1) * 60;

      if (bolt.homingDelay <= 0) {
        const toShip = v.delta.copy(f.position).sub(bolt.position);
        const dist = toShip.length();
        if (dist < collectDist) {
          bolt.active = false;
          mesh.visible = false;
          if (onCollectCredits) onCollectCredits(bolt.value);
          playBoltPickup();
          return;
        }
        bolt.speed = Math.min(maxBoltSpeed, bolt.speed + dt * boltAccel);
        const desiredVel = toShip.normalize().multiplyScalar(bolt.speed + f.speed);
        bolt.velocity.lerp(desiredVel, 1 - Math.exp(-9 * dt));
      } else {
        bolt.velocity.multiplyScalar(Math.max(0, 1 - 2.5 * dt));
      }

      bolt.position.addScaledVector(bolt.velocity, dt);
      mesh.position.copy(bolt.position);
      mesh.rotation.x += bolt.rotSpeed.x * dt;
      mesh.rotation.y += bolt.rotSpeed.y * dt;
      mesh.rotation.z += bolt.rotSpeed.z * dt;
    });

    // Asteroid animation & drift
    asteroids.current.forEach((ast, i) => {
      const mesh = asteroidMeshes.current[i];
      const explosionMesh = asteroidExplosionMeshes.current[i];
      if (!mesh || !explosionMesh) return;

      if (!ast.active) {
        ast.respawn -= dt;
        if (ast.respawn <= 0) {
          ast.active = true;
          ast.health = ast.maxHealth;
        }
      } else if (ast.position.distanceToSquared(f.position) < 2560000) {
        mesh.rotation.x += ast.rotSpeed.x * dt;
        mesh.rotation.y += ast.rotSpeed.y * dt;
        mesh.rotation.z += ast.rotSpeed.z * dt;
        ast.position.addScaledVector(ast.drift, dt);
        mesh.position.copy(ast.position);
      }

      ast.explosion = Math.max(0, ast.explosion - dt);
      const nearby = ast.position.distanceToSquared(f.position) < 2560000;
      mesh.visible = ast.active && nearby;
      explosionMesh.visible = ast.explosion > 0 && nearby;
      if (ast.explosion > 0) {
        explosionMesh.position.copy(ast.position);
        const progress = 1 - ast.explosion / 0.8;
        explosionMesh.scale.setScalar(1 + progress * 6);
        explosionMesh.children.forEach(child => { child.material.opacity = 1 - progress; });
      }
    });

    // Flying NPC Ships simulation
    npcShips.current.forEach((npc, i) => {
      const mesh = npcMeshes.current[i];
      const explosionMesh = npcExplosionMeshes.current[i];
      if (!mesh || !explosionMesh) return;

      if (!npc.active) {
        npc.respawn -= dt;
        if (npc.respawn <= 0) {
          npc.active = true;
          npc.health = npc.maxHealth;
        }
      } else {
        npc.phase += dt * npc.speed;
        const r = npc.radius;
        const angle = npc.phase;
        const rawX = Math.cos(angle) * r;
        const rawZ = Math.sin(angle) * r;
        const tiltedZ = rawZ * Math.cos(npc.inclination);
        const y = npc.center[1] + rawZ * Math.sin(npc.inclination) + Math.sin(angle * 2.2) * npc.heightAmp;
        const x = npc.center[0] + rawX * Math.cos(npc.node) - tiltedZ * Math.sin(npc.node);
        const z = npc.center[2] + rawX * Math.sin(npc.node) + tiltedZ * Math.cos(npc.node);

        v.delta.set(x, y, z).sub(npc.position);
        if (v.delta.lengthSq() > 0.0001) {
          v.direction.copy(v.delta).normalize();
          mesh.quaternion.setFromUnitVectors(forward, v.direction);
          mesh.rotateZ(Math.sin(angle * 2.5) * 0.35);
        }
        npc.position.set(x, y, z);
        mesh.position.copy(npc.position);
      }

      npc.explosion = Math.max(0, npc.explosion - dt);
      const nearby = npc.position.distanceToSquared(f.position) < 3000000;
      mesh.visible = npc.active && nearby;
      explosionMesh.visible = npc.explosion > 0 && nearby;
      if (npc.explosion > 0) {
        explosionMesh.position.copy(npc.position);
        const progress = 1 - npc.explosion / 1.0;
        explosionMesh.scale.setScalar(1 + progress * 8);
        explosionMesh.children.forEach(child => { child.material.opacity = 1 - progress; });
      }
    });

    f.tick += dt;
    if (f.tick > 0.1) {
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
            <mesh scale={target.scale || 1}>
              <octahedronGeometry args={[3.2, 0]} />
              <meshStandardMaterial
                color={target.color}
                emissive={target.emissive}
                emissiveIntensity={0.85}
                roughness={0.25}
                metalness={0.8}
              />
            </mesh>
            <mesh scale={(target.scale || 1) * 1.22}>
              <octahedronGeometry args={[3.2, 0]} />
              <meshBasicMaterial color={target.wireColor} wireframe transparent opacity={0.6} toneMapped={false} />
            </mesh>
          </group>
          <group ref={mesh => { explosionMeshes.current[i] = mesh; }} visible={false}>
            <mesh scale={target.scale || 1}>
              <sphereGeometry args={[1.8, 12, 8]} />
              <meshBasicMaterial color={target.color} transparent opacity={1} toneMapped={false} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh scale={(target.scale || 1) * 1.5}>
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
          <meshBasicMaterial color={selectedShip?.laserColor || "#38d9f5"} toneMapped={false} transparent opacity={0.95} blending={THREE.AdditiveBlending} />
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

      {/* Guitones (Bolts / Credits) */}
      {Array.from({ length: BOLT_COUNT }, (_, i) => (
        <group key={`bolt-${i}`} ref={mesh => { boltMeshes.current[i] = mesh; }} visible={false}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.35, 6]} />
            <meshStandardMaterial
              color="#fbbf24"
              metalness={0.9}
              roughness={0.2}
              emissive="#f59e0b"
              emissiveIntensity={0.65}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.38, 8]} />
            <meshBasicMaterial color="#fffbeb" toneMapped={false} />
          </mesh>
          <mesh scale={1.4}>
            <octahedronGeometry args={[0.6, 0]} />
            <meshBasicMaterial color="#fde047" wireframe transparent opacity={0.45} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Meteorites / Asteroids */}
      {asteroids.current.map((ast, i) => (
        <group key={`asteroid-${i}`}>
          <group ref={mesh => { asteroidMeshes.current[i] = mesh; }}>
            <mesh>
              <dodecahedronGeometry args={[ast.radius, 1]} />
              <meshStandardMaterial
                color="#52525b"
                roughness={0.9}
                metalness={0.2}
                flatShading
              />
            </mesh>
            <mesh scale={1.03}>
              <icosahedronGeometry args={[ast.radius, 0]} />
              <meshBasicMaterial
                color={ast.oreColor}
                wireframe
                transparent
                opacity={0.3}
                toneMapped={false}
              />
            </mesh>
          </group>
          <group ref={mesh => { asteroidExplosionMeshes.current[i] = mesh; }} visible={false}>
            <mesh>
              <sphereGeometry args={[ast.radius * 0.9, 10, 8]} />
              <meshBasicMaterial color="#f97316" transparent opacity={1} toneMapped={false} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh scale={1.4}>
              <dodecahedronGeometry args={[ast.radius, 0]} />
              <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.9} toneMapped={false} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Flying Patrol & Rogue Ships */}
      {npcShips.current.map((npc, i) => (
        <group key={`npc-ship-${i}`}>
          <group ref={mesh => { npcMeshes.current[i] = mesh; }}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[1.5, 5.6, 5]} />
              <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0.42, -0.5]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.85, 0.6, 2.1]} />
              <meshStandardMaterial
                color={npc.canopyColor}
                emissive={npc.canopyColor}
                emissiveIntensity={0.8}
                metalness={0.5}
                roughness={0.15}
              />
            </mesh>
            <mesh position={[0, -0.1, 0.5]}>
              <boxGeometry args={[5.8, 0.22, 2.1]} />
              <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
            </mesh>
            {[-2.9, 2.9].map(x => (
              <mesh key={x} position={[x, 0.35, 0.7]}>
                <boxGeometry args={[0.18, 1.1, 1.6]} />
                <meshStandardMaterial color="#e11d48" emissive="#be123c" emissiveIntensity={0.6} />
              </mesh>
            ))}
            {[-0.65, 0.65].map(x => (
              <group key={x} position={[x, 0, 2.8]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.42, 0.52, 0.85, 8]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.9} />
                </mesh>
                <mesh position={[0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
                  <coneGeometry args={[0.38, 1.7, 8]} />
                  <meshBasicMaterial color="#f43f5e" transparent opacity={0.85} toneMapped={false} />
                </mesh>
              </group>
            ))}
          </group>
          <group ref={mesh => { npcExplosionMeshes.current[i] = mesh; }} visible={false}>
            <mesh>
              <sphereGeometry args={[2.8, 12, 10]} />
              <meshBasicMaterial color="#f43f5e" transparent opacity={1} toneMapped={false} blending={THREE.AdditiveBlending} />
            </mesh>
            <mesh scale={1.5}>
              <sphereGeometry args={[2.8, 8, 6]} />
              <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={1} toneMapped={false} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Celestial Bodies */}
      {planets.map((p, i) => (
        <group key={p.name} ref={mesh => { bodyMeshes.current[i] = mesh; if (mesh) mesh.position.copy(planetPositions[i]); }}>
          {p.type === 'station' ? (
            <CareerStation radius={p.radius} />
          ) : (p.id === 'taller' || p.name === 'El Taller') ? (
            <EsplanadeMesh radius={p.radius} paused={paused} />
          ) : (
            <CelestialBody planet={p} paused={paused} />
          )}

          {/* Planet Label */}
          <Html eps={1.5} position={[0, p.radius + 10, 0]} center style={{ pointerEvents: 'none' }}>
            <span className={`${styles.planetLabel} ${selected === i ? styles.planetLabelSelected : ''}`}>
              {selected === i ? '◈ ' : ''}{p.name}
            </span>
          </Html>
        </group>
      ))}

      {/* Player Spaceship (Selected Distinct 3D Model) */}
      <group ref={ship}>
        <group position={[0, 0, 0]}>
          <ProceduralShip shipId={selectedShip?.id || 'interceptor'} scale={1.25} />
        </group>
        <mesh ref={flame} position={[0, 0, 2.7]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.45, 2.2, 12]} />
          <meshBasicMaterial color={selectedShip?.flameColor || "#00f0ff"} transparent opacity={0.88} />
        </mesh>
      </group>
    </>
  );
});

function Flight({ flightState, onLand, onOpenHangar }) {
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

  const [credits, setCredits] = useState(() => {
    try {
      const saved = localStorage.getItem('space_flight_credits');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [upgrades, setUpgrades] = useState(getUpgrades);
  const [selectedShip, setSelectedShipState] = useState(getSelectedShip);
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [creditGlow, setCreditGlow] = useState(false);
  const [recentEarned, setRecentEarned] = useState(0);
  const glowTimeout = useRef(null);
  const recentTimeout = useRef(null);

  useEffect(() => {
    const onUpgrades = (e) => setUpgrades(e.detail);
    const onCreds = (e) => setCredits(e.detail);
    const onShip = () => setSelectedShipState(getSelectedShip());
    window.addEventListener('space_flight_upgrades_changed', onUpgrades);
    window.addEventListener('space_flight_credits_changed', onCreds);
    window.addEventListener('space_flight_ship_changed', onShip);
    return () => {
      window.removeEventListener('space_flight_upgrades_changed', onUpgrades);
      window.removeEventListener('space_flight_credits_changed', onCreds);
      window.removeEventListener('space_flight_ship_changed', onShip);
    };
  }, []);

  const handleCollectCredits = useCallback((amount) => {
    setCredits(prev => {
      const next = prev + amount;
      try { localStorage.setItem('space_flight_credits', next.toString()); } catch {}
      return next;
    });
    setRecentEarned(r => r + amount);
    setCreditGlow(true);
    if (glowTimeout.current) clearTimeout(glowTimeout.current);
    glowTimeout.current = setTimeout(() => setCreditGlow(false), 400);
    if (recentTimeout.current) clearTimeout(recentTimeout.current);
    recentTimeout.current = setTimeout(() => setRecentEarned(0), 1200);
  }, []);

  const [mapOpen, setMapOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [autopilotTarget, setAutopilotTarget] = useState(null);
  const [reset, setReset] = useState(0);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    distances: planets.map((p, i) => Math.max(0, Math.round(flightState.current.position.distanceTo(flightState.current.planetPositions[i]) - p.radius))),
  });

  const nearby = telemetry.distances.findIndex(d => d <= LANDING_RANGE);

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
      if (e.code === 'KeyT' && !e.repeat && !mapOpen && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        input.current = {};
        if (onOpenHangar) {
          onOpenHangar();
        } else {
          setWorkshopOpen(open => !open);
          setPaused(!workshopOpen);
        }
        return;
      }
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
      if (e.code === 'KeyQ' && !e.repeat && !paused && !mapOpen && help !== 'manual') {
        e.preventDefault();
        input.current.rollLeft = true;
      }
      if (e.code === 'KeyE' && !e.repeat && !paused && !mapOpen && help !== 'manual') {
        e.preventDefault();
        if (nearby >= 0) {
          onLand(nearby);
        } else {
          input.current.rollRight = true;
        }
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
            paused={paused || mapOpen || workshopOpen || help === 'manual'}
            reset={reset}
            onTelemetry={setTelemetry}
            selected={selected}
            flightState={flightState}
            autopilotTarget={autopilotTarget}
            onDisengageAutopilot={handleDisengageAutopilot}
            onIntroComplete={handleIntroComplete}
            onCollectCredits={handleCollectCredits}
            upgrades={upgrades}
            selectedShip={selectedShip}
          />
        </Canvas>
      </FlightBoundary>

      {/* Modern Game HUD (smoothly fades in as intro un-zoom finishes) */}
      <div className={`${styles.hudLayer} ${introActive ? styles.hudHidden : styles.hudVisible}`}>
        <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.homeBtn}>
            ← {es ? 'Inicio' : 'Home'}
          </Link>
          <div
            className={`${styles.creditsWidget} ${creditGlow ? styles.creditsWidgetGlow : ''}`}
            title={es ? 'Guitones recolectados' : 'Bolts collected'}
          >
            <span className={styles.boltIcon} aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L19.7942 6.5V15.5L12 20L4.20577 15.5V6.5L12 2Z"
                  stroke="#fbbf24"
                  strokeWidth="2.2"
                  fill="#f59e0b44"
                />
                <circle cx="12" cy="11" r="3.6" stroke="#fde047" strokeWidth="2" fill="#78350f" />
              </svg>
            </span>
            <div className={styles.creditsInfo}>
              <span className={styles.creditsAmount}>{credits.toLocaleString()}</span>
              <small className={styles.creditsLabel}>{es ? 'GUITONES' : 'BOLTS'}</small>
            </div>
            {recentEarned > 0 && (
              <span className={styles.creditsPopup}>+{recentEarned}</span>
            )}
          </div>
        </div>
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
            <p><kbd>W</kbd> {es ? 'Acelerar' : 'Thrust'} <kbd>S</kbd> {es ? 'Frenar' : 'Brake'} <kbd>Q</kbd> / <kbd>E</kbd> {es ? 'Voltereta acrobática' : 'Barrel roll'}</p>
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
          <span className={styles.arrivalBadge}>{es ? 'Pulsar [E] · Aterrizar' : 'Press [E] · Land'}</span>
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

      {/* Starship Upgrades Workshop Dialog */}
      {workshopOpen && (
        <WorkshopDialog
          onClose={() => {
            setWorkshopOpen(false);
            setPaused(false);
          }}
          es={es}
        />
      )}
    </main>
  );
}

export default function SpaceFlight({ initialPosition = [0, 0, 35] }) {
  const tallerIndex = planets.findIndex(p => p.id === 'taller' || p.name === 'El Taller');
  const flightState = useRef({
    position: new THREE.Vector3(...initialPosition),
    rotation: new THREE.Quaternion(),
    targetRotation: new THREE.Quaternion(),
    speed: 0,
    tick: 0,
    systemTime: 0,
    planetPositions: planets.map(body => new THREE.Vector3(...body.position)),
  });
  const [landed, setLanded] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('/taller')) {
      return tallerIndex >= 0 ? tallerIndex : null;
    }
    return null;
  });
  const [journal, setJournal] = useState({});

  const land = useCallback(index => {
    const planet = planets[index];
    if (!planet || flightState.current.position.distanceTo(flightState.current.planetPositions[index]) - planet.radius > LANDING_RANGE) return;
    flightState.current.speed = 0;
    playSelect();
    setLanded(index);
  }, []);

  const openHangar = useCallback(() => {
    flightState.current.speed = 0;
    playSelect();
    setLanded(tallerIndex >= 0 ? tallerIndex : 8);
  }, [tallerIndex]);

  const launch = useCallback(() => {
    flightState.current.speed = 0;
    playEngage();
    setLanded(null);
  }, []);

  const discover = useCallback((name, id) => setJournal(previous => {
    const entries = previous[name] || [];
    return entries.includes(id) ? previous : { ...previous, [name]: [...entries, id] };
  }), []);

  const landedPlanet = landed !== null ? planets[landed] : null;
  const isTaller = landedPlanet && (landedPlanet.id === 'taller' || landedPlanet.name === 'El Taller');

  return landed === null
    ? <Flight flightState={flightState} onLand={land} onOpenHangar={openHangar} />
    : isTaller
    ? <HangarEsplanade planet={landedPlanet} onLaunch={launch} />
    : <PlanetSurface key={landedPlanet.name} planet={landedPlanet} onLaunch={launch} journal={journal} onDiscover={discover} />;
}
