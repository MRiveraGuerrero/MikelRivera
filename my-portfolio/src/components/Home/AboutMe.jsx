// src/components/About.jsx
import React from "react";
import "../../styles/AboutMe.css";
import { useLanguage } from '../contexts/LanguageContext';

// Importa los logos de las tecnologías
// Asegúrate de que estos logos existan en tu carpeta 'assets'
// Por ejemplo:
import reactLogo from "../../assets/logos/react.svg";
import githubLogo from "../../assets/logos/github.svg";
import nodeLogo from "../../assets/logos/nodejs.svg";
import javaLogo from "../../assets/logos/java.svg";
import htmlLogo from "../../assets/logos/html.svg";
import cssLogo from "../../assets/logos/css.svg";
import jsLogo from "../../assets/logos/javascript.svg";
import pythonLogo from "../../assets/logos/python.svg";
import stripeLogo from "../../assets/logos/stripe.svg";
import mysqlLogo from "../../assets/logos/mysql.svg";
import wordpressLogo from "../../assets/logos/wordpress.svg";
import railwayLogo from "../../assets/logos/railway.svg"; // O un icono que represente SCRUM

import profileImage from "../../assets/me/me.png";

// Iconos de ejemplo para cualidades personales (puedes usar React Icons si los instalas)
// Por ejemplo, si usas `react-icons`:
// import { FaLightbulb, FaBrain, FaRegSmileBeam, FaBookOpen } from 'react-icons/fa';


export default function About() {
  const { t } = useLanguage();
  const techSkills = [
    { name: "Java", logo: javaLogo },
    { name: "HTML", logo: htmlLogo },
    { name: "CSS", logo: cssLogo },
    { name: "JavaScript", logo: jsLogo },
    { name: "Python", logo: pythonLogo },
    { name: "Stripe", logo: stripeLogo },
    { name: "MySQL", logo: mysqlLogo },
    { name: "WordPress", logo: wordpressLogo },
    { name: "Railway", logo: railwayLogo },
    { name: "Github", logo: githubLogo },
    // Si usas React o Node.js como tus principales, puedes añadirlos aquí
    { name: "React", logo: reactLogo },
    { name: "Node.js", logo: nodeLogo },
  ];

  const personalQualities = [
    { textKey: "about.quality1", icon: "✨" }, // Usa 'textKey' para la traducción
    { textKey: "about.quality2", icon: "📚" },
    { textKey: "about.quality3", icon: "💪" },
    { textKey: "about.quality4", icon: "🧐" },
    { textKey: "about.quality5", icon: "💡" },
  ];

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "auto" }}>
      <h1>{t('about.title')}</h1>
      <section id="about-me" className="about-me-section">
        <div className="about-me-content">
          <img
            src={profileImage} // Descomentar y añadir tu foto de perfil aquí
            alt="Mikel Rivera Guerrero - Foto de Perfil"
            className="profile-image"
          />
          <div className="about-me-text">
           <p>
              {t('about.introParagraph1')} {/* Traduce el primer párrafo */}
            </p>
            <p>
              {t('about.introParagraph2')} {/* Traduce el segundo párrafo */}
            </p>
          </div>
        </div>

        {/* Sección de Habilidades Técnicas con Logos */}
        <div className="skills-section">
          <h2>{t('about.techSkillsTitle')}</h2>
          <div className="skills-grid">
            {techSkills.map((skill, index) => (
              <div key={index} className="skill-item">
                <img src={skill.logo} alt={skill.name} className="skill-logo" />
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Cualidades Personales */}
        <div className="qualities-section">
          <h2>{t('about.qualitiesTitle')}</h2> 
          <ul className="qualities-list">
            {personalQualities.map((quality, index) => (
              <li key={index} className="quality-item">
                <span className="quality-icon">{quality.icon}</span> {t(quality.textKey)}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de Declaración de Ambición */}
        <div className="ambition-section">
          <p dangerouslySetInnerHTML={{ __html: t('about.ambitionText') }} />
        </div>
      </section>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"></link>
    </div>
  );
}