package com.erp.maisPraTi.dto.products;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSimpleDto {

    private Long id;
    private String supplierCode;
    private String name;
}
