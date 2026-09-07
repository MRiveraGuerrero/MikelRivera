import { Link } from "react-router-dom";
import styles from "./SpaceshipLauncher.module.css";
import shipImg from "./assets/orbit/spaceship.png";
import { useLanguage } from "./context/LanguageContext";
export default function SpaceshipLauncher() {
  const { language } = useLanguage();
  const label = language === 'es' ? 'Pilotar la nave · Juego 3D' : 'Pilot the ship · 3D game';
  return <Link to="/space-flight" className={styles.ship} aria-label={label} title={label}><img src={shipImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></Link>;
}
