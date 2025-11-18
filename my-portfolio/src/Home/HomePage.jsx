import styles from "./HomePage.module.css";
import Header from "./Header";

export default function HomePage() {
  return (
    <div className={styles.page}>
      
      <Header />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.avatarBox}>
          <img src="/fox.png" alt="Mikel" />
        </div>

        <div className={styles.heroText}>
          <p className={styles.smallIntro}>Hola! Soy Mikel Rivera.</p>

          <h1 className={styles.title}>
            Un desarrollador que  
            <span> juzga un proyecto por su acabado.</span>
          </h1>

          <p className={styles.desc}>
            Full-stack engineer especializado en crear SaaS modernos, landings premium
            y experiencias digitales con enfoque en velocidad, diseño y escalabilidad.
          </p>

          <div className={styles.buttons}>
            <a className={styles.primaryBtn} href="/portfolio">Ver proyectos</a>
            <a className={styles.secondaryBtn} href="/contacto">Contacto</a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE PREVIEW */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Experiencia</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>CIB on the Mobile</h3>
            <p>Lead Full-Stack Developer — 1 año</p>
            <a href="/timeline">Aprender más →</a>
          </div>

          <div className={styles.card}>
            <h3>Siéntame</h3>
            <p>SaaS Fundador — Proyecto actual</p>
            <a href="/proyectos">Aprender más →</a>
          </div>

          <div className={styles.card}>
            <h3>BiSKY Team</h3>
            <p>Web Developer — 2024-2025</p>
            <a href="/timeline">Aprender más →</a>
          </div>
        </div>
      </section>

      {/* SKILLS / PLANET ANIMATION */}
      <section className={styles.planetSection}>
        <h2 className={styles.sectionTitle}>Mi Stack</h2>
        <div className={styles.orbit}>
          <div className={styles.centerIcon}>M</div>
        </div>
      </section>
    </div>
  );
}
