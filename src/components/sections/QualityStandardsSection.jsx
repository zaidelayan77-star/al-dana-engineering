import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaLeaf, FaHardHat } from 'react-icons/fa';

export default function QualityStandardsSection() {
    const standards = [
        {
            icon: <FaAward className="w-10 h-10 text-white" />,
            code: "ISO 9001:2015",
            title: "Quality Management System",
            description: "Ensures consistency in our services and reinforces our commitment to customer satisfaction through effective quality management."
        },
        {
            icon: <FaLeaf className="w-10 h-10 text-white" />,
            code: "ISO 14001:2015",
            title: "Environmental Management",
            description: "Demonstrates our dedication to sustainable practices and reducing environmental impact across all our projects."
        },
        {
            icon: <FaHardHat className="w-10 h-10 text-white" />,
            code: "ISO 45001:2018",
            title: "Occupational Health & Safety",
            description: "Prioritizes the safety and well-being of our workforce, ensuring a secure and hazard-free working environment."
        }
    ];

    return (
        <section className="py-20 bg-[#1A1A1A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            INTERNATIONAL STANDARDS
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-primary">
                            Accredited Systems
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {standards.map((standard, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#262626] p-8 rounded-2xl border border-gray-800 hover:border-[#E9B10C] transition-colors duration-300 group"
                        >
                            <div className="w-20 h-20 bg-[#E9B10C] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#E9B10C]/20">
                                {standard.icon}
                            </div>

                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-white/10 text-[#E9B10C] text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                                    {standard.code}
                                </span>
                                <h3 className="text-xl font-bold text-white group-hover:text-[#E9B10C] transition-colors">
                                    {standard.title}
                                </h3>
                            </div>

                            <p className="text-gray-400 leading-relaxed text-sm">
                                {standard.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
