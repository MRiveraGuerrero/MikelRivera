import React from 'react';
import styles from './Contact.module.css';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
    return (
        <div className={styles.container}>
            <Header />

            {/* Contact Section */}
            <section id="contact" className={styles.contactSection}>
                <div className={styles.contactBackground}>
                    <div className={styles.glowOrb}></div>
                    <div className={styles.gridPattern}></div>
                </div>

                <div className={styles.contactContent}>
                    <div className={styles.contactHeader}>
                        <div className={styles.sectionBadge}>
                            <span className={styles.badgeIcon}>✉</span>
                            Contacto
                        </div>
                        <h1 className={styles.contactTitle}>¿Listo para colaborar?</h1>
                        <p className={styles.contactSubtitle}>
                            Trabajemos juntos en tu próximo proyecto digital
                        </p>
                    </div>

                    <div className={styles.contactGrid}>
                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <form className={styles.contactForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.formLabel}>Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={styles.formInput}
                                        placeholder="Mikel Rivera Guerrero"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={styles.formInput}
                                        placeholder="mikelrg2003@email.com"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="subject" className={styles.formLabel}>Asunto</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className={styles.formInput}
                                        placeholder="¿En qué puedo ayudarte?"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.formLabel}>Mensaje</label>
                                    <textarea
                                        id="message"
                                        className={styles.formTextarea}
                                        placeholder="Cuéntame sobre tu proyecto..."
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    <span>Enviar Mensaje</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M18 2L9 11M18 2l-7 16-2-7-7-2 16-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className={styles.infoSection}>
                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" />
                                        <polyline points="22,6 12,13 2,6" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3 className={styles.infoTitle}>Email</h3>
                                <p className={styles.infoText}>mikelrg2003@gmail.com</p>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeWidth="2" />
                                        <circle cx="12" cy="10" r="3" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3 className={styles.infoTitle}>Ubicación</h3>
                                <p className={styles.infoText}>Bilbao, España</p>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                        <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3 className={styles.infoTitle}>Disponibilidad</h3>
                                <p className={styles.infoText}>Lun - Vie, 9:00 - 18:00</p>
                            </div>

                            <div className={styles.socialSection}>
                                <h3 className={styles.socialTitle}>Sígueme</h3>
                                <div className={styles.socialLinks}>
                                    <a href="#" className={styles.socialLink} aria-label="Instagram">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </a>
                                    <a href="#" className={styles.socialLink} aria-label="Twitter">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                    <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeWidth="2" />
                                            <rect x="2" y="9" width="4" height="12" strokeWidth="2" />
                                            <circle cx="4" cy="4" r="2" strokeWidth="2" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
