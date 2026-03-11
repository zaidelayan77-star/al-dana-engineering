import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiClock, FiPlus, FiX, FiLoader, FiFolder, FiMapPin, FiSettings, FiImage, FiVideo, FiUploadCloud } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import {
    useGetProjects,
    useCreateProject,
    useUpdateProject,
    useDeleteProject,
    useGetProject,
    useUpdateStageStatus,
    useUpdateStageDetails,
    useUploadStageMedia,
    useDeleteMedia
} from '../../../hooks/useProjects';
import { useGetAdminUsers } from '../../../hooks/useAdminUsers';

export default function Projects() {
    const { data: projects, isLoading, error } = useGetProjects();
    const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'workflow'

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    const handleManageWorkflow = (id) => {
        setSelectedProjectId(id);
        setViewMode('workflow');
    };

    if (viewMode === 'workflow' && selectedProjectId) {
        return <ProjectWorkflowManager projectId={selectedProjectId} onBack={() => { setViewMode('list'); setSelectedProjectId(null); }} />;
    }

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Manage Projects</h2>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#E9B10C] text-black font-medium rounded-lg hover:bg-[#c4950a] transition-colors shadow-sm"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Add New Project</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading projects...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading projects. Please try again later.</p>
                    </div>
                ) : !projects || projects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <FiFolder className="w-12 h-12 mb-3 text-gray-300" />
                        <p>No projects found. Create your first project.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">ID</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Project Name</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">User ID</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Location</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Created</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <motion.tr
                                        key={project.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-sm text-gray-500">#{project.id}</td>
                                        <td className="py-4 px-4 text-sm font-bold text-gray-900">
                                            {project.project_name}
                                            <div className="text-xs text-gray-500 font-normal line-clamp-1 max-w-xs" title={project.description}>
                                                {project.description}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-blue-600 font-medium">#{project.user_id}</td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{project.location || 'N/A'}</td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            {new Date(project.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleManageWorkflow(project.id)}
                                                    className="flex items-center space-x-1 px-3 py-1.5 text-blue-700 bg-blue-50 text-xs hover:bg-blue-100 rounded-lg transition-colors font-medium border border-blue-100"
                                                    title="Manage Workflow Stages & Media"
                                                >
                                                    <FiSettings className="w-3.5 h-3.5" />
                                                    <span>Workflow</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    disabled={isDeleting}
                                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete Project"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Project Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <AddProjectModal onClose={() => setIsAddModalOpen(false)} />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

function AddProjectModal({ onClose }) {
    const { mutate: createProject, isPending } = useCreateProject();
    const { data: users, isLoading: usersLoading } = useGetAdminUsers(); // Fetch users to populate dropdown

    const [formData, setFormData] = useState({
        user_id: '',
        project_name: '',
        description: '',
        location: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createProject(formData, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <FiFolder className="text-[#E9B10C]" />
                        <span>Add New Project</span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to User <span className="text-red-500">*</span></label>
                            {usersLoading ? (
                                <div className="text-sm text-gray-500 flex items-center"><FiLoader className="mr-2 animate-spin" /> Loading users...</div>
                            ) : (
                                <select
                                    required
                                    value={formData.user_id}
                                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent outline-none transition-all"
                                >
                                    <option value="" disabled>Select User</option>
                                    {users?.map(u => (
                                        <option key={u.id} value={u.id}>{u.full_name} ({u.email}) - #{u.id}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                required
                                value={formData.project_name}
                                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                                placeholder="E.g., Al Reem Island Development"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="E.g., Abu Dhabi"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter project description..."
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !formData.user_id}
                                className={`flex items-center space-x-2 px-6 py-2.5 text-sm font-medium text-black bg-[#E9B10C] hover:bg-[#c4950a] rounded-lg transition-colors shadow-sm ${isPending || !formData.user_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isPending && <FiLoader className="w-4 h-4 animate-spin" />}
                                <span>{isPending ? 'Saving...' : 'Create Project'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}


/* =========================================================================
   WORKFLOW MANAGER COMPONENT
========================================================================= */

function ProjectWorkflowManager({ projectId, onBack }) {
    const { data, isLoading, error } = useGetProject(projectId);
    const { mutate: deleteMedia } = useDeleteMedia();

    const [selectedStageNumber, setSelectedStageNumber] = useState(null);
    const [isEditStageModalOpen, setIsEditStageModalOpen] = useState(false);
    const [isUploadMediaModalOpen, setIsUploadMediaModalOpen] = useState(false);

    const project = data?.project || data;
    const stages = data?.stages || project?.stages || [];

    const handleDeleteMedia = (mediaId) => {
        if (window.confirm("Delete this media?")) {
            deleteMedia(mediaId);
        }
    };

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    return (
        <SuperAdminLayout>
            <div className="pb-12">
                <button
                    onClick={onBack}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-colors mb-6 text-sm font-medium"
                >
                    <span className="bg-white p-1 rounded border shadow-sm">&larr;</span>
                    <span>Back to Projects List</span>
                </button>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p className="text-gray-500">Loading project data...</p>
                    </div>
                ) : error || !project ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex justify-center">
                        Failed to load project details.
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 border-l-4 border-l-[#E9B10C]">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Workflow: {project.project_name}</h1>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex items-center space-x-4 text-xs font-medium">
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">Project ID: #{project.id}</span>
                                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">User ID: #{project.user_id}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Stages Breakdown</h2>
                        </div>

                        {stages.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                                <FiSettings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No stages have been created yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {stages.map((stage) => {
                                    const media = stage.media || [];
                                    const stageNum = stage.stage_number || stage.id;

                                    return (
                                        <div key={stage.id || stageNum} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                            <div className="bg-gray-50 p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex items-center space-x-3">
                                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E9B10C] text-black font-bold shadow-sm">
                                                        {stageNum}
                                                    </span>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{stage.title || `Stage ${stageNum}`}</h3>
                                                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium">{stage.status}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStageNumber(stageNum);
                                                            setIsEditStageModalOpen(true);
                                                        }}
                                                        className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors bg-white flex items-center space-x-1"
                                                    >
                                                        <FiEdit2 className="w-3.5 h-3.5" />
                                                        <span>Edit Config</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStageNumber(stageNum);
                                                            setIsUploadMediaModalOpen(true);
                                                        }}
                                                        className="px-3 py-1.5 text-xs font-medium border border-blue-200 rounded text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center space-x-1"
                                                    >
                                                        <FiUploadCloud className="w-3.5 h-3.5" />
                                                        <span>Upload Media</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="p-5">
                                                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{stage.description}</p>

                                                <div className="mb-6 max-w-sm">
                                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                        <span>Completion Progress</span>
                                                        <span className="font-bold text-gray-900">{stage.progress_percentage || 0}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div
                                                            className="bg-[#E9B10C] h-full rounded-full transition-all"
                                                            style={{ width: `${stage.progress_percentage || 0}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Attached Stage Media ({media.length})</h4>
                                                    {media.length === 0 ? (
                                                        <p className="text-xs text-gray-400 italic">No media uploaded for this stage.</p>
                                                    ) : (
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                                            {media.map((item) => (
                                                                <div key={item.id} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden group">
                                                                    {item.file_type === 'video' ? (
                                                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                                                            <FiVideo className="text-white/50 w-8 h-8" />
                                                                        </div>
                                                                    ) : (
                                                                        <img
                                                                            src={getMediaUrl(item.file_path)}
                                                                            alt="Media"
                                                                            className="w-full h-full object-cover"
                                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                                        />
                                                                    )}

                                                                    {/* Overlay Actions */}
                                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                                                        <button
                                                                            onClick={() => handleDeleteMedia(item.id)}
                                                                            className="p-2 bg-red-500 rounded text-white hover:bg-red-600 transition-colors"
                                                                            title="Delete Media"
                                                                        >
                                                                            <FiTrash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>

                                                                    <span className="absolute top-1 left-1 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold backdrop-blur-sm">
                                                                        {item.file_type}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {/* Modals for workflow manager */}
                {isEditStageModalOpen && (
                    <EditStageModal
                        projectId={projectId}
                        stageNumber={selectedStageNumber}
                        onClose={() => setIsEditStageModalOpen(false)}
                    />
                )}

                {isUploadMediaModalOpen && (
                    <UploadMediaModal
                        projectId={projectId}
                        stageNumber={selectedStageNumber}
                        onClose={() => setIsUploadMediaModalOpen(false)}
                    />
                )}
            </div>
        </SuperAdminLayout>
    );
}

function EditStageModal({ projectId, stageNumber, onClose }) {
    const { mutate: updateDetails, isPending: isUpdatingDetails } = useUpdateStageDetails();
    const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateStageStatus();

    const [activeTab, setActiveTab] = useState('details'); // 'details' or 'status'

    // Default values if we are creating/editing
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        progress_percentage: 0,
        status: 'Pending'
    });

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        updateDetails({
            projectId,
            stageNumber,
            stageData: {
                title: formData.title,
                description: formData.description,
                progress_percentage: formData.progress_percentage
            }
        }, {
            onSuccess: () => onClose()
        });
    };

    const handleStatusSubmit = (e) => {
        e.preventDefault();
        updateStatus({
            projectId,
            stageNumber,
            statusData: {
                status: formData.status,
                progress_percentage: formData.progress_percentage
            }
        }, {
            onSuccess: () => onClose()
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                        <span>Config Stage {stageNumber}</span>
                    </h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <FiX />
                    </button>
                </div>

                <div className="border-b flex text-sm text-center">
                    <button
                        className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'details' ? 'border-b-2 border-[#E9B10C] text-[#E9B10C]' : 'text-gray-500 hover:text-gray-800'}`}
                        onClick={() => setActiveTab('details')}
                    >Edit Details</button>
                    <button
                        className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'status' ? 'border-b-2 border-[#E9B10C] text-[#E9B10C]' : 'text-gray-500 hover:text-gray-800'}`}
                        onClick={() => setActiveTab('status')}
                    >Edit Status</button>
                </div>

                <div className="p-6">
                    {activeTab === 'details' ? (
                        <form onSubmit={handleDetailsSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text" required
                                    value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#E9B10C] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required rows="3"
                                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#E9B10C] outline-none resize-none"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                                <input
                                    type="number" required min="0" max="100"
                                    value={formData.progress_percentage} onChange={(e) => setFormData({ ...formData, progress_percentage: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#E9B10C] outline-none"
                                />
                            </div>
                            <button type="submit" disabled={isUpdatingDetails} className="w-full mt-4 bg-[#E9B10C] text-black font-medium py-2 rounded flex justify-center items-center">
                                {isUpdatingDetails ? <FiLoader className="animate-spin" /> : 'Save Details'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleStatusSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    required
                                    value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#E9B10C] outline-none"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                                <input
                                    type="number" required min="0" max="100"
                                    value={formData.progress_percentage} onChange={(e) => setFormData({ ...formData, progress_percentage: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#E9B10C] outline-none"
                                />
                            </div>
                            <button type="submit" disabled={isUpdatingStatus} className="w-full mt-4 bg-[#E9B10C] text-black font-medium py-2 rounded flex justify-center items-center">
                                {isUpdatingStatus ? <FiLoader className="animate-spin" /> : 'Save Status'}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

function UploadMediaModal({ projectId, stageNumber, onClose }) {
    const { mutate: uploadMedia, isPending } = useUploadStageMedia();

    const [fileType, setFileType] = useState('image');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) return alert("Select file first.");

        const data = new FormData();
        data.append('file_type', fileType);
        data.append('file', selectedFile);

        uploadMedia({ projectId, stageNumber, formData: data }, {
            onSuccess: () => onClose()
        });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col"
            >
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                        <FiUploadCloud className="text-[#E9B10C] w-5 h-5" />
                        <span>Upload Media (Stage {stageNumber})</span>
                    </h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <FiX />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                        <select
                            value={fileType} onChange={(e) => { setFileType(e.target.value); setSelectedFile(null); }}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#E9B10C] outline-none"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                        <input
                            type="file" required
                            accept={fileType === 'image' ? "image/*" : "video/*"}
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                        />
                    </div>

                    <button type="submit" disabled={isPending || !selectedFile} className="w-full mt-2 bg-[#E9B10C] text-black font-medium py-2.5 rounded flex justify-center items-center shadow disabled:opacity-50">
                        {isPending ? <FiLoader className="animate-spin" /> : 'Upload Now'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

