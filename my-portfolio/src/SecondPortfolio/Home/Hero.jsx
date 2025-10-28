import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import "./Hero.css";

export default function Hero({ newPet }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 25, damping: 20 });

  const [leaving, setLeaving] = useState(false);
  const [pets, setPets] = useState([]);

  // Cargar mascotas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolioPets");
    if (saved) setPets(JSON.parse(saved));
  }, []);

  // Añadir nueva mascota
  useEffect(() => {
    if (newPet) {
      const updated = [...pets, { ...newPet, id: Date.now() }];
      setPets(updated);
      localStorage.setItem("portfolioPets", JSON.stringify(updated));
    }
  }, [newPet]);

  // Movimiento del ratón para la luz flotante
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
    await new Promise((r) => setTimeout(r, 800));
    document.querySelector("#timeline")?.scrollIntoView({ behavior: "smooth" });
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

      {/* Fade salida */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            className="fade-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
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

      {/* Mascotas por toda la pantalla */}
      <div className="hero-pets-layer">
        {pets.map((p) => {
          const size = 120 + Math.random() * 80;

          // posición aleatoria dentro del viewport, dejando margen para no salir
          const maxX = window.innerWidth - size - 20;
          const maxY = window.innerHeight - size - 20;
          const left = Math.random() * maxX;
          const top = Math.random() * maxY;

          // desplazamiento leve (pulular)
          const moveX = (Math.random() - 0.5) * 100;
          const moveY = (Math.random() - 0.5) * 80;

          return (
            <motion.img
              key={p.id}
              src={p.img}
              alt={p.name}
              className="hero-pet-floating"
              style={{
                width: size,
                height: size,
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`,
              }}
              animate={{
                x: [0, moveX, 0],
                y: [0, moveY, 0],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
