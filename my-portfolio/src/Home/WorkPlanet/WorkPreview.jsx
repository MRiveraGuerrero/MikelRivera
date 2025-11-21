import React from 'react';
import styles from './WorkPreview.module.css';

const WorkPreview = ({ selectedItem, onClose, side = 'right' }) => {
    const sideClass = side === 'left' ? styles.panelLeft : styles.panelRight;
    const panelClass = `${styles.previewPanel} ${sideClass} ${selectedItem ? styles.isVisible : ''}`;
    const content = selectedItem || { year: '', company: '', role: '', description: '', color: '#fff' };

    return (
        <div className={panelClass} style={{ borderColor: content.color }}>
            {selectedItem && (
                <button className={styles.closeBtn} onClick={onClose} style={{ color: content.color }}>&times;</button>
            )}

            <div className={styles.header}>
                <span className={styles.year} style={{ color: content.color }}>{content.year}</span>
                <h2 className={styles.company}>{content.company}</h2>
            </div>

            <h3 className={styles.role} style={{ borderBottomColor: content.color }}>{content.role}</h3>

            <p className={styles.description}>{content.description}</p>
        </div>
    );
};

export default WorkPreview;
