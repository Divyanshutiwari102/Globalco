import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refs to track the latest request ID for each method to prevent stale updates
  const getApplicationsByUserIdRequestId = useRef(0);
  const getApplicationsByJobIdRequestId = useRef(0);
  const getApplicationsForAdminRequestId = useRef(0);

  // Request deduplication caches
  const getApplicationsByUserIdCache = useRef(new Map());
  const getApplicationsByJobIdCache = useRef(new Map());
  const getApplicationsForAdminCache = useRef(null);

  const applyForJob = async (applicationData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to apply for job');
      }
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getApplicationById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch application');
      }
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getApplicationsByUserId = useCallback(async (userId) => {
    // Check if we already have a pending request for this userId
    const cacheKey = userId.toString();
    const cachedPromise = getApplicationsByUserIdCache.current.get(cacheKey);

    if (cachedPromise) {
      // If there's already a pending request, wait for it
      try {
        const data = await cachedPromise;

        // Still need to update state with the latest request ID mechanism
        // Create a new request ID for this call to maintain ordering
        const requestId = ++getApplicationsByUserIdRequestId.current;

        setLoading(true);
        setError(null);
        try {
          // Only update state if this is the latest request
          if (requestId === getApplicationsByUserIdRequestId.current) {
            setApplications(data);
            setLoading(false);
          }
        } catch (err) {
          // Only update error state if this is the latest request
          if (requestId === getApplicationsByUserIdRequestId.current) {
            setError(err.message);
            setLoading(false);
          }
        }

        return data;
      } catch (err) {
        // If the cached request failed, remove it from cache so next attempt creates a new one
        getApplicationsByUserIdCache.current.delete(cacheKey);
        throw err;
      }
    }

    // Create a new request ID for this call
    const requestId = ++getApplicationsByUserIdRequestId.current;

    // Create a promise for this request and cache it
    const promise = (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/applications/user/${userId}/with-job-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch applications');
        }

        // Only update state if this is the latest request
        if (requestId === getApplicationsByUserIdRequestId.current) {
          setApplications(data);
          setLoading(false);
        }

        return data;
      } catch (err) {
        // Only update error state if this is the latest request
        if (requestId === getApplicationsByUserIdRequestId.current) {
          setError(err.message);
          setLoading(false);
        }
        throw err;
      }
    })();

    // Cache the promise
    getApplicationsByUserIdCache.current.set(cacheKey, promise);

    // Remove from cache when settled (either fulfilled or rejected)
    promise.finally(() => {
      getApplicationsByUserIdCache.current.delete(cacheKey);
    });

    return promise;
  }, []);

  const getApplicationsByJobId = useCallback(async (jobId) => {
    // Check if we already have a pending request for this jobId
    const cacheKey = jobId.toString();
    const cachedPromise = getApplicationsByJobIdCache.current.get(cacheKey);

    if (cachedPromise) {
      // If there's already a pending request, wait for it
      try {
        const data = await cachedPromise;

        // Still need to update state with the latest request ID mechanism
        // Create a new request ID for this call to maintain ordering
        const requestId = ++getApplicationsByJobIdRequestId.current;

        setLoading(true);
        setError(null);
        try {
          // Only update state if this is the latest request
          if (requestId === getApplicationsByJobIdRequestId.current) {
            setApplications(data);
            setLoading(false);
          }
        } catch (err) {
          // Only update error state if this is the latest request
          if (requestId === getApplicationsByJobIdRequestId.current) {
            setError(err.message);
            setLoading(false);
          }
        }

        return data;
      } catch (err) {
        // If the cached request failed, remove it from cache so next attempt creates a new one
        getApplicationsByJobIdCache.current.delete(cacheKey);
        throw err;
      }
    }

    // Create a new request ID for this call
    const requestId = ++getApplicationsByJobIdRequestId.current;

    // Create a promise for this request and cache it
    const promise = (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/applications/job/${jobId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch applications for job');
        }

        // Only update state if this is the latest request
        if (requestId === getApplicationsByJobIdRequestId.current) {
          setApplications(data);
          setLoading(false);
        }

        return data;
      } catch (err) {
        // Only update error state if this is the latest request
        if (requestId === getApplicationsByJobIdRequestId.current) {
          setError(err.message);
          setLoading(false);
        }
        throw err;
      }
    })();

    // Cache the promise
    getApplicationsByJobIdCache.current.set(cacheKey, promise);

    // Remove from cache when settled (either fulfilled or rejected)
    promise.finally(() => {
      getApplicationsByJobIdCache.current.delete(cacheKey);
    });

    return promise;
  }, []);

  // New method for admin to get all applications
  const getApplicationsForAdmin = useCallback(async () => {
    // Return cached promise if available
    if (getApplicationsForAdminCache.current) {
      try {
        const data = await getApplicationsForAdminCache.current;

        // Still need to update state with the latest request ID mechanism
        // Create a new request ID for this call to maintain ordering
        const requestId = ++getApplicationsForAdminRequestId.current;

        setLoading(true);
        setError(null);
        try {
          // Only update state if this is the latest request
          if (requestId === getApplicationsForAdminRequestId.current) {
            setApplications(data);
            setLoading(false);
          }
        } catch (err) {
          // Only update error state if this is the latest request
          if (requestId === getApplicationsForAdminRequestId.current) {
            setError(err.message);
            setLoading(false);
          }
        }

        return data;
      } catch (err) {
        // If the cached request failed, clear cache so next attempt creates a new one
        getApplicationsForAdminCache.current = null;
        throw err;
      }
    }

    // Create a new request ID for this call
    const requestId = ++getApplicationsForAdminRequestId.current;

    // Create a promise for this request and cache it
    const promise = (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/applications/admin/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch applications for admin');
        }

        // Only update state if this is the latest request
        if (requestId === getApplicationsForAdminRequestId.current) {
          setApplications(data);
          setLoading(false);
        }

        return data;
      } catch (err) {
        // Only update error state if this is the latest request
        if (requestId === getApplicationsForAdminRequestId.current) {
          setError(err.message);
          setLoading(false);
        }
        throw err;
      }
    })();

    // Cache the promise
    getApplicationsForAdminCache.current = promise;

    // Remove from cache when settled (either fulfilled or rejected)
    promise.finally(() => {
      getApplicationsForAdminCache.current = null;
    });

    return promise;
  }, []);

  return (
    <ApplicationContext.Provider value={{
      applications,
      loading,
      error,
      applyForJob,
      getApplicationById,
      getApplicationsByUserId,
      getApplicationsByJobId,
      getApplicationsForAdmin
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplicationContext must be used within an ApplicationProvider');
  }
  return context;
};