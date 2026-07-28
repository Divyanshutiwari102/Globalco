package com.careerhub.backend.dto.job;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponseDto {

    private Long id;
    private String title;
    private String company;
    private String location;
    private String salary;
    private String description;
    private String experience;
    private String employmentType;
    private String skills;
    private Date createdAt;
}