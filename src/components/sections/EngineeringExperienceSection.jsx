import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function EngineeringExperienceSection() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative Line */}
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full mb-8"></div>

                    {/* Main Title */}
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        {t('engineering_exp.title')}
                    </h2>

                    {/* Content */}
                    <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed">
                        <p>
                            {t('engineering_exp.p1')}
                        </p>
                        <p>
                            {t('engineering_exp.p2')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}