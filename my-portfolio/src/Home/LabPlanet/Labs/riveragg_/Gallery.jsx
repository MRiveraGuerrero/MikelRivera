import React from 'react';
import styles from './Gallery.module.css';
import Header from './Header';
import Footer from './Footer';

const Gallery = () => {
    return (
        <div className={styles.container}>
            <Header />

            {/* Photo Gallery Section */}
            <section id="gallery" className={styles.photoSection}>
                <div className={styles.photoBackground}>
                    <div className={styles.floatingShapes}>
                        <div className={styles.shape}></div>
                        <div className={styles.shape}></div>
                        <div className={styles.shape}></div>
                    </div>
                </div>

                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <span className={styles.badgeIcon}>📸</span>
                        Galería Visual
                    </div>
                    <h1 className={styles.sectionTitle}>Fotografía & Arte</h1>
                    <p className={styles.sectionDescription}>
                        Momentos capturados con estilo premium
                    </p>
                </div>

                <div className={styles.photoGrid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
                        <div key={item} className={styles.photoCard}>
                            <div className={styles.photoImage}>
                                <div className={styles.photoHover}>
                                    <button className={styles.photoViewBtn}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                            <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Gallery;
