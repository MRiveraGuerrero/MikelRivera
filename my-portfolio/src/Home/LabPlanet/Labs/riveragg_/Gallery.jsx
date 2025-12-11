import React from 'react';
import styles from './Gallery.module.css';
import Header from './Header';
import Footer from './Footer';

const Gallery = () => {
    // Photo gallery data
    const photos = [
        { id: 1, title: 'Momento 1', src: '/images/photo-1.jpg' },
        { id: 2, title: 'Momento 2', src: '/images/photo-2.jpg' },
        { id: 3, title: 'Momento 3', src: '/images/photo-3.jpg' },
        { id: 4, title: 'Momento 4', src: '/images/photo-4.jpg' },
        { id: 5, title: 'Momento 5', src: '/images/photo-5.jpg' },
        { id: 6, title: 'Momento 6', src: '/images/photo-6.jpg' },
        { id: 7, title: 'Momento 7', src: '/images/photo-7.jpg' },
        { id: 8, title: 'Momento 8', src: '/images/photo-8.jpg' },
        { id: 9, title: 'Momento 9', src: '/images/photo-9.jpg' },
        { id: 10, title: 'Momento 10', src: '/images/photo-10.jpg' },
        { id: 11, title: 'Momento 11', src: '/images/photo-11.jpg' },
        { id: 12, title: 'Momento 12', src: '/images/photo-12.jpg' },
        { id: 13, title: 'Momento 13', src: '/images/photo-13.jpg' },
        { id: 14, title: 'Momento 14', src: '/images/photo-14.jpg' },
        { id: 15, title: 'Momento 15', src: '/images/photo-15.jpg' },
        { id: 16, title: 'Momento 16', src: '/images/photo-16.jpg' },
    ];

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
                    {photos.map((photo) => (
                        <div key={photo.id} className={styles.photoCard}>
                            <img 
                                className={styles.photoImage}
                                src={photo.src}
                                alt={photo.title}
                            />
                            <div className={styles.photoHover}>
                                <button className={styles.photoViewBtn}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                        <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.photoCaption}>{photo.title}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Gallery;
