import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, UserCheck, ArrowRight, Menu, X } from "lucide-react";
import styles from "./NfcHeader.module.css";

// Official NFC River SVG symbol — exact reproduction from brand identity
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
        <linearGradient id="hg1" x1="120" y1="125" x2="360" y2="235" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5B7CFA" />
          <stop offset="0.55" stopColor="#2FA7E8" />
          <stop offset="1" stopColor="#58D0C7" />
        </linearGradient>
        <linearGradient id="hg2" x1="85" y1="250" x2="420" y2="390" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6D86FF" />
          <stop offset="0.5" stopColor="#2FA9EA" />
          <stop offset="1" stopColor="#55D4C8" />
        </linearGradient>
        <linearGradient id="hg3" x1="85" y1="300" x2="370" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8FB8E8" />
          <stop offset="0.55" stopColor="#3BAAE8" />
          <stop offset="1" stopColor="#5CD2C7" />
        </linearGradient>
      </defs>
      {/* upper flowing loop / subtle R */}
      <path
        d="M138 176 C192 125 278 120 326 150 C362 173 365 213 341 238 C322 258 292 260 267 248"
        fill="none"
        stroke="url(#hg1)"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* main river current */}
      <path
        d="M90 279 C144 245 184 245 232 278 C286 315 319 345 380 343 C409 342 430 336 448 325"
        fill="none"
        stroke="url(#hg2)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* lower current */}
      <path
        d="M88 327 C139 298 181 299 225 329 C270 360 300 390 350 394 C376 396 398 390 416 380"
        fill="none"
        stroke="url(#hg3)"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NfcHeader({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          <NfcRiverSymbol className={styles.logoIcon} />
          <div className={styles.brandName}>
            <span className={styles.brandNfc}>NFC</span>
            <span className={styles.brandRiver}>River</span>
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
