import { useState } from 'react';
import styles from './Asteroid.module.css';

export default function Asteroid({ src, className, alt }) {
    const [state, setState] = useState('floating'); // floating, exploding, gone
    const [pos, setPos] = useState(null);

    const handleClick = (e) => {
        e.stopPropagation();

        // Freeze position for explosion
        const rect = e.target.getBoundingClientRect();
        setPos({ top: rect.top, left: rect.left, width: rect.width });

        setState('exploding');

        setTimeout(() => {
            setState('gone');
            // Respawn logic
            setTimeout(() => {
                setState('floating');
                setPos(null);
            }, 4000);
        }, 800);
    };

    if (state === 'gone') return null;

    const isExploding = state === 'exploding';

    // When exploding, switch to fixed positioning to "detach" from the floating animation
    // and ensure the explosion happens exactly where the user clicked.
    const style = isExploding && pos ? {
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        width: pos.width,
        margin: 0,
        transform: 'none',
        zIndex: 1000
    } : {};

    return (
        <img
            src={src}
            alt={alt}
            // We remove the original className during explosion to stop the float animation interference
            // but we manually preserve width via inline style
            className={`${!isExploding ? className : ''} ${styles.asteroidInteract} ${isExploding ? styles.exploding : ''}`}
            onClick={handleClick}
            style={style}
        />
    );
}
