import React, { useState } from 'react';
import styles from './Home.module.css';

const RiveraggHome = () => {
    const [activeTab, setActiveTab] = useState('inicio');

    const socialStats = {
        instagram: '125K',
        tiktok: '89K',
        youtube: '45K'
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'inicio':
                return (
                    <div className={styles.inicioContent}>
                        <div className={styles.heroSection}>
                            <div className={styles.profileImageContainer}>
                                <div className={styles.glowRing}></div>
                                <div className={styles.profileImage}>
                                    <div className={styles.avatarPlaceholder}>RG</div>
                                </div>
                            </div>
                            <h1 className={styles.mainTitle}>
                                <span className={styles.gradient}>riveragg_</span>
                            </h1>
                            <p className={styles.tagline}>Content Creator • Influencer • Lifestyle</p>

                            <div className={styles.socialStats}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>📸</div>
                                    <div className={styles.statNumber}>{socialStats.instagram}</div>
                                    <div className={styles.statLabel}>Instagram</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>🎵</div>
                                    <div className={styles.statNumber}>{socialStats.tiktok}</div>
                                    <div className={styles.statLabel}>TikTok</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIcon}>▶️</div>
                                    <div className={styles.statNumber}>{socialStats.youtube}</div>
                                    <div className={styles.statLabel}>YouTube</div>
                                </div>
                            </div>

                            <div className={styles.ctaButtons}>
                                <a href="https://instagram.com/riveragg_" target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                                    <span>Sígueme</span>
                                    <div className={styles.btnGlow}></div>
                                </a>
                                <button onClick={() => setActiveTab('contacto')} className={styles.secondaryBtn}>
                                    Colaboraciones
                                </button>
                            </div>
                        </div>

                        <div className={styles.featuredContent}>
                            <h2 className={styles.sectionTitle}>Contenido Destacado</h2>
                            <div className={styles.contentGrid}>
                                <div className={styles.contentCard}>
                                    <div className={styles.cardImage}>
                                        <div className={styles.cardPlaceholder}>📱</div>
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <h3>Lifestyle Vlogs</h3>
                                        <p>Mi día a día y aventuras</p>
                                    </div>
                                </div>
                                <div className={styles.contentCard}>
                                    <div className={styles.cardImage}>
                                        <div className={styles.cardPlaceholder}>✨</div>
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <h3>Fashion & Style</h3>
                                        <p>Tendencias y outfits</p>
                                    </div>
                                </div>
                                <div className={styles.contentCard}>
                                    <div className={styles.cardImage}>
                                        <div className={styles.cardPlaceholder}>🎬</div>
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <h3>Behind the Scenes</h3>
                                        <p>Detrás de cámaras</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'galeria':
                return (
                    <div className={styles.galeriaContent}>
                        <h2 className={styles.sectionTitle}>Galería</h2>
                        <p className={styles.sectionSubtitle}>Mis mejores momentos capturados</p>

                        <div className={styles.galleryGrid}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                                <div key={item} className={styles.galleryItem}>
                                    <div className={styles.galleryPlaceholder}>
                                        <span className={styles.galleryIcon}>
                                            {item % 3 === 0 ? '🎥' : item % 2 === 0 ? '📸' : '✨'}
                                        </span>
                                    </div>
                                    <div className={styles.galleryOverlay}>
                                        <div className={styles.overlayContent}>
                                            <span className={styles.likes}>❤️ {Math.floor(Math.random() * 50)}K</span>
                                            <span className={styles.comments}>💬 {Math.floor(Math.random() * 5)}K</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className={styles.aboutContent}>
                        <div className={styles.aboutHero}>
                            <h2 className={styles.sectionTitle}>Sobre Mí</h2>
                            <p className={styles.sectionSubtitle}>Conoce mi historia</p>
                        </div>

                        <div className={styles.aboutGrid}>
                            <div className={styles.aboutCard}>
                                <div className={styles.aboutIcon}>🎯</div>
                                <h3>Mi Misión</h3>
                                <p>Inspirar y conectar con mi comunidad a través de contenido auténtico y creativo que refleje mi pasión por el lifestyle, la moda y las experiencias únicas.</p>
                            </div>

                            <div className={styles.aboutCard}>
                                <div className={styles.aboutIcon}>⚡</div>
                                <h3>Mi Estilo</h3>
                                <p>Combino tendencias actuales con mi toque personal, creando contenido fresco y dinámico que resuena con mi audiencia en Instagram, TikTok y YouTube.</p>
                            </div>

                            <div className={styles.aboutCard}>
                                <div className={styles.aboutIcon}>🌟</div>
                                <h3>Mi Comunidad</h3>
                                <p>Más de 250K seguidores que forman parte de esta increíble familia digital. Juntos creamos momentos inolvidables y compartimos experiencias únicas.</p>
                            </div>
                        </div>

                        <div className={styles.timeline}>
                            <h3 className={styles.timelineTitle}>Mi Trayectoria</h3>
                            <div className={styles.timelineItems}>
                                <div className={styles.timelineItem}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timelineContent}>
                                        <span className={styles.timelineYear}>2024</span>
                                        <h4>Expansión Multiplataforma</h4>
                                        <p>Alcanzando nuevas audiencias en YouTube y TikTok</p>
                                    </div>
                                </div>
                                <div className={styles.timelineItem}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timelineContent}>
                                        <span className={styles.timelineYear}>2023</span>
                                        <h4>100K en Instagram</h4>
                                        <p>Celebrando este increíble hito con mi comunidad</p>
                                    </div>
                                </div>
                                <div className={styles.timelineItem}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timelineContent}>
                                        <span className={styles.timelineYear}>2022</span>
                                        <h4>Primeras Colaboraciones</h4>
                                        <p>Trabajando con marcas que amo</p>
                                    </div>
                                </div>
                                <div className={styles.timelineItem}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timelineContent}>
                                        <span className={styles.timelineYear}>2021</span>
                                        <h4>El Comienzo</h4>
                                        <p>Iniciando mi aventura como creador de contenido</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'contacto':
                return (
                    <div className={styles.contactoContent}>
                        <div className={styles.contactHero}>
                            <h2 className={styles.sectionTitle}>Contacto</h2>
                            <p className={styles.sectionSubtitle}>¿Tienes una propuesta? ¡Hablemos!</p>
                        </div>

                        <div className={styles.contactGrid}>
                            <div className={styles.contactInfo}>
                                <h3>Colaboraciones & Negocios</h3>
                                <p>Estoy abierto a colaboraciones con marcas que se alineen con mis valores y mi audiencia.</p>

                                <div className={styles.contactMethods}>
                                    <div className={styles.contactMethod}>
                                        <div className={styles.methodIcon}>📧</div>
                                        <div className={styles.methodInfo}>
                                            <span className={styles.methodLabel}>Email</span>
                                            <span className={styles.methodValue}>riveragg@business.com</span>
                                        </div>
                                    </div>

                                    <div className={styles.contactMethod}>
                                        <div className={styles.methodIcon}>💼</div>
                                        <div className={styles.methodInfo}>
                                            <span className={styles.methodLabel}>Management</span>
                                            <span className={styles.methodValue}>manager@riveragg.com</span>
                                        </div>
                                    </div>

                                    <div className={styles.contactMethod}>
                                        <div className={styles.methodIcon}>📱</div>
                                        <div className={styles.methodInfo}>
                                            <span className={styles.methodLabel}>WhatsApp Business</span>
                                            <span className={styles.methodValue}>+34 XXX XXX XXX</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.socialLinks}>
                                    <h4>Sígueme en redes</h4>
                                    <div className={styles.socialButtons}>
                                        <a href="https://instagram.com/riveragg_" className={styles.socialBtn} target="_blank" rel="noopener noreferrer">
                                            <span className={styles.socialIcon}>📸</span>
                                            Instagram
                                        </a>
                                        <a href="https://tiktok.com/@riveragg_" className={styles.socialBtn} target="_blank" rel="noopener noreferrer">
                                            <span className={styles.socialIcon}>🎵</span>
                                            TikTok
                                        </a>
                                        <a href="https://youtube.com/@riveragg_" className={styles.socialBtn} target="_blank" rel="noopener noreferrer">
                                            <span className={styles.socialIcon}>▶️</span>
                                            YouTube
                                        </a>
                                        <a href="https://twitter.com/riveragg_" className={styles.socialBtn} target="_blank" rel="noopener noreferrer">
                                            <span className={styles.socialIcon}>🐦</span>
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.contactForm}>
                                <h3>Envíame un mensaje</h3>
                                <form className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" id="name" placeholder="Tu nombre" />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" placeholder="tu@email.com" />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="subject">Asunto</label>
                                        <select id="subject">
                                            <option value="">Selecciona un asunto</option>
                                            <option value="colaboracion">Colaboración</option>
                                            <option value="patrocinio">Patrocinio</option>
                                            <option value="evento">Evento</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Mensaje</label>
                                        <textarea id="message" rows="5" placeholder="Cuéntame sobre tu propuesta..."></textarea>
                                    </div>

                                    <button type="submit" className={styles.submitBtn}>
                                        <span>Enviar Mensaje</span>
                                        <div className={styles.btnGlow}></div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundEffects}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
                <div className={styles.gradientOrb3}></div>
            </div>

            <nav className={styles.navbar}>
                <div className={styles.navLogo}>
                    <span className={styles.logoText}>riveragg_</span>
                </div>

                <div className={styles.navTabs}>
                    <button
                        className={`${styles.navTab} ${activeTab === 'inicio' ? styles.active : ''}`}
                        onClick={() => setActiveTab('inicio')}
                    >
                        Inicio
                    </button>
                    <button
                        className={`${styles.navTab} ${activeTab === 'galeria' ? styles.active : ''}`}
                        onClick={() => setActiveTab('galeria')}
                    >
                        Galería
                    </button>
                    <button
                        className={`${styles.navTab} ${activeTab === 'about' ? styles.active : ''}`}
                        onClick={() => setActiveTab('about')}
                    >
                        About Me
                    </button>
                    <button
                        className={`${styles.navTab} ${activeTab === 'contacto' ? styles.active : ''}`}
                        onClick={() => setActiveTab('contacto')}
                    >
                        Contacto
                    </button>
                </div>
            </nav>

            <main className={styles.mainContent}>
                {renderContent()}
            </main>

            <footer className={styles.footer}>
                <p>© 2024 riveragg_ • All rights reserved</p>
                <div className={styles.footerLinks}>
                    <a href="#privacy">Privacy</a>
                    <a href="#terms">Terms</a>
                </div>
            </footer>
        </div>
    );
};

export default RiveraggHome;
