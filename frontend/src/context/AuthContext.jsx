import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        // If parsing fails, clear the invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      setUser(data.user);
      return data.user;
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    // Remove user and token from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};