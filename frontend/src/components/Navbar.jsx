import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  // Get user initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-xl font-medium">
          <Link to="/" className="text-primary-600 hover:text-primary-800">
            CareerHub
          </Link>
        </div>
        <div className="block lg:hidden">
          <button type="button" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:bg-gray-100 hover:text-gray-800">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <div className="flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                Home
              </Link>
              <Link to="/jobs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                Jobs
              </Link>
              <Link to="/bookmarks" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                Bookmarks
              </Link>
              {user && user.role === 'ADMIN' && (
                <Link to="/admin/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center lg:order-first w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0">
            {user ? (
              <>
                <div className="flex items-center ml-3 relative">
                  <div className="flex-1 pt-1 pb-1">
                    <div className="flex items-center">
                      <div className="relative h-8 w-8 flex-shrink-0">
                        {/* Avatar with fallback to initials */}
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={user.profileImage || ''}
                          alt={`${user.name}'s profile`}
                          onError={(e) => {
                            e.target.src = ''; // Remove the broken image
                            if (e.target.parentNode) {
                              e.target.parentNode.className = 'h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold';
                              e.target.parentNode.innerHTML = `<span>${getInitials(user.name)}</span>`;
                            }
                          }}
                        />
                        {/* Fallback avatar */}
                        {!user.profileImage && (
                          <div className="absolute inset-0 h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold pointer-events-none">
                            {getInitials(user.name)}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm font-medium text-gray-500">{user.role}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-3 flex items-center px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 mr-2">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-800">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;