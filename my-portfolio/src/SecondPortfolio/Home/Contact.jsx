import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import styles from "./Contact.module.css";

export default function Contact() {
  const form = useRef();
  const canvasRef = useRef(null);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

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

  // === ENVÍO EMAIL ===
  const sendEmail = (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs.sendForm(serviceId, templateId, form.current, userId)
      .then(() => {
        setIsSent(true);
        setError(false);
        form.current.reset();
      })
      .catch(() => {
        setError(true);
        setIsSent(false);
      });
  };

  return (
    <section className={styles["contact-section"]}>
      <canvas ref={canvasRef} className={styles["contact-canvas"]} />

      <form ref={form} onSubmit={sendEmail} className={styles["contact-card"]}>
        <h2>Contacto</h2>

        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="user_name" required />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" name="user_email" required />

        <label htmlFor="subject">Asunto</label>
        <input type="text" id="subject" name="subject" required />

        <label htmlFor="message">Mensaje</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit" className={styles["submit-button"]}>Enviar</button>

        {isSent && <p className={styles["success-message"]}>Mensaje enviado correctamente ✅</p>}
        {error && <p className={styles["error-message"]}>Error al enviar el mensaje ❌</p>}
      </form>

      <div className={styles["contact-info"]}>
        <p>También puedes escribirme directamente:</p>
        <a href="mailto:mikelrg2003@gmail.com" className={styles["email-link"]}>
          mikelrg2003@gmail.com
        </a>
      </div>
    </section>
  );
}
