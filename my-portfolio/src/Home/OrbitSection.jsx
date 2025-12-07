import { useState, useCallback, useMemo, memo } from "react";
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

// Memoizar componentes de planetas para evitar re-renders
const Planet = memo(({ item, selected, onSelect, onMouseEnter, onMouseLeave, styles }) => (
  <div
    className={`${styles.wrapper} ${styles["orbit" + item.orbit]} ${selected ? styles.fade : ""}`}
    style={{ animationDelay: `${item.delay}s` }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div
      className={`${styles.planet} ${selected?.label === item.label ? styles.zoomPlanet : ""}`}
      onClick={onSelect}
    >
      <img src={item.img} className={styles.planetImg} alt={item.label} />
    </div>
  </div>
));

Planet.displayName = 'Planet';

export default function OrbitSection() {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState(null);

  // Configuración estática memoizada
  const planetConfig = useMemo(() => [
    { id: "portfolio", label: "Portfolio", link: "/portfolio-planet", orbit: 1, img: planetPortfolio, delay: -(Math.random() * 100) },
    { id: "projects", label: "Projects", link: "/project-planet", orbit: 2, img: planetSaas, delay: -(Math.random() * 100) },
    { id: "work", label: "Work", link: "/work-planet", orbit: 4, img: planetWork, delay: -(Math.random() * 100) },
    { id: "lab", label: "Lab", link: "/lab-planet", orbit: 3, img: planetExperimentos, delay: -(Math.random() * 100) },
  ], []);

  const items = useMemo(() => planetConfig.map(item => ({
    ...item,
    description: t.orbit[item.id + 'Desc']
  })), [planetConfig, t.orbit]);

  const sunItem = useMemo(() => ({
    label: t.tutorial.sunTitle,
    link: "/sun",
    img: sun,
    description: t.orbit.sunDesc
  }), [t.tutorial.sunTitle, t.orbit.sunDesc]);

  // Handlers memoizados
  const handleClosePanel = useCallback(() => setSelected(null), []);
  const handleSelectSun = useCallback(() => setSelected(sunItem), [sunItem]);
  const handleSetTitle = useCallback((newTitle) => setTitle(newTitle), []);
  const handleClearTitle = useCallback(() => setTitle(""), []);

  return (
    <section className={styles.section} id="orbit-section">

      {/* PANEL ZOOM */}
      {selected && (
        <PlanetZoomPanel
          item={selected}
          onClose={handleClosePanel}
        />
      )}

      <div className={styles.system} data-zoom={!!selected}>

        {/* SOL */}
        <div
          className={`${styles.sun} ${selected?.label === "Sol" ? styles.zoomSun : ""} ${selected && selected.label !== "Sol" ? styles.fade : ""}`}
          onClick={handleSelectSun}
          onMouseEnter={() => handleSetTitle("Sol")}
          onMouseLeave={handleClearTitle}
        >
          <img src={sun} className={styles.sunImg} alt="Sol" />
        </div>

        {/* ORBITAS */}
        <div className={`${styles.orbit} ${styles.o1}`} />
        <div className={`${styles.orbit} ${styles.o2}`} />
        <div className={`${styles.orbit} ${styles.o3}`} />
        <div className={`${styles.orbit} ${styles.o4}`} />

        {/* PLANETAS */}
        {items.map((item, i) => (
          <Planet
            key={item.id}
            item={item}
            selected={selected}
            onSelect={() => setSelected(item)}
            onMouseEnter={() => handleSetTitle(item.label)}
            onMouseLeave={handleClearTitle}
            styles={styles}
          />
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
