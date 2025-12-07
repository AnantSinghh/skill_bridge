/**
 * Navbar Component
 * Navigation bar with authentication-aware menu and profile dropdown
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { FiUser, FiChevronDown, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowProfileDropdown(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              SkillBridge
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated() ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/internships" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  Internships
                </Link>
                {!isAdmin() && (
                  <Link to="/my-applications" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                    My Applications
                  </Link>
                )}
                {isAdmin() && (
                  <>
                    <Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                      Admin Panel
                    </Link>
                    <Link to="/admin/applications" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                      Applications
                    </Link>
                  </>
                )}

                {/* Profile Dropdown for Students */}
                {!isAdmin() && (
                  <div className="relative">
                    <button
                      className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium focus:outline-none transition-colors"
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                      <FiUser className="text-xl" />
                      <FiChevronDown className={`text-xs transform transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showProfileDropdown && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowProfileDropdown(false)}></div>
                        <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 overflow-hidden transform transition-all duration-200 origin-top-right">
                          <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                          </div>
                          <div className="py-1">
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                              onClick={() => setShowProfileDropdown(false)}
                            >
                              <FiUser className="inline mr-2" /> View Profile
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <FiLogOut className="inline mr-2" /> Logout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Admin Items */}
                {isAdmin() && (
                  <>
                    <span className="text-gray-500 text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">
                      <FiUser className="inline mr-1" /> {user?.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2"
            >
              <span className="text-2xl">{mobileMenuOpen ? <FiX /> : <FiMenu />}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-lg animate-fade-in-down">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {isAuthenticated() ? (
              <>
                <div className="px-3 py-2 bg-gray-50 rounded-lg mb-2">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  {isAdmin() && <span className="text-xs text-indigo-600 font-medium">Admin Access</span>}
                </div>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                  Dashboard
                </Link>
                <Link to="/internships" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                  Internships
                </Link>
                {!isAdmin() && (
                  <>
                    <Link to="/my-applications" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                      My Applications
                    </Link>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                      My Profile
                    </Link>
                  </>
                )}
                {isAdmin() && (
                  <>
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                      Admin Panel
                    </Link>
                    <Link to="/admin/applications" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                      Applications
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center mt-4 px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
