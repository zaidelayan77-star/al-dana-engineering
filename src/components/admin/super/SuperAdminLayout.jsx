import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiGrid,
    FiUsers,
    FiFolder,
    FiMessageSquare,
    FiHelpCircle,
    FiImage,
    FiAward,
    FiLogOut,
    FiBriefcase
} from 'react-icons/fi';

export default function SuperAdminLayout({ children }) {
    const location = useLocation();

    const menuItems = [
        { path: '/portal/super/admin/dashboard', icon: <FiGrid />, label: 'Dashboard' },
        { path: '/portal/super/admin/projects', icon: <FiFolder />, label: 'Projects' },
        { path: '/portal/super/admin/users', icon: <FiUsers />, label: 'Users' },
        { path: '/portal/super/admin/contact-us', icon: <FiMessageSquare />, label: 'Contacts' },
        { path: '/portal/super/admin/support', icon: <FiHelpCircle />, label: 'Support' },
        { path: '/portal/super/admin/gallary', icon: <FiImage />, label: 'Gallery' },
        { path: '/portal/super/admin/certifications', icon: <FiAward />, label: 'Certifications' },
        { path: '/portal/super/admin/partners', icon: <FiBriefcase />, label: 'Partners' },
        { path: '/portal/super/admin/team-members', icon: <FiUsers />, label: 'Team Members' }
    ];

    const handleLogout = () => {
        // Implement logout logic if specific to super admin
        localStorage.clear();
        window.location.href = '/auth/login';
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col h-full shadow-xl z-20">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-[#E9B10C] tracking-wider uppercase">Portal Admin</h2>
                    <p className="text-gray-400 text-xs mt-1">Super User Dashboard</p>
                </div>

                <div className="flex-1 overflow-y-auto mt-4">
                    <nav className="space-y-1 px-3">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm
                                    ${isActive
                                        ? 'bg-[#E9B10C] text-black shadow-md'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }
                                `}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg transition-colors font-medium text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300"
                    >
                        <FiLogOut className="text-lg" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content View */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b border-gray-200 z-10">
                    <div className="px-8 py-4 flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-800 capitalize">
                            {location.pathname.split('/').pop().replace('-', ' ')}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-[#E9B10C] text-black flex items-center justify-center font-bold shadow-md">
                                SA
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-8"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
