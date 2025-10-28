import React, { useEffect, useRef, useState } from "react";
import "./AboutMe.css";
import { motion, AnimatePresence } from "framer-motion";
import profileImage from "../assets/me/me.png";
import mikelRetro from "../assets/me/me-retro.png";

import sientamePreview from "../assets/ProjectImages/Sientame.png";
import sv2Preview from "../assets/ProjectImages/SV2.png";
import reactLogo from "../assets/logos/react.svg";
import nodeLogo from "../assets/logos/nodejs.svg";
import jsLogo from "../assets/logos/javascript.svg";
import mysqlLogo from "../assets/logos/mysql.svg";
import wordpressLogo from "../assets/logos/wordpress.svg";
import pythonLogo from "../assets/logos/python.svg";
import javaLogo from "../assets/logos/java.svg";
import htmlLogo from "../assets/logos/html.svg";
import cssLogo from "../assets/logos/css.svg";

export default function AboutMe() {
  const [section, setSection] = useState("about");
  const [openedWindow, setOpenedWindow] = useState(null); // maneja cualquier popup
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  // === FONDO MATRIX ===
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

  // === DATOS ===
  const projects = {
    sientame: { name: "Siéntame", url: "https://www.sientame.com", img: sientamePreview, desc: "Plataforma SaaS para reservas y gestión de negocios locales." },
    sv2: { name: "Survival Vacation 2", url: "https://www.survivalvacation2.com", img: sv2Preview, desc: "Juego web de exploración, supervivencia y creación de mapas." },
  };

  const techSkills = [
    // === Frontend ===
    { name: "React", logo: reactLogo, desc: "Framework principal para interfaces dinámicas y SPA." },
    { name: "JavaScript", logo: jsLogo, desc: "Lenguaje central para la lógica del frontend y backend." },
    { name: "HTML5", logo: htmlLogo, desc: "Estructuración semántica de interfaces web modernas." },
    { name: "CSS3", logo: cssLogo, desc: "Diseño visual, animaciones y adaptabilidad responsive." },

    // === Backend ===
    { name: "Node.js", logo: nodeLogo, desc: "Entorno de ejecución de JavaScript del lado del servidor." },
    { name: "MySQL", logo: mysqlLogo, desc: "Gestión de bases de datos relacionales con Sequelize ORM." },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", desc: "Base de datos NoSQL orientada a documentos." },
    { name: "SAP ABAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg", desc: "Lenguaje principal para desarrollo en entornos SAP empresariales." },

    // === DevOps / Infraestructura ===
    { name: "Linux (Ubuntu)", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", desc: "Gestión de servidores, terminal y despliegue en entornos Linux." },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", desc: "Contenerización de aplicaciones y entornos reproducibles." },
    { name: "Railway", logo: "https://railway.app/brand/logo-light.svg", desc: "Plataforma PaaS para despliegue rápido de servicios backend." },
    { name: "Vercel", logo: "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg", desc: "Despliegue continuo de aplicaciones frontend con optimización CDN." },

    // === Colaboración / Herramientas ===
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", desc: "Control de versiones y colaboración en proyectos de desarrollo." },
    { name: "Microsoft 365", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", desc: "Entorno de herramientas empresariales para gestión y comunicación." },
    { name: "Cloudinary", logo: "https://res.cloudinary.com/cloudinary/image/upload/v1689637456/cloudinary_logo_for_white_bg.svg", desc: "Gestión de imágenes y contenido multimedia optimizado en la nube." },
    { name: "ChatGPT API", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", desc: "Integración de modelos de lenguaje para automatización e IA conversacional." },

    // === Otros ===
    { name: "Python", logo: pythonLogo, desc: "Uso en automatización, análisis de datos e inteligencia artificial." },
    { name: "Java", logo: javaLogo, desc: "Base sólida en programación orientada a objetos y sistemas empresariales." },
    { name: "WordPress", logo: wordpressLogo, desc: "CMS flexible para desarrollo rápido y personalización web." },
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

  // === DRAG LOGIC ===
  const handleMouseDown = (e) => {
    if (!openedWindow) return;
    setIsDragging(true);
    const rect = e.target.closest(".popup-window")?.getBoundingClientRect();
    if (rect) {
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const parent = document.querySelector(".aboutme-card").getBoundingClientRect();
    const x = e.clientX - offset.x - parent.left;
    const y = e.clientY - offset.y - parent.top;
    setDragPos({ x, y });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  // === RENDER ===
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
              <img
                src={profileImage}
                alt="Perfil"
                className="profile-img clickable"
                onClick={() =>
                  setOpenedWindow({
                    title: "Dato curioso",
                    content:
                      "🌟 Apasionado por el diseño funcional y el minimalismo digital.\n🎮 Me encanta combinar arte y lógica en mis proyectos, desde interfaces limpias hasta videojuegos experimentales.\n🚀 Mi objetivo a medio plazo es desarrollar una plataforma que mezcle IA, creatividad y usabilidad real.\n💡 Fuera del código, disfruto aprender sobre psicología, diseño de producto y comportamiento humano.",
                  })
                }
              />

              <p>
                Soy licenciado en <strong>Ingeniería Informática de Gestión y Sistemas de Información</strong>,
                con una marcada pasión por la tecnología y un compromiso hacia la mejora continua.
                Me considero una persona entusiasta y disciplinada, siempre lista para afrontar nuevos desafíos
                con energía. Mi enfoque se basa en el aprendizaje constante, buscando siempre crecer y perfeccionar
                mis habilidades tanto profesionales como personales.
              </p>

              <p>
                Destaco por mi perseverancia, enfrentando los obstáculos con una mentalidad orientada a la solución,
                así como por mi visión crítica y autocrítica, que me permite analizar tanto situaciones externas como
                mi propio desempeño. Aporto perspectivas diferentes e ideas innovadoras que enriquecen los proyectos
                en los que participo.
              </p>

              <p>
                He desarrollado proyectos como{" "}
                <span
                  className="hover-project clickable"
                  onClick={() => setOpenedWindow(projects.sientame)}
                >
                  <strong>Siéntame</strong>
                </span>{" "}
                y{" "}
                <span
                  className="hover-project clickable"
                  onClick={() => setOpenedWindow(projects.sv2)}
                >
                  <strong>Survival Vacation 2</strong>
                </span>
                , que reflejan mi visión de crear soluciones útiles, atractivas y técnicamente sólidas.
              </p>

              <p>
                Mi meta es seguir aprendiendo, mejorando mis habilidades y aportando valor a cada proyecto
                en el que participe, combinando creatividad y precisión técnica.
              </p>
            </div>
          )}

          {section === "skills" && (
            <div className="tab-content skills">
              <div className="skills-grid">
                {techSkills.map((s, i) => (
                  <div
                    key={i}
                    className="skill-item"
                    onClick={() => setOpenedWindow(s)}
                  >
                    <img src={s.logo} alt={s.name} />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === "qualities" && (
            <div className="tab-content qualities">
              <div className="qualities-layout">
                {/* Imagen personaje a la izquierda */}
                <div className="qualities-portrait">
                  <img src={mikelRetro} alt="Mikel retro futurista" />
                </div>

                {/* Estadísticas a la derecha */}
                <div className="qualities-stats">
                  {qualities.map((q, i) => (
                    <div
                      key={i}
                      className="quality-stat"
                      onClick={() => setOpenedWindow(q)}
                    >
                      <div className="quality-label">
                        <span className="quality-icon">{q.icon}</span>
                        <span>{q.title}</span>
                      </div>
                      <div className="stat-bar">
                        <motion.div
                          className="stat-fill"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, delay: i * 0.2 }}
                        />
                        <span className="stat-percent">MAX</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {section === "languages" && (
            <div className="tab-content languages">
              <div className="language-cards">
                {languages.map((l, i) => (
                  <motion.div
                    key={i}
                    className="language-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                  >
                    <div className="lang-header">
                      <h4>{l.name}</h4>
                      <span className="lang-level">{l.level}</span>
                    </div>

                    <div className="lang-circle">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path
                          className="circle-bg"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="circle"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          strokeDasharray={`${l.percent}, 100`}
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{ strokeDasharray: `${l.percent}, 100` }}
                          transition={{ duration: 1.5, delay: i * 0.3 }}
                        />
                        <text x="18" y="20.35" className="percentage">
                          {l.percent}
                        </text>
                      </svg>
                    </div>

                    <div className="lang-footer">
                      <span>Power {l.percent} / 100</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {openedWindow && (
            <motion.div
              key={openedWindow.name || openedWindow.title}
              className="popup-window movable"
              style={{ left: dragPos.x || "50%", top: dragPos.y || "50%" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="popup-header" onMouseDown={handleMouseDown}>
                <span>{openedWindow.name || openedWindow.title}</span>
                <button onClick={() => setOpenedWindow(null)}>✖</button>
              </div>
              {openedWindow.img && <img src={openedWindow.img} alt={openedWindow.name} className="popup-img" />}
              <p>{openedWindow.desc || openedWindow.text || openedWindow.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="aboutme-hint">
          <p>⚡ Haz clic para saber más ⚡</p>
        </div>
      </div>

    </section>
  );
}
