import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Timeline.css";

const EXPERIENCIA = [
  {
    id: 1,
    empresa: "Deloitte",
    puesto: "Consultor SAP ABAP/S4HANA",
    años: "2024 — Actualidad",
    desc: "Desarrollo técnico en entornos SAP empresariales, optimización de procesos y mantenimiento evolutivo.",
  },
  {
    id: 2,
    empresa: "Green Code",
    puesto: "Full Stack Developer",
    años: "2023 — 2024",
    desc: "Implementación de soluciones web con React y Node.js, integraciones API y despliegues en la nube.",
  },
  {
    id: 3,
    empresa: "RDT Ingenieros",
    puesto: "Software Engineer",
    años: "2022 — 2023",
    desc: "Desarrollo de aplicaciones personalizadas para clientes industriales, con énfasis en rendimiento y escalabilidad.",
  },
  {
    id: 4,
    empresa: "Proyectos personales",
    puesto: "Founder & Developer",
    años: "2020 — Presente",
    desc: "Creación de plataformas como Siéntame y Survival Vacation 2, centradas en innovación, UX y tecnología moderna.",
  },
];

export default function Timeline() {
  const [active, setActive] = useState(1);
  const actual = EXPERIENCIA.find(e => e.id === active);

  return (
    <section className="timeline">
      <h2 className="timeline-title">Trayectoria laboral</h2>

      <div className="timeline-container">
        <div className="timeline-line">
          {EXPERIENCIA.map((item) => (
            <motion.div
              key={item.id}
              className={`timeline-dot ${active === item.id ? "active" : ""}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActive(item.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={actual.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="timeline-info"
        >
          <h3>{actual.puesto}</h3>
          <h4>{actual.empresa}</h4>
          <p className="años">{actual.años}</p>
          <p className="desc">{actual.desc}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
