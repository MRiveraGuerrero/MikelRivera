import { useState } from 'react';
import styles from './Satellite.module.css';

export default function Satellite({ src, className, alt }) {
    const [tuning, setTuning] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setTuning(!tuning);
    };

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${styles.satelliteInteract} ${tuning ? styles.tuning : ''}`}
            onClick={handleClick}
        />
    );
}
