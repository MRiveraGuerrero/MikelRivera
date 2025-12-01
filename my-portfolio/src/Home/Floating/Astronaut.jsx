import { useState, useEffect } from 'react';
import styles from './Astronaut.module.css';

export default function Astronaut({ src, className, alt }) {
    const [following, setFollowing] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!following) return;

        const handleMouseMove = (e) => {
            // Offset slightly so it doesn't cover the cursor exactly
            setPosition({ x: e.clientX + 20, y: e.clientY + 20 });
        };

        const handleClick = () => {
            // If we click anywhere while following, stop following
            setFollowing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [following]);

    const handleClick = (e) => {
        e.stopPropagation();
        if (!following) {
            // Start following
            // Set initial position to current mouse to avoid jump
            setPosition({ x: e.clientX, y: e.clientY });
            setFollowing(true);
        }
    };

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${styles.astronautInteract} ${following ? styles.following : ''}`}
            onClick={handleClick}
            style={following ? { left: position.x, top: position.y, transform: 'none' } : {}}
        />
    );
}
