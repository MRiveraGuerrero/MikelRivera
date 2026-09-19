import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';
import { SHIPS_CATALOG, getSelectedShipId, setSelectedShip, getUnlockedShips, unlockShip } from './ships';
import { UPGRADE_DEFINITIONS, getUpgrades, saveUpgrades, getCredits, saveCredits } from './upgrades';
import { playBoltPickup, playSelect, playEngage } from './soundFx';
import ProceduralShip from './ProceduralShip';
import styles from './HangarEsplanade.module.css';

function CameraLookAt() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 3.8, 0);
  }, [camera]);
  return null;
}

function TurntableDisplay({ shipConfig }) {
  const shipGroup = useRef();

  useFrame((_, dt) => {
    if (shipGroup.current) {
      shipGroup.current.rotation.y += dt * 0.45;
    }
  });

  return (
    <group ref={shipGroup} position={[0, 5.0, 0]}>
      {/* 3D Distinct Procedural Ship */}
      <ProceduralShip shipId={shipConfig.id} scale={3.8} />

      {/* Thruster Glow Cone on Turntable */}
      <mesh position={[0, 0, 2.4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.55, 2.4, 16]} />
        <meshBasicMaterial color={shipConfig.flameColor || '#00f0ff'} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function LandingEsplanadeDeck() {
  const ringRef = useRef();

  useFrame((_, dt) => {
    if (ringRef.current) ringRef.current.rotation.y += dt * 0.1;
  });

  return (
    <group position={[0, 1.6, 0]}>
      {/* Central Rotating Docking Turntable */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[16, 17.5, 1.2, 32]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Outer Esplanade Platform Deck */}
      <mesh receiveShadow position={[0, -0.7, 0]}>
        <cylinderGeometry args={[52, 56, 2.2, 48]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.35} />
      </mesh>

      {/* Concentric Illuminated Landing Strips */}
      <mesh position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[14.6, 15.6, 36]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[9.2, 9.9, 36]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer Energy Field Ring */}
      <group ref={ringRef} position={[0, 1.6, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[30, 0.18, 6, 64]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Runway Guidance Lights around turntable */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 15.2, 0.7, Math.sin(angle) * 15.2]}>
            <boxGeometry args={[0.55, 0.35, 0.55]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#fbbf24' : '#38bdf8'}
              emissive={i % 2 === 0 ? '#f59e0b' : '#0284c7'}
              emissiveIntensity={1.5}
            />
          </mesh>
        );
      })}

      {/* Docking Bay Spire Pillars */}
      {[-28, 28].map((x, xi) =>
        [-28, 28].map((z, zi) => (
          <group key={`${xi}-${zi}`} position={[x, 0, z]}>
            <mesh position={[0, 7, 0]}>
              <cylinderGeometry args={[1.3, 1.8, 14, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.3} />
            </mesh>
            <mesh position={[0, 14.6, 0]}>
              <sphereGeometry args={[0.9, 16, 12]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </group>
        ))
      )}
    </group>
  );
}

export default function HangarEsplanade({ planet, onLaunch }) {
  const { language } = useLanguage();
  const es = language === 'es';

  const [activeTab, setActiveTab] = useState('ships'); // 'ships' | 'upgrades' | 'telemetry'
  const [credits, setCreditsState] = useState(getCredits);
  const [upgrades, setUpgradesState] = useState(getUpgrades);
  const [selectedShipId, setSelectedShipIdState] = useState(getSelectedShipId);
  const [unlockedShips, setUnlockedShips] = useState(getUnlockedShips);
  const [previewShipId, setPreviewShipId] = useState(getSelectedShipId);

  const previewShip = useMemo(() => {
    return SHIPS_CATALOG.find(s => s.id === previewShipId) || SHIPS_CATALOG[0];
  }, [previewShipId]);

  useEffect(() => {
    const onCreds = (e) => setCreditsState(e.detail);
    const onUpg = (e) => setUpgradesState(e.detail);
    const onShip = (e) => setSelectedShipIdState(e.detail);
    const onUnlocked = (e) => setUnlockedShips(e.detail);
    window.addEventListener('space_flight_credits_changed', onCreds);
    window.addEventListener('space_flight_upgrades_changed', onUpg);
    window.addEventListener('space_flight_ship_changed', onShip);
    window.addEventListener('space_flight_unlocked_ships_changed', onUnlocked);
    return () => {
      window.removeEventListener('space_flight_credits_changed', onCreds);
      window.removeEventListener('space_flight_upgrades_changed', onUpg);
      window.removeEventListener('space_flight_ship_changed', onShip);
      window.removeEventListener('space_flight_unlocked_ships_changed', onUnlocked);
    };
  }, []);

  const handleEquipShip = (shipId) => {
    setSelectedShip(shipId);
    setSelectedShipIdState(shipId);
    setPreviewShipId(shipId);
    playSelect();
  };

  const handleBuyShip = (ship) => {
    if (credits < ship.price) return;
    const newCreds = credits - ship.price;
    saveCredits(newCreds);
    setCreditsState(newCreds);
    unlockShip(ship.id);
    setSelectedShip(ship.id);
    setSelectedShipIdState(ship.id);
    setPreviewShipId(ship.id);
    playBoltPickup();
  };

  const handleUpgrade = (upgradeKey) => {
    const def = UPGRADE_DEFINITIONS[upgradeKey];
    const currentLvl = upgrades[upgradeKey] || 1;
    if (currentLvl >= def.maxLevel) return;
    const cost = def.costs[currentLvl - 1];
    if (credits < cost) return;

    const newCreds = credits - cost;
    const newUpgrades = {
      ...upgrades,
      [upgradeKey]: currentLvl + 1,
    };
    saveCredits(newCreds);
    saveUpgrades(newUpgrades);
    setCreditsState(newCreds);
    setUpgradesState(newUpgrades);
    playBoltPickup();
  };

  const handleLaunch = () => {
    playEngage();
    onLaunch();
  };

  return (
    <div className={styles.container}>
      {/* 3D Esplanade Turntable Canvas — Front & Center in the top 60% */}
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 8.8, 30], fov: 46 }}>
          <CameraLookAt />
          <ambientLight intensity={0.85} />
          <directionalLight position={[15, 25, 10]} intensity={1.6} castShadow />
          <pointLight position={[0, 12, 0]} intensity={2.8} color="#fbbf24" distance={35} />
          <pointLight position={[-15, 8, 10]} intensity={1.8} color="#38bdf8" distance={30} />

          <LandingEsplanadeDeck />
          <TurntableDisplay shipConfig={previewShip} />
        </Canvas>
      </div>

      {/* Top HUD Bar */}
      <header className={styles.topBar}>
        <div className={styles.topTitle}>
          <small>{es ? 'EXOPLANETA EL TALLER · EXPLANADA DE ATRAQUE' : 'EL TALLER EXOPLANET · DOCKING ESPLANADE'}</small>
          <h1>{es ? 'Hangar & Concesionario Naval' : 'Ship Hangar & Dealership'}</h1>
        </div>
        <div className={styles.topRight}>
          <div className={styles.creditsBadge} title={es ? 'Guitones acumulados' : 'Bolts balance'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L19.7942 6.5V15.5L12 20L4.20577 15.5V6.5L12 2Z"
                stroke="#fbbf24"
                strokeWidth="2.2"
                fill="#f59e0b55"
              />
              <circle cx="12" cy="11" r="3.6" stroke="#fde047" strokeWidth="2" fill="#78350f" />
            </svg>
            <span className={styles.creditsAmount}>{credits.toLocaleString()}</span>
          </div>

          {/* Clean X button to take off into space */}
          <button
            className={styles.topCloseBtn}
            onClick={handleLaunch}
            title={es ? 'Cerrar y Despegar al Espacio (✕)' : 'Close and Launch to Orbit (✕)'}
            aria-label={es ? 'Despegar' : 'Take off'}
          >
            ✕
          </button>
        </div>
      </header>

      {/* Bottom Docked Console Panel */}
      <div className={styles.panelContainer}>
        {/* Tab Navigation */}
        <nav className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'ships' ? styles.tabBtnActive : ''}`}
            onClick={() => { setActiveTab('ships'); playSelect(); }}
          >
            <span>🚀</span>
            <span>{es ? 'Concesionario de Naves' : 'Starship Dealership'}</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'upgrades' ? styles.tabBtnActive : ''}`}
            onClick={() => { setActiveTab('upgrades'); playSelect(); }}
          >
            <span>⚡</span>
            <span>{es ? 'Banco de Mejoras' : 'Upgrades Workshop'}</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'telemetry' ? styles.tabBtnActive : ''}`}
            onClick={() => { setActiveTab('telemetry'); playSelect(); }}
          >
            <span>📊</span>
            <span>{es ? 'Especificaciones' : 'Ship Telemetry'}</span>
          </button>

          {/* Matching X button on the panel bar to take off */}
          <button
            className={styles.panelCloseBtn}
            onClick={handleLaunch}
            title={es ? 'Despegar al Espacio (✕)' : 'Launch to Orbit (✕)'}
            aria-label={es ? 'Despegar' : 'Take off'}
          >
            ✕
          </button>
        </nav>

        {/* Panel Body */}
        <div className={styles.panelBody}>
          {/* Tab 1: Comprar Naves */}
          {activeTab === 'ships' && (
            <div className={styles.shipGrid}>
              {SHIPS_CATALOG.map((ship) => {
                const isUnlocked = unlockedShips.includes(ship.id);
                const isEquipped = selectedShipId === ship.id;
                const isPreviewing = previewShipId === ship.id;
                const canAfford = credits >= ship.price;

                return (
                  <div
                    key={ship.id}
                    className={`${styles.shipCard} ${isPreviewing ? styles.shipCardSelected : ''}`}
                    onClick={() => {
                      setPreviewShipId(ship.id);
                      playSelect();
                    }}
                  >
                    <div className={styles.shipCardHeader}>
                      <div>
                        <span className={styles.shipClass}>{es ? ship.class.es : ship.class.en}</span>
                        <h3 className={styles.shipName}>{es ? ship.name.es : ship.name.en}</h3>
                      </div>
                      {isEquipped && (
                        <span className={styles.shipBadgeActive}>
                          {es ? 'EN USO' : 'ACTIVE'}
                        </span>
                      )}
                    </div>

                    <p className={styles.shipDesc}>{es ? ship.desc.es : ship.desc.en}</p>

                    <div className={styles.statList}>
                      <div className={styles.statRow}>
                        <span className={styles.statName}>{es ? 'Velocidad' : 'Speed'}</span>
                        <div className={styles.statPips}>
                          {Array.from({ length: 5 }).map((_, pi) => (
                            <div
                              key={pi}
                              className={`${styles.statPip} ${pi < ship.stats.speed ? styles.statPipFilled : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className={styles.statRow}>
                        <span className={styles.statName}>{es ? 'Blindaje' : 'Armor'}</span>
                        <div className={styles.statPips}>
                          {Array.from({ length: 5 }).map((_, pi) => (
                            <div
                              key={pi}
                              className={`${styles.statPip} ${pi < ship.stats.armor ? styles.statPipFilled : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className={styles.statRow}>
                        <span className={styles.statName}>{es ? 'Cadencia' : 'Fire Rate'}</span>
                        <div className={styles.statPips}>
                          {Array.from({ length: 5 }).map((_, pi) => (
                            <div
                              key={pi}
                              className={`${styles.statPip} ${pi < ship.stats.fireRate ? styles.statPipFilled : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className={styles.statRow}>
                        <span className={styles.statName}>{es ? 'Imán Guitones' : 'Bolt Magnet'}</span>
                        <div className={styles.statPips}>
                          {Array.from({ length: 5 }).map((_, pi) => (
                            <div
                              key={pi}
                              className={`${styles.statPip} ${pi < ship.stats.magnet ? styles.statPipFilled : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      {isEquipped ? (
                        <button className={`${styles.shipActionBtn} ${styles.shipActionEquipped}`} disabled>
                          ✓ {es ? 'EQUIPADA' : 'EQUIPPED'}
                        </button>
                      ) : isUnlocked ? (
                        <button
                          className={`${styles.shipActionBtn} ${styles.shipActionEquip}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEquipShip(ship.id);
                          }}
                        >
                          ⚡ {es ? 'EQUIPAR' : 'EQUIP'}
                        </button>
                      ) : (
                        <button
                          className={`${styles.shipActionBtn} ${styles.shipActionBuy}`}
                          disabled={!canAfford}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyShip(ship);
                          }}
                        >
                          🛒 {es ? 'COMPRAR' : 'BUY'} ({ship.price.toLocaleString()} {es ? 'G' : 'B'})
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Mejorar Nave Actual */}
          {activeTab === 'upgrades' && (
            <div className={styles.upgradesGrid}>
              {Object.values(UPGRADE_DEFINITIONS).map((def) => {
                const currentLvl = upgrades[def.id] || 1;
                const isMax = currentLvl >= def.maxLevel;
                const nextCost = isMax ? 0 : def.costs[currentLvl - 1];
                const canAfford = !isMax && credits >= nextCost;

                return (
                  <div key={def.id} className={styles.upgradeItem}>
                    <div className={styles.upgradeIcon}>{def.icon}</div>
                    <div className={styles.upgradeInfo}>
                      <h3>
                        <span>{es ? def.name.es : def.name.en}</span>
                        <small style={{ color: '#38bdf8', fontSize: '11px' }}>{def.getStat(currentLvl)}</small>
                      </h3>
                      <p>{es ? def.desc.es : def.desc.en}</p>
                      <div className={styles.upgradePips}>
                        {Array.from({ length: def.maxLevel }).map((_, i) => (
                          <div
                            key={i}
                            className={`${styles.upgradePip} ${i < currentLvl ? styles.upgradePipActive : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={styles.upgradeAction}>
                      {isMax ? (
                        <button className={`${styles.upgradeBtn} ${styles.upgradeMax}`} disabled>
                          ✓ {es ? 'MÁXIMO' : 'MAX LEVEL'}
                        </button>
                      ) : (
                        <>
                          <button
                            className={styles.upgradeBtn}
                            disabled={!canAfford}
                            onClick={() => handleUpgrade(def.id)}
                          >
                            ⚡ {es ? 'MEJORAR' : 'UPGRADE'}
                          </button>
                          <span className={styles.costText}>
                            {nextCost.toLocaleString()} {es ? 'GUITONES' : 'BOLTS'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Telemetría y Rendimiento */}
          {activeTab === 'telemetry' && (
            <div className={styles.telemetryGrid}>
              <div className={styles.telemetryCard}>
                <h4>{es ? 'Velocidad de Crucero' : 'Cruising Velocity'}</h4>
                <div className={styles.telemetryValue}>
                  {Math.round((48 + ((upgrades.thrusters || 1) - 1) * 10) * previewShip.speedMultiplier)} u/s
                </div>
                <span className={styles.telemetrySub}>
                  {es ? 'Impulso turbo postquemador: ' : 'Afterburner boost: '}
                  {Math.round((105 + ((upgrades.thrusters || 1) - 1) * 22) * previewShip.speedMultiplier)} u/s
                </span>
              </div>

              <div className={styles.telemetryCard}>
                <h4>{es ? 'Cadencia de Cañones' : 'Blaster Firing Rate'}</h4>
                <div className={styles.telemetryValue}>
                  {(1 / Math.max(0.08, 0.45 - ((upgrades.blasters || 1) - 1) * 0.08)).toFixed(1)} t/s
                </div>
                <span className={styles.telemetrySub}>
                  {es ? 'Cadencia táctica pausada' : 'Tactical paced fire rate'}
                </span>
              </div>

              <div className={styles.telemetryCard}>
                <h4>{es ? 'Radio Imán de Guitones' : 'Bolt Magnet Reach'}</h4>
                <div className={styles.telemetryValue}>
                  {((6.5 + ((upgrades.magnet || 1) - 1) * 2.8) + (previewShip.magnetBonus || 0)).toFixed(1)} m
                </div>
                <span className={styles.telemetrySub}>
                  {es ? 'Atracción gravitatoria de pernos dorados' : 'Gravitational pull for golden bolts'}
                </span>
              </div>

              <div className={styles.telemetryCard}>
                <h4>{es ? 'Blindaje de Impacto' : 'Ramming Kinetic Armor'}</h4>
                <div className={styles.telemetryValue}>
                  {Math.round((0.72 + ((upgrades.hull || 1) - 1) * 0.06) * previewShip.armorMultiplier * 100)}%
                </div>
                <span className={styles.telemetrySub}>
                  {es ? 'Inercia conservada al colisionar con asteroides y naves' : 'Momentum retained upon ramming obstacles'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
