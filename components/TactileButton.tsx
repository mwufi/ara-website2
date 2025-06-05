'use client'

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TactileButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function TactileButton({
    children,
    onClick,
    className = "",
    disabled = false
}: TactileButtonProps) {
    return (
        <motion.button
            className={`${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
        >
            {children}
        </motion.button>
    );
} 