import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiVideo, FiTrash2, FiPlus, FiX, FiLoader, FiUploadCloud } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import { useGetGalleryItems, useCreateGalleryItem, useDeleteGalleryItem } from '../../../hooks/useGallery';

export default function GalleryManager() {
    const { data: items, isLoading, error } = useGetGalleryItems();
    const { mutate: deleteItem, isPending: isDeleting } = useDeleteGalleryItem();

    // Convert base URL, assuming it's available or we extract it, you might need to adjust this depending on your `.env` structure
    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;

        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        // Construct the URL directly as requested by the user to avoid .env replace mismatch
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this media item?')) {
            deleteItem(id);
        }
    };

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Gallery Portfolio</h2>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#E9B10C] text-black font-medium rounded-lg hover:bg-[#c4950a] transition-colors shadow-sm"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Upload Media</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading gallery items...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading gallery. Please try again later.</p>
                    </div>
                ) : !items || items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <FiImage className="w-12 h-12 mb-3 text-gray-300" />
                        <p>Your gallery is empty. Upload some images or videos.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {Array.isArray(items) && items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-200 shadow-sm"
                                >
                                    {item.file_type === 'video' ? (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                                            <video
                                                src={getMediaUrl(item.file_path)}
                                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                                                muted
                                                loop
                                                playsInline
                                            />
                                            <FiVideo className="w-12 h-12 text-white/50 z-10 drop-shadow-lg" />
                                        </div>
                                    ) : (
                                        <img
                                            src={getMediaUrl(item.file_path)}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <h3 className="text-white font-bold text-sm truncate drop-shadow-md mb-2">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/80 uppercase tracking-wider bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                                                {item.file_type}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                disabled={isDeleting}
                                                className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors backdrop-blur-sm"
                                                title="Delete Item"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Media Type Badge (always visible) */}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-md shadow-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                        {item.file_type === 'video' ? (
                                            <FiVideo className="w-4 h-4 text-blue-600" />
                                        ) : (
                                            <FiImage className="w-4 h-4 text-green-600" />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Add Media Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <AddMediaModal onClose={() => setIsAddModalOpen(false)} />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

function AddMediaModal({ onClose }) {
    const { mutate: createItem, isPending } = useCreateGalleryItem();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        file_type: 'image',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            // Generate preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('file_type', formData.file_type);
        data.append('file', selectedFile);

        createItem(data, {
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
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <FiUploadCloud className="text-[#E9B10C]" />
                        <span>Upload to Gallery</span>
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="E.g., Project Showcase 2024"
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                            <div className="flex space-x-4">
                                <label className={`flex-1 flex items-center justify-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${formData.file_type === 'image' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name="file_type"
                                        value="image"
                                        className="hidden"
                                        checked={formData.file_type === 'image'}
                                        onChange={(e) => {
                                            setFormData({ ...formData, file_type: e.target.value });
                                            setSelectedFile(null);
                                            setPreview(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                    />
                                    <FiImage />
                                    <span className="font-medium text-sm">Image</span>
                                </label>
                                <label className={`flex-1 flex items-center justify-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${formData.file_type === 'video' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name="file_type"
                                        value="video"
                                        className="hidden"
                                        checked={formData.file_type === 'video'}
                                        onChange={(e) => {
                                            setFormData({ ...formData, file_type: e.target.value });
                                            setSelectedFile(null);
                                            setPreview(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                    />
                                    <FiVideo />
                                    <span className="font-medium text-sm">Video</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept={formData.file_type === 'image' ? "image/*" : "video/*"}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {preview ? (
                                    formData.file_type === 'image' ? (
                                        <div className="absolute inset-0 w-full h-full">
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover opacity-50" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-md text-sm backdrop-blur-sm">Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 w-full h-full">
                                            <video src={preview} className="w-full h-full object-cover opacity-50" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-md text-sm backdrop-blur-sm">Change Video</span>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-col items-center text-gray-500">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <FiUploadCloud className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <span className="font-medium text-sm text-blue-600">Click to browse</span>
                                        <span className="text-xs mt-1">
                                            Supports {formData.file_type === 'image' ? 'JPG, PNG, GIF' : 'MP4, WebM'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {selectedFile && (
                                <p className="text-xs text-green-600 mt-2 flex items-center font-medium">
                                    Selected: {selectedFile.name}
                                </p>
                            )}
                        </div>

                        <div className="pt-4 flex items-center justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending || !selectedFile}
                                className={`flex items-center space-x-2 px-6 py-2.5 text-sm font-medium text-black bg-[#E9B10C] hover:bg-[#c4950a] rounded-lg transition-colors shadow-sm ${isPending || !selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isPending && <FiLoader className="w-4 h-4 animate-spin" />}
                                <span>{isPending ? 'Uploading...' : 'Upload Media'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
