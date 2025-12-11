import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.headerBackground}>
                <div className={styles.glowLine}></div>
                <div className={styles.particles}>
                    <span className={styles.particle}></span>
                    <span className={styles.particle}></span>
                    <span className={styles.particle}></span>
                </div>
            </div>

            <div className={styles.headerContent}>
                {/* Logo */}
                <Link to="/riveragg_" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <span className={styles.logoGlow}></span>
                        <span className={styles.logoText}>RG</span>
                    </div>
                    <span className={styles.logoName}>riveragg_</span>
                </Link>

                {/* Navigation */}
                <nav className={styles.nav}>
                    <Link
                        to="/riveragg_/about"
                        className={`${styles.navItem} ${isActive('/riveragg_/about') ? styles.active : ''}`}
                    >
                        <span className={styles.navDot}></span>
                        About Me
                    </Link>
                    <Link
                        to="/riveragg_/videos"
                        className={`${styles.navItem} ${isActive('/riveragg_/videos') ? styles.active : ''}`}
                    >
                        <span className={styles.navDot}></span>
                        Vídeos
                    </Link>
                    <Link
                        to="/riveragg_/gallery"
                        className={`${styles.navItem} ${isActive('/riveragg_/gallery') ? styles.active : ''}`}
                    >
                        <span className={styles.navDot}></span>
                        Galería
                    </Link>
                    <Link
                        to="/riveragg_/contact"
                        className={`${styles.navItem} ${isActive('/riveragg_/contact') ? styles.active : ''}`}
                    >
                        <span className={styles.navDot}></span>
                        Contacto
                    </Link>
                </nav>

                {/* CTA Button */}
                <div className={styles.headerCta}>
                    <Link to="/riveragg_/contact" className={styles.ctaButton}>
                        <span className={styles.ctaIcon}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        Colaborar
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className={styles.menuToggle}>
                    <span className={styles.menuLine}></span>
                    <span className={styles.menuLine}></span>
                    <span className={styles.menuLine}></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
