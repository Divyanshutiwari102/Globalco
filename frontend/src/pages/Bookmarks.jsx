import React from 'react';
import { Link } from 'react-router-dom';
import { useJobContext } from '../context/JobProvider';
import JobCard from '../components/JobCard';

// Inline SVG icons (avoids adding react-icons as a dependency)
const BookmarkIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3a2 2 0 00-2 2v12l7-4 7 4V5a2 2 0 00-2-2H5z" />
  </svg>
);

const TimesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const Bookmarks = () => {
  const { bookmarkedJobs, jobs, clearBookmarks } = useJobContext();

  // Filter jobs to only show bookmarked ones
  const bookmarkedJobList = jobs.filter(job => bookmarkedJobs.includes(job.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookmarkIcon className="mr-2 text-indigo-600 h-6 w-6" />
                Saved Jobs
              </h1>
              <p className="mt-1 text-gray-600">
                {bookmarkedJobList.length} saved job{bookmarkedJobList.length === 1 ? '' : 's'}
              </p>
            </div>
            <div className="flex space-x-3">
              {bookmarkedJobList.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to remove all bookmarked jobs?')) {
                      clearBookmarks();
                    }
                  }}
                  className="bg-red-50 hover:bg-red-100 text-red-800 font-medium py-2 px-4 rounded border border-red-200 hover:border-red-300 transition-colors flex items-center space-x-2"
                >
                  <TimesIcon className="mr-2 h-4 w-4" />
                  Clear All
                </button>
              )}
              <button
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center space-x-1"
              >
                Sort by: Newest
                <span className="ml-1 text-xs">▼</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {bookmarkedJobList.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center items-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                  <BookmarkIcon className="text-indigo-500 h-10 w-10" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">No saved jobs</h2>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                You haven't saved any jobs yet. When you find a job you like, click the bookmark icon to save it here.
              </p>
              <div className="mt-8 space-x-3">
                <Link
                  to="/jobs"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/jobs"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg flex items-center justify-center"
                >
                  Explore Jobs
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkedJobList.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;