import React from "react";
import styles from "../AuctionDraftLegal.module.css";

export default function LanguageSelector({ lang, setLang }) {
  return (
    <div className={styles.langToggle} aria-label="Language selector">
      <button
        className={`${styles.langBtn} ${lang === "en" ? styles.langBtnActive : ""}`}
        onClick={() => setLang("en")}
      >
        English
      </button>
      <button
        className={`${styles.langBtn} ${lang === "es" ? styles.langBtnActive : ""}`}
        onClick={() => setLang("es")}
      >
        Español
      </button>
    </div>
  );
}
