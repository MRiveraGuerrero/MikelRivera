import React from "react";
import Hero from "../Home/Hero";
import Timeline from "../Home/Timeline";
import AboutMe from "../Home/AboutMe";
import "./Home.css";

export default function Home() {
  return (
    <>
        <Hero />
        <AboutMe />
        <Timeline />
    </>
  );
}
