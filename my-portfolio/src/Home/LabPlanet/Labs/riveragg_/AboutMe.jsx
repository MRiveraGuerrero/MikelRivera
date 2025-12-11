import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutMe.module.css';
import Header from './Header';
import Footer from './Footer';

const AboutMe = () => {
    return (
        <div className={styles.container}>
            <Header />

            {/* About Me Section */}
            <section id="about" className={styles.aboutSection}>
                <div className={styles.aboutBackground}>
                    <div className={styles.glowOrb}></div>
                    <div className={styles.gridPattern}></div>
                </div>

                <div className={styles.aboutContent}>
                    {/* Header */}
                    <div className={styles.aboutHeader}>
                        <div className={styles.sectionBadge}>
                            <span className={styles.badgeDot}></span>
                            Sobre Mí
                        </div>
                        <h1 className={styles.aboutTitle}>
                            <span className={styles.titleLine}>Mikel</span>
                            <span className={styles.titleLine}>Rivera</span>
                        </h1>
                        <p className={styles.aboutSubtitle}>
                            Creador Digital · Desarrollador · Diseñador
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className={styles.aboutGrid}>
                        {/* Bio Section */}
                        <div className={styles.bioSection}>
                            <div className={styles.bioCard}>
                                <h2 className={styles.bioTitle}>Mi Historia</h2>
                                <p className={styles.bioText}>
                                    Soy un creador de contenido digital apasionado por fusionar tecnología, diseño y creatividad.
                                    Con más de 50K seguidores y 1M de visualizaciones, he construido una comunidad que aprecia
                                    el contenido de calidad y la innovación.
                                </p>
                                <p className={styles.bioText}>
                                    Mi viaje comenzó explorando el mundo del desarrollo web y el diseño, pero rápidamente
                                    descubrí mi pasión por crear contenido que inspire y eduque. Hoy combino mis habilidades
                                    técnicas con mi creatividad para producir experiencias digitales únicas.
                                </p>
                            </div>

                            <div className={styles.bioCard}>
                                <h2 className={styles.bioTitle}>¿Qué Hago?</h2>
                                <div className={styles.skillsList}>
                                    <div className={styles.skillItem}>
                                        <div className={styles.skillIcon}>🎥</div>
                                        <div className={styles.skillInfo}>
                                            <h3 className={styles.skillName}>Creación de Contenido</h3>
                                            <p className={styles.skillDesc}>Reels, TikToks y contenido viral para redes sociales</p>
                                        </div>
                                    </div>

                                    <div className={styles.skillItem}>
                                        <div className={styles.skillIcon}>💻</div>
                                        <div className={styles.skillInfo}>
                                            <h3 className={styles.skillName}>Desarrollo Web</h3>
                                            <p className={styles.skillDesc}>Sitios web modernos y aplicaciones interactivas</p>
                                        </div>
                                    </div>

                                    <div className={styles.skillItem}>
                                        <div className={styles.skillIcon}>🎨</div>
                                        <div className={styles.skillInfo}>
                                            <h3 className={styles.skillName}>Diseño Digital</h3>
                                            <p className={styles.skillDesc}>Interfaces premium y experiencias visuales únicas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats & Achievements */}
                        <div className={styles.statsSection}>
                            <div className={styles.statsCard}>
                                <h2 className={styles.statsTitle}>Logros</h2>
                                <div className={styles.achievementsList}>
                                    <div className={styles.achievement}>
                                        <div className={styles.achievementNumber}>50K+</div>
                                        <div className={styles.achievementLabel}>Seguidores</div>
                                    </div>
                                    <div className={styles.achievement}>
                                        <div className={styles.achievementNumber}>1M+</div>
                                        <div className={styles.achievementLabel}>Visualizaciones</div>
                                    </div>
                                    <div className={styles.achievement}>
                                        <div className={styles.achievementNumber}>100+</div>
                                        <div className={styles.achievementLabel}>Proyectos</div>
                                    </div>
                                    <div className={styles.achievement}>
                                        <div className={styles.achievementNumber}>5+</div>
                                        <div className={styles.achievementLabel}>Años Experiencia</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.techCard}>
                                <h2 className={styles.techTitle}>Stack Tecnológico</h2>
                                <div className={styles.techGrid}>
                                    <div className={styles.techBadge}>React</div>
                                    <div className={styles.techBadge}>JavaScript</div>
                                    <div className={styles.techBadge}>Node.js</div>
                                    <div className={styles.techBadge}>CSS3</div>
                                    <div className={styles.techBadge}>Figma</div>
                                    <div className={styles.techBadge}>Adobe Suite</div>
                                    <div className={styles.techBadge}>Git</div>
                                    <div className={styles.techBadge}>Premiere Pro</div>
                                </div>
                            </div>

                            <div className={styles.contactCard}>
                                <h2 className={styles.contactTitle}>¿Trabajamos Juntos?</h2>
                                <p className={styles.contactText}>
                                    Siempre estoy abierto a nuevos proyectos y colaboraciones interesantes.
                                </p>
                                <Link to="/riveragg_/contact" className={styles.contactButton}>
                                    <span>Contáctame</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutMe;
