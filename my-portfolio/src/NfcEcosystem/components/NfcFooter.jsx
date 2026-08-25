import React from "react";
import { Link } from "react-router-dom";
import { Wifi, ArrowUpRight, ShieldCheck, Truck, Headphones, Heart } from "lucide-react";
import styles from "./NfcFooter.module.css";

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
              <div className={styles.logoIcon}>
                <Wifi size={20} className={styles.nfcIcon} />
              </div>
              <span className={styles.brandName}>
                NFC <span className={styles.highlight}>PULSE</span>
              </span>
            </div>
            <p className={styles.brandBio}>
              El ecosistema digital inteligente para compartir tu perfil profesional, vCard, redes
              sociales y catálogo con un solo toque NFC sin necesidad de aplicaciones.
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
            <p>© {new Date().getFullYear()} NFC Pulse Ecosystem. Desarrollado con tecnología de vanguardia.</p>
            <p className={styles.madeWith}>
              Hecho con <Heart size={14} className={styles.heartIcon} /> por Mikel Rivera
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
