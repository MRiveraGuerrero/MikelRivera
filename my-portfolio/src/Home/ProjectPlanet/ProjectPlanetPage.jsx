import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- NUEVO: Importar hook de navegación
import ProjectPlanet from './ProjectPlanet';
import SidePanel from './SidePanel';
import styles from './ProjectPlanetPage.module.css';

function ProjectPlanetPage() {
    const navigate = useNavigate(); // <--- NUEVO: Instanciar el hook

    const [panelState, setPanelState] = useState({
        isOpen: false,
        type: 'holographic'
    });

    const handleSideSelection = (side) => {
        if (panelState.isOpen && panelState.type === side) {
            closePanel();
        } else {
            setPanelState({ isOpen: true, type: side });
        }
    };

    const closePanel = () => {
        setPanelState(prev => ({ ...prev, isOpen: false }));
    };

    // <--- NUEVO: Función para manejar el click del botón de volver
    const handleGoBack = () => {
        // Navega a la ruta raíz ('/') o usa navigate(-1) para volver atrás en el historial
        navigate('/');
    };

    return (
        <div className={styles.pageContainer}>
            {/* <--- NUEVO: El botón de volver */}
            <button className={styles.backButton} onClick={handleGoBack}>
                &lt;&lt; VOLVER AL SISTEMA SOLAR
            </button>

            <h1 className={styles.mainTitle}>
                SELECCIONA TU DESTINO
            </h1>

            <div className={styles.planetContainer}>
                <ProjectPlanet
                    onSelectSide={handleSideSelection}
                    selectedSide={panelState.isOpen ? panelState.type : null}
                />
            </div>

            <SidePanel
                key={panelState.type}
                isOpen={panelState.isOpen}
                type={panelState.type}
                onClose={closePanel}
            />
        </div>
    );
}

export default ProjectPlanetPage;