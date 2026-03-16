import React from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiMapPin, FiLoader, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetUserProjects } from '../../hooks/useProjects';
import LoginRequired from '../common/LoginRequired';

export default function FeaturedProjectsSection() {
    const { t } = useTranslation();
    const token = localStorage.getItem('auth_token');
    
    // Get user id from localStorage
    const storedUserStr = localStorage.getItem('user');
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
    const userId = storedUser?.id;

    const { data: projects, isLoading } = useGetUserProjects(userId);

    // Show max 4 featured projects
    const featured = (projects || []).slice(0, 4);

    return (
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
                >
                    <div>
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            {t('featured_projects.label')}
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                            {t('featured_projects.title')}
                        </h2>
                    </div>
                    {token && (
                        <Link
                            to="/projects"
                            className="flex items-center space-x-2 text-sm font-bold text-[#E9B10C] hover:text-[#c4950a] transition-colors group"
                        >
                            <span>{t('featured_projects.view_all')}</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </motion.div>

                {!token ? (
                    <LoginRequired />
                ) : isLoading ? (
                    <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <FiLoader className="w-8 h-8 text-[#E9B10C] animate-spin" />
                    </div>
                ) : featured.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-2xl bg-white text-gray-500">
                        <FiFolder className="w-12 h-12 text-gray-300 mb-2" />
                        <p>{t('featured_projects.coming_soon')}</p>
                    </div>
                ) : (
                    /* Projects Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featured.map((project, index) => {
                            const stages = project.stages || [];
                            const totalProgress = stages.length > 0
                                ? Math.round(stages.reduce((acc, stage) => acc + (stage.progress_percentage || 0), 0) / stages.length)
                                : 0;

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
                                >
                                    {/* Header Banner */}
                                    <div className="h-2 bg-gradient-to-r from-yellow-300 to-[#E9B10C] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-yellow-50 rounded-xl">
                                                <FiFolder className="text-[#E9B10C] w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                                                {project.status === 'Completed' ? t('featured_projects.status.completed') : t('featured_projects.status.active')}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E9B10C] transition-colors line-clamp-2">
                                            {project.project_name}
                                        </h3>

                                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                                            <FiMapPin className="text-gray-400 shrink-0" />
                                            <span>{project.location || 'Abu Dhabi, UAE'}</span>
                                        </div>

                                        <p className="text-gray-600 mb-6 leading-relaxed flex-grow line-clamp-3 text-sm">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto">
                                            <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
                                                <span>{t('featured_projects.progress')}</span>
                                                <span className="font-bold text-gray-900">{totalProgress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${totalProgress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className="h-full bg-[#E9B10C] rounded-full"
                                                ></motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* View All Link (Mobile) */}
                {token && !isLoading && featured.length > 0 && (
                    <div className="flex justify-center mt-10 md:hidden">
                        <Link
                            to="/projects"
                            className="flex items-center space-x-2 px-6 py-3 bg-[#E9B10C] text-black font-bold rounded-xl hover:bg-[#c4950a] transition-colors shadow-lg"
                        >
                            <span>{t('featured_projects.view_all')}</span>
                            <FiChevronRight />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}