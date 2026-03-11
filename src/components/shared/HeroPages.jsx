
import React from "react";
import { motion } from "framer-motion";

const HeroPages = ({ image, subtitle, title, description }) => {
    return (
        <div className="relative w-full h-[80vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 38%' }}
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
                {subtitle && (
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="block text-[#E9B10C] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4"
                    >
                        {subtitle}
                    </motion.span>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
                >
                    {title}
                </motion.h1>

                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-2xl"
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default HeroPages;