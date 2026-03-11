import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiCamera, FiLoader } from 'react-icons/fi';
import AdminLayout from './AdminLayout';
import { useGetProfile, useUpdateProfile } from '../../hooks/useProfile';

export default function UserProfile() {
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phone: '',
        jobTitle: '',
        company: '',
        bio: '',
        location: ''
    });

    const storedUserStr = localStorage.getItem('user');
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
    const userId = storedUser?.id;

    const { data: profile, isLoading } = useGetProfile(userId);
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    useEffect(() => {
        if (profile) {
            setUserData({
                fullName: profile.full_name || '',
                email: profile.email || '',
                phone: profile.phone || '',
                jobTitle: profile.job_title || '',
                company: profile.company || '',
                bio: profile.bio || '',
                location: profile.location || ''
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userId) return;

        const profileData = {
            full_name: userData.fullName,
            job_title: userData.jobTitle,
            company: userData.company,
            location: userData.location,
            bio: userData.bio
        };

        updateProfile({ userId, profileData });
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-full min-h-[50vh]">
                    <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C]" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500">Manage your personal information</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Cover & Avatar */}
                    <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-900 relative"></div>
                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-8 flex items-end">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500 uppercase">
                                    {userData.fullName ? userData.fullName.charAt(0) : '?'}
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={userData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none cursor-not-allowed"
                                        title="Email cannot be changed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none cursor-not-allowed"
                                        title="Phone number cannot be changed here"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={userData.jobTitle}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={userData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={userData.location}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    rows="4"
                                    value={userData.bio}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isPending}
                                    className={`flex items-center space-x-2 px-6 py-2 bg-[#E9B10C] text-white rounded-lg hover:bg-[#c4950a] transition-colors font-medium shadow-md ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isPending ? <FiLoader className="animate-spin" /> : <FiSave />}
                                    <span>{isPending ? 'Saving...' : 'Save Changes'}</span>
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
