// Anime Pack Opening TCG - Card Database and Drop Mechanics
// Original Anime Trading Card Game assets & metadata

export const RARITIES = {
  COMMON: { id: "C", name: "Común", dropRate: 0.60, color: "#94a3b8", glow: "rgba(148, 163, 184, 0.2)", badgeClass: "common" },
  RARE: { id: "R", name: "Rara", dropRate: 0.25, color: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)", badgeClass: "rare" },
  SUPER_RARE: { id: "SR", name: "Super Rara", dropRate: 0.10, color: "#eab308", glow: "rgba(234, 179, 8, 0.5)", badgeClass: "superRare" },
  ULTRA_RARE: { id: "UR", name: "Ultra Rara", dropRate: 0.04, color: "#ec4899", glow: "rgba(236, 72, 153, 0.6)", badgeClass: "ultraRare" },
  ECLIPSE_RARE: { id: "ER", name: "Eclipse Rare", dropRate: 0.01, color: "#a855f7", glow: "rgba(168, 85, 247, 0.8)", badgeClass: "eclipseRare" },
};

export const ELEMENTS = {
  FIRE: { id: "Fuego", icon: "🔥", color: "#f97316" },
  WATER: { id: "Agua", icon: "💧", color: "#06b6d4" },
  WIND: { id: "Viento", icon: "🌪️", color: "#10b981" },
  LIGHT: { id: "Luz", icon: "✨", color: "#f59e0b" },
  SHADOW: { id: "Sombra", icon: "🌙", color: "#8b5cf6" },
};

export const BOOSTER_PACKS = [
  {
    id: "pack_genesis",
    name: "Génesis Eclipse",
    series: "Serie 1",
    description: "La colección inaugural de guerreros astrales y guardianes de las flores de cerezo.",
    cardCount: 5,
    coverColor: "linear-gradient(135deg, #ff2a75 0%, #3a0647 60%, #0c071e 100%)",
    glowColor: "rgba(255, 42, 117, 0.5)",
    icon: "🌸",
    featuredCards: ["card_er_01", "card_ur_01", "card_sr_01"]
  },
  {
    id: "pack_sombras",
    name: "Sombras de Sakura",
    series: "Serie 1",
    description: "Desbloquea espíritus oscuros y artefactos prohibidos en la penumbra del eclipse lunar.",
    cardCount: 5,
    coverColor: "linear-gradient(135deg, #8b5cf6 0%, #1e1b4b 60%, #030712 100%)",
    glowColor: "rgba(139, 92, 246, 0.5)",
    icon: "🌙",
    featuredCards: ["card_er_02", "card_ur_02", "card_sr_02"]
  },
  {
    id: "pack_estelar",
    name: "Viento Estelar",
    series: "Serie 1",
    description: "Criaturas celestiales y magos del viento del universo Sakura Eclipse.",
    cardCount: 5,
    coverColor: "linear-gradient(135deg, #06b6d4 0%, #0f172a 60%, #0284c7 100%)",
    glowColor: "rgba(6, 182, 212, 0.5)",
    icon: "💫",
    featuredCards: ["card_ur_03", "card_sr_03", "card_r_01"]
  }
];

export const SAKURA_CARDS = [
  // Eclipse Rare (ER)
  {
    id: "card_er_01",
    name: "Kaguya, Emperatriz Celesta",
    rarity: RARITIES.ECLIPSE_RARE,
    element: ELEMENTS.LIGHT,
    atk: 3200,
    def: 3000,
    lore: "Se dice que cuando el sol y la luna se alinean, su espada de luz divina puede hendir el velo entre las dimensiones.",
    expansion: "Génesis Eclipse",
    quote: "Bajo la sombra del eclipse, la luz verdadera renace.",
    svgTheme: "kaguya"
  },
  {
    id: "card_er_02",
    name: "Renzo, Devorador de Sombras",
    rarity: RARITIES.ECLIPSE_RARE,
    element: ELEMENTS.SHADOW,
    atk: 3400,
    def: 2800,
    lore: "Un antiguo caballero samurái consumido por la energía abisal de los agujeros negros del cosmos.",
    expansion: "Sombras de Sakura",
    quote: "La noche eterna reclama cada alma caída.",
    svgTheme: "renzo"
  },

  // Ultra Rare (UR)
  {
    id: "card_ur_01",
    name: "Sakura, Valkiria del Cerezo",
    rarity: RARITIES.ULTRA_RARE,
    element: ELEMENTS.WIND,
    atk: 2800,
    def: 2500,
    lore: "Comandante suprema del escuadrón de pétalos carmesí. Sus ráfagas cortan el hierro como el cristal.",
    expansion: "Génesis Eclipse",
    quote: "Mis pétalos son tan letales como bellos.",
    svgTheme: "valkiria"
  },
  {
    id: "card_ur_02",
    name: "Nox, Dragón del Eclipse Nocturno",
    rarity: RARITIES.ULTRA_RARE,
    element: ELEMENTS.SHADOW,
    atk: 2900,
    def: 2400,
    lore: "Engendrado en el corazón de un eclipse total, sus llamaradas de materia oscura aniquilan cualquier barrera.",
    expansion: "Sombras de Sakura",
    quote: "Apaga las estrellas y reina la oscuridad.",
    svgTheme: "nox"
  },
  {
    id: "card_ur_03",
    name: "Astraea, Oráculo Astral",
    rarity: RARITIES.ULTRA_RARE,
    element: ELEMENTS.LIGHT,
    atk: 2600,
    def: 2900,
    lore: "Guardiana del conocimiento cósmico. Ve el pasado, presente y futuro en el movimiento de las constelaciones.",
    expansion: "Viento Estelar",
    quote: "El destino ya está escrito en el firmamento.",
    svgTheme: "astraea"
  },

  // Super Rare (SR)
  {
    id: "card_sr_01",
    name: "Akame, Asesina Llameante",
    rarity: RARITIES.SUPER_RARE,
    element: ELEMENTS.FIRE,
    atk: 2400,
    def: 1800,
    lore: "Sus katanas gemelas están forjadas con el fuego de una estrella moribunda.",
    expansion: "Génesis Eclipse",
    quote: "Un solo destello bastará.",
    svgTheme: "akame"
  },
  {
    id: "card_sr_02",
    name: "Kitsune de Nueve Colas Sombrías",
    rarity: RARITIES.SUPER_RARE,
    element: ELEMENTS.SHADOW,
    atk: 2200,
    def: 2300,
    lore: "Espíritu místico con la capacidad de tejer ilusiones e invocar fuego fauto abisal.",
    expansion: "Sombras de Sakura",
    quote: "No todo lo que ves es realidad.",
    svgTheme: "kitsune"
  },
  {
    id: "card_sr_03",
    name: "Leviathan del Océano Cosmos",
    rarity: RARITIES.SUPER_RARE,
    element: ELEMENTS.WATER,
    atk: 2500,
    def: 2600,
    lore: "Navega por los mares interestelares creando maremotos de plasma azul.",
    expansion: "Viento Estelar",
    quote: "Las profundidades del abismo te reclaman.",
    svgTheme: "leviathan"
  },

  // Rare (R)
  {
    id: "card_r_01",
    name: "Ronin Ventisca",
    rarity: RARITIES.RARE,
    element: ELEMENTS.WIND,
    atk: 1900,
    def: 1600,
    lore: "Guerrero errante que vaga por los picos nevados del planeta Sakura.",
    expansion: "Génesis Eclipse",
    quote: "La brisa precede a la tempestad.",
    svgTheme: "ronin"
  },
  {
    id: "card_r_02",
    name: "Hechicero de las Gemas de Plasma",
    rarity: RARITIES.RARE,
    element: ELEMENTS.FIRE,
    atk: 1850,
    def: 1700,
    lore: "Canaliza cristales estelares para potenciar los hechizos ofensivos del escuadrón.",
    expansion: "Sombras de Sakura",
    quote: "La energía cósmica obedece mi llamado.",
    svgTheme: "hechicero"
  },
  {
    id: "card_r_03",
    name: "Guardián de la Puerta Torii Solar",
    rarity: RARITIES.RARE,
    element: ELEMENTS.LIGHT,
    atk: 1500,
    def: 2200,
    lore: "Escudo inquebrantable que custodia el santuario flotante de las flores eternas.",
    expansion: "Viento Estelar",
    quote: "Nadie cruzará este umbral sagrado.",
    svgTheme: "torii"
  },

  // Common (C)
  {
    id: "card_c_01",
    name: "Recluta de la Rosa Estelar",
    rarity: RARITIES.COMMON,
    element: ELEMENTS.FIRE,
    atk: 1200,
    def: 1100,
    lore: "Joven cadete en formación para las fuerzas defensivas del eclipse.",
    expansion: "Génesis Eclipse",
    quote: "¡Demostraré mi valor en la vanguardia!",
    svgTheme: "recluta"
  },
  {
    id: "card_c_02",
    name: "Espíritu de Pétalo Flotante",
    rarity: RARITIES.COMMON,
    element: ELEMENTS.WIND,
    atk: 800,
    def: 1400,
    lore: "Pequeñas criaturas místicas que reconfortan a los aliados heridos en batalla.",
    expansion: "Génesis Eclipse",
    quote: "Suave danza al compás del viento.",
    svgTheme: "petalo"
  },
  {
    id: "card_c_03",
    name: "Centinela Sombrío Menor",
    rarity: RARITIES.COMMON,
    element: ELEMENTS.SHADOW,
    atk: 1400,
    def: 900,
    lore: "Sombra autónoma utilizada para labores de exploración y vigilancia nocturna.",
    expansion: "Sombras de Sakura",
    quote: "Vigilamos desde la penumbra.",
    svgTheme: "centinela"
  },
  {
    id: "card_c_04",
    name: "Gota de Cristal Estelar",
    rarity: RARITIES.COMMON,
    element: ELEMENTS.WATER,
    atk: 1000,
    def: 1300,
    lore: "Condensación pura de vapor estelar con facultades curativas.",
    expansion: "Viento Estelar",
    quote: "Un destello refrescante en la inmensidad.",
    svgTheme: "gota"
  }
];

// Helper algorithm to roll a card pack based on probability weights
export function rollBoosterPack(_packId = "pack_genesis", count = 5) {
  const cardsInPack = [];
  
  for (let i = 0; i < count; i++) {
    const isGuaranteedSlot = i === count - 1;
    let rarityRoll = Math.random();

    let targetRarity = RARITIES.COMMON;
    
    if (isGuaranteedSlot) {
      if (rarityRoll < 0.05) targetRarity = RARITIES.ECLIPSE_RARE;
      else if (rarityRoll < 0.15) targetRarity = RARITIES.ULTRA_RARE;
      else if (rarityRoll < 0.35) targetRarity = RARITIES.SUPER_RARE;
      else targetRarity = RARITIES.RARE;
    } else {
      if (rarityRoll < 0.01) targetRarity = RARITIES.ECLIPSE_RARE;
      else if (rarityRoll < 0.05) targetRarity = RARITIES.ULTRA_RARE;
      else if (rarityRoll < 0.15) targetRarity = RARITIES.SUPER_RARE;
      else if (rarityRoll < 0.40) targetRarity = RARITIES.RARE;
      else targetRarity = RARITIES.COMMON;
    }

    const matchingCards = SAKURA_CARDS.filter(c => c.rarity.id === targetRarity.id);
    const selected = matchingCards[Math.floor(Math.random() * matchingCards.length)] || SAKURA_CARDS[0];

    cardsInPack.push({
      ...selected,
      instanceId: `${selected.id}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      obtainedAt: new Date().toISOString()
    });
  }

  return cardsInPack;
}
