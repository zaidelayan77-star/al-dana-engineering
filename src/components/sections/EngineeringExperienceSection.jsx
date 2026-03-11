import React from 'react';
import { motion } from 'framer-motion';

export default function EngineeringExperienceSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Decorative Line */}
                    <div className="w-16 h-1 bg-[#E9B10C] mx-auto rounded-full mb-8"></div>

                    {/* Main Title */}
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        Engineering Experience You Can Trust
                    </h2>

                    {/* Content */}
                    <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed">
                        <p>
                            Al Dana Engineering Laboratories has contributed to numerous infrastructure, construction, and industrial developments by providing accurate geotechnical investigations and material testing services.
                        </p>
                        <p>
                            Our project experience reflects our commitment to quality, safety, and reliable engineering support.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}