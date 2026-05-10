package com.grocerystore.service.impl;

import com.grocerystore.dto.ProductRequestDTO;
import com.grocerystore.dto.ProductResponseDTO;
import com.grocerystore.entity.Category;
import com.grocerystore.entity.Product;
import com.grocerystore.repository.CategoryRepository;
import com.grocerystore.repository.ProductRepository;
import com.grocerystore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToResponseDTO(product);
    }

    @Override
    public List<ProductResponseDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        Category category = categoryRepository.findById(productRequestDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category doesn't exist"));

        if (productRepository.findByNameAndCategory_Id(productRequestDTO.getName(), productRequestDTO.getCategoryId()).isPresent()) {
            throw new RuntimeException("Product already exists in the given category");
        }

        Product product = new Product();
        product.setName(productRequestDTO.getName());
        product.setPrice(productRequestDTO.getPrice());
        product.setUnit(productRequestDTO.getUnit());
        product.setExpiry(productRequestDTO.getExpiry());
        product.setAvailability(productRequestDTO.getAvailability());
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        return convertToResponseDTO(savedProduct);
    }

    @Override
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO productRequestDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Category category = categoryRepository.findById(productRequestDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category doesn't exist"));

        if (productRepository.findByNameAndCategory_Id(productRequestDTO.getName(), productRequestDTO.getCategoryId()).isPresent()) {
            Product existingProduct = productRepository.findByNameAndCategory_Id(productRequestDTO.getName(), productRequestDTO.getCategoryId()).get();
            if (!existingProduct.getId().equals(id)) {
                throw new RuntimeException("Product already exists in the given category");
            }
        }

        product.setName(productRequestDTO.getName());
        product.setPrice(productRequestDTO.getPrice());
        product.setUnit(productRequestDTO.getUnit());
        product.setExpiry(productRequestDTO.getExpiry());
        product.setAvailability(productRequestDTO.getAvailability());
        product.setCategory(category);

        Product updatedProduct = productRepository.save(product);
        return convertToResponseDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        productRepository.delete(product);
    }

    private ProductResponseDTO convertToResponseDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setUnit(product.getUnit());
        dto.setExpiry(product.getExpiry());
        dto.setAvailability(product.getAvailability());
        dto.setCategoryId(product.getCategory().getId());
        return dto;
    }
}
