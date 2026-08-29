import React from "react";
import styles from "../AuctionDraftHome.module.css";

const GOOGLE_PLAY_DEV_URL = "https://play.google.com/store/apps/dev?id=8276397884817662642&utm_source=emea_Med";

export default function AuctionDraftHero({ lang }) {
  const content = {
    en: {
      badge: "🎮 $20 Battle • Competitive Casual Game",
      titleStart: "You Have ",
      titleGold: "$20",
      titleEnd: ". Build The Best Draft.",
      subtitle: "Bid against your friends item by item, manage your virtual budget, and reveal the hidden scores to claim victory.",
      getGooglePlay: "Get it on Google Play",
      howToPlay: "How to Play ↓"
    },
    es: {
      badge: "🎮 Batalla de $20 • Juego Casual Competitivo",
      titleStart: "Tienes ",
      titleGold: "$20",
      titleEnd: ". Crea el Mejor Draft.",
      subtitle: "Puja contra tus amigos elemento a elemento, administra tu presupuesto virtual y revela las puntuaciones ocultas para ganar.",
      getGooglePlay: "Consíguelo en Google Play",
      howToPlay: "Cómo Jugar ↓"
    }
  };

  const t = content[lang];

  return (
    <section className={styles.hero}>
      <div className={styles.heroTaglineBadge}>
        {t.badge}
      </div>

      <h1 className={styles.heroTitle}>
        {t.titleStart}
        <span className={styles.titleGold}>{t.titleGold}</span>
        {t.titleEnd}
      </h1>

      <p className={styles.heroSubtitle}>
        {t.subtitle}
      </p>

      <div className={styles.ctaGroup}>
        <a 
          href={GOOGLE_PLAY_DEV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryCta}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-1.042-1.745V3.559c0-.726.388-1.385 1.041-1.745zm11.602 8.767l2.673-1.543-11.45-6.611 8.777 8.154zm0 2.838l-8.777 8.154 11.45-6.611-2.673-1.543zm1.427-1.419l3.523 2.034c.767.443.767 1.164 0 1.607l-3.523 2.034-2.222-2.222 2.222-2.222z"/>
          </svg>
          {t.getGooglePlay}
        </a>

        <a href="#how-to-play" className={styles.secondaryCta}>
          {t.howToPlay}
        </a>
      </div>
    </section>
  );
}
