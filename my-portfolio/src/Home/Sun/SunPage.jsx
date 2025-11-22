import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sun from './Sun';
import SunPreview from './SunPreview';
import styles from './SunPage.module.css';

function SunPage() {
    const navigate = useNavigate();
    const [selectedPart, setSelectedPart] = useState(null);

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
                &lt;&lt; VOLVER AL HUB
            </button>

            <h1 className={styles.mainTitle}>
                NÚCLEO SOLAR - ABOUT ME
                <span className={styles.subTitle}>Explora mi esencia</span>
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
