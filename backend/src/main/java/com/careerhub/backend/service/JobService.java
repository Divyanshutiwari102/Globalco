package com.careerhub.backend.service;

import com.careerhub.backend.dto.job.JobRequestDto;
import com.careerhub.backend.dto.job.JobResponseDto;

import java.util.List;

public interface JobService {
    JobResponseDto createJob(JobRequestDto jobRequestDto);
    JobResponseDto getJobById(Long id);
    List<JobResponseDto> getAllJobs();
    JobResponseDto updateJob(Long id, JobRequestDto jobRequestDto);
    void deleteJob(Long id);
}