package com.grocerystore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
    private String name;
    private Integer price;
    private String unit;
    private String expiry;
    private Integer availability;
    private Long categoryId;
}
