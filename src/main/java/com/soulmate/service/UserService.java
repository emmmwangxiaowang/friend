package com.soulmate.service;

import com.soulmate.dto.UserDTO;
import com.soulmate.entity.User;
import com.soulmate.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public UserDTO getUserDto(Long id) {
    User user = userRepository.findById(id).orElse(null);
    if (user == null) {
      return null;
    }
    return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
  }
}
