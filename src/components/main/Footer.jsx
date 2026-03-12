import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo/logo.svg';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    <div className="lg:col-span-1 space-y-6">
                        <Link to="/" className="block">
                            <img src={logo} alt="Al Dana Logo" className="h-12 w-auto" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div className="lg:col-span-2 flex flex-col md:flex-row justify-between md:justify-end gap-12 md:gap-24">
                        <div>
                            <h3 className="text-[#E9B10C] font-bold mb-6 uppercase tracking-wider text-sm">
                                {t('footer.useful_links')}
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: t('nav.home'), path: '/' },
                                    { name: t('nav.about_us'), path: '/about-us' },
                                    { name: t('nav.team'), path: '/team' },
                                    { name: t('nav.services'), path: '/services' },
                                    { name: t('nav.experience'), path: '/experience' },
                                    { name: t('nav.certifications'), path: '/certifications' },
                                    { name: t('nav.projects'), path: '/projects' },
                                    { name: t('nav.gallery'), path: '/gallery' },
                                    { name: t('nav.contact_us'), path: '/contact-us' },
                                ].map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-400 hover:text-[#E9B10C] transition-colors duration-200 text-sm font-medium"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-[#E9B10C] font-bold mb-6 uppercase tracking-wider text-sm">
                                {t('footer.contact_us')}
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="text-gray-400 max-w-xs leading-relaxed">
                                    {t('footer.address')}
                                </li>
                                <li>
                                    <span className="text-[#E9B10C] font-semibold block mb-1">{t('footer.phone')}:</span>
                                    <a
                                        href="tel:+97126966861"
                                        className="text-gray-300 hover:text-[#E9B10C] transition-colors duration-200"
                                    >
                                        025585186
                                    </a>
                                </li>
                                <li>
                                    <span className="text-[#E9B10C] font-semibold block mb-1">{t('footer.email')}:</span>
                                    <a
                                        href="mailto:Info@aldanalab.ae"
                                        className="text-gray-300 hover:text-[#E9B10C] transition-colors duration-200"
                                    >
                                        Info@aldanalab.ae
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm text-center md:text-left">
                        {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
