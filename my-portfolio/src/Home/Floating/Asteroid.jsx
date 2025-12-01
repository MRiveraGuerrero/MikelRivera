import { useState } from 'react';
import styles from './Asteroid.module.css';

export default function Asteroid({ src, className, alt }) {
    const [exploded, setExploded] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent triggering other things
        setExploded(true);

        // Optional: Reset after animation to allow re-exploding or just leave it gone
        setTimeout(() => {
            setExploded(false);
        }, 5000); // Reappears after 5 seconds
    };

    if (exploded) {
        // We keep the element but apply the exploding class
        // Or we could render null, but we want the animation to play out
    }

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${styles.asteroidInteract} ${exploded ? styles.exploding : ''}`}
            onClick={handleClick}
        />
    );
}
