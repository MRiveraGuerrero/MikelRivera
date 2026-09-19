export const SHIPS_CATALOG = [
  {
    id: 'interceptor',
    name: { es: 'Interceptor Alfa', en: 'Alpha Interceptor' },
    class: { es: 'Caza Equilibrado', en: 'Balanced Scout' },
    desc: {
      es: 'Nave naval estándar multipropósito. Ágil, maniobrable y de mantenimiento económico.',
      en: 'Standard multipurpose naval vessel. Agile, maneuverable, and low-maintenance.'
    },
    price: 0,
    speedMultiplier: 1.0,
    armorMultiplier: 1.0,
    magnetBonus: 0,
    laserColor: '#00f0ff',
    flameColor: '#00f0ff',
    hullTint: '#38bdf8',
    wingDesign: 'standard',
    stats: { speed: 3, armor: 2, fireRate: 3, magnet: 2 },
  },
  {
    id: 'valkyrie',
    name: { es: 'Valkyrie Gunship', en: 'Valkyrie Gunship' },
    class: { es: 'Acorazado Pesado', en: 'Heavy Gunship' },
    desc: {
      es: 'Chasis pesado de aleación carmesí. Diseñado para embestir asteroides y naves enemigas con brutalidad.',
      en: 'Heavy crimson alloy chassis. Engineered to ram through asteroids and enemy ships with brute force.'
    },
    price: 350,
    speedMultiplier: 1.15,
    armorMultiplier: 1.6,
    magnetBonus: 1.5,
    laserColor: '#f97316',
    flameColor: '#ef4444',
    hullTint: '#ea580c',
    wingDesign: 'heavy',
    stats: { speed: 3, armor: 5, fireRate: 4, magnet: 3 },
  },
  {
    id: 'phantom',
    name: { es: 'Phantom Dart', en: 'Phantom Dart' },
    class: { es: 'Interceptor Supersónico', en: 'Supersonic Interceptor' },
    desc: {
      es: 'Fuselaje aerodinámico furtivo con impulsores de plasma violeta. Velocidad de crucero extrema.',
      en: 'Stealth aerodynamic airframe with violet plasma drives. Extreme cruising velocity and acceleration.'
    },
    price: 750,
    speedMultiplier: 1.35,
    armorMultiplier: 1.2,
    magnetBonus: 2.0,
    laserColor: '#c084fc',
    flameColor: '#a855f7',
    hullTint: '#9333ea',
    wingDesign: 'swept',
    stats: { speed: 5, armor: 3, fireRate: 4, magnet: 3 },
  },
  {
    id: 'sovereign',
    name: { es: 'Nebula Sovereign', en: 'Nebula Sovereign' },
    class: { es: 'Nave Insignia Dorada', en: 'Golden Flagship' },
    desc: {
      es: 'Joya de la ingeniería naval enchapada en oro. Atrae guitones con un vórtice gravitatorio de alta potencia.',
      en: 'Masterpiece of naval engineering clad in gold. Sucks in bolts with a high-potency gravitational vortex.'
    },
    price: 1500,
    speedMultiplier: 1.5,
    armorMultiplier: 1.8,
    magnetBonus: 4.5,
    laserColor: '#fbbf24',
    flameColor: '#fde047',
    hullTint: '#eab308',
    wingDesign: 'flagship',
    stats: { speed: 5, armor: 5, fireRate: 5, magnet: 5 },
  },
];

export function getSelectedShipId() {
  try {
    const saved = localStorage.getItem('space_flight_selected_ship');
    if (saved && SHIPS_CATALOG.some(s => s.id === saved)) return saved;
  } catch {}
  return 'interceptor';
}

export function getSelectedShip() {
  const id = getSelectedShipId();
  return SHIPS_CATALOG.find(s => s.id === id) || SHIPS_CATALOG[0];
}

export function setSelectedShip(shipId) {
  try {
    localStorage.setItem('space_flight_selected_ship', shipId);
    window.dispatchEvent(new CustomEvent('space_flight_ship_changed', { detail: shipId }));
  } catch {}
}

export function getUnlockedShips() {
  try {
    const saved = localStorage.getItem('space_flight_unlocked_ships');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return ['interceptor'];
}

export function unlockShip(shipId) {
  try {
    const unlocked = getUnlockedShips();
    if (!unlocked.includes(shipId)) {
      const updated = [...unlocked, shipId];
      localStorage.setItem('space_flight_unlocked_ships', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('space_flight_unlocked_ships_changed', { detail: updated }));
    }
  } catch {}
}
