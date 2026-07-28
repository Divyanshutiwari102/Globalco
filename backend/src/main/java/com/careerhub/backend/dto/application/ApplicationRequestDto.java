package com.careerhub.backend.dto.application;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ApplicationRequestDto {

    @NotNull
    private Long userId;

    @NotNull
    private Long jobId;

    @NotBlank
    private String resumeUrl;

    // Getters and Setters
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
}