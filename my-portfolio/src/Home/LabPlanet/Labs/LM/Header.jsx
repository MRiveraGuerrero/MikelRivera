import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <span className={styles.logoText}>LM</span>
                    <span className={styles.logoGlitch}>LM</span>
                </div>

                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                    <a href="#home" className={styles.navLink}>INICIO</a>
                    <a href="#shop" className={styles.navLink}>TIENDA</a>
                    <a href="#about" className={styles.navLink}>CREW</a>
                    <a href="#contact" className={styles.navLink}>CONTACTO</a>
                </nav>

                <button
                    className={styles.menuToggle}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className={styles.headerGlow}></div>
        </header>
    );
};

export default Header;
