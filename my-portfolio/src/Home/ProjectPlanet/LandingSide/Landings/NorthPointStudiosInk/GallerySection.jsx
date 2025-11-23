import React, { useState } from 'react';
import styles from './GallerySection.module.css';

const works = [
    { id: 1, category: 'realism', src: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop' }, // Arm tattoo
    { id: 2, category: 'blackwork', src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2070&auto=format&fit=crop' }, // Dark studio/tattoo vibe
    { id: 3, category: 'traditional', src: 'https://images.unsplash.com/photo-1590246130796-54238a29d7a6?q=80&w=1974&auto=format&fit=crop' }, // Back tattoo
    { id: 4, category: 'realism', src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=1974&auto=format&fit=crop' }, // Detailed arm
    { id: 5, category: 'dotwork', src: 'https://images.unsplash.com/photo-1560707303-4e980c5c8b86?q=80&w=1974&auto=format&fit=crop' }, // Geometric/Dotwork
    { id: 6, category: 'blackwork', src: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1974&auto=format&fit=crop' }, // Dark sleeve
    { id: 7, category: 'traditional', src: 'https://images.unsplash.com/photo-1598371838397-383398351154?q=80&w=1974&auto=format&fit=crop' }, // Traditional style
    { id: 8, category: 'dotwork', src: 'https://images.unsplash.com/photo-1603470475666-5a3a48c18c29?q=80&w=1974&auto=format&fit=crop' }, // Fine line/dotwork
    { id: 9, category: 'realism', src: 'https://images.unsplash.com/photo-1542317854-f9596aa56fd9?q=80&w=2070&auto=format&fit=crop' }, // Portrait/Realism
    { id: 10, category: 'blackwork', src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1974&auto=format&fit=crop' }, // Hand tattoo
];

const categories = ['all', 'realism', 'blackwork', 'traditional', 'dotwork'];

const GallerySection = () => {
    const [filter, setFilter] = useState('all');
    const [lightboxImg, setLightboxImg] = useState(null);

    const filteredWorks = filter === 'all'
        ? works
        : works.filter(work => work.category === filter);

    return (
        <section className={styles.galleryContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>PORTFOLIO</h2>
                <div className={styles.filters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.masonryGrid}>
                {filteredWorks.map((work) => (
                    <div
                        key={work.id}
                        className={styles.gridItem}
                        onClick={() => setLightboxImg(work.src)}
                    >
                        <img src={work.src} alt="Tattoo Work" className={styles.gridImage} />
                        <div className={styles.itemOverlay}>
                            <span className={styles.zoomIcon}>+</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            <div className={`${styles.lightbox} ${lightboxImg ? styles.active : ''}`} onClick={() => setLightboxImg(null)}>
                {lightboxImg && (
                    <>
                        <button className={styles.closeLightbox}>×</button>
                        <img src={lightboxImg} alt="Full size" className={styles.lightboxImage} onClick={(e) => e.stopPropagation()} />
                    </>
                )}
            </div>
        </section>
    );
};

export default GallerySection;
