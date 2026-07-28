package com.careerhub.backend.controller;
// Test comment
import com.careerhub.backend.dto.user.AuthResponseDto;
import com.careerhub.backend.dto.user.LoginRequestDto;
import com.careerhub.backend.dto.user.UserRequestDto;
import com.careerhub.backend.dto.user.UserResponseDto;
import com.careerhub.backend.security.JwtUtil;
import com.careerhub.backend.security.UserDetailsImpl;
import com.careerhub.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication APIs")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Operation(summary = "Register a new user")
    @ApiResponse(responseCode = "200", description = "User registered successfully")
    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserRequestDto userRequestDto) {
        UserResponseDto userResponseDto = userService.registerUser(userRequestDto);
        return ResponseEntity.ok(userResponseDto);
    }

    @Operation(summary = "Authenticate user and get token")
    @ApiResponse(responseCode = "200", description = "User authenticated successfully")
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDto.getEmail(),
                            loginRequestDto.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Ensure we have the correct user details implementation
            if (!(userDetails instanceof UserDetailsImpl)) {
                throw new BadCredentialsException("Invalid user details");
            }

            UserDetailsImpl userDetailsImpl = (UserDetailsImpl) userDetails;
            String token = jwtUtil.generateToken(userDetails);

            // Extract user info with null checks
            Long userId = userDetailsImpl.getId();
            String username = userDetails.getUsername(); // From UserDetails interface
            String email = userDetailsImpl.getEmail();
            String role = userDetailsImpl.getRole();

            // Validate required fields
            if (userId == null || username == null || email == null || role == null) {
                throw new IllegalStateException("User data is incomplete");
            }

            UserResponseDto userDto = new UserResponseDto(
                    userId,
                    username,
                    email,
                    role
            );

            AuthResponseDto response = new AuthResponseDto(token, userDto);
            System.out.println("Login successful. Returning token: " + token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Exception in AuthController.login:");
            e.printStackTrace();
            throw e; // rethrow to let Spring handle it (which will result in 500 and hopefully log the stack trace)
        }
    }
}