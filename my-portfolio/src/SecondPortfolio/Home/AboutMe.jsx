import React, { useEffect, useRef, useState } from "react";
import "./AboutMe.css";
import { useLanguage } from "../contexts/LanguageContext";

// Logos
import reactLogo from "../assets/logos/react.svg";
import githubLogo from "../assets/logos/github.svg";
import nodeLogo from "../assets/logos/nodejs.svg";
import javaLogo from "../assets/logos/java.svg";
import htmlLogo from "../assets/logos/html.svg";
import cssLogo from "../assets/logos/css.svg";
import jsLogo from "../assets/logos/javascript.svg";
import pythonLogo from "../assets/logos/python.svg";
import stripeLogo from "../assets/logos/stripe.svg";
import mysqlLogo from "../assets/logos/mysql.svg";
import wordpressLogo from "../assets/logos/wordpress.svg";
import railwayLogo from "../assets/logos/railway.svg";
import profileImage from "../assets/me/me.png";

export default function AboutMe() {
  const { t } = useLanguage();
  const [section, setSection] = useState("about");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 500;
    };
    resize();
    window.addEventListener("resize", resize);

    const letters = "010101010101".split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f57c00";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const techSkills = [
    { name: "React", logo: reactLogo },
    { name: "Node.js", logo: nodeLogo },
    { name: "JavaScript", logo: jsLogo },
    { name: "MySQL", logo: mysqlLogo },
    { name: "Python", logo: pythonLogo },
    { name: "Stripe", logo: stripeLogo },
    { name: "Railway", logo: railwayLogo },
    { name: "WordPress", logo: wordpressLogo },
    { name: "GitHub", logo: githubLogo },
    { name: "HTML", logo: htmlLogo },
    { name: "CSS", logo: cssLogo },
    { name: "Java", logo: javaLogo },
  ];

  const personalQualities = [
    { icon: "✨", text: t("about.quality1") },
    { icon: "📚", text: t("about.quality2") },
    { icon: "💪", text: t("about.quality3") },
    { icon: "🧐", text: t("about.quality4") },
    { icon: "💡", text: t("about.quality5") },
  ];

  return (
    <section className="aboutme-section">
      <canvas ref={canvasRef} className="aboutme-canvas" />

      <div className="aboutme-card">
        <div className="tabs">
          <button
            className={section === "about" ? "active" : ""}
            onClick={() => setSection("about")}
          >
            🧍 Sobre mí
          </button>
          <button
            className={section === "skills" ? "active" : ""}
            onClick={() => setSection("skills")}
          >
            💻 Habilidades
          </button>
          <button
            className={section === "qualities" ? "active" : ""}
            onClick={() => setSection("qualities")}
          >
            ⚡ Cualidades
          </button>
        </div>

        <div className="tab-wrapper">
          {section === "about" && (
            <div className="tab-content about">
              <img src={profileImage} alt="Perfil" className="profile-img" />
              <p>
                Soy <strong>Mikel Rivera Guerrero</strong>, desarrollador full stack con experiencia
                en SAP, React, Node.js y MySQL. Me apasiona crear soluciones escalables y visualmente
                atractivas que unan diseño y funcionalidad.
              </p>
              <p>
                Trabajo en <strong>Deloitte</strong> como consultor técnico y soy creador de{" "}
                <strong>Siéntame</strong> y <strong>Survival Vacation 2</strong>.
              </p>
            </div>
          )}

          {section === "skills" && (
            <div className="tab-content skills">
              <div className="skills-grid">
                {techSkills.map((skill, i) => (
                  <div key={i} className="skill-item">
                    <img src={skill.logo} alt={skill.name} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === "qualities" && (
            <div className="tab-content qualities">
              <ul>
                {personalQualities.map((q, i) => (
                  <li key={i}>
                    <span className="quality-icon">{q.icon}</span>
                    <span>{q.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
