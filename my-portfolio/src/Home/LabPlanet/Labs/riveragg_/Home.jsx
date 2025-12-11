import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    return (
        <div className={styles.container}>
            <Header />

            {/* Hero Section */}
            <section id="home" className={styles.hero}>
                <div className={styles.heroBackground}>
                    <div className={styles.glowOrb}></div>
                    <div className={styles.gridOverlay}></div>
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot}></span>
                        Digital Creator
                    </div>

                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleLine}>Mikel</span>
                        <span className={styles.titleLine}>Rivera</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Creador de contenido digital · Desarrollador · Diseñador
                    </p>

                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>50K+</span>
                            <span className={styles.statLabel}>Seguidores</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>1M+</span>
                            <span className={styles.statLabel}>Views</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>100+</span>
                            <span className={styles.statLabel}>Proyectos</span>
                        </div>
                    </div>

                    <div className={styles.ctaButtons}>
                        <Link to="/riveragg_/videos" className={styles.btnPrimary}>
                            <span>Ver Contenido</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/riveragg_/contact" className={styles.btnSecondary}>
                            Contactar
                        </Link>
                    </div>
                </div>

                <div className={styles.scrollIndicator}>
                    <div className={styles.scrollLine}></div>
                    <span>Scroll</span>
                </div>
            </section>

            {/* Featured Work Section */}
            <section className={styles.featuredSection}>
                <div className={styles.featuredBackground}>
                    <div className={styles.floatingParticles}>
                        <span className={styles.particle}></span>
                        <span className={styles.particle}></span>
                        <span className={styles.particle}></span>
                    </div>
                </div>

                <div className={styles.featuredContent}>
                    <div className={styles.featuredHeader}>
                        <div className={styles.featuredBadge}>
                            <span className={styles.badgeDot}></span>
                            Proyectos Destacados
                        </div>
                        <h2 className={styles.featuredTitle}>Últimos Trabajos</h2>
                        <p className={styles.featuredSubtitle}>
                            Explora mis proyectos más recientes y creativos
                        </p>
                    </div>

                    <div className={styles.projectsGrid}>
                        {[
                            { title: 'Web Design Pro', category: 'Desarrollo Web', color: 'blue' },
                            { title: 'Brand Identity', category: 'Diseño', color: 'purple' },
                            { title: 'Viral Campaign', category: 'Contenido', color: 'green' }
                        ].map((project, index) => (
                            <div key={index} className={`${styles.projectCard} ${styles[project.color]}`}>
                                <div className={styles.projectImage}>
                                    <div className={styles.projectOverlay}>
                                        <Link to="/riveragg_/gallery" className={styles.projectViewBtn}>
                                            Ver Proyecto
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.projectInfo}>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.featuredCta}>
                        <Link to="/riveragg_/gallery" className={styles.viewAllBtn}>
                            <span>Ver Todos los Proyectos</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
