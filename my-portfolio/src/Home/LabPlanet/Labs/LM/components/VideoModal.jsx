import React from 'react';
import styles from './VideoModal.module.css';

const VideoModal = ({ video, onClose }) => {
    if (!video) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                <div className={styles.videoContainer}>
                    <video
                        className={styles.video}
                        src={video.src}
                        controls
                        autoPlay
                        loop
                        playsInline
                    />
                </div>
                <div className={styles.videoInfo}>
                    <h3 className={styles.videoTitle}>{video.title}</h3>
                    <span className={styles.videoViews}>{video.views} views</span>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
