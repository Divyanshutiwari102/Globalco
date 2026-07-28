package com.careerhub.backend.service;

import com.careerhub.backend.dto.application.ApplicationRequestDto;
import com.careerhub.backend.dto.application.ApplicationResponseDto;
import com.careerhub.backend.dto.application.AdminApplicationResponseDto;
import com.careerhub.backend.dto.application.UserApplicationResponseDto;
import com.careerhub.backend.entity.Application;
import com.careerhub.backend.entity.Job;
import com.careerhub.backend.entity.User;
import com.careerhub.backend.exception.BadRequestException;
import com.careerhub.backend.exception.ResourceNotFoundException;
import com.careerhub.backend.mapper.ApplicationMapper;
import com.careerhub.backend.repository.ApplicationRepository;
import com.careerhub.backend.repository.JobRepository;
import com.careerhub.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  UserRepository userRepository,
                                  JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    @Override
    public ApplicationResponseDto applyForJob(ApplicationRequestDto applicationRequestDto) {
        // Validate user and job exist
        Long userId = applicationRequestDto.getUserId();
        if (userId == null) {
            throw new ResourceNotFoundException("User ID cannot be null");
        }
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        Long jobId = applicationRequestDto.getJobId();
        if (jobId == null) {
            throw new ResourceNotFoundException("Job ID cannot be null");
        }
        if (!jobRepository.existsById(jobId)) {
            throw new ResourceNotFoundException("Job not found with id: " + jobId);
        }

        // Check if already applied
        if (applicationRepository.existsByUserIdAndJobId(userId, jobId)) {
            throw new BadRequestException("Already applied for this job");
        }
        Application application = Objects.requireNonNull(
                ApplicationMapper.toEntity(applicationRequestDto),
                "Application cannot be null from DTO"
        );
        Application savedApplication = Objects.requireNonNull(
                applicationRepository.save(application),
                "Saved application cannot be null"
        );
        ApplicationResponseDto responseDto = ApplicationMapper.toDto(savedApplication);
        return Objects.requireNonNull(
                responseDto,
                "Response DTO cannot be null"
        );
    }

    @Override
    public ApplicationResponseDto getApplicationById(Long id) {
        if (id == null) {
            throw new ResourceNotFoundException("Application ID cannot be null");
        }
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        return ApplicationMapper.toDto(application);
    }

    @Override
    public List<ApplicationResponseDto> getApplicationsByUserId(Long userId) {
        if (userId == null) {
            return List.of();
        }
        return applicationRepository.findByUserId(userId)
                .stream()
                .map(ApplicationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationResponseDto> getApplicationsByJobId(Long jobId) {
        if (jobId == null) {
            return List.of();
        }
        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(ApplicationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserApplicationResponseDto> getUserApplicationsWithJobDetails(Long userId) {
        if (userId == null) {
            return List.of();
        }
        return applicationRepository.findByUserId(userId)
                .stream()
                .map(application -> {
                    Job job = jobRepository.findById(application.getJobId())
                            .orElseThrow(() -> new RuntimeException("Job not found for application: " + application.getId()));
                    return ApplicationMapper.toUserApplicationDto(application, job);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<AdminApplicationResponseDto> getApplicationsForAdmin() {
        return applicationRepository.findAll()
                .stream()
                .map(application -> {
                    User user = userRepository.findById(application.getUserId())
                            .orElseThrow(() -> new RuntimeException("User not found for application: " + application.getId()));
                    Job job = jobRepository.findById(application.getJobId())
                            .orElseThrow(() -> new RuntimeException("Job not found for application: " + application.getId()));
                    return ApplicationMapper.toAdminApplicationDto(application, user, job);
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteApplication(Long id) {
        if (id == null) {
            throw new ResourceNotFoundException("Application ID cannot be null");
        }
        if (!applicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Application not found with id: " + id);
        }
        applicationRepository.deleteById(id);
    }
}