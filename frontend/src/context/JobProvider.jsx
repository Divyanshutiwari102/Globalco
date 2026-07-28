import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(() => {
    // Load bookmarks from localStorage on initial render
    const saved = localStorage.getItem('bookmarkedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
  }, [bookmarkedJobs]);

  const clearBookmarks = useCallback(() => {
    setBookmarkedJobs([]);
  }, []);

  // Request deduplication cache for fetchJobs
  const fetchJobsCache = useRef(new Map());
  // Request deduplication cache for fetchJobById
  const fetchJobByIdCache = useRef(new Map());

  const fetchJobs = useCallback(async (filters = {}) => {
    // Create a cache key from the filters object
    const cacheKey = JSON.stringify(filters);

    // Check if we already have a pending request for these filters
    const cachedPromise = fetchJobsCache.current.get(cacheKey);

    if (cachedPromise) {
      // If there's already a pending request, wait for it
      try {
        const data = await cachedPromise;

        // Still need to update state with the data (though it should already be set)
        // But we need to make sure we don't set loading/error state incorrectly
        // Since the original request already handled state setting, we just return the data
        return data;
      } catch (err) {
        // If the cached request failed, remove it from cache so next attempt creates a new one
        fetchJobsCache.current.delete(cacheKey);
        throw err;
      }
    }

    // Create a promise for this request and cache it
    const promise = (async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (filters.searchTerm) queryParams.append('search', filters.searchTerm);
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.company) queryParams.append('company', filters.company);
        if (filters.experience) queryParams.append('experience', filters.experience);
        if (filters.employmentType) queryParams.append('employmentType', filters.employmentType);
        if (filters.skills) queryParams.append('skills', filters.skills);

        const response = await fetch(`/api/jobs?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch jobs');
        }

        setJobs(data);
        setLoading(false);

        return data;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        throw err;
      }
    })();

    // Cache the promise
    fetchJobsCache.current.set(cacheKey, promise);

    // Remove from cache when settled (either fulfilled or rejected)
    promise.finally(() => {
      fetchJobsCache.current.delete(cacheKey);
    });

    return promise;
  }, []);

  const fetchJobById = useCallback(async (id) => {
    // Check if we already have a pending request for this job ID
    const cacheKey = id.toString();
    const cachedPromise = fetchJobByIdCache.current.get(cacheKey);

    if (cachedPromise) {
      // If there's already a pending request, wait for it
      try {
        const data = await cachedPromise;
        return data;
      } catch (err) {
        // If the cached request failed, remove it from cache so next attempt creates a new one
        fetchJobByIdCache.current.delete(cacheKey);
        throw err;
      }
    }

    // Create a promise for this request and cache it
    const promise = (async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch job');
        }
        return data;
      } catch (err) {
        throw err;
      }
    })();

    // Cache the promise
    fetchJobByIdCache.current.set(cacheKey, promise);

    // Remove from cache when settled (either fulfilled or rejected)
    promise.finally(() => {
      fetchJobByIdCache.current.delete(cacheKey);
    });

    return promise;
  }, []);

  const toggleBookmark = useCallback((jobId) => {
    setBookmarkedJobs(prev => {
      const isBookmarked = prev.includes(jobId);
      if (isBookmarked) {
        return prev.filter(id => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  }, []);

  const value = useMemo(() => ({
    jobs,
    loading,
    error,
    fetchJobs,
    fetchJobById,
    bookmarkedJobs,
    toggleBookmark,
    clearBookmarks
  }), [jobs, loading, error, fetchJobs, fetchJobById, bookmarkedJobs, toggleBookmark, clearBookmarks]);

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};