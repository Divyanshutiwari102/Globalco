package com.careerhub.backend.service;

import com.careerhub.backend.dto.job.JobRequestDto;
import com.careerhub.backend.dto.job.JobResponseDto;
import com.careerhub.backend.entity.Job;
import com.careerhub.backend.exception.ResourceNotFoundException;
import com.careerhub.backend.mapper.JobMapper;
import com.careerhub.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public JobResponseDto createJob(JobRequestDto jobRequestDto) {
        Job job = Objects.requireNonNull(
            JobMapper.toEntity(jobRequestDto),
            "Job cannot be null from DTO"
        );
        Job savedJob = Objects.requireNonNull(
            jobRepository.save(job),
            "Saved job cannot be null"
        );
        JobResponseDto responseDto = JobMapper.toDto(savedJob);
        return Objects.requireNonNull(
                responseDto,
                "Response DTO cannot be null"
        );
    }

    @Override
    public JobResponseDto getJobById(Long id) {
        if (id == null) {
            throw new ResourceNotFoundException("Job ID cannot be null");
        }
        Job job = Objects.requireNonNull(
            jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id)),
            "Job cannot be null"
        );
        return JobMapper.toDto(job);
    }

    @Override
    public List<JobResponseDto> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(Objects::requireNonNull)
                .map(job -> {
                    JobResponseDto dto = JobMapper.toDto(job);
                    return Objects.requireNonNull(
                            dto,
                            "DTO cannot be null from entity: " + job.getId()
                    );
                })
                .collect(Collectors.toList());
    }

    @Override
    public JobResponseDto updateJob(Long id, JobRequestDto jobRequestDto) {
        if (id == null) {
            throw new ResourceNotFoundException("Job ID cannot be null");
        }
        Job existingJob = Objects.requireNonNull(
            jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id)),
            "Existing job cannot be null"
        );
        JobMapper.updateEntityFromDto(jobRequestDto, existingJob);
        Job updatedJob = Objects.requireNonNull(
            jobRepository.save(existingJob),
            "Updated job cannot be null"
        );
        JobResponseDto responseDto = JobMapper.toDto(updatedJob);
        return Objects.requireNonNull(
                responseDto,
                "Response DTO cannot be null"
        );
    }

    @Override
    public void deleteJob(Long id) {
        if (id == null) {
            throw new ResourceNotFoundException("Job ID cannot be null");
        }
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        jobRepository.delete(job);
    }
}