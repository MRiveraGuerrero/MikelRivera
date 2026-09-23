import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import CookieBanner from "./components/CookieBanner";
import { useLanguage } from "../Home/context/LanguageContext";
import styles from "./AnimePackOpeningHome.module.css";

export default function AnimePackOpeningHome() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = lang === "en" 
      ? "Anime Pack Opening | Official Hub & Legal Center" 
      : "Anime Pack Opening | Centro Oficial y Legal";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      lang === "en"
        ? "Official portal for legal compliance, terms of service, privacy policy, and user account deletion for Anime Pack Opening."
        : "Sitio oficial de información legal, términos y condiciones, política de privacidad y eliminación de datos para la aplicación móvil Anime Pack Opening."
    );
  }, [lang]);

  return (
    <div className={styles.pageWrapper}>
      {/* Header Navigation */}
      <AnimeHeader />

      {/* Main Content */}
      <main className={styles.mainContainer}>
        {/* HERO SECTION */}
        <section className={styles.heroSection} aria-label={lang === "en" ? "Anime Pack Opening presentation" : "Presentación de Anime Pack Opening"}>
          <div className={styles.heroGlow}></div>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot}></span>
            {t("home_badge")}
          </div>

          <h1 className={styles.heroTitle}>
            {t("home_title_main")} <span className={styles.heroGlowText}>{t("home_title_sub")}</span>
          </h1>
          <div className={styles.heroJapanese}>{t("home_japanese")}</div>

          <p className={styles.heroSubtitle}>
            {t("home_subtitle")}
          </p>

          {/* Action Links */}
          <div className={styles.heroCtas}>
            <Link to="/animepackopening/privacidad" className={styles.btnPrimaryHero}>
              🔒 {t("home_card_privacy_title")}
            </Link>
            <Link to="/animepackopening/terminos-y-condiciones" className={styles.btnSecondaryHero}>
              📄 {t("home_card_terms_title")}
            </Link>
            <Link to="/animepackopening/eliminar-cuenta" className={styles.btnSecondaryHero}>
              🗑️ {t("home_card_deletion_title")}
            </Link>
          </div>
        </section>

        {/* LEGAL & COMPLIANCE SUMMARY GRID */}
        <section className={styles.legalSummarySection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t("home_section_title")}</h2>
            <p className={styles.sectionSub}>{t("home_section_sub")}</p>
          </div>

          <div className={styles.legalCardsGrid}>
            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>🔒</div>
              <h3>{t("home_card_privacy_title")}</h3>
              <p>{t("home_card_privacy_desc")}</p>
              <Link to="/animepackopening/privacidad" className={styles.legalCardLink}>
                {t("home_card_privacy_btn")}
              </Link>
            </article>

            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>📄</div>
              <h3>{t("home_card_terms_title")}</h3>
              <p>{t("home_card_terms_desc")}</p>
              <Link to="/animepackopening/terminos-y-condiciones" className={styles.legalCardLink}>
                {t("home_card_terms_btn")}
              </Link>
            </article>

            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>🗑️</div>
              <h3>{t("home_card_deletion_title")}</h3>
              <p>{t("home_card_deletion_desc")}</p>
              <Link to="/animepackopening/eliminar-cuenta" className={styles.legalCardLink}>
                {t("home_card_deletion_btn")}
              </Link>
            </article>

            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>✉️</div>
              <h3>{t("home_card_contact_title")}</h3>
              <p>{t("home_card_contact_desc")}</p>
              <Link to="/animepackopening/contacto" className={styles.legalCardLink}>
                {t("home_card_contact_btn")}
              </Link>
            </article>
          </div>
        </section>
      </main>

      {/* COOKIE BANNER & FOOTER */}
      <CookieBanner />
      <AnimeFooter />
    </div>
  );
}
