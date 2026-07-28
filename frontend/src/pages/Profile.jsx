import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useJobContext } from '../context/JobProvider';

const Profile = () => {
  const { user } = useAuthContext();
  const { bookmarkedJobs } = useJobContext();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // Fetch applied jobs (this would normally come from an API)
  useEffect(() => {
    // In a real app, this would fetch from an API endpoint
    // For now, we'll simulate with empty array
    setAppliedJobs([]);
  }, [user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, this would make an API call to update the user
      // For now, we'll just update the context and show a success message

      // Validate form
      if (!formData.name.trim()) {
        setMessage('Name is required');
        setMessageType('error');
        return;
      }

      if (!formData.email.trim()) {
        setMessage('Email is required');
        setMessageType('error');
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setMessage('Please enter a valid email');
        setMessageType('error');
        return;
      }

      // Simulate API call
      setMessage('Updating profile...');
      setMessageType('info');

      // In a real app, you would call your API here
      // const response = await fetch(`/api/users/profile`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(formData)
      // });

      // For now, we'll just update the local state and show success
      setTimeout(() => {
        // Update user in context (in a real app, this would come from the API response)
        // We would need to update the AuthContext with the new user data

        setMessage('Profile updated successfully!');
        setMessageType('success');
        setIsEditing(false);

        // Refresh the user data
        // In a real app, you might refetch the user data from the server
      }, 1000);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
      setMessageType('error');
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
                {isEditing ? (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-1 text-sm"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Status Message */}
            {message && (
              <div className={`mb-4 p-4 rounded-md
                ${messageType === 'success' ? 'bg-green-500/10 text-green-800' : ''}
                ${messageType === 'error' ? 'bg-red-500/10 text-red-800' : ''}
                ${messageType === 'info' ? 'bg-blue-500/10 text-blue-800' : ''}
              `}>
                {message}
              </div>
            )}

            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                {/* User Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{user.name || 'No Name'}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Role: {user.role === 'ADMIN' ? 'Administrator' : 'User'} •
                        Member since: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">{bookmarkedJobs?.length || 0}</div>
                    <div className="text-sm text-gray-600">Saved Jobs</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">{appliedJobs.length}</div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">100%</div>
                    <div className="text-sm text-gray-600">Profile Completeness</div>
                  </div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="mt-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">My Activity</h3>
            <div className="space-y-4">
              {/* Applied Jobs */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Applications ({appliedJobs.length})</h4>
                {appliedJobs.length === 0 ? (
                  <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                ) : (
                  <div className="space-y-3">
                    {appliedJobs.map((job) => (
                      <div key={job.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{job.title}</h5>
                            <p className="text-sm text-gray-600">{job.company}</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            Applied
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bookmarked Jobs */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Saved Jobs ({bookmarkedJobs?.length || 0})</h4>
                {(!bookmarkedJobs || bookmarkedJobs.length === 0) ? (
                  <p className="text-gray-500">You haven't saved any jobs yet.</p>
                ) : (
                  <div className="space-y-3">
                    {bookmarkedJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{job.title}</h5>
                            <p className="text-sm text-gray-600">{job.company}</p>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            Saved
                          </span>
                        </div>
                      </div>
                    ))}
                    {bookmarkedJobs.length > 3 && (
                      <p className="text-center text-sm text-gray-500 mt-2">
                        +{bookmarkedJobs.length - 3} more
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;