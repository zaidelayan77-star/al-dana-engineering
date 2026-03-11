import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiPlus, FiX, FiLoader, FiUploadCloud, FiFileText, FiImage, FiAward, FiEye } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import { useGetCertificates, useCreateCertificate, useDeleteCertificate } from '../../../hooks/useCertificates';

export default function CertificationsManager() {
    const { data: certificates, isLoading, error } = useGetCertificates();
    const { mutate: deleteCertificate, isPending: isDeleting } = useDeleteCertificate();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Get absolute URL for media similar to Gallery Strategy
    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this certificate?')) {
            deleteCertificate(id);
        }
    };

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Certifications & Awards</h2>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#E9B10C] text-black font-medium rounded-lg hover:bg-[#c4950a] transition-colors shadow-sm"
                    >
                        <FiPlus className="w-5 h-5" />
                        <span>Add Certificate</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading certificates...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading certificates. Please try again later.</p>
                    </div>
                ) : !certificates || certificates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <FiAward className="w-12 h-12 mb-3 text-gray-300" />
                        <p>No certificates found. Add your first certification.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {Array.isArray(certificates) && certificates.map((cert) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col group relative"
                                >
                                    <div className="relative h-48 bg-gray-200 overflow-hidden flex-shrink-0">
                                        <img
                                            src={getMediaUrl(cert.image)}
                                            alt={cert.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.insertAdjacentHTML('afterend', '<div class="absolute inset-0 flex items-center justify-center bg-gray-100"><span class="text-xs text-gray-400">No Image</span></div>');
                                            }}
                                        />

                                        <div className="absolute top-2 right-2 flex space-x-1 opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleDelete(cert.id)}
                                                disabled={isDeleting}
                                                className="p-2 bg-white hover:bg-red-50 hover:text-red-500 text-gray-600 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                                                title="Delete Certificate"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-1 pb-5">
                                        <h3 className="font-bold text-gray-900 mb-2 text-lg line-clamp-1" title={cert.title}>
                                            {cert.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1" title={cert.description}>
                                            {cert.description}
                                        </p>

                                        {cert.pdf && (
                                            <a
                                                href={getMediaUrl(cert.pdf)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center space-x-2 w-full py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-100 mt-auto"
                                            >
                                                <FiEye className="w-4 h-4" />
                                                <span>View PDF</span>
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Add Certificate Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <AddCertificateModal onClose={() => setIsAddModalOpen(false)} />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

function AddCertificateModal({ onClose }) {
    const { mutate: createCert, isPending } = useCreateCertificate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    const imageInputRef = useRef(null);
    const pdfInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPdfFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // As per parameters required
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);

        if (imageFile) {
            data.append('image', imageFile);
        }

        if (pdfFile) {
            data.append('pdf', pdfFile);
        }

        createCert(data, {
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
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <FiAward className="text-[#E9B10C]" />
                        <span>Add New Certificate</span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto w-full">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Title <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="E.g., ISO 9001:2015"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Enter brief description of the certificate..."
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Image <span className="text-red-500">*</span></label>
                                    <div
                                        onClick={() => imageInputRef.current?.click()}
                                        className="h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden"
                                    >
                                        <input
                                            type="file"
                                            ref={imageInputRef}
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            required={!imageFile}
                                        />

                                        {imagePreview ? (
                                            <div className="absolute inset-0">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">Change</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-500">
                                                <FiImage className="w-6 h-6 mb-2 text-gray-400" />
                                                <span className="text-xs font-medium">Click to upload image</span>
                                            </div>
                                        )}
                                    </div>
                                    {imageFile && <p className="text-xs text-green-600 mt-1 truncate">Selected: {imageFile.name}</p>}
                                </div>

                                {/* PDF Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Document (PDF)</label>
                                    <div
                                        onClick={() => pdfInputRef.current?.click()}
                                        className={`h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors relative overflow-hidden ${pdfFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <input
                                            type="file"
                                            ref={pdfInputRef}
                                            accept="application/pdf"
                                            onChange={handlePdfChange}
                                            className="hidden"
                                        />

                                        {pdfFile ? (
                                            <div className="flex items-center space-x-2 text-green-700">
                                                <FiFileText className="w-5 h-5" />
                                                <span className="text-xs font-medium truncate max-w-[200px]">Change PDF ({pdfFile.name})</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-2 text-gray-500">
                                                <FiUploadCloud className="w-5 h-5 text-gray-400" />
                                                <span className="text-xs font-medium">Upload PDF (Optional)</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
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
                                disabled={isPending || (!imageFile && !formData.title)}
                                className={`flex items-center space-x-2 px-6 py-2.5 text-sm font-medium text-black bg-[#E9B10C] hover:bg-[#c4950a] rounded-lg transition-colors shadow-sm ${isPending || (!imageFile && !formData.title) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isPending && <FiLoader className="w-4 h-4 animate-spin" />}
                                <span>{isPending ? 'Saving...' : 'Save Certificate'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
