import styles from "./PlanetZoomPanel.module.css";

export default function PlanetZoomPanel({ item, onClose }) {
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
          Entrar al planeta
        </a>

        <button className={styles.close} onClick={onClose}>
          Cerrar
        </button>
      </div>

    </div>
  );
}
