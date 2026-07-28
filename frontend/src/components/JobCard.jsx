import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaEllipsisH, FaCheckCircle } from 'react-icons/fa';
import { useAuthContext } from '../context/AuthContext';
import { useJobContext } from '../context/JobProvider';
import { useApplicationContext } from '../context/ApplicationProvider';

const JobCard = ({ job }) => {
  const { user } = useAuthContext();
  const { bookmarkedJobs, toggleBookmark } = useJobContext();
  const { applyForJob, loading: applicationLoading } = useApplicationContext();

  const isBookmarked = bookmarkedJobs.some(jobId => jobId === job.id);

  // Calculate time ago
  const getTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return Math.floor(seconds) + ' seconds ago';
  };

  // Format salary for display
  const formatSalary = (salary) => {
    if (!salary) return 'Not disclosed';
    return salary;
  };

  // Function to handle job application
  const handleApply = async (jobData) => {
    if (!user) {
      // Redirect to login would be handled by the calling component
      return;
    }

    if (user.role === 'ADMIN') {
      return; // Admins cannot apply for jobs
    }

    try {
      await applyForJob({
        userId: user.id,
        jobId: jobData.id,
        resumeUrl: '', // In a real app, this would come from a file upload or user profile
      });
      // Success is handled by the application context state
      // In a real app, we might show a success message or redirect
    } catch (err) {
      // Error is handled by the application context state
      console.error('Error applying for job:', err);
    }
  };

  return (
    <Link to={`/jobs/${job.id}`} className="block bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border">
      <div className="p-6">
        {/* Header with company info and bookmark */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            {/* Company Logo Placeholder */}
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              {job.company.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
              <p className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="font-medium">{job.company}</span>
                {/* Verified badge for certain companies */}
                {['Google', 'Microsoft', 'Amazon', 'Adobe', 'Oracle', 'Atlassian', 'Salesforce', 'Uber', 'Netflix', 'Flipkart', 'Meesho', 'PhonePe', 'Razorpay', 'Swiggy', 'Zomato'].includes(job.company) && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-1">Verified</span>
                )}
              </p>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(job.id);
            }}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${isBookmarked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            aria-label={isBookmarked ? 'Remove from bookmarks' : 'Save job'}
          >
            {isBookmarked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-4">
          {/* Salary, Location, Experience, Employment Type */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Salary</span>
              <span className="font-medium">{formatSalary(job.salary)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Location</span>
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Experience</span>
              <span>{job.experience}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Employment</span>
              <span>{job.employmentType}</span>
            </div>
          </div>

          {/* Description Preview */}
          <p className="line-clamp-3 text-gray-700">{job.description}</p>

          {/* Skills Badges */}
          {job.skills && (
            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.split(',').map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Posted {getTimeAgo(job.createdAt)}
            </span>
            <div className="flex space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply(job);
                }}
                disabled={applicationLoading || !user || user.role === 'ADMIN'}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center space-x-1 text-sm"
              >
                {applicationLoading && user && user.role !== 'ADMIN' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-1 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Applying...
                  </>
                ) : (
                  user.role === 'ADMIN' ? 'Only users can apply for jobs' : 'Apply Now'
                )}
              </button>
              <Link to={`/jobs/${job.id}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View Details
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;