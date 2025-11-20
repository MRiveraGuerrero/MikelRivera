import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import EasterEggModal from "./EasterEggModal";

const NAV_LINKS = [
  { href: "#about", label: "Sobre mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#contact", label: "Contacto" },
];

export default function Header({ toggleTheme, toggleLang, lang, theme, onHatch, externalShow, setExternalShow }) {
  const [showEgg, setShowEgg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (externalShow) setShowEgg(true);
  }, [externalShow]);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 960) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles["portfolio-header"]}${menuOpen ? ` ${styles["menu-open"]}` : ""}`}>
        <div className={styles["header-left"]}>
          <img
            src="/fox.svg"
            alt="Logo"
            className={styles["header-logo"]}
            onClick={() => setShowEgg(true)}
          />
          <span className={styles.brand}>M<span>IKEL</span></span>
        </div>

        <button
          type="button"
          className={`${styles["menu-toggle"]}${menuOpen ? ` ${styles.open}` : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú de navegación"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles["header-actions"]}${menuOpen ? ` ${styles.open}` : ""}`}>
          <nav className={`${styles["nav-links"]}${menuOpen ? ` ${styles.open}` : ""}`}>
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={handleLinkClick}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles["header-controls"]}>
            <button onClick={toggleLang} className={styles["lang-btn"]}>
              {lang === "es" ? "EN" : "ES"}
            </button>
            <button onClick={toggleTheme} className={styles["theme-btn"]}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      <EasterEggModal
        show={showEgg}
        onClose={() => {
          setShowEgg(false);
          if (setExternalShow) setExternalShow(false);
        }}
        onHatch={onHatch}
      />
    </>
  );
}
