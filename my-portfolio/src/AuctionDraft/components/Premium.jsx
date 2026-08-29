import React from "react";
import styles from "../AuctionDraftHome.module.css";

export default function Premium({ lang }) {
  const content = {
    en: {
      badge: "Free to Play",
      title: "More Categories. More Battles. More Chaos.",
      subtitle: "Auction Draft is completely free to play. Expand your roster whenever you want with optional digital content.",
      items: [
        "🆓 Free Base Categories",
        "📦 Optional Category Packs",
        "⭐ Premium Themes",
        "🔓 Full Unlock Options"
      ]
    },
    es: {
      badge: "Juego Gratuito",
      title: "Más Categorías. Más Batallas. Más Caos.",
      subtitle: "Auction Draft es totalmente gratuito. Amplía tus opciones de juego cuando quieras con contenido digital opcional.",
      items: [
        "🆓 Categorías Base Gratuitas",
        "📦 Paquetes de Categorías Opcionales",
        "⭐ Temas Premium",
        "🔓 Opciones de Desbloqueo Completo"
      ]
    }
  };

  const t = content[lang];

  return (
    <section className={styles.section}>
      <div className={styles.premiumCard}>
        <span className={styles.sectionBadge}>{t.badge}</span>
        <h2 className={styles.premiumTitle}>{t.title}</h2>
        <p className={styles.sectionSubtitle}>{t.subtitle}</p>

        <div className={styles.premiumList}>
          {t.items.map((item, idx) => (
            <div key={idx} className={styles.premiumPill}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
