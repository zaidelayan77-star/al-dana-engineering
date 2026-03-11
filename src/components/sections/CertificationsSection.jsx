import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiShield, FiSettings } from 'react-icons/fi';
import { FaBuilding } from 'react-icons/fa';

export default function CertificationsSection() {
    const certifications = [
        {
            icon: <FiAward className="w-8 h-8 text-[#E9B10C]" />,
            title: "ISO/IEC 17025:2017",
            description: "Accredited for testing and calibration laboratories, ensuring competence, impartiality, and consistent operation."
        },
        {
            icon: <FiShield className="w-8 h-8 text-[#E9B10C]" />,
            title: "ENAS Accredited",
            description: "Emirates National Accreditation System certified laboratory with recognized testing capabilities."
        },
        {
            icon: <FaBuilding className="w-8 h-8 text-[#E9B10C]" />,
            title: "Government Approved",
            description: "Pre-qualified and approved by UAE government entities for engineering and testing services."
        },
        {
            icon: <FiSettings className="w-8 h-8 text-[#E9B10C]" />,
            title: "Calibrated Equipment",
            description: "Continuous quality assurance with regularly calibrated instruments meeting international compliance."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                        CERTIFICATIONS
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        Quality & Accreditation
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {certifications.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 bg-[#FFF8E1] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E9B10C] transition-colors duration-300">
                                {React.cloneElement(item.icon, { className: "w-8 h-8 text-[#E9B10C] group-hover:text-white transition-colors duration-300" })}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}