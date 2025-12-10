import React from 'react';
import styles from './Videos.module.css';
import Header from './Header';
import Footer from './Footer';

const Videos = () => {
    return (
        <div className={styles.container}>
            <Header />

            {/* Video Section */}
            <section id="videos" className={styles.videoSection}>
                <div className={styles.sectionBackground}>
                    <div className={styles.gridLines}></div>
                </div>

                <div className={styles.sectionHeader}>
                    <div className={styles.sectionBadge}>
                        <span className={styles.badgeIcon}>▶</span>
                        Contenido en Vídeo
                    </div>
                    <h1 className={styles.sectionTitle}>Reels & TikToks</h1>
                    <p className={styles.sectionDescription}>
                        Explora mi contenido más viral y creativo
                    </p>
                </div>

                <div className={styles.videoGrid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <div key={item} className={styles.videoCard}>
                            <div className={styles.videoThumbnail}>
                                <div className={styles.playButton}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <div className={styles.videoOverlay}>
                                    <span className={styles.videoViews}>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 3C4.5 3 1.5 5.5 0 8c1.5 2.5 4.5 5 8 5s6.5-2.5 8-5c-1.5-2.5-4.5-5-8-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5S6.1 4.5 8 4.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
                                            <circle cx="8" cy="8" r="1.5" />
                                        </svg>
                                        {Math.floor(Math.random() * 500)}K
                                    </span>
                                </div>
                            </div>
                            <div className={styles.videoInfo}>
                                <h3 className={styles.videoTitle}>Video Title {item}</h3>
                                <p className={styles.videoDate}>Hace {item} días</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Videos;
