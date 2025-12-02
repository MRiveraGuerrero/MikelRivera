import { useState } from 'react';
import styles from './TutorialModal.module.css';
import spaceship from './assets/orbit/spaceship.png';
import planet from './assets/orbit/portfolio-planet.png';
import sun from './assets/orbit/sun.png';
import astronaut from './assets/orbit/robot.png';

import { useLanguage } from './context/LanguageContext';

export default function TutorialModal({ onClose }) {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: t.tutorial.shipTitle,
            desc: t.tutorial.shipDesc,
            img: spaceship
        },
        {
            title: t.tutorial.planetsTitle,
            desc: t.tutorial.planetsDesc,
            img: planet
        },
        {
            title: t.tutorial.sunTitle,
            desc: t.tutorial.sunDesc,
            img: sun
        },
        {
            title: t.tutorial.trashTitle,
            desc: t.tutorial.trashDesc,
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
                            {t.tutorial.prev}
                        </button>
                        <button
                            className={`${styles.controlBtn} ${styles.primaryBtn}`}
                            onClick={handleNext}
                        >
                            {step === steps.length - 1 ? t.tutorial.understood : t.tutorial.next}
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
