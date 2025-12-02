import React from 'react';
// 1. IMPORTAR el hook de navegación
import { useNavigate } from 'react-router-dom'; // <--- NUEVO
import styles from './SidePanel.module.css';
import { useLanguage } from '../context/LanguageContext';

const SidePanel = ({ isOpen, type, onClose }) => {
    // 2. INSTANCIAR el hook para obtener la función de navegación
    const navigate = useNavigate(); // <--- NUEVO
    const { t } = useLanguage();

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
            title: t.projectsPage.panels.holo.title,
            description: t.projectsPage.panels.holo.desc,
            items: t.projectsPage.panels.holo.items,
            buttonText: t.projectsPage.panels.holo.button
        };
    } else {
        destinationPath = '/projects'; // <--- Define tu ruta real aquí
        content = {
            title: t.projectsPage.panels.steam.title,
            description: t.projectsPage.panels.steam.desc,
            items: t.projectsPage.panels.steam.items,
            buttonText: t.projectsPage.panels.steam.button
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