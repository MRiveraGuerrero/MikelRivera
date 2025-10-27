import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Sobre mí</h1>
      <p>Esta es la sección About del nuevo Portfolio 2.</p>
      <Link to="/" style={{ color: "#007acc" }}>
        Volver al Home
      </Link>
    </main>
  );
}
