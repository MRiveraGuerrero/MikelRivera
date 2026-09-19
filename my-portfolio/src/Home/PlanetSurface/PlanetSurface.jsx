import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import StableStars from '../SpaceFlight/StableStars';
import useMouseFlight from '../SpaceFlight/useMouseFlight';
import WorkshopDialog from '../SpaceFlight/WorkshopDialog';
import { getSurfaceContent } from './surfaceContent';
import { nearestInteractable, resolveWalk, SPAWN } from './walking';
import styles from './PlanetSurface.module.css';

const palettes = {
  garden: ['#122d2c', '#183738', '#8ad1b0'], desert: ['#42302c', '#34241f', '#ffc58a'],
  crystal: ['#211c39', '#32224f', '#c5a0ff'], circuit: ['#142a30', '#13303c', '#71eed0'],
  station: ['#1d2936', '#24394a', '#90dbe5'], solar: ['#34271d', '#3e2c1e', '#ffc877'],
  lab: ['#212439', '#292b44', '#f5a5d7'], moon: ['#242736', '#34384c', '#bfc6ee'],
};

class SurfaceBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className={styles.error}><h2>3D unavailable</h2><p>You can return to the ship or explore the portfolio.</p><button onClick={this.props.onLaunch}>Return to orbit</button><Link to="/portfolio">View Portfolio</Link></div> : this.props.children; }
}

function DockedShip({ departing }) {
  const group = useRef();
  const elapsed = useRef(0);
  useEffect(() => { elapsed.current = 0; }, [departing]);
  useFrame((_, dt) => {
    elapsed.current += dt;
    const progress = Math.min(elapsed.current / 1.4, 1);
    group.current.position.y = 1.8 + (departing ? progress ** 2 : (1 - progress) ** 2) * 18;
  });
  const { scene } = useGLTF('/models/optimized/spaceship.glb', false, true);
  const model = useMemo(() => {
    const object = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(object);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    return { object, offset: center.multiplyScalar(-1), scale: 7 / Math.max(size.x, size.y, size.z) };
  }, [scene]);
  return <group ref={group} position={[9, 1.8, 14]} rotation={[0, -Math.PI / 2, 0]} scale={model.scale}><group position={model.offset}><primitive object={model.object} dispose={null} /></group></group>;
}

function ShipFallback() {
  return <mesh position={[9, 1.5, 14]} rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[2, 6, 4]} /><meshStandardMaterial color="#ccd7df" metalness={0.7} roughness={0.3} /></mesh>;
}

class ShipBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <ShipFallback /> : this.props.children; }
}

function Astronaut({ avatar, moving, accent }) {
  const limbs = useRef([]);
  const phase = useRef(0);
  useFrame((_, dt) => {
    phase.current += dt * 10;
    limbs.current.forEach((limb, i) => { if (limb) limb.rotation.x = moving.current ? Math.sin(phase.current + (i % 2) * Math.PI) * 0.5 : 0; });
  });
  return <group ref={avatar}>
    <mesh position={[0, 1.15, 0]} castShadow><capsuleGeometry args={[0.35, 0.6, 5, 10]} /><meshStandardMaterial color="#d2dce2" roughness={0.6} /></mesh>
    <mesh position={[0, 1.93, 0]} castShadow><sphereGeometry args={[0.39, 16, 12]} /><meshStandardMaterial color="#e5ebef" metalness={0.25} /></mesh>
    <mesh position={[0, 1.95, -0.26]} scale={[1, 0.68, 0.5]}><sphereGeometry args={[0.32, 16, 12]} /><meshStandardMaterial color="#102634" metalness={0.8} roughness={0.15} /></mesh>
    <mesh position={[0, 1.24, 0.35]}><boxGeometry args={[0.5, 0.6, 0.28]} /><meshStandardMaterial color="#516574" /></mesh>
    <mesh position={[0, 1.3, -0.36]}><boxGeometry args={[0.29, 0.14, 0.04]} /><meshBasicMaterial color={accent} /></mesh>
    {[-1, 1].map((side, i) => <group key={`arm-${side}`} ref={el => { limbs.current[i] = el; }} position={[side * 0.48, 1.4, 0]}><mesh position={[0, -0.25, 0]}><capsuleGeometry args={[0.12, 0.43, 4, 8]} /><meshStandardMaterial color="#bdcbd5" /></mesh></group>)}
    {[-1, 1].map((side, i) => <group key={`leg-${side}`} ref={el => { limbs.current[i + 2] = el; }} position={[side * 0.19, 0.7, 0]}><mesh position={[0, -0.25, 0]}><capsuleGeometry args={[0.15, 0.43, 4, 8]} /><meshStandardMaterial color="#93a5b4" /></mesh><mesh position={[0, -0.59, -0.08]}><boxGeometry args={[0.31, 0.17, 0.45]} /><meshStandardMaterial color="#334453" /></mesh></group>)}
  </group>;
}

function Terminal({ node, accent, active, visited }) {
  const orb = useRef();
  useFrame((_, dt) => { if (orb.current) orb.current.rotation.y += dt * 0.45; });
  const gateway = node.kind === 'gateway';
  return <group position={[node.position[0], 0, node.position[1]]}>
    <mesh position={[0, 0.12, 0]} receiveShadow><cylinderGeometry args={[2.1, 2.4, 0.24, 32]} /><meshStandardMaterial color="#263644" metalness={0.7} roughness={0.4} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.26, 0]}><ringGeometry args={[1.85, 1.98, 48]} /><meshBasicMaterial color={accent} transparent opacity={active ? 1 : 0.4} side={THREE.DoubleSide} /></mesh>
    {gateway ? <><mesh position={[0, 2.5, 0]}><torusGeometry args={[1.7, 0.18, 8, 48]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.7} /></mesh><mesh position={[0, 2.5, 0]}><circleGeometry args={[1.55, 48]} /><meshBasicMaterial color={accent} transparent opacity={0.13} side={THREE.DoubleSide} /></mesh></> : <>
      <mesh position={[0, 0.9, 0]} castShadow><cylinderGeometry args={[0.65, 0.95, 1.6, 6]} /><meshStandardMaterial color="#405364" metalness={0.65} roughness={0.38} /></mesh>
      <mesh position={[0, 1.8, 0]} rotation={[-0.3, 0, 0]}><boxGeometry args={[1.7, 1, 0.14]} /><meshStandardMaterial color="#162632" metalness={0.7} /></mesh>
      <mesh position={[0, 1.82, 0.09]} rotation={[-0.3, 0, 0]}><planeGeometry args={[1.4, 0.72]} /><meshBasicMaterial color={accent} transparent opacity={0.6} side={THREE.DoubleSide} /></mesh>
      <mesh ref={orb} position={[0, 3.1, 0]}><octahedronGeometry args={[0.45]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} wireframe={node.kind === 'experiment'} /></mesh>
    </>}
    <Html position={[0, gateway ? 5 : 4, 0]} center style={{ pointerEvents: 'none' }} zIndexRange={[20, 0]}><span className={`${styles.label} ${active ? styles.activeLabel : ''}`}>{visited ? '✓ ' : ''}{node.title}</span></Html>
  </group>;
}

function Reactor({ active, accent }) {
  const rings = useRef();
  useFrame((_, dt) => { rings.current.rotation.y += dt * (active ? 1.6 : 0.1); rings.current.rotation.z += dt * (active ? 0.5 : 0.03); });
  return <group position={[0, 6, -30]}>
    <mesh><icosahedronGeometry args={[1.8, 1]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 2 : 0.15} wireframe /></mesh>
    <group ref={rings}>{[0, 1, 2].map(i => <mesh key={i} rotation={[i * 0.8, i * 0.6, 0]}><torusGeometry args={[3.2 + i * 0.45, 0.055, 6, 64]} /><meshBasicMaterial color={accent} transparent opacity={active ? 0.9 : 0.25} /></mesh>)}</group>
  </group>;
}

function Scenery({ biome, colors, nodes, onWalk }) {
  const artificial = ['station', 'solar', 'circuit', 'lab'].includes(biome);
  return <>
    <color attach="background" args={['#080e1b']} />
    <fog attach="fog" args={['#080e1b', 60, 180]} />
    <ambientLight intensity={0.8} /><hemisphereLight args={['#c5dcff', colors[0], 1.6]} />
    <directionalLight position={[-25, 45, 20]} intensity={3} color={colors[2]} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-45} shadow-camera-right={45} shadow-camera-top={45} shadow-camera-bottom={-45} shadow-camera-far={120} />
    <StableStars />
    <mesh position={[0, -1.05, 0]} receiveShadow onClick={event => { event.stopPropagation(); onWalk(event.point.x, event.point.z); }}><cylinderGeometry args={[58, 61, 2, artificial ? 12 : 64]} /><meshStandardMaterial color={colors[0]} roughness={0.92} metalness={artificial ? 0.3 : 0} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}><ringGeometry args={[37.5, 37.65, 96]} /><meshBasicMaterial color={colors[2]} transparent opacity={0.55} side={THREE.DoubleSide} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[9, 0.025, 14]}><ringGeometry args={[4.6, 4.8, 64]} /><meshBasicMaterial color={colors[2]} side={THREE.DoubleSide} /></mesh>
    {nodes.filter(n => n.kind !== 'ship').map(node => {
      const length = Math.hypot(...node.position);
      return <mesh key={node.id} position={[node.position[0] / 2, 0.005, node.position[1] / 2]} rotation={[-Math.PI / 2, 0, Math.atan2(node.position[0], node.position[1])]} onClick={event => { event.stopPropagation(); onWalk(event.point.x, event.point.z); }}><planeGeometry args={[1.6, length]} /><meshStandardMaterial color={colors[1]} roughness={0.8} /></mesh>;
    })}
    {Array.from({ length: 32 }, (_, i) => {
      const angle = i * 2.399;
      const radius = 42 + i % 4 * 4;
      const h = 2 + i % 6 * 1.3;
      return <group key={i} position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]} rotation={[0, i, 0]}>
        {biome === 'garden' ? <><mesh position={[0, 1.4, 0]}><cylinderGeometry args={[0.2, 0.4, 3, 6]} /><meshStandardMaterial color="#45574c" /></mesh><mesh position={[0, 3, 0]}><icosahedronGeometry args={[1.7 + i % 3 * 0.3, 0]} /><meshStandardMaterial color={i % 2 ? '#457f71' : '#35665e'} /></mesh></> : <mesh position={[0, h / 2 - 0.1, 0]} castShadow>{artificial ? <boxGeometry args={[2, h, 2]} /> : <coneGeometry args={[2 + i % 3, h, biome === 'crystal' ? 5 : 7]} />}<meshStandardMaterial color={colors[1]} roughness={0.75} metalness={biome === 'crystal' ? 0.6 : 0.2} /></mesh>}
        {artificial && <mesh position={[0, h, 0]}><boxGeometry args={[2.05, 0.08, 2.05]} /><meshBasicMaterial color={colors[2]} /></mesh>}
      </group>;
    })}
    <mesh position={[65, 45, -115]}><sphereGeometry args={[24, 32, 24]} /><meshStandardMaterial color={colors[2]} roughness={1} /></mesh>
    <mesh position={[65, 45, -115]} rotation={[0.9, 0.2, 0.4]}><torusGeometry args={[34, 0.2, 6, 100]} /><meshBasicMaterial color={colors[2]} transparent opacity={0.35} /></mesh>
  </>;
}

function SurfaceWorld({ content, planet, input, mouse, paused, player, goal, onNear, onPosition, visited, reactor, nearby, onWalk, transition }) {
  const avatar = useRef();
  const moving = useRef(false);
  const tick = useRef(0);
  const vectors = useRef({ offset: new THREE.Vector3(), target: new THREE.Vector3() });
  const colors = palettes[content.biome];
  useFrame(({ camera }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const p = player.current;
    const keys = input.current;
    if (!paused) {
      p.yaw -= mouse.current.x * 0.003;
      p.pitch = THREE.MathUtils.clamp(p.pitch + mouse.current.y * 0.002, 0.15, 0.85);
      p.yaw += ((keys.ArrowLeft ? 1 : 0) - (keys.ArrowRight ? 1 : 0)) * dt * 1.8;
      let x = (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0);
      let z = (keys.KeyS || keys.ArrowDown ? 1 : 0) - (keys.KeyW || keys.ArrowUp ? 1 : 0);
      const manual = x !== 0 || z !== 0;
      if (manual) goal.current = null;
      if (goal.current) {
        x = goal.current.x - p.x; z = goal.current.z - p.z;
        if (Math.hypot(x, z) < 0.3) { goal.current = null; x = 0; z = 0; }
      } else if (manual) {
        const localX = x;
        x = localX * Math.cos(p.yaw) + z * Math.sin(p.yaw);
        z = z * Math.cos(p.yaw) - localX * Math.sin(p.yaw);
      }
      const length = Math.hypot(x, z);
      moving.current = length > 0;
      if (moving.current) {
        const speed = keys.ShiftLeft || keys.ShiftRight ? 8 : 4.8;
        const step = Math.min(speed * dt, length);
        const next = resolveWalk(p.x + x / length * step, p.z + z / length * step, content.nodes);
        if (goal.current && Math.hypot(next.x - p.x, next.z - p.z) < 0.001) goal.current = null;
        p.x = next.x; p.z = next.z;
        p.facing = Math.atan2(-x, -z);
      }
    } else { moving.current = false; }
    mouse.current.x = 0; mouse.current.y = 0;
    avatar.current.position.set(p.x, 0.1, p.z);
    avatar.current.rotation.y = p.facing;
    const v = vectors.current;
    v.offset.set(Math.sin(p.yaw) * 10 * Math.cos(p.pitch), 1 + Math.sin(p.pitch) * 10, Math.cos(p.yaw) * 10 * Math.cos(p.pitch));
    v.target.set(p.x, 1.2, p.z);
    camera.position.copy(v.target).add(v.offset);
    camera.lookAt(v.target);
    tick.current += dt;
    if (tick.current > 0.12) {
      tick.current = 0;
      onNear(nearestInteractable(p, content.nodes));
      onPosition({ x: p.x, z: p.z });
    }
  });
  return <>
    <Scenery biome={content.biome} colors={colors} nodes={content.nodes} onWalk={onWalk} />
    <ShipBoundary><Suspense fallback={<ShipFallback />}><DockedShip departing={transition === 'launching'} /></Suspense></ShipBoundary>
    <Html position={[9, 5, 14]} center style={{ pointerEvents: 'none' }} zIndexRange={[20, 0]}><span className={styles.label}>{content.nodes.find(n => n.id === 'ship').title}</span></Html>
    {content.nodes.filter(node => node.kind !== 'ship').map(node => <Terminal key={node.id} node={node} accent={colors[2]} active={nearby === node.id} visited={visited.includes(node.id)} />)}
    {content.biome === 'lab' && <Reactor active={reactor} accent={colors[2]} />}
    <Astronaut avatar={avatar} moving={moving} accent={planet.color} />
  </>;
}

function Information({ node, onClose, es, reactor, onReactor }) {
  const dialog = useRef();
  useEffect(() => { const el = dialog.current; el.showModal(); return () => el.close(); }, []);
  return <dialog ref={dialog} className={styles.dialog} onCancel={e => { e.preventDefault(); onClose(); }} aria-labelledby="surface-info-title">
    <div className={styles.dialogHeader}><small>{node.kind === 'gateway' ? 'PORTAL' : node.kind === 'experiment' ? 'LAB / LIVE' : 'FIELD NOTES'}</small><button autoFocus onClick={onClose} aria-label={es ? 'Cerrar información' : 'Close information'}>×</button></div>
    <h2 id="surface-info-title">{node.title}</h2><p>{node.text}</p>
    {node.tags && <div className={styles.tags}>{node.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
    {node.kind === 'experiment' && <button className={styles.action} onClick={onReactor}>{reactor ? (es ? 'Desactivar reactor' : 'Deactivate reactor') : (es ? 'Activar reactor' : 'Activate reactor')}</button>}
    {node.links?.map(link => <a key={link.href} className={styles.action} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
    {!!node.links?.length && <small>{es ? 'Se abre en otra pestaña; puedes volver aquí para seguir explorando.' : 'Opens in another tab; return here to keep exploring.'}</small>}
    <button className={styles.continue} onClick={onClose}>{es ? 'Seguir explorando' : 'Keep exploring'} →</button>
  </dialog>;
}

export default function PlanetSurface({ planet, onLaunch, journal, onDiscover }) {
  const { t, language } = useLanguage();
  const es = language === 'es';
  const content = useMemo(() => getSurfaceContent(planet, t, es), [planet, t, es]);
  const input = useRef({});
  const player = useRef({ x: SPAWN[0], z: SPAWN[1], yaw: 0, pitch: 0.2, facing: 0 });
  const goal = useRef(null);
  const [paused, setPaused] = useState(false);
  const [transition, setTransition] = useState('landing');
  const [nearby, setNearby] = useState('ship');
  const [position, setPosition] = useState({ x: SPAWN[0], z: SPAWN[1] });
  const [opened, setOpened] = useState(null);
  const [reactor, setReactor] = useState(false);
  const { surface, mouse, locked, failed, capture, release } = useMouseFlight(setPaused, { weaponsEnabled: false });
  const visited = journal[planet.name] || [];
  const blocked = paused || !!opened || !!transition;
  useEffect(() => {
    if (!transition) return;
    const timer = window.setTimeout(() => {
      if (transition === 'launching') onLaunch();
      else setTransition(null);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 1500);
    return () => window.clearTimeout(timer);
  }, [transition, onLaunch]);
  useEffect(() => {
    if (blocked) { input.current = {}; mouse.current.x = 0; mouse.current.y = 0; release(); }
  }, [blocked, release, mouse]);
  const launch = useCallback(() => { input.current = {}; goal.current = null; release(); setTransition('launching'); }, [release]);
  const interact = useCallback(() => {
    if (blocked) return;
    const id = nearestInteractable(player.current, content.nodes);
    const node = content.nodes.find(n => n.id === id);
    if (!node) return;
    if (node.kind === 'ship') { launch(); return; }
    input.current = {}; goal.current = null; release(); setOpened(node);
    onDiscover(planet.name, node.id);
  }, [blocked, content.nodes, launch, release, onDiscover, planet.name]);
  useEffect(() => {
    const down = event => {
      if (/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
      if (event.code === 'Escape' && !opened && !transition) { setPaused(true); return; }
      if (blocked || event.repeat && event.code === 'KeyE') return;
      if (event.code === 'KeyE') { event.preventDefault(); interact(); }
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight'].includes(event.code)) { event.preventDefault(); input.current[event.code] = true; }
    };
    const up = event => { delete input.current[event.code]; };
    const blur = () => { input.current = {}; setPaused(true); };
    const hidden = () => { if (document.hidden) blur(); };
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', blur); document.addEventListener('visibilitychange', hidden);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', blur); document.removeEventListener('visibilitychange', hidden); };
  }, [blocked, opened, transition, interact]);
  const walkTo = (x, z) => { if (!blocked && !locked) { const next = resolveWalk(x, z, content.nodes); goal.current = next; } };
  const walkToNode = node => {
    const [x, z] = node.position;
    const length = Math.hypot(x, z);
    walkTo(x - x / length * (node.radius + 2.5), z - z / length * (node.radius + 2.5));
  };
  const closeInfo = () => { setOpened(null); setPaused(false); };
  const control = (code, label) => <button key={code} aria-label={label} disabled={blocked} onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); goal.current = null; input.current[code] = true; }} onPointerUp={() => delete input.current[code]} onPointerCancel={() => delete input.current[code]} onLostPointerCapture={() => delete input.current[code]}>{label}</button>;
  const current = content.nodes.find(n => n.id === nearby);
  return <main className={styles.page} ref={surface} style={{ '--accent': planet.color }}>
    <SurfaceBoundary onLaunch={onLaunch}><Canvas shadows camera={{ position: [0, 8, 19], fov: 55, near: 0.1, far: 600 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }} fallback={<div className={styles.error}><p>WebGL unavailable</p><button onClick={onLaunch}>Return to orbit</button></div>}><SurfaceWorld content={content} planet={planet} input={input} mouse={mouse} paused={blocked} player={player} goal={goal} onNear={setNearby} onPosition={setPosition} visited={visited} reactor={reactor} nearby={nearby} onWalk={walkTo} transition={transition} /></Canvas></SurfaceBoundary>
    <header className={styles.header}><div><small>{es ? 'EXPEDICIÓN EN SUPERFICIE' : 'SURFACE EXPEDITION'}</small><h1>{planet.name}</h1><p>{content.subtitle}</p></div><button onClick={() => setPaused(p => !p)} disabled={!!transition || !!opened}>{paused ? (es ? 'Continuar' : 'Resume') : (es ? 'Pausa' : 'Pause')} <kbd>ESC</kbd></button></header>
    <aside className={styles.log}><small>{es ? 'PUNTOS DE INTERÉS' : 'POINTS OF INTEREST'}</small><p>{visited.length} / {content.nodes.length - 1} {es ? 'descubiertos' : 'discovered'}</p>{content.nodes.map(node => <button key={node.id} disabled={blocked || locked} onClick={() => walkToNode(node)} title={es ? 'Caminar hasta aquí' : 'Walk here'}><span>{visited.includes(node.id) ? '✓' : node.id === 'ship' ? '↑' : '◇'}</span><span>{node.title}</span><small>{Math.round(Math.hypot(position.x - node.position[0], position.z - node.position[1]))} m</small></button>)}<p>{es ? 'Elige un punto para caminar hasta él.' : 'Choose a point to walk there.'}</p></aside>
    {!blocked && <div className={styles.look}>{locked ? <span>{es ? 'Ratón: mirar · ESC: liberar cursor' : 'Mouse: look · ESC: release cursor'}</span> : <button onClick={capture}>{es ? 'Mirar con el ratón' : 'Look with the mouse'}</button>}{failed && <p>{es ? 'Arrastra el fondo para mirar o usa ← →.' : 'Drag the background to look, or use ← →.'}</p>}</div>}
    {current && !blocked && <button className={styles.interact} onClick={interact}><kbd>E</kbd><span>{current.kind === 'ship' ? (es ? 'Despegar' : 'Take off') : (es ? 'Interactuar' : 'Interact')}<strong>{current.title}</strong></span> →</button>}
    <footer className={styles.footer}><span>WASD {es ? 'Caminar' : 'Walk'} · SHIFT {es ? 'Correr' : 'Run'} · E {es ? 'Interactuar' : 'Interact'}</span><span>{es ? 'Clic en el suelo para caminar · Vuelve a la nave para despegar' : 'Click the ground to walk · Return to your ship to take off'}</span></footer>
    <nav className={styles.controls} aria-label={es ? 'Controles de superficie' : 'Surface controls'}><div>{control('KeyA', 'A')}{control('KeyW', 'W')}{control('KeyS', 'S')}{control('KeyD', 'D')}</div><div>{control('ArrowLeft', '↶')}{control('ArrowRight', '↷')}{control('ShiftLeft', es ? 'Correr' : 'Run')}</div></nav>
    {paused && !opened && !transition && <div className={styles.pause}><h2>{es ? 'Expedición en pausa' : 'Expedition paused'}</h2><button onClick={() => setPaused(false)}>{es ? 'Seguir explorando' : 'Resume exploring'}</button><button onClick={() => { player.current.x = SPAWN[0]; player.current.z = SPAWN[1]; goal.current = null; setPaused(false); }}>{es ? 'Volver a la plataforma' : 'Return to landing pad'}</button><Link to="/portfolio">View Portfolio ↗</Link></div>}
    {opened && (opened.kind === 'workshop' ? (
      <WorkshopDialog onClose={closeInfo} es={es} />
    ) : (
      <Information node={opened} onClose={closeInfo} es={es} reactor={reactor} onReactor={() => setReactor(value => !value)} />
    ))}
    {transition && <div className={styles.transition} role="status"><div className={styles.transitionRing} /><small>{transition === 'landing' ? (es ? 'ATERRIZANDO' : 'LANDING') : (es ? 'DESPEGANDO' : 'TAKING OFF')}</small><h2>{planet.name}</h2><p>{transition === 'landing' ? (es ? 'Preparando expedición en superficie' : 'Preparing surface expedition') : (es ? 'Regresando a tu posición orbital' : 'Returning to your orbital position')}</p></div>}
  </main>;
}



