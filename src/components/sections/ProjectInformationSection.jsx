import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiFolder, FiMapPin, FiLayers, FiUser, FiBriefcase } from 'react-icons/fi';
import { FaVials } from 'react-icons/fa';

export default function ProjectInformationSection() {
    const { t } = useTranslation();

    const details = [
        {
            icon: <FiFolder className="w-6 h-6 text-[#E9B10C]" />,
            label: t('project_info.fields.project_name.label'),
            value: t('project_info.fields.project_name.value')
        },
        {
            icon: <FiBriefcase className="w-6 h-6 text-[#E9B10C]" />,
            label: t('project_info.fields.client_name.label'),
            value: t('project_info.fields.client_name.value')
        },
        {
            icon: <FiMapPin className="w-6 h-6 text-[#E9B10C]" />,
            label: t('project_info.fields.location.label'),
            value: t('project_info.fields.location.value')
        },
        {
            icon: <FiLayers className="w-6 h-6 text-[#E9B10C]" />,
            label: t('project_info.fields.borehole_depth.label'),
            value: t('project_info.fields.borehole_depth.value')
        },
        {
            icon: <FaVials className="w-6 h-6 text-[#E9B10C]" />,
            label: t('project_info.fields.num_samples.label'),
            value: t('project_info.fields.num_samples.value')
        },
        {
            icon: <FiUser className="w-6 h-6 text-[#E9B10C]" />,
            label: t('project_info.fields.project_engineer.label'),
            value: t('project_info.fields.project_engineer.value')
        }
    ];

    return (
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Project Details Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            {t('project_info.label')}
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {t('project_info.title')}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {details.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="bg-[#FFF9E5] p-3 rounded-lg flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        {item.label}
                                    </h4>
                                    <p className="text-gray-900 font-bold text-sm md:text-base leading-snug">
                                        {item.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Investigation Summary Section */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            {t('project_info.overview.label')}
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {t('project_info.overview.title')}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="text-gray-600 space-y-6 leading-relaxed text-lg">
                            <p>
                                {t('project_info.overview.p1')}
                            </p>
                            <p>
                                {t('project_info.overview.p2')}
                            </p>
                            <p>
                                {t('project_info.overview.p3')}
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}