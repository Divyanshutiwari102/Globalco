import React, { useState } from 'react';

const commonExperiences = [
  '0-1 years',
  '1-2 years',
  '2-3 years',
  '3-5 years',
  '5+ years',
  'Entry level',
  'Senior level',
  'Executive'
];

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
  'Freelance'
];

const commonSkills = [
  'JavaScript',
  'Python',
  'Java',
  'C#',
  'React',
  'Node.js',
  'AWS',
  'Docker',
  'Kubernetes',
  'SQL',
  'MongoDB',
  'GraphQL',
  'TypeScript',
  'Vue.js',
  'Angular',
  'Spring Boot',
  '.NET',
  'Flutter',
  'Swift',
  'Kotlin',
  'Machine Learning',
  'Data Science',
  'UI/UX',
  'Product Management',
  'Project Management',
  'Sales',
  'Marketing',
  'HR',
  'Finance'
];

const SearchBar = ({
  onSearchChange,
  onLocationChange,
  onCompanyChange,
  onExperienceChange,
  onSalaryChange,
  onEmploymentTypeChange,
  onSkillsChange,
  searchTerm,
  locationFilter,
  companyFilter,
  experienceFilter,
  salaryFilter,
  employmentTypeFilter,
  skillsFilter
}) => {
  const [selectedExperience, setSelectedExperience] = useState(experienceFilter || '');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState(employmentTypeFilter || '');
  const [selectedSkills, setSelectedSkills] = useState(skillsFilter || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(searchTerm);
    onLocationChange(locationFilter);
    onCompanyChange(companyFilter);
    onExperienceChange(selectedExperience);
    onSalaryChange(salaryFilter);
    onEmploymentTypeChange(selectedEmploymentType);
    onSkillsChange(selectedSkills);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title or Keywords</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Software Engineer, Product Manager"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Google, Microsoft"
            value={companyFilter}
            onChange={(e) => onCompanyChange(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., New York, Remote, San Francisco"
            value={locationFilter}
            onChange={(e) => onLocationChange(e.target.value)}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="">Any Experience</option>
            {commonExperiences.map(exp => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., $80,000 - $120,000"
            value={salaryFilter}
            onChange={(e) => onSalaryChange(e.target.value)}
          />
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={selectedEmploymentType}
            onChange={(e) => setSelectedEmploymentType(e.target.value)}
          >
            <option value="">Any Type</option>
            {employmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={selectedSkills}
            onChange={(e) => setSelectedSkills(e.target.value)}
          >
            <option value="">Any Skills</option>
            {commonSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          Search Jobs
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 10.5a6 6 0 118.49-5.86M18 12a6 6 0 00-6 6 6 6 0 100-12z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => {
            onSearchChange('');
            onLocationChange('');
            onCompanyChange('');
            onExperienceChange('');
            onSalaryChange('');
            onEmploymentTypeChange('');
            onSkillsChange('');
          }}
          className="ml-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;