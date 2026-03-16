import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiLock, FiUserPlus, FiLogIn } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function LoginRequired() {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-3xl shadow-sm border border-gray-100 text-center max-w-2xl mx-auto"
        >
            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
                <FiLock className="w-10 h-10 text-[#E9B10C]" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('auth_required.title')}
            </h3>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                {t('auth_required.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                    to="/auth/login"
                    className="flex items-center justify-center space-x-2 px-8 py-3 bg-[#E9B10C] text-black font-bold rounded-xl hover:bg-[#c4950a] transition-all shadow-lg w-full sm:w-auto"
                >
                    <FiLogIn />
                    <span>{t('auth_required.login')}</span>
                </Link>
                
                <Link
                    to="/auth/register"
                    className="flex items-center justify-center space-x-2 px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg w-full sm:w-auto"
                >
                    <FiUserPlus />
                    <span>{t('auth_required.register')}</span>
                </Link>
            </div>
        </motion.div>
    );
}
