import React from 'react';
import planetImage from '../assets/lab-planet.png'; // Asegura la ruta
import { labItems } from '../data/labItems';
import styles from './LabPlanet.module.css';

const LabPlanet = ({ onSelectItem, activeItemId }) => {

    const containerClass = `${styles.container} ${activeItemId ? styles.containerHasActive : ''}`;

    return (
        <div className={containerClass}>
            {/* Imagen base del planeta */}
            <img
                src={planetImage}
                alt="Planeta Laboratorio Verde"
                className={styles.baseImage}
            />

            {/* Mapeamos los ítems para crear los puntos interactivos */}
            {labItems.map((item) => {
                // Determinamos si esta piedra es la activa
                const isActive = activeItemId === item.id;
                const stoneClass = `${styles.stoneHotspot} ${isActive ? styles.stoneActive : ''}`;

                return (
                    <div
                        key={item.id}
                        className={stoneClass}
                        style={{ top: item.top, left: item.left }}
                        onClick={() => onSelectItem(item)}
                    >
                        <span className={styles.stoneYear}>{item.year}</span>
                        <span className={styles.stoneNumber}>{item.number}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default LabPlanet;