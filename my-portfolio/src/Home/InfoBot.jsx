import { useState } from 'react';
import styles from './InfoBot.module.css';

export default function InfoBot() {
    const [showCV, setShowCV] = useState(false);

    const handleOpenCV = () => {
        setShowCV(true);
    };

    const handleCloseCV = () => {
        setShowCV(false);
    };

    return (
        <>
            {/* Botón flotante del infobot */}
            <button
                className={styles.infoBotButton}
                onClick={handleOpenCV}
                aria-label="Ver CV"
            >
                <img
                    src="/assets/space/infobot.png"
                    alt="InfoBot"
                    className={styles.infoBotImage}
                />
            </button>

            {/* Modal del CV */}
            {showCV && (
                <div className={styles.cvModal} onClick={handleCloseCV}>
                    <div className={styles.cvContainer} onClick={(e) => e.stopPropagation()}>
                        <button
                            className={styles.closeButton}
                            onClick={handleCloseCV}
                            aria-label="Cerrar CV"
                        >
                            ×
                        </button>
                        <div className={styles.cvHeader}>
                            <h2>Curriculum Vitae</h2>
                            <a
                                href="/assets/cv.pdf"
                                download="Mikel_Rivera_CV.pdf"
                                className={styles.downloadButton}
                            >
                                📥 Descargar PDF
                            </a>
                        </div>
                        <iframe
                            src="/assets/cv.pdf"
                            className={styles.cvFrame}
                            title="Curriculum Vitae"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
