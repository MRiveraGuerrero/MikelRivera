import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ImpostorAnimeHome.module.css";

export default function ImpostorAnimeHome() {
  useEffect(() => {
    // SEO Page Title exactly as specified
    document.title = "Impostor Anime | Support & Legal";

    // SEO Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Official support, privacy information and terms for Impostor Anime."
    );

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://mikelrivera.com/impostor-anime");

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", "Impostor Anime | Support & Legal");

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute(
      "content",
      "Official support, privacy information and terms for Impostor Anime."
    );

    // Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", "https://mikelrivera.com/impostor-anime");

    // Open Graph Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement("meta");
      ogType.setAttribute("property", "og:type");
      document.head.appendChild(ogType);
    }
    ogType.setAttribute("content", "website");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        {/* Section 1: Hero */}
        <header className={styles.heroCard}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Official App Hub
          </div>

          <h1 className={styles.mainTitle}>
            Impostor <span className={styles.titleGlow}>Anime</span>
          </h1>

          <p className={styles.heroSubtitle}>
            "Find the impostor. Protect the secret."
          </p>

          <p className={styles.heroDescription}>
            A local party game to play with friends on a single device.
          </p>

          <div className={styles.heroButtonGroup}>
            <Link to="/impostor-anime/support" className={styles.btnPrimary}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Get Support
            </Link>

            <Link to="/impostor-anime/privacy" className={styles.btnSecondary}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Privacy Policy
            </Link>

            <Link to="/impostor-anime/terms" className={styles.btnSecondary}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Terms of Use
            </Link>
          </div>
        </header>

        {/* Section 2: About */}
        <section className={styles.aboutCard} aria-labelledby="about-heading">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <h2 id="about-heading" className={styles.sectionTitle}>
              About Impostor Anime
            </h2>
          </div>

          <p className={styles.aboutText}>
            Impostor Anime is a local social deduction party game. Players secretly discover their roles, give clues, identify suspicious players and vote for who they believe is the impostor.
          </p>
        </section>

        {/* Section 3: Legal / Support Cards */}
        <section className={styles.cardsGrid} aria-label="Official Documentation and Support">
          
          {/* CARD 1: Support */}
          <article className={styles.legalCard}>
            <div className={styles.cardTop}>
              <div className={styles.cardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Support</h3>
            </div>
            <p className={styles.cardText}>
              Get help with gameplay, purchases, bugs or other questions.
            </p>
            <Link to="/impostor-anime/support" className={styles.cardBtn}>
              Visit Support
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </article>

          {/* CARD 2: Privacy */}
          <article className={styles.legalCard}>
            <div className={styles.cardTop}>
              <div className={`${styles.cardIcon} ${styles.cyanIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Privacy</h3>
            </div>
            <p className={styles.cardText}>
              Learn how information is handled when you use Impostor Anime.
            </p>
            <Link to="/impostor-anime/privacy" className={styles.cardBtn}>
              Privacy Policy
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </article>

          {/* CARD 3: Terms */}
          <article className={styles.legalCard}>
            <div className={styles.cardTop}>
              <div className={`${styles.cardIcon} ${styles.pinkIcon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Terms</h3>
            </div>
            <p className={styles.cardText}>
              Read the terms that apply when using Impostor Anime.
            </p>
            <Link to="/impostor-anime/terms" className={styles.cardBtn}>
              Terms of Use
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </article>

        </section>

        {/* Section 4: Intellectual Property Notice */}
        <section className={styles.ipNoticeCard} aria-label="Intellectual property statement">
          <p className={styles.ipNoticeText}>
            Impostor Anime is an independent application. Any third-party names, fictional characters, works, franchises or trademarks referenced by name remain the property of their respective owners. Such references do not imply affiliation, sponsorship or endorsement. No third-party copyrighted artwork, screenshots, franchise logos, video footage or copyrighted audio are used in connection with these nominal references.
          </p>
        </section>

        {/* Section 5: Developer Information */}
        <section className={styles.devCard} aria-label="Developer contact and location">
          <div className={styles.devInfo}>
            <span className={styles.devLabel}>Developed by</span>
            <span className={styles.devName}>Mikel Rivera Guerrero</span>
            <span className={styles.devCountry}>Spain</span>
          </div>

          <div className={styles.devInfo}>
            <span className={styles.devLabel}>Support Contact</span>
            <a href="mailto:mikelrg2003@gmail.com" className={styles.supportLink}>
              mikelrg2003@gmail.com
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </section>

        {/* Section 6: Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerNavLinks}>
            <Link to="/impostor-anime/support" className={styles.footerLink}>
              Support
            </Link>
            <Link to="/impostor-anime/privacy" className={styles.footerLink}>
              Privacy
            </Link>
            <Link to="/impostor-anime/terms" className={styles.footerLink}>
              Terms
            </Link>
          </div>

          <p className={styles.footerText}>
            © 2026 Mikel Rivera Guerrero. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}
