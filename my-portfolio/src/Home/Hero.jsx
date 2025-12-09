import { useState, useCallback, lazy, Suspense, useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from './context/LanguageContext';
import InfoBot from './InfoBot';

// Lazy load del modal para reducir el bundle inicial
const TutorialModal = lazy(() => import('./TutorialModal'));

export default function Hero() {
    const [showModal, setShowModal] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const { t, language, toggleLanguage } = useLanguage();

    // Lazy loading del video con Intersection Observer
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !videoLoaded) {
                        // Cargar el video solo cuando esté visible
                        videoElement.src = "/assets/universe.mp4";
                        videoElement.load();
                        setVideoLoaded(true);
                    }
                });
            },
            { threshold: 0.1 } // Cargar cuando el 10% del video sea visible
        );

        observer.observe(videoElement);

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, [videoLoaded]);

    // Memoizar handlers para evitar re-creaciones
    const handleOpenModal = useCallback(() => {
        setShowModal(true);
        const orbitSection = document.getElementById('orbit-section');
        if (orbitSection) {
            orbitSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <>
            <section className={styles.hero}>
                <video
                    ref={videoRef}
                    className={styles.videoBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/assets/universe-poster.png"
                    onLoadedData={() => console.log('Video cargado')}
                    onError={(e) => console.error('Error cargando video:', e)}
                />

                <div className={styles.infoPanel}>
                    <h1 className={styles.title}>MikelRivera</h1>
                    <p className={styles.subtitle}>
                        {t.hero.subtitle}
                    </p>
                    <button className={styles.button} onClick={handleOpenModal}>
                        {t.hero.howItWorks}
                    </button>
                </div>

                {/* Spaceship bottom edge */}
                <div className={styles.spaceshipEdge}></div>
            </section>

            {/* Botón de ayuda fijo */}
            <button
                className={styles.helpButton}
                onClick={handleOpenModal}
                aria-label={t.hero.ariaHowItWorks}
            >
                ?
            </button>

            {/* Botón de idioma fijo */}
            <button
                className={styles.langButton}
                onClick={toggleLanguage}
                aria-label="Switch Language"
            >
                {language === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Lazy load del modal */}
            {showModal && (
                <Suspense fallback={null}>
                    <TutorialModal onClose={handleCloseModal} />
                </Suspense>
            )}

            {/* InfoBot flotante */}
            <InfoBot />
        </>
    );
}
