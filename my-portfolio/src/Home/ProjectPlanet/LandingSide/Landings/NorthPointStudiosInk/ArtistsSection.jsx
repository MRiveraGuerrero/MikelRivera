import React, { useState } from 'react';
import styles from './ArtistsSection.module.css';

const artists = [
    {
        id: 1,
        name: 'ALEX "INK" RIVERA',
        style: 'Realismo & Blackwork',
        image: 'https://images.unsplash.com/photo-1596627991358-7c1113981244?q=80&w=1974&auto=format&fit=crop', // Tattoo artist working or portrait
        bio: 'Con más de 10 años de experiencia, Alex se especializa en retratos hiperrealistas y composiciones complejas en blackwork. Su atención al detalle es obsesiva, buscando siempre la perfección en cada trazo.'
    },
    {
        id: 2,
        name: 'SARAH VOID',
        style: 'Dotwork & Geometría',
        image: 'https://images.unsplash.com/photo-1605218427368-35b0f996d916?q=80&w=1974&auto=format&fit=crop', // Female tattoo artist
        bio: 'Sarah fusiona la precisión matemática de la geometría sagrada con la delicadeza del dotwork. Sus diseños son viajes espirituales plasmados en la piel, creando patrones hipnóticos que fluyen con la anatomía.'
    },
    {
        id: 3,
        name: 'MARCUS "GHOST"',
        style: 'Neotradicional & Color',
        image: 'https://images.unsplash.com/photo-1585110396000-c9285745321c?q=80&w=1974&auto=format&fit=crop', // Male tattoo artist with tattoos
        bio: 'Marcus trae la vieja escuela al futuro. Sus piezas neotradicionales destacan por líneas sólidas y una paleta de colores vibrante pero oscura, perfecta para quienes buscan impacto visual duradero.'
    }
];

const ArtistsSection = () => {
    const [selectedArtist, setSelectedArtist] = useState(null);

    return (
        <section className={styles.artistsContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>MAESTROS DE LA TINTA</h2>
                <p className={styles.subtitle}>CONOCE A LOS ARTISTAS DETRÁS DE LA OBRA</p>
            </div>

            <div className={styles.grid}>
                {artists.map((artist) => (
                    <div
                        key={artist.id}
                        className={styles.card}
                        onClick={() => setSelectedArtist(artist)}
                    >
                        <img src={artist.image} alt={artist.name} className={styles.image} />
                        <div className={styles.info}>
                            <h3 className={styles.name}>{artist.name}</h3>
                            <p className={styles.style}>{artist.style}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Overlay */}
            <div className={`${styles.overlay} ${selectedArtist ? styles.active : ''}`}>
                {selectedArtist && (
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={() => setSelectedArtist(null)}>×</button>
                        <img src={selectedArtist.image} alt={selectedArtist.name} className={styles.modalImage} />
                        <div className={styles.modalContent}>
                            <h2 className={styles.modalName}>{selectedArtist.name}</h2>
                            <p className={styles.modalStyle}>{selectedArtist.style}</p>
                            <p className={styles.modalBio}>{selectedArtist.bio}</p>
                            <button className={styles.modalCta}>RESERVAR CITA</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ArtistsSection;
