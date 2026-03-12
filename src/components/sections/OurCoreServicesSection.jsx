import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiMinimize2, FiLayers, FiDroplet, FiBriefcase, FiActivity } from 'react-icons/fi';
import { FaOilCan } from 'react-icons/fa';

export default function OurCoreServicesSection() {
    const { t } = useTranslation();

    const services = [
        {
            icon: <FiMinimize2 />,
            key: "geotechnical"
        },
        {
            icon: <FiActivity />,
            key: "geophysical"
        },
        {
            icon: <FiLayers />,
            key: "soil"
        },
        {
            icon: <FiDroplet />,
            key: "chemical"
        },
        {
            icon: <FiBriefcase />,
            key: "building"
        },
        {
            icon: <FaOilCan />,
            key: "oil_gas"
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
                        {t('our_services.core_label')}
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('our_services.core_title')}
                    </h2>
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full"></div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => {
                        const servicePoints = t(`our_services.items.${service.key}.points`, { returnObjects: true });
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3_rgba(0,0,0,0.07),0_10px_20px_-2_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col items-start h-full group"
                            >
                                <div className="w-16 h-16 bg-[#FFF8E1] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#E9B10C] transition-colors duration-300">
                                    {React.cloneElement(service.icon, { className: "w-8 h-8 text-[#E9B10C] group-hover:text-white transition-colors duration-300" })}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#E9B10C] transition-colors duration-300">
                                    {t(`our_services.items.${service.key}.title`)}
                                </h3>

                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    {t(`our_services.items.${service.key}.long_desc`)}
                                </p>

                                <ul className="space-y-3 mt-auto">
                                    {Array.isArray(servicePoints) && servicePoints.map((point, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 bg-[#E9B10C] rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}