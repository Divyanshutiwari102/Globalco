package com.careerhub.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtil {

    @Value("${app.jwt-secret}")
    private String secretKey;

    @Value("${app.jwt-expiration-ms}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        try {
            Map<String, Object> claims = new HashMap<>();
            String token = createToken(claims, userDetails.getUsername());
            System.out.println("Generated JWT token: " + token);
            return token;
        } catch (Exception e) {
            System.out.println("Exception in JwtUtil.generateToken:");
            e.printStackTrace();
            throw e;
        }
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            return extractClaim(token, claims -> claims.getSubject());
        } catch (Exception e) {
            System.out.println("Exception in JwtUtil.extractUsername for token: " + token);
            e.printStackTrace();
            throw e;
        }
    }

    public Date extractExpiration(String token) {
        try {
            return extractClaim(token, claims -> claims.getExpiration());
        } catch (Exception e) {
            System.out.println("Exception in JwtUtil.extractExpiration for token: " + token);
            e.printStackTrace();
            throw e;
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            final Claims claims = extractAllClaims(token);
            return claimsResolver.apply(claims);
        } catch (Exception e) {
            System.out.println("Exception in JwtUtil.extractClaim for token: " + token);
            e.printStackTrace();
            throw e;
        }
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            System.out.println("Exception in JwtUtil.extractAllClaims for token: " + token);
            e.printStackTrace();
            throw e;
        }
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            return username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (Exception e) {
            System.out.println("Exception in JwtUtil.validateToken for token: " + token);
            e.printStackTrace();
            throw e;
        }
    }

    private Boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }

    private Boolean isTokenExpired(String token) {
        try {
            Date expiration = extractExpiration(token);
            return expiration != null && isTokenExpired(expiration);
        } catch (Exception e) {
            System.out.println("Exception in JwtUtil.isTokenExpired for token: " + token);
            e.printStackTrace();
            throw e;
        }
    }
}