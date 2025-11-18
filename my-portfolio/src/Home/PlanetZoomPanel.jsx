import styles from "./PlanetZoomPanel.module.css";

export default function PlanetZoomPanel({ item, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        
        <h2 className={styles.title}>{item.label}</h2>
        <p className={styles.text}>{item.description}</p>

        <a href={item.link} className={styles.button}>
          Entrar al planeta
        </a>

        <button className={styles.close} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
