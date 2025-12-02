import React from 'react';
import { getSunParts } from '../data/sunData.jsx';
import styles from './Sun.module.css';
import { useLanguage } from '../context/LanguageContext';


const Sun = ({ onSelectPart, activePartId }) => {
    const { t } = useLanguage();
    const sunParts = getSunParts(t);

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
                    <h3>{t.sun.guide.title}</h3>
                    <ul>
                        <li><span className={styles.icon}>🧠</span> {t.sun.guide.head}</li>
                        <li><span className={styles.icon}>🗣️</span> {t.sun.guide.throat}</li>
                        <li><span className={styles.icon}>❤️</span> {t.sun.guide.heart}</li>
                        <li><span className={styles.icon}>📧</span> {t.sun.guide.ear}</li>
                        <li><span className={styles.icon}>🎨</span> {t.sun.guide.leftHand}</li>
                        <li><span className={styles.icon}>💪</span> {t.sun.guide.rightArm}</li>
                        <li><span className={styles.icon}>🎓</span> {t.sun.guide.leftFoot}</li>
                        <li><span className={styles.icon}>⚙️</span> {t.sun.guide.rightKnee}</li>
                    </ul>
                </div>

                <div className={styles.statusPanel}>
                    <div className={styles.statusLine}>
                        <span className={styles.loading}>{t.sun.status.loading}</span>
                    </div>
                    <div className={styles.statusLine}>
                        <span className={styles.ok}>✓</span> {t.sun.status.systems}
                    </div>
                    <div className={styles.statusLine}>
                        <span className={styles.ok}>✓</span> {t.sun.status.contact}
                    </div>
                    <div className={styles.statusLine}>
                        <span className={styles.warning}>!</span> {t.sun.status.coffee}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sun;
