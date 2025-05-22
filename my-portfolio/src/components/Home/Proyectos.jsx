// src/components/Proyectos.jsx
import React from "react";
import "../../styles/header.css";
import screenshotSV2 from "../../assets/ProjectImages/SV2.png";
import screenshotBisky from "../../assets/ProjectImages/Bisky.png";

const proyectos = [
  {
    id: 1,
    title: "Survival Vacation 2",
    image: screenshotSV2,  // <-- aquí la referencia directa
    description: "Sitio web oficial de Survival Vacation 2.",
    link: "https://survivalvacation2.com",
  },
  {
    id: 2,
    title: "Bisky Team",
    image: screenshotBisky,
    description: "Página principal de Bisky Team.",
    link: "https://biskyteam.com",
  },
];

export default function Proyectos() {
  return (
    <div className="container">
      <h1>Proyectos</h1>
      <section id="proyectos" className="portfolio-grid" style={{ padding: "2rem 1rem" }}>
        {proyectos.map(({ id, title, description, link, image }) => (
        <article
          key={id}
          className="portfolio-card"
          tabIndex={0}
          onClick={() => window.open(link, "_blank")}
          onKeyDown={(e) => {
            if (e.key === "Enter") window.open(link, "_blank");
          }}
          style={{ cursor: "pointer" }}
          role="link"
          aria-label={`Abrir proyecto ${title}`}
        >
          <img src={image} alt={title} className="portfolio-image" />
          <div className="portfolio-content" style={{ minHeight: "150px" }}>
            <h3 className="portfolio-title">{title}</h3>
            <p className="portfolio-description">{description}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
              onClick={(e) => e.stopPropagation()}
            >
              Visitar sitio →
            </a>
          </div>
        </article>
      ))}
    </section>
    </div>
  );
}
