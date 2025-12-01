import React from 'react';
import { sunParts } from '../data/sunData.jsx';
import styles from './Sun.module.css';


const Sun = ({ onSelectPart, activePartId }) => {
    return (
        <div className={styles.wrapper}>
            {/* Sun Background */}
            <div className={styles.sunBackground}></div>

            <div className={styles.contentContainer}>
                <div className={styles.humanContainer}>
                    <img
                        src="/assets/sun/lombax2.png"
                        className={styles.silhouette}
                    />

                    {/* Hotspots - Dynamically rendered from sunParts data */}
                    {sunParts.map((part) => (
                        <div
                            key={part.id}
                            className={`${styles.hotspot} ${activePartId === part.id ? styles.active : ''}`}
                            style={part.position}
                            onClick={() => onSelectPart(part)}
                        >
                            <span className={styles.hotspotIcon}>{part.icon}</span>
                        </div>
                    ))}
                </div>

                {/* Panels */}
                <div className={styles.guidePanel}>
                    <h3>MAPA HUMANO</h3>
                    <ul>
                        <li><span className={styles.icon}>🧠</span> Cabeza: Quién soy</li>
                        <li><span className={styles.icon}>🗣️</span> Garganta: Idiomas</li>
                        <li><span className={styles.icon}>❤️</span> Corazón: Objetivos</li>
                        <li><span className={styles.icon}>📧</span> Oreja: Contacto</li>
                        <li><span className={styles.icon}>🎨</span> Mano izquierda: Frontend</li>
                        <li><span className={styles.icon}>💪</span> Brazo derecho: Fortalezas</li>
                        <li><span className={styles.icon}>🎓</span> Pie izquierdo: Formación</li>
                        <li><span className={styles.icon}>⚙️</span> Rodilla derecha: Backend</li>
                    </ul>
                </div>

                <div className={styles.statusPanel}>
                    <div className={styles.statusLine}>
                        <span className={styles.loading}>CARGANDO DEV</span>
                    </div>
                    <div className={styles.statusLine}>
                        <span className={styles.ok}>✓</span> SISTEMAS NEURALES: OK
                    </div>
                    <div className={styles.statusLine}>
                        <span className={styles.ok}>✓</span> PROTOCOLO DE CONTACTO: ACTIVO
                    </div>
                    <div className={styles.statusLine}>
                        <span className={styles.warning}>!</span> NIVEL DE CAFÉ: CRÍTICO
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sun;
