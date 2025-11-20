// src/components/Contact.jsx
import React, { useRef, useState } from 'react';
import styles from "../../styles/Contact.module.css";
import emailjs from 'emailjs-com';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    // Ajustado para Create React App (process.env)
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;

    emailjs.sendForm(serviceId, templateId, form.current, userId)
      .then((result) => {
        console.log(result.text);
        setIsSent(true);
        setError(false);
        form.current.reset();
        // Opcional: ocultar el mensaje después de unos segundos
        setTimeout(() => setIsSent(false), 5000);
      }, (error) => {
        console.log(error.text);
        setError(true);
        setIsSent(false);
        // Opcional: ocultar el mensaje después de unos segundos
        setTimeout(() => setError(false), 5000);
      });
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "auto" }}>
      <h1>{t('contact.title')}</h1>
      <section className={styles["contact-section"]}>
        <p className={styles["contact-intro"]}>
          {t('contact.intro')}
        </p>

        <form ref={form} onSubmit={sendEmail} className={styles["contact-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name">{t('contact.nameLabel')}</label>
            <input type="text" id="name" name="user_name" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">{t('contact.emailLabel')}</label>
            <input type="email" id="email" name="user_email" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="subject">{t('contact.subjectLabel')}</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="message">{t('contact.messageLabel')}</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className={styles["submit-button"]}>{t('contact.sendButton')}</button>

          {isSent && <p className={styles["success-message"]}>{t('contact.successMessage')}</p>}
          {error && <p className={styles["error-message"]}>{t('contact.errorMessage')}</p>}
        </form>

        <div className={styles["contact-info"]}>
          <p>
            {t('contact.orEmailMe')} <a href="mailto:mikelrg2003@gmail.com" className={styles["email-link"]}>mikelrg2003@gmail.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}