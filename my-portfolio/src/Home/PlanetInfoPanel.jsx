import { useState } from "react";
import styles from "./PlanetInfoPanel.module.css";

export default function PlanetInfoPanel({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <aside
      className={`${styles.panel} ${open ? styles.open : styles.closed}`}
      onClick={() => setOpen(!open)}
    >
      <h2 className={styles.title}>Sistema Planetario</h2>

      <div className={styles.list}>
        {items.map((p, i) => (
          <div key={i} className={styles.planetItem}>
            <img src={p.img} alt={p.label} className={styles.icon} />
            <div>
              <h3>{p.label}</h3>
              <p>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
