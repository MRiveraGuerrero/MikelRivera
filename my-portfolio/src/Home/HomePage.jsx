import styles from "./HomePage.module.css";
import Header from "./Header";
import OrbitSection from "./OrbitSection";

export default function HomePage() {
  return (
    <div className={styles.page}>
      
      <Header />

      <OrbitSection />
      
    </div>
  );
}
