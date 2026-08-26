import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Truck, Headphones, Heart } from "lucide-react";
import styles from "./NfcFooter.module.css";

// Official NFC River symbol (same as header)
function NfcRiverSymbol({ className }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fg1" x1="120" y1="125" x2="360" y2="235" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5B7CFA" />
          <stop offset="0.55" stopColor="#2FA7E8" />
          <stop offset="1" stopColor="#58D0C7" />
        </linearGradient>
        <linearGradient id="fg2" x1="85" y1="250" x2="420" y2="390" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6D86FF" />
          <stop offset="0.5" stopColor="#2FA9EA" />
          <stop offset="1" stopColor="#55D4C8" />
        </linearGradient>
        <linearGradient id="fg3" x1="85" y1="300" x2="370" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8FB8E8" />
          <stop offset="0.55" stopColor="#3BAAE8" />
          <stop offset="1" stopColor="#5CD2C7" />
        </linearGradient>
      </defs>
      <path
        d="M138 176 C192 125 278 120 326 150 C362 173 365 213 341 238 C322 258 292 260 267 248"
        fill="none"
        stroke="url(#fg1)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M90 279 C144 245 184 245 232 278 C286 315 319 345 380 343 C409 342 430 336 448 325"
        fill="none"
        stroke="url(#fg2)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 327 C139 298 181 299 225 329 C270 360 300 390 350 394 C376 396 398 390 416 380"
        fill="none"
        stroke="url(#fg3)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NfcFooter() {
  return (
    <footer className={styles.footer}>
      {/* Guarantees Bar */}
      <div className={styles.guaranteeBar}>
        <div className={styles.guaranteeContainer}>
          <div className={styles.guaranteeItem}>
            <Truck size={20} className={styles.guaranteeIcon} />
            <div>
              <strong>Envío Rápido 24/48h</strong>
              <span>A toda la Península e Islas</span>
            </div>
          </div>
          <div className={styles.guaranteeItem}>
            <ShieldCheck size={20} className={styles.guaranteeIcon} />
            <div>
              <strong>Garantía de Por Vida</strong>
              <span>Chip NTAG216 alta durabilidad</span>
            </div>
          </div>
          <div className={styles.guaranteeItem}>
            <Headphones size={20} className={styles.guaranteeIcon} />
            <div>
              <strong>Soporte Técnico 24/7</strong>
              <span>Ayuda en la configuración</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainFooter}>
        <div className={styles.container}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.logoGroup}>
              <NfcRiverSymbol className={styles.logoSymbol} />
              <span className={styles.brandName}>
                <span className={styles.brandNfc}>NFC</span>
                <span className={styles.brandRiver}>River</span>
              </span>
            </div>
            <p className={styles.brandBio}>
              El ecosistema digital inteligente para compartir tu perfil profesional, vCard,
              redes sociales y catálogo con un solo toque NFC sin necesidad de aplicaciones.
            </p>
          </div>

          {/* Nav Links */}
          <div className={styles.linksCol}>
            <h4>Navegación</h4>
            <ul>
              <li><Link to="/nfc">Inicio Ecosistema</Link></li>
              <li><a href="#hero-nfc">Experiencia NFC Hero</a></li>
              <li><Link to="/nfc/store">Tienda de Tarjetas</Link></li>
              <li><Link to="/nfc/dashboard">Panel de Gestión</Link></li>
            </ul>
          </div>

          {/* Products Links */}
          <div className={styles.linksCol}>
            <h4>Productos</h4>
            <ul>
              <li><Link to="/nfc/store">Tarjetas NFC Acero Stealth</Link></li>
              <li><Link to="/nfc/store">Tarjetas NFC Madera Nogal</Link></li>
              <li><Link to="/nfc/store">Tarjetas NFC Luxury Gold 24K</Link></li>
              <li><Link to="/nfc/store">Llaveros NFC & Epoxy Tags</Link></li>
              <li><Link to="/nfc/store">Peanas Reseñas Google</Link></li>
            </ul>
          </div>

          {/* Portfolio & Back Link */}
          <div className={styles.linksCol}>
            <h4>Portfolio & Proyectos</h4>
            <ul>
              <li>
                <Link to="/" className={styles.externalLink}>
                  <span>Volver a MikelRivera.dev</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/projects" className={styles.externalLink}>
                  <span>Proyectos & SaaS</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/portfolios" className={styles.externalLink}>
                  <span>Selector de Portfolios</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContainer}>
            <p>© {new Date().getFullYear()} NFC River. Todos los derechos reservados.</p>
            <p className={styles.madeWith}>
              Hecho con <Heart size={14} className={styles.heartIcon} /> por Mikel Rivera
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
