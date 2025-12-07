import { useState, useCallback, lazy, Suspense } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from './context/LanguageContext';

// Lazy load del modal para reducir el bundle inicial
const TutorialModal = lazy(() => import('./TutorialModal'));

export default function Hero() {
    const [showModal, setShowModal] = useState(false);
    const { t, language, toggleLanguage } = useLanguage();

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
                    className={styles.videoBg}
                    src="/assets/universe.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
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
                onClick={handleCloseModal}
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
        </>
    );
}
