// src/components/About.jsx
import React from "react";
import "../../styles/AboutMe.css";

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
    { text: "Entusiasta y Disciplinado", icon: "✨" }, // Puedes reemplazar con iconos reales
    { text: "Aprendizaje Continuo", icon: "📚" },
    { text: "Perseverante", icon: "💪" },
    { text: "Visión Crítica y Autocrítica", icon: "🧐" },
    { text: "Perspectivas Diferentes", icon: "💡" },
  ];

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "auto" }}>
      <h1>Sobre Mí</h1>
      <section id="about-me" className="about-me-section">
        <div className="about-me-content">
          <img
            src={profileImage} // Descomentar y añadir tu foto de perfil aquí
            alt="Mikel Rivera Guerrero - Foto de Perfil"
            className="profile-image"
          />
          <div className="about-me-text">
            <p>
              ¡Hola! Soy Mikel Rivera Guerrero, un estudiante de Ingeniería Informática de Gestión y Sistemas de Información con un gran entusiasmo por el sector tecnológico y siempre en camino hacia la mejora continua.
            </p>
            <p>
              Mi perfil profesional se enfoca en el desarrollo y la gestión de sistemas. Me considero un desarrollador Full Stack en formación, con un interés particular en la creación de soluciones eficientes.
            </p>
          </div>
        </div>

        {/* Sección de Habilidades Técnicas con Logos */}
        <div className="skills-section">
          <h2>Competencias Técnicas</h2>
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
          <h2>Cualidades Personales</h2>
          <ul className="qualities-list">
            {personalQualities.map((quality, index) => (
              <li key={index} className="quality-item">
                <span className="quality-icon">{quality.icon}</span> {quality.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de Declaración de Ambición */}
        <div className="ambition-section">
          <p>
            Aunque reconozco que mis competencias técnicas son mayormente intermedias y básicas, estoy completamente dedicado a mi desarrollo profesional. Mi ambición es **mejorar continuamente** en todas estas áreas para **destacar como un profesional sobresaliente** en el mundo tecnológico.
          </p>
        </div>
      </section>
    </div>
  );
}