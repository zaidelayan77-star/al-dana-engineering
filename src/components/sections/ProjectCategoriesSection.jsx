import React from 'react';
import { motion } from 'framer-motion';
import { FaLandmark, FaBuilding, FaIndustry, FaGasPump, FaShieldAlt, FaCity } from 'react-icons/fa';

export default function ProjectCategoriesSection() {
    const categories = [
        {
            icon: <FaLandmark className="w-8 h-8 text-[#E9B10C]" />,
            title: "Infrastructure Projects"
        },
        {
            icon: <FaCity className="w-8 h-8 text-[#E9B10C]" />,
            title: "High-rise Buildings"
        },
        {
            icon: <FaIndustry className="w-8 h-8 text-[#E9B10C]" />,
            title: "Industrial Facilities"
        },
        {
            icon: <FaGasPump className="w-8 h-8 text-[#E9B10C]" />,
            title: "Oil & Gas Developments"
        },
        {
            icon: <FaShieldAlt className="w-8 h-8 text-[#E9B10C]" />,
            title: "Government Projects"
        },
        {
            icon: <FaBuilding className="w-8 h-8 text-[#E9B10C]" />,
            title: "Commercial Construction"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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
                    className="mb-12"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        PROJECT CATEGORIES
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        Types of Projects We Support
                    </h2>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                >
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group border border-transparent hover:border-gray-100 h-full justify-center"
                        >
                            <div className="w-16 h-16 bg-[#FFF8E1] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                {category.icon}
                            </div>

                            <h3 className="text-gray-900 font-bold text-sm md:text-base leading-tight group-hover:text-[#E9B10C] transition-colors duration-300">
                                {category.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}