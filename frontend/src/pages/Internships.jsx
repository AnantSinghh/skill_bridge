/**
 * Internships Page
 * Browse and filter internship listings with pagination
 */

import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import InternshipCard from '../components/InternshipCard';
import { FiSearch } from 'react-icons/fi';


const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    // Filter states
    const [filters, setFilters] = useState({
        skill: '',
        country: '',
        duration: '',
        search: ''
    });

    const fetchInternships = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();

            if (filters.skill) params.append('skill', filters.skill);
            if (filters.country) params.append('country', filters.country);
            if (filters.duration) params.append('duration', filters.duration);
            if (filters.search) params.append('search', filters.search);

            // Add pagination params
            params.append('page', currentPage);
            params.append('limit', itemsPerPage);

            const response = await api.get(`/internships?${params.toString()}`);

            if (response.data.success) {
                setInternships(response.data.data);
                setTotalPages(response.data.pages);
                setTotalCount(response.data.total);
            }
        } catch (err) {
            setError('Failed to fetch internships');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [filters, currentPage, itemsPerPage]);

    useEffect(() => {
        fetchInternships();
    }, [fetchInternships]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setFilters({
            skill: '',
            country: '',
            duration: '',
            search: ''
        });
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1 inline-block">
                    Browse Internships
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Find your perfect opportunity from verified global internships
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><FiSearch /></span>
                        <input
                            type="text"
                            name="search"
                            placeholder="Title, Company..."
                            value={filters.search}
                            onChange={handleFilterChange}
                            className="pl-10 input-field"
                        />
                    </div>

                    <input
                        type="text"
                        name="skill"
                        placeholder="Skill (e.g. React)"
                        value={filters.skill}
                        onChange={handleFilterChange}
                        className="input-field"
                    />

                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={filters.country}
                        onChange={handleFilterChange}
                        className="input-field"
                    />

                    <input
                        type="text"
                        name="duration"
                        placeholder="Duration (e.g. 3 months)"
                        value={filters.duration}
                        onChange={handleFilterChange}
                        className="input-field"
                    />
                </div>

                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-50">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 sm:mb-0">
                        <label>Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-1.5"
                        >
                            <option value="6">6</option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="50">50</option>
                        </select>
                        <span>per page</span>
                    </div>

                    <button
                        onClick={clearFilters}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-all"
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
                    {error}
                </div>
            ) : internships.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-6xl mb-4 text-indigo-200 flex justify-center"><FiSearch /></div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No internships found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                    <button onClick={clearFilters} className="btn-primary">
                        Clear Filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gray-500">
                        Showing <span className="font-medium text-gray-900">{((currentPage - 1) * itemsPerPage) + 1}</span> - <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, totalCount)}</span> of <span className="font-medium text-gray-900">{totalCount}</span> internships
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {internships.map((internship) => (
                            <InternshipCard key={internship._id} internship={internship} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-2">
                            <button
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${currentPage === 1
                                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                                    }`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                ← Previous
                            </button>

                            <div className="hidden sm:flex space-x-1">
                                {getPageNumbers().map((page, index) => (
                                    page === '...' ? (
                                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">...</span>
                                    ) : (
                                        <button
                                            key={page}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                                                }`}
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${currentPage === totalPages
                                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-indigo-600'
                                    }`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Internships;

