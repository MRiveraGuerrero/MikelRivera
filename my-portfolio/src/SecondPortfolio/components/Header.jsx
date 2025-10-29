import React, { useState, useEffect } from "react";
import "./Header.css";
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
      <header className={`portfolio-header${menuOpen ? " menu-open" : ""}`}>
        <div className="header-left">
          <img
            src="/fox.svg"
            alt="Logo"
            className="header-logo"
            onClick={() => setShowEgg(true)}
          />
          <span className="brand">M<span>IKEL</span></span>
        </div>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú de navegación"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`header-actions${menuOpen ? " open" : ""}`}>
          <nav className={`nav-links${menuOpen ? " open" : ""}`}>
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={handleLinkClick}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-controls">
            <button onClick={toggleLang} className="lang-btn">
              {lang === "es" ? "EN" : "ES"}
            </button>
            <button onClick={toggleTheme} className="theme-btn">
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
