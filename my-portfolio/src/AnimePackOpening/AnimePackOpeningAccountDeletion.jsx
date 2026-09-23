import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import { useLanguage } from "../Home/context/LanguageContext";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningAccountDeletion() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = lang === "en"
      ? "Account & Data Deletion | Anime Pack Opening TCG"
      : "Eliminar Cuenta y Datos | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>{t("deletion_badge")}</div>
          <h1 className={styles.legalTitle}>{t("deletion_title")}</h1>
          <p className={styles.legalMeta}>
            {t("deletion_meta")}
          </p>
        </div>

        <div className={styles.legalCard}>
          {/* MAIN INSTRUCTION: APP BUTTON DELETION */}
          <section className={styles.legalSection}>
            <h2>{t("deletion_sec1_title")}</h2>
            <div style={{ background: "rgba(255,42,117,0.08)", border: "1px solid rgba(255,42,117,0.25)", padding: "1.75rem", borderRadius: "16px", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#ffd700", fontFamily: "Oxanium", fontSize: "1.3rem", margin: "0 0 0.75rem 0" }}>
                {t("deletion_sec1_box_title")}
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#f1f5f9", margin: "0 0 1rem 0" }}>
                {t("deletion_sec1_box_desc")}
              </p>
              <ol style={{ paddingLeft: "1.25rem", color: "#cbd5e1", fontSize: "0.9rem", lineHeight: "1.7", margin: 0 }}>
                <li>{t("deletion_step1")}</li>
                <li>{t("deletion_step2")}</li>
                <li>{t("deletion_step3")}</li>
              </ol>
            </div>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("deletion_sec2_title")}</h2>
            <p>{t("deletion_sec2_desc")}</p>
            <ul>
              <li>{t("deletion_data1")}</li>
              <li>{t("deletion_data2")}</li>
              <li>{t("deletion_data3")}</li>
              <li>{t("deletion_data4")}</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("deletion_sec3_title")}</h2>
            <p>{t("deletion_sec3_desc")}</p>
            <ul>
              <li>{t("deletion_ret1")}</li>
              <li>{t("deletion_ret2")}</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("deletion_sec4_title")}</h2>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem", borderRadius: "16px" }}>
              <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: "1.6", margin: "0 0 1rem 0" }}>
                {t("deletion_sec4_desc")} <Link to="/animepackopening/contacto" style={{ color: "#ff2a75", textDecoration: "underline" }}>{t("nav_contact")}</Link> or emailing directly to <strong>mikelrg2003@gmail.com</strong> (+34 688 85 15 80).
              </p>
              <p style={{ fontSize: "0.85rem", color: "#ffd700", margin: 0, fontStyle: "italic" }}>
                {t("deletion_sec4_note")}
              </p>
            </div>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
