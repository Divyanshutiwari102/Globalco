package com.careerhub.backend.controller;

import com.careerhub.backend.dto.application.ApplicationRequestDto;
import com.careerhub.backend.dto.application.ApplicationResponseDto;
import com.careerhub.backend.dto.application.AdminApplicationResponseDto;
import com.careerhub.backend.dto.application.UserApplicationResponseDto;
import com.careerhub.backend.service.ApplicationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponseDto> applyForJob(@RequestBody ApplicationRequestDto applicationRequestDto) {
        return ResponseEntity.ok(applicationService.applyForJob(applicationRequestDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponseDto> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplicationResponseDto>> getApplicationsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getApplicationsByUserId(userId));
    }

    @GetMapping("/user/{userId}/with-job-details")
    public ResponseEntity<List<UserApplicationResponseDto>> getUserApplicationsWithJobDetails(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getUserApplicationsWithJobDetails(userId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponseDto>> getApplicationsByJobId(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJobId(jobId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AdminApplicationResponseDto>> getAllApplicationsForAdmin() {
        return ResponseEntity.ok(applicationService.getApplicationsForAdmin());
    }
}