import { useState, useEffect, useRef } from 'react';
import styles from './Astronaut.module.css';

export default function Astronaut({ src, className, alt }) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(null);
    const imgRef = useRef(null);
    const offsetRef = useRef({ x: 0, y: 0 });

    // Handle dragging
    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (clientX, clientY) => {
            setPosition({
                x: clientX - offsetRef.current.x,
                y: clientY - offsetRef.current.y
            });
        };

        const handleMouseMove = (e) => {
            handleMove(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        };

        const handleEnd = () => {
            setIsDragging(false);
            // Position is maintained after drag ends
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleEnd);
        window.addEventListener('touchcancel', handleEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('touchcancel', handleEnd);
        };
    }, [isDragging]);

    const handleStart = (clientX, clientY) => {
        const rect = imgRef.current.getBoundingClientRect();

        // Calculate offset from click/touch point to element's top-left
        offsetRef.current = {
            x: clientX - rect.left,
            y: clientY - rect.top
        };

        setIsDragging(true);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleStart(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
        e.stopPropagation();
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
    };

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`${position ? '' : className} ${styles.astronautInteract} ${isDragging ? styles.dragging : ''} ${position ? styles.positioned : ''}`}
            style={position ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute',
                zIndex: 9999
            } : {}}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        />
    );
}
