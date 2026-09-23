import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import { useLanguage } from "../Home/context/LanguageContext";
import styles from "./AnimePackOpeningLegal.module.css";

export default function AnimePackOpeningContact() {
  const { lang, t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("contact_opt_tech");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    document.title = lang === "en"
      ? "Legal Contact & Support | Anime Pack Opening TCG"
      : "Contacto Legal y Soporte | Anime Pack Opening TCG";
    window.scrollTo(0, 0);
  }, [lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!consent) {
      setErrorMsg(
        lang === "en"
          ? "You must expressly accept the Privacy Policy before sending your message."
          : "Debes aceptar expresamente la Política de Privacidad antes de enviar tu mensaje."
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setStatusMsg(
        lang === "en"
          ? `Message sent successfully! We will contact you at ${email} within 24-48 hours.`
          : `¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a través de ${email} en un plazo de 24-48h.`
      );
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.legalWrapper}>
      <AnimeHeader packsAvailable={0} essence={0} />

      <main className={styles.legalContainer}>
        <div className={styles.legalHeader}>
          <div className={styles.legalBadge}>{t("contact_badge")}</div>
          <h1 className={styles.legalTitle}>{t("contact_title")}</h1>
          <p className={styles.legalMeta}>
            {t("contact_meta")}
          </p>
        </div>

        <div className={styles.legalCard}>
          <section className={styles.legalSection}>
            <h2>{t("contact_form_title")}</h2>
            <p>
              {t("contact_form_desc")}
            </p>

            {statusMsg && (
              <div style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
                {statusMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "1rem", borderRadius: "10px", marginBottom: "1.25rem" }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>{t("contact_name_label")}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "en" ? "Your name" : "Tu nombre"}
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>{t("contact_email_label")}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>{t("contact_subject_label")}</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ width: "100%", padding: "0.75rem", background: "#0a0718", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                >
                  <option value="contact_opt_tech">{t("contact_opt_tech")}</option>
                  <option value="contact_opt_privacy">{t("contact_opt_privacy")}</option>
                  <option value="contact_opt_ip">{t("contact_opt_ip")}</option>
                  <option value="contact_opt_other">{t("contact_opt_other")}</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "#cbd5e1" }}>{t("contact_message_label")}</label>
                <textarea
                  rows="5"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === "en" ? "Write your detailed message here..." : "Escribe aquí tu mensaje detallado..."}
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff" }}
                ></textarea>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <input
                  type="checkbox"
                  id="consentCheck"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: "#ff2a75" }}
                />
                <label htmlFor="consentCheck" style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: "1.4" }}>
                  {t("contact_consent_label")} <Link to="/animepackopening/privacidad" style={{ color: "#ff2a75", textDecoration: "underline" }}>{t("nav_privacy")}</Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ background: "linear-gradient(135deg, #ff2a75, #a855f7)", color: "#fff", border: "none", padding: "0.9rem", borderRadius: "12px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
              >
                {loading ? t("contact_submitting") : t("contact_submit_btn")}
              </button>
            </form>
          </section>

          <section className={styles.legalSection} style={{ marginTop: "2rem" }}>
            <h2>{t("contact_dev_info_title")}</h2>
            <ul>
              <li><strong>{t("footer_dev_label")}</strong> Mikel Rivera Guerrero &amp; Luis Estival Cantó</li>
              <li><strong>{t("privacy_dev_email")}</strong> mikelrg2003@gmail.com</li>
              <li><strong>{t("privacy_dev_phone")}</strong> +34 688 85 15 80</li>
              <li><strong>{t("privacy_dev_location")}</strong> {lang === "en" ? "Spain / European Union" : "España / Unión Europea"}</li>
            </ul>
          </section>
        </div>
      </main>

      <AnimeFooter />
    </div>
  );
}
