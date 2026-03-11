import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiTrash2, FiClock, FiX, FiLoader, FiUser, FiInfo, FiAlertCircle } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import { useGetAdminSupportTickets, useDeleteAdminSupportTicket, useGetAdminSupportTicket } from '../../../hooks/useAdminSupport';

export default function SupportTickets() {
    const { data: tickets, isLoading, error } = useGetAdminSupportTickets();
    const { mutate: deleteTicket, isPending: isDeleting } = useDeleteAdminSupportTicket();

    const [selectedId, setSelectedId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this support ticket?')) {
            deleteTicket(id);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedId(null), 300);
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-50 text-red-700';
            case 'medium': return 'bg-yellow-50 text-yellow-700';
            case 'low': return 'bg-green-50 text-green-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <SuperAdminLayout>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px] relative">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Support Tickets</h2>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FiLoader className="w-8 h-8 animate-spin text-[#E9B10C] mb-4" />
                        <p>Loading tickets...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 text-red-500 bg-red-50 rounded-lg border border-red-100 p-4">
                        <p>Error loading tickets. Please try again later.</p>
                    </div>
                ) : !tickets || tickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <p>No support tickets found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/50">
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">ID</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">User ID</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Subject</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Priority</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm">Created At</th>
                                    <th className="py-4 px-4 font-semibold text-gray-700 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <motion.tr
                                        key={ticket.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-sm text-gray-500">#{ticket.id}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900 flex items-center space-x-2">
                                            <FiUser className="text-gray-400" />
                                            <span>User #{ticket.user_id}</span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600 font-medium">{ticket.subject}</td>
                                        <td className="py-4 px-4 text-sm">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getPriorityColor(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <FiClock className="w-4 h-4" />
                                                <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleView(ticket.id)}
                                                    className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                    title="View Ticket"
                                                >
                                                    <FiEye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ticket.id)}
                                                    disabled={isDeleting}
                                                    className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete Ticket"
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
                    <TicketModal id={selectedId} onClose={closeModal} />
                )}
            </AnimatePresence>
        </SuperAdminLayout>
    );
}

function TicketModal({ id, onClose }) {
    const { data: ticket, isLoading, error } = useGetAdminSupportTicket(id);

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-50 text-red-700 border-red-200';
            case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'low': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

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
                        <span>Ticket Details</span>
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
                    ) : error || !ticket ? (
                        <div className="text-center py-12 text-red-500">
                            Failed to load ticket details.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Ticket Info Card */}
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 border-b border-gray-200 pb-2">Ticket Information</h4>

                                    <div className="flex items-start space-x-3">
                                        <FiInfo className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Subject</p>
                                            <p className="text-sm font-semibold text-gray-900">{ticket.subject}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiUser className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">User ID</p>
                                            <p className="text-sm font-bold text-blue-600">#{ticket.user_id}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <FiClock className="text-gray-400 mt-1" />
                                        <div>
                                            <p className="text-xs text-gray-500">Created At</p>
                                            <p className="text-sm text-gray-900">{new Date(ticket.created_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Info Card */}
                                <div className={`p-5 rounded-xl border space-y-4 ${getPriorityColor(ticket.priority).split(' ')[0]} ${getPriorityColor(ticket.priority).split(' ').pop()}`}>
                                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 border-b pb-2 ${getPriorityColor(ticket.priority).split(' ').pop()}`}>Priority Status</h4>

                                    <div className="flex items-start space-x-3">
                                        <FiAlertCircle className="mt-1" />
                                        <div>
                                            <p className="text-xs opacity-70">Current Priority</p>
                                            <p className="text-lg font-bold capitalize">{ticket.priority}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
                                    <span className="bg-[#E9B10C] w-2 h-2 rounded-full"></span>
                                    <span>Ticket Message</span>
                                </h4>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                                    {ticket.message}
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
