import styles from "./PlanetZoomPanel.module.css";
import { useLanguage } from "./context/LanguageContext";

export default function PlanetZoomPanel({ item, onClose }) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>

      {/* PLANETA ANCLADO A LA IZQUIERDA */}
      <div className={styles.planetDock}>
        <img src={item.img} alt={item.label} className={styles.planetImg} />
      </div>

      {/* PANEL A LA DERECHA */}
      <div className={styles.panel}>
        <h2 className={styles.title}>{item.label}</h2>
        <p className={styles.desc}>{item.description}</p>

        <a href={item.link} className={styles.button}>
          {t.zoom.enter}
        </a>

        <button className={styles.close} onClick={onClose}>
          {t.zoom.close}
        </button>
      </div>

    </div>
  );
}
