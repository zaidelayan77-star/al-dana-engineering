import React from 'react';
import { motion } from 'framer-motion';
import whoWeAreImg from '../../assets/images/new-images/مختبر فحص التربة 1.png';

export default function WhoWeAreSection() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col space-y-6"
                    >
                        <div>
                            <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                                WHO WE ARE
                            </h3>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Al Dana Engineering Laboratories
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Al Dana Engineering Laboratories is a specialized engineering laboratory
                                established in 1996 in Abu Dhabi, United Arab Emirates.
                            </p>
                            <p>
                                We provide geotechnical investigations, soil testing, and construction material
                                testing services to support infrastructure, building, and industrial
                                developments across the UAE.
                            </p>
                            <p>
                                Our mission is to deliver accurate data, reliable analysis, and certified
                                engineering reports that help clients make safe and confident decisions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={whoWeAreImg}
                                alt="Al Dana Laboratory Team"
                                className="w-full h-full object-cover"
                            />
                            {/* Decorative element if needed, matching style */}
                            <div className="absolute bottom-0 left-0 w-24 h-2 bg-[#E9B10C]" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}