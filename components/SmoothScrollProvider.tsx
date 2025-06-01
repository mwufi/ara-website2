"use client";

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            infinite: false,
            orientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
            wheelMultiplier: 2,
        });

        // Get scroll value
        lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
            // You can use these values for additional scroll-based animations
            // console.log({ scroll, limit, velocity, direction, progress });
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
} 