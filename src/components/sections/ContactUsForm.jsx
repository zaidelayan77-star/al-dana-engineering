
import React, { useState } from 'react';
import { FiAward, FiCpu, FiUsers, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSubmitContact } from '../../hooks/useContact';

export default function ContactUsForm() {
    const features = [
        {
            icon: <FiAward className="w-6 h-6 text-[#E9B10C]" />,
            title: "ISO/IEC 17025 Accredited",
            description: "Our laboratory meets the highest international standards for testing and calibration."
        },
        {
            icon: <FiCpu className="w-6 h-6 text-[#E9B10C]" />,
            title: "Advanced Equipment",
            description: "Modern drilling rigs and fully calibrated testing instruments for precise results."
        },
        {
            icon: <FiUsers className="w-6 h-6 text-[#E9B10C]" />,
            title: "Expert Team",
            description: "30+ qualified engineers and technicians with deep domain expertise."
        }
    ];

    const [formData, setFormData] = useState({
        full_name: '',
        company_name: '',
        email: '',
        phone: '',
        service_required: '',
        message: ''
    });

    const { mutate: submitContact, isPending } = useSubmitContact();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        submitContact(formData, {
            onSuccess: () => {
                setFormData({
                    full_name: '',
                    company_name: '',
                    email: '',
                    phone: '',
                    service_required: '',
                    message: ''
                });
            }
        });
    };

    return (
        <section className="py-16 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-[#E9B10C] font-bold text-sm uppercase tracking-widest mb-2">
                        REACH OUT
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Send Us a Message
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your full name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#E9B10C] focus:ring-1 focus:ring-[#E9B10C] outline-none transition-colors text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        placeholder="Your company"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#E9B10C] focus:ring-1 focus:ring-[#E9B10C] outline-none transition-colors text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@company.com"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#E9B10C] focus:ring-1 focus:ring-[#E9B10C] outline-none transition-colors text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+971 XX XXX XXXX"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#E9B10C] focus:ring-1 focus:ring-[#E9B10C] outline-none transition-colors text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Service Required</label>
                                <select
                                    name="service_required"
                                    value={formData.service_required}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#E9B10C] focus:ring-1 focus:ring-[#E9B10C] outline-none transition-colors text-sm text-gray-500 bg-white"
                                >
                                    <option value="" disabled>Select a service</option>
                                    <option value="Geotechnical Investigations">Geotechnical Investigations</option>
                                    <option value="Geophysical Surveys">Geophysical Surveys</option>
                                    <option value="Soil & Rock Testing">Soil & Rock Testing</option>
                                    <option value="Chemical Testing">Chemical Testing</option>
                                    <option value="Construction Material Testing">Construction Material Testing</option>
                                    <option value="Oil & Gas Field Services">Oil & Gas Field Services</option>
                                    <option value="Other Inquiry">Other Inquiry</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="Tell us about your project requirements..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#E9B10C] focus:ring-1 focus:ring-[#E9B10C] outline-none transition-colors text-sm resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className={`w-full flex justify-center items-center space-x-2 bg-[#E9B10C] text-black font-bold py-4 rounded-lg hover:bg-[#C39B3E] transition-colors uppercase tracking-wide text-sm ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isPending && <FiLoader className="animate-spin" />}
                                <span>{isPending ? 'Sending...' : 'Send Message'}</span>
                            </button>
                        </form>
                    </motion.div>

                    {/* Right Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Al Dana?</h3>
                            <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                                With over 25 years of expertise in geotechnical engineering and soil testing, we deliver accurate, certified results that enable safe and informed engineering decisions for projects across the UAE and the region.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start space-x-4"
                                >
                                    <div className="bg-[#FFF8E1] p-3 rounded-lg flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 text-sm">{feature.title}</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}