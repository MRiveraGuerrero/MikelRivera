// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto
const LanguageContext = createContext();

// Crea un hook personalizado para consumir el contexto fácilmente
export const useLanguage = () => useContext(LanguageContext);

// Proveedor del contexto
export const LanguageProvider = ({ children }) => {
  // Intenta obtener el idioma del localStorage o usa 'es' por defecto
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'es';
  });

  // Guarda el idioma en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Aquí defines tus traducciones. Puedes cargarlas desde un JSON externo si son muchas.
  const translations = {
 }

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Devuelve la clave si no se encuentra la traducción
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};