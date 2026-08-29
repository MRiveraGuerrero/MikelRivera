import React from "react";
import styles from "../AuctionDraftHome.module.css";

export default function OnlineMultiplayer({ lang }) {
  const content = {
    en: {
      badge: "Online Battles",
      title: "Challenge Your Friends Anywhere",
      subtitle: "No sign-up form stands between you and victory. Creating and joining rooms takes seconds.",
      steps: [
        { title: "1. Create a Room", text: "Generate a unique 6-digit room code with a single tap." },
        { title: "2. Share the Code", text: "Send the code to your friend via any messaging app." },
        { title: "3. Start Bidding", text: "Enter the room and start bidding in real time." }
      ]
    },
    es: {
      badge: "Batallas en Línea",
      title: "Desafía a tus Amigos en Cualquier Lugar",
      subtitle: "Ningún formulario se interpone entre tú y la victoria. Crear y unirse a salas lleva segundos.",
      steps: [
        { title: "1. Crea una Sala", text: "Genera un código único de sala con un solo toque." },
        { title: "2. Comparte el Código", text: "Envía el código a tu amigo por cualquier app de mensajería." },
        { title: "3. Empieza a Pujar", text: "Entra en la sala y comienza a pujar en tiempo real." }
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

      <div className={styles.stepsGrid}>
        {t.steps.map((s, idx) => (
          <div key={idx} className={styles.stepCard}>
            <h3 className={styles.stepTitle}>{s.title}</h3>
            <p className={styles.stepText}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
