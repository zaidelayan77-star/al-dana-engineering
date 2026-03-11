import React from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiCheckCircle, FiUsers, FiUserPlus, FiMessageSquare, FiMail, FiActivity, FiLoader, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import SuperAdminLayout from './SuperAdminLayout';
import {
    useProjectsStats,
    useUsersStats,
    useMessagesStats,
    useWorkflowStats
} from '../../../hooks/useStatistics';

export default function Dashboard() {
    const { data: projects, isLoading: pLoad, error: pErr } = useProjectsStats();
    const { data: users, isLoading: uLoad, error: uErr } = useUsersStats();
    const { data: messages, isLoading: mLoad, error: mErr } = useMessagesStats();
    const { data: workflow, isLoading: wLoad, error: wErr } = useWorkflowStats();

    const isLoading = pLoad || uLoad || mLoad || wLoad;
    const isError = pErr || uErr || mErr || wErr;

    if (isLoading) {
        return (
            <SuperAdminLayout>
                <div className="flex flex-col items-center justify-center h-[70vh]">
                    <FiLoader className="w-10 h-10 animate-spin text-[#E9B10C] mb-4" />
                    <p className="text-gray-500 font-medium">Loading Dashboard Statistics...</p>
                </div>
            </SuperAdminLayout>
        );
    }

    if (isError) {
        return (
            <SuperAdminLayout>
                <div className="flex flex-col items-center justify-center h-[70vh] bg-red-50 rounded-2xl border border-red-100 p-8 text-center">
                    <p className="text-red-500 font-bold text-lg mb-2">Error Loading Statistics</p>
                    <p className="text-red-400 text-sm">Please check your connection or try again later.</p>
                </div>
            </SuperAdminLayout>
        );
    }

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    // Calculate workflow total for rough percentage display
    const wf = workflow || {};
    const totalStages = Object.values(wf).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);

    return (
        <SuperAdminLayout>
            <motion.div
                className="space-y-6 pb-12"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {/* Header Area */}
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Super Admin Dashboard</h1>
                        <p className="text-gray-500 text-sm">Overview of platform activities and statistics</p>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span>Live Data</span>
                    </div>
                </div>

                {/* Main 4 KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Projects KPI */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50 z-0"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Projects</p>
                                <h3 className="text-3xl font-bold text-gray-900">{projects?.total_projects || 0}</h3>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
                                <FiFolder className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="relative z-10 flex items-center space-x-4 text-sm mt-4">
                            <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">
                                <FiActivity className="mr-1 w-3 h-3" /> {projects?.active_projects || 0} Active
                            </span>
                            <span className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded font-medium">
                                <FiCheckCircle className="mr-1 w-3 h-3" /> {projects?.completed_projects || 0} Done
                            </span>
                        </div>
                    </motion.div>

                    {/* Users KPI */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#E9B10C]/10 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50 z-0"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Users</p>
                                <h3 className="text-3xl font-bold text-gray-900">{users?.total_users || 0}</h3>
                            </div>
                            <div className="w-12 h-12 bg-yellow-50 text-[#E9B10C] rounded-xl flex items-center justify-center shadow-inner">
                                <FiUsers className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="relative z-10 text-sm mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-gray-500">Joined Today</span>
                            <span className="flex items-center text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                                <FiUserPlus className="mr-1 w-3 h-3" /> +{users?.new_users_today || 0}
                            </span>
                        </div>
                    </motion.div>

                    {/* Messages KPI */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 opacity-50 z-0"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Messages</p>
                                <h3 className="text-3xl font-bold text-gray-900">{messages?.total_messages || 0}</h3>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shadow-inner">
                                <FiMessageSquare className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="relative z-10 text-sm mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                            <span className="text-gray-500">New Today</span>
                            <span className="flex items-center text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">
                                <FiMail className="mr-1 w-3 h-3" /> +{messages?.new_messages_today || 0}
                            </span>
                        </div>
                    </motion.div>

                    {/* Workflow Global KPI */}
                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-400 mb-1">Workflow Stages</p>
                                <h3 className="text-3xl font-bold text-white max-w-[120px] truncate" title={totalStages.toString()}>{totalStages}</h3>
                            </div>
                            <div className="w-12 h-12 bg-white/10 text-[#E9B10C] rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                <FiTrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="relative z-10 text-sm mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-gray-400">Total Across All Projects</span>
                        </div>
                    </motion.div>
                </div>

                {/* Second Row: Detailed Charts / Workflow Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Visual Projects Breakdown */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <FiPieChart className="mr-2 text-[#E9B10C]" />
                                Projects Distribution
                            </h3>
                        </div>

                        <div className="flex-grow flex flex-col justify-center space-y-6">
                            {/* Active Projects Bar */}
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-gray-700">Active / In Progress</span>
                                    <span className="text-blue-600">{projects?.active_projects || 0} Projects</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((projects?.active_projects || 0) / Math.max(projects?.total_projects || 1, 1)) * 100}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-blue-500 h-full rounded-full"
                                    ></motion.div>
                                </div>
                            </div>

                            {/* Completed Projects Bar */}
                            <div>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-gray-700">Completed Officially</span>
                                    <span className="text-green-600">{projects?.completed_projects || 0} Projects</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((projects?.completed_projects || 0) / Math.max(projects?.total_projects || 1, 1)) * 100}%` }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                        className="bg-green-500 h-full rounded-full"
                                    ></motion.div>
                                </div>
                            </div>

                            {/* Visual Hint */}
                            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center space-x-6 text-xs text-gray-500">
                                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> Active Rate: {Math.round(((projects?.active_projects || 0) / Math.max(projects?.total_projects || 1, 1)) * 100)}%</div>
                                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> Completion Rate: {Math.round(((projects?.completed_projects || 0) / Math.max(projects?.total_projects || 1, 1)) * 100)}%</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Workflow Stages Matrix */}
                    <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <FiActivity className="mr-2 text-[#E9B10C]" />
                                Global Workflow Activities
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(wf).map(([key, value], idx) => {
                                // Extract stage number and status from key like "stage_1_completed", "stage_2_in_progress"
                                const parts = key.split('_');
                                const stageNum = parts[1];
                                const status = parts.slice(2).join(' '); // "in progress" or "completed" or "pending"

                                let statusColor = "bg-gray-100 text-gray-600";
                                let barColor = "bg-gray-300";

                                if (status.includes('completed')) { statusColor = "bg-green-50 text-green-600"; barColor = "bg-green-500"; }
                                else if (status.includes('progress')) { statusColor = "bg-blue-50 text-blue-600"; barColor = "bg-blue-500"; }
                                else if (status.includes('pending')) { statusColor = "bg-yellow-50 text-yellow-600"; barColor = "bg-[#E9B10C]"; }

                                const percent = totalStages > 0 ? (value / totalStages) * 100 : 0;

                                return (
                                    <div key={key} className="relative group">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-700 border border-gray-200">
                                                    {stageNum}
                                                </div>
                                                <span className="text-sm font-medium text-gray-800 capitalize">Stage {stageNum}</span>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${statusColor}`}>{status}</span>
                                            </div>
                                            <div className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded min-w-[30px] text-center">
                                                {value}
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percent}%` }}
                                                transition={{ duration: 1, delay: idx * 0.1 }}
                                                className={`h-full rounded-full ${barColor}`}
                                            ></motion.div>
                                        </div>
                                    </div>
                                );
                            })}

                            {Object.keys(wf).length === 0 && (
                                <div className="text-center py-8 text-gray-500 text-sm">
                                    No workflow data available yet.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </SuperAdminLayout>
    );
}
