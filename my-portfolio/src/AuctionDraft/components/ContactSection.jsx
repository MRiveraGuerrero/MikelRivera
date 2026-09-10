import React from "react";
import { Link } from "react-router-dom";
import styles from "../AuctionDraftHome.module.css";

export default function ContactSection({ lang }) {
  const content = {
    en: {
      badge: "Get in Touch",
      title: "Contact & Support",
      text: "Have feedback, questions, or inquiries about Auction Draft? Visit our Help Center or reach out directly:",
      supportBtn: "Help Center & FAQ →",
      emailLabel: "mikelrg2003@gmail.com"
    },
    es: {
      badge: "Ponte en Contacto",
      title: "Contacto y Soporte",
      text: "¿Tienes comentarios, dudas o consultas sobre Auction Draft? Visita nuestro Centro de Ayuda o escríbeme directamente:",
      supportBtn: "Centro de Ayuda y FAQ →",
      emailLabel: "mikelrg2003@gmail.com"
    }
  };

  const t = content[lang];

  return (
    <section className={styles.section}>
      <div className={styles.devCard}>
        <span className={styles.sectionBadge}>{t.badge}</span>
        <h2 className={styles.sectionTitle}>{t.title}</h2>
        <p className={styles.devText}>{t.text}</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "16px" }}>
          <Link to="/auctiondraft/support" className={styles.emailLink} style={{ textDecoration: "none" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            {t.supportBtn}
          </Link>
          <a href="mailto:mikelrg2003@gmail.com" className={styles.emailLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {t.emailLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
