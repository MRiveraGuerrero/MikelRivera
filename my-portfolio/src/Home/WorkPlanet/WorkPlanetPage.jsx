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

    // Calcular el lado del popup: opuesto a la alineación del texto del nodo
    // Si el índice es par (0, 2...), texto a la derecha -> popup a la izquierda
    // Si el índice es impar (1, 3...), texto a la izquierda -> popup a la derecha
    const getPopupSide = () => {
        if (!selectedItem) return 'right';
        const index = workItems.findIndex(item => item.id === selectedItem.id);
        return index % 2 === 0 ? 'left' : 'right';
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
                side={getPopupSide()}
            />
        </div>
    );
}

export default WorkPlanetPage;
