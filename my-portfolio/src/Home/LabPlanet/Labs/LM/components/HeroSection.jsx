import React, { useRef, useState } from 'react';
import styles from '../Home.module.css';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

const HeroSection = ({ videos }) => {
    const videoGridRef = useRef(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    return (
        <>
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
                                <VideoCard key={video.id} video={video} index={index} onClick={handleVideoClick} />
                            ))}
                        </div>
                        <div className={styles.graffitiOverlay}>
                            <span className={styles.graffiti1}>LM</span>
                            <span className={styles.graffiti2}>★</span>
                            <span className={styles.graffiti3}>CAOS</span>
                        </div>
                    </div>

                    <div className={styles.ctaButtons}>
                        <a href="#shop" className={styles.btnPrimary}>
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

            <VideoModal video={selectedVideo} onClose={handleCloseModal} />
        </>
    );
};

export default HeroSection;
