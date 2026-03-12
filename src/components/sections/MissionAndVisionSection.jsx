import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiTarget, FiEye } from 'react-icons/fi';

export default function MissionAndVisionSection() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-white">
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
                        {t('mission_vision.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        {t('mission_vision.title')}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col items-start"
                    >
                        <div className="w-16 h-16 bg-[#FFF8E1] rounded-2xl flex items-center justify-center mb-6">
                            <FiTarget className="w-8 h-8 text-[#E9B10C]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('mission_vision.mission.title')}</h3>
                        <p className="text-gray-500 leading-relaxed text-lg">
                            {t('mission_vision.mission.desc')}
                        </p>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col items-start"
                    >
                        <div className="w-16 h-16 bg-[#FFF8E1] rounded-2xl flex items-center justify-center mb-6">
                            <FiEye className="w-8 h-8 text-[#E9B10C]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('mission_vision.vision.title')}</h3>
                        <p className="text-gray-500 leading-relaxed text-lg">
                            {t('mission_vision.vision.desc')}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}