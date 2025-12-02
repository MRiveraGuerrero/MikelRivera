import { useState } from 'react';
import styles from './TutorialModal.module.css';
import spaceship from './assets/orbit/spaceship.png';
import planet from './assets/orbit/portfolio-planet.png';
import sun from './assets/orbit/sun.png';
import astronaut from './assets/orbit/robot.png';

export default function TutorialModal({ onClose }) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "La Nave",
            desc: "Tu panel de control rápido. Haz clic en la nave para desplegar un menú de acceso directo a todas las secciones sin tener que buscar los planetas.",
            img: spaceship
        },
        {
            title: "Los Planetas",
            desc: "Cada planeta representa una dimensión de mi trabajo: Portfolio, Proyectos, Experiencia y Laboratorio. Haz clic para viajar y explorar.",
            img: planet
        },
        {
            title: "El Sol",
            desc: "El centro de todo. Si te pierdes, el Sol siempre estará ahí. Haz clic en él para volver al inicio o conocer mi historia personal.",
            img: sun
        },
        {
            title: "Basura Espacial",
            desc: "¡Diviértete! Haz clic en el satélite, el meteorito o el astronauta para descubrir interacciones ocultas.",
            img: astronaut
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>

                <div className={styles.contentSide}>
                    <h2 className={styles.stepTitle}>{steps[step].title}</h2>
                    <p className={styles.stepDescription}>{steps[step].desc}</p>

                    <div className={styles.dots}>
                        {steps.map((_, i) => (
                            <div key={i} className={`${styles.dot} ${i === step ? styles.activeDot : ''}`} />
                        ))}
                    </div>

                    <div className={styles.controls}>
                        <button
                            className={styles.controlBtn}
                            onClick={handlePrev}
                            disabled={step === 0}
                        >
                            Anterior
                        </button>
                        <button
                            className={`${styles.controlBtn} ${styles.primaryBtn}`}
                            onClick={handleNext}
                        >
                            {step === steps.length - 1 ? 'Entendido' : 'Siguiente'}
                        </button>
                    </div>
                </div>

                <div className={styles.imageSide}>
                    <img
                        key={step} // Force re-render for animation
                        src={steps[step].img}
                        alt={steps[step].title}
                        className={styles.previewImage}
                    />
                </div>
            </div>
        </div>
    );
}
