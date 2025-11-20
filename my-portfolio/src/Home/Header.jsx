import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.floatingNav}>
      <a href="/">Home</a>
      <a href="/about">Sobre mí</a>
      <a href="/lab">Lab</a>
      <a href="/portfolio">Portfolio</a>
    </div>
  );
}