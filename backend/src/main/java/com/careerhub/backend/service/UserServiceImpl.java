package com.careerhub.backend.service;

import com.careerhub.backend.dto.user.UserRequestDto;
import com.careerhub.backend.dto.user.UserResponseDto;
import com.careerhub.backend.entity.User;
import com.careerhub.backend.exception.ResourceNotFoundException;
import com.careerhub.backend.mapper.UserMapper;
import com.careerhub.backend.repository.UserRepository;
import jakarta.annotation.Nonnull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDto registerUser(UserRequestDto userRequestDto) {
        if (userRepository.existsByEmail(userRequestDto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        User user = Objects.requireNonNull(
                UserMapper.toEntity(userRequestDto),
                "User cannot be null from DTO"
        );
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.Role.USER); // corrected
        User savedUser = Objects.requireNonNull(
                userRepository.save(user),
                "Saved user cannot be null"
        );
        UserResponseDto responseDto = UserMapper.toDto(savedUser);
        return Objects.requireNonNull(
                responseDto,
                "Response DTO cannot be null"
        );
    }

    @Override
    public UserResponseDto getUserById(@Nonnull Long id) {
        User user = Objects.requireNonNull(
                userRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id)),
                "User cannot be null"
        );
        UserResponseDto responseDto = UserMapper.toDto(user);
        return Objects.requireNonNull(
                responseDto,
                "Response DTO cannot be null"
        );
    }

    @Override
    public User getUserEntityById(Long id) {
        User user = Objects.requireNonNull(
                userRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id)),
                "User cannot be null"
        );
        return user;
    }

    @Override
    public UserResponseDto getUserByEmail(String email) {
        User user = Objects.requireNonNull(
                userRepository.findByEmail(email)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email)),
                "User cannot be null"
        );
        UserResponseDto responseDto = UserMapper.toDto(user);
        return Objects.requireNonNull(
                responseDto,
                "Response DTO cannot be null"
        );
    }

    @Override
    public UserResponseDto updateUser(User user) {
        User updatedUser = Objects.requireNonNull(
                userRepository.save(user),
                "Updated user cannot be null"
        );
        UserResponseDto responseDto = UserMapper.toDto(updatedUser);
        return Objects.requireNonNull(
                responseDto,
                "Response DTO cannot be null"
        );
    }
}
