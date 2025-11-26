import React, { useRef } from 'react';
import gsap from 'gsap';

const width = 1400;
const height = 220;
const start = { x: 60, y: height / 2 };
const end = { x: width - 60, y: height / 2 };
const CENTER = { x: width / 2, y: height / 2 };

const PULL_THRESHOLD = 220;
const GRAB_THRESHOLD = 30;

function CurveSVGManipulation() {
    const pathRef = useRef(null);
    const isDragging = useRef(false);

    // Initial flat line path
    const initialPath = `M ${start.x} ${start.y} Q ${CENTER.x} ${CENTER.y} ${end.x} ${end.y}`;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const distFromCenter = Math.sqrt((x - CENTER.x) ** 2 + (y - CENTER.y) ** 2);

        if (!isDragging.current) {
            // Check if close enough to grab
            if (Math.abs(y - CENTER.y) < GRAB_THRESHOLD) {
                isDragging.current = true;
            }
        }

        if (isDragging.current) {
            // If pulled too far, release
            if (distFromCenter > PULL_THRESHOLD) {
                releaseString();
            } else {
                // Animate path to follow mouse
                const newPath = `M ${start.x} ${start.y} Q ${x} ${y} ${end.x} ${end.y}`;
                gsap.to(pathRef.current, {
                    attr: { d: newPath },
                    duration: 0.2,
                    ease: "power3.out",
                });
            }
        }
    };

    const handleMouseLeave = () => {
        if (isDragging.current) {
            releaseString();
        }
    };

    const releaseString = () => {
        isDragging.current = false;
        gsap.to(pathRef.current, {
            attr: { d: initialPath },
            duration: 1.5,
            ease: "elastic.out(1, 0.2)",
        });
    };

    return (
        <div style={{ width, margin: '0 auto', position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ display: 'block', background: 'transparent', pointerEvents: 'auto' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <path
                    ref={pathRef}
                    d={initialPath}
                    stroke="#111"
                    strokeWidth="1"
                    fill="none"
                />
            </svg>
        </div>
    );
}

export default CurveSVGManipulation;
