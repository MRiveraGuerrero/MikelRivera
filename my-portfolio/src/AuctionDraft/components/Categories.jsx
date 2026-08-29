import React from "react";
import styles from "../AuctionDraftHome.module.css";

export default function Categories({ lang }) {
  const content = {
    en: {
      badge: "Thematic Drafts",
      title: "Explore Endless Categories",
      subtitle: "Draft your dream roster across your favorite topics with hundreds of themed items.",
      cats: [
        { icon: "⚽", name: "Football Legends" },
        { icon: "🎮", name: "Gaming Icons" },
        { icon: "🎬", name: "Movie Blockbusters" },
        { icon: "⚡", name: "Anime-Inspired" },
        { icon: "🍜", name: "Global Food" },
        { icon: "🏆", name: "World Sports" },
        { icon: "🎲", name: "Random Chaos" },
        { icon: "✨", name: "And More..." }
      ]
    },
    es: {
      badge: "Drafts Temáticos",
      title: "Explora Múltiples Categorías",
      subtitle: "Construye la alineación de tus sueños en tus temáticas favoritas con cientos de elementos.",
      cats: [
        { icon: "⚽", name: "Leyendas de Fútbol" },
        { icon: "🎮", name: "Iconos de Videojuegos" },
        { icon: "🎬", name: "Cine y Películas" },
        { icon: "⚡", name: "Inspirado en Anime" },
        { icon: "🍜", name: "Comida del Mundo" },
        { icon: "🏆", name: "Deportes Mundiales" },
        { icon: "🎲", name: "Caos Aleatorio" },
        { icon: "✨", name: "Y Mucho Más..." }
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

      <div className={styles.categoriesGrid}>
        {t.cats.map((cat, idx) => (
          <div key={idx} className={styles.categoryCard}>
            <span className={styles.categoryIcon}>{cat.icon}</span>
            <span className={styles.categoryName}>{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
