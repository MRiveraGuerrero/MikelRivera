import styles from "./Letrero.module.css";

export default function Letrero() {
  return (
    <div className={styles.letrero}>
      <p className={styles.line}>VIAJA POR LOS PLANETAS.............OK</p>
      <p className={styles.line}>NAVEGA CON LA NAVE.................OK</p>
      <p className={styles.line}>INVESTIGA EL SISTEMA PLANETARIO....OK</p>
    </div>
  );
}
