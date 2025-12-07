/**
 * Main App Component
 * Sets up routing and authentication context
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Internships from './pages/Internships';
import InternshipDetails from './pages/InternshipDetails';
import MyApplications from './pages/MyApplications';
import AdminPanel from './pages/AdminPanel';
import ApplicationsManagement from './pages/ApplicationsManagement';
import Profile from './pages/Profile';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App min-h-screen bg-gray-50 flex flex-col">
                    <Navbar />
                    <div className="flex-grow pt-16">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/internships"
                                element={
                                    <ProtectedRoute>
                                        <Internships />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/internships/:id"
                                element={
                                    <ProtectedRoute>
                                        <InternshipDetails />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/my-applications"
                                element={
                                    <ProtectedRoute>
                                        <MyApplications />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Admin Only Routes */}
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute adminOnly={true}>
                                        <AdminPanel />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/admin/applications"
                                element={
                                    <ProtectedRoute adminOnly={true}>
                                        <ApplicationsManagement />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Default Route */}
                            <Route path="/" element={<Navigate to="/login" replace />} />

                            {/* 404 Route */}
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
