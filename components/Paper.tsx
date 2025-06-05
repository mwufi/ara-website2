'use client'

import { ReactNode, useRef, MouseEvent } from 'react';

interface PaperProps {
    children: ReactNode;
    className?: string;
    intensity?: number; // How much the paper responds to mouse movement (0-1)
}

export default function Paper({ children, className = '', intensity = 0.3 }: PaperProps) {
    const paperRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!paperRef.current) return;

        const rect = paperRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / rect.height) * intensity * 10;
        const rotateY = (mouseX / rect.width) * intensity * -10;

        paperRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(0)
    `;
    };

    const handleMouseLeave = () => {
        if (!paperRef.current) return;
        paperRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    };

    return (
        <div
            ref={paperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`
        bg-white
        rounded-2xl
        shadow-[0_4px_16px_rgba(0,0,0,0.08)]
        border
        border-gray-100
        transition-all
        duration-300
        ease-out
        hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]
        transform-gpu
        ${className}
      `}
            style={{
                backgroundImage: `
          linear-gradient(45deg, transparent 24%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 76%, transparent 77%),
          linear-gradient(-45deg, transparent 24%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1) 76%, transparent 77%)
        `,
                backgroundSize: '30px 30px',
            }}
        >
            {children}
        </div>
    );
} 