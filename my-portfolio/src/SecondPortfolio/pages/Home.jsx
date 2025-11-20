import React, { useState } from "react";
import Hero from "../Home/Hero";
import Timeline from "../Home/Timeline";
import AboutMe from "../Home/AboutMe";
import ProjectsDesktop from "../Home/ProjectsDesktop";
import ChatSimulation from "../Home/ChatSimulation";
import Contact from "../Home/Contact";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./Home.module.css";

export default function Home() {
  const [newPet, setNewPet] = useState(null);
  const [showEgg, setShowEgg] = useState(false);

  const handleOpenEgg = () => setShowEgg(true);

  return (
    <>
      <Header onHatch={(pet) => setNewPet(pet)} externalShow={showEgg} setExternalShow={setShowEgg} />
      <Hero newPet={newPet} onOpenEgg={handleOpenEgg} />
      <AboutMe />
      <Timeline />
      <ChatSimulation />
      <ProjectsDesktop />
      <Contact />
      <Footer />
    </>
  );
}
