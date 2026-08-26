import React, { useState } from "react";
import NfcHeader from "../components/NfcHeader";
import NfcFooter from "../components/NfcFooter";
import { ShoppingCart, Check, Sparkles, Filter, ShieldCheck, Zap, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NfcStorePage.module.css";

const STORE_ITEMS = [
  {
    id: "steel-black",
    name: "Tarjeta NFC Acero Mate Stealth",
    category: "metal",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 128,
    badge: "MÁS VENDIDO",
    bg: "linear-gradient(135deg, #181920, #08090d)",
    accent: "#2FA7E8",
    material: "Acero Inoxidable Mate",
  },
  {
    id: "wood-walnut",
    name: "Tarjeta NFC Madera Nogal Premium",
    category: "wood",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 95,
    badge: "ECO",
    bg: "linear-gradient(135deg, #3d2618, #1c100a)",
    accent: "#f59e0b",
    material: "Madera de Nogal Grabada",
  },
  {
    id: "gold-24k",
    name: "Tarjeta NFC Luxury Gold 24K",
    category: "metal",
    price: 39.99,
    originalPrice: 49.99,
    rating: 5.0,
    reviews: 64,
    badge: "EDICIÓN LUJO",
    bg: "linear-gradient(135deg, #4d3e17, #1f1807)",
    accent: "#eab308",
    material: "Baño de Oro Espejo 24K",
  },
  {
    id: "holo-cyber",
    name: "Tarjeta NFC Cyber Hologram",
    category: "pvc",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviews: 42,
    badge: "NUEVO",
    bg: "linear-gradient(135deg, #2a0845, #6441a5, #000000)",
    accent: "#ec4899",
    material: "PVC Iridiscente Reflectante",
  },
  {
    id: "epoxy-keyring",
    name: "Llavero NFC Epoxy Compact",
    category: "accessories",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.9,
    reviews: 210,
    badge: "TOP ACCESORIO",
    bg: "linear-gradient(135deg, #0284c7, #0369a1)",
    accent: "#38bdf8",
    material: "Resina Epoxy Anti-golpes",
  },
  {
    id: "stand-google",
    name: "Peana NFC Restaurante & Reseñas Google",
    category: "stand",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviews: 87,
    badge: "NEGOCIOS",
    bg: "linear-gradient(135deg, #4c1d95, #2e1065)",
    accent: "#a855f7",
    material: "Metacrilato Cristal 4mm",
  },
];

export default function NfcStorePage({ cartCount, onAddToCart }) {
  const [filter, setFilter] = useState("all");
  const [customName, setCustomName] = useState("TU NOMBRE");
  const [addedIds, setAddedIds] = useState({});

  const filteredItems = STORE_ITEMS.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const handleAddToCart = (item) => {
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    if (onAddToCart) onAddToCart(item);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <div className={styles.storePage}>
      <NfcHeader cartCount={cartCount} />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Breadcrumb & Hero */}
          <div className={styles.storeHero}>
            <Link to="/nfc" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Volver a la Home NFC</span>
            </Link>

            <h1 className={styles.title}>
              Tienda Oficial <span className={styles.highlight}>NFC River</span>
            </h1>
            <p className={styles.subtitle}>
              Personaliza tu tarjeta NFC con grabado láser instantáneo y chip inteligente NTAG216.
            </p>
          </div>

          {/* Interactive Live Customization Previewer */}
          <div className={styles.customizerSection}>
            <div className={styles.customizerText}>
              <div className={styles.customBadge}>
                <Sparkles size={14} />
                <span>PERSONALIZADOR EN TIEMPO REAL</span>
              </div>
              <h3>Escribe tu nombre para previsualizar tu tarjeta</h3>
              <p>El texto que escribas se grabará con láser de alta definición en la tarjeta.</p>
              
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  maxLength={24}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Tu Nombre o Marca"
                  className={styles.nameInput}
                />
                <button className={styles.resetBtn} onClick={() => setCustomName("MIKEL RIVERA")}>
                  <RefreshCw size={14} />
                  <span>Ejemplo</span>
                </button>
              </div>
            </div>

            <div className={styles.customizerCardPreview}>
              <div className={styles.cardPreviewSkin}>
                <div className={styles.cardHeader}>
                  <span>NFC RIVER</span>
                  <span>)))</span>
                </div>
                <div className={styles.cardChip} />
                <div className={styles.cardBody}>
                  <span className={styles.customNameDisplay}>
                    {customName || "TU NOMBRE AQUÍ"}
                  </span>
                  <span className={styles.customSub}>TECH LEAD & CREATOR</span>
                </div>
                <div className={styles.cardFooter}>
                  <span>NTAG216 • LASER ENGRAVED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterTag}>
              <Filter size={16} />
              <span>Filtrar por Categoría:</span>
            </div>
            <div className={styles.filterBtns}>
              <button
                className={`${styles.filterBtn} ${filter === "all" ? styles.activeFilter : ""}`}
                onClick={() => setFilter("all")}
              >
                Todos
              </button>
              <button
                className={`${styles.filterBtn} ${filter === "metal" ? styles.activeFilter : ""}`}
                onClick={() => setFilter("metal")}
              >
                Metal & Acero
              </button>
              <button
                className={`${styles.filterBtn} ${filter === "wood" ? styles.activeFilter : ""}`}
                onClick={() => setFilter("wood")}
              >
                Madera Ecológica
              </button>
              <button
                className={`${styles.filterBtn} ${filter === "accessories" ? styles.activeFilter : ""}`}
                onClick={() => setFilter("accessories")}
              >
                Llaveros & Tags
              </button>
              <button
                className={`${styles.filterBtn} ${filter === "stand" ? styles.activeFilter : ""}`}
                onClick={() => setFilter("stand")}
              >
                Peanas Negocio
              </button>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className={styles.catalogGrid}>
            {filteredItems.map((item) => (
              <div key={item.id} className={styles.catalogCard}>
                <div className={styles.cardVisual} style={{ background: item.bg }}>
                  <span className={styles.cardBadge}>{item.badge}</span>
                  <div
                    className={styles.miniCard}
                    style={{ borderColor: item.accent }}
                  >
                    <div className={styles.miniHeader}>
                      <span>NFC</span>
                      <span>)))</span>
                    </div>
                    <div className={styles.miniChip} />
                    <div className={styles.miniName}>{customName || item.name}</div>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3>{item.name}</h3>
                  <p className={styles.materialTag}>{item.material}</p>
                  
                  <div className={styles.ratingRow}>
                    <span>⭐ {item.rating}</span>
                    <span className={styles.reviewsCount}>({item.reviews} opiniones)</span>
                  </div>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>{item.price}€</span>
                    <span className={styles.origPrice}>{item.originalPrice}€</span>
                  </div>

                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(item)}
                  >
                    {addedIds[item.id] ? (
                      <>
                        <Check size={16} />
                        <span>Añadido</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        <span>Añadir al Carrito</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <NfcFooter />
    </div>
  );
}
