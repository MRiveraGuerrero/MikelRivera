import React from 'react';
// 1. IMPORTAR el hook de navegación
import { useNavigate } from 'react-router-dom'; // <--- NUEVO
import styles from './SidePanel.module.css';

const SidePanel = ({ isOpen, type, onClose }) => {
    // 2. INSTANCIAR el hook para obtener la función de navegación
    const navigate = useNavigate(); // <--- NUEVO

    const isHolo = type === 'holographic';

    const stateClass = isOpen ? styles.open : styles.closed;
    const positionClass = isHolo ? styles.holoPos : styles.steamPos;
    const typeClass = isHolo ? styles.holoType : styles.steamType;

    const panelClasses = `${styles.panel} ${positionClass} ${typeClass} ${stateClass}`;

    let content;
    // Definimos la ruta de destino según el tipo
    let destinationPath; // <--- NUEVO

    if (isHolo) {
        destinationPath = '/landings'; // <--- Define tu ruta real aquí
        content = {
            title: "SECTOR: LANDINGS",
            description: "Interfaces inmersivas de alta tecnología. Acceso a galería de despliegue rápido y sistemas UX/UI avanzados.",
            items: ["Iniciar Galería", "Protocolos UX/UI", "Sistemas React"],
            buttonText: "Ver Landings"
        };
    } else {
        destinationPath = '/projects'; // <--- Define tu ruta real aquí
        content = {
            title: "SECTOR: PROYECTOS",
            description: "Complejo industrial de desarrollo. Arquitectura de backend robusta, maquinaria de base de datos y APIs.",
            items: ["Planos de Arquitectura", "Sala de Máquinas (Stack)", "Ingeniería Node.js"],
            buttonText: "Ver proyectos"
        };
    }

    // Manejador para el click del nuevo botón
    const handleEnterClick = (e) => {
        // Evitamos que el click se propague al panel y lo cierre
        e.stopPropagation();
        console.log(`Navegando a: ${destinationPath}`);

        // 3. EJECUTAR la navegación
        navigate(destinationPath); // <--- NUEVO: ¡Aquí ocurre la magia!
    };

    return (
        <div className={panelClasses} onClick={onClose}>
            <div>
                <h2 className={styles.title}>{content.title}</h2>
                <p className={styles.description}>{content.description}</p>
                <div className={styles.list}>
                    {content.items.map((item, index) => (
                        <div key={index} className={styles.planetItem}>
                            <span> &gt;&gt; {item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- NUEVO BOTÓN --- */}
            <button className={styles.enterButton} onClick={handleEnterClick}>
                {content.buttonText}
            </button>
        </div>
    );
};

export default SidePanel;