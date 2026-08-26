import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Smartphone, BarChart3, RefreshCw, Layers, Star, Instagram, Utensils, MessageSquare, ExternalLink, ArrowRight, Shield, Zap } from "lucide-react";
import styles from "./NfcDashboardSection.module.css";

const PANEL_MODES = [
  {
    id: "vcard",
    title: "Contacto / vCard 3.0",
    description: "Al tocar la tarjeta se abre la ficha de contacto con botón instantáneo para guardar en la agenda.",
    icon: Settings,
    badgeColor: "#00f0ff",
    screenContent: {
      header: "Perfil vCard Oficial",
      subtitle: "Mikel Rivera • Tech Lead",
      actions: ["Guardar en Agenda", "Enviar Email", "Llamar directo"],
      type: "vcard",
    },
  },
  {
    id: "social",
    title: "Redes & Instagram",
    description: "Ideal para creadores y marcas. Redirige a tu perfil de Instagram, TikTok o Linktree.",
    icon: Instagram,
    badgeColor: "#ec4899",
    screenContent: {
      header: "@mikelrivera.dev",
      subtitle: "12.4K Seguidores • Contenido Tech",
      actions: ["Seguir en Instagram", "Ver Reels", "Comunidad Discord"],
      type: "social",
    },
  },
  {
    id: "reviews",
    title: "Reseñas Google 5 Stars",
    description: "Multiplica las valoraciones de tu negocio físico. Abre directamente la ficha de 5 estrellas en Google Maps.",
    icon: Star,
    badgeColor: "#eab308",
    screenContent: {
      header: "Restaurante Rivera & Co.",
      subtitle: "⭐ 4.9/5 (340 Reseñas en Google)",
      actions: ["Dejar Reseña de 5⭐", "Ver Opiniones", "Fotos del Local"],
      type: "reviews",
    },
  },
  {
    id: "menu",
    title: "Menú / Carta Digital PDF",
    description: "Perfecto para hostelería. Actualiza los platos y alérgenos en tiempo real sin reimprimir nada.",
    icon: Utensils,
    badgeColor: "#10b981",
    screenContent: {
      header: "Menú Degustación 2026",
      subtitle: "Carta interactiva con opción de pedir",
      actions: ["Ver Platos Destacados", "Carta de Vinos", "Avisar Alérgenos"],
      type: "menu",
    },
  },
  {
    id: "whatsapp",
    title: "Chat WhatsApp Directo",
    description: "Inicia un chat de WhatsApp con un mensaje predefinido para atención rápida a clientes.",
    icon: MessageSquare,
    badgeColor: "#22c55e",
    screenContent: {
      header: "Atención al Cliente WhatsApp",
      subtitle: "Respuesta en menos de 5 min",
      actions: ["Abrir Chat WhatsApp", "Pedir Cita Previa", "Soporte 24/7"],
      type: "whatsapp",
    },
  },
];

export default function NfcDashboardSection() {
  const [activeMode, setActiveMode] = useState(PANEL_MODES[0]);
  const [tapCount, setTapCount] = useState(1482);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleModeChange = (mode) => {
    setIsUpdating(true);
    setActiveMode(mode);
    setTimeout(() => {
      setIsUpdating(false);
      setTapCount((prev) => prev + 1);
    }, 300);
  };

  return (
    <section id="nfc-dashboard" className={styles.dashboardSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.tag}>
            <Settings size={14} />
            <span>PANEL DE CONTROL INTELIGENTE</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Gestiona tus Tarjetas NFC en <span className={styles.gradientText}>Tiempo Real</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            ¿Has cambiado de número, puesto o proyecto? No vuelvas a imprimir tarjetas nunca más.
            Cambia la información vinculada a tu tarjeta NFC al instante cuantas veces quieras.
          </p>
        </div>

        {/* Dashboard Interactive Demo Board */}
        <div className={styles.dashboardGrid}>
          {/* Left Panel Controls */}
          <div className={styles.controlsCol}>
            <div className={styles.controlBoxHeader}>
              <h3>Selecciona la Acción al Tocar tu Tarjeta:</h3>
              <p>Haz clic en los modos para ver la simulación en tiempo real</p>
            </div>

            <div className={styles.modeList}>
              {PANEL_MODES.map((mode) => {
                const IconComponent = mode.icon;
                const isSelected = activeMode.id === mode.id;

                return (
                  <button
                    key={mode.id}
                    className={`${styles.modeBtn} ${isSelected ? styles.activeModeBtn : ""}`}
                    onClick={() => handleModeChange(mode)}
                    style={{ "--theme-color": mode.badgeColor }}
                  >
                    <div className={styles.modeIconWrapper}>
                      <IconComponent size={20} />
                    </div>
                    <div className={styles.modeText}>
                      <h4>{mode.title}</h4>
                      <p>{mode.description}</p>
                    </div>
                    <div className={styles.radioIndicator}>
                      <div className={styles.radioDot} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tap Statistics Widgets */}
            <div className={styles.statsWidgetRow}>
              <div className={styles.statCard}>
                <BarChart3 size={18} className={styles.statIcon} />
                <div>
                  <span className={styles.statVal}>{tapCount.toLocaleString()}</span>
                  <span className={styles.statLabel}>Toques NFC Totales</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <RefreshCw size={18} className={styles.statIconAlt} />
                <div>
                  <span className={styles.statVal}>&lt; 0.2s</span>
                  <span className={styles.statLabel}>Tiempo de Respuesta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Phone & Dashboard Preview */}
          <div className={styles.previewCol}>
            <div className={styles.previewCardFrame}>
              <div className={styles.frameHeader}>
                <div className={styles.windowDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.frameTitle}>
                  <Shield size={13} />
                  <span>panel.nfc-river.com/my-card-id-882</span>
                </div>
                <span className={styles.liveTag}>LIVE SYNC</span>
              </div>

              <div className={styles.frameContent}>
                {/* Phone Preview inside Dashboard */}
                <div className={styles.phoneSim}>
                  <div className={styles.phoneNotch}>
                    <span className={styles.notchCam} />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMode.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className={styles.simScreenBody}
                    >
                      <div
                        className={styles.simTopBanner}
                        style={{
                          background: `linear-gradient(135deg, ${activeMode.badgeColor}33, transparent)`,
                          borderColor: activeMode.badgeColor,
                        }}
                      >
                        <Zap size={14} style={{ color: activeMode.badgeColor }} />
                        <span>Modo Activo: {activeMode.title}</span>
                      </div>

                      <div className={styles.simHeaderInfo}>
                        <h4>{activeMode.screenContent.header}</h4>
                        <p>{activeMode.screenContent.subtitle}</p>
                      </div>

                      <div className={styles.simActionsList}>
                        {activeMode.screenContent.actions.map((act, index) => (
                          <div
                            key={index}
                            className={styles.simActionPill}
                            style={{
                              borderColor: index === 0 ? activeMode.badgeColor : "rgba(255,255,255,0.1)",
                              background: index === 0 ? `${activeMode.badgeColor}22` : "rgba(255,255,255,0.04)",
                            }}
                          >
                            <span>{act}</span>
                            <ExternalLink size={12} />
                          </div>
                        ))}
                      </div>

                      <div className={styles.simFooterInfo}>
                        <span>Actualizado instantáneamente por NFC Pulse</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Access Dashboard CTA */}
        <div className={styles.accessCtaBox}>
          <div className={styles.accessText}>
            <h3>¿Ya tienes tu tarjeta NFC?</h3>
            <p>Accede a tu panel personal para configurar enlaces, ver métricas y personalizar tu perfil.</p>
          </div>
          <Link to="/nfc/dashboard" className={styles.accessBtn}>
            <span>Acceder a Mi Panel de Gestión</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
