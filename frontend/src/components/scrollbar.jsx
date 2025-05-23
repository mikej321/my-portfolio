import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import '../styles/scrollbar.css';

export default function Scrollbar({ children, className }) {
    const containerRef = useRef(null);
    const thumbRef = useRef(null);

    // Calculate and set thumb height based on content size
    const updateThumbHeight = useCallback(() => {
        const container = containerRef.current;
        const thumb = thumbRef.current;
        const { clientHeight, scrollHeight } = container;
        const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
        thumb.style.height = `${thumbHeight}px`;
    }, [])

    // Update thumb position on scroll
    const updateThumbPosition = () => {
        const container = containerRef.current;
        const thumb = thumbRef.current;
        const scrollTop = container.scrollTop;
        const { scrollHeight, clientHeight } = container;
        const maxThumbTop = clientHeight - thumb.offsetHeight;
        const thumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop;
        gsap.to(thumb, {
            y: thumbTop,
            ease: "power1.out",
            duration: 0.2
        })
    }

    // Set up scroll and resize listeners
    useEffect(() => {
        const container = containerRef.current;
        updateThumbHeight();
        updateThumbPosition();

        container.addEventListener('scroll', updateThumbPosition);
        window.addEventListener('resize', updateThumbHeight);

        return () => {
            container.removeEventListener('scroll', updateThumbPosition);
            window.removeEventListener('resize', updateThumbHeight);
        };
    }, [updateThumbHeight]);

    // Enable thumb dragging
    useEffect(() => {
        const container = containerRef.current;
        const thumb = thumbRef.current;
        let isDragging = false;
        let startY;
        let startScrollTop;

        const onMouseDown = (e) => {
            isDragging = true;
            startY = e.clientY;
            startScrollTop = container.scrollTop;
            document.body.classList.add('no-select');
        }

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const delta = e.clientY - startY;
            const { scrollHeight, clientHeight } = container;
            const maxScroll = scrollHeight - clientHeight;
            const trackHeight = clientHeight - thumb.offsetHeight;
            const scrollDelta = (delta / trackHeight) * maxScroll;
            container.scrollTop = startScrollTop + scrollDelta;
        }

        const onMouseUp = () => {
            isDragging = false;
            document.body.classList.remove('no-select');
        }

        thumb.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        return () => {
            thumb.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }, []);

    return (
        <div className={`custom-scrollbar-container ${className || ""}`} ref={containerRef}>
            <div className="custom-scrollbar-content">{children}</div>
            <div className="custom-scrollbar-track">
                <div className="custom-scrollbar-thumb" ref={thumbRef} />
            </div>
        </div>
    )
}