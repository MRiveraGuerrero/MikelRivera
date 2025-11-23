import React, { useState } from 'react';
import styles from './NorthPoint.module.css';
import HeroSection from './HeroSection';
import ArtistsSection from './ArtistsSection';
import GallerySection from './GallerySection';
import ContactSection from './ContactSection';

const NorthPointStudiosInk = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavClick = (tab) => {
        setActiveTab(tab);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            {/* Navigation */}
            <nav className={styles.navbar}>
                <div className={styles.logo} onClick={() => handleNavClick('home')}>
                    NORTH POINT <span>INK</span>
                </div>

                <div className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
                        onClick={() => handleNavClick('home')}
                    >
                        Inicio
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'artists' ? styles.active : ''}`}
                        onClick={() => handleNavClick('artists')}
                    >
                        Artistas
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'gallery' ? styles.active : ''}`}
                        onClick={() => handleNavClick('gallery')}
                    >
                        Trabajos
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'contact' ? styles.active : ''}`}
                        onClick={() => handleNavClick('contact')}
                    >
                        Contacto
                    </button>
                </div>

                <button className={styles.hamburger} onClick={toggleMenu}>
                    ☰
                </button>
            </nav>

            {/* Content */}
            <main className={styles.content}>
                {activeTab === 'home' && (
                    <>
                        <HeroSection onBookClick={() => handleNavClick('contact')} />
                        <AboutSection />
                    </>
                )}
                {activeTab === 'artists' && <ArtistsSection />}
                {activeTab === 'gallery' && <GallerySection />}
                {activeTab === 'contact' && <ContactSection />}
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.smokeLines}></div>
                <div className={styles.footerContent}>
                    <h2 style={{ fontFamily: 'Cinzel', fontSize: '2rem', marginBottom: '1rem' }}>NORTH POINT INK</h2>
                    <p style={{ color: '#a3a3a3', marginBottom: '2rem' }}>Arte eterno en tu piel.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                        <span>Instagram</span>
                        <span>Facebook</span>
                        <span>Twitter</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#555' }}>© 2024 North Point Studios. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

// Simple About Section Component for Home Tab
const AboutSection = () => (
    <section style={{ padding: '6rem 2rem', background: '#1b1b1b', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
                <h2 style={{ fontFamily: 'Cinzel', fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>
                    EL ESTUDIO
                </h2>
                <p style={{ fontFamily: 'Inter', lineHeight: '1.8', color: '#a3a3a3', marginBottom: '2rem' }}>
                    En North Point Ink, no solo hacemos tatuajes; creamos historias que perduran para siempre.
                    Nuestro espacio ha sido diseñado para inspirar tanto a artistas como a clientes,
                    fusionando la estética oscura y elegante con la máxima higiene y profesionalidad.
                </p>
                <p style={{ fontFamily: 'Inter', lineHeight: '1.8', color: '#a3a3a3', marginBottom: '3rem' }}>
                    Contamos con artistas premiados internacionalmente, cada uno maestro en su estilo,
                    desde el realismo más detallado hasta el blackwork más agresivo.
                </p>

                {/* Studio Mini Gallery */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[
                        'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1590246130796-54238a29d7a6?q=80&w=1974&auto=format&fit=crop'
                    ].map((src, i) => (
                        <div key={i} style={{ overflow: 'hidden', height: '100px', borderRadius: '4px' }}>
                            <img
                                src={src}
                                alt="Studio"
                                style={{
                                    width: '100%', height: '100%', objectFit: 'cover',
                                    transition: 'transform 0.5s ease', cursor: 'pointer'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ position: 'relative', height: '500px' }}>
                <div style={{
                    position: 'absolute', top: '20px', left: '20px', width: '100%', height: '100%',
                    border: '2px solid #dc2626', zIndex: 1
                }}></div>
                <img
                    src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2070&auto=format&fit=crop"
                    alt="Studio Interior"
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 2,
                        filter: 'grayscale(100%) contrast(120%)'
                    }}
                />
            </div>
        </div>
    </section>
);

export default NorthPointStudiosInk;
