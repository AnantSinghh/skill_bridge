
import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                SkillBridge
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm mb-4">
                            Connecting talented students with world-class internships. Build your career with the best opportunities.
                        </p>
                        <div className="flex space-x-4">
                            <button className="text-gray-400 hover:text-indigo-600 transition-colors focus:outline-none">
                                <FiGithub className="text-xl" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-500 transition-colors focus:outline-none">
                                <FiTwitter className="text-xl" />
                            </button>
                            <button className="text-gray-400 hover:text-blue-700 transition-colors focus:outline-none">
                                <FiLinkedin className="text-xl" />
                            </button>
                            <button className="text-gray-400 hover:text-pink-600 transition-colors focus:outline-none">
                                <FiInstagram className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/internships" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                                    Browse Internships
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                                    Student Registration
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                                    Employer Registration
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <button className="text-gray-500 hover:text-indigo-600 text-sm transition-colors focus:outline-none">
                                    Blog
                                </button>
                            </li>
                            <li>
                                <button className="text-gray-500 hover:text-indigo-600 text-sm transition-colors focus:outline-none">
                                    Career Advice
                                </button>
                            </li>
                            <li>
                                <button className="text-gray-500 hover:text-indigo-600 text-sm transition-colors focus:outline-none">
                                    Resume Guide
                                </button>
                            </li>
                            <li>
                                <button className="text-gray-500 hover:text-indigo-600 text-sm transition-colors focus:outline-none">
                                    Interview Tips
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FiMapPin className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-500 text-sm">
                                    123 Innovation Drive,<br />Tech Valley, CA 94043
                                </span>
                            </li>
                            <li className="flex items-center">
                                <FiMail className="text-indigo-600 mr-2 flex-shrink-0" />
                                <a href="mailto:hello@skillbridge.com" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                                    hello@skillbridge.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FiPhone className="text-indigo-600 mr-2 flex-shrink-0" />
                                <span className="text-gray-500 text-sm">
                                    +1 (555) 123-4567
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        &copy; {currentYear} SkillBridge. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <button className="text-gray-400 hover:text-gray-600 text-sm transition-colors focus:outline-none">
                            Privacy Policy
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 text-sm transition-colors focus:outline-none">
                            Terms of Service
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 text-sm transition-colors focus:outline-none">
                            Cookie Policy
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
