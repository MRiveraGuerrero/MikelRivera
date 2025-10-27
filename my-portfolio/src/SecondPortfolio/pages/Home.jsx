import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Bienvenido al Portfolio 2</h1>
      <p>Este es el nuevo inicio del proyecto.</p>
      <Link to="/about" style={{ color: "#007acc" }}>
        Ir a la página About
      </Link>
    </main>
  );
}
