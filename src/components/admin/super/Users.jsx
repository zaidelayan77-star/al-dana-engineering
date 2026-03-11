import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiTrash2, FiClock, FiX, FiLoader, FiUser, FiBriefcase, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import { useGetAdminUsers, useDeleteAdminUser, useGetAdminUser } from '../../../hooks/useAdminUsers';

export default function Users() {
    const { data: users, isLoading, error } = useGetAdminUsers();
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteAdminUser();

    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(id);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedId(null), 300);
    };

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                    <button className="px-4 py-2 bg-[#E9B10C] text-black font-medium rounded-lg hover:bg-[#c4950a] transition-colors">
                        Add New User
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading users...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading users. Please try again later.</p>
                    </div>
                ) : !users || users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <p>No users found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">ID</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Name & Email</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Phone</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Job Title</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Registered</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-sm text-gray-500">#{user.id}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900">
                                            {user.full_name}
                                            <div className="text-xs text-gray-500 font-normal">{user.email}</div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{user.phone}</td>
                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            {user.job_title || <span className="text-gray-400 italic">Not set</span>}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <FiClock className="w-4 h-4" />
                                                <span>{new Date(user.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleView(user.id)}
                                                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                    title="View User"
                                                >
                                                    <FiEye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    disabled={isDeleting}
                                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete User"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            <AnimatePresence>
                {isModalOpen && selectedId && (
                    <UserModal id={selectedId} onClose={closeModal} />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

function UserModal({ id, onClose }) {
    const { data: user, isLoading, error } = useGetAdminUser(id);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <span>User Profile Information</span>
                        <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full uppercase tracking-wider">
                            #{id}
                        </span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                            <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        </div>
                    ) : error || !user ? (
                        <div className="text-center py-12 text-red-500">
                            Failed to load user details.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* General Info Card */}
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-200 pb-2">General Info</h4>

                                    <div className="flex items-start space-x-3">
                                        <FiUser className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Full Name</p>
                                            <p className="text-sm font-semibold text-gray-900">{user.full_name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiMail className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email Address</p>
                                            <a href={`mailto:${user.email}`} className="text-sm text-blue-600 hover:underline">{user.email}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiPhone className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone Number</p>
                                            <a href={`tel:${user.phone}`} className="text-sm text-gray-700 hover:underline">{user.phone}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiClock className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Registered</p>
                                            <p className="text-sm text-gray-900">{new Date(user.created_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Info Card */}
                                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 space-y-4">
                                    <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 border-b border-blue-200 pb-2">Professional Info</h4>

                                    <div className="flex items-start space-x-3">
                                        <FiBriefcase className="text-blue-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-blue-500/70">Job Title</p>
                                            <p className="text-sm font-semibold text-gray-900">{user.job_title || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiBriefcase className="text-blue-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-blue-500/70">Company</p>
                                            <p className="text-sm font-medium text-gray-900">{user.company || 'N/A'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiMapPin className="text-blue-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-blue-500/70">Location</p>
                                            <p className="text-sm text-gray-900">{user.location || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                    <span className="bg-[#E9B10C] w-2 h-2 rounded-full"></span>
                                    <span>User Bio</span>
                                </h4>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                                    {user.bio || <span className="text-gray-400 italic">No bio provided.</span>}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
