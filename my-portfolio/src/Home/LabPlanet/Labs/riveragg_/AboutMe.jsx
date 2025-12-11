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
                            Creador de Contenido Digital · TikTok & Instagram
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className={styles.aboutGrid}>
                        {/* Bio Section */}
                        <div className={styles.bioSection}>
                            <div className={styles.bioCard}>
                                <h2 className={styles.bioTitle}>Mi Historia</h2>
                                <p className={styles.bioText}>
                                    Soy un creador de contenido digital especializado en TikTok e Instagram, donde he construido
                                    una comunidad de más de 50K seguidores apasionados. Mi contenido ha alcanzado más de 1 millón
                                    de visualizaciones, conectando con audiencias que buscan entretenimiento de calidad y creatividad.
                                </p>
                                <p className={styles.bioText}>
                                    Lo que comenzó como una pasión por crear videos se ha convertido en mi profesión. Cada día trabajo
                                    en producir contenido viral, colaborar con marcas y construir una comunidad auténtica. Mi enfoque
                                    está en crear momentos que resuenen con mi audiencia y generen engagement real.
                                </p>
                            </div>

                            <div className={styles.bioCard}>
                                <h2 className={styles.bioTitle}>¿Qué Hago?</h2>
                                <div className={styles.skillsList}>
                                    <div className={styles.skillItem}>
                                        <div className={styles.skillIcon}>🎬</div>
                                        <div className={styles.skillInfo}>
                                            <h3 className={styles.skillName}>Creación de Contenido</h3>
                                            <p className={styles.skillDesc}>Reels virales, TikToks creativos y contenido que conecta con millones</p>
                                        </div>
                                    </div>

                                    <div className={styles.skillItem}>
                                        <div className={styles.skillIcon}>📱</div>
                                        <div className={styles.skillInfo}>
                                            <h3 className={styles.skillName}>Estrategia de Redes</h3>
                                            <p className={styles.skillDesc}>Crecimiento orgánico y engagement auténtico en Instagram y TikTok</p>
                                        </div>
                                    </div>

                                    <div className={styles.skillItem}>
                                        <div className={styles.skillIcon}>🎨</div>
                                        <div className={styles.skillInfo}>
                                            <h3 className={styles.skillName}>Edición & Diseño</h3>
                                            <p className={styles.skillDesc}>Producción visual premium y edición que destaca en el feed</p>
                                        </div>
                                    </div>

                                    <div className={styles.skillItem}>
                                        <div className={styles.skillIcon}>🤝</div>
                                        <div className={styles.skillInfo}>
                                            <h3 className={styles.skillName}>Colaboraciones</h3>
                                            <p className={styles.skillDesc}>Trabajo con marcas para crear contenido auténtico y efectivo</p>
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
                                        <div className={styles.achievementLabel}>Contenidos</div>
                                    </div>
                                    <div className={styles.achievement}>
                                        <div className={styles.achievementNumber}>5+</div>
                                        <div className={styles.achievementLabel}>Años Creando</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.platformsCard}>
                                <h2 className={styles.platformsTitle}>Plataformas</h2>
                                <div className={styles.platformsList}>
                                    <div className={styles.platformItem}>
                                        <span className={styles.platformIcon}>📱</span>
                                        <span className={styles.platformName}>TikTok</span>
                                    </div>
                                    <div className={styles.platformItem}>
                                        <span className={styles.platformIcon}>📸</span>
                                        <span className={styles.platformName}>Instagram</span>
                                    </div>
                                </div>
                                <div className={styles.techNote}>
                                    <p>También desarrollo webs y aplicaciones como complemento a mi trabajo creativo</p>
                                </div>
                            </div>

                            <div className={styles.contactCard}>
                                <h2 className={styles.contactTitle}>¿Colaboramos?</h2>
                                <p className={styles.contactText}>
                                    Siempre abierto a colaboraciones con marcas y otros creadores. ¡Hablemos!
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
