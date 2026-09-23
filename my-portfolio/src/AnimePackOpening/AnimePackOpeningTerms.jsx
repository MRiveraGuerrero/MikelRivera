import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import { useLanguage } from "../Home/context/LanguageContext";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningTerms() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = lang === "en" 
      ? "Terms and Conditions | Anime Pack Opening TCG" 
      : "Términos y Condiciones | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>{t("terms_badge")}</div>
          <h1 className={styles.legalTitle}>{t("terms_title")}</h1>
          <p className={styles.legalMeta}>
            {t("terms_meta")}
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>{t("terms_sec1_title")}</h2>
            <p>
              {t("terms_sec1_desc")}
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("terms_sec2_title")}</h2>
            <p>
              {t("terms_sec2_desc")}
            </p>
            <p>
              <strong>{t("terms_sec2_no_gambling")}</strong>
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("terms_sec3_title")}</h2>
            <p>
              {t("terms_sec3_desc")}
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("terms_sec4_title")}</h2>
            <p>{t("terms_sec4_desc")}</p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("terms_sec5_title")}</h2>
            <p>
              {t("terms_sec5_desc")}
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("terms_sec6_title")}</h2>
            <p>
              {t("terms_sec6_desc")}
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("terms_sec7_title")}</h2>
            <p>
              {t("terms_sec7_desc")} <Link to="/animepackopening/eliminar-cuenta" className={styles.legalLink}>{t("nav_delete_account")}</Link>.
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("terms_sec8_title")}</h2>
            <p>
              {t("terms_sec8_desc")}
            </p>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
