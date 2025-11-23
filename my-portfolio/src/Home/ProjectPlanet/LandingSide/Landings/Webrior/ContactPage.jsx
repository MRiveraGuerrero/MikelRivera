import React from 'react';
import Navbar from './Navbar';
import styles from './Webrior.module.css';

const ContactPage = () => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.pageContainer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1 className={styles.pageTitle}>Inicia tu Misión</h1>
                <p style={{ textAlign: 'center', color: '#ccc', maxWidth: '600px', marginBottom: '3rem' }}>
                    Cuéntanos sobre tu proyecto. Estamos listos para construir algo extraordinario contigo.
                </p>

                <form style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem', background: '#141414', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre</label>
                        <input type="text" style={{ width: '100%', padding: '1rem', background: '#0F0F0F', border: '1px solid #333', borderRadius: '4px', color: '#fff', outline: 'none' }} placeholder="Tu nombre" />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                        <input type="email" style={{ width: '100%', padding: '1rem', background: '#0F0F0F', border: '1px solid #333', borderRadius: '4px', color: '#fff', outline: 'none' }} placeholder="tu@email.com" />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Mensaje</label>
                        <textarea rows="5" style={{ width: '100%', padding: '1rem', background: '#0F0F0F', border: '1px solid #333', borderRadius: '4px', color: '#fff', outline: 'none', resize: 'none' }} placeholder="Detalles del proyecto..."></textarea>
                    </div>
                    <button type="submit" style={{ background: '#FF7A1A', color: '#fff', padding: '1rem', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
