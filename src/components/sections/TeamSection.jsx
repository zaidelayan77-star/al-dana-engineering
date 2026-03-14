import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGetTeamMembers } from '../../hooks/useTeamMembers';
import { FiChevronRight, FiBriefcase, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function TeamSection({ limit = 4, showHeader = true, isFullPage = false }) {
    const { t } = useTranslation();
    const { data: members, isLoading } = useGetTeamMembers();

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const sortedMembers = React.useMemo(() => {
        if (!members) return [];
        
        const priorityOrder = [
            "Eng. Abdulrahman Abdullah",
            "Dr. Abdelghani Yaghi",
            "Eng. Laith Al Khalaf",
            "Ahmed Eldabe",
            "Eng. Louis Mamary"
        ];

        return [...members].sort((a, b) => {
            const indexA = priorityOrder.indexOf(a.name);
            const indexB = priorityOrder.indexOf(b.name);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
        });
    }, [members]);

    if (isLoading) return null;

    const displayMembers = isFullPage ? sortedMembers : sortedMembers.slice(0, limit);

    if (!displayMembers || displayMembers.length === 0) return null;

    return (
        <section className={`py-20 ${isFullPage ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {showHeader && (
                    <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6`}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3 text-shadow-sm">
                                {t('team_section.label')}
                            </h3>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary text-shadow-sm">
                                {t('team_section.title')}
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed font-light">
                                {t('team_section.desc')}
                            </p>
                        </motion.div>

                        {!isFullPage && members && members.length > limit && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Link
                                    to="/team"
                                    className="inline-flex items-center space-x-2 text-[#E9B10C] font-bold hover:text-[#c4950a] transition-all group border-b-2 border-[#E9B10C] pb-1"
                                >
                                    <span>{t('team_section.view_all')}</span>
                                    <FiChevronRight className="transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-3xl p-8 mb-6 shadow-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-auto">
                                <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#E9B10C] transition-colors duration-300 mb-2">
                                    {member.name}
                                </h4>
                                <p className="text-[#E9B10C] text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-4">
                                    <FiBriefcase className="w-4 h-4" />
                                    {member.position}
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
