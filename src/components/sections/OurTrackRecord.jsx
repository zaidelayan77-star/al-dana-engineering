import React from 'react';
import { motion } from 'framer-motion';

export default function OurTrackRecord() {
    const stats = [
        {
            value: "1996",
            prefix: "Since",
            label: "YEARS OF EXPERIENCE",
            isSpecial: true
        },
        {
            value: "4000+",
            label: "PROJECTS COMPLETED"
        },
        {
            value: "ISO 17,025",
            label: "ISO/IEC ACCREDITED"
        },
        {
            value: "30+",
            label: "ENGINEERS & TECHNICIANS"
        }
    ];

    return (
        <section className="py-20 bg-[#1A1A1A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center space-x-4 mb-4"
                    >
                        <div className="h-px w-12 bg-[#E9B10C]"></div>
                        <span className="text-[#666666] font-bold text-xs tracking-[0.2em] uppercase"> {/* keeping text-gray-500 equivalent color for dark bg, maybe a bit lighter */}
                            {/* Wait, on dark bg, gray text needs to be lighter. The screenshot has it quite dark but legible. Let's try lighter gray */}
                            <span className="text-gray-400">OUR TRACK RECORD</span>
                        </span>
                        <div className="h-px w-12 bg-[#E9B10C]"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold text-white font-primary"
                    >
                        Experience & Achievements
                    </motion.h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="mb-2 flex items-baseline justify-center">
                                {stat.isSpecial && (
                                    <span className="text-[#E9B10C] font-bold text-lg mr-2 self-center">
                                        {stat.prefix}
                                    </span>
                                )}
                                <span className="text-4xl md:text-5xl font-bold text-[#E9B10C]">
                                    {stat.value}
                                </span>
                            </div>

                            <div className="h-0.5 w-12 bg-gray-700 mb-4 mx-auto"></div> {/* Optional divider line, matching style generally seen but not explicit in shot, removing if not needed. Screenshot doesn't clearly show a line but spacing is clear. */}

                            <p className="text-gray-400 text-sm font-bold tracking-[0.1em] uppercase">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}