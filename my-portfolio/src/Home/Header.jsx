import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>M</div>

      <nav className={styles.nav}>
        <a href="/">Home</a>
        <a href="/about">Sobre mí</a>
        <a href="/lab">Lab</a>
        <a href="/portfolio">Portfolio</a>
      </nav>
    </header>
  );
}
