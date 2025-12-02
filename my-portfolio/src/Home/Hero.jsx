import { useState } from 'react';
import styles from './Hero.module.css';
import TutorialModal from './TutorialModal';
import { useLanguage } from './context/LanguageContext';

export default function Hero() {
    const [showModal, setShowModal] = useState(false);
    const { t, language, toggleLanguage } = useLanguage();

    const handleOpenModal = () => {
        setShowModal(true);
        const orbitSection = document.getElementById('orbit-section');
        if (orbitSection) {
            orbitSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
            </section>

            {/* Botón de ayuda fijo */}
            <button
                className={styles.helpButton}
                onClick={() => setShowModal(true)}
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

            {showModal && (
                <TutorialModal onClose={() => setShowModal(false)} />
            )}
        </>
    );
}
