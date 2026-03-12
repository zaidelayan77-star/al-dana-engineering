import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGetPartners } from '../../hooks/usePartners';

export default function OurPartnersSection() {
    const { t } = useTranslation();
    const { data: apiPartners, isLoading } = useGetPartners();

    const staticPartners = [
        "ABU DHABI MUNICIPALITY",
        "ADNOC",
        "ALDAR PROPERTIES",
        "MUSANADA",
        "TROJAN GENERAL CONTRACTING",
        "NATIONAL MARINE DREDGING",
        "EMAAR PROPERTIES",
        "DAMAC PROPERTIES",
        "DUBAI MUNICIPALITY",
        "NAKHEEL"
    ];

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://api.al-danaengineering.com/storage/${cleanPath}`;
    };

    // Use API partners if available, otherwise static list
    const partnersToShow = apiPartners && apiPartners.length > 0 ? apiPartners : null;

    if (isLoading) return null;

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        {t('our_partners.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {t('our_partners.title')}
                    </h2>
                    <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed">
                        {t('our_partners.desc')}
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {!partnersToShow ? (
                        staticPartners.map((partner, index) => (
                            <motion.div
                                key={`static-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="h-32 bg-[#F8F9FA] rounded-xl border border-gray-100 flex items-center justify-center p-6 hover:shadow-md transition-shadow duration-300"
                            >
                                <span className="text-gray-600 font-bold text-center text-xs md:text-sm tracking-wider leading-relaxed uppercase">
                                    {partner}
                                </span>
                            </motion.div>
                        ))
                    ) : (
                        partnersToShow.map((partner, index) => (
                            <motion.div
                                key={`api-${partner.id}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="h-32 bg-[#F8F9FA] rounded-xl border border-gray-100 flex items-center justify-center p-6 hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                            >
                                {partner.logo ? (
                                    <img
                                        src={getMediaUrl(partner.logo)}
                                        alt={partner.name}
                                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                                    />
                                ) : (
                                    <span className="text-gray-600 font-bold text-center text-xs md:text-sm tracking-wider leading-relaxed uppercase">
                                        {partner.name}
                                    </span>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
