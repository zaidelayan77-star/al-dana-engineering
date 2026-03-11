import React from 'react';
import { motion } from 'framer-motion';
import aboutImg from '../../assets/images/new-images/مراجعة المخططات.png';

export default function WhoWeAreHome() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="h-0.5 w-8 bg-[#E9B10C]"></div>
                            <span className="text-[#666666] font-bold text-xs tracking-[0.2em] uppercase">
                                WHO WE ARE
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight font-primary">
                            About Al Dana <br className="hidden md:block" />
                            Engineering Laboratories
                        </h2>

                        <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
                            <p>
                                Al Dana Engineering Laboratories is a specialized engineering laboratory established in 1996 in Abu Dhabi, United Arab Emirates.
                            </p>
                            <p>
                                We provide professional geotechnical investigations, soil testing, and construction material testing services to support infrastructure, building, and industrial projects.
                            </p>
                            <p>
                                With over 25 years of experience, we deliver accurate data and certified reports that enable safe, reliable, and informed engineering decisions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Image Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-lg overflow-hidden shadow-2xl">
                            {/* The image in the screenshot has a hard hat in foreground and construction site in background. 
                                 Using the provided asset assuming it matches. */}
                            <img
                                src={aboutImg}
                                alt="Construction Site with Hard Hat"
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Gold Box Outline */}
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 border-4 border-[#E9B10C] rounded-lg -z-10 hidden md:block"></div>

                        {/* Alternative decoration if the box is meant to overlap the image as shown in some designs */}
                        <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 border-[6px] border-[#E9B10C] rounded-lg z-10 hidden md:block opacity-80 pointer-events-none"></div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}