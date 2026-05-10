package com.grocerystore.controller;

import com.grocerystore.dto.PurchasedRequestDTO;
import com.grocerystore.dto.PurchasedResponseDTO;
import com.grocerystore.service.PurchasedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/purchases")
@CrossOrigin(origins = "*")
public class PurchasedController {

    @Autowired
    private PurchasedService purchasedService;

    @PostMapping
    public ResponseEntity<?> createPurchase(@RequestBody PurchasedRequestDTO purchasedRequestDTO) {
        try {
            PurchasedResponseDTO purchase = purchasedService.createPurchase(purchasedRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new HashMap<String, Object>() {{
                        put("message", "Order successful");
                        put("purchase", purchase);
                    }}
            );
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
