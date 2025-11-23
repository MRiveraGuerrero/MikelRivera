import React from 'react';
import Navbar from './Navbar';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    return (
        <div className={styles.layout}>
            <Navbar />

            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Inicia tu Misión</h1>
                <p className={styles.pageSubtitle}>
                    Cuéntanos sobre tu proyecto. Estamos listos para construir algo extraordinario contigo.
                </p>

                <form className={styles.form}>
                    <div>
                        <label className={styles.label}>Nombre</label>
                        <input type="text" className={styles.input} placeholder="Tu nombre" />
                    </div>

                    <div>
                        <label className={styles.label}>Email</label>
                        <input type="email" className={styles.input} placeholder="tu@email.com" />
                    </div>

                    <div>
                        <label className={styles.label}>Mensaje</label>
                        <textarea rows="5" className={styles.textarea} placeholder="Detalles del proyecto..."></textarea>
                    </div>

                    <button type="submit" className={styles.button}>
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </div>
    );
}
