package com.grocerystore.controller;

import com.grocerystore.dto.CartRequestDTO;
import com.grocerystore.dto.CartResponseDTO;
import com.grocerystore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable Long userId) {
        try {
            List<CartResponseDTO> cart = cartService.getCartByUserId(userId);
            if (cart.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "No cart elements found");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody CartRequestDTO cartRequestDTO) {
        try {
            CartResponseDTO cartItem = cartService.addToCart(cartRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCart(@PathVariable Long id, @RequestBody CartRequestDTO cartRequestDTO) {
        try {
            CartResponseDTO updatedCart = cartService.updateCart(id, cartRequestDTO);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable Long id) {
        try {
            cartService.deleteCart(id);
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("message", "Cart item deleted successfully");
            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
