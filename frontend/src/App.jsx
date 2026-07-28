import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              {(user && user.role === 'ADMIN') ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )}
            </ProtectedRoute>
          } />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;