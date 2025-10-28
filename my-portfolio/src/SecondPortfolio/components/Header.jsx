import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";
import logo from "../../../public/fox.svg";
import EasterEggModal from "./EasterEggModal";

export default function Header({ toggleTheme, toggleLang, lang, theme, onHatch }) {
  const [showEgg, setShowEgg] = useState(false);

  return (
    <>
      <header className="portfolio-header">
        <div className="header-left">
          <img
            src={logo}
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
        onClose={() => setShowEgg(false)}
        onHatch={onHatch}
      />
    </>
  );
}