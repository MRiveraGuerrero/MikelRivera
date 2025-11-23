import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProjectSidePage.module.css';

const projects = [
    {
        id: 'sientame',
        title: 'Siéntame',
        category: 'SaaS · Reservas',
        image: '/assets/projects/sientame.png',  // tu asset local
        url: 'https://sientame.com',
        description:
            'Plataforma SaaS completa para negocios locales. Incluye reservas online, panel Business, Google Business integration, landings personalizadas, pagos con Stripe, perfiles públicos, reviews, calendarios avanzados y motor de marketing integrado.',
        accent: '#3a5df2' // tu azul de marca
    },
    {
        id: 'survival',
        title: 'Survival Vacation 2',
        category: 'Videojuego web',
        image: '/assets/projects/survivalvacation2.png',
        url: 'https://survivalvacation2.com',
        description:
            'SV2 (Survival Vacation 2) es una plataforma completa de creación y juego narrativo, donde el usuario no solo juega partidas de supervivencia basadas en eventos, sino que puede crear mapas, objetos y eventos propios, compartirlos en una red social interna, y participar en sistemas como gatcha, misiones y micropagos.',
        accent: '#f57c00' // tu naranja
    },
    {
        id: 'bisky',
        title: 'Bisky Team',
        category: 'Equipo de coheteria',
        image: '/assets/projects/bisky.png',
        url: 'https://biskyteam.com',
        description:
            'BiSKY Team es un equipo universitario de cohetería avanzada de la UPV/EHU. Diseñan, fabrican y lanzan cohetes reales con motor híbrido, sistemas de aviónica y simulación propios. Operan como una engineering team multidisciplinar, orientado a I+D aeroespacial y validación en vuelo.',
        accent: '#ffffff' // blanco minimal
    }
];

const ProjectSidePage = () => {
    const [selectedId, setSelectedId] = useState(projects[0].id);
    const [showInfo, setShowInfo] = useState(false);
    const navigate = useNavigate();

    const selectedProject = projects.find(p => p.id === selectedId);

    const handleEnterClick = () => {
        if (selectedProject.url) {
            window.open(selectedProject.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.bgGlow} style={{ background: `radial-gradient(circle, ${selectedProject.accent}10 0%, transparent 70%)` }}></div>
            <div className={styles.bgGrid}></div>

            {/* Left Sidebar (Thumbnails) */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>PROJECT SIDE</h2>
                    <p className={styles.sidebarSubtitle}>EXPLORE MY PROJECTS</p>
                </div>

                <div className={styles.thumbnailList}>
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`${styles.thumbnailCard} ${selectedId === project.id ? styles.active : ''}`}
                            onClick={() => {
                                setSelectedId(project.id);
                                setShowInfo(false);
                            }}
                            style={{ '--accent-color': project.accent, animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.thumbImageContainer}>
                                <img src={project.image} alt={project.title} className={styles.thumbImage} />
                            </div>
                            <div className={styles.thumbInfo}>
                                <span className={styles.thumbTitle}>{project.title}</span>
                                <span className={styles.thumbTag}>{project.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.backButton} onClick={() => navigate('/project-planet')}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    VOLVER
                </div>
            </div>

            {/* Right Preview Area */}
            <div className={styles.previewArea}>
                <div className={styles.previewContainer} key={selectedId}>
                    <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className={styles.previewImage}
                    />
                    <div className={styles.previewOverlay}></div>
                </div>

                <div className={styles.actionArea}>
                    <button
                        className={styles.infoButton}
                        onClick={() => setShowInfo(true)}
                        title="Más información"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                    </button>
                    <button className={styles.enterButton} onClick={handleEnterClick}>
                        VISITAR WEB
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Info Modal */}
            {showInfo && (
                <div className={styles.modalOverlay} onClick={() => setShowInfo(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setShowInfo(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                        <p className={styles.modalText}>{selectedProject.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectSidePage;
