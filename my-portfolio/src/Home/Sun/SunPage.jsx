import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sun from './Sun';
import SunPreview from './SunPreview';
import styles from './SunPage.module.css';
import { useLanguage } from '../context/LanguageContext';

function SunPage() {
    const navigate = useNavigate();
    const [selectedPart, setSelectedPart] = useState(null);
    const { t } = useLanguage();

    const handlePartSelection = (part) => {
        if (selectedPart && selectedPart.id === part.id) {
            closePreview();
        } else {
            setSelectedPart(part);
        }
    };

    const closePreview = () => {
        setSelectedPart(null);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.pageContainer}>
            <button className={styles.backButton} onClick={handleGoBack}>
                {t.sun.back}
            </button>

            <h1 className={styles.mainTitle}>
                {t.sun.title}
                <span className={styles.subTitle}>{t.sun.subtitle}</span>
            </h1>

            <div className={styles.sunContainer}>
                <Sun
                    onSelectPart={handlePartSelection}
                    activePartId={selectedPart?.id}
                />
            </div>

            <SunPreview
                selectedPart={selectedPart}
                onClose={closePreview}
            />
        </div>
    );
}

export default SunPage;
