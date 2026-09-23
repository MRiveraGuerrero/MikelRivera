import React from "react";
import { Link } from "react-router-dom";
import styles from "./AnimeFooter.module.css";

export default function AnimeFooter() {
  return (
    <footer className={styles.footer} aria-label="Pie de página legal de Anime Pack Opening">
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <div className={styles.logoTitle}>
              <span className={styles.pinkLogo}>ANIME</span> PACK OPENING
            </div>
            <p className={styles.brandDesc}>
              La experiencia definitiva de coleccionar y abrir sobres de cartas anime en Sakura Eclipse. Sumérgete en el cosmos de los guerreros astrales y los espíritus sakura.
            </p>
            <div className={styles.devBadge}>
              <span className={styles.devTag}>Desarrollador Oficial:</span>
              <span className={styles.devName}>[AÑADIR NOMBRE LEGAL DEL DESARROLLADOR]</span>
            </div>
          </div>

          {/* Legal Links Column */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>Cumplimiento Legal</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/animepackopening/privacidad" className={styles.footerLink}>
                  🔒 Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/terminos-y-condiciones" className={styles.footerLink}>
                  📄 Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/eliminar-cuenta" className={styles.footerLink}>
                  🗑️ Eliminación de Cuenta y Datos
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/cookies" className={styles.footerLink}>
                  🍪 Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/animepackopening/contacto" className={styles.footerLink}>
                  ✉️ Contacto Legal y Soporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support & App Badges */}
          <div className={styles.supportCol}>
            <h3 className={styles.colTitle}>Soporte y Google Play</h3>
            <p className={styles.supportText}>
              Para consultas legales, ejercitar derechos ARCO+ o solicitar soporte técnico directo:
            </p>
            <a href="mailto:mikelrg2003@gmail.com" className={styles.emailBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              [AÑADIR CORREO DE SOPORTE]
            </a>
            <div className={styles.gpComplianceTag}>
              ✅ Enlaces públicos aptos para la Ficha de Google Play Console
            </div>
          </div>
        </div>

        {/* IP Disclaimer Notice */}
        <div className={styles.disclaimerBox}>
          <p className={styles.disclaimerText}>
            <strong>Aviso de Propiedad Intelectual:</strong> Anime Pack Opening de Sakura Eclipse es una obra original independiente de juego de cartas coleccionables (TCG). Todas las marcas, ilustraciones, nombres y mecánicas son propiedad exclusiva de su desarrollador. No se utiliza material ni propiedad intelectual de terceros protegida por copyright sin licencia.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} Anime Pack Opening • Sakura Eclipse TCG. Todos los derechos reservados.
          </p>
          <div className={styles.langBadge}>
            🇪🇸 Español (España)
          </div>
        </div>
      </div>
    </footer>
  );
}
