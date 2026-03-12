import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';
import img1 from '../../assets/images/new-images/شاحنة الحفر.png';
import img2 from '../../assets/images/new-images/فريق الحفر.png';
import img3 from '../../assets/images/new-images/عامل يفحص المواد (1).png';
import img4 from '../../assets/images/new-images/مختبر فحص التربة 3.png';

export default function ProjectDocumentationSection() {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { id: 1, src: img1, alt: t('gallery.items.drilling') },
        { id: 2, src: img2, alt: t('gallery.items.team') },
        { id: 3, src: img3, alt: t('gallery.items.testing') },
        { id: 4, src: img4, alt: t('gallery.items.analysis') }
    ];

    const openModal = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index]);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex]);
    };

    return (
        <section className="py-20 bg-white">
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
                            {t('gallery.label')}
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary">
                            {t('gallery.title')}
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
                            {t('gallery.desc')}
                        </p>
                    </motion.div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                            onClick={() => openModal(index)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <FiMaximize2 className="text-white text-3xl transform scale-50 group-hover:scale-100 transition-transform duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-12 text-center">
                    <Link to="/gallery">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-[#E9B10C] text-white font-bold rounded-lg hover:bg-[#c4950a] transition-colors shadow-md uppercase tracking-wider text-sm"
                        >
                            {t('gallery.view_all')}
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={closeModal}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
                            onClick={closeModal}
                        >
                            <FiX size={32} />
                        </button>

                        <button
                            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-50 p-4 bg-black/20 hover:bg-black/40 rounded-full"
                            onClick={prevImage}
                        >
                            <FiChevronLeft size={32} />
                        </button>

                        <motion.img
                            key={selectedImage.src}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-4 bg-black/20 hover:bg-black/40 rounded-full"
                            onClick={nextImage}
                        >
                            <FiChevronRight size={32} />
                        </button>

                        <div className="absolute bottom-6 left-0 right-0 text-center text-white/80 font-medium tracking-wider">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}