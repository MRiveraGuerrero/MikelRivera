import React from 'react';
import styles from '../Home.module.css';

const TabsNavigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'home', label: 'INICIO', icon: '🎬' },
        { id: 'shop', label: 'TIENDA', icon: '🔥' },
        { id: 'about', label: 'CREW', icon: '👥' },
        { id: 'contact', label: 'CONTACTO', icon: '📡' },
    ];

    return (
        <div className={styles.tabsNavigation}>
            <nav className={styles.tabsList}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className={styles.tabIcon}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default TabsNavigation;
