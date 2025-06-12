// src/components/Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "../../styles/Contact.css"; // Puedes crear este archivo para estilos específicos

export default function Contact() {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_pqul1b9', 'template_3grs6fn', form.current, 'E3pdl8nKLEGqECyLb')
      .then((result) => {
          console.log(result.text);
          setIsSent(true);
          setError(false);
          form.current.reset(); // Reinicia el formulario después de enviar
      }, (error) => {
          console.log(error.text);
          setError(true);
          setIsSent(false);
      });
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "auto" }}>
      <h1>Contacto</h1>
      <section id="contact" className="contact-section">
        <p className="contact-intro">
          ¿Tienes una pregunta, una propuesta de proyecto o simplemente quieres saludar?
          ¡No dudes en ponerte en contacto conmigo!
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="user_name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="user_email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">Enviar Mensaje</button>

          {isSent && <p className="success-message">¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.</p>}
          {error && <p className="error-message">Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.</p>}
        </form>

        <div className="contact-info">
          <p>También puedes enviarme un correo directamente a:</p>
          <a href="mailto:mikelrg2003@gmail.com" className="email-link">mikelrg2003@gmail.com</a>
        </div>
      </section>
    </div>
  );
}