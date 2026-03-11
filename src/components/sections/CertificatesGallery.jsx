import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMaximize2, FiX, FiLoader, FiAward } from 'react-icons/fi';
import { useGetCertificates } from '../../hooks/useCertificates';

export default function CertificatesGallery() {
    const { data: certificates, isLoading } = useGetCertificates();
    const [selectedImage, setSelectedImage] = useState(null);

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const items = certificates || [];

    return (
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            CERTIFICATES
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-primary">
                            Official Documentation
                        </h2>
                    </motion.div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <FiLoader className="w-8 h-8 text-[#E9B10C] animate-spin" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-white text-gray-500">
                        <FiAward className="w-12 h-12 text-gray-300 mb-3" />
                        <p>Certifications will be displayed here soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                            >
                                <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                                    {cert.image ? (
                                        <img
                                            src={getMediaUrl(cert.image)}
                                            alt={cert.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-yellow-50">
                                            <FiAward className="text-[#E9B10C] w-16 h-16 opacity-50" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => setSelectedImage(cert)}
                                            className="p-3 bg-white rounded-full text-gray-900 hover:text-[#E9B10C] transition-colors shadow-lg"
                                            title="View Fullsize"
                                        >
                                            <FiMaximize2 />
                                        </button>
                                        {cert.pdf && (
                                            <a
                                                href={getMediaUrl(cert.pdf)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-[#E9B10C] rounded-full text-white hover:bg-[#c4950a] transition-colors shadow-lg"
                                                title="Download PDF"
                                            >
                                                <FiDownload />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-[#E9B10C] transition-colors">
                                        {cert.title}
                                    </h3>
                                    {cert.description && (
                                        <p className="text-gray-500 text-xs line-clamp-2 mt-1">{cert.description}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10 p-2 bg-white/10 rounded-full"
                        onClick={() => setSelectedImage(null)}
                    >
                        <FiX size={28} />
                    </button>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-h-[85vh] max-w-[90vw] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={getMediaUrl(selectedImage.image)}
                            alt={selectedImage.title}
                            className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
                        />
                        <div className="mt-4 text-center text-white">
                            <h3 className="font-bold text-lg mb-1">{selectedImage.title}</h3>
                            {selectedImage.pdf && (
                                <a
                                    href={getMediaUrl(selectedImage.pdf)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 px-6 py-2 bg-[#E9B10C] text-black rounded-lg font-bold text-sm hover:bg-[#c4950a] transition-colors mt-2"
                                >
                                    <FiDownload />
                                    <span>Download PDF</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
