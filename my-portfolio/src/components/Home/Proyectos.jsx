// src/components/Proyectos.jsx
import React from "react";
import "../../styles/header.css"; // Esto parece ser un error, debería ser `../../styles/proyectos.css` o similar
import screenshotSV2 from "../../assets/ProjectImages/SV2.png";
import screenshotBisky from "../../assets/ProjectImages/Bisky.png";
import { useLanguage } from '../contexts/LanguageContext'; // Importa el hook de idioma

export default function Proyectos() {
  const { t } = useLanguage(); // Usa el hook para acceder a la función 't'

  // Define los proyectos con claves para las traducciones
  const proyectos = [
    {
      id: 1,
      titleKey: "projects.project1_title", // Clave para el título
      image: screenshotSV2,
      descriptionKey: "projects.project1_description", // Clave para la descripción
      link: "https://survivalvacation2.com",
    },
    {
      id: 2,
      titleKey: "projects.project2_title",
      image: screenshotBisky,
      descriptionKey: "projects.project2_description",
      link: "https://biskyteam.com",
    },
  ];

  return (
    <div className="container">
      <h1 className="title">{t('projects.title')}</h1> {/* Traduce el título de la sección */}
      <section id="proyectos" className="portfolio-grid" style={{ padding: "2rem 1rem" }}>
        {proyectos.map(({ id, titleKey, descriptionKey, link, image }) => (
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
            aria-label={t('projects.visitSite', { title: t(titleKey) })} // Asegúrate de que el aria-label también se traduzca
          >
            <img src={image} alt={t(titleKey)} className="portfolio-image" />
            <div className="portfolio-content" style={{ minHeight: "150px" }}>
              <h3 className="portfolio-title">{t(titleKey)}</h3> {/* Traduce el título del proyecto */}
              <p className="portfolio-description">{t(descriptionKey)}</p> {/* Traduce la descripción */}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-link"
                onClick={(e) => e.stopPropagation()}
              >
                {t('projects.visitSite')} {/* Traduce el texto del enlace */}
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}