package com.soulmate.auth.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soulmate.auth.dto.AuthRequest;
import com.soulmate.auth.dto.AuthResponse;
import com.soulmate.auth.dto.UserDTO;
import com.soulmate.auth.entity.User;
import com.soulmate.auth.repository.UserRepository;
import com.soulmate.auth.util.JwtUtil;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username and password required");
        }
        Optional<User> existing = userRepository.findByUsername(request.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        final String accessToken = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), java.util.Collections.emptyList()));
        final String refreshToken = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), java.util.Collections.emptyList()));
        UserDTO dto = new UserDTO(user.getId(), user.getUsername());
        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, dto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        try {
            org.springframework.security.authentication.Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
            final String accessToken = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), java.util.Collections.emptyList()));
            final String refreshToken = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), java.util.Collections.emptyList()));
            UserDTO dto = new UserDTO(user.getId(), user.getUsername());
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, dto));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody AuthRequest request) {
        if (request.getUsername() == null) {
            return ResponseEntity.badRequest().body("Username required for refresh");
        }
        Optional<User> opt = userRepository.findByUsername(request.getUsername());
        if (!opt.isPresent()) return ResponseEntity.status(401).body("Invalid refresh request");
        User user = opt.get();
        final String accessToken = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), java.util.Collections.emptyList()));
        final String refreshToken = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), java.util.Collections.emptyList()));
        UserDTO dto = new UserDTO(user.getId(), user.getUsername());
        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, dto));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(org.springframework.security.core.Authentication authentication) {
        String username = authentication.getName();
        Optional<User> opt = userRepository.findByUsername(username);
        if (!opt.isPresent()) return ResponseEntity.status(404).body("User not found");
        User user = opt.get();
        UserDTO dto = new UserDTO(user.getId(), user.getUsername());
        return ResponseEntity.ok(dto);
    }
}
