package com.careerhub.backend.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@Nonnull HttpServletRequest request, @Nonnull HttpServletResponse response, @Nonnull FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Skip JWT validation for auth endpoints to prevent interference with login/register
            String path = request.getRequestURI();
            System.out.println("JwtAuthenticationFilter: Request path: " + path);
            if (path.startsWith("/api/auth/")) {
                System.out.println("JwtAuthenticationFilter: Skipping JWT validation for auth endpoint");
                filterChain.doFilter(request, response);
                return;
            }

            final String authHeader = request.getHeader("Authorization");

            String username = null;
            String jwt = null;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                jwt = authHeader.substring(7);
                try {
                    username = jwtUtil.extractUsername(jwt);
                } catch (IllegalArgumentException e) {
                    System.out.println("Unable to get JWT Token");
                } catch (ExpiredJwtException e) {
                    System.out.println("JWT Token has expired");
                } catch (MalformedJwtException e) {
                    System.out.println("Invalid JWT Token");
                } catch (UnsupportedJwtException e) {
                    System.out.println("JWT token is unsupported");
                } catch (SignatureException e) {
                    System.out.println("JWT signature validation failed");
                }
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            System.out.println("Exception in JwtAuthenticationFilter:");
            e.printStackTrace();
            throw e; // rethrow to let the container handle it
        }
    }
}