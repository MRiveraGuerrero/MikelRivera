import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioSelector from "./PortfolioSelector";
import HomePage from "./Home/HomePage.jsx";
import ProjectPlanetPage from "./Home/ProjectPlanet/ProjectPlanetPage.jsx";
import PortfolioPlanetPage from "./Home/PortfolioPlanet/PortfolioPlanetPage.jsx";
import LabPlanetPage from "./Home/LabPlanet/LabPlanetPage.jsx";
import Riveragg_ from "./Home/LabPlanet/Labs/riveragg_/Home.jsx";
import RiveraggVideos from "./Home/LabPlanet/Labs/riveragg_/Videos.jsx";
import RiveraggGallery from "./Home/LabPlanet/Labs/riveragg_/Gallery.jsx";
import RiveraggContact from "./Home/LabPlanet/Labs/riveragg_/Contact.jsx";
import WorkPlanetPage from "./Home/WorkPlanet/WorkPlanetPage.jsx";
import SunPage from "./Home/Sun/SunPage.jsx";
import NorthPointStudiosInk from "./Home/ProjectPlanet/LandingSide/Landings/NorthPointStudiosInk/Home.jsx";
import LandingSidePage from "./Home/ProjectPlanet/LandingSide/LandingSidePage.jsx";
import ProjectSidePage from "./Home/ProjectPlanet/ProjectSide/ProjectSidePage.jsx";
import ImpostorAnimePrivacy from "./Home/ProjectPlanet/ProjectSide/Projects/ImpostorAnimePrivacy.jsx";
import WebriorHome from "./Home/ProjectPlanet/LandingSide/Landings/Webrior/Home.jsx";
import WebriorServices from "./Home/ProjectPlanet/LandingSide/Landings/Webrior/ServicesPage.jsx";
import WebriorProjects from "./Home/ProjectPlanet/LandingSide/Landings/Webrior/ProjectsPage.jsx";
import WebriorContact from "./Home/ProjectPlanet/LandingSide/Landings/Webrior/ContactPage.jsx";
import { LanguageProvider } from "./Home/context/LanguageContext";

const Portfolio1App = React.lazy(() => import("./FirstPortfolio/Portfolio1App.jsx"));
const Portfolio2App = React.lazy(() => import("./SecondPortfolio/Portfolio2App.jsx"));

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/portfolios" element={<PortfolioSelector />} />
            <Route path="/portfolio/portfolio1/*" element={<Portfolio1App />} />
            <Route path="/portfolio/portfolio2/*" element={<Portfolio2App />} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/project-planet" element={<ProjectPlanetPage />} />
            <Route path="/landings" element={<LandingSidePage />} />
            <Route path="/projects" element={<ProjectSidePage />} />
            <Route path="/portfolio-planet/*" element={<PortfolioPlanetPage />} />
            <Route path="/lab-planet/*" element={<LabPlanetPage />} />
            <Route path="/riveragg_" element={<Riveragg_ />} />
            <Route path="/riveragg_/videos" element={<RiveraggVideos />} />
            <Route path="/riveragg_/gallery" element={<RiveraggGallery />} />
            <Route path="/riveragg_/contact" element={<RiveraggContact />} />
            <Route path="/work-planet/*" element={<WorkPlanetPage />} />
            <Route path="/sun/*" element={<SunPage />} />
            <Route path="/projects/impostor-anime/privacy" element={<ImpostorAnimePrivacy />} />
            <Route path="/landings/north-point-studios-ink/*" element={<NorthPointStudiosInk />} />
            <Route path="/landings/webrior" element={<WebriorHome />} />
            <Route path="/landings/webrior/services" element={<WebriorServices />} />
            <Route path="/landings/webrior/projects" element={<WebriorProjects />} />
            <Route path="/landings/webrior/contact" element={<WebriorContact />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LanguageProvider>
  );
}
