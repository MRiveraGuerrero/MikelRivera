import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioSelector from "./PortfolioSelector";
import HomePage from "./Home/HomePage.jsx";
import ProjectPlanetPage from "./Home/ProjectPlanet/ProjectPlanetPage.jsx";

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
          <Route path="/project-planet*" element={<ProjectPlanetPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
