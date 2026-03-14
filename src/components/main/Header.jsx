import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageButton from '../ui/LanguageButton';
import User from '../ui/User';
import { FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/logo/logo.svg';

const Header = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLinkClasses = (path) => {
        const isActive = location.pathname === path;
        const baseClasses = "transition-colors duration-200 text-sm font-medium uppercase tracking-wider scale-100 hover:scale-105 transform";

        if (isActive) {
            return `${baseClasses} text-[#E9B10C] font-bold`;
        }

        if (isScrolled) {
            return `${baseClasses} text-black hover:text-[#C39B3E]`;
        } else {
            return `${baseClasses} text-white hover:text-[#E9B10C]`;
        }
    };

    const baseTextColor = isScrolled ? 'text-black' : 'text-white';

    const headerBgClass = isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5';

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about_us'), path: '/about-us' },
        { name: t('nav.services'), path: '/services' },
        { name: t('nav.experience'), path: '/experience' },
        { name: t('nav.certifications'), path: '/certifications' },
        { name: t('nav.projects'), path: '/projects' },
        { name: t('nav.contact_us'), path: '/contact-us' },
    ];

    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBgClass}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${baseTextColor}`}>
                        <img src={logo} alt="Hepton Logo" className="h-[60px] w-auto" />
                    </Link>

                    <div className="hidden md:flex items-center gap-8 ltr:ml-auto rtl:mr-auto">
                        <nav className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={getLinkClasses(link.path)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <div className={`flex items-center gap-5 ${baseTextColor}`}>
                            <a
                                href="https://www.linkedin.com/company/al-dana-engineering-laboratories1/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-1.5 bg-[#0077b5] text-white rounded-full hover:bg-[#005a8a] transition-all text-sm font-bold shadow-md shadow-blue-500/10"
                            >
                                <FaLinkedin className="text-lg" />
                                <span className="hidden lg:inline">{t('nav.jobs_join')}</span>
                            </a>
                            <LanguageButton />
                            <User />
                        </div>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden ${baseTextColor} focus:outline-none`}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800 bg-[#1a1a1a] absolute top-full inset-x-0 px-4 shadow-xl">
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`transition-colors duration-200 text-sm font-medium uppercase tracking-wider ${location.pathname === link.path ? 'text-[#E9B10C]' : 'text-white hover:text-[#C39B3E]'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="flex items-center gap-6 pt-4 text-white border-t border-gray-700 mt-2">
                                <a
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 bg-[#0077b5] text-white rounded-full hover:bg-[#005a8a] transition-all text-xs font-bold"
                                >
                                    <FaLinkedin className="text-base" />
                                    <span>{t('nav.jobs')}</span>
                                </a>
                                <LanguageButton />
                                <div className="flex items-center gap-2">
                                    <User />
                                    <span className="text-sm">{t('nav.account')}</span>
                                </div>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
