import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function ContactOurTeamSection() {
    const { t } = useTranslation();

    return (
        <section className="py-20 bg-[#F4D03F]">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6 tracking-tight"
                >
                    {t('contact_team.title')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[#1a1a1a]/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {t('contact_team.desc')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link
                        to="/contact-us"
                        className="inline-block bg-[#1a1a1a] text-white font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-md hover:bg-black hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        {t('contact_team.button')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}