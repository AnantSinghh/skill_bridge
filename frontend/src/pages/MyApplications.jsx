/**
 * MyApplications Page
 * View all applications submitted by the student
 */

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiFileText, FiExternalLink } from 'react-icons/fi';


const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMyApplications();
    }, []);

    const fetchMyApplications = async () => {
        try {
            setLoading(true);
            const response = await api.get('/applications/my-applications');

            if (response.data.success) {
                setApplications(response.data.data);
            }
        } catch (err) {
            setError('Failed to fetch applications');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClasses = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'reviewed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1 inline-block">
                    My Applications
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Track the status of your internship applications
                </p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
                    {error}
                </div>
            )}

            {applications.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-6xl mb-4 text-indigo-200 flex justify-center"><FiFileText /></div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500 mb-6">You haven't applied to any internships yet.</p>
                    <a
                        href="/internships"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        Browse Internships
                    </a>
                </div>
            ) : (
                <div className="space-y-6">
                    {applications.map((application) => (
                        <div key={application._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold text-gray-900">{application.internship?.title || 'N/A'}</h3>
                                        <p className="text-indigo-600 font-medium">{application.internship?.company || 'N/A'}</p>
                                    </div>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusBadgeClasses(application.status)}`}>
                                        {application.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Applied on</span>
                                        <span className="font-medium text-gray-900">{formatDate(application.appliedAt)}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Location</span>
                                        <span className="font-medium text-gray-900">{application.internship?.country || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Duration</span>
                                        <span className="font-medium text-gray-900">{application.internship?.duration || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase font-semibold">Stipend</span>
                                        <span className="font-medium text-gray-900">{application.internship?.stipend || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-bold text-gray-900 mb-2">Your Cover Letter</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-line bg-gray-50 p-3 rounded border border-gray-100">
                                        {application.coverLetter}
                                    </p>

                                    {application.resume && (
                                        <div className="flex items-center text-sm">
                                            <span className="text-gray-500 mr-2">Resume:</span>
                                            <a
                                                href={application.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium flex items-center"
                                            >
                                                View Resume
                                                <FiExternalLink className="ml-1 text-xs" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyApplications;
