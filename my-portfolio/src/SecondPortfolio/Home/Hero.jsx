import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero({ newPet, onOpenEgg }) {
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

  // Limpiar mascotas guardadas
  const clearPets = () => {
    localStorage.removeItem("portfolioPets");
    setPets([]);
  };

  return (
    <section className={styles.hero}>
      {/* Luz flotante */}
      <motion.div
        className={styles["floating-code"]}
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

      {/* Capa fade elegante */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            className={styles["fade-overlay"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <motion.div
        className={styles["hero-content"]}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className={styles["hero-title"]}>
          Hola, soy <span className={styles.accent}>Mikel Rivera</span>
        </h1>
        <p className={styles["hero-subtitle"]}>
          <span className={styles.impact}>Diseño código</span> que convierte ideas en experiencias digitales elegantes.
        </p>

        {/* === NUEVOS BOTONES === */}
        <div className={styles["hero-btns"]}>
          <motion.button
            className={styles["hero-btn"]}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenEgg}
          >
            Abrir huevo
          </motion.button>

          <motion.button
            className={`${styles["hero-btn"]} ${styles["clear-btn"]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearPets}
          >
            Limpiar mascotas
          </motion.button>
        </div>
      </motion.div>

      {/* Mascotas por toda la pantalla */}
      <div className={styles["hero-pets-layer"]}>
        {pets.map((p) => {
          const size = 120 + Math.random() * 80;
          const maxX = window.innerWidth - size - 20;
          const maxY = window.innerHeight - size - 20;
          const left = Math.random() * maxX;
          const top = Math.random() * maxY;
          const moveX = (Math.random() - 0.5) * 100;
          const moveY = (Math.random() - 0.5) * 80;

          return (
            <motion.img
              key={p.id}
              src={p.img}
              alt={p.name}
              className={styles["hero-pet-floating"]}
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
