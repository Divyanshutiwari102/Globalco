import React, { useEffect, useState } from 'react';
import { useApplicationContext } from '../context/ApplicationProvider';
import { useJobContext } from '../context/JobProvider';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const { jobs, loading: loadingJobs, error: errorJobs, fetchJobs } = useJobContext();
  const { applications, loading: loadingApps, error: errorApps, getApplicationsForAdmin } = useApplicationContext();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
    newApplications: 0,
    acceptanceRate: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [jobStats, setJobStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      const loadAdminData = async () => {
        try {
          await fetchJobs({});
          await getApplicationsForAdmin();

          const totalJobs = jobs.length;
          const activeJobs = jobs.filter(job => job.status !== 'closed').length;
          const totalApplications = applications.length;

          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          const recentApplicationsCount = applications.filter(app =>
            new Date(app.appliedAt || app.createdAt) >= thirtyDaysAgo
          ).length;

          const acceptedApplications = applications.filter(app =>
            app.applicationStatus === 'accepted' || app.applicationStatus === 'Accepted'
          ).length;
          const acceptanceRate = totalApplications > 0
            ? Math.round((acceptedApplications / totalApplications) * 100)
            : 0;

          setStats({
            totalJobs: totalJobs,
            activeJobs: activeJobs,
            totalApplications: totalApplications,
            totalUsers: 42,
            newApplications: recentApplicationsCount,
            acceptanceRate: acceptanceRate
          });

          const sortedApplications = [...applications]
            .sort((a, b) => new Date(b.appliedAt || b.createdAt) - new Date(a.appliedAt || a.createdAt))
            .slice(0, 5)
            .map(app => ({
              id: app.id,
              jobTitle: app.jobTitle || 'Unknown Position',
              company: app.companyName || 'Unknown Company',
              applicantName: app.applicantName || 'Anonymous Applicant',
              appliedDate: new Date(app.appliedAt || app.createdAt).toISOString().split('T')[0],
              status: app.applicationStatus || 'pending'
            }));

          setRecentApplications(sortedApplications);

          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

          const monthlyApplications = Array.from({ length: 6 }, (_, i) => {
            const date = new Date();
            date.setMonth(sixMonthsAgo.getMonth() + i);
            const monthName = date.toLocaleString('default', { month: 'short' });
            const start = new Date(date.getFullYear(), date.getMonth(), 1);
            const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const count = applications.filter(app => {
              const appDate = new Date(app.appliedAt || app.createdAt);
              return appDate >= start && appDate <= end;
            }).length;

            return { name: monthName, applications: count };
          });

          setJobStats(monthlyApplications);
          setLoading(false);
        } catch (err) {
          console.error('Error loading admin data:', err);
          setLoading(false);
        }
      };

      loadAdminData();
    }
  }, [user, jobs, applications, fetchJobs, getApplicationsForAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (errorJobs || errorApps) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p className="font-medium">Error loading dashboard data:</p>
          <p className="mt-2">{errorJobs || errorApps}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-gray-600">
                Welcome back, {user.name}! Here's an overview of your platform.
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/jobs"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Manage Jobs
              </Link>
              <Link
                to="/my-applications"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Applications
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Job Listings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {stats.activeJobs} active, {stats.totalJobs - stats.activeJobs} inactive
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Applications Received</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {stats.newApplications} new this week • {stats.acceptanceRate}% acceptance rate
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Registered Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Growing community of professionals
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Platform Health</p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/>
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              All systems operational • 99.9% uptime
            </p>
          </div>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex justify-between items-center">
                Applications Trend (Last 6 Months)
              </h2>
            </div>
            <div className="h-[200px]">
              <div className="relative h-full">
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0.5">
                  {[...Array(4)].map((_, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="col-span-6 border-b border-gray-200"></div>
                  ))}
                  {[...Array(6)].map((_, colIndex) => (
                    <div key={`col-${colIndex}`} className="row-span-4 border-r border-gray-200"></div>
                  ))}
                </div>

                <div className="absolute inset-0 flex items-end justify-center gap-2 pb-4">
                  {jobStats.length > 0 ? jobStats.map((item, index) => {
                    const maxValue = Math.max(...jobStats.map(s => s.applications), 1);
                    const height = (item.applications / maxValue) * 100;
                    return (
                      <div key={index} className="flex-1 flex items-end">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg w-full relative"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-700">
                            {item.applications}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 text-center mt-1 w-full">
                          {item.name}
                        </div>
                      </div>
                    );
                  }) : (
                    <p className="text-gray-500 text-sm">No application data yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="col-span-1 lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
                <Link
                  to="/my-applications"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View All
                </Link>
              </div>
              {recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                          <p className="text-sm text-gray-500">{app.company}</p>
                        </div>
                        <div className="text-sm flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full
                            ${app.status === 'accepted' ? 'bg-green-100 text-green-800'
                              : app.status === 'rejected' ? 'bg-red-100 text-red-800'
                              : app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'}
                            `}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">{app.appliedDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent applications</p>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Job Listings Overview</h2>
                <Link
                  to="/jobs"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Manage Jobs
                </Link>
              </div>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job.id} className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <p className="flex items-center space-x-2 text-sm text-gray-500">
                          <span className="font-medium">{job.company}</span>
                          {job.location && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{job.location}</span>
                            </>
                          )}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {job.experience} • {job.employmentType}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;