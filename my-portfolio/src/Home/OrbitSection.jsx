import { useState } from "react";
import styles from "./OrbitSection.module.css";
import SpaceshipLauncher from "./SpaceshipLauncher";
import sun from "./assets/orbit/sun.png";
import planetPortfolio from "./assets/orbit/portfolio-planet.png";
import planetSaas from "./assets/orbit/project-planet.png";
import planetWork from "./assets/orbit/work-planet.png";
import planetExperimentos from "./assets/orbit/lab-planet.png";
import asteroid from "./assets/orbit/asteroid.png";
import satellite from "./assets/orbit/satelite.png";
import astronaut from "./assets/orbit/robot.png";
import PlanetZoomPanel from "./PlanetZoomPanel";
import Asteroid from "./Floating/Asteroid";
import Satellite from "./Floating/Satellite";
import Astronaut from "./Floating/Astronaut";

import { useLanguage } from "./context/LanguageContext";

export default function OrbitSection() {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(null); // ← planeta seleccionado

  // Configuración estática para mantener los delays constantes
  const [planetConfig] = useState(() => [
    { id: "portfolio", label: "Portfolio", link: "/portfolio-planet", orbit: 1, img: planetPortfolio, delay: -(Math.random() * 100) },
    { id: "projects", label: "Projects", link: "/project-planet", orbit: 2, img: planetSaas, delay: -(Math.random() * 100) },
    { id: "work", label: "Work", link: "/work-planet", orbit: 4, img: planetWork, delay: -(Math.random() * 100) },
    { id: "lab", label: "Lab", link: "/lab-planet", orbit: 3, img: planetExperimentos, delay: -(Math.random() * 100) },
  ]);

  const items = planetConfig.map(item => ({
    ...item,
    description: t.orbit[item.id + 'Desc']
  }));

  const sunItem = {
    label: t.tutorial.sunTitle, // "El Sol" or "The Sun"
    link: "/sun",
    img: sun,
    description: t.orbit.sunDesc
  };

  return (
    <section className={styles.section} id="orbit-section">

      {/* PANEL ZOOM */}
      {selected && (
        <PlanetZoomPanel
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <div className={styles.system} data-zoom={!!selected}>

        {/* SOL */}
        <div
          className={`${styles.sun} ${selected?.label === "Sol" ? styles.zoomSun : ""} ${selected && selected.label !== "Sol" ? styles.fade : ""}`}
          onClick={() => setSelected(sunItem)}
          onMouseEnter={() => setTitle("Sol")}
          onMouseLeave={() => setTitle("")}
        >
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
            style={{ animationDelay: `${item.delay}s` }}
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
      <SpaceshipLauncher items={items} />

      {/* DECORACIÓN FLOTANTE */}
      <Asteroid src={asteroid} className={`${styles.floatingItem} ${styles.asteroid}`} alt="Asteroid" />
      <Satellite src={satellite} className={`${styles.floatingItem} ${styles.satellite}`} alt="Satellite" />
      <Astronaut src={astronaut} className={`${styles.floatingItem} ${styles.astronaut}`} alt="Astronaut" />
    </section>
  );
}
