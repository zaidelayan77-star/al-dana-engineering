import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaLandmark, FaBuilding, FaGasPump, FaShieldAlt, FaIndustry, FaGlobeAmericas } from 'react-icons/fa';

export default function SectorsSection() {
    const { t } = useTranslation();

    const sectors = [
        {
            icon: <FaLandmark className="w-8 h-8 text-[#E9B10C]" />,
            title: t('sectors.items.infra')
        },
        {
            icon: <FaBuilding className="w-8 h-8 text-[#E9B10C]" />,
            title: t('sectors.items.building')
        },
        {
            icon: <FaGasPump className="w-8 h-8 text-[#E9B10C]" />,
            title: t('sectors.items.oil_gas')
        },
        {
            icon: <FaShieldAlt className="w-8 h-8 text-[#E9B10C]" />,
            title: t('sectors.items.gov')
        },
        {
            icon: <FaIndustry className="w-8 h-8 text-[#E9B10C]" />,
            title: t('sectors.items.industrial')
        },
        {
            icon: <FaGlobeAmericas className="w-8 h-8 text-[#E9B10C]" />,
            title: t('sectors.items.geophysical')
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
                    className="text-center mb-16"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        {t('sectors.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('sectors.title')}
                    </h2>
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full"></div>
                </motion.div>

                {/* Sectors Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
                >
                    {sectors.map((sector, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group border border-transparent hover:border-gray-100"
                        >
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {sector.icon}
                            </div>

                            <h3 className="text-gray-900 font-bold text-sm md:text-base leading-tight group-hover:text-[#E9B10C] transition-colors duration-300">
                                {sector.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}