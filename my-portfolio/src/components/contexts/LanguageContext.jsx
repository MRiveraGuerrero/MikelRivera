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
    es: {
      header: {
        portfolio: "Portfolio",
        about: "Sobre mí",
        projects: "Proyectos",
        contact: "Contacto",
        toggleDark: "Cambiar a modo oscuro",
        toggleLight: "Cambiar a modo claro",
      },
      projects: {
        title: "Proyectos",
        project1_title: "Survival Vacation 2",
        project1_description: "Juego web desarrollado en React y Node.js, Survival Vacation 2.",
        project2_title: "Bisky Team",
        project2_description: "Página web de Bisky Team, equipo de lanzamiento de cohetes de la universidad de la EHU.",
        visitSite: "Visitar sitio →",
      },
      about: {
        title: "Sobre Mí",
        profileAlt: "Mikel Rivera Guerrero - Foto de Perfil",
        introParagraph1: "¡Hola! Soy Mikel Rivera Guerrero, un estudiante de Ingeniería Informática de Gestión y Sistemas de Información con un gran entusiasmo por el sector tecnológico y siempre en camino hacia la mejora continua.",
        introParagraph2: "Mi perfil profesional se enfoca en el desarrollo y la gestión de sistemas. Me considero un desarrollador Full Stack en formación, con un interés particular en la creación de soluciones eficientes.",
        techSkillsTitle: "Competencias Técnicas",
        qualitiesTitle: "Cualidades Personales",
        quality1: "Entusiasta y Disciplinado",
        quality2: "Aprendizaje Continuo",
        quality3: "Perseverante",
        quality4: "Visión Crítica y Autocrítica",
        quality5: "Perspectivas Diferentes",
        ambitionText: "Aunque reconozco que mis competencias técnicas son mayormente intermedias y básicas, estoy completamente dedicado a mi desarrollo profesional. Mi ambición es **mejorar continuamente** en todas estas áreas para **destacar como un profesional sobresaliente** en el mundo tecnológico.",
      },
      contact: {
        title: "Contacto",
        intro: "¿Tienes una pregunta, una propuesta de proyecto o simplemente quieres saludar? ¡No dudes en ponerte en contacto conmigo!",
        nameLabel: "Nombre",
        emailLabel: "Email",
        subjectLabel: "Asunto",
        messageLabel: "Mensaje",
        sendButton: "Enviar Mensaje",
        successMessage: "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.",
        errorMessage: "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
        directEmailIntro: "También puedes enviarme un correo directamente a:",
      },
      portfolioGrid: {
        title: "Portfolio Selector",
        project1_title: "Portfolio 1",
        project1_description: "Nave espacial 3D en el espacio", // Traducción de "3D Spacecraft on the space"
        project2_title: "Portfolio 2",
        project2_description: "Ascensor en edificio",
        project3_title: "Portfolio 3",
        project3_description: "Aplicación web de gestión de tareas.",
        project4_title: "Portfolio 4",
        project4_description: "Sitio web corporativo para empresa.",
        viewProject: "Ver proyecto →",
      },
      portfolioIntro: {
        loadingModel: "Cargando modelo...",
        developerRole: "Developer",
      },
    },
    en: {
      header: {
        portfolio: "Portfolio",
        about: "About Me",
        projects: "Projects",
        contact: "Contact",
        toggleDark: "Switch to dark mode",
        toggleLight: "Switch to light mode",
      },
      projects: {
        title: "Projects",
        project1_title: "Survival Vacation 2",
        project1_description: "Web game developed with React and Node.js, Survival Vacation 2.",
        project2_title: "Bisky Team",
        project2_description: "Bisky Team website, rocketry team from EHU university.",
        visitSite: "Visit site →",
      },
      about: {
        title: "About Me",
        profileAlt: "Mikel Rivera Guerrero - Profile Picture",
        introParagraph1: "Hi! I'm Mikel Rivera Guerrero, a Computer Engineering student specializing in Management and Information Systems, with great enthusiasm for the tech sector and always on a path of continuous improvement.",
        introParagraph2: "My professional profile focuses on system development and management. I consider myself a Full Stack developer in training, with a particular interest in creating efficient solutions.",
        techSkillsTitle: "Technical Skills",
        qualitiesTitle: "Personal Qualities",
        quality1: "Enthusiastic and Disciplined",
        quality2: "Continuous Learning",
        quality3: "Perseverant",
        quality4: "Critical and Self-Critical Vision",
        quality5: "Different Perspectives",
        ambitionText: "While I acknowledge that my technical skills are mostly intermediate and basic, I am fully dedicated to my professional development. My ambition is to **continuously improve** in all these areas to **excel as an outstanding professional** in the tech world.",
      },
      contact: {
        title: "Contact",
        intro: "Do you have a question, a project proposal, or just want to say hello? Don't hesitate to get in touch!",
        nameLabel: "Name",
        emailLabel: "Email",
        subjectLabel: "Subject",
        messageLabel: "Message",
        sendButton: "Send Message",
        successMessage: "Message sent successfully! I'll get back to you soon.",
        errorMessage: "There was an error sending your message. Please try again later.",
        directEmailIntro: "You can also send me an email directly at:",
      },
      portfolioGrid: {
        title: "Portfolio Selector",
        project1_title: "Portfolio 1",
        project1_description: "3D Spacecraft on the space",
        project2_title: "Portfolio 2",
        project2_description: "Elevator in a building",
        project3_title: "Portfolio 3",
        project3_description: "Web application for task management.",
        project4_title: "Portfolio 4",
        project4_description: "Corporate website for a company.",
        viewProject: "View project →",
      },
      portfolioIntro: {
        loadingModel: "Loading model...",
        developerRole: "Developer",
      },
    },
  };

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