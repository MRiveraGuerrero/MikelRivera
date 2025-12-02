export const getSunParts = (t) => [
    {
        id: 'head',
        title: t.sun.parts.head.title,
        icon: '🧠',
        position: { top: '12%', left: '53%' },
        content: (
            <div>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.head.p1 }} />
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.head.p2 }} />
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.head.p3 }} />
            </div>
        ),
        tags: ['Full-Stack', 'Creador', 'Builder']
    },

    {
        id: 'throat',
        title: t.sun.parts.throat.title,
        icon: '🗣️',
        position: { top: '30%', left: '50%' },
        content: (
            <div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.throat.l1 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.throat.l2 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.throat.l3 }} />
                </ul>
            </div>
        ),
        tags: ['Multilingüe', 'Comunicación']
    },

    {
        id: 'heart',
        title: t.sun.parts.heart.title,
        icon: '❤️',
        position: { top: '42%', left: '53%' },
        content: (
            <div>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.heart.p1 }} />
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.heart.p2 }} />
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.heart.l1 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.heart.l2 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.heart.l3 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.heart.l4 }} />
                </ul>
            </div>
        ),
        tags: ['Ambición', 'Producto', 'Impacto']
    },

    {
        id: 'stomach',
        title: t.sun.parts.ear.title,
        icon: '📧',
        position: { top: '5%', left: '39%' },
        content: (
            <div>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.ear.p1 }} />
                <div style={{ marginTop: '20px' }}>
                    <p><strong>📧 Email:</strong> mikelrg2003@gmail.com</p>
                    <p><strong>💼 LinkedIn:</strong> /in/mikelrivera</p>
                    <p><strong>🐙 GitHub:</strong> @MRiveraGuerrero</p>
                    <p><strong>🐦 Twitter:</strong> @mikelriveradev</p>
                </div>
                <p style={{ marginTop: '20px', fontSize: '0.9em', opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: t.sun.parts.ear.p2 }} />
            </div>
        ),
        tags: ['Disponible', 'Networking']
    },

    {
        id: 'leftHand',
        title: t.sun.parts.leftHand.title,
        icon: '🎨',
        position: { top: '40%', left: '20%' },
        content: (
            <div>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.leftHand.p1 }} />
                <ul>
                    <li>Next.js / React</li>
                    <li>Tailwind CSS</li>
                    <li>Vite</li>
                    <li>GSAP / Three.js</li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.leftHand.p2 }} />
                <ul>
                    <li>Figma (interfaces, wireframes, prototipos)</li>
                    <li>Photoshop / Illustrator</li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.leftHand.p3 }} />
            </div>
        ),
        tags: ['Frontend', 'UI/UX', 'Animación']
    },

    {
        id: 'rightFoot',
        title: t.sun.parts.rightFoot.title,
        icon: '⚙️',
        position: { bottom: '22%', right: '43%' },
        content: (
            <div>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.rightFoot.p1 }} />
                <ul>
                    <li>Node.js / Express</li>
                    <li>NestJS (en adopción)</li>
                    <li>MySQL / PostgreSQL</li>
                    <li>Redis</li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.rightFoot.p2 }} />
                <ul>
                    <li>Docker / Kubernetes</li>
                    <li>Railway / Vercel / AWS</li>
                    <li>NGINX, dominios, SSL</li>
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.rightFoot.p3 }} />
            </div>
        ),
        tags: ['Backend', 'DevOps', 'Escalabilidad']
    },

    {
        id: 'leftFoot',
        title: t.sun.parts.leftFoot.title,
        icon: '🎓',
        position: { bottom: '13%', left: '35%' },
        content: (
            <div>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.leftFoot.p1 }} />
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.leftFoot.l1 }} />
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.leftFoot.p2 }} />
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.leftFoot.l2 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.leftFoot.l3 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.leftFoot.l4 }} />
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.leftFoot.p3 }} />
            </div>
        ),
        tags: ['Ingeniería', 'Experiencia', 'Aprendizaje']
    },

    {
        id: 'rightHand',
        title: t.sun.parts.rightHand.title,
        icon: '💪',
        position: { top: '48%', right: '20%' },
        content: (
            <div>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.p1 }} />
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.l1 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.l2 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.l3 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.l4 }} />
                </ul>
                <p dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.p2 }} />
                <ul>
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.l5 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.l6 }} />
                    <li dangerouslySetInnerHTML={{ __html: t.sun.parts.rightHand.l7 }} />
                </ul>
            </div>
        ),
        tags: ['Product Mindset', 'Resolutivo', 'Creativo']
    }
];
