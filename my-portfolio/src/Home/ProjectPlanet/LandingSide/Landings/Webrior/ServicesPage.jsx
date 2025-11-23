import React from 'react';
import Navbar from './Navbar';
import styles from './Webrior.module.css';
import homeStyles from './Home.module.css';

const ServicesPage = () => {
    return (
        <div className={styles.layout}>
            <Navbar />
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Servicios & Proceso</h1>

                {/* Reusing Services Grid */}
                <section className={homeStyles.services} style={{ paddingTop: '2rem' }}>
                    <div className={homeStyles.servicesGrid}>
                        <div className={homeStyles.serviceCard}>
                            <div className={homeStyles.serviceIcon}>⚡</div>
                            <h3 className={homeStyles.serviceTitle}>Landings Rápidas</h3>
                            <p className={homeStyles.serviceDesc}>Velocidad extrema para retener a cada visitante. Optimizadas al milímetro.</p>
                        </div>
                        <div className={homeStyles.serviceCard}>
                            <div className={homeStyles.serviceIcon}>💎</div>
                            <h3 className={homeStyles.serviceTitle}>Branding Moderno</h3>
                            <p className={homeStyles.serviceDesc}>Identidad visual que impacta y eleva el valor percibido de tu marca.</p>
                        </div>
                        <div className={homeStyles.serviceCard}>
                            <div className={homeStyles.serviceIcon}>🎯</div>
                            <h3 className={homeStyles.serviceTitle}>Optimización</h3>
                            <p className={homeStyles.serviceDesc}>Estructuras diseñadas para guiar al usuario hacia la conversión.</p>
                        </div>
                    </div>
                </section>

                {/* Reusing Process Timeline */}
                <section className={homeStyles.process}>
                    <h2 className={homeStyles.sectionTitle}>Nuestro Camino</h2>
                    <div className={homeStyles.timeline}>
                        <div className={homeStyles.processStep}>
                            <div className={homeStyles.stepNumber}>1</div>
                            <div className={homeStyles.stepContent}>
                                <h3>Estrategia</h3>
                                <p>Analizamos tu mercado y definimos el camino hacia el éxito.</p>
                            </div>
                        </div>
                        <div className={homeStyles.processStep}>
                            <div className={homeStyles.stepNumber}>2</div>
                            <div className={homeStyles.stepContent}>
                                <h3>Diseño</h3>
                                <p>Creamos una experiencia visual única y memorable.</p>
                            </div>
                        </div>
                        <div className={homeStyles.processStep}>
                            <div className={homeStyles.stepNumber}>3</div>
                            <div className={homeStyles.stepContent}>
                                <h3>Desarrollo</h3>
                                <p>Código limpio, rápido y escalable. Sin fallos.</p>
                            </div>
                        </div>
                        <div className={homeStyles.processStep}>
                            <div className={homeStyles.stepNumber}>4</div>
                            <div className={homeStyles.stepContent}>
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
