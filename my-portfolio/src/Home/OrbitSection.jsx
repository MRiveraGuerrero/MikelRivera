import { useState } from "react";
import styles from "./OrbitSection.module.css";

import sun from "./assets/sun.webp";
import planetPortfolio from "./assets/planet-portfolio.webp";
import planetSaas from "./assets/planet-saas.webp";
import planetWork from "./assets/planet-work.webp";
import planetExperimentos from "./assets/planet-experimentos.webp";
import PlanetZoomPanel from "./PlanetZoomPanel";

export default function OrbitSection() {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(null); // ← planeta seleccionado

  const items = [
    { label: "Portfolio", link: "/portfolio", orbit: 1, img: planetPortfolio, description: "Mis trabajos, diseños y efectos." },
    { label: "Projects", link: "/saas", orbit: 2, img: planetSaas, description: "Mis proyectos y SaaS que estoy creando." },
    { label: "Work", link: "/landings", orbit: 4, img: planetWork, description: "Freelance, landings y curro técnico." },
    { label: "Lab", link: "/lab", orbit: 3, img: planetExperimentos, description: "Pruebas, caos y experimentos." },
  ];

  return (
    <section className={styles.section}>

      {/* PANEL ZOOM */}
      {selected && (
        <PlanetZoomPanel 
          item={selected} 
          onClose={() => setSelected(null)} 
        />
      )}

      <div className={styles.system} data-zoom={!!selected}>
        
        {/* SOL */}
        <div className={styles.sun}>
          <img src={sun} className={styles.sunImg} />
        </div>

        {/* ORBITAS */}
        <div className={`${styles.orbit} ${styles.o1}`} />
        <div className={`${styles.orbit} ${styles.o2}`} />
        <div className={`${styles.orbit} ${styles.o3}`} />
        <div className={`${styles.orbit} ${styles.o4}`} />

        {/* PLANETAS */}
        {items.map((item, i) => (
          <div
            key={i}
            className={`${styles.wrapper} ${styles["orbit" + item.orbit]} ${selected ? styles.fade : ""}`}
            onMouseEnter={() => setTitle(item.label)}
            onMouseLeave={() => setTitle("")}
          >
            <div
              className={`${styles.planet} ${selected?.label === item.label ? styles.zoomPlanet : ""}`}
              onClick={() => setSelected(item)}
            >
              <img src={item.img} className={styles.planetImg} />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
