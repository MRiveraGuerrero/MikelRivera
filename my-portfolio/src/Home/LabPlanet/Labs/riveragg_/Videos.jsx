import React from 'react';
import styles from './Videos.module.css';
import Header from './Header';
import Footer from './Footer';

const Videos = () => {
    // Videos data
    const videos = [
        { id: 1, title: 'Video Reels 1', views: '120K', src: '/videos/reels-1.mp4' },
        { id: 2, title: 'Video Reels 2', views: '95K', src: '/videos/reels-2.mp4' },
        { id: 3, title: 'Video Reels 3', views: '180K', src: '/videos/reels-3.mp4' },
        { id: 4, title: 'Video Reels 4', views: '145K', src: '/videos/reels-4.mp4' },
        { id: 5, title: 'Video Reels 5', views: '230K', src: '/videos/reels-5.mp4' },
        { id: 6, title: 'Video Reels 6', views: '87K', src: '/videos/reels-6.mp4' },
        { id: 7, title: 'Video Reels 7', views: '156K', src: '/videos/reels-7.mp4' },
        { id: 8, title: 'Video Reels 8', views: '203K', src: '/videos/reels-8.mp4' },
        { id: 9, title: 'Video Reels 9', views: '174K', src: '/videos/reels-9.mp4' },
        { id: 10, title: 'Video Reels 10', views: '298K', src: '/videos/reels-10.mp4' },
        { id: 11, title: 'Video Reels 11', views: '112K', src: '/videos/reels-11.mp4' },
        { id: 12, title: 'Video Reels 12', views: '267K', src: '/videos/reels-12.mp4' },
    ];

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
                    {videos.map((video) => (
                        <div key={video.id} className={styles.videoCard}>
                            <div className={styles.videoThumbnail}>
                                <video 
                                    className={styles.videoElement}
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline
                                >
                                    <source src={video.src} type="video/mp4" />
                                    Tu navegador no soporta videos HTML5
                                </video>
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
                                        {video.views}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.videoInfo}>
                                <h3 className={styles.videoTitle}>{video.title}</h3>
                                <p className={styles.videoDate}>Video #{video.id}</p>
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
