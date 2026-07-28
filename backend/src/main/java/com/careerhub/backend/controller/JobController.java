package com.careerhub.backend.controller;

import com.careerhub.backend.dto.job.JobRequestDto;
import com.careerhub.backend.dto.job.JobResponseDto;
import com.careerhub.backend.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobResponseDto>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDto> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobResponseDto> createJob(@RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.ok(jobService.createJob(jobRequestDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<JobResponseDto> updateJob(@PathVariable Long id, @RequestBody JobRequestDto jobRequestDto) {
        return ResponseEntity.ok(jobService.updateJob(id, jobRequestDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}