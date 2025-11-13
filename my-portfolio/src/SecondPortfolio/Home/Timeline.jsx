import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Timeline.css";

const EXPERIENCIA = [
  // ----- BiSKY Team (Etapa 1) -----
  {
    id: 1,
    empresa: "BiSKY Team",
    puesto: "Web Developer",
    años: "ene. 2024 — nov. 2024",
    ubicacion: "Bilbao · Presencial",
    modalidad: "Tiempo parcial",
    stack: ["WordPress", "PHP", "JS", "SEO básico"],
    desc: `Remodelación completa del sitio web existente: aunque había una base inicial, rediseñé y reconstruí prácticamente toda la web desde cero (estructura, diseño,  plantillas, lógica y contenido).  
    Desarrollo de nuevas secciones, mejoras de experiencia de usuario y mantenimiento técnico continuo.`,
    logros: [
      "Reconstrucción integral del sitio corporativo a partir de una versión inicial muy limitada.",
      "Definición de la arquitectura y plantillas que sirvieron de base para el proyecto.",
    ],
  },

  // ----- BiSKY Team (Etapa 2 – Ascenso) -----
  {
    id: 2,
    empresa: "BiSKY Team",
    puesto: "Technical Web Developer",
    años: "nov. 2024 — jun. 2025",
    ubicacion: "Bilbao · Presencial",
    modalidad: "Tiempo completo",
    stack: ["WordPress", "PHP", "JS", "Performance / SEO"],
    desc: `Responsable técnico del desarrollo web tras la reconstrucción completa del sitio.
    Implementación de funcionalidades avanzadas, optimización de Core Web Vitals y refuerzo de seguridad.  
    Documentación del sistema y traspaso ordenado al equipo que continuó el desarrollo.`,
    logros: [
      "Desarrollo end-to-end del sitio corporativo antes del relevo.",
      "Mejoras significativas en rendimiento (LCP/CLS) y estabilidad.",
      "Estandarización de módulos reutilizables y estructura técnica para facilitar el mantenimiento.",
    ],
  },

  // ----- PwC -----
  {
    id: 3,
    empresa: "PwC",
    puesto: "Intern — Digital Assurance",
    años: "ene. 2025 — jun. 2025",
    ubicacion: "Bilbao · Presencial",
    modalidad: "Prácticas",
    stack: ["Auditoría IT", "Riesgos", "ISO 27001", "SOC 1/2"],
    desc: `Auditoría de sistemas de información, análisis de riesgos tecnológicos y validación de controles IT.
    Evaluación de integridad de datos, ciberseguridad y segregación de funciones.
    Elaboración de informes y walkthroughs para apoyar procesos de transformación digital.`,
    logros: [
      "Documentación y estandarización de evidencias que aceleraron procesos de auditoría.",
      "Contribución a la mejora del aseguramiento tecnológico en clientes enterprise.",
    ],
  },

  // ----- Deloitte -----
  {
    id: 4,
    empresa: "Deloitte",
    puesto: "Analyst — ABAP Developer (Enterprise Technology)",
    años: "sept. 2025 — Actualidad",
    ubicacion: "Bilbao · Híbrido",
    modalidad: "Tiempo completo",
    stack: ["ABAP", "SAP ECC/S4HANA", "Fiori", "OData", "HANA"],
    desc: `Desarrollador ABAP enfocado en ampliaciones, exits, BAdIs, formularios, reporting y automatización de procesos SAP.
    Implementación y mantenimiento de interfaces, servicios OData y desarrollos orientados a negocio.
    Optimización de rendimiento en entornos HANA, análisis funcional-técnico y soporte en incidencias productivas.
    Participación en proyectos de transformación digital T&T, migraciones y mejoras continuas en el landscape SAP.`,
    logros: [
      "Optimización de procesos críticos mediante refactorización de selects y buffers en HANA.",
      "Desarrollo de ampliaciones y servicios OData clave para procesos funcionales.",
      "Creación de estándares internos de calidad: naming, lint ABAP y checklist técnico.",
    ],
  },

  // ----- Siéntame -----
  {
    id: 5,
    empresa: "Siéntame",
    puesto: "CTO — Co-Founder / Full Stack Architect",
    años: "jun. 2024 — Actualidad",
    ubicacion: "Bilbao · Remoto / Híbrido",
    modalidad: "Startup",
    stack: [
      "React (Vite + Tailwind + Framer Motion)",
      "Node.js / Express",
      "Sequelize · MySQL",
      "Cloudinary",
      "Resend",
      "Stripe",
      "Docker / Railway / Vercel"
    ],
    desc: `Co-fundador y responsable técnico de la plataforma SaaS Siéntame.
    Diseño de la arquitectura completa, desarrollo full stack, despliegue cloud y seguridad.
    Implementación de panel multinegocio, integración de Stripe, gestión de imágenes,
    reservas en tiempo real y sincronización con Google Business.
    Liderazgo del roadmap técnico, revisión de PR y estandarización de prácticas internas.`,
    logros: [
      "Escalado de la plataforma y alta disponibilidad con despliegues automatizados.",
      "Sistema de pagos recurrentes integrado con Stripe.",
      "Calendarios inteligentes y editor visual de horarios.",
      "SEO técnico avanzado y Lighthouse +95.",
    ],
  },
];

export default function Timeline() {
  const [active, setActive] = useState(1);
  const activeItem = EXPERIENCIA.find(e => e.id === active);
  const progress = ((active - 1) / (EXPERIENCIA.length - 1)) * 100;

  return (
    <section className="river-timeline">
      <h2 className="timeline-title">Mi recorrido profesional</h2>

      <div className="river-container">
        <div className="river-wrapper">
          <div className="river-base" />
          <motion.div
            className="river-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          {EXPERIENCIA.map((item, i) => {
            const left = (i / (EXPERIENCIA.length - 1)) * 100;
            return (
              <button
                key={item.id}
                className={`river-dot ${active === item.id ? "active" : ""}`}
                style={{ left: `${left}%` }}
                onClick={() => setActive(item.id)}
                aria-label={`${item.puesto} · ${item.empresa}`}
              >
                <span></span>
              </button>
            );
          })}
          <motion.div
            className="boat"
            animate={{ left: `${progress}%` }}
            transition={{ duration: 1, type: "spring" }}
          >
            ⛵
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          key={activeItem.id}
          className="info-card pretty"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28 }}
          transition={{ duration: 0.45 }}
        >
          <header className="card-head">
            <h3>{activeItem.puesto}</h3>
            <div className="chips">
              <span className="chip">{activeItem.empresa}</span>
              <span className="chip">{activeItem.años}</span>
              <span className="chip">{activeItem.ubicacion}</span>
              <span className="chip chip-mode">{activeItem.modalidad}</span>
            </div>
          </header>

          <section className="card-body">
            <p className="card-desc">{activeItem.desc}</p>
            <ul className="card-list">
              {activeItem.logros?.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
            <div className="tags">
              {activeItem.stack.map((t, i) => (
                <span key={i} className="tag">{t}</span>
              ))}
            </div>
          </section>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
