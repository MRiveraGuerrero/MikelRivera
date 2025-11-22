import { useState } from "react";
import styles from "./SpaceshipLauncher.module.css";

import shipImg from "./assets/orbit/spaceship.png"; // ← tu asset real

export default function SpaceshipLauncher({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={shipImg}
        alt="Spaceship"
        className={styles.ship}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.console} onClick={(e) => e.stopPropagation()}>
            <div className={styles.screen}>
              <p className={styles.boot}>INICIANDO SISTEMA NAVE... OK</p>
              <p className={styles.boot}>CONECTANDO CON SATÉLITES... OK</p>
              <p className={styles.boot}>CARGANDO PLANETAS...</p>

              <div className={styles.options}>
                {items.map((p, i) => (
                  <a key={i} href={p.link} className={styles.option}>
                    <span>{p.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <button className={styles.close} onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
