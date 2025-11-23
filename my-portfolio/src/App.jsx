import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioSelector from "./PortfolioSelector";
import HomePage from "./Home/HomePage.jsx";
import ProjectPlanetPage from "./Home/ProjectPlanet/ProjectPlanetPage.jsx";
import PortfolioPlanetPage from "./Home/PortfolioPlanet/PortfolioPlanetPage.jsx";
import LabPlanetPage from "./Home/LabPlanet/LabPlanetPage.jsx";
import WorkPlanetPage from "./Home/WorkPlanet/WorkPlanetPage.jsx";
import SunPage from "./Home/Sun/SunPage.jsx";
import NorthPointStudiosInk from "./Home/ProjectPlanet/LandingSide/Landings/NorthPointStudiosInk/Home.jsx";
import LandingSidePage from "./Home/ProjectPlanet/LandingSide/LandingSidePage.jsx";

const Portfolio1App = React.lazy(() => import("./FirstPortfolio/Portfolio1App.jsx"));
const Portfolio2App = React.lazy(() => import("./SecondPortfolio/Portfolio2App.jsx"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/portfolios" element={<PortfolioSelector />} />
          <Route path="/portfolio1/*" element={<Portfolio1App />} />
          <Route path="/portfolio2/*" element={<Portfolio2App />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/project-planet" element={<ProjectPlanetPage />} />
          <Route path="/landings" element={<LandingSidePage />} />
          <Route path="/portfolio-planet*" element={<PortfolioPlanetPage />} />
          <Route path="/lab-planet*" element={<LabPlanetPage />} />
          <Route path="/work-planet*" element={<WorkPlanetPage />} />
          <Route path="/sun*" element={<SunPage />} />
          <Route path="/landings/north-point-studios-ink*" element={<NorthPointStudiosInk />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
