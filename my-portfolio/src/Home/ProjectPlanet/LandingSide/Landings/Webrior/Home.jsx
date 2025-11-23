import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Home.module.css';
import layoutStyles from './Webrior.module.css';

const WebriorHome = () => {

    useEffect(() => {
        // Simple intersection observer for fade-in animations on scroll
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll(`.${styles.testimonialCard}`);
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={layoutStyles.layout}>
            <Navbar />

            {/* Hero Section */}
            <section className={styles.hero}>
                <video
                    className={styles.videoBackground}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ opacity: 1 }} // Increased opacity as requested
                    src="/assets/webrior_hero.mp4"
                />
                {/* Lighter overlay only at the bottom to ensure text readability but keep image clear */}
                <div className={styles.heroOverlay} style={{ background: 'linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.4) 50%, #0F0F0F 100%)' }}></div>

                <div className={styles.heroContent}>
                    <h1 className={styles.headline}>Landings que luchan por tu negocio.</h1>
                    <p className={styles.subheadline}>Diseñamos webs rápidas, modernas y hechas para convertir.</p>

                    {/* Simplified CTA as requested */}
                    <div className={styles.buttonGroup}>
                        <Link to="/landings/webrior/projects" className={styles.primaryButton} style={{ textDecoration: 'none' }}>
                            Ver Proyectos
                        </Link>
                    </div>
                </div>
            </section>

            {/* Brief Intro / Value Prop (kept minimal) */}
            <section className={styles.services} style={{ paddingBottom: '2rem' }}>
                <h2 className={styles.sectionTitle}>Build. Launch. Win.</h2>
                <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem' }}>
                    En Webrior, no solo hacemos webs. Forjamos herramientas digitales diseñadas para destacar en un mercado saturado.
                    Velocidad, estética y estrategia se unen para crear experiencias que tus usuarios no olvidarán.
                </p>
            </section>

            {/* Testimonials Section (Kept on Home for social proof) */}
            <section className={styles.testimonials}>
                <h2 className={styles.sectionTitle}>Aliados</h2>
                <div className={styles.testimonialGrid}>
                    <div className={styles.testimonialCard}>
                        <p className={styles.testimonialText}>"Increíble trabajo. La web no solo es bonita, sino que vende sola. El equipo de Webrior es de otro nivel."</p>
                        <div className={styles.testimonialAuthor}>
                            <div className={styles.authorAvatar} style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div className={styles.authorInfo}>
                                <h4>Carlos M.</h4>
                                <span>CEO, TechStart</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.testimonialCard}>
                        <p className={styles.testimonialText}>"Profesionalidad pura. Entendieron mi visión desde el minuto uno y la llevaron más allá."</p>
                        <div className={styles.testimonialAuthor}>
                            <div className={styles.authorAvatar} style={{
                                backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div className={styles.authorInfo}>
                                <h4>Ana R.</h4>
                                <span>Founder, CreativeLab</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className={styles.cta}>
                <h2 className={styles.ctaTitle}>¿Listo para ganar?</h2>
                <Link to="/landings/webrior/contact" className={styles.ctaButton} style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Construir mi landing ahora
                </Link>
            </section>
        </div>
    );
};

export default WebriorHome;
