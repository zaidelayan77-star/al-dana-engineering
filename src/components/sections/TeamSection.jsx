import React from 'react';
import { motion } from 'framer-motion';
import { useGetTeamMembers } from '../../hooks/useTeamMembers';
import { FiChevronRight, FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function TeamSection({ limit = 4, showHeader = true, isFullPage = false }) {
    const { data: members, isLoading } = useGetTeamMembers();

    const getMediaUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `https://al-danaengineering.com/api/storage/app/public/${cleanPath}`;
    };

    if (isLoading) return null;

    const displayMembers = isFullPage ? members : members?.slice(0, limit);

    if (!displayMembers || displayMembers.length === 0) return null;

    return (
        <section className={`py-20 ${isFullPage ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {showHeader && (
                    <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6`}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            <h3 className="text-[#E9B10C] font-bold text-sm tracking-[0.2em] uppercase mb-3 text-shadow-sm">
                                OUR EXPERTS
                            </h3>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary text-shadow-sm">
                                Meet Our Dedicated Team
                            </h2>
                            <p className="text-gray-500 text-lg leading-relaxed font-light">
                                Our strength lies in our people. From senior engineers to field technicians, our team is dedicated to precision and engineering excellence.
                            </p>
                        </motion.div>

                        {!isFullPage && members.length > limit && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Link
                                    to="/team"
                                    className="inline-flex items-center space-x-2 text-[#E9B10C] font-bold hover:text-[#c4950a] transition-all group border-b-2 border-[#E9B10C] pb-1"
                                >
                                    <span>View All Team Members</span>
                                    <FiChevronRight className="transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-6 shadow-xl bg-white border border-gray-100">
                                {member.image ? (
                                    <img
                                        src={getMediaUrl(member.image)}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
                                        <FiUsers className="w-24 h-24" />
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Info Box (Overlay) */}
                                <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white/80 text-sm italic line-clamp-3">
                                        {member.description}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center">
                                <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#E9B10C] transition-colors duration-300">
                                    {member.name}
                                </h4>
                                <p className="text-[#E9B10C] text-sm font-bold uppercase tracking-widest mt-1 flex items-center justify-center gap-2">
                                    <FiBriefcase className="w-3 h-3" />
                                    {member.position}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
