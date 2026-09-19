import { useEffect, useMemo, useRef, useState } from 'react';
import { solarBodies as destinations, orbitPoints, SYSTEM_CENTER } from './solarSystem';

const paths = destinations.map(body => orbitPoints(body));
const mapExtent = Math.max(...destinations.map(body => (body.orbit?.radius ?? 0) + body.radius)) + 120;
const initialPositions = destinations.map(body => body.position);
import { useLanguage } from '../Home/context/LanguageContext';
import { playSelect, playEngage } from '../Home/SpaceFlight/soundFx';
import styles from './GalaxyMap.module.css';

export default function GalaxyMap({ onClose, onSelect, onEngageAutopilot, distances, selected, autopilotActive, shipPosition = [0, 0, 35], bodyPositions = initialPositions }) {
  const dialog = useRef(null);
  const { language } = useLanguage();
  const es = language === 'es';
  const [focusedIndex, setFocusedIndex] = useState(selected ?? 0);
  const activeBody = destinations[focusedIndex];
  const activeDistance = distances[focusedIndex] ?? 0;
  const chart = useMemo(() => {
    // Orthographic X/Z projection, centred on the sun. Height is omitted.
    const extent = Math.max(mapExtent, Math.hypot(shipPosition[0] - SYSTEM_CENTER[0], shipPosition[2] - SYSTEM_CENTER[2]) + 120);
    const scale = 330 / extent;
    const project = position => ({ x: 400 + (position[0] - SYSTEM_CENTER[0]) * scale, y: 400 + (position[2] - SYSTEM_CENTER[2]) * scale });
    return { bodies: bodyPositions.map(project), ship: project(shipPosition), paths: paths.map(points => points.map(point => { const p = project(point); return `${p.x},${p.y}`; }).join(" ")) };
  }, [shipPosition, bodyPositions]);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    if (!element.open) element.showModal();
    return () => {
      if (element.open) element.close();
      previousFocus?.focus();
    };
  }, []);

  const markWaypoint = () => { playSelect(); onSelect(focusedIndex); };
  const engage = () => { playEngage(); onSelect(focusedIndex); onEngageAutopilot(focusedIndex); onClose(); };

  return (
    <dialog ref={dialog} className={styles.mapDialog} aria-labelledby="map-title"
      onCancel={event => { event.preventDefault(); onClose(); }}>
      <header className={styles.header}>
        <div><small>{es ? 'NAVEGACIÓN' : 'NAVIGATION'}</small><h2 id="map-title">{es ? 'Sistema solar' : 'Solar system'}</h2></div>
        <button type="button" className={styles.close} onClick={onClose} aria-label={es ? 'Cerrar mapa' : 'Close map'} autoFocus>×</button>
      </header>
      <div className={styles.layout}>
        <section className={styles.mapPanel} aria-label={es ? 'Mapa del sistema solar' : 'Solar system map'}>
          <div className={styles.mapCaption}><span>{es ? 'VISTA SUPERIOR' : 'TOP VIEW'}</span><span>{es ? 'Toca un planeta para seleccionarlo' : 'Select a planet to inspect it'}</span></div>
          <div className={styles.chart}>
            <svg viewBox="0 0 800 800" aria-hidden="true" className={styles.chartLines}>
              <defs>
                <radialGradient id="solar-glow"><stop stopColor="#ffbc66" stopOpacity=".18" /><stop offset="1" stopColor="#ffbc66" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="400" cy="400" r="130" fill="url(#solar-glow)" />
              {chart.paths.map((points, index) => points && <polyline key={index} points={points} className={styles.rangeRing} style={{ stroke: focusedIndex === index ? destinations[index].color : undefined, opacity: focusedIndex === index ? 0.65 : 1 }} />)}
              <path d="M400 35V765 M35 400H765" className={styles.axis} />
              {selected != null && <line x1={chart.ship.x} y1={chart.ship.y} x2={chart.bodies[selected].x} y2={chart.bodies[selected].y} className={styles.route} />}
            </svg>
            {destinations.map((body, index) => (
              <button key={body.name} type="button"
                className={`${styles.planet} ${focusedIndex === index ? styles.focused : ''} ${selected === index ? styles.waypoint : ''}`}
                style={{ left: `${chart.bodies[index].x / 8}%`, top: `${chart.bodies[index].y / 8}%`, '--body-color': body.color, '--body-size': `${body.type === 'star' ? 32 : Math.min(27, Math.max(14, body.radius * .3))}px` }}
                aria-label={`${body.name}${selected === index ? ' · Waypoint' : ''}`} aria-pressed={focusedIndex === index}
                onClick={() => setFocusedIndex(index)}>
                <span className={body.type === 'station' ? styles.station : styles.orb} />
                <span className={styles.planetName}>{body.name}</span>
              </button>
            ))}
            <div className={styles.ship} style={{ left: `${chart.ship.x / 8}%`, top: `${chart.ship.y / 8}%` }}>
              <span aria-hidden="true">◆</span><span>{es ? 'Tu nave' : 'Your ship'}</span>
            </div>
          </div>
          <div className={styles.legend}><span>◆ {es ? 'Tu nave' : 'Your ship'}</span><span>┄ Waypoint</span><span>{es ? 'Órbitas reales · Vista sin altura' : 'Actual orbits · Height omitted'}</span></div>
        </section>
        <aside className={styles.destinationPanel} aria-label={es ? 'Destino y navegación' : 'Destination and navigation'}>
          <label htmlFor="map-destination">{es ? 'Elige un destino' : 'Choose a destination'}</label>
          <select id="map-destination" value={focusedIndex} onChange={event => setFocusedIndex(Number(event.target.value))}>
            {destinations.map((body, index) => <option key={body.name} value={index}>{body.name}</option>)}
          </select>
          <div className={styles.destinationInfo}>
            <span className={styles.type}>{activeBody.type === 'star' ? (es ? 'ESTRELLA' : 'STAR') : activeBody.type === 'station' ? (es ? 'ESTACIÓN' : 'STATION') : activeBody.type === 'moon' ? (es ? 'LUNA' : 'MOON') : (es ? 'PLANETA' : 'PLANET')}</span>
            <h3>{activeBody.name}</h3>
            <p>{activeBody.category || (activeBody.type === 'star' ? (es ? 'El centro de este universo' : 'The centre of this universe') : (es ? 'Un destino por explorar' : 'A destination to explore'))}</p>
            <div className={styles.distance}><strong>{activeDistance} <small>u</small></strong><span>{es ? 'desde tu nave' : 'from your ship'}</span></div>
            <p className={styles.status} role="status">{selected === focusedIndex ? (es ? '✓ Waypoint marcado' : '✓ Waypoint set') : (es ? 'Destino seleccionado' : 'Destination selected')}{activeDistance <= 35 ? (es ? ' · Puedes aterrizar' : ' · Ready to land') : ''}</p>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.waypointButton} onClick={markWaypoint} disabled={selected === focusedIndex}>{selected === focusedIndex ? '✓ Waypoint' : (es ? 'Marcar waypoint' : 'Set waypoint')}</button>
            <button type="button" className={styles.autopilotButton} onClick={engage}>{es ? 'Activar piloto automático' : 'Engage autopilot'} <span aria-hidden="true">↗</span></button>
          </div>
          <p className={styles.hint}>{es ? 'El waypoint marca la ruta. El piloto automático lleva la nave al destino.' : 'A waypoint marks the route. Autopilot flies the ship to your destination.'}</p>
          {autopilotActive && <small className={styles.status}>{es ? 'Piloto automático en pausa mientras consultas el mapa.' : 'Autopilot is paused while you view the map.'}</small>}
        </aside>
      </div>
    </dialog>
  );
}
