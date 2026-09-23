import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import { useLanguage } from "../Home/context/LanguageContext";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningPrivacy() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = lang === "en"
      ? "Privacy Policy | Anime Pack Opening TCG"
      : "Política de Privacidad | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>{t("privacy_badge")}</div>
          <h1 className={styles.legalTitle}>{t("privacy_title")}</h1>
          <p className={styles.legalMeta}>
            {t("privacy_meta")}
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>{t("privacy_sec1_title")}</h2>
            <p>{t("privacy_sec1_desc")}</p>
            <ul>
              <li><strong>{t("privacy_dev_names")}</strong> Mikel Rivera Guerrero &amp; Luis Estival Cantó</li>
              <li><strong>{t("privacy_dev_email")}</strong> mikelrg2003@gmail.com</li>
              <li><strong>{t("privacy_dev_phone")}</strong> +34 688 85 15 80</li>
              <li><strong>{t("privacy_dev_domain")}</strong> https://mikelrivera.com/animepackopening</li>
              <li><strong>{t("privacy_dev_location")}</strong> {lang === "en" ? "Spain / European Union" : "España / Unión Europea"}</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("privacy_sec2_title")}</h2>
            <p>{t("privacy_sec2_desc")}</p>
            <ul>
              <li>{t("privacy_data_id")}</li>
              <li>{t("privacy_data_progress")}</li>
              <li>{t("privacy_data_tech")}</li>
              <li>{t("privacy_data_admob")}</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("privacy_sec3_title")}</h2>
            <p>{lang === "en" ? "We process your data for the following legitimate purposes:" : "Tratamos tus datos con las siguientes finalidades legítimas:"}</p>
            <ul>
              <li>{t("privacy_purpose_contract")}</li>
              <li>{t("privacy_purpose_ads")}</li>
              <li>{t("privacy_purpose_security")}</li>
              <li>{t("privacy_purpose_consent")}</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("privacy_sec4_title")}</h2>
            <p>{t("privacy_sec4_desc")}</p>
            <ul>
              <li>{t("privacy_provider_supabase")}</li>
              <li>
                {t("privacy_provider_admob")}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#ff2a75", textDecoration: "underline" }}>
                  {lang === "en" ? "Google Privacy Policy" : "Política de Privacidad de Google"}
                </a>.
              </li>
            </ul>
            <p>
              {t("privacy_no_sell")}
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("privacy_sec5_title")}</h2>
            <p>{t("privacy_sec5_desc")}</p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("privacy_sec6_title")}</h2>
            <p>{t("privacy_sec6_desc")}</p>
            <p>
              {lang === "en"
                ? "To exercise any of these rights, contact us via the Contact Form or email directly to:"
                : "Para ejercitar cualquiera de estos derechos, envía un mensaje indicando tu ID o correo a:"} <strong>mikelrg2003@gmail.com</strong> (+34 688 85 15 80).
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("privacy_sec7_title")}</h2>
            <p>{t("privacy_sec7_desc")}</p>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
