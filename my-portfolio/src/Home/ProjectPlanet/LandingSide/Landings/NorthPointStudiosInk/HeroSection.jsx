import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = ({ onBookClick }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    NORTH POINT <span className={styles.accent}>INK</span>
                </h1>
                <p className={styles.subtitle}>
                    ARTE EN TU PIEL. ELEGANCIA ETERNA.
                </p>
                <button className={styles.ctaButton} onClick={onBookClick}>
                    RESERVA TU CITA
                </button>
            </div>

            <div className={styles.scrollIndicator}>
                <span>SCROLL</span>
                <div className={styles.line}></div>
            </div>
        </section>
    );
};

export default HeroSection;
