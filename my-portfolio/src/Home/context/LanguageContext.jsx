import { createContext, useState, useContext, useEffect } from 'react';

const translations = {
    es: {
        hero: {
            subtitle: "Explora mi universo digital. Un sistema planetario interactivo donde cada planeta es una parte de mi trabajo.",
            howItWorks: "¿Cómo funciona?",
            ariaHowItWorks: "Cómo funciona"
        },
        tutorial: {
            shipTitle: "La Nave",
            shipDesc: "Haz clic en la nave para explorar el espacio en 3D. Pilótala y acércate a los planetas para entrar en sus páginas. Los controles están dentro del juego.",
            satelliteTitle: "El Satélite",
            satelliteDesc: "El satélite de arriba a la derecha es tu acceso rápido. Haz clic para abrir el menú y elige Sol, Portfolio, Projects, Work o Lab para ir directamente a su página. Puedes cerrar el menú con Cerrar, Esc o pulsando fuera del panel.",
            planetsTitle: "Los Planetas",
            planetsDesc: "Portfolio reúne mis trabajos y diseños; Projects, mis proyectos y SaaS; Work, mis servicios y experiencia; y Lab, mis experimentos. Haz clic en un planeta para ver su descripción y pulsa Entrar para explorar su sección.",
            sunTitle: "El Sol",
            sunDesc: "El centro de mi universo. Haz clic en el Sol para abrir su vista previa y pulsa Entrar para conocer más sobre mí. También puedes llegar desde el menú del satélite o pilotando la nave.",
            trashTitle: "Basura Espacial",
            trashDesc: "Haz clic en el asteroide de arriba a la izquierda para hacerlo explotar: reaparecerá unos segundos después. También puedes arrastrar al astronauta con el ratón o con el dedo para moverlo por la escena.",
            infobotTitle: "InfoBot",
            infobotDesc: "Tu asistente personal. Haz clic en el InfoBot flotante (esquina inferior derecha) para ver mi CV completo y descargarlo en PDF.",
            prev: "Anterior",
            "next": "Siguiente",
            understood: "Entendido"
        },
        infobot: {
            downloadPDF: "📥 Descargar PDF"
        },
        orbit: {
            portfolioDesc: "Mis trabajos, diseños y efectos.",
            projectsDesc: "Mis proyectos y SaaS que estoy creando.",
            workDesc: "Freelance, landings y curro técnico.",
            labDesc: "Pruebas, caos y experimentos.",
            sunDesc: "El centro del sistema. Aquí comienza todo."
        },
        zoom: {
            enter: "Entrar al planeta",
            close: "Cerrar"
        },
        launcher: {
            boot: "INICIANDO SISTEMA NAVE... OK",
            connect: "CONECTANDO CON SATÉLITES... OK",
            loading: "CARGANDO PLANETAS...",
            close: "Cerrar"
        },
        sun: {
            title: "NÚCLEO SOLAR - ABOUT ME",
            subtitle: "Explora mi esencia",
            back: "<< VOLVER AL HUB",
            guide: {
                title: "MAPA HUMANO",
                head: "Cabeza: Quién soy",
                throat: "Garganta: Idiomas",
                heart: "Corazón: Objetivos",
                ear: "Oreja: Contacto",
                leftHand: "Mano izquierda: Frontend",
                rightArm: "Brazo derecho: Fortalezas",
                leftFoot: "Pie izquierdo: Formación",
                rightKnee: "Rodilla derecha: Backend"
            },
            status: {
                loading: "CARGANDO DEV",
                systems: "SISTEMAS NEURALES: OK",
                contact: "PROTOCOLO DE CONTACTO: ACTIVO",
                coffee: "NIVEL DE CAFÉ: CRÍTICO"
            },
            parts: {
                head: {
                    title: "¿Quién soy?",
                    p1: "Soy <strong>Mikel Rivera</strong>, un ingeniero de software full-stack de Bilbao. Construyo productos digitales desde cero: SaaS, webs, sistemas completos y experiencias visuales cuidadas al detalle.",
                    p2: "Me muevo entre <strong>Next.js, React, Node, MySQL, Kubernetes</strong> y todo lo que implique lanzar proyectos reales, escalables y con diseño sólido.",
                    p3: "También soy fundador de <strong>Siéntame</strong> y creador de <strong>Webrior</strong>, mis dos mayores armas como desarrollador y emprendedor."
                },
                throat: {
                    title: "Idiomas",
                    l1: "🇪🇸 <strong>Español</strong> — Nativo",
                    l2: "🇬🇧 <strong>Inglés</strong> — Avanzado (C1 / B2)",
                    l3: "💻 <strong>Código</strong> — Con fluidez en varios lenguajes sin drama"
                },
                heart: {
                    title: "Mis Objetivos",
                    p1: "Quiero construir productos digitales que funcionen, enamoren y aporten valor real. Con una combinación de tecnología sólida y diseño cuidado.",
                    p2: "<strong>Ahora mismo enfocado en:</strong>",
                    l1: "Escalar <strong>Siéntame</strong> como SaaS sólido y rentable",
                    l2: "Subir de nivel Webrior con landings premium",
                    l3: "Migrar todo mi stack a <strong>Next/Nest</strong>",
                    l4: "Convertirme en un desarrollador top con arquitectura limpia"
                },
                ear: {
                    title: "Contáctame",
                    p1: "¿Proyecto, colaboración o idea? Escríbeme sin miedo.",
                    p2: "Intento contestar rápido. Si tardo, culpa del café ☕"
                },
                leftHand: {
                    title: "Herramientas Frontend",
                    p1: "<strong>Frameworks:</strong>",
                    p2: "<strong>Diseño:</strong>",
                    p3: "<strong>Mi estilo:</strong> diseño futurista, neon, limpio, animado y con mimo."
                },
                rightFoot: {
                    title: "Herramientas Backend",
                    p1: "<strong>Backend stack:</strong>",
                    p2: "<strong>Infraestructura:</strong>",
                    p3: "Soy muy de montar cosas que escalen sin drama."
                },
                leftFoot: {
                    title: "Formación Académica",
                    p1: "<strong>Educación:</strong>",
                    l1: "Grado en Ingeniería Informática",
                    p2: "<strong>Experiencia profesional:</strong>",
                    l2: "Analyst en Deloitte – SAP/ABAP + arquitectura",
                    l3: "CTO y cofundador de <strong>Siéntame</strong>",
                    l4: "Creador de <strong>Webrior</strong>",
                    p3: "Aprendiendo siempre: arquitectura, IA, diseño, cloud."
                },
                rightHand: {
                    title: "Fortalezas Personales",
                    p1: "<strong>Skills técnicas:</strong>",
                    l1: "Resolución de problemas con cabeza fría",
                    l2: "Arquitectura moderna y escalable",
                    l3: "Optimización de rendimiento web",
                    l4: "Diseño intuitivo y futurista",
                    p2: "<strong>Soft Skills:</strong>",
                    l5: "Liderazgo natural",
                    l6: "Buena comunicación y visión de producto",
                    l7: "Constancia y capacidad de trabajar duro"
                }
            }
        },
        portfolio: {
            title: "Portfolio",
            desc: "Mis trabajos, diseños y efectos."
        },
        portfolioPage: {
            title: "EXPLORACIÓN DE PORTFOLIO",
            subtitle: "Selecciona un hito temporal",
            back: "<< VOLVER AL HUB",
            preview: {
                year: "AÑO:",
                number: "Nº",
                view: "VER PROYECTO COMPLETO <<"
            },
            items: {
                portfolio1: {
                    title: "Ecosistema Financiero IA",
                    desc: "Plataforma de análisis predictivo para mercados emergentes usando TensorFlow."
                },
                portfolio2: {
                    title: "Metaverso Educativo",
                    desc: "Entorno de realidad virtual para aprendizaje colaborativo en medicina."
                },
                p3: {
                    title: "Blockchain Supply Chain",
                    desc: "Sistema de trazabilidad descentralizada para logística internacional."
                },
                p4: {
                    title: "App de Salud Holística",
                    desc: "Aplicación móvil multiplataforma con integración de IoT wearables."
                },
                p5: {
                    title: "App de Salud Holística",
                    desc: "Aplicación móvil multiplataforma con integración de IoT wearables."
                },
                p6: {
                    title: "App de Salud Holística",
                    desc: "Aplicación móvil multiplataforma con integración de IoT wearables."
                }
            }
        },
        projects: {
            title: "Proyectos",
            desc: "Mis proyectos y SaaS que estoy creando."
        },
        projectsPage: {
            title: "SELECCIONA TU DESTINO",
            back: "<< VOLVER AL SISTEMA SOLAR",
            tooltips: {
                holo: "Seleccionar Tecnología Holográfica",
                steam: "Seleccionar Industria Steampunk"
            },
            panels: {
                holo: {
                    title: "SECTOR: LANDINGS",
                    desc: "Interfaces inmersivas de alta tecnología. Acceso a galería de despliegue rápido y sistemas UX/UI avanzados.",
                    items: ["Iniciar Galería", "Protocolos UX/UI", "Sistemas React"],
                    button: "Ver Landings"
                },
                steam: {
                    title: "SECTOR: PROYECTOS",
                    desc: "Complejo industrial de desarrollo. Arquitectura de backend robusta, maquinaria de base de datos y APIs.",
                    items: ["Planos de Arquitectura", "Sala de Máquinas (Stack)", "Ingeniería Node.js"],
                    button: "Ver proyectos"
                }
            }
        },
        work: {
            title: "Trabajo",
            desc: "Freelance, landings y curro técnico."
        },
        workPage: {
            back: "<< VOLVER AL HUB",
            banner: {
                title: "METRÓPOLIS LABORAL",
                subtitle: "El origen del viaje"
            },
            items: {
                work1: {
                    role: "Desarrollador Web / Technical Web Developer",
                    desc: "Desarrollo web end-to-end en entorno presencial. Implementación de funcionalidades en WordPress, mantenimiento de plataformas internas y soporte técnico. Trabajo centrado en optimización, resolución de incidencias y desarrollo de nuevas features."
                },
                work2: {
                    role: "IT Auditor (Prácticas)",
                    desc: "Auditoría de sistemas y plataformas digitales, análisis de riesgos tecnológicos y evaluación de controles IT. Validación de integridad de datos, revisión de ciberseguridad y elaboración de informes técnicos. Trabajo directo con estándares como ISO 27001, SOC 1 y SOC 2."
                },
                work3: {
                    role: "Analyst – Enterprise Technology (SAP)",
                    desc: "Soporte técnico y funcional en soluciones SAP para clientes enterprise. Desarrollo y personalización de sistemas SAP, integración entre plataformas y participación en proyectos de transformación digital en el sector T&T. Aporto una visión híbrida entre ingeniería de software y consultoría tecnológica."
                },
                work4: {
                    role: "Full Stack Developer",
                    desc: "Desarrollo de soluciones SaaS, aplicaciones web y consultoría para pequeñas empresas y startups. Trabajo en productos propios y servicios digitales con foco en escalabilidad, UX moderna y despliegues cloud."
                }
            }
        },
        lab: {
            title: "Laboratorio",
            desc: "Pruebas, caos y experimentos."
        },
        labPage: {
            title: "LABORATORIO DE EXPERIMENTOS",
            subtitle: "Explora mis pruebas y prototipos",
            back: "<< VOLVER AL HUB",
            preview: {
                year: "AÑO:",
                number: "Nº",
                view: "VER EXPERIMENTO <<"
            },
            items: {
                lab1: {
                    title: "EXPERIMENTO ALPHA",
                    desc: "Investigación inicial sobre interfaces neuronales y su aplicación en entornos web inmersivos."
                },
                lab2: {
                    title: "PROTOTIPO BETA",
                    desc: "Desarrollo de un sistema de partículas reactivo al cursor utilizando WebGL y shaders personalizados."
                },
                lab3: {
                    title: "SISTEMA GAMMA",
                    desc: "Implementación de algoritmos genéticos para la optimización de rutas en visualizaciones de datos complejas."
                },
                lab4: {
                    title: "SISTEMA GAMMA",
                    desc: "Implementación de algoritmos genéticos para la optimización de rutas en visualizaciones de datos complejas."
                },
                lab5: {
                    title: "SISTEMA GAMMA",
                    desc: ""
                }
            }
        }
    },
    en: {
        hero: {
            subtitle: "Explore my digital universe. An interactive planetary system where each planet is a part of my work.",
            howItWorks: "How does it work?",
            ariaHowItWorks: "How it works"
        },
        tutorial: {
            shipTitle: "The Spaceship",
            shipDesc: "Click the spaceship to explore space in 3D. Pilot it toward the planets to enter their pages. The controls are shown inside the game.",
            satelliteTitle: "The Satellite",
            satelliteDesc: "The satellite at the top right is your shortcut. Click it to open the menu, then choose Sun, Portfolio, Projects, Work or Lab to go straight to its page. Close the menu with Close, Esc or a click outside the panel.",
            planetsTitle: "The Planets",
            planetsDesc: "Portfolio contains my work and designs; Projects, my projects and SaaS; Work, my services and experience; and Lab, my experiments. Click a planet to preview its description, then choose Enter to explore its section.",
            sunTitle: "The Sun",
            sunDesc: "The center of my universe. Click the Sun to open its preview, then choose Enter to learn more about me. You can also get there through the satellite menu or by piloting the spaceship.",
            trashTitle: "Space Junk",
            trashDesc: "Click the asteroid at the top left to make it explode: it reappears a few seconds later. You can also drag the astronaut with your mouse or finger to move it around the scene.",
            infobotTitle: "InfoBot",
            infobotDesc: "Your personal assistant. Click the floating InfoBot (bottom-right corner) to view my full CV and download it as PDF.",
            prev: "Previous",
            "next": "Next",
            understood: "Got it"
        },
        infobot: {
            downloadPDF: "📥 Download PDF"
        },
        orbit: {
            portfolioDesc: "My works, designs, and effects.",
            projectsDesc: "My projects and SaaS I'm building.",
            workDesc: "Freelance, landings, and technical work.",
            labDesc: "Tests, chaos, and experiments.",
            sunDesc: "The center of the system. It all starts here."
        },
        zoom: {
            enter: "Enter planet",
            close: "Close"
        },
        launcher: {
            boot: "SYSTEM BOOT... OK",
            connect: "CONNECTING SATELLITES... OK",
            loading: "LOADING PLANETS...",
            close: "Close"
        },
        sun: {
            title: "SOLAR CORE - ABOUT ME",
            subtitle: "Explore my essence",
            back: "<< BACK TO HUB",
            guide: {
                title: "HUMAN MAP",
                head: "Head: Who am I?",
                throat: "Throat: Languages",
                heart: "Heart: Objectives",
                ear: "Ear: Contact",
                leftHand: "Left Hand: Frontend",
                rightArm: "Right Arm: Strengths",
                leftFoot: "Left Foot: Education",
                rightKnee: "Right Knee: Backend"
            },
            status: {
                loading: "LOADING DEV",
                systems: "NEURAL SYSTEMS: OK",
                contact: "CONTACT PROTOCOL: ACTIVE",
                coffee: "COFFEE LEVEL: CRITICAL"
            },
            parts: {
                head: {
                    title: "Who am I?",
                    p1: "I am <strong>Mikel Rivera</strong>, a full-stack software engineer from Bilbao. I build digital products from scratch: SaaS, webs, complete systems, and detail-oriented visual experiences.",
                    p2: "I move between <strong>Next.js, React, Node, MySQL, Kubernetes</strong> and everything involved in launching real, scalable projects with solid design.",
                    p3: "I am also the founder of <strong>Siéntame</strong> and creator of <strong>Webrior</strong>, my two biggest weapons as a developer and entrepreneur."
                },
                throat: {
                    title: "Languages",
                    l1: "🇪🇸 <strong>Spanish</strong> — Native",
                    l2: "🇬🇧 <strong>English</strong> — Advanced (C1 / B2)",
                    l3: "💻 <strong>Code</strong> — Fluent in several languages without drama"
                },
                heart: {
                    title: "My Objectives",
                    p1: "I want to build digital products that work, captivate, and provide real value. With a combination of solid technology and careful design.",
                    p2: "<strong>Right now focused on:</strong>",
                    l1: "Scaling <strong>Siéntame</strong> as a solid and profitable SaaS",
                    l2: "Leveling up Webrior with premium landings",
                    l3: "Migrating my entire stack to <strong>Next/Nest</strong>",
                    l4: "Becoming a top developer with clean architecture"
                },
                ear: {
                    title: "Contact Me",
                    p1: "Project, collaboration, or idea? Write to me without fear.",
                    p2: "I try to answer fast. If I delay, blame the coffee ☕"
                },
                leftHand: {
                    title: "Frontend Tools",
                    p1: "<strong>Frameworks:</strong>",
                    p2: "<strong>Design:</strong>",
                    p3: "<strong>My style:</strong> futuristic design, neon, clean, animated, and with care."
                },
                rightFoot: {
                    title: "Backend Tools",
                    p1: "<strong>Backend stack:</strong>",
                    p2: "<strong>Infrastructure:</strong>",
                    p3: "I love building things that scale without drama."
                },
                leftFoot: {
                    title: "Academic Background",
                    p1: "<strong>Education:</strong>",
                    l1: "Degree in Computer Engineering",
                    p2: "<strong>Professional Experience:</strong>",
                    l2: "Analyst at Deloitte – SAP/ABAP + architecture",
                    l3: "CTO and Co-founder of <strong>Siéntame</strong>",
                    l4: "Creator of <strong>Webrior</strong>",
                    p3: "Always learning: architecture, AI, design, cloud."
                },
                rightHand: {
                    title: "Personal Strengths",
                    p1: "<strong>Technical Skills:</strong>",
                    l1: "Problem solving with a cool head",
                    l2: "Modern and scalable architecture",
                    l3: "Web performance optimization",
                    l4: "Intuitive and futuristic design",
                    p2: "<strong>Soft Skills:</strong>",
                    l5: "Natural leadership",
                    l6: "Good communication and product vision",
                    l7: "Constancy and capacity for hard work"
                }
            }
        },
        portfolio: {
            title: "Portfolio",
            desc: "My works, designs, and effects."
        },
        portfolioPage: {
            title: "PORTFOLIO EXPLORATION",
            subtitle: "Select a timeline milestone",
            back: "<< BACK TO HUB",
            preview: {
                year: "YEAR:",
                number: "NO.",
                view: "VIEW FULL PROJECT <<"
            },
            items: {
                portfolio1: {
                    title: "AI Financial Ecosystem",
                    desc: "Predictive analysis platform for emerging markets using TensorFlow."
                },
                portfolio2: {
                    title: "Educational Metaverse",
                    desc: "Virtual reality environment for collaborative learning in medicine."
                },
                p3: {
                    title: "Blockchain Supply Chain",
                    desc: "Decentralized traceability system for international logistics."
                },
                p4: {
                    title: "Holistic Health App",
                    desc: "Cross-platform mobile application with IoT wearables integration."
                },
                p5: {
                    title: "Holistic Health App",
                    desc: "Cross-platform mobile application with IoT wearables integration."
                },
                p6: {
                    title: "Holistic Health App",
                    desc: "Cross-platform mobile application with IoT wearables integration."
                }
            }
        },
        projects: {
            title: "Projects",
            desc: "My projects and SaaS I'm building."
        },
        projectsPage: {
            title: "SELECT YOUR DESTINATION",
            back: "<< BACK TO SOLAR SYSTEM",
            tooltips: {
                holo: "Select Holographic Technology",
                steam: "Select Steampunk Industry"
            },
            panels: {
                holo: {
                    title: "SECTOR: LANDINGS",
                    desc: "High-tech immersive interfaces. Access to rapid deployment gallery and advanced UX/UI systems.",
                    items: ["Start Gallery", "UX/UI Protocols", "React Systems"],
                    button: "View Landings"
                },
                steam: {
                    title: "SECTOR: PROJECTS",
                    desc: "Industrial development complex. Robust backend architecture, database machinery, and APIs.",
                    items: ["Architecture Blueprints", "Engine Room (Stack)", "Node.js Engineering"],
                    button: "View Projects"
                }
            }
        },
        work: {
            title: "Work",
            desc: "Freelance, landings, and technical work."
        },
        workPage: {
            back: "<< BACK TO HUB",
            banner: {
                title: "WORK METROPOLIS",
                subtitle: "The origin of the journey"
            },
            items: {
                work1: {
                    role: "Web Developer / Technical Web Developer",
                    desc: "End-to-end web development in an on-site environment. Implementation of features in WordPress, maintenance of internal platforms, and technical support. Work focused on optimization, issue resolution, and development of new features."
                },
                work2: {
                    role: "IT Auditor (Internship)",
                    desc: "Audit of digital systems and platforms, analysis of technological risks, and evaluation of IT controls. Data integrity validation, cybersecurity review, and preparation of technical reports. Direct work with standards such as ISO 27001, SOC 1, and SOC 2."
                },
                work3: {
                    role: "Analyst – Enterprise Technology (SAP)",
                    desc: "Technical and functional support in SAP solutions for enterprise clients. Development and customization of SAP systems, integration between platforms, and participation in digital transformation projects in the T&T sector. I bring a hybrid vision between software engineering and technological consulting."
                },
                work4: {
                    role: "Full Stack Developer",
                    desc: "Development of SaaS solutions, web applications, and consulting for small businesses and startups. Work on own products and digital services with a focus on scalability, modern UX, and cloud deployments."
                }
            }
        },
        lab: {
            title: "Lab",
            desc: "Tests, chaos, and experiments."
        },
        labPage: {
            title: "EXPERIMENT LABORATORY",
            subtitle: "Explore my tests and prototypes",
            back: "<< BACK TO HUB",
            preview: {
                year: "YEAR:",
                number: "NO.",
                view: "VIEW EXPERIMENT <<"
            },
            items: {
                lab1: {
                    title: "ALPHA EXPERIMENT",
                    desc: "Initial research on neural interfaces and their application in immersive web environments."
                },
                lab2: {
                    title: "BETA PROTOTYPE",
                    desc: "Development of a particle system reactive to the cursor using WebGL and custom shaders."
                },
                lab3: {
                    title: "GAMMA SYSTEM",
                    desc: "Implementation of genetic algorithms for route optimization in complex data visualizations."
                },
                lab4: {
                    title: "GAMMA SYSTEM",
                    desc: "Implementation of genetic algorithms for route optimization in complex data visualizations."
                },
                lab5: {
                    title: "GAMMA SYSTEM",
                    desc: ""
                }
            }
        }
    }
};

function detectPreferredLanguage() {
    // 1. Check URL search param (?lang=es or ?lang=en)
    if (typeof window !== 'undefined' && window.location) {
        try {
            const params = new URLSearchParams(window.location.search);
            const queryLang = params.get('lang')?.toLowerCase();
            if (queryLang === 'es' || queryLang === 'en') {
                return queryLang;
            }
        } catch {
            // Ignore URL parsing errors
        }
    }

    // 2. Check if user explicitly set a preference in localStorage
    if (typeof localStorage !== 'undefined') {
        try {
            const manualChoice = localStorage.getItem('language_manual_choice');
            const savedLang = localStorage.getItem('language');
            if (manualChoice === 'true' && (savedLang === 'es' || savedLang === 'en')) {
                return savedLang;
            }
        } catch {
            // Ignore storage errors
        }
    }

    // 3. Auto-detect from browser / OS language settings
    if (typeof navigator !== 'undefined') {
        try {
            const candidates = [];
            if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
                candidates.push(...navigator.languages);
            }
            if (navigator.language) candidates.push(navigator.language);
            if (navigator.userLanguage) candidates.push(navigator.userLanguage);
            if (navigator.browserLanguage) candidates.push(navigator.browserLanguage);

            for (const item of candidates) {
                if (!item || typeof item !== 'string') continue;
                const normalized = item.toLowerCase().trim();
                // Spanish language or co-official languages in Spain (Basque, Catalan, Galician)
                if (
                    normalized.startsWith('es') ||
                    normalized.startsWith('eu') ||
                    normalized.startsWith('ca') ||
                    normalized.startsWith('gl')
                ) {
                    return 'es';
                }
                if (normalized.startsWith('en')) {
                    return 'en';
                }
            }
        } catch {
            // Ignore detection errors
        }
    }

    // 4. Default fallback: Spanish
    return 'es';
}

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => detectPreferredLanguage());

    const setLanguage = (newLang) => {
        if (newLang === 'es' || newLang === 'en') {
            setLanguageState(newLang);
            try {
                localStorage.setItem('language', newLang);
                localStorage.setItem('language_manual_choice', 'true');
            } catch {
                // Ignore storage errors
            }
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    const t = translations[language] || translations.es;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
