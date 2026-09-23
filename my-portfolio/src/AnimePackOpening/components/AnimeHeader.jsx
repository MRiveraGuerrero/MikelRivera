import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../Home/context/LanguageContext";
import styles from "./AnimeHeader.module.css";

export default function AnimeHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLanguage, t } = useLanguage();

  const links = [
    { path: "privacidad", label: lang === "en" ? "Privacy" : "Privacidad" },
    { path: "terminos-y-condiciones", label: lang === "en" ? "Terms" : "Términos" },
    { path: "cookies", label: "Cookies" },
    { path: "contacto", label: lang === "en" ? "Support" : "Soporte" },
    { path: "eliminar-cuenta", label: t("nav_delete_account") },
  ];
  const renderLinks = (className) => links.map(({ path, label }) => {
    const href = `/animepackopening/${path}`;
    return (
      <Link key={path} to={href}
        className={`${className} ${isActive(href) ? styles.active : ""}`}
        aria-current={isActive(href) ? "page" : undefined}
        onClick={() => setMobileMenuOpen(false)}>
        {label}
      </Link>
    );
  });

  const isActive = (path) => location.pathname === path;

  const toggleLang = () => {
    setLanguage(lang === "en" ? "es" : "en");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link to="/animepackopening" className={styles.logoGroup} onClick={() => setMobileMenuOpen(false)} aria-label={`${t("nav_home")} · Anime Pack Opening`}>
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

        <nav className={styles.desktopNav} aria-label={lang === "en" ? "Main navigation" : "Navegación principal"}>
          {renderLinks(styles.navLink)}
        </nav>

        <div className={styles.actionsGroup}>
          <button type="button" onClick={toggleLang}
            aria-label={lang === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            title={lang === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
            className={styles.langToggleBtn}>
            <span aria-hidden="true">◎</span> {lang === "en" ? "EN" : "ES"}
          </button>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuToggle}
            aria-label={lang === "en" ? "Toggle navigation menu" : "Abrir o cerrar el menú de navegación"}
            aria-expanded={mobileMenuOpen} aria-controls="anime-mobile-navigation">
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="anime-mobile-navigation" className={styles.mobileDropdown}
          aria-label={lang === "en" ? "Mobile navigation" : "Navegación móvil"}>
          {renderLinks(styles.mobileLink)}
        </nav>
      )}
    </header>
  );
}
