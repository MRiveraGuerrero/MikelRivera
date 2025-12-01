import { useState, useEffect, useRef } from 'react';
import styles from './Astronaut.module.css';

export default function Astronaut({ src, className, alt }) {
    const [following, setFollowing] = useState(false);

    // Refs for animation loop
    const posRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const requestRef = useRef();
    const imgRef = useRef(null);

    // Animation loop for smooth following
    useEffect(() => {
        if (!following) return;

        const animate = () => {
            // Linear interpolation (Lerp)
            // current = current + (target - current) * factor
            const dx = targetRef.current.x - posRef.current.x;
            const dy = targetRef.current.y - posRef.current.y;

            // 0.08 factor gives a nice fluid delay
            posRef.current.x += dx * 0.08;
            posRef.current.y += dy * 0.08;

            // Apply to DOM directly for performance
            if (imgRef.current) {
                imgRef.current.style.left = `${posRef.current.x}px`;
                imgRef.current.style.top = `${posRef.current.y}px`;

                // Optional: Rotate slightly based on movement X
                const rotation = dx * 0.1;
                imgRef.current.style.transform = `rotate(${Math.max(-20, Math.min(20, rotation))}deg)`;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, [following]);

    // Event listeners
    useEffect(() => {
        if (!following) return;

        const handleMouseMove = (e) => {
            // Target is mouse position (centered on image roughly)
            targetRef.current = { x: e.clientX - 50, y: e.clientY - 50 };
        };

        const handleClick = () => {
            setFollowing(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [following]);

    const handleAstronautClick = (e) => {
        e.stopPropagation();
        if (!following) {
            const rect = e.target.getBoundingClientRect();
            // Initialize position to current element position
            posRef.current = { x: rect.left, y: rect.top };
            // Initial target is also current position to avoid jump
            targetRef.current = { x: rect.left, y: rect.top };

            setFollowing(true);
        }
    };

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`${!following ? className : ''} ${styles.astronautInteract} ${following ? styles.following : ''}`}
            onClick={handleAstronautClick}
        />
    );
}
