import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">
          Bienvenido a <span className="accent">mi portfolio</span>
        </h1>
        <p className="hero-subtitle">
          Soy Mikel Rivera, desarrollador full-stack apasionado por crear experiencias digitales únicas.
        </p>
      </motion.div>
    </section>
  );
}
