import { useEffect, useMemo, useRef, useState } from 'react';
import { destinations } from './content';
import { playBlip, playSelect, playEngage } from '../Home/SpaceFlight/soundFx';
import styles from './GalaxyMap.module.css';

const CATEGORIES = [
  { id: 'all', label: 'All Destinations', icon: '◈' },
  { id: 'projects', label: 'Featured Projects', icon: '🪐' },
  { id: 'stations', label: 'Stations & Labs', icon: '🛰️' },
  { id: 'archive', label: 'Core & Archive', icon: '☀️' },
];

export default function GalaxyMap({
  onClose,
  onSelect,
  onEngageAutopilot,
  distances,
  selected,
  autopilotActive,
}) {
  const dialog = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [focusedIndex, setFocusedIndex] = useState(selected !== null && selected !== undefined ? selected : 0);

  useEffect(() => {
    const element = dialog.current;
    if (element && !element.open) element.showModal();
    return () => {
      if (element && element.open) element.close();
    };
  }, []);

  // Filter destinations by active category
  const filtered = useMemo(() => {
    return destinations.map((body, originalIndex) => ({
      ...body,
      originalIndex,
      distance: distances[originalIndex] || 0,
    })).filter(body => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'projects') return body.type === 'planet' && !body.name.includes('Labs');
      if (activeCategory === 'stations') return body.type === 'station' || body.name.includes('Labs');
      if (activeCategory === 'archive') return body.type === 'star' || body.type === 'moon';
      return true;
    });
  }, [activeCategory, distances]);

  const activeBody = destinations[focusedIndex] || destinations[0];
  const activeDistance = distances[focusedIndex] || 0;

  // Keyboard navigation for XMB style experience
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        e.preventDefault();
        playBlip(720, 0.05);
        const currentCatIdx = CATEGORIES.findIndex(c => c.id === activeCategory);
        const nextCatIdx = e.code === 'ArrowRight'
          ? (currentCatIdx + 1) % CATEGORIES.length
          : (currentCatIdx - 1 + CATEGORIES.length) % CATEGORIES.length;
        setActiveCategory(CATEGORIES[nextCatIdx].id);
      }

      if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
        e.preventDefault();
        playBlip(620, 0.04);
        const currentSubIdx = filtered.findIndex(b => b.originalIndex === focusedIndex);
        if (currentSubIdx === -1 && filtered.length > 0) {
          setFocusedIndex(filtered[0].originalIndex);
        } else {
          const nextSubIdx = e.code === 'ArrowDown'
            ? (currentSubIdx + 1) % filtered.length
            : (currentSubIdx - 1 + filtered.length) % filtered.length;
          setFocusedIndex(filtered[nextSubIdx].originalIndex);
        }
      }

      if (e.code === 'Enter') {
        e.preventDefault();
        playSelect();
        onSelect(focusedIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCategory, focusedIndex, filtered, onClose, onSelect]);

  const handleSelectWaypoint = (idx) => {
    playSelect();
    setFocusedIndex(idx);
    onSelect(idx);
  };

  const handleAutopilot = (idx) => {
    playEngage();
    onSelect(idx);
    if (onEngageAutopilot) {
      onEngageAutopilot(idx);
    }
    onClose();
  };

  return (
    <dialog
      ref={dialog}
      className={styles.mapDialog}
      onCancel={e => { e.preventDefault(); onClose(); }}
      aria-labelledby="map-title"
    >
      {/* HUD Header */}
      <div className={styles.mapHeader}>
        <div className={styles.mapHeaderLeft}>
          <span className={styles.sysTag}>NAV // XMB NAVIGATION COMPUTER</span>
          <h2 id="map-title">Mikel Solar System</h2>
        </div>
        <div className={styles.mapHeaderRight}>
          <span className={styles.instructionsHint}>
            [← → CATEGORY] · [↑ ↓ TARGET] · [ENTER LOCK] · [ESC EXIT]
          </span>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close Map"
          >
            ✕
          </button>
        </div>
      </div>

      {/* XMB Horizontal Category Bar */}
      <nav className={styles.categoryBar} aria-label="Destination Categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            className={`${styles.categoryTab} ${activeCategory === cat.id ? styles.categoryTabActive : ''}`}
            onClick={() => {
              playBlip(700, 0.05);
              setActiveCategory(cat.id);
            }}
          >
            <span className={styles.catIcon}>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area: Destination Selector & Telemetry Briefing */}
      <div className={styles.mapLayout}>
        {/* Destination List (Vertical Column) */}
        <div className={styles.bodyList} role="listbox">
          {filtered.map(body => {
            const isFocused = focusedIndex === body.originalIndex;
            const isSelected = selected === body.originalIndex;

            return (
              <button
                key={body.name}
                type="button"
                className={`${styles.bodyItem} ${isFocused ? styles.bodyItemFocused : ''} ${isSelected ? styles.bodyItemSelected : ''}`}
                onClick={() => handleSelectWaypoint(body.originalIndex)}
                onMouseEnter={() => {
                  if (focusedIndex !== body.originalIndex) {
                    playBlip(560, 0.03);
                    setFocusedIndex(body.originalIndex);
                  }
                }}
              >
                <span
                  className={styles.bodyBeacon}
                  style={{ backgroundColor: body.color, boxShadow: `0 0 10px ${body.color}` }}
                />
                <div className={styles.bodyInfo}>
                  <div className={styles.bodyMeta}>
                    <span className={styles.bodyType}>{body.type}</span>
                    {isSelected && <span className={styles.lockedBadge}>WAYPOINT LOCKED</span>}
                  </div>
                  <strong className={styles.bodyName}>{body.name}</strong>
                </div>
                <span className={styles.bodyDist}>{body.distance} u</span>
              </button>
            );
          })}
        </div>

        {/* Selected Destination Preview & Actions Panel */}
        <div className={styles.telemetryPanel}>
          <div className={styles.telemetryCard}>
            <div className={styles.telemetryTop}>
              <div
                className={styles.telemetryOrb}
                style={{
                  background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${activeBody.color} 50%, #080f1d 95%)`,
                  boxShadow: `0 0 35px -5px ${activeBody.color}`,
                }}
              />
              <div className={styles.telemetryTitles}>
                <span className={styles.telemetryType}>{activeBody.type.toUpperCase()}</span>
                <h3>{activeBody.name}</h3>
                <p className={styles.telemetryCategory}>{activeBody.category || 'System Anchor'}</p>
              </div>
            </div>

            <p className={styles.telemetryDesc}>
              {activeBody.description || 'Core solar structure and identity anchor of the Mikel Rivera digital universe.'}
            </p>

            <div className={styles.telemetryData}>
              <div className={styles.dataRow}>
                <span>COORDINATES</span>
                <strong>[{activeBody.position.join(', ')}]</strong>
              </div>
              <div className={styles.dataRow}>
                <span>DISTANCE TO SHIP</span>
                <strong className={styles.distanceValue}>{activeDistance} u</strong>
              </div>
              <div className={styles.dataRow}>
                <span>STATUS</span>
                <span className={activeDistance <= 35 ? styles.statusLanding : styles.statusApproach}>
                  {activeDistance <= 35 ? 'IN LANDING RANGE [E]' : 'IN ORBITAL SENSOR RANGE'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.telemetryActions}>
              <button
                type="button"
                className={styles.waypointBtn}
                onClick={() => handleSelectWaypoint(focusedIndex)}
              >
                {selected === focusedIndex ? '✓ WAYPOINT ACTIVE' : 'SET WAYPOINT BEACON'}
              </button>

              <button
                type="button"
                className={styles.autopilotBtn}
                onClick={() => handleAutopilot(focusedIndex)}
              >
                <span>🚀</span>
                <span>ENGAGE AUTOPILOT</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer controls guide */}
      <div className={styles.mapFooter}>
        <span>W/S Thrust · A/D Yaw · Mouse Steer · E Land · M Toggle Map</span>
        <button
          type="button"
          className={styles.exitBtn}
          onClick={onClose}
        >
          Resume Free Flight →
        </button>
      </div>
    </dialog>
  );
}
