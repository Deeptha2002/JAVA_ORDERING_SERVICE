package com.grocerystore.service;

import com.grocerystore.dto.ProductRequestDTO;
import com.grocerystore.dto.ProductResponseDTO;
import java.util.List;

public interface ProductService {
    List<ProductResponseDTO> getAllProducts();
    ProductResponseDTO getProductById(Long id);
    List<ProductResponseDTO> getProductsByCategory(Long categoryId);
    ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO);
    ProductResponseDTO updateProduct(Long id, ProductRequestDTO productRequestDTO);
    void deleteProduct(Long id);
}
