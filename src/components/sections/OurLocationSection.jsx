import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function OurLocationSection() {
    const { t } = useTranslation();

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm uppercase tracking-widest mb-2">
                        {t('our_location.label')}
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {t('our_location.title')}
                    </h2>
                </motion.div>

                {/* Map Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg border border-gray-100"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3634.7370668763347!2d54.504865285007014!3d24.355650084294425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDIxJzIwLjMiTiA1NMKwMzAnMDkuNiJF!5e0!3m2!1sar!2sjo!4v1773557729364!5m2!1sar!2sjo"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={t('our_location.map_title')}
                    ></iframe>
                </motion.div>
            </div>
        </section>
    );
}
