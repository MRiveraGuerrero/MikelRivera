import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["footer-inner"]}>
        <h3 className={styles["footer-title"]}>¿Quieres ver más?</h3>
        <p className={styles["footer-text"]}>
          Explora todos mis proyectos, portfolios y colaboraciones creativas.
        </p>
        <a href="/portfolios" className={styles["footer-button"]}>
          Ver todos los portfolios ✨
        </a>
      </div>
      <div className={styles["footer-bottom"]}>
        <p>© {new Date().getFullYear()} Mikel Rivera Guerrero — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
