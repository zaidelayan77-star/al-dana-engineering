import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function WhatWeDoSection() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                        {t('what_we_do.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('what_we_do.title')}
                    </h2>

                    {/* Divider Line */}
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto mb-8 rounded-full"></div>

                    <div className="space-y-6 text-gray-500 leading-relaxed text-lg">
                        <p>
                            {t('what_we_do.p1')}
                        </p>
                        <p>
                            {t('what_we_do.p2')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}