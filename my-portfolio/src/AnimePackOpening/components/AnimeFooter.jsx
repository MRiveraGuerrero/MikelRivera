import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Home/context/LanguageContext";
import styles from "./AnimeFooter.module.css";

export default function AnimeFooter() {
  const { lang, setLanguage, t } = useLanguage();

  return (
    <footer className={styles.footer} aria-label={t("footer_legal_heading")}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.logoTitle}>
              <span className={styles.pinkLogo}>ANIME</span> PACK OPENING
            </div>
            <p className={styles.brandDesc}>
              {t("footer_desc")}
            </p>
            <div className={styles.devBadge}>
              <span className={styles.devTag}>{t("footer_dev_label")}</span>
              <span className={styles.devName}>Mikel Rivera Guerrero &amp; Luis Estival Cantó</span>
            </div>
          </div>

          {/* Legal Links Column */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>{t("footer_legal_heading")}</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/animepackopening/privacidad" className={styles.footerLink}>
                  🔒 {t("nav_privacy")}
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/terminos-y-condiciones" className={styles.footerLink}>
                  📄 {t("nav_terms")}
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/eliminar-cuenta" className={styles.footerLink}>
                  🗑️ {t("nav_delete_account")}
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/cookies" className={styles.footerLink}>
                  🍪 {t("nav_cookies")}
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/contacto" className={styles.footerLink}>
                  ✉️ {t("nav_contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support & App Badges */}
          <div className={styles.supportCol}>
            <h3 className={styles.colTitle}>{t("footer_support_heading")}</h3>
            <p className={styles.supportText}>
              {t("footer_support_text")}
            </p>
            <a href="mailto:mikelrg2003@gmail.com" className={styles.emailBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              mikelrg2003@gmail.com
            </a>
            <div style={{ fontSize: "0.8rem", color: "#cbd5e1", marginTop: "0.4rem" }}>
              📞 +34 688 85 15 80
            </div>
            <div className={styles.gpComplianceTag} style={{ marginTop: "0.75rem" }}>
              {t("footer_gp_tag")}
            </div>
          </div>
        </div>

        {/* IP Disclaimer Notice */}
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            {t("footer_ip_disclaimer")}
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} Anime Pack Opening • Sakura Eclipse TCG. Mikel Rivera Guerrero &amp; Luis Estival Cantó.
          </p>
          <div
            className={styles.langBadge}
            onClick={() => setLanguage(lang === "en" ? "es" : "en")}
            style={{ cursor: "pointer" }}
            title={lang === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
          >
            {lang === "en" ? "🌐 English (Switch to Spanish)" : "🌐 Español (Cambiar a inglés)"}
          </div>
        </div>
      </div>
    </footer>
  );
}
