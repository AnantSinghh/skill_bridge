/**
 * InternshipDetails Page
 * View detailed information about a specific internship and apply
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { FiSearch, FiArrowLeft, FiMapPin, FiClock, FiDollarSign, FiCalendar, FiFileText, FiLayers, FiCheckCircle, FiX } from 'react-icons/fi';


const InternshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        coverLetter: '',
        resume: ''
    });
    const [applying, setApplying] = useState(false);
    const [applicationSuccess, setApplicationSuccess] = useState(false);

    const fetchInternshipDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/internships/${id}`);

            if (response.data.success) {
                setInternship(response.data.data);
            }
        } catch (err) {
            setError('Failed to fetch internship details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchInternshipDetails();
    }, [fetchInternshipDetails]);

    const handleApplyClick = () => {
        setShowApplyForm(true);
    };

    const handleApplicationChange = (e) => {
        setApplicationData({
            ...applicationData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        setApplying(true);
        setError('');

        try {
            const response = await api.post('/applications', {
                internshipId: id,
                ...applicationData
            });

            if (response.data.success) {
                setApplicationSuccess(true);
                setShowApplyForm(false);
                setApplicationData({ coverLetter: '', resume: '' });
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to submit application'
            );
        } finally {
            setApplying(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
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

    if (error && !internship) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
                    {error}
                </div>
            </div>
        );
    }

    if (!internship) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-6xl mb-4 text-indigo-200 flex justify-center"><FiSearch /></div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Internship not found</h3>
                    <button onClick={() => navigate('/internships')} className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Return to listings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button
                onClick={() => navigate('/internships')}
                className="mb-6 flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            >
                <span className="mr-2"><FiArrowLeft className="inline" /></span> Back to Internships
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{internship.title}</h1>
                            <h2 className="text-xl text-indigo-600 font-medium mb-6">{internship.company}</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <div className="flex items-center text-gray-700">
                                    <FiMapPin className="text-xl mr-3 text-indigo-600" />
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Location</div>
                                        <div className="font-medium">{internship.country}</div>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FiClock className="text-xl mr-3 text-indigo-600" />
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Duration</div>
                                        <div className="font-medium">{internship.duration}</div>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FiDollarSign className="text-xl mr-3 text-indigo-600" />
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Stipend</div>
                                        <div className="font-medium">{internship.stipend}</div>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FiCalendar className="text-xl mr-3 text-indigo-600" />
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Deadline</div>
                                        <div className="font-medium">{formatDate(internship.applicationDeadline)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg mr-3 text-sm flex items-center justify-center"><FiFileText /></span>
                                    Description
                                </h3>
                                <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                    {internship.description}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <span className="bg-purple-100 text-purple-600 p-1.5 rounded-lg mr-3 text-sm flex items-center justify-center"><FiLayers /></span>
                                    Required Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {internship.skills.map((skill, index) => (
                                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Right Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Application Status</h3>

                        {isAdmin() ? (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                <p className="text-blue-800 font-medium">You are viewing this as an Admin</p>
                                <button onClick={() => navigate('/admin')} className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline">
                                    Go to Admin Panel
                                </button>
                            </div>
                        ) : applicationSuccess ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                <div className="text-4xl mb-3 flex justify-center"><FiCheckCircle className="text-green-500" /></div>
                                <h4 className="text-lg font-bold text-green-800 mb-2">Applied Successfully!</h4>
                                <p className="text-green-700 text-sm mb-4">
                                    Your application has been sent to {internship.company}.
                                </p>
                                <button
                                    onClick={() => navigate('/my-applications')}
                                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 transition-colors"
                                >
                                    Track Status
                                </button>
                            </div>
                        ) : !showApplyForm ? (
                            <div>
                                <p className="text-gray-600 mb-6 text-sm">
                                    Interested in this role? Submit your application now using our secure portal.
                                </p>
                                <button
                                    onClick={handleApplyClick}
                                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transform transition-all hover:-translate-y-0.5"
                                >
                                    Apply Now
                                </button>
                                <p className="mt-4 text-xs text-center text-gray-400">
                                    Applications close on {formatDate(internship.applicationDeadline)}
                                </p>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-gray-900">Your Application</h4>
                                    <button onClick={() => setShowApplyForm(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
                                </div>

                                {error && <div className="mb-4 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100">{error}</div>}

                                <form onSubmit={handleSubmitApplication} className="space-y-4">
                                    <div>
                                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                                            Cover Letter <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="coverLetter"
                                            name="coverLetter"
                                            value={applicationData.coverLetter}
                                            onChange={handleApplicationChange}
                                            required
                                            rows="6"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                                            placeholder="Introduce yourself and explain why you're a good fit..."
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                                            Resume Link (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="resume"
                                            name="resume"
                                            value={applicationData.resume}
                                            onChange={handleApplicationChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>

                                    <div className="pt-2 flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowApplyForm(false)}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={applying}
                                            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                                        >
                                            {applying ? 'Sending...' : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipDetails;
