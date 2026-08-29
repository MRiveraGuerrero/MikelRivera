import React from "react";
import styles from "../AuctionDraftHome.module.css";

export default function DeveloperSection({ lang }) {
  const content = {
    en: {
      badge: "Indie Game Development",
      title: "About the Developer",
      devName: "Mikel Rivera Guerrero",
      devBio: "Auction Draft is an independent mobile game created and developed by Mikel Rivera Guerrero. Dedicated to building engaging, fast-paced casual multiplayer experiences for mobile devices."
    },
    es: {
      badge: "Desarrollo de Videojuegos Indie",
      title: "Sobre el Desarrollador",
      devName: "Mikel Rivera Guerrero",
      devBio: "Auction Draft es un juego móvil independiente creado y desarrollado por Mikel Rivera Guerrero. Dedicado a crear experiencias multijugador casuales, ágiles y entretenidas para dispositivos móviles."
    }
  };

  const t = content[lang];

  return (
    <section className={styles.section}>
      <div className={styles.devCard}>
        <span className={styles.sectionBadge}>{t.badge}</span>
        <h2 className={styles.sectionTitle}>{t.title}</h2>
        <h3 className={styles.devTitle}>{t.devName}</h3>
        <p className={styles.devText}>{t.devBio}</p>
      </div>
    </section>
  );
}
