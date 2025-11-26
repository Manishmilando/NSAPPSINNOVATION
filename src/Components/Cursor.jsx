import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CursorDot = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;

    const moveDot = (e) => {
      gsap.to(dot, {
        duration: 1,
        x: e.clientX,
        y: e.clientY,
        ease: 'back.out',
      });
    };

    const growDot = () => {
      gsap.to(dot, { duration: 0.4, scale: 1.8, ease: 'power3.out' });
    };

    const shrinkDot = () => {
      gsap.to(dot, { duration: 0.4, scale: 1, ease: 'power3.out' });
    };

    window.addEventListener('mousemove', moveDot);

    // Select all buttons and cards
    const hoverElements = document.querySelectorAll('button, .card');

    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', growDot);
      el.addEventListener('mouseleave', shrinkDot);
    });

    return () => {
      window.removeEventListener('mousemove', moveDot);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', growDot);
        el.removeEventListener('mouseleave', shrinkDot);
      });
    };
  }, []);

  const style = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: '#5e5e5e',
    pointerEvents: 'none',
    zIndex: 300,
    transform: 'translate(-50%, -50%) scale(1)',
  };

  return <div ref={dotRef} style={style} />;
};

export default CursorDot;
