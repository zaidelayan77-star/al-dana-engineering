import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiSearch, FiFileText } from 'react-icons/fi';
import { FaFlask, FaChartBar } from 'react-icons/fa';

export default function OurProcessSection() {
    const steps = [
        {
            icon: <FiMapPin className="w-6 h-6 text-[#E9B10C]" />,
            number: "01",
            title: "Site Work",
            description: "Evaluate project scope and requirements"
        },
        {
            icon: <FiSearch className="w-6 h-6 text-[#E9B10C]" />,
            number: "02",
            title: "Site Assessment ",
            description: "On-site drilling, sampling and data collection"
        },
        {
            icon: <FaFlask className="w-6 h-6 text-[#E9B10C]" />,
            number: "03",
            title: "Laboratory Testing",
            description: "Comprehensive testing in our accredited lab"
        },
        {
            icon: <FaChartBar className="w-6 h-6 text-[#E9B10C]" />,
            number: "04",
            title: "Engineering Analysis",
            description: "Expert interpretation of test results"
        },
        {
            icon: <FiFileText className="w-6 h-6 text-[#E9B10C]" />,
            number: "05",
            title: "Final Report",
            description: "Detailed reports with actionable insights"
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        OUR PROCESS
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        How We Deliver Our Services
                    </h2>
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full"></div>
                </motion.div>

                {/* Process Steps */}
                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[44px] left-0 right-0 h-0.5 bg-gray-100 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-white border-2 border-[#E9B10C] flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all duration-300 relative z-10">
                                    {step.icon}
                                </div>

                                <span className="text-[#E9B10C] font-bold text-sm mb-3 block">
                                    {step.number}
                                </span>

                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}