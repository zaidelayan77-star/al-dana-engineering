import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMessageSquare, FiLoader, FiHelpCircle } from 'react-icons/fi';
import AdminLayout from './AdminLayout';
import { useSubmitSupportMessage } from '../../hooks/useSupport';

export default function Support() {
    const [formData, setFormData] = useState({
        subject: 'Technical Issue',
        priority: 'Low',
        message: ''
    });

    const { mutate: submitSupport, isPending } = useSubmitSupportMessage();

    const storedUserStr = localStorage.getItem('user');
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
    const userId = storedUser?.id || 1; // Fallback to 1 if no user found, as per API structure

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.message.trim()) return;

        submitSupport(
            {
                user_id: userId,
                subject: formData.subject,
                priority: formData.priority,
                message: formData.message
            },
            {
                onSuccess: () => {
                    setFormData({ ...formData, message: '' }); // Clear message on success
                }
            }
        );
    };

    return (
        <AdminLayout>
            <div>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
                    <p className="text-gray-500">We're here to help you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center"
                    >
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiMail className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                        <p className="text-gray-500 mb-6">Get a response within 24 hours</p>
                        <a href="mailto:Info@aldanalab.ae" className="text-blue-500 font-medium hover:underline">
                            Info@aldanalab.ae
                        </a>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center"
                    >
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiPhone className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
                        <p className="text-gray-500 mb-6">Available 9:00 AM - 6:00 PM</p>
                        <a href="tel:+971501234567" className="text-green-500 font-medium hover:underline">
                            (02)-5186-558
                        </a>
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <FiHelpCircle className="text-[#E9B10C] text-2xl" />
                        <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            {
                                q: "How can I track my project progress?",
                                a: "You can track your real-time project progress through the 'My Projects' dashboard. Each project shows active stages, completion percentages, and updated field media."
                            },
                            {
                                q: "What standards do you follow for soil testing?",
                                a: "We strictly adhere to international standards including ASTM, BS, and local UAE municipality regulations to ensure the highest level of accuracy and certification."
                            },
                            {
                                q: "How long does it take to receive a certified report?",
                                a: "Standard laboratory testing reports are typically issued within 3-5 working days after sample collection. Geotechnical investigation reports may take 7-10 days depending on project scale."
                            },
                            {
                                q: "Can I request a site investigation online?",
                                a: "Yes, you can use the 'Send us a message' form below to request a site investigation. Please include the project location and required testing types."
                            },
                            {
                                q: "Are old testing reports archived?",
                                a: "Absolutely. All certified reports are digitally archived and can be requested through our support center at any time if they are not visible in your dashboard."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <details className="group">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                        <span className="font-bold text-gray-800 pr-4">{faq.q}</span>
                                        <span className="transition-transform duration-300 group-open:rotate-180">
                                            <svg className="w-5 h-5 text-[#E9B10C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                                        {faq.a}
                                    </div>
                                </details>
                            </motion.div>
                        ))}
                    </div>

                    {/* Support Form Section */}
                    <div className="mt-12 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center space-x-3 mb-8">
                            <FiMessageSquare className="text-[#E9B10C] text-xl" />
                            <h3 className="text-xl font-bold text-gray-900">Still have a question? Ask us directly</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none bg-gray-50/50"
                                    >
                                        <option value="Technical Issue">Technical Issue</option>
                                        <option value="Account Inquiry">Account Inquiry</option>
                                        <option value="Project Question">Project Question</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none bg-gray-50/50"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Your Question / Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E9B10C] focus:border-transparent focus:outline-none resize-none bg-gray-50/50"
                                    placeholder="Tell us what you need help with..."
                                ></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className={`flex items-center space-x-2 px-10 py-3.5 bg-[#E9B10C] text-black rounded-xl hover:bg-[#c4950a] transition-all font-bold shadow-lg shadow-yellow-500/10 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isPending && <FiLoader className="animate-spin" />}
                                    <span>{isPending ? 'Sending...' : 'Submit Question'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
