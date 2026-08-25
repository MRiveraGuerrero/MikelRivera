import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import styles from "./NfcStoreSection.module.css";

const PRODUCTS = [
  {
    id: "nfc-steel-black",
    name: "Tarjetas NFC Acero Mate Stealth",
    tagline: "Ultra resistente, elegancia profesional",
    price: "29.99€",
    originalPrice: "39.99€",
    badge: "MÁS VENDIDA",
    color: "linear-gradient(135deg, #1e2029 0%, #0a0b10 100%)",
    accentColor: "#00f0ff",
    material: "Acero Inoxidable Mate",
    chip: "NTAG216 (888 bytes)",
    compatibility: "iOS & Android",
    waterproof: "100% Resistente al agua",
  },
  {
    id: "nfc-wood-walnut",
    name: "Tarjetas NFC Madera Nogal Natural",
    tagline: "Eco-friendly, grabado a láser de precisión",
    price: "24.99€",
    originalPrice: "34.99€",
    badge: "ECO FRIENDLY",
    color: "linear-gradient(135deg, #3d2618 0%, #1c100a 100%)",
    accentColor: "#f59e0b",
    material: "Madera de Nogal Sostenible",
    chip: "NTAG216 (888 bytes)",
    compatibility: "iOS & Android",
    waterproof: "Tratamiento impermeable",
  },
  {
    id: "nfc-metal-gold",
    name: "Tarjetas NFC Luxury Gold 24K",
    tagline: "Impacto garantizado, acabado de espejo",
    price: "39.99€",
    originalPrice: "49.99€",
    badge: "EDICIÓN PREMIUM",
    color: "linear-gradient(135deg, #4d3e17 0%, #1f1807 100%)",
    accentColor: "#eab308",
    material: "Baño Dorado 24K Mirror Finish",
    chip: "NTAG216 High Speed",
    compatibility: "iOS & Android",
    waterproof: "Protección anti-rayaduras",
  },
  {
    id: "nfc-epoxy-keyring",
    name: "Llavero / Token NFC Epoxy",
    tagline: "Siempre contigo en tus llaves",
    price: "14.99€",
    originalPrice: "19.99€",
    badge: "COMPACTO",
    color: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    accentColor: "#38bdf8",
    material: "Resina Epoxy Anti-golpes",
    chip: "NTAG216",
    compatibility: "iOS & Android",
    waterproof: "Sumergible",
  },
  {
    id: "nfc-stand-table",
    name: "Peana NFC Reseñas Google & Menú",
    tagline: "Para mostradores, bares y negocios",
    price: "34.99€",
    originalPrice: "44.99€",
    badge: "NEGOCIOS",
    color: "linear-gradient(135deg, #4c1d95 0%, #2e1065 100%)",
    accentColor: "#a855f7",
    material: "Metacrilato Cristal 4mm",
    chip: "NTAG216 High Power Range",
    compatibility: "iOS & Android",
    waterproof: "Fácil limpieza",
  },
];

export default function NfcStoreSection({ onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedItems, setAddedItems] = useState({});

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const handleAdd = (product) => {
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    if (onAddToCart) onAddToCart(product);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <section id="nfc-store" className={styles.storeSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.tag}>
            <Sparkles size={14} />
            <span>TIENDA DE DISPOSITIVOS NFC</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Elige el formato perfecto para <span className={styles.gradientText}>tu marca</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Tarjetas físicas con tecnología chip NTAG216 de máxima memoria, listas para configurar
            y actualizar en tiempo real desde tu panel.
          </p>
        </div>

        {/* Product Slider Stage */}
        <div className={styles.sliderWrapper}>
          <button className={styles.navArrowLeft} onClick={handlePrev} aria-label="Anterior">
            <ChevronLeft size={24} />
          </button>

          <div className={styles.sliderTrackContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={styles.productCardActive}
              >
                {/* Visual Card Preview */}
                <div
                  className={styles.productVisual}
                  style={{ background: PRODUCTS[currentIndex].color }}
                >
                  <span className={styles.productBadge}>{PRODUCTS[currentIndex].badge}</span>

                  <div
                    className={styles.nfcCardMockup}
                    style={{
                      borderColor: PRODUCTS[currentIndex].accentColor,
                      boxShadow: `0 15px 35px ${PRODUCTS[currentIndex].accentColor}33`,
                    }}
                  >
                    <div className={styles.mockupHeader}>
                      <span className={styles.mockupLogo}>NFC PULSE</span>
                      <span className={styles.mockupSignal}>)))</span>
                    </div>
                    <div className={styles.mockupChip} />
                    <div className={styles.mockupBody}>
                      <span className={styles.mockupName}>{PRODUCTS[currentIndex].name}</span>
                      <span className={styles.mockupSub}>Sin aplicaciones necesarias</span>
                    </div>
                  </div>

                  <div className={styles.featureGrid}>
                    <div className={styles.featureItem}>
                      <Zap size={13} className={styles.featureIcon} />
                      <span>{PRODUCTS[currentIndex].chip}</span>
                    </div>
                    <div className={styles.featureItem}>
                      <ShieldCheck size={13} className={styles.featureIcon} />
                      <span>{PRODUCTS[currentIndex].waterproof}</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{PRODUCTS[currentIndex].name}</h3>
                  <p className={styles.productTagline}>{PRODUCTS[currentIndex].tagline}</p>

                  <div className={styles.priceRow}>
                    <span className={styles.currentPrice}>{PRODUCTS[currentIndex].price}</span>
                    <span className={styles.oldPrice}>{PRODUCTS[currentIndex].originalPrice}</span>
                    <span className={styles.vatInfo}>Envío 24-48h incluido</span>
                  </div>

                  <ul className={styles.specList}>
                    <li>
                      <Check size={14} className={styles.checkIcon} />
                      <span>Material: <strong>{PRODUCTS[currentIndex].material}</strong></span>
                    </li>
                    <li>
                      <Check size={14} className={styles.checkIcon} />
                      <span>Configurable desde el Panel de Gestión</span>
                    </li>
                    <li>
                      <Check size={14} className={styles.checkIcon} />
                      <span>Toques ilimitados de por vida</span>
                    </li>
                    <li>
                      <Check size={14} className={styles.checkIcon} />
                      <span>Compatible con 100% teléfonos actuales</span>
                    </li>
                  </ul>

                  <div className={styles.actionRow}>
                    <button
                      className={styles.addToCartBtn}
                      onClick={() => handleAdd(PRODUCTS[currentIndex])}
                    >
                      {addedItems[PRODUCTS[currentIndex].id] ? (
                        <>
                          <Check size={18} />
                          <span>¡Añadido al Carrito!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          <span>Añadir al Carrito</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={styles.navArrowRight} onClick={handleNext} aria-label="Siguiente">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className={styles.dotsRow}>
          {PRODUCTS.map((p, idx) => (
            <button
              key={p.id}
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir al producto ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA to Full Store */}
        <div className={styles.fullStoreCta}>
          <Link to="/nfc/store" className={styles.fullStoreBtn}>
            <span>Acceder a la Tienda Completa de Productos</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
