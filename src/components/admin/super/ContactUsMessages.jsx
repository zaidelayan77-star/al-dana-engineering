import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiTrash2, FiClock, FiX, FiLoader, FiUser, FiBriefcase, FiMail, FiPhone, FiBox } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import { useGetContacts, useDeleteContact, useGetContact } from '../../../hooks/useContact';

export default function ContactUsMessages() {
    const { data: contacts, isLoading, error } = useGetContacts();
    const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();

    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            deleteContact(id);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedId(null), 300); // wait for exit animation
    };

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Form Submissions</h2>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading contacts...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading contacts. Please try again later.</p>
                    </div>
                ) : !contacts || contacts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <p>No contact messages found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">ID</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Name</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Company</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Service</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Date</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <motion.tr
                                        key={contact.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-sm text-gray-500">#{contact.id}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900">
                                            {contact.full_name}
                                            <div className="text-xs text-gray-500 font-normal">{contact.email}</div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{contact.company_name}</td>
                                        <td className="py-4 px-4 text-sm">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium capitalize">
                                                {contact.service_required}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <FiClock className="w-4 h-4" />
                                                <span>{new Date(contact.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleView(contact.id)}
                                                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                    title="View Message"
                                                >
                                                    <FiEye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
                                                    disabled={isDeleting}
                                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete Message"
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
                    <ContactModal id={selectedId} onClose={closeModal} />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

// Separate component for the Modal to handle fetching individual data
function ContactModal({ id, onClose }) {
    const { data: contact, isLoading, error } = useGetContact(id);

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
                        <span>Message Details</span>
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
                    ) : error || !contact ? (
                        <div className="text-center py-12 text-red-500">
                            Failed to load message details.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Sender Info Card */}
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-200 pb-2">Sender Information</h4>

                                    <div className="flex items-start space-x-3">
                                        <FiUser className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{contact.full_name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiBriefcase className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-sm text-gray-700">{contact.company_name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiMail className="text-gray-400 mt-1" />
                                        <div>
                                            <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline">{contact.email}</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiPhone className="text-gray-400 mt-1" />
                                        <div>
                                            <a href={`tel:${contact.phone}`} className="text-sm text-gray-700 hover:underline">{contact.phone}</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Request Info Card */}
                                <div className="bg-[#FFF8E1] p-5 rounded-xl border border-[#FFE082] space-y-4">
                                    <h4 className="text-xs font-bold text-[#b58805] uppercase tracking-wider mb-2 border-b border-[#FFE082] pb-2">Request Information</h4>

                                    <div className="flex items-start space-x-3">
                                        <FiBox className="text-[#E9B10C] mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Service Required</p>
                                            <p className="text-sm font-bold text-gray-900 capitalize">{contact.service_required}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiClock className="text-[#E9B10C] mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Submitted At</p>
                                            <p className="text-sm text-gray-900">{new Date(contact.created_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                    <span className="bg-[#E9B10C] w-2 h-2 rounded-full"></span>
                                    <span>Message Content</span>
                                </h4>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                                    {contact.message}
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
