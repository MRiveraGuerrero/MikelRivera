// pages/Home.jsx
import MainLayout from "../layouts/MainLayout";
import PortfolioGrid from "../components/Home/PortfolioGrid";
import PortfolioIntro from "../components/Home/PortfolioIntro";
import Proyectos from "../components/Home/Proyectos";
import AboutMe from "../components/Home/AboutMe";
import Contact from "../components/Home/Contact";
import "../styles/Home.css";

export default function Home() {
  return (
    <MainLayout>
      <section id="intro">
        <PortfolioIntro />
      </section>
      <section id="portfolio">
        <PortfolioGrid />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="mypro">
        <Proyectos />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </MainLayout>
  );
}
