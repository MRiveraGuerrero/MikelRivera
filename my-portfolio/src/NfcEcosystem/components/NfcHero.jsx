import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Wifi, Sparkles, Smartphone, CheckCircle2, Share2, Instagram, Linkedin, Globe, Phone, ChevronDown, Zap, ShieldCheck, Star } from "lucide-react";
import styles from "./NfcHero.module.css";

import design1Front from "../assets/Design 1 Front.png";
import design2Front from "../assets/Design 2 Front.png";
import design3Front from "../assets/Design 3 Front.png";

const CARD_STYLES = [
  {
    id: "vcard",
    name: "Perfil vCard Smart",
    type: "vcard",
    image: design3Front,
    border: "#0066ff",
    accent: "#0066ff",
    badge: "VCARD 3.0 & REDES",
    subtext: "Guarda tu contacto profesional en la agenda",
  },
  {
    id: "google",
    name: "Reseñas Google 5⭐",
    type: "google",
    image: design2Front,
    border: "#4285f4",
    accent: "#4285f4",
    badge: "GOOGLE REVIEWS",
    subtext: "Insignia oficial de 5 estrellas en Google Maps",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Directo",
    type: "whatsapp",
    image: design1Front,
    border: "#25d366",
    accent: "#25d366",
    badge: "WHATSAPP CONTACT",
    subtext: "Contacto directo e inmediato por WhatsApp",
  },
];

export default function NfcHero() {
  const containerRef = useRef(null);
  const [selectedCardStyle, setSelectedCardStyle] = useState(CARD_STYLES[0]);
  const [isTapped, setIsTapped] = useState(false);
  const [manualTap, setManualTap] = useState(false);

  const [animStep, setAnimStep] = useState(0); // 0: Floating, 1: Touched & Unlocked, 2: Animation Finished (Scroll released)

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Intercept mouse wheel on desktop so window doesn't scroll until card animation completes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.innerWidth <= 968) return; // Only apply on desktop

    let isCooldown = false;

    const handleWheel = (e) => {
      const rect = container.getBoundingClientRect();
      const heroInView = rect.top <= 120 && rect.bottom >= window.innerHeight * 0.4;

      if (!heroInView) return;

      // Scrolling DOWN
      if (e.deltaY > 0) {
        if (animStep < 2) {
          e.preventDefault();
          if (isCooldown) return;
          isCooldown = true;

          if (animStep === 0) {
            setAnimStep(1);
            setIsTapped(true);
          } else if (animStep === 1) {
            setAnimStep(2);
          }

          setTimeout(() => {
            isCooldown = false;
          }, 400);
        }
      }
      // Scrolling UP
      else if (e.deltaY < 0) {
        if (window.scrollY <= 180) {
          if (animStep > 0) {
            e.preventDefault();
            if (isCooldown) return;
            isCooldown = true;

            if (animStep === 2) {
              setAnimStep(1);
            } else if (animStep === 1) {
              setAnimStep(0);
              setIsTapped(false);
            }

            setTimeout(() => {
              isCooldown = false;
            }, 400);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [animStep]);

  // Card movement interpolations (combines animStep with scrollYProgress for fluid feel)
  const cardY = useTransform(smoothProgress, [0, 0.3, 0.6, 1],
    animStep === 0 ? [-60, -20, 30, 30] : [30, 30, 30, 30]
  );
  const cardX = useTransform(smoothProgress, [0, 0.3, 0.6, 1],
    animStep === 0 ? [90, 30, 0, 0] : [0, 0, 0, 0]
  );
  const cardRotateX = useTransform(smoothProgress, [0, 0.3, 0.6, 1],
    animStep === 0 ? [32, 12, 0, 0] : [0, 0, 0, 0]
  );
  const cardRotateY = useTransform(smoothProgress, [0, 0.3, 0.6, 1],
    animStep === 0 ? [-24, -8, 0, 0] : [0, 0, 0, 0]
  );
  const cardRotateZ = useTransform(smoothProgress, [0, 0.3, 0.6, 1],
    animStep === 0 ? [-18, -6, 0, 0] : [0, 0, 0, 0]
  );
  const cardScale = useTransform(smoothProgress, [0, 0.3, 0.6, 1],
    animStep === 0 ? [0.88, 0.95, 1, 1] : [1, 1, 1, 1]
  );

  // Wave expansion on tap zone
  const waveScale = useTransform(smoothProgress, [0.3, 0.6, 1], [0.2, 1.8, 2.2]);
  const waveOpacity = useTransform(smoothProgress, [0.3, 0.6, 1], [0, 1, 0.8]);

  // Phone screen brightness and unlock progress
  const screenScale = useTransform(smoothProgress, [0.3, 0.6, 1], [0.98, 1.02, 1]);

  // Sync scroll progress trigger fallback
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (manualTap) return;
      if (latest >= 0.35 || animStep >= 1) {
        setIsTapped(true);
      } else {
        if (animStep === 0) {
          setIsTapped(false);
        }
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, manualTap, animStep]);

  const handleManualTapToggle = () => {
    if (isTapped) {
      setIsTapped(false);
      setAnimStep(0);
      setManualTap(false);
    } else {
      setIsTapped(true);
      setAnimStep(1);
      setManualTap(true);
    }
  };

  return (
    <section id="hero-nfc" ref={containerRef} className={styles.heroSection}>
      {/* Background ambient lighting */}
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />
      <div className={styles.gridOverlay} />

      <div className={styles.stickyContainer}>
        {/* Header Text / Product Explanation */}
        <div className={styles.textContent}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={styles.title}
          >
            Comparte tu mundo con un <span className={styles.gradientText}>Solo Toque</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.subtitle}
          >
            Transfiere tus datos de contacto, vCard profesional, redes sociales y catálogo comercial
            al instante. Sin apps, sin papel, 100% inteligente y universal para iOS y Android.
          </motion.p>

          {/* Interactive Card Style Switcher Pill */}
          <div className={styles.styleSelector}>
            <span className={styles.selectorLabel}>Estilo de Tarjeta:</span>
            <div className={styles.styleButtons}>
              {CARD_STYLES.map((style) => (
                <button
                  key={style.id}
                  className={`${styles.styleBtn} ${selectedCardStyle.id === style.id ? styles.activeStyleBtn : ""
                    }`}
                  onClick={() => {
                    setSelectedCardStyle(style);
                    setIsTapped(true);
                    setAnimStep(1);
                  }}
                  style={{ "--accent-color": style.accent }}
                >
                  <span
                    className={styles.colorDot}
                    style={{ background: style.bg }}
                  />
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll instruction indicator */}
          <div className={styles.scrollHint}>
            <ChevronDown size={16} className={styles.bounceChevron} />
            <span>Haz Scroll para ver la activación de la tarjeta NFC</span>
          </div>

          <div className={styles.ctaGroup}>
            <button className={styles.tapSimulateBtn} onClick={handleManualTapToggle}>
              <Wifi size={18} className={styles.pulseIcon} />
              <span>{isTapped ? "Desconectar Toque NFC" : "Simular Toque NFC Directo"}</span>
            </button>
            <a href="#nfc-store" className={styles.secondaryLink}>
              <span>Explorar Modelos</span>
            </a>
          </div>
        </div>

        {/* 3D SCROLL ANIMATION STAGE */}
        <div className={styles.animationStage}>
          <div className={styles.stageViewport}>
            {/* SMARTPHONE MOCKUP */}
            <motion.div
              className={styles.phoneMockup}
              style={{ scale: screenScale }}
            >
              {/* Phone Speaker & Notch / Dynamic Island */}
              <div className={styles.phoneTopBar}>
                <div className={styles.dynamicIsland}>
                  <div className={styles.nfcSensortrigger}>
                    <Wifi size={12} />
                    <span>NFC</span>
                  </div>
                </div>
              </div>

              {/* NFC Signal Wave emanating from contact point */}
              {(isTapped || smoothProgress.get() > 0.65) && (
                <div className={styles.nfcWaveContainer}>
                  <div className={styles.nfcSoftBlueWave} />
                </div>
              )}

              {/* Phone Display Content (Locked -> Unlocked on Tap) */}
              <div className={styles.phoneScreen}>
                {!isTapped ? (
                  /* Standby / Locked State */
                  <div className={styles.standbyScreen}>
                    <div className={styles.nfcTargetZone}>
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.9, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={styles.targetIconCircle}
                      >
                        <Wifi size={36} className={styles.targetIcon} />
                      </motion.div>
                      <p className={styles.targetText}>Acerca la tarjeta a la parte superior</p>
                      <div className={styles.scanBeam} />
                    </div>
                  </div>
                ) : selectedCardStyle.id === "google" ? (
                  /* Google Review Destination Screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={styles.googlePhoneScreen}
                  >
                    <div className={styles.googlePhoneHeader}>
                      <Star size={16} fill="#fbbc05" color="#fbbc05" />
                      <span>Google Maps Business</span>
                    </div>

                    <div className={styles.googleBusinessBox}>
                      <h4>Restaurante / Negocio Rivera</h4>
                      <div className={styles.starsRow}>⭐ ⭐ ⭐ ⭐ ⭐</div>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>5.0 / 5.0 (342 Reseñas en Google)</span>
                    </div>

                    <button className={styles.googleReviewBtn}>
                      <Star size={14} fill="#ffffff" color="#ffffff" />
                      <span>Escribir Reseña de 5 Estrellas</span>
                    </button>

                    <div className={styles.nfcNotificationBanner} style={{ marginTop: "auto", background: "rgba(66,133,244,0.1)", color: "#4285f4" }}>
                      <ShieldCheck size={14} />
                      <span>Ficha verificada en Google Maps</span>
                    </div>
                  </motion.div>
                ) : selectedCardStyle.id === "whatsapp" ? (
                  /* WhatsApp Direct Contact Screen */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={styles.waPhoneScreen}
                  >
                    <div className={styles.waTopBar}>
                      <div className={styles.waAvatar}>MR</div>
                      <div>
                        <div className={styles.waName}>Mikel Rivera</div>
                        <div className={styles.waStatus}>En línea • WhatsApp Business</div>
                      </div>
                    </div>

                    <div className={styles.waChatArea}>
                      <div className={styles.waBubble}>
                        ¡Hola! 👋 He tocado tu tarjeta NFC WhatsApp y me gustaría contactar contigo.
                      </div>

                      <button className={styles.waSendBtn}>
                        <Phone size={14} />
                        <span>Abrir Chat en WhatsApp</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Unlocked Instant Profile State (vCard) */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={styles.unlockedProfileScreen}
                  >
                    <div className={styles.profileHeader}>
                      <div className={styles.avatarWrapper}>
                        <div className={styles.avatar}>MR</div>
                        <CheckCircle2 size={16} className={styles.verifiedBadge} />
                      </div>
                      <h3 className={styles.profileName}>Mikel Rivera</h3>
                      <p className={styles.profileRole}>Digital Creator & Tech Lead</p>
                      <div className={styles.badgeRow}>
                        <span className={styles.statusBadge}>NFC Active</span>
                        <span className={styles.vcardBadge}>vCard 3.0</span>
                      </div>
                    </div>

                    <div className={styles.quickActionGrid}>
                      <button className={styles.actionPillPrimary}>
                        <Phone size={14} />
                        <span>Guardar Contacto</span>
                      </button>
                      <button className={styles.actionPillSecondary}>
                        <Share2 size={14} />
                        <span>Compartir</span>
                      </button>
                    </div>

                    <div className={styles.linkList}>
                      <div className={styles.linkItem}>
                        <Globe size={16} className={styles.linkIcon} />
                        <span>Mi Sitio Web Oficial</span>
                      </div>
                      <div className={styles.linkItem}>
                        <Instagram size={16} className={styles.linkIcon} />
                        <span>@mikelrivera.dev</span>
                      </div>
                      <div className={styles.linkItem}>
                        <Linkedin size={16} className={styles.linkIcon} />
                        <span>LinkedIn / MikelRivera</span>
                      </div>
                    </div>

                    <div className={styles.nfcNotificationBanner}>
                      <ShieldCheck size={14} />
                      <span>Contacto guardado correctamente</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* 3D FLOATING NFC CARD CONTROLLED BY SCROLL / STEP */}
            <motion.div
              className={styles.nfcCard3DWrapper}
              animate={
                animStep >= 1 || isTapped
                  ? {
                    x: 290,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1.0,
                  }
                  : {
                    x: 620,
                    y: 0,
                    rotateX: 0,
                    rotateY: 0,
                    rotateZ: 0,
                    scale: 1.0,
                  }
              }
              transition={{
                type: "spring",
                stiffness: 85,
                damping: 16,
                mass: 0.8,
              }}
            >
              <div
                className={styles.nfcCard}
                style={{
                  borderColor: selectedCardStyle.border,
                  boxShadow: isTapped
                    ? `0 0 35px ${selectedCardStyle.accent}, 0 20px 50px rgba(0,0,0,0.8)`
                    : "0 20px 40px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={selectedCardStyle.image}
                  alt={selectedCardStyle.name}
                  className={styles.cardAssetImg}
                />
                <div className={styles.holoShimmer} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator to complete full viewport frame */}
      <div className={styles.heroBottomIndicator}>
        <a href="#nfc-store" className={styles.scrollHintLink}>
          <span>Desliza para explorar la experiencia NFC</span>
          <ChevronDown size={16} className={styles.bounceChevron} />
        </a>
      </div>
    </section>
  );
}
