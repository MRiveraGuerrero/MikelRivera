// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { ThemeProvider } from './components/contexts/ThemeContext'; // Tu ThemeProvider existente
import { LanguageProvider } from './components/contexts/LanguageContext'; // Importa el nuevo LanguageProvider

// Asegúrate de que tus estilos globales y de tema estén importados en algún lugar,
// idealmente en tu archivo principal (index.js o main.jsx) o aquí si no tienes uno.

function App() {
  return (
    // Envuelve toda la aplicación con el ThemeProvider primero
    <ThemeProvider>
      {/* Luego, envuelve con el LanguageProvider */}
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* Aquí añadirías más rutas si las tienes */}
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;