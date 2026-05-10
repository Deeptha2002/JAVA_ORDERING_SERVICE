package com.grocerystore.service.impl;

import com.grocerystore.dto.CategoryRequestDTO;
import com.grocerystore.dto.CategoryResponseDTO;
import com.grocerystore.dto.ProductResponseDTO;
import com.grocerystore.entity.Category;
import com.grocerystore.entity.Product;
import com.grocerystore.repository.CategoryRepository;
import com.grocerystore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return convertToResponseDTO(category);
    }

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        if (categoryRepository.findByName(categoryRequestDTO.getName()).isPresent()) {
            throw new RuntimeException("Category already exists");
        }

        Category category = new Category();
        category.setName(categoryRequestDTO.getName());

        Category savedCategory = categoryRepository.save(category);
        return convertToResponseDTO(savedCategory);
    }

    @Override
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        category.setName(categoryRequestDTO.getName());
        Category updatedCategory = categoryRepository.save(category);
        return convertToResponseDTO(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(category);
    }

    private CategoryResponseDTO convertToResponseDTO(Category category) {
        CategoryResponseDTO dto = new CategoryResponseDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        
        if (category.getProducts() != null) {
            List<ProductResponseDTO> products = category.getProducts()
                    .stream()
                    .map(this::convertProductToDTO)
                    .collect(Collectors.toList());
            dto.setProducts(products);
        }
        
        return dto;
    }

    private ProductResponseDTO convertProductToDTO(Product product) {
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
