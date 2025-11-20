import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PortfolioPreview.module.css';

const PortfolioPreview = ({ selectedItem, onClose }) => {
    const navigate = useNavigate();

    // Si no hay ítem seleccionado, no renderizamos nada (o usamos la clase CSS para ocultar)
    // Usaremos CSS para la animación de salida, así que siempre renderizamos el contenedor.
    const panelClass = `${styles.previewPanel} ${selectedItem ? styles.isVisible : ''}`;

    const handleViewProject = () => {
        if (selectedItem) {
            // Ejemplo de navegación: /portfolio/p1
            navigate(`/portfolio/${selectedItem.id}`);
            console.log(`Navegando a proyecto: ${selectedItem.title}`);
        }
    };

    // Contenido de seguridad por si selectedItem es null durante la animación de salida
    const content = selectedItem || { year: '', number: '', title: '', description: '' };

    return (
        <div className={panelClass}>
            {selectedItem && (
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
            )}

            <div className={styles.header}>
                <span className={styles.metaInfo}>AÑO: {content.year}</span>
                <span className={styles.marker}>Nº {content.number}</span>
            </div>

            <h2 className={styles.title}>{content.title}</h2>
            <p className={styles.description}>{content.description}</p>

            <button className={styles.viewButton} onClick={handleViewProject}>
                VER PROYECTO COMPLETO &lt;&lt;
            </button>
        </div>
    );
};

export default PortfolioPreview;