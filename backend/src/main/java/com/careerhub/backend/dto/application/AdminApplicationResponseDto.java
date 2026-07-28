package com.careerhub.backend.dto.application;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Data Transfer Object for application details with user and job information (for admin views)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminApplicationResponseDto {

    private Long id;
    private Long userId;
    private Long jobId;
    private String resumeUrl;
    private Date appliedAt;

    // User details
    private String applicantName;
    private String applicantEmail;

    // Job details
    private String jobTitle;
    private String company;
    private String jobLocation;
}