import React, { useState } from "react";
import Hero from "../Home/Hero";
import Timeline from "../Home/Timeline";
import AboutMe from "../Home/AboutMe";
import Header from "../components/Header";
import "./Home.css";

export default function Home() {
  const [newPet, setNewPet] = useState(null);

  return (
    <>
      <Header onHatch={(pet) => setNewPet(pet)} />
      <Hero newPet={newPet} />
      <AboutMe />
      <Timeline />
    </>
  );
}
