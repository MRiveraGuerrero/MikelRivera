import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioPlanet from './PortfolioPlanet';
import PortfolioPreview from './PortfolioPreview';
import styles from './PortfolioPlanetPage.module.css';
import { useLanguage } from '../context/LanguageContext';

function PortfolioPlanetPage() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Estado para almacenar el objeto del ítem seleccionado actualmente
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemSelection = (item) => {
        // Si hacemos click en el mismo que ya está abierto, lo cerramos (toggle)
        if (selectedItem && selectedItem.id === item.id) {
            closePreview();
        } else {
            setSelectedItem(item);
        }
    };

    const closePreview = () => {
        setSelectedItem(null);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.pageContainer}>
            <button className={styles.backButton} onClick={handleGoBack}>
                {t.portfolioPage.back}
            </button>

            <h1 className={styles.mainTitle}>
                {t.portfolioPage.title}
                <span className={styles.subTitle}>{t.portfolioPage.subtitle}</span>
            </h1>

            <div className={styles.planetContainer}>
                <PortfolioPlanet
                    onSelectItem={handleItemSelection}
                    activeItemId={selectedItem?.id} // Pasamos solo el ID si existe
                />
            </div>

            {/* El panel de previsualización siempre está montado para que funcione la animación CSS */}
            <PortfolioPreview
                selectedItem={selectedItem}
                onClose={closePreview}
            />
        </div>
    );
}

export default PortfolioPlanetPage;