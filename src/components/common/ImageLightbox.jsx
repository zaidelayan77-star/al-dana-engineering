import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';

const ImageLightbox = ({ isOpen, imageSrc, onClose, altText }) => {
  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!imageSrc) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
          onClick={onClose}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-6 right-6 z-[10000] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20 group"
            onClick={onClose}
          >
            <FiX className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </motion.button>

          <div className="absolute top-6 left-6 flex items-center space-x-3 z-[10000]">
            <a
              href={imageSrc}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20 group"
              onClick={(e) => e.stopPropagation()}
            >
              <FiDownload className="w-5 h-5" />
            </a>
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20 group"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc}
              alt={altText || 'Project Media'}
              className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            />
            {altText && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium whitespace-nowrap"
              >
                {altText}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
