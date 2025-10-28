import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Timeline.css";

const EXPERIENCIA = [
  {
    id: 1,
    empresa: "BiSKY Team",
    puesto: "Technical / Web Developer",
    años: "ene. 2024 — jun. 2025",
    ubicacion: "Bilbao · Presencial",
    modalidad: "Tiempo parcial → completo",
    stack: ["WordPress/PHP", "JS", "SEO", "Performance"],
    desc: `Desarrollo de sitios a medida con themes y plugins propios.
    Optimización de Core Web Vitals, accesibilidad y seguridad básica.
    Automatización de flujos de contenido y despliegues. Integraciones API y pasarelas de pago.
    Soporte técnico y formación a usuarios no técnicos.`,
    logros: [
      "Mejoras de LCP/CLS hasta verde en proyectos clave.",
      "Plantilla base modular reutilizable para acelerar entregas.",
    ],
  },
  {
    id: 2,
    empresa: "PwC",
    puesto: "Intern — Digital Assurance",
    años: "ene. 2025 — jun. 2025",
    ubicacion: "Bilbao · Presencial",
    modalidad: "Prácticas",
    stack: ["Auditoría IT", "Controles automatizados", "ISO 27001", "SOC 1/2"],
    desc: `Evaluación de riesgos tecnológicos, diseño y prueba de controles generales y de aplicación.
    Revisión de integridad de datos, segregación de funciones, evidencias y trazabilidad.
    Apoyo en ciberseguridad y cumplimiento (ISO 27001, SOC 1/2), walkthroughs y test de efectividad.
    Elaboración de informes con hallazgos, impacto y remediación priorizada.`,
    logros: [
      "Matriz de riesgos y controles reutilizable por dominio de proceso.",
      "Mejora del tiempo de obtención de evidencias con checklists guiados (+30% eficiencia).",
    ],
  },
  {
    id: 3,
    empresa: "Deloitte",
    puesto: "Analyst — Enterprise Technology (SAP)",
    años: "sept. 2025 — Actualidad",
    ubicacion: "Bilbao · Híbrido",
    modalidad: "Tiempo completo",
    stack: ["SAP", "ABAP", "Fiori", "HANA", "Integración"],
    desc: `Soporte técnico y funcional en entornos SAP para clientes enterprise.
    Desarrollo de ampliaciones ABAP, BAdIs y exits. Diseño de OData/Fiori para procesos clave.
    Parametrización y personalización alineada a requerimientos de negocio y cumplimiento.
    T&T: participación en iniciativas de transformación digital, automatización de flujos,
    mejora de rendimiento HANA y trazabilidad E2E entre módulos.
    Colaboración con equipos multidisciplinares (funcional, seguridad, BASIS, integración) para
    entregas iterativas, pruebas UAT y migraciones controladas (transportes/ChaRM).`,
    logros: [
      "Reducción de tiempos de proceso críticos 25–40% optimizando selects y buffers en HANA.",
      "Estandarización de plantillas de desarrollo y checklist de calidad (lint ABAP, naming, pruebas).",
      "Tableros de métricas técnicas y funcionales para seguimiento de incidencias y SLA.",
    ],
  },
];

export default function Timeline() {
  const [active, setActive] = useState(1);
  const activeItem = EXPERIENCIA.find(e => e.id === active);
  const progress = ((active - 1) / (EXPERIENCIA.length - 1)) * 100;

  return (
    <section className="river-timeline">
      <h2 className="timeline-title">🌊 Mi recorrido profesional</h2>

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
