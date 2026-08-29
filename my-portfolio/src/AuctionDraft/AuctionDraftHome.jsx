import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AuctionDraftHome.module.css";

import LanguageSelector from "./components/LanguageSelector";
import AuctionDraftHero from "./components/AuctionDraftHero";
import HowToPlay from "./components/HowToPlay";
import GameModes from "./components/GameModes";
import Categories from "./components/Categories";
import Premium from "./components/Premium";
import OnlineMultiplayer from "./components/OnlineMultiplayer";
import DeveloperSection from "./components/DeveloperSection";
import ContactSection from "./components/ContactSection";
import AuctionDraftFooter from "./components/AuctionDraftFooter";

const pageMeta = {
  en: {
    title: "Auction Draft — $20 Battle",
    description: "Bid against your friends, build the best draft and reveal who wins. Play Auction Draft locally or online."
  },
  es: {
    title: "Auction Draft — Batalla de $20",
    description: "Puja contra tus amigos, crea el mejor draft y revela quién gana. Juega a Auction Draft en local o en línea."
  }
};

export default function AuctionDraftHome() {
  const [lang, setLang] = useState("en");
  const meta = pageMeta[lang];

  useEffect(() => {
    document.title = meta.title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", meta.description);

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", meta.title);

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", meta.description);

    // Open Graph Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", "website");
  }, [lang, meta]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Header / Top Navigation */}
        <header className={styles.headerNav}>
          <Link to="/auctiondraft" className={styles.logoArea}>
            <span className={styles.logoBadge}>$20</span>
            <span className={styles.logoText}>Auction Draft</span>
          </Link>

          <LanguageSelector lang={lang} setLang={setLang} />
        </header>

        {/* Hero Section */}
        <AuctionDraftHero lang={lang} />

        {/* How To Play */}
        <HowToPlay lang={lang} />

        {/* Game Modes */}
        <GameModes lang={lang} />

        {/* Categories */}
        <Categories lang={lang} />

        {/* Premium Options */}
        <Premium lang={lang} />

        {/* Online Multiplayer */}
        <OnlineMultiplayer lang={lang} />

        {/* Developer Section */}
        <DeveloperSection lang={lang} />

        {/* Contact Section */}
        <ContactSection lang={lang} />

      </div>

      {/* Footer */}
      <AuctionDraftFooter lang={lang} />
    </div>
  );
}
