import { createContext, useState, useContext } from 'react';

const translations = {
    es: {
        hero: {
            subtitle: "Explora mi universo digital. Un sistema planetario interactivo donde cada planeta es una parte de mi trabajo.",
            howItWorks: "¿Cómo funciona?",
            ariaHowItWorks: "Cómo funciona"
        },
        tutorial: {
            shipTitle: "La Nave",
            shipDesc: "Tu panel de control rápido. Haz clic en la nave para desplegar un menú de acceso directo a todas las secciones sin tener que buscar los planetas.",
            planetsTitle: "Los Planetas",
            planetsDesc: "Cada planeta representa una dimensión de mi trabajo: Portfolio, Proyectos, Experiencia y Laboratorio. Haz clic para viajar y explorar.",
            sunTitle: "El Sol",
            sunDesc: "El centro de todo. Si te pierdes, el Sol siempre estará ahí. Haz clic en él para volver al inicio o conocer mi historia personal.",
            trashTitle: "Basura Espacial",
            trashDesc: "¡Diviértete! Haz clic en el satélite, el meteorito o el astronauta para descubrir interacciones ocultas.",
            prev: "Anterior",
            "next": "Siguiente",
            understood: "Entendido"
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
            shipDesc: "Your quick control panel. Click the ship to open a shortcut menu to all sections without searching for planets.",
            planetsTitle: "The Planets",
            planetsDesc: "Each planet represents a dimension of my work: Portfolio, Projects, Experience, and Lab. Click to travel and explore.",
            sunTitle: "The Sun",
            sunDesc: "The center of everything. If you get lost, the Sun will always be there. Click it to return home or learn my personal story.",
            trashTitle: "Space Junk",
            trashDesc: "Have fun! Click the satellite, asteroid, or astronaut to discover hidden interactions.",
            prev: "Previous",
            "next": "Next",
            understood: "Got it"
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
        }
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('es'); // Default to Spanish

    const t = translations[language];

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
