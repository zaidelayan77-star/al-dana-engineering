import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle } from 'react-icons/fi';
import img1 from '../../assets/images/new-images/مختبر فحص التربة 2.png';

export default function CertificationsIntro() {
    const { t } = useTranslation();

    const points = [
        t('certs_intro.points.p1'),
        t('certs_intro.points.p2'),
        t('certs_intro.points.p3'),
        t('certs_intro.points.p4')
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-4">
                            {t('certs_intro.label')}
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary leading-tight">
                            {t('certs_intro.title')}
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed mb-8">
                            {t('certs_intro.desc')}
                        </p>

                        <div className="space-y-4">
                            {points.map((point, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <FiCheckCircle className="text-[#E9B10C] text-xl flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{point}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={img1}
                                alt={t('certs_intro.image_alt')}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <span className="block text-4xl font-bold text-[#E9B10C] mb-2">{t('certs_intro.compliance.value')}</span>
                                <span className="text-lg font-medium opacity-90">{t('certs_intro.compliance.label')}</span>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#E9B10C] rounded-full opacity-20 blur-2xl -z-10"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
