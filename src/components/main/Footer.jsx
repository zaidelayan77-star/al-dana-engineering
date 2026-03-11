import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logo.svg';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    <div className="lg:col-span-1 space-y-6">
                        <Link to="/" className="block">
                            <img src={logo} alt="Hepton Logo" className="h-12 w-auto" />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            We at Hepton Electromechanical Contracting Co. L.L.C are committed to delivering high-quality electromechanical solutions with integrity, reliability, and professionalism.
                        </p>
                    </div>

                    <div className="lg:col-span-2 flex flex-col md:flex-row justify-between md:justify-end gap-12 md:gap-24">
                        <div>
                            <h3 className="text-[#E9B10C] font-bold mb-6 uppercase tracking-wider text-sm">
                                Useful Links
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About Us', path: '/about-us' },
                                    { name: 'Services', path: '/services' },
                                    { name: 'Experience', path: '/experience' },
                                    { name: 'Certifications', path: '/certifications' },
                                    { name: 'Projects', path: '/projects' },
                                    { name: 'Gallery', path: '/gallery' },
                                    { name: 'Contact Us', path: '/contact-us' },
                                ].map((link) => (
                                    <li key={link.name}>
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
                                Contact Us
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="text-gray-400 max-w-xs leading-relaxed">
                                    Office 801, Al Wahda City (1) Commercial Tower<br />
                                    Hazza Bin Zayed The First St, 732 Al Nahyan, Abu Dhabi, UAE
                                </li>
                                <li>
                                    <span className="text-[#E9B10C] font-semibold block mb-1">Phone:</span>
                                    <a
                                        href="tel:+97126966861"
                                        className="text-gray-300 hover:text-[#E9B10C] transition-colors duration-200"
                                    >
                                        (02)-5186-558
                                    </a>
                                </li>
                                <li>
                                    <span className="text-[#E9B10C] font-semibold block mb-1">Email:</span>
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
                        © Copyright 2026 – Al Dana Engineering Laboratories
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
