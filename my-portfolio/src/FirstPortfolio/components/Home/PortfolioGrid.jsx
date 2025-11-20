// src/components/PortfolioGrid.jsx
import React from "react";
import styles from "../../styles/PortfolioGrid.module.css";
import naveImg from "../../assets/PortfolioImages/nave.png";
import portfolio2Img from "../../assets/PortfolioImages/portfolio2.png";
import portfolio3Img from "../../assets/PortfolioImages/flappybird.webp";
import { useLanguage } from '../../contexts/LanguageContext';

// Importa los componentes PortfolioIntro específicos
import PortfolioIntro1 from "./Portfolios/PortfolioIntro1";
import PortfolioIntro2 from "./Portfolios/PortfolioIntro2";
import PortfolioIntro3 from "./Portfolios/PortfolioIntro3"; // Ojo con esta ruta, si es '1Portfolios' o 'Portfolios'
import PortfolioIntro4 from "./Portfolios/PortfolioIntro4";

// Definimos los detalles de los portfolios AQUÍ, incluyendo el componente Intro
// ¡AÑADE EXPORT DELANTE DE 'const portfoliosData'!
export const portfoliosData = [ // <--- ¡AQUÍ ESTÁ EL CAMBIO CRÍTICO!
  {
    id: 1,
    titleKey: "portfolioGrid.project1_title",
    descriptionKey: "portfolioGrid.project1_description",
    image: naveImg,
    link: "#",
    introComponent: PortfolioIntro1, // Referencia al componente
  },
  {
    id: 2,
    titleKey: "portfolioGrid.project2_title",
    descriptionKey: "portfolioGrid.project2_description",
    image: portfolio2Img,
    link: "#",
    introComponent: PortfolioIntro2,
  },
  {
    id: 3,
    titleKey: "portfolioGrid.project3_title",
    descriptionKey: "portfolioGrid.project3_description",
    image: portfolio3Img,
    link: "#",
    introComponent: PortfolioIntro3,
  },
];


// El componente PortfolioGrid ahora solo necesita recibir onSelectPortfolio y selectedPortfolioId
export default function PortfolioGrid({ onSelectPortfolio, selectedPortfolioId }) {
  const { t } = useLanguage();

  return (
    <div className="container">
      <h1 className="title">{t('portfolioGrid.title')}</h1>
      <section id="projects" className={styles["portfolio-grid"]}>
        {portfoliosData.map(({ id, titleKey, descriptionKey, image }) => (
          <article
            key={id}
            className={`${styles["portfolio-card"]} ${id === selectedPortfolioId ? 'is-selected' : ''}`}
            tabIndex={0}
            onClick={() => onSelectPortfolio(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelectPortfolio(id);
            }}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label={t('portfolioGrid.selectProject', { title: t(titleKey) })}
          >
            <img src={image} alt={t(titleKey)} className={styles["portfolio-image"]} />
            <div className={styles["portfolio-content"]}>
              <h3 className={styles["portfolio-title"]}>{t(titleKey)}</h3>
              <p className={styles["portfolio-description"]}>{t(descriptionKey)}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}