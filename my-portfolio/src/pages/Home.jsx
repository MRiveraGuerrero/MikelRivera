// pages/Home.jsx
import MainLayout from "../layouts/MainLayout";
import PortfolioGrid from "../components/Home/PortfolioGrid";
import PortfolioIntro from "../components/Home/PortfolioIntro";
import Proyectos from "../components/Home/Proyectos";

export default function Home() {
  return (
    <MainLayout>
      <section>
        <PortfolioIntro />
        <PortfolioGrid />
        <Proyectos />
        <p>Desarrollador Frontend con pasión por crear interfaces...</p>
      </section>
    </MainLayout>
  );
}
