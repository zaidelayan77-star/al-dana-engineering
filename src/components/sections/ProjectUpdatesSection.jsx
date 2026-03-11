import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMessageSquare } from 'react-icons/fi';

export default function ProjectUpdatesSection() {
    const updates = [
        {
            date: "15 March 2026",
            message: "Final laboratory testing phase initiated for chemical analysis of groundwater samples.",
            isMilestone: false
        },
        {
            date: "12 March 2026",
            message: "Samples transferred to laboratory for geotechnical and chemical testing.",
            isMilestone: true
        },
        {
            date: "8 March 2026",
            message: "Field investigation completed. All 48 disturbed and 18 undisturbed samples collected successfully.",
            isMilestone: true
        },
        {
            date: "3 March 2026",
            message: "Drilling operations commenced at Borehole BH-1. SPT testing underway.",
            isMilestone: false
        },
        {
            date: "28 February 2026",
            message: "Engineering team mobilized to Al Reem Island site. Equipment setup complete.",
            isMilestone: false
        },
        {
            date: "22 February 2026",
            message: "Project documentation approved. Investigation plan confirmed by client.",
            isMilestone: true
        }
    ];

    return (
        <section className="py-20 bg-[#F4F4F4]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            PROJECT UPDATES
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary">
                            Client Notes & Timeline
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
                            Chronological updates on your project activities and milestones.
                        </p>
                    </motion.div>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-gray-200 ml-3 md:ml-6 space-y-8">
                    {updates.map((update, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Dot Marker */}
                            <span
                                className={`absolute left-[-9px] top-6 w-4 h-4 rounded-full border-2 bg-[#F4F4F4] transition-colors duration-300 ${update.isMilestone ? 'border-[#E9B10C] bg-[#E9B10C]' : 'border-gray-300'
                                    }`}
                                style={{ left: '-9px' }}
                            ></span>

                            {/* Card Content */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                                    <div className="flex items-center text-gray-500 text-sm font-mono tracking-wide">
                                        <FiClock className="mr-2" />
                                        {update.date}

                                        {update.isMilestone && (
                                            <span className="ml-4 px-2 py-0.5 bg-[#FFF9E5] text-[#E9B10C] text-[10px] font-bold uppercase tracking-wider rounded">
                                                MILESTONE
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start text-gray-700 leading-relaxed group">
                                    <FiMessageSquare className="w-5 h-5 mr-3 mt-1 text-gray-400 group-hover:text-[#E9B10C] transition-colors" />
                                    <p>{update.message}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}