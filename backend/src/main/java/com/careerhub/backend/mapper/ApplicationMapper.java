package com.careerhub.backend.mapper;

import com.careerhub.backend.dto.application.ApplicationRequestDto;
import com.careerhub.backend.dto.application.ApplicationResponseDto;
import com.careerhub.backend.dto.application.AdminApplicationResponseDto;
import com.careerhub.backend.dto.application.UserApplicationResponseDto;
import com.careerhub.backend.entity.Application;
import com.careerhub.backend.entity.Job;
import com.careerhub.backend.entity.User;

public class ApplicationMapper {

    public static Application toEntity(ApplicationRequestDto dto) {
        if (dto == null) {
            return null;
        }
        Application application = new Application();
        application.setUserId(dto.getUserId());
        application.setJobId(dto.getJobId());
        application.setResumeUrl(dto.getResumeUrl());
        return application;
    }

    public static ApplicationResponseDto toDto(Application entity) {
        if (entity == null) {
            return null;
        }
        ApplicationResponseDto dto = new ApplicationResponseDto();
        dto.setId(entity.getId());
        dto.setUserId(entity.getUserId());
        dto.setJobId(entity.getJobId());
        dto.setResumeUrl(entity.getResumeUrl());
        dto.setAppliedAt(entity.getAppliedAt());
        return dto;
    }

    public static UserApplicationResponseDto toUserApplicationDto(Application application, Job job) {
        if (application == null || job == null) {
            return null;
        }
        UserApplicationResponseDto dto = new UserApplicationResponseDto();
        dto.setId(application.getId());
        dto.setUserId(application.getUserId());
        dto.setJobId(application.getJobId());
        dto.setResumeUrl(application.getResumeUrl());
        dto.setAppliedAt(application.getAppliedAt());
        dto.setJobTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setLocation(job.getLocation());
        dto.setSalary(job.getSalary());
        dto.setExperience(job.getExperience());
        dto.setEmploymentType(job.getEmploymentType());
        dto.setSkills(job.getSkills());
        return dto;
    }

    public static AdminApplicationResponseDto toAdminApplicationDto(Application application, User user, Job job) {
        if (application == null || user == null || job == null) {
            return null;
        }
        AdminApplicationResponseDto dto = new AdminApplicationResponseDto();
        dto.setId(application.getId());
        dto.setUserId(application.getUserId());
        dto.setJobId(application.getJobId());
        dto.setResumeUrl(application.getResumeUrl());
        dto.setAppliedAt(application.getAppliedAt());

        // User details
        if (application.getApplicantName() != null) {
            dto.setApplicantName(application.getApplicantName());
        } else {
            dto.setApplicantName(user.getName());
        }
        dto.setApplicantEmail(user.getEmail());

        // Job details
        dto.setJobTitle(job.getTitle());
        dto.setCompany(job.getCompany());
        dto.setJobLocation(job.getLocation());

        return dto;
    }
}