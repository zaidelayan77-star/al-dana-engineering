import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiBriefcase, FiLock, FiBell, FiHelpCircle, FiLogOut } from 'react-icons/fi';

export default function AdminLayout({ children }) {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/profile', icon: <FiUser />, label: 'My Profile' },
        { path: '/admin/projects', icon: <FiBriefcase />, label: 'My Projects' },
        { path: '/admin/security', icon: <FiLock />, label: 'Security' },
        // { path: '/admin/notifications', icon: <FiBell />, label: 'Notifications' },
        { path: '/admin/support', icon: <FiHelpCircle />, label: 'Support' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10"
            >
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">
                        <span className="text-[#E9B10C]">User</span>Panel
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-[#E9B10C] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#E9B10C]'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                        <FiLogOut className="text-xl" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </motion.aside>

            {/* Content Area */}
            <div className="flex-1 md:ml-64 p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
