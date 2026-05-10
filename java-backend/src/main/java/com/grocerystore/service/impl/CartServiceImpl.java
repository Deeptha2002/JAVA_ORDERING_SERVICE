package com.grocerystore.service.impl;

import com.grocerystore.dto.CartRequestDTO;
import com.grocerystore.dto.CartResponseDTO;
import com.grocerystore.entity.Cart;
import com.grocerystore.entity.Product;
import com.grocerystore.entity.User;
import com.grocerystore.repository.CartRepository;
import com.grocerystore.repository.ProductRepository;
import com.grocerystore.repository.UserRepository;
import com.grocerystore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<CartResponseDTO> getCartByUserId(Long userId) {
        return cartRepository.findByUser_Id(userId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CartResponseDTO getCartById(Long id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        return convertToResponseDTO(cart);
    }

    @Override
    public CartResponseDTO addToCart(CartRequestDTO cartRequestDTO) {
        User user = userRepository.findById(cartRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(cartRequestDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(cartRequestDTO.getQuantity());

        Cart savedCart = cartRepository.save(cart);
        return convertToResponseDTO(savedCart);
    }

    @Override
    public CartResponseDTO updateCart(Long id, CartRequestDTO cartRequestDTO) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        User user = userRepository.findById(cartRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(cartRequestDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(cartRequestDTO.getQuantity());

        Cart updatedCart = cartRepository.save(cart);
        return convertToResponseDTO(updatedCart);
    }

    @Override
    public void deleteCart(Long id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cartRepository.delete(cart);
    }

    private CartResponseDTO convertToResponseDTO(Cart cart) {
        CartResponseDTO dto = new CartResponseDTO();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUser().getId());
        dto.setProductId(cart.getProduct().getId());
        dto.setQuantity(cart.getQuantity());
        return dto;
    }
}
