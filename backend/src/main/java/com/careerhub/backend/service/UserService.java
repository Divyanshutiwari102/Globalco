package com.careerhub.backend.service;

import com.careerhub.backend.dto.user.UserRequestDto;
import com.careerhub.backend.dto.user.UserResponseDto;
import com.careerhub.backend.entity.User;

public interface UserService {
    UserResponseDto registerUser(UserRequestDto userRequestDto);
    UserResponseDto getUserById(Long id);
    UserResponseDto getUserByEmail(String email);
    UserResponseDto updateUser(User user);
    User getUserEntityById(Long id);
}