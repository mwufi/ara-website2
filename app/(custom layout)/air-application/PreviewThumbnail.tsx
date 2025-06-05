import { useState } from "react";
import { motion } from "framer-motion";

// Preview Component for cursor-following thumbnails
export default function PreviewThumbnail({
    href,
    preview,
    children
}: {
    href: string;
    preview: string;
    children: React.ReactNode;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 transition-colors cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
            >
                {children}
            </a>

            {isHovered && (
                <div
                    className="fixed pointer-events-none z-50"
                    style={{
                        left: mousePosition.x + 15,
                        top: mousePosition.y - 10,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden"
                    >
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-48 h-32 object-cover"
                            onError={(e) => {
                                // Fallback for missing images
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDE5MiAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxwYXRoIGQ9Ik04NiA2NEw5NiA3NEw4NiA4NEw3NiA3NEw4NiA2NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHR0ZXh0IHg9Ijk2IiB5PSI2OCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2Mzc0OEEiPlByZXZpZXc8L3RleHQ+Cjwvc3ZnPgo=';
                            }}
                        />
                    </motion.div>
                </div>
            )}
        </>
    );
}
