// src/components/About.jsx
import React from "react";
import "../../styles/AboutMe.css"; // Se mantiene para usar estilos comunes como el color de acento
//import profileImage from "../../assets/profile.jpg"; // Asegúrate de tener una imagen de perfil en esta ruta

export default function About() {
  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "auto" }}>
      <h1>Sobre Mí</h1>
      <section id="about-me" className="about-me-section">
        <div className="about-me-content">
          <img
            //src={profileImage}
            alt="Tu Foto de Perfil"
            className="profile-image"
          />
          <div className="about-me-text">
            <p>
              ¡Hola! Soy [Tu Nombre], un desarrollador web apasionado por crear experiencias digitales **innovadoras** y **funcionales**. Me especializo en el desarrollo front-end con **React** y tengo experiencia en la construcción de APIs robustas con **Node.js**.
            </p>
            <p>
              Mi enfoque principal es la creación de interfaces de usuario **intuitivas** y **estéticamente agradables** que no solo se vean bien, sino que también ofrezcan una excelente **usabilidad** y **rendimiento**. Disfruto resolviendo problemas complejos y aprendiendo continuamente nuevas tecnologías para mantenerme al día en este campo en constante evolución.
            </p>
            <p>
              Fuera del código, me encanta [Tu Pasatiempo/Interés 1, por ejemplo: la fotografía, el senderismo, leer ciencia ficción] y [Tu Pasatiempo/Interés 2, por ejemplo: cocinar, jugar videojuegos, viajar]. ¡Creo que el equilibrio entre la vida profesional y personal es clave para la **creatividad** y la **productividad**!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}