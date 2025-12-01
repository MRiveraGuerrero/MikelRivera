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

export default function OrbitSection() {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(null); // ← planeta seleccionado

  const [items] = useState(() => [
    { label: "Portfolio", link: "/portfolio-planet", orbit: 1, img: planetPortfolio, description: "Mis trabajos, diseños y efectos.", delay: -(Math.random() * 100) },
    { label: "Projects", link: "/project-planet", orbit: 2, img: planetSaas, description: "Mis proyectos y SaaS que estoy creando.", delay: -(Math.random() * 100) },
    { label: "Work", link: "/work-planet", orbit: 4, img: planetWork, description: "Freelance, landings y curro técnico.", delay: -(Math.random() * 100) },
    { label: "Lab", link: "/lab-planet", orbit: 3, img: planetExperimentos, description: "Pruebas, caos y experimentos.", delay: -(Math.random() * 100) },
  ]);

  const sunItem = {
    label: "Sol",
    link: "/sun",
    img: sun,
    description: "El centro del sistema. Aquí comienza todo."
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
