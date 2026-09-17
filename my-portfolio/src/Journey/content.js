export const projects = [
  { id: 'sientame', name: 'Siéntame', category: 'SaaS / Product', description: 'An end-to-end platform for local businesses: bookings, payments, public profiles and customer relationships.', path: 'https://sientame.com', technologies: ['React', 'Stripe'], color: '#92bfc2', position: [-65, 12, -160], radius: 18 },
  { id: 'auction', name: 'Auction Draft', category: 'Game / Multiplayer', description: 'A multiplayer drafting game built around auctions, strategy and playing together.', path: '/auctiondraft', technologies: ['Multiplayer', 'Game design'], color: '#d7aa76', position: [75, -8, -230], radius: 24 },
  { id: 'impostor', name: 'Impostor Anime', category: 'Game / Social', description: 'Anime meets social deduction. A game of hidden roles, conversation and finding the impostor.', path: '/impostor-anime', technologies: ['Social gaming', 'Mobile'], color: '#b997ff', position: [160, -40, -320], radius: 15 },
  { id: 'nfc', name: 'NFC River', category: 'Product / Connected experiences', description: 'Physical NFC products connected to digital experiences, with a storefront and a management dashboard.', path: '/nfc', technologies: ['NFC', 'Web applications'], color: '#58ddbb', position: [-140, 50, -240], radius: 16 },
];
export const destinations = [
  ...projects.map(project => ({ ...project, type: 'planet' })),
  { name: 'Mikel Rivera', type: 'star', path: '/sun', position: [0, 80, -550], radius: 42, color: '#ffbd62', model: '/models/optimized/sun.glb' },
  { name: 'Career Station', type: 'station', path: '/work-planet', position: [-170, -35, -330], radius: 22, color: '#58ddbb' },
  { name: 'Mikel Labs', type: 'planet', path: '/lab-planet', position: [180, 65, -420], radius: 22, color: '#fa8faa', model: '/models/optimized/lab-planet.glb' },
  { name: 'The Archive', type: 'moon', path: '/portfolio-planet', position: [-90, 100, -440], radius: 13, color: '#aaaac8', model: '/models/optimized/portfolio-planet.glb' },
];
