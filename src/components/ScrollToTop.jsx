import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp as ArrowIcon } from "react-icons/fi";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        // Visibility Check
        if (window.scrollY >= 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        // Progress Calculation
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollTop / docHeight;
        setScrollProgress(scrollPercent);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // SVG Circle configuration
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - scrollProgress * circumference;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-50 cursor-pointer group"
                    onClick={scrollToTop}
                >
                    <div className="relative flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg transition-transform duration-300 transform group-hover:-translate-y-1">
                        {/* Progress Circle Background */}
                        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90 pointer-events-none">
                            <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                stroke="#f3f4f6" // Light gray track
                                strokeWidth="4"
                                fill="none"
                            />
                            <circle
                                cx="28"
                                cy="28"
                                r={radius}
                                stroke="#E9B10C" // Gold progress
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-100 ease-out"
                            />
                        </svg>

                        {/* Button Icon */}
                        <div className="w-10 h-10 bg-[#E9B10C] rounded-full flex items-center justify-center text-white z-10 hover:bg-[#c4950a] transition-colors">
                            <ArrowIcon className="w-5 h-5" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
