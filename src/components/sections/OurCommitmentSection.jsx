import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiShield, FiHeart } from 'react-icons/fi';
import { FaHardHat, FaLeaf } from 'react-icons/fa';

export default function OurCommitmentSection() {
    const { t } = useTranslation();

    const commitments = [
        {
            icon: <FiShield className="w-6 h-6 text-[#E9B10C]" />,
            title: t('our_commitment.items.quality')
        },
        {
            icon: <FiHeart className="w-6 h-6 text-[#E9B10C]" />,
            title: t('our_commitment.items.health')
        },
        {
            icon: <FaHardHat className="w-6 h-6 text-[#E9B10C]" />,
            title: t('our_commitment.items.safety')
        },
        {
            icon: <FaLeaf className="w-6 h-6 text-[#E9B10C]" />,
            title: t('our_commitment.items.environment')
        }
    ];

    const stats = [
        {
            value: "25+",
            label: t('our_commitment.stats.exp')
        },
        {
            value: "2,838+",
            label: t('our_commitment.stats.projects')
        },
        {
            value: "ISO 17025",
            label: t('our_commitment.stats.iso')
        },
        {
            value: "30+",
            label: t('our_commitment.stats.team')
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
                            {t('our_commitment.label')}
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('our_commitment.title')}
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-lg max-w-3xl mx-auto mb-16">
                            {t('our_commitment.desc')}
                        </p>
                    </motion.div>

                    {/* Icons Row */}
                    <div className="flex flex-wrap gap-12 md:gap-20 justify-center">
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