import { useState } from "react";
import styles from "./OrbitSection.module.css";

export default function OrbitSection() {
  const [title, setTitle] = useState("Mi Universo");

  const items = [
    { label: "Portfolio", link: "/portfolio", orbit: 1 },
    { label: "SaaS", link: "/saas", orbit: 2 },
    { label: "Landings", link: "/landings", orbit: 3 },
    { label: "Proyectos", link: "/proyectos", orbit: 2 },
    { label: "Experimentos", link: "/lab", orbit: 1 },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.system}>
        <div className={styles.sun}>M</div>

        {/* ÓRBITAS VISUALES */}
        <div className={`${styles.orbit} ${styles.o1}`}></div>
        <div className={`${styles.orbit} ${styles.o2}`}></div>
        <div className={`${styles.orbit} ${styles.o3}`}></div>

        {/* PLANETAS ORBITANDO */}
        {items.map((item, i) => (
          <div
            key={i}
            className={`${styles.wrapper} ${styles["orbit" + item.orbit]} ${styles["p" + i]}`}
            onMouseEnter={() => setTitle(item.label)}
            onMouseLeave={() => setTitle("Mi Universo")}
          >
            <a href={item.link} className={styles.planet}>
              {item.label[0]}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
