import React from 'react';
import styles from './SunPreview.module.css';

const SunPreview = ({ selectedPart, onClose }) => {
    if (!selectedPart) return null;

    return (
        <div className={`${styles.previewPanel} ${selectedPart ? styles.visible : ''}`}>
            <button className={styles.closeButton} onClick={onClose}>
                ✕
            </button>

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.icon}>{selectedPart.icon}</span>
                    <h2 className={styles.title}>{selectedPart.title}</h2>
                </div>

                <div className={styles.body}>
                    {selectedPart.content}
                </div>

                {selectedPart.tags && (
                    <div className={styles.tags}>
                        {selectedPart.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SunPreview;
