import React, { useState, useEffect } from 'react';
import { UPGRADE_DEFINITIONS, getUpgrades, saveUpgrades, getCredits, saveCredits } from './upgrades';
import { playBoltPickup, playSelect } from './soundFx';
import styles from './WorkshopDialog.module.css';

export default function WorkshopDialog({ onClose, es = true, onUpgradePurchased }) {
  const [credits, setCreditsState] = useState(getCredits);
  const [upgrades, setUpgradesState] = useState(getUpgrades);
  const [recentUpgrade, setRecentUpgrade] = useState(null);

  useEffect(() => {
    const handleCredits = (e) => setCreditsState(e.detail);
    const handleUpgrades = (e) => setUpgradesState(e.detail);
    window.addEventListener('space_flight_credits_changed', handleCredits);
    window.addEventListener('space_flight_upgrades_changed', handleUpgrades);
    return () => {
      window.removeEventListener('space_flight_credits_changed', handleCredits);
      window.removeEventListener('space_flight_upgrades_changed', handleUpgrades);
    };
  }, []);

  const handlePurchase = (upgradeKey) => {
    const def = UPGRADE_DEFINITIONS[upgradeKey];
    const currentLvl = upgrades[upgradeKey] || 1;
    if (currentLvl >= def.maxLevel) return;

    const cost = def.costs[currentLvl - 1];
    if (credits < cost) return;

    const newCredits = credits - cost;
    const newUpgrades = {
      ...upgrades,
      [upgradeKey]: currentLvl + 1,
    };

    saveCredits(newCredits);
    saveUpgrades(newUpgrades);
    setCreditsState(newCredits);
    setUpgradesState(newUpgrades);
    setRecentUpgrade(upgradeKey);

    playBoltPickup();
    if (onUpgradePurchased) onUpgradePurchased(upgradeKey, newUpgrades[upgradeKey]);
    setTimeout(() => setRecentUpgrade(null), 800);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <small>{es ? 'EXOPLANETA EL TALLER · INGENIERÍA' : 'EL TALLER EXOPLANET · ENGINEERING'}</small>
            <h2>{es ? 'Taller de Mejoras Navales' : 'Starship Upgrade Workshop'}</h2>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.creditsBalance} title={es ? 'Guitones acumulados' : 'Accumulated bolts'}>
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
            <button className={styles.closeBtn} onClick={onClose} aria-label={es ? 'Cerrar' : 'Close'}>
              ×
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {Object.values(UPGRADE_DEFINITIONS).map((def) => {
            const currentLvl = upgrades[def.id] || 1;
            const isMax = currentLvl >= def.maxLevel;
            const nextCost = isMax ? 0 : def.costs[currentLvl - 1];
            const canAfford = !isMax && credits >= nextCost;

            return (
              <div key={def.id} className={styles.card}>
                <div className={styles.cardIcon}>
                  <span>{def.icon}</span>
                </div>
                <div className={styles.cardDetails}>
                  <h3>
                    <span>{es ? def.name.es : def.name.en}</span>
                    <span className={styles.statBadge}>{def.getStat(currentLvl)}</span>
                  </h3>
                  <p className={styles.cardDesc}>{es ? def.desc.es : def.desc.en}</p>
                  <div className={styles.tierPips}>
                    {Array.from({ length: def.maxLevel }).map((_, i) => (
                      <div
                        key={i}
                        className={`${styles.pip} ${i < currentLvl ? styles.pipActive : ''}`}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.cardAction}>
                  {isMax ? (
                    <button className={`${styles.upgradeBtn} ${styles.maxedBtn}`} disabled>
                      ✓ {es ? 'MÁXIMO' : 'MAX LEVEL'}
                    </button>
                  ) : (
                    <>
                      <button
                        className={styles.upgradeBtn}
                        disabled={!canAfford}
                        onClick={() => handlePurchase(def.id)}
                      >
                        ⚡ {es ? 'MEJORAR' : 'UPGRADE'}
                      </button>
                      <span className={styles.costLabel}>
                        {nextCost.toLocaleString()} {es ? 'GUITONES' : 'BOLTS'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <span className={styles.footerNote}>
            {es
              ? 'Las mejoras se aplican automáticamente a la física, armamento e imán de tu nave.'
              : 'Upgrades apply automatically to your ship velocity, blasters, and bolt magnet.'}
          </span>
          <button className={styles.doneBtn} onClick={onClose}>
            {es ? 'Aceptar' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
