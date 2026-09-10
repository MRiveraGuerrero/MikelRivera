import { Component, memo, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './SpaceFlight.module.css';
import StableStars from './StableStars';
import useMouseFlight from './useMouseFlight';

const planets = [
  { name: 'Portfolio', model: '/models/optimized/portfolio-planet.glb', path: '/portfolio-planet', position: [-65, 12, -160], radius: 18, color: '#b997ff' },
  { name: 'Projects', model: '/models/optimized/project-planet.glb', path: '/project-planet', position: [75, -8, -230], radius: 24, color: '#c790ff' },
  { name: 'Work', model: '/models/optimized/work-planet.glb', path: '/work-planet', position: [-170, -35, -330], radius: 28, color: '#58ddbb' },
  { name: 'Lab', model: '/models/optimized/lab-planet.glb', path: '/lab-planet', position: [180, 65, -420], radius: 22, color: '#fa8faa' },
  { name: 'Sol', model: '/models/optimized/sun.glb', path: '/sun', position: [0, 80, -550], radius: 42, color: '#ffbd62' },
];
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
  render() { return this.state.failed ? <div className={styles.fallback}>3D no disponible / 3D unavailable. <Link to="/">Volver al inicio / Back home</Link></div> : this.props.children; }
}

// Normalize imported models without modifying the cached GLTF scene or materials.
function PlanetModel({ url, radius, luminous = false }) {
  const { scene } = useGLTF(url, false, true);
  const model = useMemo(() => {
    const object = scene.clone(true);
    object.traverse(child => {
      if (!child.isMesh) return;
      child.raycast = () => null;
      // Baked color also provides gentle fill for metallic surfaces in deep space.
      const prepare = original => {
        const material = original.clone();
        material.emissive.set('#ffffff');
        material.emissiveMap = material.map;
        material.emissiveIntensity = luminous ? 0.8 : 0.16;
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
    if (child.isMesh) (Array.isArray(child.material) ? child.material : [child.material]).forEach(material => material.dispose());
  }), [model]);
  return <group scale={model.scale}><group position={model.offset}><primitive object={model.object} dispose={null} /></group></group>;
}

class PlanetModelBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function PlanetSphere({ planet, sun }) {
  return <mesh><sphereGeometry args={[planet.radius, 48, 32]} /><meshStandardMaterial color={planet.color} roughness={0.78} metalness={0.15} emissive={planet.color} emissiveIntensity={sun ? 1.7 : 0.08} /></mesh>;
}
// Lower pixel density once sustained slow frames are detected; avoid quality oscillation.
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

const World = memo(function World({ input, mouse, weapons, paused, reset, onTelemetry }) {
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
  const flight = useRef({
    position: new THREE.Vector3(0, 0, 35),
    rotation: new THREE.Quaternion(),
    targetRotation: new THREE.Quaternion(),
    speed: 0,
    tick: 0,
  });
  const scratch = useRef({ direction: new THREE.Vector3(), camera: new THREE.Vector3(), turn: new THREE.Quaternion(), delta: new THREE.Vector3() });
  useEffect(() => {
    flight.current.position.set(0, 0, 35);
    flight.current.rotation.identity();
    flight.current.targetRotation.identity();
    flight.current.speed = 0;
    projectiles.current.lasers.forEach(projectile => { projectile.active = false; });
    projectiles.current.missiles.forEach(projectile => { projectile.active = false; });
    projectiles.current.primaryCooldown = 0;
  }, [reset]);
  useFrame(({ camera }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const f = flight.current;
    const v = scratch.current;
    const keys = paused ? NO_INPUT : input.current;
    if (paused) { mouse.current.x = 0; mouse.current.y = 0; }
    if (!paused) {
      const yaw = Number(!!(keys.ArrowLeft || keys.KeyA)) - Number(!!(keys.ArrowRight || keys.KeyD));
      const pitch = Number(!!keys.ArrowUp) - Number(!!keys.ArrowDown);
      const mouseYaw = THREE.MathUtils.clamp(mouse.current.x * 0.0022, -0.3, 0.3);
      const mousePitch = THREE.MathUtils.clamp(mouse.current.y * 0.0022, -0.3, 0.3);
      f.targetRotation.multiply(v.turn.setFromAxisAngle(axisY, yaw * dt * 1.05 - mouseYaw));
      f.targetRotation.multiply(v.turn.setFromAxisAngle(axisX, pitch * dt * 0.85 - mousePitch));
      f.targetRotation.normalize();
      // Spread irregular mouse-event deltas over multiple rendered frames.
      f.rotation.slerp(f.targetRotation, 1 - Math.exp(-13 * dt));
      mouse.current.x = 0;
      mouse.current.y = 0;
      const thrust = keys.KeyW;
      const braking = keys.KeyS || keys.Space;
      f.speed = THREE.MathUtils.damp(f.speed, braking ? 0 : thrust ? (keys.ShiftLeft || keys.ShiftRight ? 100 : 45) : 0, braking ? 4 : thrust ? 1.3 : 0.3, dt);
      v.direction.copy(forward).applyQuaternion(f.rotation);
      f.position.addScaledVector(v.direction, f.speed * dt);
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
        launch(shots.lasers, 'laserIndex', 240, 2.2, shots.barrel * 1.45);
        shots.barrel *= -1;
        shots.primaryCooldown = 0.11;
        weapons.current.primary = Math.max(0, weapons.current.primary - 1);
      }
      while (weapons.current.missile > 0) {
        const missile = launch(shots.missiles, 'missileIndex', 105, 6, shots.barrel * 2.1);
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
          if (target.active && projectile.position.distanceToSquared(target.position) < 14) {
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
    targets.current.forEach((target, i) => {
      const targetMesh = targetMeshes.current[i];
      const explosionMesh = explosionMeshes.current[i];
      if (!targetMesh || !explosionMesh) return;
      if (!target.active) {
        target.respawn -= dt;
        if (target.respawn <= 0) target.active = true;
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
    ship.current.position.copy(f.position);
    ship.current.quaternion.copy(f.rotation);
    flame.current.scale.set(1, 1, 0.5 + f.speed / 22);
    v.camera.set(0, 5, 17).applyQuaternion(f.rotation).add(f.position);
    camera.position.lerp(v.camera, 1 - Math.exp(-5 * dt));
    // Smooth orientation separately so quick turns feel fluid at varying frame rates.
    camera.quaternion.slerp(f.rotation, 1 - Math.exp(-9 * dt));
    f.tick += dt;
    if (f.tick > 0.2) {
      f.tick = 0;
      const speed = Math.round(f.speed);
      const distances = planets.map((p, i) => Math.max(0, Math.round(f.position.distanceTo(planetPositions[i]) - p.radius)));
      onTelemetry(previous => previous.speed === speed && previous.distances.every((d, i) => d === distances[i]) ? previous : { speed, distances });
    }
  });
  return <>
    <color attach="background" args={['#030610']} />
    <AdaptiveResolution paused={paused} />
    <ambientLight intensity={1.1} />
    <hemisphereLight args={['#bfdfff', '#494058', 1.3]} />
    <directionalLight position={[40, 80, 50]} intensity={2.5} color="#c3deff" />
    <pointLight position={[0, 80, -490]} intensity={1400} distance={1000} color="#ffbc68" />
    <StableStars />
    {targets.current.map((target, i) => <group key={`target-${i}`} position={target.position}>
      <group ref={mesh => { targetMeshes.current[i] = mesh; }}>
        <mesh rotation={[0.35, 0.45, 0.15]}><boxGeometry args={[4.5, 4.5, 4.5]} /><meshStandardMaterial color="#d7182a" emissive="#8f0010" emissiveIntensity={1.2} roughness={0.35} /></mesh>
        <mesh rotation={[0.35, 0.45, 0.15]} scale={1.18}><boxGeometry args={[4.5, 4.5, 4.5]} /><meshBasicMaterial color="#ff6170" wireframe transparent opacity={0.75} toneMapped={false} /></mesh>
      </group>
      <group ref={mesh => { explosionMeshes.current[i] = mesh; }} visible={false}>
        <mesh><sphereGeometry args={[1.6, 12, 8]} /><meshBasicMaterial color="#ff3c16" transparent opacity={1} toneMapped={false} blending={THREE.AdditiveBlending} /></mesh>
        <mesh scale={1.45}><sphereGeometry args={[1.6, 8, 6]} /><meshBasicMaterial color="#ffcf4a" wireframe transparent opacity={1} toneMapped={false} /></mesh>
      </group>
    </group>)}
    {Array.from({ length: LASER_COUNT }, (_, i) => <mesh key={`laser-${i}`} ref={mesh => { laserMeshes.current[i] = mesh; }} visible={false}>
      <boxGeometry args={[0.15, 0.15, 3.2]} />
      <meshBasicMaterial color="#62efff" toneMapped={false} transparent opacity={0.95} blending={THREE.AdditiveBlending} />
    </mesh>)}
    {Array.from({ length: MISSILE_COUNT }, (_, i) => <group key={`missile-${i}`} ref={mesh => { missileMeshes.current[i] = mesh; }} visible={false}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.17, 0.28, 1.45, 8]} /><meshStandardMaterial color="#d6deea" metalness={0.7} roughness={0.3} /></mesh>
      <mesh position={[0, 0, 0.95]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.25, 1.4, 10]} /><meshBasicMaterial color="#ff8b39" toneMapped={false} transparent opacity={0.9} /></mesh>
    </group>)}
    {planets.map((p, i) => <group key={p.name} position={p.position}>
            {p.model ? <PlanetModelBoundary fallback={<PlanetSphere planet={p} />}>
        <Suspense fallback={<PlanetSphere planet={p} />}><PlanetModel url={p.model} radius={p.radius} luminous={i === 4} /></Suspense>
      </PlanetModelBoundary> : <PlanetSphere planet={p} sun={i === 4} />}
      {!p.model && <mesh rotation={[1.2, 0.3, 0]}><torusGeometry args={[p.radius * 1.35, p.radius * 0.025, 8, 100]} /><meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.5} /></mesh>}
      <Html position={[0, p.radius + 9, 0]} center style={{ pointerEvents: 'none' }}><span className={styles.planetLabel}>{p.name}</span></Html>
    </group>)}
    <group ref={ship}>
      <PlanetModelBoundary fallback={<PlanetSphere planet={{ radius: 1, color: '#a7d9ed' }} />}>
        <Suspense fallback={<PlanetSphere planet={{ radius: 1, color: '#a7d9ed' }} />}>
          <group rotation={[0, -Math.PI / 2, 0]}><PlanetModel url={SHIP_MODEL} radius={3.5} /></group>
        </Suspense>
      </PlanetModelBoundary>
      <mesh ref={flame} position={[0, 0, 3.1]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.5, 2.4, 12]} /><meshBasicMaterial color="#57daff" transparent opacity={0.85} /></mesh>
    </group>
  </>;
});

export default function SpaceFlight() {
  const { language } = useLanguage();
  const es = language === 'es';
  const input = useRef({});
  const [paused, setPaused] = useState(false);
  const { surface, mouse, weapons, locked, failed, capture, release } = useMouseFlight(setPaused);
  useEffect(() => { if (paused) release(); }, [paused, release]);
  const [reset, setReset] = useState(0);
  const [telemetry, setTelemetry] = useState({ speed: 0, distances: [191, 258, 379, 472, 548] });
  const navigate = useNavigate();
  const nearby = telemetry.distances.findIndex(d => d <= 35);
  useEffect(() => {
    const codes = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'ShiftLeft', 'ShiftRight'];
    const down = e => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (codes.includes(e.code) && !(e.code === 'Space' && /BUTTON|A/.test(e.target.tagName))) { e.preventDefault(); input.current[e.code] = true; }
      if (e.code === 'Escape' && !e.repeat && !document.pointerLockElement) setPaused(true);
      if (e.code === 'KeyE' && !e.repeat && nearby >= 0 && !paused) navigate(planets[nearby].path);
    };
    const up = e => { delete input.current[e.code]; };
    const clear = () => { input.current = {}; setPaused(true); };
    const clearWhenHidden = () => { if (document.hidden) clear(); };
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', clear); document.addEventListener('visibilitychange', clearWhenHidden);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', clear); document.removeEventListener('visibilitychange', clearWhenHidden); };
  }, [nearby, navigate, paused]);
  const control = (code, label) => <button key={code} aria-label={label} onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); input.current[code] = true; }} onPointerUp={() => delete input.current[code]} onPointerCancel={() => delete input.current[code]} onLostPointerCapture={() => delete input.current[code]}>{label}</button>;
  return <main ref={surface} className={styles.page} onClick={e => { if (e.target.tagName === 'CANVAS' && window.matchMedia('(pointer: fine)').matches && !locked) capture(); }}>
    <FlightBoundary><Canvas camera={{ position: [0, 5, 52], fov: 65, far: 2500 }} dpr={1} gl={{ antialias: false, powerPreference: 'high-performance' }} fallback={<div className={styles.fallback}>WebGL no disponible / unavailable. <Link to="/">Inicio / Home</Link></div>}><World input={input} mouse={mouse} weapons={weapons} paused={paused} reset={reset} onTelemetry={setTelemetry} /></Canvas></FlightBoundary>
    <header className={styles.header}><Link to="/">← {es ? 'Inicio' : 'Home'}</Link><div><small>MIKELRIVERA / EXPLORER</small><h1>{es ? 'Vuelo libre' : 'Free flight'}</h1></div><button onClick={() => setPaused(p => !p)}>{paused ? (es ? 'Continuar' : 'Resume') : (es ? 'Pausa' : 'Pause')}</button></header>
    <aside className={styles.destinations}><small>{es ? 'SISTEMA PLANETARIO' : 'PLANETARY SYSTEM'}</small>{planets.map((p, i) => <div key={p.name}><span><i style={{ background: p.color }} />{p.name}</span><span>{telemetry.distances[i]} u</span></div>)}<p>{es ? 'Pilota hacia las balizas. Acércate a 35 u para entrar.' : 'Fly toward the beacons. Get within 35 u to enter.'}</p></aside>
    <div className={styles.reticle}>＋</div>
    {!paused && <div className={styles.mouseHint}>
      {locked ? <span>{es ? 'Ratón: orientar · Clic: disparar · Clic derecho: misil · Esc: cursor' : 'Mouse: steer · Click: fire · Right click: missile · Esc: cursor'}</span> : <button onClick={capture}>{es ? 'Clic para pilotar con el ratón' : 'Click to fly with the mouse'}</button>}
      {failed && <p role="status">{es ? 'Este navegador no permite capturar el cursor. Mantén pulsado y arrastra sobre el espacio para orientar la nave.' : 'This browser cannot capture the cursor. Hold and drag over space to steer the ship.'}</p>}
    </div>}
    {paused && <div className={styles.paused}><h2>{es ? 'Vuelo en pausa' : 'Flight paused'}</h2><button onClick={() => setPaused(false)}>{es ? 'Continuar vuelo' : 'Resume flight'}</button></div>}
    {nearby >= 0 && !paused && <Link className={styles.arrival} to={planets[nearby].path}>{es ? 'Entrar en' : 'Enter'} {planets[nearby].name} ↗ <small>[E]</small></Link>}
    <footer className={styles.footer}><div><strong>{telemetry.speed.toString().padStart(3, '0')}</strong> <small>u/s</small><p>W {es ? 'acelerar' : 'thrust'} · S / {es ? 'Espacio frenar' : 'Space brake'} · Shift turbo<br />{es ? 'Ratón: orientar · Clic: disparo · Clic derecho: misil' : 'Mouse: steer · Click: fire · Right click: missile'}</p></div><button onClick={() => { input.current = {}; mouse.current.x = 0; mouse.current.y = 0; setReset(r => r + 1); }}>{es ? 'Reiniciar posición' : 'Reset position'}</button></footer>
    <nav className={styles.touch} aria-label={es ? 'Controles de vuelo' : 'Flight controls'}><div>{control('ArrowLeft', '←')}{control('ArrowUp', '↑')}{control('ArrowDown', '↓')}{control('ArrowRight', '→')}</div><div>{control('KeyS', es ? 'Freno' : 'Brake')}{control('KeyW', es ? 'Acelerar' : 'Thrust')}{control('ShiftLeft', 'Turbo')}</div></nav>
  </main>;
}
