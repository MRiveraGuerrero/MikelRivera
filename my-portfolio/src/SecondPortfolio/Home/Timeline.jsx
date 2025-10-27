import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Timeline.css";

const EXPERIENCIA = [
  {
    id: "exp1",
    empresa: "Deloitte",
    puesto: "Consultor SAP ABAP/S4HANA",
    años: "2024 — Actualidad",
    desc: "Desarrollo técnico en entornos SAP S/4HANA, optimización de procesos y mantenimiento evolutivo.",
  },
  {
    id: "exp2",
    empresa: "Green Code",
    puesto: "Full Stack Developer",
    años: "2023 — 2024",
    desc: "Implementación de soluciones web escalables con React y Node.js, integraciones API y despliegues cloud.",
  },
  {
    id: "exp3",
    empresa: "RDT Ingenieros",
    puesto: "Software Engineer",
    años: "2022 — 2023",
    desc: "Automatización de procesos internos, herramientas industriales y mejora de rendimiento.",
  },
];

const PROYECTOS = [
  {
    id: "proj1",
    nombre: "Siéntame",
    rol: "Fundador / Full Stack Developer",
    años: "2022 — Presente",
    desc: "Plataforma SaaS para reservas y gestión de visibilidad online. Desarrollada con React, Node.js y MySQL.",
  },
  {
    id: "proj2",
    nombre: "Survival Vacation 2",
    rol: "Game Developer",
    años: "2021 — Presente",
    desc: "Videojuego web con físicas, editor de mapas y sistema de progresión. Enfoque en IA y contenido generado por usuarios.",
  },
];

export default function Timeline() {
  const [activeId, setActiveId] = useState("exp1");

  const activeItem =
    EXPERIENCIA.find((e) => e.id === activeId) ||
    PROYECTOS.find((p) => p.id === activeId);

  const isProyecto = PROYECTOS.some((p) => p.id === activeId);

  return (
    <section id="timeline" className="timeline">
        <h2 className="timeline-title">
            <span>Trayectoria profesional</span>{" "}
            <span className="titulo-negro">y</span>{" "}
            <span className="titulo-azul">proyectos personales</span>
        </h2>

      <div className="timeline-grid">
        {/* Línea izquierda - experiencia */}
        <div className="timeline-column left">
          <div className="timeline-line">
            {EXPERIENCIA.map((item) => (
              <motion.div
                key={item.id}
                className={`timeline-dot ${activeId === item.id ? "active" : ""}`}
                whileHover={{ scale: 1.15 }}
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Tarjeta central */}
        <div className="timeline-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className={`timeline-info ${isProyecto ? "project-info" : ""}`}
            >
              <h3>{activeItem.puesto || activeItem.nombre}</h3>
              <h4>{activeItem.empresa || activeItem.rol}</h4>
              <p className="años">{activeItem.años}</p>
              <p className="desc">{activeItem.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Línea derecha - proyectos */}
        <div className="timeline-column right">
          <div className="timeline-line">
            {PROYECTOS.map((item) => (
              <motion.div
                key={item.id}
                className={`timeline-dot2 ${activeId === item.id ? "active" : ""}`}
                whileHover={{ scale: 1.15 }}
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
