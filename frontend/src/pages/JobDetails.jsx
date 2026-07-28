import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobContext } from '../context/JobProvider';
import { useAuthContext } from '../context/AuthContext';
import { useApplicationContext } from '../context/ApplicationProvider';
import { Link } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const { job, loading, error, fetchJobById } = useJobContext();
  const { user } = useAuthContext();
  const { applyForJob, loading: applicationLoading } = useApplicationContext();
  const [applicationError, setApplicationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobById(id);
  }, [fetchJobById, id]);

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
        <h2 className="text-red-500 text-xl mb-4">Error loading job</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-red-500 text-xl mb-4">Job not found</h2>
        <p className="text-gray-600">The job you are looking for does not exist.</p>
        <Link to="/jobs" className="text-indigo-600 hover:underline">
          Go back to jobs
        </Link>
      </div>
    );
  }

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      setApplicationError(null);
      await applyForJob({
        userId: user.id,
        jobId: job.id,
        resumeUrl: '', // In a real app, this would come from a file upload or user profile
      });
      // Navigate to applications page which will show the new application
      navigate('/my-applications');
    } catch (err) {
      setApplicationError('Failed to submit application: ' + (err.message || 'Unknown error'));
      console.error('Error applying for job:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-lg text-gray-600 mt-1">{job.company}</p>
            </div>
            <div className="text-right">
              {job.salary && (
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {job.salary}
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-500 mb-4">{job.location}</p>
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
        </div>
        <div className="px-6 pb-4">
          {!user ? (
            <p className="text-center text-gray-500 mb-4">
              Please <a href="/login" className="text-indigo-600 hover:underline">log in</a> to apply for this job.
            </p>
          ) : (
            <>
              <button
                onClick={handleApply}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                disabled={applicationLoading || user.role === 'ADMIN'}
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
                  user.role === 'ADMIN' ? 'Only users can apply for jobs' : 'Apply for this Job'
                )}
              </button>
              {applicationError && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p>{applicationError}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;