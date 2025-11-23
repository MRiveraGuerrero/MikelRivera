import React from 'react';
import Navbar from './Navbar';
import layoutStyles from './Webrior.module.css';
import styles from './ServicesPage.module.css';

const ServicesPage = () => {
    return (
        <div className={layoutStyles.layout}>
            <Navbar />
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Servicios & Proceso</h1>

                {/* Services Grid */}
                <section className={styles.services}>
                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>⚡</div>
                            <h3 className={styles.serviceTitle}>Landings Rápidas</h3>
                            <p className={styles.serviceDesc}>Velocidad extrema para retener a cada visitante. Optimizadas al milímetro.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>💎</div>
                            <h3 className={styles.serviceTitle}>Branding Moderno</h3>
                            <p className={styles.serviceDesc}>Identidad visual que impacta y eleva el valor percibido de tu marca.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>🎯</div>
                            <h3 className={styles.serviceTitle}>Optimización</h3>
                            <p className={styles.serviceDesc}>Estructuras diseñadas para guiar al usuario hacia la conversión.</p>
                        </div>
                    </div>
                </section>

                {/* Process Timeline */}
                <section className={styles.process}>
                    <h2 className={styles.sectionTitle}>Nuestro Camino</h2>
                    <div className={styles.timeline}>
                        <div className={styles.processStep}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepContent}>
                                <h3>Estrategia</h3>
                                <p>Analizamos tu mercado y definimos el camino hacia el éxito.</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepContent}>
                                <h3>Diseño</h3>
                                <p>Creamos una experiencia visual única y memorable.</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepContent}>
                                <h3>Desarrollo</h3>
                                <p>Código limpio, rápido y escalable. Sin fallos.</p>
                            </div>
                        </div>
                        <div className={styles.processStep}>
                            <div className={styles.stepNumber}>4</div>
                            <div className={styles.stepContent}>
                                <h3>Lanzamiento</h3>
                                <p>Despegue exitoso y soporte continuo para tu crecimiento.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ServicesPage;
