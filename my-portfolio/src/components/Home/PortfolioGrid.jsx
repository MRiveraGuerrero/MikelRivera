// src/components/PortfolioGrid.jsx
import React from "react";
import "../../styles/header.css";
import "../../styles/PortfolioGrid.css";
import naveImg from "../../assets/PortfolioImages/nave.png";

const portfolios = [
  {
    id: 1,
    title: "Portfolio 1",
    description: "3D Spacecraft on the space",
    image: naveImg,
    link: "#",
  },
  {
    id: 2,
    title: "Portfolio 2",
    description: "Landing page para producto digital.",
    image: "https://source.unsplash.com/random/800x451?app,design",
    link: "#",
  },
  {
    id: 3,
    title: "Portfolio 3",
    description: "Aplicación web de gestión de tareas.",
    image: "https://source.unsplash.com/random/800x452?task,board",
    link: "#",
  },
  {
    id: 4,
    title: "Portfolio 4",
    description: "Sitio web corporativo para empresa.",
    image: "https://source.unsplash.com/random/800x453?office,business",
    link: "#",
  },
  // Añade más portfolios aquí
];

export default function PortfolioGrid() {
  return (
    <div className="container">
      <h1 className="title">Portfolio Selector</h1>
      <section id="projects" className="portfolio-grid">
        {portfolios.map(({ id, title, description, image, link }) => (
          <article key={id} className="portfolio-card" tabIndex={0}>
            <img src={image} alt={title} className="portfolio-image" />
            <div className="portfolio-content">
              <h3 className="portfolio-title">{title}</h3>
              <p className="portfolio-description">{description}</p>
              <a href={link} className="portfolio-link" target="_blank" rel="noopener noreferrer">
                Ver proyecto →
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
