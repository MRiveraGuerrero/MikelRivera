export const sunParts = [
    {
        id: 'head',
        title: '¿Quién soy?',
        icon: '🧠',
        position: { top: '12%', left: '53%' },
        content: (
            <div>
                <p>
                    Soy <strong>Mikel Rivera</strong>, un ingeniero de software full-stack de Bilbao.
                    Construyo productos digitales desde cero: SaaS, webs, sistemas completos y
                    experiencias visuales cuidadas al detalle.
                </p>
                <p>
                    Me muevo entre <strong>Next.js, React, Node, MySQL, Kubernetes</strong> y todo lo
                    que implique lanzar proyectos reales, escalables y con diseño sólido.
                </p>
                <p>
                    También soy fundador de <strong>Siéntame</strong> y creador de
                    <strong> Webrior</strong>, mis dos mayores armas como desarrollador y emprendedor.
                </p>
            </div>
        ),
        tags: ['Full-Stack', 'Creador', 'Builder']
    },

    {
        id: 'throat',
        title: 'Idiomas',
        icon: '🗣️',
        position: { top: '30%', left: '50%' },
        content: (
            <div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>🇪🇸 <strong>Español</strong> — Nativo</li>
                    <li>🇬🇧 <strong>Inglés</strong> — Avanzado (C1 / B2)</li>
                    <li>💻 <strong>Código</strong> — Con fluidez en varios lenguajes sin drama</li>
                </ul>
            </div>
        ),
        tags: ['Multilingüe', 'Comunicación']
    },

    {
        id: 'heart',
        title: 'Mis Objetivos',
        icon: '❤️',
        position: { top: '42%', left: '53%' },
        content: (
            <div>
                <p>
                    Quiero construir productos digitales que funcionen, enamoren y aporten valor real. Con una combinación
                    de tecnología sólida y diseño cuidado.
                </p>
                <p><strong>Ahora mismo enfocado en:</strong></p>
                <ul>
                    <li>Escalar <strong>Siéntame</strong> como SaaS sólido y rentable</li>
                    <li>Subir de nivel Webrior con landings premium</li>
                    <li>Migrar todo mi stack a <strong>Next/Nest</strong></li>
                    <li>Convertirme en un desarrollador top con arquitectura limpia</li>
                </ul>
            </div>
        ),
        tags: ['Ambición', 'Producto', 'Impacto']
    },

    {
        id: 'stomach',
        title: 'Contáctame',
        icon: '📧',
        position: { top: '5%', left: '39%' },
        content: (
            <div>
                <p>¿Proyecto, colaboración o idea? Escríbeme sin miedo.</p>
                <div style={{ marginTop: '20px' }}>
                    <p><strong>📧 Email:</strong> mikelrg2003@gmail.com</p>
                    <p><strong>💼 LinkedIn:</strong> /in/mikelrivera</p>
                    <p><strong>🐙 GitHub:</strong> @MRiveraGuerrero</p>
                    <p><strong>🐦 Twitter:</strong> @mikelriveradev</p>
                </div>
                <p style={{ marginTop: '20px', fontSize: '0.9em', opacity: 0.8 }}>
                    Intento contestar rápido. Si tardo, culpa del café ☕
                </p>
            </div>
        ),
        tags: ['Disponible', 'Networking']
    },

    {
        id: 'leftHand',
        title: 'Herramientas Frontend',
        icon: '🎨',
        position: { top: '40%', left: '20%' },
        content: (
            <div>
                <p><strong>Frameworks:</strong></p>
                <ul>
                    <li>Next.js / React</li>
                    <li>Tailwind CSS</li>
                    <li>Vite</li>
                    <li>GSAP / Three.js</li>
                </ul>
                <p><strong>Diseño:</strong></p>
                <ul>
                    <li>Figma (interfaces, wireframes, prototipos)</li>
                    <li>Photoshop / Illustrator</li>
                </ul>
                <p><strong>Mi estilo:</strong> diseño futurista, neon, limpio, animado y con mimo.</p>
            </div>
        ),
        tags: ['Frontend', 'UI/UX', 'Animación']
    },

    {
        id: 'rightFoot',
        title: 'Herramientas Backend',
        icon: '⚙️',
        position: { bottom: '22%', right: '43%' },
        content: (
            <div>
                <p><strong>Backend stack:</strong></p>
                <ul>
                    <li>Node.js / Express</li>
                    <li>NestJS (en adopción)</li>
                    <li>MySQL / PostgreSQL</li>
                    <li>Redis</li>
                </ul>
                <p><strong>Infraestructura:</strong></p>
                <ul>
                    <li>Docker / Kubernetes</li>
                    <li>Railway / Vercel / AWS</li>
                    <li>NGINX, dominios, SSL</li>
                </ul>
                <p>Soy muy de montar cosas que escalen sin drama.</p>
            </div>
        ),
        tags: ['Backend', 'DevOps', 'Escalabilidad']
    },

    {
        id: 'leftFoot',
        title: 'Formación Académica',
        icon: '🎓',
        position: { bottom: '13%', left: '35%' },
        content: (
            <div>
                <p><strong>Educación:</strong></p>
                <ul>
                    <li>Grado en Ingeniería Informática</li>
                </ul>
                <p><strong>Experiencia profesional:</strong></p>
                <ul>
                    <li>Analyst en Deloitte – SAP/ABAP + arquitectura</li>
                    <li>CTO y cofundador de <strong>Siéntame</strong></li>
                    <li>Creador de <strong>Webrior</strong></li>
                </ul>
                <p>Aprendiendo siempre: arquitectura, IA, diseño, cloud.</p>
            </div>
        ),
        tags: ['Ingeniería', 'Experiencia', 'Aprendizaje']
    },

    {
        id: 'rightHand',
        title: 'Fortalezas Personales',
        icon: '💪',
        position: { top: '48%', right: '20%' },
        content: (
            <div>
                <p><strong>Skills técnicas:</strong></p>
                <ul>
                    <li>Resolución de problemas con cabeza fría</li>
                    <li>Arquitectura moderna y escalable</li>
                    <li>Optimización de rendimiento web</li>
                    <li>Diseño intuitivo y futurista</li>
                </ul>
                <p><strong>Soft Skills:</strong></p>
                <ul>
                    <li>Liderazgo natural</li>
                    <li>Buena comunicación y visión de producto</li>
                    <li>Constancia y capacidad de trabajar duro</li>
                </ul>
            </div>
        ),
        tags: ['Product Mindset', 'Resolutivo', 'Creativo']
    }
];
