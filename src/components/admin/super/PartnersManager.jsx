import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiTrash2, FiPlus, FiX, FiLoader, FiUploadCloud, FiEdit2 } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import { useGetPartners, useCreatePartner, useUpdatePartner, useDeletePartner } from '../../../hooks/usePartners';

export default function PartnersManager() {
    const { data: partners, isLoading, error } = useGetPartners();
    const { mutate: deletePartner, isPending: isDeleting } = useDeletePartner();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            deletePartner(id);
        }
    };

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <FiUsers className="text-[#E9B10C]" />
                        Our Partners
                    </h2>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#E9B10C] text-black font-medium rounded-lg hover:bg-[#c4950a] transition-colors shadow-sm"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Add Partner</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading partners...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading partners. Please try again later.</p>
                    </div>
                ) : !partners || partners.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <FiUsers className="w-12 h-12 mb-3 text-gray-300" />
                        <p>No partners found. Add your first partner.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {Array.isArray(partners) && partners.map((partner) => (
                                <motion.div
                                    key={partner.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-6 h-48"
                                >
                                    <div className="flex-grow flex items-center justify-center w-full mb-4">
                                        {partner.logo ? (
                                            <img
                                                src={getMediaUrl(partner.logo)}
                                                alt={partner.name}
                                                className="max-w-full max-h-24 object-contain transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-[#E9B10C]">
                                                <FiUsers className="w-10 h-10 opacity-20" />
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-gray-900 font-bold text-sm text-center line-clamp-1 group-hover:text-[#E9B10C] transition-colors">
                                        {partner.name}
                                    </h3>

                                    {/* Action Buttons */}
                                    <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => setEditingPartner(partner)}
                                            className="p-2 bg-white text-blue-600 rounded-lg shadow-sm border border-blue-100 hover:bg-blue-50 transition-colors"
                                            title="Edit Partner"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(partner.id)}
                                            disabled={isDeleting}
                                            className="p-2 bg-white text-red-600 rounded-lg shadow-sm border border-red-100 hover:bg-red-50 transition-colors"
                                            title="Delete Partner"
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
                    <PartnerModal
                        onClose={() => setIsAddModalOpen(false)}
                    />
                )}
                {editingPartner && (
                    <PartnerModal
                        partner={editingPartner}
                        onClose={() => setEditingPartner(null)}
                    />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

function PartnerModal({ partner, onClose }) {
    const isEdit = !!partner;
    const { mutate: createPartner, isPending: isCreating } = useCreatePartner();
    const { mutate: updatePartner, isPending: isUpdating } = useUpdatePartner();
    const isPending = isCreating || isUpdating;

    const fileInputRef = useRef(null);
    const [name, setName] = useState(partner ? partner.name : '');
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
        if (selectedFile) {
            formData.append('logo', selectedFile);
        }

        if (isEdit) {
            formData.append('_method', 'PUT'); // Laravel requirement for multipart update
            updatePartner({ id: partner.id, partnerData: formData }, {
                onSuccess: () => onClose()
            });
        } else {
            if (!selectedFile) {
                alert("Please select a logo.");
                return;
            }
            createPartner(formData, {
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
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <span className="p-2 bg-[#FFF8E1] rounded-lg">
                            {isEdit ? <FiEdit2 className="text-[#E9B10C]" /> : <FiPlus className="text-[#E9B10C]" />}
                        </span>
                        <span>{isEdit ? 'Edit Partner' : 'Add New Partner'}</span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="E.g., ADNOC, Aldar, etc."
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Partner Logo</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden h-40 flex flex-col items-center justify-center"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {preview || (partner && partner.logo && !selectedFile) ? (
                                    <img
                                        src={preview || getMediaUrl(partner.logo)}
                                        alt="Preview"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <FiUploadCloud className="w-10 h-10 mb-2" />
                                        <span className="text-sm">Click to upload logo</span>
                                        <span className="text-xs mt-1">PNG, JPG up to 2MB</span>
                                    </div>
                                )}

                                {(preview || (partner && partner.logo)) && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">Change Image</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end space-x-3">
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
                                <span>{isPending ? 'Saving...' : isEdit ? 'Update Partner' : 'Add Partner'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
