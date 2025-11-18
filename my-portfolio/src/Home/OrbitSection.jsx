import { useState } from "react";
import styles from "./OrbitSection.module.css";

// ICONOS LUCIDE (puedes cambiar los que quieras)
import { Briefcase, Cog, Globe, FolderCode, FlaskRound } from "lucide-react";

export default function OrbitSection() {
  const [title, setTitle] = useState("");

  const items = [
    { label: "Portfolio", link: "/portfolio", orbit: 1, icon: <Briefcase size={26}/> },
    { label: "SaaS", link: "/saas", orbit: 2, icon: <Cog size={26}/> },
    { label: "Landings", link: "/landings", orbit: 3, icon: <Globe size={26}/> },
    { label: "Proyectos", link: "/proyectos", orbit: 2, icon: <FolderCode size={26}/> },
    { label: "Experimentos", link: "/lab", orbit: 1, icon: <FlaskRound size={26}/> },
  ];

  return (
    <section className={styles.section}>

      {/* === ESTRELLAS DE TEXTO (DINÁMICAS) === */}
      <div className={styles.starfield}>
        {/*{title && <span className={styles.starText}>{title}</span>}}*/}
      </div>

      <div className={styles.system}>

        {/* === LOGO CENTRAL (IMAGEN) === */}
        <div className={styles.sun}>
          <img src="/fox.png" alt="Mikel" className={styles.sunImg} />
        </div>

        {/* ÓRBITAS VISUALES */}
        <div className={`${styles.orbit} ${styles.o1}`} />
        <div className={`${styles.orbit} ${styles.o2}`} />
        <div className={`${styles.orbit} ${styles.o3}`} />

        {/* PLANETAS REALES */}
        {items.map((item, i) => (
          <div
            key={i}
            className={`${styles.wrapper} ${styles["orbit" + item.orbit]} ${styles["p" + i]}`}
            onMouseEnter={() => setTitle(item.label)}
            onMouseLeave={() => setTitle("")}
          >
            <a href={item.link} className={styles.planet}>
              {item.icon}
            </a>
          </div>
        ))}

      </div>
    </section>
  );
}
