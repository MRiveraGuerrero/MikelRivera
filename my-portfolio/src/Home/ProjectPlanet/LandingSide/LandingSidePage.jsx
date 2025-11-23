import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingSidePage.module.css';
import NorthPointStudiosInk from './Landings/NorthPointStudiosInk/Home';

// Placeholder for other landings
const PlaceholderLanding = ({ title, color }) => (
    <div style={{
        width: '100%',
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#fff'
    }}>
        <h1 style={{ fontSize: '4rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: color }}>{title}</h1>
        <p style={{ marginTop: '1rem', opacity: 0.5 }}>COMING SOON</p>
    </div>
);

const landings = [
    {
        id: 'northpoint',
        title: 'North Point Studios',
        category: 'TATTOO STUDIO',
        image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop',
        component: <NorthPointStudiosInk />,
        path: '/landings/north-point-studios-ink',
        accent: '#dc2626'
    },
    {
        id: 'neon-cyber',
        title: 'Neon Cyber Store',
        category: 'E-COMMERCE',
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
        component: <PlaceholderLanding title="NEON CYBER" color="#00f3ff" />,
        path: '#',
        accent: '#00f3ff'
    },
    {
        id: 'arch-minimal',
        title: 'Arch Minimal',
        category: 'ARCHITECTURE',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        component: <PlaceholderLanding title="ARCH MINIMAL" color="#ffffff" />,
        path: '#',
        accent: '#ffffff'
    }
];

const LandingSidePage = () => {
    const [selectedId, setSelectedId] = useState(landings[0].id);
    const navigate = useNavigate();

    const selectedLanding = landings.find(l => l.id === selectedId);

    const handleEnterClick = () => {
        if (selectedLanding.path !== '#') {
            navigate(selectedLanding.path);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.bgGlow} style={{ background: `radial-gradient(circle, ${selectedLanding.accent}10 0%, transparent 70%)` }}></div>
            <div className={styles.bgGrid}></div>

            {/* Left Sidebar (Thumbnails) */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>PROJECT PLANET</h2>
                    <p className={styles.sidebarSubtitle}>SELECT A LANDING EXPERIENCE</p>
                </div>

                <div className={styles.thumbnailList}>
                    {landings.map((landing, index) => (
                        <div
                            key={landing.id}
                            className={`${styles.thumbnailCard} ${selectedId === landing.id ? styles.active : ''}`}
                            onClick={() => setSelectedId(landing.id)}
                            style={{ '--accent-color': landing.accent, animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.thumbImageContainer}>
                                <img src={landing.image} alt={landing.title} className={styles.thumbImage} />
                            </div>
                            <div className={styles.thumbInfo}>
                                <span className={styles.thumbTitle}>{landing.title}</span>
                                <span className={styles.thumbTag}>{landing.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Preview Area */}
            <div className={styles.previewArea}>
                <div className={styles.previewContainer} key={selectedId}>
                    <div className={styles.previewFrame}>
                        {/* Render the actual landing component here, scaled or contained */}
                        <div style={{ transformOrigin: 'top left', width: '100%', minHeight: '100%' }}>
                            {selectedLanding.component}
                        </div>
                    </div>
                    <div className={styles.previewOverlay}></div>
                </div>

                <div className={styles.actionArea}>
                    <button className={styles.enterButton} onClick={handleEnterClick}>
                        ENTRAR A ESTA LANDING
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingSidePage;
