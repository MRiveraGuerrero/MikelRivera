import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Crea el Contexto
export const ThemeContext = createContext();

// 2. Crea un Provider para el Contexto
export const ThemeProvider = ({ children }) => {
  // Obtiene el tema inicial de localStorage o prefiere el sistema (si es oscuro)
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light'; // Por defecto, si no hay localStorage (SSR, etc.)
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Efecto para actualizar el atributo data-theme en el <body>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Crea un hook personalizado para consumir el Contexto fácilmente
export const useTheme = () => useContext(ThemeContext);