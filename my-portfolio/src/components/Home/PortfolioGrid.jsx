// src/components/PortfolioGrid.jsx
import React from "react";
import "../../styles/header.css"; // Esto parece ser un error, debería ser `../../styles/PortfolioGrid.css` o `../../styles/common.css`
import "../../styles/PortfolioGrid.css";
import naveImg from "../../assets/PortfolioImages/nave.png";
import { useLanguage } from '../contexts/LanguageContext'; // Importa el hook de idioma

export default function PortfolioGrid() {
  const { t } = useLanguage(); // Usa el hook para acceder a la función 't'

  const portfolios = [
    {
      id: 1,
      titleKey: "portfolioGrid.project1_title", // Clave para el título
      descriptionKey: "portfolioGrid.project1_description", // Clave para la descripción
      image: naveImg,
      link: "#",
    },
    {
      id: 2,
      titleKey: "portfolioGrid.project2_title",
      descriptionKey: "portfolioGrid.project2_description",
      image: "https://source.unsplash.com/random/800x451?app,design",
      link: "#",
    },
    {
      id: 3,
      titleKey: "portfolioGrid.project3_title",
      descriptionKey: "portfolioGrid.project3_description",
      image: "https://source.unsplash.com/random/800x452?task,board",
      link: "#",
    },
    {
      id: 4,
      titleKey: "portfolioGrid.project4_title",
      descriptionKey: "portfolioGrid.project4_description",
      image: "https://source.unsplash.com/random/800x453?office,business",
      link: "#",
    },
  ];

  return (
    <div className="container">
      <h1 className="title">{t('portfolioGrid.title')}</h1> {/* Traduce el título principal */}
      <section id="projects" className="portfolio-grid">
        {portfolios.map(({ id, titleKey, descriptionKey, image, link }) => (
          <article key={id} className="portfolio-card" tabIndex={0}>
            <img src={image} alt={t(titleKey)} className="portfolio-image" /> {/* Traduce el alt de la imagen */}
            <div className="portfolio-content">
              <h3 className="portfolio-title">{t(titleKey)}</h3> {/* Traduce el título del portfolio */}
              <p className="portfolio-description">{t(descriptionKey)}</p> {/* Traduce la descripción */}
              <a href={link} className="portfolio-link" target="_blank" rel="noopener noreferrer">
                {t('portfolioGrid.viewProject')} {/* Traduce el texto del enlace */}
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}