import { getWorkItems } from '../data/workItems.js';

const positions = [[-9, -8], [8, -12], [17, 3], [-17, 4], [1, -23], [-22, -14]];
const projectDetails = {
  sientame: { biome: 'garden', subtitle: ['El jardín de los productos', 'The product garden'], panels: [
    ['Reservas y negocio', 'Bookings & business', 'Reservas online, calendarios y un panel Business para gestionar negocios locales.', 'Online bookings, calendars and a Business dashboard for local businesses.'],
    ['La experiencia del cliente', 'The customer experience', 'Perfiles públicos, reseñas, pagos con Stripe y herramientas de marketing conectan el negocio con sus clientes.', 'Public profiles, reviews, Stripe payments and marketing tools connect a business with its customers.'],
  ] },
  auction: { biome: 'desert', subtitle: ['La arena de las decisiones', 'The decision arena'], panels: [
    ['La partida', 'The game', 'Subastas, estrategia y elección de equipos: cada decisión cambia tu siguiente movimiento.', 'Auctions, strategy and drafting: each decision changes your next move.'],
    ['Jugar juntos', 'Playing together', 'La experiencia multijugador reúne competición y decisiones compartidas. Visita el juego para descubrir sus modos y categorías.', 'The multiplayer experience brings competition and shared decisions together. Visit the game to explore its modes and categories.'],
  ] },
  impostor: { biome: 'crystal', subtitle: ['El observatorio de las identidades', 'The identity observatory'], panels: [
    ['Identidades ocultas', 'Hidden identities', 'Anime y deducción social: conversa, interpreta las pistas y descubre quién es el impostor.', 'Anime and social deduction: talk, interpret the clues and discover the impostor.'],
    ['Una experiencia social', 'A social experience', 'Los roles ocultos convierten la conversación entre jugadores en el centro de la partida.', 'Hidden roles put the conversation between players at the center of the game.'],
  ] },
  nfc: { biome: 'circuit', subtitle: ['El puente entre dos mundos', 'The bridge between two worlds'], panels: [
    ['Del objeto a la web', 'From object to web', 'Los productos NFC conectan objetos físicos con experiencias digitales.', 'NFC products connect physical objects with digital experiences.'],
    ['El ecosistema', 'The ecosystem', 'Una tienda y un panel de gestión completan el recorrido entre el producto y su uso.', 'A storefront and a management dashboard complete the journey from the product to its use.'],
  ] },
};

export function getSurfaceContent(planet, t, es) {
  const pick = (a, b) => es ? a : b;
  const info = (id, title, text, extra = {}) => ({ id, title, text, kind: 'info', ...extra });
  let biome = 'moon';
  let subtitle;
  let nodes;
  const details = projectDetails[planet.id];
  if (details) {
    biome = details.biome;
    subtitle = pick(...details.subtitle);
    nodes = [
      info('overview', pick('El proyecto', 'The project'), planet.description, { tags: planet.technologies }),
      ...details.panels.map((panel, i) => info(`story-${i}`, pick(panel[0], panel[1]), pick(panel[2], panel[3]))),
    ];
  } else if (planet.type === 'station') {
    biome = 'station'; subtitle = pick('Corredor de trayectoria profesional', 'Career timeline concourse');
    nodes = getWorkItems(t).map(work => info(work.id, work.company, work.description, { tags: [work.year, work.role] }));
  } else if (planet.type === 'star') {
    biome = 'solar'; subtitle = pick('Observatorio solar · Mikel Rivera', 'Solar observatory · Mikel Rivera');
    nodes = [
      info('about', pick('Detrás del universo', 'Behind the universe'), pick('Soy Mikel Rivera. Construyo productos, videojuegos y experiencias digitales que conectan ingeniería de software, diseño e interacción.', 'I’m Mikel Rivera. I build products, games and digital experiences that connect software engineering, design and interaction.')),
      info('tools', pick('Mi caja de herramientas', 'My toolkit'), pick('Del frontend y la interfaz a los sistemas y los mundos interactivos.', 'From frontend interfaces to systems and interactive worlds.'), { tags: ['React', 'Next.js', 'JavaScript', 'Node.js', 'Java', 'Python', 'Three.js'] }),
      info('contact', pick('Comunicaciones', 'Communications'), pick('¿Hablamos de un proyecto? Puedes encontrarme aquí.', 'Have a project in mind? You can find me here.'), { links: [{ label: 'Email', href: 'mailto:mikelrg2003@gmail.com' }, { label: 'GitHub', href: 'https://github.com/MRiveraGuerrero' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikelrivera/' }] }),
    ];
  } else if (planet.name === 'Mikel Labs') {
    biome = 'lab'; subtitle = pick('Instalaciones experimentales', 'Experimental facilities');
    nodes = [
      info('lab', 'Mikel Labs', pick('Un espacio para explorar interfaces, experiencias visuales y nuevas ideas. Este universo también forma parte del laboratorio.', 'A space for exploring interfaces, visual experiences and new ideas. This universe is also part of the laboratory.')),
      info('reactor', pick('Reactor orbital', 'Orbital reactor'), pick('Activa el reactor y observa cómo cambia el movimiento de sus anillos.', 'Activate the reactor and watch its rings change their motion.'), { kind: 'experiment' }),
      info('riveragg', 'riveragg_', pick('Una exploración de diseño web para una página de creador.', 'A web design exploration for a creator’s page.'), { links: [{ label: pick('Explorar página', 'Explore page'), href: '/riveragg_' }] }),
    ];
  } else if (planet.id === 'taller' || planet.name === 'El Taller') {
    biome = 'circuit';
    subtitle = pick('Hangar de Ingeniería y Taller de Mejoras', 'Engineering Hangar & Ship Upgrade Workshop');
    nodes = [
      info('overview', pick('El Taller Espacial', 'The Space Workshop'), pick('Instalación industrial orbital dedicada al ensamblaje, calibración y potenciación de módulos de combate y vuelo para tu nave.', 'Industrial orbital facility dedicated to assembling, calibrating, and empowering combat and flight modules for your ship.'), { tags: ['Ingeniería', 'Upgrades', 'Guitones Tech'] }),
      info('workshop', pick('Terminal del Taller', 'Workshop Terminal'), pick('Accede al banco de mejoras para intercambiar Guitones por propulsores turbo, cañones de plasma, imanes de recolección y blindajes.', 'Access the upgrade bank to exchange Bolts for turbo thrusters, plasma blasters, collection magnets, and hull armor.'), { kind: 'workshop' }),
      info('diagnostics', pick('Diagnóstico de Sistemas', 'Systems Diagnostics'), pick('Telemetría operativa de la nave: propulsión óptima, condensadores de plasma sincronizados y caja de pernos asegurada.', 'Operational vessel telemetry: optimal propulsion, synchronized plasma capacitors, and secured bolt storage.'), { tags: ['Status: OK', 'Overclocked', 'Sistemas 100%'] }),
    ];
  } else {
    subtitle = pick('Museo de interfaces y versiones', 'Museum of interfaces and versions');
    nodes = [
      info('first', pick('Portfolio · Primera versión', 'Portfolio · First version'), pick('Una etapa anterior de mi forma de presentar proyectos y experimentar con interfaces.', 'An earlier chapter in how I present projects and experiment with interfaces.'), { links: [{ label: pick('Abrir primera versión', 'Open first version'), href: '/portfolio/portfolio1' }] }),
      info('second', pick('Portfolio · Segunda versión', 'Portfolio · Second version'), pick('Otra forma de recorrer mi trabajo. Una pieza del archivo que puedes seguir explorando.', 'Another way to explore my work. A piece of the archive you can still visit.'), { links: [{ label: pick('Abrir segunda versión', 'Open second version'), href: '/portfolio/portfolio2' }] }),
      info('now', pick('El presente', 'The present'), pick('Dos formas de explorar el mismo trabajo: un portfolio directo y un universo interactivo.', 'Two ways to explore the same work: a direct portfolio and an interactive universe.'), { links: [{ label: 'View Portfolio', href: '/portfolio' }] }),
    ];
  }
  nodes.push(info('gateway', pick('Portal al sitio', 'Website portal'), pick('Abre la página completa en otra pestaña. Tu exploración te estará esperando aquí.', 'Open the full page in another tab. Your exploration will be waiting here.'), { kind: 'gateway', links: [{ label: pick('Abrir página', 'Open page'), href: planet.path }] }));
  nodes = nodes.map((node, i) => ({ ...node, position: positions[i], radius: 1.5 }));
  nodes.push({ id: 'ship', title: pick('Tu nave · Despegar', 'Your ship · Take off'), kind: 'ship', position: [9, 14], radius: 3.5 });
  return { biome, subtitle, nodes };
}

