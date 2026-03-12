import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiAward, FiUsers, FiTarget, FiTool, FiClock } from 'react-icons/fi';

export default function WhyChooseUsSection() {
    const { t } = useTranslation();

    const reasons = [
        {
            icon: <FiAward className="w-8 h-8 text-[#E9B10C]" />,
            title: t('why_choose_us.items.iso')
        },
        {
            icon: <FiUsers className="w-8 h-8 text-[#E9B10C]" />,
            title: t('why_choose_us.items.team')
        },
        {
            icon: <FiTarget className="w-8 h-8 text-[#E9B10C]" />,
            title: t('why_choose_us.items.results')
        },
        {
            icon: <FiTool className="w-8 h-8 text-[#E9B10C]" />,
            title: t('why_choose_us.items.equip')
        },
        {
            icon: <FiClock className="w-8 h-8 text-[#E9B10C]" />,
            title: t('why_choose_us.items.reporting')
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
        <section className="py-20 bg-[#1a1a1a]">
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
                        {t('why_choose_us.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {t('why_choose_us.title')}
                    </h2>
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full"></div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
                >
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-[#242424] p-8 rounded-2xl border border-gray-800 hover:border-[#E9B10C]/50 transition-colors duration-300 flex flex-col items-center text-center group h-full justify-center"
                        >
                            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>

                            <h3 className="text-white font-medium leading-relaxed">
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}