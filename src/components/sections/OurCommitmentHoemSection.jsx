import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaMicroscope, FaTools, FaTachometerAlt, FaGlobe } from 'react-icons/fa';

export default function OurCommitmentHoemSection() {
    const { t } = useTranslation();
    
    const items = [
        {
            icon: <FaMicroscope size={32} />,
            title: t('our_capabilities.items.instruments')
        },
        {
            icon: <FaTools size={32} />,
            title: t('our_capabilities.items.rigs')
        },
        {
            icon: <FaTachometerAlt size={32} />,
            title: t('our_capabilities.items.calibrated')
        },
        {
            icon: <FaGlobe size={32} />,
            title: t('our_capabilities.items.compliance')
        }
    ];

    return (
        <section className="py-20 bg-[#222222] text-white">
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
                        <div className="h-0.5 w-12 bg-[#E9B10C]"></div>
                        <span className="text-gray-400 font-bold text-xs tracking-[0.2em] uppercase">
                            {t('our_capabilities.label')}
                        </span>
                        <div className="h-0.5 w-12 bg-[#E9B10C]"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-6 font-primary"
                    >
                        {t('our_capabilities.title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed"
                    >
                        {t('our_capabilities.description')}
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-[#2A2A2A] p-8 rounded-lg shadow-lg border border-gray-800 hover:border-[#E9B10C] transition-all duration-300 flex flex-col items-center justify-center text-center h-48 group"
                        >
                            <div className="text-[#E9B10C] mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>

                            <h3 className="text-white font-bold text-sm tracking-wide group-hover:text-[#E9B10C] transition-colors">
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}