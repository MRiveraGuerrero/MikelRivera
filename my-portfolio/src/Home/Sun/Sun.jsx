import React from 'react';
import { sunParts } from '../data/sunData.jsx';
import styles from './Sun.module.css';

const Sun = ({ onSelectPart, activePartId }) => {
    const containerClass = `${styles.container} ${activePartId ? styles.containerHasActive : ''}`;

    return (
        <div className={containerClass}>
            {/* Gradiente de fondo del sol */}
            <div className={styles.sunGradient}></div>

            {/* Silueta humana SVG */}
            <svg className={styles.humanSilhouette} viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
                {/* Cabeza */}
                <circle
                    cx="100"
                    cy="50"
                    r="30"
                    className={`${styles.bodyPart} ${activePartId === 'head' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'head'))}
                />

                {/* Cuello/Garganta */}
                <rect
                    x="90"
                    y="75"
                    width="20"
                    height="25"
                    className={`${styles.bodyPart} ${activePartId === 'throat' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'throat'))}
                />

                {/* Torso */}
                <ellipse
                    cx="100"
                    cy="160"
                    rx="45"
                    ry="60"
                    className={styles.torso}
                />

                {/* Corazón */}
                <path
                    d="M 100 130 C 100 120, 85 115, 85 125 C 85 130, 100 145, 100 150 C 100 145, 115 130, 115 125 C 115 115, 100 120, 100 130 Z"
                    className={`${styles.bodyPart} ${styles.heart} ${activePartId === 'heart' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'heart'))}
                />

                {/* Estómago */}
                <circle
                    cx="100"
                    cy="190"
                    r="20"
                    className={`${styles.bodyPart} ${activePartId === 'stomach' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'stomach'))}
                />

                {/* Brazo izquierdo */}
                <rect
                    x="50"
                    y="110"
                    width="15"
                    height="70"
                    rx="7"
                    className={styles.arm}
                />

                {/* Mano izquierda */}
                <circle
                    cx="57"
                    cy="190"
                    r="12"
                    className={`${styles.bodyPart} ${styles.hand} ${activePartId === 'leftHand' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'leftHand'))}
                />

                {/* Brazo derecho */}
                <rect
                    x="135"
                    y="110"
                    width="15"
                    height="70"
                    rx="7"
                    className={styles.arm}
                />

                {/* Mano derecha */}
                <circle
                    cx="143"
                    cy="190"
                    r="12"
                    className={`${styles.bodyPart} ${styles.hand} ${activePartId === 'rightHand' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'rightHand'))}
                />

                {/* Pierna izquierda */}
                <rect
                    x="75"
                    y="220"
                    width="18"
                    height="100"
                    rx="9"
                    className={styles.leg}
                />

                {/* Pie izquierdo */}
                <ellipse
                    cx="84"
                    cy="330"
                    rx="15"
                    ry="10"
                    className={`${styles.bodyPart} ${styles.foot} ${activePartId === 'leftFoot' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'leftFoot'))}
                />

                {/* Pierna derecha */}
                <rect
                    x="107"
                    y="220"
                    width="18"
                    height="100"
                    rx="9"
                    className={styles.leg}
                />

                {/* Pie derecho */}
                <ellipse
                    cx="116"
                    cy="330"
                    rx="15"
                    ry="10"
                    className={`${styles.bodyPart} ${styles.foot} ${activePartId === 'rightFoot' ? styles.partActive : ''}`}
                    onClick={() => onSelectPart(sunParts.find(p => p.id === 'rightFoot'))}
                />
            </svg>

            {/* Panel de guía */}
            <div className={styles.guidePanel}>
                <h3>MAPA HUMANO</h3>
                <ul>
                    <li><span className={styles.icon}>🧠</span> Cabeza: Quién soy</li>
                    <li><span className={styles.icon}>🗣️</span> Garganta: Idiomas</li>
                    <li><span className={styles.icon}>❤️</span> Corazón: Objetivos</li>
                    <li><span className={styles.icon}>🍽️</span> Estómago: Contacto</li>
                    <li><span className={styles.icon}>✋</span> Manos: Herramientas</li>
                    <li><span className={styles.icon}>👣</span> Pies: Conocimientos</li>
                </ul>
            </div>

            {/* Panel de estado */}
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
    );
};

export default Sun;
