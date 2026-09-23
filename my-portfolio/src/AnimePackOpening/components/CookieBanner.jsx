import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CookieBanner.module.css";

const COOKIE_CONSENT_KEY = "anime_pack_opening_cookie_consent";

export default function CookieBanner() {
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
      <div className={styles.bannerContainer} role="region" aria-label="Aviso de privacidad y cookies">
        <div className={styles.bannerContent}>
          <div className={styles.bannerIcon}>🍪</div>
          <div className={styles.bannerTextGroup}>
            <p className={styles.bannerTitle}>Gestión de Cookies y Privacidad</p>
            <p className={styles.bannerDesc}>
              En Anime Pack Opening utilizamos cookies técnicas estrictamente necesarias para autenticar tu sesión mediante Supabase y recordar tu colección. No instalamos cookies de terceros sin tu consentimiento. Lee nuestra{" "}
              <Link to="/animepackopening/cookies" className={styles.bannerLink}>
                Política de Cookies
              </Link>.
            </p>
          </div>
          <div className={styles.bannerActions}>
            <button onClick={handleAcceptAll} className={styles.btnPrimary}>
              Aceptar Todas
            </button>
            <button onClick={handleRejectNonEssential} className={styles.btnSecondary}>
              Solo Esenciales
            </button>
            <button onClick={() => setShowPreferencesModal(true)} className={styles.btnOutline}>
              Configurar
            </button>
          </div>
        </div>
      </div>

      {showPreferencesModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="cookie-pref-title">
          <div className={styles.modalCard}>
            <h3 id="cookie-pref-title" className={styles.modalTitle}>Configurar Preferencias de Cookies</h3>
            <p className={styles.modalSub}>
              Elige qué categorías de cookies deseas permitir durante tu navegación en Anime Pack Opening.
            </p>

            <div className={styles.prefList}>
              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <strong>Cookies Técnicas Esenciales</strong>
                  <p>Necesarias para la autenticación de Supabase, tokens de sesión y el funcionamiento básico del juego.</p>
                </div>
                <input type="checkbox" checked disabled className={styles.toggleInput} />
              </div>

              <div className={styles.prefRow}>
                <div className={styles.prefInfo}>
                  <strong>Cookies de Preferencia de Usuario</strong>
                  <p>Guardan localmente el estado de tus sobres y filtros de mazo sin enviar datos a terceros.</p>
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
                  <strong>Métricas y Rendimiento Anónimo</strong>
                  <p>Permite recopilar datos de rendimiento del servidor y tiempos de carga sin identificar usuarios.</p>
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
                Guardar Configuración
              </button>
              <button onClick={() => setShowPreferencesModal(false)} className={styles.btnOutline}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
