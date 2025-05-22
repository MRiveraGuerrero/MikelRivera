// pages/Home.jsx
import MainLayout from "../layouts/MainLayout";
import PortfolioGrid from "../components/Home/PortfolioGrid";
import Proyectos from "../components/Home/Proyectos";

export default function Home() {
  return (
    <MainLayout>
      <section>
        <h1>¡Hola! Soy Mikel Rivera</h1>
        <PortfolioGrid />
        <Proyectos />
        <p>Desarrollador Frontend con pasión por crear interfaces...</p>
      </section>
    </MainLayout>
  );
}
