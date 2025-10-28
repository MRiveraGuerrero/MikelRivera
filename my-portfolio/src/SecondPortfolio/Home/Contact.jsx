import React, { useEffect, useRef } from "react";
import "./Contact.css";

export default function Contact() {
  const canvasRef = useRef(null);

  // === FONDO MATRIX NARANJA ===
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const letters = "01".split("");
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f57c00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="contact-section">
      <canvas ref={canvasRef} className="contact-canvas" />

      <form
        className="contact-card"
        action="mailto:mikelrg2003@gmail.com"
        method="post"
        encType="text/plain"
      >
        <h2>Contacto</h2>

        <label>Nombre</label>
        <input type="text" name="nombre" required />

        <label>Email</label>
        <input type="email" name="email" required />

        <label>Mensaje</label>
        <textarea name="mensaje" rows="5" required />

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
