import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { useRegister } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

export default function Registration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutate: register, isPending } = useRegister();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const registrationData = {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            password_confirmation: formData.confirmPassword
        };

        register(registrationData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                        className="mx-auto h-16 w-16 bg-[#FFF8E1] rounded-full flex items-center justify-center mb-4"
                    >
                        <FiUser className="h-8 w-8 text-[#E9B10C]" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Join us to access exclusive features
                    </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400 group-focus-within:text-[#E9B10C] transition-colors" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Full Name"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-[#E9B10C] transition-colors" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Email Address"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiPhone className="h-5 w-5 text-gray-400 group-focus-within:text-[#E9B10C] transition-colors" />
                            </div>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Phone Number"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#E9B10C] transition-colors" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-[#E9B10C] transition-colors" />
                                ) : (
                                    <FiEye className="h-5 w-5 text-gray-400 hover:text-[#E9B10C] transition-colors" />
                                )}
                            </button>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#E9B10C] transition-colors" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:z-10 sm:text-sm transition-all duration-300"
                                placeholder="Confirm Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-[#E9B10C] transition-colors" />
                                ) : (
                                    <FiEye className="h-5 w-5 text-gray-400 hover:text-[#E9B10C] transition-colors" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isPending}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#E9B10C] hover:bg-[#c4950a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E9B10C] transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-wider ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {isPending ? (
                                    <FiLoader className="h-5 w-5 text-white animate-spin" />
                                ) : (
                                    <FiArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                                )}
                            </span>
                            {isPending ? 'Signing Up...' : 'Sign Up'}
                        </motion.button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/auth/login" className="font-medium text-[#E9B10C] hover:text-[#c4950a] transition-colors">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}