import React from 'react';
import styles from './WorkNode.module.css';

const WorkNode = ({ item, onClick, isActive }) => {
    return (
        <div
            className={`${styles.nodeContainer} ${isActive ? styles.active : ''}`}
            onClick={() => onClick(item)}
        >
            <div className={styles.nodeCircle} style={{ borderColor: item.color }}>
                <div className={styles.innerCore} style={{ backgroundColor: item.color }}></div>
            </div>
            <div className={styles.nodeLabel}>
                <span className={styles.year}>{item.year}</span>
                <span className={styles.company}>{item.company}</span>
            </div>
        </div>
    );
};

export default WorkNode;
