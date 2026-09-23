import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../Home/context/LanguageContext";
import styles from "./CookieBanner.module.css";

const COOKIE_CONSENT_KEY = "anime_pack_opening_cookie_consent";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [preferencesConsent, setPreferencesConsent] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentObj = {
      essential: true,
      analytics: true,
      preferences: true,
      decidedAt: new Date().toISOString()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentObj));
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  const handleRejectNonEssential = () => {
    const consentObj = {
      essential: true,
      analytics: false,
      preferences: false,
      decidedAt: new Date().toISOString()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentObj));
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  const handleSaveCustomPreferences = () => {
    const consentObj = {
      essential: true,
      analytics: analyticsConsent,
      preferences: preferencesConsent,
      decidedAt: new Date().toISOString()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentObj));
    setShowBanner(false);
    setShowPreferencesModal(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className={styles.bannerContainer} role="region" aria-label={t("cookie_banner_title")}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerIcon}>🍪</div>
          <div className={styles.bannerTextGroup}>
            <p className={styles.bannerTitle}>{t("cookie_banner_title")}</p>
            <p className={styles.bannerDesc}>
              {t("cookie_banner_desc")}
              <Link to="/animepackopening/cookies" className={styles.bannerLink}>
                {t("nav_cookies")}
              </Link>.
            </p>
          </div>
          <div className={styles.bannerActions}>
            <button onClick={handleAcceptAll} className={styles.btnPrimary}>
              {t("cookie_btn_all")}
            </button>
            <button onClick={handleRejectNonEssential} className={styles.btnSecondary}>
              {t("cookie_btn_essential")}
            </button>
            <button onClick={() => setShowPreferencesModal(true)} className={styles.btnOutline}>
              {t("cookie_btn_config")}
            </button>
          </div>
        </div>
      </div>

      {showPreferencesModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="cookie-pref-title">
          <div className={styles.modalCard}>
            <h3 id="cookie-pref-title" className={styles.modalTitle}>{t("cookie_modal_title")}</h3>
            <p className={styles.modalSub}>
              {t("cookie_modal_sub")}
            </p>

            <div className={styles.prefList}>
              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <strong>{t("cookie_modal_r1_title")}</strong>
                  <p>{t("cookie_modal_r1_desc")}</p>
                </div>
                <input type="checkbox" checked disabled className={styles.toggleInput} />
              </div>

              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <strong>{t("cookie_modal_r2_title")}</strong>
                  <p>{t("cookie_modal_r2_desc")}</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferencesConsent}
                  onChange={(e) => setPreferencesConsent(e.target.checked)}
                  className={styles.toggleInput} 
                />
              </div>

              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <strong>{t("cookie_modal_r3_title")}</strong>
                  <p>{t("cookie_modal_r3_desc")}</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className={styles.toggleInput} 
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button onClick={handleSaveCustomPreferences} className={styles.btnPrimary}>
                {t("cookie_modal_save")}
              </button>
              <button onClick={() => setShowPreferencesModal(false)} className={styles.btnOutline}>
                {t("cookie_modal_cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
