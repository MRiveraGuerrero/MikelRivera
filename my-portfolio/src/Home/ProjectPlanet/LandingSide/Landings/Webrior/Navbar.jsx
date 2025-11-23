import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Webrior.module.css';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className={styles.navbar}>
            <Link to="/landings/webrior" className={styles.logo}>
                Web<span>rior</span>
            </Link>
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
        </nav>
    );
};

export default Navbar;
