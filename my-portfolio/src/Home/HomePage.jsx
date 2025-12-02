import styles from "./HomePage.module.css";
import Hero from "./Hero";
import OrbitSection from "./OrbitSection";
import planetPortfolio from "./assets/planet-portfolio.webp";
import planetSaas from "./assets/planet-saas.webp";
import planetWork from "./assets/planet-work.webp";
import planetExperimentos from "./assets/planet-experimentos.webp";
import sun from "./assets/orbit/sun.png";
import { LanguageProvider } from "./context/LanguageContext";

const items = [
  { label: "Sol", link: "/sun", img: sun, description: "El centro del sistema. Aquí comienza todo." },
  { label: "Portfolio", link: "/portfolio-planet", img: planetPortfolio, description: "Mis trabajos, diseños y efectos." },
  { label: "Projects", link: "/project-planet", img: planetSaas, description: "Mis proyectos y SaaS que estoy creando." },
  { label: "Work", link: "/work-planet", img: planetWork, description: "Freelance, landings y curro técnico." },
  { label: "Lab", link: "/lab-planet", img: planetExperimentos, description: "Pruebas, caos y experimentos." },
];

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className={styles.page}>
        <Hero />
        <OrbitSection />
      </div>
    </LanguageProvider>
  );
}
