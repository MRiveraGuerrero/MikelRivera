export const getWorkItems = (t) => [
    {
        id: 'work1',
        year: '2024–2025',
        company: 'BiSKY Team',
        role: t.workPage.items.work1.role,
        description: t.workPage.items.work1.desc,
        color: '#3a5df2' // Azul (tu paleta)
    },
    {
        id: 'work2',
        year: '2025',
        company: 'PwC · Digital Assurance',
        role: t.workPage.items.work2.role,
        description: t.workPage.items.work2.desc,
        color: '#8b5cf6' // Purple
    },
    {
        id: 'work3',
        year: '2025 - Now',
        company: 'Deloitte · Enterprise Technology (SAP)',
        role: t.workPage.items.work3.role,
        description: t.workPage.items.work3.desc,
        color: '#f59e0b' // Amber
    },
    {
        id: 'work4',
        year: 'Now',
        company: 'Freelance',
        role: t.workPage.items.work4.role,
        description: t.workPage.items.work4.desc,
        color: '#00c896' // Verde de tu paleta
    }
];
