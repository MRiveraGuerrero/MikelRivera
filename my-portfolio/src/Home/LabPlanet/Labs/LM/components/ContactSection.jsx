import React from 'react';
import styles from '../Home.module.css';

const ContactSection = () => {
    return (
        <section id="contact" className={styles.contactSection}>
            <div className={styles.contactBackground}>
                <div className={styles.techGrid}></div>
                <div className={styles.neonPulse}></div>
            </div>

            <div className={styles.sectionHeader}>
                <div className={styles.sectionBadge}>
                    <span className={styles.badgeIcon}>📡</span>
                    CONTACTO
                </div>
                <h2 className={styles.sectionTitle}>ÚNETE AL CAOS</h2>
                <p className={styles.sectionDescription}>
                    Escríbenos, colabora, o simplemente di hola
                </p>
            </div>

            <div className={styles.contactForm}>
                <div className={styles.formGroup}>
                    <label className={styles.neonLabel}>NOMBRE</label>
                    <input type="text" className={styles.neonInput} placeholder="Tu nombre..." />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.neonLabel}>EMAIL</label>
                    <input type="email" className={styles.neonInput} placeholder="tu@email.com" />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.neonLabel}>MENSAJE</label>
                    <textarea className={styles.neonTextarea} rows="5" placeholder="Escribe tu mensaje..."></textarea>
                </div>
                <button className={styles.btnSubmit}>
                    ENVIAR
                    <span className={styles.submitGlow}></span>
                </button>
            </div>

            <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}>
                    <span>IG</span>
                </a>
                <a href="#" className={styles.socialIcon}>
                    <span>YT</span>
                </a>
                <a href="#" className={styles.socialIcon}>
                    <span>TW</span>
                </a>
                <a href="#" className={styles.socialIcon}>
                    <span>SP</span>
                </a>
            </div>

            <div className={styles.contactStickers}>
                <span className={styles.sticker1}>LM</span>
                <span className={styles.sticker2}>💀</span>
                <span className={styles.sticker3}>CAOS</span>
            </div>
        </section>
    );
};

export default ContactSection;
