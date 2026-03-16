import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiFolder, FiMapPin, FiClock, FiActivity, FiLoader, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import HeroPages from '../shared/HeroPages';
import coverImg from '../../assets/images/new-images/hf_20260313_082321_c80c98a1-6ed3-4253-ab68-0c7975d82175.jpeg';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import { useGetUserProjects } from '../../hooks/useProjects';
import LoginRequired from '../common/LoginRequired';

export default function Projects() {
    const { t } = useTranslation();
    const token = localStorage.getItem('auth_token');
    
    // Get user id from localStorage
    const storedUserStr = localStorage.getItem('user');
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
    const userId = storedUser?.id;

    const { data: projects, isLoading, error } = useGetUserProjects(userId);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // Filter projects that are returned from API
    const items = projects || [];

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <HeroPages
                image={coverImg}
                subtitle={t('pages.projects.subtitle')}
                title={t('pages.projects.title')}
                description={t('pages.projects.description')}
            />

            <section className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3 text-shadow-sm">
                                {t('projects_page.label')}
                            </h3>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary text-shadow-sm">
                                {t('projects_page.title')}
                            </h2>
                            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed font-light">
                                {t('projects_page.desc')}
                            </p>
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    {!token ? (
                        <LoginRequired />
                    ) : isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24 mb-10 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                            <FiLoader className="w-12 h-12 text-[#E9B10C] animate-spin mb-4" />
                            <p className="text-gray-500 font-medium text-lg">{t('projects_page.loading')}</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-3xl border border-red-100 max-w-2xl mx-auto text-center mb-10">
                            <p className="text-red-500 font-bold mb-2 text-xl">{t('projects_page.error_title')}</p>
                            <p className="text-gray-600 text-sm">{t('projects_page.error_desc')}</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-3xl bg-white max-w-3xl mx-auto text-center mb-10">
                            <FiFolder className="w-16 h-16 text-gray-300 mb-6" />
                            <p className="text-gray-500 font-medium text-xl">{t('projects_page.no_projects')}</p>
                            <p className="text-gray-400 text-sm mt-3 lg:w-3/4 mx-auto leading-relaxed">{t('projects_page.no_projects_desc')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((project, index) => {
                                // Calculate total progress
                                const stages = project.stages || [];
                                const totalProgress = stages.length > 0
                                    ? Math.round(stages.reduce((acc, stage) => acc + (stage.progress_percentage || 0), 0) / stages.length)
                                    : 0;

                                const isCompleted = project.status === 'Completed' || totalProgress === 100;

                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: (index % 10) * 0.1 }}
                                        className="bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(233,177,12,0.3)] transition-all duration-500 overflow-hidden border border-gray-100/50 group flex flex-col h-full cursor-pointer relative"
                                        onClick={() => setSelectedProjectId(selectedProjectId === project.id ? null : project.id)}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-300 to-[#E9B10C] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10"></div>

                                        <div className="p-8 pb-6 flex-grow flex flex-col relative z-0">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`p-4 rounded-2xl ${isCompleted ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-[#E9B10C]'} transition-colors duration-300 shadow-sm`}>
                                                    {isCompleted ? <FiCheckCircle className="w-7 h-7" /> : <FiFolder className="w-7 h-7" />}
                                                </div>
                                                <div className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border ${isCompleted ? 'border-green-200 text-green-700 bg-green-50/50' : 'border-yellow-200 text-yellow-700 bg-yellow-50/50'}`}>
                                                    {project.status || t('projects_page.active')}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#E9B10C] transition-colors line-clamp-2">
                                                {project.project_name}
                                            </h3>

                                            <p className="text-sm text-gray-500 mb-8 line-clamp-3 leading-relaxed flex-grow">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto space-y-4">
                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex justify-between items-center text-xs font-bold text-gray-500 mb-2 tracking-wide uppercase">
                                                        <span>{t('projects_page.progress')}</span>
                                                        <span className={totalProgress === 100 ? 'text-green-600' : 'text-gray-900'}>{totalProgress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${totalProgress}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                                            className={`h-full rounded-full ${totalProgress === 100 ? 'bg-green-500' : 'bg-[#E9B10C]'}`}
                                                        ></motion.div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center pt-5 border-t border-gray-100 text-sm text-gray-500 mt-6">
                                                    <div className="flex items-center space-x-2 font-medium">
                                                        <FiMapPin className="text-gray-400 group-hover:text-[#E9B10C] transition-colors" />
                                                        <span className="truncate max-w-[120px]">{project.location || t('projects_page.location_fallback')}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 font-medium">
                                                        <FiClock className="text-gray-400 group-hover:text-[#E9B10C] transition-colors" />
                                                        <span>{new Date(project.created_at).getFullYear()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expandable Stages List (Simplified overview for public) */}
                                        <AnimatePresence>
                                            {selectedProjectId === project.id && stages.length > 0 && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="bg-gray-50/80 border-t border-gray-100 px-8 py-6"
                                                >
                                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{t('projects_page.milestones')}</h4>
                                                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                                                        {stages.map((stage, sIdx) => (
                                                            <div key={stage.id || sIdx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group/stage">
                                                                <div className={`flex items-center justify-center w-5 h-5 rounded-full border-2 border-white shadow-sm shrink-0 md:order-1 md:group-odd/stage:-translate-x-1/2 md:group-even/stage:translate-x-1/2 z-10 transition-colors ${stage.status === 'Completed' ? 'bg-green-500 text-white' : stage.status === 'In Progress' ? 'bg-[#E9B10C] text-black' : 'bg-gray-200 text-transparent'}`}>
                                                                    {stage.status === 'Completed' && <FiCheckCircle className="w-3 h-3" />}
                                                                </div>

                                                                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
                                                                    <p className="text-sm font-bold text-gray-800 mb-1 leading-tight">{stage.title}</p>
                                                                    <div className="flex justify-between items-center text-xs">
                                                                        <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px] ${stage.status === 'Completed' ? 'text-green-700 bg-green-50' : stage.status === 'In Progress' ? 'text-[#c4950a] bg-yellow-50' : 'text-gray-500 bg-gray-100'}`}>
                                                                            {stage.status}
                                                                        </span>
                                                                        <span className="font-bold text-gray-900">{stage.progress_percentage || 0}%</span>
                                                                    </div>

                                                                    {/* Stage Media Display */}
                                                                    {stage.media && stage.media.length > 0 && (
                                                                        <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2 overflow-x-auto hide-scrollbar">
                                                                            {stage.media.map(item => (
                                                                                <div key={item.id} className="w-10 h-10 rounded border border-gray-200 overflow-hidden flex-shrink-0">
                                                                                    {item.file_type === 'video' ? (
                                                                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center"><FiActivity className="text-white/50 w-4 h-4" /></div>
                                                                                    ) : (
                                                                                        <img src={getMediaUrl(item.file_path)} alt="Media" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {!selectedProjectId || selectedProjectId !== project.id ? (
                                            <div className="absolute top-8 right-8 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:text-[#E9B10C] transition-all duration-300 scale-50 group-hover:scale-100">
                                                <FiChevronRight className="w-8 h-8" />
                                            </div>
                                        ) : null}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Added contact banner at bottom to redirect potential clients to create a project */}
            <ContactOurTeamSection />
        </div>
    );
}