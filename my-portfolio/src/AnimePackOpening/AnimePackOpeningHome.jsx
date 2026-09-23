import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AnimeHeader from "./components/AnimeHeader";
import AnimeFooter from "./components/AnimeFooter";
import CookieBanner from "./components/CookieBanner";
import styles from "./AnimePackOpeningHome.module.css";

export default function AnimePackOpeningHome() {
  useEffect(() => {
    document.title = "Anime Pack Opening | Centro Oficial y Legal";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Sitio oficial de información legal, términos y condiciones, política de privacidad y eliminación de datos para la aplicación móvil Anime Pack Opening."
    );
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Header Navigation */}
      <AnimeHeader />

      {/* Main Content */}
      <main className={styles.mainContainer}>
        {/* HERO SECTION */}
        <section className={styles.heroSection} aria-label="Presentación de Anime Pack Opening">
          <div className={styles.heroGlow}></div>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot}></span>
            Sitio Oficial y Centro Legal • Sakura Eclipse TCG
          </div>

          <h1 className={styles.heroTitle}>
            ANIME <span className={styles.heroGlowText}>PACK OPENING</span>
          </h1>
          <div className={styles.heroJapanese}>サクラ・エクリプス • SAKURA ECLIPSE</div>

          <p className={styles.heroSubtitle}>
            Portal oficial de información, términos de uso, política de privacidad y gestión de derechos para la aplicación móvil Anime Pack Opening.
          </p>

          {/* Action Links */}
          <div className={styles.heroCtas}>
            <Link to="/animepackopening/privacidad" className={styles.btnPrimaryHero}>
              🔒 Política de Privacidad
            </Link>
            <Link to="/animepackopening/terminos-y-condiciones" className={styles.btnSecondaryHero}>
              📄 Términos y Condiciones
            </Link>
            <Link to="/animepackopening/eliminar-cuenta" className={styles.btnSecondaryHero}>
              🗑️ Eliminación de Cuenta
            </Link>
          </div>
        </section>

        {/* LEGAL & COMPLIANCE SUMMARY GRID */}
        <section className={styles.legalSummarySection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Documentación y Cumplimiento Legal</h2>
            <p className={styles.sectionSub}>Acceso directo a las políticas de privacidad y condiciones de uso</p>
          </div>

          <div className={styles.legalCardsGrid}>
            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>🔒</div>
              <h3>Política de Privacidad</h3>
              <p>Conoce detalladamente cómo se tratan los datos técnicos, la infraestructura de la app y tus derechos ARCO+.</p>
              <Link to="/animepackopening/privacidad" className={styles.legalCardLink}>
                Ver Política de Privacidad →
              </Link>
            </article>

            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>📄</div>
              <h3>Términos y Condiciones</h3>
              <p>Condiciones generales de uso de la aplicación, requisitos de edad, propiedad intelectual y exención de dinero real.</p>
              <Link to="/animepackopening/terminos-y-condiciones" className={styles.legalCardLink}>
                Ver Términos y Condiciones →
              </Link>
            </article>

            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>🗑️</div>
              <h3>Eliminación de Cuenta</h3>
              <p>La eliminación de tu cuenta y datos se realiza directamente desde el botón ubicado dentro de los ajustes de la aplicación móvil.</p>
              <Link to="/animepackopening/eliminar-cuenta" className={styles.legalCardLink}>
                Información de Eliminación →
              </Link>
            </article>

            <article className={styles.legalSummaryCard}>
              <div className={styles.legalIcon}>✉️</div>
              <h3>Contacto Legal y Soporte</h3>
              <p>Formulario de atención directa al desarrollador para resolver dudas, incidencias o ejercitar tus derechos de privacidad.</p>
              <Link to="/animepackopening/contacto" className={styles.legalCardLink}>
                Formulario de Contacto →
              </Link>
            </article>
          </div>
        </section>
      </main>

      {/* COOKIE BANNER & FOOTER */}
      <CookieBanner />
      <AnimeFooter />
    </div>
  );
}
