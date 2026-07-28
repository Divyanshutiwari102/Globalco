package com.careerhub.backend.service;

import com.careerhub.backend.dto.application.ApplicationRequestDto;
import com.careerhub.backend.dto.application.ApplicationResponseDto;
import com.careerhub.backend.dto.application.AdminApplicationResponseDto;
import com.careerhub.backend.dto.application.UserApplicationResponseDto;

import java.util.List;

public interface ApplicationService {
    ApplicationResponseDto applyForJob(ApplicationRequestDto applicationRequestDto);
    ApplicationResponseDto getApplicationById(Long id);
    List<ApplicationResponseDto> getApplicationsByUserId(Long userId);
    List<ApplicationResponseDto> getApplicationsByJobId(Long jobId);
    List<UserApplicationResponseDto> getUserApplicationsWithJobDetails(Long userId);
    List<AdminApplicationResponseDto> getApplicationsForAdmin(); // New method for admin view
    void deleteApplication(Long id);
}