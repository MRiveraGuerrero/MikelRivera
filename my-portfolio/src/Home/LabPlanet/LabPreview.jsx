import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LabPreview.module.css';
import { useLanguage } from '../context/LanguageContext';

const LabPreview = ({ selectedItem, onClose }) => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    // Si no hay ítem seleccionado, no renderizamos nada (o usamos la clase CSS para ocultar)
    // Usaremos CSS para la animación de salida, así que siempre renderizamos el contenedor.
    const panelClass = `${styles.previewPanel} ${selectedItem ? styles.isVisible : ''}`;

    const handleViewProject = () => {
        if (selectedItem) {
            // Usar la ruta personalizada si existe, sino usar el patrón por defecto
            const targetRoute = selectedItem.route || `/${selectedItem.id}`;
            navigate(targetRoute);
            console.log(`Navegando a experimento: ${selectedItem.title} -> ${targetRoute}`);
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
                <span className={styles.metaInfo}>{t.labPage.preview.year} {content.year}</span>
                <span className={styles.marker}>{t.labPage.preview.number} {content.number}</span>
            </div>

            <h2 className={styles.title}>{content.title}</h2>
            <p className={styles.description}>{content.description}</p>

            <button className={styles.viewButton} onClick={handleViewProject}>
                {t.labPage.preview.view}
            </button>
        </div>
    );
};

export default LabPreview;