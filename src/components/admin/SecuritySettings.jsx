import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiShield, FiAlertTriangle, FiLoader } from 'react-icons/fi';
import AdminLayout from './AdminLayout';
import { useChangePassword, useUpdateEmail } from '../../hooks/useProfile';

export default function SecuritySettings() {
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const [email, setEmail] = useState('');

    const storedUserStr = localStorage.getItem('user');
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
    const userId = storedUser?.id;

    useEffect(() => {
        if (storedUser?.email) {
            setEmail(storedUser.email);
        }
    }, [storedUser?.email]);

    const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();
    const { mutate: updateEmail, isPending: isUpdatingEmail } = useUpdateEmail();

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!userId) return;

        changePassword(
            {
                userId,
                passwordData: {
                    current_password: passwords.current,
                    new_password: passwords.new,
                    new_password_confirmation: passwords.confirm
                }
            },
            {
                onSuccess: () => {
                    setPasswords({ current: '', new: '', confirm: '' });
                }
            }
        );
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!userId) return;

        updateEmail({
            userId,
            emailData: { email }
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
                    <p className="text-gray-500">Manage your account security and preferences</p>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FiLock className="text-blue-500 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                            <p className="text-sm text-gray-500">Ensure your account is secure with a strong password</p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <input
                                type="password"
                                name="current"
                                value={passwords.current}
                                onChange={handlePasswordChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                                type="password"
                                name="new"
                                value={passwords.new}
                                onChange={handlePasswordChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handlePasswordChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                            />
                        </div>
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isChangingPassword}
                                className={`flex items-center space-x-2 px-6 py-2 bg-[#E9B10C] text-white rounded-lg hover:bg-[#c4950a] transition-colors font-medium shadow-sm ${isChangingPassword ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isChangingPassword && <FiLoader className="animate-spin" />}
                                <span>{isChangingPassword ? 'Updating...' : 'Update Password'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Change Email */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <FiMail className="text-green-500 text-xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Email Address</h3>
                            <p className="text-sm text-gray-500">Update your primary email address</p>
                        </div>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="max-w-lg">
                        <div className="flex items-center space-x-2 mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
                            <FiAlertTriangle />
                            <span>Changing your email will require re-verification.</span>
                        </div>
                        <div className="flex space-x-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none transition-all"
                            />
                            <button
                                type="submit"
                                disabled={isUpdatingEmail}
                                className={`flex items-center space-x-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium ${isUpdatingEmail ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isUpdatingEmail && <FiLoader className="animate-spin" />}
                                <span>{isUpdatingEmail ? 'Updating...' : 'Update'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
