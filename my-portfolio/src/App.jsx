import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio1App from "./FirstPortfolio/Portfolio1App";
import Portfolio2App from "./SecondPortfolio/Portfolio2App";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Portfolio principal (nuevo) */}
        <Route path="/*" element={<Portfolio2App />} />

        {/* Portfolio antiguo bajo /portfolio1 */}
        <Route path="/portfolio1/*" element={<Portfolio1App />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
