// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { ThemeProvider } from './components/contexts/ThemeContext'; // Importa el ThemeProvider

// Asegúrate de que tus estilos globales y de tema estén importados en algún lugar,
// idealmente en tu archivo principal (index.js o main.jsx) o aquí si no tienes uno.
// Por ejemplo:
// import './styles/themes.css';
// import './styles/app.css'; // Si tienes estilos generales de la app

function App() {
  return (
    // Envuelve todo el BrowserRouter con el ThemeProvider
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Aquí añadirías más rutas si las tienes */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;