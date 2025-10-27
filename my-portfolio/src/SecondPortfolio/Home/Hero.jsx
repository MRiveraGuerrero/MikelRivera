import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 25, damping: 20 });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const handleClick = async () => {
    setLeaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    document.querySelector("#timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setLeaving(false), 1000);
  };

  return (
    <section className="hero">
      {/* Luz flotante */}
      <motion.div
        className="floating-code"
        style={{ translateX: smoothX, translateY: smoothY }}
        animate={{
          textShadow: [
            "0 0 30px rgba(245,124,0,1)",
            "0 0 60px rgba(245,124,0,0.8)",
            "0 0 30px rgba(245,124,0,1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {"</>"}
      </motion.div>

      {/* Capa de salida suave */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            className="fade-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">
          Hola, soy <span className="accent">Mikel Rivera</span>
        </h1>
        <p className="hero-subtitle">
          <span className="impact">Diseño código</span> que convierte ideas en experiencias digitales elegantes.
        </p>

        <motion.button
          className="hero-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          Ver trayectoria ↓
        </motion.button>
      </motion.div>
    </section>
  );
}
