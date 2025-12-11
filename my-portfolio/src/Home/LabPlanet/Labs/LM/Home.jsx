import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    const videoGridRef = useRef(null);

    // Mock video data - chaotic and funny content
    const videos = [
        { id: 1, title: 'Caos en el estudio', views: '50K' },
        { id: 2, title: 'Freestyle de madrugada', views: '120K' },
        { id: 3, title: 'Detrás de cámaras', views: '85K' },
        { id: 4, title: 'Sesión improvisada', views: '200K' },
        { id: 5, title: 'Bromas épicas', views: '95K' },
        { id: 6, title: 'Producción nocturna', views: '150K' },
        { id: 7, title: 'Momentos random', views: '75K' },
        { id: 8, title: 'Jam session', views: '110K' },
        { id: 9, title: 'Locuras del grupo', views: '180K' },
    ];

    // Mock clothing items
    const clothingItems = [
        { id: 1, name: 'LM Hoodie', price: '€45', type: 'Hoodie' },
        { id: 2, name: 'Death Legacy Tee', price: '€25', type: 'T-Shirt' },
        { id: 3, name: 'Chaos Cap', price: '€20', type: 'Cap' },
        { id: 4, name: 'Underground Jacket', price: '€80', type: 'Jacket' },
    ];

    // Mock crew members
    const crewMembers = [
        { id: 1, name: 'Rivera', role: 'RSS & Tech', caption: 'Yo he creado esta web' },
        { id: 2, name: 'Sascha', role: 'Lyrics & Vibes', caption: 'Maestro de las rimas' },
        { id: 3, name: 'Limon', role: 'Producer', caption: 'El científico del sonido' },
        { id: 4, name: 'Evander', role: 'Lyrics & Vibes', caption: 'El hiperactivo undeground' },
        { id: 5, name: 'Igor', role: 'Lyrics & Organization', caption: 'Motor ausente' },
        { id: 6, name: 'Delga', role: 'Vibes', caption: 'Esfinterman' },
        { id: 7, name: 'Xabi', role: 'Drinker', caption: 'La amenaza' },
        { id: 8, name: 'Matu', role: 'Manuel', caption: 'El afortunaoo' },
        { id: 9, name: 'Ivanlord', role: 'Nerd', caption: 'Jefe de la hermandad' },
        { id: 10, name: 'Oskitar', role: 'Madero', caption: 'El capataz' },
        { id: 11, name: 'Asier', role: 'Ausente', caption: 'Lleva AFK 3 años' },
    ];

    return (
        <div className={styles.container}>
            <Header />

            {/* Hero Section - Chaotic CCTV Wall */}
            <section id="home" className={styles.hero}>
                <div className={styles.heroBackground}>
                    <div className={styles.glitchOverlay}></div>
                    <div className={styles.scanlines}></div>
                    <div className={styles.noiseTexture}></div>
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.badge}>
                        <span className={styles.badgeDot}></span>
                        TIKTOK · MUSIC · REELS
                    </div>

                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleLine}>LEGADO</span>
                        <span className={styles.titleLine}>DE LA</span>
                        <span className={styles.titleLine}>MUERTE</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        SWAGA SWAGA
                        <br />
                        Underground. Irreverente. Real.
                    </p>

                    {/* CCTV Video Wall */}
                    <div className={styles.cctvWall} ref={videoGridRef}>
                        <div className={styles.cctvLabel}>LIVE FEED // CCTV-CHAOS</div>
                        <div className={styles.videoMiniGrid}>
                            {videos.map((video, index) => (
                                <div key={video.id} className={styles.miniScreen} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className={styles.screenStatic}></div>
                                    <div className={styles.screenContent}>
                                        <div className={styles.playIcon}>▶</div>
                                        <div className={styles.screenOverlay}>
                                            <span className={styles.screenViews}>{video.views}</span>
                                        </div>
                                    </div>
                                    <div className={styles.screenLabel}>{video.title}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.graffitiOverlay}>
                            <span className={styles.graffiti1}>LM</span>
                            <span className={styles.graffiti2}>★</span>
                            <span className={styles.graffiti3}>CAOS</span>
                        </div>
                    </div>

                    <div className={styles.ctaButtons}>
                        <a href="#videos" className={styles.btnPrimary}>
                            <span>VER TODO</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#shop" className={styles.btnSecondary}>
                            TIENDA
                        </a>
                    </div>
                </div>

                <div className={styles.glitchStreaks}>
                    <div className={styles.streak}></div>
                    <div className={styles.streak}></div>
                    <div className={styles.streak}></div>
                </div>
            </section>

            {/* Clothing Shop Section */}
            <section id="shop" className={styles.shopSection}>
                <div className={styles.shopBackground}>
                    <div className={styles.urbanTexture}></div>
                    <div className={styles.neonGlow}></div>
                </div>

                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <span className={styles.badgeIcon}>🔥</span>
                        STREETWEAR
                    </div>
                    <h2 className={styles.sectionTitle}>UNDERGROUND MERCH</h2>
                    <p className={styles.sectionDescription}>
                        Saca el ñip con la ropa oficial de LM
                    </p>
                </div>

                <div className={styles.clothingGrid}>
                    {clothingItems.map((item, index) => (
                        <div key={item.id} className={styles.clothingCard} style={{ animationDelay: `${index * 0.15}s` }}>
                            <div className={styles.clothing3D}>
                                <div className={styles.clothingMockup}>
                                    <div className={styles.mockupGlow}></div>
                                    <div className={styles.mockupLabel}>{item.type}</div>
                                </div>
                                <div className={styles.hologramPrice}>{item.price}</div>
                            </div>
                            <div className={styles.clothingInfo}>
                                <h3 className={styles.clothingName}>{item.name}</h3>
                                <button className={styles.btnBuy}>
                                    COMPRAR
                                    <span className={styles.buyGlow}></span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Us - Comic Style */}
            <section id="about" className={styles.aboutSection}>
                <div className={styles.aboutBackground}>
                    <div className={styles.vhsOverlay}></div>
                    <div className={styles.comicDoodles}>
                        <span className={styles.doodle1}>★</span>
                        <span className={styles.doodle2}>💀</span>
                        <span className={styles.doodle3}>⚡</span>
                        <span className={styles.doodle4}>🎵</span>
                    </div>
                </div>

                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <span className={styles.badgeIcon}>👥</span>
                        LA CREW
                    </div>
                    <h2 className={styles.sectionTitle}>LEGADO MITOLÓGICO</h2>
                    <p className={styles.sectionDescription}>
                        Los pibardos detrás del caos y la música
                    </p>
                </div>

                <div className={styles.crewGrid}>
                    {crewMembers.map((member, index) => (
                        <div key={member.id} className={styles.crewCard} style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className={styles.comicFrame}>
                                <div className={styles.comicBorder}></div>
                                <div className={styles.memberPortrait}>
                                    <div className={styles.portraitGlitch}></div>
                                    <div className={styles.portraitSticker}>LM</div>
                                </div>
                                <div className={styles.comicBubble}>
                                    "{member.caption}"
                                </div>
                            </div>
                            <div className={styles.memberInfo}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberRole}>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.loreSection}>
                    <div className={styles.loreBox}>
                        <h3 className={styles.loreTitle}>LA LEYENDA</h3>
                        <p className={styles.loreText}>
                            En las calles nocturnas de la ciudad, un grupo de pibes se unió
                            bajo un mismo legado: crear música, grabar locuras
                            y dejar una marca imborrable en el underground. Esto es LM —
                            Legado de la Muerte. Caos, risas y beats.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={styles.contactSection}>
                <div className={styles.contactBackground}>
                    <div className={styles.techGrid}></div>
                    <div className={styles.neonPulse}></div>
                </div>

                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <span className={styles.badgeIcon}>📡</span>
                        CONTACTO
                    </div>
                    <h2 className={styles.sectionTitle}>ÚNETE AL CAOS</h2>
                    <p className={styles.sectionDescription}>
                        Escríbenos, colabora, o simplemente di hola
                    </p>
                </div>

                <div className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.neonLabel}>NOMBRE</label>
                        <input type="text" className={styles.neonInput} placeholder="Tu nombre..." />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.neonLabel}>EMAIL</label>
                        <input type="email" className={styles.neonInput} placeholder="tu@email.com" />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.neonLabel}>MENSAJE</label>
                        <textarea className={styles.neonTextarea} rows="5" placeholder="Escribe tu mensaje..."></textarea>
                    </div>
                    <button className={styles.btnSubmit}>
                        ENVIAR
                        <span className={styles.submitGlow}></span>
                    </button>
                </div>

                <div className={styles.socialIcons}>
                    <a href="#" className={styles.socialIcon}>
                        <span>IG</span>
                    </a>
                    <a href="#" className={styles.socialIcon}>
                        <span>YT</span>
                    </a>
                    <a href="#" className={styles.socialIcon}>
                        <span>TW</span>
                    </a>
                    <a href="#" className={styles.socialIcon}>
                        <span>SP</span>
                    </a>
                </div>

                <div className={styles.contactStickers}>
                    <span className={styles.sticker1}>LM</span>
                    <span className={styles.sticker2}>💀</span>
                    <span className={styles.sticker3}>CAOS</span>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
