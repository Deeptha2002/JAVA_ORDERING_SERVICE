package com.grocerystore.service;

import com.grocerystore.dto.PurchasedRequestDTO;
import com.grocerystore.dto.PurchasedResponseDTO;
import java.util.List;

public interface PurchasedService {
    List<PurchasedResponseDTO> getAllPurchases();
    PurchasedResponseDTO getPurchaseById(Long id);
    PurchasedResponseDTO createPurchase(PurchasedRequestDTO purchasedRequestDTO);
    void deletePurchase(Long id);
}
