import React from "react";
import styles from "../AuctionDraftHome.module.css";

export default function GameModes({ lang }) {
  const content = {
    en: {
      badge: "Game Modes",
      title: "Play Local or Online",
      subtitle: "Jump straight into the action. No sign-up forms, no passwords, no registration.",
      noAccountBadge: "⚡ No Account Required",
      localTitle: "Play Together (Local 1v1)",
      localDesc: "Pass the phone between friends and battle face to face anywhere, anytime.",
      localFeatures: [
        "2 Players on 1 Phone",
        "100% Offline Compatible",
        "Instant Local Battles"
      ],
      onlineTitle: "Play Online (Room Codes)",
      onlineDesc: "Challenge your friends remotely with instant room codes.",
      onlineFeatures: [
        "Create a Room & Get Code",
        "Share Code with Friends",
        "Real-time Synchronized Bidding"
      ]
    },
    es: {
      badge: "Modos de Juego",
      title: "Juega en Local o En Línea",
      subtitle: "Entra directamente a la acción. Sin formularios, sin contraseñas, sin registros.",
      noAccountBadge: "⚡ Sin Necesidad de Crear Cuenta",
      localTitle: "Modo Local (2 Jugadores)",
      localDesc: "Pasa el teléfono entre amigos y compite cara a cara en cualquier lugar.",
      localFeatures: [
        "2 Jugadores en 1 Teléfono",
        "100% Compatible Offline",
        "Batallas Locales Instantáneas"
      ],
      onlineTitle: "Multijugador Online (Código de Sala)",
      onlineDesc: "Desafía a tus amigos a distancia usando códigos de sala instantáneos.",
      onlineFeatures: [
        "Crea una Sala y Genera Código",
        "Comparte el Código con Amigos",
        "Pujas Sincronizadas en Tiempo Real"
      ]
    }
  };

  const t = content[lang];

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>{t.badge}</span>
        <h2 className={styles.sectionTitle}>{t.title}</h2>
        <p className={styles.sectionSubtitle}>{t.subtitle}</p>
      </div>

      <div className={styles.modesGrid}>
        {/* Local Card */}
        <div className={`${styles.modeCard} ${styles.modeCardTeal}`}>
          <div className={`${styles.modeIcon} ${styles.modeIconTeal}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="3"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
          </div>
          <h3 className={styles.modeTitle}>{t.localTitle}</h3>
          <p className={styles.stepText}>{t.localDesc}</p>
          
          <ul className={styles.modeFeatureList}>
            {t.localFeatures.map((feat, idx) => (
              <li key={idx} className={styles.modeFeatureItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {feat}
              </li>
            ))}
          </ul>

          <div className={styles.noAccountPill}>
            {t.noAccountBadge}
          </div>
        </div>

        {/* Online Card */}
        <div className={`${styles.modeCard} ${styles.modeCardOrange}`}>
          <div className={`${styles.modeIcon} ${styles.modeIconOrange}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
          </div>
          <h3 className={styles.modeTitle}>{t.onlineTitle}</h3>
          <p className={styles.stepText}>{t.onlineDesc}</p>

          <ul className={styles.modeFeatureList}>
            {t.onlineFeatures.map((feat, idx) => (
              <li key={idx} className={styles.modeFeatureItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {feat}
              </li>
            ))}
          </ul>

          <div className={styles.noAccountPill}>
            {t.noAccountBadge}
          </div>
        </div>
      </div>
    </section>
  );
}
