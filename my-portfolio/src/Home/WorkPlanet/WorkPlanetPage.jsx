import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityBanner from './CityBanner';
import CorePath from './CorePath';
import { getWorkItems } from '../data/workItems';
import styles from './WorkPlanetPage.module.css';
import { useLanguage } from '../context/LanguageContext';

function WorkPlanetPage() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const workItems = getWorkItems(t);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleNodeClick = (item) => {
        if (selectedItem && selectedItem.id === item.id) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.pageContainer}>
            <button className={styles.backButton} onClick={handleGoBack}>
                {t.workPage.back}
            </button>

            <CityBanner />

            <div className={styles.scrollableContent}>
                <CorePath
                    items={workItems}
                    onNodeClick={handleNodeClick}
                    activeItemId={selectedItem?.id}
                />
            </div>

        </div>
    );
}

export default WorkPlanetPage;
