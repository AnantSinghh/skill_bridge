/**
 * Applications Management Page (Admin Only)
 * View and manage all internship applications
 */

import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import { FiCheck, FiX, FiCalendar, FiEye } from 'react-icons/fi';


const ApplicationsManagement = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Filter states
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

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(app => app.status === statusFilter);
        }

        // Filter by search query
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

                // Update local state
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
        const statusClasses = {
            pending: 'status-pending',
            reviewed: 'status-reviewed',
            interview: 'status-interview',
            accepted: 'status-accepted',
            rejected: 'status-rejected'
        };
        return statusClasses[status] || 'status-pending';
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
        return <div className="loading">Loading applications...</div>;
    }

    return (
        <div className="applications-management-container">
            <div className="applications-header">
                <h1>Applications Management</h1>
                <p>Review and manage all internship applications</p>
            </div>

            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}

            {error && (
                <div className="error-message">{error}</div>
            )}

            {/* Status Filter Tabs */}
            <div className="status-tabs">
                <button
                    className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('all')}
                >
                    All ({counts.all})
                </button>
                <button
                    className={`status-tab ${statusFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('pending')}
                >
                    Pending ({counts.pending})
                </button>
                <button
                    className={`status-tab ${statusFilter === 'reviewed' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('reviewed')}
                >
                    Reviewed ({counts.reviewed})
                </button>
                <button
                    className={`status-tab ${statusFilter === 'interview' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('interview')}
                >
                    Interview ({counts.interview})
                </button>
                <button
                    className={`status-tab ${statusFilter === 'accepted' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('accepted')}
                >
                    Accepted ({counts.accepted})
                </button>
                <button
                    className={`status-tab ${statusFilter === 'rejected' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('rejected')}
                >
                    Rejected ({counts.rejected})
                </button>
            </div>

            {/* Search Bar */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by applicant name, email, or internship..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
                <div className="no-applications">
                    <p>No applications found.</p>
                </div>
            ) : (
                <div className="applications-list">
                    {filteredApplications.map((application) => (
                        <div key={application._id} className="application-card">
                            <div className="application-header">
                                <div className="internship-info">
                                    <h3>{application.internship?.title || 'N/A'}</h3>
                                    <p className="company">{application.internship?.company || 'N/A'}</p>
                                </div>
                                <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                            </div>

                            <div className="applicant-info">
                                <div className="info-row">
                                    <strong>Applicant:</strong> {application.studentName}
                                </div>
                                <div className="info-row">
                                    <strong>Email:</strong> {application.studentEmail}
                                </div>
                                <div className="info-row">
                                    <strong>Applied:</strong> {new Date(application.appliedAt).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="application-details">
                                <div className="cover-letter">
                                    <strong>Cover Letter:</strong>
                                    <p>{application.coverLetter}</p>
                                </div>
                                {application.resume && (
                                    <div className="resume-link">
                                        <strong>Resume:</strong>{' '}
                                        <a href={application.resume} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="action-buttons">
                                {application.status !== 'accepted' && (
                                    <button
                                        className="btn-accept"
                                        onClick={() => updateApplicationStatus(application._id, 'accepted')}
                                    >
                                        <FiCheck className="mr-2" /> Accept
                                    </button>
                                )}
                                {application.status !== 'rejected' && (
                                    <button
                                        className="btn-reject"
                                        onClick={() => updateApplicationStatus(application._id, 'rejected')}
                                    >
                                        <FiX className="mr-2" /> Reject
                                    </button>
                                )}
                                {application.status !== 'interview' && application.status !== 'accepted' && application.status !== 'rejected' && (
                                    <button
                                        className="btn-interview"
                                        onClick={() => updateApplicationStatus(application._id, 'interview')}
                                    >
                                        <FiCalendar className="mr-2" /> Schedule Interview
                                    </button>
                                )}
                                {application.status === 'pending' && (
                                    <button
                                        className="btn-reviewed"
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
