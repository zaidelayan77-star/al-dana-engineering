import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiTrash2, FiPlus, FiX, FiLoader, FiUploadCloud, FiEdit2, FiBriefcase } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import { useGetTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember } from '../../../hooks/useTeamMembers';

export default function TeamMembersManager() {
    const { data: members, isLoading, error } = useGetTeamMembers();
    const { mutate: deleteMember, isPending: isDeleting } = useDeleteTeamMember();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            deleteMember(id);
        }
    };

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FiUsers className="text-[#E9B10C]" />
                        Team Members
                    </h2>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#E9B10C] text-black font-medium rounded-lg hover:bg-[#c4950a] transition-colors shadow-sm"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Add Member</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading team members...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading team members. Please try again later.</p>
                    </div>
                ) : !members || members.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <FiUsers className="w-12 h-12 mb-3 text-gray-300" />
                        <p>No team members found. Add your first team member.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {Array.isArray(members) && members.map((member) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-0 h-80"
                                >
                                    <div className="w-full h-48 bg-gray-50 overflow-hidden">
                                        {member.image ? (
                                            <img
                                                src={getMediaUrl(member.image)}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#E9B10C]">
                                                <FiUsers className="w-16 h-16 opacity-20" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 w-full flex flex-col items-center">
                                        <h3 className="text-gray-900 font-bold text-base text-center line-clamp-1 group-hover:text-[#E9B10C] transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-[#E9B10C] text-xs font-semibold uppercase tracking-wider mt-1 flex items-center gap-1">
                                            <FiBriefcase className="w-3 h-3" />
                                            {member.position}
                                        </p>
                                        {member.description && (
                                            <p className="text-gray-500 text-xs text-center mt-2 line-clamp-2">
                                                {member.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => setEditingMember(member)}
                                            className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-lg shadow-sm border border-blue-100 hover:bg-blue-50 transition-colors"
                                            title="Edit Member"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member.id)}
                                            disabled={isDeleting}
                                            className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-lg shadow-sm border border-red-100 hover:bg-red-50 transition-colors"
                                            title="Delete Member"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <MemberModal
                        onClose={() => setIsAddModalOpen(false)}
                    />
                )}
                {editingMember && (
                    <MemberModal
                        member={editingMember}
                        onClose={() => setEditingMember(null)}
                    />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

function MemberModal({ member, onClose }) {
    const isEdit = !!member;
    const { mutate: createMember, isPending: isCreating } = useCreateTeamMember();
    const { mutate: updateMember, isPending: isUpdating } = useUpdateTeamMember();
    const isPending = isCreating || isUpdating;

    const fileInputRef = useRef(null);
    const [name, setName] = useState(member ? member.name : '');
    const [position, setPosition] = useState(member ? member.position : '');
    const [description, setDescription] = useState(member ? member.description || '' : '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('description', description);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        if (isEdit) {
            formData.append('_method', 'PUT');
            updateMember({ id: member.id, memberData: formData }, {
                onSuccess: () => onClose()
            });
        } else {
            if (!selectedFile) {
                alert("Please select an image.");
                return;
            }
            createMember(formData, {
                onSuccess: () => onClose()
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <span className="p-2 bg-[#FFF8E1] rounded-lg">
                            {isEdit ? <FiEdit2 className="text-[#E9B10C]" /> : <FiPlus className="text-[#E9B10C]" />}
                        </span>
                        <span>{isEdit ? 'Edit Team Member' : 'Add Team Member'}</span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                                <input
                                    type="text"
                                    required
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    placeholder="Position/Title"
                                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                placeholder="Short bio or responsibilities"
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden h-48 flex flex-col items-center justify-center"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {preview || (member && member.image && !selectedFile) ? (
                                    <img
                                        src={preview || getMediaUrl(member.image)}
                                        alt="Preview"
                                        className="max-w-full max-h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <FiUploadCloud className="w-10 h-10 mb-2" />
                                        <span className="text-sm">Click to upload photo</span>
                                    </div>
                                )}

                                {(preview || (member && member.image)) && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">Change Image</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || (!isEdit && !selectedFile)}
                                className={`flex items-center space-x-2 px-6 py-2.5 text-sm font-medium text-black bg-[#E9B10C] hover:bg-[#c4950a] rounded-lg transition-colors shadow-sm ${isPending || (!isEdit && !selectedFile) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isPending && <FiLoader className="w-4 h-4 animate-spin" />}
                                <span>{isPending ? 'Saving...' : isEdit ? 'Update Member' : 'Add Member'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
