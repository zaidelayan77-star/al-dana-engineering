import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/images/new-images/شاحنة الحفر.png';

export default function HomeHero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-no-repeat bg-[position:50%_38%]"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-[#3F2E00]/30 mix-blend-overlay"></div> {/* Adding a warm/sepia tone */}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h3 className="text-[#E9B10C] font-bold text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
                        AL DANA ENGINEERING LABORATORIES
                    </h3>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight font-primary"
                >
                    STRONG FOUNDATIONS
                    <span className="block text-[#E9B10C] mt-2">FOR A SAFER FUTURE</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-4 mb-10"
                >
                    <p className="text-gray-200 text-lg md:text-xl font-medium tracking-wide">
                        Trusted Geotechnical & Soil Testing Expertise Since 1996
                    </p>
                    <p className="text-gray-400 text-sm md:text-base font-light italic">
                        Accurate Samples. Better Engineering Decisions.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <Link to="/services">
                        <button className="px-8 py-3 bg-[#E9B10C] text-black font-bold text-sm tracking-wider uppercase rounded hover:bg-[#c4950a] transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(233,177,12,0.3)]">
                            OUR SERVICES
                        </button>
                    </Link>
                    <Link to="/contact-us">
                        <button className="px-8 py-3 bg-transparent border border-white text-white font-bold text-sm tracking-wider uppercase rounded hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                            CONTACT US
                        </button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
            >
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-1 h-2 bg-[#E9B10C] rounded-full"
                    />
                </div>
            </motion.div>

            {/* Hard Hat Decoration (Simulated/Optional if asset missing) */}
            {/* If we had a PNG of the hat, we'd place it absolutely at bottom right. 
                I'll omit it for now as I don't see a clear 'hat.png' in the file list, 
                but structure is ready for it. */}
            {/* <img src={hatImg} className="absolute bottom-0 right-10 w-64 md:w-96 z-10 hidden lg:block" alt="Safety Helmet" /> */}
        </section>
    );
}
