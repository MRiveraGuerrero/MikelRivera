import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AnimeHeader.module.css";

export default function AnimeHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link to="/animepackopening" className={styles.logoGroup} aria-label="Anime Pack Opening Inicio">
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
              <circle cx="20" cy="20" r="18" fill="url(#logoGlow)" />
              <path d="M20 6C27.732 6 34 12.268 34 20C34 27.732 27.732 34 20 34C16.5 34 13.3 32.7 10.8 30.5C14 29 16.5 25.8 16.5 22C16.5 17.3 13.5 13.4 9.3 12C12.1 8.3 15.8 6 20 6Z" fill="#ff2a75" />
              <path d="M20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28C17.5 28 15.3 26.8 13.9 25C16.2 24.1 17.8 21.8 17.8 19C17.8 15.8 15.7 13.1 12.8 12.3C14.9 12.1 17.4 12 20 12Z" fill="#ffd700" />
              <defs>
                <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff2a75" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0a051b" stopOpacity="0.9" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.brandTitle}>ANIME <span className={styles.brandHighlight}>PACK OPENING</span></span>
            <span className={styles.brandSub}>サクラ・エクリプス • SAKURA ECLIPSE</span>
          </div>
        </Link>

        {/* Main Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Navegación principal de Anime Pack Opening">
          <Link 
            to="/animepackopening" 
            className={`${styles.navLink} ${isActive("/animepackopening") ? styles.active : ""}`}
          >
            Inicio
          </Link>
          <Link 
            to="/animepackopening/privacidad" 
            className={`${styles.navLink} ${isActive("/animepackopening/privacidad") ? styles.active : ""}`}
          >
            Privacidad
          </Link>
          <Link 
            to="/animepackopening/terminos-y-condiciones" 
            className={`${styles.navLink} ${isActive("/animepackopening/terminos-y-condiciones") ? styles.active : ""}`}
          >
            Términos
          </Link>
          <Link 
            to="/animepackopening/cookies" 
            className={`${styles.navLink} ${isActive("/animepackopening/cookies") ? styles.active : ""}`}
          >
            Cookies
          </Link>
          <Link 
            to="/animepackopening/contacto" 
            className={`${styles.navLink} ${isActive("/animepackopening/contacto") ? styles.active : ""}`}
          >
            Contacto
          </Link>
          <Link 
            to="/animepackopening/eliminar-cuenta" 
            className={`${styles.navLink} ${isActive("/animepackopening/eliminar-cuenta") ? styles.active : ""}`}
          >
            Eliminar Cuenta
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className={styles.mobileMenuToggle}
          aria-label="Abrir menú de navegación"
          aria-expanded={mobileMenuOpen}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileDropdown}>
          <Link to="/animepackopening" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
            🌸 Inicio
          </Link>
          <Link to="/animepackopening/privacidad" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
            🔒 Política de Privacidad
          </Link>
          <Link to="/animepackopening/terminos-y-condiciones" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
            📄 Términos y Condiciones
          </Link>
          <Link to="/animepackopening/cookies" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
            🍪 Política de Cookies
          </Link>
          <Link to="/animepackopening/contacto" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
            ✉️ Contacto Legal
          </Link>
          <Link to="/animepackopening/eliminar-cuenta" onClick={() => setMobileMenuOpen(false)} className={styles.mobileLink}>
            🗑️ Eliminar Cuenta
          </Link>
        </div>
      )}
    </header>
  );
}
