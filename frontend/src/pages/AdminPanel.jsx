

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiStar, FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';


const AdminPanel = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        description: '',
        skills: '',
        country: '',
        duration: '',
        stipend: '',
        applicationDeadline: ''
    });

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            setLoading(true);
            const response = await api.get('/internships');

            if (response.data.success) {
                setInternships(response.data.data);
            }
        } catch (err) {
            setError('Failed to fetch internships');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            company: '',
            description: '',
            skills: '',
            country: '',
            duration: '',
            stipend: '',
            applicationDeadline: ''
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {

            const submitData = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
            };

            let response;
            if (editingId) {
                response = await api.put(`/internships/${editingId}`, submitData);
            } else {
                response = await api.post('/internships', submitData);
            }

            if (response.data.success) {
                setSuccess(
                    editingId
                        ? 'Internship updated successfully!'
                        : 'Internship created successfully!'
                );
                resetForm();
                fetchInternships();
            }
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to save internship'
            );
        }
    };

    const handleEdit = (internship) => {
        setFormData({
            title: internship.title,
            company: internship.company,
            description: internship.description,
            skills: internship.skills.join(', '),
            country: internship.country,
            duration: internship.duration,
            stipend: internship.stipend,
            applicationDeadline: internship.applicationDeadline.split('T')[0]
        });
        setEditingId(internship._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this internship?')) {
            return;
        }

        try {
            const response = await api.delete(`/internships/${id}`);

            if (response.data.success) {
                setSuccess('Internship deleted successfully!');
                fetchInternships();
            }
        } catch (err) {
            setError('Failed to delete internship');
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1 inline-block">
                        Admin Panel
                    </h1>
                    <div className="mt-2 flex items-center text-gray-600">
                        <span>Manage internship listings</span>
                        <span className="mx-2">•</span>
                        <a href="/admin/applications" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center hover:underline">
                            View Applications <span className="ml-1">→</span>
                        </a>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`mt-4 md:mt-0 px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md ${showForm
                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
                        }`}
                >
                    {showForm ? 'Cancel' : '+ Add New Internship'}
                </button>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-green-700">
                    {success}
                </div>
            )}

            {showForm && (
                <div className="mb-12 bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden animate-fade-in">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900">
                            {editingId ? 'Edit Internship' : 'Create New Internship'}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                    placeholder="e.g. Frontend Developer Intern"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                    placeholder="e.g. Tech Corp"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                className="input-field resize-none"
                                placeholder="Describe the role, responsibilities, and requirements..."
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills (comma-separated) <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                placeholder="e.g. React, Node.js, MongoDB"
                                required
                                className="input-field"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Location/Country <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                    placeholder="e.g. Remote, USA"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 3 months"
                                    required
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">Stipend</label>
                                <input
                                    type="text"
                                    id="stipend"
                                    name="stipend"
                                    value={formData.stipend}
                                    onChange={handleInputChange}
                                    placeholder="e.g. $1000/month or Unpaid"
                                    className="input-field"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">Application Deadline <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    id="applicationDeadline"
                                    name="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-end space-x-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all"
                            >
                                {editingId ? 'Update Internship' : 'Create Internship'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="mb-6 pb-2 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Manage Internships</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : internships.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-6xl mb-4 text-indigo-400 flex justify-center"><FiStar /></div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No internships found</h3>
                    <p className="text-gray-500 mb-6">Create your first internship listing to get started!</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
                    >
                        + Create Internship
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {internships.map((internship) => (
                        <div key={internship._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{internship.title}</h3>
                                        <p className="text-indigo-600 font-medium">{internship.company}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                        <button
                                            onClick={() => handleEdit(internship)}
                                            className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(internship._id)}
                                            className="px-3 py-1.5 border border-red-200 text-sm font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4 text-gray-600 text-sm line-clamp-2">
                                    {internship.description}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <FiMapPin className="mr-2" /> {internship.country}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FiClock className="mr-2" /> {internship.duration}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FiDollarSign className="mr-2" /> {internship.stipend}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FiCalendar className="mr-2" /> {formatDate(internship.applicationDeadline)}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-50">
                                    {internship.skills.map((skill, index) => (
                                        <span key={index} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
