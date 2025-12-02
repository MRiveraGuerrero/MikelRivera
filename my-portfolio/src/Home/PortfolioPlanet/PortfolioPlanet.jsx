import React from 'react';
import planetImage from '../assets/portfolio-planet.png'; // Asegura la ruta
import { getPortfolioItems } from '../data/portfolioItems';
import styles from './PortfolioPlanet.module.css';
import { useLanguage } from '../context/LanguageContext';

const PortfolioPlanet = ({ onSelectItem, activeItemId }) => {
    const { t } = useLanguage();
    const portfolioItems = getPortfolioItems(t);

    const containerClass = `${styles.container} ${activeItemId ? styles.containerHasActive : ''}`;

    return (
        <div className={containerClass}>
            {/* Imagen base del planeta */}
            <img
                src={planetImage}
                alt="Planeta Portfolio Morado"
                className={styles.baseImage}
            />

            {/* Mapeamos los ítems para crear los puntos interactivos */}
            {portfolioItems.map((item) => {
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

export default PortfolioPlanet;