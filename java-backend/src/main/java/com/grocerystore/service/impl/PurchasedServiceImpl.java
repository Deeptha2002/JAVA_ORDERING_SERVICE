package com.grocerystore.service.impl;

import com.grocerystore.dto.PurchasedRequestDTO;
import com.grocerystore.dto.PurchasedResponseDTO;
import com.grocerystore.entity.Cart;
import com.grocerystore.entity.Purchased;
import com.grocerystore.repository.CartRepository;
import com.grocerystore.repository.PurchasedRepository;
import com.grocerystore.repository.UserRepository;
import com.grocerystore.repository.ProductRepository;
import com.grocerystore.service.PurchasedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PurchasedServiceImpl implements PurchasedService {

    @Autowired
    private PurchasedRepository purchasedRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<PurchasedResponseDTO> getAllPurchases() {
        return purchasedRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PurchasedResponseDTO getPurchaseById(Long id) {
        Purchased purchased = purchasedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));
        return convertToResponseDTO(purchased);
    }

    @Override
    public PurchasedResponseDTO createPurchase(PurchasedRequestDTO purchasedRequestDTO) {
        userRepository.findById(purchasedRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        productRepository.findById(purchasedRequestDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if item exists in cart
        Cart cartItem = cartRepository.findByUser_IdAndProduct_Id(
                purchasedRequestDTO.getUserId(),
                purchasedRequestDTO.getProductId()
        ).orElseThrow(() -> new RuntimeException("Item not found in cart"));

        Purchased purchased = new Purchased();
        purchased.setUserId(purchasedRequestDTO.getUserId());
        purchased.setProductId(purchasedRequestDTO.getProductId());

        Purchased savedPurchased = purchasedRepository.save(purchased);

        // Remove from cart after purchase
        cartRepository.delete(cartItem);

        return convertToResponseDTO(savedPurchased);
    }

    @Override
    public void deletePurchase(Long id) {
        Purchased purchased = purchasedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));
        purchasedRepository.delete(purchased);
    }

    private PurchasedResponseDTO convertToResponseDTO(Purchased purchased) {
        PurchasedResponseDTO dto = new PurchasedResponseDTO();
        dto.setId(purchased.getId());
        dto.setUserId(purchased.getUserId());
        dto.setProductId(purchased.getProductId());
        return dto;
    }
}
