import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useJobContext } from '../context/JobProvider';
import { useApplicationContext } from '../context/ApplicationProvider';
import JobCard from '../components/JobCard';

const Dashboard = () => {
  const { user } = useAuthContext();
  const { jobs: allJobs, loading: jobsLoading, error: jobsError, fetchJobs, bookmarkedJobs } = useJobContext();
  const { applications, loading: appsLoading, error: appsError, getApplicationsByUserId } = useApplicationContext();
  const [stats, setStats] = useState({});
  const [recentJobs, setRecentJobs] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const loadDashboardData = async () => {
        try {
          // Fetch jobs data if not already loaded
          if (allJobs.length === 0) {
            await fetchJobs({});
          }

          // Get user applications
          let userApplicationsList = [];
          if (user.id) {
            userApplicationsList = await getApplicationsByUserId(user.id);
            setUserApplications(userApplicationsList);
          }

          // Get bookmarked jobs from localStorage or context (placeholder for now)
          const bookmarkedJobsList = bookmarkedJobs;

          // Calculate stats AFTER we have the data
          const statsData = {
            applicationsCount: userApplicationsList.length,
            bookmarkedJobsCount: bookmarkedJobsList.length,
            // For now, we'll calculate based on localStorage or context
            profileCompletion: Math.floor(Math.random() * 100) // Placeholder
          };

          // Get recent jobs (latest 3)
          const sortedJobs = [...allJobs].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRecentJobs(sortedJobs.slice(0, 3));

          // Get recommended jobs (random 3 for demo)
          const shuffledJobs = [...allJobs].sort(() => 0.5 - Math.random());
          setRecommendedJobs(shuffledJobs.slice(0, 3));

          // Update stats with actual data
          setStats({
            applicationsCount: userApplicationsList.length,
            bookmarkedJobsCount: bookmarkedJobsList.length,
            profileCompletion: Math.floor(Math.random() * 100) // Placeholder
          });

          setLoading(false);
        } catch (err) {
          console.error('Error loading dashboard data:', err);
          setLoading(false);
        }
      };

      loadDashboardData();
    }
  }, [user, allJobs, fetchJobs, getApplicationsByUserId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                Dashboard
              </h1>
              <p className="mt-1 text-gray-600">
                Welcome back, {user?.name || 'User'}!
              </p>
            </div>
            <Link to="/profile" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{stats.applicationsCount}</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-flex items-center justify-center">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Bookmarked Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.bookmarkedJobsCount}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Profile Completeness</p>
                <p className="text-3xl font-bold text-gray-900">{stats.profileCompletion}%</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Messages</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h11a2 2 0 012 2v10a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Application Activity */}
            {userApplications.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Applications</h3>
                <div className="space-y-3">
                  {userApplications.slice(0, 3).map((app) => (
                    <div key={app.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                          <p className="text-sm text-gray-500">{app.company}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Applied {/* Format date - simplified for demo */}
                          {/* new Date(app.appliedAt).toLocaleDateString() */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* No activity message */}
            {userApplications.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent activity. Start by applying to some jobs!</p>
                <Link to="/jobs" className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Sections */}
        <div className="grid gap-8">
          {/* Your Applications */}
          <div className="col-span-1 lg:col-span-1">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-900 flex justify-between items-center">
                  Your Applications
                  <Link to="/my-applications" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View All
                  </Link>
                </h2>
              </div>
              <div className="p-6">
                {userApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                    <Link to="/jobs" className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                      Find Your First Job
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userApplications.slice(0, 2).map((app) => (
                      <div key={app.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">Applied</span>
                        </div>
                        <p className="text-sm text-gray-500">{app.company}</p>
                        <div className="mt-2">
                          <Link to={`/jobs/${app.jobId}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            View Job Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-900 flex justify-between items-center">
                  Recommended for You
                </h2>
              </div>
              <div className="p-6">
                {recommendedJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No recommendations available yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {recommendedJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
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

export default Dashboard;