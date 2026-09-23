import React, { useEffect } from "react";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import { useLanguage } from "../Home/context/LanguageContext";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningCookies() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = lang === "en"
      ? "Cookie & Storage Policy | Anime Pack Opening TCG"
      : "Política de Cookies | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, [lang]);

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>{t("cookies_badge")}</div>
          <h1 className={styles.legalTitle}>{t("cookies_title")}</h1>
          <p className={styles.legalMeta}>
            {t("cookies_meta")}
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>{t("cookies_sec1_title")}</h2>
            <p>
              {t("cookies_sec1_desc")}
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("cookies_sec2_title")}</h2>
            <p>{lang === "en" ? "On this website we exclusively use the following categories of cookies:" : "En este sitio web utilizamos exclusivamente las siguientes categorías de cookies:"}</p>
            <ul>
              <li>
                {t("cookies_sec2_essential")}
              </li>
              <li>
                {t("cookies_sec2_local")}
              </li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("cookies_sec3_title")}</h2>
            <p>
              {t("cookies_sec3_desc")}
            </p>
          </section>

          <section className={styles.legalSection}>
            <h2>{t("cookies_sec4_title")}</h2>
            <p>
              {t("cookies_sec4_desc")}
            </p>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
