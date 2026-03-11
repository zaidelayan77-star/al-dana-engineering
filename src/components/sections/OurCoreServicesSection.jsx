import React from 'react';
import { motion } from 'framer-motion';
import { FiMinimize2, FiLayers, FiDroplet, FiBriefcase, FiActivity } from 'react-icons/fi';
import { FaOilCan } from 'react-icons/fa';

export default function OurCoreServicesSection() {
    const services = [
        {
            icon: <FiMinimize2 className="w-8 h-8 text-[#E9B10C]" />,
            title: "Geotechnical Investigations",
            description: "Professional site investigation services to evaluate soil and ground conditions for engineering design.",
            points: [
                "Rotary drilling",
                "Standard Penetration Test (SPT)",
                "Soil and rock sampling",
                "Groundwater level monitoring",
                "Geotechnical reporting"
            ]
        },
        {
            icon: <FiActivity className="w-8 h-8 text-[#E9B10C]" />,
            title: "Geophysical Surveys",
            description: "Non-invasive methods to image the subsurface and identify underground features with high precision.",
            points: [
                "Ground Penetrating Radar (GPR)",
                "Electrical Resistivity Imaging (ERI)",
                "Seismic Refraction Surveys",
                "Electromagnetic Surveys",
                "Crosshole & Downhole testing"
            ]
        },
        {
            icon: <FiLayers className="w-8 h-8 text-[#E9B10C]" />,
            title: "Soil & Rock Testing",
            description: "Laboratory testing to determine soil and rock engineering characteristics and behavior.",
            points: [
                "Soil classification",
                "Particle size analysis",
                "Atterberg limits",
                "Moisture content testing",
                "Rock compressive strength",
                "Rock Quality Designation (RQD)"
            ]
        },
        {
            icon: <FiDroplet className="w-8 h-8 text-[#E9B10C]" />,
            title: "Chemical Testing",
            description: "Chemical analysis to evaluate soil and groundwater suitability for construction applications.",
            points: [
                "Sulphate content testing",
                "Chloride testing",
                "pH determination",
                "Water-soluble salts",
                "Groundwater chemical analysis"
            ]
        },
        {
            icon: <FiBriefcase className="w-8 h-8 text-[#E9B10C]" />,
            title: "Construction Material Testing",
            description: "Quality control testing for concrete and construction materials.",
            points: [
                "Concrete cube compression testing",
                "Concrete core testing",
                "Strength verification",
                "Laboratory material analysis"
            ]
        },
        {
            icon: <FaOilCan className="w-8 h-8 text-[#E9B10C]" />,
            title: "Oil & Gas Field Services",
            description: "Specialized testing and geotechnical support for onshore and offshore industrial projects.",
            points: [
                "Onshore soil investigation",
                "Offshore testing support",
                "Industrial site evaluation",
                "Laboratory analysis for energy projects"
            ]
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
        <section className="py-20 bg-[#F8F9FA]">
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
                        OUR CORE SERVICES
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        What We Deliver
                    </h2>
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full"></div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col items-start h-full group"
                        >
                            <div className="w-16 h-16 bg-[#FFF8E1] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#E9B10C] transition-colors duration-300">
                                {React.cloneElement(service.icon, { className: "w-8 h-8 text-[#E9B10C] group-hover:text-white transition-colors duration-300" })}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#E9B10C] transition-colors duration-300">
                                {service.title}
                            </h3>

                            <p className="text-gray-500 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-3 mt-auto">
                                {service.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-600">
                                        <span className="w-1.5 h-1.5 bg-[#E9B10C] rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}