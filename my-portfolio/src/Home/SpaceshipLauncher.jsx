import { useState } from "react";
import styles from "./SpaceshipLauncher.module.css";
import { useLanguage } from "./context/LanguageContext";

import shipImg from "./assets/orbit/spaceship.png"; // ← tu asset real

export default function SpaceshipLauncher({ items }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

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
              <p className={styles.boot}>{t.launcher.boot}</p>
              <p className={styles.boot}>{t.launcher.connect}</p>
              <p className={styles.boot}>{t.launcher.loading}</p>

              <div className={styles.options}>
                {items.map((p, i) => (
                  <a key={i} href={p.link} className={styles.option}>
                    <span>{p.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <button className={styles.close} onClick={() => setOpen(false)}>
              {t.launcher.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
