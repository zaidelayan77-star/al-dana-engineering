import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ContactInformationSection() {
    const { t } = useTranslation();

    const contactInfo = [
        {
            icon: <FiMapPin className="w-6 h-6 text-[#E9B10C]" />,
            title: t('contact_info.items.location.title'),
            details: t('contact_info.items.location.details'),
            action: null
        },
        {
            icon: <FiPhone className="w-6 h-6 text-[#E9B10C]" />,
            title: t('contact_info.items.phone.title'),
            details: t('contact_info.items.phone.details'),
            action: "tel:+971501119108"
        },
        {
            icon: <FiMail className="w-6 h-6 text-[#E9B10C]" />,
            title: t('contact_info.items.email.title'),
            details: t('contact_info.items.email.details'),
            action: "mailto:Info@aldanalab.ae"
        },
        {
            icon: <FiClock className="w-6 h-6 text-[#E9B10C]" />,
            title: t('contact_info.items.hours.title'),
            details: t('contact_info.items.hours.details'),
            action: null
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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
                        {t('contact_info.label')}
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        {t('contact_info.title')}
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300 flex flex-col items-start"
                        >
                            <div className="w-14 h-14 bg-[#FFF8E1] rounded-xl flex items-center justify-center mb-6">
                                {item.icon}
                            </div>

                            <h4 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-4">
                                {item.title}
                            </h4>

                            <div className="text-gray-800 font-medium leading-relaxed">
                                {item.action ? (
                                    <a href={item.action} className="hover:text-[#E9B10C] transition-colors">
                                        {item.details}
                                    </a>
                                ) : (
                                    <span>{item.details}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}