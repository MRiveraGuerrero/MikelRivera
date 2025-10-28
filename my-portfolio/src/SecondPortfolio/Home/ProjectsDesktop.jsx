import React, { useState } from "react";
import "./ProjectsDesktop.css";

const SITES = [
    { id: "sientame", name: "Siéntame", url: "https://sientame.com" },
    { id: "sv2", name: "SurvivalVacation2", url: "https://survivalvacation2.com" },
    { id: "bisky", name: "BiSKY Team", url: "https://biskyteam.com" },
];

export default function ProjectsDesktop() {
  const [active, setActive] = useState(SITES[0].id);
  const current = SITES.find(s => s.id === active);

  return (
    <section className="desk">
      <div className="monitor">
        <div className="bezel">
          <header className="window-top">
            <div className="title">Mis proyectos</div>
            <div className="actions">
              <button className="btn" aria-label="Minimizar">—</button>
              <button className="btn" aria-label="Maximizar">▭</button>
              <button className="btn close" aria-label="Cerrar">✕</button>
            </div>
          </header>

          <nav className="tabs">
            {SITES.map(s => (
              <button
                key={s.id}
                className={`tab ${active === s.id ? "active" : ""}`}
                onClick={() => setActive(s.id)}
                title={s.url}
              >
                {s.name}
              </button>
            ))}
            <a className="open-ext" href={current.url} target="_blank" rel="noreferrer">
              Abrir en pestaña ↗
            </a>
          </nav>

          <div className="workspace">
            <iframe
              key={current.id}
              src={current.url}
              title={current.name}
              className="frame"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          <footer className="taskbar">
            <div className="dot" />
            <span className="task-label">{current.name}</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
