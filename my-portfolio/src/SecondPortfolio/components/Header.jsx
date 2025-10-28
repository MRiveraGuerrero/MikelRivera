import React, { useState, useEffect } from "react";
import "./Header.css";
import EasterEggModal from "./EasterEggModal";

export default function Header({ toggleTheme, toggleLang, lang, theme, onHatch, externalShow, setExternalShow }) {
  const [showEgg, setShowEgg] = useState(false);

  useEffect(() => {
    if (externalShow) setShowEgg(true);
  }, [externalShow]);

  return (
    <>
      <header className="portfolio-header">
        <div className="header-left">
          <img
            src="/fox.svg"
            alt="Logo"
            className="header-logo"
            onClick={() => setShowEgg(true)}
          />
          <span className="brand">M<span>IKEL</span></span>
        </div>

        <nav>
          <a href="#about">Sobre mí</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Contacto</a>
        </nav>

        <div className="header-controls">
          <button onClick={toggleLang} className="lang-btn">
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button onClick={toggleTheme} className="theme-btn">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
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
