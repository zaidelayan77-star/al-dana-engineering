import React from 'react';
import { FiAward, FiClock, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function OurAdvantagesSection() {
    const advantages = [
        {
            icon: <FiAward className="w-8 h-8 text-[#E9B10C]" />,
            title: "25+ Years Engineering Experience",
            description: "Trusted expertise since 1996 across the UAE and beyond."
        },
        {
            icon: <FaFlask className="w-8 h-8 text-[#E9B10C]" />,
            title: "ISO/IEC 17025 Accredited Laboratory",
            description: "Internationally recognized testing and calibration standards."
        },
        {
            icon: <FiClock className="w-8 h-8 text-[#E9B10C]" />,
            title: "Fast & Reliable Reporting",
            description: "Timely delivery of certified reports for your project deadlines."
        },
        {
            icon: <FiUsers className="w-8 h-8 text-[#E9B10C]" />,
            title: "Experienced Technical Team",
            description: "30+ qualified engineers and technicians dedicated to quality."
        },
        {
            icon: <FiCheckCircle className="w-8 h-8 text-[#E9B10C]" />,
            title: "Trusted by Contractors & Consultants",
            description: "Preferred partner for major government and private sector projects."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        OUR ADVANTAGES
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto">
                        Why Work With Al Dana Engineering Laboratories?
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {advantages.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start ${
                                // Center the last item if total is odd (5 items)
                                index === advantages.length - 1 && advantages.length % 3 !== 0
                                    ? "lg:col-start-2"
                                    : ""
                                }`}
                        >
                            <div className="bg-[#FFF8E1] p-4 rounded-xl mb-6 flex items-center justify-center">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}