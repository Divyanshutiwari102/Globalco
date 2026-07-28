package com.careerhub.backend.controller;

import com.careerhub.backend.dto.application.ApplicationResponseDto;
import com.careerhub.backend.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ApplicationService applicationService;

    public AdminController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/job/{jobId}/applicants")
    public ResponseEntity<List<ApplicationResponseDto>> getApplicantsForJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJobId(jobId));
    }

    // Additional admin endpoints can be added here
}