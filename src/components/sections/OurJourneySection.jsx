import React from 'react';
import { motion } from 'framer-motion';

export default function OurJourneySection() {
    const milestones = [
        {
            year: "1996",
            title: "Company Founded",
            description: "Establishment of Al Dana as a specialized geotechnical engineering laboratory."
        },
        {
            year: "2003",
            title: "Geotechnical Expansion",
            description: "Expanded field and laboratory geotechnical services to support major developments."
        },
        {
            year: "2013",
            title: "Accreditation Achievement",
            description: "Achieved ISO/IEC 17025 accreditation for testing and calibration."
        },
        {
            year: "2017",
            title: "Infrastructure Projects",
            description: "Supported major UAE infrastructure and energy sector projects."
        },
        {
            year: "Today",
            title: "Growth & Innovation",
            description: "Continuous investment in technology, talent, and service capabilities."
        }
    ];

    return (
        <section className="py-20 bg-[#1a1a1a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        OUR JOURNEY
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        History & Milestones
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Vertical Line (Desktop) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#E9B10C]/30 hidden lg:block"></div>

                    {/* Left Vertical Line (Mobile) */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#E9B10C]/30 block lg:hidden"></div>

                    <div className="space-y-12 relative">
                        {milestones.map((item, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="flex items-center w-full relative min-h-[120px]"
                                >
                                    {/* LEFT SIDE */}
                                    <div className="hidden lg:flex w-[calc(50%-12px)] justify-end pr-0">
                                        {isLeft ? (
                                            <div className="w-full max-w-md relative">
                                                <div className="bg-[#262626] p-8 rounded-xl border border-white/5 hover:border-[#E9B10C]/50 transition-colors duration-300 group">
                                                    <div className="flex flex-col items-end text-right">
                                                        <span className="text-[#E9B10C] font-bold text-xl mb-2 block font-mono">{item.year}</span>
                                                        <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                                    </div>
                                                    {/* Right connector: from card right edge → center dot */}
                                                    <div className="absolute top-1/2 -translate-y-1/2 -right-[12px] w-[12px] h-px bg-[#E9B10C]/60 group-hover:bg-[#E9B10C] transition-colors"></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full" /> // Empty placeholder
                                        )}
                                    </div>

                                    {/* Center Dot */}
                                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#E9B10C] bg-[#1a1a1a] z-10 items-center justify-center flex-shrink-0">
                                        <div className="w-1.5 h-1.5 bg-[#E9B10C] rounded-full"></div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className="hidden lg:flex w-[calc(50%-12px)] justify-start pl-0">
                                        {!isLeft ? (
                                            <div className="w-full max-w-md relative">
                                                <div className="bg-[#262626] p-8 rounded-xl border border-white/5 hover:border-[#E9B10C]/50 transition-colors duration-300 group">
                                                    <div className="flex flex-col items-start text-left">
                                                        <span className="text-[#E9B10C] font-bold text-xl mb-2 block font-mono">{item.year}</span>
                                                        <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                                    </div>
                                                    {/* Left connector: from center dot → card left edge */}
                                                    <div className="absolute top-1/2 -translate-y-1/2 -left-[12px] w-[12px] h-px bg-[#E9B10C]/60 group-hover:bg-[#E9B10C] transition-colors"></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full" /> // Empty placeholder
                                        )}
                                    </div>

                                    {/* ─── Mobile Layout ─── */}
                                    <div className="flex lg:hidden items-start w-full pl-12">
                                        <div className="absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#E9B10C] bg-[#1a1a1a] z-10 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-[#E9B10C] rounded-full"></div>
                                        </div>
                                        <div className="bg-[#262626] p-6 rounded-xl border border-white/5 w-full relative">
                                            {/* Mobile connector */}
                                            <div className="absolute top-1/2 -translate-y-1/2 -left-[12px] w-[12px] h-px bg-[#E9B10C]/60"></div>
                                            <span className="text-[#E9B10C] font-bold text-xl mb-2 block font-mono">{item.year}</span>
                                            <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}