import { useEffect, useRef, useState } from "react";
import styles from "./SpaceshipLauncher.module.css";
import { useLanguage } from "./context/LanguageContext";

import { Link } from "react-router-dom";

export default function QuickNavigation({ items, src, className, alt }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const dialog = useRef(null);
  useEffect(() => { if (open) dialog.current?.showModal(); else dialog.current?.close(); }, [open]);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-label={alt} title={alt} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", pointerEvents: "auto", zIndex: 21 }}><img src={src} alt="" style={{ width: "100%", display: "block" }} /></button>
      
        <dialog ref={dialog} className={styles.overlay} onCancel={() => setOpen(false)} onClick={() => setOpen(false)} aria-label={alt}>
          <div className={styles.console} onClick={(e) => e.stopPropagation()}>
            <div className={styles.screen}>
              <p className={styles.boot}>{t.launcher.boot}</p>
              <p className={styles.boot}>{t.launcher.connect}</p>
              <p className={styles.boot}>{t.launcher.loading}</p>

              <div className={styles.options}>
                {items.map((p, i) => (
                  <Link key={i} to={p.link} className={styles.option}>
                    <span>{p.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <button className={styles.close} onClick={() => setOpen(false)}>
              {t.launcher.close}
            </button>
          </div>
        </dialog>
    </>
  );
}
