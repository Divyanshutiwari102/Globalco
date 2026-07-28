import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApplicationContext } from '../context/ApplicationProvider';
import { useAuthContext } from '../context/AuthContext';

const MyApplications = () => {
  const { user } = useAuthContext();
  const { applications, loading, error, getApplicationsByUserId } = useApplicationContext();

  useEffect(() => {
    if (user) {
      getApplicationsByUserId(user.id);
    }
  }, [getApplicationsByUserId, user]);

  // Function to handle withdrawing an application
  const handleWithdrawApplication = async (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        // Call the API to delete the application
        const response = await fetch(`/api/applications/${applicationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to withdraw application');
        }

        // Refresh the applications list
        if (user) {
          getApplicationsByUserId(user.id);
        }
      } catch (err) {
        setError('Failed to withdraw application. Please try again.');
        console.error('Error withdrawing application:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-red-500 text-xl mb-4">Error loading applications</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>
      {applications.length === 0 ? (
        <p className="text-center py-12 text-gray-500">
          You haven't applied for any jobs yet. <Link to="/jobs" className="text-indigo-600 hover:underline">Browse jobs</Link> to get started.
        </p>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div key={application.id} className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                {/* Job header with title and company */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{application.jobTitle}</h2>
                    <p className="text-lg font-medium text-gray-700">{application.company}</p>
                    <p className="text-sm text-gray-500">{application.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded">
                      Applied
                    </span>
                  </div>
                </div>

                {/* Job details */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H3m8 0H5m8 0V3m0 4h4m-4 8h4m-4 0h4m-4 4h6m2-3a4 4 0 00-4 4v1a5 5 0 002 10 5 5 0 002-10v-1a4 4 0 00-4-4zM9 16a3 3 0 016 0 3 3 0 01-6 0z"/>
                      </svg>
                      <span>{application.experience}</span>
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                      </svg>
                      <span>{application.employmentType}</span>
                    </span>
                  </div>

                  {/* Skills */}
                  {application.skills && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {application.skills.split(',').map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Application date */}
                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                    Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => handleWithdrawApplication(application.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded hover:bg-red-100 transition-colors"
                    >
                      Withdraw Application
                    </button>
                    <Link
                      to={`/jobs/${application.jobId}`}
                      className="px-4 py-2 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition-colors"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;