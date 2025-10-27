// src/components/Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "../../styles/Contact.css";
import { useLanguage } from '../../contexts/LanguageContext'; // Importa el hook de idioma

export default function Contact() {
  const { t } = useLanguage(); // Usa el hook para acceder a la función 't'
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs.sendForm(serviceId, templateId, form.current, userId)
      .then((result) => {
          console.log(result.text);
          setIsSent(true);
          setError(false);
          form.current.reset();
      }, (error) => {
          console.log(error.text);
          setError(true);
          setIsSent(false);
      });
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "auto" }}>
      <h1>{t('contact.title')}</h1> {/* Traduce el título principal */}
      <section id="contact" className="contact-section">
        <p className="contact-intro">
          {t('contact.intro')} {/* Traduce la introducción */}
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">{t('contact.nameLabel')}</label> {/* Traduce la etiqueta */}
            <input type="text" id="name" name="user_name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('contact.emailLabel')}</label> {/* Traduce la etiqueta */}
            <input type="email" id="email" name="user_email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">{t('contact.subjectLabel')}</label> {/* Traduce la etiqueta */}
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t('contact.messageLabel')}</label> {/* Traduce la etiqueta */}
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">{t('contact.sendButton')}</button> {/* Traduce el botón */}

          {isSent && <p className="success-message">{t('contact.successMessage')}</p>} {/* Traduce el mensaje de éxito */}
          {error && <p className="error-message">{t('contact.errorMessage')}</p>} {/* Traduce el mensaje de error */}
        </form>

        <div className="contact-info">
          <p>{t('contact.directEmailIntro')}</p> {/* Traduce la introducción al email directo */}
          <a href="mailto:mikelrg2003@gmail.com" className="email-link">mikelrg2003@gmail.com</a>
        </div>
      </section>
    </div>
  );
}