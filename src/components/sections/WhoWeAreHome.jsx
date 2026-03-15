import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import aboutImg from '../../assets/images/new-images/hf_20260313_082321_c80c98a1-6ed3-4253-ab68-0c7975d82175.jpeg';

export default function WhoWeAreHome() {
    const { t } = useTranslation();
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
                                {t('who_we_are.label')}
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight font-primary">
                            {t('who_we_are.title_part1')} <br className="hidden md:block" />
                            {t('who_we_are.title_part2')}
                        </h2>

                        <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
                            <p>
                                {t('who_we_are.p1')}
                            </p>
                            <p>
                                {t('who_we_are.p2')}
                            </p>
                            <p>
                                {t('who_we_are.p3')}
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
                                alt={t('who_we_are.image_alt')}
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