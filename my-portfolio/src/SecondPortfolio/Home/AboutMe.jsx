import React, { useEffect, useRef, useState } from "react";
import "./AboutMe.css";
import { motion, AnimatePresence } from "framer-motion";
import profileImage from "../assets/me/me.png";

import sientamePreview from "../assets/ProjectImages/Sientame.png";
import sv2Preview from "../assets/ProjectImages/SV2.png";
import reactLogo from "../assets/logos/react.svg";
import nodeLogo from "../assets/logos/nodejs.svg";
import jsLogo from "../assets/logos/javascript.svg";
import mysqlLogo from "../assets/logos/mysql.svg";
import wordpressLogo from "../assets/logos/wordpress.svg";
import pythonLogo from "../assets/logos/python.svg";
import javaLogo from "../assets/logos/java.svg";

export default function AboutMe() {
  const [section, setSection] = useState("about");
  const [openedSkill, setOpenedSkill] = useState(null);
  const [openedQuality, setOpenedQuality] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
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
    const letters = "01".split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
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
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  const projects = {
    sientame: { name: "Siéntame", url: "https://www.sientame.com", img: sientamePreview },
    sv2: { name: "Survival Vacation 2", url: "https://www.survivalvacation2.com", img: sv2Preview },
  };

  const techSkills = [
    { name: "React", logo: reactLogo, desc: "Framework principal para interfaces dinámicas." },
    { name: "Node.js", logo: nodeLogo, desc: "Base del backend con Express y MySQL." },
    { name: "JavaScript", logo: jsLogo, desc: "Lenguaje central para lógica y front." },
    { name: "MySQL", logo: mysqlLogo, desc: "Gestión y diseño de bases de datos relacionales." },
    { name: "WordPress", logo: wordpressLogo, desc: "Personalización avanzada y despliegues rápidos." },
    { name: "Python", logo: pythonLogo, desc: "Uso en IA, análisis y automatización." },
    { name: "Java", logo: javaLogo, desc: "Base sólida en orientación a objetos." },
  ];

  const qualities = [
    { icon: "💪", title: "Perseverancia", text: "Constancia ante la complejidad y los errores." },
    { icon: "🧠", title: "Pensamiento Crítico", text: "Capacidad de evaluar procesos y optimizarlos." },
    { icon: "🚀", title: "Curiosidad", text: "Aprendizaje continuo de tecnologías nuevas." },
    { icon: "🤝", title: "Colaboración", text: "Comunicación clara y adaptación a equipos diversos." },
    { icon: "💡", title: "Creatividad", text: "Enfoque innovador para resolver problemas." },
  ];

  const languages = [
    { name: "Español", level: "Nativo", percent: 100 },
    { name: "Inglés", level: "B2 — preparando C1", percent: 75 },
    { name: "Euskera", level: "Competencia básica profesional", percent: 40 },
  ];

  return (
    <section className="aboutme-section">
      <canvas ref={canvasRef} className="aboutme-canvas" />
      <div className="aboutme-card">
        <div className="tabs">
          {["about", "skills", "qualities", "languages"].map((tab) => (
            <button key={tab} className={section === tab ? "active" : ""} onClick={() => setSection(tab)}>
              {tab === "about" && "🧍 Sobre mí"}
              {tab === "skills" && "💻 Habilidades"}
              {tab === "qualities" && "⚡ Cualidades"}
              {tab === "languages" && "🌍 Idiomas"}
            </button>
          ))}
        </div>

        <div className="tab-wrapper">
          {section === "about" && (
            <div className="tab-content about">
              <img src={profileImage} alt="Perfil" className="profile-img" />
              <p>
                Soy <strong>Mikel Rivera Guerrero</strong>, desarrollador full stack enfocado en crear plataformas
                web con identidad propia. Combino diseño, negocio y tecnología para construir productos escalables.
              </p>
              <p>
                He trabajado en proyectos personales como{" "}
                <span
                  className="hover-project"
                  onMouseEnter={() => setHoveredProject("sientame")}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <strong>Siéntame</strong>
                </span>{" "}
                y{" "}
                <span
                  className="hover-project"
                  onMouseEnter={() => setHoveredProject("sv2")}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <strong>Survival Vacation 2</strong>
                </span>, ambos diseñados con una visión de crecimiento y profesionalización.
              </p>
              <p>
                Me impulsa la mejora continua, la arquitectura limpia y el impacto real de cada línea de código.
              </p>
              <AnimatePresence>
                {hoveredProject && projects[hoveredProject] && (
                  <motion.img
                    key={hoveredProject}
                    src={projects[hoveredProject].img}
                    alt={projects[hoveredProject].name}
                    className="project-preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => window.open(projects[hoveredProject].url, "_blank")}
                  />
                )}
              </AnimatePresence>
            </div>
          )}

          {section === "skills" && (
            <div className="tab-content skills">
              <div className="skills-grid">
                {techSkills.map((s, i) => (
                  <div key={i} className="skill-item" onDoubleClick={() => setOpenedSkill(s)}>
                    <img src={s.logo} alt={s.name} />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {openedSkill && (
                  <motion.div
                    key={openedSkill.name}
                    className="popup-window"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="popup-header">
                      <span>{openedSkill.name}</span>
                      <button onClick={() => setOpenedSkill(null)}>✖</button>
                    </div>
                    <p>{openedSkill.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {section === "qualities" && (
            <div className="tab-content qualities">
              <ul>
                {qualities.map((q, i) => (
                  <li key={i} onDoubleClick={() => setOpenedQuality(q)}>
                    <span className="quality-icon">{q.icon}</span>
                    {q.title}
                  </li>
                ))}
              </ul>
              <AnimatePresence>
                {openedQuality && (
                  <motion.div
                    key={openedQuality.title}
                    className="popup-window"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="popup-header">
                      <span>{openedQuality.title}</span>
                      <button onClick={() => setOpenedQuality(null)}>✖</button>
                    </div>
                    <p>{openedQuality.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {section === "languages" && (
            <div className="tab-content languages">
              {languages.map((l, i) => (
                <div key={i} className="lang-item">
                  <span>{l.name} — {l.level}</span>
                  <div className="lang-bar">
                    <motion.div
                      className="lang-progress"
                      initial={{ width: 0 }}
                      animate={{ width: `${l.percent}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
