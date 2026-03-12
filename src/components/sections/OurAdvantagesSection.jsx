import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiAward, FiClock, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function OurAdvantagesSection() {
    const { t } = useTranslation();

    const advantages = [
        {
            icon: <FiAward />,
            title: t('our_advantages.items.exp.title'),
            description: t('our_advantages.items.exp.desc')
        },
        {
            icon: <FaFlask />,
            title: t('our_advantages.items.iso.title'),
            description: t('our_advantages.items.iso.desc')
        },
        {
            icon: <FiClock />,
            title: t('our_advantages.items.fast.title'),
            description: t('our_advantages.items.fast.desc')
        },
        {
            icon: <FiUsers />,
            title: t('our_advantages.items.team.title'),
            description: t('our_advantages.items.team.desc')
        },
        {
            icon: <FiCheckCircle />,
            title: t('our_advantages.items.trust.title'),
            description: t('our_advantages.items.trust.desc')
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-20 bg-[#F8F9FA]">
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
                        {t('our_advantages.label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto">
                        {t('our_advantages.title')}
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {advantages.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start ${
                                // Center the last item if total is odd (5 items)
                                index === advantages.length - 1 && advantages.length % 3 !== 0
                                    ? "lg:col-start-2"
                                    : ""
                                }`}
                        >
                            <div className="bg-[#FFF8E1] p-4 rounded-xl mb-6 flex items-center justify-center">
                                {React.cloneElement(item.icon, { className: "w-8 h-8 text-[#E9B10C]" })}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}