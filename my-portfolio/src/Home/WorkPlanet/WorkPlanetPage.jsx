import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityBanner from './CityBanner';
import CorePath from './CorePath';
import WorkPreview from './WorkPreview';
import { workItems } from '../data/workItems';
import styles from './WorkPlanetPage.module.css';

function WorkPlanetPage() {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleNodeClick = (item) => {
        if (selectedItem && selectedItem.id === item.id) {
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    const handleClosePreview = () => {
        setSelectedItem(null);
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.pageContainer}>
            <button className={styles.backButton} onClick={handleGoBack}>
                &lt;&lt; VOLVER AL HUB
            </button>

            <CityBanner />

            <div className={styles.scrollableContent}>
                <CorePath
                    items={workItems}
                    onNodeClick={handleNodeClick}
                    activeItemId={selectedItem?.id}
                />
            </div>

            <WorkPreview
                selectedItem={selectedItem}
                onClose={handleClosePreview}
            />
        </div>
    );
}

export default WorkPlanetPage;
