// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-scroll";
import { useTheme } from './contexts/ThemeContext';
import { useLanguage } from './contexts/LanguageContext'; // Importa el hook de idioma
import "../styles/header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage(); // Usa el hook para acceder al idioma y la función 't'

  // Los navItems ahora pueden ser dinámicos o simplemente usar la función 't'
  // Es más eficiente usar 't' directamente en el renderizado o pasar las claves.
  // Aquí, redefinimos navItems para usar las traducciones dinámicamente.
  const navItems = [
    { name: t('header.portfolio'), to: "portfolio" },
    { name: t('header.about'), to: "about" },
    { name: t('header.projects'), to: "mypro" },
    { name: t('header.contact'), to: "contact" },
  ];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          {/* Logo */}
          <div className="header__logo">
            Mikel<span className="logo-highlight">Rivera</span>
          </div>

          {/* Desktop nav */}
          <nav className="desktop-nav">
            {navItems.map((item) => ( // Usamos los navItems traducidos
              <Link
                key={item.to} // Usar 'to' como key es más estable si 'name' cambia
                to={item.to}
                smooth={true}
                duration={500}
                className="header__nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="language-selector">
            <select onChange={handleLanguageChange} value={language}>
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Toggle de Modo Oscuro */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-button"
            aria-label={t(`header.toggle${theme === 'light' ? 'Dark' : 'Light'}`)}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="header__burger"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav menu */}
      {isOpen && (
        <div className="header__mobile-menu">
          <nav>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="header__mobile-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}