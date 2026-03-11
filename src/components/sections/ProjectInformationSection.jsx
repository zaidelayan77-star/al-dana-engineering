import React from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiMapPin, FiLayers, FiUser, FiBriefcase } from 'react-icons/fi';
import { FaVials } from 'react-icons/fa';

export default function ProjectInformationSection() {
    const details = [
        {
            icon: <FiFolder className="w-6 h-6 text-[#E9B10C]" />,
            label: "PROJECT NAME",
            value: "Geotechnical Investigation — Al Reem Island Tower"
        },
        {
            icon: <FiBriefcase className="w-6 h-6 text-[#E9B10C]" />,
            label: "CLIENT NAME",
            value: "Aldar Properties PJSC"
        },
        {
            icon: <FiMapPin className="w-6 h-6 text-[#E9B10C]" />,
            label: "LOCATION",
            value: "Al Reem Island, Abu Dhabi, UAE"
        },
        {
            icon: <FiLayers className="w-6 h-6 text-[#E9B10C]" />,
            label: "BOREHOLE DEPTH",
            value: "30m (6 Boreholes)"
        },
        {
            icon: <FaVials className="w-6 h-6 text-[#E9B10C]" />,
            label: "NUMBER OF SAMPLES",
            value: "48 Disturbed + 18 Undisturbed"
        },
        {
            icon: <FiUser className="w-6 h-6 text-[#E9B10C]" />,
            label: "PROJECT ENGINEER",
            value: "Eng. Ahmed Al Mansoori"
        }
    ];

    return (
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Project Details Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            PROJECT INFORMATION
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Project Details
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {details.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="bg-[#FFF9E5] p-3 rounded-lg flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                        {item.label}
                                    </h4>
                                    <p className="text-gray-900 font-bold text-sm md:text-base leading-snug">
                                        {item.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Investigation Summary Section */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                            PROJECT OVERVIEW
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Investigation Summary
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="text-gray-600 space-y-6 leading-relaxed text-lg">
                            <p>
                                This investigation project evaluates subsurface soil conditions to support foundation design and construction safety requirements for the proposed high-rise tower development on Al Reem Island, Abu Dhabi.
                            </p>
                            <p>
                                The scope of work includes rotary borehole drilling to depths of 30 meters, Standard Penetration Testing (SPT) at regular intervals, collection of disturbed and undisturbed soil samples, and groundwater level measurements. Laboratory testing encompasses soil classification, particle size analysis, Atterberg limits, moisture content determination, and chemical analysis including sulphate, chloride, and pH testing of soil and groundwater samples.
                            </p>
                            <p>
                                All field and laboratory operations are conducted in accordance with BS, ASTM, and relevant international standards. The final geotechnical investigation report will provide engineering recommendations for foundation design, bearing capacity assessment, and settlement analysis to ensure safe and reliable construction outcomes.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}