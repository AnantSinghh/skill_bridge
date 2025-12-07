/**
 * Profile Page
 * View and edit user professional profile
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

import { FiEdit2, FiTrash2, FiSave, FiX, FiPlus, FiFileText, FiLayout, FiExternalLink } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        bio: '',
        phone: '',
        location: '',
        education: [],
        experience: [],
        skills: [],
        projects: [],
        resume: '',
        portfolio: '',
        linkedin: '',
        github: ''
    });

    // Temporary states for adding new items
    const [newSkill, setNewSkill] = useState('');
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get('/profile/me');

            if (response.data.success) {
                setProfile(response.data.data);
                setFormData({
                    bio: response.data.data.bio || '',
                    phone: response.data.data.phone || '',
                    location: response.data.data.location || '',
                    education: response.data.data.education || [],
                    experience: response.data.data.experience || [],
                    skills: response.data.data.skills || [],
                    projects: response.data.data.projects || [],
                    resume: response.data.data.resume || '',
                    portfolio: response.data.data.portfolio || '',
                    linkedin: response.data.data.linkedin || '',
                    github: response.data.data.github || ''
                });
            }
        } catch (err) {
            if (err.response?.status === 404) {
                // Profile doesn't exist yet
                setProfile(null);
                setIsEditing(true);
            } else {
                setError('Failed to fetch profile');
            }
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

    const handleSave = async () => {
        try {
            setError('');
            setSuccess('');

            const response = await api.put('/profile', formData);

            if (response.data.success) {
                setSuccess('Profile saved successfully!');
                setProfile(response.data.data);
                setIsEditing(false);
                setTimeout(() => setSuccess(''), 3000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save profile');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await api.delete('/profile');

            if (response.data.success) {
                setSuccess('Profile deleted successfully');
                setTimeout(() => navigate('/dashboard'), 2000);
            }
        } catch (err) {
            setError('Failed to delete profile');
        }
    };

    // Education functions
    const addEducation = (edu) => {
        setFormData({
            ...formData,
            education: [...formData.education, edu]
        });
        setShowEducationForm(false);
    };

    const removeEducation = (index) => {
        setFormData({
            ...formData,
            education: formData.education.filter((_, i) => i !== index)
        });
    };

    // Experience functions
    const addExperience = (exp) => {
        setFormData({
            ...formData,
            experience: [...formData.experience, exp]
        });
        setShowExperienceForm(false);
    };

    const removeExperience = (index) => {
        setFormData({
            ...formData,
            experience: formData.experience.filter((_, i) => i !== index)
        });
    };

    // Skills functions
    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill.trim()]
            });
            setNewSkill('');
        }
    };

    const removeSkill = (skill) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(s => s !== skill)
        });
    };

    // Projects functions
    const addProject = (project) => {
        setFormData({
            ...formData,
            projects: [...formData.projects, project]
        });
        setShowProjectForm(false);
    };

    const removeProject = (index) => {
        setFormData({
            ...formData,
            projects: formData.projects.filter((_, i) => i !== index)
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1 inline-block">
                    {isEditing ? 'Edit Profile' : 'My Profile'}
                </h1>
                <div className="flex items-center space-x-3">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium flex items-center"
                            >
                                <FiEdit2 className="mr-2" /> Edit Profile
                            </button>
                            {profile && (
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center"
                                >
                                    <FiTrash2 className="mr-2" /> Delete
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm font-medium flex items-center"
                            >
                                <FiSave className="mr-2" /> Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    if (profile) fetchProfile();
                                }}
                                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
                            >
                                <FiX className="mr-2" /> Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 animate-fade-in">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-green-700 animate-fade-in">
                    {success}
                </div>
            )}

            <div className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Personal Information</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself..."
                                    rows="4"
                                    className="input-field resize-none"
                                />
                            ) : (
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{formData.bio || 'No bio added yet'}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1234567890"
                                        className="input-field"
                                    />
                                ) : (
                                    <p className="text-gray-600">{formData.phone || 'Not provided'}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="City, Country"
                                        className="input-field"
                                    />
                                ) : (
                                    <p className="text-gray-600">{formData.location || 'Not provided'}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Education</h2>
                        {isEditing && (
                            <button
                                onClick={() => setShowEducationForm(true)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline flex items-center"
                            >
                                <FiPlus className="mr-1" /> Add Education
                            </button>
                        )}
                    </div>

                    {showEducationForm && <EducationForm onAdd={addEducation} onCancel={() => setShowEducationForm(false)} />}

                    {formData.education.length === 0 ? (
                        !showEducationForm && <p className="text-gray-400 italic">No education added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {formData.education.map((edu, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 relative group">
                                    <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                    <p className="text-indigo-600">{edu.degree} in {edu.field}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </p>
                                    {isEditing && (
                                        <button
                                            onClick={() => removeEducation(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                            title="Remove"
                                        >
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Experience */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
                        {isEditing && (
                            <button
                                onClick={() => setShowExperienceForm(true)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline flex items-center"
                            >
                                <FiPlus className="mr-1" /> Add Experience
                            </button>
                        )}
                    </div>

                    {showExperienceForm && <ExperienceForm onAdd={addExperience} onCancel={() => setShowExperienceForm(false)} />}

                    {formData.experience.length === 0 ? (
                        !showExperienceForm && <p className="text-gray-400 italic">No experience added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {formData.experience.map((exp, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 relative group">
                                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                    <p className="text-indigo-600">{exp.company}</p>
                                    <p className="text-gray-600 mt-2 text-sm whitespace-pre-line">{exp.description}</p>
                                    <p className="text-sm text-gray-500 mt-2 pt-2 border-t border-gray-200">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </p>
                                    {isEditing && (
                                        <button
                                            onClick={() => removeExperience(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                            title="Remove"
                                        >
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                    </div>

                    {isEditing && (
                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                placeholder="Add a skill..."
                                className="input-field flex-grow"
                            />
                            <button
                                onClick={addSkill}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
                            >
                                Add
                            </button>
                        </div>
                    )}

                    {formData.skills.length === 0 ? (
                        <p className="text-gray-400 italic">No skills added yet</p>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                                <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                    {skill}
                                    {isEditing && (
                                        <button
                                            onClick={() => removeSkill(skill)}
                                            className="ml-2 text-indigo-400 hover:text-red-500 focus:outline-none"
                                        >
                                            <FiX />
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Projects */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Projects</h2>
                        {isEditing && (
                            <button
                                onClick={() => setShowProjectForm(true)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline flex items-center"
                            >
                                <FiPlus className="mr-1" /> Add Project
                            </button>
                        )}
                    </div>

                    {showProjectForm && <ProjectForm onAdd={addProject} onCancel={() => setShowProjectForm(false)} />}

                    {formData.projects.length === 0 ? (
                        !showProjectForm && <p className="text-gray-400 italic">No projects added yet</p>
                    ) : (
                        <div className="space-y-4">
                            {formData.projects.map((project, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 relative group">
                                    <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                                    <p className="text-gray-600 mt-2 whitespace-pre-line">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded text-gray-600">{tech}</span>
                                        ))}
                                    </div>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center mt-3 text-indigo-600 hover:text-indigo-800 font-medium text-sm hover:underline"
                                        >
                                            View Project <span className="ml-1">→</span>
                                        </a>
                                    )}

                                    {isEditing && (
                                        <button
                                            onClick={() => removeProject(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                            title="Remove"
                                        >
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Links</h2>
                    <div className="space-y-6">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Resume URL</label>
                            {isEditing ? (
                                <input
                                    type="url"
                                    name="resume"
                                    value={formData.resume}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/resume.pdf"
                                    className="input-field"
                                />
                            ) : (
                                formData.resume ? (
                                    <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                                        <FiFileText className="mr-1" /> View Resume <FiExternalLink className="ml-1" />
                                    </a>
                                ) : (
                                    <p className="text-gray-400">Not provided</p>
                                )
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio</label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        placeholder="https://myportfolio.com"
                                        className="input-field"
                                    />
                                ) : (
                                    formData.portfolio ? (
                                        <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                                            <FiLayout className="mr-1" /> Visit Portfolio <FiExternalLink className="ml-1" />
                                        </a>
                                    ) : (
                                        <p className="text-gray-400">Not provided</p>
                                    )
                                )}
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/username"
                                        className="input-field"
                                    />
                                ) : (
                                    formData.linkedin ? (
                                        <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                                            <FaLinkedin className="mr-1" /> LinkedIn Profile <FiExternalLink className="ml-1" />
                                        </a>
                                    ) : (
                                        <p className="text-gray-400">Not provided</p>
                                    )
                                )}
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                                {isEditing ? (
                                    <input
                                        type="url"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        placeholder="https://github.com/username"
                                        className="input-field"
                                    />
                                ) : (
                                    formData.github ? (
                                        <a href={formData.github} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center">
                                            <FaGithub className="mr-1" /> GitHub Profile <FiExternalLink className="ml-1" />
                                        </a>
                                    ) : (
                                        <p className="text-gray-400">Not provided</p>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Education Form Component
const EducationForm = ({ onAdd, onCancel }) => {
    const [edu, setEdu] = useState({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (edu.school && edu.degree && edu.field && edu.startDate) {
            onAdd(edu);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200 animate-fade-in">
            <h3 className="font-bold text-gray-900 mb-4">Add Education</h3>
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    placeholder="School/University"
                    value={edu.school}
                    onChange={(e) => setEdu({ ...edu, school: e.target.value })}
                    required
                    className="input-field"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => setEdu({ ...edu, field: e.target.value })}
                        required
                        className="input-field"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                        <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => setEdu({ ...edu, startDate: e.target.value })}
                            required
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">End Date</label>
                        <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => setEdu({ ...edu, endDate: e.target.value })}
                            disabled={edu.current}
                            className={`input-field ${edu.current ? 'bg-gray-100 text-gray-400' : ''}`}
                        />
                    </div>
                    <div className="flex items-center pt-5">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={edu.current}
                                onChange={(e) => setEdu({ ...edu, current: e.target.checked, endDate: '' })}
                                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                            />
                            <span className="text-sm text-gray-700">Currently studying</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">Add Education</button>
            </div>
        </form>
    );
};

// Experience Form Component
const ExperienceForm = ({ onAdd, onCancel }) => {
    const [exp, setExp] = useState({
        company: '',
        position: '',
        description: '',
        startDate: '',
        endDate: '',
        current: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (exp.company && exp.position && exp.startDate) {
            onAdd(exp);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200 animate-fade-in">
            <h3 className="font-bold text-gray-900 mb-4">Add Experience</h3>
            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => setExp({ ...exp, company: e.target.value })}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => setExp({ ...exp, position: e.target.value })}
                        required
                        className="input-field"
                    />
                </div>
                <textarea
                    placeholder="Description / Responsibilities"
                    value={exp.description}
                    onChange={(e) => setExp({ ...exp, description: e.target.value })}
                    rows="3"
                    className="input-field resize-none"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                        <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => setExp({ ...exp, startDate: e.target.value })}
                            required
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">End Date</label>
                        <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => setExp({ ...exp, endDate: e.target.value })}
                            disabled={exp.current}
                            className={`input-field ${exp.current ? 'bg-gray-100 text-gray-400' : ''}`}
                        />
                    </div>
                    <div className="flex items-center pt-5">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => setExp({ ...exp, current: e.target.checked, endDate: '' })}
                                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                            />
                            <span className="text-sm text-gray-700">Currently working</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">Add Experience</button>
            </div>
        </form>
    );
};

// Project Form Component
const ProjectForm = ({ onAdd, onCancel }) => {
    const [project, setProject] = useState({
        title: '',
        description: '',
        technologies: [],
        link: ''
    });
    const [techInput, setTechInput] = useState('');

    const addTechnology = () => {
        if (techInput.trim() && !project.technologies.includes(techInput.trim())) {
            setProject({
                ...project,
                technologies: [...project.technologies, techInput.trim()]
            });
            setTechInput('');
        }
    };

    const removeTechnology = (tech) => {
        setProject({
            ...project,
            technologies: project.technologies.filter(t => t !== tech)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (project.title) {
            onAdd(project);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200 animate-fade-in">
            <h3 className="font-bold text-gray-900 mb-4">Add Project</h3>
            <div className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                    required
                    className="input-field"
                />
                <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    rows="3"
                    className="input-field resize-none"
                />

                <div>
                    <label className="block text-xs text-gray-500 mb-1">Technologies Used</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add technology..."
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                            className="input-field flex-grow"
                        />
                        <button type="button" onClick={addTechnology} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">Add</button>
                    </div>
                    {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.technologies.map((tech, i) => (
                                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-300 text-gray-700">
                                    {tech}
                                    <button type="button" onClick={() => removeTechnology(tech)} className="ml-1.5 text-gray-400 hover:text-red-500">
                                        ✖
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="url"
                    placeholder="Project Link (optional)"
                    value={project.link}
                    onChange={(e) => setProject({ ...project, link: e.target.value })}
                    className="input-field"
                />
            </div>
            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm">Add Project</button>
            </div>
        </form>
    );
};

export default Profile;
