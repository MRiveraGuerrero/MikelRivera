import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Wifi, CheckCircle2, Share2, Instagram, Linkedin,
  Globe, Phone, ChevronDown, ShieldCheck, Star
} from "lucide-react";
import styles from "./NfcHero.module.css";

import heroVideo from "../assets/mikelrivera__--ar_184103_--video_1_--end_loop_8d783840-c8c7-443b-8cca-e647a8523c09_3.mp4";
import heroPoster from "../assets/mikelrivera_Abstract_premium_website_hero_background_for_a_br_4a9268f0-24e5-4353-8952-371e3f015307_2.png";
import design1Front from "../assets/Design 1 Front.png";
import design2Front from "../assets/Design 2 Front.png";
import design3Front from "../assets/Design 3 Front.png";

/* ─── SVG Icons ─────────────────────────────────────────── */
function NfcRiverIcon({ size = 26 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={size} height={size}>
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
      <path d="M138 176 C192 125 278 120 326 150 C362 173 365 213 341 238 C322 258 292 260 267 248"
        fill="none" stroke="url(#hg1)" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M90 279 C144 245 184 245 232 278 C286 315 319 345 380 343 C409 342 430 336 448 325"
        fill="none" stroke="url(#hg2)" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M88 327 C139 298 181 299 225 329 C270 360 300 390 350 394 C376 396 398 390 416 380"
        fill="none" stroke="url(#hg3)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoogleIcon({ size = 26 }) {
  return (
    <svg viewBox="-3 0 262 262" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451" fill="#4285F4" />
      <path d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1" fill="#34A853" />
      <path d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37" fill="#FBBC05" />
      <path d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479" fill="#EB4335" />
    </svg>
  );
}

function WhatsAppIcon({ size = 26 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M23.993033,0 C10.762252,0 0,10.765287 0,23.999801 C0,29.248451 1.692661,34.116025 4.570026,38.066947 L1.579605,46.983798 L10.804449,44.035539 C14.598605,46.546975 19.126434,48 24.006967,48 C37.237748,48 48,37.234315 48,24.000199 C48,10.765685 37.237748,0.000398 24.006967,0.000398 L23.993033,0.000398 L23.993033,0 Z M17.29285,12.190836 C16.827488,11.07628 16.474784,11.034071 15.769774,11.005401 C15.529728,10.991464 15.262214,10.977527 14.96564,10.977527 C14.04845,10.977527 13.089462,11.245514 12.511043,11.838033 C11.806033,12.557577 10.056843,14.23638 10.056843,17.679202 C10.056843,21.122023 12.567571,24.451756 12.905944,24.917648 C13.258648,25.382743 17.800808,32.55031 24.853297,35.471492 C30.368379,37.757149 32.00491,37.545307 33.260074,37.27732 C35.093658,36.882308 37.393002,35.527239 37.971421,33.891043 C38.54984,32.25405 38.54984,30.857171 38.380255,30.560912 C38.211068,30.264652 37.745308,30.095816 37.040298,29.742615 C36.335288,29.389811 32.90737,27.696673 32.25849,27.470894 C31.623543,27.231179 31.017259,27.315995 30.537963,27.99333 C29.860819,28.938653 29.198006,29.89831 28.661785,30.476494 C28.238619,30.928051 27.547144,30.984595 26.969123,30.744481 C26.193254,30.420348 24.021298,29.657798 21.340985,27.273388 C19.267356,25.42535 17.856938,23.125756 17.448104,22.434484 C17.038871,21.729275 17.405907,21.319529 17.729948,20.938852 C18.082653,20.501232 18.421026,20.191036 18.77373,19.781688 C19.126434,19.372738 19.323884,19.160897 19.549599,18.681068 C19.789645,18.215575 19.62006,17.735746 19.450874,17.382942 C19.281687,17.030139 17.871269,13.587317 17.29285,12.190836 Z" fill="#67C15E" />
    </svg>
  );
}


const CARD_STYLES = [
  {
    id: "vcard",
    name: "Perfil Digital",
    shortName: "Perfil",
    desc: "Contacto, redes y web en un toque",
    Icon: NfcRiverIcon,
    type: "vcard",
    image: design3Front,
    border: "#2FA7E8",
    accent: "#2FA7E8",
    badge: "VCARD 3.0",
    subtext: "Guarda tu contacto profesional en la agenda",
    stat: "94% conversión",
  },
  {
    id: "google",
    name: "Reseñas Google",
    shortName: "Reseñas",
    desc: "Redirige directo a dejar 5 estrellas",
    Icon: GoogleIcon,
    type: "google",
    image: design2Front,
    border: "#EA4335",
    accent: "#EA4335",
    badge: "GOOGLE MAPS",
    subtext: "Insignia oficial de 5 estrellas en Google Maps",
    stat: "+127% reseñas",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Directo",
    shortName: "WhatsApp",
    desc: "Chat instantáneo sin guardar número",
    Icon: WhatsAppIcon,
    type: "whatsapp",
    image: design1Front,
    border: "#25d366",
    accent: "#25d366",
    badge: "WHATSAPP BIZ",
    subtext: "Contacto directo e inmediato por WhatsApp",
    stat: "Abre en 1 toque",
  },
];

// Video de fondo en bucle con poster preview e IntersectionObserver para rendimiento
function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isMobile = window.innerWidth <= 968;
    if (isMobile) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.videoBgContainer} aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={heroPoster}
        className={styles.bgVideo}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className={styles.videoOverlay} />
    </div>
  );
}

export default function NfcHero() {
  const containerRef = useRef(null);
  const [selectedCardStyle, setSelectedCardStyle] = useState(CARD_STYLES[0]);
  const [isTapped, setIsTapped] = useState(false);
  const [manualTap, setManualTap] = useState(false);
  const [animStep, setAnimStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 968);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const screenScale = useTransform(smoothProgress, [0.3, 0.6, 1], [0.98, 1.02, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (manualTap) return;
      const scrollY = window.scrollY;
      const isMobileDevice = window.innerWidth <= 968;
      const threshold = isMobileDevice ? 35 : 45;

      if (scrollY > threshold) {
        setIsTapped(true);
        if (animStep === 0) setAnimStep(1);
      } else {
        setIsTapped(false);
        setAnimStep(0);
      }
    };

    // Sincronizar inmediatamente al cargar para estar 100% separados en posición inicial 0
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [manualTap, animStep]);

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
      {/* Fondo de video premium en bucle con poster image */}
      <VideoBackground />

      {/* Halos luminosos de profundidad */}
      <div className={styles.depthHalo1} />
      <div className={styles.depthHalo2} />
      <div className={styles.depthHalo3} />

      <div className={styles.stickyContainer}>
        {/* Panel izquierdo — glassmorphism redesign */}
        <div className={styles.textContent}>
          {/* Title Glass Card Original */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className={styles.titleGlassCard}
          >
            <div className={styles.titleCardAmbientGlow} />
            <div className={styles.titleCardAccentLine} />

            <div className={styles.heroTagline}>
              <Wifi size={13} className={styles.taglineIcon} />
              <span>Tecnología NFC · Sin apps · Al instante</span>
            </div>

            <h1 className={styles.titleText}>
              Un solo toque.<br />
              <span className={styles.gradientText}>Tu mundo entero.</span>
            </h1>
          </motion.div>

          {/* Glassmorphic card selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            className={styles.cardSelectorPanel}
          >
            <div className={styles.cardSelectorHeader}>
              <span className={styles.cardSelectorLabel}>¿Qué debe hacer tu tarjeta?</span>
              <span className={styles.cardSelectorCount}>{CARD_STYLES.indexOf(selectedCardStyle) + 1} / {CARD_STYLES.length}</span>
            </div>

            <div className={styles.cardSelectorList}>
              {CARD_STYLES.map((style, idx) => {
                const isActive = selectedCardStyle.id === style.id;
                const IconComponent = style.Icon;
                return (
                  <button
                    key={style.id}
                    className={`${styles.cardSelectorItem} ${isActive ? styles.cardSelectorItemActive : ""}`}
                    style={{ "--item-accent": style.accent }}
                    onClick={() => {
                      setSelectedCardStyle(style);
                      setIsTapped(true);
                      setAnimStep(1);
                    }}
                  >
                    {/* Número */}
                    <span className={styles.cardSelectorNum}>{String(idx + 1).padStart(2, "0")}</span>

                    {/* SVG Icon */}
                    <span className={styles.cardSelectorIconWrap} style={{ background: isActive ? `${style.accent}18` : undefined }}>
                      <IconComponent size={20} />
                    </span>

                    {/* Texto */}
                    <div className={styles.cardSelectorInfo}>
                      <span className={styles.cardSelectorName}>
                        <span className={styles.fullName}>{style.name}</span>
                        <span className={styles.shortName}>{style.shortName}</span>
                      </span>
                      <span className={styles.cardSelectorDesc}>{style.desc}</span>
                    </div>

                    {/* Stat */}
                    <span
                      className={styles.cardSelectorStat}
                      style={{ color: isActive ? style.accent : undefined }}
                    >
                      {style.stat}
                    </span>

                    {/* Barra activa */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={styles.activeIndicatorBar}
                        style={{ background: style.accent }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* CTA — glassy buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.28 }}
            className={styles.ctaGroup}
          >
            <button className={styles.tapSimulateBtn} onClick={handleManualTapToggle}>
              <Wifi size={16} className={styles.pulseIcon} />
              <span>{isTapped ? "Desconectar" : "Simular toque NFC"}</span>
            </button>
            <a href="#nfc-store" className={styles.secondaryLink}>
              <span>Ver modelos</span>
              <ChevronDown size={14} style={{ transform: "rotate(-90deg)" }} />
            </a>
          </motion.div>
        </div>

        {/* Stage de animación 3D */}
        <div className={styles.animationStage}>
          <div className={styles.stageViewport}>
            {/* Smartphone mockup */}
            <motion.div
              className={styles.phoneMockup}
              style={!isMobile ? { scale: screenScale } : undefined}
              animate={
                isMobile
                  ? isTapped || animStep >= 1
                    ? { x: -155, y: -12, rotateZ: 90, scale: 0.70 }
                    : { x: -200, y: -12, rotateZ: 90, scale: 0.70 }
                  : { x: 0, y: 0 }
              }
              transition={{ type: "spring", stiffness: 90, damping: 17 }}
            >
              <div className={styles.phoneTopBar}>
                <div className={styles.dynamicIsland}>
                  <div className={styles.nfcSensortrigger}>
                    <Wifi size={10} />
                    <span>NFC</span>
                  </div>
                </div>
              </div>

              {/* Onda NFC al hacer tap */}
              {(isTapped || smoothProgress.get() > 0.65) && (
                <div className={styles.nfcWaveContainer}>
                  <div className={styles.nfcRipple} />
                </div>
              )}

              {/* Pantalla del móvil */}
              <div className={styles.phoneScreen}>
                {!isTapped ? (
                  <div className={styles.standbyScreen}>
                    <div className={styles.nfcTargetZone}>
                      <motion.div
                        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.85, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                        className={styles.targetIconCircle}
                      >
                        <Wifi size={32} className={styles.targetIcon} />
                      </motion.div>
                      <p className={styles.targetText}>Acerca la tarjeta a la parte superior</p>
                      <div className={styles.scanBeam} />
                    </div>
                  </div>
                ) : selectedCardStyle.id === "google" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className={styles.googlePhoneScreen}
                  >
                    <div className={styles.googlePhoneHeader}>
                      <Star size={14} fill="#fbbc05" color="#fbbc05" />
                      <span>Google Maps Business</span>
                    </div>
                    <div className={styles.googleBusinessBox}>
                      <h4>Restaurante / Negocio Rivera</h4>
                      <div className={styles.starsRow}>⭐ ⭐ ⭐ ⭐ ⭐</div>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>5.0 / 5.0 (342 Reseñas)</span>
                    </div>
                    <button className={styles.googleReviewBtn}>
                      <Star size={13} fill="#fff" color="#fff" />
                      <span>Escribir Reseña 5 Estrellas</span>
                    </button>
                    <div className={styles.nfcNotificationBanner} style={{ background: "rgba(66,133,244,0.08)", color: "#4285f4" }}>
                      <ShieldCheck size={13} />
                      <span>Ficha verificada en Google Maps</span>
                    </div>
                  </motion.div>
                ) : selectedCardStyle.id === "whatsapp" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className={styles.waPhoneScreen}
                  >
                    <div className={styles.waTopBar}>
                      <div className={styles.waAvatar}>MR</div>
                      <div>
                        <div className={styles.waName}>Mikel Rivera</div>
                        <div className={styles.waStatus}>En línea · WhatsApp Business</div>
                      </div>
                    </div>
                    <div className={styles.waChatArea}>
                      <div className={styles.waBubble}>
                        ¡Hola! 👋 He tocado tu tarjeta NFC y me gustaría contactar contigo.
                      </div>
                      <button className={styles.waSendBtn}>
                        <Phone size={13} />
                        <span>Abrir Chat en WhatsApp</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className={styles.unlockedProfileScreen}
                  >
                    <div className={styles.profileHeader}>
                      <div className={styles.avatarWrapper}>
                        <div className={styles.avatar}>MR</div>
                        <CheckCircle2 size={15} className={styles.verifiedBadge} />
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
                        <Phone size={13} />
                        <span>Guardar Contacto</span>
                      </button>
                      <button className={styles.actionPillSecondary}>
                        <Share2 size={13} />
                        <span>Compartir</span>
                      </button>
                    </div>

                    <div className={styles.linkList}>
                      <div className={styles.linkItem}>
                        <Globe size={14} className={styles.linkIcon} />
                        <span>Mi Sitio Web Oficial</span>
                      </div>
                      <div className={styles.linkItem}>
                        <Instagram size={14} className={styles.linkIcon} />
                        <span>@mikelrivera.dev</span>
                      </div>
                      <div className={styles.linkItem}>
                        <Linkedin size={14} className={styles.linkIcon} />
                        <span>LinkedIn / MikelRivera</span>
                      </div>
                    </div>

                    <div className={styles.nfcNotificationBanner}>
                      <ShieldCheck size={13} />
                      <span>Contacto guardado correctamente</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Tarjeta NFC 3D flotante */}
            <motion.div
              className={styles.nfcCard3DWrapper}
              animate={
                isMobile
                  ? isTapped || animStep >= 1
                    ? { x: 135, y: -12, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 0.70 }
                    : { x: 200, y: -12, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 0.70 }
                  : isTapped || animStep >= 1
                    ? { x: 290, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.0 }
                    : { x: 620, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.0 }
              }
              transition={{ type: "spring", stiffness: 90, damping: 17, mass: 0.8 }}
            >
              <div
                className={styles.nfcCard}
                style={{
                  borderColor: selectedCardStyle.border,
                  boxShadow: isTapped
                    ? `0 0 28px ${selectedCardStyle.accent}22, 0 18px 45px rgba(0,0,0,0.75)`
                    : "0 18px 38px rgba(0,0,0,0.55)",
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

      {/* Indicador inferior */}
      <div className={styles.heroBottomIndicator}>
        <a href="#nfc-store" className={styles.scrollHintLink}>
          <span>Desliza para explorar la experiencia NFC</span>
          <ChevronDown size={14} className={styles.bounceChevron} />
        </a>
      </div>
    </section>
  );
}
