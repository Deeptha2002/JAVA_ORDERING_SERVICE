package com.grocerystore.service;

import com.grocerystore.dto.UserRequestDTO;
import com.grocerystore.dto.UserResponseDTO;
import java.util.List;

public interface UserService {
    UserResponseDTO getUserByEmail(String email);
    UserResponseDTO createUser(UserRequestDTO userRequestDTO);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO);
    void deleteUser(Long id);
}
