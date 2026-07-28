package com.careerhub.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "job_id", nullable = false)
    private Long jobId;

    private String resumeUrl;

    @Column(name = "applied_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date appliedAt;

    @Column(name = "application_status")
    private String applicationStatus;

    @Column(name = "applicant_name")
    private String applicantName;

    @PrePersist
    protected void onCreate() {
        appliedAt = new Date();
        applicationStatus = "pending"; // Default status
    }
}