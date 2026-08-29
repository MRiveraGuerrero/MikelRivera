import React from "react";
import styles from "../AuctionDraftHome.module.css";

export default function HowToPlay({ lang }) {
  const content = {
    en: {
      badge: "Game Rules",
      title: "How To Play Auction Draft",
      subtitle: "Simple to learn, intense to master. Master the auction mechanics in 6 easy steps.",
      steps: [
        { num: "01", title: "Get $20", desc: "Each player starts with a virtual budget of $20 at the beginning of the match." },
        { num: "02", title: "An Item Appears", desc: "Items from the selected category pop up one by one in random order." },
        { num: "03", title: "Bid Against Your Opponent", desc: "Place strategic virtual bids. The highest bidder claims the item." },
        { num: "04", title: "Build Your Draft", desc: "Assemble a team or collection of items with your remaining budget." },
        { num: "05", title: "Reveal Hidden Scores", desc: "When all items are drafted, hidden point values are revealed." },
        { num: "06", title: "Highest Score Wins", desc: "Calculate the total score. The player with the highest total wins!" }
      ]
    },
    es: {
      badge: "Reglas del Juego",
      title: "Cómo Jugar a Auction Draft",
      subtitle: "Fácil de aprender, emocionante de dominar. Domina las subastas en 6 sencillos pasos.",
      steps: [
        { num: "01", title: "Consigue $20", desc: "Cada jugador comienza con un presupuesto virtual de $20 al inicio de la partida." },
        { num: "02", title: "Aparece un Elemento", desc: "Los elementos de la categoría seleccionada aparecen de uno en uno." },
        { num: "03", title: "Puja contra tu Rival", desc: "Haz pujas virtuales estratégicas. La puja más alta se lleva el elemento." },
        { num: "04", title: "Crea tu Draft", desc: "Construye tu equipo o colección con el presupuesto restante." },
        { num: "05", title: "Revela Puntuaciones", desc: "Al terminar la subasta, se revelan los valores de puntos ocultos." },
        { num: "06", title: "Gana la Mayor Puntuación", desc: "Se calcula el total acumulado. ¡El jugador con más puntos gana!" }
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="how-to-play" className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>{t.badge}</span>
        <h2 className={styles.sectionTitle}>{t.title}</h2>
        <p className={styles.sectionSubtitle}>{t.subtitle}</p>
      </div>

      <div className={styles.stepsGrid}>
        {t.steps.map((step, idx) => (
          <div key={idx} className={styles.stepCard}>
            <span className={styles.stepNum}>{step.num}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
