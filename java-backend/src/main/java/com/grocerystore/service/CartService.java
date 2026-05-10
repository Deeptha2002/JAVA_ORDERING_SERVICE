package com.grocerystore.service;

import com.grocerystore.dto.CartRequestDTO;
import com.grocerystore.dto.CartResponseDTO;
import java.util.List;

public interface CartService {
    List<CartResponseDTO> getCartByUserId(Long userId);
    CartResponseDTO getCartById(Long id);
    CartResponseDTO addToCart(CartRequestDTO cartRequestDTO);
    CartResponseDTO updateCart(Long id, CartRequestDTO cartRequestDTO);
    void deleteCart(Long id);
}
