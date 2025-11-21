import React from 'react';
import styles from './WorkNode.module.css';

const WorkNode = ({ item, onClick, isActive, alignment = 'right' }) => {
    return (
        <div
            className={`${styles.nodeContainer} ${isActive ? styles.active : ''}`}
            onClick={() => onClick(item)}
        >
            {/* Si alineación es 'right' (texto a la derecha), primero va el spacer, luego círculo, luego texto */}
            {alignment === 'right' && <div className={styles.spacer}></div>}

            {/* Si alineación es 'left' (texto a la izquierda), primero va el texto */}
            {alignment === 'left' && (
                <div className={`${styles.labelContainer} ${styles.alignRight}`}>
                    <span className={styles.year}>{item.year}</span>
                    <span className={styles.company}>{item.company}</span>
                </div>
            )}

            <div className={styles.centerContent}>
                <div className={styles.nodeCircle} style={{ borderColor: item.color }}>
                    <div className={styles.innerCore} style={{ backgroundColor: item.color }}></div>
                </div>
            </div>

            {/* Si alineación es 'right', el texto va al final */}
            {alignment === 'right' && (
                <div className={`${styles.labelContainer} ${styles.alignLeft}`}>
                    <span className={styles.year}>{item.year}</span>
                    <span className={styles.company}>{item.company}</span>
                </div>
            )}

            {/* Si alineación es 'left', el spacer va al final */}
            {alignment === 'left' && <div className={styles.spacer}></div>}
        </div>
    );
};

export default WorkNode;
