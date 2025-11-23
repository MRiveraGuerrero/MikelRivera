import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Webrior.module.css';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isActive = (path) => location.pathname === path;

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <Link to="/landings/webrior" className={styles.logo}>
                Web<span>rior</span>
            </Link>

            {/* Desktop Navigation */}
            <div className={styles.navLinks}>
                <Link
                    to="/landings/webrior"
                    className={`${styles.navLink} ${isActive('/landings/webrior') ? styles.activeLink : ''}`}
                >
                    Home
                </Link>
                <Link
                    to="/landings/webrior/services"
                    className={`${styles.navLink} ${isActive('/landings/webrior/services') ? styles.activeLink : ''}`}
                >
                    Servicios
                </Link>
                <Link
                    to="/landings/webrior/projects"
                    className={`${styles.navLink} ${isActive('/landings/webrior/projects') ? styles.activeLink : ''}`}
                >
                    Proyectos
                </Link>
            </div>

            <Link to="/landings/webrior/contact" className={styles.ctaButton}>
                Contactar
            </Link>

            {/* Mobile Hamburger Button */}
            <button
                className={styles.hamburger}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
                <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
                <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link
                        to="/landings/webrior"
                        className={`${styles.mobileNavLink} ${isActive('/landings/webrior') ? styles.activeLink : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Home
                    </Link>
                    <Link
                        to="/landings/webrior/services"
                        className={`${styles.mobileNavLink} ${isActive('/landings/webrior/services') ? styles.activeLink : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Servicios
                    </Link>
                    <Link
                        to="/landings/webrior/projects"
                        className={`${styles.mobileNavLink} ${isActive('/landings/webrior/projects') ? styles.activeLink : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Proyectos
                    </Link>
                    <Link
                        to="/landings/webrior/contact"
                        className={styles.mobileCtaButton}
                        onClick={closeMobileMenu}
                    >
                        Contactar
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
