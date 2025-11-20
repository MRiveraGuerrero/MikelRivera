import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PortfolioSelector.module.css";

export default function PortfolioSelector() {
  const navigate = useNavigate();

  const portfolios = [
    {
      year: "2024",
      path: "/portfolio1",
      desc: "Mi portfolio original con proyectos destacados del año 2024.",
    },
    {
      year: "2025",
      path: "/",
      desc: "Versión más reciente con nuevos diseños y proyectos de 2025.",
    },
  ];

  return (
    <section className={styles["selector-section"]}>
      <div className={styles["selector-header"]}>
        <h1>🗂️ Selecciona un Portfolio</h1>
        <p>Elige el año que quieras explorar</p>
      </div>

      <div className={styles["selector-grid"]}>
        {portfolios.map((p) => (
          <div
            key={p.year}
            className={styles["selector-card"]}
            onClick={() => navigate(p.path)}
          >
            <div className={styles["selector-year"]}>{p.year}</div>
            <p>{p.desc}</p>
            <button>Ver {p.year}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

