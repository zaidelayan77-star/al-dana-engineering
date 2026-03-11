import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2, FiLoader, FiVideo } from 'react-icons/fi';
import HeroPages from '../shared/HeroPages';
import coverImg from '../../assets/images/1 (6).jpg';
import ContactOurTeamSection from '../sections/ContactOurTeamSection';
import { useGetGalleryItems } from '../../hooks/useGallery';

export default function Gallery() {
    const { data: galleryItems, isLoading, error } = useGetGalleryItems();
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    const items = galleryItems || [];

    const openModal = (index) => {
        setCurrentIndex(index);
        setSelectedMedia(items[index]);
    };

    const closeModal = () => {
        setSelectedMedia(null);
    };

    const nextMedia = (e) => {
        e.stopPropagation();
        if (items.length === 0) return;
        const newIndex = (currentIndex + 1) % items.length;
        setCurrentIndex(newIndex);
        setSelectedMedia(items[newIndex]);
    };

    const prevMedia = (e) => {
        e.stopPropagation();
        if (items.length === 0) return;
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        setCurrentIndex(newIndex);
        setSelectedMedia(items[newIndex]);
    };

    return (
        <div className="w-full">
            <HeroPages
                image={coverImg}
                subtitle="GALLERY"
                title="Our Project Portfolio"
                description="Explore visual documentation of our engineering excellence across various projects."
            />

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                                OUR WORK
                            </h3>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary">
                                Complete Media Gallery
                            </h2>
                            <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
                                A comprehensive look at our field investigations, laboratory testing, and successful project deliveries.
                            </p>
                        </motion.div>
                    </div>

                    {/* Loading State / Error / Grid */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <FiLoader className="w-12 h-12 text-[#E9B10C] animate-spin mb-4" />
                            <p className="text-gray-500 font-medium">Loading gallery items...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-2xl border border-red-100 max-w-2xl mx-auto">
                            <p className="text-red-500 font-bold mb-2">Error loading gallery</p>
                            <p className="text-gray-600 text-sm">Please try again later.</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-3xl bg-white max-w-3xl mx-auto text-center">
                            <p className="text-gray-500 font-medium text-lg">No media available at the moment.</p>
                            <p className="text-gray-400 text-sm mt-2">Check back later for exciting project updates.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
                                    className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 bg-black"
                                    onClick={() => openModal(index)}
                                >
                                    {item.file_type === 'video' ? (
                                        <video
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80"
                                            src={getMediaUrl(item.file_path)}
                                            muted playsInline loop autoPlay
                                        />
                                    ) : (
                                        <img
                                            src={getMediaUrl(item.file_path)}
                                            alt={item.title || "Gallery Image"}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            {item.file_type === 'video' ? (
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md mb-2">
                                                    <FiVideo className="text-white text-xl" />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md mb-2">
                                                    <FiMaximize2 className="text-white text-xl" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white font-bold text-lg truncate drop-shadow-md">{item.title}</p>
                                        <p className="text-white/80 text-xs font-medium uppercase tracking-wider mt-1 drop-shadow-sm">{item.file_type}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Media Modal */}
                <AnimatePresence>
                    {selectedMedia && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                            onClick={closeModal}
                        >
                            {/* Controls */}
                            <button
                                className="absolute top-6 right-6 text-white/50 hover:text-[#E9B10C] transition-colors z-[110] p-2 bg-white/5 rounded-full hover:bg-white/10"
                                onClick={closeModal}
                            >
                                <FiX size={28} />
                            </button>

                            <button
                                className="absolute left-4 md:left-8 text-white/50 hover:text-[#E9B10C] transition-colors z-[110] p-4 bg-white/5 hover:bg-white/10 rounded-full"
                                onClick={prevMedia}
                            >
                                <FiChevronLeft size={32} />
                            </button>

                            {/* Content */}
                            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 max-w-6xl mx-auto cursor-default pointer-events-none" onClick={(e) => e.stopPropagation()}>
                                <motion.div
                                    key={selectedMedia.id + currentIndex} // Key change triggers animation
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full max-h-[75vh] flex items-center justify-center pointer-events-auto shadow-2xl overflow-hidden rounded-xl relative"
                                >
                                    {selectedMedia.file_type === 'video' ? (
                                        <video
                                            controls
                                            autoPlay
                                            className="max-h-full max-w-full object-contain bg-black rounded-lg"
                                            src={getMediaUrl(selectedMedia.file_path)}
                                        />
                                    ) : (
                                        <img
                                            src={getMediaUrl(selectedMedia.file_path)}
                                            alt={selectedMedia.title}
                                            className="max-h-full max-w-full object-contain rounded-lg bg-black/50"
                                        />
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-6 text-center z-50 bg-black/40 px-8 py-4 rounded-2xl backdrop-blur-md pointer-events-auto border border-white/10"
                                >
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 shadow-black">{selectedMedia.title}</h3>
                                    <p className="text-[#E9B10C] text-sm font-medium tracking-widest uppercase">
                                        Item {currentIndex + 1} of {items.length}
                                    </p>
                                </motion.div>
                            </div>

                            <button
                                className="absolute right-4 md:right-8 text-white/50 hover:text-[#E9B10C] transition-colors z-[110] p-4 bg-white/5 hover:bg-white/10 rounded-full"
                                onClick={nextMedia}
                            >
                                <FiChevronRight size={32} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <ContactOurTeamSection />
        </div>
    );
}