import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiClock, FiMapPin, FiLoader, FiChevronRight, FiCheckCircle, FiVideo, FiImage, FiArrowLeft, FiCircle } from 'react-icons/fi';
import AdminLayout from './AdminLayout';
import ImageLightbox from '../common/ImageLightbox';

import { useGetUserProjects, useGetProject } from '../../hooks/useProjects';

export default function MyProjects() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const { data: projects, isLoading, error } = useGetUserProjects(user.id);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // If a project is selected, show its detailed workflow view
    if (selectedProjectId) {
        return <ProjectDetails projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />;
    }

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
                        <p className="text-gray-500">Track and manage your ongoing projects workflows</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading your projects...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex justify-center">
                        Failed to load projects. Please try again later.
                    </div>
                ) : !projects || projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                        <FiFolder className="w-12 h-12 mb-3 text-gray-300" />
                        <p>You don't have any projects assigned yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedProjectId(project.id)}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#E9B10C] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-yellow-50 text-[#E9B10C] rounded-lg">
                                        <FiFolder className="text-xl" />
                                    </div>
                                    <div className="text-gray-400 group-hover:text-[#E9B10C] transition-colors">
                                        <FiChevronRight className="w-5 h-5" />
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate" title={project.project_name}>
                                    {project.project_name}
                                </h3>

                                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow" title={project.description}>
                                    {project.description}
                                </p>

                                <div className="pt-4 border-t border-gray-50 mt-auto flex justify-between items-center text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <FiMapPin />
                                        <span className="truncate max-w-[120px]">{project.location || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <FiClock />
                                        <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function ProjectDetails({ projectId, onBack }) {
    const { data, isLoading, error } = useGetProject(projectId);
    const [lightboxData, setLightboxData] = useState({ isOpen: false, imageSrc: '', altText: '' });


    // Assuming the backend returns the project inside `project` and stages inside `stages` based on instructions
    // or everything merged in `data`. We will adapt based on standard structures:
    const project = data?.project || data;
    const stages = data?.stages || project?.stages || [];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    return (
        <AdminLayout>
            <div className="pb-12">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors mb-4 text-sm font-medium"
                    >
                        <FiArrowLeft />
                        <span>Back to Projects</span>
                    </button>

                    {isLoading ? (
                        <div className="h-24 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
                            <FiLoader className="w-6 h-6 animate-spin text-[#E9B10C]" />
                        </div>
                    ) : error || !project ? (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100">
                            Failed to load project details.
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.project_name}</h1>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                            <FiMapPin />
                                            <span>{project.location}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <FiClock />
                                            <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Overall Status</h4>
                                    <span className="font-bold text-gray-900 flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-[#E9B10C]"></div>
                                        <span>Active Project</span>
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h3 className="font-bold text-gray-900 text-sm mb-2">Project Description</h3>
                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                                    {project.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Workflow section */}
                {!isLoading && project && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                            <span className="w-8 h-8 rounded-lg bg-[#E9B10C] text-black flex items-center justify-center text-sm">WF</span>
                            <span>Project Workflow</span>
                        </h2>

                        {stages.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                                No workflow stages have been defined for this project yet.
                            </div>
                        ) : (
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                                {stages.map((stage, index) => {
                                    const media = stage.media || [];

                                    return (
                                        <motion.div
                                            key={stage.id || index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                                        >
                                            {/* Process Marker */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-100 group-hover:bg-[#E9B10C] text-gray-500 group-hover:text-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                                                <span className="font-bold text-sm">{stage.stage_number || index + 1}</span>
                                            </div>

                                            {/* Content Card */}
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-xl shadow-sm border border-gray-100 group-hover:border-[#E9B10C]/50 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-gray-900 text-lg">{stage.title || `Stage ${stage.stage_number || index + 1}`}</h3>
                                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider border ${getStatusColor(stage.status)}`}>
                                                        {stage.status || 'Pending'}
                                                    </span>
                                                </div>

                                                <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">
                                                    {stage.description || 'No specific description provided for this stage.'}
                                                </p>

                                                {/* Progress Indicator */}
                                                <div className="mb-4">
                                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                        <span>Progress</span>
                                                        <span className="font-medium text-gray-900">{stage.progress_percentage || 0}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-yellow-400 to-[#E9B10C] h-full rounded-full transition-all duration-1000"
                                                            style={{ width: `${stage.progress_percentage || 0}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* Attached Media Previews */}
                                                {media.length > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-gray-50">
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Attached Media</h4>
                                                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                                            {media.map((item, mIdx) => (
                                                                <div key={item.id || mIdx} className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 group/media">
                                                                    {item.file_type === 'video' ? (
                                                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                                                            <FiVideo className="text-white/50 w-6 h-6" />
                                                                        </div>
                                                                    ) : (
                                                                        <img
                                                                            src={getMediaUrl(item.file_path)}
                                                                            alt="Media"
                                                                            className="w-full h-full object-cover group-hover/media:scale-110 transition-transform duration-500 cursor-zoom-in"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setLightboxData({
                                                                                    isOpen: true,
                                                                                    imageSrc: getMediaUrl(item.file_path),
                                                                                    altText: project.project_name
                                                                                });
                                                                            }}
                                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ImageLightbox 
                isOpen={lightboxData.isOpen}
                imageSrc={lightboxData.imageSrc}
                altText={lightboxData.altText}
                onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
            />
        </AdminLayout>
    );
}
