import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSettings } from 'react-icons/fi';
import AdminLayout from './AdminLayout';

export default function Notifications() {
    const [settings, setSettings] = useState({
        emailAlerts: true,
        projectUpdates: true,
        marketingEmails: false,
        securityAlerts: true
    });

    const notifications = [
        {
            id: 1,
            title: "Project Milestone Reached",
            message: "Al Reem Island Development has reached 65% completion.",
            time: "2 hours ago",
            read: false
        },
        {
            id: 2,
            title: "New Document Uploaded",
            message: "Lab report #2024-001 has been uploaded for your review.",
            time: "1 day ago",
            read: true
        },
        {
            id: 3,
            title: "Security Alert",
            message: "New login detected from a new device.",
            time: "3 days ago",
            read: true
        }
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-gray-500">Stay updated with your latest activities</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Notification List */}
                    <div className="lg:col-span-2 space-y-4">
                        {notifications.map((notif) => (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`bg-white p-4 rounded-xl border ${notif.read ? 'border-gray-100' : 'border-[#E9B10C]/30 bg-[#FFF9E5]'} shadow-sm transition-all`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <div className={`p-2 rounded-full ${notif.read ? 'bg-gray-100 text-gray-500' : 'bg-[#E9B10C] text-white'} mt-1`}>
                                            <FiBell className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${notif.read ? 'text-gray-800' : 'text-gray-900'}`}>{notif.title}</h3>
                                            <p className="text-gray-500 text-sm mt-1">{notif.message}</p>
                                            <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
                                        </div>
                                    </div>
                                    {!notif.read && (
                                        <span className="w-2 h-2 rounded-full bg-[#E9B10C]"></span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Settings */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
                        <div className="flex items-center space-x-2 mb-6">
                            <FiSettings className="text-gray-500" />
                            <h3 className="font-bold text-gray-900">Preferences</h3>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(settings).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <button
                                        onClick={() => setSettings({ ...settings, [key]: !value })}
                                        className={`w-11 h-6 flex items-center rounded-full transition-colors duration-300 ${value ? 'bg-[#E9B10C]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
