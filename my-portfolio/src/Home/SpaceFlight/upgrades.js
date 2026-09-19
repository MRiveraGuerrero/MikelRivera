export const UPGRADE_DEFINITIONS = {
  thrusters: {
    id: 'thrusters',
    icon: '🚀',
    name: { es: 'Propulsores Turbo', en: 'Turbo Thrusters' },
    desc: {
      es: 'Aumenta la velocidad normal de vuelo y la aceleración turbo.',
      en: 'Increases normal flight cruise speed and turbo afterburner thrust.'
    },
    maxLevel: 5,
    costs: [50, 120, 280, 600, 1300],
    getStat: (lvl) => `${48 + (lvl - 1) * 10} / ${105 + (lvl - 1) * 22} u/s`,
  },
  blasters: {
    id: 'blasters',
    icon: '⚡',
    name: { es: 'Cañones de Plasma', en: 'Dual Plasma Blasters' },
    desc: {
      es: 'Aumenta la cadencia de disparo y la velocidad de los proyectiles.',
      en: 'Increases fire rate frequency and plasma projectile velocity.'
    },
    maxLevel: 5,
    costs: [60, 150, 320, 700, 1500],
    getStat: (lvl) => `${(1 / Math.max(0.08, 0.45 - (lvl - 1) * 0.08)).toFixed(1)} disparos/s`,
  },
  magnet: {
    id: 'magnet',
    icon: '🧲',
    name: { es: 'Imán de Guitones', en: 'Bolt Magnet Collector' },
    desc: {
      es: 'Amplía el alcance gravitatorio para absorber guitones lejanos más rápido.',
      en: 'Expands gravitational field to pull and absorb distant bolts faster.'
    },
    maxLevel: 5,
    costs: [40, 100, 240, 500, 1100],
    getStat: (lvl) => `+${(lvl - 1) * 35}% alcance`,
  },
  hull: {
    id: 'hull',
    icon: '🛡️',
    name: { es: 'Blindaje de Ariete', en: 'Ramming Shield Armor' },
    desc: {
      es: 'Refuerzo para colisionar y destruir asteroides y naves sin perder inercia.',
      en: 'Reinforced plating to ram and obliterate asteroids and ships without momentum loss.'
    },
    maxLevel: 5,
    costs: [50, 130, 270, 580, 1250],
    getStat: (lvl) => `Blindaje Lvl ${lvl}`,
  },
};

export function getUpgrades() {
  try {
    const saved = localStorage.getItem('space_flight_upgrades');
    if (saved) {
      return { thrusters: 1, blasters: 1, magnet: 1, hull: 1, ...JSON.parse(saved) };
    }
  } catch {}
  return { thrusters: 1, blasters: 1, magnet: 1, hull: 1 };
}

export function saveUpgrades(upgrades) {
  try {
    localStorage.setItem('space_flight_upgrades', JSON.stringify(upgrades));
    window.dispatchEvent(new CustomEvent('space_flight_upgrades_changed', { detail: upgrades }));
  } catch {}
}

export function getCredits() {
  try {
    const saved = localStorage.getItem('space_flight_credits');
    return saved ? parseInt(saved, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveCredits(amount) {
  try {
    localStorage.setItem('space_flight_credits', amount.toString());
    window.dispatchEvent(new CustomEvent('space_flight_credits_changed', { detail: amount }));
  } catch {}
}
