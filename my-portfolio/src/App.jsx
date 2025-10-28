import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio1App from "./FirstPortfolio/Portfolio1App";
import Portfolio2App from "./SecondPortfolio/Portfolio2App";
import PortfolioSelector from "./PortfolioSelector";

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route
          path="/portfolio1/*"
          element={
            <div className="portfolio1">
              <Portfolio1App />
            </div>
          }
        />
        <Route path="/portfolios" element={<PortfolioSelector />} />
        <Route
          path="/*"
          element={
            <div className="portfolio2">
              <Portfolio2App />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
