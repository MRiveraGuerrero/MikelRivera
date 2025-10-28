import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <h3 className="footer-title">¿Quieres ver más?</h3>
        <p className="footer-text">
          Explora todos mis proyectos, portfolios y colaboraciones creativas.
        </p>
        <a href="/portfolios" className="footer-button">
          Ver todos los portfolios ✨
        </a>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mikel Rivera Guerrero — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
