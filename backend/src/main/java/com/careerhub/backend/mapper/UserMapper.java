package com.careerhub.backend.mapper;

import com.careerhub.backend.dto.user.UserRequestDto;
import com.careerhub.backend.dto.user.UserResponseDto;
import com.careerhub.backend.entity.User;

public class UserMapper {

    public static User toEntity(UserRequestDto dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        // Role will be set in service
        return user;
    }

    public static UserResponseDto toDto(User entity) {
        if (entity == null) {
            return null;
        }
        UserResponseDto dto = new UserResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setRole(entity.getRole().toString());
        // Note: password is not included in response for security
        return dto;
    }

    public static void updateEntityFromDto(UserRequestDto dto, User entity) {
        if (dto == null || entity == null) {
            return;
        }
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        // Note: password should be updated via encoded password in service
    }
}