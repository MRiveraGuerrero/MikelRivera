// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-scroll";
import "../styles/header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Portfolio", to: "about" },
    { name: "Sobre mí", to: "about" },
    { name: "Proyectos", to: "projects" },
    { name: "Habilidades", to: "skills" },
    { name: "Contacto", to: "contact" },
  ];

  return (
    <header className="header">
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>
          {/* Logo */}
          <div className="header__logo">Mikel<span style={{color: "#4f46e5"}}>Rivera</span></div>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: "none", gap: "2rem" }}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                smooth={true}
                duration={500}
                className="header__nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="mobile-menu-button" style={{ display: "block" }}>
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
                key={item.name}
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

      {/* CSS para mostrar/ocultar nav segun tamaño pantalla */}
      <style>{`
        @media(min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
          .header__mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
