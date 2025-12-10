export const getLabItems = (t) => [
    {
        id: 'riveragg_',
        year: '2024',
        number: '01',
        top: '25%',
        left: '20%',
        title: 'riveragg_',
        description: 'Landing de influencer con diseño moderno y premium',
        route: '/riveragg_' // Ruta personalizada
    },
    {
        id: 'lab2',
        year: '2024',
        number: '02',
        top: '50%',
        left: '50%',
        title: t.labPage.items.lab2.title,
        description: t.labPage.items.lab2.desc,
        route: '/lab/lab2' // Ruta por defecto
    },
    {
        id: 'lab3',
        year: '2025',
        number: '03',
        top: '80%',
        left: '25%',
        title: t.labPage.items.lab3.title,
        description: t.labPage.items.lab3.desc,
        locked: true,
        route: '/lab/lab3'
    },
    {
        id: 'lab4',
        year: '2025',
        number: '04',
        top: '65%',
        left: '95%',
        title: t.labPage.items.lab4.title,
        description: t.labPage.items.lab4.desc,
        locked: true,
        route: '/lab/lab4'
    },
    {
        id: 'lab5',
        year: '2025',
        number: '05',
        top: '25%',
        left: '85%',
        title: t.labPage.items.lab5.title,
        description: t.labPage.items.lab5.desc,
        locked: true,
        route: '/lab/lab5'
    }
];
