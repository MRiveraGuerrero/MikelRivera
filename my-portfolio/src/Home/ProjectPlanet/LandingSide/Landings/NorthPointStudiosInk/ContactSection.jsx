import React from 'react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
    return (
        <section className={styles.contactContainer}>
            <div className={styles.grid}>
                <div className={styles.info}>
                    <h2 className={styles.title}>CONTACTO</h2>

                    <div className={styles.detail}>
                        <span className={styles.label}>Dirección</span>
                        <p className={styles.value}>Calle del Arte 123, Madrid</p>
                    </div>

                    <div className={styles.detail}>
                        <span className={styles.label}>Email</span>
                        <p className={styles.value}>info@northpointink.com</p>
                    </div>

                    <div className={styles.detail}>
                        <span className={styles.label}>Teléfono / WhatsApp</span>
                        <p className={styles.value}>+34 600 000 000</p>
                    </div>

                    <div className={styles.detail}>
                        <span className={styles.label}>Horario</span>
                        <p className={styles.value}>Lun - Sáb: 11:00 - 20:00</p>
                    </div>
                </div>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="NOMBRE" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="EMAIL" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="tel" placeholder="TELÉFONO" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <textarea placeholder="CUÉNTANOS TU IDEA..." rows="5" className={styles.textarea}></textarea>
                    </div>
                    <button type="submit" className={styles.submitBtn}>ENVIAR SOLICITUD</button>
                </form>
            </div>

            {/* Placeholder Map */}
            <div className={styles.mapContainer}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.123456789!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sPuerta%20del%20Sol%2C%20Madrid!5e0!3m2!1sen!2ses!4v1620000000000!5m2!1sen!2ses"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Studio Location"
                ></iframe>
            </div>
        </section>
    );
};

export default ContactSection;
