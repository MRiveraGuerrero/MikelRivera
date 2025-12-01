import { useState } from 'react';
import styles from './Hero.module.css';
import TutorialModal from './TutorialModal';

export default function Hero() {
    const [showModal, setShowModal] = useState(false);

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
                        Explora mi universo digital. Un sistema planetario interactivo donde cada planeta es una parte de mi trabajo.
                    </p>
                    <button className={styles.button} onClick={handleOpenModal}>
                        ¿Cómo funciona?
                    </button>
                </div>
            </section>

            {/* Botón de ayuda fijo */}
            <button
                className={styles.helpButton}
                onClick={() => setShowModal(true)}
                aria-label="Cómo funciona"
            >
                ?
            </button>

            {showModal && (
                <TutorialModal onClose={() => setShowModal(false)} />
            )}
        </>
    );
}
