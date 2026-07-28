package com.careerhub.backend.mapper;

import com.careerhub.backend.dto.job.JobRequestDto;
import com.careerhub.backend.dto.job.JobResponseDto;
import com.careerhub.backend.entity.Job;

public class JobMapper {

    public static Job toEntity(JobRequestDto dto) {
        if (dto == null) {
            return null;
        }
        Job job = new Job();
        job.setTitle(dto.getTitle());
        job.setCompany(dto.getCompany());
        job.setLocation(dto.getLocation());
        job.setSalary(dto.getSalary());
        job.setDescription(dto.getDescription());
        job.setExperience(dto.getExperience());
        job.setEmploymentType(dto.getEmploymentType());
        job.setSkills(dto.getSkills());
        return job;
    }

    public static JobResponseDto toDto(Job entity) {
        if (entity == null) {
            return null;
        }
        JobResponseDto dto = new JobResponseDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setCompany(entity.getCompany());
        dto.setLocation(entity.getLocation());
        dto.setSalary(entity.getSalary());
        dto.setDescription(entity.getDescription());
        dto.setExperience(entity.getExperience());
        dto.setEmploymentType(entity.getEmploymentType());
        dto.setSkills(entity.getSkills());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    public static void updateEntityFromDto(JobRequestDto dto, Job entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setTitle(dto.getTitle());
        entity.setCompany(dto.getCompany());
        entity.setLocation(dto.getLocation());
        entity.setSalary(dto.getSalary());
        entity.setDescription(dto.getDescription());
        entity.setExperience(dto.getExperience());
        entity.setEmploymentType(dto.getEmploymentType());
        entity.setSkills(dto.getSkills());
        // createdAt should not be updated
    }
}
