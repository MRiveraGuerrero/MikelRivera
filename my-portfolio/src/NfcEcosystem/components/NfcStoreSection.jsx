import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  RotateCw,
  Check,
  ArrowRight,
  Truck,
  Star,
  MessageSquare,
  UserCheck
} from "lucide-react";
import styles from "./NfcStoreSection.module.css";

import design1Front from "../assets/Design 1 Front.png";
import design1Back from "../assets/Design 1 Back.png";
import design2Front from "../assets/Design 2 Front.png";
import design2Back from "../assets/Design 2 Back.png";
import design3Front from "../assets/Design 3 Front.png";
import design3Back from "../assets/Design 3 Back.png";

const MODELS = [
  {
    id: "profile",
    shortName: "Perfil NFC",
    name: "Tarjeta Perfil Digital NFC",
    subtitle: "Comparte tu contacto vCard, redes sociales y portfolio en 1 toque",
    badge: "MÁS POPULAR",
    price: "29,99€",
    originalPrice: "39,99€",
    discount: "-25%",
    frontImg: design3Front,
    backImg: design3Back,
    accent: "#38BDF8",
    gradient: "linear-gradient(120deg, #60A5FA 0%, #38BDF8 50%, #34D399 100%)",
    haloColor: "rgba(56, 189, 248, 0.22)",
    icon: UserCheck,
    specs: [
      { label: "Función Principal", value: "Perfil vCard 3.0 & Redes Sociales" },
      { label: "Material", value: "Acero Inoxidable Mate Anti-Huellas" },
      { label: "Chip NFC", value: "NTAG216 (888 Bytes — Máxima Memoria)" },
      { label: "Compatibilidad", value: "100% iOS & Android sin aplicaciones" },
      { label: "Garantía", value: "Ilimitada de por vida" },
    ]
  },
  {
    id: "google",
    shortName: "Reseñas Google",
    name: "Tarjeta Reseñas Google 5★",
    subtitle: "Consigue reseñas de 5 estrellas al instante en tu ficha de Google Maps",
    badge: "MÁS VENDIDA EN NEGOCIOS",
    price: "34,99€",
    originalPrice: "44,99€",
    discount: "-22%",
    frontImg: design2Front,
    backImg: design2Back,
    accent: "#FBBC05",
    gradient: "linear-gradient(120deg, #FDE047 0%, #FBBC05 50%, #F59E0B 100%)",
    haloColor: "rgba(251, 188, 5, 0.22)",
    icon: Star,
    specs: [
      { label: "Función Principal", value: "Apertura directa de Ficha Google Maps" },
      { label: "Material", value: "Baño Dorado / Acero Pulido 24K" },
      { label: "Chip NFC", value: "NTAG216 High Speed Pro" },
      { label: "Compatibilidad", value: "100% iOS & Android sin aplicaciones" },
      { label: "Garantía", value: "Ilimitada de por vida" },
    ]
  },
  {
    id: "whatsapp",
    shortName: "WhatsApp",
    name: "Tarjeta WhatsApp Business",
    subtitle: "Abre un chat directo de WhatsApp con tu cliente sin guardar número",
    badge: "CONTACTO DIRECTO",
    price: "24,99€",
    originalPrice: "34,99€",
    discount: "-28%",
    frontImg: design1Front,
    backImg: design1Back,
    accent: "#25D366",
    gradient: "linear-gradient(120deg, #4ADE80 0%, #25D366 50%, #10B981 100%)",
    haloColor: "rgba(37, 211, 102, 0.22)",
    icon: MessageSquare,
    specs: [
      { label: "Función Principal", value: "Chat inmediato en WhatsApp Business" },
      { label: "Material", value: "Polímero Neón Ultra-Resistente" },
      { label: "Chip NFC", value: "NTAG216 High Power Range" },
      { label: "Compatibilidad", value: "100% iOS & Android sin aplicaciones" },
      { label: "Garantía", value: "Ilimitada de por vida" },
    ]
  }
];

export default function NfcStoreSection({ onAddToCart }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const currentModel = MODELS[selectedIndex];

  const handleSelectModel = (idx) => {
    setSelectedIndex(idx);
    setIsFlipped(false);
  };

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    if (onAddToCart) onAddToCart(currentModel);
    setTimeout(() => {
      setIsAdded(false);
    }, 2200);
  };

  return (
    <section id="nfc-store" className={styles.storeSection}>
      {/* Halo ambiental dinámico según el modelo seleccionado */}
      <div
        className={styles.dynamicHalo}
        style={{ background: currentModel.haloColor }}
      />

      <div className={styles.container}>
        {/* Cabecera limpia en 1 sola línea */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Elige tu{" "}
            <span
              className={styles.gradientText}
              style={{
                "--model-gradient": currentModel.gradient,
              }}
            >
              tarjeta
            </span>
          </h2>
        </div>

        {/* Layout Principal 2 Columnas */}
        <div className={styles.storeShowcaseGrid}>
          {/* COLUMNA IZQUIERDA: Tarjeta 3D Flotante e Interactiva */}
          <div className={styles.visual3DColumn}>
            <div className={styles.visualCardBadgeRow}>
              <span
                className={styles.modelBadge}
                style={{ borderColor: `${currentModel.accent}44`, color: currentModel.accent }}
              >
                {currentModel.badge}
              </span>
              <span className={styles.viewStateIndicator}>
                {isFlipped ? "Vista Posterior (Dorso)" : "Vista Frontal (Cara)"}
              </span>
            </div>

            {/* Escenario 3D de la tarjeta */}
            <div className={styles.card3DStage}>
              <motion.div
                className={styles.card3DWrapper}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "easeInOut",
                }}
                onClick={handleToggleFlip}
              >
                <motion.div
                  className={styles.card3DInner}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 110, damping: 16 }}
                >
                  {/* Cara Frontal */}
                  <div className={styles.cardFaceFront}>
                    <img
                      src={currentModel.frontImg}
                      alt={`${currentModel.name} Frontal`}
                      className={styles.cardImg}
                    />
                    <div className={styles.cardShimmerOverlay} />
                  </div>

                  {/* Cara Posterior (Dorso) */}
                  <div className={styles.cardFaceBack}>
                    <img
                      src={currentModel.backImg}
                      alt={`${currentModel.name} Posterior`}
                      className={styles.cardImg}
                    />
                    <div className={styles.cardShimmerOverlay} />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Control de giro 3D */}
            <div className={styles.flipControlsRow}>
              <button
                className={styles.flipToggleBtn}
                onClick={handleToggleFlip}
                style={{ borderColor: `${currentModel.accent}44` }}
              >
                <RotateCw size={15} className={isFlipped ? styles.rotateIconFlipped : ""} />
                <span>{isFlipped ? "Ver Cara Frontal" : "Voltear Tarjeta en 3D"}</span>
              </button>

              <div className={styles.sidePillSelector}>
                <button
                  className={`${styles.sidePill} ${!isFlipped ? styles.sidePillActive : ""}`}
                  onClick={() => setIsFlipped(false)}
                >
                  Frontal
                </button>
                <button
                  className={`${styles.sidePill} ${isFlipped ? styles.sidePillActive : ""}`}
                  onClick={() => setIsFlipped(true)}
                >
                  Dorso
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: Especificaciones, Precios y Selector Abajo */}
          <div className={styles.detailsColumn}>
            {/* Información del producto seleccionado */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentModel.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={styles.modelInfoCard}
              >
                <h3 className={styles.modelTitle}>
                  {currentModel.name}
                </h3>
                <p className={styles.modelSubtitle}>{currentModel.subtitle}</p>

                {/* Precio y etiqueta de envío */}
                <div className={styles.priceContainer}>
                  <div className={styles.priceGroup}>
                    <span className={styles.currentPrice} style={{ color: currentModel.accent }}>
                      {currentModel.price}
                    </span>
                    <span className={styles.originalPrice}>{currentModel.originalPrice}</span>
                    <span className={styles.discountTag}>{currentModel.discount}</span>
                  </div>
                  <div className={styles.shippingTag}>
                    <Truck size={14} />
                    <span>Envío express 24/48h gratis</span>
                  </div>
                </div>

                {/* Especificaciones Técnicas */}
                <div className={styles.specsContainer}>
                  <h4 className={styles.specsHeaderTitle}>Especificaciones del producto</h4>
                  <ul className={styles.specsList}>
                    {currentModel.specs.map((spec, sIdx) => (
                      <li key={sIdx} className={styles.specItem}>
                        <Check size={15} className={styles.checkIcon} style={{ color: currentModel.accent }} />
                        <span className={styles.specLabel}>{spec.label}:</span>
                        <strong className={styles.specValue}>{spec.value}</strong>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selector de los 3 Modelos con Preview (Abajo) */}
                <div className={styles.modelTabsHeader}>
                  <span className={styles.selectorLabel}>Selecciona el modelo:</span>
                  <div className={styles.modelTabsList}>
                    {MODELS.map((m, idx) => {
                      const Icon = m.icon;
                      const isActive = idx === selectedIndex;
                      return (
                        <button
                          key={m.id}
                          className={`${styles.modelTabBtn} ${isActive ? styles.modelTabActive : ""}`}
                          onClick={() => handleSelectModel(idx)}
                          style={
                            isActive
                              ? {
                                  borderColor: m.accent,
                                  color: "#FFFFFF",
                                  background: `${m.accent}1A`,
                                  boxShadow: `0 4px 18px ${m.accent}25`,
                                }
                              : {}
                          }
                        >
                          <div className={styles.previewThumbWrapper} style={{ borderColor: `${m.accent}55` }}>
                            <img src={m.frontImg} alt={m.shortName} className={styles.previewThumbImg} />
                          </div>
                          <div className={styles.tabTextInfo}>
                            <div className={styles.tabHeaderRow}>
                              <Icon size={13} style={{ color: m.accent }} />
                              <span className={styles.tabTitle}>{m.shortName}</span>
                            </div>
                            <span className={styles.tabPrice}>{m.price}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Acciones principales */}
                <div className={styles.actionsRow}>
                  <button
                    className={styles.addToCartBtn}
                    onClick={handleAddToCart}
                    style={{
                      background: isAdded
                        ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
                        : currentModel.gradient,
                      boxShadow: `0 8px 25px ${currentModel.accent}35`,
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={19} />
                        <span>¡Añadido al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={19} />
                        <span>Añadir al Carrito ({currentModel.price})</span>
                      </>
                    )}
                  </button>

                  <Link to="/nfc/store" className={styles.viewFullStoreBtn}>
                    <span>Ver Tienda Completa</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
