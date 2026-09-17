import { useState, useEffect } from 'react';
import { useLanguage } from '../Home/context/LanguageContext';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const { language } = useLanguage();
  const es = language === 'es';

  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        // Small delay for smooth entrance
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('cookie_consent', JSON.stringify({ essential: true, analytics: true, date: new Date().toISOString() }));
    } catch {}
    setVisible(false);
  };

  const handleRejectAll = () => {
    try {
      localStorage.setItem('cookie_consent', JSON.stringify({ essential: true, analytics: false, date: new Date().toISOString() }));
    } catch {}
    setVisible(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('cookie_consent', JSON.stringify({ essential: true, analytics: analyticsEnabled, date: new Date().toISOString() }));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <aside
        className={styles.container}
        role="dialog"
        aria-labelledby="cookie-title"
        aria-describedby="cookie-desc"
      >
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.cardHeader}>
            <div className={styles.badge}>
              <span className={styles.cookieIcon} aria-hidden="true">🍪</span>
              <span id="cookie-title" className={styles.badgeText}>
                {es ? 'TELEMETRÍA & COOKIES' : 'TELEMETRY & COOKIES'}
              </span>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setVisible(false)}
              aria-label={es ? 'Cerrar aviso' : 'Close notification'}
            >
              ✕
            </button>
          </div>

          {/* Body Text */}
          {!showManage ? (
            <>
              <p id="cookie-desc" className={styles.bodyText}>
                {es
                  ? 'Utilizamos cookies para mejorar tu experiencia de desarrollo y mantener tus datos seguros. '
                  : 'We use cookies to improve your development experience and keep your data safe. '}
                <button
                  type="button"
                  className={styles.privacyLink}
                  onClick={() => setShowPrivacyModal(true)}
                >
                  {es ? 'Política de privacidad' : 'Privacy policy'}
                </button>
              </p>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.acceptBtn}
                  onClick={handleAcceptAll}
                >
                  {es ? 'Aceptar todo' : 'Accept all'}
                </button>

                <button
                  type="button"
                  className={styles.manageBtn}
                  onClick={() => setShowManage(true)}
                >
                  {es ? 'Gestionar preferencias' : 'Manage preferences'}
                </button>

                <button
                  type="button"
                  className={styles.rejectBtn}
                  onClick={handleRejectAll}
                >
                  {es ? 'Rechazar todo' : 'Reject all'}
                </button>
              </div>
            </>
          ) : (
            /* Manage Preferences Panel */
            <div className={styles.managePanel}>
              <div className={styles.toggleRow}>
                <div>
                  <strong className={styles.toggleTitle}>
                    {es ? 'Cookies esenciales' : 'Essential cookies'}
                  </strong>
                  <span className={styles.toggleDesc}>
                    {es ? 'Idioma, sonido y telemetría de vuelo' : 'Language, audio and flight telemetry'}
                  </span>
                </div>
                <span className={styles.alwaysActive}>
                  {es ? 'Activas' : 'Active'}
                </span>
              </div>

              <div className={styles.toggleRow}>
                <div>
                  <strong className={styles.toggleTitle}>
                    {es ? 'Telemetría y analítica' : 'Telemetry & analytics'}
                  </strong>
                  <span className={styles.toggleDesc}>
                    {es ? 'Rendimiento y mejoras de exploración' : 'Performance and exploration improvements'}
                  </span>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.manageActions}>
                <button
                  type="button"
                  className={styles.acceptBtn}
                  onClick={handleSavePreferences}
                >
                  {es ? 'Guardar selección' : 'Save selection'}
                </button>
                <button
                  type="button"
                  className={styles.backBtn}
                  onClick={() => setShowManage(false)}
                >
                  ← {es ? 'Atrás' : 'Back'}
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mini Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPrivacyModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{es ? '🛡️ Política de Privacidad & Cookies' : '🛡️ Privacy & Cookies Policy'}</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setShowPrivacyModal(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                {es
                  ? 'Este portfolio no recopila información personal identificable sin tu consentimiento. Las cookies y almacenamiento local se utilizan para:'
                  : 'This portfolio does not collect personally identifiable information without your consent. Cookies and local storage are used for:'}
              </p>
              <ul>
                <li>{es ? 'Recordar tu idioma preferido (ES / EN)' : 'Remembering your preferred language (ES / EN)'}</li>
                <li>{es ? 'Guardar tu estado de audio (activado / silenciado)' : 'Saving your audio state (muted / unmuted)'}</li>
                <li>{es ? 'Guardar descubrimientos y diario del universo 3D' : 'Saving 3D universe journal entries and discoveries'}</li>
              </ul>
              <p>
                {es
                  ? 'No vendemos ni compartimos datos con terceros publicitarios.'
                  : 'We do not sell or share data with advertising third parties.'}
              </p>
            </div>
            <button
              type="button"
              className={styles.modalOkBtn}
              onClick={() => setShowPrivacyModal(false)}
            >
              {es ? 'Entendido' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
