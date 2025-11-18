import { useState } from "react";
import styles from "./OrbitSection.module.css";

// ICONOS LUCIDE

// ASSETS LOCALES (mete aquí tus imágenes reales)
import sun from "./assets/sun.webp";
import planetPortfolio from "./assets/planet-portfolio.webp";
import planetSaas from "./assets/planet-saas.webp";
import planetWork from "./assets/planet-work.webp";
import planetExperimentos from "./assets/planet-experimentos.webp";

export default function OrbitSection() {
  const [title, setTitle] = useState("");

  const items = [
    { label: "Portfolio", link: "/portfolio", orbit: 1, img: planetPortfolio },
    { label: "Projects", link: "/saas", orbit: 2, img: planetSaas },
    { label: "Work", link: "/landings", orbit: 4, img: planetWork },
    { label: "Lab", link: "/lab", orbit: 3, img: planetExperimentos },
  ];

  return (
    <section className={styles.section}>

      {/* ESTRELLAS TEXTO */}
      <div className={styles.starfield}>
        {title && (
          <svg className={styles.starMask} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="4" fill="var(--accent)" />
              </pattern>
            </defs>

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className={styles.starTextSVG}
            >
              {title}
            </text>
          </svg>
        )}
      </div>

      <div className={styles.system}>

        {/* SOL CENTRAL */}
        <div className={styles.sun}>
          <img src={sun} alt="Mikel" className={styles.sunImg} />
        </div>

        {/* ÓRBITAS */}
        <div className={`${styles.orbit} ${styles.o1}`} />
        <div className={`${styles.orbit} ${styles.o2}`} />
        <div className={`${styles.orbit} ${styles.o3}`} />
        <div className={`${styles.orbit} ${styles.o4}`} />

        {/* PLANETAS */}
        {items.map((item, i) => (
          <div
            key={i}
            className={`${styles.wrapper} ${styles["orbit" + item.orbit]} ${styles["p" + i]}`}
            onMouseEnter={() => setTitle(item.label)}
            onMouseLeave={() => setTitle("")}
          >
            <a href={item.link} className={styles.planet}>
            <img src={item.img} alt={item.label} className={styles.planetImg} />
            </a>
          </div>
        ))}

      </div>
    </section>
  );
}
