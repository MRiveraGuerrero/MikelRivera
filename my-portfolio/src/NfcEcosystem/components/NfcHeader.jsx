import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, UserCheck, ArrowRight, Menu, X } from "lucide-react";
import styles from "./NfcHeader.module.css";

// Custom vector logo combining a river stream with subtle NFC data signal
function NfcRiverLogo({ className }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top stream curve with data accent */}
      <path
        d="M3.5 9.5C7.5 9.5 9.5 6 14 6C18.5 6 20.5 9.5 24.5 9.5"
        stroke="#0ea5e9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Middle main stream curve */}
      <path
        d="M3.5 14.5C7.5 14.5 9.5 11 14 11C18.5 11 20.5 14.5 24.5 14.5"
        stroke="#f8fafc"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Bottom stream curve */}
      <path
        d="M3.5 19.5C7.5 19.5 9.5 16 14 16C18.5 16 20.5 19.5 24.5 19.5"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      {/* Subtle NFC signal / data origin dot */}
      <circle cx="24.5" cy="6" r="1.5" fill="#38bdf8" />
    </svg>
  );
}

export default function NfcHeader({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
        <Link to="/nfc" className={styles.logoGroup} aria-label="NFC River - Inicio">
          <NfcRiverLogo className={styles.logoIcon} />
          <div className={styles.brandName}>
            <span className={styles.brandNfc}>NFC</span>
            <span className={styles.brandRiver}>River</span>
            <span className={styles.brandDot}>.</span>
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
            <UserCheck size={15} />
            <span>Mi Panel</span>
          </Link>

          <Link to="/nfc/store" className={styles.primaryBtn}>
            <span>Pedir Tarjeta</span>
            <ArrowRight size={15} className={styles.btnArrow} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menú"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <Link
            to="/nfc"
            className={`${styles.mobileNavLink} ${isActive("/nfc") ? styles.mobileActive : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <a
            href="#hero-nfc"
            className={styles.mobileNavLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            Experiencia NFC
          </a>
          <Link
            to="/nfc/store"
            className={`${styles.mobileNavLink} ${isActive("/nfc/store") ? styles.mobileActive : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Tienda
          </Link>
          <Link
            to="/nfc/dashboard"
            className={`${styles.mobileNavLink} ${isActive("/nfc/dashboard") ? styles.mobileActive : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Panel de Gestión
          </Link>
          <div className={styles.mobileActions}>
            <Link
              to="/nfc/dashboard"
              className={styles.mobileSecondaryBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserCheck size={16} />
              <span>Mi Panel</span>
            </Link>
            <Link
              to="/nfc/store"
              className={styles.primaryBtn}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Pedir Tarjeta NFC</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
