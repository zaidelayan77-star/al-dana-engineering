import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMountain, FaFlask, FaVials, FaMapMarkedAlt, FaCity, FaIndustry, FaSearchLocation } from 'react-icons/fa';

export default function OurServicesHome() {
    const services = [
        {
            icon: <FaMountain size={24} />,
            title: "Geotechnical Investigations",
            description: "Rotary drilling, SPT testing, soil and rock sampling, groundwater level measurement."
        },
        {
            icon: <FaFlask size={24} />,
            title: "Soil Testing Services",
            description: "Soil classification, particle size analysis, Atterberg limits, rock strength testing."
        },
        {
            icon: <FaVials size={24} />,
            title: "Chemical Testing",
            description: "Sulphates, chlorides, pH testing, soil and groundwater chemical analysis."
        },
        {
            icon: <FaMapMarkedAlt size={24} />,
            title: "Geophysical Services",
            description: "Subsurface investigations using advanced geophysical techniques."
        },
        {
            icon: <FaCity size={24} />,
            title: "Building Material Testing",
            description: "Concrete cube testing, compression strength testing, concrete core testing."
        },
        {
            icon: <FaIndustry size={24} />,
            title: "Oil & Gas Services",
            description: "Onshore and offshore soil testing and laboratory support for energy sector projects."
        },
        {
            icon: <FaSearchLocation size={24} />,
            title: "Site Investigation",
            description: "Testing and analysis of soil properties for safe and reliable construction."
        }
    ];

    return (
        <section className="py-20 bg-[#F4F4F4]">
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
                            WHAT WE DO
                        </span>
                        <div className="h-0.5 w-12 bg-[#E9B10C]"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 font-primary"
                    >
                        Our Services
                    </motion.h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
                        >
                            <div className="w-14 h-14 bg-[#FFF9E5] rounded-lg flex items-center justify-center text-[#E9B10C] mb-6 group-hover:bg-[#E9B10C] group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#E9B10C] transition-colors duration-300">
                                {service.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>

                            <Link to="/services" className="inline-flex items-center text-xs font-bold text-[#E9B10C] uppercase tracking-wider hover:text-[#c4950a] transition-colors">
                                Learn More
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 text-center">
                    <Link to="/services">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-[#E9B10C] text-white font-bold rounded hover:bg-[#c4950a] transition-colors shadow-lg uppercase tracking-wider text-sm"
                        >
                            View All Services
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}