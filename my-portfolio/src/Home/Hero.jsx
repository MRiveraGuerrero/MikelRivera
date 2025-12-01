import { useState } from 'react';
import styles from './Hero.module.css';

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
                <h1 className={styles.title}>MikelRivera</h1>
                <p className={styles.subtitle}>
                    Explora mi universo digital. Un sistema planetario interactivo donde cada planeta es una parte de mi trabajo.
                </p>
                <button className={styles.button} onClick={handleOpenModal}>
                    ¿Cómo funciona?
                </button>
            </section>

            {showModal && (
                <div className={styles.overlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setShowModal(false)}>
                            ×
                        </button>
                        <h2 className={styles.modalTitle}>Sistema Planetario</h2>
                        <p className={styles.modalText}>
                            Navega a través de las órbitas para descubrir mis proyectos, experimentos y experiencia.
                            <br /><br />
                            Haz clic en los planetas para viajar a ellos o usa el panel de control para una navegación rápida.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
