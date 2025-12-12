import React, { useRef, useEffect } from 'react';
import styles from '../Home.module.css';

const VideoCard = ({ video, index, onClick }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            // Forzar la reproducción cuando el componente se monta
            const playVideo = async () => {
                try {
                    await videoElement.play();
                    console.log(`Video ${video.id} reproduciendo:`, video.src);
                } catch (error) {
                    console.error(`Error reproduciendo video ${video.id}:`, error);
                }
            };

            // Intentar reproducir cuando el video esté listo
            if (videoElement.readyState >= 3) {
                playVideo();
            } else {
                videoElement.addEventListener('loadeddata', playVideo);
                return () => videoElement.removeEventListener('loadeddata', playVideo);
            }
        }
    }, [video.id, video.src]);

    return (
        <div
            className={styles.miniScreen}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onClick(video)}
        >
            <video
                ref={videoRef}
                className={styles.videoElement}
                src={video.src}
                muted
                loop
                playsInline
                preload="auto"
                onError={(e) => console.error(`Error cargando video ${video.id}:`, video.src, e)}
            />
            <div className={styles.screenStatic}></div>
            <div className={styles.screenOverlay}>
                <span className={styles.screenViews}>{video.views}</span>
            </div>
            <div className={styles.screenLabel}>{video.title}</div>
        </div>
    );
};

export default VideoCard;
