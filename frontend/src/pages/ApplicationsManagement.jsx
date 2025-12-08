

import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { FiCheck, FiX, FiCalendar, FiEye, FiSearch } from 'react-icons/fi';

const ApplicationsManagement = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await api.get('/applications');

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

    useEffect(() => {
        fetchApplications();
    }, []);

    const filterApplications = useCallback(() => {
        let filtered = [...applications];


        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }


        if (searchQuery) {
            filtered = filtered.filter(app =>
                app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.internship?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.internship?.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredApplications(filtered);
    }, [applications, statusFilter, searchQuery]);

    useEffect(() => {
        filterApplications();
    }, [filterApplications]);

    const updateApplicationStatus = async (applicationId, newStatus) => {
        try {
            const response = await api.put(`/applications/${applicationId}/status`, {
                status: newStatus
            });

            if (response.data.success) {
                setSuccessMessage(`Application ${newStatus} successfully!`);
                setTimeout(() => setSuccessMessage(''), 3000);


                setApplications(applications.map(app =>
                    app._id === applicationId ? { ...app, status: newStatus } : app
                ));
            }
        } catch (err) {
            setError(`Failed to update application status: ${err.response?.data?.message || err.message}`);
            setTimeout(() => setError(''), 3000);
        }
    };

    const getStatusBadgeClass = (status) => {
        const baseClasses = "px-3 py-1 rounded-full text-sm font-medium border";
        const statusClasses = {
            pending: "bg-yellow-100/50 text-yellow-700 border-yellow-200",
            reviewed: "bg-blue-100/50 text-blue-700 border-blue-200",
            interview: "bg-purple-100/50 text-purple-700 border-purple-200",
            accepted: "bg-green-100/50 text-green-700 border-green-200",
            rejected: "bg-red-100/50 text-red-700 border-red-200"
        };
        return `${baseClasses} ${statusClasses[status] || statusClasses.pending}`;
    };

    const getStatusCounts = () => {
        return {
            all: applications.length,
            pending: applications.filter(app => app.status === 'pending').length,
            reviewed: applications.filter(app => app.status === 'reviewed').length,
            interview: applications.filter(app => app.status === 'interview').length,
            accepted: applications.filter(app => app.status === 'accepted').length,
            rejected: applications.filter(app => app.status === 'rejected').length
        };
    };

    const counts = getStatusCounts();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Applications Management
                </h1>
                <p className="mt-2 text-gray-600">Review and manage all internship applications</p>
            </div>

            {successMessage && (
                <div className="mb-6 p-4 bg-green-50/50 border border-green-200 text-green-700 rounded-xl flex items-center shadow-sm backdrop-blur-sm">
                    <FiCheck className="mr-2" />
                    {successMessage}
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50/50 border border-red-200 text-red-700 rounded-xl flex items-center shadow-sm backdrop-blur-sm">
                    <FiX className="mr-2" />
                    {error}
                </div>
            )}


            <div className="flex flex-wrap gap-2 mb-8 bg-white/50 p-2 rounded-2xl backdrop-blur-sm border border-white/20 shadow-sm">
                {['all', 'pending', 'reviewed', 'interview', 'accepted', 'rejected'].map((status) => (
                    <button
                        key={status}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${statusFilter === status
                            ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                            : 'bg-white/50 text-gray-600 hover:bg-white hover:text-indigo-600'
                            }`}
                        onClick={() => setStatusFilter(status)}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)} ({counts[status]})
                    </button>
                ))}
            </div>


            <div className="mb-8">
                <div className="relative max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by applicant, email, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors backdrop-blur-sm shadow-sm"
                    />
                </div>
            </div>


            {filteredApplications.length === 0 ? (
                <div className="text-center py-12 bg-white/50 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm">
                    <p className="text-gray-500 text-lg">No applications found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredApplications.map((application) => (
                        <div key={application._id} className="bg-white/70 rounded-2xl p-6 shadow-sm border border-white/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-200">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{application.internship?.title || 'Unknown Position'}</h3>
                                    <p className="text-indigo-600 font-medium">{application.internship?.company || 'Unknown Company'}</p>
                                </div>
                                <span className={`mt-2 md:mt-0 ${getStatusBadgeClass(application.status)}`}>
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Applicant</p>
                                    <p className="font-medium text-gray-900">{application.studentName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-900">{application.studentEmail}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500">Applied On</p>
                                    <p className="font-medium text-gray-900">{new Date(application.appliedAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="mb-6 bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                                <p className="text-sm text-gray-500 mb-2">Cover Letter</p>
                                <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
                            </div>

                            {application.resume && (
                                <div className="mb-6">
                                    <a
                                        href={application.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        View Resume
                                    </a>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                                {application.status !== 'accepted' && (
                                    <button
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm text-sm font-medium"
                                        onClick={() => updateApplicationStatus(application._id, 'accepted')}
                                    >
                                        <FiCheck className="mr-2" /> Accept
                                    </button>
                                )}
                                {application.status !== 'rejected' && (
                                    <button
                                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm text-sm font-medium"
                                        onClick={() => updateApplicationStatus(application._id, 'rejected')}
                                    >
                                        <FiX className="mr-2" /> Reject
                                    </button>
                                )}
                                {application.status !== 'interview' && application.status !== 'accepted' && application.status !== 'rejected' && (
                                    <button
                                        className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors shadow-sm text-sm font-medium"
                                        onClick={() => updateApplicationStatus(application._id, 'interview')}
                                    >
                                        <FiCalendar className="mr-2" /> Schedule Interview
                                    </button>
                                )}
                                {application.status === 'pending' && (
                                    <button
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
                                        onClick={() => updateApplicationStatus(application._id, 'reviewed')}
                                    >
                                        <FiEye className="mr-2" /> Mark Reviewed
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationsManagement;
