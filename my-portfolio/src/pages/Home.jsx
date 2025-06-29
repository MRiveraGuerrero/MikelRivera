// pages/Home.jsx
import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import PortfolioGrid from "../components/Home/PortfolioGrid";
import PortfolioIntro from "../components/Home/PortfolioIntro";
import Proyectos from "../components/Home/Proyectos";
import AboutMe from "../components/Home/AboutMe";
import Contact from "../components/Home/Contact";
import "../styles/Home.css";

import { portfoliosData as allPortfoliosData } from "../components/Home/PortfolioGrid"; // **IMPORTANTE: ASUMIMOS QUE EXPORTAS portfoliosData DESDE PortfolioGrid.jsx**

export default function Home() {

  const [selectedPortfolioId, setSelectedPortfolioId] = useState(allPortfoliosData[1].id);

  const handleSelectPortfolio = (id) => {
    setSelectedPortfolioId(id);
  };

  const CurrentPortfolioIntroComponent = allPortfoliosData.find(
    (p) => p.id === selectedPortfolioId
  )?.introComponent;

  return (
    <MainLayout>
      <section id="intro">
        {CurrentPortfolioIntroComponent ? (
          // Renderiza el componente Intro seleccionado dinámicamente
          <CurrentPortfolioIntroComponent />
        ) : (
          <div>{/* Mensaje de carga o fallback si no hay selección */}</div>
        )}
      </section>
      <section id="portfolio">
        {/* Pasamos la función de selección y el ID seleccionado a PortfolioGrid */}
        <PortfolioGrid
          onSelectPortfolio={handleSelectPortfolio}
          selectedPortfolioId={selectedPortfolioId}
        />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="mypro">
        <Proyectos />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </MainLayout>
  );
}
