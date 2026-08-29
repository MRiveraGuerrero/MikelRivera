import React from "react";
import styles from "../AuctionDraftHome.module.css";

export default function ContactSection({ lang }) {
  const content = {
    en: {
      badge: "Get in Touch",
      title: "Contact & Support",
      text: "Have feedback, questions, or inquiries about Auction Draft? Feel free to reach out directly:",
      emailLabel: "mikelrg2003@gmail.com"
    },
    es: {
      badge: "Ponte en Contacto",
      title: "Contacto y Soporte",
      text: "¿Tienes comentarios, dudas o consultas sobre Auction Draft? Escríbeme directamente:",
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
        <a href="mailto:mikelrg2003@gmail.com" className={styles.emailLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {t.emailLabel}
        </a>
      </div>
    </section>
  );
}
