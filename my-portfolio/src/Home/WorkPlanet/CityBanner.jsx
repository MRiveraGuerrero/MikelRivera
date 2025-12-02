import React from 'react';
import styles from './CityBanner.module.css';
import { useLanguage } from '../context/LanguageContext';

const CityBanner = () => {
    const { t } = useLanguage();

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.skyline}>
                {/* Representación abstracta de edificios con CSS */}
                <div className={`${styles.building} ${styles.b4}`}></div>
                <div className={`${styles.building} ${styles.b3}`}></div>
                <div className={`${styles.building} ${styles.b3}`}></div>
                <div className={`${styles.building} ${styles.b4}`}></div>
                <div className={`${styles.building} ${styles.b3}`}></div>
                <div className={`${styles.building} ${styles.b1}`}></div>
                <div className={`${styles.building} ${styles.b2}`}></div>

                <div className={`${styles.building} ${styles.b4}`}></div>
                <div className={`${styles.building} ${styles.b5}`}></div>
                <div className={`${styles.building} ${styles.b5}`}></div>
                <div className={`${styles.building} ${styles.b3}`}></div>
                <div className={`${styles.building} ${styles.b4}`}></div>
                <div className={`${styles.building} ${styles.b2}`}></div>
                <div className={`${styles.building} ${styles.b3}`}></div>
            </div>
            <div className={styles.overlay}>
                <h2 className={styles.cityTitle}>{t.workPage.banner.title}</h2>
                <p className={styles.citySubtitle}>{t.workPage.banner.subtitle}</p>
            </div>
        </div>
    );
};

export default CityBanner;
