import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Timeline.css";

const EXPERIENCIA = [
  {
    id: 1,
    empresa: "Deloitte",
    puesto: "Consultor SAP ABAP/S4HANA",
    años: "2024 — Actualidad",
    desc: "Desarrollo técnico en entornos SAP S/4HANA. Implementación de soluciones ABAP, optimización de procesos logísticos y financieros, y soporte a integraciones intermodulares.",
    skills: ["SAP ABAP", "S/4HANA", "Integraciones RFC/API", "Optimización de queries", "Testing y soporte funcional"],
  },
  {
    id: 2,
    empresa: "Green Code",
    puesto: "Full Stack Developer",
    años: "2023 — 2024",
    desc: "Diseño y desarrollo de aplicaciones web con enfoque en escalabilidad. Integración de APIs REST y despliegue continuo en entornos cloud.",
    skills: ["React", "Node.js", "Express", "MySQL", "Docker", "CI/CD"],
  },
  {
    id: 3,
    empresa: "RDT Ingenieros",
    puesto: "Software Engineer",
    años: "2022 — 2023",
    desc: "Automatización de procesos internos, creación de herramientas internas y mejora del rendimiento de aplicaciones industriales.",
    skills: ["JavaScript", "Python", "Automatización", "Optimización de procesos"],
  },
];

const PROYECTOS = [
  {
    id: 1,
    nombre: "Siéntame",
    rol: "Fundador / Full Stack Developer",
    años: "2022 — Presente",
    desc: "Plataforma SaaS para gestión de reservas online y visibilidad digital de negocios locales. Desarrollo completo de frontend, backend y branding.",
    skills: ["React", "Node.js", "MySQL", "Cloudinary", "Vercel", "Railway"],
  },
  {
    id: 2,
    nombre: "Survival Vacation 2",
    rol: "Game Developer",
    años: "2021 — Presente",
    desc: "Videojuego web con físicas, editor de mapas y economía virtual. Enfoque en IA adaptativa y sistemas de progreso de jugador.",
    skills: ["React", "Canvas", "Express", "MySQL", "Stripe API", "Diseño de gameplay"],
  },
];

export default function Timeline() {
  const [activeExp, setActiveExp] = useState(1);
  const [activeProj, setActiveProj] = useState(1);
  const actualExp = EXPERIENCIA.find((e) => e.id === activeExp);
  const actualProj = PROYECTOS.find((p) => p.id === activeProj);

  return (
    <section id="timeline" className="timeline">
      <h2 className="timeline-title">Trayectoria profesional y proyectos personales</h2>

      {/* === Líneas paralelas === */}
      <div className="timeline-wrapper">
        {/* Línea de experiencia */}
        <div className="timeline-container main">
          <div className="timeline-line">
            {EXPERIENCIA.map((item) => (
              <motion.div
                key={item.id}
                className={`timeline-dot ${activeExp === item.id ? "active" : ""}`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveExp(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Línea de proyectos personales */}
        <div className="timeline-container sub">
          <div className="timeline-line secondary">
            {PROYECTOS.map((item) => (
              <motion.div
                key={item.id}
                className={`timeline-dot project ${activeProj === item.id ? "active" : ""}`}
                whileHover={{ scale: 1.2 }}
                onClick={() => setActiveProj(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* === Info: Experiencia seleccionada === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`exp-${actualExp.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="timeline-info"
        >
          <h3>{actualExp.puesto}</h3>
          <h4>{actualExp.empresa}</h4>
          <p className="años">{actualExp.años}</p>
          <p className="desc">{actualExp.desc}</p>
          <ul className="skills">
            {actualExp.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      {/* === Info: Proyecto seleccionado === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`proj-${actualProj.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="timeline-info project-info"
        >
          <h3>{actualProj.nombre}</h3>
          <h4>{actualProj.rol}</h4>
          <p className="años">{actualProj.años}</p>
          <p className="desc">{actualProj.desc}</p>
          <ul className="skills">
            {actualProj.skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
