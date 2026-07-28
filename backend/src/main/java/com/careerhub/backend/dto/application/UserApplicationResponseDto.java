package com.careerhub.backend.dto.application;

import java.util.Date;

/**
 * Data Transfer Object for displaying user applications with job details
 */
public class UserApplicationResponseDto {

    private Long id;
    private Long userId;
    private Long jobId;
    private String resumeUrl;
    private Date appliedAt;

    // Job details
    private String jobTitle;
    private String company;
    private String location;
    private String salary;
    private String experience;
    private String employmentType;
    private String skills;

    public UserApplicationResponseDto() {
    }

    public UserApplicationResponseDto(Long id, Long userId, Long jobId, String resumeUrl, Date appliedAt,
                                      String jobTitle, String company, String location, String salary,
                                      String experience, String employmentType, String skills) {
        this.id = id;
        this.userId = userId;
        this.jobId = jobId;
        this.resumeUrl = resumeUrl;
        this.appliedAt = appliedAt;
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.salary = salary;
        this.experience = experience;
        this.employmentType = employmentType;
        this.skills = skills;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public Date getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(Date appliedAt) {
        this.appliedAt = appliedAt;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }
}