import React from 'react';
import { motion } from 'framer-motion';
import ourPeopleImg from '../../assets/images/new-images/العامل مع التابلت.png';

export default function OurPeople() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={ourPeopleImg}
                                alt="Al Dana Our Team"
                                className="w-full h-full object-cover"
                            />
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-24 h-2 bg-[#E9B10C]" />
                        </div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col space-y-6"
                    >
                        <div>
                            <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3">
                                OUR PEOPLE
                            </h3>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Our Team
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Our team consists of experienced engineers, geologists, laboratory
                                specialists, and field technicians who operate according to international
                                standards to ensure accurate and dependable testing results.
                            </p>
                            <p>
                                With decades of combined expertise across geotechnical engineering,
                                chemical analysis, and construction material testing, our professionals are
                                committed to delivering excellence in every project.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}