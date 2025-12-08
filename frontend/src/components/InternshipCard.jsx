

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';


const InternshipCard = ({ internship }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/internships/${internship._id}`);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {internship.title}
                        </h3>
                        <p className="text-sm font-medium text-indigo-600 mt-1">
                            {internship.company}
                        </p>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {internship.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <FiMapPin className="mr-2" /> {internship.country}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <FiClock className="mr-2" /> {internship.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <FiDollarSign className="mr-2" /> {internship.stipend}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <FiCalendar className="mr-2" /> Deadline: {formatDate(internship.applicationDeadline)}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {internship.skills.slice(0, 3).map((skill, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                        >
                            {skill}
                        </span>
                    ))}
                    {internship.skills.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{internship.skills.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                <button
                    onClick={handleViewDetails}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default InternshipCard;
