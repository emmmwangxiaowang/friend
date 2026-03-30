package com.soulmate.controller;

import com.soulmate.dto.UserDTO;
import com.soulmate.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {
  private final UserService userService;

  public ApiController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/health")
  public ResponseEntity<String> health() {
    return ResponseEntity.ok("OK");
  }

  @GetMapping("/users/{id}")
  public UserDTO getUser(@PathVariable Long id) {
    return userService.getUserDto(id);
  }
}
