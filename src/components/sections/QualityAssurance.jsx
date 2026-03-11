import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaAward, FaCheckCircle } from 'react-icons/fa';

export default function QualityAssurance() {
    const items = [
        {
            icon: <FaShieldAlt size={28} />,
            title: "ISO/IEC 17025:2017",
            description: "Accredited for testing and calibration laboratories, ensuring competence, impartiality, and consistent operation."
        },
        {
            icon: <FaAward size={28} />,
            title: "ENAS Accredited",
            description: "Emirates National Accreditation System certified laboratory with recognized testing capabilities."
        },
        {
            icon: <FaCheckCircle size={28} />,
            title: "Government Approved",
            description: "Pre-qualified and approved by UAE government entities for engineering and testing services."
        }
    ];

    return (
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center space-x-4 mb-4"
                    >
                        <div className="h-0.5 w-12 bg-[#E9B10C]"></div>
                        <span className="text-[#666666] font-bold text-xs tracking-[0.2em] uppercase">
                            QUALITY ASSURANCE
                        </span>
                        <div className="h-0.5 w-12 bg-[#E9B10C]"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 font-primary"
                    >
                        Certifications & Accreditation
                    </motion.h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white p-10 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center border border-gray-100"
                        >
                            <div className="w-16 h-16 mx-auto bg-[#FFF9E5] rounded-full flex items-center justify-center text-[#E9B10C] mb-6 shadow-sm">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}