import { useEffect, useRef } from 'react';
import { destinations } from './content';
import styles from './Journey.module.css';

export default function GalaxyMap({ onClose, onSelect, distances, selected }) {
  const dialog = useRef(null);
  useEffect(() => { const element = dialog.current; element.showModal(); return () => element.close(); }, []);
  return <dialog ref={dialog} className={styles.map} onCancel={event => { event.preventDefault(); onClose(); }} aria-labelledby="map-title">
    <div className={styles.mapHeading}><div><p className={styles.eyebrow}>NAVIGATION COMPUTER</p><h2 id="map-title">Mikel System</h2></div><button autoFocus onClick={onClose} aria-label="Close galaxy map">Close ×</button></div>
    <p>Select a destination to highlight its beacon. Fly within 35 u and press E to land and explore on foot.</p>
    <div className={styles.mapGrid}>{destinations.map((body, i) => <button key={body.name} aria-pressed={selected === i} onClick={() => onSelect(i)}><span className={styles.mapDot} style={{ background: body.color }} /><span><small>{body.type}</small><strong>{body.name}</strong></span><span>{distances[i]} u →</span></button>)}</div>
    <p>WASD / Move · Mouse / Look · SHIFT / Boost · E / Land · M / Map · ESC / Menu</p>
  </dialog>;
}

