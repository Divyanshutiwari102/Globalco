package com.careerhub.backend.controller;

import com.careerhub.backend.dto.user.UserRequestDto;
import com.careerhub.backend.dto.user.UserResponseDto;
import com.careerhub.backend.entity.User;
import com.careerhub.backend.mapper.UserMapper;
import com.careerhub.backend.security.UserDetailsImpl;
import com.careerhub.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "User management APIs")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "Get current user profile",
            description = "Retrieve the profile information of the currently authenticated user",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @ApiResponse(responseCode = "200", description = "User profile retrieved successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponseDto.class)))
    @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token")
    @ApiResponse(responseCode = "404", description = "User not found")
    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponseDto> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Long userId = userDetails.getId();
        UserResponseDto user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @Operation(
            summary = "Update user profile",
            description = "Update the profile information of the currently authenticated user",
            security = @SecurityRequirement(name = "Bearer Authentication")
    )
    @ApiResponse(responseCode = "200", description = "User profile updated successfully",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserResponseDto.class)))
    @ApiResponse(responseCode = "400", description = "Bad request - Invalid input data")
    @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token")
    @ApiResponse(responseCode = "409", description = "Conflict - Email already in use")
    @PutMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponseDto> updateProfile(@Valid @RequestBody UserRequestDto userRequestDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Long userId = userDetails.getId();

        // Get current user data
        User currentUser = userService.getUserEntityById(userId);

        // Update fields if provided
        if (userRequestDto.getName() != null) {
            currentUser.setName(userRequestDto.getName());
        }
        if (userRequestDto.getEmail() != null && !userRequestDto.getEmail().equals(currentUser.getEmail())) {
            // Check if email is already taken by another user
            UserResponseDto existingUser = userService.getUserByEmail(userRequestDto.getEmail());
            if (existingUser != null && !existingUser.getId().equals(userId)) {
                return ResponseEntity.badRequest().body(null); // Email already in use by another user
            }
            currentUser.setEmail(userRequestDto.getEmail());
        }
        // Note: password updates should go through a separate endpoint for security

        UserResponseDto updatedUserDto = userService.updateUser(currentUser);
        return ResponseEntity.ok(updatedUserDto);
    }
}