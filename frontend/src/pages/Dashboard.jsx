/**
 * Dashboard Page
 * Main landing page after login
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { FiSettings, FiList, FiFileText, FiUser, FiSearch, FiTarget, FiCheck } from 'react-icons/fi';
const Dashboard = () => {
    const { user, isAdmin } = useAuth();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1">
                        Welcome back, {user?.name}!
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        {isAdmin()
                            ? 'Manage internship listings and applications'
                            : 'Find your perfect internship opportunity'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                {isAdmin() ? (
                    <>
                        <Link to="/admin" className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <FiSettings />
                                    </div>
                                    <span className="text-gray-400 group-hover:text-indigo-600 transition-colors">→</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">Admin Panel</h3>
                                <p className="text-gray-500 text-sm">Create and manage internship listings</p>
                            </div>
                        </Link>

                        <Link to="/internships" className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                        <FiList />
                                    </div>
                                    <span className="text-gray-400 group-hover:text-purple-600 transition-colors">→</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">View Listings</h3>
                                <p className="text-gray-500 text-sm">Browse all posted internships</p>
                            </div>
                        </Link>

                        <Link to="/admin/applications" className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <FiFileText />
                                    </div>
                                    <span className="text-gray-400 group-hover:text-blue-600 transition-colors">→</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Applications</h3>
                                <p className="text-gray-500 text-sm">Review student applications</p>
                            </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                                        <FiUser />
                                    </div>
                                    <span className="text-gray-400 group-hover:text-green-600 transition-colors">→</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">My Profile</h3>
                                <p className="text-gray-500 text-sm">Update your professional profile</p>
                            </div>
                        </Link>

                        <Link to="/internships" className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <FiSearch />
                                    </div>
                                    <span className="text-gray-400 group-hover:text-indigo-600 transition-colors">→</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">Browse Internships</h3>
                                <p className="text-gray-500 text-sm">Explore global opportunities</p>
                            </div>
                        </Link>

                        <Link to="/my-applications" className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center text-2xl group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                                        <FiFileText />
                                    </div>
                                    <span className="text-gray-400 group-hover:text-pink-600 transition-colors">→</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">My Applications</h3>
                                <p className="text-gray-500 text-sm">Track your application status</p>
                            </div>
                        </Link>
                    </>
                )}
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                <div className="max-w-3xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <FiTarget className="mr-2" /> Quick Tips
                    </h3>
                    <ul className="space-y-3">
                        {isAdmin() ? (
                            <>
                                <li className="flex items-start">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-gray-600">Add new internship opportunities from the Admin Panel</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-gray-600">Update or remove existing listings as needed</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-gray-600">Review and manage student applications in the Applications tab</span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="flex items-start">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-gray-600">Complete your profile to apply faster to internships</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-gray-600">Use filters to find internships matching your skills</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-gray-600">Read the full description before applying</span>
                                </li>
                                <li className="flex items-start">
                                    <FiCheck className="text-green-500 mr-2" />
                                    <span className="text-gray-600">Check application deadlines carefully</span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
