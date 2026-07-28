package com.careerhub.backend.dto.application;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponseDto {

    private Long id;
    private Long userId;
    private Long jobId;
    private String resumeUrl;
    private Date appliedAt;
}