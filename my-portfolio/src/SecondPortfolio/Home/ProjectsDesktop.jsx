import React, { useState } from "react";
import styles from "./ProjectsDesktop.module.css";

const SITES = [
  { id: "sientame", name: "Siéntame", url: "https://sientame.com" },
  { id: "sv2", name: "SurvivalVacation2", url: "https://survivalvacation2.com" },
  { id: "bisky", name: "BiSKY Team", url: "https://biskyteam.com" },
];

export default function ProjectsDesktop() {
  const [active, setActive] = useState(SITES[0].id);
  const current = SITES.find(s => s.id === active);

  return (
    <section className={styles.desk}>
      <div className={styles.monitor}>
        <div className={styles.bezel}>
          <header className={styles["window-top"]}>
            <div className={styles.title}>Mis proyectos</div>
            <div className={styles.actions}>
              <button className={styles.btn} aria-label="Minimizar">—</button>
              <button className={styles.btn} aria-label="Maximizar">▭</button>
              <button className={`${styles.btn} ${styles.close}`} aria-label="Cerrar">✕</button>
            </div>
          </header>

          <nav className={styles.tabs}>
            {SITES.map(s => (
              <button
                key={s.id}
                className={`${styles.tab} ${active === s.id ? styles.active : ""}`}
                onClick={() => setActive(s.id)}
                title={s.url}
              >
                {s.name}
              </button>
            ))}
            <a className={styles["open-ext"]} href={current.url} target="_blank" rel="noreferrer">
              Abrir en pestaña ↗
            </a>
          </nav>

          <div className={styles.workspace}>
            <iframe
              key={current.id}
              src={current.url}
              title={current.name}
              className={styles.frame}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          <footer className={styles.taskbar}>
            <div className={styles.dot} />
            <span className={styles["task-label"]}>{current.name}</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
