import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaBuilding, FaHeart } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              Find Your Dream Job Faster
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match your skills and aspirations
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-4">
              <Link
                to="/jobs"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
              >
                Browse Jobs
              </Link>
              <Link
                to="/login"
                className="border border-white bg-white/20 hover:bg-white/30 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Join Our Growing Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-indigo-600">1000+</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Active Jobs</h3>
              <p className="text-gray-600">
                New opportunities added daily from leading companies
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-indigo-600">250+</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Top Companies</h3>
              <p className="text-gray-600">
                From Fortune 500 leaders to innovative startups
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-indigo-600">5000+</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Successful Matches</h3>
              <p className="text-gray-600">
                Professionals who found their ideal careers through us
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-indigo-600">95%</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Satisfaction Rate</h3>
              <p className="text-gray-600">
                Users who reported positive experience with our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CareerHub?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to make your job search efficient, effective, and enjoyable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaChartLine className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">Smart Job Matching</h3>
              </div>
              <p className="text-gray-600">
                Our advanced algorithm matches you with positions that align with your skills, experience, and career goals
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaBuilding className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">Verified Company Profiles</h3>
              </div>
              <p className="text-gray-600">
                All companies on our platform undergo verification to ensure legitimacy and quality
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaHeart className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">Privacy & Security Focused</h3>
              </div>
              <p className="text-gray-600">
                Your personal information is protected with industry-standard encryption and security measures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to find your next career opportunity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Build your professional profile highlighting your skills, experience, and career aspirations
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Search & Filter</h3>
              <p className="text-gray-600">
                Use our advanced search tools to find jobs that match your criteria
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Apply & Track</h3>
              <p className="text-gray-600">
                Apply directly through our platform and monitor your application status
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Companies of all sizes trust CareerHub to find their ideal candidates
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">G</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">M</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">A</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">A</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">O</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">A</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">S</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">U</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">N</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">Z</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">P</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">R</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">F</span>
            </div>
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 rounded-xl p-4">
              <span className="text-xl font-bold text-gray-600">M</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;