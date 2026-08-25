import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wifi, ShoppingBag, UserCheck, Menu, X, Sparkles } from "lucide-react";
import styles from "./NfcHeader.module.css";

export default function NfcHeader({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <Link to="/nfc" className={styles.logoGroup}>
          <div className={styles.logoIconWrapper}>
            <Wifi className={styles.nfcIcon} />
            <span className={styles.logoGlow} />
          </div>
          <div className={styles.brandName}>
            <span>NFC</span>
            <span className={styles.highlight}>PULSE</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link
            to="/nfc"
            className={`${styles.navLink} ${isActive("/nfc") ? styles.active : ""}`}
          >
            Inicio
          </Link>
          <a href="#hero-nfc" className={styles.navLink}>
            Experiencia NFC
          </a>
          <Link
            to="/nfc/store"
            className={`${styles.navLink} ${isActive("/nfc/store") ? styles.active : ""}`}
          >
            Tienda
          </Link>
          <Link
            to="/nfc/dashboard"
            className={`${styles.navLink} ${isActive("/nfc/dashboard") ? styles.active : ""}`}
          >
            Panel de Gestión
          </Link>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <Link to="/nfc/store" className={styles.cartBtn} title="Ver Tienda / Carrito">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Link>

          <Link to="/nfc/dashboard" className={styles.secondaryBtn}>
            <UserCheck size={16} />
            <span>Mi Panel</span>
          </Link>

          <Link to="/nfc/store" className={styles.primaryBtn}>
            <Sparkles size={16} />
            <span>Pedir Tarjeta</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <Link
            to="/nfc"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/nfc/store"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Tienda de Tarjetas
          </Link>
          <Link
            to="/nfc/dashboard"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Panel de Control
          </Link>
          <div className={styles.mobileActions}>
            <Link
              to="/nfc/store"
              className={styles.primaryBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pedir Tarjeta NFC
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
