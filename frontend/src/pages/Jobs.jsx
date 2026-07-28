import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { useJobContext } from '../context/JobProvider';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const { jobs, loading, error, fetchJobs } = useJobContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, salary-high, salary-low, title-asc, title-desc

  // Filter and sort jobs
  const filteredAndSortedJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesCompany =
        !companyFilter ||
        job.company.toLowerCase().includes(companyFilter.toLowerCase());
      const matchesExperience =
        !experienceFilter ||
        job.experience === experienceFilter;
      const matchesSalary =
        !salaryFilter ||
        // Placeholder for more sophisticated salary filtering
        true;
      const matchesEmploymentType =
        !employmentTypeFilter ||
        job.employmentType === employmentTypeFilter;
      const matchesSkills =
        !skillsFilter ||
        job.skills.toLowerCase().includes(skillsFilter.toLowerCase());

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCompany &&
        matchesExperience &&
        matchesSalary &&
        matchesEmploymentType &&
        matchesSkills
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Find Your Dream Job</h1>
              <p className="mt-1 text-gray-600">
                Browse through thousands of job listings from top companies.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1 text-sm"
              >
                Sort by Date
                {sortBy === 'newest' || sortBy === 'oldest' ? (
                  sortBy === 'newest' ? (
                    <FaSortDown className="text-indigo-500" />
                  ) : (
                    <FaSortUp className="text-indigo-500" />
                  )
                ) : null}
              </button>
              <button
                onClick={() =>
                  setSortBy(
                    sortBy === 'title-asc' ? 'title-desc' : 'title-asc'
                  )
                }
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-1 text-sm"
              >
                Sort by Title
                {sortBy === 'title-asc' || sortBy === 'title-desc' ? (
                  sortBy === 'title-asc' ? (
                    <FaSortDown className="text-indigo-500" />
                  ) : (
                    <FaSortUp className="text-indigo-500" />
                  )
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 py-6">
        <SearchBar
          onSearchChange={setSearchTerm}
          onLocationChange={setLocationFilter}
          onCompanyChange={setCompanyFilter}
          onExperienceChange={setExperienceFilter}
          onSalaryChange={setSalaryFilter}
          onEmploymentTypeChange={setEmploymentTypeFilter}
          onSkillsChange={setSkillsFilter}
          searchTerm={searchTerm}
          locationFilter={locationFilter}
          companyFilter={companyFilter}
          experienceFilter={experienceFilter}
          salaryFilter={salaryFilter}
          employmentTypeFilter={employmentTypeFilter}
          skillsFilter={skillsFilter}
        />
      </div>

      {/* Results */}
      <div className="px-4 pb-12">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-red-500 text-xl mb-4">Error loading jobs</h2>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setLocationFilter('');
                setCompanyFilter('');
                setExperienceFilter('');
                setSalaryFilter('');
                setEmploymentTypeFilter('');
                setSkillsFilter('');
                fetchJobs();
              }}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        ) : filteredAndSortedJobs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-gray-500 text-xl mb-4">No jobs found</h2>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new listings.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {filteredAndSortedJobs.length} {filteredAndSortedJobs.length === 1 ? 'job' : 'jobs'}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;