import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiHeart, FiActivity } from 'react-icons/fi';
import { FaHardHat, FaLeaf } from 'react-icons/fa';

export default function OurCommitmentSection() {
    const commitments = [
        {
            icon: <FiShield className="w-6 h-6 text-[#E9B10C]" />,
            title: "QUALITY"
        },
        {
            icon: <FiHeart className="w-6 h-6 text-[#E9B10C]" />,
            title: "HEALTH"
        },
        {
            icon: <FaHardHat className="w-6 h-6 text-[#E9B10C]" />,
            title: "SAFETY"
        },
        {
            icon: <FaLeaf className="w-6 h-6 text-[#E9B10C]" />,
            title: "ENVIRONMENT"
        }
    ];

    const stats = [
        {
            value: "25+",
            label: "YEARS EXPERIENCE"
        },
        {
            value: "2,838+",
            label: "PROJECTS COMPLETED"
        },
        {
            value: "ISO 17025",
            label: "ISO ACCREDITED LAB"
        },
        {
            value: "30+",
            label: "ENGINEERS & SPECIALISTS"
        }
    ];

    return (
        <section>
            {/* Top Section: QHSE */}
            <div className="py-20 bg-[#F8F9FA]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                            OUR COMMITMENT
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            Quality, Health, Safety & Environment
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg max-w-3xl mx-auto mb-16">
                            Al Dana Engineering Laboratories strictly follows Quality, Health, Safety, and
                            Environmental standards in all field and laboratory operations, ensuring safe working
                            environments and accurate testing outcomes.
                        </p>
                    </motion.div>

                    {/* Icons Row */}
                    <div className="flex flex-wrapjustify-center gap-12 md:gap-20 justify-center">
                        {commitments.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center group cursor-default"
                            >
                                <div className="w-20 h-20 rounded-full border-2 border-[#E9B10C]/20 flex items-center justify-center bg-white mb-4 group-hover:border-[#E9B10C] group-hover:bg-[#FFF8E1] transition-all duration-300 shadow-sm">
                                    {item.icon}
                                </div>
                                <span className="font-bold text-gray-700 text-sm tracking-widest uppercase group-hover:text-[#E9B10C] transition-colors duration-300">
                                    {item.title}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Stats Banner */}
            <div className="bg-[#1a1a1a] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                            >
                                <div className="text-[#E9B10C] text-4xl md:text-5xl font-bold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-white/60 text-xs md:text-sm font-bold tracking-widest uppercase">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}