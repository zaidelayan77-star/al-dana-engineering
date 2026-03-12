import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function User() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Check if token exists to determine auth state
    const token = localStorage.getItem('auth_token');
    const isAuthenticated = !!token;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        localStorage.clear();
        setIsOpen(false);
        toast.success(t('user_menu.logged_out_success'));
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none transition-transform hover:scale-110 hover:text-[#C39B3E] flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out transform origin-top-right">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/admin/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E9B10C] transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('user_menu.my_profile')}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full ltr:text-left rtl:text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:text-red-700 transition-colors border-t border-gray-100 mt-1 pt-2"
                                    role="menuitem"
                                >
                                    {t('user_menu.logout')}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth/login"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E9B10C] transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('user_menu.login')}
                                </Link>
                                <Link
                                    to="/auth/register"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E9B10C] transition-colors"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t('user_menu.create_account')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}