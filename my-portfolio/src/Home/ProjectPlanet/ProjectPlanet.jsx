import React from 'react';
// Asegúrate de la ruta de tu imagen
import planetImage from '../assets/project-planet.png';
import styles from './ProjectPlanet.module.css';

// CAMBIO: Recibimos la nueva prop 'selectedSide'
const ProjectPlanet = ({ onSelectSide, selectedSide }) => {

    const handleSelect = (side) => {
        if (onSelectSide) {
            onSelectSide(side);
        }
    };

    // CAMBIO: Creamos clases dinámicas para el contenedor principal
    // Si selectedSide es 'holographic', añadimos la clase .leftActive, etc.
    const containerClasses = `
        ${styles.container}
        ${selectedSide === 'holographic' ? styles.leftActive : ''}
        ${selectedSide === 'steampunk' ? styles.rightActive : ''}
    `;

    return (
        // Usamos las clases dinámicas aquí
        <div className={containerClasses}>
            {/* --- ZONA DE INTERACCIÓN (HITBOXES) --- */}
            <div
                className={`${styles.hitbox} ${styles.leftHitbox}`}
                onClick={() => handleSelect('holographic')}
                title="Seleccionar Tecnología Holográfica"
            ></div>
            <div
                className={`${styles.hitbox} ${styles.rightHitbox}`}
                onClick={() => handleSelect('steampunk')}
                title="Seleccionar Industria Steampunk"
            ></div>


            {/* --- CAPA BASE --- */}
            <img
                src={planetImage}
                alt="Planeta Base Grayscale"
                className={styles.baseImage}
            />


            {/* --- CAPAS DE COLOR SUPERPUESTAS --- */}
            <div className={`${styles.colorOverlay} ${styles.leftOverlay}`}>
                <img src={planetImage} alt="Holographic Color" className={styles.overlayImage} />
            </div>

            <div className={`${styles.colorOverlay} ${styles.rightOverlay}`}>
                <img src={planetImage} alt="Steampunk Color" className={styles.overlayImage} />
            </div>
        </div>
    );
};

export default ProjectPlanet;