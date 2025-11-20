import styles from "./HomePage.module.css";
import Header from "./Header";
import OrbitSection from "./OrbitSection";
import PlanetInfoPanel from "./PlanetInfoPanel";
import SpaceshipLauncher from "./SpaceshipLauncher";
import Letrero from "./Letrero";
import planetPortfolio from "./assets/planet-portfolio.webp";
import planetSaas from "./assets/planet-saas.webp";
import planetWork from "./assets/planet-work.webp";
import planetExperimentos from "./assets/planet-experimentos.webp";

const items = [
  { label: "Portfolio", link: "/portfolio-planet", img: planetPortfolio, description: "Mis trabajos, diseños y efectos." },
  { label: "Projects", link: "/project-planet", img: planetSaas, description: "Mis proyectos y SaaS que estoy creando." },
  { label: "Work", link: "/landings", img: planetWork, description: "Freelance, landings y curro técnico." },
  { label: "Lab", link: "/lab", img: planetExperimentos, description: "Pruebas, caos y experimentos." },
];

export default function HomePage() {
  return (
    <div className={styles.page}>

      <Header />
      <Letrero />
      <OrbitSection />
      <PlanetInfoPanel items={items} />
      <SpaceshipLauncher items={items} />
    </div>
  );
}
