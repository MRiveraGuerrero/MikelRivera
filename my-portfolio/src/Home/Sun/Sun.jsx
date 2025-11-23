import React from 'react';
import { sunParts } from '../data/sunData.jsx';
import styles from './Sun.module.css';
import humanSilhouette from '../assets/lombax.png';

const Sun = ({ onSelectPart, activePartId }) => {
    return (
        <div className={styles.wrapper}>
            {/* Sun Background */}
            <div className={styles.sunBackground}></div>

            <div className={styles.contentContainer}>
                <div className={styles.humanContainer}>
                    <img src={humanSilhouette} alt="Human Silhouette" className={styles.silhouette} />

                    {/* Hotspots */}
                    {/* Head */}
                    <div
                        className={`${styles.hotspot} ${styles.head} ${activePartId === 'head' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'head'))}
                    >
                        <span className={styles.hotspotIcon}>🧠</span>
                    </div>

                    {/* Throat */}
                    <div
                        className={`${styles.hotspot} ${styles.throat} ${activePartId === 'throat' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'throat'))}
                    >
                        <span className={styles.hotspotIcon}>🗣️</span>
                    </div>

                    {/* Heart */}
                    <div
                        className={`${styles.hotspot} ${styles.heart} ${activePartId === 'heart' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'heart'))}
                    >
                        <span className={styles.hotspotIcon}>❤️</span>
                    </div>

                    {/* Stomach */}
                    <div
                        className={`${styles.hotspot} ${styles.stomach} ${activePartId === 'stomach' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'stomach'))}
                    >
                        <span className={styles.hotspotIcon}>📧</span>
                    </div>

                    {/* Left Hand */}
                    <div
                        className={`${styles.hotspot} ${styles.leftHand} ${activePartId === 'leftHand' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'leftHand'))}
                    >
                        <span className={styles.hotspotIcon}>🎨</span>
                    </div>

                    {/* Right Hand */}
                    <div
                        className={`${styles.hotspot} ${styles.rightHand} ${activePartId === 'rightHand' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'rightHand'))}
                    >
                        <span className={styles.hotspotIcon}>⚙️</span>
                    </div>

                    {/* Left Foot */}
                    <div
                        className={`${styles.hotspot} ${styles.leftFoot} ${activePartId === 'leftFoot' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'leftFoot'))}
                    >
                        <span className={styles.hotspotIcon}>🎓</span>
                    </div>

                    {/* Right Foot */}
                    <div
                        className={`${styles.hotspot} ${styles.rightFoot} ${activePartId === 'rightFoot' ? styles.active : ''}`}
                        onClick={() => onSelectPart(sunParts.find(p => p.id === 'rightFoot'))}
                    >
                        <span className={styles.hotspotIcon}>💪</span>
                    </div>
                </div>

                {/* Panels */}
                <div className={styles.guidePanel}>
                    <h3>MAPA HUMANO</h3>
                    <ul>
                        <li><span className={styles.icon}>🧠</span> Cabeza: Quién soy</li>
                        <li><span className={styles.icon}>🗣️</span> Garganta: Idiomas</li>
                        <li><span className={styles.icon}>❤️</span> Corazón: Objetivos</li>
                        <li><span className={styles.icon}>📧</span> Estómago: Contacto</li>
                        <li><span className={styles.icon}>✋</span> Manos: Herramientas</li>
                        <li><span className={styles.icon}>👣</span> Pies: Conocimientos</li>
                    </ul>
                </div>

                <div className={styles.statusPanel}>
                    <div className={styles.statusLine}>
                        <span className={styles.loading}>█████████░</span> CARGANDO HUMANO...
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
