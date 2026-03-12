import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function OurTrackRecord() {
    const { t } = useTranslation();
    
    const stats = [
        {
            value: "1996",
            prefix: "",
            label: t('track_record.stats.established'),
            isSpecial: true
        },
        {
            value: "4000+",
            label: t('track_record.stats.projects')
        },
        {
            value: "ISO 17025",
            label: t('track_record.stats.accredited')
        },
        {
            value: "30+",
            label: t('track_record.stats.employees')
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
                        <span className="text-[#666666] font-bold text-xs tracking-[0.2em] uppercase">
                            <span className="text-gray-400">{t('track_record.label')}</span>
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
                        {t('track_record.title')}
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

                            <div className="h-0.5 w-12 bg-gray-700 mb-4 mx-auto"></div>

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